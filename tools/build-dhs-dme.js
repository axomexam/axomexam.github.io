#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/build-dhs-dme.js

   Builds the three DHS & DME exam books from
   tools/dhs-dme.structure.js:

     dhs-dme            Non-Technical Grade III  (5 × 100)
     dhs-dme-technical  Technical Grade III      (5 × 100)
     dhs-dme-grade-4    Grade IV                  (5 × 50)

   For each book it writes, idempotently:
     data/exams/<id>.json
     data/exams/<id>/syllabus.json
     data/exams/<id>/<section>.json
     data/exams/<id>/<section>/<topic>/index.json
     data/exams/<id>/<section>/<topic>/question-001.json
     exams/<id>/index.html
     exams/<id>/<section>/index.html
     exams/<id>/<section>/<topic>/index.html

   Question banks are drawn from the shared subject banks under
   data/mock-test/. Each exam takes a *different* slice of every
   shared pool, so the three books never repeat a question. The
   registration block in data/exams/index.json is spliced in place.

   The page builders themselves live in tools/lib/exam-book-pages.js,
   shared with the other exam-book generators.

   Usage:
     node tools/build-dhs-dme.js
     node tools/build-dhs-dme.js --dry-run
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { makeExamBookTools } = require("./lib/exam-book-pages");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const { EXAMS } = require("./dhs-dme.structure.js");

const DATE = "2026-11-08";

/* Per-topic slice size taken from a shared pool. Science pools are used by
   only one book, so they can afford a bigger slice. */
const CAP = 80;
const CAP_SCIENCE = 140;

const BOOK = makeExamBookTools({
  ROOT,
  DRY,
  DATE,
  chromeLeaf: "exams/adre-grade-4/elementary-mathematics/number-system/index.html",
  generatorLabel: "tools/build-dhs-dme.js",
  structureLabel: "tools/dhs-dme.structure.js",
  affiliationNote: "axomexam.in is an independent study platform and is not affiliated with DHS, DME or the Government of Assam. Verify all details from the official notification.",
});

/* ---------------- shared pool reader ---------------- */

const POOL_CACHE = new Map();
function readPool(src) {
  if (POOL_CACHE.has(src)) return POOL_CACHE.get(src);
  const dir = path.join(ROOT, "data", "mock-test", ...src.split("/"));
  const seen = new Set();
  const out = [];
  let files = [];
  try { files = fs.readdirSync(dir).filter((f) => /\.json$/i.test(f)).sort(); } catch (e) { files = []; }
  for (const f of files) {
    let data;
    try { data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch (e) { continue; }
    const qs = Array.isArray(data) ? data : (data && Array.isArray(data.questions) ? data.questions : []);
    for (const q of qs) {
      if (!q || typeof q !== "object" || !q.q || !Array.isArray(q.options)) continue;
      const key = (q.q.en || "").trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(q);
    }
  }
  POOL_CACHE.set(src, out);
  return out;
}

/* Cursor per shared pool, advanced book by book, so two books drawing on the
   same pool receive disjoint slices. */
const POOL_CURSOR = new Map();

/* Question texts already published by another exam book, plus every text this
   run has used. A question that is already live elsewhere is skipped, so the
   three DHS & DME books never repeat a question from each other or from the
   existing books. */
const USED_TEXT = new Set();
(function seedUsed() {
  for (const book of ["assam-police", "adre-grade-3", "adre-grade-4"]) {
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
        let data;
        try { data = JSON.parse(fs.readFileSync(full, "utf8")); } catch (e) { continue; }
        const arr = Array.isArray(data) ? data : (data && Array.isArray(data.questions) ? data.questions : []);
        for (const q of arr) {
          const t = q && q.q && q.q.en ? String(q.q.en).trim() : "";
          if (t) USED_TEXT.add(t);
        }
      }
    }
  }
})();

function buildBank(src, subId) {
  const pool = readPool(src);
  const cap = src.startsWith("science/") ? CAP_SCIENCE : CAP;
  const start = POOL_CURSOR.get(src) || 0;
  const picked = [];
  let i = start;
  while (i < pool.length && picked.length < cap) {
    const q = pool[i++];
    const key = (q.q.en || "").trim();
    if (!key || USED_TEXT.has(key)) continue;
    USED_TEXT.add(key);
    picked.push(q);
  }
  POOL_CURSOR.set(src, i);
  return picked.map((q, n) => {
    const out = {
      id: `${subId}-${String(n + 1).padStart(3, "0")}`,
      q: { en: q.q.en || "", as: q.q.as || "" },
      options: q.options.map((o) => ({ en: (o && o.en) || "", as: (o && o.as) || "" })),
      correct: Number.isInteger(q.correct) ? q.correct : 0,
    };
    if (q.explanation) out.explanation = { en: q.explanation.en || "", as: q.explanation.as || "" };
    return out;
  });
}

/* ---------------- driver ---------------- */
const BANKS = {};
const BANK_COUNT = {};

/* Pre-build every bank so the cursor advances deterministically across books
   before any page is rendered. */
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
BOOK.spliceIndex(EXAMS, "adre-grade-4");
BOOK.updateSitemap(EXAMS, leavesByExam);
BOOK.updateExamsIndex(EXAMS, leavesByExam, BANK_COUNT, "Assam Police");

console.log(`build-dhs-dme${DRY ? " (dry-run)" : ""}`);
for (const EXAM of EXAMS) {
  const total = leavesByExam[EXAM.id].reduce((a, l) => a + (BANK_COUNT[`${EXAM.id}:${l.leaf.id}`] || 0), 0);
  console.log(`  ${EXAM.id}: ${EXAM.sections.length} sections, ${leavesByExam[EXAM.id].length} topics, ${total} questions`);
}
const st = BOOK.stats();
console.log(`  written  : ${st.written}   unchanged: ${st.skipped}`);
