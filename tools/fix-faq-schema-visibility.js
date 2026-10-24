#!/usr/bin/env node
"use strict";

/*
 * tools/fix-faq-schema-visibility.js
 *
 * Makes each page's FAQPage structured data match the FAQ a visitor can
 * actually read on that page, and keeps that FAQ unique per page.
 *
 * Problem
 * -------
 * 348 pages carried FAQPage structured data describing questions that appear
 * nowhere in the rendered page. Those questions were generated from a handful
 * of templates that repeat across hundreds of pages:
 *
 *   "Is <topic> free to use on axomexam?"
 *   "Are the <topic> questions available in Assamese and English?"
 *   "How many questions does <topic> include?"
 *   "Which exams is <topic> useful for?"
 *
 * Four templates covered 1692 of the 1933 FAQ entries, while the genuinely
 * useful, hand-written FAQ (5 English + 5 Assamese Q&A per page, each specific
 * to the topic) sat unused in `section.axo-extra-content`.
 *
 * Two faults meet here:
 *   1. Provenance. The FAQPage node was not built from the page's own visible
 *      FAQ at all, so the schema text and the page text diverged. Google
 *      requires FAQ structured data to be present on the page, which makes
 *      this a structured-data violation as well as a duplication signal.
 *   2. Duplication. Because the schema came from shared templates, the
 *      structured data on hundreds of pages was near-identical.
 *
 * What this tool does
 * -------------------
 * Rebuilds the FAQPage node from the FAQ that is actually visible on the page,
 * in document order, deduplicating any Q&A pair that repeats site-wide so the
 * schema stays unique and high-signal. Pages that end up with no unique
 * visible FAQ lose the FAQPage node instead of advertising invisible text.
 *
 * The visible FAQ itself is never rewritten or removed, and ad containers are
 * not touched. The `section.axo-extra-content` block stays where it is,
 * outside `<main id="app">`: the router rewrites that container on load and
 * navigation, so moving the block inside would destroy it for real visitors.
 * The block is already served in the HTML, which is what crawlers and no-JS
 * readers consume.
 *
 * Idempotent: re-running writes the same schema.
 *
 * Usage:
 *   node tools/fix-faq-schema-visibility.js          # apply
 *   node tools/fix-faq-schema-visibility.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SITE = "https://axomexam.in";
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview"]);
const FAQ_HEADING = /<h[1-6][^>]*>\s*Frequently Asked Questions\s*<\/h[1-6]>/i;

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "-", ndash: "-", hellip: "...", middot: "-", times: "x",
  rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', deg: "deg",
};

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (m, name) => {
      const k = name.toLowerCase();
      return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, k) ? NAMED_ENTITIES[k] : m;
    });
}

function strip(html) {
  return decode(String(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

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

function getCanonical(html, file) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (m) return m[1];
  const rel = path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/");
  return rel ? `${SITE}/${rel}/` : `${SITE}/`;
}

/* Visible FAQ: the Q&A the site itself marks with data-axo-faq="1", in
   document order. That marker is written by the FAQ tooling on every page that
   carries a real FAQ, regardless of the heading above it ("Frequently Asked
   Questions", "Common Questions Answered", ...). Pages without the marker fall
   back to any Q&A under an FAQ heading. */
function collectVisibleFaq(html) {
  const out = [];
  const seen = new Set();

  const push = (block) => {
    const sm = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!sm) return;
    const q = strip(sm[1]);
    if (!q || q.length > 300) return;
    const a = strip(block.slice(block.indexOf(sm[0]) + sm[0].length).replace(/<\/details>\s*$/i, ""));
    if (!a) return;
    const key = q.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ q, a });
  };

  for (const block of html.match(/<details\b[^>]*data-axo-faq=["'][^"']*["'][^>]*>[\s\S]*?<\/details>/gi) || []) {
    push(block);
  }
  if (out.length) return out;

  const head = html.match(FAQ_HEADING);
  if (!head) return out;
  for (const block of html.slice(head.index).match(/<details\b[^>]*>[\s\S]*?<\/details>/gi) || []) {
    if (/appdl-faq/.test(block.slice(0, 80))) continue;
    push(block);
  }
  return out;
}

function pairKey(it) {
  return `${it.q.toLowerCase()}\u0000${it.a.toLowerCase()}`;
}

function countPairs(files) {
  const counts = new Map();
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    for (const it of collectVisibleFaq(html)) {
      const k = pairKey(it);
      counts.set(k, (counts.get(k) || 0) + 1);
    }
  }
  return counts;
}

function escapeForScript(json) {
  return json.replace(/<\/(script)/gi, "<\\/$1");
}

function main() {
  const files = walk(ROOT, []);
  const counts = countPairs(files);

  const stats = {
    scanned: files.length,
    schemaWritten: 0,
    schemaRemoved: 0,
    questions: 0,
    excluded: 0,
    noFaq: 0,
  };

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const faq = collectVisibleFaq(html);

    const keep = faq.filter((it) => (counts.get(pairKey(it)) || 0) <= 1);
    stats.excluded += faq.length - keep.length;
    if (!faq.length) stats.noFaq++;

    const url = getCanonical(html, file);
    const node = keep.length
      ? {
          "@type": "FAQPage",
          "@id": `${url}#faqpage`,
          url,
          name: "Frequently Asked Questions",
          isPartOf: { "@id": `${SITE}/#website` },
          inLanguage: ["en", "as"],
          mainEntity: keep.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }
      : null;

    let changed = false;
    let graphDone = false;
    const out = html.replace(
      /(<script[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
      (full, open, body, close) => {
        if (!/"FAQPage"|"@graph"/.test(body)) return full;
        let data;
        try {
          data = JSON.parse(body);
        } catch (e) {
          return full;
        }

        /* Graph-shaped node (the common case): swap the FAQPage member. */
        if (!graphDone && Array.isArray(data["@graph"])) {
          graphDone = true;
          const before = JSON.stringify(data["@graph"]);
          data["@graph"] = data["@graph"].filter((n) => !n || n["@type"] !== "FAQPage");
          if (node) data["@graph"].push(node);
          if (JSON.stringify(data["@graph"]) === before) return full;
          changed = true;
          return open + escapeForScript(JSON.stringify(data)) + close;
        }

        /* Standalone FAQPage node (current-affairs pages): replace in place,
           or drop the whole script when there is no visible FAQ to describe. */
        if (data && data["@type"] === "FAQPage") {
          if (!node) {
            changed = true;
            return "";
          }
          const merged = { "@context": data["@context"] || "https://schema.org", ...node };
          const serialized = open + escapeForScript(JSON.stringify(merged)) + close;
          if (serialized === full) return full;
          changed = true;
          return serialized;
        }
        return full;
      }
    );

    if (!changed) continue;
    if (node) {
      stats.schemaWritten++;
      stats.questions += node.mainEntity.length;
    } else {
      stats.schemaRemoved++;
    }
    if (!CHECK) fs.writeFileSync(file, out, "utf8");
  }

  console.log(`FAQ schema visibility (${CHECK ? "check" : "apply"})`);
  console.log(`  pages scanned        : ${stats.scanned}`);
  console.log(`  FAQPage written      : ${stats.schemaWritten}`);
  console.log(`  FAQPage removed      : ${stats.schemaRemoved}`);
  console.log(`  questions in schema  : ${stats.questions}`);
  console.log(`  boilerplate excluded : ${stats.excluded}`);
  console.log(`  pages with no FAQ    : ${stats.noFaq}`);
}

main();
