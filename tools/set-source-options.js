#!/usr/bin/env node
"use strict";

/*
 * tools/set-source-options.js
 *
 * Repairs the options of a question, not just its explanation. Many synonym
 * items offer three distractors that have nothing to do with the target word
 * ("Choose the synonym of 'beautiful': absurd, lovely, abrupt, abundance"), so
 * the item tests nothing and no explanation can rescue it.
 *
 * A row replaces the whole option set and the explanation together, because
 * they have to agree: an explanation that eliminates "abundance" is wrong once
 * "abundance" is gone.
 *
 * Patch format, one row per question:
 *
 *   {
 *     "source": "tools/english-src/synonyms.js",
 *     "q": "Choose the synonym of 'abrupt'.",
 *     "options": [["gradual","ক্ৰমশঃ"], ["steep","খাড়া"], ["polite","নম্ৰ"], ["sudden","আকস্মিক"]],
 *     "correct": "sudden",
 *     "en": "explanation, 25+ words",
 *     "as": "ব্যাখ্যা"
 *   }
 *
 * The answer is named, not indexed, so a reordered option list cannot silently
 * point at the wrong word. The marked answer must already be the correct one in
 * the source row; this tool rewrites options, never the answer key.
 *
 * Writes three places, all of them needed:
 *   tools/english-src/*.js           the authored row
 *   data/exams/**\/question-*.json   the generated data
 *   exams/**\/index.html             the generated page (option text only)
 *
 * Usage:
 *   node tools/set-source-options.js batch.json --dry
 *   node tools/set-source-options.js batch.json
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
  console.error("usage: node tools/set-source-options.js <patch.json> [--dry] [--force]");
  process.exit(1);
}

const countWords = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const jsString = (s) => '"' + String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const unescapeJs = (s) => s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");

function walk(dir, name, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, name, out);
    else if (entry.isFile() && (name === null ? full.endsWith(".json") : entry.name === name)) out.push(full);
  }
  return out;
}

const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));
const problems = [];
for (const row of patch) {
  if (!row.source || !row.q || !Array.isArray(row.options) || !row.correct || !row.en) {
    problems.push("row needs source, q, options, correct and en: " + JSON.stringify(row).slice(0, 80));
    continue;
  }
  const names = row.options.map((o) => (Array.isArray(o) ? o[0] : o));
  if (names.length < 2) problems.push(`${row.q}: fewer than two options`);
  if (!names.includes(row.correct)) problems.push(`${row.q}: correct "${row.correct}" is not one of the options`);
  if (countWords(row.en) < MIN_WORDS && !force) problems.push(`${row.q}: explanation is ${countWords(row.en)} words`);
  if (new Set(names.map((n) => n.toLowerCase())).size !== names.length) problems.push(`${row.q}: duplicate option text`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const bySource = new Map();
for (const row of patch) {
  if (!bySource.has(row.source)) bySource.set(row.source, new Map());
  bySource.get(row.source).set(row.q, row);
}

const changes = new Map();
let rowsWritten = 0;
let missed = 0;

for (const [rel, rows] of bySource) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.error("missing source:", rel);
    missed += rows.size;
    continue;
  }
  const lines = fs.readFileSync(abs, "utf8").split("\n");
  const pending = new Set(rows.keys());
  let changed = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('["')) continue;
    const head = line.match(
      /^\["((?:[^"\\]|\\.)*)","((?:[^"\\]|\\.)*)",(\[.*?\]),\s*(-?\d+),\s*"((?:[^"\\]|\\.)*)",\s*"((?:[^"\\]|\\.)*)"\],?$/
    );
    if (!head) continue;
    const q = unescapeJs(head[1]);
    const row = rows.get(q);
    if (!row) continue;

    const pairs = [...head[3].matchAll(/"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => [
      unescapeJs(m[1]),
      unescapeJs(m[2]),
    ]);
    const marked = pairs[Number(head[4])];
    if (!marked) {
      console.error(`  ${rel}: "${q.slice(0, 40)}" has no option at index ${head[4]}`);
      continue;
    }
    if (pairs.length !== row.options.length) {
      console.error(`  ${rel}: "${q.slice(0, 40)}" has ${pairs.length} options in source, ${row.options.length} in patch`);
      continue;
    }
    if (marked[0] !== row.correct) {
      console.error(`  ${rel}: "${q.slice(0, 40)}" marks "${marked[0]}", patch says "${row.correct}"`);
      continue;
    }

    const opts = row.options.map((o) => (Array.isArray(o) ? o : [o, ""]));
    const correctIndex = opts.findIndex(([en]) => en === row.correct);
    const rebuilt =
      '["' + head[1] + '","' + head[2] + '",[' +
      opts.map(([en, as]) => jsString(en) + ", " + jsString(as || "")).join(", ") +
      "], " + correctIndex + ", " + jsString(row.en) + ", " + jsString(row.as || "") + "],";

    if (rebuilt !== line) {
      lines[i] = rebuilt;
      changed++;
      rowsWritten++;
      /* The page and the generated JSON hold the options in a different order
         from this source row, so the replacement cannot be positional. Pair the
         old distractors with the new ones in the order each list appears, and
         leave the answer word out of it: the answer never changes. */
      const oldWrong = pairs.map(([en]) => en).filter((en) => en !== row.correct);
      const newWrong = opts.map(([en]) => en).filter((en) => en !== row.correct);
      if (oldWrong.length !== newWrong.length) {
        console.error(`  ${rel}: "${q.slice(0, 40)}" has ${oldWrong.length} distractors, patch has ${newWrong.length}`);
        continue;
      }
      const wordMap = new Map(oldWrong.map((en, idx) => [en, newWrong[idx]]));
      changes.set(q, { wordMap, correct: row.correct, opts });
    }
    pending.delete(q);
  }

  for (const q of pending) {
    console.error(`  ${rel}: no row for "${q.slice(0, 60)}"`);
    missed++;
  }

  if (changed && !dry) fs.writeFileSync(abs, lines.join("\n"));
}

/* Generated data: options are matched by their English text, never by index,
   because the builder shuffles the order it renders. */
let dataFiles = 0;
if (changes.size) {
  const examDir = path.join(ROOT, "data", "exams");
  const candidates = walk(examDir, null).filter((f) => path.basename(f).startsWith("question-"));
  for (const file of candidates) {
    const raw = fs.readFileSync(file, "utf8");
    if (![...changes.keys()].some((q) => raw.includes(JSON.stringify(q).slice(1, -1)))) continue;
    const data = JSON.parse(raw);
    const items = Array.isArray(data) ? data : data.questions;
    if (!Array.isArray(items)) continue;
    let touched = false;
    for (const item of items) {
      const change = item && item.q ? changes.get(item.q.en) : null;
      if (!change) continue;
      item.options = item.options.map((opt) => {
        const next = change.wordMap.get(opt.en);
        if (!next) return opt;
        const gloss = (change.opts.find(([en]) => en === next) || [next, ""])[1];
        if (next === opt.en) return opt;
        touched = true;
        return { en: next, as: gloss };
      });
      const answerIndex = item.options.findIndex((opt) => opt.en === change.correct);
      if (answerIndex >= 0 && item.correct !== answerIndex) {
        item.correct = answerIndex;
        touched = true;
      }
      const row = patch.find((r) => r.q === item.q.en);
      if (row && item.explanation) {
        if (item.explanation.en !== row.en) { item.explanation.en = row.en; touched = true; }
        if (row.as && item.explanation.as !== row.as) { item.explanation.as = row.as; touched = true; }
      }
    }
    if (touched && !dry) {
      fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
      dataFiles++;
    }
  }
}

/* Generated pages: one qa-item block per question, so the block is the scope of
   the replacement. Filler words repeat across items and a page-wide swap would
   rewrite other questions. */
let pagesWritten = 0;
if (changes.size) {
  for (const page of walk(path.join(ROOT, "exams"), "index.html")) {
    let html = fs.readFileSync(page, "utf8");
    const here = [...changes.keys()].filter((q) => html.includes(escapeHtml(q)));
    if (!here.length) continue;
    const blocks = html.split('<div class="qa-item');
    let swapped = 0;
    for (let b = 1; b < blocks.length; b++) {
      for (const q of here) {
        if (!blocks[b].includes(escapeHtml(q))) continue;
        const change = changes.get(q);
        for (const [oldEn, newEn] of change.wordMap) {
          if (oldEn === newEn) continue;
          const newAs = (change.opts.find(([en]) => en === newEn) || [newEn, ""])[1];
          const from = ") " + escapeHtml(oldEn) + ' <span class="qs2" lang="as">';
          const at = blocks[b].indexOf(from);
          if (at < 0) continue;
          const close = blocks[b].indexOf("</span>", at);
          if (close < 0) continue;
          blocks[b] =
            blocks[b].slice(0, at) +
            ") " + escapeHtml(newEn) + ' <span class="qs2" lang="as">' + escapeHtml(newAs) +
            blocks[b].slice(close);
          swapped++;
        }
      }
    }
    if (swapped && !dry) {
      fs.writeFileSync(page, blocks.join('<div class="qa-item'));
      pagesWritten++;
    }
  }
}

console.log(
  `${dry ? "would rewrite" : "rewrote"} ${rowsWritten} question(s) in source, ` +
    `${dataFiles} data file(s), ${pagesWritten} page(s)` + (missed ? `, ${missed} not matched` : "")
);
if (missed) process.exit(1);
