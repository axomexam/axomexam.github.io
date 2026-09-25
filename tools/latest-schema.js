#!/usr/bin/env node
/* ============================================================
   axomexam — tools/latest-schema.js

   Rebuilds the JSON-LD of every deployed page so that it only
   contains structured data types that Google Search currently
   supports (search-gallery, last reviewed 2026), and removes
   every retired / no-longer-supported type.

   RETIRED (removed):  FAQPage, HowTo, PracticeProblems,
                       SitelinksSearchBox (WebSite.potentialAction)
   KEPT (supported):   BreadcrumbList, Organization, WebSite,
                       ContactPage, AboutPage
   ADDED (supported):  EducationQ&A (Quiz + Question/Flashcard),
                       LearningResource, Book, SoftwareApplication,
                       ItemList / CollectionPage

   The script is idempotent: it strips every application/ld+json
   block it finds and rebuilds one @graph per page, so it can be
   run again after any rebuild without stacking duplicates.

   Usage:
     node tools/latest-schema.js --dry-run
     node tools/latest-schema.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://axomexam.in";
const SITE_NAME = "axomexam";
const DRY = process.argv.includes("--dry-run");
const ORG_ID = BASE + "/#organization";
const SITE_ID = BASE + "/#website";

const SKIP_DIRS = new Set([".git", "dist", "js", "css", "data", "tools", "node_modules", "images", "app"]);

/* ---------------- helpers ---------------- */

function decodeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripTags(s) {
  return decodeHtml(String(s || "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function truncate(s, n) {
  const str = String(s || "").replace(/\s+/g, " ").trim();
  return str.length > n ? str.slice(0, n - 1).trim() + "…" : str;
}

function getAttr(html, re) {
  const m = html.match(re);
  return m ? decodeHtml(m[1]) : "";
}

function absUrl(u) {
  if (!u) return "";
  if (/^https?:/i.test(u)) return u;
  return BASE + (u.startsWith("/") ? u : "/" + u);
}

function normUrl(u) {
  if (!u) return "";
  return u.endsWith("/") ? u : u + "/";
}

function routeOf(rel) {
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/\/index\.html$/, "");
}

/* ---------------- parse existing structured data ---------------- */

function jsonLdNodes(html) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      continue;
    }
    const items = Array.isArray(data) ? data : [data];
    for (const it of items) {
      if (!it || typeof it !== "object") continue;
      if (Array.isArray(it["@graph"])) out.push(...it["@graph"]);
      else out.push(it);
    }
  }
  return out;
}

function readBreadcrumb(html) {
  const nodes = jsonLdNodes(html);
  const bc = nodes.find((n) => n && n["@type"] === "BreadcrumbList");
  if (!bc || !Array.isArray(bc.itemListElement)) return [];
  return bc.itemListElement
    .filter((x) => x && x.name)
    .map((x) => ({ name: String(x.name), item: x.item ? String(x.item) : "" }));
}

function readPageTypes(html) {
  const nodes = jsonLdNodes(html);
  const types = nodes.map((n) => n && n["@type"]).filter(Boolean);
  return types;
}

/* ---------------- visible content extraction ---------------- */

/* Education Q&A flashcards: the topic pages render every Q/A in
   .qa-item blocks that are visible in the HTML. */
function extractFlashcards(html) {
  const cards = [];
  const parts = html.split('<div class="qa-item"');
  parts.shift();
  for (const p of parts) {
    const qm = p.match(/<div lang="en" style="font-weight:800;[^"]*">([\s\S]*?)<\/div>/);
    if (!qm) continue;
    const q = stripTags(qm[1]).replace(/^Q\d+\.\s*/, "");
    const am = p.match(/<strong>Answer:<\/strong>([\s\S]*?)<\/div>/);
    const a = am ? stripTags(am[1]) : "";
    if (q && a) cards.push({ q: truncate(q, 300), a: truncate(a, 500) });
  }
  return cards;
}

/* Child page links visible on a listing page -> ItemList */
const CHILD_PREFIXES = ["/category/", "/topic/", "/mock-test/", "/exams/", "/ebooks/", "/previous-year/", "/trending/"];
function extractChildItems(html, route) {
  const seen = new Set();
  const items = [];
  const re = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!CHILD_PREFIXES.some((p) => clean.startsWith(p))) continue;
    if (route !== "/" && !clean.startsWith(route + "/")) continue;
    if (clean === route || clean === route + "/") continue;
    const key = normUrl(clean);
    if (seen.has(key)) continue;
    seen.add(key);
    const name = stripTags(m[2]);
    if (!name) continue;
    items.push({ url: key, name: truncate(name, 120) });
    if (items.length >= 50) break;
  }
  return items;
}

function extractUpdated(html) {
  const m = html.match(/(?:Updated|Last updated)\s*:?\s*(\d{4}-\d{2}-\d{2})/i);
  return m ? m[1] : "";
}

/* ---------------- page classification ---------------- */

function pageKind(route) {
  if (route === "/") return "home";
  const seg = route.replace(/^\/+/, "").split("/");
  switch (seg[0]) {
    case "category":
    case "categories":
      return "listing";
    case "topic":
      return "topic";
    case "mock-test":
      return "mocktest";
    case "exams":
      return "exam";
    case "ebooks":
      return "ebook";
    case "previous-year":
      return "prevyear";
    case "download-app":
      return "app";
    default:
      return "page";
  }
}

function subjectFromBreadcrumb(bc) {
  const names = bc
    .map((x) => x.name)
    .filter((n) => n && !/^home$/i.test(n) && !/^mock test$/i.test(n) && !/^your exams$/i.test(n) && !/^e-?books?$/i.test(n) && !/^previous year$/i.test(n));
  if (names.length >= 2) return names[names.length - 2];
  if (names.length === 1) return names[0];
  return "";
}

/* ---------------- graph builders ---------------- */

function pageNode({ url, type, title, description, image, mainId, breadcrumbId, updated }) {
  const node = {
    "@type": type,
    "@id": url + "#webpage",
    url: url,
    name: title,
    inLanguage: ["en", "as"],
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
  };
  if (description) node.description = description;
  if (image) node.primaryImageOfPage = { "@type": "ImageObject", url: image };
  if (breadcrumbId) node.breadcrumb = { "@id": breadcrumbId };
  if (mainId) node.mainEntity = { "@id": mainId };
  if (updated) node.dateModified = updated;
  return node;
}

function breadcrumbNode(url, bc) {
  const items = bc.map((x, i) => {
    const li = { "@type": "ListItem", position: i + 1, name: x.name };
    if (x.item) li.item = x.item.startsWith("http") ? x.item : absUrl(x.item);
    return li;
  });
  return { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", itemListElement: items };
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "axomexam.in - Assam Competitive Exam Preparation",
    url: BASE + "/",
    description:
      "Free bilingual (Assamese and English) mock tests, previous year papers and PDF notes for ADRE 2.0 & 3.0, APSC, Assam Police, DHS, SSC and Railway.",
    logo: { "@type": "ImageObject", url: BASE + "/og-image.png", width: 1200, height: 630 },
    sameAs: ["https://github.com/axomexam/axomexam.github.io"],
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Assam Direct Recruitment Examination (ADRE)",
      "Assam Public Service Commission (APSC)",
      "Assam Police / SLPRB",
      "General Knowledge",
      "Reasoning",
      "Mathematics",
      "English",
      "General Science",
      "Computer Awareness",
      "Current Affairs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: BASE + "/contact/",
    },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: BASE + "/",
    name: SITE_NAME,
    inLanguage: ["en", "as"],
    publisher: { "@id": ORG_ID },
  };
}

function quizNode(url, title, description, subject, cards) {
  const alignment = [];
  if (subject) alignment.push({ "@type": "AlignmentObject", alignmentType: "educationalSubject", targetName: subject });
  alignment.push({ "@type": "AlignmentObject", alignmentType: "educationalLevel", targetName: "Competitive exams" });
  return {
    "@type": "Quiz",
    "@id": url + "#quiz",
    name: title,
    description: description || undefined,
    about: subject ? { "@type": "Thing", name: subject } : undefined,
    educationalAlignment: alignment,
    inLanguage: ["en", "as"],
    hasPart: cards.map((c) => ({
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: c.q,
      acceptedAnswer: { "@type": "Answer", text: c.a },
    })),
  };
}

function learningResourceNode(url, title, description, subject, lrType, updated) {
  return {
    "@type": "LearningResource",
    "@id": url + "#learningresource",
    name: title,
    description: description || undefined,
    learningResourceType: lrType,
    educationalLevel: "Competitive exams",
    teaches: subject || undefined,
    about: subject ? { "@type": "Thing", name: subject } : undefined,
    inLanguage: ["en", "as"],
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
    dateModified: updated || undefined,
  };
}

function bookNode(url, title, description, image, updated) {
  return {
    "@type": "Book",
    "@id": url + "#book",
    name: title,
    description: description || undefined,
    inLanguage: ["en", "as"],
    bookFormat: "https://schema.org/EBook",
    author: { "@type": "Organization", name: "axomexam Study Team" },
    publisher: { "@id": ORG_ID },
    url: url,
    image: image || undefined,
    dateModified: updated || undefined,
  };
}

function appNode(url, html, title, description) {
  const apk = (html.match(/href="([^"]+\.apk)"/i) || [])[1] || "";
  const ver = (apk.match(/v?(\d+\.\d+(?:\.\d+)?)/) || [])[1] || "";
  return {
    "@type": "SoftwareApplication",
    "@id": url + "#app",
    name: SITE_NAME,
    description: description || undefined,
    operatingSystem: "Android",
    applicationCategory: "EducationalApplication",
    inLanguage: ["en", "as"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    softwareVersion: ver || undefined,
    downloadUrl: apk ? absUrl(apk) : undefined,
    url: url,
    publisher: { "@id": ORG_ID },
  };
}

function itemListNode(url, title, children) {
  return {
    "@type": "ItemList",
    "@id": url + "#itemlist",
    name: title,
    numberOfItems: children.length,
    itemListElement: children.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: c.url,
    })),
  };
}

/* ---------------- page transform ---------------- */

function buildGraph(html, rel) {
  const route = routeOf(rel);
  const canonical = getAttr(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) return null;
  const url = normUrl(canonical);
  const title = getAttr(html, /<title>([\s\S]*?)<\/title>/) || SITE_NAME;
  const description = getAttr(html, /<meta name="description" content="([^"]*)"/);
  const image = getAttr(html, /<meta property="og:image" content="([^"]*)"/);
  const updated = extractUpdated(html);
  const bc = readBreadcrumb(html);
  const kind = pageKind(route);
  const existingTypes = readPageTypes(html);

  const graph = [];
  const breadcrumbId = bc.length ? url + "#breadcrumb" : "";

  if (kind === "home") {
    graph.push(organizationNode(), websiteNode());
    graph.push(pageNode({ url, type: "WebPage", title, description, image, updated }));
    if (bc.length) graph.push(breadcrumbNode(url, bc));
  } else {
    let mainId = "";
    let pageType = "WebPage";

    if (kind === "listing") {
      pageType = "CollectionPage";
      const children = extractChildItems(html, route);
      if (children.length) {
        graphIfItemList(graph, url, title, children, (id) => (mainId = id));
        mainId = url + "#itemlist";
      }
    } else if (kind === "topic") {
      const cards = extractFlashcards(html);
      if (cards.length) {
        graph.push(quizNode(url, title, description, subjectFromBreadcrumb(bc), cards));
        mainId = url + "#quiz";
      }
      pageType = "WebPage";
    } else if (kind === "mocktest") {
      graph.push(learningResourceNode(url, title, description, subjectFromBreadcrumb(bc), "Mock Test", updated));
      mainId = url + "#learningresource";
    } else if (kind === "exam") {
      graph.push(learningResourceNode(url, title, description, subjectFromBreadcrumb(bc), "Exam question bank", updated));
      mainId = url + "#learningresource";
      const children = extractChildItems(html, route);
      if (children.length) graph.push(itemListNode(url, title, children));
    } else if (kind === "prevyear") {
      graph.push(learningResourceNode(url, title, description, subjectFromBreadcrumb(bc), "Previous year question paper", updated));
      mainId = url + "#learningresource";
    } else if (kind === "ebook") {
      graph.push(bookNode(url, title, description, image, updated));
      mainId = url + "#book";
    } else if (kind === "app") {
      graph.push(appNode(url, html, title, description));
      mainId = url + "#app";
    }

    if (existingTypes.includes("AboutPage")) pageType = "AboutPage";
    if (existingTypes.includes("ContactPage")) pageType = "ContactPage";

    graph.unshift(pageNode({ url, type: pageType, title, description, image, mainId, breadcrumbId, updated }));
    if (bc.length) graph.push(breadcrumbNode(url, bc));
  }

  return { "@context": "https://schema.org", "@graph": graph.filter(Boolean) };
}

function graphIfItemList(graph, url, title, children, setMain) {
  if (!children.length) return;
  graph.push(itemListNode(url, title, children));
  setMain(url + "#itemlist");
}

function transform(html, rel) {
  const graph = buildGraph(html, rel);
  if (!graph) return { html, changed: false, kind: "skip" };
  const stripped = html.replace(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\r?\n?/g, "");
  if (!stripped.includes("</head>")) return { html, changed: false, kind: "skip" };
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  const block = `  <script type="application/ld+json">${json}</script>\n</head>`;
  /* Use a function so that "$" sequences inside question text are not
     interpreted as String.replace() patterns ($&, $', $`, $n). */
  const out = stripped.replace("</head>", () => block);
  return { html: out, changed: out !== html, kind: pageKind(routeOf(rel)) };
}

/* ---------------- walk ---------------- */

let scanned = 0, updated = 0, skipped = 0;
const byKind = {};

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full);
    } else if (e.name.endsWith(".html")) {
      scanned++;
      const html = fs.readFileSync(full, "utf8");
      const res = transform(html, rel.split(path.sep).join("/"));
      if (res.kind === "skip") {
        skipped++;
        continue;
      }
      byKind[res.kind] = (byKind[res.kind] || 0) + 1;
      if (res.changed) {
        updated++;
        if (!DRY) fs.writeFileSync(full, res.html, "utf8");
      }
    }
  }
}

walk(ROOT);

console.log(`${DRY ? "[dry-run] " : ""}Scanned: ${scanned}  Updated: ${updated}  Skipped: ${skipped}`);
console.log("By page kind:", JSON.stringify(byKind));
