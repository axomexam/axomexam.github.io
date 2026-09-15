#!/usr/bin/env node
/* ============================================================
   axomexam — tools/enhance-meta.js

   Bilingual SEO enhancer for the ALREADY-PRERENDERED HTML pages
   that are deployed from the repo root.

   Why this exists instead of just running tools/prerender.js:
     The deployed HTML was produced by a newer build of the site
     than the copy of tools/prerender.js committed here. Running
     that script today would overwrite hand-tuned titles/keywords
     and drop questions for the 75 content files still using the
     legacy question format. So this script repairs the existing
     pages in place and never touches <body> content.

   What it adds to every indexable page (idempotent):
     - <meta name="description" lang="as"> (Assamese description)
     - <meta name="keywords" lang="as"> where Assamese tags exist
     - <meta property="og:locale:alternate" content="as_IN">
     - a WebPage JSON-LD node with inLanguage: ["en", "as"]
     - duplicate JSON-LD blocks (e.g. two identical FAQPage) removed
     - lang="en" / lang="as" on question and answer text

   NOTE on hreflang: every page serves English + Assamese on the
   SAME url, so hreflang would only point back at itself and be
   ignored by Google. The correct signals for a single bilingual
   url are <html lang>, og:locale:alternate and schema inLanguage,
   which is what this script writes.

   Usage:
     node tools/enhance-meta.js
     node tools/enhance-meta.js --dry-run
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://axomexam.in";
const DRY = process.argv.includes("--dry-run");

const AS_HOME =
  "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক প্ৰশ্ন-উত্তৰ, মক টেষ্ট আৰু PDF নোট — ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে।";
const AS_TOPIC_TAIL =
  "অসমৰ ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে দ্বিভাষিক প্ৰশ্ন-উত্তৰ — বিনামূলীয়া।";
const AS_CATEGORY_TAIL =
  "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে দ্বিভাষিক প্ৰশ্ন-উত্তৰ, মক টেষ্ট আৰু PDF নোট — ADRE, APSC, অসম আৰক্ষী, SSC, ৰে'লৱে।";
const AS_GENERIC =
  "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক অধ্যয়ন সামগ্ৰী — ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে।";

/* ---------------- helpers ---------------- */

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function truncate(s, n) {
  const str = String(s || "").replace(/\s+/g, " ").trim();
  return str.length > n ? str.slice(0, n - 1).trim() + "…" : str;
}

/* ---------------- build route -> Assamese name map ---------------- */

const asNameByRoute = {}; // "/topic/gk/..." -> "দানৱ বংশ"

const catsData = readJSON(path.join(ROOT, "data", "sample", "categories.json"));
const RAW_CATS = (catsData && catsData.categories) || [];

function nameAs(obj) {
  if (obj && obj.name && obj.name.as) return obj.name.as;
  if (obj && typeof obj.name === "string") return obj.name;
  return "";
}

function walkCat(cat) {
  asNameByRoute[`/category/${cat.id}`] = nameAs(cat);
  const subs = cat.subcategories || [];
  const secs = cat.sections || [];
  if (subs.length) {
    for (const sub of subs) {
      asNameByRoute[`/category/${cat.id}/${sub.id}`] = nameAs(sub);
      asNameByRoute[`/mock-test/${cat.id}/${sub.id}`] = nameAs(sub);
      const subSecs = sub.sections || [];
      if (subSecs.length) {
        for (const sec of subSecs) {
          asNameByRoute[`/category/${cat.id}/${sub.id}/${sec.id}`] = nameAs(sec);
          asNameByRoute[`/mock-test/${cat.id}/${sub.id}/${sec.id}`] = nameAs(sec);
          for (const tp of sec.topics || []) {
            asNameByRoute[`/topic/${cat.id}/${sub.id}/${sec.id}/${tp.id}`] = nameAs(tp);
          }
        }
      } else {
        for (const tp of sub.topics || []) {
          asNameByRoute[`/topic/${cat.id}/${sub.id}/${tp.id}`] = nameAs(tp);
        }
      }
    }
  } else if (secs.length) {
    for (const sec of secs) {
      asNameByRoute[`/category/${cat.id}/${sec.id}`] = nameAs(sec);
      asNameByRoute[`/mock-test/${cat.id}/${sec.id}`] = nameAs(sec);
      for (const tp of sec.topics || []) {
        asNameByRoute[`/topic/${cat.id}/${sec.id}/${tp.id}`] = nameAs(tp);
      }
    }
  } else {
    for (const tp of cat.topics || []) {
      asNameByRoute[`/topic/${cat.id}/${tp.id}`] = nameAs(tp);
    }
  }
  asNameByRoute[`/mock-test/${cat.id}`] = nameAs(cat);
}
RAW_CATS.forEach(walkCat);

/* trending topics */
try {
  const dir = path.join(ROOT, "data", "sample", "trending-topics");
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    const d = readJSON(path.join(dir, f));
    if (!d) continue;
    const id = d.id || f.replace(/\.json$/, "");
    const nm = d.name && d.name.as ? d.name.as : d.title && d.title.as ? d.title.as : "";
    if (nm) asNameByRoute[`/topic/trending/${id}`] = nm;
  }
} catch (e) {}

/* e-books */
const asBookByRoute = {};
try {
  const dir = path.join(ROOT, "data", "books");
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    const d = readJSON(path.join(dir, f));
    if (!d || !d.id) continue;
    const descAs =
      d.description && d.description.as
        ? d.description.as
        : d.description && d.description.en
        ? d.description.en
        : "";
    asBookByRoute[`/ebooks/${d.id}`] = descAs;
  }
} catch (e) {}

/* ---------------- topic content (for Assamese description/tags) ---------------- */

function findContentFile(catId, topicId) {
  const base = path.join(ROOT, "data", "sample", "content");
  const stack = [path.join(base, catId)];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      continue;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.name === topicId + ".json") return full;
    }
  }
  return null;
}

const topicMetaCache = {};
function topicMeta(catId, topicId) {
  const key = catId + "/" + topicId;
  if (key in topicMetaCache) return topicMetaCache[key];
  const file = findContentFile(catId, topicId);
  const data = file ? readJSON(file) : null;
  let descAs = "";
  let tagsAs = "";
  if (data) {
    if (data.description && data.description.as) descAs = data.description.as;
    if (Array.isArray(data.tags)) {
      tagsAs = data.tags.filter((t) => /[\u0980-\u09FF]/.test(String(t))).join(", ");
    }
    if (!descAs && data.questions && data.questions[0]) {
      const q0 = data.questions[0];
      const qAs = (q0.q && q0.q.as) || q0.question_as || "";
      if (qAs) descAs = qAs;
    }
  }
  topicMetaCache[key] = { descAs, tagsAs };
  return topicMetaCache[key];
}

/* ---------------- per-page Assamese description ---------------- */

function routeFromFile(rel) {
  if (rel === "index.html") return "/";
  const dir = rel.replace(/\/index\.html$/, "");
  return "/" + dir;
}

function assameseFor(route, canonical) {
  let r = route;
  if (canonical) {
    try {
      r = new URL(canonical).pathname.replace(/\/+$/, "") || "/";
    } catch (e) {}
  }
  if (r === "/" || r === "") return { desc: AS_HOME, tags: "" };

  if (r.startsWith("/topic/")) {
    const rest = r.slice("/topic/".length).split("/");
    const catId = rest[0];
    const topicId = rest[rest.length - 1];
    const nm = asNameByRoute[r] || "";
    const meta = topicMeta(catId, topicId);
    const desc = meta.descAs
      ? `${nm ? nm + " — " : ""}${truncate(meta.descAs, 150)} ${AS_TOPIC_TAIL}`
      : nm
      ? `${nm} — ${AS_TOPIC_TAIL}`
      : AS_GENERIC;
    return { desc: truncate(desc, 300), tags: meta.tagsAs };
  }

  if (r.startsWith("/mock-test/")) {
    const nm = asNameByRoute[r] || "";
    return {
      desc: nm
        ? `${nm} — অসমৰ ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া সময়সীমাযুক্ত মক টেষ্ট, তাৎক্ষণিক ফলাফলৰ সৈতে।`
        : `অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক মক টেষ্ট — ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে।`,
      tags: "",
    };
  }

  if (r.startsWith("/category/")) {
    const nm = asNameByRoute[r] || "";
    return {
      desc: nm ? `${nm} — ${AS_CATEGORY_TAIL}` : AS_GENERIC,
      tags: "",
    };
  }

  if (r.startsWith("/ebooks/")) {
    const d = asBookByRoute[r] || "";
    return {
      desc: d
        ? `${truncate(d, 180)} অনলাইনত বিনামূলীয়াকৈ পঢ়ক (ইংৰাজী আৰু অসমীয়া)।`
        : `অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক ই-বুক — অনলাইনত পঢ়ক।`,
      tags: "",
    };
  }

  if (r.startsWith("/previous-year")) {
    return {
      desc: `অসম আৰু কেন্দ্ৰীয় চৰকাৰী পৰীক্ষাৰ আগৰ বছৰৰ প্ৰশ্নকাকত (PDF) বিনামূলীয়াকৈ ডাউনলোড কৰক — ADRE, APSC, অসম আৰক্ষী, SSC, ৰে'লৱে।`,
      tags: "",
    };
  }

  if (r === "/search") {
    return { desc: `axomexam.in ত অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰশ্ন, বিষয় আৰু কীৱাৰ্ড সন্ধান কৰক।`, tags: "" };
  }
  if (r.startsWith("/downloads")) {
    return { desc: `অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া PDF নোট আৰু অধ্যয়ন সামগ্ৰী ডাউনলোড কৰক।`, tags: "" };
  }
  return { desc: AS_GENERIC, tags: "" };
}

/* ---------------- html transforms ---------------- */

function getAttr(html, re) {
  const m = html.match(re);
  return m ? decodeHtml(m[1]) : "";
}

function removeDuplicateJsonLd(html) {
  const seen = new Set();
  return html.replace(
    /[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g,
    (block) => {
      const key = block.replace(/\s+/g, " ").trim();
      if (seen.has(key)) return "";
      seen.add(key);
      return block;
    }
  );
}

function addLangToQA(html) {
  return html
    .replace(
      /<div style="font-weight:800; font-size:1\.02rem; line-height:1\.5; margin-bottom:6px;">/g,
      '<div lang="en" style="font-weight:800; font-size:1.02rem; line-height:1.5; margin-bottom:6px;">'
    )
    .replace(
      /<div style="color:#64748b; font-size:0\.9rem; line-height:1\.6; margin-bottom:8px;">/g,
      '<div lang="as" style="color:#64748b; font-size:0.9rem; line-height:1.6; margin-bottom:8px;">'
    )
    .replace(
      /<div style="margin-top:8px;"><strong>Answer:<\/strong>/g,
      '<div lang="en" style="margin-top:8px;"><strong>Answer:</strong>'
    )
    .replace(
      /<div style="color:#64748b; font-size:0\.9rem;">/g,
      '<div lang="as" style="color:#64748b; font-size:0.9rem;">'
    );
}

function enhance(html, rel) {
  const route = routeFromFile(rel);
  const canonical = getAttr(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) return { html, changed: false }; // skip 404/redirect stubs without canonical
  const url = canonical.endsWith("/") ? canonical : canonical + "/";
  const title = decodeHtml(getAttr(html, /<title>([\s\S]*?)<\/title>/));
  const { desc, tags } = assameseFor(route, canonical);

  let out = html;
  let changed = false;

  // 1. Assamese description meta (insert or refresh)
  const asDescRe = /<meta name="description" lang="as" content="[^"]*"\s*\/?>/;
  const asDescTag = `<meta name="description" lang="as" content="${escapeHtml(desc)}" />`;
  if (asDescRe.test(out)) {
    const next = out.replace(asDescRe, asDescTag);
    if (next !== out) changed = true;
    out = next;
  } else {
    const m = out.match(/<meta name="description" content="[^"]*"\s*\/?>/);
    if (m) {
      out = out.replace(m[0], m[0] + "\n  " + asDescTag);
      changed = true;
    }
  }

  // 2. Assamese keywords meta
  if (tags) {
    const asKwRe = /<meta name="keywords" lang="as" content="[^"]*"\s*\/?>/;
    const asKwTag = `<meta name="keywords" lang="as" content="${escapeHtml(tags)}" />`;
    if (asKwRe.test(out)) {
      const next = out.replace(asKwRe, asKwTag);
      if (next !== out) changed = true;
      out = next;
    } else {
      const m = out.match(/<meta name="keywords" content="[^"]*"\s*\/?>/);
      if (m) {
        out = out.replace(m[0], m[0] + "\n  " + asKwTag);
        changed = true;
      }
    }
  }

  // 3. og:locale:alternate
  if (!/og:locale:alternate/.test(out)) {
    const m = out.match(/<meta property="og:locale" content="en_IN"\s*\/?>/);
    if (m) {
      out = out.replace(m[0], m[0] + `\n  <meta property="og:locale:alternate" content="as_IN" />`);
      changed = true;
    }
  }

  // 4. WebPage JSON-LD with inLanguage
  const webId = url + "#webpage";
  if (!out.includes(webId)) {
    const json = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webId,
      url: url,
      name: title,
      inLanguage: ["en", "as"],
      isPartOf: {
        "@type": "WebSite",
        "@id": BASE + "/#website",
        url: BASE + "/",
        name: "axomexam",
      },
    }).replace(/</g, "\\u003c");
    const block = `  <script type="application/ld+json">${json}</script>\n</head>`;
    out = out.replace("</head>", block);
    changed = true;
  }

  // 5. drop duplicate JSON-LD (the deployed pages carry two identical FAQPage)
  const deduped = removeDuplicateJsonLd(out);
  if (deduped !== out) {
    out = deduped;
    changed = true;
  }

  // 6. language attributes on question/answer text
  const langed = addLangToQA(out);
  if (langed !== out) {
    out = langed;
    changed = true;
  }

  return { html: out, changed };
}

/* ---------------- walk ---------------- */

const SKIP_DIRS = new Set([".git", "dist", "js", "css", "data", "tools", "node_modules"]);
let scanned = 0;
let updated = 0;

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
      const res = enhance(html, rel.split(path.sep).join("/"));
      if (res.changed) {
        updated++;
        if (!DRY) fs.writeFileSync(full, res.html, "utf8");
      }
    }
  }
}

walk(ROOT);

console.log(`${DRY ? "[dry-run] " : ""}Scanned: ${scanned}  Updated: ${updated}`);
