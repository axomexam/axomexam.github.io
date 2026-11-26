#!/usr/bin/env node
"use strict";

/*
 * tools/seo-mock-topic-links.js
 *
 * The mock-test hubs (mock-test/gk/assam-history, mock-test/math/arithmetic,
 * ...) never linked to the study pages under /topic/, even though the topic
 * pages already link *into* the mock tests. That made the cluster one-way.
 * This adds a "revise the topic first" list from every mock hub to the
 * matching /topic/ page(s).
 *
 * Mapping: mock-test/<path> -> topic/<path>; if that exact topic page does not
 * exist, the hub lists the topic pages below that prefix instead.
 *
 * The block is a section.axo-extra-content after </main> (the site's crawler
 * slot, guarded by data-axo-path and synced by the SPA), so it never shows on
 * another route.
 *
 * Idempotent: hubs that already link to /topic/ or carry data-axo-mock-topics
 * are skipped.
 *
 * Usage: node tools/seo-mock-topic-links.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const LIMIT = 8;

const unescape = (s) => String(s || "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");

function labelOf(file) {
  const h = fs.readFileSync(file, "utf8");
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(h);
  const title = /<title>([\s\S]*?)<\/title>/i.exec(h);
  return unescape((h1 ? h1[1] : title ? title[1] : "").replace(/<[^>]+>/g, "")).split(/[—|:]/)[0].trim();
}

function topicsUnder(dir, prefix) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const full = path.join(d, e.name);
      if (fs.existsSync(path.join(full, "index.html"))) {
        out.push({
          rel: "/" + prefix + "/" + path.relative(dir, full).split(path.sep).join("/") + "/",
          label: labelOf(path.join(full, "index.html")),
        });
      }
      walk(full);
    }
  };
  walk(dir);
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

/* Slugs that differ between the mock-test tree and the topic tree. */
const ALIAS = {
  "computer/ms-office": "computer/ms-office-suite",
  "computer/comp-fundamentals": "computer/fundamentals-hardware",
  "english/grammar-vocab": "english/grammar",
};

let changed = 0;

for (const [mockRoot, lang] of [["mock-test", "en"], ["as/mock-test", "as"]]) {
  const base = path.join(ROOT, mockRoot);
  if (!fs.existsSync(base)) continue;

  const hubs = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      if (/^set-\d+$/.test(e.name)) continue;
      if (fs.existsSync(path.join(full, "index.html"))) hubs.push(full);
      walk(full);
    }
  };
  walk(base);

  for (const dir of hubs.sort()) {
    const file = path.join(dir, "index.html");
    const html = fs.readFileSync(file, "utf8");
    if (html.includes('data-axo-mock-topics="1"')) continue;
    if (/href="\/(?:as\/)?topic\//.test(html)) continue;

    const rel = "/" + path.relative(ROOT, dir).split(path.sep).join("/") + "/";
    const topicRel = rel.replace(new RegExp(`^/${lang === "as" ? "as/" : ""}mock-test/`), lang === "as" ? "/as/topic/" : "/topic/");
    const topicDir = path.join(ROOT, topicRel.replace(/^\//, ""));

    const links = [];
    const key = rel.replace(new RegExp(`^/${lang === "as" ? "as/" : ""}mock-test/`), "").replace(/\/$/, "");
    if (ALIAS[key]) {
      const aliasRel = (lang === "as" ? "/as/topic/" : "/topic/") + ALIAS[key] + "/";
      const aliasDir = path.join(ROOT, aliasRel.replace(/^\//, ""));
      if (fs.existsSync(path.join(aliasDir, "index.html"))) {
        links.push({ rel: aliasRel, label: labelOf(path.join(aliasDir, "index.html")) });
      } else if (fs.existsSync(aliasDir)) {
        links.push(...topicsUnder(aliasDir, aliasRel.replace(/^\/|\/$/g, "")));
      }
    }
    if (fs.existsSync(path.join(topicDir, "index.html"))) {
      links.push({ rel: topicRel, label: labelOf(path.join(topicDir, "index.html")) });
    } else if (fs.existsSync(topicDir)) {
      links.push(...topicsUnder(topicDir, topicRel.replace(/^\/|\/$/g, "")));
    }
    if (!links.length && key === "") {
      /* The mock-test root has no topic twin; point it at the subject index. */
      links.push({ rel: lang === "as" ? "/as/categories/" : "/categories/", label: lang === "as" ? "সকলো শিতান" : "all subjects" });
    }
    if (!links.length) continue;

    const heading = lang === "as" ? "প্ৰথমে বিষয়টো পঢ়ক" : "Revise the topic before the test";
    const intro = lang === "as"
      ? "প্ৰশ্নসমূহৰ ধাৰণা আৰু ব্যাখ্যা থকা অধ্যয়ন পৃষ্ঠা — প্ৰথমে পঢ়ি ল'লে মক টেষ্টত নম্বৰ বাঢ়ে।"
      : "Study pages with the concepts and worked explanations behind these questions. Read them first, then attempt the sets.";
    const items = links.slice(0, LIMIT)
      .map((l) => `          <li lang="${lang}"><a href="${l.rel}">${l.label}</a></li>`).join("\n");

    const block = `
  <section class="section axo-extra-content" data-axo-extra="1" data-axo-mock-topics="1" data-axo-path="${rel}" style="padding-bottom:48px;">
    <div class="container">
      <article lang="${lang}" data-axo-lang="${lang}" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
        <h2 style="margin-top:0; color:var(--ink,#0f172a);">${heading}</h2>
        <p lang="${lang}">${intro}</p>
        <ul style="margin:8px 0 0 20px; line-height:1.9;">
${items}
        </ul>
      </article>
    </div>
  </section>`;

    const mainEnd = html.lastIndexOf("</main>");
    if (mainEnd < 0) continue;
    changed++;
    if (!DRY) fs.writeFileSync(file, html.slice(0, mainEnd + 7) + block + html.slice(mainEnd + 7));
  }
}

console.log(`mock hubs given topic links: ${changed}`);
