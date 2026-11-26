#!/usr/bin/env node
"use strict";

/*
 * tools/seo-tighten-meta.js
 *
 * Brings every indexable page's <title> and meta description inside the SERP
 * limits that tools/seo-audit.js enforces (title 30-60 chars, description
 * 110-160 chars) without changing the page topic: the rewrite keeps the page's
 * own keyword first and only compacts the template tail.
 *
 * The same rewritten strings are applied to <title>, meta description,
 * og:title, og:description, twitter:title, twitter:description and to the
 * page-level JSON-LD headline/name/description, so the head stays consistent.
 *
 * Idempotent: pages already inside the limits are left byte-identical.
 *
 * Usage: node tools/seo-tighten-meta.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const SKIP = new Set([".git", "dist", "tools", "scripts", "data", "js", "css", "node_modules", "images", "app"]);

const unescape = (s) => String(s == null ? "" : s)
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const TITLE_MAX = 60, TITLE_MIN = 30, DESC_MAX = 160, DESC_MIN = 110;

/* Family rewrites: exam names that are simply too long to fit 60 characters
   with their qualifier. Each keeps the exam name the reader searches for. */
const TITLE_RULES = [
  [/^Assam Police Sub-Inspector \(SI\) Full Paper Mock Test — Set (\d+)/, "Assam Police SI Mock Test Set $1"],
  [/^Assam Police Sub-Inspector \(SI\) Mock Test — Full Paper Sets/, "Assam Police SI Mock Test — Full Paper Sets"],
  [/^DHS & DME Non-Technical Grade III Full Paper Mock Test — Set (\d+)/, "DHS & DME Non-Tech Grade III Mock Test Set $1"],
  [/^DHS & DME Non-Technical Grade III Mock Test — Full Paper Sets/, "DHS & DME Non-Tech Grade III Mock Test Sets"],
  [/^DHS & DME Technical Grade III Full Paper Mock Test — Set (\d+)/, "DHS & DME Technical Grade III Mock Test Set $1"],
  [/^DHS & DME Technical Grade III Mock Test — Full Paper Sets/, "DHS & DME Technical Grade III Mock Tests"],
  [/^Statistics and Data Interpretation Mock Test Set (\d+)/, "Statistics & DI Mock Test Set $1"],
  [/^Statistics and Data Interpretation Mock Test$/, "Statistics & DI Mock Test"],
];

const SHORT_TITLE_RULES = [
  [/^(Computer Awareness|General English|General Knowledge|Mathematics|Reasoning Ability|General Science) \| axomexam$/, "$1 Articles &amp; Notes | axomexam"],
  [/^Average - DHS & DME Technical$/, "Average Questions — DHS & DME Technical"],
  [/^Grammar Mock Test \| axomexam$/, "Grammar Mock Test — 10 Free Sets | axomexam"],
  [/^Tenses \| axomexam$/, "Tenses in English Grammar | axomexam"],
  [/^Trending Topics \| axomexam$/, "Trending Exam Topics & Current Affairs | axomexam"],
];

const ABBREV = [
  [/\bSub-Inspector\b/g, "SI"],
  [/\bNon-Technical\b/g, "Non-Tech"],
  [/\bFull Paper Mock Test\b/g, "Mock Test"],
  [/\bStatistics and Data Interpretation\b/g, "Statistics & DI"],
  [/\bMock Test — Full Paper Sets\b/g, "Mock Tests"],
  [/\bQuestions with Answers\b/g, "Q&A"],
];

const DESC_RULES = [
  [/ with bilingual questions, answers and explanations\./g, " with bilingual MCQs and explanations."],
  [/ with bilingual questions and answers for competitive exams in Assam\. Practice for ADRE, APSC, Assam Police, DHS, DME, SSC and Railway exams\./g,
    " with bilingual MCQs and explanations for ADRE, APSC, Assam Police and DHS-DME exams."],
  [/Practice for ADRE, APSC, Assam Police, DHS, DME, SSC and Railway exams\./g, "For ADRE, APSC, Assam Police and DHS-DME exams."],
  [/ for competitive exams in Assam\./g, " for Assam exams."],
  [/Free timed /g, "Free "],
];

function compactDesc(desc, primary) {
  let d = desc;
  for (const [re, to] of DESC_RULES) d = d.replace(re, to);
  if (d.length <= DESC_MAX) return finish(d, primary);

  /* Drop trailing sentences while something meaningful remains. */
  const sentences = d.match(/[^.!?]+[.!?]+/g) || [d];
  while (sentences.length > 1 && sentences.join(" ").trim().length > DESC_MAX) {
    const candidate = sentences.slice(0, -1).join(" ").trim();
    if (candidate.length < DESC_MIN) break;
    sentences.pop();
    d = candidate;
  }
  d = sentences.join(" ").trim();
  if (d.length <= DESC_MAX) return finish(d, primary);

  /* Drop trailing comma clauses (keeps the keyword-first part intact). */
  const parts = d.split(/,\s+/);
  while (parts.length > 1 && parts.join(", ").length > DESC_MAX) {
    const candidate = parts.slice(0, -1).join(", ");
    if (candidate.length < DESC_MIN) break;
    parts.pop();
    d = candidate;
  }
  if (d.length <= DESC_MAX) return finish(d, primary);

  const cut = d.slice(0, DESC_MAX);
  const at = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "), cut.lastIndexOf(", "), cut.lastIndexOf(" "));
  d = cut.slice(0, at > DESC_MIN ? at : cut.length).replace(/[\s,;:—-]+$/, "");
  return finish(d, primary);
}

function finish(d, primary) {
  d = stripDanglers(d.replace(/\s+/g, " ").trim());
  if (!/[.!?]$/.test(d)) d += ".";
  if (d.length < DESC_MIN && primary && !d.toLowerCase().includes(primary.toLowerCase())) {
    d = (primary + ": " + d).replace(/\s+/g, " ");
    d = d.charAt(0).toUpperCase() + d.slice(1);
    if (d.length > DESC_MAX) d = trimWords(d, DESC_MAX);
  }
  return d;
}

/* A word-boundary cut can leave the sentence hanging on a fragment of the
   phrase it started in: "…exam-pattern questions, no sign-up." becomes
   "…exam-pattern questions, no." and reads like a broken template in the
   SERP. Drop those fragments. "free" and "more" are left alone: "…and more."
   or "…Police. Free." are clipped but grammatical, and cutting them would
   remove real copy. */
const DANGLING_WORD = /[\s,;:—–-](?:no|and|or|with|for|in|on|to|of|a|an|the|plus|from|at|by|how|what|who|where|when|why|that|which|than|its|their|this|these|those|not|will|can|may|is|are|was|were|be|been|being|has|have|had|do|does|did|into|about|over|under|between|as|if|then|so|but|also|very|just|only|per)\s*[.!?]?$/i;

function stripDanglers(d) {
  let out = d.replace(/[\s,;:—–-]+$/, "");
  for (let i = 0; i < 4 && DANGLING_WORD.test(out); i++) {
    const next = out.replace(DANGLING_WORD, "").replace(/[\s,;:—–-]+$/, "");
    if (next.length < DESC_MIN) break;
    out = next;
  }
  return out;
}

/* Titles like "LCM & HCF - DHS & DME Technical" name the page but promise
   nothing, so a reader scrolling the SERP has no reason to prefer it. These
   rules add the plain benefit the page actually delivers (questions with
   answers) without touching the keyword, and never break the 60-character
   limit. Only titles with no benefit word at all are candidates. */
const BENEFIT_WORD = /free|question|answer|mcq|mock|test|pdf|notes?|paper|practice|syllabus|ebook|guide|tips/i;
const EXAM_TAIL = "ADRE 3\\.0 Grade III|ADRE 3\\.0 Grade IV|DHS & DME Technical|DHS & DME Non-Technical Grade III|DHS & DME Grade IV|DHS & DME|RRB NTPC|Assam Police AB & UB|Assam Police SI|Assam Police|APSC";

function sharpenTitle(title) {
  if (BENEFIT_WORD.test(title) || title.length > 50) return title;
  for (const [re, joiner] of [
    [new RegExp(`^(.+?)\\s+-\\s+(${EXAM_TAIL})$`), " — "],
    [new RegExp(`^(.+?)\\s+for\\s+(${EXAM_TAIL})$`), " for "],
  ]) {
    const m = re.exec(title);
    if (!m) continue;
    const [, base, exam] = m;
    for (const mid of [" Questions with Answers", " Questions & Answers", " MCQs with Answers", " Questions", " MCQs"]) {
      const candidate = `${base}${mid}${joiner}${exam}`;
      if (candidate.length <= TITLE_MAX) return candidate;
    }
  }
  return title;
}

function trimWords(s, max) {
  if (s.length <= max) return s;
  let cut = s.slice(0, max);
  cut = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "");
  return cut + ".";
}

function newTitle(old, h1) {
  const plain = unescape(old);
  for (const [re, to] of TITLE_RULES) {
    if (re.test(plain)) {
      const t = plain.replace(re, to);
      return t.length <= TITLE_MAX ? escape(t) : escape(trimWords(t, TITLE_MAX));
    }
  }
  for (const [re, to] of SHORT_TITLE_RULES) {
    if (re.test(old) || re.test(plain)) return plain.replace(re, to);
  }
  if (plain.length > TITLE_MAX) {
    let t = plain.replace(/\s*\|\s*axomexam$/, "");
    for (const [re, to] of ABBREV) t = t.replace(re, to);
    if (t.length > TITLE_MAX) t = trimWords(t, TITLE_MAX).replace(/\.$/, "");
    if (t.length < TITLE_MIN && h1) t = unescape(h1);
    return escape(t);
  }
  return old; /* short titles are handled by SHORT_TITLE_RULES; leave the rest */
}

let changed = 0, titles = 0, descs = 0;
const seenTitles = new Map(), seenDescs = new Map();
const problems = [];

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (fs.existsSync(path.join(full, "index.html"))) out.push(full);
    walk(full, out);
  }
}

const dirs = [];
walk(ROOT, dirs);
dirs.push(ROOT);
dirs.sort();

for (const dir of dirs) {
  const file = dir === ROOT ? path.join(ROOT, "index.html") : path.join(dir, "index.html");
  let h = fs.readFileSync(file, "utf8");
  const robots = (/<meta name="robots" content="([^"]*)"/i.exec(h) || [])[1] || "";
  if (/noindex/i.test(robots)) continue;

  const tM = /<title>([\s\S]*?)<\/title>/i.exec(h);
  const dM = /<meta name="description" content="([^"]*)"/i.exec(h);
  const h1M = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(h);
  const h1 = h1M ? unescape(h1M[1].replace(/<[^>]+>/g, "")).trim() : "";
  if (!tM || !dM) continue;

  const rel = "/" + path.relative(ROOT, dir).split(path.sep).join("/") + (dir === ROOT ? "" : "/");
  const oldTitle = tM[1].trim();
  const oldDesc = dM[1].trim();
  const plainTitle = unescape(oldTitle);
  const plainDesc = unescape(oldDesc);

  let nextTitle = oldTitle;
  if (plainTitle.length > TITLE_MAX || plainTitle.length < TITLE_MIN) {
    nextTitle = newTitle(oldTitle, h1);
  } else {
    const sharpened = sharpenTitle(plainTitle);
    if (sharpened !== plainTitle) nextTitle = escape(sharpened);
  }

  let nextDesc = oldDesc;
  if (plainDesc.length > DESC_MAX) {
    const primary = rel.startsWith("/as/") ? "" : plainTitle.split(/[—|:]/)[0].replace(/\s+Mock Test.*$/, "").trim();
    nextDesc = escape(compactDesc(plainDesc, primary));
  } else {
    /* Descriptions trimmed by an older run can still end on a fragment.
       Repairing them here keeps the whole site clean on every run. */
    const repaired = stripDanglers(plainDesc);
    if (repaired !== plainDesc) nextDesc = escape(/[.!?]$/.test(repaired) ? repaired : repaired + ".");
  }

  /* Two pages must never share a title. If a rewrite (or a legacy page) lands
     on a title already used, qualify it with the page's own exam/subject
     segment, which is what distinguishes the two pages. */
  let nt = unescape(nextTitle), nd = unescape(nextDesc);
  if (seenTitles.has(nt) && seenTitles.get(nt) !== rel) {
    const segs = rel.split("/").filter(Boolean);
    const qualifier = segs.length > 1 ? segs[1].replace(/-/g, " ") : "";
    if (qualifier) {
      const base = nt.replace(/\s*\|\s*axomexam$/, "");
      const candidate = `${base} — ${qualifier}`;
      if (candidate.length <= TITLE_MAX) {
        nt = candidate;
        nextTitle = escape(candidate);
      }
    }
  }
  /* Assamese packs more meaning per character, so its floor is lower. The
     audit only enforces the floor on English pages anyway. */
  const isAs = rel.startsWith("/as/");
  const tMin = isAs ? 24 : TITLE_MIN, dMin = isAs ? 70 : DESC_MIN;
  if (nt.length > TITLE_MAX || nt.length < tMin) problems.push(`title ${rel} ${nt.length}c — ${nt}`);
  if (nd.length > DESC_MAX || nd.length < dMin) problems.push(`desc  ${rel} ${nd.length}c — ${nd}`);
  if (seenTitles.has(nt) && seenTitles.get(nt) !== rel) problems.push(`dup title ${rel} == ${seenTitles.get(nt)}`);
  if (seenDescs.has(nd) && seenDescs.get(nd) !== rel) problems.push(`dup desc  ${rel} == ${seenDescs.get(nd)}`);
  seenTitles.set(nt, rel); seenDescs.set(nd, rel);

  if (nextTitle !== oldTitle) {
    titles++;
    h = h.replace(/<title>[\s\S]*?<\/title>/i, `<title>${nextTitle}</title>`);
    h = h.split(`<meta property="og:title" content="${oldTitle}"`).join(`<meta property="og:title" content="${nextTitle}"`);
    h = h.split(`<meta name="twitter:title" content="${oldTitle}"`).join(`<meta name="twitter:title" content="${nextTitle}"`);
    h = h.split(`"headline": "${oldTitle}"`).join(`"headline": "${nextTitle}"`);
    h = h.split(`"name": "${oldTitle}"`).join(`"name": "${nextTitle}"`);
  }
  if (nextDesc !== oldDesc) {
    descs++;
    h = h.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${nextDesc}"`);
    h = h.split(`<meta property="og:description" content="${oldDesc}"`).join(`<meta property="og:description" content="${nextDesc}"`);
    h = h.split(`<meta name="twitter:description" content="${oldDesc}"`).join(`<meta name="twitter:description" content="${nextDesc}"`);
    h = h.split(`"description": "${oldDesc}"`).join(`"description": "${nextDesc}"`);
  }

  if (h !== fs.readFileSync(file, "utf8")) {
    changed++;
    if (!DRY) fs.writeFileSync(file, h);
  }
}

console.log(`pages rewritten: ${changed} | titles: ${titles} | descriptions: ${descs}`);
if (problems.length) {
  console.log(`\nstill out of range (${problems.length}):`);
  for (const p of problems.slice(0, 40)) console.log("  " + p);
  process.exitCode = 1;
}
