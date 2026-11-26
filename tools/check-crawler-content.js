#!/usr/bin/env node
"use strict";

/*
 * tools/check-crawler-content.js
 *
 * Verifies that every book page is readable without JavaScript, in both
 * languages, because that is what Googlebot and the AdSense crawler
 * (Mediapartners-Google) actually receive.
 *
 * Checks per page:
 *   - the question list is static HTML, not built by JS at runtime;
 *   - both `lang="en"` and `lang="as"` blocks are present and no CSS rule
 *     hides either of them;
 *   - the page is indexable and carries the en/as/x-default hreflang trio;
 *   - the AdSense loader is present on English pages and absent from
 *     Assamese pages (AdSense does not support Assamese).
 *
 * Usage: node tools/check-crawler-content.js [--book dhs-dme-technical]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const bookArg = args.indexOf("--book");
const BOOK = bookArg >= 0 ? args[bookArg + 1] : "dhs-dme-technical";

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
};

const pages = walk(path.join(ROOT, "exams", BOOK))
  .map((f) => ({ file: f, html: fs.readFileSync(f, "utf8") }))
  .filter((p) => p.html.includes('class="qa-item"'));

const problems = [];
const stats = { topics: pages.length, enQuestions: 0, asQuestions: 0, enLoader: 0, asLoader: 0 };

for (const { file, html } of pages) {
  const rel = path.relative(path.join(ROOT, "exams"), path.dirname(file));
  const head = html.split("</head>")[0];
  const qCount = (html.match(/class="qa-item"/g) || []).length;
  const asFile = path.join(ROOT, "as", "exams", rel, "index.html");

  stats.enQuestions += qCount;
  if (html.includes("adsbygoogle.js")) stats.enLoader += 1;

  if (!qCount) problems.push(`${rel}: no static questions on the English page`);
  if (!html.includes('<div lang="en"')) problems.push(`${rel}: no English blocks`);
  if (!html.includes('<div lang="as"')) problems.push(`${rel}: no Assamese blocks`);
  if (/name="robots" content="[^"]*noindex/.test(head)) problems.push(`${rel}: English page is noindex`);
  if ((head.match(/hreflang/g) || []).length !== 3) problems.push(`${rel}: English hreflang trio incomplete`);
  if (!html.includes("adsbygoogle.js")) problems.push(`${rel}: English page has no AdSense loader`);

  if (!fs.existsSync(asFile)) { problems.push(`${rel}: Assamese twin missing`); continue; }
  const asHtml = fs.readFileSync(asFile, "utf8");
  const asHead = asHtml.split("</head>")[0];
  const asQ = (asHtml.match(/class="qa-item"/g) || []).length;

  stats.asQuestions += asQ;
  if (asHtml.includes("adsbygoogle.js")) stats.asLoader += 1;

  if (asQ !== qCount) problems.push(`${rel}: Assamese twin has ${asQ} questions, English has ${qCount}`);
  if (!asHtml.includes('<div lang="as"')) problems.push(`${rel}: Assamese twin has no Assamese blocks`);
  if (/name="robots" content="[^"]*noindex/.test(asHead)) problems.push(`${rel}: Assamese twin is noindex`);
  if ((asHead.match(/hreflang/g) || []).length !== 3) problems.push(`${rel}: Assamese hreflang trio incomplete`);
  if (asHtml.includes("adsbygoogle.js")) problems.push(`${rel}: Assamese twin carries AdSense code (unsupported language)`);
}

/* Duplicate check: the Assamese twin should be a translation, not a copy. A
   high 8-word shingle overlap means the English text is still being served on
   both pages. Grammar and puzzle topics overlap legitimately because the
   sentences under test are English and the numbers are numbers, so only a
   near-total overlap is reported. */
const wordsOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean);

const shingles = (words, n = 8) => {
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(" "));
  return set;
};

/* Every /as/ page, not just this book: the twin must be a translation. The
   metric is symmetric (Jaccard over 8-word shingles) because containment
   scores a genuine translation as a near-copy — an Assamese page is always
   "contained" in the bilingual English page. */
const overlaps = [];
for (const asFile of walk(path.join(ROOT, "as"))) {
  const rel = path.relative(path.join(ROOT, "as"), path.dirname(asFile));
  const enFile = path.join(ROOT, rel, "index.html");
  if (!fs.existsSync(enFile)) continue;
  const en = shingles(wordsOf(fs.readFileSync(enFile, "utf8")));
  const as = shingles(wordsOf(fs.readFileSync(asFile, "utf8")));
  if (!as.size || !en.size) continue;
  let shared = 0;
  for (const s of as) if (en.has(s)) shared += 1;
  const pct = (shared / (en.size + as.size - shared)) * 100;
  overlaps.push({ pct, rel });
  if (pct > 70) problems.push(`${rel}: Assamese twin is ${pct.toFixed(0)}% identical to the English page`);
}
overlaps.sort((a, b) => b.pct - a.pct);

const css = fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8");
if (/\[lang=[a-z]+\][^{]*\{[^}]*display:\s*none/.test(css)) {
  problems.push("css/style.css hides content by language, so one language is invisible to crawlers");
}

console.log(`crawler check — ${BOOK}`);
console.log(`  topics              : ${stats.topics} (English + Assamese = ${stats.topics * 2} pages)`);
console.log(`  static questions    : EN ${stats.enQuestions}, AS ${stats.asQuestions}`);
console.log(`  AdSense loader      : EN ${stats.enLoader}/${stats.topics}, AS ${stats.asLoader}/${stats.topics}`);
if (overlaps.length) {
  const mid = overlaps[Math.floor(overlaps.length / 2)].pct;
  console.log(`  EN/AS overlap       : median ${mid.toFixed(0)}% | max ${overlaps[0].pct.toFixed(0)}% (${overlaps[0].rel}) | pages ${overlaps.length}`);
}
console.log(`  problems            : ${problems.length}`);
for (const p of problems.slice(0, 20)) console.log(`    - ${p}`);
if (problems.length > 20) console.log(`    ... +${problems.length - 20} more`);
process.exit(problems.length ? 1 : 0);
