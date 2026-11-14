#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const GA_ID = "G-PBPXK2Q799";
const MARKER = "googletagmanager.com/gtag/js";
const SKIP_DIRS = new Set([".git", "node_modules", ".github"]);

const SNIPPET = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  </script>
`;

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

  if (html.includes(MARKER) || html.includes(GA_ID)) {
    return "already";
  }

  const match = html.match(/<head\s*>/i);
  if (!match) {
    return "nohead";
  }

  const insertAt = match.index + match[0].length;
  const updated = html.slice(0, insertAt) + "\n" + SNIPPET + html.slice(insertAt);
  fs.writeFileSync(file, updated, "utf8");
  return "injected";
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const files = walk(root, []);

  let injected = 0;
  let already = 0;
  const skipped = [];

  for (const file of files) {
    const result = inject(file);
    if (result === "injected") injected++;
    else if (result === "already") already++;
    else skipped.push(file);
  }

  console.log(`GA ID: ${GA_ID}`);
  console.log(`Scanned: ${files.length} HTML file(s)`);
  console.log(`Injected: ${injected}`);
  console.log(`Already present: ${already}`);
  if (skipped.length) {
    console.log(`Skipped (no <head> tag): ${skipped.length}`);
    for (const f of skipped) console.log(`  - ${path.relative(root, f)}`);
  }
}

main();
