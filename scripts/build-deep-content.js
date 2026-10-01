#!/usr/bin/env node
"use strict";

/*
 * build-deep-content.js
 *
 * Replaces the thin, auto-generated "seo-deep" block on selected category
 * pages with rich, page-specific study content from deep-content.data.js,
 * and refreshes that page's <title> and meta/OpenGraph/Twitter descriptions.
 *
 * The rendered block carries data-axo-deep="1". js/app.js detects this marker
 * before it re-renders #app and re-appends the block, so the rich content is
 * shown to JavaScript users as well as to crawlers and no-JS visitors.
 *
 * Usage, from the repository root:
 *   node scripts/build-deep-content.js          # apply
 *   node scripts/build-deep-content.js --check  # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const DATA = require("./deep-content.data.js");

const PAGES = {
  arithmetic: "category/math/arithmetic/index.html",
  "non-verbal-reasoning": "category/reasoning/non-verbal-reasoning/index.html",
  "verbal-reasoning": "category/reasoning/verbal-reasoning/index.html",
  "analytical-critical-reasoning": "category/reasoning/analytical-critical-reasoning/index.html",
  science: "category/science/index.html",
  english: "category/english/index.html",
  articles: "category/articles/index.html",
  math: "category/math/index.html",
  reasoning: "category/reasoning/index.html",
  computer: "category/computer/index.html"
};

const H3 = 'style="color:var(--ink,#0f172a); margin-top:22px;"';
const LIST = 'style="margin:8px 0 0 20px; line-height:1.9;"';
const DETAIL = 'style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"';
const SUMMARY = 'style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);"';

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sectionsHTML(sections) {
  return (sections || []).map((s) => {
    let html = "<h3 " + H3 + ">" + esc(s.h) + "</h3>";
    if (s.p && s.p.length) html += s.p.map((p) => "<p>" + esc(p) + "</p>").join("");
    if (s.list && s.list.length) {
      html += "<ul " + LIST + ">" + s.list.map((li) => "<li>" + esc(li) + "</li>").join("") + "</ul>";
    }
    return html;
  }).join("");
}

function faqHTML(faqs) {
  if (!faqs || !faqs.length) return "";
  return (
    "<h3 " + H3 + ">Frequently Asked Questions</h3>" +
    '<div class="seo-faq">' +
    faqs.map((f) =>
      "<details " + DETAIL + "><summary " + SUMMARY + ">" + esc(f.q) + "</summary>" +
      '<p style="margin:8px 0 0;">' + esc(f.a) + "</p></details>"
    ).join("") +
    "</div>"
  );
}

function panelInner(entry) {
  const lead = (entry.lead || []).map((p) => "<p>" + esc(p) + "</p>").join("");
  const h2 = entry.h2 || entry.title.replace(/\s*\|\s*axomexam\s*$/i, "");
  return (
    '<h2 style="margin-top:0; color:var(--ink,#0f172a);">' + esc(h2) + "</h2>" +
    lead +
    sectionsHTML(entry.sections) +
    faqHTML(entry.faqs)
  );
}

function renderSection(entry) {
  return (
    '<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;">' +
    '<div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">' +
    panelInner(entry) +
    "</div></section>"
  );
}

function replaceFirst(html, re, replacement) {
  let done = false;
  return html.replace(re, (...args) => {
    if (done) return args[0];
    done = true;
    return typeof replacement === "function" ? replacement(...args) : replacement;
  });
}

function buildPage(html, entry) {
  let out = html;

  out = replaceFirst(
    out,
    /<section class="section seo-deep"[\s\S]*?<\/section>/,
    renderSection(entry)
  );

  out = replaceFirst(out, /<title>[\s\S]*?<\/title>/, "<title>" + esc(entry.title) + "</title>");
  out = replaceFirst(out, /<meta name="description" content="[^"]*"\s*\/>/,
    '<meta name="description" content="' + esc(entry.meta) + '" />');
  out = replaceFirst(out, /<meta property="og:title" content="[^"]*"\s*\/>/,
    '<meta property="og:title" content="' + esc(entry.title) + '" />');
  out = replaceFirst(out, /<meta property="og:description" content="[^"]*"\s*\/>/,
    '<meta property="og:description" content="' + esc(entry.meta) + '" />');
  out = replaceFirst(out, /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    '<meta name="twitter:title" content="' + esc(entry.title) + '" />');
  out = replaceFirst(out, /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    '<meta name="twitter:description" content="' + esc(entry.meta) + '" />');

  return out;
}

function updateAppSource() {
  const rel = "js/app.src.js";
  const file = path.join(ROOT, rel);
  const before = fs.readFileSync(file, "utf8");
  const block =
    "/* ==== BEGIN GENERATED DEEP CONTENT (scripts/build-deep-content.js) ==== */\n" +
    "  const DEEP_CONTENT = " + JSON.stringify(DATA) + ";\n" +
    "  /* ==== END GENERATED DEEP CONTENT ==== */";
  const re = /\/\* ==== BEGIN GENERATED DEEP CONTENT \(scripts\/build-deep-content\.js\) ==== \*\/[\s\S]*?\/\* ==== END GENERATED DEEP CONTENT ==== \*\//;
  if (!re.test(before)) {
    console.log("  warning: DEEP_CONTENT marker not found in " + rel + " (skipped)");
    return false;
  }
  const after = before.replace(re, block);
  if (before === after) return false;
  if (!CHECK) fs.writeFileSync(file, after, "utf8");
  console.log("  updated " + rel);
  return true;
}

function main() {
  const drift = [];
  for (const id of Object.keys(PAGES)) {
    const rel = PAGES[id];
    const entry = DATA[id];
    if (!entry) {
      console.log("  missing content for " + id + " (skipped)");
      continue;
    }
    const file = path.join(ROOT, rel);
    const before = fs.readFileSync(file, "utf8");
    const after = buildPage(before, entry);
    if (before !== after) {
      drift.push(rel);
      if (!CHECK) fs.writeFileSync(file, after, "utf8");
      console.log("  updated " + rel);
    } else {
      console.log("  up to date " + rel);
    }
  }
  if (updateAppSource()) drift.push("js/app.src.js");
  console.log((CHECK ? "Drift: " : "Updated: ") + drift.length + " file(s)");
  if (CHECK && drift.length) process.exitCode = 1;
}

main();
