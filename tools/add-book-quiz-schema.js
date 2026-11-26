#!/usr/bin/env node
"use strict";

/*
 * tools/add-book-quiz-schema.js
 *
 * The DHS & DME Technical Grade III book renders its questions as static HTML
 * but carries no Quiz node, so the 20,000+ questions on those pages are
 * invisible to structured-data consumers while the rest of the site already
 * publishes Quiz.hasPart.
 *
 * This adds one Quiz node per book page (English and Assamese) built from the
 * questions actually visible in that page, capped at MAX_ITEMS to keep the
 * document size sane. Nothing else in the JSON-LD graph is touched.
 *
 * Idempotent: a page whose graph already has a "#quiz" node is skipped.
 *
 * Usage: node tools/add-book-quiz-schema.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const MAX_ITEMS = 25;

const BOOKS = ["exams/dhs-dme-technical", "as/exams/dhs-dme-technical"];

const decode = (s) => String(s || "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ").trim();

function parseItems(html, isAs) {
  const chunks = html.split('<div class="qa-item"').slice(1);
  /* Some Assamese twins mix languages inside a single item (Assamese stem,
     English options), so each part accepts either language marker. */
  const qRe = isAs
    ? /<div lang="(?:as|en)" style="font-weight:800;[^"]*">([\s\S]*?)<\/div>/
    : /<div lang="(?:en|as)" style="font-weight:800;[^"]*">([\s\S]*?)<\/div>/;
  const optRe = /<div lang="(?:as|en)" style="margin:2px 0;">([\s\S]*?)<\/div>/g;
  const ansRe = /<strong>(?:উত্তৰ|Answer):<\/strong>\s*<span>([\s\S]*?)<\/span>/;
  const expRe = /<strong>(?:ব্যাখ্যা|Explanation):<\/strong>\s*([^<]{0,400})/;

  const out = [];
  for (const chunk of chunks) {
    const body = chunk.split('<div class="qa-item"')[0];
    const q = qRe.exec(body);
    if (!q) continue;
    const opts = [...body.matchAll(optRe)].map((m) => decode(m[1])).filter(Boolean);
    const a = ansRe.exec(body);
    if (!a) continue;
    const e = expRe.exec(body);
    out.push({
      q: decode(q[1]),
      opts,
      a: decode(a[1]),
      e: e ? decode(e[1]) : "",
    });
  }
  return out;
}

function buildQuizNode(html, rel, isAs) {
  const title = decode((/<title>([\s\S]*?)<\/title>/.exec(html) || [])[1]);
  const desc = decode((/<meta name="description" content="([^"]*)"/.exec(html) || [])[1]);
  const h1 = decode((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html) || [])[1]);
  const crumbs = [...html.matchAll(/class="bc-sep"[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/g)].map((m) => decode(m[1]));
  const subject = crumbs.length ? crumbs[crumbs.length - 1] : (h1 || title);

  const items = parseItems(html, isAs).slice(0, MAX_ITEMS);
  if (!items.length) return null;

  const canonical = `https://axomexam.in/${rel}/`;
  return {
    "@type": "Quiz",
    "@id": `${canonical}#quiz`,
    name: title || h1,
    description: desc,
    about: { "@type": "Thing", name: subject },
    educationalAlignment: [
      { "@type": "AlignmentObject", alignmentType: "educationalSubject", targetName: subject },
      { "@type": "AlignmentObject", alignmentType: "educationalLevel", targetName: "Competitive exams" },
    ],
    inLanguage: ["en", "as"],
    hasPart: items.map((it) => ({
      "@type": "Question",
      eduQuestionType: "Multiple choice",
      name: it.q,
      text: [it.q, ...it.opts].join(" "),
      acceptedAnswer: {
        "@type": "Answer",
        text: it.e ? `${it.a} — ${it.e}` : it.a,
      },
    })),
  };
}

let pages = 0, added = 0, skipped = 0, failed = 0;
const report = [];

for (const book of BOOKS) {
  const root = path.join(ROOT, book);
  if (!fs.existsSync(root)) continue;
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { stack.push(full); continue; }
      if (e.name !== "index.html") continue;
      pages++;
      const rel = path.relative(ROOT, dir).split(path.sep).join("/");
      const isAs = rel.startsWith("as/");
      let html = fs.readFileSync(full, "utf8");
      if (html.includes('#quiz"')) { skipped++; continue; }

      const node = buildQuizNode(html, rel, isAs);
      if (!node) { skipped++; continue; }

      const m = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
      if (!m) { failed++; report.push(`NO-LD ${rel}`); continue; }
      let data;
      try { data = JSON.parse(m[1]); } catch (err) { failed++; report.push(`BAD-LD ${rel}`); continue; }
      if (!Array.isArray(data["@graph"])) { failed++; report.push(`NO-GRAPH ${rel}`); continue; }

      data["@graph"].push(node);
      const serialized = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
      html = html.slice(0, m.index) + `<script type="application/ld+json">${serialized}</script>` + html.slice(m.index + m[0].length);

      try { JSON.parse(serialized.replace(/\\u003c/g, "<")); } catch (err) { failed++; report.push(`RESERIALIZE ${rel}`); continue; }

      if (!DRY) fs.writeFileSync(full, html);
      added++;
    }
  }
}

console.log(report.join("\n"));
console.log(`book pages seen: ${pages} | quiz added: ${added} | skipped: ${skipped} | failed: ${failed}`);
