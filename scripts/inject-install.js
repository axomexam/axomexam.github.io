#!/usr/bin/env node
"use strict";

/*
 * Inject the web-app install script into every page.
 *
 * One tag is needed:
 *   /js/install.js?v=...   captures `beforeinstallprompt` and offers the
 *                          browser install dialog (plus an Add to Home
 *                          Screen walkthrough on iOS Safari).
 *
 * It goes right after the push bundle, at the end of the shared footer
 * scripts, so it runs on every page without touching the render path.
 *
 * Idempotent: a page that already has the marker is left alone, so running
 * this after every content build is safe and reports `Injected: 0`.
 *
 * Usage, run from the repository root:
 *   node scripts/inject-install.js
 */

const fs = require("fs");
const path = require("path");

const MARKER = "/js/install.js";
const SKIP_DIRS = new Set([".git", "node_modules", ".github", "_preview", "dist"]);

/* The leaderboard is a separate product with its own release cadence; it
   must not carry the main site's install prompt. */
const SKIP_PATHS = new Set(["leaderboard/index.html", "as/leaderboard/index.html"]);

const TAGS = `  <script src="/js/install.js?v=00000000" defer></script>\n`;

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

  /* Anchor on the push bundle, which every content page carries. Pages
     without it (a few hand-written stubs) fall back to </body>. */
  const anchor = /([ \t]*)<script src="\/js\/push\.js[^"]*"[^>]*><\/script>\n/;
  const match = html.match(anchor);

  let updated;
  if (match) {
    const at = match.index + match[0].length;
    updated = html.slice(0, at) + TAGS + html.slice(at);
  } else {
    const bodyEnd = html.lastIndexOf("</body>");
    if (bodyEnd === -1) return "nobody";
    updated = html.slice(0, bodyEnd) + TAGS + html.slice(bodyEnd);
  }

  fs.writeFileSync(file, updated, "utf8");
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

  console.log(`Injected: ${injected} page(s)`);
  console.log(`Already had it: ${already} page(s)`);
  if (skipped.length) console.log(`Skipped (own product): ${skipped.length} page(s)`);
  if (nobody.length) {
    console.log(`No </body> found: ${nobody.length} page(s)`);
    for (const file of nobody.slice(0, 5)) console.log(`  ${file}`);
  }
}

main();
