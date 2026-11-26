#!/usr/bin/env node
"use strict";

/*
 * Fail when a page ships without the copy guard.
 *
 * Pages are produced by many builders and none of them emit the
 * /js/copy-guard.js tag, so a new page can go live unguarded. This check is
 * run by .github/workflows/copy-guard-check.yml and by hand after a build.
 *
 * Usage, run from the repository root:
 *   node scripts/check-copy-guard.js
 *
 * Exit code 1 when a page is missing the tag, so CI can block it. Pages
 * without <main id="app"> only get a warning: they carry no guarded content,
 * but a new content page that forgot the wrapper would slip past the guard.
 */

const fs = require("fs");
const path = require("path");

const MARKER = "/js/copy-guard.js";
const SKIP_DIRS = new Set([".git", "node_modules", ".github", "_preview", "dist"]);

/* The leaderboard is a separate product and is deliberately not guarded. */
const SKIP_PATHS = new Set(["leaderboard/index.html", "as/leaderboard/index.html"]);

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const files = walk(root, []);

  const missing = [];
  const noApp = [];

  for (const file of files) {
    const rel = path.relative(root, file).split(path.sep).join("/");
    if (SKIP_PATHS.has(rel)) continue;

    const html = fs.readFileSync(file, "utf8");
    if (!html.includes(MARKER)) missing.push(rel);
    if (!/id=["']app["']/.test(html)) noApp.push(rel);
  }

  console.log(`Scanned: ${files.length} HTML file(s)`);
  console.log(`Missing ${MARKER}: ${missing.length}`);
  for (const rel of missing.slice(0, 40)) console.log(`  - ${rel}`);
  if (missing.length > 40) console.log(`  ... and ${missing.length - 40} more`);

  if (noApp.length) {
    console.log(`Warning: no <main id="app"> (nothing for the guard to scope to): ${noApp.length}`);
    for (const rel of noApp.slice(0, 10)) console.log(`  - ${rel}`);
    if (noApp.length > 10) console.log(`  ... and ${noApp.length - 10} more`);
  }

  if (missing.length) {
    console.error("");
    console.error("Fix: node scripts/inject-copy-guard.js && node scripts/stamp-assets.js");
    process.exitCode = 1;
    return;
  }

  console.log("OK: every page carries the copy guard.");
}

main();
