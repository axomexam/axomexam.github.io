#!/usr/bin/env node
"use strict";

/*
 * tools/move-inline-styles.js
 *
 * Swaps repeated inline style attributes for the .qsN classes that
 * tools/derive-style-classes.js wrote into css/style.src.css. The declarations
 * are copied unchanged into those classes, so the page renders exactly the
 * same; what changes is that the browser parses one short class instead of a
 * dozen declarations, millions of times over.
 *
 * Only exact matches are converted, so a style that differs by a single
 * character stays inline. Anything the stylesheet reaches for through a
 * [style*=…] selector, and every <pre> block (whose text is its content), is
 * left alone.
 *
 * Idempotent: a converted element no longer carries the attribute, so a second
 * run reports nothing to do.
 *
 * Usage:
 *   node tools/move-inline-styles.js           # apply
 *   node tools/move-inline-styles.js --dry     # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CSS = path.join(ROOT, "css/style.src.css");
const DRY = process.argv.includes("--dry");
const SKIP_DIRS = new Set([".git", "node_modules", "tools", "scripts", "data", "js", "css", "images", "app", "dist", "_vscheck"]);

function normalise(style) {
  return style
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const i = d.indexOf(":");
      if (i < 0) return d.replace(/\s+/g, "");
      return `${d.slice(0, i).trim().toLowerCase()}:${d.slice(i + 1).trim()}`;
    })
    .sort()
    .join(";");
}

/* ---------- read the class map out of the stylesheet ---------- */

const css = fs.readFileSync(CSS, "utf8");
const map = new Map();
for (const m of css.matchAll(/\.(qs\d+)\s*\{([^}]*)\}/g)) {
  const decl = m[2].trim().replace(/;$/, "");
  if (/overflow|var\(|url\(/.test(decl)) continue;
  map.set(normalise(decl), m[1]);
}
if (!map.size) {
  console.error("no .qsN classes in css/style.src.css — run tools/derive-style-classes.js first");
  process.exit(1);
}

/* ---------- convert one file ---------- */

/* <script>, <style> and <pre> keep their text: the first two because the
   markup inside them is code, the last because its text is what the reader
   sees. A regex with a lazy quantifier over a one-megabyte single-line page
   backtracks badly, so the ranges are found with indexOf instead. */
function protectedRanges(html) {
  const lower = html.toLowerCase();
  const ranges = [];
  for (const tag of ["script", "style", "pre"]) {
    let from = 0;
    for (;;) {
      const open = lower.indexOf(`<${tag}`, from);
      if (open < 0) break;
      const close = lower.indexOf(`</${tag}`, open);
      const end = close < 0 ? html.length : close + tag.length + 3;
      ranges.push([open, end]);
      from = end;
    }
  }
  return ranges.sort((a, b) => a[0] - b[0]);
}

const inRange = (i, ranges) => {
  let lo = 0, hi = ranges.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const [a, b] = ranges[mid];
    if (i < a) hi = mid - 1;
    else if (i >= b) lo = mid + 1;
    else return true;
  }
  return false;
};

function convertFile(html) {
  const ranges = protectedRanges(html);
  const edits = [];

  let from = 0;
  for (;;) {
    const at = html.indexOf('style="', from);
    if (at < 0) break;
    from = at + 7;
    if (inRange(at, ranges)) continue;

    const gt = html.indexOf(">", at);
    if (gt < 0) break;
    const lt = html.lastIndexOf("<", at);
    if (lt < 0 || html.slice(lt, at).includes(">")) continue;

    const value = html.slice(at + 7, html.indexOf('"', at + 7));
    const cls = map.get(normalise(value));
    if (!cls) continue;

    const tag = html.slice(lt, gt + 1);
    const name = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(tag);
    if (!name || name[1].toLowerCase() === "pre") continue;

    let next = tag.replace(/\sstyle="[^"]*"/, "");
    const classMatch = /\sclass="([^"]*)"/.exec(next);
    if (classMatch) {
      const list = classMatch[1].trim().split(/\s+/);
      if (list.includes(cls)) continue;
      list.push(cls);
      next = next.replace(/\sclass="[^"]*"/, ` class="${list.join(" ")}"`);
    } else {
      next = next.replace(name[0], `${name[0]} class="${cls}"`);
    }
    edits.push([lt, gt + 1, next]);
  }

  if (!edits.length) return { html, count: 0 };
  const parts = [];
  let cursor = 0;
  for (const [a, b, text] of edits) {
    parts.push(html.slice(cursor, a), text);
    cursor = b;
  }
  parts.push(html.slice(cursor));
  return { html: parts.join(""), count: edits.length };
}

/* ---------- walk ---------- */

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.name.endsWith(".html")) {
      out.push(path.join(dir, e.name));
    }
  }
}

/* An optional path argument limits the run to one file or directory, which is
   how a change is tried on a single page before it goes site-wide. */
const only = process.argv.slice(2).find((a) => !a.startsWith("--"));
const files = [];
if (only) {
  const abs = path.resolve(ROOT, only);
  if (fs.statSync(abs).isDirectory()) walk(abs, files);
  else files.push(abs);
} else {
  walk(ROOT, files);
}

let changedFiles = 0, attrs = 0, bytesBefore = 0, bytesAfter = 0;
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const { html: out, count } = convertFile(html);
  if (!count) continue;
  changedFiles++;
  attrs += count;
  bytesBefore += html.length;
  bytesAfter += out.length;
  if (!DRY) fs.writeFileSync(file, out);
}

console.log(
  `${DRY ? "[dry-run] " : ""}files: ${changedFiles} | attributes converted: ${attrs.toLocaleString("en-US")} | ` +
  `HTML ${((bytesBefore - bytesAfter) / 1e6).toFixed(1)} MB smaller`
);
if (!DRY && attrs) console.log("next: node scripts/minify-assets.js && node scripts/stamp-assets.js");
