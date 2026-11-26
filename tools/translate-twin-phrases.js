#!/usr/bin/env node
"use strict";

/*
 * tools/translate-twin-phrases.js
 *
 * Back-fills the Assamese sentences in data/i18n/twin-phrases.js into the
 * /as/ pages that already exist. New twins get them from build-as-twins.js,
 * which calls the same module; this tool is for the pages already committed.
 *
 * Only /as/ pages are touched, and only whole sentences that the module knows.
 * Idempotent: a translated sentence no longer matches its English key.
 *
 * Usage:
 *   node tools/translate-twin-phrases.js           # apply
 *   node tools/translate-twin-phrases.js --check   # report only
 */

const fs = require("fs");
const path = require("path");
const { translate } = require(path.join(__dirname, "..", "data", "i18n", "twin-phrases.js"));
const { applyAll } = require(path.join(__dirname, "..", "data", "i18n", "page-fragments-as.js"));

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

const pages = walk(path.join(ROOT, "as"), []);
let files = 0;
let total = 0;
let removed = 0;
for (const p of pages) {
  const html = fs.readFileSync(p, "utf8");
  const rel = path.relative(path.join(ROOT, "as"), path.dirname(p)).split(path.sep).join("/");
  const base = translate(html);
  const frag = applyAll(rel, base.html);
  const next = frag.html;
  const count = base.count + frag.count;
  const dropped = base.dropped;
  if (!count && !dropped) continue;
  files++;
  total += count;
  removed += dropped;
  if (!CHECK) fs.writeFileSync(p, next, "utf8");
  if (CHECK) console.log(`  ${count}x  ${path.relative(ROOT, p)}`);
}
console.log(
  `${CHECK ? "[check] " : ""}pages ${CHECK ? "to change" : "changed"}: ${files} | translated: ${total} | duplicate English dropped: ${removed}`
);
