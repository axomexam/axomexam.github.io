#!/usr/bin/env node
/**
 * Fact-consistency audit for every question bank under data/exams/.
 *
 * Catches the classes of error that a generator can introduce without any
 * external source: the same question answered two different ways, the same
 * work attributed to two different people, duplicate stems, broken options and
 * skewed answer keys.
 *
 *   node tools/audit-facts.js               # summary + worst offenders
 *   node tools/audit-facts.js --book rrb-ntpc
 *   node tools/audit-facts.js --all         # print every finding
 *   node tools/audit-facts.js --json        # machine-readable
 */
"use strict";

const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data", "exams");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => {
  const i = args.indexOf(n);
  return i === -1 ? null : args[i + 1];
};
const BOOK = opt("--book");
const ALL = flag("--all");
const AS_JSON = flag("--json");

// Keep maths symbols: "+" vs "-" and "<" vs ">" carry the meaning of the option.
const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.?!]+$/, "");

// Only for work/person titles, where punctuation is noise.
const normTitle = (s) =>
  norm(s)
    .replace(/[^a-z0-9\u0980-\u09ff ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/^question-\d+\.json$/.test(e.name)) out.push(p);
  }
  return out;
}

function load(file) {
  try {
    const d = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(d) ? d : null;
  } catch (e) {
    return null;
  }
}

const files = walk(DATA, []).filter((f) => {
  if (!BOOK) return true;
  const rel = path.relative(DATA, f).split(path.sep);
  return rel[0] === BOOK;
});

const byStem = new Map(); // stem -> Map(answer -> [where])
const byWork = new Map(); // work -> Map(author -> [where])
const stemCount = new Map(); // stem -> [where]
const keyStats = new Map(); // topic -> [a,b,c,d]
const broken = [];
const WORK_Q = /\b(who wrote|who is the author|which (?:assamese )?(?:writer|author|poet|novelist|saint|playwright|king)|known for|is a novel by|was written by)\b/i;

let total = 0;
for (const file of files) {
  const data = load(file);
  if (!data) {
    broken.push({ file, why: "unparseable JSON" });
    continue;
  }
  const rel = path.relative(DATA, file).split(path.sep);
  const book = rel[0];
  const topic = rel.slice(1, -1).join("/");
  const where = book + "/" + topic;

  data.forEach((q, i) => {
    const id = where + ":" + ((q && q.id) || i + 1);
    if (!q || !q.q || !Array.isArray(q.options) || !q.explanation) {
      broken.push({ file, id, why: "missing q/options/explanation" });
      return;
    }
    if (!q.q.en || !q.q.as) broken.push({ file, id, why: "question not bilingual" });
    const isFig = (o) => o && (o.fig || o.svg || o.img);
    if (!q.explanation.en || !q.explanation.as) broken.push({ file, id, why: "explanation not bilingual" });
    q.options.forEach((o, k) => {
      if (!isFig(o) && (!o || !o.en || !o.as)) broken.push({ file, id, why: "option " + "ABCD"[k] + " not bilingual" });
    });
    if (typeof q.correct !== "number" || q.correct < 0 || q.correct >= q.options.length) {
      broken.push({ file, id, why: "correct index out of range: " + q.correct });
      return;
    }
    // figure options carry an svg in `fig` and legitimately have no text
    const opts = q.options.map((o) => (isFig(o) ? "FIG:" + String(o.fig || o.svg || o.img) : norm(o && o.en)));
    if (opts.some((o) => !o)) broken.push({ file, id, why: "blank option" });
    if (new Set(opts).size !== opts.length) broken.push({ file, id, why: "duplicate options" });

    total++;
    const figKey = q.fig ? crypto.createHash("md5").update(String(q.fig)).digest("hex") : "";
    const stem = norm(q.q.en) + (figKey ? " ||FIG:" + figKey : "");
    const answer = norm(q.options[q.correct].en);

    if (!byStem.has(stem)) byStem.set(stem, new Map());
    const a = byStem.get(stem);
    if (!a.has(answer)) a.set(answer, []);
    a.get(answer).push(id);

    if (!stemCount.has(stem)) stemCount.set(stem, []);
    stemCount.get(stem).push(id);

    const k = where;
    if (!keyStats.has(k)) keyStats.set(k, [0, 0, 0, 0]);
    keyStats.get(k)[q.correct]++;

    if (WORK_Q.test(q.q.en)) {
      const m = q.q.en.match(/['"'\u2018\u2019]([^'"'\u2018\u2019]{3,60})['"'\u2019\u2018]/);
      if (m) {
        const w = norm(q.q.en) + " || " + normTitle(m[1]);
        if (!byWork.has(w)) byWork.set(w, new Map());
        const wm = byWork.get(w);
        if (!wm.has(answer)) wm.set(answer, []);
        wm.get(answer).push(id);
      }
    }
  });
}

const conflicts = [...byStem.entries()].filter(([, v]) => v.size > 1);
const workConflicts = [...byWork.entries()].filter(([, v]) => v.size > 1);
const dupStems = [...stemCount.entries()].filter(([, v]) => v.length > 1);
const skewed = [...keyStats.entries()]
  .map(([t, c]) => {
    const n = c.reduce((x, y) => x + y, 0);
    const max = Math.max(...c);
    return { topic: t, counts: c, n, share: n ? max / n : 0 };
  })
  .filter((s) => s.share >= 0.5 && s.n >= 10)
  .sort((a, b) => b.share - a.share);

const report = {
  files: files.length,
  questions: total,
  broken,
  stemConflicts: conflicts.map(([stem, m]) => ({
    stem,
    answers: [...m.entries()].map(([a, ids]) => ({ answer: a, ids })),
  })),
  workConflicts: workConflicts.map(([work, m]) => ({
    work,
    authors: [...m.entries()].map(([a, ids]) => ({ author: a, ids })),
  })),
  duplicateStems: dupStems.map(([stem, ids]) => ({ stem, ids })),
  skewedTopics: skewed,
};

if (AS_JSON) {
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  process.exit(broken.length ? 1 : 0);
}

const show = (arr) => (ALL ? arr : arr.slice(0, 10));

console.log(`audit-facts: ${report.files} files, ${report.questions} questions\n`);

console.log(`1. same question, different answer: ${report.stemConflicts.length}`);
for (const c of show(report.stemConflicts)) {
  console.log(`   "${c.stem.slice(0, 70)}"`);
  for (const a of c.answers) console.log(`      -> ${a.answer.slice(0, 50)}  (${a.ids.slice(0, 3).join(", ")})`);
}

console.log(`\n2. same work attributed to different people: ${report.workConflicts.length}`);
for (const c of show(report.workConflicts)) {
  console.log(`   ${c.work}`);
  for (const a of c.authors) console.log(`      -> ${a.author}  (${a.ids.slice(0, 3).join(", ")})`);
}

console.log(`\n3. duplicate question stems: ${report.duplicateStems.length} groups, ` +
  `${report.duplicateStems.reduce((n, d) => n + d.ids.length - 1, 0)} redundant items`);
for (const d of show(report.duplicateStems)) {
  console.log(`   "${d.stem.slice(0, 60)}" x${d.ids.length}  (${d.ids.slice(0, 4).join(", ")})`);
}

console.log(`\n4. topics where one option slot carries >=50% of answers: ${report.skewedTopics.length}`);
for (const s of show(report.skewedTopics)) {
  console.log(`   ${s.topic}  ${s.counts.join("/")}  ${(s.share * 100).toFixed(0)}%`);
}

console.log(`\n5. structurally broken items: ${broken.length}`);
for (const b of show(broken)) console.log(`   ${b.id}: ${b.why}`);

const hard = broken.length;
process.exit(hard ? 1 : 0);
