#!/usr/bin/env node
"use strict";

/*
 * inject-aeo-geo.js
 *
 * Adds AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization)
 * signals to the static pages without changing any visible content or existing
 * schema. Everything added here is additive, valid and idempotent, so it can be
 * safely re-run after any content regeneration.
 *
 * What it adds to the JSON-LD graph on every page:
 *   - datePublished / dateModified  (freshness signal, taken from sitemap.xml)
 *   - isAccessibleForFree: true     (content is free / no paywall)
 *   - author -> Organization        (clear entity attribution)
 *   - speakable                     (voice / answer-engine targeting)
 *
 * Usage:
 *   node scripts/inject-aeo-geo.js          # apply changes
 *   node scripts/inject-aeo-geo.js --check  # report only, do not write
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SITE = "https://axomexam.in";
const ORG_ID = `${SITE}/#organization`;
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github"]);

const PAGE_TYPES = new Set([
  "WebPage",
  "CollectionPage",
  "AboutPage",
  "ContactPage",
  "ItemPage",
  "SearchResultsPage",
]);

const CONTENT_TYPES = new Set([
  "Quiz",
  "LearningResource",
  "Article",
  "Book",
  "Course",
  "ItemList",
  "Dataset",
]);

function readSitemapDates() {
  const map = new Map();
  const file = path.join(ROOT, "sitemap.xml");
  if (!fs.existsSync(file)) return map;

  const xml = fs.readFileSync(file, "utf8");
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const block of blocks) {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    const lastmod = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
    if (!loc || !lastmod) continue;
    map.set(normalize(loc), lastmod.trim());
  }
  return map;
}

function normalize(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    u.search = "";
    return u.pathname.replace(/\/+$/, "") + "/";
  } catch (e) {
    return url.replace(/\/+$/, "") + "/";
  }
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

function addDates(node, date) {
  let changed = false;
  if (date && !node.datePublished) {
    node.datePublished = date;
    changed = true;
  }
  if (date && !node.dateModified) {
    node.dateModified = date;
    changed = true;
  }
  return changed;
}

function enrichNode(node, date) {
  if (!node || typeof node !== "object") return false;
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  let changed = false;

  if (types.some((t) => PAGE_TYPES.has(t))) {
    changed = addDates(node, date) || changed;
    if (node.isAccessibleForFree === undefined) {
      node.isAccessibleForFree = true;
      changed = true;
    }
    if (!node.speakable) {
      node.speakable = {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".page-desc"],
      };
      changed = true;
    }
  }

  if (types.some((t) => CONTENT_TYPES.has(t))) {
    changed = addDates(node, date) || changed;
    if (node.isAccessibleForFree === undefined) {
      node.isAccessibleForFree = true;
      changed = true;
    }
    if (!node.author) {
      node.author = { "@id": ORG_ID };
      changed = true;
    }
    if (!node.publisher) {
      node.publisher = { "@id": ORG_ID };
      changed = true;
    }
    if (!node.inLanguage) {
      node.inLanguage = ["en", "as"];
      changed = true;
    }
  }

  return changed;
}

function enrichGraph(data, date) {
  let changed = false;
  const nodes = [];
  if (Array.isArray(data["@graph"])) nodes.push(...data["@graph"]);
  if (!data["@graph"]) nodes.push(data);
  for (const node of nodes) {
    changed = enrichNode(node, date) || changed;
  }
  return changed;
}

function getCanonical(html, fallback) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  return m ? m[1] : fallback;
}

function escapeForScript(json) {
  return json.replace(/<\/(script)/gi, "<\\/$1");
}

function processFile(file, dates, stats) {
  const html = fs.readFileSync(file, "utf8");
  const canonical = getCanonical(html, `${SITE}/${path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/")}/`);
  const date = dates.get(normalize(canonical)) || dates.get(normalize(`${SITE}/`));

  let changedFile = false;
  const out = html.replace(
    /(<script[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (full, open, body, close) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        stats.invalid.push(path.relative(ROOT, file));
        return full;
      }
      if (!enrichGraph(data, date)) return full;
      changedFile = true;
      return open + escapeForScript(JSON.stringify(data)) + close;
    }
  );

  if (changedFile) {
    stats.changed.push(path.relative(ROOT, file));
    if (!CHECK) fs.writeFileSync(file, out, "utf8");
  } else {
    stats.unchanged++;
  }
}

function main() {
  const dates = readSitemapDates();
  const files = walk(ROOT, []);
  const stats = { changed: [], unchanged: 0, invalid: [] };

  for (const file of files) processFile(file, dates, stats);

  console.log(`AEO/GEO injector (${CHECK ? "check" : "apply"})`);
  console.log(`  pages scanned : ${files.length}`);
  console.log(`  pages updated : ${stats.changed.length}`);
  console.log(`  already ok    : ${stats.unchanged}`);
  console.log(`  invalid JSON-LD: ${stats.invalid.length}`);
  if (stats.invalid.length) {
    console.log("  invalid files:");
    for (const f of stats.invalid) console.log(`    - ${f}`);
  }
}

main();
