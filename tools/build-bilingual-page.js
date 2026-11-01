#!/usr/bin/env node
"use strict";

/*
 * tools/build-bilingual-page.js
 *
 * Creates the Assamese twin of an English page under /as/, without moving or
 * renaming the English page. The English URL and its markup stay exactly as
 * they were, apart from three hreflang <link> tags that pair the two URLs.
 *
 * The language a page renders in is decided at runtime by js/app.js from the
 * URL alone (/as/... is Assamese, everything else is English), so no inline
 * boot script is needed here.
 *
 * Usage:
 *   node tools/build-bilingual-page.js <rel-path> "<as title>" "<as meta>" "<as h1>"
 *
 * Example:
 *   node tools/build-bilingual-page.js topic/gk/assam-history/foo \
 *     "ফু — ADRE, APSC প্ৰশ্নোত্তৰ" "বৰ্ণনা" "শিৰোনাম"
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SITE = "https://axomexam.in";

const REL = (process.argv[2] || "").replace(/^\/+|\/+$/g, "");
if (!REL) {
  console.error("usage: node tools/build-bilingual-page.js <rel-path> [as-title] [as-meta] [as-h1]");
  process.exit(1);
}

const asTitle = process.argv[3] || "";
const asMeta = process.argv[4] || "";
const asH1 = process.argv[5] || "";

const enAbs = path.join(ROOT, REL, "index.html");
const asRel = "as/" + REL;
const asAbs = path.join(ROOT, asRel, "index.html");
const enURL = SITE + "/" + REL + "/";
const asURL = SITE + "/" + asRel + "/";

if (!fs.existsSync(enAbs)) {
  console.error("missing English page: " + enAbs);
  process.exit(1);
}

const en = fs.readFileSync(enAbs, "utf8");
if (en.includes('hreflang="as"')) {
  console.error("already bilingual: " + REL);
  process.exit(1);
}

const hreflang = [
  `<link rel="alternate" hreflang="en" href="${enURL}" />`,
  `<link rel="alternate" hreflang="as" href="${asURL}" />`,
  `<link rel="alternate" hreflang="x-default" href="${enURL}" />`,
].join("\n  ");

/* English page: the only addition is the hreflang pairing. */
const enOut = en.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  ${hreflang}`);
fs.writeFileSync(enAbs, enOut);

/* Assamese page: same markup, Assamese head + canonical pointing at itself. */
let asOut = enOut
  .replace(/<html([^>]*)\blang="[^"]*"/, '<html$1lang="as"')
  .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${asURL}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${asURL}$2`);

if (asTitle) {
  asOut = asOut
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${asTitle}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${asTitle}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${asTitle}$2`);
}
if (asMeta) {
  asOut = asOut
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${asMeta}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${asMeta}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${asMeta}$2`);
}
if (asH1) {
  asOut = asOut.replace(/(<h1[^>]*>)[\s\S]*?(<\/h1>)/, `$1${asH1}$2`);
}

fs.mkdirSync(path.dirname(asAbs), { recursive: true });
fs.writeFileSync(asAbs, asOut);

console.log("built " + REL + " -> " + asRel);
