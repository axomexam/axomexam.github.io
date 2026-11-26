#!/usr/bin/env node
"use strict";

/*
 * tools/check-explanations.js
 *
 * Measures whether the answer explanations carry any teaching, because that is
 * what the site promises and what a reviewer reads first. A practice page whose
 * explanation is "'Frank' is a synonym of 'candid'." is an answer key, not a
 * study resource, and 46% of the bank is in that state.
 *
 * Three checks per explanation, each one a thing a reader notices:
 *
 *   length      - 25+ words in English, 20+ in Assamese (Assamese packs the
 *                 same meaning into fewer words, so the floor is lower)
 *   elimination - names at least one wrong option, or says why the others
 *                 fail. Without this the explanation only repeats the key.
 *   restatement - adds at least 6 content words that are not in the question,
 *                 judged only on explanations that already meet the floor.
 *                 Catches "The sum of the interior angles of a triangle is
 *                 180°." answering "The sum of the interior angles of a
 *                 triangle is:".
 *
 * Read-only. Prints a summary, a per-area table, and the worst offenders so a
 * rewrite batch can start from the bottom.
 *
 * Usage:
 *   node tools/check-explanations.js
 *   node tools/check-explanations.js --sample 20
 *   node tools/check-explanations.js --area exams/adre-grade-3
 *   node tools/check-explanations.js --json /tmp/explanations.json
 *   node tools/check-explanations.js --strict      # exit 1 if anything fails
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");

const EN_MIN_WORDS = 25;
const AS_MIN_WORDS = 20;
const MIN_NEW_CONTENT_WORDS = 6;

const STOPWORDS = new Set(
  ("the and of to in is are was were a an it that this with for on as by from at or be not no " +
    "which what when where who how all any but if its their there then than so we you they he she " +
    "i do does did has have had can could will would should may might must also only same such")
    .split(" ")
);

const ELIMINATION = /\b(other|remaining|rest|wrong|incorrect|not correct|eliminat\w*|rules? out|distractor|trap)\b|অন্যান্য|বাকী|ভুল|অশুদ্ধ|শুদ্ধ নহয়|নহয়/u;

function parseArgs(argv) {
  const opts = { sample: 0, area: null, json: null, strict: false, minWords: EN_MIN_WORDS };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--sample") opts.sample = Number(argv[++i] || 0);
    else if (a === "--area") opts.area = argv[++i];
    else if (a === "--json") opts.json = argv[++i];
    else if (a === "--strict") opts.strict = true;
    else if (a === "--min-words") opts.minWords = Number(argv[++i] || EN_MIN_WORDS);
    else if (a === "--help" || a === "-h") {
      console.log("Usage: node tools/check-explanations.js [--sample N] [--area PREFIX] [--json PATH] [--strict] [--min-words N]");
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

const words = (s) => (typeof s === "string" ? s.trim().split(/\s+/).filter(Boolean) : []);
const normal = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

function contentWords(s) {
  return normal(s)
    .split(" ")
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}

function pickLang(value, lang) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value[lang] || "";
  return "";
}

function questionsOf(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && Array.isArray(data.questions)) return data.questions;
  return null;
}

function audit(item) {
  const q = pickLang(item.q || item.question, "en");
  const options = Array.isArray(item.options) ? item.options : [];
  const correct = Number.isInteger(item.correct) ? item.correct : -1;
  const expEn = pickLang(item.explanation, "en");
  const expAs = pickLang(item.explanation, "as");

  const flags = [];
  const enWords = words(expEn);

  if (!expEn.trim()) flags.push("missing");
  else {
    if (enWords.length < EN_MIN_WORDS) flags.push("short");
    if (!ELIMINATION.test(expEn)) {
      const wrongOptions = options
        .map((o, i) => (i === correct ? null : normal(pickLang(o, "en"))))
        .filter((t) => t && t.length >= 4);
      const haystack = normal(expEn);
      if (!wrongOptions.some((t) => haystack.includes(t))) flags.push("no-elimination");
    }
    /* Only judge repetition once the explanation is long enough to carry any:
       below the length floor every explanation looks like a restatement. */
    if (enWords.length >= EN_MIN_WORDS) {
      const asked = new Set(contentWords(q));
      const fresh = contentWords(expEn).filter((w) => !asked.has(w));
      if (new Set(fresh).size < MIN_NEW_CONTENT_WORDS) flags.push("restates");
    }
  }

  const asWords = words(expAs);
  const asFlags = [];
  if (!expAs.trim()) asFlags.push("missing");
  else if (asWords.length < AS_MIN_WORDS) asFlags.push("short");

  return { q, flags, asFlags, enWords: enWords.length, asWords: asWords.length };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const files = walk(DATA, []);
  const seen = new Map();
  let questionFiles = 0;
  let instances = 0;
  let duplicates = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (opts.area && !rel.includes(opts.area)) continue;
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      continue;
    }
    const items = questionsOf(data);
    if (!items || !items.length) continue;
    if (!items.some((it) => it && typeof it === "object" && (it.q || it.question))) continue;
    questionFiles++;
    for (const item of items) {
      if (!item || typeof item !== "object") continue;
      /* Notes files use {q, a} for study text, not a multiple-choice item.
         Only an item with real options and a marked answer is audited. */
      const isMcq =
        Array.isArray(item.options) && item.options.length >= 2 && Number.isInteger(item.correct);
      if (!isMcq) {
        skipped++;
        continue;
      }
      instances++;
      const key = normal(pickLang(item.q || item.question, "en"));
      if (seen.has(key)) {
        duplicates++;
        continue;
      }
      const res = audit(item);
      res.file = rel;
      seen.set(key, res);
    }
  }

  const all = [...seen.values()];
  const tally = (key) => {
    const counts = {};
    for (const r of all) for (const f of r[key]) counts[f] = (counts[f] || 0) + 1;
    return counts;
  };
  const en = tally("flags");
  const as = tally("asFlags");
  const pass = all.filter((r) => r.flags.length === 0).length;
  const lens = all.map((r) => r.enWords).sort((a, b) => a - b);
  const median = lens.length ? lens[Math.floor(lens.length / 2)] : 0;
  const pct = (n) => (all.length ? Math.round((n / all.length) * 100) : 0);

  const byArea = new Map();
  for (const r of all) {
    const area = r.file.split("/").slice(1, 3).join("/") || "root";
    const bucket = byArea.get(area) || { n: 0, fail: 0 };
    bucket.n++;
    if (r.flags.length) bucket.fail++;
    byArea.set(area, bucket);
  }
  const areas = [...byArea.entries()].sort((a, b) => b[1].fail - a[1].fail);

  console.log("Explanation quality audit");
  console.log("");
  console.log(`  files scanned          : ${files.length}`);
  console.log(`  question files         : ${questionFiles}`);
  console.log(`  question instances     : ${instances}`);
  console.log(`  distinct questions     : ${all.length}`);
  console.log(`  repeated copies skipped: ${duplicates}`);
  console.log(`  non-MCQ items skipped  : ${skipped}`);
  console.log("");
  console.log(`  English explanations   : ${all.length}`);
  console.log(`    pass all checks      : ${pass} (${pct(pass)}%)`);
  console.log(`    too short (<${EN_MIN_WORDS} words) : ${en.short || 0} (${pct(en.short || 0)}%)`);
  console.log(`    no elimination       : ${en["no-elimination"] || 0} (${pct(en["no-elimination"] || 0)}%)`);
  console.log(`    restates question    : ${en.restates || 0} (${pct(en.restates || 0)}%)`);
  console.log(`    missing              : ${en.missing || 0}`);
  console.log(`    median length        : ${median} words`);
  console.log("");
  console.log(`  Assamese explanations  : ${all.length}`);
  console.log(`    too short (<${AS_MIN_WORDS} words) : ${as.short || 0} (${pct(as.short || 0)}%)`);
  console.log(`    missing              : ${as.missing || 0}`);
  console.log("");
  console.log("  by area (English)");
  for (const [area, b] of areas.slice(0, 12)) {
    console.log(`    ${area.padEnd(34)} ${String(b.n).padStart(6)}  ${String(Math.round((b.fail / b.n) * 100)).padStart(3)}% need work`);
  }

  const byFile = new Map();
  for (const r of all) {
    if (!r.flags.length) continue;
    byFile.set(r.file, (byFile.get(r.file) || 0) + 1);
  }
  const heavy = [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  console.log("");
  console.log("  files with the most explanations to rewrite");
  for (const [file, n] of heavy) console.log(`    ${String(n).padStart(5)}  ${file}`);

  const worst = all
    .filter((r) => r.flags.length)
    .sort((a, b) => b.flags.length - a.flags.length || a.enWords - b.enWords)
    .slice(0, opts.sample || 8);
  console.log("");
  console.log(`  shortest failing explanations (${worst.length} of ${all.length - pass})`);
  for (const r of worst) {
    console.log(`    ${String(r.enWords).padStart(3)}w [${r.flags.join(",")}] ${r.file}`);
    console.log(`         ${r.q.slice(0, 100)}`);
  }

  if (opts.json) {
    const out = all.map((r) => ({ file: r.file, q: r.q, flags: r.flags, asFlags: r.asFlags, enWords: r.enWords, asWords: r.asWords }));
    fs.writeFileSync(opts.json, JSON.stringify(out, null, 1));
    console.log(`\n  wrote ${out.length} rows to ${opts.json}`);
  }

  if (opts.strict && pass !== all.length) process.exit(1);
}

main();
