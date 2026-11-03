#!/usr/bin/env node
"use strict";

/*
 * inject-adsense-meta.js
 *
 * Adds the AdSense site-ownership meta tag to every page's <head>. AdSense
 * lists "Verify site ownership" as a separate checklist item from the policy
 * review; the tag is the cheapest way to satisfy it.
 *
 * The script is idempotent: a page that already carries the tag is left alone.
 *
 * Usage:
 *   node scripts/inject-adsense-meta.js          # apply
 *   node scripts/inject-adsense-meta.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const PUB_ID = "ca-pub-4574824794620382";
const MARKER = 'name="google-adsense-account"';
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github"]);
const CHECK = process.argv.includes("--check");

const SNIPPET = `  <meta name="google-adsense-account" content="${PUB_ID}" />\n`;

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
  const html = fs.readFileSync(file, "utf8");
  if (html.includes(MARKER)) return "already";

  const match = html.match(/<head\s*>/i);
  if (!match) return "nohead";

  const at = match.index + match[0].length;
  if (CHECK) return "would-inject";
  fs.writeFileSync(file, html.slice(0, at) + "\n" + SNIPPET + html.slice(at), "utf8");
  return "injected";
}

const root = process.argv[2] && !process.argv[2].startsWith("--")
  ? path.resolve(process.argv[2])
  : process.cwd();
const files = walk(root, []);

const counts = { injected: 0, already: 0, "would-inject": 0, nohead: 0 };
const nohead = [];
for (const file of files) {
  const r = inject(file);
  counts[r] = (counts[r] || 0) + 1;
  if (r === "nohead") nohead.push(file);
}

console.log(`AdSense meta injector${CHECK ? " (check)" : ""}`);
console.log(`  pages scanned     : ${files.length}`);
console.log(`  injected          : ${counts.injected + counts["would-inject"]}`);
console.log(`  already present   : ${counts.already}`);
if (nohead.length) {
  console.log(`  no <head> tag     : ${nohead.length}`);
  for (const f of nohead) console.log(`    - ${path.relative(root, f)}`);
}
