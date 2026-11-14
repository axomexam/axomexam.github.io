#!/usr/bin/env node
"use strict";

/*
 * Optimise the render path across the generated static pages.
 *
 *  1. Adds `defer` to the four shared scripts on every page so the
 *     parser is not blocked by ~100 KB of JavaScript.
 *  2. Keeps the shared stylesheet render-blocking on every page. Older
 *     builds inlined a partial "critical" CSS block and loaded style.css
 *     with rel=preload + onload. That made the first paint depend on an
 *     async request, so on slower connections the page appeared
 *     partially styled until a reload (when the CSS came from cache).
 *     A normal stylesheet link guarantees the full design is applied
 *     before the first paint.
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

/* Normalise the shared stylesheet to a plain render-blocking link and
   strip the old inline critical-CSS + preload/onload treatment. */
function blockingStylesheet(html) {
  let changed = false;

  const criticalRe = /\s*<style id="axo-critical-css">[\s\S]*?<\/style>/;
  if (criticalRe.test(html)) {
    html = html.replace(criticalRe, "");
    changed = true;
  }

  /* Drop the no-JS duplicate first so it is not mistaken for an existing
     render-blocking stylesheet below. */
  const noscriptRe =
    /\s*<noscript><link rel="stylesheet" href="\/css\/style\.css(?:\?[^"]*)?"\s*\/?><\/noscript>/i;
  if (noscriptRe.test(html)) {
    html = html.replace(noscriptRe, "");
    changed = true;
  }

  const hasBlocking =
    /<link\b[^>]*rel="stylesheet"[^>]*href="\/css\/style\.css(?:\?[^"]*)?"[^>]*>/i.test(html);

  html = html.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/rel="preload"/i.test(tag) || !/as="style"/i.test(tag)) return tag;
    const match = tag.match(/href="([^"]*\/css\/style\.css(?:\?[^"]*)?)"/i);
    if (!match) return tag;
    changed = true;
    return hasBlocking ? "" : '<link rel="stylesheet" href="' + match[1] + '" />';
  });

  return { html, changed };
}

function main() {
  const files = walk(ROOT, []);

  let deferred = 0;
  let styles = 0;
  const skipped = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    let html = fs.readFileSync(file, "utf8");
    let changed = false;

    const d = addDefer(html);
    if (d.changed) {
      html = d.html;
      changed = true;
      deferred++;
    }

    const s = blockingStylesheet(html);
    if (s.changed) {
      html = s.html;
      changed = true;
      styles++;
    }

    if (changed) {
      fs.writeFileSync(file, html, "utf8");
    } else if (!html.includes('src="/js/app.js')) {
      skipped.push(rel);
    }
  }

  console.log("Scanned:          " + files.length);
  console.log("Deferred scripts: " + deferred);
  console.log("Blocking CSS:     " + styles);
  console.log("Skipped (stubs):  " + skipped.length);
}

main();
