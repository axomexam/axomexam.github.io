#!/usr/bin/env node
"use strict";

/*
 * Reserve layout space so nothing moves after first paint (CLS).
 *
 * Two things on these static pages settle late:
 *
 *  1. Google Auto Ads inject their container after the page has painted. With
 *     no reserved slot the container grows from 0 to the served creative and
 *     pushes everything below it. Google's guidance is to reserve the slot
 *     with CSS up front
 *     (developers.google.com/publisher-tag/guides/minimize-layout-shift).
 *     Anchor/vignette ads are fixed, so they are excluded.
 *
 *  2. The desktop nav (#nav-list) is built by js/app.js from category data and
 *     is empty at first paint. It holds ~9 items once filled, which grows the
 *     header from ~78px to either 162px (two wrapped rows, 901-1100px) or
 *     119px (one row, >1100px). Reserving that height in CSS stops the header
 *     from pushing <main> down.
 *
 * This script injects one small render-blocking <style> block into the <head>
 * of every page, right before the AdSense script when present. Because the
 * rules are parsed before any ad is inserted or the nav is built, the space is
 * reserved from the first layout.
 *
 * The script is idempotent and also migrates pages that still carry the older
 * ad-only block, so it is safe to run again after regenerating pages. Run it
 * before scripts/stamp-assets.js.
 *
 * Usage, run from the repository root:
 *   node scripts/reserve-ad-space.js
 */

const fs = require("fs");
const path = require("path");

const SKIP_DIRS = new Set([".git", "node_modules", ".github", ".monkeycode-tmp-files"]);

const STYLE_ID = "axo-layout-reserve";
const ADSENSE_SCRIPT = /[ \t]*<script[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^>]*><\/script>/;

/* The block we want, and the older ad-only block we replace on migration. */
const NEW_BLOCK = /\n?[ \t]*<!-- Reserve space for Google Auto Ads and the JS-built desktop nav[^\n]*-->\n?[ \t]*<style id="axo-layout-reserve">[\s\S]*?<\/style>[ \t]*\n?/g;
const OLD_BLOCK = /\n?[ \t]*<!--[^\n]*Reserve space for Google Auto Ads[^\n]*-->\n?[ \t]*<style id="axo-ad-reserve">[\s\S]*?<\/style>[ \t]*\n?/g;

/*
 * Ad slots reserve the tallest common in-page Auto Ad size at each breakpoint
 * (300x250 / 336x280). The mobile slot is a little taller because mobile
 * creatives are mostly square-ish; desktop also serves wide banners.
 * Nav heights are the measured final heights at each desktop range.
 */
const SNIPPET = [
  '  <!-- Reserve space for Google Auto Ads and the JS-built desktop nav (prevents layout shift / CLS) -->',
  `  <style id="${STYLE_ID}">`,
  '    ins.adsbygoogle:not(.adsbygoogle-noablate):not([data-anchor-status]),',
  '    .google-auto-placed { min-height: 280px; }',
  '    @media (min-width: 768px) {',
  '      ins.adsbygoogle:not(.adsbygoogle-noablate):not([data-anchor-status]),',
  '      .google-auto-placed { min-height: 250px; }',
  '    }',
  '    @media (min-width: 901px) and (max-width: 1100px) { .main-nav { min-height: 97px; } }',
  '    @media (min-width: 1101px) { .main-nav { min-height: 54px; } }',
  '  </style>',
  '',
  '',
].join("\n");

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

function update(html) {
  const stripped = html.replace(NEW_BLOCK, "").replace(OLD_BLOCK, "");
  const hadBlock = stripped !== html;

  let out;
  if (ADSENSE_SCRIPT.test(stripped)) {
    out = stripped.replace(ADSENSE_SCRIPT, (m) => `${SNIPPET}${m}`);
  } else if (stripped.includes("</head>")) {
    out = stripped.replace("</head>", `${SNIPPET}</head>`);
  } else {
    return { html, result: "nohead" };
  }
  return { html: out, result: hadBlock ? "updated" : "injected" };
}

function main() {
  const root = process.argv[2] && !process.argv[2].startsWith("--")
    ? path.resolve(process.argv[2])
    : process.cwd();
  const files = walk(root, []);

  const counts = { injected: 0, updated: 0, nohead: 0 };
  const skipped = [];

  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");
    const { html, result } = update(before);
    if (result === "nohead") {
      counts.nohead++;
      skipped.push(path.relative(root, file));
      continue;
    }
    counts[result]++;
    if (html !== before) fs.writeFileSync(file, html, "utf8");
  }

  console.log(`Injected: ${counts.injected}`);
  console.log(`Updated: ${counts.updated}`);
  console.log(`Skipped (no <head>): ${counts.nohead}${skipped.length ? " " + skipped.join(", ") : ""}`);
  console.log(`Total pages: ${files.length}`);
}

main();
