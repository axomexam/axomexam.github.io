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
const MIN_WORDS = 300;
const EXAMS_INDEX = path.join(ROOT, "data", "exams", "index.json");
const EXAM_DATA = path.join(ROOT, "data", "exams");
const {
  SECTION_NOTES,
  SUB_NOTES,
  EXAM_NOTES,
  EXAMS_ROOT,
} = require("./enrich-content.data.js");

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

/* ---------- block builders ---------- */

/* ---------- shared markup helpers ---------- */

const H3 = 'color:var(--ink,#0f172a); margin-top:22px;';
const UL = 'margin:8px 0 0 20px; line-height:1.9;';

function h2(text) {
  return `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">${esc(text)}</h2>\n`;
}
function h3(text) {
  return `        <h3 style="${H3}">${esc(text)}</h3>\n`;
}
function paras(list) {
  return (list || []).map((p) => `        <p>${esc(p)}</p>\n`).join("");
}
function ul(items) {
  if (!items || !items.length) return "";
  return (
    `        <ul style="${UL}">\n` +
    items.map((t) => `          <li>${t}</li>`).join("\n") +
    `\n        </ul>\n`
  );
}
/* Note bullets come from the data module, so they are escaped; the row lists
   below are assembled from already-escaped titles and are passed through. */
function ulRaw(items) {
  if (!items || !items.length) return "";
  return (
    `        <ul style="${UL}">\n` +
    items.map((t) => `          <li>${t}</li>`).join("\n") +
    `\n        </ul>\n`
  );
}

/* ---------- block builders ---------- */

function examsRootBlock(data) {
  const exams = data.exams || [];
  const rows = exams
    .map((e) => {
      const secs = e.sections || [];
      const total = secs.reduce((a, s) => a + sectionQuestionCount(e.id, s.id), 0);
      const as = lang(e.title, "as");
      return `<strong>${esc(lang(e.title, "en"))}</strong>${as && as !== lang(e.title, "en") ? ` <span lang="as">${esc(as)}</span>` : ""} — ${secs.length} sections, ${total.toLocaleString("en-IN")} practice questions.`;
    });
  return panel(
    h2("Exam-wise practice on axomexam") +
      paras(EXAMS_ROOT.about) +
      h3("Exams covered") +
      ulRaw(rows) +
      h3("How the material is organised") +
      `        <p>Each exam is a self-contained book. Its sections follow the subjects the paper actually tests, and every section breaks down into sub-categories, which are the individual practice sets. Nothing is shared between exams: the Assam Police and ADRE books cover overlapping subjects, but each is laid out against its own syllabus.</p>\n` +
      `        <p>Inside a set, a question carries four options, one correct answer and a short explanation. The explanation is the part worth reading even when you answer correctly, because it states the rule or fact the question was testing, and that is what transfers to a question you have not seen before.</p>\n` +
      h3("How to use this section") +
      ul(EXAMS_ROOT.usage)
  );
}

function examPageBlock(data, exam) {
  const secs = exam.sections || [];
  const qaSecs = secs.filter((s) => s.type !== "syllabus");
  const total = qaSecs.reduce((a, s) => a + sectionQuestionCount(exam.id, s.id), 0);
  const examEn = lang(exam.title, "en");
  const sub = lang(exam.subtitle, "en");
  const notes = EXAM_NOTES[exam.id] || {};

  const rows = qaSecs.map((s) => {
    const n = sectionQuestionCount(exam.id, s.id);
    const leaves = sectionLeafCount(exam.id, s.id);
    const as = lang(s.title, "as");
    const asShort = as.length > 60 ? as.slice(0, 57).trim() + "..." : as;
    return `<strong>${esc(lang(s.title, "en"))}</strong>${asShort && asShort !== lang(s.title, "en") ? ` <span lang="as">${esc(asShort)}</span>` : ""} — ${leaves} sub-categor${leaves === 1 ? "y" : "ies"}, ${n.toLocaleString("en-IN")} questions.`;
  });

  return panel(
    h2(`About the ${examEn} question bank`) +
      paras(notes.about) +
      `        <p>${esc(examEn)}${sub ? ` (${esc(sub)})` : ""} is covered on axomexam through ${qaSecs.length} subject sections and ${total.toLocaleString("en-IN")} bilingual practice questions. Every question is written in Assamese and English with four options, a marked answer and a short explanation.</p>\n` +
      h3("Subjects in this exam") +
      ulRaw(rows) +
      h3(`How the ${examEn} paper is built`) +
      ul(notes.pattern) +
      h3("How to prepare") +
      ul(notes.strategy)
  );
}

function examSectionBlock(exam, sec) {
  const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
  const examEn = lang(exam.title, "en");
  const secEn = lang(sec.title, "en");
  const secAs = lang(sec.title, "as");
  const total = sectionQuestionCount(exam.id, sec.id);
  const notes = SECTION_NOTES[sec.id] || {};

  const rows = subs.map((s) => {
    const n =
      sectionQuestionCount(exam.id, sec.id + "/" + s.id) ||
      countQuestions(path.join(EXAM_DATA, exam.id, sec.id, s.id));
    const as = lang(s.title, "as");
    const asShort = as.length > 60 ? as.slice(0, 57).trim() + "..." : as;
    return `<strong>${esc(lang(s.title, "en"))}</strong>${asShort && asShort !== lang(s.title, "en") ? ` <span lang="as">${esc(asShort)}</span>` : ""} — ${n.toLocaleString("en-IN")} question${n === 1 ? "" : "s"}.`;
  });

  return panel(
    h2(`${secEn} for ${examEn} — what this section covers`) +
      `        <p>${esc(secEn)}${secAs && secAs !== secEn ? ` (${esc(secAs)})` : ""} is one of the subjects in the ${esc(examEn)} syllabus on axomexam. It currently holds ${total.toLocaleString("en-IN")} bilingual (Assamese &amp; English) practice questions across ${subs.length} sub-categor${subs.length === 1 ? "y" : "ies"}, each question carrying four options, the correct answer and a worked explanation.</p>\n` +
      paras(notes.covers) +
      h3(`Sub-categories in ${secEn}`) +
      ulRaw(rows) +
      h3(`What the ${secEn} questions test`) +
      ul(notes.skills) +
      h3(`Where candidates lose marks in ${secEn}`) +
      ul(notes.mistakes) +
      h3(`How to prepare ${secEn}`) +
      ul(notes.method)
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
  const notes = SUB_NOTES[sec.id + "/" + sub.id] || {};

  const rows = leaves.map((l) => {
    const n = sectionQuestionCount(exam.id, sec.id + "/" + sub.id + "/" + l.id);
    const as = lang(l.title, "as");
    const asShort = as.length > 60 ? as.slice(0, 57).trim() + "..." : as;
    return `<strong>${esc(lang(l.title, "en"))}</strong>${asShort && asShort !== lang(l.title, "en") ? ` <span lang="as">${esc(asShort)}</span>` : ""} — ${n.toLocaleString("en-IN")} question${n === 1 ? "" : "s"}.`;
  });

  /* The topic names are already on the page as cards, but a crawler reading
     only the text needs them as prose too, and naming them here is what makes
     this paragraph specific to the page rather than to the section. */
  const names = leaves.map((l) => lang(l.title, "en"));
  const nameList =
    names.length === 0
      ? ""
      : names.length === 1
        ? names[0]
        : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];

  return panel(
    h2(`${subEn} — ${secEn}, ${examEn}`) +
      `        <p>${esc(subEn)}${subAs && subAs !== subEn ? ` (${esc(subAs)})` : ""} is a topic group inside ${esc(secEn)} for the ${esc(examEn)} syllabus on axomexam. It contains ${leaves.length} practice sub-categor${leaves.length === 1 ? "y" : "ies"} and ${total.toLocaleString("en-IN")} bilingual (Assamese &amp; English) questions in total, each with four options, the correct answer and an explanation.</p>\n` +
      (nameList
        ? `        <p>The sub-categories in this group are ${esc(nameList)}. Each one is a separate practice set, so you can revise a single topic without working through the rest of ${esc(secEn)} first.</p>\n`
        : "") +
      (notes.focus ? `        <p>${esc(notes.focus)}</p>\n` : "") +
      h3(`Topics in ${subEn}`) +
      ulRaw(rows) +
      (notes.method ? h3(`How to work through ${subEn}`) + `        <p>${esc(notes.method)}</p>\n` : "") +
      (notes.trap ? h3(`The usual mistake in ${subEn}`) + `        <p>${esc(notes.trap)}</p>\n` : "") +
      h3(`How these ${esc(subEn)} questions are set`) +
      `        <p>Every question in this group is a single-answer multiple choice question with four options. The questions are written for the ${esc(examEn)} paper specifically, so the level of detail and the phrasing follow what that paper asks rather than a general textbook. The answer and its explanation sit with the question, so a set can be attempted and reviewed in one sitting.</p>\n` +
      `        <p>Question sets are added to over time, and the count above is the number published at present. Because the same fact is often asked in more than one form, working through a full set once and then revisiting it a few days later is more effective here than reading the set twice in a row.</p>\n`
  );
}

/* ---------- page classification ---------- */

/* Word count of the visible <main> text. Length in characters flatters pages
   built from short card labels, so the floor is set in words. */
function mainTextLength(html) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  const text = m[1]
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const ascii = (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
  const other = (text.match(/[\u0980-\u09FF]+/g) || []).length;
  return ascii + other;
}

function main() {
  const data = JSON.parse(fs.readFileSync(EXAMS_INDEX, "utf8"));
  const byId = new Map((data.exams || []).map((e) => [e.id, e]));

  const examsDir = path.join(ROOT, "exams");
  let scanned = 0;
  let written = 0;
  const report = [];

  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (e.name === "index.html") {
        const rel = path.relative(ROOT, full).split(path.sep).join("/");
        const parts = rel.split("/"); // exams/.../index.html
        const seg = parts.slice(1, -1); // drop "exams" and "index.html"

        scanned++;
        let html = fs.readFileSync(full, "utf8");
        if (/name="robots" content="noindex/.test(html)) continue;

        let block = null;
        if (seg.length === 0) {
          block = examsRootBlock(data);
        } else if (seg.length === 1) {
          const exam = byId.get(seg[0]);
          if (exam) block = examPageBlock(data, exam);
        } else if (seg.length === 2) {
          const exam = byId.get(seg[0]);
          const sec = exam && (exam.sections || []).find((s) => s.id === seg[1]);
          if (exam && sec && Array.isArray(sec.subcategories) && sec.subcategories.length) {
            block = examSectionBlock(exam, sec);
          }
        } else if (seg.length === 3) {
          const exam = byId.get(seg[0]);
          const sec = exam && (exam.sections || []).find((s) => s.id === seg[1]);
          const sub = sec && (sec.subcategories || []).find((s) => s.id === seg[2]);
          if (exam && sec && sub && Array.isArray(sub.subcategories) && sub.subcategories.length) {
            block = examSubcategoryBlock(exam, sec, sub);
          }
        }
        if (!block) continue;

        const before = mainTextLength(html);
        if (before === null || before >= MIN_WORDS) continue;

        if (MARK_RE.test(html)) html = html.replace(MARK_RE, block);
        else {
          const idx = html.lastIndexOf("</main>");
          if (idx < 0) continue;
          html = html.slice(0, idx) + "\n" + block + "\n  " + html.slice(idx);
        }

        const after = mainTextLength(html);
        written++;
        report.push(`  ${String(before).padStart(4)} -> ${String(after).padStart(5)} words  ${rel}`);
        if (!CHECK) fs.writeFileSync(full, html, "utf8");
      }
    }
  };
  walk(examsDir);

  console.log(`${CHECK ? "[check] " : ""}enrich-thin-pages`);
  console.log(`  exam HTML scanned:   ${scanned}`);
  console.log(`  word floor:          ${MIN_WORDS}`);
  console.log(`  pages enriched:      ${written}`);
  for (const r of report) console.log(r);
}

main();
