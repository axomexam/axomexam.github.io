#!/usr/bin/env node
"use strict";

/*
 * inject-faq-schema.js
 *
 * Reads the *visible* FAQ already present on each page
 * (<details><summary>Question?</summary><p>Answer</p></details>)
 * and adds a matching schema.org FAQPage node to the page's JSON-LD graph.
 *
 * To keep the structured data high-signal and unique per page, any Q&A pair
 * that appears identically on more than one page (site-wide boilerplate) is
 * left out of the schema. The visible FAQ is never changed.
 *
 * The script is idempotent: an existing FAQPage node is replaced, not appended.
 *
 * Usage:
 *   node scripts/inject-faq-schema.js          # apply
 *   node scripts/inject-faq-schema.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SITE = "https://axomexam.in";
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github"]);
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
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
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

function collectFaq(html) {
  const head = html.match(FAQ_HEADING);
  if (!head) return [];
  const idx = head.index;
  const end = html.indexOf("</main>", idx);
  const region = end === -1 ? html.slice(idx) : html.slice(idx, end);

  const out = [];
  const seen = new Set();
  const details = region.match(/<details\b[^>]*>[\s\S]*?<\/details>/gi) || [];
  for (const block of details) {
    const sm = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!sm) continue;
    const q = strip(sm[1]);
    if (!q || q.length > 300) continue;
    const after = block.slice(block.indexOf(sm[0]) + sm[0].length);
    const a = strip(after.replace(/<\/details>\s*$/i, ""));
    if (!a) continue;
    const key = q.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ q, a });
  }
  return out;
}

function pairKey(item) {
  return `${item.q.toLowerCase()}\u0000${item.a.toLowerCase()}`;
}

function countPairs(files) {
  const counts = new Map();
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    for (const item of collectFaq(html)) {
      const k = pairKey(item);
      counts.set(k, (counts.get(k) || 0) + 1);
    }
  }
  return counts;
}

function escapeForScript(json) {
  return json.replace(/<\/(script)/gi, "<\\/$1");
}

function processFile(file, counts, stats) {
  const html = fs.readFileSync(file, "utf8");
  const faq = collectFaq(html);
  if (!faq.length) {
    stats.noFaq++;
    return;
  }
  const keep = faq.filter((it) => (counts.get(pairKey(it)) || 0) <= 1);
  stats.excluded += faq.length - keep.length;

  const url = getCanonical(html, file);
  const faqNode = keep.length
    ? {
        "@type": "FAQPage",
        "@id": `${url}#faqpage`,
        url,
        name: "Frequently Asked Questions",
        isPartOf: { "@id": `${SITE}/#website` },
        inLanguage: ["en", "as"],
        mainEntity: keep.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  let changed = false;
  const out = html.replace(
    /(<script[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (full, open, body, close) => {
      if (changed || !/"@graph"/.test(body)) return full;
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        return full;
      }
      if (!Array.isArray(data["@graph"])) return full;

      data["@graph"] = data["@graph"].filter((n) => !n || n["@type"] !== "FAQPage");
      if (faqNode) data["@graph"].push(faqNode);

      const serialized = open + escapeForScript(JSON.stringify(data)) + close;
      if (serialized === full) return full;
      changed = true;
      return serialized;
    }
  );

  if (!changed) {
    stats.unchanged++;
    return;
  }
  stats.changed++;
  if (faqNode) stats.pagesWithSchema++;
  else stats.pagesSkipped++;
  stats.questions += keep.length;
  if (!CHECK) fs.writeFileSync(file, out, "utf8");
}

function main() {
  const files = walk(ROOT, []);
  const counts = countPairs(files);
  const stats = {
    changed: 0, unchanged: 0, noFaq: 0,
    pagesWithSchema: 0, pagesSkipped: 0,
    excluded: 0, questions: 0,
  };
  for (const file of files) processFile(file, counts, stats);

  console.log(`FAQ schema injector (${CHECK ? "check" : "apply"})`);
  console.log(`  pages scanned        : ${files.length}`);
  console.log(`  pages changed        : ${stats.changed}`);
  console.log(`  pages with FAQPage   : ${stats.pagesWithSchema}`);
  console.log(`  pages without schema : ${stats.pagesSkipped} (all Q&A were boilerplate)`);
  console.log(`  pages with no FAQ    : ${stats.noFaq}`);
  console.log(`  Q&A in schema        : ${stats.questions}`);
  console.log(`  boilerplate excluded : ${stats.excluded}`);
}

main();
