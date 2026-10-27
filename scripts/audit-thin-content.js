#!/usr/bin/env node
"use strict";

/*
 * audit-thin-content.js
 *
 * Reports indexable pages that carry little unique body text, which is the
 * thin-content pattern AdSense penalises. Google renders the page before it
 * judges it, so the measurement uses the same source the crawler ends up with:
 * the pre-rendered <main id="app"> body of the committed HTML, which
 * js/app.js now restores verbatim after boot.
 *
 * Word count is taken over visible text only - tags, script and style bodies,
 * the header, footer and nav are dropped first, because site chrome is
 * duplicated on every page and would otherwise mask a thin body.
 *
 * Usage, from the repository root:
 *   node scripts/audit-thin-content.js            # summary
 *   node scripts/audit-thin-content.js --list     # every page under the floor
 *   node scripts/audit-thin-content.js --json     # machine-readable
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LIST = process.argv.includes("--list");
const JSON_OUT = process.argv.includes("--json");
const THIN_WORDS = 300;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

function mainBody(html) {
  const i = html.indexOf('<main id="app"');
  if (i < 0) return "";
  const j = html.indexOf("</main>", i);
  return j < 0 ? html.slice(i) : html.slice(i, j);
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(text) {
  const ascii = (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
  const other = (text.match(/[\u0980-\u09FF]+/g) || []).length;
  return ascii + other;
}

const rows = [];
for (const file of walk(ROOT, [])) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/") || "/";
  const body = mainBody(html);
  const text = visibleText(body);
  const robots = (html.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [""])[0];
  const noindex = /noindex/i.test(robots);
  rows.push({
    path: rel,
    words: words(text),
    chars: text.length,
    noindex,
    faq: (body.match(/<details\b/g) || []).length,
    h2h3: (body.match(/<h[23]\b/g) || []).length,
  });
}

const indexable = rows.filter((r) => !r.noindex);
const thin = indexable.filter((r) => r.words < THIN_WORDS).sort((a, b) => a.words - b.words);

if (JSON_OUT) {
  console.log(JSON.stringify({ threshold: THIN_WORDS, total: rows.length, indexable: indexable.length, thin: thin.length, rows: thin }, null, 2));
} else {
  const buckets = [[0, 100], [100, 200], [200, 300], [300, 500], [500, 1000], [1000, Infinity]];
  console.log("Thin-content audit");
  console.log(`  html files scanned     : ${rows.length}`);
  console.log(`  indexable (no noindex) : ${indexable.length}`);
  console.log(`  noindex                : ${rows.length - indexable.length}`);
  console.log(`  below ${THIN_WORDS} words           : ${thin.length}`);
  console.log("");
  console.log("  distribution of indexable pages by body words:");
  for (const [lo, hi] of buckets) {
    const n = indexable.filter((r) => r.words >= lo && r.words < hi).length;
    const label = hi === Infinity ? `${lo}+` : `${lo}-${hi}`;
    console.log(`    ${label.padStart(9)} : ${String(n).padStart(4)}  ${"#".repeat(Math.min(60, Math.round(n / 6)))}`);
  }
  if (LIST && thin.length) {
    console.log("");
    console.log(`  pages below the floor (${thin.length}):`);
    for (const r of thin) console.log(`    ${String(r.words).padStart(5)} words  ${r.path}`);
  }
}
