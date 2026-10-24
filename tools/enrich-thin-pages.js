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
      `        </ul>`
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
      `        </ul>`
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
      `        </ul>`
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
      `        </ul>`
  );
}

/* ---------- page classification ---------- */

function mainTextLength(html) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  return m[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
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
        if (before === null || before >= 800) continue;

        if (MARK_RE.test(html)) html = html.replace(MARK_RE, block);
        else {
          const idx = html.lastIndexOf("</main>");
          if (idx < 0) continue;
          html = html.slice(0, idx) + "\n" + block + "\n  " + html.slice(idx);
        }

        const after = mainTextLength(html);
        written++;
        report.push(`  ${String(before).padStart(4)} -> ${String(after).padStart(5)}  ${rel}`);
        if (!CHECK) fs.writeFileSync(full, html, "utf8");
      }
    }
  };
  walk(examsDir);

  console.log(`${CHECK ? "[check] " : ""}enrich-thin-pages`);
  console.log(`  exam HTML scanned:   ${scanned}`);
  console.log(`  pages enriched:      ${written}`);
  for (const r of report) console.log(r);
}

main();
