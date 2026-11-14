#!/usr/bin/env node
/**
 * apply-topic-sources.js
 *
 * Adds the official recruiting body to the editorial "Sources:" line on pages
 * that belong to a named examination. A page under exams/<exam>/ or
 * previous-year/<exam>/ names the body that publishes that exam's syllabus and
 * notification, which is what the /sources/ page already claims. Pages with no
 * exam in their path keep their existing subject line.
 *
 * Only the two Sources meta items are rewritten, and only the value between
 * the label and the closing </span>. Titles, canonicals, JSON-LD, links and
 * body text stay byte-identical. The rewrite is idempotent: a second run
 * reports no drift.
 *
 * Usage:
 *   node tools/apply-topic-sources.js --check          # report only
 *   node tools/apply-topic-sources.js --limit 20       # first 20 pages only
 *   node tools/apply-topic-sources.js                  # write all
 */
"use strict";

const fs = require("fs");
const path = require("path");
const {
  applySourcesLineExamAware,
  sourcesLineWithExam,
  examPortal,
  examIdFromPath,
} = require("./lib/editorial-sources");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const LIMIT = (() => {
  const i = process.argv.indexOf("--limit");
  return i >= 0 ? Number(process.argv[i + 1]) || 0 : 0;
})();

const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".agent_tmp"]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

/* The value must reach the closing </span> of its meta item. Matching on the
   label and then on </span> also recognises a value that already contains an
   anchor, so an applied page is detected as already correct. */
function readSourceValue(html, label) {
  const re = new RegExp(
    `<span class="editorial-meta-item">${label}\\s*([\\s\\S]*?)</span>`
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

const EN = "<strong>Sources:<\\/strong>";
const AS = "<strong>প্ৰসংগ উৎস:<\\/strong>";

function main() {
  const files = walk(ROOT, []);
  let scanned = 0;
  let written = 0;
  let alreadyOk = 0;
  let skippedNoLine = 0;
  let skippedRedirect = 0;
  const examples = [];
  const byExam = {};

  for (const file of files) {
    if (LIMIT && written >= LIMIT) break;
    const html = fs.readFileSync(file, "utf8");
    if (!html.includes("<strong>Sources:<\\/strong>") && !html.includes("<strong>Sources:</strong>")) {
      skippedNoLine += 1;
      continue;
    }
    scanned += 1;
    if (/http-equiv="refresh"/i.test(html)) {
      skippedRedirect += 1;
      continue;
    }

    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    const next = applySourcesLineExamAware(html, rel);
    if (next === html) {
      alreadyOk += 1;
      continue;
    }

    const exam = examIdFromPath(rel);
    const portal = examPortal(rel);
    const key = portal ? exam : "(no exam: subject line only)";
    byExam[key] = (byExam[key] || 0) + 1;
    if (examples.length < 6) {
      examples.push({
        rel,
        from: readSourceValue(html, EN),
        to: readSourceValue(next, EN),
      });
    }
    if (!CHECK) fs.writeFileSync(file, next);
    written += 1;
  }

  console.log(`pages with a Sources line : ${scanned}`);
  console.log(`rewritten                 : ${written}${CHECK ? "  (check mode, nothing written)" : ""}`);
  console.log(`already correct           : ${alreadyOk}`);
  console.log(`skipped (no Sources line) : ${skippedNoLine}`);
  console.log(`skipped (meta redirect)   : ${skippedRedirect}`);
  console.log("");
  console.log("by exam:");
  for (const [k, n] of Object.entries(byExam).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${k}`);
  }
  if (examples.length) {
    console.log("\nexamples:");
    for (const e of examples) {
      console.log(`  ${e.rel}`);
      console.log(`    from: ${String(e.from).slice(0, 96)}`);
      console.log(`    to  : ${String(e.to).slice(0, 130)}`);
    }
  }
}

main();
