#!/usr/bin/env node
/**
 * fix-editorial-sources.js
 *
 * Repairs the English "Sources:" line inside the editorial-credit block.
 * Several builders copy that block verbatim from the math reference page
 * (topic/math/arithmetic/boats-and-streams), which hard-codes "standard
 * mathematics reference material", so pages on other subjects claimed a math
 * source.
 *
 * The rewrite is deliberately conservative: a page is only touched when the
 * subject its current line names appears nowhere in its own path. A page that
 * already says "science" under a ".../general-science/" path is left alone,
 * and a generic line (no subject) is never rewritten.
 *
 * Usage:
 *   node tools/fix-editorial-sources.js --check   # report only
 *   node tools/fix-editorial-sources.js           # write fixes
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { sourcesLine, TOKEN_SUBJECT, SOURCES } = require("./lib/editorial-sources");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

const GENERIC_SECTIONS = new Set([
  "ebooks", "download", "previous-year", "about", "editorial-team",
  "editorial-policy", "contact", "privacy", "privacy-policy", "search",
  "submit", "terms",
]);

/* Which subject does a line name? null = generic, never rewritten. */
function subjectOfLine(line) {
  const l = line.toLowerCase();
  if (l.includes("mathematics")) return "math";
  if (l.includes("reasoning")) return "reasoning";
  if (l.includes("science")) return "science";
  if (l.includes("english")) return "english";
  if (l.includes("computer-awareness")) return "computer";
  if (l.includes("online resources") || l.includes("question papers")) return "gk";
  return null;
}

function tokens(rel) {
  return rel.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
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
  let scanned = 0;
  let changed = 0;
  let skipped = 0;
  const bySubject = {};
  const examples = [];

  for (const file of walk(ROOT, [])) {
    const html = fs.readFileSync(file, "utf8");
    const m = html.match(/<strong>Sources:<\/strong>\s*([^<]*)/);
    if (!m) continue;
    scanned += 1;
    const rel = path.relative(ROOT, file);
    const current = m[1].replace(/\s+/g, " ").trim();

    const segs = rel.split(path.sep).filter((s) => s && s !== "as");
    if (GENERIC_SECTIONS.has(segs[0])) { skipped += 1; continue; }
    if (/http-equiv="refresh"/i.test(html)) { skipped += 1; continue; }

    const named = subjectOfLine(current);
    if (named === null) { skipped += 1; continue; }

    /* Already plausible: the named subject shows up somewhere in the path. */
    const pathHas = tokens(rel).some((t) => TOKEN_SUBJECT[t] === named);
    if (pathHas) { skipped += 1; continue; }

    const wanted = sourcesLine(rel);
    if (current === wanted) { skipped += 1; continue; }

    const subject = Object.entries(SOURCES).find(([, v]) => v === wanted)[0];
    bySubject[subject] = (bySubject[subject] || 0) + 1;
    if (examples.length < 10) examples.push({ rel, from: current, to: wanted });
    if (!CHECK) fs.writeFileSync(file, html.replace(/(<strong>Sources:<\/strong>\s*)[^<]*/, `$1${wanted}`));
    changed += 1;
  }

  console.log(`scanned (pages with a Sources line): ${scanned}`);
  console.log(`fixed: ${changed}${CHECK ? " (check mode, nothing written)" : ""}`);
  console.log(`left alone: ${skipped}`);
  for (const [subject, n] of Object.entries(bySubject)) console.log(`  -> ${subject}: ${n}`);
  if (examples.length) {
    console.log("\nexamples:");
    for (const e of examples) console.log(`  ${e.rel}\n    from: ${e.from}\n    to  : ${e.to}`);
  }
}

main();
