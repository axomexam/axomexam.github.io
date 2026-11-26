#!/usr/bin/env node
"use strict";

/*
 * tools/seo-hub-topic-links.js
 *
 * Eighteen category hubs (category/gk, category/gk/assam-history, category/math,
 * ...) linked to no /topic/ page at all, so the 332 topic pages were only
 * reachable through the deepest sub-category. This adds a "topic pages in
 * <category>" list to each of those hubs, picking one topic from every
 * sub-section first so the list is not dominated by a single branch.
 *
 * The block is a section.axo-extra-content after </main>, which is the site's
 * existing crawler-copy slot: it is static HTML, carries data-axo-path so the
 * path guard only shows it on its own route, and is swapped by the SPA sync.
 *
 * Idempotent: hubs that already link to a /topic/ page, or that already carry
 * data-axo-hub-topics, are skipped.
 *
 * Usage: node tools/seo-hub-topic-links.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const LIMIT = 12;

const unescape = (s) => String(s || "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");

function collectTopicPages(base, prefix) {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      if (fs.existsSync(path.join(full, "index.html"))) {
        const h = fs.readFileSync(path.join(full, "index.html"), "utf8");
        const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(h);
        const title = /<title>([\s\S]*?)<\/title>/i.exec(h);
        const label = unescape((h1 ? h1[1] : title ? title[1] : e.name).replace(/<[^>]+>/g, ""))
          .split(/[—|:]/)[0].trim();
        out.push({
          rel: "/" + prefix + "/" + path.relative(base, full).split(path.sep).join("/") + "/",
          sub: path.relative(base, full).split(path.sep)[2] || "",
          label,
        });
      }
      walk(full);
    }
  };
  walk(base);
  return out;
}

function pickSpread(pages, limit) {
  const bySub = new Map();
  for (const p of pages) (bySub.get(p.sub) || bySub.set(p.sub, []).get(p.sub)).push(p);
  const buckets = [...bySub.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([, v]) => v.sort((x, y) => x.rel.localeCompare(y.rel)));
  const out = [];
  let round = 0;
  while (out.length < limit) {
    let added = 0;
    for (const b of buckets) {
      if (b[round]) { out.push(b[round]); added++; }
      if (out.length >= limit) break;
    }
    if (!added) break;
    round++;
  }
  return out;
}

let changed = 0;

for (const [catRoot, topicRoot, prefix, lang] of [
  ["category", "topic", "topic", "en"],
  ["as/category", "as/topic", "as/topic", "as"],
]) {
  const catDir = path.join(ROOT, catRoot);
  const topicDir = path.join(ROOT, topicRoot);
  if (!fs.existsSync(catDir) || !fs.existsSync(topicDir)) continue;

  const allTopics = collectTopicPages(topicDir, prefix);

  const hubs = [];
  const walkHub = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      if (fs.existsSync(path.join(full, "index.html"))) hubs.push(full);
      walkHub(full);
    }
  };
  walkHub(catDir);

  for (const dir of hubs.sort()) {
    const file = path.join(dir, "index.html");
    const html = fs.readFileSync(file, "utf8");
    if (html.includes('data-axo-hub-topics="1"')) continue;
    if (/href="\/(?:as\/)?topic\//.test(html)) continue;

    const rel = "/" + path.relative(ROOT, dir).split(path.sep).join("/") + "/";
    const topicPrefix = lang === "as"
      ? rel.replace(/^\/as\/category\//, "/as/topic/")
      : rel.replace(/^\/category\//, "/topic/");
    const pages = allTopics.filter((p) => p.rel.startsWith(topicPrefix));
    if (!pages.length) continue;

    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
    const label = unescape((h1 ? h1[1] : rel).replace(/<[^>]+>/g, ""))
      .replace(/\s+(Questions? with Answers|প্ৰশ্ন.*)$/i, "").replace(/\s*[—|:].*$/, "").trim();
    const picked = pickSpread(pages, LIMIT);

    const heading = lang === "as" ? `${label}ৰ বিষয়সমূহ` : `${label}: topic-wise practice pages`;
    const intro = lang === "as"
      ? "প্ৰতিটো বিষয়ৰ নিজা পৃষ্ঠাত প্ৰশ্ন, শুদ্ধ উত্তৰ আৰু ব্যাখ্যা আছে।"
      : "Each topic has its own page with questions, answers and explanations.";
    const items = picked.map((p) => `          <li lang="${lang}"><a href="${p.rel}">${p.label}</a></li>`).join("\n");

    const article = `
      <article lang="${lang}" data-axo-lang="${lang}" data-axo-hub-topics="1" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:18px auto 0; text-align:left;">
        <h2 style="margin-top:0; color:var(--ink,#0f172a);">${heading}</h2>
        <p lang="${lang}">${intro}</p>
        <ul style="margin:8px 0 0 20px; line-height:1.9;">
${items}
        </ul>
      </article>`;

    /* One section.axo-extra-content per page: the SPA sync swaps the first
       match, so a second one would be orphaned. Append to the existing one. */
    let next;
    const existing = html.search(/<section class="section axo-extra-content"/);
    if (existing >= 0) {
      const end = html.indexOf("</section>", existing);
      if (end < 0) continue;
      next = html.slice(0, end) + article + "\n    " + html.slice(end);
    } else {
      const mainEnd = html.lastIndexOf("</main>");
      if (mainEnd < 0) continue;
      next = html.slice(0, mainEnd + 7) + `
  <section class="section axo-extra-content" data-axo-extra="1" data-axo-hub-topics="1" data-axo-path="${rel}" style="padding-bottom:48px;">
    <div class="container">${article}
    </div>
  </section>` + html.slice(mainEnd + 7);
    }
    changed++;
    if (!DRY) fs.writeFileSync(file, next);
  }
}

console.log(`category hubs given topic links: ${changed}`);
