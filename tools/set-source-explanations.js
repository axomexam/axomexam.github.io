#!/usr/bin/env node
"use strict";

/*
 * tools/set-source-explanations.js
 *
 * Rewrites explanations in the compact banks under tools/english-src/, which
 * are the source of truth. data/exams/** and exams/** are generated from them,
 * so editing the generated JSON would be undone by the next build.
 *
 * A compact row is one line:
 *   ["question", "প্ৰশ্ন", [options...], correct, "explanation", "ব্যাখ্যা"],
 *
 * Rows are matched on the English question text, because the generated ids
 * change when a bank is reordered and the answer index is shuffled at build
 * time.
 *
 * Patch format:
 *   [
 *     {
 *       "source": "tools/english-src/synonyms.js",
 *       "q": "Choose the synonym of 'abolish'.",
 *       "en": "rewritten explanation",
 *       "as": "optional Assamese"
 *     }
 *   ]
 *
 * Usage:
 *   node tools/set-source-explanations.js batch.json --dry
 *   node tools/set-source-explanations.js batch.json
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
  console.error("usage: node tools/set-source-explanations.js <patch.json> [--dry] [--force]");
  process.exit(1);
}

const countWords = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const jsString = (s) => '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';

const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));
const bySource = new Map();
for (const row of patch) {
  if (!row.source || !row.q || !row.en) {
    console.error("every row needs source, q and en:", JSON.stringify(row).slice(0, 120));
    process.exit(1);
  }
  if (countWords(row.en) < MIN_WORDS && !force) {
    console.error(`${row.q}: ${countWords(row.en)} words, under the ${MIN_WORDS}-word floor`);
    process.exit(1);
  }
  if (!bySource.has(row.source)) bySource.set(row.source, new Map());
  bySource.get(row.source).set(row.q, row);
}

let applied = 0;
let missed = 0;
let files = 0;

for (const [rel, rows] of bySource) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.error("missing source:", rel);
    missed += rows.size;
    continue;
  }
  const lines = fs.readFileSync(abs, "utf8").split("\n");
  let changed = 0;
  const pending = new Set(rows.keys());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('["')) continue;
    const qMatch = line.match(/^\["((?:[^"\\]|\\.)*)"/);
    if (!qMatch) continue;
    const q = qMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    const row = rows.get(q);
    if (!row) continue;

    /* The last two fields are the explanations; everything before them is left
       exactly as written, so the option order and answer index are untouched. */
    const tail = line.match(/,\s*(-?\d+),\s*"((?:[^"\\]|\\.)*)",\s*"((?:[^"\\]|\\.)*)"\],?\s*$/);
    if (!tail) {
      console.error(`  ${rel}: cannot read the explanation fields of "${q.slice(0, 50)}"`);
      continue;
    }
    const rebuilt =
      line.slice(0, tail.index) + ", " + tail[1] + ", " + jsString(row.en) + ", " + jsString(row.as || "") + "],";
    if (rebuilt !== line) {
      lines[i] = rebuilt;
      changed++;
      applied++;
    }
    pending.delete(q);
  }

  for (const q of pending) {
    console.error(`  ${rel}: no row for "${q.slice(0, 60)}"`);
    missed++;
  }

  if (changed && !dry) {
    fs.writeFileSync(abs, lines.join("\n"));
    files++;
  }
}

console.log(
  `${dry ? "would set" : "set"} ${applied} explanation(s) in ${dry ? bySource.size : files} source file(s)` +
    (missed ? `, ${missed} not matched` : "")
);
if (missed) process.exit(1);
