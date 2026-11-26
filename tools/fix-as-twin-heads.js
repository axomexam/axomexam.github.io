#!/usr/bin/env node
"use strict";

/*
 * tools/fix-as-twin-heads.js
 *
 * Restores the crawler-facing head strings on every /as/ mock-set twin from
 * the wording its already-committed sibling carries.
 *
 * Why
 * ---
 * tools/build-as-twins.js clamps every Assamese head string at 58 characters
 * and appends a literal "…" (see clamp() in that file, and the gotcha note in
 * AGENTS.md). When a set page is added later, its twin is born with that
 * truncation and no sibling has been repaired yet. Re-running the builder
 * cannot fix it — it re-derives the same clamp — and it also rewrites the
 * body, which drags in unrelated drift.
 *
 * This tool copies the head wording of the first committed set twin of the
 * same exam (set-1, else set-2, …) and substitutes the set number. That is
 * exactly the repair the committed siblings already carry, so a repaired twin
 * is byte-identical to what a hand repair would produce. Only <title>,
 * og:title, twitter:title and the three description fields are touched; the
 * body is left byte-identical.
 *
 * Run it AFTER tools/build-as-twins.js. Usage:
 *   node tools/fix-as-twin-heads.js            # dry run, prints what it would do
 *   node tools/fix-as-twin-heads.js --apply    # writes the changes
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");

/* Head fields, in document order. Each pattern captures the current value in
   group 2 and the surrounding markup in groups 1 and 3, so a rewrite keeps the
   original bytes around the value. */
const FIELDS = [
  ["title", /(<title>)([^<]*)(<\/title>)/],
  ["og:title", /(property="og:title" content=")([^"]*)(")/],
  ["twitter:title", /(name="twitter:title" content=")([^"]*)(")/],
  ["description", /(name="description" content=")([^"]*)(")/],
  ["og:description", /(property="og:description" content=")([^"]*)(")/],
  ["twitter:description", /(name="twitter:description" content=")([^"]*)(")/],
];

const read = (p) => fs.readFileSync(p, "utf8");

/* Current value of a head field, or null when the field is absent. */
const field = (html, re) => {
  const m = re.exec(html);
  return m ? m[2] : null;
};

/* Replace a head field's value, leaving the rest of the tag byte-identical. */
const setField = (html, re, value) =>
  html.replace(re, (_whole, pre, _old, post) => pre + value + post);

/* The set number is the only token that changes between siblings. The titles
   spell it as a plain ASCII digit ("ছেট 6", "(Set 6)"), so a literal swap is
   enough and no other number in the head is affected. The suffix is only kept
   when it fits, which is why set-1 of a family can lack "(Set 1)". */
const withSet = (v, from, to) =>
  v
    .replace(`ছেট ${from}`, `ছেট ${to}`)
    .replace(`(Set ${from})`, `(Set ${to})`);

function examDirs() {
  const base = path.join(ROOT, "as", "exam-wise-mock-test");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .filter((e) => fs.statSync(path.join(base, e)).isDirectory())
    .map((e) => path.join(base, e));
}

function setNumbers(dir) {
  return fs
    .readdirSync(dir)
    .map((e) => (/^set-(\d+)$/.exec(e) || [])[1])
    .filter(Boolean)
    .map(Number)
    .sort((a, b) => a - b);
}

let changed = 0;
let scanned = 0;
for (const dir of examDirs()) {
  const sets = setNumbers(dir);
  if (sets.length === 0) continue;

  /* The template is the sibling whose head is already clean (no ellipsis), so
     a freshly built twin copies a repaired head rather than another clamped
     one. Prefer the highest set number: the suffix rules differ across a
     family (set-1 of a family can lack "(Set 1)"), and a high sibling has the
     same shape as the one being repaired. */
  let tmpl = null;
  let tmplSet = null;
  for (const n of [...sets].reverse()) {
    const html = read(path.join(dir, `set-${n}`, "index.html"));
    const title = field(html, FIELDS[0][1]);
    if (title !== null && !/…/.test(title)) {
      tmpl = html;
      tmplSet = n;
      break;
    }
  }
  if (tmpl === null) continue;

  for (const n of sets) {
    if (n === tmplSet) continue;
    const file = path.join(dir, `set-${n}`, "index.html");
    const html = read(file);
    /* Only repair a twin whose head still carries the builder's clamp; leave
       an already-repaired head alone so the tool is idempotent. */
    const currentTitle = field(html, FIELDS[0][1]);
    if (currentTitle === null || !/…/.test(currentTitle)) continue;
    scanned++;
    let out = html;
    for (const [, re] of FIELDS) {
      const v = field(tmpl, re);
      if (v === null) continue;
      out = setField(out, re, withSet(v, tmplSet, n));
    }
    if (out === html) continue;
    changed++;
    const rel = path.relative(ROOT, file);
    const title = field(out, FIELDS[0][1]);
    console.log(`  ${APPLY ? "fixed" : "would fix"} /${rel.replace(/\/index\.html$/, "")}/  ${title}`);
    if (APPLY) fs.writeFileSync(file, out, "utf8");
  }
}

console.log(`as-twin-heads: scanned ${scanned} | ${APPLY ? "fixed" : "would fix"} ${changed}`);
