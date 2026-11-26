#!/usr/bin/env node
"use strict";

/*
 * tools/add-as-hub-content.js
 *
 * Give the Assamese (/as/) twins a real Assamese body.
 *
 * Problem
 * -------
 * tools/build-as-twins.js copies the English page's markup into /as/ and only
 * rewrites <head> plus the first <h1>. The runtime swaps the remaining content
 * to Assamese in the browser, but a crawler that does not run JS reads the
 * served HTML — still English. The page is then served at /as/ with lang="as"
 * and hreflang="as" while its body text is English: a duplicate of its English
 * twin and a mis-signal to search engines.
 *
 * What this does
 * --------------
 * Walks the visible text inside <main> of every /as/ twin and rewrites the
 * English runs to Assamese, using data/i18n/hub-as.json (exact strings and
 * templated patterns) plus the en -> as names already in data/. A run that
 * already contains Assamese characters is left untouched, so the tool is
 * idempotent and never fights the head strings build-as-twins wrote.
 *
 * Only visible text changes: attributes, hrefs and JSON-LD are never touched.
 *
 * tools/build-as-twins.js runs the same translation on every twin it writes
 * (via tools/lib/as-hub-strings.js), so this tool is a back-fill for twins
 * built before the translation existed, and a way to verify drift.
 *
 * Usage:
 *   node tools/add-as-hub-content.js            # apply
 *   node tools/add-as-hub-content.js --check    # report only, exit 1 on drift
 */

const fs = require("fs");
const path = require("path");
const { createTranslator } = require("./lib/as-hub-strings");

const ROOT = path.resolve(__dirname, "..");
const AS_ROOT = path.join(ROOT, "as");
const CHECK = process.argv.includes("--check");
const ONLY = (() => {
  const i = process.argv.indexOf("--only");
  return i > -1 ? process.argv[i + 1] : null;
})();

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "tools", "data", "js", "css", "images", "app"]);

const { translateFragment } = createTranslator(ROOT);

function mainSection(html) {
  const m = /<main\b[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  const bodyStart = m.index + m[0].indexOf(">") + 1;
  const bodyEnd = m.index + m[0].length - "</main>".length;
  return { bodyStart, body: m[1], bodyEnd };
}

const files = [];
(function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === "index.html") {
      files.push(path.join(dir, e.name));
    }
  }
})(AS_ROOT);

let scanned = 0;
let changed = 0;

for (const file of files) {
  const rel = path.relative(AS_ROOT, path.dirname(file)).split(path.sep).join("/");
  if (ONLY && rel !== ONLY) continue;
  scanned++;

  const html = fs.readFileSync(file, "utf8");
  const sec = mainSection(html);
  if (!sec) continue;

  const after = translateFragment(sec.body);
  if (after === sec.body) continue;
  changed++;

  if (!CHECK) {
    fs.writeFileSync(file, html.slice(0, sec.bodyStart) + after + html.slice(sec.bodyEnd));
  }
}

console.log(`as-hub-content: scanned ${scanned} | changed ${changed}`);
if (CHECK && changed) process.exit(1);
