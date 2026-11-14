#!/usr/bin/env node
"use strict";

/*
 * Content-hash asset versioning.
 *
 * Every first-party CSS/JS asset is referenced with a ?v=<hash> query string
 * in the static HTML. The hash is derived from the file contents, so the URL
 * only changes when the file really changes.
 *
 * This replaces the old habit of hand-bumping a date-based version, which
 * invalidated the whole service-worker precache on every deploy even when no
 * asset had actually changed (that is what made repeat-visit mobile
 * performance dip for no reason).
 *
 * Usage, run from the repository root:
 *   node scripts/stamp-assets.js          # rewrite every page + sw.js in place
 *   node scripts/stamp-assets.js --check  # only report drift; exit 1 if any
 *
 * Typical order after editing styles or scripts:
 *   node scripts/optimize-render-path.js  # refresh the inline critical CSS
 *   node scripts/minify-assets.js         # minify .src.* -> deployed assets
 *   node scripts/stamp-assets.js          # refresh the ?v= hashes + sw.js
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const rootArg = args.find((a) => !a.startsWith("--"));
const ROOT = rootArg ? path.resolve(rootArg) : process.cwd();
const SKIP_DIRS = new Set([".git", "node_modules", ".github", ".monkeycode-tmp-files"]);

/* First-party assets that get cache-busted with ?v=<hash>. */
const ASSETS = [
  "css/style.css",
  "js/config.js",
  "js/i18n.js",
  "js/api.js",
  "js/app.js",
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function shortHash(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 8);
}

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

function main() {
  const versions = {};
  for (const rel of ASSETS) {
    versions[rel] = shortHash(fs.readFileSync(path.join(ROOT, rel)));
  }

  /* One combined hash so the service worker rebuilds its cache only when at
     least one precached asset changed. */
  const cacheVersion = shortHash(
    Buffer.from(ASSETS.map((rel) => versions[rel]).join(":"))
  );

  const drift = [];
  const writeIfChanged = (file, before, after) => {
    if (before === after) return;
    drift.push(path.relative(ROOT, file).split(path.sep).join("/"));
    if (!CHECK) fs.writeFileSync(file, after, "utf8");
  };

  /* 1. HTML: point every asset reference at its current content hash. */
  for (const file of walk(ROOT, [])) {
    const before = fs.readFileSync(file, "utf8");
    let after = before;
    for (const rel of ASSETS) {
      const re = new RegExp("((?:\\.?/)?)" + escapeRegExp(rel) + "\\?v=[0-9A-Za-z]+", "g");
      after = after.replace(re, "$1" + rel + "?v=" + versions[rel]);
    }
    writeIfChanged(file, before, after);
  }

  /* 2. Service worker: keep the precache URLs and cache version in sync. */
  const swFile = path.join(ROOT, "sw.js");
  if (fs.existsSync(swFile)) {
    const before = fs.readFileSync(swFile, "utf8");
    let after = before;
    for (const rel of ASSETS) {
      const re = new RegExp("((?:\\.?/)?)" + escapeRegExp(rel) + "\\?v=[0-9A-Za-z]+", "g");
      after = after.replace(re, "$1" + rel + "?v=" + versions[rel]);
    }
    after = after.replace(
      /(const CACHE_VERSION = ")[^"]*(";)/,
      "$1" + cacheVersion + "$2"
    );
    writeIfChanged(swFile, before, after);
  }

  console.log("Asset hashes:");
  for (const rel of ASSETS) console.log("  " + rel.padEnd(18) + versions[rel]);
  console.log("CACHE_VERSION:     " + cacheVersion);
  console.log((CHECK ? "Drift: " : "Updated: ") + drift.length + " file(s)");
  for (const d of drift.slice(0, 20)) console.log("  " + d);
  if (drift.length > 20) console.log("  ... and " + (drift.length - 20) + " more");

  if (CHECK && drift.length) process.exitCode = 1;
}

main();
