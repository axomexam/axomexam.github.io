#!/usr/bin/env node
"use strict";

/*
 * tools/enrich-thin-pages.js
 *
 * Gives the crawler-facing hub pages real, page-specific content.
 *
 * Problem
 * -------
 * The exam hub pages (exams/, exams/<exam>/, exams/<exam>/<section>/) are
 * built at runtime by js/app.src.js from data/exams/index.json. The committed
 * HTML only holds the breadcrumb and the link cards, so <main> is under ~800
 * characters of text. AdSense reads that as a thin page.
 *
 * What this does
 * --------------
 * Writes a genuine "About this ..." block into <main>, derived from the same
 * data the runtime uses: the exam/section/sub-category titles and the real
 * question counts on disk. Every paragraph carries the actual names and
 * numbers for that page, so no two pages read the same.
 *
 * Ads are left untouched, and nothing is added to <head>.
 *
 * Idempotent: the block is marker-guarded (data-axo-main-content) and is
 * replaced, not appended, on re-run.
 *
 * Usage:
 *   node tools/enrich-thin-pages.js          # apply
 *   node tools/enrich-thin-pages.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const EXAMS_INDEX = path.join(ROOT, "data", "exams", "index.json");
const EXAM_DATA = path.join(ROOT, "data", "exams");
/* Directories that are never crawled: build output, assets and the Assamese
   twins (each /as/ page is an hreflang alternate of an English page and is
   enriched there). */
const SKIP_DIRS = new Set([
  ".git", "dist", "tools", "data", "js", "css", "images", "app",
  "node_modules", "as",
]);
/* Pages whose block is written by tools/enrich-utility-pages.js, which has
   the same data but a longer, page-specific text. */
const OWNED_ELSEWHERE = new Set([
  "categories/index.html",
  "trending/index.html",
  "submit/index.html",
  "disclaimer/index.html",
  "terms/index.html",
  "downloads/index.html",
]);
/* Deliberately minimal pages: the 404 and the search shell. */
const EXEMPT = new Set(["404.html", "search/index.html"]);

const MARK_OPEN = '<section class="section axo-main-content" data-axo-main-content="1"';
const MARK_RE = /<section class="section axo-main-content"[^>]*data-axo-main-content="1"[\s\S]*?<\/section>/;

const ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ENT[c]);
}
function lang(obj, key) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[key] || obj.en || "";
}

/* Count the question files under a data directory. */
function countQuestions(dir) {
  let n = 0;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return 0;
  }
  for (const e of entries) {
    if (e.isDirectory()) n += countQuestions(path.join(dir, e.name));
    else if (/^question-.*\.json$/.test(e.name)) n += 1;
  }
  return n;
}

/* Sum of question files for one section, counting each question file's array. */
function sectionQuestionCount(examId, sectionId) {
  const dir = path.join(EXAM_DATA, examId, sectionId);
  let n = 0;
  const walk = (d) => {
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (/^question-.*\.json$/.test(e.name)) {
        try {
          const arr = JSON.parse(fs.readFileSync(full, "utf8"));
          n += Array.isArray(arr) ? arr.length : 1;
        } catch (err) {
          n += 1;
        }
      }
    }
  };
  walk(dir);
  return n;
}

/* Count of sub-category leaves (folders that hold question files) in a section. */
function sectionLeafCount(examId, sectionId) {
  const dir = path.join(EXAM_DATA, examId, sectionId);
  let n = 0;
  const walk = (d) => {
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch (e) {
      return;
    }
    const hasQ = entries.some((e) => e.isFile() && /^question-.*\.json$/.test(e.name));
    if (hasQ) n += 1;
    for (const e of entries) if (e.isDirectory()) walk(path.join(d, e.name));
  };
  walk(dir);
  return n;
}

function panel(inner) {
  return (
    MARK_OPEN +
    ' style="padding-bottom:48px;">\n' +
    '      <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">\n' +
    inner +
    "\n      </div>\n    </section>"
  );
}

/* A short FAQ written from the page's own data. Every answer carries the real
   names and counts for that page, so no two pages share a question set, and
   the pairs double as FAQPage-style answer text for search snippets. */
function faqHTML(pairs) {
  const rows = pairs
    .map(
      ([q, a]) =>
        `        <h3 style="color:var(--ink,#0f172a); margin-top:18px;">${esc(q)}</h3>\n` +
        `        <p>${a}</p>`
    )
    .join("\n");
  return `        <h2 style="color:var(--ink,#0f172a); margin-top:26px;">Frequently asked questions</h2>\n` + rows;
}

/* ---------- block builders ---------- */

function examsRootBlock(data) {
  const exams = data.exams || [];
  const rows = exams
    .map((e) => {
      const secs = e.sections || [];
      const total = secs.reduce((a, s) => a + sectionQuestionCount(e.id, s.id), 0);
      const as = lang(e.title, "as");
      return `<li><strong>${esc(lang(e.title, "en"))}</strong>${as && as !== lang(e.title, "en") ? ` <span lang="as">${esc(as)}</span>` : ""} — ${secs.length} sections, ${total.toLocaleString("en-IN")} practice questions.</li>`;
    })
    .join("\n          ");
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">Exam-wise practice on axomexam</h2>\n` +
      `        <p>axomexam organises its bilingual (Assamese &amp; English) practice material by recruitment exam, then by subject and sub-category. Each exam below opens into its own set of sections, and every section holds question-wise MCQs with answers and worked explanations.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Exams covered</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to use this section</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Pick your exam, then the subject you want to revise.</li>\n` +
      `          <li>Work through the sub-categories in order and read the explanation after each answer.</li>\n` +
      `          <li>Switch between Assamese and English to reinforce the same concept in both languages.</li>\n` +
      `        </ul>\n` +
      faqHTML([
        ["Which exams can I prepare for on axomexam?",
         `The exam books currently published are ${exams.map((e) => esc(lang(e.title, "en"))).join(", ")}. Each book carries the full syllabus broken into subjects and sub-categories.`],
        ["Is the practice material free?",
         "Yes. Every question, explanation, mock test and PDF note on axomexam is free to read and needs no sign-up or payment."],
        ["Are the questions bilingual?",
         "Every question is written in Assamese and English. Use the language switch on any practice page to read the same question in either language."],
      ])
  );
}

function examPageBlock(data, exam) {
  const secs = exam.sections || [];
  const qaSecs = secs.filter((s) => s.type !== "syllabus");
  const total = qaSecs.reduce((a, s) => a + sectionQuestionCount(exam.id, s.id), 0);
  const examEn = lang(exam.title, "en");
  const sub = lang(exam.subtitle, "en");
  const rows = qaSecs
    .map((s) => {
      const n = sectionQuestionCount(exam.id, s.id);
      const leaves = sectionLeafCount(exam.id, s.id);
      return `<li><strong>${esc(lang(s.title, "en"))}</strong> — ${leaves} sub-categor${leaves === 1 ? "y" : "ies"}, ${n.toLocaleString("en-IN")} questions.</li>`;
    })
    .join("\n          ");
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">About the ${esc(examEn)} question bank</h2>\n` +
      `        <p>${esc(examEn)}${sub ? ` (${esc(sub)})` : ""} is covered on axomexam through ${qaSecs.length} subject sections and ${total.toLocaleString("en-IN")} bilingual practice questions. Every question is written in Assamese and English with four options, a marked answer and a short explanation.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Subjects in this exam</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to prepare</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Start with the subject that carries the most questions, then move to the shorter ones.</li>\n` +
      `          <li>Attempt each sub-category fully before checking the explanations.</li>\n` +
      `          <li>Revise the questions you get wrong in a second pass a few days later.</li>\n` +
      `        </ul>\n` +
      faqHTML([
        [`How many questions are there for ${esc(examEn)}?`,
         `The ${esc(examEn)} book on axomexam holds ${total.toLocaleString("en-IN")} practice questions spread across ${qaSecs.length} subject sections, each with an answer and a short explanation.`],
        [`Which subjects are covered in ${esc(examEn)}?`,
         `The book is divided into ${qaSecs.map((s) => esc(lang(s.title, "en"))).join(", ")}. Open any subject to see its sub-categories and the questions under each.`],
        [`Is the ${esc(examEn)} material free?`,
         "Yes, the whole book is free to read online, in Assamese and English, with no sign-up."],
      ])
  );
}

function examSectionBlock(exam, sec) {
  const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
  const examEn = lang(exam.title, "en");
  const secEn = lang(sec.title, "en");
  const secAs = lang(sec.title, "as");
  const total = sectionQuestionCount(exam.id, sec.id);

  const rows = subs
    .map((s) => {
      const n = sectionQuestionCount(exam.id, sec.id + "/" + s.id) || countQuestions(path.join(EXAM_DATA, exam.id, sec.id, s.id));
      const as = lang(s.title, "as");
      const asShort = as.length > 60 ? as.slice(0, 57).trim() + "..." : as;
      return `<li><strong>${esc(lang(s.title, "en"))}</strong>${asShort && asShort !== lang(s.title, "en") ? ` <span lang="as">${esc(asShort)}</span>` : ""} — ${n.toLocaleString("en-IN")} question${n === 1 ? "" : "s"}.</li>`;
    })
    .join("\n          ");

  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">${esc(secEn)} for ${esc(examEn)} — what this section covers</h2>\n` +
      `        <p>${esc(secEn)}${secAs && secAs !== secEn ? ` (${esc(secAs)})` : ""} is one of the subjects in the ${esc(examEn)} syllabus on axomexam. It currently holds ${total.toLocaleString("en-IN")} bilingual (Assamese &amp; English) practice questions across ${subs.length} sub-categor${subs.length === 1 ? "y" : "ies"}, each question carrying four options, the correct answer and a worked explanation.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Sub-categories in ${esc(secEn)}</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to prepare ${esc(secEn)}</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Read the sub-category list above and decide the order you want to attempt them in.</li>\n` +
      `          <li>Finish one sub-category at a time and read the explanation for every wrong answer.</li>\n` +
      `          <li>Re-attempt the same sub-category after a few days to confirm the facts have stuck.</li>\n` +
      `        </ul>\n` +
      faqHTML([
        [`How many ${esc(secEn)} questions are there for ${esc(examEn)}?`,
         `This section holds ${total.toLocaleString("en-IN")} questions across ${subs.length} sub-categor${subs.length === 1 ? "y" : "ies"}, each with four options, a marked answer and a worked explanation.`],
        [`What is covered under ${esc(secEn)}?`,
         `The sub-categories are ${subs.map((s) => esc(lang(s.title, "en"))).join(", ")}. Each one opens a page with its own question bank.`],
        [`How should I revise ${esc(secEn)}?`,
         "Finish one sub-category at a time, read the explanation for every answer you miss, then re-attempt the same set after a few days."],
      ])
  );
}

/* Nested sub-category page: exams/<exam>/<section>/<sub>/ — lists the leaf
   sub-sub-categories. */
function examSubcategoryBlock(exam, sec, sub) {
  const leaves = Array.isArray(sub.subcategories) ? sub.subcategories : [];
  const examEn = lang(exam.title, "en");
  const secEn = lang(sec.title, "en");
  const subEn = lang(sub.title, "en");
  const subAs = lang(sub.title, "as");
  const total = sectionQuestionCount(exam.id, sec.id + "/" + sub.id);

  const rows = leaves
    .map((l) => {
      const n = sectionQuestionCount(exam.id, sec.id + "/" + sub.id + "/" + l.id);
      const as = lang(l.title, "as");
      const asShort = as.length > 60 ? as.slice(0, 57).trim() + "..." : as;
      return `<li><strong>${esc(lang(l.title, "en"))}</strong>${asShort && asShort !== lang(l.title, "en") ? ` <span lang="as">${esc(asShort)}</span>` : ""} — ${n.toLocaleString("en-IN")} question${n === 1 ? "" : "s"}.</li>`;
    })
    .join("\n          ");

  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">${esc(subEn)} — ${esc(secEn)}, ${esc(examEn)}</h2>\n` +
      `        <p>${esc(subEn)}${subAs && subAs !== subEn ? ` (${esc(subAs)})` : ""} is a topic group inside ${esc(secEn)} for the ${esc(examEn)} syllabus on axomexam. It contains ${leaves.length} practice sub-categor${leaves.length === 1 ? "y" : "ies"} and ${total.toLocaleString("en-IN")} bilingual (Assamese &amp; English) questions in total, each with four options, the correct answer and an explanation.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Topics in ${esc(subEn)}</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to prepare</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Work through the topics above one at a time rather than skipping around.</li>\n` +
      `          <li>Read the explanation for every question you miss and note the underlying rule.</li>\n` +
      `          <li>Return to the same topic after a few days to confirm it has stuck.</li>\n` +
      `        </ul>\n` +
      faqHTML([
        [`How many questions are under ${esc(subEn)}?`,
         `${esc(subEn)} holds ${total.toLocaleString("en-IN")} bilingual questions across ${leaves.length} topic${leaves.length === 1 ? "" : "s"}, part of the ${esc(secEn)} section of the ${esc(examEn)} book.`],
        [`Which topics are inside ${esc(subEn)}?`,
         `The topics are ${leaves.map((l) => esc(lang(l.title, "en"))).join(", ")}.`],
        [`Do these questions come with explanations?`,
         "Yes. Every question carries the correct answer and a short explanation in both Assamese and English."],
      ])
  );
}

/* ---------- page classification ---------- */

/* Word count of the visible text inside <main>. Counting characters is not a
   useful gate: a page made only of link cards can run past 800 characters
   while holding well under 200 words, which is what the thin-content check in
   tools/seo-audit.js measures. */
function mainWordCount(html) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  const text = m[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}
const THIN_WORDS = 300;

/* ---------- generic fallback for hubs with no exam-data model ---------- */

/* A hub page that is not part of the exam book (mock-test subject pages,
   current-affairs, e-books, previous-year, category section pages) is built
   from link cards alone. The cards already name every child page, so the
   block is written from those same links: the reader gets a description of
   what the hub collects, and a crawlable sentence around each link. */
function stripTags(s) {
  return String(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* The child routes of a hub, taken from the link cards already in <main>.
   Returned as a fragment so both the generic block and a short exam block can
   reuse it. */
function childLinksHTML(html) {
  const mainM = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!mainM) return "";
  const seen = new Set();
  const links = [];
  const re = /<a\s[^>]*href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(mainM[1]))) {
    const href = m[1];
    const text = stripTags(m[2]);
    if (!text || text.length > 90) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    links.push({ href, text });
  }
  if (links.length < 3) return "";
  const items = links
    .slice(0, 24)
    .map((l) => `<li><a href="${esc(l.href)}">${esc(l.text)}</a></li>`)
    .join("\n          ");
  return (
    `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Pages in this section</h3>\n` +
    `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${items}\n        </ul>\n`
  );
}

function genericHubBlock(html) {
  const h1 = stripTags((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html) || [])[1] || "");
  if (!h1) return null;
  const links = childLinksHTML(html);
  if (!links) return null;
  const name = esc(h1);
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">What this page collects</h2>\n` +
      `        <p>${name} brings together the pages listed below in one place. Each entry opens a page with bilingual (Assamese &amp; English) practice material — questions, answers and a short explanation — for the Assam competitive examinations such as ADRE, Assam Police, APSC, SSC and Railway.</p>\n` +
      links +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to use it</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Open the entry that matches the topic you are revising.</li>\n` +
      `          <li>Work through the questions and read the explanation for any answer you miss.</li>\n` +
      `          <li>Switch between Assamese and English to reinforce the same fact in both languages.</li>\n` +
      `        </ul>`
  );
}

/* A data-derived exam block can still fall under the word threshold when a
   section holds only two or three sub-categories. The pages are still thin
   because the link cards alone carry too little text, so the short block is
   grown with the sibling routes of the same book, each with its real question
   count. That adds genuine navigation context rather than filler. */
function siblingListHTML(rows, heading) {
  if (!rows.length) return "";
  const items = rows
    .map(([href, label, n]) => `<li><a href="${esc(href)}">${esc(label)}</a> — ${n.toLocaleString("en-IN")} question${n === 1 ? "" : "s"}.</li>`)
    .join("\n          ");
  return (
    `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">${esc(heading)}</h3>\n` +
    `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${items}\n        </ul>\n`
  );
}

/* Extra, page-specific navigation prose for a short exam page. `kind` is the
   depth of the page inside the book, so the sibling list stays relevant. */
function examGrowth(kind, exam, sec, sub) {
  const examEn = lang(exam.title, "en");
  const parts = [];
  const secCount = (secId) => sectionQuestionCount(exam.id, secId);

  if (kind === "section") {
    const siblings = (exam.sections || [])
      .filter((s) => s.id !== sec.id && s.type !== "syllabus")
      .map((s) => [`/exams/${exam.id}/${s.id}/`, lang(s.title, "en"), secCount(s.id)]);
    parts.push(
      siblingListHTML(siblings, `Other subjects in the ${examEn} book`),
      `        <p style="margin-top:14px;">The ${examEn} book keeps every subject on its own page so the syllabus stays easy to navigate. Work through ${esc(lang(sec.title, "en"))} here, then move to the next subject from the list above. The question counts shown are the live numbers on disk and change as new questions are added.</p>\n`
    );
  } else if (kind === "exam") {
    parts.push(
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Exam pattern and how the book is arranged</h3>\n` +
      `        <p>The ${examEn} material on axomexam follows the official syllabus order: the paper is split into subjects, each subject into sub-categories, and each sub-category into individual practice questions. Every question is bilingual (Assamese and English), carries four options, and shows the correct answer with a short explanation, so the same page serves for a first reading and for revision close to the exam.</p>\n` +
      `        <p>Because the sub-categories map one-to-one to syllabus topics, you can also use the book to check your coverage: open the subject you are weakest in, look at the sub-category list and pick the topic you have not revised yet.</p>\n`
    );
  } else if (kind === "sub") {
    const siblings = (sec.subcategories || [])
      .filter((x) => x.id !== sub.id)
      .map((x) => [`/exams/${exam.id}/${sec.id}/${x.id}/`, lang(x.title, "en"), sectionQuestionCount(exam.id, sec.id + "/" + x.id)]);
    parts.push(
      siblingListHTML(siblings, `Other topic groups in ${lang(sec.title, "en")}`),
      `        <p style="margin-top:14px;">${esc(lang(sub.title, "en"))} is one group inside ${esc(lang(sec.title, "en"))}. Finishing the groups in order keeps the syllabus coverage even, and the question counts above show where the weight of the section lies.</p>\n`
    );
  }
  return parts.join("");
}

function withGrowth(block, extra) {
  if (!extra) return block;
  return block.replace(/\n      <\/div>\n    <\/section>$/, "\n" + extra + "      </div>\n    </section>");
}

function main() {
  const data = JSON.parse(fs.readFileSync(EXAMS_INDEX, "utf8"));
  const byId = new Map((data.exams || []).map((e) => [e.id, e]));

  let scanned = 0;
  let written = 0;
  const report = [];

  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walk(full);
      } else if (e.name.endsWith(".html")) {
        const rel = path.relative(ROOT, full).split(path.sep).join("/");
        const parts = rel.split("/"); // .../index.html
        /* Only directory routes carry the marker block; a loose .html file
           (404.html) has no <main> to write into. */
        if (parts[parts.length - 1] !== "index.html") continue;
        const seg = parts.slice(0, -1); // drop "index.html"
        if (OWNED_ELSEWHERE.has(rel) || EXEMPT.has(rel)) continue;

        scanned++;
        const orig = fs.readFileSync(full, "utf8");
        let html = orig;
        if (/name="robots" content="noindex/.test(html)) continue;
        /* A redirect stub has no content of its own to describe. */
        if (/http-equiv="refresh"/i.test(html)) continue;

        let block = null;
        let kind = null;
        let examRef = null;
        let secRef = null;
        let subRef = null;
        if (seg[0] === "exams") {
          const rest = seg.slice(1);
          if (rest.length === 0) {
            block = examsRootBlock(data);
          } else if (rest.length === 1) {
            const exam = byId.get(rest[0]);
            if (exam) { block = examPageBlock(data, exam); kind = "exam"; examRef = exam; }
          } else if (rest.length === 2) {
            const exam = byId.get(rest[0]);
            const sec = exam && (exam.sections || []).find((s) => s.id === rest[1]);
            if (exam && sec && Array.isArray(sec.subcategories) && sec.subcategories.length) {
              block = examSectionBlock(exam, sec);
              kind = "section"; examRef = exam; secRef = sec;
            }
          } else if (rest.length === 3) {
            const exam = byId.get(rest[0]);
            const sec = exam && (exam.sections || []).find((s) => s.id === rest[1]);
            const sub = sec && (sec.subcategories || []).find((s) => s.id === rest[2]);
            if (exam && sec && sub && Array.isArray(sub.subcategories) && sub.subcategories.length) {
              block = examSubcategoryBlock(exam, sec, sub);
              kind = "sub"; examRef = exam; secRef = sec; subRef = sub;
            }
          }
        }
        const before = mainWordCount(html);
        if (before === null || before >= THIN_WORDS) continue;
        if (!block) block = genericHubBlock(html);
        if (!block) continue;

        if (MARK_RE.test(html)) html = html.replace(MARK_RE, block);
        else {
          const idx = html.lastIndexOf("</main>");
          if (idx < 0) continue;
          html = html.slice(0, idx) + "\n" + block + "\n  " + html.slice(idx);
        }

        let after = mainWordCount(html);
        if (after !== null && after < THIN_WORDS) {
          /* Grow the same panel with page-specific sibling prose instead of
             dropping a second, unrelated block on the page. */
          let grown = block;
          if (kind) grown = withGrowth(grown, examGrowth(kind, examRef, secRef, subRef));
          if (grown === block) grown = withChildLinks(block, orig);
          if (grown !== block) {
            const at = orig.lastIndexOf("</main>");
            html = MARK_RE.test(orig)
              ? orig.replace(MARK_RE, grown)
              : orig.slice(0, at) + "\n" + grown + "\n  " + orig.slice(at);
            after = mainWordCount(html);
          }
        }
        if (html === orig) continue;
        written++;
        report.push(`  ${String(before).padStart(4)} -> ${String(after).padStart(5)}  ${rel}`);
        if (!CHECK) fs.writeFileSync(full, html, "utf8");
      }
    }
  };
  walk(ROOT);

  console.log(`${CHECK ? "[check] " : ""}enrich-thin-pages`);
  console.log(`  exam HTML scanned:   ${scanned}`);
  console.log(`  pages enriched:      ${written}`);
  for (const r of report) console.log(r);
}

main();
