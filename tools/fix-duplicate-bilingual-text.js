#!/usr/bin/env node
"use strict";

/*
 * tools/fix-duplicate-bilingual-text.js
 *
 * The static question blocks print an option value twice when its English and
 * Assamese strings are identical. Most multiple-choice options are numbers,
 * fractions or percentages, so the Assamese twin of "2" is also "2", and the
 * committed markup rendered:
 *
 *   <div lang="en" ...>(B) 2 <span lang="as" ...>2</span></div>
 *
 * The same doubling hit the answer line, where the English answer span is
 * followed by a sibling Assamese div carrying the same value:
 *
 *   <strong>Answer:</strong> <span>2</span></div><div lang="as" ...>2</div>
 *
 * On the /as/ twins the Assamese line is written first, so the pair is
 * reversed. In every case the repeated string carries no information; the
 * block reads as "2 2". This tool removes the redundant fragment while
 * leaving any genuinely different Assamese text in place.
 *
 * Fixes already landed in the generators (build-mock-set-pages.js,
 * build-adre-grade-3.js, build-orphan-topic-pages.js, inject-static-questions.js),
 * so a rebuild will not reintroduce the duplication. This tool repairs the
 * committed HTML in place, which keeps the keyword-map titles and metas those
 * pages already carry.
 *
 * Idempotent: a second run reports zero changes.
 *
 * Usage:
 *   node tools/fix-duplicate-bilingual-text.js            # apply
 *   node tools/fix-duplicate-bilingual-text.js --check    # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

/* Option rows: "(B) 2 <span lang="as" ...>2</span>" -> "(B) 2" */
const OPTION_RE =
  /<div lang="en" style="margin:2px 0;">\(([A-D])\) ([^<]*?) <span lang="as" style="color:#64748b;">([^<]*)<\/span><\/div>/g;

/* English-first answer: answer span, then the sibling Assamese div. */
const ANSWER_EN_FIRST_RE =
  /<strong>Answer:<\/strong> <span>([^<]*)<\/span><\/div><div lang="as" style="color:#64748b; font-size:0\.9rem;">([^<]*)<\/div>/g;

/* Assamese-first answer (the /as/ twins): Assamese div, then the answer span. */
const ANSWER_AS_FIRST_RE =
  /<div lang="as" style="color:#64748b; font-size:0\.9rem;">([^<]*)<\/div><div lang="en" style="margin-top:8px;"><strong>Answer:<\/strong> <span>([^<]*)<\/span><\/div>/g;

function decode(s) {
  return String(s)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function fix(html) {
  let changed = 0;

  html = html.replace(OPTION_RE, (m, letter, en, as) => {
    if (decode(en).trim() !== decode(as).trim()) return m;
    changed++;
    return `<div lang="en" style="margin:2px 0;">(${letter}) ${en}</div>`;
  });

  html = html.replace(ANSWER_EN_FIRST_RE, (m, en, as) => {
    if (decode(en).trim() !== decode(as).trim()) return m;
    changed++;
    return `<strong>Answer:</strong> <span>${en}</span></div>`;
  });

  html = html.replace(ANSWER_AS_FIRST_RE, (m, as, en) => {
    if (decode(as).trim() !== decode(en).trim()) return m;
    changed++;
    return `<div lang="en" style="margin-top:8px;"><strong>Answer:</strong> <span>${en}</span></div>`;
  });

  return { html, changed };
}

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name === "index.html") out.push(p);
  }
  return out;
}

const files = walk(ROOT, []);
let filesChanged = 0;
let fragments = 0;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  if (!src.includes("qa-item")) continue;
  const { html, changed } = fix(src);
  if (!changed) continue;
  filesChanged++;
  fragments += changed;
  if (!CHECK) fs.writeFileSync(file, html);
  else console.log(`  drift: ${path.relative(ROOT, file)} (${changed})`);
}

console.log(`[fix-duplicate-bilingual-text] ${CHECK ? "drift" : "fixed"}`);
console.log(`  Pages scanned:    ${files.length}`);
console.log(`  Pages changed:    ${filesChanged}`);
console.log(`  Fragments removed: ${fragments}`);
