#!/usr/bin/env node
"use strict";

/*
 * tools/seo-port-twin-prose.js
 *
 * Three English mock-test hub pages lost the study prose their Assamese twins
 * still carry (mock-test/english/grammar, mock-test/english/vocabulary,
 * mock-test/computer/ms-office). They sat at 96-110 words in <main>, which
 * seo-audit.js counts as thin. The prose already exists — in English, with
 * Assamese glosses — inside the /as/ twin's axo-main-content block, so this
 * tool copies that block across instead of authoring new copy.
 *
 * Only the FAQ heading is translated to English, because on the English page
 * the heading must be English. Everything else is copied verbatim.
 *
 * Idempotent: a page that already has data-axo-main-content is skipped.
 *
 * Usage: node tools/seo-port-twin-prose.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const PAIRS = [
  "mock-test/english/grammar",
  "mock-test/english/vocabulary",
  "mock-test/computer/ms-office",
];

const BLOCK_RE = /<section class="section axo-main-content"[\s\S]*?<\/section>/i;

let changed = 0;
for (const rel of PAIRS) {
  const enFile = path.join(ROOT, rel, "index.html");
  const asFile = path.join(ROOT, "as", rel, "index.html");
  if (!fs.existsSync(enFile) || !fs.existsSync(asFile)) {
    console.log(`skip ${rel} (missing page)`);
    continue;
  }
  let en = fs.readFileSync(enFile, "utf8");
  if (en.includes("data-axo-main-content")) { continue; }
  const asHtml = fs.readFileSync(asFile, "utf8");
  const m = BLOCK_RE.exec(asHtml);
  if (!m) { console.log(`skip ${rel} (twin has no prose block)`); continue; }

  let block = m[0].replace(
    /<h2([^>]*)>সঘনাই সোধা প্ৰশ্ন<\/h2>/g,
    "<h2$1>Frequently asked questions</h2>",
  );

  const mainEnd = en.lastIndexOf("</main>");
  if (mainEnd < 0) { console.log(`skip ${rel} (no </main>)`); continue; }
  en = en.slice(0, mainEnd) + "\n" + block + "\n  " + en.slice(mainEnd);
  changed++;
  if (!DRY) fs.writeFileSync(enFile, en);
  console.log(`ported prose -> /${rel}/`);
}

console.log(`pages enriched: ${changed}`);
