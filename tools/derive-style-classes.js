#!/usr/bin/env node
"use strict";

/*
 * tools/derive-style-classes.js
 *
 * The question blocks, article bodies and section wrappers carry their spacing
 * as inline style attributes. The same handful of strings is repeated millions
 * of times (2.6 million attributes, ~57 MB of the tree), and every one of them
 * is an attribute the browser has to parse and keep in the DOM.
 *
 * This writes those repeated declarations into css/style.src.css as .qsN
 * classes, with the declarations copied byte for byte, so the rendering does
 * not change. tools/move-inline-styles.js then reads this block back and swaps
 * the attributes for the class names, which keeps the CSS as the single source
 * of truth for what gets converted.
 *
 * Patterns are picked by frequency, so the list follows the content: run it,
 * then rebuild the stylesheet, then run the mover.
 *
 *   node tools/derive-style-classes.js          # rewrite the block
 *   node tools/derive-style-classes.js --dry    # report only
 */

const fs = require("fs");
const path = require("path");

/* --root points the scan at another copy of the tree. It exists because the
   classes have to be derived from the markup as it was written, not from the
   markup this tool has already cleaned; running it over a checkout of the
   previous commit is how the mapping is rebuilt if it is ever lost. */
const ROOT_ARG = process.argv.find((a) => a.startsWith("--root="));
const ROOT = ROOT_ARG ? path.resolve(ROOT_ARG.split("=")[1]) : path.resolve(__dirname, "..");
const CSS = path.resolve(__dirname, "..", "css/style.src.css");
const DRY = process.argv.includes("--dry");

const MIN_COUNT = 500;
const MIN_LENGTH = 12;
const MAX_LENGTH = 120;

const SKIP_DIRS = new Set([".git", "node_modules", "tools", "scripts", "data", "js", "css", "images", "app", "dist"]);

/* Declarations that another rule reaches for through a [style*=…] selector, or
   that come from CSS custom properties: leaving them inline is what keeps the
   existing selectors working. */
const SKIP_TEXT = /overflow|var\(|url\(|content:/;

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

const files = [];
walk(ROOT, files);

const counts = new Map();
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/style="([^"]*)"/g)) {
    const v = m[1];
    if (v.length < MIN_LENGTH || v.length > MAX_LENGTH || SKIP_TEXT.test(v)) continue;
    counts.set(v, (counts.get(v) || 0) + 1);
  }
}

const chosen = [...counts.entries()]
  .filter(([, n]) => n >= MIN_COUNT)
  .sort((a, b) => b[1] - a[1]);

/* Two style strings can differ only in declaration order ("color:x; font-size:y"
   versus "font-size:y; color:x"). They render identically, so they share a
   class and the CSS keeps the first spelling it saw. */
const byNormalised = new Map();
for (const [style, n] of chosen) {
  const key = normalise(style);
  if (byNormalised.has(key)) {
    const seen = byNormalised.get(key);
    seen.count += n;
    continue;
  }
  byNormalised.set(key, { style, count: n });
}

const classes = [...byNormalised.values()].sort((a, b) => b.count - a.count);
classes.forEach((c, i) => { c.name = `qs${i + 1}`; });

const START = "/* >>> repeated inline declarations (tools/derive-style-classes.js) */";
const END = "/* <<< repeated inline declarations */";

/* !important, because the inline attribute these replace outranked every rule
   in this file. Without it a component selector with one more compound
   (".info-panel ul") would start winning and the spacing would shift. */
const body = classes
  .map((c) => {
    const decls = c.style.split(";").map((d) => d.trim()).filter(Boolean)
      .map((d) => (d.includes("!important") ? d : `${d} !important`));
    return `.${c.name} { ${decls.join("; ")}; }`;
  })
  .join("\n");

const block = `${START}
/* These declarations were inline on the page and are copied here unchanged, so
   swapping the attribute for the class renders exactly the same. They are
   marked !important because the inline attribute outranked every rule below,
   and kept last so that order breaks any remaining tie the same way. */
${body}
${END}`;

/* A class name must never change once a page references it, so anything already
   in the block is kept as it is and only unseen patterns are appended. */
const existing = new Map();
let nextIndex = 1;
{
  const current = fs.readFileSync(CSS, "utf8");
  const blockStart = current.indexOf(START), blockEnd = current.indexOf(END);
  if (blockStart >= 0 && blockEnd > blockStart) {
    for (const m of current.slice(blockStart, blockEnd).matchAll(/\.(qs\d+)\s*\{([^}]*)\}/g)) {
      const n = parseInt(m[1].slice(2), 10);
      nextIndex = Math.max(nextIndex, n + 1);
      const decl = m[2].replace(/!important/g, "").trim().replace(/;$/, "");
      existing.set(normalise(decl), { name: m[1], style: decl });
    }
  }
}
for (const c of classes) {
  const already = existing.get(normalise(c.style));
  if (already) { c.name = already.name; continue; }
  c.name = `qs${nextIndex++}`;
  existing.set(normalise(c.style), { name: c.name, style: c.style });
}
/* Existing classes are part of the output: a page already points at them, so
   they must survive a run that finds nothing new to add. */
classes.length = 0;
for (const entry of existing.values()) {
  classes.push({ name: entry.name, style: entry.style, count: 0 });
}
classes.sort((a, b) => parseInt(a.name.slice(2), 10) - parseInt(b.name.slice(2), 10));

let css = fs.readFileSync(CSS, "utf8");
const had = css.includes(START);
css = had
  ? css.slice(0, css.indexOf(START)) + block + css.slice(css.indexOf(END) + END.length)
  : `${css.trimEnd()}\n\n${block}\n`;

const fresh = classes.filter((c) => c.count > 0);
const covered = fresh.reduce((a, c) => a + c.count, 0);
const savedBytes = fresh.reduce((a, c) => a + (c.style.length - c.name.length) * c.count, 0);

if (!DRY) fs.writeFileSync(CSS, css);
console.log(`${DRY ? "[dry-run] " : ""}classes: ${classes.length} (${fresh.length} new) | occurrences covered: ${covered.toLocaleString("en-US")} | attribute bytes saved: ${(savedBytes / 1e6).toFixed(1)} MB`);
console.log(`${DRY ? "would write" : "wrote"} ${had ? "updated" : "new"} block in css/style.src.css`);
