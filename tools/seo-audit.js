#!/usr/bin/env node
"use strict";

/*
 * tools/seo-audit.js
 *
 * Repeatable whole-site on-page SEO audit. Parses every committed HTML page
 * (skipping dist/ and the /as/ mirror unless --as is passed) and reports the
 * checks that SEO-ACTION-PLAN.md tracks, so the numbers can be re-verified
 * after any generator run instead of being re-measured by hand.
 *
 * Usage:
 *   node tools/seo-audit.js            # human summary
 *   node tools/seo-audit.js --json     # machine-readable
 *   node tools/seo-audit.js --list     # include offending URLs (capped)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const JSON_OUT = process.argv.includes("--json");
const LIST = process.argv.includes("--list");
const SKIP = new Set([".git", "dist", "tools", "scripts", "data", "js", "css", "node_modules", "images", "app", "as"]);
const LIST_CAP = 25;

const strip = (h) => h
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ");

const one = (h, re) => { const m = re.exec(h); return m ? m[1].trim() : null; };

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (fs.existsSync(path.join(full, "index.html"))) out.push(full);
    walk(full, out);
  }
}

const pages = [];
walk(ROOT, pages);
pages.push(ROOT); // homepage
pages.sort();

const titles = new Map(), h1s = new Map(), descs = new Map();
const rows = [];

for (const dir of pages) {
  const file = dir === ROOT ? path.join(ROOT, "index.html") : path.join(dir, "index.html");
  const url = "/" + path.relative(ROOT, dir).split(path.sep).join("/") + (dir === ROOT ? "" : "/");
  const h = fs.readFileSync(file, "utf8");
  const robots = (one(h, /<meta name="robots" content="([^"]*)"/i) || "").toLowerCase();
  const noindex = robots.includes("noindex");
  const title = one(h, /<title>([\s\S]*?)<\/title>/i);
  const desc = one(h, /<meta name="description" content="([^"]*)"/i);
  const canonical = one(h, /<link rel="canonical" href="([^"]*)"/i);
  const h1 = one(h, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const words = strip(h).split(/\s+/).filter(Boolean).length;
  const ld = /application\/ld\+json/.test(h);

  const rec = { url, noindex, title, desc, canonical, h1, words, ld };
  rows.push(rec);

  if (!noindex) {
    if (title) (titles.get(title) || titles.set(title, []).get(title)).push(url);
    if (h1) (h1s.get(h1) || h1s.set(h1, []).get(h1)).push(url);
    if (desc) (descs.get(desc) || descs.set(desc, []).get(desc)).push(url);
  }
}

const indexable = rows.filter((r) => !r.noindex);
const groups = (m) => [...m.entries()].filter(([, v]) => v.length > 1);

const noH1 = indexable.filter((r) => !r.h1);
const noDesc = indexable.filter((r) => !r.desc);
const noCanon = indexable.filter((r) => !r.canonical);
const noLD = indexable.filter((r) => !r.ld);
const thin = indexable.filter((r) => r.words < 300);
const longTitle = indexable.filter((r) => r.title && r.title.length > 60);
const longDesc = indexable.filter((r) => r.desc && r.desc.length > 160);
const shortTitle = indexable.filter((r) => r.title && r.title.length < 30);

const tLen = indexable.filter((r) => r.title).map((r) => r.title.length);
const dLen = indexable.filter((r) => r.desc).map((r) => r.desc.length);
const wLen = indexable.map((r) => r.words);
const stat = (a) => ({ min: Math.min(...a), max: Math.max(...a), avg: Math.round(a.reduce((x, y) => x + y, 0) / a.length) });

let sitemapUrls = 0;
try {
  sitemapUrls = (fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").match(/<loc>/g) || []).length;
} catch (e) {}

const report = {
  pages: rows.length,
  sitemapUrls,
  indexable: indexable.length,
  noindex: rows.length - indexable.length,
  noH1: noH1.length,
  noDesc: noDesc.length,
  noCanonical: noCanon.length,
  noJsonLd: noLD.length,
  thin: thin.length,
  longTitle: longTitle.length,
  longDesc: longDesc.length,
  shortTitle: shortTitle.length,
  dupTitles: groups(titles).length,
  dupH1: groups(h1s).length,
  dupDescs: groups(descs).length,
  titleLen: stat(tLen),
  descLen: stat(dLen),
  wordLen: stat(wLen),
  over1000w: indexable.filter((r) => r.words > 1000).length,
};

if (JSON_OUT) { console.log(JSON.stringify(report, null, 2)); process.exit(0); }

console.log("SEO audit — axomexam.in");
console.log(`  pages            : ${report.pages}`);
console.log(`  sitemap urls     : ${report.sitemapUrls}`);
console.log(`  indexable        : ${report.indexable}`);
console.log(`  noindex          : ${report.noindex}`);
console.log(`  missing H1       : ${report.noH1}`);
console.log(`  missing desc     : ${report.noDesc}`);
console.log(`  missing canonical: ${report.noCanonical}`);
console.log(`  missing JSON-LD  : ${report.noJsonLd}`);
console.log(`  thin (<300w)     : ${report.thin}`);
console.log(`  title >60 chars  : ${report.longTitle}`);
console.log(`  desc >160 chars  : ${report.longDesc}`);
console.log(`  title <30 chars  : ${report.shortTitle}`);
console.log(`  dup titles       : ${report.dupTitles} groups`);
console.log(`  dup H1           : ${report.dupH1} groups`);
console.log(`  dup descriptions : ${report.dupDescs} groups`);
console.log(`  title len        : min ${report.titleLen.min} / max ${report.titleLen.max} / avg ${report.titleLen.avg}`);
console.log(`  desc len         : min ${report.descLen.min} / max ${report.descLen.max} / avg ${report.descLen.avg}`);
console.log(`  words            : min ${report.wordLen.min} / max ${report.wordLen.max} / avg ${report.wordLen.avg}`);
console.log(`  pages >1000w     : ${report.over1000w}`);

if (LIST) {
  const show = (label, arr, get) => {
    if (!arr.length) return;
    console.log(`\n${label}:`);
    for (const r of arr.slice(0, LIST_CAP)) console.log(`  ${r.url}  ${get ? get(r) : ""}`);
    if (arr.length > LIST_CAP) console.log(`  ... +${arr.length - LIST_CAP} more`);
  };
  show("thin pages", thin, (r) => `${r.words}w`);
  show("missing H1", noH1);
  show("missing description", noDesc);
  show("missing canonical", noCanon);
  show("missing JSON-LD", noLD);
  show("title >60 chars", longTitle, (r) => `${r.title.length}c`);
  show("desc >160 chars", longDesc, (r) => `${r.desc.length}c`);
  for (const [k, v] of groups(titles).slice(0, 8)) {
    console.log(`\ndup title (${v.length}): ${k}`);
    for (const u of v.slice(0, 4)) console.log(`  ${u}`);
  }
  for (const [k, v] of groups(h1s).slice(0, 8)) {
    console.log(`\ndup H1 (${v.length}): ${k}`);
    for (const u of v.slice(0, 4)) console.log(`  ${u}`);
  }
}
