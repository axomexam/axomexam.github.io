#!/usr/bin/env node
"use strict";

/*
 * tools/strip-adsense-from-as.js
 *
 * Removes the AdSense footprint from every page under /as/.
 *
 * Assamese is not an AdSense-supported language, so the Assamese twins must
 * not carry any ad code. tools/build-as-twins.js already strips it on every
 * rebuild (via tools/lib/strip-adsense.js), but twins built before that rule
 * existed still carry the ownership meta, the googlesyndication dns-prefetch,
 * the AdSense comment and the ad reservations inside the layout-reserve style.
 * This script cleans the committed tree so it matches what the builder emits.
 *
 * Idempotent: a page that is already clean is left untouched.
 *
 * Usage:
 *   node tools/strip-adsense-from-as.js          # apply
 *   node tools/strip-adsense-from-as.js --check  # report only
 */

const fs = require("fs");
const path = require("path");
const { stripAdsense } = require("./lib/strip-adsense");

const ROOT = process.cwd();
const CHECK = process.argv.includes("--check");
const AS = path.join(ROOT, "as");

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(path.join(dir, entry.name), files);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(path.join(dir, entry.name));
  }
  return files;
}

const files = walk(AS, []);
let changed = 0;

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = stripAdsense(before);
  if (after === before) continue;
  changed++;
  if (!CHECK) fs.writeFileSync(file, after, "utf8");
}

console.log(`strip-adsense-from-as${CHECK ? " (check)" : ""}`);
console.log(`  /as/ pages : ${files.length}`);
console.log(`  changed    : ${changed}`);
