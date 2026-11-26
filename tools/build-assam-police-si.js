#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/build-assam-police-si.js

   Builds the Assam Police Sub-Inspector (SI, UB & AB) exam book
   from tools/assam-police-si.structure.js:

     assam-police-si   SI (UB & AB)   (5 × 100)

   For the book it writes, idempotently:
     data/exams/assam-police-si.json
     data/exams/assam-police-si/syllabus.json
     data/exams/assam-police-si/<section>.json
     data/exams/assam-police-si/<section>/<topic>/index.json
     data/exams/assam-police-si/<section>/<topic>/question-001.json
     exams/assam-police-si/index.html
     exams/assam-police-si/<section>/index.html
     exams/assam-police-si/<section>/<topic>/index.html

   Question banks are drawn from the existing Assam Police question bank
   (data/exams/assam-police/...) and the shared subject pools under
   data/mock-test/. Every text already published by any existing exam book
   is skipped, so the SI book never repeats a question that is already live
   elsewhere on the site.

   The page builders live in tools/lib/exam-book-pages.js, shared with the
   other exam-book generators.

   Usage:
     node tools/build-assam-police-si.js
     node tools/build-assam-police-si.js --dry-run
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { makeExamBookTools } = require("./lib/exam-book-pages");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const { EXAMS } = require("./assam-police-si.structure.js");

const DATE = "2026-11-08";

/* Per-topic slice size. Mathematics pools are small (~28 questions each), so
   they take a smaller slice; every other pool can spare a large one. */
const CAP = 200;
const CAP_MATH = 40;

/* Other published books: a question text that appears in any of them is never
   reused by the SI book. assam-police is deliberately absent — the SI book is
   the degree-level companion of the constable book and draws its bank. */
const SEED_BOOKS = ["adre-grade-3", "adre-grade-4", "dhs-dme", "dhs-dme-technical", "dhs-dme-grade-4"];

const BOOK = makeExamBookTools({
  ROOT,
  DRY,
  DATE,
  chromeLeaf: "exams/adre-grade-4/elementary-mathematics/number-system/index.html",
  generatorLabel: "tools/build-assam-police-si.js",
  structureLabel: "tools/assam-police-si.structure.js",
  affiliationNote: "axomexam.in is an independent study platform and is not affiliated with SLPRB Assam or the Government of Assam. Verify all details from the official notification.",
});

/* ---------------- source readers ---------------- */

function readJSONArray(file) {
  let data;
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { return []; }
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.questions)) return data.questions;
  return [];
}

/* Every question under an exam-bank directory, recursing into the leaf
   sub-category folders, in a stable (sorted) order. */
function readExamBank(rel) {
  const dir = path.join(ROOT, "data", ...rel.split("/"));
  const out = [];
  const walk = (cur) => {
    let entries = [];
    try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch (e) { return; }
    entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!/^question-\d+\.json$/i.test(e.name)) continue;
      out.push(...readJSONArray(full));
    }
  };
  walk(dir);
  return out;
}

/* Every question in a shared pool directory, recursing into topic sub-folders
   (e.g. science/physics/*.json). */
function readPoolBank(rel) {
  const dir = path.join(ROOT, "data", ...rel.split("/"));
  const out = [];
  const walk = (cur) => {
    let entries = [];
    try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch (e) { return; }
    entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!/\.json$/i.test(e.name) || /^index\.json$/i.test(e.name)) continue;
      out.push(...readJSONArray(full));
    }
  };
  walk(dir);
  return out;
}

const SOURCE_CACHE = new Map();
function readSource(src) {
  if (SOURCE_CACHE.has(src)) return SOURCE_CACHE.get(src);
  const bank = src.startsWith("exams/") ? readExamBank(src) : readPoolBank(src);
  const seen = new Set();
  const out = [];
  for (const q of bank) {
    if (!q || typeof q !== "object" || !q.q || !Array.isArray(q.options)) continue;
    const key = (q.q.en || "").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  SOURCE_CACHE.set(src, out);
  return out;
}

/* Question texts already published by another exam book. */
const USED_TEXT = new Set();
(function seedUsed() {
  for (const book of SEED_BOOKS) {
    const dir = path.join(ROOT, "data", "exams", book);
    const stack = [dir];
    while (stack.length) {
      const cur = stack.pop();
      let entries = [];
      try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch (e) { continue; }
      for (const e of entries) {
        const full = path.join(cur, e.name);
        if (e.isDirectory()) { stack.push(full); continue; }
        if (!/^question-\d+\.json$/i.test(e.name)) continue;
        for (const q of readJSONArray(full)) {
          const t = q && q.q && q.q.en ? String(q.q.en).trim() : "";
          if (t) USED_TEXT.add(t);
        }
      }
    }
  }
  /* Every full-paper set already published for another exam (Assam Police
     Constable included), so no SI question repeats a live mock question. The
     SI's own sets are skipped so a rebuild stays idempotent. */
  const setsDir = path.join(ROOT, "data", "exam-mock-sets");
  let examDirs = [];
  try { examDirs = fs.readdirSync(setsDir, { withFileTypes: true }).filter((e) => e.isDirectory()); } catch (e) { examDirs = []; }
  for (const d of examDirs) {
    if (d.name === "blueprints" || d.name === EXAMS[0].id) continue;
    const dir = path.join(setsDir, d.name);
    let files = [];
    try { files = fs.readdirSync(dir).filter((f) => /^set-\d+\.json$/i.test(f)); } catch (e) { files = []; }
    for (const f of files) {
      for (const q of readJSONArray(path.join(dir, f))) {
        const t = q && q.q && q.q.en ? String(q.q.en).trim() : "";
        if (t) USED_TEXT.add(t);
      }
    }
  }
})();

function buildBank(src, subId) {
  const pool = readSource(src);
  const cap = src.includes("/elementary-mathematics/") ? CAP_MATH : CAP;
  const picked = [];
  for (const q of pool) {
    if (picked.length >= cap) break;
    const key = (q.q.en || "").trim();
    if (!key || USED_TEXT.has(key)) continue;
    USED_TEXT.add(key);
    picked.push(q);
  }
  return picked.map((q, n) => {
    const out = {
      id: `${subId}-${String(n + 1).padStart(3, "0")}`,
      q: { en: q.q.en || "", as: q.q.as || "" },
      options: q.options.map((o) => {
        const opt = { en: (o && o.en) || "", as: (o && o.as) || "" };
        /* Non-verbal questions carry their figure as an inline SVG on the
           option (and sometimes on the question). Keep it, or the mock shows
           an image-less question. */
        if (o && typeof o.fig === "string" && o.fig) opt.fig = o.fig;
        return opt;
      }),
      correct: Number.isInteger(q.correct) ? q.correct : 0,
    };
    if (typeof q.fig === "string" && q.fig) out.fig = q.fig;
    if (q.explanation) out.explanation = { en: q.explanation.en || "", as: q.explanation.as || "" };
    return out;
  });
}

/* ---------------- driver ---------------- */
const BANKS = {};
const BANK_COUNT = {};

for (const EXAM of EXAMS) {
  for (const sec of EXAM.sections) {
    if (sec.type === "syllabus") continue;
    for (const sub of sec.subcategories || []) {
      const bank = buildBank(sub.source, sub.id);
      BANKS[`${EXAM.id}:${sub.id}`] = bank;
      BANK_COUNT[`${EXAM.id}:${sub.id}`] = bank.length;
    }
  }
}

const leavesByExam = {};
for (const EXAM of EXAMS) leavesByExam[EXAM.id] = BOOK.buildBook(EXAM, BANKS, BANK_COUNT);
BOOK.spliceIndex(EXAMS, "assam-police");
BOOK.updateSitemap(EXAMS, leavesByExam);
BOOK.updateExamsIndex(EXAMS, leavesByExam, BANK_COUNT, "Assam Police");

console.log(`build-assam-police-si${DRY ? " (dry-run)" : ""}`);
for (const EXAM of EXAMS) {
  const total = leavesByExam[EXAM.id].reduce((a, l) => a + (BANK_COUNT[`${EXAM.id}:${l.leaf.id}`] || 0), 0);
  console.log(`  ${EXAM.id}: ${EXAM.sections.length} sections, ${leavesByExam[EXAM.id].length} topics, ${total} questions`);
}
const st = BOOK.stats();
console.log(`  written  : ${st.written}   unchanged: ${st.skipped}`);
