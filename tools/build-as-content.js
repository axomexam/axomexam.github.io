#!/usr/bin/env node
"use strict";

/*
 * tools/build-as-content.js
 *
 * Run every Assamese-content pass in the right order.
 *
 * tools/prerender.js and tools/build-as-twins.js generate the served HTML.
 * build-as-twins already translates the visible page-desc while it builds,
 * but several other /as/ passes are separate tools. Run them in this order
 * after any full rebuild, or the served /as/ HTML silently drifts back to
 * English under an Assamese URL.
 *
 * Order
 * -----
 *   1. tools/inject-as-static-pages.js   legal / editorial pages: Assamese panel
 *   2. tools/add-as-hub-content.js       hub prose (headings, FAQ, blurb)
 *   3. tools/translate-deep-content.js   deep-content category articles
 *   4. tools/translate-as-syllabus.js    ADRE Grade IV + Assam Police syllabus
 *   5. tools/sync-as-renderer-pages.js   Submit + Download-App runtime bodies
 *   6. tools/dedupe-as-twins.js          drop the English deep-article panel
 *   7. tools/translate-as-page-descs.js  back-fill visible page-desc (drift check)
 *
 * Step 6 must run after every pass that re-injects the bilingual deep-article
 * panel, or the /as/ twins serve the full English article again.
 *
 * Every pass is idempotent, so re-running this is always safe.
 *
 * Usage:
 *   node tools/build-as-content.js            # apply
 *   node tools/build-as-content.js --check    # report drift only
 */

const { spawnSync } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

const PASSES = [
  ["inject-as-static-pages.js", []],
  ["add-as-hub-content.js", []],
  ["translate-deep-content.js", []],
  ["translate-as-syllabus.js", []],
  ["sync-as-renderer-pages.js", []],
  ["dedupe-as-twins.js", CHECK ? ["--check"] : []],
  ["translate-as-page-descs.js", CHECK ? ["--check"] : []],
];

let failed = 0;
for (const [tool, args] of PASSES) {
  const res = spawnSync(process.execPath, [path.join(ROOT, "tools", tool), ...args], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (res.status !== 0) failed++;
}

if (failed) {
  console.error(`build-as-content: ${failed} pass(es) reported drift`);
  process.exit(1);
}
