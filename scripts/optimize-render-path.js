#!/usr/bin/env node
"use strict";

/*
 * Optimise the render path across the generated static pages.
 *
 * Adds `defer` to the four shared scripts on every page so the HTML
 * parser is not blocked by ~100 KB of JavaScript. Execution order is
 * preserved (defer runs in document order, before DOMContentLoaded)
 * and the trailing per-page guard scripts do not depend on them.
 *
 * Run from the repository root:
 *   node scripts/optimize-render-path.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const SKIP_DIRS = new Set([".git", "node_modules", ".github", ".monkeycode-tmp-files"]);

/* Scripts that must run in order but must not block the parser. */
const DEFER_SCRIPTS = ["config.js", "i18n.js", "api.js", "app.js"];

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

function addDefer(html) {
  let changed = false;
  for (const file of DEFER_SCRIPTS) {
    const re = new RegExp(
      '(<script src="/js/' + file.replace(".", "\\.") + '(?:\\?[^"]*)?")(\\s*></script>)'
    );
    if (re.test(html)) {
      html = html.replace(re, "$1 defer$2");
      changed = true;
    }
  }
  return { html, changed };
}

function main() {
  const files = walk(ROOT, []);

  let deferred = 0;
  let skipped = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const d = addDefer(html);
    if (d.changed) {
      fs.writeFileSync(file, d.html, "utf8");
      deferred++;
    } else if (!html.includes('src="/js/app.js')) {
      skipped++;
    }
  }

  console.log("Scanned:          " + files.length);
  console.log("Deferred scripts: " + deferred);
  console.log("Skipped (stubs):  " + skipped);
}

main();
