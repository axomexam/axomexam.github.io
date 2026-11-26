#!/usr/bin/env node
"use strict";

/*
 * Inject the copy-guard script into every page.
 *
 * Pages are produced by many different builders, so a new site-wide script
 * has to be added to the already-committed HTML instead of to one template.
 * Idempotent: a page that already references /js/copy-guard.js is left
 * alone, so this can be re-run after any content build.
 *
 * Usage, run from the repository root:
 *   node scripts/inject-copy-guard.js
 *   node scripts/stamp-assets.js        # fill in the ?v= hash afterwards
 */

const fs = require("fs");
const path = require("path");

const MARKER = "/js/copy-guard.js";
const SKIP_DIRS = new Set([".git", "node_modules", ".github", "_preview", "dist"]);

/* The leaderboard is a separate product with its own Firebase project and
   its own release cadence; it must not carry this bundle. */
const SKIP_PATHS = new Set(["leaderboard/index.html", "as/leaderboard/index.html"]);

const TAGS = `  <script src="/js/copy-guard.js?v=00000000" defer></script>\n`;

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

function inject(file) {
  const rel = path.relative(path.resolve(__dirname, ".."), file).split(path.sep).join("/");
  if (SKIP_PATHS.has(rel)) return "skipped";

  const html = fs.readFileSync(file, "utf8");
  if (html.includes(MARKER)) return "already";

  const bodyEnd = html.lastIndexOf("</body>");
  if (bodyEnd === -1) return "nobody";

  fs.writeFileSync(file, html.slice(0, bodyEnd) + TAGS + html.slice(bodyEnd), "utf8");
  return "injected";
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const files = walk(root, []);

  let injected = 0;
  let already = 0;
  const skipped = [];
  const nobody = [];

  for (const file of files) {
    const result = inject(file);
    if (result === "injected") injected++;
    else if (result === "already") already++;
    else if (result === "skipped") skipped.push(file);
    else nobody.push(file);
  }

  console.log(`Scanned: ${files.length} HTML file(s)`);
  console.log(`Injected: ${injected}`);
  console.log(`Already present: ${already}`);
  if (skipped.length) {
    console.log(`Skipped (leaderboard, by design): ${skipped.length}`);
    for (const f of skipped) console.log(`  - ${path.relative(root, f)}`);
  }
  if (nobody.length) {
    console.log(`Skipped (no </body>): ${nobody.length}`);
    for (const f of nobody) console.log(`  - ${path.relative(root, f)}`);
  }
}

main();
