#!/usr/bin/env node
"use strict";

/*
 * tools/inject-as-extra-from-deep.js
 *
 * Appends the Assamese half of a page's deep article to its
 * <section class="section axo-extra-content"> block.
 *
 * Why this exists
 * ---------------
 * A topic page's extra section is written by whatever generator owns the page
 * (tools/build-orphan-topic-pages.js, tools/build-adre-grade-3.js, ...). Most
 * of those generators emit an English-only info-panel and rely on a later pass
 * to add the Assamese sibling. When a new page is generated after that pass
 * ran, the page keeps only the English panel, so its /as/ twin serves English
 * prose under an Assamese URL.
 *
 * The Assamese article itself already lives in data/deep-articles/<rel>.json
 * (the "as" key). This tool copies it back into the served HTML, so the page
 * and its twin show Assamese content and the English/Assamese pair matches the
 * convention the rest of the site uses.
 *
 * Idempotent: a section that already carries data-axo-lang="as" is skipped.
 *
 * Usage:
 *   node tools/inject-as-extra-from-deep.js          # apply
 *   node tools/inject-as-extra-from-deep.js --check  # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const DEEP = path.join(ROOT, "data", "deep-articles");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview", "as"]);

const SECTION_RE =
  /<section class="section axo-extra-content"[^>]*data-axo-path="([^"]+)"[^>]*>([\s\S]*?)<\/section>/;
const EN_PANEL_RE = /<article\b[^>]*data-axo-lang="en"[^>]*>[\s\S]*?<\/article>/;

/* Byte-for-byte the tag the existing pages use, so a re-injected panel is
   indistinguishable from one written at build time. */
const AS_OPEN =
  '<article lang="as" data-axo-lang="as" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">';

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

function deepFor(route) {
  const rel = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return (
    readJSON(path.join(DEEP, rel + ".json")) ||
    readJSON(path.join(DEEP, "topic", rel + ".json"))
  );
}

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name === "index.html") {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function main() {
  const files = walk(ROOT, []);
  let scanned = 0, written = 0, already = 0, noDeep = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const sec = SECTION_RE.exec(html);
    if (!sec) continue;
    scanned++;

    const [full, route, body] = sec;
    if (/data-axo-lang="as"/.test(body)) {
      already++;
      continue;
    }

    const deep = deepFor(route);
    if (!deep || !deep.as || !String(deep.as).trim()) {
      noDeep++;
      continue;
    }

    const enPanel = EN_PANEL_RE.exec(body);
    if (!enPanel) {
      noDeep++;
      continue;
    }

    /* Insert the Assamese panel right after the English one, matching the
       `\n      ` separator the bilingual pages already use. The stored "as"
       string already begins with a newline, so it follows the open tag
       directly — the same shape extract-deep-articles.js round-trips. */
    const withAs =
      body.slice(0, enPanel.index + enPanel[0].length) +
      "\n      " + AS_OPEN + deep.as + "</article>" +
      body.slice(enPanel.index + enPanel[0].length);

    const out = html.slice(0, sec.index) + full.replace(body, withAs) + html.slice(sec.index + full.length);
    if (!CHECK) fs.writeFileSync(file, out, "utf8");
    written++;
  }

  console.log(`inject-as-extra-from-deep${CHECK ? " (check)" : ""}`);
  console.log(`  sections scanned : ${scanned}`);
  console.log(`  panels written   : ${written}`);
  console.log(`  already bilingual: ${already}`);
  console.log(`  no Assamese deep : ${noDeep}`);
  if (CHECK && written) process.exitCode = 1;
}

main();
