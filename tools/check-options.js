#!/usr/bin/env node
"use strict";

/*
 * tools/check-options.js
 *
 * Finds items whose wrong options are not really options. The synonym bank
 * offered "Choose the synonym of 'beautiful': absurd, lovely, abrupt,
 * abundance" — three words taken from the same alphabetical block, unrelated to
 * the target. Such an item tests nothing, and rewriting its explanation cannot
 * fix it, so the size of this problem decides how the rewriting work is planned.
 *
 * The signal is reuse: a genuine distractor belongs to one question. A word that
 * turns up as a wrong option in ten or more different questions is a filler that
 * was pasted in to fill the fourth slot.
 *
 * Deliberately ignored, so the report stays believable:
 *   - numbers and single characters, which are real options in maths items;
 *   - capitalised words, because place and person names legitimately repeat
 *     across questions ("Jorhat", "Dibrugarh");
 *   - items whose options are figures, which have no option text at all.
 *
 * What the flag does and does not prove. In a closed-set subject the same wrong
 * options repeat for good reasons: articles ("a | an | no article"), verb forms,
 * syllogism conclusions, sentence orderings, districts in a geography item. The
 * audit therefore marks items for review, not as defects. The pattern that is
 * unambiguously broken is a vocabulary bank whose distractors are alphabetically
 * adjacent words unrelated to the target: "Choose the antonym of 'absurd':
 * amusing, absolve, candid, sensible". Reading the top pools is what separates
 * the two.
 *
 * Usage:
 *   node tools/check-options.js
 *   node tools/check-options.js --area exams/adre-grade-3
 *   node tools/check-options.js --min-reuse 5 --sample 20
 *   node tools/check-options.js --json /tmp/options.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");

function parseArgs(argv) {
  const opts = { area: null, minReuse: 10, minPool: 5, sample: 8, json: null, strict: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--area") opts.area = argv[++i];
    else if (a === "--min-reuse") opts.minReuse = Number(argv[++i] || 10);
    else if (a === "--min-pool") opts.minPool = Number(argv[++i] || 5);
    else if (a === "--sample") opts.sample = Number(argv[++i] || 8);
    else if (a === "--json") opts.json = argv[++i];
    else if (a === "--strict") opts.strict = true;
    else if (a === "--help" || a === "-h") {
      console.log("Usage: node tools/check-options.js [--area PREFIX] [--min-reuse N] [--min-pool N] [--sample N] [--json PATH] [--strict]");
      process.exit(0);
    }
  }
  return opts;
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

const textOf = (option) => {
  if (typeof option === "string") return option;
  if (option && typeof option === "object") return option.en || "";
  return "";
};
const isFigure = (option) => Boolean(option && typeof option === "object" && (option.fig || option.image || option.img));
/* Closed-class and structural words are real options in grammar, reasoning and
   maths items, and they repeat for good reasons. Excluding them keeps the
   report about pasted-in filler rather than about English itself. */
const CLOSED = new Set(
  ("the a an no article none all both some any each every either neither are is was were am be been being " +
    "has have had do does did will would shall should can could may might must noun verb adjective adverb " +
    "pronoun preposition conjunction interjection true false yes no " +
    "for with from of to in on at by as than that which who whom whose when where while if unless although " +
    "though since until before after over under between among into onto upon without within during about " +
    "above below across along behind beyond near off out through toward towards up down many few much more " +
    "most less least because so but and or not only also")
    .split(" ")
);
const STRUCTURAL = /\b(conclusion|follows|follow|statement|assumption|argument|inference)\b/i;

/* Capitalisation is checked before lowercasing: "Jorhat" and "Dibrugarh" repeat
   because they are districts, not because they were pasted in. */
const isPlainWord = (raw) => {
  if (typeof raw !== "string") return false;
  const s = raw.trim();
  if (!/^[a-z]/.test(s)) return false;
  if (!/^[a-z][a-z' -]{2,}$/.test(s)) return false;
  if (CLOSED.has(s)) return false;
  if (STRUCTURAL.test(s)) return false;
  return true;
};

const opts = parseArgs(process.argv.slice(2));
const files = walk(DATA, []);
const items = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  if (opts.area && !rel.includes(opts.area)) continue;
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    continue;
  }
  const list = Array.isArray(data) ? data : data && Array.isArray(data.questions) ? data.questions : null;
  if (!list) continue;
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    if (!Array.isArray(item.options) || !Number.isInteger(item.correct)) continue;
    const q = item.q && typeof item.q === "object" ? item.q.en : item.q;
    if (typeof q !== "string" || !q.trim()) continue;
    items.push({ file: rel, q, item });
  }
}

/* A distractor counts once per question, so a bank that repeats the same item
   many times does not inflate the reuse number. */
const reuse = new Map();
for (const { q, item } of items) {
  item.options.forEach((option, i) => {
    if (i === item.correct || isFigure(option)) return;
    const raw = textOf(option).trim();
    if (!isPlainWord(raw)) return;
    const text = raw.toLowerCase();
    if (!reuse.has(text)) reuse.set(text, new Set());
    reuse.get(text).add(q);
  });
}
const reused = (text) => (reuse.get(text) ? reuse.get(text).size : 0);

/* The sharper signal: the same wrong options come back together. A bank that
   offers "abundance, abrupt, absurd" as the three distractors of dozens of
   different questions was filled from a pool, and no single-word count makes
   that as obvious. */
const poolKey = (item) => {
  const wrong = item.options
    .filter((o, i) => i !== item.correct && !isFigure(o))
    .map((o) => textOf(o).trim().toLowerCase())
    .sort();
  return wrong.join(" | ");
};
const contentMembers = (key) =>
  key.split(" | ").filter((w) => isPlainWord(w) && w.length >= 4 && !/^\d+$/.test(w)).length;

const pools = new Map();
for (const { q, item } of items) {
  const key = poolKey(item);
  if (!key) continue;
  /* "a | no article | the" and "1 | 3 | 4" repeat because the subject repeats
     them, not because a pool was pasted in. A recycled set has to be mostly
     content words. */
  if (contentMembers(key) < 2) continue;
  if (!pools.has(key)) pools.set(key, { questions: new Set(), example: q });
  pools.get(key).questions.add(q);
}

const flagged = [];
const counts = { pooled: 0, filler: 0, weak: 0, duplicate: 0, empty: 0, badAnswer: 0 };

for (const { file, q, item } of items) {
  const texts = item.options.map((o) => textOf(o).trim());
  const figures = item.options.filter(isFigure).length;
  const flags = [];

  if (figures === 0) {
    const fillerCount = item.options.filter((o, i) => {
      if (i === item.correct) return false;
      const raw = textOf(o).trim();
      return isPlainWord(raw) && reused(raw.toLowerCase()) >= opts.minReuse;
    }).length;
    if (fillerCount >= 2) { flags.push("filler"); counts.filler++; }
    else if (fillerCount === 1) { flags.push("weak"); counts.weak++; }
    if (new Set(texts.map((t) => t.toLowerCase())).size < texts.length) { flags.push("duplicate"); counts.duplicate++; }
    if (texts.some((t) => !t)) { flags.push("empty"); counts.empty++; }
  }
  if (item.correct < 0 || item.correct >= item.options.length) { flags.push("bad-answer"); counts.badAnswer++; }

  const pool = pools.get(poolKey(item));
  if (pool && pool.questions.size >= opts.minPool) {
    flags.push("pooled");
    counts.pooled++;
  }

  if (flags.length) flagged.push({ file, q, flags, options: texts });
}

const pct = (n) => (items.length ? Math.round((n / items.length) * 100) : 0);
const topReused = [...reuse.entries()]
  .filter(([, set]) => set.size >= opts.minReuse)
  .sort((a, b) => b[1].size - a[1].size)
  .slice(0, 12);

const byArea = new Map();
for (const row of flagged) {
  const area = row.file.split("/").slice(1, 3).join("/") || "root";
  const bucket = byArea.get(area) || { n: 0, items: 0 };
  bucket.n++;
  byArea.set(area, bucket);
}
for (const { file } of items) {
  const area = file.split("/").slice(1, 3).join("/") || "root";
  const bucket = byArea.get(area) || { n: 0, items: 0 };
  bucket.items++;
  byArea.set(area, bucket);
}

const byFile = new Map();
for (const row of flagged) byFile.set(row.file, (byFile.get(row.file) || 0) + 1);
const heavy = [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

console.log("Option quality audit");
console.log("");
console.log(`  files scanned        : ${files.length}`);
console.log(`  items audited        : ${items.length}`);
console.log(`  flagged              : ${flagged.length} (${pct(flagged.length)}%)`);
console.log("");
console.log(`  recycled option sets : ${counts.pooled} (${pct(counts.pooled)}%)`);
console.log(`  2+ filler distractors: ${counts.filler} (${pct(counts.filler)}%)`);
console.log(`  1 filler distractor  : ${counts.weak} (${pct(counts.weak)}%)`);
console.log(`  duplicate options    : ${counts.duplicate}`);
console.log(`  empty option text    : ${counts.empty}`);
console.log(`  answer out of range  : ${counts.badAnswer}`);
console.log("");
console.log(`  distractor words used in ${opts.minReuse}+ different questions`);
for (const [word, set] of topReused) console.log(`    ${String(set.size).padStart(5)}  ${word}`);
console.log("");
const topPools = [...pools.entries()]
  .filter(([, p]) => p.questions.size >= opts.minPool)
  .sort((a, b) => b[1].questions.size - a[1].questions.size)
  .slice(0, 8);
if (topPools.length) {
  console.log(`  the same wrong options, reused across ${opts.minPool}+ questions`);
  for (const [key, p] of topPools) {
    console.log(`    ${String(p.questions.size).padStart(4)} questions  ${key.slice(0, 80)}`);
  }
  console.log("");
}
console.log("  by area");
for (const [area, b] of [...byArea.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 12)) {
  console.log(`    ${area.padEnd(34)} ${String(b.items).padStart(6)} items  ${String(b.n).padStart(6)} flagged`);
}
console.log("");
console.log("  files with the most flagged items");
for (const [file, n] of heavy) console.log(`    ${String(n).padStart(5)}  ${file}`);

const sample = flagged.slice(0, opts.sample);
if (sample.length) {
  console.log("");
  console.log(`  sample (${sample.length} of ${flagged.length})`);
  for (const row of sample) {
    console.log(`    [${row.flags.join(",")}] ${row.file}`);
    console.log(`      ${row.q.slice(0, 90)}`);
    console.log(`      ${row.options.join(" | ").slice(0, 110)}`);
  }
}

if (opts.json) {
  fs.writeFileSync(opts.json, JSON.stringify(flagged, null, 1));
  console.log(`\n  wrote ${flagged.length} rows to ${opts.json}`);
}

if (opts.strict && flagged.length) process.exit(1);
