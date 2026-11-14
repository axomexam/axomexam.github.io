#!/usr/bin/env node
/* ============================================================
   axomexam — tools/sync-exam-book-totals.js

   Writes the "N questions available in this book" line into every
   available exam book landing page (exams/<exam>/index.html), just
   above the "What you will prepare" heading.

   The number is the sum of that book's top-level examSectionCounts
   entries in data/counts.json (syllabus sections carry no questions),
   so it matches what the runtime renders and stays correct whenever
   questions are added. js/app.js fills the same line live via
   hydrateExamBookTotal(); this tool keeps the committed HTML — what
   crawlers and no-JS visitors see — in step.

   Run after build-question-counts.js (see AGENTS.md build pipeline):

     node tools/sync-exam-book-totals.js            # apply
     node tools/sync-exam-book-totals.js --check    # report drift only
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

/* Same copy the runtime renders, so the static and live pages agree. */
function LINE(total) {
  const n = fmt(total);
  return `<p class="exam-book-total">${n} questions available in this book &bull; ${n} টা প্ৰশ্ন এই পুথিত উপলব্ধ</p>`;
}

/* Question total for one book: its top-level section counts. */
function bookTotal(counts, examId) {
  const sections = (counts && counts.examSectionCounts) || {};
  let total = 0;
  for (const key of Object.keys(sections)) {
    const parts = key.split("/");
    if (parts.length !== 2 || parts[0] !== examId) continue;
    total += Number(sections[key]) || 0;
  }
  return total;
}

function main() {
  const counts = readJSON(path.join(ROOT, "data", "counts.json"));
  const index = readJSON(path.join(ROOT, "data", "exams", "index.json"));
  if (!counts || !index || !Array.isArray(index.exams)) {
    console.error("sync-exam-book-totals: missing data/counts.json or data/exams/index.json");
    process.exit(1);
  }

  let changed = 0;
  let skipped = 0;
  let drift = 0;

  for (const exam of index.exams) {
    if (!exam || !exam.id) continue;
    if (exam.status && exam.status !== "available") continue;

    const file = path.join(ROOT, "exams", exam.id, "index.html");
    if (!fs.existsSync(file)) { skipped += 1; continue; }

    const total = bookTotal(counts, exam.id);
    if (total <= 0) { skipped += 1; continue; }

    let html = fs.readFileSync(file, "utf8");
    const before = html;

    /* Drop any previous line (it may sit on the wrong side of the heading),
       then place the fresh one just above "What you will prepare". */
    html = html.replace(/\s*<p class="exam-book-total"[^>]*>[\s\S]*?<\/p>/, "");
    if (/<p class="exams-choose"[^>]*>[\s\S]*?<\/p>/.test(html)) {
      html = html.replace(/([ \t]*)(<p class="exams-choose"[^>]*>[\s\S]*?<\/p>)/,
        (m, ind, p) => `${ind}${LINE(total)}\n${ind}${p}`);
    } else if (/<p class="page-desc"[^>]*>[\s\S]*?<\/p>/.test(html)) {
      html = html.replace(/([ \t]*)(<p class="page-desc"[^>]*>[\s\S]*?<\/p>)/,
        (m, ind, p) => `${ind}${p}\n${ind}${LINE(total)}`);
    } else {
      skipped += 1;
      continue;
    }

    if (html !== before) {
      if (CHECK) {
        drift += 1;
        console.error(`sync-exam-book-totals: DRIFT exams/${exam.id}/index.html (${fmt(total)} questions)`);
      } else {
        fs.writeFileSync(file, html, "utf8");
        changed += 1;
      }
    }
    console.log(`  exams/${exam.id}/index.html  ${fmt(total)} questions`);
  }

  if (CHECK && drift) process.exit(1);
  console.log(`sync-exam-book-totals: ${CHECK ? drift + " drift" : changed + " page(s) updated"}, ${skipped} skipped`);
}

main();
