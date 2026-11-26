#!/usr/bin/env node
/* ============================================================
   axomexam — tools/add-lang-switch-links.js

   Adds a real <a href> language switch to every page that has a twin in
   the other language.

   Why: the runtime toggle in js/app.js is a pair of <button> elements that
   only swap UI strings — it never navigates to /as/. As a result no page on
   the site linked to a single one of the 1,492 Assamese pages; they were
   reachable only through hreflang tags, which Google treats as a weak
   discovery signal. Nothing was even linked for users to click.

   The switch is emitted as static HTML so crawlers see the link without
   running JS. The outer div reuses .desktop-lang-toggle, which makes the
   runtime skip injecting its button-only toggle (it bails when that class
   is already present), so there is exactly one language control per page.
   Inner elements use .lang-link, NOT .glang-btn: app.js binds a
   preventDefault handler to every .glang-btn and would swallow the click.

   Idempotent: pages already carrying data-lang-switch are left alone.

   Usage: node tools/add-lang-switch-links.js [--check]
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", "_preview", "android",
  "js", "css", "data", "tools", "assets", "images", "scripts", ".github",
]);
const ANCHOR = '<button class="theme-toggle" type="button"';
const MARK = 'data-lang-switch="1"';

function enBlock(asHref) {
  return `<div class="desktop-lang-toggle" ${MARK}><span class="lang-link is-active" lang="en">EN</span><a class="lang-link" href="${asHref}" hreflang="as" lang="as" title="\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be\u09a4 \u09aa\u09a2\u09bc\u0995">\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be</a></div>`;
}

function asBlock(enHref) {
  return `<div class="desktop-lang-toggle" ${MARK}><a class="lang-link" href="${enHref}" hreflang="en" lang="en" title="Read in English">EN</a><span class="lang-link is-active" lang="as">\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be</span></div>`;
}

/* "exams/x/y/index.html" -> "exams/x/y" ; "index.html" -> "" */
function relOf(fileRelPosix) {
  return fileRelPosix.replace(/(^|\/)index\.html$/, "");
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.name === "index.html") {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function insertBeforeAnchor(html, block) {
  const at = html.indexOf(ANCHOR);
  if (at === -1) return null;
  const lineStart = html.lastIndexOf("\n", at) + 1;
  const indent = (/^[ \t]*/.exec(html.slice(lineStart)) || [""])[0];
  return html.slice(0, lineStart) + indent + block + "\n" + html.slice(lineStart);
}

const files = walk(ROOT);
let added = 0, already = 0, noTwin = 0, noAnchor = 0;
const touched = [];

for (const abs of files) {
  const relFile = path.relative(ROOT, abs).split(path.sep).join("/");
  const isAs = relFile.startsWith("as/");
  const rel = relOf(isAs ? relFile.slice(3) : relFile);

  const twinFile = isAs
    ? path.join(ROOT, rel ? rel + "/index.html" : "index.html")
    : path.join(ROOT, "as", rel ? rel + "/index.html" : "index.html");

  if (!fs.existsSync(twinFile)) { noTwin++; continue; }

  let html = fs.readFileSync(abs, "utf8");
  if (html.includes(MARK)) { already++; continue; }

  const block = isAs ? asBlock(`/${rel}${rel ? "/" : ""}`) : enBlock(`/as/${rel}${rel ? "/" : ""}`);
  const next = insertBeforeAnchor(html, block);
  if (next === null) { noAnchor++; continue; }

  if (!CHECK) fs.writeFileSync(abs, next, "utf8");
  added++;
  touched.push(relFile);
}

console.log(`${CHECK ? "[check] " : ""}pages scanned      : ${files.length}`);
console.log(`switch added       : ${added}`);
console.log(`already present    : ${already}`);
console.log(`no twin, skipped   : ${noTwin}`);
console.log(`no header anchor   : ${noAnchor}`);
if (CHECK && touched.length) {
  console.log("would change:");
  for (const t of touched.slice(0, 10)) console.log(`  ${t}`);
  if (touched.length > 10) console.log(`  ... and ${touched.length - 10} more`);
}
