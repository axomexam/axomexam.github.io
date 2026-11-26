#!/usr/bin/env node
"use strict";

/*
 * tools/sync-as-renderer-pages.js
 *
 * The Submit and Download-App pages are drawn entirely by a runtime renderer
 * (renderSubmitPage / renderDownloadAppPage). The /as/ static twins therefore
 * kept the English body that tools/prerender.js wrote, which left those two
 * Assamese URLs as English duplicates. This tool runs the renderer with the
 * Assamese branch selected and writes the produced markup into the matching
 * /as/ page, so the raw HTML is Assamese as well.
 *
 * Idempotent: it always re-renders from js/app.src.js.
 *
 * Usage:
 *   node tools/sync-as-renderer-pages.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP = fs.readFileSync(path.join(ROOT, "js", "app.src.js"), "utf8");

/* Extract a top-level `function name(main) { ... }` by brace matching. */
function extractFunction(name) {
  const start = APP.indexOf(`function ${name}(main) {`);
  if (start < 0) throw new Error(`renderer not found: ${name}`);
  let depth = 0;
  let i = APP.indexOf("{", start);
  for (; i < APP.length; i++) {
    if (APP[i] === "{") depth++;
    else if (APP[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  return APP.slice(start, i + 1);
}

/* A stand-in for a DOM element: every method is a no-op. */
function fakeEl() {
  return {
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    dataset: {},
    textContent: "",
    value: "",
    innerHTML: "",
    placeholder: "",
    addEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    appendChild() {},
    remove() {},
    setAttribute() {},
    focus() {},
  };
}

function renderAssamese(name) {
  const src = extractFunction(name);
  const make = new Function(
    "state", "t", "tc", "localized", "escapeHtml", "$", "$$", "API",
    "markAppPromptDone", "observeReveals",
    `${src}\nreturn ${name};`
  );
  const main = fakeEl();
  const fn = make(
    { lang: "as" },
    () => "",
    () => "",
    (o) => (o && (o.as || o.en)) || "",
    (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    () => fakeEl(),
    () => [],
    { listDownloads: async () => [] },
    () => {},
    () => {}
  );
  fn(main);
  return main.innerHTML;
}

/* Swap the whole <main> body with the rendered markup. */
function replaceMainBody(html, inner) {
  const mainOpen = html.search(/<main\b[^>]*>/);
  if (mainOpen < 0) return null;
  const openEnd = html.indexOf(">", mainOpen) + 1;
  const mainClose = html.lastIndexOf("</main>");
  if (mainClose < openEnd) return null;
  return html.slice(0, openEnd) + "\n\n" + inner.trim() + "\n\n    " + html.slice(mainClose);
}

const TARGETS = [
  { fn: "renderDownloadAppPage", page: "as/download-app/index.html" },
  { fn: "renderSubmitPage", page: "as/submit/index.html" },
];

let changed = 0;
for (const { fn, page } of TARGETS) {
  const file = path.join(ROOT, page);
  if (!fs.existsSync(file)) continue;
  const inner = renderAssamese(fn);
  const html = fs.readFileSync(file, "utf8");
  const out = replaceMainBody(html, inner);
  if (!out || out === html) continue;
  fs.writeFileSync(file, out);
  changed++;
}

console.log(`sync-as-renderer-pages: changed ${changed}`);
