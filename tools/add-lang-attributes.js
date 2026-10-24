#!/usr/bin/env node
"use strict";

/*
 * tools/add-lang-attributes.js
 *
 * Tags the bilingual content blocks with the standard HTML lang attribute.
 *
 * The site ships both languages in the same document and toggles them with
 * the custom data-axo-lang attribute (see css/style.css:
 * [data-axo-lang=as]{display:none} and the body[data-ui-lang] rules).
 * Google reads data-* attributes as opaque, so an Assamese paragraph was
 * indistinguishable from English text. The lang attribute is the signal the
 * crawler actually understands.
 *
 * This script adds lang="as" to every element that already carries
 * data-axo-lang="as", and lang="en" to the ones carrying data-axo-lang="en".
 * The data-axo-lang attribute is preserved, so the language toggle and all
 * styling keep working exactly as before.
 *
 * Idempotent: an element that already has a matching lang attribute is left
 * alone.
 *
 * Usage:
 *   node tools/add-lang-attributes.js          # apply
 *   node tools/add-lang-attributes.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview"]);

/* Matches an opening tag that carries data-axo-lang="as" or "en".
   Attribute values here never contain ">", so [^>]* is safe. */
const TAG_RE = /<([a-z][a-z0-9-]*)((?:\s+[^>]*?)?\s+data-axo-lang="(as|en)"(?:\s+[^>]*?)?)>/g;

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

function annotate(html) {
  let added = 0;
  const out = html.replace(TAG_RE, (match, tag, attrs, lang) => {
    if (new RegExp(`(?<![\\w-])lang="${lang}"`).test(match)) return match;
    added++;
    return `<${tag} lang="${lang}"${attrs}>`;
  });
  return { html: out, added };
}

function main() {
  const files = walk(ROOT, []);
  let scanned = 0;
  let pages = 0;
  let total = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    scanned++;
    const res = annotate(html);
    if (!res.added) continue;
    pages++;
    total += res.added;
    if (!CHECK) fs.writeFileSync(file, res.html, "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}lang attributes`);
  console.log(`  HTML scanned:       ${scanned}`);
  console.log(`  pages annotated:    ${pages}`);
  console.log(`  lang attrs added:   ${total}`);
}

main();
