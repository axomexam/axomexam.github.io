#!/usr/bin/env node
"use strict";

/*
 * fix-current-affairs-seo.js
 *
 * Brings every page under /current-affairs/ up to the same technical SEO
 * baseline as the rest of the site. The Current Affairs pages are generated
 * separately and were missing the head signals that all other pages carry:
 *
 *   - Google Analytics (gtag.js) snippet
 *   - RSS <link rel="alternate">
 *   - rich robots meta (max-image-preview / max-snippet / max-video-preview)
 *   - og:image:type
 *   - deferred app scripts
 *   - WebPage JSON-LD enrichment (publisher, primaryImageOfPage, breadcrumb,
 *     datePublished, dateModified, isAccessibleForFree, speakable)
 *   - BreadcrumbList JSON-LD
 *   - ItemList JSON-LD for the Current Affairs hub
 *
 * The script is additive and idempotent, so it can be re-run after
 * scripts/build-current-affairs-content.js without creating duplicates.
 *
 * Usage:
 *   node scripts/fix-current-affairs-seo.js          # apply
 *   node scripts/fix-current-affairs-seo.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SITE = "https://axomexam.in";
const GA_ID = "G-PBPXK2Q799";
const GA_MARKER = "googletagmanager.com/gtag/js";
const RICH_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const CA_DIR = path.join(ROOT, "current-affairs");
const CA_DATA = path.join(ROOT, "data", "current-affairs");

const LD_RE =
  /(<script[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi;

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeForScript(json) {
  return json.replace(/<\/(script)/gi, "<\\/$1");
}

function normalize(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    u.search = "";
    return u.pathname.replace(/\/+$/, "") + "/";
  } catch (e) {
    return String(url).replace(/\/+$/, "") + "/";
  }
}

function readSitemapDates() {
  const map = new Map();
  const file = path.join(ROOT, "sitemap.xml");
  if (!fs.existsSync(file)) return map;
  const xml = fs.readFileSync(file, "utf8");
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const block of blocks) {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    const lastmod = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
    if (!loc || !lastmod) continue;
    map.set(normalize(loc), lastmod.trim());
  }
  return map;
}

function caFiles() {
  const files = [path.join(CA_DIR, "index.html")];
  for (const entry of fs.readdirSync(CA_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(CA_DIR, entry.name, "index.html");
    if (fs.existsSync(file)) files.push(file);
  }
  return files;
}

function catInfo(catId) {
  if (catId === "index") return { id: "index", name: "Free Current Affairs" };
  const meta = readJson(path.join(CA_DATA, catId, "index.json"));
  const name = (meta && meta.title && meta.title.en) || catId;
  return { id: catId, name };
}

function gaSnippet() {
  return (
    "  <!-- Google tag (gtag.js) -->\n" +
    `  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>\n` +
    "  <script>\n" +
    "    window.dataLayer = window.dataLayer || [];\n" +
    "    function gtag(){dataLayer.push(arguments);}\n" +
    "    gtag('js', new Date());\n" +
    `    gtag('config', '${GA_ID}');\n` +
    "  </script>"
  );
}

function breadcrumbNode(canonical, catId, catName) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
  ];
  if (catId === "index") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Free Current Affairs",
      item: SITE + "/current-affairs/",
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Free Current Affairs",
      item: SITE + "/current-affairs/",
    });
    items.push({
      "@type": "ListItem",
      position: 3,
      name: catName,
      item: canonical,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": canonical + "#breadcrumb",
    itemListElement: items,
  };
}

function itemListNode(canonical, catName, date) {
  const idx = readJson(path.join(CA_DATA, "index.json"));
  const cats = (idx && Array.isArray(idx.categories) ? idx.categories : []).map(
    (c) => ({
      id: c.id,
      name: (c.title && c.title.en) || c.id,
    })
  );
  if (!cats.length) return null;
  const node = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": canonical + "#itemlist",
    name: catName,
    isAccessibleForFree: true,
    inLanguage: ["en", "as"],
    author: { "@id": SITE + "/#organization" },
    publisher: { "@id": SITE + "/#organization" },
    numberOfItems: cats.length,
    itemListElement: cats.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: SITE + "/current-affairs/" + c.id + "/",
    })),
  };
  if (date) {
    node.datePublished = date;
    node.dateModified = date;
  }
  return node;
}

function processFile(file, dates, stats) {
  const html = fs.readFileSync(file, "utf8");
  const relDir = path
    .relative(CA_DIR, path.dirname(file))
    .replace(/\\/g, "/");
  const catId = relDir === "" ? "index" : relDir;
  const { name: catName } = catInfo(catId);

  const cm = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  );
  const canonical =
    (cm && cm[1]) ||
    SITE + "/current-affairs/" + (catId === "index" ? "" : catId + "/");

  const date =
    dates.get(normalize(canonical)) || dates.get(normalize(SITE + "/"));

  let out = html;
  let changed = false;
  const before = out;

  // 1. Google Analytics
  if (!out.includes(GA_ID) && !out.includes(GA_MARKER)) {
    out = out.replace(/(<head[^>]*>)/i, (m) => m + "\n" + gaSnippet());
  }

  // 2. RSS alternate link
  if (!/application\/rss\+xml/i.test(out)) {
    out = out.replace(
      /<\/head>/i,
      '  <link rel="alternate" type="application/rss+xml" title="axomexam - Latest Study Material" href="/feed.xml" />\n</head>'
    );
  }

  // 3. Rich robots meta
  out = out.replace(
    /<meta name="robots" content="index, follow"\s*\/>/i,
    `<meta name="robots" content="${RICH_ROBOTS}" />`
  );

  // 4. og:image:type
  if (!/property="og:image:type"/.test(out)) {
    out = out.replace(
      /(<meta property="og:image" content="[^"]*"[^>]*>)/i,
      '$1\n  <meta property="og:image:type" content="image/png" />'
    );
  }

  // 5. Defer app scripts
  out = out.replace(
    /<script src="(\/js\/(?:config|i18n|api|app)\.js[^"]*)"><\/script>/gi,
    '<script src="$1" defer></script>'
  );

  // 6. Enrich the WebPage JSON-LD node
  out = out.replace(LD_RE, (full, open, body, close) => {
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      return full;
    }
    if (data["@graph"]) return full;
    const type = Array.isArray(data["@type"]) ? data["@type"][0] : data["@type"];
    if (type !== "WebPage") return full;

    data["@id"] = canonical + "#webpage";
    data.url = canonical;
    data.isPartOf = { "@id": SITE + "/#website" };
    data.publisher = { "@id": SITE + "/#organization" };
    data.primaryImageOfPage = {
      "@type": "ImageObject",
      url: SITE + "/og-image.png",
    };
    data.breadcrumb = { "@id": canonical + "#breadcrumb" };
    if (date) {
      if (!data.datePublished) data.datePublished = date;
      data.dateModified = date;
    }
    data.isAccessibleForFree = true;
    data.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".page-desc"],
    };
    return open + escapeForScript(JSON.stringify(data)) + close;
  });

  // 7. BreadcrumbList (idempotent via marker)
  const bc = breadcrumbNode(canonical, catId, catName);
  const bcBlock =
    "  <!-- ca-breadcrumb -->\n" +
    '  <script type="application/ld+json">' +
    escapeForScript(JSON.stringify(bc)) +
    "</script>\n" +
    "  <!-- /ca-breadcrumb -->";
  if (/<!-- ca-breadcrumb -->/.test(out)) {
    out = out.replace(
      /  <!-- ca-breadcrumb -->[\s\S]*?<!-- \/ca-breadcrumb -->/,
      bcBlock
    );
  } else {
    out = out.replace(/<\/head>/i, bcBlock + "\n</head>");
  }

  // 8. ItemList on the hub page (idempotent via marker)
  if (catId === "index") {
    const il = itemListNode(canonical, catName, date);
    if (il) {
      const ilBlock =
        "  <!-- ca-itemlist -->\n" +
        '  <script type="application/ld+json">' +
        escapeForScript(JSON.stringify(il)) +
        "</script>\n" +
        "  <!-- /ca-itemlist -->";
      if (/<!-- ca-itemlist -->/.test(out)) {
        out = out.replace(
          /  <!-- ca-itemlist -->[\s\S]*?<!-- \/ca-itemlist -->/,
          ilBlock
        );
      } else {
        out = out.replace(/<\/head>/i, ilBlock + "\n</head>");
      }
    }
  }

  changed = out !== before;
  if (changed) {
    stats.changed.push(path.relative(ROOT, file));
    if (!CHECK) fs.writeFileSync(file, out, "utf8");
  } else {
    stats.unchanged++;
  }
}

function main() {
  const dates = readSitemapDates();
  const files = caFiles();
  const stats = { changed: [], unchanged: 0 };
  for (const file of files) processFile(file, dates, stats);

  console.log(`Current Affairs SEO fix (${CHECK ? "check" : "apply"})`);
  console.log(`  pages scanned : ${files.length}`);
  console.log(`  pages updated : ${stats.changed.length}`);
  console.log(`  already ok    : ${stats.unchanged}`);
  if (stats.changed.length) {
    for (const f of stats.changed) console.log(`    - ${f}`);
  }
}

main();
