#!/usr/bin/env node
"use strict";

/*
 * tools/extract-deep-articles.js
 *
 * Extracts the hand-written bilingual deep article from each page's
 * <section class="section axo-extra-content"> block into a JSON source file
 * under data/deep-articles/<path>.json.
 *
 * Why this exists
 * ---------------
 * The deep article (the long, mostly-unique prose below the question list) has
 * no source of truth in the repo: it was injected straight into the committed
 * HTML. Any full rebuild (tools/prerender.js) regenerates the page from
 * data/ and therefore DELETES the article. This tool captures the article
 * before that can happen, so a rebuild can re-inject it.
 *
 * Layout written per page:
 *   {
 *     "path": "/topic/science/biology/anatomy/",
 *     "en": "<inner HTML of the lang=en article>",
 *     "as": "<inner HTML of the lang=as article>"
 *   }
 *
 * The stored HTML is byte-identical to what the page serves, so re-injecting
 * it cannot change rendering.
 *
 * Idempotent: re-running overwrites with the same content.
 *
 * Usage:
 *   node tools/extract-deep-articles.js          # apply
 *   node tools/extract-deep-articles.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const OUT_DIR = path.join(ROOT, "data", "deep-articles");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview"]);

/* The article section is the last <section ...> in the document; it carries
   data-axo-path with the canonical route. */
const SECTION_RE =
  /<section class="section axo-extra-content"[^>]*data-axo-path="([^"]+)"[^>]*>([\s\S]*?)<\/section>/;
const ARTICLE_RE = /<article\b[^>]*\blang="(en|as)"[^>]*>([\s\S]*?)<\/article>/g;

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

/* "/topic/science/biology/anatomy/" -> "topic/science/biology/anatomy" */
function routeToRel(route) {
  return route.replace(/^\/+/, "").replace(/\/+$/, "");
}

function main() {
  const files = walk(ROOT, []);
  let scanned = 0;
  let extracted = 0;
  const skipped = [];

  for (const file of files) {
    scanned++;
    const html = fs.readFileSync(file, "utf8");
    const sec = SECTION_RE.exec(html);
    if (!sec) continue;

    const route = sec[1];
    const body = sec[2];
    const articles = {};
    let m;
    ARTICLE_RE.lastIndex = 0;
    while ((m = ARTICLE_RE.exec(body)) !== null) {
      if (!(m[1] in articles)) articles[m[1]] = m[2];
    }

    if (!articles.en && !articles.as) {
      skipped.push(route);
      continue;
    }

    const record = { path: route };
    if (articles.en) record.en = articles.en;
    if (articles.as) record.as = articles.as;

    const dest = path.join(OUT_DIR, routeToRel(route) + ".json");
    extracted++;
    if (!CHECK) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, JSON.stringify(record, null, 1) + "\n", "utf8");
    }
  }

  console.log(`${CHECK ? "[check] " : ""}extract-deep-articles`);
  console.log(`  HTML scanned:        ${scanned}`);
  console.log(`  articles extracted:  ${extracted}`);
  console.log(`  sections with no article: ${skipped.length}`);
  if (!CHECK) console.log(`  output:              ${path.relative(ROOT, OUT_DIR)}/`);
}

main();
