#!/usr/bin/env node
"use strict";

/*
 * Reserve space for Google Auto Ads so ads never push content down (CLS).
 *
 * The site loads AdSense Auto Ads, which inject ad containers after the page
 * has already painted. Without a reserved slot the container starts at zero
 * height and then grows to the served creative, moving everything below it.
 * Google's guidance (developers.google.com/publisher-tag/guides/minimize-layout-shift)
 * is to reserve space up front with CSS min-height on the ad container.
 *
 * This script injects a tiny render-blocking <style id="axo-ad-reserve"> block
 * into the <head> of every page, right before the AdSense script. Because the
 * rule is parsed before any ad is inserted, the slot is reserved from the very
 * first layout, so the ad loads into an existing box instead of creating one.
 *
 * Anchor and vignette ads are position:fixed and must not be reserved, so they
 * are excluded via .adsbygoogle-noablate / [data-anchor-status].
 *
 * It is idempotent (the marker style is detected and skipped), so it is safe to
 * run again after regenerating pages. Run it before scripts/stamp-assets.js.
 *
 * Usage, run from the repository root:
 *   node scripts/reserve-ad-space.js
 */

const fs = require("fs");
const path = require("path");

const SKIP_DIRS = new Set([".git", "node_modules", ".github", ".monkeycode-tmp-files"]);

const STYLE_ID = "axo-ad-reserve";
const ADSENSE_SCRIPT = /[ \t]*<script[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^>]*><\/script>/;

/*
 * Reserve the tallest common in-page Auto Ad size at each breakpoint
 * (300x250 / 336x280). The mobile slot is a little taller because mobile
 * creatives are mostly square-ish; desktop also serves wide banners.
 */
const SNIPPET = `  <!-- Reserve space for Google Auto Ads (prevents layout shift / CLS) -->
  <style id="${STYLE_ID}">
    ins.adsbygoogle:not(.adsbygoogle-noablate):not([data-anchor-status]),
    .google-auto-placed { min-height: 280px; }
    @media (min-width: 768px) {
      ins.adsbygoogle:not(.adsbygoogle-noablate):not([data-anchor-status]),
      .google-auto-placed { min-height: 250px; }
    }
  </style>

`;

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

function inject(html) {
  if (html.includes(`id="${STYLE_ID}"`)) {
    return { html, result: "already" };
  }
  const match = html.match(ADSENSE_SCRIPT);
  if (!match) {
    return { html, result: "noads" };
  }

  const out = html.replace(ADSENSE_SCRIPT, `${SNIPPET}${match[0]}`);
  return { html: out, result: "injected" };
}

function main() {
  const root = process.argv[2] && !process.argv[2].startsWith("--")
    ? path.resolve(process.argv[2])
    : process.cwd();
  const files = walk(root, []);

  let injected = 0;
  let already = 0;
  const skipped = [];

  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");
    const { html, result } = inject(before);
    if (result === "injected") {
      fs.writeFileSync(file, html, "utf8");
      injected++;
    } else if (result === "already") {
      already++;
    } else {
      skipped.push(path.relative(root, file));
    }
  }

  console.log(`Injected: ${injected}`);
  console.log(`Already present: ${already}`);
  if (skipped.length) console.log(`Skipped (no AdSense): ${skipped.length}`);
  console.log(`Total pages: ${files.length}`);
}

main();
