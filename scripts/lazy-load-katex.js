#!/usr/bin/env node
"use strict";

/*
 * Stop shipping the KaTeX math engine on pages that have no math.
 *
 * Every page used to include the KaTeX stylesheet plus katex.min.js and
 * auto-render.min.js in its <head>, even though most pages contain no
 * formulas. That is ~74 KB of JavaScript (plus ~23 KB of CSS) that
 * Lighthouse flags as unused on every page.
 *
 * js/app.src.js now loads KaTeX on demand: renderMathJax() checks whether
 * the element actually contains a math delimiter ("$", "\(" or "\[") and
 * only then injects katex.min.css, katex.min.js and auto-render.min.js.
 *
 * This script removes the eager tags from every generated HTML page. It is
 * idempotent, so it is safe to run again after regenerating the pages.
 *
 * Usage, run from the repository root:
 *   node scripts/lazy-load-katex.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] && !process.argv[2].startsWith("--")
  ? path.resolve(process.argv[2])
  : process.cwd();
const SKIP_DIRS = new Set([".git", "node_modules", ".github", ".monkeycode-tmp-files"]);

/* Each pattern removes one piece of the eager KaTeX block. The <noscript>
   wrapper is matched before the bare stylesheet link so no empty
   <noscript> is left behind. */
const KATEX_PATTERNS = [
  /\n[ \t]*<!--\s*KaTeX Math & Formula Rendering Engine\s*-->/g,
  /\n[ \t]*<noscript>\s*<link[^>]*katex@[^>]*katex\.min\.css[^>]*>\s*<\/noscript>/g,
  /\n[ \t]*<link[^>]*katex@[^>]*katex\.min\.css[^>]*>/g,
  /\n[ \t]*<script[^>]*katex@[^>]*katex\.min\.js[^>]*>\s*<\/script>/g,
  /\n[ \t]*<script[^>]*katex@[^>]*auto-render\.min\.js[^>]*>\s*<\/script>/g,
];

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

function stripKatex(html) {
  let out = html;
  for (const re of KATEX_PATTERNS) out = out.replace(re, "");
  return out;
}

function main() {
  const files = walk(ROOT, []);
  let changed = 0;

  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");
    const after = stripKatex(before);
    if (after !== before) {
      fs.writeFileSync(file, after, "utf8");
      changed++;
    }
  }

  console.log("Scanned:            " + files.length);
  console.log("KaTeX tags removed: " + changed);
}

main();
