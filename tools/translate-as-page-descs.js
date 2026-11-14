#!/usr/bin/env node
"use strict";

/*
 * tools/translate-as-page-descs.js
 *
 * Back-fill: rewrite the visible <p class="page-desc"> on every /as/ page from
 * the Assamese strings already in data/ (see tools/lib/as-page-desc.js).
 *
 * Why: tools/prerender.js writes the page-desc from English data, so the twin
 * inherited an English sentence under an Assamese heading. tools/build-as-twins.js
 * now applies the same translation while it builds, so this tool is for pages
 * built before that change and for verifying drift.
 *
 * Idempotent: it always rewrites from the data files.
 *
 * Usage:
 *   node tools/translate-as-page-descs.js            # apply
 *   node tools/translate-as-page-descs.js --check    # report only, exit 1 on drift
 */

const fs = require("fs");
const path = require("path");
const { createPageDescTranslator, AS_CHAR, pageDescSpan } = require("./lib/as-page-desc");

const ROOT = path.resolve(__dirname, "..");
const AS = path.join(ROOT, "as");
const CHECK = process.argv.includes("--check");

const descFor = createPageDescTranslator(ROOT);

const isAssamese = (s) => {
  if (!s) return false;
  let n = 0;
  for (const ch of s) if (AS_CHAR.test(ch)) n++;
  return n / s.length >= 0.2;
};

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name === "index.html") out.push(p);
  }
}

const files = [];
walk(AS, files);

let scanned = 0;
let changed = 0;
const drifted = [];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const span = pageDescSpan(html);
  if (!span) continue;
  scanned++;
  const current = html.slice(span.inner, span.end).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (isAssamese(current)) continue;
  const rel = path.relative(AS, path.dirname(file));
  const next = descFor(rel);
  if (!next || !isAssamese(next)) continue;
  drifted.push(file);
  if (CHECK) continue;
  const out = html.slice(0, span.inner) + esc(next) + html.slice(span.end - "</p>".length);
  fs.writeFileSync(file, out);
  changed++;
}

if (CHECK) {
  console.log(`translate-as-page-descs: scanned ${scanned} | drift ${drifted.length}`);
  if (drifted.length) {
    for (const f of drifted.slice(0, 20)) console.log(`  ${path.relative(ROOT, f)}`);
    process.exit(1);
  }
} else {
  console.log(`translate-as-page-descs: scanned ${scanned} | changed ${changed}`);
}
