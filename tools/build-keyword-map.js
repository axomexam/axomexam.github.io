#!/usr/bin/env node
"use strict";

/*
 * tools/build-keyword-map.js
 *
 * Builds keyword-map.csv — one row per indexable page with the primary,
 * secondary and long-tail keywords that page should target, plus a suggested
 * title, meta description, H1 and H2 set.
 *
 * Why this exists
 * ---------------
 * The site has ~995 indexable pages that share a handful of title patterns.
 * Pages that share a title and a heading compete with each other instead of
 * each owning a query. This tool derives a distinct keyword set per page, so
 * every page has exactly one clear target and no two pages cannibalise.
 *
 * How a page's keywords are chosen
 * --------------------------------
 *   Layer A — topic/intent, from the page's own path and its section. Gives the
 *             primary keyword and the title pattern.
 *   Layer B — distinctive terms mined from THAT page's own question stems
 *             (TF-IDF across the corpus), which become the secondary keywords
 *             and the extra H2 sections. This keeps two pages on related topics
 *             from converging on the same keyword set.
 *
 * Where a topic JSON file carries a hand-written `tags` array, those curated
 * tags are used as the secondary keywords in place of the mined terms.
 *
 * A final pass appends the page's parent path segment to any primary keyword or
 * title that is still shared by two pages, so each page owns a unique target.
 *
 * Read-only with respect to page HTML: this tool only writes keyword-map.csv.
 * tools/apply-keyword-map.js consumes the CSV to edit the pages.
 *
 * Usage:
 *   node tools/build-keyword-map.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "keyword-map.csv");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview", "tools"]);

/* ---------- generic helpers ---------- */

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'", "#8217": "\u2019", "#8216": "\u2018", "#8220": "\u201c", "#8221": "\u201d", "#8212": "\u2014", "#8211": "\u2013" };

function unescapeHtml(s) {
  return String(s).replace(/&(#?\w+);/g, (m, e) => (e in ENTITIES ? ENTITIES[e] : m));
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.name.endsWith(".html")) {
      out.push(path.relative(ROOT, path.join(dir, e.name)));
    }
  }
  return out;
}

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

function loc(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v.en || v.as || "";
}

function csvCell(v) {
  const s = String(v == null ? "" : v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const ACRONYMS = new Set(["rrb", "ntpc", "alp", "si", "ab", "ub", "adre", "apsc", "dhs", "dme", "dte", "gk", "mcq", "mcqs", "pdf", "slprb", "dhe", "pnrd", "ssc", "ms", "upsc", "ibps", "cgl", "chsl", "mts", "gd", "hc", "aiims", "neet", "jrf", "net", "ctet", "tet", "b.ed", "it", "ai", "dbms", "lcm", "hcf", "2d", "3d", "kv", "ph", "cctv", "os", "cpu", "ram", "rom", "url", "html", "css", "json"]);
const SMALL = new Set(["and", "or", "of", "for", "the", "a", "an", "in", "on", "to", "with", "vs", "at", "by"]);

function titleCase(slug) {
  return String(slug)
    .split(/[-_]/)
    .filter(Boolean)
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i > 0 && SMALL.has(lw)) return lw;
      if (ACRONYMS.has(lw)) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

/* ---------- text mining ---------- */

const NOISE = new Set([
  "therefore", "hence", "thus", "step", "steps", "convert", "converting", "find",
  "the", "and", "of", "for", "with", "from", "into", "that", "this", "which",
  "what", "when", "where", "how", "many", "much", "value", "answer", "question",
  "following", "given", "correct", "option", "options", "statement", "statements",
  "choose", "select", "calculate", "compute", "solve", "below", "above",
  "is", "are", "was", "were", "its", "it", "as", "if", "than", "then", "be",
  "has", "have", "had", "will", "would", "can", "could", "should", "may", "might",
  "per", "each", "every", "some", "any", "all", "not", "no", "yes", "so", "such",
]);
const WEAK_END = new Set(["a", "an", "the", "of", "for", "with", "to", "in", "on", "at", "by", "is", "are", "and", "or", "as", "if", "than", "then", "that", "this"]);

function cleanPhrase(p) {
  let words = p.split(" ").filter((w) => w && !NOISE.has(w));
  while (words.length && (words[0] === "a" || words[0] === "an" || words[0] === "the" || words[0] === "is" || words[0] === "its")) {
    words = words.slice(1);
  }
  while (words.length && WEAK_END.has(words[words.length - 1])) words = words.slice(0, -1);
  if (words.length < 2) return "";
  if (words.every((w) => w.length <= 2)) return "";
  if (!words.some((w) => w.length >= 4)) return "";
  if (words.some((w) => w.length <= 1)) return "";
  if (words.some((w) => /\d/.test(w))) return "";
  return words.join(" ");
}

function pageStems(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const scope = m ? m[1] : html;
  const stems = [];
  const ire = /<div class="qa-item"[\s\S]*?(?=<div class="qa-item"|<\/section>|$)/g;
  let it;
  while ((it = ire.exec(scope))) {
    const qm = it[0].match(/<div[^>]*lang="en"[^>]*>([\s\S]*?)<\/div>/);
    if (qm) {
      const t = qm[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (t) stems.push(t);
    }
  }
  if (!stems.length) {
    const qre = /<div class="(?:qtext|quiz-qtext)"[^>]*>([\s\S]*?)<\/div>/g;
    let q;
    while ((q = qre.exec(scope))) {
      const t = q[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (t) stems.push(t);
    }
  }
  return stems;
}

/* A question stem is "Which of the following is the capital of Assam?" — the
   n-grams that run across its grammar ("in assam", "of the following") are
   fragments, not things anyone types into Google. Drop any phrase that starts
   or ends on a function word, and any single-word fragment too short to be a
   real term. */
const FUNCTION_WORDS = new Set(("a an the and or but of for to in on at by with from as is are was were be been " +
  "which what who whom whose where when why how this that these those it its their his her your our " +
  "not no nor if then than so such very more most much many any all each both few other another " +
  "into onto over under above below up down out off about after before during between among " +
  "can could will would shall should may might must do does did done have has had " +
  "following statement statements given correct incorrect true false above below option options").split(" "));

function isRealPhrase(phrase) {
  const w = phrase.split(" ");
  if (w.length < 2) return false;
  if (FUNCTION_WORDS.has(w[0]) || FUNCTION_WORDS.has(w[w.length - 1])) return false;
  if (w.some((x) => FUNCTION_WORDS.has(x) && x.length <= 2)) return false;
  return true;
}

function bigramsAndTrigrams(stems) {
  const counts = new Map();
  for (const s of stems) {
    const words = s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    for (let n = 2; n <= 3; n++) {
      for (let i = 0; i + n <= words.length; i++) {
        const phrase = words.slice(i, i + n).join(" ");
        if (!isRealPhrase(phrase)) continue;
        counts.set(phrase, (counts.get(phrase) || 0) + 1);
      }
    }
  }
  return counts;
}

/* ---------- curated tags ---------- */

function curatedTagsById() {
  const map = {};
  const walkDir = (dir) => {
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walkDir(full);
      else if (e.name.endsWith(".json")) {
        const j = readJSON(full);
        if (j && Array.isArray(j.tags) && j.tags.length) map[e.name.replace(/\.json$/, "")] = j.tags;
      }
    }
  };
  walkDir(path.join(ROOT, "data", "content"));
  return map;
}

function topicTagsByPath(categories, idTags) {
  const out = {};
  const add = (p, topic) => {
    const t = (topic && topic.tags) || idTags[topic && topic.id] || [];
    if (t.length) out[p] = t;
  };
  for (const cat of categories || []) {
    const cid = cat.id;
    for (const sub of cat.subcategories || []) {
      for (const sec of sub.sections || []) {
        for (const tp of sec.topics || []) add(`${cid}/${sub.id}/${sec.id}/${tp.id}`, tp);
      }
      if (!sub.sections) for (const tp of sub.topics || []) add(`${cid}/${sub.id}/${tp.id}`, tp);
    }
    for (const sec of cat.sections || []) {
      for (const tp of sec.topics || []) add(`${cid}/${sec.id}/${tp.id}`, tp);
    }
    for (const tp of cat.topics || []) add(`${cid}/${tp.id}`, tp);
  }
  return out;
}

/* ---------- display names from categories.json ---------- */

function displayNames() {
  const out = {};
  const add = (id, name) => {
    const n = loc(name);
    if (id && n) out[id] = n;
  };
  for (const cat of categories) {
    add(cat.id, cat.name);
    for (const sub of cat.subcategories || []) {
      add(sub.id, sub.name);
      for (const sec of sub.sections || []) {
        add(sec.id, sec.name);
        for (const tp of sec.topics || []) add(tp.id, tp.name || tp.title);
      }
      for (const tp of sub.topics || []) add(tp.id, tp.name || tp.title);
    }
    for (const sec of cat.sections || []) {
      add(sec.id, sec.name);
      for (const tp of sec.topics || []) add(tp.id, tp.name || tp.title);
    }
    for (const tp of cat.topics || []) add(tp.id, tp.name || tp.title);
  }
  return out;
}

/* ---------- exam display names ---------- */

function examNames() {
  const out = {};
  const idx = readJSON(path.join(ROOT, "data", "exams", "index.json"));
  for (const e of (idx && idx.exams) || []) {
    out[e.id] = loc(e.title);
    for (const sec of e.sections || []) {
      out[`${e.id}/${sec.id}`] = loc(sec.title);
      for (const sub of sec.subcategories || []) {
        out[`${e.id}/${sec.id}/${sub.id}`] = loc(sub.title);
      }
    }
  }
  return out;
}

/* ---------- main ---------- */

const categories = (readJSON(path.join(ROOT, "data", "categories.json")) || {}).categories || [];
const idTags = curatedTagsById();
const tagsByPath = topicTagsByPath(categories, idTags);
const examMap = examNames();
const displayMap = displayNames();

const pages = walk(ROOT, []).sort();

const pageTerms = {};
const pageIndexable = {};
const pageRedirect = {};
const df = new Map();
for (const rel of pages) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const counts = bigramsAndTrigrams(pageStems(html));
  pageTerms[rel] = counts;
  const robots = (html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || [])[1] || "";
  pageIndexable[rel] = !/noindex/i.test(robots);
  pageRedirect[rel] = /http-equiv="refresh"/i.test(html);
  for (const term of counts.keys()) df.set(term, (df.get(term) || 0) + 1);
}
const N = pages.length;

function topContentTerms(rel, limit) {
  const counts = pageTerms[rel] || new Map();
  const scored = [];
  for (const [term, c] of counts) {
    const phrase = cleanPhrase(term);
    if (!phrase) continue;
    const idf = Math.log(N / (1 + (df.get(term) || 1)));
    scored.push([phrase, c * idf * (term.split(" ").length === 3 ? 1.15 : 1)]);
  }
  scored.sort((a, b) => b[1] - a[1]);
  const seen = new Set();
  const out = [];
  for (const [p] of scored) {
    const key = p.split(" ").sort().join(" ");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}

function curatedPhrases(tags) {
  return (tags || [])
    .filter((t) => /^[a-z0-9-]+$/.test(t) && t.length > 3 && !NOISE.has(t))
    .map((t) => t.replace(/-/g, " "));
}

function buildRow(rel, mined, isRedirect) {
  const segs = rel.replace(/\/index\.html$/, "").split("/").filter(Boolean);
  /* The site root is the single file "index.html" (no directory), so its only
     segment is the filename — treat it as the home section. */
  const section = segs.length === 0 || segs[0] === "index.html" ? "home" : segs[0];
  let slug = segs[segs.length - 1] || "home";
  /* "read", "all", "list" are structural verbs, not topics — the page is
     about its parent (e.g. /category/articles/computer/read/ is Computer
     Awareness, not "Read"). */
  const GENERIC = new Set(["read", "all", "list", "more", "view", "index"]);
  const isReadView = GENERIC.has(slug) && segs.length >= 2;
  if (isReadView) slug = segs[segs.length - 2];
  const topic = displayMap[slug] || titleCase(slug);
  const tl = topic.toLowerCase();
  let primary, title, meta, h1, h2, secondary, longtail;

  // A section's own root page (e.g. /exams/, /ebooks/) is a hand-written hub
  // whose title already describes it; keep the committed copy. Redirect stubs
  // (meta refresh to a canonical URL) keep their "This page has moved" title
  // too — their job is to bounce the crawler, not to rank.
  if (segs.length === 1 && section !== "home") {
    return {
      path: rel, section, topic, primary_kw: "", secondary_kw: "",
      longtail_kw: "", content_terms: mined.join(", "),
      suggested_title: "", suggested_meta: "", suggested_h1: "", suggested_h2: "",
    };
  }
  if (isRedirect) {
    return {
      path: rel, section, topic, primary_kw: "", secondary_kw: "",
      longtail_kw: "", content_terms: mined.join(", "),
      suggested_title: "", suggested_meta: "", suggested_h1: "", suggested_h2: "",
    };
  }

  if (section === "topic") {
    const curated = curatedPhrases(tagsByPath[segs.slice(1).join("/")]);
    secondary = (curated.length ? curated : mined).slice(0, 4);
    longtail = mined.filter((m) => !secondary.includes(m)).slice(0, 3);
    primary = `${tl} questions with answers`;
    title = `${topic} Questions with Answers — ADRE, APSC`;
    meta = `Practice ${tl} questions with step-by-step answers and explanations for ADRE, APSC and Assam Police. Free, bilingual, no sign-up.`;
    h1 = `${topic}: Concepts, Tricks & Solved Questions`;
    h2 = [`What is ${topic}`, "Formulas & Key Concepts", "Shortcut Tricks", ...secondary.map(titleCase), "FAQs"];
  } else if (section === "exams") {
    const examId = segs[1] || "";
    const examName = examMap[examId] || titleCase(examId);
    const secName = segs[2] ? examMap[`${examId}/${segs[2]}`] || titleCase(segs[2]) : "";
    const examLower = examName.toLowerCase();
    secondary = mined.slice(0, 4);
    longtail = mined.slice(4, 7);
    if (segs.length <= 2) {
      // exam root book page
      primary = `${examLower} exam question bank`;
      title = `${examName} Exam`;
      meta = `Prepare for ${examName} with free bilingual practice questions, syllabus and previous papers. All subjects, exam-pattern, no sign-up.`;
      h1 = `${examName} Exam Preparation`;
      h2 = ["Syllabus Coverage", "Practice Questions", "Previous Year Papers", "FAQs"];
    } else if (segs.length === 3) {
      // subject/section hub
      primary = `${secName.toLowerCase()} for ${examLower}`;
      title = `${secName} for ${examName}`;
      meta = `Practise ${secName.toLowerCase()} for ${examName} — free bilingual questions with answers and explanations, exam-pattern.`;
      h1 = `${secName} for ${examName}`;
      h2 = ["Syllabus Coverage", "Practice Questions", "Important Formulas", "FAQs"];
    } else {
      // leaf topic inside an exam
      primary = `${tl} questions for ${examLower}`;
      title = `${topic} MCQs — ${examName}`;
      meta = `Practise ${tl} MCQs with answers and explanations for ${examName}. Free bilingual practice, exam-pattern questions, no sign-up.`;
      h1 = `${topic} Questions for ${examName}`;
      h2 = ["Syllabus Coverage", "Practice Questions", "Important Formulas", ...secondary.map(titleCase), "FAQs"];
    }
  } else if (section === "mock-test") {
    const parts = segs.slice(1);
    const setIdx = parts.findIndex((p) => /^set-\d+$/.test(p));
    const setNum = setIdx >= 0 ? parts[setIdx].replace("set-", "") : "";
    const subjectSegs = setIdx >= 0 ? parts.slice(0, setIdx) : parts;
    const subject = subjectSegs.length ? titleCase(subjectSegs[subjectSegs.length - 1]) : "Mock Test";
    secondary = mined.slice(0, 4);
    longtail = mined.slice(4, 7);
    primary = setNum ? `${subject.toLowerCase()} mock test set ${setNum}` : `${subject.toLowerCase()} mock test`;
    title = setNum ? `${subject} Mock Test Set ${setNum} — ADRE, APSC` : `${subject} Mock Test — ADRE, APSC`;
    meta = `Take free timed ${subject.toLowerCase()} mock test${setNum ? ` set ${setNum}` : ""} with 25 bilingual questions, instant scoring and answers. Practice for ADRE, APSC and Assam Police.`;
    h1 = setNum ? `${subject} Mock Test — Set ${setNum}` : `${subject} Mock Test`;
    h2 = [`Topics Covered${setNum ? ` in Set ${setNum}` : ""}`, "How to Attempt", "Answer Key & Explanations", "More Sets"];
  } else if (section === "category") {
    secondary = mined.slice(0, 4);
    longtail = mined.slice(4, 7);
    primary = `${tl} questions${segs.length <= 2 ? " category" : ""}`;
    /* The root hub (/category/gk/) keeps the exam list; leaf pages stay short
       so a parent qualifier can be appended without hitting 60 chars. */
    if (segs.length <= 2) {
      title = topic === "Articles"
        ? "Study Articles & Notes for Assam Competitive Exams"
        : `${topic} Questions with Answers — ADRE, APSC`;
    } else {
      title = `${topic} Questions with Answers for ADRE, APSC`;
    }
    meta = `Free ${tl} questions with explained answers for ADRE, APSC, Assam Police and other Assam competitive exams. Bilingual, no sign-up.`;
    h1 = isReadView
      ? `${topic} — Study Notes & Articles`
      : `${topic} Questions with Answers`;
    h2 = ["Topics Covered", "Practice Questions", ...secondary.map(titleCase), "FAQs"];
  } else if (section === "previous-year") {
    const label = segs.slice(1).map(titleCase).join(" ");
    secondary = []; longtail = [];
    primary = `${label ? label.toLowerCase() + " " : ""}previous year question paper`;
    title = `${label ? label + " " : ""}Previous Year Question Paper | axomexam`;
    meta = `Solve ${label ? label + " " : ""}previous year question papers with answers for Assam competitive exams. Free, bilingual.`;
    h1 = `${label ? label + " " : ""}Previous Year Question Papers`;
    h2 = ["Year-wise Papers", "Solved Answers", "Exam Pattern", "FAQs"];
  } else if (section === "current-affairs") {
    /* The slug may or may not already end in "current-affairs" (State Current
       Affairs vs National Affairs), so strip it, then only re-append when the
       base does not already say "affairs" — otherwise the label reads
       "National Affairs Current Affairs". */
    const base = segs.slice(1).map(titleCase).join(" ").replace(/\s*Current Affairs$/i, "").trim();
    const suffix = /\baffairs\b/i.test(base) ? "" : " Current Affairs";
    const label = `${base}${suffix}`.trim();
    secondary = []; longtail = [];
    primary = `${label.toLowerCase()} questions`;
    title = `${label} Q&A for ADRE, APSC`;
    meta = `Free ${label.toLowerCase()} questions with explained answers in Assamese and English for ADRE, APSC and Assam Police.`;
    h1 = label;
    h2 = ["Latest Updates", "Practice Questions", "FAQs"];
  } else if (section === "ebooks") {
    const label = segs.slice(1).map(titleCase).join(" ");
    secondary = []; longtail = [];
    primary = `${label ? label.toLowerCase() + " " : ""}pdf notes`;
    title = `${label ? label + " " : ""}PDF Notes & E-Book — Free Download | axomexam`;
    meta = `Download free ${label ? label.toLowerCase() + " " : ""}PDF notes and read the e-book online for Assam competitive exams. Bilingual, no sign-up.`;
    h1 = `${label ? label + " " : ""}PDF Notes & E-Book`;
    h2 = ["What's Inside", "How to Read", "FAQs"];
  } else if (section === "home") {
    /* The homepage is the one page whose primary keyword should not be its own
       H1 sentence — nobody searches that string. Target the head terms the
       site actually competes for. */
    secondary = []; longtail = [];
    primary = "assam competitive exam practice questions";
    title = ""; meta = ""; h1 = ""; h2 = [];
    secondary = ["adre question bank", "apsc practice questions", "assam police gk", "assam exam pdf notes"];
  } else {
    secondary = []; longtail = [];
    primary = tl; title = ""; meta = ""; h1 = ""; h2 = [];
  }

  return {
    path: rel, section, topic, primary_kw: primary,
    secondary_kw: secondary.map(cleanKeyword).join(", "),
    longtail_kw: longtail.map(cleanKeyword).join(", "),
    content_terms: mined.join(", "), suggested_title: title,
    suggested_meta: meta, suggested_h1: h1, suggested_h2: h2.join(" | "),
  };
}

/* A keyword is one phrase. Curated tags and topic titles can contain a comma
   or a bracketed list ("Ahom Administration (Paik, Khel, Posha)"), which would
   split the keywords meta into bogus entries. Strip the punctuation and the
   bracketed aside, keep the phrase itself. */
function cleanKeyword(s) {
  return String(s)
    .replace(/\([^)]*\)/g, " ")
    .replace(/[",;|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const rows = pages.map((rel) => buildRow(rel, topContentTerms(rel, 8), pageRedirect[rel]));
for (const r of rows) {
  r.indexable = pageIndexable[r.path];
  if (r.primary_kw) r.primary_kw = cleanKeyword(r.primary_kw);
  if (r.secondary_kw) r.secondary_kw = r.secondary_kw.split(", ").map(cleanKeyword).filter(Boolean).join(", ");
  if (r.longtail_kw) r.longtail_kw = r.longtail_kw.split(", ").map(cleanKeyword).filter(Boolean).join(", ");
}

/* utility pages keep their committed title / description / H1 */
function curTag(html, tag) {
  const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? unescapeHtml(m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()) : "";
}
for (const r of rows) {
  if (r.suggested_title) continue;
  /* Redirect stubs keep their own "moved" title and get no keyword work. */
  if (pageRedirect[r.path]) continue;
  /* The homepage has a keyword set of its own (see the home branch). */
  if (r.section === "home") continue;
  const html = fs.readFileSync(path.join(ROOT, r.path), "utf8");
  r.suggested_title = curTag(html, "title");
  r.suggested_h1 = curTag(html, "h1");
  const dm = html.match(/<meta name="description" content="([^"]*)"/);
  r.suggested_meta = dm ? unescapeHtml(dm[1]) : "";
  // a utility page's primary keyword comes from its own title, not the filename
  const own = r.suggested_h1 || r.suggested_title.split("|")[0];
  if (own) r.primary_kw = own.toLowerCase().replace(/[^\w\s&+-]/g, "").replace(/\s+/g, " ").trim();
}

/* Hub and label pages (exams/, mock-test/, category/, previous-year/,
   current-affairs/, ebooks/) have no question stems of their own, so TF-IDF
   has nothing to mine and they would carry a single keyword. Derive a few
   natural search variants from the primary keyword instead — the phrases a
   student would actually type ("adre grade iv mcq", "railway rrb ntpc
   questions"). Capped so no page carries more than five. */
const VARIANT_SECTIONS = new Set(["home", "exams", "mock-test", "category", "previous-year", "current-affairs", "ebooks", "topic"]);

function deriveVariants(r) {
  let base = r.primary_kw;
  for (const cut of [" previous year question paper", " pdf notes", " exam question bank", " questions with answers", " questions category", " questions", " mock test", " e-book"]) {
    if (base.endsWith(cut)) { base = base.slice(0, -cut.length); break; }
  }
  const out = [];
  if (/^syllabus for /.test(base)) {
    const who = base.replace(/^syllabus for /, "");
    out.push(`syllabus for ${who}`, `${who} syllabus`, `${who} exam pattern`);
  } else if (/ for /.test(base)) {
    const left = base.replace(/ for .*$/, "");
    const right = base.replace(/^.*? for /, "");
    out.push(`${left} mcq`, `${left} questions for ${right}`, `${left} practice set`);
  } else {
    out.push(`${base} mcq`, `${base} quiz`, `${base} practice questions`);
  }
  return out.map((s) => s.replace(/\s+/g, " ").trim()).filter((s) => s.length >= 8 && s.length <= 60);
}

for (const r of rows) {
  if (!r.primary_kw || !VARIANT_SECTIONS.has(r.section)) continue;
  const cur = [r.primary_kw, ...r.secondary_kw.split(", ").filter(Boolean)];
  const have = new Set(cur.map((s) => s.toLowerCase()));
  const add = [];
  for (const v of deriveVariants(r)) {
    if (have.size >= 5) break;
    if (have.has(v.toLowerCase())) continue;
    add.push(v);
    have.add(v.toLowerCase());
  }
  if (add.length) r.secondary_kw = [r.secondary_kw, add.join(", ")].filter(Boolean).join(", ");
}

/* fit titles <=60 and metas <=160 without cutting mid-word */
function fitTitle(s, limit = 60) {
  if (s.length <= limit) return s;
  for (const cut of [" & Assam Police", ", APSC & Assam Police", " Questions with Answers", ", APSC"]) {
    if (s.includes(cut) && s.replace(cut, "").length <= limit) return s.replace(cut, "");
  }
  /* Keep exam context on a long topic name by shortening the exam list rather
     than dropping it entirely. */
  if (s.includes(" — ADRE, APSC") && s.replace(" — ADRE, APSC", " — ADRE").length <= limit) {
    return s.replace(" — ADRE, APSC", " — ADRE");
  }
  if (s.includes(" — ") && s.split(" — ")[0].length <= limit) return s.split(" — ")[0];
  const t = s.slice(0, limit);
  return t
    .slice(0, t.lastIndexOf(" "))
    .replace(/[ —,&|:;]+$/, "")
    .replace(/\s+(with|and|for|of|the|in|to|on|by|vs|a|an|&)$/i, "");
}
function fitMeta(s, limit = 160) {
  if (s.length <= limit) return s;
  let t = s.slice(0, limit);
  t = t.slice(0, t.lastIndexOf(" ")).replace(/[ ,;—]+$/, "");
  return t.endsWith(".") ? t : t + ".";
}
for (const r of rows) {
  if (r.suggested_title) r.suggested_title = fitTitle(r.suggested_title);
  if (r.suggested_meta) r.suggested_meta = fitMeta(r.suggested_meta);
}

/* A short, human-readable scope for a page taken from its parent segment,
   used only to break a keyword/title/meta tie with another page. Returns ""
   when the page has no distinct parent, or the parent is already implied by
   the topic (e.g. /category/computer/ under "Computer Awareness"). */
function parentQualifier(r) {
  const segs = r.path.replace(/\/index\.html$/, "").split("/").filter(Boolean);
  const SKIP = new Set(["read", "all", "list", "more", "view", "index"]);
  const mid = segs.slice(1, -1).filter((s) => !SKIP.has(s));
  if (!mid.length) return "";
  const tl = r.topic.toLowerCase();
  const redundant = (s) => titleCase(s).toLowerCase().split(/\s+/).every((w) => tl.includes(w));
  const keep = mid.filter((s) => !redundant(s));
  if (!keep.length) return "";
  return titleCase(keep[keep.length - 1]).replace(/\bSec\b/, "").trim();
}

/* dedupe: every primary keyword and title becomes unique *among the pages
   Google is allowed to index*. A noindex stub is expected to repeat the
   indexable page it duplicates (that is what a redirect page is), so it must
   not force the indexable page to take a worse title. */
function dedupe(key, makeSuffix) {
  const groups = new Map();
  for (const r of rows) {
    if (!r[key] || !r.indexable) continue;
    if (!groups.has(r[key])) groups.set(r[key], []);
    groups.get(r[key]).push(r);
  }
  for (const [val, grp] of groups) {
    if (grp.length < 2) continue;
    for (const r of grp) {
      const q = parentQualifier(r);
      if (q) r[key] = makeSuffix(val, q, r);
    }
  }
}
dedupe("primary_kw", (v, q) => `${v} ${q.toLowerCase()}`);
dedupe("suggested_title", (v, q, r) => {
  const base = v.includes(" — ") ? v.split(" — ")[0] : v;
  const short = base.replace(/ Questions with Answers$/, " Questions").replace(/ MCQs$/, "");
  for (const cand of [`${base} — ${q}`, `${short} — ${q}`, `${short} (${q})`, `${r.topic} — ${q}`, `${r.topic} (${q})`]) {
    if (cand.length <= 60) return cand;
  }
  return r.topic;
});
/* Two pages can share a topic name under different parents (e.g. "Analogy"
   under both logical-reasoning and verbal-reasoning). Qualify the description
   with the page's own scope so no two pages carry the same meta. */
dedupe("suggested_meta", (v, q, r) => {
  if (v.toLowerCase().includes(q.toLowerCase())) return v;
  const prefixed = `${q} practice: ${v.charAt(0).toLowerCase()}${v.slice(1)}`;
  if (prefixed.length <= 160) return prefixed;
  const short = `${q} practice: free ${r.topic.toLowerCase()} questions with answers for Assam competitive exams.`;
  return short.length <= 160 ? short : v;
});
/* Same-topic pages under different parents (e.g. Assam vs India folk dances)
   get a scope suffix on the H1 too, so the visible heading differs. */
dedupe("suggested_h1", (v, q) => `${v} (${q})`);

function naturalCase(s) {
  const parts = s.split(" ");
  return parts.map((w, i) => (i > 0 && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w)).join(" ");
}
/* dedupe can lengthen a value, so re-fit before writing */
for (const r of rows) {
  if (r.suggested_title) r.suggested_title = fitTitle(r.suggested_title);
  if (r.suggested_meta) r.suggested_meta = fitMeta(r.suggested_meta);
  r.suggested_title = naturalCase(r.suggested_title);
  r.suggested_title_len = r.suggested_title.length;
  r.suggested_meta_len = r.suggested_meta.length;
}

/* ---------- write ---------- */

const cols = ["path", "section", "topic", "primary_kw", "secondary_kw", "longtail_kw",
  "content_terms", "suggested_title", "suggested_title_len", "suggested_meta",
  "suggested_meta_len", "suggested_h1", "suggested_h2"];
const lines = [cols.join(",")];
for (const r of rows) lines.push(cols.map((c) => csvCell(r[c])).join(","));
fs.writeFileSync(OUT, lines.join("\n") + "\n");

const dupKw = rows.length - new Set(rows.map((r) => r.primary_kw)).size;
const dupTi = rows.length - new Set(rows.map((r) => r.suggested_title)).size;
console.log(`build-keyword-map: ${rows.length} rows -> ${path.relative(ROOT, OUT)}`);
console.log(`  curated-tag pages : ${Object.keys(tagsByPath).length}`);
console.log(`  mined-term pages  : ${rows.filter((r) => r.content_terms).length}`);
console.log(`  duplicate keywords: ${dupKw}`);
console.log(`  duplicate titles  : ${dupTi}`);
console.log(`  titles > 60 chars : ${rows.filter((r) => r.suggested_title.length > 60).length}`);
console.log(`  metas  > 160 chars: ${rows.filter((r) => r.suggested_meta.length > 160).length}`);
