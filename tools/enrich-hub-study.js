#!/usr/bin/env node
"use strict";

/*
 * tools/enrich-hub-study.js
 *
 * Replaces the thin boilerplate hub block on crawler-facing hub pages with a
 * real study block built from the data the site already ships.
 *
 * Why
 * ---
 * tools/enrich-thin-pages.js lifted the hub pages over the word threshold, but
 * every page in a family got the same sentence pattern with the names swapped
 * ("X is a topic group inside Y ... it contains N questions"). Google reads
 * that as low-value / templated content, which is the AdSense rejection.
 *
 * This tool writes page-specific material instead, drawn from sources that are
 * already on disk and genuinely differ page by page:
 *
 *   data/books/*.json            syllabus-aligned chapters, bilingual
 *   data/exams/<exam>/syllabus.json   the real exam pattern and syllabus text
 *   data/content/**\/*.json      per-topic descriptions and question banks
 *   data/mock-test/**\/*.json    the practice sets behind each mock page
 *   data/counts.json             the live question counts
 *
 * The block is bilingual: every paragraph is emitted as a `<p lang="en">` plus
 * its `<p lang="as">` sibling, the same way the question lists already carry
 * both languages. No translation pass is needed, and the /as/ twin builder
 * copies the pair through untouched.
 *
 * Scope
 * -----
 * Only indexable pages that are still under THIN_WORDS of visible text inside
 * <main>. Utility pages owned by tools/enrich-utility-pages.js are skipped.
 *
 * Idempotent: the block is marker-guarded (data-axo-study="1") and replaced,
 * not appended, on re-run. tools/enrich-thin-pages.js skips any page carrying
 * that marker so the two tools cannot fight.
 *
 * Usage:
 *   node tools/enrich-hub-study.js            # apply
 *   node tools/enrich-hub-study.js --check    # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

const DATA = path.join(ROOT, "data");
const EXAMS_INDEX = path.join(DATA, "exams", "index.json");
const CATEGORIES = path.join(DATA, "categories.json");
const COUNTS_FILE = path.join(DATA, "counts.json");
const BOOKS_DIR = path.join(DATA, "books");
const CONTENT_DIR = path.join(DATA, "content");
const EXAM_DATA = path.join(DATA, "exams");
const MOCK_DIR = path.join(DATA, "mock-test");

const SKIP_DIRS = new Set([".git", "dist", "tools", "data", "js", "css", "images", "app", "node_modules", "as"]);

/* Pages whose block is written by tools/enrich-utility-pages.js. */
const OWNED_ELSEWHERE = new Set([
  "categories/index.html",
  "trending/index.html",
  "submit/index.html",
  "disclaimer/index.html",
  "terms/index.html",
  "downloads/index.html",
  "contact/index.html",
  "about/index.html",
  "sources/index.html",
  "updates/index.html",
  "editorial-policy/index.html",
  "editorial-team/index.html",
  "privacy/index.html",
  "download-app/index.html",
  "ebooks/index.html",
]);
const EXEMPT = new Set(["404.html", "search/index.html"]);

const THIN_WORDS = 500;

const MARK_OPEN = '<section class="section axo-main-content" data-axo-main-content="1" data-axo-study="1"';
const MARK_RE = /<section class="section axo-main-content"[^>]*data-axo-study="1"[\s\S]*?<\/section>/;
const OLD_MARK_RE = /<section class="section axo-main-content"[^>]*data-axo-main-content="1"[\s\S]*?<\/section>/;

const ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ENT[c]);
const AS = /[\u0980-\u09FF]/;

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}
function lang(obj, key) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[key] || obj.en || "";
}
function num(n) {
  return Number(n || 0).toLocaleString("en-IN");
}

/* ---------- data ---------- */

const EXAMS = readJSON(EXAMS_INDEX) || { exams: [] };
const CATS = (readJSON(CATEGORIES) || { categories: [] }).categories;
const COUNTS = readJSON(COUNTS_FILE) || { topicCounts: {}, examSectionCounts: {} };
const TOPIC_COUNTS = COUNTS.topicCounts || {};
const SECTION_COUNTS = COUNTS.examSectionCounts || {};

const BOOKS = (() => {
  const out = [];
  let names = [];
  try {
    names = fs.readdirSync(BOOKS_DIR).filter((n) => n.endsWith(".json"));
  } catch (e) {
    return out;
  }
  for (const n of names) {
    const b = readJSON(path.join(BOOKS_DIR, n));
    if (b && Array.isArray(b.chapters)) out.push(b);
  }
  return out;
})();

/* Subject key of a category sub-category, used to pick the matching book. */
const SUBCAT_SUBJECT = {
  "assam-literature": ["literature"],
  "assam-history": ["history"],
  "indian-history": ["history"],
  polity: ["polity"],
  geography: ["geography"],
  economics: ["economics"],
  "art-culture": ["art-and-culture"],
  "assam-geography": ["geography"],
  "assam-history-culture": ["history", "art-and-culture"],
  "india-general-knowledge": ["history", "geography"],
};

const STOP = new Set(["the", "and", "for", "with", "of", "in", "to", "a", "an", "assam", "india", "indian", "general", "knowledge", "questions", "section", "practice"]);

function tokens(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/* Chapter index: every book chapter with the tokens of its title and book. */
const CHAPTER_INDEX = (() => {
  const out = [];
  for (const b of BOOKS) {
    const bTok = new Set([...tokens(lang(b.title, "en")), ...tokens(b.subjectKey)]);
    for (const c of b.chapters || []) {
      out.push({ chapter: c, book: b, tok: new Set([...tokens(lang(c.title, "en")), ...bTok]) });
    }
  }
  return out;
})();

/* Chapters whose title best matches the given text, most relevant first. This
   is what lets an exam section ("Social Studies", "Logical Reasoning") reach
   the same study material as the matching category page. */
function resolveChapters(text, limit) {
  const want = tokens(text);
  if (!want.length) return [];
  const scored = CHAPTER_INDEX.map((e) => {
    let score = 0;
    for (const t of want) if (e.tok.has(t)) score += 2;
    /* exact word in the title is a stronger signal */
    const title = lang(e.chapter.title, "en").toLowerCase();
    for (const t of want) if (title.includes(t)) score += 1;
    return { e, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.e.chapter);
}

/* Books whose subject matches the text, used when no chapter scores. */
function resolveBooks(text) {
  const want = tokens(text);
  const scored = BOOKS.map((b) => {
    const tok = new Set([...tokens(lang(b.title, "en")), ...tokens(b.subjectKey)]);
    let score = 0;
    for (const t of want) if (tok.has(t)) score += 1;
    return { b, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.map((x) => x.b);
}

function booksFor(subjectKeys) {
  return BOOKS.filter((b) => subjectKeys.includes(b.subjectKey));
}

/* Question count for a category topic path (cat/sub/sec/topic). */
function topicCount(catId, subId, secId, topicId) {
  return TOPIC_COUNTS[[catId, subId, secId, topicId].join("/")] || 0;
}

/* Question count for an exam section path. */
function sectionCount(examId, secId, subId, leafId) {
  const parts = [examId, secId];
  if (subId) parts.push(subId);
  if (leafId) parts.push(leafId);
  return SECTION_COUNTS[parts.join("/")] || 0;
}

/* ---------- markup ---------- */

function panel(inner) {
  return (
    MARK_OPEN +
    ' style="padding-bottom:48px;">\n' +
    '      <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">\n' +
    inner +
    "\n      </div>\n    </section>"
  );
}

const H2 = (t) => `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">${esc(t)}</h2>\n`;
const H2b = (t) => `        <h2 style="color:var(--ink,#0f172a); margin-top:28px;">${esc(t)}</h2>\n`;
const H3 = (t) => `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">${esc(t)}</h3>\n`;

/* A bilingual paragraph pair: English first, then its Assamese sibling. */
function bi(en, as) {
  let out = `        <p lang="en">${esc(en)}</p>\n`;
  if (as && AS.test(as) && as !== en) out += `        <p lang="as">${esc(as)}</p>\n`;
  return out;
}

/* A bilingual bullet list. */
function biList(items) {
  const rows = items
    .map(([en, as]) => {
      const asPart = as && AS.test(as) && as !== en ? ` <span lang="as">${esc(as)}</span>` : "";
      return `          <li lang="en">${esc(en)}${asPart}</li>`;
    })
    .join("\n");
  return `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n${rows}\n        </ul>\n`;
}

/* Long-form bilingual prose from a book chapter. Keeps the source's own
   paragraph breaks and trims to `maxChars` so a page stays readable. */
function biProse(en, as, maxChars) {
  const clip = (s) => {
    const t = String(s || "").trim();
    if (t.length <= maxChars) return t;
    const cut = t.slice(0, maxChars);
    const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("। "));
    return stop > maxChars * 0.6 ? cut.slice(0, stop + 1) : cut;
  };
  const enT = clip(en);
  const asT = clip(as);
  let out = "";
  for (const p of enT.split(/\n{2,}/)) {
    const t = p.trim();
    if (t) out += `        <p lang="en">${esc(t)}</p>\n`;
  }
  for (const p of asT.split(/\n{2,}/)) {
    const t = p.trim();
    if (t && AS.test(t)) out += `        <p lang="as">${esc(t)}</p>\n`;
  }
  return out;
}

function faqHTML(pairs) {
  const rows = pairs
    .map(([q, a]) => `        <h3 style="color:var(--ink,#0f172a); margin-top:18px;">${esc(q)}</h3>\n        <p>${a}</p>\n`)
    .join("");
  return H2b("Frequently asked questions") + rows;
}

/* Pick chapters from the given books for a set of topic ids. Falls back to the
   first chapters of the book when no id matches, so every page still gets real
   material. */
function pickChapters(books, topicIds, limit) {
  const wanted = new Set(topicIds || []);
  const matched = [];
  for (const b of books) {
    for (const c of b.chapters || []) if (wanted.has(c.id)) matched.push(c);
  }
  if (matched.length) return matched.slice(0, limit);
  const out = [];
  for (const b of books) for (const c of b.chapters || []) out.push(c);
  return out.slice(0, limit);
}

/* ---------- real question samples ---------- */

/* Collect question records from the exam tree for a route. A leaf directory
   holds `question-NNN.json`, each a list of question objects. Returns at most
   `limit` records. */
function examQuestions(examId, secId, subId, leafId, limit) {
  let dir = path.join(EXAM_DATA, examId);
  if (secId) dir = path.join(dir, secId);
  if (subId) dir = path.join(dir, subId);
  if (leafId) dir = path.join(dir, leafId);

  const out = [];
  const push = (file) => {
    const d = readJSON(file);
    if (Array.isArray(d)) for (const q of d) out.push(q);
  };
  const collect = (d) => {
    let entries = [];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      if (out.length >= limit) return;
      if (e.isDirectory()) collect(path.join(d, e.name));
      else if (/^question-\d+\.json$/.test(e.name)) push(path.join(d, e.name));
    }
  };
  collect(dir);
  return out.slice(0, limit);
}

/* Collect question records from data/content for a set of topic ids. */
function contentQuestions(topicIds, limit) {
  const wanted = new Set(topicIds || []);
  const out = [];
  const walk = (d) => {
    let entries = [];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      if (out.length >= limit) return;
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (e.name.endsWith(".json")) {
        if (!wanted.has(e.name.slice(0, -5))) continue;
        const j = readJSON(full);
        if (j && Array.isArray(j.questions)) for (const q of j.questions) out.push(q);
      }
    }
  };
  walk(CONTENT_DIR);
  return out.slice(0, limit);
}

/* Normalise the several question shapes the data uses into one form. */
function normQuestion(q) {
  const qEn = lang(q.q, "en") || q.question_en || "";
  const qAs = lang(q.q, "as") || q.question_as || "";
  let opts = [];
  if (Array.isArray(q.options)) {
    opts = q.options.map((o) => [lang(o, "en") || lang(o, "as") || "", lang(o, "as") || ""]);
  } else if (Array.isArray(q.options_en)) {
    opts = q.options_en.map((o, i) => [o, (q.options_as || [])[i] || ""]);
  }
  let answer = "";
  let expl = "";
  if (q.a && (q.a.en || typeof q.a === "string")) answer = lang(q.a, "en");
  else if (q.answer_en) answer = q.answer_en;
  else if (typeof q.correct === "number" && q.options && q.options[q.correct]) answer = lang(q.options[q.correct], "en");
  if (q.explanation) expl = lang(q.explanation, "en");
  else if (q.explanation_en) expl = q.explanation_en;
  else if (q.ex) expl = lang(q.ex, "en");
  return { qEn, qAs, opts, answer, expl, correct: q.correct };
}

/* A short block of real, worked questions — the strongest proof that the page
   holds unique value. */
function sampleQuestionsHTML(records, heading) {
  if (!records || !records.length) return "";
  const items = records
    .map((raw, i) => {
      const q = normQuestion(raw);
      if (!q.qEn) return "";
      let s = `          <li lang="en" style="margin-bottom:14px;"><strong>Q${i + 1}. ${esc(q.qEn)}</strong>`;
      if (q.qAs && AS.test(q.qAs)) s += ` <span lang="as" style="color:#64748b;">${esc(q.qAs)}</span>`;
      if (q.opts.length) {
        s += `<br />${q.opts
          .map(([en, as], j) => `(${String.fromCharCode(65 + j)}) ${esc(en)}${as && AS.test(as) ? ` <span lang="as" style="color:#64748b;">${esc(as)}</span>` : ""}`)
          .join(" &nbsp; ")}`;
      }
      if (q.answer) s += `<br /><em>Answer:</em> ${esc(q.answer)}`;
      if (q.expl) s += ` <em>Explanation:</em> ${esc(q.expl)}`;
      return s + "</li>";
    })
    .filter(Boolean)
    .join("\n");
  if (!items) return "";
  return (
    H2b(heading) +
    bi(
      "A few worked questions from this page, with the marked answer and the explanation, so you can see the level and the format before you start practising.",
      ""
    ) +
    `        <ul style="margin:8px 0 0 20px; line-height:1.8;">\n${items}\n        </ul>\n`
  );
}

/* ---------- block builders ---------- */

/* category/<cat>/<sub>/ — the subject hub pages. */
function categorySubBlock(cat, sub) {
  const secs = sub.sections || [];
  const topics = secs.flatMap((s) => (s.topics || []).map((t) => ({ ...t, sec: s })));
  const engRows = topics.length ? [] : englishTopics(cat.id, sub.id);
  const total = topics.length
    ? topics.reduce((a, t) => a + topicCount(cat.id, sub.id, t.sec.id, t.id), 0)
    : engRows.reduce((a, r) => a + r.questions.length, 0);
  const nameEn = lang(sub.name, "en");
  const nameAs = lang(sub.name, "as");
  const catEn = lang(cat.name, "en");

  const books = booksFor(SUBCAT_SUBJECT[sub.id] || []);
  const chapters = books.length ? pickChapters(books, topics.map((t) => t.id), 3) : resolveChapters(`${nameEn} ${catEn}`, 3);

  let out = "";
  out += H2(`${nameEn} — ${catEn} for Assam competitive exams`);
  if (topics.length) {
    out += bi(
      `${nameEn}${nameAs && AS.test(nameAs) ? ` (${nameAs})` : ""} is one subject inside ${catEn} on axomexam. It carries ${num(total)} bilingual practice questions across ${topics.length} topics, grouped into ${secs.length} part${secs.length === 1 ? "" : "s"}. Every question has four options, a marked answer and a worked explanation in Assamese and English.`,
      `${nameAs} হৈছে axomexam ৰ ${lang(cat.name, "as")} শিতানৰ এটা বিষয়। ইয়াত ${num(total)} টা দ্বিভাষিক অনুশীলন প্ৰশ্ন আছে, যিবোৰ ${topics.length} টা বিষয়ত আৰু ${secs.length} টা ভাগত সজোৱা হৈছে।`
    );
  } else {
    out += bi(
      `${nameEn}${nameAs && AS.test(nameAs) ? ` (${nameAs})` : ""} is one subject inside ${catEn} on axomexam, taught topic by topic. It carries ${num(total)} bilingual practice questions across ${engRows.length} topics. Every question has four options, a marked answer and a worked explanation in Assamese and English.`,
      `${nameAs} হৈছে axomexam ৰ ${lang(cat.name, "as")} শিতানৰ এটা বিষয়। ইয়াত ${num(total)} টা দ্বিভাষিক অনুশীলন প্ৰশ্ন আছে।`
    );
  }

  /* English-style subjects keep their topics as separate pages instead of a
     section tree, so list them from the real topic data. */
  if (!topics.length) {
    out += englishSubjectBlock(cat.id, sub.id, nameEn, catEn);
  }

  /* Real study material from the matching e-book. */
  if (chapters.length) {
    out += H2b(`${nameEn}: study notes`);
    out += bi(
      `The notes below are drawn from the axomexam ${nameEn} study material and follow the syllabus order used by ADRE, Assam Police, APSC and other Assam recruitment papers. Read a chapter, then open the matching topic above to attempt its questions.`,
      ""
    );
    for (const c of chapters) {
      const cEn = lang(c.title, "en");
      out += H3(cEn);
      out += biProse(lang(c.content, "en"), lang(c.content, "as"), 1100);
    }
  }

  /* Real worked questions from the same topic bank. */
  out += sampleQuestionsHTML(contentQuestions(topics.map((t) => t.id), 5), `${nameEn}: worked questions`);

  /* Coverage table with the real per-topic counts. */
  if (topics.length) {
    out += H2b(`Topic-wise coverage in ${nameEn}`);
    out += bi(
      `The list below is the live question count for every topic in ${nameEn}. Use it to see which areas carry the most weight before you plan your revision.`,
      ""
    );
    out += biList(
      topics.map((t) => {
        const n = topicCount(cat.id, sub.id, t.sec.id, t.id);
        return [`${lang(t.name, "en")} — ${num(n)} questions.`, lang(t.name, "as")];
      })
    );
  }

  out += H2b(`How to prepare ${nameEn}`);
  out += biList([
    ["Work through one topic at a time and read the explanation for every answer you miss.", ""],
    ["Keep a one-page note of the facts you keep forgetting and revise it before each session.", ""],
    ["Re-attempt the same topic after a few days to check whether it has stuck.", ""],
    ["Practise in both Assamese and English so the same fact is recognised in either language.", ""],
    ["Attempt a timed set of 20 questions once a topic is finished, to build exam speed.", ""],
  ]);

  out += faqHTML([
    [
      `How many ${nameEn} questions are on axomexam?`,
      `There are ${num(total)} ${esc(nameEn)} questions across ${topics.length} topics. Each one is bilingual and comes with a marked answer and an explanation.`,
    ],
    [
      `Which topics are covered under ${nameEn}?`,
      topics.length
        ? `The topics are ${topics.map((t) => esc(lang(t.name, "en"))).join(", ")}.`
        : `The topics are ${engRows.map((r) => esc(r.title)).join(", ")}.`,
    ],
    [
      `Is ${nameEn} useful for ADRE, Assam Police and APSC?`,
      `Yes. The ${nameEn} topics follow the syllabus shared by ADRE, Assam Police, APSC and other Assam recruitment examinations, so the same preparation serves several papers.`,
    ],
    [
      `Is the ${nameEn} material free?`,
      `Yes. Every question, explanation and note on axomexam.in is free to read, with no login or payment.`,
    ],
  ]);
  return panel(out);
}

/* category/<cat>/<sub>/<sec>/ and mock-test/<cat>/<sub>/<sec>/ — the part-level
   hub inside a subject. */
function sectionHubBlock(cat, sub, sec, kind) {
  const topics = sec.topics || [];
  const nameEn = lang(sec.name, "en");
  const nameAs = lang(sec.name, "as");
  const subEn = lang(sub.name, "en");
  const catEn = lang(cat.name, "en");
  const total = topics.reduce((a, t) => a + topicCount(cat.id, sub.id, sec.id, t.id), 0);
  const mock = kind === "mock";

  const chapters = resolveChapters(`${nameEn} ${subEn}`, 2);

  let out = "";
  out += H2(`${nameEn} — ${subEn}`);
  out += bi(
    `${nameEn}${nameAs && AS.test(nameAs) ? ` (${nameAs})` : ""} is one part of ${subEn} in the ${catEn} section. It holds ${topics.length} topic${topics.length === 1 ? "" : "s"} and ${num(total)} bilingual practice questions, each with four options, a marked answer and a worked explanation.${mock ? ` Pick a topic below to begin a timed mock test on it.` : ""}`,
    ""
  );

  if (chapters.length) {
    out += H2b(`${nameEn}: study notes`);
    for (const c of chapters) {
      out += H3(lang(c.title, "en"));
      out += biProse(lang(c.content, "en"), lang(c.content, "as"), 1000);
    }
  }

  out += sampleQuestionsHTML(contentQuestions(topics.map((t) => t.id), 4), `${nameEn}: worked questions`);

  out += H2b(`Topics in ${nameEn}`);
  out += biList(
    topics.map((t) => {
      const n = topicCount(cat.id, sub.id, sec.id, t.id);
      return [`${lang(t.name, "en")} — ${num(n)} questions.`, lang(t.name, "as")];
    })
  );

  out += H2b(`How to use this part`);
  out += biList([
    ["Open a topic above and attempt its questions without looking at the answers.", ""],
    ["Read the explanation for every miss and note the fact behind it.", ""],
    ["Revise the same topic after a few days to check retention.", ""],
    [mock ? `Re-attempt the timed set until you clear it comfortably within the clock.` : `Then take the matching ${subEn} mock test to measure your speed.`, ""],
  ]);

  out += faqHTML([
    [
      `What is covered under ${nameEn}?`,
      `${esc(nameEn)} covers ${topics.map((t) => esc(lang(t.name, "en"))).join(", ")} — ${num(total)} bilingual questions in all.`,
    ],
    [
      `Is ${nameEn} part of the ${subEn} syllabus?`,
      `Yes. ${esc(nameEn)} is one part of ${esc(subEn)}, which in turn sits inside the ${esc(catEn)} section used by ADRE, Assam Police, APSC and other Assam recruitment papers.`,
    ],
    [
      `Are the questions free and bilingual?`,
      `Yes. Every question, option and explanation is free to read in both Assamese and English, with no login.`,
    ],
  ]);
  return panel(out);
}

/* category/<cat>/ — the category root hub. */
function categoryRootBlock(cat) {
  const subs = cat.subcategories || [];
  const catEn = lang(cat.name, "en");
  const catAs = lang(cat.name, "as");
  const descEn = lang(cat.description, "en");
  const descAs = lang(cat.description, "as");
  const totals = subs.map((s) => ({
    s,
    topics: (s.sections || []).reduce((a, sec) => a + (sec.topics || []).length, 0),
    n: (s.sections || []).reduce((a, sec) => a + (sec.topics || []).reduce((b, t) => b + topicCount(cat.id, s.id, sec.id, t.id), 0), 0),
  }));
  const total = totals.reduce((a, x) => a + x.n, 0);

  const chapters = resolveChapters(`${catEn} Assam`, 3);

  let out = "";
  out += H2(`${catEn} for Assam competitive exams`);
  out += bi(
    `${catEn}${catAs && AS.test(catAs) ? ` (${catAs})` : ""} on axomexam carries ${num(total)} bilingual practice questions across ${subs.length} subjects and ${totals.reduce((a, x) => a + x.topics, 0)} topics. Every question is written for ADRE, Assam Police, APSC, SSC and Railway papers, with four options, the marked answer and a worked explanation.`,
    ""
  );
  if (descEn) {
    out += biProse(descEn, descAs, 1200);
  }

  if (chapters.length) {
    out += H2b(`${catEn}: study notes`);
    for (const c of chapters) {
      out += H3(lang(c.title, "en"));
      out += biProse(lang(c.content, "en"), lang(c.content, "as"), 900);
    }
  }

  out += H2b(`Subjects inside ${catEn}`);
  out += biList(
    totals.map((x) => [`${lang(x.s.name, "en")} — ${x.topics} topics, ${num(x.n)} questions.`, lang(x.s.name, "as")])
  );

  out += H2b(`How to study ${catEn}`);
  out += biList([
    ["Pick the subject you are weakest in and start there.", ""],
    ["Finish one topic, read every explanation, then move to the next.", ""],
    ["Revise the topics you keep forgetting at the end of each week.", ""],
    ["Take a timed mock test once a whole subject is complete.", ""],
  ]);

  out += faqHTML([
    [
      `How many ${catEn} questions are on axomexam?`,
      `There are ${num(total)} ${esc(catEn)} questions across ${subs.length} subjects, each with four options, a marked answer and an explanation.`,
    ],
    [
      `What subjects are covered under ${catEn}?`,
      `The subjects are ${subs.map((s) => esc(lang(s.name, "en"))).join(", ")}.`,
    ],
    [
      `Is ${catEn} useful for ADRE, Assam Police and APSC?`,
      `Yes. ${esc(catEn)} follows the syllabus shared by these examinations, so one round of preparation serves several papers.`,
    ],
    [`Is the material free?`, `Yes. Every question, note and mock test on axomexam.in is free, with no login.`],
  ]);
  return panel(out);
}

/* exams/ — the exams root hub. */
function examsRootBlock() {
  const all = EXAMS.exams || [];
  const withSecs = all.filter((e) => (e.sections || []).filter((s) => s.type !== "syllabus").length);
  const paperOnly = all.filter((e) => !(e.sections || []).filter((s) => s.type !== "syllabus").length);

  let out = "";
  out += H2(`Exam-wise practice on axomexam`);
  out += bi(
    `axomexam organises its bilingual practice material by recruitment exam, then by subject and sub-category. Each exam below opens into its own book of sections, and every section holds question-wise MCQs with answers and worked explanations.`,
    ""
  );
  out += H2b(`Exams with a full question book`);
  out += biList(
    withSecs.map((e) => {
      const secs = (e.sections || []).filter((s) => s.type !== "syllabus");
      const n = secs.reduce((a, s) => a + sectionCount(e.id, s.id), 0);
      return [`${lang(e.title, "en")} — ${secs.length} subjects, ${num(n)} questions.`, lang(e.title, "as")];
    })
  );
  for (const e of withSecs) {
    const secs = (e.sections || []).filter((s) => s.type !== "syllabus");
    out += H3(lang(e.title, "en"));
    out += bi(
      `The ${lang(e.title, "en")} book is divided into ${secs.map((s) => lang(s.title, "en")).join(", ")}, with ${num(secs.reduce((a, s) => a + sectionCount(e.id, s.id), 0))} bilingual practice questions in all.`,
      ""
    );
  }
  if (paperOnly.length) {
    out += H2b(`Exams with previous year papers`);
    out += bi(
      `For the examinations below the axomexam question book is still being built, but the previous year question papers and matching general-studies notes are already published, so you can start preparing from the real papers straight away.`,
      ""
    );
    out += biList(paperOnly.map((e) => [`${lang(e.title, "en")} — previous year papers and study notes.`, lang(e.title, "as")]));
  }
  out += H2b(`How to use the exam books`);
  out += biList([
    ["Pick your exam, then the subject you want to revise first.", ""],
    ["Work through the sub-categories in order and read the explanation after each answer.", ""],
    ["Switch between Assamese and English to reinforce the same fact in both languages.", ""],
    ["Take a full mock test once you have covered every subject.", ""],
    ["Attempt a previous year paper in the final weeks to check your speed.", ""],
  ]);
  out += faqHTML([
    [
      `Which exams can I prepare for on axomexam?`,
      `The exam books currently published are ${withSecs.map((e) => esc(lang(e.title, "en"))).join(", ")}. Each book carries the full syllabus broken into subjects and sub-categories.`,
    ],
    [`Is the practice material free?`, `Yes. Every question, explanation, mock test and PDF note on axomexam is free and needs no sign-up.`],
    [`Are the questions bilingual?`, `Every question is written in Assamese and English, and you can switch language on any practice page.`],
  ]);
  return panel(out);
}

/* topic/<cat>/<sub>[/<sec>]/<leaf>/ — the practice topic page. Most of these
   already carry a full question list; the few that are still thin have a
   deep-article on disk that the runtime loads but the served HTML omits, so
   write that article (both languages) into the page. */
function topicBlock(rel) {
  const seg = rel.split("/").slice(0, -1); // topic, cat, ...leaf
  const leaf = seg[seg.length - 1];

  const deep = (() => {
    const p = path.join(DATA, "deep-articles", rel.replace(/\/index\.html$/, "") + ".json");
    return readJSON(p) || readJSON(path.join(DATA, "deep-articles", "topic", rel.replace(/\/index\.html$/, "") + ".json"));
  })();

  /* The topic's own content file (description + questions). */
  let contentFile = null;
  const tryPaths = [
    path.join(CONTENT_DIR, seg[1], leaf + ".json"),
    path.join(CONTENT_DIR, seg[1], seg[2] || "", leaf + ".json"),
  ];
  for (const p of tryPaths) {
    const j = readJSON(p);
    if (j) {
      contentFile = j;
      break;
    }
  }
  if (!contentFile) {
    /* last resort: search by leaf name */
    const found = (() => {
      let hit = null;
      const walk = (d) => {
        if (hit) return;
        let es = [];
        try {
          es = fs.readdirSync(d, { withFileTypes: true });
        } catch (e) {
          return;
        }
        for (const e of es) {
          if (hit) return;
          const full = path.join(d, e.name);
          if (e.isDirectory()) walk(full);
          else if (e.name === leaf + ".json") hit = readJSON(full);
        }
      };
      walk(CONTENT_DIR);
      return hit;
    })();
    contentFile = found;
  }

  if (!deep && !contentFile) return null;

  const titleEn = lang(contentFile && contentFile.title, "en") || leaf.replace(/-/g, " ");
  const titleAs = lang(contentFile && contentFile.title, "as");
  const descEn = lang(contentFile && contentFile.description, "en");
  const descAs = lang(contentFile && contentFile.description, "as");
  const questions = (contentFile && contentFile.questions) || [];

  let out = "";
  out += H2(`${titleEn}: notes and practice`);
  if (descEn) out += biProse(descEn, descAs, 700);
  else {
    out += bi(
      `${titleEn} is a practice topic on axomexam with ${num(questions.length)} bilingual questions. Every question carries four options, the marked answer and a worked explanation.`,
      titleAs && AS.test(titleAs) ? `${titleAs} হৈছে axomexam ৰ এটা অনুশীলন বিষয়।` : ""
    );
  }

  if (deep && lang(deep, "en")) {
    /* The article is already HTML in both languages; embed it verbatim so the
       headings, lists and tables survive. */
    out += `        <div lang="en">\n${lang(deep, "en")}\n        </div>\n`;
    if (lang(deep, "as") && AS.test(lang(deep, "as"))) {
      out += `        <div lang="as">\n${lang(deep, "as")}\n        </div>\n`;
    }
  }

  out += sampleQuestionsHTML(questions, `${titleEn}: worked questions`);

  out += H2b(`How to use this topic`);
  out += biList([
    ["Read the notes once, then attempt the questions without looking at the answers.", ""],
    ["Check the explanation for every answer you miss and note the fact behind it.", ""],
    ["Re-attempt the topic after a few days to confirm it has stuck.", ""],
    ["Take the matching mock test once the topic is comfortable.", ""],
  ]);

  out += faqHTML([
    [
      `How many ${titleEn} questions are on axomexam?`,
      `There are ${num(questions.length)} ${esc(titleEn)} questions, each with four options, a marked answer and a worked explanation.`,
    ],
    [
      `Are the ${titleEn} questions bilingual?`,
      `Yes. Every question, option and explanation is given in both Assamese and English.`,
    ],
    [`Is ${titleEn} free to study?`, `Yes. The notes, questions and explanations on axomexam.in are free, with no login.`],
  ]);
  return panel(out);
}

/* current-affairs/ — the current affairs hub. */
function currentAffairsBlock() {
  const idx = readJSON(path.join(DATA, "current-affairs", "index.json")) || {};
  const cats = idx.categories || [];

  /* Count the questions actually on disk per category. */
  const rows = cats.map((c) => {
    const dir = path.join(DATA, "current-affairs", c.id);
    let qs = 0;
    let files = 0;
    let es = [];
    try {
      es = fs.readdirSync(dir);
    } catch (e) {
      es = [];
    }
    for (const n of es) {
      if (!/^question-\d+\.json$/.test(n)) continue;
      files++;
      const j = readJSON(path.join(dir, n));
      if (Array.isArray(j)) qs += j.length;
    }
    return { c, qs, files };
  });

  const totalQ = rows.reduce((a, r) => a + r.qs, 0);
  const nameOf = (c) => lang(c.title, "en") || lang(c.name, "en") || c.id.replace(/-/g, " ");

  let out = "";
  out += H2(`Current affairs for Assam competitive exams`);
  out += bi(
    `axomexam keeps a rolling current affairs section for ADRE, Assam Police, APSC, SSC and Railway papers, covering ${cats.length} areas and ${num(totalQ)} questions in all. Each item is bilingual, dated, and written the way it is asked in the exam rather than as a news summary.`,
    ""
  );
  /* The first two intros give the page its own subject-specific prose. */
  for (const r of rows.slice(0, 2)) {
    const introEn = lang(r.c.intro, "en");
    const introAs = lang(r.c.intro, "as");
    if (introEn) {
      out += H3(nameOf(r.c));
      out += biProse(introEn, introAs, 500);
    }
  }
  out += H2b(`What the current affairs section covers`);
  out += biList(
    rows.length
      ? rows.map((r) => [`${nameOf(r.c)} — ${num(r.qs)} questions.`, lang(r.c.title, "as") || lang(r.c.name, "as")])
      : [["Current affairs notes are added as new events are published.", ""]]
  );
  out += H2b(`How to revise current affairs`);
  out += biList([
    ["Read the monthly notes once, then attempt the questions on the same page.", ""],
    ["Focus on awards, appointments, schemes and Assam-specific events, which repeat every year.", ""],
    ["Revise the last six months before the exam rather than the whole year.", ""],
    ["Link each event to the static topic it belongs to, so it is easier to remember.", ""],
  ]);
  out += faqHTML([
    [
      `What does the current affairs section cover?`,
      `It covers ${cats.length} areas, including ${rows.slice(0, 6).map((r) => esc(nameOf(r.c))).join(", ")} and more, with ${num(totalQ)} bilingual questions.`,
    ],
    [`How far back should I revise current affairs?`, `Most papers draw on the last six to twelve months, so a six-month revision with regular updates works well.`],
    [`Is the current affairs material free?`, `Yes. Every note and question on axomexam.in is free, with no login.`],
  ]);
  return panel(out);
}

/* A real, exam-specific "what the paper tests" section built from the exam's
   own subject sections and live question counts. Shared by the previous-year
   and exams-root pages so each one carries genuine, page-specific detail. */
function examSubjectsSection(exam) {
  const secs = (exam.sections || []).filter((s) => s.type !== "syllabus");
  if (!secs.length) return "";
  const examEn = lang(exam.title, "en");
  let out = H2b(`What the ${examEn} paper tests`);
  out += bi(
    `The ${examEn} paper is set in the subjects below. The question counts are the live numbers in the axomexam practice bank, so you can see where the weight of the paper lies and plan your revision around it.`,
    ""
  );
  out += biList(
    secs.map((s) => {
      const n = sectionCount(exam.id, s.id);
      const leaves = (s.subcategories || []).length;
      return [`${lang(s.title, "en")} — ${leaves} sub-categor${leaves === 1 ? "y" : "ies"}, ${num(n)} practice questions.`, lang(s.title, "as")];
    })
  );
  return out;
}

/* A real topic list for a mock subject, from the practice bank. */
function mockTopicsSection(catId, subId) {
  const cat = CATS.find((c) => c.id === catId);
  const sub = cat && (cat.subcategories || []).find((s) => s.id === subId);
  if (!sub) return "";
  const secs = sub.sections || [];
  const topics = secs.flatMap((s) => (s.topics || []).map((t) => ({ ...t, sec: s })));
  if (!topics.length) return "";
  const total = topics.reduce((a, t) => a + topicCount(cat.id, sub.id, t.sec.id, t.id), 0);
  let out = H2b(`Topics tested in the ${lang(sub.name, "en")} mock test`);
  out += bi(
    `The sets draw on the ${topics.length} topics below, ${num(total)} practice questions in all. Attempt the topic sets first, then the mixed sets, so every area is covered before the full test.`,
    ""
  );
  out += biList(
    topics.map((t) => [`${lang(t.name, "en")} — ${num(topicCount(cat.id, sub.id, t.sec.id, t.id))} questions.`, lang(t.name, "as")])
  );
  return out;
}

/* English subjects (grammar, vocabulary, ...) are organised as topic pages
   under topic/<cat>/<sub>/ with their questions in
   data/content/<cat>/<sub>/<leaf>.json (a few are flat). Returns the real
   topic list for a subject so its hub page can show genuine coverage. */
function englishTopics(catId, subId) {
  /* A couple of pages combine two subjects (e.g. "grammar-vocab"). */
  const COMBINED = { "grammar-vocab": ["grammar", "vocabulary"] };
  const ids = COMBINED[subId] || [subId];
  const out = [];
  const seen = new Set();
  for (const id of ids) {
    const base = path.join(ROOT, "topic", catId, id);
    let leaves = [];
    try {
      leaves = fs
        .readdirSync(base, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name);
    } catch (e) {
      continue;
    }
    for (const leaf of leaves) {
      if (seen.has(leaf)) continue;
      seen.add(leaf);
      const j =
        readJSON(path.join(CONTENT_DIR, catId, id, leaf + ".json")) ||
        readJSON(path.join(CONTENT_DIR, catId, leaf + ".json"));
      const row = {
        leaf,
        title: lang(j && j.title, "en") || leaf.replace(/-/g, " "),
        titleAs: lang(j && j.title, "as"),
        descEn: lang(j && j.description, "en"),
        descAs: lang(j && j.description, "as"),
        questions: (j && j.questions) || [],
      };
      if (row.questions.length || row.descEn) out.push(row);
    }
  }
  return out;
}

/* The study block for an English-style subject with no section/topic tree. */
function englishSubjectBlock(catId, subId, nameEn, catEn, withSamples) {
  const rows = englishTopics(catId, subId);
  if (!rows.length) return "";
  const total = rows.reduce((a, r) => a + r.questions.length, 0);
  const allQ = rows.flatMap((r) => r.questions);

  let out = H2b(`Topics covered in ${nameEn}`);
  out += bi(
    `${nameEn} is taught topic by topic on axomexam. Each topic below has its own notes and a question set, ${num(total)} questions in all, every one bilingual with a marked answer and a worked explanation.`,
    ""
  );
  for (const r of rows) {
    out += H3(r.title);
    if (r.descEn) out += biProse(r.descEn, r.descAs, 600);
    out += bi(
      `The ${r.title} set has ${num(r.questions.length)} questions, each with four options, the correct answer and an explanation.`,
      ""
    );
  }
  if (withSamples !== false) out += sampleQuestionsHTML(allQ.slice(0, 5), `${nameEn}: worked questions`);
  return out;
}

/* Real study notes matching an exam's name, used where the exam has no
   structured sections (SSC, Railway, ...) so the page still carries
   subject-specific material rather than only a download link. */
function examStudyNotes(examEn, limit) {
  let chapters = resolveChapters(examEn, limit || 2);
  if (!chapters.length) {
    /* Exams such as SSC and Railway have no subject tree of their own; their
       papers test the core general-studies subjects, so draw from those. */
    chapters = resolveChapters("Indian History Assam Geography Indian Polity Economy General Science", limit || 2);
  }
  if (!chapters.length) return "";
  let out = H2b(`${examEn}: what the paper covers`);
  out += bi(
    `The notes below are drawn from the axomexam study material that matches the ${examEn} paper, so the revision follows the same subjects the examination tests.`,
    ""
  );
  for (const c of chapters) {
    out += H3(lang(c.title, "en"));
    out += biProse(lang(c.content, "en"), lang(c.content, "as"), 800);
  }
  return out;
}

/* A short, page-specific list of real internal links. Unlike the generic
   fallback the links differ per route, so the block is genuinely useful and
   also breaks up the boilerplate similarity between sibling paper/subject
   pages. Returns "" when no real sibling exists. */
function relatedLinksBlock(rel) {
  let seg = rel.split("/").slice(0, -1);
  const isAs = seg[0] === "as";
  if (isAs) seg = seg.slice(1);
  const prefix = isAs ? "/as" : "";
  const self = (isAs ? "/as/" : "/") + seg.join("/") + "/";
  const dirs = (p) => {
    try {
      return fs.readdirSync(path.join(ROOT, p), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
    } catch (e) {
      return [];
    }
  };
  const title = (s) => s.replace(/-/g, " ");
  const links = [];

  if (seg[0] === "previous-year" && seg.length >= 2) {
    const examDir = seg.slice(1, seg.length - 1).join("/");
    const examEn = title(seg[1]);
    if (seg.length >= 3) {
      /* Sibling papers/posts of the same exam. */
      for (const y of dirs(`previous-year/${examDir}`)) {
        if (y !== seg[seg.length - 1]) links.push([`${prefix}/previous-year/${examDir}/${y}/`, `${examEn} ${title(y)}`]);
      }
      links.push([`${prefix}/previous-year/${examDir}/`, `All ${examEn} papers`]);
    }
    links.push([`${prefix}/previous-year/${seg[1]}/`, `${examEn} paper archive`]);
  } else if (seg[0] === "mock-test" && seg.length >= 2) {
    for (const c of dirs("data/mock-test")) {
      if (c !== seg[1]) links.push([`${prefix}/mock-test/${c}/`, `${title(c)} mock tests`]);
    }
    links.push([`${prefix}/mock-test/`, "All mock test subjects"]);
  } else if (seg[0] === "exams") {
    links.push([`${prefix}/previous-year/`, "Previous year question papers"]);
    links.push([`${prefix}/mock-test/`, "Timed mock tests"]);
    links.push([`${prefix}/category/gk/`, "General Knowledge practice"]);
  }

  const seen = new Set();
  const rows = links
    .filter(([h]) => (h === self || seen.has(h) ? false : (seen.add(h), true)))
    .slice(0, 6)
    .map(([h, l]) => `          <li><a href="${h}">${esc(l)}</a></li>`)
    .join("\n");
  if (!rows) return "";

  let out = H2b("Related practice on axomexam");
  out += bi(
    `These pages sit closest to the one you are reading, so the revision continues without a break.`,
    ""
  );
  return out + `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n${rows}\n        </ul>\n`;
}

/* Append the related-links block inside an existing panel. Used to lift a
   hub that lands just under the 500-word bar over it. Idempotent: re-running
   regenerates the same tail. */
function growBlock(block, rel) {
  const extra = relatedLinksBlock(rel);
  if (!extra) return block;
  return block.replace(/\n      <\/div>\n    <\/section>$/, "\n" + extra + "      </div>\n    </section>");
}

/* previous-year/ — the paper archive root. */
function previousYearRootBlock() {
  let years = [];
  try {
    years = fs.readdirSync(path.join(ROOT, "previous-year"), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  } catch (e) {
    years = [];
  }
  const rows = years.map((y) => {
    const exam = EXAMS.exams.find((e) => e.id === y);
    return [`${exam ? lang(exam.title, "en") : y.replace(/-/g, " ")} — solved question papers.`, exam ? lang(exam.title, "as") : ""];
  });

  let out = "";
  out += H2(`Previous year question papers`);
  out += bi(
    `This archive collects solved previous year question papers for Assam and central recruitment examinations, each as a free PDF download. Attempt a paper under exam timing first, then check your answers against the topic-wise practice sets and notes on axomexam.`,
    ""
  );
  out += H2b(`Papers by examination`);
  out += biList(rows.length ? rows : [["Previous year papers are added as new notifications are released.", ""]]);
  out += H2b(`How to use a previous year paper`);
  out += biList([
    ["Attempt the paper in one sitting before looking at any answer key.", ""],
    ["Mark the questions you guessed, even the ones you got right.", ""],
    ["Note the chapters that repeat across years and revise those first.", ""],
    ["Re-attempt the paper a fortnight later and compare the scores.", ""],
  ]);
  out += faqHTML([
    [`Are the previous year papers free?`, `Yes. Every paper is a free PDF download and needs no login or payment.`],
    [`Do the papers come with answers?`, `Each paper is paired with the topic-wise practice sets and study notes on axomexam, so you can check your answers and revise the weak areas.`],
  ]);
  return panel(out);
}

/* previous-year/<exam>/ — one exam's paper archive. */
function previousYearExamBlock(examId) {
  const exam = EXAMS.exams.find((e) => e.id === examId);
  const examEn = exam ? lang(exam.title, "en") : examId.replace(/-/g, " ");
  const dir = path.join(ROOT, "previous-year", examId);
  const entries = (() => {
    try {
      return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
    } catch (e) {
      return [];
    }
  })();

  let out = "";
  out += H2(`${examEn} previous year question papers`);
  out += bi(
    `This page collects the ${examEn} previous year question papers published on axomexam, each as a free PDF. Use them after you finish the ${examEn} syllabus to test yourself on the real paper pattern, then revise the chapters where you lose marks.`,
    ""
  );
  out += exam ? examSubjectsSection(exam) : "";
  out += examStudyNotes(examEn, 2);
  out += H2b(`Papers available for ${examEn}`);
  out += biList(
    entries.length
      ? entries.map((e) => [`${e.replace(/-/g, " ")} — question paper PDF.`, ""])
      : [["Papers are added here as each new notification is released.", ""]]
  );
  out += H2b(`How to use the ${examEn} papers`);
  out += biList([
    ["Attempt each paper under exam timing before checking any answer.", ""],
    ["Note the subjects that carry the most questions and revise them first.", ""],
    ["Compare two years of the same paper to spot the repeating chapters.", ""],
    [`Take a timed ${examEn} mock test after finishing the papers.`, ""],
  ]);
  out += faqHTML([
    [`Are the ${examEn} previous year papers free?`, `Yes. Every paper is free to download and needs no login.`],
    [`How many ${examEn} papers are available?`, `${entries.length ? `There are ${entries.length} paper collection${entries.length === 1 ? "" : "s"} on this page.` : `Papers are added as each new notification is released.`}`],
  ]);
  return panel(out);
}

/* exams/<exam>/<section>/<sub>/ — the topic-group page. */
function examSubBlock(exam, sec, sub) {
  const leaves = sub.subcategories || [];
  const examEn = lang(exam.title, "en");
  const secEn = lang(sec.title, "en");
  const subEn = lang(sub.title, "en");
  const subAs = lang(sub.title, "as");
  const total = sectionCount(exam.id, sec.id, sub.id);

  const books = booksFor(SUBCAT_SUBJECT[sec.id] || []);
  const chapters = books.length ? pickChapters(books, leaves.map((l) => l.id), 2) : resolveChapters(`${subEn} ${secEn}`, 2);

  let out = "";
  out += H2(`${subEn} for ${examEn}`);
  out += bi(
    `${subEn}${subAs && AS.test(subAs) ? ` (${subAs})` : ""} is a topic group inside ${secEn} for the ${examEn} syllabus. It holds ${num(total)} bilingual questions across ${leaves.length} topics, each with four options, a marked answer and a worked explanation.`,
    `${subAs} হৈছে ${examEn} ৰ ${lang(sec.title, "as")} শিতানৰ এটা বিষয়-গোট। ইয়াত ${leaves.length} টা বিষয়ত ${num(total)} টা দ্বিভাষিক প্ৰশ্ন আছে।`
  );

  if (chapters.length) {
    out += H2b(`${subEn}: notes`);
    for (const c of chapters) {
      out += H3(lang(c.title, "en"));
      out += biProse(lang(c.content, "en"), lang(c.content, "as"), 900);
    }
  } else {
    out += examStudyNotes(subEn, 2);
  }

  out += sampleQuestionsHTML(examQuestions(exam.id, sec.id, sub.id, null, 4), `${subEn}: worked questions`);

  out += H2b(`Topics inside ${subEn}`);
  out += biList(
    leaves.map((l) => {
      const n = sectionCount(exam.id, sec.id, sub.id, l.id);
      return [`${lang(l.title, "en")} — ${num(n)} question${n === 1 ? "" : "s"}.`, lang(l.title, "as")];
    })
  );

  out += H2b(`How to prepare ${subEn}`);
  out += biList([
    ["Attempt each topic fully before checking the answers.", ""],
    ["Note the rule behind every question you get wrong, not just the answer.", ""],
    ["Return to the same topic after a few days to confirm retention.", ""],
    [`Take the matching ${examEn} mock test once the group is finished.`, ""],
  ]);

  out += faqHTML([
    [
      `How many questions are under ${subEn}?`,
      `${esc(subEn)} holds ${num(total)} bilingual questions across ${leaves.length} topics, part of the ${esc(secEn)} section of the ${esc(examEn)} book.`,
    ],
    [
      `Which topics are inside ${subEn}?`,
      `The topics are ${leaves.map((l) => esc(lang(l.title, "en"))).join(", ")}.`,
    ],
    [
      `Are these questions bilingual?`,
      `Yes. Every question, option and explanation is given in both Assamese and English, so the same idea is reinforced in either language.`,
    ],
  ]);
  return panel(out);
}

/* exams/<exam>/<section>/ — the subject hub page. */
function examSectionBlock(exam, sec) {
  const subs = sec.subcategories || [];
  const examEn = lang(exam.title, "en");
  const secEn = lang(sec.title, "en");
  const total = sectionCount(exam.id, sec.id);

  const syllabus = readJSON(path.join(EXAM_DATA, exam.id, "syllabus.json"));
  const chapter = syllabus && (syllabus.chapters || []).find((c) => {
    const t = lang(c.title, "en").toLowerCase();
    const s = secEn.toLowerCase();
    return t === s || s.includes(t) || t.includes(s);
  });
  const extraChapters = chapter ? [] : resolveChapters(secEn, 1);

  let out = "";
  out += H2(`${secEn} for ${examEn}`);
  out += bi(
    `${secEn} is one subject in the ${examEn} syllabus. On axomexam it holds ${num(total)} bilingual practice questions across ${subs.length} sub-categories, every question carrying four options, the correct answer and a worked explanation.`,
    `${lang(sec.title, "as")} হৈছে ${examEn} ৰ পাঠ্যক্ৰমৰ এটা বিষয়। axomexam ত ইয়াত ${subs.length} টা উপ-শ্ৰেণীত ${num(total)} টা দ্বিভাষিক প্ৰশ্ন আছে।`
  );

  if (chapter && lang(chapter.content, "en")) {
    out += H2b(`${secEn}: syllabus and what is asked`);
    out += biProse(lang(chapter.content, "en"), lang(chapter.content, "as"), 1600);
  } else if (extraChapters.length) {
    out += H2b(`${secEn}: study notes`);
    for (const c of extraChapters) {
      out += H3(lang(c.title, "en"));
      out += biProse(lang(c.content, "en"), lang(c.content, "as"), 1100);
    }
  }

  out += sampleQuestionsHTML(examQuestions(exam.id, sec.id, null, null, 4), `${secEn}: worked questions`);

  out += H2b(`Sub-categories in ${secEn}`);
  out += biList(
    subs.map((s) => {
      const n = sectionCount(exam.id, sec.id, s.id);
      return [`${lang(s.title, "en")} — ${num(n)} question${n === 1 ? "" : "s"}.`, lang(s.title, "as")];
    })
  );

  out += H2b(`How to prepare ${secEn}`);
  out += biList([
    ["Start with the sub-category that carries the most questions.", ""],
    ["Finish one sub-category at a time and read every explanation.", ""],
    ["Write down the facts you miss and revise the list weekly.", ""],
    ["Take a timed set once the subject is complete.", ""],
  ]);

  out += faqHTML([
    [
      `How many ${secEn} questions are there for ${examEn}?`,
      `This section holds ${num(total)} questions across ${subs.length} sub-categories, each with four options, a marked answer and a worked explanation.`,
    ],
    [
      `What is covered under ${secEn}?`,
      `The sub-categories are ${subs.map((s) => esc(lang(s.title, "en"))).join(", ")}.`,
    ],
    [
      `How should I revise ${secEn}?`,
      `Finish one sub-category at a time, read the explanation for every answer you miss, then re-attempt the same set after a few days.`,
    ],
  ]);
  return panel(out);
}

/* exams/<exam>/ — the exam hub page, built from the real syllabus file. */
function examPageBlock(exam) {
  const secs = (exam.sections || []).filter((s) => s.type !== "syllabus");
  const examEn = lang(exam.title, "en");
  const sub = lang(exam.subtitle, "en");
  const total = secs.reduce((a, s) => a + sectionCount(exam.id, s.id), 0);

  const syllabus = readJSON(path.join(EXAM_DATA, exam.id, "syllabus.json"));
  let chapters = (syllabus && syllabus.chapters) || [];
  if (!chapters.length) {
    /* No syllabus file (APSC, SSC, Railway, ...): use the book chapters that
       match the exam's own subject sections, so the page still carries real
       study material. */
    const seen = new Set();
    chapters = [];
    for (const s of secs) {
      for (const c of resolveChapters(lang(s.title, "en"), 1)) {
        if (!seen.has(c.id)) {
          seen.add(c.id);
          chapters.push(c);
        }
      }
    }
    chapters = chapters.slice(0, 5);
  }

  let out = "";
  out += H2(`${examEn} exam pattern and syllabus`);
  out += bi(
    `${examEn}${sub ? ` (${sub})` : ""} preparation on axomexam covers ${secs.length} subject sections and ${num(total)} bilingual practice questions. The pattern and syllabus below follow the official notification; always confirm the current numbers on the official portal before the final weeks.`,
    ""
  );

  for (const c of chapters) {
    const t = lang(c.title, "en");
    out += H3(t);
    out += biProse(lang(c.content, "en"), lang(c.content, "as"), 1400);
  }

  out += sampleQuestionsHTML(examQuestions(exam.id, null, null, null, 4), `${examEn}: worked questions`);

  out += H2b(`Subject-wise question bank for ${examEn}`);
  out += biList(
    secs.map((s) => {
      const n = sectionCount(exam.id, s.id);
      const leaves = (s.subcategories || []).length;
      return [`${lang(s.title, "en")} — ${leaves} sub-categories, ${num(n)} questions.`, lang(s.title, "as")];
    })
  );

  out += faqHTML([
    [
      `What is the ${examEn} exam pattern?`,
      chapters[0] ? esc(lang(chapters[0].content, "en").split("\n")[0]) : `The ${esc(examEn)} paper is objective and multiple-choice, set in the subjects listed above.`,
    ],
    [
      `How many ${examEn} questions are on axomexam?`,
      `The ${esc(examEn)} book holds ${num(total)} practice questions across ${secs.length} subject sections, each with an answer and an explanation.`,
    ],
    [
      `Which subjects are covered in ${examEn}?`,
      `The book is divided into ${secs.map((s) => esc(lang(s.title, "en"))).join(", ")}.`,
    ],
    [
      `Is the ${examEn} material free?`,
      `Yes. The whole book is free to read online, in Assamese and English, with no sign-up.`,
    ],
  ]);
  return panel(out);
}

/* mock-test/<cat>/<sub>/<sec>/ — the part-level mock hub. The data lives at
   mock-test/<cat>/<sub>/ but the section name is the category.json part that
   matches it, so reuse the same block builder. */
function mockSectionBlock(catId, subId, secId) {
  const cat = CATS.find((c) => c.id === catId);
  const sub = cat && (cat.subcategories || []).find((s) => s.id === subId);
  const sec = sub && (sub.sections || []).find((s) => s.id === secId);
  if (sec) return sectionHubBlock(cat, sub, sec, "mock");
  return mockSubBlock(catId, subId);
}

/* mock-test/<cat>/<sub>/ — the mock subject hub. */
function mockSubBlock(catId, subId) {
  const dir = path.join(MOCK_DIR, catId, subId);
  let sets = [];
  try {
    sets = fs.readdirSync(dir).filter((n) => /^set-\d+\.json$/.test(n));
  } catch (e) {
    sets = [];
  }
  let questions = 0;
  const records = [];
  for (const s of sets) {
    const d = readJSON(path.join(dir, s));
    if (!d) continue;
    const qs = d.questions || [];
    questions += qs.length;
    for (const q of qs) if (records.length < 4) records.push(q);
  }
  const catName = catId.replace(/-/g, " ");
  const subName = subId.replace(/-/g, " ");
  const engRows = sets.length ? [] : englishTopics(catId, subId);
  const engTotal = engRows.reduce((a, r) => a + r.questions.length, 0);

  let out = "";
  out += H2(`${subName} mock test`);
  if (sets.length) {
    out += bi(
      `This page holds ${sets.length} timed ${subName} mock test set${sets.length === 1 ? "" : "s"} with ${num(questions)} questions in total, all bilingual (Assamese and English). Each set is timed, and every question carries four options, the correct answer and a worked explanation.`,
      ""
    );
  } else {
    out += bi(
      `This page brings together the ${subName} practice material on axomexam: ${engRows.length} topics and ${num(engTotal)} bilingual questions, every one with four options, the correct answer and a worked explanation. Attempt them topic by topic, then take a timed set to measure your speed.`,
      ""
    );
  }
  out += sampleQuestionsHTML(records.length ? records : engRows.flatMap((r) => r.questions).slice(0, 4), `A sample of the ${subName} questions`);
  const topicsSec = mockTopicsSection(catId, subId);
  out += topicsSec;
  /* English-style subjects have no section tree, so fall back to the real
     topic data; a few (e.g. computer/ms-office) have neither, so use the
     matching book notes instead. */
  if (!topicsSec) {
    const eng = englishSubjectBlock(catId, subId, subName, catName, false);
    out += eng || examStudyNotes(subName, 2);
  }
  out += H2b(`How to use the ${subName} mock test`);
  out += biList([
    ["Attempt a set under the timer without pausing, to copy exam conditions.", ""],
    ["Read the explanation for every question you got wrong immediately after the set.", ""],
    ["Note the topic behind each mistake and revise that topic before the next set.", ""],
    ["Re-attempt the same set after a week and compare your score.", ""],
  ]);
  out += faqHTML([
    [
      `How many ${subName} mock test sets are there?`,
      `There are ${sets.length} sets with ${num(questions)} questions in total, all free to attempt.`,
    ],
    [
      `Are the ${subName} questions bilingual?`,
      `Yes. Every question, option and explanation is in Assamese and English.`,
    ],
    [
      `Is the ${subName} mock test free?`,
      `Yes. Every set on axomexam.in is free, with no login or subscription.`,
    ],
  ]);
  return panel(out);
}

/* mock-test/<cat>/ — the mock category hub. */
function mockCatBlock(catId) {
  const dir = path.join(MOCK_DIR, catId);
  let subs = [];
  try {
    subs = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  } catch (e) {
    subs = [];
  }
  let sets = 0;
  let questions = 0;
  const rows = [];
  for (const s of subs) {
    const d = path.join(dir, s);
    let files = [];
    try {
      files = fs.readdirSync(d).filter((n) => /^set-\d+\.json$/.test(n));
    } catch (e) {
      files = [];
    }
    let q = 0;
    for (const f of files) {
      const j = readJSON(path.join(d, f));
      if (j) q += (j.questions || []).length;
    }
    sets += files.length;
    questions += q;
    rows.push([s, files.length, q]);
  }
  const catName = catId.replace(/-/g, " ");

  let out = "";
  out += H2(`${catName} mock tests`);
  out += bi(
    `axomexam publishes ${sets} timed ${catName} mock test sets across ${subs.length} subjects, ${num(questions)} questions in all. Each set is bilingual and every question has four options, the correct answer and a worked explanation.`,
    ""
  );
  out += H2b(`Subjects with ${catName} mock tests`);
  out += biList(
    rows.map(([s, n, q]) => [`${s.replace(/-/g, " ")} — ${n} set${n === 1 ? "" : "s"}, ${num(q)} questions.`, ""])
  );
  out += H2b(`How to use the ${catName} mock tests`);
  out += biList([
    ["Attempt one full set under the timer to copy the real exam.", ""],
    ["Review every wrong answer and its explanation before the next set.", ""],
    ["Alternate between subjects so no area is left unpractised.", ""],
    ["Track your score on each set and re-attempt the weakest subject first.", ""],
    ["Do one full mixed set every week in the final month before the exam.", ""],
  ]);
  out += faqHTML([
    [`How many ${catName} mock tests are there?`, `There are ${sets} sets covering ${subs.length} subjects, with ${num(questions)} questions in total.`],
    [`How should I plan the ${catName} mock tests?`, `Start with the subject you are weakest in, attempt one set at a time, review every mistake, then move to mixed sets closer to the exam.`],
    [`Are the ${catName} mock tests free?`, `Yes. Every set on axomexam.in is free and needs no login.`],
  ]);
  return panel(out);
}

/* previous-year/<exam>/[<post>/]<year>/ — the paper page. */
function previousYearBlock(rel) {
  const parts = rel.split("/").filter(Boolean); // previous-year, exam, [post], year
  const examId = parts[1] || "";
  const year = parts[parts.length - 1];
  const exam = EXAMS.exams.find((e) => e.id === examId);
  const examEn = exam ? lang(exam.title, "en") : examId.replace(/-/g, " ");
  const post = parts.length === 4 ? parts[2].replace(/-/g, " ") : "";

  let out = "";
  out += H2(`${examEn} ${post ? post + " " : ""}${year} question paper`);
  out += bi(
    `This is the ${examEn}${post ? ` (${post})` : ""} ${year} previous year question paper, available as a free PDF download. Attempt it under a timer first, then compare your answers with the keys and study notes on axomexam.`,
    ""
  );
  out += exam ? examSubjectsSection(exam) : "";
  out += examStudyNotes(examEn, 2);
  out += H2b(`How to use a previous year paper`);
  out += biList([
    ["Attempt the paper in one sitting under exam timing before looking at any key.", ""],
    ["Mark the questions you guessed, even the ones you got right.", ""],
    ["Note the chapters that repeat, and revise those first.", ""],
    ["Re-attempt the paper a fortnight later and compare the scores.", ""],
  ]);
  out += faqHTML([
    [`Is the ${examEn} ${year} paper free to download?`, `Yes. The PDF is free and needs no login or payment.`],
    [`Does the paper come with answers?`, `The paper is paired with the topic-wise practice sets and notes on axomexam so you can check your answers and revise the weak areas.`],
  ]);
  return panel(out);
}

/* ---------- classification ---------- */

function mainWordCount(html) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  const text = m[1]
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

/* Returns the study block for a page route, or null when this tool has no
   model for it. */
function blockFor(rel) {
  const seg = rel.split("/").slice(0, -1); // drop index.html

  if (seg[0] === "category") {
    const cat = CATS.find((c) => c.id === seg[1]);
    let sub = cat && (cat.subcategories || []).find((s) => s.id === seg[2]);
    /* A few subject pages exist as directories but are not yet listed in
       categories.json (e.g. "grammar-vocab"); build a minimal stand-in so the
       real topic data on disk still reaches the page. */
    if (cat && !sub && seg.length === 3 && englishTopics(cat.id, seg[2]).length) {
      sub = { id: seg[2], name: { en: seg[2].replace(/-/g, " ") }, sections: [] };
    }
    if (seg.length === 3 && cat && sub) return categorySubBlock(cat, sub);
    if (seg.length === 4 && cat && sub) {
      const sec = (sub.sections || []).find((s) => s.id === seg[3]);
      if (sec) return sectionHubBlock(cat, sub, sec, "category");
    }
    if (seg.length === 2 && cat) return categoryRootBlock(cat);
  }
  if (seg[0] === "exams") {
    const rest = seg.slice(1);
    if (rest.length === 0) return examsRootBlock();
    const exam = EXAMS.exams.find((e) => e.id === rest[0]);
    if (rest.length === 1 && exam) return examPageBlock(exam);
    if (rest.length === 2 && exam) {
      const sec = (exam.sections || []).find((s) => s.id === rest[1]);
      if (sec) return examSectionBlock(exam, sec);
    }
    if (rest.length === 3 && exam) {
      const sec = (exam.sections || []).find((s) => s.id === rest[1]);
      const sub = sec && (sec.subcategories || []).find((s) => s.id === rest[2]);
      if (sec && sub) return examSubBlock(exam, sec, sub);
    }
  }
  if (seg[0] === "mock-test") {
    if (seg.length === 2) return mockCatBlock(seg[1]);
    if (seg.length === 3) return mockSubBlock(seg[1], seg[2]);
    if (seg.length === 4) return mockSectionBlock(seg[1], seg[2], seg[3]);
  }
  if (seg[0] === "previous-year") {
    if (seg.length === 1) return previousYearRootBlock();
    if (seg.length === 2) return previousYearExamBlock(seg[1]);
    if (seg.length >= 3) return previousYearBlock(seg.join("/"));
  }
  if (seg[0] === "topic" && seg.length >= 4) return topicBlock(rel);
  if (seg[0] === "current-affairs") return currentAffairsBlock();
  return null;
}

/* ---------- main ---------- */

function main() {
  let scanned = 0;
  let written = 0;
  let skippedNoModel = 0;
  const report = [];

  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walk(full);
        continue;
      }
      if (!e.name.endsWith(".html")) continue;
      const rel = path.relative(ROOT, full).split(path.sep).join("/");
      if (rel.split("/").pop() !== "index.html") continue;
      if (OWNED_ELSEWHERE.has(rel) || EXEMPT.has(rel)) continue;

      scanned++;
      const orig = fs.readFileSync(full, "utf8");
      if (/name="robots" content="noindex/.test(orig)) continue;
      if (/http-equiv="refresh"/i.test(orig)) continue;

      const before = mainWordCount(orig);
      if (before === null || before >= THIN_WORDS) continue;

      const block = blockFor(rel);
      if (!block) {
        skippedNoModel++;
        continue;
      }

      let html = orig;
      if (MARK_RE.test(html)) html = html.replace(MARK_RE, block);
      else if (OLD_MARK_RE.test(html)) html = html.replace(OLD_MARK_RE, block);
      else {
        const idx = html.lastIndexOf("</main>");
        if (idx < 0) continue;
        html = html.slice(0, idx) + "\n" + block + "\n  " + html.slice(idx);
      }

      const after0 = mainWordCount(html);
      /* A hub that lands just under the bar is grown with its own sibling
         links, but only when that actually clears the bar - otherwise the
         page keeps the plain block so the run stays idempotent. */
      if (after0 !== null && after0 < THIN_WORDS) {
        const grown = growBlock(block, rel);
        if (grown !== block) {
          let html2 = null;
          if (MARK_RE.test(orig)) html2 = orig.replace(MARK_RE, grown);
          else if (OLD_MARK_RE.test(orig)) html2 = orig.replace(OLD_MARK_RE, grown);
          else {
            const idx = orig.lastIndexOf("</main>");
            if (idx >= 0) html2 = orig.slice(0, idx) + "\n" + grown + "\n  " + orig.slice(idx);
          }
          const a2 = html2 === null ? null : mainWordCount(html2);
          if (a2 !== null && a2 >= THIN_WORDS) html = html2;
        }
      }

      const after = mainWordCount(html);
      if (html === orig) continue;
      written++;
      report.push(`  ${String(before).padStart(4)} -> ${String(after).padStart(5)}  ${rel}`);
      if (!CHECK) fs.writeFileSync(full, html, "utf8");
    }
  };
  walk(ROOT);

  console.log(`${CHECK ? "[check] " : ""}enrich-hub-study`);
  console.log(`  indexable HTML scanned : ${scanned}`);
  console.log(`  pages rewritten        : ${written}`);
  console.log(`  thin, no data model    : ${skippedNoModel}`);
  for (const r of report) console.log(r);
}

main();
