#!/usr/bin/env node
"use strict";

/*
 * tools/add-editorial-meta.js
 *
 * Puts the byline block on the content pages that never got one.
 *
 * The rest of the site already shows "Author / Reviewed by / Sources /
 * Published / Last updated / How we review" under the page description.
 * 103 pages were left without it, and the gap is not random: the whole
 * /current-affairs/ section and /ebooks/ are in it, which is exactly the
 * material a reviewer is most likely to question.
 *
 * Institutional pages (about, contact, privacy, terms, editorial policy,
 * search, submit ...) are deliberately skipped: they speak for the
 * organisation and already name the team inside their own text.
 *
 * Dates are written as placeholders and then filled from git history by
 * tools/apply-real-dates.js, so there is one source of truth for dates.
 *
 * Idempotent: a page that already has class="editorial-meta" is skipped.
 *
 *   node tools/add-editorial-meta.js --check
 *   node tools/add-editorial-meta.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

/* Content sections only. Anything not listed here keeps the byline off. */
const CONTENT_PREFIXES = [
  "current-affairs",
  "ebooks",
  "exams",
  "category",
  "categories",
  "topic",
  "mock-test",
  "exam-wise-mock-test",
  "previous-year",
  "trending",
];

const BLOCK =
  '<div class="editorial-meta">' +
  '<span class="editorial-meta-item"><strong>Author:</strong> <a href="/editorial-team/#axomexam-team">axomexam team</a></span>' +
  '<span class="editorial-meta-item"><strong>Reviewed by:</strong> <a href="/editorial-team/">Axomexam Editorial Team</a></span>' +
  '<span class="editorial-meta-item"><strong>Published:</strong> 1 January 2026</span>' +
  '<span class="editorial-meta-item"><strong>Last updated:</strong> 1 January 2026</span>' +
  '<span class="editorial-meta-item"><a href="/editorial-policy/">How we review</a></span>' +
  "</div>";

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

function relOf(file) {
  return path.relative(ROOT, file).split(path.sep).join("/").replace(/\/index\.html$/, "");
}

function isContentPage(rel) {
  const bare = rel.replace(/^as\//, "");
  return CONTENT_PREFIXES.some((p) => bare === p || bare.startsWith(p + "/"));
}

function insert(html) {
  /* Under the page description, which is where the rest of the site puts it.
     Pages without a description fall back to just after the H1. */
  const afterDesc = html.match(/(<p class="page-desc">[\s\S]*?<\/p>)/);
  if (afterDesc) {
    return html.replace(afterDesc[0], afterDesc[0] + "\n" + BLOCK);
  }
  const afterH1 = html.match(/(<h1[^>]*>[\s\S]*?<\/h1>)/);
  if (afterH1) {
    return html.replace(afterH1[0], afterH1[0] + "\n" + BLOCK);
  }
  return null;
}

function main() {
  const files = walk(ROOT, []);
  let scanned = 0;
  let added = 0;
  let skipped = 0;
  const written = [];

  for (const file of files) {
    const rel = relOf(file);
    if (!isContentPage(rel)) continue;
    scanned++;

    const html = fs.readFileSync(file, "utf8");
    if (html.includes('class="editorial-meta"')) {
      skipped++;
      continue;
    }
    /* Assamese twins are produced by build-as-twins from the English page,
       which translates the block; writing here as well would fight it. */
    if (rel.startsWith("as/")) {
      skipped++;
      continue;
    }

    const next = insert(html);
    if (!next) {
      skipped++;
      continue;
    }

    added++;
    written.push(rel);
    if (!CHECK) fs.writeFileSync(file, next);
  }

  console.log(`pages scanned      : ${scanned}`);
  console.log(`${CHECK ? "would add" : "added"}          : ${added}`);
  console.log(`skipped            : ${skipped}`);
  for (const r of written.slice(0, 15)) console.log(`   + ${r}`);
  if (written.length > 15) console.log(`   ... and ${written.length - 15} more`);
}

main();
