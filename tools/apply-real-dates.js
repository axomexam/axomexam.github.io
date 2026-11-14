#!/usr/bin/env node
"use strict";

/*
 * tools/apply-real-dates.js
 *
 * Gives every page its own real publication and update date instead of one
 * shared date stamped on the whole site.
 *
 * Problem
 * -------
 * Every page carried the same signals: `dateModified` = 2026-10-23, visible
 * "Last updated: 23 October 2026", and `<lastmod>2026-10-23</lastmod>` for all
 * 648 sitemap URLs. `datePublished` disagreed with the visible "Published:"
 * date on 520 of 614 pages. A site-wide identical timestamp reads as
 * templated, and a visible date that contradicts the structured data is worse
 * than no date at all.
 *
 * Where the dates come from
 * -------------------------
 * Git history, which is the only real record of when a page was first written
 * and last genuinely edited:
 *   datePublished = date of the commit that first added the file
 *   dateModified  = date of the last commit that touched the file and changed
 *                   fewer than BULK_FILES files
 *
 * The bulk-commit filter matters. Large site-wide sweeps (theme tweaks, meta
 * rewrites, nav changes) touch 600+ files at once and say nothing about a
 * single page's content freshness; letting them win would recreate the uniform
 * timestamp this tool exists to remove. Pages that only ever moved in bulk
 * commits keep their creation date as the update date.
 *
 * What is rewritten
 * -----------------
 *   JSON-LD  "datePublished" / "dateModified"
 *   visible  <strong>Published:</strong> / <strong>Last updated:</strong>
 *   visible  <strong>প্ৰকাশিত:</strong> / <strong>শেহতীয়া আপডেট:</strong>
 *   sitemap  <lastmod> per URL
 *
 * The Assamese labels get Assamese month names; the English labels keep
 * English month names.
 *
 * Idempotent: re-running writes the same values.
 *
 * Usage:
 *   node tools/apply-real-dates.js          # apply
 *   node tools/apply-real-dates.js --check  # report only
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const SITE = "https://axomexam.in";
const BULK_FILES = 50;
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview"]);

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_AS = [
  "জানুৱাৰী", "ফেব্ৰুৱাৰী", "মাৰ্চ", "এপ্ৰিল", "মে", "জুন",
  "জুলাই", "আগষ্ট", "ছেপ্তেম্বৰ", "অক্টোবৰ", "নৱেম্বৰ", "ডিচেম্বৰ",
];

/* ---------- git history ---------- */

function gitDates() {
  const out = execFileSync(
    "git",
    ["log", "--no-merges", "--format=@@%ad", "--date=short", "--name-only", "HEAD"],
    { cwd: ROOT, maxBuffer: 512 * 1024 * 1024, encoding: "utf8" }
  );

  /* git log lists newest first; walk oldest first so "first seen" really means
     the file's creation commit and the last non-bulk touch wins. */
  const commits = [];
  let date = null;
  let files = [];
  const flush = () => {
    if (date) commits.push({ date, files });
    files = [];
  };
  for (const line of out.split("\n")) {
    if (line.startsWith("@@")) {
      flush();
      date = line.slice(2).trim();
    } else if (line.trim()) {
      files.push(line.trim());
    }
  }
  flush();

  const created = new Map();
  const modified = new Map();
  for (let i = commits.length - 1; i >= 0; i--) {
    const c = commits[i];
    const bulk = c.files.length > BULK_FILES;
    for (const f of c.files) {
      if (!created.has(f)) created.set(f, c.date);
      if (!bulk) modified.set(f, c.date);
    }
  }
  return { created, modified };
}

/* ---------- formatting ---------- */

function fmt(iso, months) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

/* ---------- page walk ---------- */

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

function routeOf(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  return "/" + rel;
}

function replaceDates(html, pubIso, modIso) {
  let n = 0;
  const sub = (re, value) => {
    html = html.replace(re, (m) => {
      n++;
      return value;
    });
  };

  sub(/"datePublished":"[^"]*"/g, `"datePublished":"${pubIso}"`);
  sub(/"dateModified":"[^"]*"/g, `"dateModified":"${modIso}"`);
  sub(
    /<strong>Published:<\/strong>\s*\d{1,2} [A-Za-z]+ \d{4}/g,
    `<strong>Published:</strong> ${fmt(pubIso, MONTHS_EN)}`
  );
  sub(
    /<strong>Last updated:<\/strong>\s*\d{1,2} [A-Za-z]+ \d{4}/g,
    `<strong>Last updated:</strong> ${fmt(modIso, MONTHS_EN)}`
  );
  sub(
    /<strong>প্ৰকাশিত:<\/strong>\s*\d{1,2} [^\s<]+ \d{4}/g,
    `<strong>প্ৰকাশিত:</strong> ${fmt(pubIso, MONTHS_AS)}`
  );
  sub(
    /<strong>শেহতীয়া আপডেট:<\/strong>\s*\d{1,2} [^\s<]+ \d{4}/g,
    `<strong>শেহতীয়া আপডেট:</strong> ${fmt(modIso, MONTHS_AS)}`
  );
  return { html, n };
}

function main() {
  const { created, modified } = gitDates();
  const files = walk(ROOT, []);

  let pages = 0;
  let fields = 0;
  let noHistory = 0;
  const modByRoute = new Map();

  for (const full of files) {
    const rel = path.relative(ROOT, full).split(path.sep).join("/");
    const pubIso = created.get(rel);
    if (!pubIso) {
      noHistory++;
      continue;
    }
    const modIso = modified.get(rel) || pubIso;
    const route = routeOf(rel);
    modByRoute.set(route, modIso);

    const html = fs.readFileSync(full, "utf8");
    const res = replaceDates(html, pubIso, modIso);
    if (!res.n) continue;
    pages++;
    fields += res.n;
    if (!CHECK) fs.writeFileSync(full, res.html, "utf8");
  }

  /* ---------- sitemap ---------- */
  let sitemapChanged = 0;
  if (fs.existsSync(SITEMAP)) {
    const xml = fs.readFileSync(SITEMAP, "utf8");
    const out = xml.replace(
      /<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>[^<]*<\/lastmod>\s*<\/url>/g,
      (m, loc) => {
        const route = loc.startsWith(SITE) ? loc.slice(SITE.length) || "/" : null;
        const mod = route ? modByRoute.get(route) : null;
        if (!mod) return m;
        sitemapChanged++;
        return `<url>\n    <loc>${loc}</loc>\n    <lastmod>${mod}</lastmod>\n  </url>`;
      }
    );
    if (!CHECK && sitemapChanged) fs.writeFileSync(SITEMAP, out, "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}apply-real-dates`);
  console.log(`  HTML files scanned:     ${files.length}`);
  console.log(`  pages with no history:  ${noHistory}`);
  console.log(`  pages dated:            ${pages}`);
  console.log(`  date fields rewritten:  ${fields}`);
  console.log(`  sitemap lastmod set:    ${sitemapChanged}`);
}

main();
