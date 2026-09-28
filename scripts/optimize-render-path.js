#!/usr/bin/env node
"use strict";

/*
 * Optimise the render path across the generated static pages.
 *
 *  1. Adds `defer` to the four shared scripts on every page so the
 *     parser is not blocked by ~100 KB of JavaScript.
 *  2. On selected entry pages (currently the homepage) it inlines the
 *     above-the-fold "critical" CSS extracted from css/style.css and
 *     switches the full stylesheet to a non-blocking preload. This
 *     removes style.css from the render-blocking critical path.
 *
 * Run from the repository root:
 *   node scripts/optimize-render-path.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const STYLE_CSS = path.join(ROOT, "css", "style.css");
const SKIP_DIRS = new Set([".git", "node_modules", ".github", ".monkeycode-tmp-files"]);

/* Scripts that must run in order but must not block the parser. */
const DEFER_SCRIPTS = ["config.js", "i18n.js", "api.js", "app.js"];

/* Pages that get the critical-CSS + async stylesheet treatment. */
const CRITICAL_PAGES = new Set(["index.html"]);

/*
 * Line ranges (1-indexed, inclusive) of css/style.css that cover the
 * elements visible before the first scroll on every template: base,
 * preloader, header, search, theme toggle, navigation, hero, section
 * scaffolding, page header, tab bar, reveal state, dark mode and the
 * mobile overrides. They are copied verbatim so the layout does not
 * shift when the full stylesheet arrives. Keep every range inside full
 * comment / @media boundaries: a range that ends on a dangling `/*`
 * would comment out whatever is appended after it.
 */
const CRITICAL_RANGES = [
  [6, 126],
  [128, 153],
  [207, 244],
  [246, 293],
  [349, 438],
  [494, 500],
  [687, 709],
  [1082, 1086],
  [1171, 1270],
  [1986, 2171],
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

function buildCriticalCss() {
  const lines = fs.readFileSync(STYLE_CSS, "utf8").split("\n");
  const parts = [];
  for (const [start, end] of CRITICAL_RANGES) {
    parts.push(lines.slice(start - 1, end).join("\n"));
  }
  return parts.join("\n");
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

function asyncStylesheet(html, criticalCss) {
  const styleTagRe = /<style id="axo-critical-css">[\s\S]*?<\/style>/;
  const existing = html.match(styleTagRe);

  /* Re-running the script refreshes the inline block from the current
     css/style.css instead of leaving a stale copy behind. */
  if (existing) {
    const updated = '<style id="axo-critical-css">' + criticalCss + "</style>";
    if (existing[0] === updated) return { html, changed: false };
    return { html: html.replace(styleTagRe, updated), changed: true };
  }

  const linkRe = /<link rel="stylesheet" href="(\/css\/style\.css(?:\?[^"]*)?)"\s*\/?>/;
  const match = html.match(linkRe);
  if (!match) return { html, changed: false };

  const href = match[1];
  const replacement =
    '<style id="axo-critical-css">' +
    criticalCss +
    "</style>\n  " +
    '<link rel="preload" as="style" href="' +
    href +
    '" onload="this.onload=null;this.rel=\'stylesheet\'" />\n  ' +
    '<noscript><link rel="stylesheet" href="' +
    href +
    '" /></noscript>';

  return { html: html.replace(linkRe, replacement), changed: true };
}

function main() {
  const criticalCss = buildCriticalCss();
  const files = walk(ROOT, []);

  let deferred = 0;
  let critical = 0;
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

    if (CRITICAL_PAGES.has(rel.split(path.sep).join("/"))) {
      const c = asyncStylesheet(html, criticalCss);
      if (c.changed) {
        html = c.html;
        changed = true;
        critical++;
      }
    }

    if (changed) {
      fs.writeFileSync(file, html, "utf8");
    } else if (!html.includes('src="/js/app.js')) {
      skipped.push(rel);
    }
  }

  console.log("Scanned:          " + files.length);
  console.log("Deferred scripts: " + deferred);
  console.log("Critical CSS:     " + critical);
  console.log("Skipped (stubs):  " + skipped.length);
}

main();
