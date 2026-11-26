#!/usr/bin/env node
"use strict";

/*
 * tools/apply-explanations.js
 *
 * Applies rewritten explanations from a patch file onto the question data, so a
 * rewrite batch is one reviewed JSON document instead of hand-editing files
 * that hold hundreds of items.
 *
 * Patch format: a JSON array, one row per question.
 *
 *   [
 *     {
 *       "file": "data/exams/.../question-001.json",
 *       "id": "synonyms-002",
 *       "en": "rewritten explanation, 25+ words",
 *       "as": "optional Assamese explanation"
 *     }
 *   ]
 *
 * Refuses rows under 25 English words unless --force is given, because the
 * whole point of the pass is to leave the one-line answers behind. Only
 * `explanation` is written; options, the marked answer and the question text
 * are never touched.
 *
 * The pages are static HTML generated from the data, so the old explanation is
 * also swapped for the new one in the matching page (data/exams/a/b/q.json ->
 * exams/a/b/index.html). A page that does not exist for a data file is reported
 * and skipped; nothing else on the page is rewritten.
 *
 * Usage:
 *   node tools/apply-explanations.js batch-01.json --dry
 *   node tools/apply-explanations.js batch-01.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MIN_WORDS = 25;

const args = process.argv.slice(2);
const patchPath = args.find((a) => !a.startsWith("--"));
const dry = args.includes("--dry");
const force = args.includes("--force");

if (!patchPath) {
  console.error("usage: node tools/apply-explanations.js <patch.json> [--dry] [--force]");
  process.exit(1);
}

const countWords = (s) => s.trim().split(/\s+/).filter(Boolean).length;

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function pageFor(rel) {
  const m = rel.match(/^data\/(.+)\/question-\d+\.json$/);
  if (!m) return null;
  return path.join(ROOT, m[1], "index.html");
}

const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));
if (!Array.isArray(patch)) {
  console.error("patch must be a JSON array");
  process.exit(1);
}

const byFile = new Map();
for (const row of patch) {
  if (!row.file || !row.id || !row.en) {
    console.error("every row needs file, id and en:", JSON.stringify(row).slice(0, 120));
    process.exit(1);
  }
  const words = countWords(row.en);
  if (words < MIN_WORDS && !force) {
    console.error(`${row.id}: ${words} words, under the ${MIN_WORDS}-word floor (use --force to accept)`);
    process.exit(1);
  }
  if (!byFile.has(row.file)) byFile.set(row.file, []);
  byFile.get(row.file).push(row);
}

let applied = 0;
let missed = 0;
let written = 0;
let unchanged = 0;

for (const [rel, rows] of byFile) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.error("missing file:", rel);
    missed += rows.length;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(abs, "utf8"));
  const items = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(items)) {
    console.error("no question list in", rel);
    missed += rows.length;
    continue;
  }
  const index = new Map(items.filter((it) => it && it.id).map((it) => [it.id, it]));
  const edits = [];
  let changed = 0;
  for (const row of rows) {
    const item = index.get(row.id);
    if (!item) {
      console.error(`  ${rel}: no item with id ${row.id}`);
      missed++;
      continue;
    }
    const current = item.explanation && item.explanation.en;
    const currentAs = item.explanation && item.explanation.as;
    if (current === row.en && (!row.as || item.explanation.as === row.as)) {
      unchanged++;
      continue;
    }
    if (!item.explanation || typeof item.explanation !== "object") item.explanation = { en: "", as: "" };
    item.explanation.en = row.en;
    if (row.as) item.explanation.as = row.as;
    edits.push({ before: current, beforeAs: currentAs, after: row.en, afterAs: row.as });
    changed++;
    applied++;
  }
  if (changed && !dry) {
    fs.writeFileSync(abs, JSON.stringify(data, null, 2) + "\n");
    written++;
  }

  const page = pageFor(rel);
  if (changed && page) {
    if (!fs.existsSync(page)) {
      console.error(`  no page for ${rel} (looked for ${path.relative(ROOT, page)})`);
    } else {
      let html = fs.readFileSync(page, "utf8");
      let swapped = 0;
      for (const edit of edits) {
        for (const [before, after] of [
          [edit.before, edit.after],
          [edit.beforeAs, edit.afterAs],
        ]) {
          if (!before || !after || before === after) continue;
          const from = escapeHtml(before);
          const to = escapeHtml(after);
          if (html.includes(from)) {
            html = html.split(from).join(to);
            swapped++;
          }
        }
      }
      if (swapped && !dry) {
        fs.writeFileSync(page, html);
        written++;
      }
      if (swapped !== edits.filter((e) => e.before).length * 2) {
        console.error(`  ${path.relative(ROOT, page)}: swapped ${swapped} of ${edits.length * 2} explanation strings`);
      }
    }
  }
}

console.log(
  `${dry ? "would apply" : "applied"} ${applied} explanation(s) in ${dry ? byFile.size : written} file(s)` +
    (unchanged ? `, ${unchanged} already up to date` : "") +
    (missed ? `, ${missed} not matched` : "")
);

if (missed) process.exit(1);
