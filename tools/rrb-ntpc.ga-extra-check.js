#!/usr/bin/env node
"use strict";

/* Reports the rendered word count of every GA article (English and Assamese)
   so the 1300-word floor can be checked before the pages are written.
   Usage: node tools/rrb-ntpc.ga-extra-check.js */

const fs = require("fs");
const path = require("path");
const { EXAM } = require("./rrb-ntpc.structure.js");

const base = path.join(__dirname, "rrb-ntpc-ga-articles");
/* Sections whose leaves carry article panels: General Awareness and Reasoning
   are grouped (key "<group>/<leaf>"), Mathematics is flat (key
   "<section>/<leaf>"). */
const SECTION_IDS = ["general-awareness", "mathematics", "reasoning"];

function words(s) {
  return String(s).replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").split(/\s+/).filter(Boolean).length;
}

/* A leaf only needs an article once its bank stops being a thin stub (>5
   questions), the same threshold tools/seo-indexing-fix.js uses for noindex.
   This keeps the gate honest for sections still being filled in: a leaf that
   is still a one-question placeholder is not yet a gate failure. */
const STUB_MAX_QUESTIONS = 5;
function bankCount(sectionId, parts) {
  const dir = path.join(__dirname, "..", "data", "exams", "rrb-ntpc", sectionId, ...parts);
  let n = 0;
  let names = [];
  try { names = fs.readdirSync(dir).filter((f) => /^question-\d+\.json$/.test(f)); } catch (e) { return 0; }
  for (const name of names) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
      n += Array.isArray(data) ? data.length : 1;
    } catch (e) {}
  }
  return n;
}

let fail = 0, missing = 0, pending = 0;
const leaves = [];
for (const sectionId of SECTION_IDS) {
  const sec = EXAM.sections.find((s) => s.id === sectionId);
  if (!sec) continue;
  for (const g of sec.subcategories) {
    const children = Array.isArray(g.subcategories) ? g.subcategories : [];
    /* Grouped section: leaf is <group>/<leaf>, article at <group>/<leaf>.js.
       Flat section: leaf is <section>/<leaf>, article at <section>/<leaf>.js. */
    const entries = children.length
      ? children.map((l) => ({ key: `${g.id}/${l.id}`, bank: [g.id, l.id], file: path.join(base, g.id, l.id + ".js") }))
      : [{ key: `${sectionId}/${g.id}`, bank: [g.id], file: path.join(base, sectionId, g.id + ".js") }];
    for (const e of entries) {
      if (bankCount(sectionId, e.bank) <= STUB_MAX_QUESTIONS) { pending++; continue; }
      leaves.push(e);
    }
  }
}
for (const leaf of leaves) {
  const f = leaf.file;
  if (!fs.existsSync(f)) { console.log(`  MISSING  ${leaf.key}`); missing++; continue; }
  delete require.cache[require.resolve(f)];
  const a = require(f);
  const count = (lang) =>
    words(a.h2[lang]) +
    a.p[lang].reduce((n, t) => n + words(t), 0) +
    a.list[lang].reduce((n, t) => n + words(t), 0) +
    a.faqs.reduce((n, x) => n + words(x.q[lang]) + words(x.a[lang]), 0);
  const en = count("en"), as = count("as");
  const ok = en >= 1300 && as >= 1300;
  if (!ok) fail++;
  console.log(`  ${ok ? "OK  " : "LOW "} ${leaf.key}  en=${en} as=${as} faqs=${a.faqs.length}`);
}
console.log(`\narticles failing the 1300-word floor (either language): ${fail}; missing: ${missing}`);
if (pending) console.log(`leaves still on a stub bank (article not yet required): ${pending}`);
if (fail || missing) process.exitCode = 1;
