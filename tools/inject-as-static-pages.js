#!/usr/bin/env node
"use strict";

/*
 * tools/inject-as-static-pages.js
 *
 * Fill the Assamese body of the legal / editorial pages.
 *
 * The English page for these routes is written by tools/prerender.js from a
 * newer, longer draft than the Assamese text that lives in js/app.src.js, so
 * translating node-by-node leaves most of the page in English. The Assamese
 * text in renderStatic() is genuine, though, so the served /as/ page should
 * carry exactly that text instead of the English panel.
 *
 * This tool reads the `isAs ? \`...\`` branch of renderStatic() for each route
 * and writes it into the info-panel of the matching /as/ page, keeping the
 * page head (breadcrumb, h1, description) that tools/build-as-twins.js already
 * translated. Idempotent: it always rewrites from app.src.js, so it can be
 * re-run after the twins are rebuilt.
 *
 * Usage:
 *   node tools/inject-as-static-pages.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const AS_ROOT = path.join(ROOT, "as");

const KEYS = ["about", "privacy", "privacy-policy", "terms", "disclaimer", "editorial-policy", "editorial-team", "sources", "updates"];

/* ---- read the Assamese panels out of app.src.js ---- */

const APP = fs.readFileSync(path.join(ROOT, "js", "app.src.js"), "utf8");

function closeBacktick(text, open) {
  let j = open + 1;
  while (j < text.length) {
    if (text[j] === "\\") { j += 2; continue; }
    if (text[j] === "`") return j;
    j++;
  }
  return -1;
}

function assamesePanel(key) {
  const re = new RegExp(`key === "${key}"[\\s\\S]*?content = isAs \\? \``);
  const m = re.exec(APP);
  if (!m) return null;
  const open = m.index + m[0].length - 1;
  const close = closeBacktick(APP, open);
  if (close < 0) return null;
  return APP.slice(open + 1, close).trim();
}

/* ---- replace the body of the first content <section> of a page ---- */

/* Keep the section's existing wrapper (an <article>, a styled <div> or an
   .info-panel) so the page keeps its layout, and swap only its inner HTML. */
function replaceSectionInner(html, inner) {
  const mi = /<main\b[^>]*>[\s\S]*?(<section class="section"[^>]*>)([\s\S]*?)<\/section>/.exec(html);
  if (!mi) return null;
  const open = mi[1];
  const body = mi[2];
  const start = mi.index + mi[0].indexOf(open) + open.length;
  const end = start + body.length;

  const wrap = /^\s*<(article|div)\b[^>]*>/.exec(body);
  if (!wrap) return html.slice(0, start) + "\n" + inner + "\n      " + html.slice(end);

  const wOpen = wrap[0].length - /^\s*/.exec(wrap[0])[0].length;
  const wStart = start + wrap[0].length;
  let depth = 1;
  const tagRe = new RegExp(`</?${wrap[1]}\\b[^>]*>`, "g");
  tagRe.lastIndex = wStart;
  let t;
  while ((t = tagRe.exec(html))) {
    depth += t[0][1] === "/" ? -1 : 1;
    if (depth === 0) break;
  }
  if (depth !== 0) return null;
  return html.slice(0, wStart) + "\n" + inner + "\n" + " ".repeat(wOpen) + html.slice(t.index);
}

let changed = 0;
let scanned = 0;
for (const key of KEYS) {
  const file = path.join(AS_ROOT, key, "index.html");
  if (!fs.existsSync(file)) continue;
  scanned++;
  const inner = assamesePanel(key);
  if (!inner) continue;
  const html = fs.readFileSync(file, "utf8");
  const out = replaceSectionInner(html, inner);
  if (!out || out === html) continue;
  fs.writeFileSync(file, out);
  changed++;
}

console.log(`as-static-pages: scanned ${scanned} | changed ${changed}`);
