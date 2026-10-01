#!/usr/bin/env node
"use strict";

/*
 * build-llms-full.js
 *
 * Generates llms-full.txt: a single, machine-readable index of every page on
 * axomexam.in together with its questions and answers. This is the companion
 * file to llms.txt and gives generative engines (ChatGPT, Perplexity, Gemini,
 * Copilot, etc.) the full content in one fetch.
 *
 * Usage:
 *   node scripts/build-llms-full.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://axomexam.in";
const OUT = path.join(ROOT, "llms-full.txt");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github"]);

const SECTION_ORDER = [
  ["root", "Core pages"],
  ["exams", "Exam-wise question banks"],
  ["topic", "Topic question banks"],
  ["category", "Categories"],
  ["categories", "Categories index"],
  ["mock-test", "Mock tests"],
  ["previous-year", "Previous year papers"],
  ["ebooks", "E-books"],
  ["downloads", "Downloads"],
  ["download-app", "App"],
  ["trending", "Trending"],
  ["tools", "Tools"],
  ["about", "About"],
  ["contact", "Contact"],
  ["submit", "Submit content"],
  ["privacy", "Privacy"],
  ["privacy-policy", "Privacy policy"],
  ["terms", "Terms"],
  ["disclaimer", "Disclaimer"],
  ["search", "Search"],
];

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

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "-", ndash: "-", hellip: "...", middot: "-", times: "x",
  copy: "(c)", reg: "(R)", deg: "deg", plusmn: "+/-", frac12: "1/2",
  lsquo: "'", rsquo: "'", ldquo: '"', rdquo: '"', bull: "-",
  laquo: "<<", raquo: ">>", euro: "EUR", pound: "GBP", rupee: "Rs",
};

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (m, name) => {
      const key = name.toLowerCase();
      return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, key) ? NAMED_ENTITIES[key] : m;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function getCanonical(html, file) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (m) return m[1];
  const rel = path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/");
  return rel ? `${SITE}/${rel}/` : `${SITE}/`;
}

function getTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decode(m[1]) : "";
}

function getDescription(html) {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  return m ? decode(m[1]) : "";
}

function collectQuestions(html) {
  const out = [];
  const scripts = html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const script of scripts) {
    const body = script.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "");
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      continue;
    }
    const nodes = [];
    if (Array.isArray(data["@graph"])) nodes.push(...data["@graph"]);
    else nodes.push(data);
    for (const node of nodes) {
      const parts = Array.isArray(node.hasPart) ? node.hasPart : [];
      for (const p of parts) {
        if (p && p["@type"] === "Question" && p.text) {
          const ans = p.acceptedAnswer && p.acceptedAnswer.text ? p.acceptedAnswer.text : "";
          out.push({ q: decode(p.text), a: decode(ans) });
        }
      }
    }
  }
  return out;
}

function sectionOf(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (!rel.includes("/")) return "root";
  return rel.split("/")[0];
}

function main() {
  const files = walk(ROOT, []);
  const bySection = new Map();

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const url = getCanonical(html, file);
    const title = getTitle(html);
    const description = getDescription(html);
    const questions = collectQuestions(html);
    const base = path.basename(file).toLowerCase();
    if (!title || base === "404.html") continue;

    const sec = sectionOf(file);
    if (!bySection.has(sec)) bySection.set(sec, []);
    bySection.get(sec).push({ url, title, description, questions });
  }

  const orderKeys = SECTION_ORDER.map((s) => s[0]);
  const sections = [...bySection.keys()].sort((a, b) => {
    const ia = orderKeys.indexOf(a);
    const ib = orderKeys.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const lines = [];
  lines.push("# axomexam - full content index");
  lines.push("");
  lines.push("> Machine-readable index of every page on https://axomexam.in. Each entry lists the canonical URL, page title, a short description and, for question-bank pages, the questions with their answers. Content is bilingual (English + Assamese); the source pages carry both languages and the JSON-LD summary below is in English.");
  lines.push("");
  lines.push("Source: https://axomexam.in  |  Sitemap: https://axomexam.in/sitemap.xml  |  License: free to read and cite; attribution to axomexam.in appreciated.");
  lines.push("");

  let totalQ = 0;
  for (const sec of sections) {
    const label = (SECTION_ORDER.find((s) => s[0] === sec) || [sec, sec])[1];
    const pages = bySection.get(sec).sort((a, b) => a.url.localeCompare(b.url));
    lines.push(`## ${label}`);
    lines.push("");
    for (const page of pages) {
      lines.push(`### ${page.title || page.url}`);
      lines.push(`URL: ${page.url}`);
      if (page.description) lines.push(`Summary: ${page.description}`);
      for (const qa of page.questions) {
        lines.push(`Q: ${qa.q}`);
        if (qa.a) lines.push(`A: ${qa.a}`);
      }
      totalQ += page.questions.length;
      lines.push("");
    }
  }

  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  const bytes = fs.statSync(OUT).size;
  console.log(`Wrote llms-full.txt`);
  console.log(`  pages    : ${files.length}`);
  console.log(`  sections : ${sections.length}`);
  console.log(`  Q&A pairs: ${totalQ}`);
  console.log(`  size     : ${(bytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
