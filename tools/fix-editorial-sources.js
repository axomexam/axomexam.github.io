#!/usr/bin/env node
/**
 * fix-editorial-sources.js
 *
 * Repairs the English "Sources:" line inside the editorial-credit block of
 * every generated page. Several builders copy that block verbatim from the
 * math reference page (topic/math/arithmetic/boats-and-streams), so pages on
 * other subjects ended up claiming "standard mathematics reference material".
 *
 * The subject is derived from the page path and the line is rewritten to the
 * canonical wording already used by the matching topic/ pages.
 *
 * Usage:
 *   node tools/fix-editorial-sources.js --check   # report only
 *   node tools/fix-editorial-sources.js           # write fixes
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

/* Canonical Sources line per subject (taken from the existing topic/ pages). */
const SUBJECT_SOURCES = {
  math: "Official exam syllabus and standard mathematics reference material",
  reasoning: "Official exam syllabus and standard reasoning reference material",
  science: "NCERT and standard science reference material and online resources",
  english: "standard English grammar and vocabulary reference material and online resources",
  computer: "standard computer-awareness reference material and online resources",
  gk: "publicly available online resources and standard reference material",
};

/* Any line the generator may have written; all are replaced by the canonical one. */
const KNOWN_SOURCES = [
  "Official exam syllabus and standard mathematics reference material",
  "Official exam syllabus and standard reasoning reference material",
  "Official exam syllabus and standard reference material",
  "NCERT and standard science reference material and online resources",
  "standard English grammar and vocabulary reference material and online resources",
  "standard computer-awareness reference material and online resources",
  "publicly available online resources and standard reference material",
  "publicly available official question papers and online resources",
];

/* Page sections that are not tied to a single school subject. */
const GENERIC_SECTIONS = new Set(["ebooks", "download", "previous-year", "about", "editorial-team", "editorial-policy", "contact", "privacy", "privacy-policy", "search", "submit", "terms"]);

const SUBJECT_TOKENS = {
  math: ["math", "arithmetic", "mensuration", "percentage", "average", "ratio", "proportion", "profit", "loss", "interest", "simplification", "number-system", "statistics", "data-interpretation", "partnership", "pipes", "boats", "ages", "trigonometry", "geometry", "lcm", "hcf"],
  reasoning: ["reasoning", "logic", "logical", "analogy", "series", "venn", "blood", "direction", "odd-one", "classification", "non-verbal", "verbal", "analytical", "critical"],
  science: ["science", "physics", "chemistry", "biology"],
  english: ["english", "grammar", "vocabulary", "vocab", "tenses", "narration", "articles", "preposition", "sentence", "parts-of-speech", "synonym", "antonym", "idiom"],
  computer: ["computer", "ms-office", "comp-fundamentals", "awareness"],
  gk: ["gk", "general-knowledge", "history", "geography", "polity", "economy", "economics", "current-affairs", "static", "culture", "environment", "literature", "art"],
};

/* Longest tokens first so "general-english" resolves before "english" alone. */
function subjectFor(rel) {
  const segs = rel.split(path.sep).filter((s) => s && s !== "as" && s !== "index.html");
  const core = segs.filter((s) => !["category", "topic", "mock-test", "exams", "articles"].includes(s));
  const joined = core.join(" ").toLowerCase();
  if (GENERIC_SECTIONS.has(segs[0])) return null;
  for (const subject of ["computer", "science", "english", "reasoning", "math", "gk"]) {
    if (SUBJECT_TOKENS[subject].some((t) => joined.includes(t))) return subject;
  }
  return null;
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

function main() {
  const files = walk(ROOT, []);
  let scanned = 0;
  let changed = 0;
  let skipped = 0;
  const bySubject = {};
  const examples = [];

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const m = html.match(/<strong>Sources:<\/strong>\s*([^<]*)/);
    if (!m) continue;
    scanned += 1;
    const current = m[1].replace(/\s+/g, " ").trim();
    const rel = path.relative(ROOT, file);
    const subject = subjectFor(rel);

    if (!subject) {
      if (!KNOWN_SOURCES.includes(current)) {
        console.warn(`  ? unknown line on ${rel}: "${current}"`);
      }
      skipped += 1;
      continue;
    }
    const wanted = SUBJECT_SOURCES[subject];
    if (current === wanted) continue;

    const next = html.replace(
      /(<strong>Sources:<\/strong>\s*)[^<]*/,
      `$1${wanted}`
    );
    bySubject[subject] = (bySubject[subject] || 0) + 1;
    if (examples.length < 8) examples.push({ rel, from: current, to: wanted });
    if (!CHECK) fs.writeFileSync(file, next);
    changed += 1;
  }

  console.log(`scanned (pages with a Sources line): ${scanned}`);
  console.log(`fixed: ${changed}${CHECK ? " (check mode, nothing written)" : ""}`);
  console.log(`left alone (generic section or already correct): ${skipped}`);
  for (const [subject, n] of Object.entries(bySubject)) {
    console.log(`  ${subject}: ${n}`);
  }
  if (examples.length) {
    console.log("\nexamples:");
    for (const e of examples) {
      console.log(`  ${e.rel}`);
      console.log(`    from: ${e.from}`);
      console.log(`    to  : ${e.to}`);
    }
  }
}

main();
