#!/usr/bin/env node
"use strict";

/*
 * tools/fix-orphan-links.js
 *
 * Adds internal links to the two indexable pages that nothing on the site
 * points to.
 *
 * Problem
 * -------
 * An inbound-link scan over all 671 pages found two pages with zero internal
 * links pointing at them:
 *
 *   /category/english/grammar-vocab/   "Grammar & Vocabulary" (index, follow)
 *   /previous-year/railway/2023/       "Railway 2023 Question Paper" (index, follow)
 *
 * Both are real, indexable pages: the category page is a topic cluster, and the
 * paper page carries a working `rrb-2023.pdf` download. Because no page linked
 * to them, crawlers had no path to reach them except the sitemap, which is the
 * weakest signal a site can give. Google treats pages that only the sitemap
 * points to as low priority, and AdSense reviewers read "unlinked pages" as a
 * maintenance gap.
 *
 * The parents were inconsistent rather than deliberately silent:
 *   - `/previous-year/railway/` lists RRB NTPC, Group D and ALP, but not its own
 *     `2023` folder, even though `data/previous-year/railway/2023/rrb-2023.pdf`
 *     exists and the paper page is live.
 *   - `/category/english/` lists Parts of Speech, Grammar, Sentence Structure
 *     and Vocabulary, but not Grammar & Vocabulary, which is a mock-test topic
 *     and has its own topic cluster.
 *
 * What this tool does
 * -------------------
 * Appends one card to each parent's existing `sub-grid`, using the exact markup
 * and copy conventions the parents already use, and adds the matching entry to
 * each parent's ItemList structured data so the visible list and the schema
 * agree. Nothing else on the pages is touched.
 *
 * Idempotent: cards are added only when the href is absent.
 *
 * Usage:
 *   node tools/fix-orphan-links.js          # apply
 *   node tools/fix-orphan-links.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const BASE = "https://axomexam.in";

const CARD = (href, label, meta) =>
  `<a class="sub-card reveal" href="${href}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">\n` +
  `          <div style="font-weight:700; color:var(--ink,#0f172a);">${label}</div>\n` +
  `          <div style="font-size:0.8rem; color:#64748b;">${meta}</div>\n` +
  `        </a>`;

const TARGETS = [
  {
    file: "category/english/index.html",
    parent: `${BASE}/category/english/`,
    href: "/category/english/grammar-vocab/",
    label: "Grammar &amp; Vocabulary",
    meta: "Tenses &amp; Prepositions",
    item: { name: "Grammar & Vocabulary", url: `${BASE}/category/english/grammar-vocab/` },
  },
  {
    file: "previous-year/railway/index.html",
    parent: `${BASE}/previous-year/railway/`,
    href: "/previous-year/railway/2023/",
    label: "Railway 2023",
    meta: "Download Question Paper",
    item: { name: "Railway 2023", url: `${BASE}/previous-year/railway/2023/` },
  },
];

function addCard(html, href, card) {
  if (html.includes(`href="${href}"`)) return null;
  const grid = /<div class="sub-grid">([\s\S]*?)<\/div>\s*<\/section>/;
  const m = html.match(grid);
  if (!m) return null;
  const end = m.index + m[0].lastIndexOf("</div>");
  return html.slice(0, end) + card + html.slice(end);
}

function addListItem(html, parent, item) {
  return html.replace(
    /(<script[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (full, open, body, close) => {
      if (!/"ItemList"/.test(body)) return full;
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        return full;
      }
      const list = (data["@graph"] || []).find((n) => n && n["@type"] === "ItemList");
      if (!list || !Array.isArray(list.itemListElement)) return full;
      if (list.itemListElement.some((el) => el && el.url === item.url)) return full;
      const position = list.itemListElement.length + 1;
      list.itemListElement.push({ "@type": "ListItem", position, name: item.name, url: item.url });
      list.numberOfItems = position;
      list["@id"] = `${parent}#itemlist`;
      return open + JSON.stringify(data).replace(/<\/(script)/gi, "<\\/$1") + close;
    }
  );
}

function main() {
  const report = [];
  for (const t of TARGETS) {
    const file = path.join(ROOT, t.file);
    const before = fs.readFileSync(file, "utf8");

    let html = addCard(before, t.href, CARD(t.href, t.label, t.meta));
    if (html === null) {
      report.push(`${t.href}  already linked from ${t.file}`);
      continue;
    }
    html = addListItem(html, t.parent, t.item);

    if (!CHECK) fs.writeFileSync(file, html, "utf8");
    report.push(`${t.href}  linked from ${t.file}`);
  }

  console.log(`Orphan links (${CHECK ? "check" : "apply"})`);
  for (const line of report) console.log(`  ${line}`);
}

main();
