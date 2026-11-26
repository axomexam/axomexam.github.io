#!/usr/bin/env node
"use strict";

/*
 * tools/fix-stale-category-links.js
 *
 * Repairs the crawler-facing sub-category links on /category/<cat>/ pages.
 *
 * A sub-category with no sections and no topics of its own is a *leaf*: the
 * client-side router sends the visitor straight to its question page at
 * /topic/<cat>/<sub>/ (see renderCategoryPage in js/app.src.js). The
 * prerendered HTML, however, still linked those leaves to
 * /category/<cat>/<sub>/ — a noindex duplicate whose canonical points at the
 * /topic/ page. Crawlers therefore followed a dead-end duplicate instead of
 * the canonical question bank, and the /topic/ pages ended up with no
 * internal inbound links at all.
 *
 * This script rewrites only those leaf links (inside <main id="app">) whose
 * target is such a duplicate, i.e. a page whose own canonical points
 * elsewhere. A leaf whose /category/ page is genuinely indexable (canonical
 * points at itself) is left untouched, so no indexed page loses a link.
 *
 * Idempotent: a page whose leaf links already point at /topic/ is skipped.
 *
 * Usage:
 *   node tools/fix-stale-category-links.js          # apply
 *   node tools/fix-stale-category-links.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/* Leaf sub-categories: no sections and no topics of their own. */
function leafKeys() {
  const raw = readJSON(path.join(ROOT, "data/categories.json"));
  const cats = Array.isArray(raw) ? raw : raw.categories || [];
  const leaves = new Set();
  for (const cat of cats) {
    const subs = cat.subcategories || cat.sections || [];
    for (const sub of subs) {
      const hasChildren = (sub.sections || []).length || (sub.topics || []).length;
      if (!hasChildren) leaves.add(`${cat.id}/${sub.id}`);
    }
  }
  return leaves;
}

/* Canonical URL of a prerendered page, or null when the file is absent. */
function canonicalOf(relPath) {
  const file = path.join(ROOT, relPath, "index.html");
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!m) return null;
  return m[1].replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "");
}

function main() {
  const leaves = leafKeys();
  const changed = [];
  let scanned = 0;

  const categoryDir = path.join(ROOT, "category");
  const cats = fs.readdirSync(categoryDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  for (const catId of cats) {
    const file = path.join(categoryDir, catId, "index.html");
    if (!fs.existsSync(file)) continue;
    scanned++;

    const html = fs.readFileSync(file, "utf8");
    const start = html.indexOf('<main id="app"');
    const end = html.indexOf("</main>", start);
    if (start === -1 || end === -1) continue;

    const before = html.slice(0, start);
    const main = html.slice(start, end);
    const after = html.slice(end);

    const fixed = main.replace(
      /href="\/category\/([^"/]+)\/([^"/]+)\/"/g,
      (match, c, s) => {
        const key = `${c}/${s}`;
        if (!leaves.has(key)) return match;

        const categoryUrl = `/category/${c}/${s}`;
        const topicRel = path.join("topic", c, s);
        if (canonicalOf(topicRel) !== `/topic/${c}/${s}`) return match;
        /* Only retarget duplicates: a page whose canonical is not itself. */
        if (canonicalOf(path.join("category", c, s)) === categoryUrl) return match;

        return `href="/topic/${c}/${s}/"`;
      }
    );

    if (fixed === main) continue;
    changed.push(path.relative(ROOT, file));
    if (!CHECK) fs.writeFileSync(file, before + fixed + after, "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}Stale category links`);
  console.log(`  category pages scanned: ${scanned}`);
  console.log(`  pages rewritten:        ${changed.length}`);
  for (const f of changed) console.log(`    ${f}`);
}

main();
