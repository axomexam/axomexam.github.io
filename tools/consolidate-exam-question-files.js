#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/consolidate-exam-question-files.js

   A topic's whole bank belongs in ONE file (question-001.json), which is how
   every book except RRB NTPC is laid out. RRB NTPC was uploaded one file per
   question instead, so a single topic can hold hundreds of files. The browser
   has to fetch each of them (biology = 310 files, modern-history = 430), which
   is why those pages take seconds to render.

   This tool merges a multi-file topic back into question-001.json, deletes the
   now-redundant files and rewrites index.json's "files" array to match. Question
   order is preserved (files are concatenated in the same numeric order the
   runtime sorts them in), so the rendered pages are unchanged.

   Usage:
     node tools/consolidate-exam-question-files.js            # apply
     node tools/consolidate-exam-question-files.js --check    # report only
     node tools/consolidate-exam-question-files.js --book rrb-ntpc
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXAMS = path.join(ROOT, "data", "exams");
const CHECK = process.argv.includes("--check");
const BOOK = (() => {
  const i = process.argv.indexOf("--book");
  return i >= 0 ? process.argv[i + 1] : null;
})();

const PRIMARY = "question-001.json";
const isQuestionFile = (n) => /^question-\d+\.json$/i.test(n);
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function questionDirs() {
  const out = [];
  const books = BOOK
    ? [BOOK]
    : fs.readdirSync(EXAMS).filter((b) => fs.statSync(path.join(EXAMS, b)).isDirectory());
  for (const book of books) {
    const base = path.join(EXAMS, book);
    if (!fs.existsSync(base)) continue;
    const walk = (dir) => {
      let entries;
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
      if (entries.some((e) => e.isFile() && isQuestionFile(e.name))) out.push(dir);
      for (const e of entries) if (e.isDirectory()) walk(path.join(dir, e.name));
    };
    walk(base);
  }
  return out;
}

function main() {
  let merged = 0;
  let removed = 0;
  let questions = 0;

  for (const dir of questionDirs()) {
    const names = fs.readdirSync(dir).filter(isQuestionFile).sort(byName);
    if (names.length <= 1) continue;

    const bank = [];
    for (const name of names) {
      let data;
      try { data = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")); } catch (e) {
        throw new Error(`Unreadable ${path.join(dir, name)}: ${e.message}`);
      }
      if (Array.isArray(data)) bank.push(...data);
      else if (data && typeof data === "object") bank.push(data);
    }

    const rel = path.relative(ROOT, dir);
    console.log(`  ${rel}: ${names.length} files -> ${PRIMARY} (${bank.length} questions)`);
    merged++;
    removed += names.length - 1;
    questions += bank.length;

    if (CHECK) continue;

    fs.writeFileSync(path.join(dir, PRIMARY), JSON.stringify(bank, null, 2) + "\n", "utf8");
    for (const name of names) {
      if (name !== PRIMARY) fs.unlinkSync(path.join(dir, name));
    }

    const idxPath = path.join(dir, "index.json");
    let idx = {};
    try { idx = JSON.parse(fs.readFileSync(idxPath, "utf8")); } catch (e) { idx = {}; }
    idx.files = [PRIMARY];
    fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2) + "\n", "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}Consolidate exam question files`);
  console.log(`  Topics merged:     ${merged}`);
  console.log(`  Files removed:     ${CHECK ? removed : removed}`);
  console.log(`  Questions kept:    ${questions}`);
}

main();
