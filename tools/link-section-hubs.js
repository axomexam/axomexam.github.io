#!/usr/bin/env node
"use strict";

/*
 * tools/link-section-hubs.js
 *
 * Links the intermediate exam hubs that nothing pointed at.
 *
 * /exams/<exam>/<subject>/ pages list their leaf questions
 * (/exams/adre-grade-3/general-english/grammar/parts-of-speech/ and friends)
 * but never the hub between them
 * (/exams/adre-grade-3/general-english/grammar/). The hub is a real page with
 * its own content and its own canonical, and the hub itself links its leaves,
 * so the hierarchy is sound — only the first hop was missing. 30 such hubs had
 * no inbound link at all.
 *
 * Pages marked noindex, or canonical to a different URL, are skipped: those
 * are deliberate aliases (category/computer/* -> topic/computer/*, the moved
 * previous-year page, /privacy-policy -> /privacy/), not orphans.
 *
 * Idempotent: a parent that already links the child is left alone.
 *
 *   node tools/link-section-hubs.js --check
 *   node tools/link-section-hubs.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://axomexam.in";
const CHECK = process.argv.includes("--check");

const CARD =
  '<a class="sub-card reveal" data-exam-subcats href="%HREF%" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;"><b style="color:var(--ink,#0f172a);">%TITLE%</b><span style="display:block; color:var(--ink-muted,#64748b); font-size:0.86rem;">%DESC%</span></a>';

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

function urlOf(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/").replace(/\/index\.html$/, "");
  return "/" + rel + "/";
}

function norm(u) {
  return u.split("#")[0].split("?")[0].replace(/\/+$/, "");
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1] : "";
}

function decode(s) {
  return String(s)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function esc(s) {
  return decode(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function main() {
  const files = walk(ROOT, []);
  const indexable = new Set();
  const info = new Map();

  /* Links from noindex pages still give a page a crawl path, so they count
     when asking whether something is linked; they do not count as a parent
     to place a new link in. */
  const allHtml = new Map();

  for (const file of files) {
    const url = urlOf(file);
    if (url.startsWith("/as/") || url === "//") continue;
    const html = fs.readFileSync(file, "utf8");
    allHtml.set(url, html);
    const robots = attr(html, /<meta name="robots" content="([^"]*)"/i);
    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/i);
    const selfCanonical = canonical.replace(BASE, "").replace(/\/+$/, "") === url.replace(/\/+$/, "");
    if (/noindex/i.test(robots) || !selfCanonical) continue;
    indexable.add(url);
    info.set(url, {
      file,
      title: esc(attr(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)).replace(/\s+/g, " ").trim(),
      desc: esc(attr(html, /<meta name="description" content="([^"]*)"/i)).slice(0, 120),
      html,
    });
  }

  /* Everything another page already points at. */
  const linked = new Set();
  for (const [, html] of allHtml) {
    for (const h of html.match(/href="(\/[^"#?]*)"/g) || []) {
      linked.add(norm(h.slice(6, -1)));
    }
  }

  let added = 0;
  const done = [];
  const skipped = [];

  for (const [url, v] of info) {
    if (linked.has(norm(url))) continue;
    const parentUrl = url.replace(/\/$/, "").replace(/\/[^/]+$/, "/");
    const parent = info.get(parentUrl);
    if (!parent) {
      skipped.push(`${url} (no indexable parent)`);
      continue;
    }
    const grid = parent.html.match(/<div class="sub-grid">/);
    if (!grid) {
      skipped.push(`${url} (parent has no sub-grid)`);
      continue;
    }

    const card = CARD.replace("%HREF%", url)
      .replace("%TITLE%", v.title || "Sub-category")
      .replace("%DESC%", v.desc || "");

    const next = parent.html.replace(/<div class="sub-grid">/, `<div class="sub-grid">\n${card}`);
    if (!CHECK) fs.writeFileSync(parent.file, next);
    parent.html = next; /* keep the in-memory copy current so two children of
                           the same parent both land in the file */
    added++;
    done.push(`${parentUrl}  ->  ${url}`);
  }

  console.log(`indexable pages    : ${indexable.size}`);
  console.log(`${CHECK ? "would link" : "linked"}         : ${added}`);
  for (const d of done) console.log(`   + ${d}`);
  if (skipped.length) {
    console.log(`skipped            : ${skipped.length}`);
    for (const s of skipped) console.log(`   - ${s}`);
  }
}

main();
