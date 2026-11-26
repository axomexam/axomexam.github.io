#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/build-rrb-ntpc-pages.js

   The RRB NTPC book has a full question bank (thousands of bilingual
   MCQs) but, unlike every other exam book, no static pages under
   exams/rrb-ntpc/. Every deep link therefore hit a real GitHub Pages
   404, and 404.html rewrote it to /?/exams/rrb-ntpc/... so the SPA had
   to boot before the page appeared.

   This tool writes the crawler-facing HTML for the book, reusing the
   shared builders in tools/lib/exam-book-pages.js so the chrome, head
   tags and JSON-LD match the other exam books byte for byte:

     exams/rrb-ntpc/index.html
     exams/rrb-ntpc/<section>/index.html
     exams/rrb-ntpc/<section>/<group>/index.html
     exams/rrb-ntpc/<section>/<group>/<topic>/index.html
     exams/rrb-ntpc/<section>/<topic>/index.html
     exams/rrb-ntpc/syllabus/index.html

   Question banks are read from the files already committed under
   data/exams/rrb-ntpc/... — this tool never writes into data/, so the
   hand-authored banks are safe. The /as/ twins are produced afterwards
   by tools/build-as-twins.js.

   Idempotent: re-running rewrites the same bytes.

   Usage:
     node tools/build-rrb-ntpc-pages.js            # apply
     node tools/build-rrb-ntpc-pages.js --check    # report drift only
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { makeExamBookTools } = require("./lib/exam-book-pages");
const { EXAM, SYLLABUS } = require("./rrb-ntpc.structure.js");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

const DATE = "2026-11-15";

const BOOK = makeExamBookTools({
  ROOT,
  DRY: CHECK,
  DATE,
  chromeLeaf: "exams/dhs-dme/general-knowledge/assam-history/index.html",
  generatorLabel: "tools/build-rrb-ntpc-pages.js",
  structureLabel: "tools/rrb-ntpc.structure.js",
  noDataWrites: true,
  affiliationNote: "axomexam.in is an independent study platform and is not affiliated with the Railway Recruitment Board or the Government of India. Verify all details from the official notification.",
});

/* The shared builder expects EXAM.syllabus (the DHS/ADRE structure files carry
   it there); rrb-ntpc.structure.js keeps it in a separate SYLLABUS export. */
const BOOK_EXAM = Object.assign({}, EXAM, { syllabus: SYLLABUS });

/* ---- load the committed banks, keyed "<exam>:<leaf>" like the builder ---- */
function readBank(examId, parts) {
  const dir = path.join(ROOT, "data", "exams", examId, ...parts);
  let manifest = null;
  try {
    manifest = JSON.parse(fs.readFileSync(path.join(dir, "index.json"), "utf8"));
  } catch (e) {
    manifest = null;
  }
  let names = (manifest && Array.isArray(manifest.files)) ? manifest.files.slice() : [];
  if (!names.length) {
    try {
      names = fs.readdirSync(dir).filter((n) => /^question-.*\.json$/i.test(n));
    } catch (e) {
      names = [];
    }
  }
  names.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const out = [];
  for (const name of names) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
      if (Array.isArray(data)) out.push(...data);
      else if (data && typeof data === "object") out.push(data);
    } catch (e) { /* skip an unreadable file rather than fail the build */ }
  }
  return out;
}

const BANKS = {};
const BANK_COUNT = {};
for (const sec of BOOK_EXAM.sections) {
  if (sec.type === "syllabus") continue;
  for (const sub of sec.subcategories || []) {
    const children = Array.isArray(sub.subcategories) ? sub.subcategories : [];
    const leaves = children.length ? children : [sub];
    for (const leaf of leaves) {
      const parts = [sec.id, ...(children.length ? [sub.id] : []), leaf.id];
      const bank = readBank(BOOK_EXAM.id, parts);
      BANKS[`${BOOK_EXAM.id}:${leaf.id}`] = bank;
      BANK_COUNT[`${BOOK_EXAM.id}:${leaf.id}`] = bank.length;
    }
  }
}

const leaves = BOOK.buildBook(BOOK_EXAM, BANKS, BANK_COUNT);
BOOK.updateExamsIndex([BOOK_EXAM], { [BOOK_EXAM.id]: leaves }, BANK_COUNT, "Assam Police");
/* Register the new URLs so tools/seo-indexing-fix.js (which only keeps
   sitemap entries whose page exists on disk) carries them through, with the
   en/as hreflang trio added once build-as-twins.js has written the twins. */
BOOK.updateSitemap([BOOK_EXAM], { [BOOK_EXAM.id]: leaves });

const total = leaves.reduce((a, l) => a + (BANK_COUNT[`${BOOK_EXAM.id}:${l.leaf.id}`] || 0), 0);
const stats = BOOK.stats();
console.log(
  `build-rrb-ntpc-pages: ${leaves.length} topics, ${total} questions, ` +
  `${stats.written} file(s) ${CHECK ? "would change" : "written"}, ${stats.skipped} unchanged`
);
