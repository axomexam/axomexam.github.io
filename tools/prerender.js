#!/usr/bin/env node
/* ============================================================
   axomexam — tools/prerender.js
   Static prerenderer (SSG) for Google / Bing indexing.

   Why:
     The site is a client-side SPA. Every route is rendered by
     JavaScript, so Googlebot sees an empty shell (or a GitHub
     Pages 404) for deep links like /topic/gk/... and the single
     hardcoded <link rel="canonical"> made every page look like
     the homepage. Result: deep pages never get indexed.

   What it does:
     For EVERY route of the app it generates a real static
     index.html containing:
       - unique <title>, <meta name="description">,
         <link rel="canonical">, Open Graph + JSON-LD
       - the full page content embedded in <main id="app">
     The same CSS/JS still loads, so when a human visits the
     page the SPA boots and renders the identical UI.

   Usage:
     node tools/prerender.js
     Output is written to ./dist (ready to deploy).

   No third-party dependencies. Node 14+.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DATA = path.join(ROOT, "data", "sample");
const OUT = path.join(ROOT, "dist");

const BASE = "https://axomexam.in";
const SITE_NAME = "axomexam";
const SITE_TAGLINE =
  "Free bilingual (Assamese & English) Q&A and PDF notes for competitive exams in Assam.";

/* Exam-name keyword mentions (used across Mathematics SEO pages). */
const EXAM_TITLE = "APSC, ADRE 2.0, Assam Police, SSC & Railway";
const EXAM_SENTENCE = "APSC, ADRE 2.0, Assam Police, SSC and Railway exams in Assam";
const isMathCat = (cat) => cat && cat.id === "math";

/* ================= helpers ================= */

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loc(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj.en || obj.as || "";
}

function locAs(obj) {
  if (obj == null) return "";
  if (typeof obj === "object" && !Array.isArray(obj)) return obj.as || obj.en || "";
  return "";
}

/* Convert multiline bullet-list description text into semantic HTML
   (matches the SPA's expandable "Read More" page-desc rendering). */
function descHTML(desc) {
  const lines = String(desc || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (lines.length <= 1) return escapeHtml(desc || "");
  let html = "";
  let inList = false;
  for (const line of lines) {
    const m = line.match(/^[•\-*]\s*(.*)$/);
    if (m) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += "<li>" + escapeHtml(m[1]) + "</li>";
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      html += "<p>" + escapeHtml(line) + "</p>";
    }
  }
  if (inList) html += "</ul>";
  return html;
}

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

function writeFile(relPath, content) {
  const abs = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
}

function ensureCleanDir() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
}

/* ================= data loading ================= */

const CATEGORIES_DATA = readJSON(path.join(SRC_DATA, "categories.json"));
const RAW_CATS = (CATEGORIES_DATA && CATEGORIES_DATA.categories) || [];

/* Build a topic-id -> file map per category (files may be flat or nested). */
const contentFiles = {};
(function walk(dir, catId, files) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, catId, files);
    else if (e.name.endsWith(".json")) {
      const id = e.name.replace(/\.json$/, "");
      if (!files[id]) files[id] = full;
    }
  }
})(path.join(SRC_DATA, "content"), null, ({}));

function contentFilesForCategory(catId) {
  const map = {};
  const base = path.join(SRC_DATA, "content", catId);
  try {
    for (const e of fs.readdirSync(base, { withFileTypes: true })) {
      const full = path.join(base, e.name);
      if (e.isDirectory()) {
        for (const f of fs.readdirSync(full)) {
          if (f.endsWith(".json")) {
            const id = f.replace(/\.json$/, "");
            if (!map[id]) map[id] = path.join(full, f);
          }
        }
      } else if (e.name.endsWith(".json")) {
        const id = e.name.replace(/\.json$/, "");
        if (!map[id]) map[id] = full;
      }
    }
  } catch (e) {}
  return map;
}

function readTopicContent(catId, topicId) {
  const map = contentFilesForCategory(catId);
  if (map[topicId]) return readJSON(map[topicId]);
  return null;
}

/* Trending topics */
const trendingTopics = [];
try {
  for (const f of fs.readdirSync(path.join(SRC_DATA, "trending-topics"))) {
    if (f.endsWith(".json")) {
      const d = readJSON(path.join(SRC_DATA, "trending-topics", f));
      if (d && d.id) trendingTopics.push(d);
    }
  }
} catch (e) {}

/* Load CONFIG from js/config.js (a plain JS file, not JSON) */
const vm = require("vm");
function loadConfig() {
  try {
    const src = fs.readFileSync(path.join(ROOT, "js", "config.js"), "utf8");
    const sandbox = {};
    vm.createContext(sandbox);
    const config = vm.runInContext(src + "\n; CONFIG;", sandbox);
    return config || {};
  } catch (e) {
    return {};
  }
}
const CONFIG = loadConfig();
const FALLBACK_PYEAR = (CONFIG.FALLBACK && CONFIG.FALLBACK.PYEAR) || {};
const PYEAR_EXAMS =
  (CONFIG.PYEAR_EXAMS || []).map((ex) => ({ id: ex.id, name: ex.name }));

/* Downloads */
const DOWNLOADS = (CONFIG.FALLBACK && CONFIG.FALLBACK.DOWNLOADS) || [];

/* ================= build the route tree (mirrors app.js normalize) ================= */

const categories = [];
const topicMap = {}; // path -> rec
const topicIndex = [];

function pushTopic(topic, cat, sub, section) {
  const segs = [cat.id, sub ? sub.id : "", section ? section.id : ""]
    .filter(Boolean)
    .concat([topic.id]);
  const p = segs.join("/");
  const rec = {
    path: p,
    cat, sub, section, topic,
    title: topic.title || topic.name,
    desc: topic.description,
    tags: topic.tags || [],
    nQuestions: (topic.questions || []).length,
    pdf: topic.pdf || null,
    popularity: Number(topic.popularity) || 0,
  };
  topicMap[p] = rec;
  topicIndex.push(rec);
}

for (const cat of RAW_CATS) {
  cat.name = cat.name || { en: cat.id, as: cat.id };
  cat.description = cat.description || {};
  const subs = cat.subcategories || [];
  if (subs.length) {
    for (const sub of subs) {
      sub.name = sub.name || { en: sub.id, as: sub.id };
      const secs = sub.sections || [];
      if (secs.length) {
        for (const sec of secs) {
          sec.name = sec.name || { en: sec.id, as: sec.id };
          for (const tp of sec.topics || []) pushTopic(tp, cat, sub, sec);
        }
      } else {
        for (const tp of sub.topics || []) pushTopic(tp, cat, sub, null);
      }
    }
  } else {
    const secs = cat.sections || [];
    if (secs.length) {
      for (const sec of secs) {
        sec.name = sec.name || { en: sec.id, as: sec.id };
        for (const tp of sec.topics || []) pushTopic(tp, cat, null, sec);
      }
    } else {
      for (const tp of cat.topics || []) pushTopic(tp, cat, null, null);
    }
  }
  categories.push(cat);
}

const trendingCat = {
  id: "trending",
  name: { en: "Trending Topics", as: "জনপ্ৰিয় বিষয়সমূহ" },
  color: "#f97316",
};
for (const tp of trendingTopics) {
  const p = `trending/${tp.id}`;
  topicMap[p] = {
    path: p, cat: trendingCat, sub: null, section: null, topic: tp,
    title: tp.title || tp.name, desc: tp.description,
    tags: tp.tags || [], nQuestions: (tp.questions || []).length,
    pdf: tp.pdf || null, popularity: Number(tp.popularity) || 0, extra: true,
  };
  topicIndex.push(topicMap[p]);
}

/* ================= page shell ================= */

function shellHTML({ route, title, description, canonical, keywords, body }) {
  const canonicalUrl = canonical || BASE + route;
  const ogTitle = escapeHtml(title);
  const ogDesc = escapeHtml(description);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${ogDesc}" />
  <meta name="robots" content="index, follow" />
  ${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : ""}
  <meta name="theme-color" content="#4f46e5" />
  <title>${ogTitle}</title>

  <!-- Canonical URL (unique per page) -->
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:description" content="${ogDesc}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDesc}" />

  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%234f46e5'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Fixed Absolute CSS Path -->
  <link rel="stylesheet" href="/css/style.css?v=20260826a" />

  <!-- GitHub Pages / Netlify Clean URL Single Page App Redirection Handler -->
  <script>
    (function() {
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>

  <!-- Google AdSense Script -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4574824794620382" crossorigin="anonymous"></script>

  <!-- KaTeX Math & Formula Rendering Engine -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

  <!-- Robust Zero-Blank-Page PDF Rendering Engines -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <script>
    (function () {
      try {
        var t = localStorage.getItem("axomexam-theme");
        if (t === "dark" || (!t && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      } catch (e) { }
    })();
  </script>
</head>
<body>

  <!-- ===== Preloader ===== -->
  <div id="preloader" aria-hidden="true">
    <div class="loader-logo">axomexam</div>
    <div class="loader-bar"><span></span></div>
  </div>

  <!-- ===== Header ===== -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand" aria-label="axomexam home">
        <span class="brand-mark">A</span>
        <span class="brand-text">axomexam</span>
      </a>

      <!-- Master Search + theme toggle (desktop) -->
      <div class="header-center">
        <div class="search-wrap" role="search">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="master-search" type="search" autocomplete="off" spellcheck="false"
                 placeholder="Search questions, topics, keywords..." aria-label="Search" />
          <div id="search-results" class="search-results" hidden></div>
        </div>

        <!-- Theme toggle (desktop) -->
        <button class="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9z"/></svg>
        </button>
      </div>

      <!-- Hamburger -->
      <button id="hamburger" class="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Desktop Navigation -->
    <nav class="main-nav" aria-label="Primary navigation">
      <div class="container nav-inner">
        <ul class="nav-list" id="nav-list"></ul>
      </div>
    </nav>

    <!-- Mobile App Tab Bar (in header, mobile only) -->
    <nav class="tabbar" id="tabbar" aria-label="App navigation">
      <a href="/" class="tab-item" data-tab="home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
        <span data-i18n="tab.home">Home</span>
      </a>
      <a href="/mock-test" class="tab-item" data-tab="mock">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>
        <span data-i18n="tab.mock">Mock Test</span>
      </a>
      <a href="/categories" class="tab-item" data-tab="categories">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
        <span data-i18n="tab.categories">Practice</span>
      </a>
      <a href="/search" class="tab-item" id="tab-search" data-tab="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <span data-i18n="tab.search">Search</span>
      </a>
      <button class="tab-item" id="tab-menu" data-tab="menu" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        <span data-i18n="tab.menu">Menu</span>
      </button>
    </nav>
  </header>

  <!-- ===== Mobile Menu ===== -->
  <div id="mobile-menu" class="mobile-menu" hidden>
    <div class="mobile-menu-head">
      <span class="brand-mark">A</span>
      <span class="brand-text">axomexam</span>
      <button class="theme-toggle m-theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9z"/></svg>
      </button>
      <button id="mobile-close" class="m-close" type="button" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <ul class="mobile-nav" id="mobile-nav"></ul>
  </div>
  <div id="mobile-backdrop" class="mobile-backdrop" hidden></div>

  <!-- ===== Main Content Area ===== -->
  <main id="app" class="container main">
    <noscript>
      <h1>axomexam - Assam Competitive Exam Preparation Portal</h1>
      <p>Free bilingual (Assamese & English) mock tests, previous year solved question papers, and PDF study notes for APSC, Assam Police, ADRE, SSC, and Railway exams.</p>
    </noscript>
${body}
  </main>

  <!-- ===== Footer ===== -->
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">A</span>
        <span class="brand-text">axomexam</span>
        <p id="footer-tagline" class="footer-tagline">Comprehensive Preparation Portal for Assam Competitive Examinations</p>
      </div>
      <div class="footer-links">
        <div>
          <h4 data-i18n="footer.exam">Exams</h4>
          <ul>
            <li><a href="/category/gk">APSC</a></li>
            <li><a href="/category/math">Assam Police</a></li>
            <li><a href="/category/science">SSC & Railway</a></li>
            <li><a href="/category/reasoning">DME / DTE</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer.quick">Quick Links</h4>
          <ul>
            <li><a href="/" data-i18n="footer.home">Home</a></li>
            <li><a href="/mock-test" data-i18n="nav.mock">Mock Test</a></li>
            <li><a href="/previous-year">Previous Papers</a></li>
            <li><a href="/downloads" data-i18n="nav.downloads">Downloads</a></li>
            <li><a href="/submit" data-i18n="nav.submit">Submit Q&A</a></li>
            <li><a href="/trending" data-i18n="footer.trending">Trending Topics</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer.legal">Legal & Info</h4>
          <ul>
            <li><a href="/about" data-i18n="footer.about">About Us</a></li>
            <li><a href="/contact" data-i18n="footer.contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/disclaimer">Disclaimer</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer.connect">Connect</h4>
          <ul>
            <li><a href="https://github.com/" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://t.me/" target="_blank" rel="noopener">Telegram</a></li>
            <li><a href="https://youtube.com/" target="_blank" rel="noopener">YouTube</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom container">
      <p id="footer-copy">&copy; 2026 axomexam.in. All rights reserved.</p>
    </div>
  </footer>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <!-- Fixed Absolute JS Paths -->
  <script src="/js/config.js?v=20260826a"></script>
  <script src="/js/i18n.js?v=20260826a"></script>
  <script src="/js/api.js?v=20260826a"></script>
  <script src="/js/app.js?v=20260826a"></script>
</body>
</html>
`;
}

function pageHead(breadcrumb, h1, desc) {
  return `
      <div class="page-head">
        <nav class="breadcrumb">${breadcrumb}</nav>
        <h1>${escapeHtml(h1)}</h1>
        ${desc ? `<p class="page-desc">${descHTML(desc)}</p>` : ""}
      </div>`;
}

function breadcrumbHTML(items) {
  return items
    .map((it, i) => {
      const link =
        i === items.length - 1
          ? `<span>${escapeHtml(it.label)}</span>`
          : `<a href="${it.href}">${escapeHtml(it.label)}</a>`;
      return (i ? `<span class="bc-sep">/</span>` : "") + link;
    })
    .join("");
}

function faqJSONLD(rec) {
  const content = readTopicContent(rec.cat.id, rec.topic.id) || {};
  const qs = (content.questions || rec.topic.questions || []).slice(0, 25);
  const faqs = qs
    .filter((q) => q && (q.q || q.question))
    .map((q) => {
      const qText = q.q && q.q.en ? q.q.en : q.q || q.question;
      const aText =
        (q.a && q.a.en ? q.a.en : q.a) || (q.answer && q.answer.en ? q.answer.en : q.answer) || "";
      if (!aText) return null;
      return { "@type": "Question", name: String(qText), acceptedAnswer: { "@type": "Answer", text: String(aText) } };
    })
    .filter(Boolean);
  return faqs.length
    ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs })}</script>`
    : "";
}

function breadcrumbJSONLD(items) {
  const list = items
    .filter((it) => it.href)
    .map((it, i) => {
      const item = {
        "@type": "ListItem",
        position: i + 1,
        name: it.label,
      };
      if (it.href) item.item = it.href.startsWith("http") ? it.href : BASE + it.href;
      return item;
    });
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list,
  })}</script>`;
}

/* ================= content renderers ================= */

function topicQuestionsHTML(rec) {
  const content = readTopicContent(rec.cat.id, rec.topic.id) || {};
  const qs = content.questions || rec.topic.questions || [];
  if (!qs.length) return "";
  const rows = qs
    .map((q, i) => {
      const qEn = q.q && q.q.en ? q.q.en : q.q;
      const qAs = q.q && q.q.as;
      const aEn =
        (q.a && q.a.en) || (q.answer && q.answer.en) || (typeof q.a === "string" && q.a) || "";
      const aAs = (q.a && q.a.as) || (q.answer && q.answer.as);
      const options = Array.isArray(q.options) ? q.options : null;
      return `<div class="qa-item" style="margin-bottom:22px;">
        <div style="font-weight:800; font-size:1.02rem; line-height:1.5; margin-bottom:6px;">Q${i + 1}. ${escapeHtml(String(qEn))}</div>
        ${qAs ? `<div style="color:#64748b; font-size:0.9rem; line-height:1.6; margin-bottom:8px;">${escapeHtml(String(qAs))}</div>` : ""}
        ${options ? `<div style="margin:8px 0;"><ul>${options.map((o) => `<li>${escapeHtml(loc(o))}</li>`).join("")}</ul></div>` : ""}
        <div style="margin-top:8px;"><strong>Answer:</strong> <span>${escapeHtml(String(aEn))}</span></div>
        ${aAs ? `<div style="color:#64748b; font-size:0.9rem;">${escapeHtml(String(aAs))}</div>` : ""}
      </div>`;
    })
    .join("");
  return rows;
}

function topicListHTML(cat, sub, sec, topics) {
  const rows = (topics || [])
    .map((tp) => {
      const p = [cat.id, sub ? sub.id : "", sec ? sec.id : ""]
        .filter(Boolean)
        .concat([tp.id])
        .join("/");
      const rec = topicMap[p];
      const n = rec ? rec.nQuestions : (tp.questions || []).length;
      return `<a class="sub-card reveal" href="/topic/${p}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(tp.name))}</div>
        <div style="font-size:0.8rem; color:#64748b;">${n > 0 ? n + " Questions" : "Practice"}</div>
      </a>`;
    })
    .join("");
  return `<div class="sub-grid">${rows}</div>`;
}

function emptyHTML() {
  return `<div class="qa-empty"><p>No topics available yet.</p></div>`;
}

/* ---------- page builders ---------- */

function buildHome() {
  const firstCat = (categories[0] && categories[0].id) || "gk";
  const totalQuestions = topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0);
  const trending = [...topicIndex]
    .filter((r) => r.path.startsWith("trending/") || r.popularity >= 7)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8);

  const catCards = categories
    .map((c) => {
      const count = topicIndex.filter((r) => r.cat.id === c.id).length;
      return `<a class="cat-card reveal" href="/category/${c.id}" style="--cat:${c.color || "#4f46e5"}">
        <span class="cat-meta"><b>${escapeHtml(loc(c.name))}</b><span>${count} Topics</span></span>
      </a>`;
    })
    .join("");

  const trendCards = trending
    .map((r) => `<a class="topic-card reveal" href="/topic/${r.path}">
      <b>${escapeHtml(loc(r.title))}</b>
      <span>${escapeHtml(loc(r.cat.name))} • ${r.nQuestions || 0} Questions</span>
    </a>`)
    .join("");

  const body = `
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">ADRE 2.0 / RRB</a>
          <h1>Crack Competitive Exams with Bilingual Q&A &amp; PDF Notes</h1>
          <p class="sub">Practice thousands of exam questions and download printable PDF notes in both Assamese and English — built for APSC, Assam Police, ADRE, and Central Railways.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/category/${firstCat}">Start Practicing</a>
            <a class="btn btn-ghost" href="/mock-test">Take a Mock Test</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><b>${totalQuestions.toLocaleString()}+</b><span>Questions</span></div>
            <div class="stat"><b>${topicIndex.length}+</b><span>Topics</span></div>
            <div class="stat"><b>${topicIndex.length + DOWNLOADS.length}+</b><span>PDFs</span></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal"><div><h2>Browse Categories</h2><p class="sec-sub">Practice by subject</p></div></div>
        <div class="cat-grid">${catCards}</div>
      </section>

      <section class="section">
        <div class="section-head reveal"><div><h2>Trending Topics</h2></div></div>
        <div class="topic-grid">${trendCards}</div>
      </section>`;

  return {
    html: shellHTML({
      route: "/",
      title: `axomexam | Competitive Exam Preparation for Assam (APSC, ADRE, Assam Police, SSC, Railway)`,
      description: SITE_TAGLINE,
      keywords: "competitive exam preparation, Assam exams, APSC, ADRE, Assam Police, SSC, Railway, mock test, previous year papers",
      body,
    }),
    jsonld: "",
  };
}

function buildCategoryPage(cat) {
  const crumb = breadcrumbHTML([{ href: "/", label: "Home" }, { label: loc(cat.name) }]);
  const subs = cat.subcategories || [];
  const secs = cat.sections || [];
  const topics = cat.topics || [];
  let listing = "";
  if (subs.length) {
    listing = `<div class="sub-grid">${subs
      .map(
        (s) => `<a class="sub-card reveal" href="/category/${cat.id}/${s.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
          <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(s.name))}</div>
          <div style="font-size:0.8rem; color:#64748b;">${(s.sections || s.topics || []).length || 0} Topics</div>
        </a>`
      )
      .join("")}</div>`;
  } else if (secs.length) {
    listing = `<div class="sub-grid">${secs
      .map(
        (s) => `<a class="sub-card reveal" href="/category/${cat.id}/${s.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
          <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(s.name))}</div>
          <div style="font-size:0.8rem; color:#64748b;">${(s.topics || []).length} Topics</div>
        </a>`
      )
      .join("")}</div>`;
  } else {
    listing = topicListHTML(cat, null, null, topics);
  }

  const body =
    pageHead(crumb, loc(cat.name), loc(cat.description)) +
    `<section class="section" style="padding-bottom:40px;">${listing || emptyHTML()}</section>`;

  const isMath = isMathCat(cat);
  const pageTitle = isMath
    ? `Mathematics Questions for ${EXAM_TITLE} | axomexam`
    : `${loc(cat.name)} Questions for Competitive Exams | axomexam`;
  const pageDesc = loc(cat.description) ||
    (isMath
      ? `Quantitative aptitude, arithmetic, advanced math & DI with solved questions and answers for ${EXAM_SENTENCE}.`
      : `Practice ${loc(cat.name)} questions with answers in English and Assamese for competitive exams in Assam.`);

  return {
    html: shellHTML({
      route: `/category/${cat.id}`,
      title: pageTitle,
      description: pageDesc,
      canonical: `${BASE}/category/${cat.id}`,
      body,
    }),
    jsonld: breadcrumbJSONLD([{ href: "/", label: "Home" }, { href: `/category/${cat.id}`, label: loc(cat.name) }]),
  };
}

function buildSubCategoryPage(cat, sub) {
  const secs = sub.sections || [];
  const topics = sub.topics || [];
  let listing = "";
  if (secs.length) {
    listing = `<div class="sub-grid">${secs
      .map(
        (s) => `<a class="sub-card reveal" href="/category/${cat.id}/${sub.id}/${s.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
          <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(s.name))}</div>
          <div style="font-size:0.8rem; color:#64748b;">${(s.topics || []).length} Topics</div>
        </a>`
      )
      .join("")}</div>`;
  } else {
    listing = topicListHTML(cat, sub, null, topics);
  }

  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: `/category/${cat.id}`, label: loc(cat.name) },
    { label: loc(sub.name) },
  ]);
  const body =
    pageHead(crumb, loc(sub.name), loc(sub.description)) +
    `<section class="section" style="padding-bottom:40px;">${listing || emptyHTML()}</section>`;

  const isMath = isMathCat(cat);
  return {
    html: shellHTML({
      route: `/category/${cat.id}/${sub.id}`,
      title: `${loc(sub.name)} - ${loc(cat.name)} | axomexam`,
      description: loc(sub.description) ||
        `Practice ${loc(sub.name)} questions with answers in English and Assamese${isMath ? ` for ${EXAM_SENTENCE}` : ""}.`,
      canonical: `${BASE}/category/${cat.id}/${sub.id}`,
      body,
    }),
    jsonld: breadcrumbJSONLD([
      { href: "/", label: "Home" },
      { href: `/category/${cat.id}`, label: loc(cat.name) },
      { href: `/category/${cat.id}/${sub.id}`, label: loc(sub.name) },
    ]),
  };
}

function buildSectionPage(cat, sub, sec) {
  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: `/category/${cat.id}`, label: loc(cat.name) },
    { href: `/category/${cat.id}/${sub.id}`, label: loc(sub.name) },
    { label: loc(sec.name) },
  ]);
  const body =
    pageHead(crumb, loc(sec.name), loc(sec.description)) +
    `<section class="section" style="padding-bottom:40px;">${topicListHTML(cat, sub, sec, sec.topics || [])}</section>`;

  const isMath = isMathCat(cat);
  return {
    html: shellHTML({
      route: `/category/${cat.id}/${sub.id}/${sec.id}`,
      title: `${loc(sec.name)} - ${loc(sub.name)} | axomexam`,
      description: loc(sec.description) ||
        `Practice ${loc(sec.name)} questions with answers in English and Assamese${isMath ? ` for ${EXAM_SENTENCE}` : ""}.`,
      canonical: `${BASE}/category/${cat.id}/${sub.id}/${sec.id}`,
      body,
    }),
    jsonld: breadcrumbJSONLD([
      { href: "/", label: "Home" },
      { href: `/category/${cat.id}`, label: loc(cat.name) },
      { href: `/category/${cat.id}/${sub.id}`, label: loc(sub.name) },
      { href: `/category/${cat.id}/${sub.id}/${sec.id}`, label: loc(sec.name) },
    ]),
  };
}

function buildArticleSubPage(cat, sub) {
  const target = `/category/${cat.id}/${sub.id}/read`;
  const subName = escapeHtml(loc(sub.name));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subName} | axomexam</title>
  <link rel="canonical" href="${BASE}${target}" />
  <meta name="robots" content="index, follow" />
  <meta http-equiv="refresh" content="0; url=${target}" />
  <script>location.replace("${target}");</script>
</head>
<body style="margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif; background:#f8fafc; color:#0f172a; display:flex; align-items:center; justify-content:center; min-height:100vh;">
  <div style="text-align:center; padding:24px;">
    <p style="font-size:1.05rem; font-weight:700; margin:0 0 8px 0;">${subName} — Articles</p>
    <p style="font-size:0.9rem; color:#64748b; margin:0 0 16px 0;">Redirecting to the articles…</p>
    <a style="display:inline-block; padding:10px 26px; border-radius:99px; font-weight:800; font-size:0.95rem; color:#fff; background:linear-gradient(135deg,#2563eb,#3b82f6); text-decoration:none;" href="${target}">Open Articles</a>
  </div>
</body>
</html>`;
  return {
    html,
    jsonld: "",
  };
}

function buildArticleReader(cat, sub) {
  const data = readTopicContent("articles", sub.id) || {};
  const title = (data && loc(data.title)) || loc(sub.name);
  const desc = (data && loc(data.description)) || loc(sub.description);
  const items = data.questions || [];
  const parts = items
    .map((it, i) => {
      const qEn = (it.q && it.q.en) || it.q;
      const qAs = it.q && it.q.as;
      const aEn = (it.a && it.a.en) || it.a;
      const aAs = it.a && it.a.as;
      const exp = it.explanation;
      return `<div class="article-part-block" style="margin-bottom:26px;">
        <h2 style="font-size:1.2rem; font-weight:800; margin:0 0 10px 0;">${i + 1}. ${escapeHtml(String(qEn))}</h2>
        ${qAs ? `<p style="color:#64748b;">${escapeHtml(String(qAs))}</p>` : ""}
        <p style="line-height:1.8;">${escapeHtml(String(aEn))}</p>
        ${aAs ? `<p style="color:#334155; line-height:1.8;">${escapeHtml(String(aAs))}</p>` : ""}
        ${exp && exp.en ? `<div style="border-left:4px solid #2563eb; padding:10px 14px; margin-top:10px; background:#f8fafc;">${escapeHtml(exp.en)}</div>` : ""}
      </div>`;
    })
    .join("");

  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: `/category/${cat.id}`, label: loc(cat.name) },
    { href: `/category/${cat.id}/${sub.id}`, label: loc(sub.name) },
    { label: "Read" },
  ]);

  const body = `
      ${pageHead(crumb, title, desc)}
      <section class="section" style="padding-bottom:40px;">
        <article style="max-width:860px; margin:0 auto;">${parts || emptyHTML()}</article>
      </section>`;

  return {
    html: shellHTML({
      route: `/category/${cat.id}/${sub.id}/read`,
      title: `${title} | axomexam`,
      description: desc || `Read ${title} in English and Assamese.`,
      canonical: `${BASE}/category/${cat.id}/${sub.id}/read`,
      body,
    }),
    jsonld: breadcrumbJSONLD([
      { href: "/", label: "Home" },
      { href: `/category/${cat.id}`, label: loc(cat.name) },
      { href: `/category/${cat.id}/${sub.id}`, label: loc(sub.name) },
      { href: `/category/${cat.id}/${sub.id}/read`, label: "Read" },
    ]),
  };
}

function buildTopicPage(rec) {
  const content = readTopicContent(rec.cat.id, rec.topic.id) || {};
  const title = loc(content.title || rec.topic.title || rec.topic.name);
  const baseDesc =
    loc(content.description || rec.topic.description) ||
    `${title} - practice questions with answers for competitive exams in Assam.`;
  const desc = isMathCat(rec.cat)
    ? (baseDesc.includes("APSC") ? baseDesc : `${baseDesc} Useful for ${EXAM_SENTENCE}.`)
    : baseDesc;
  const tags = (content.tags || rec.tags || []).join(", ");
  const qs = content.questions || rec.topic.questions || [];

  const crumbItems = [
    { href: "/", label: "Home" },
    { href: `/category/${rec.cat.id}`, label: loc(rec.cat.name) },
  ];
  if (rec.sub) crumbItems.push({ href: `/category/${rec.cat.id}/${rec.sub.id}`, label: loc(rec.sub.name) });
  if (rec.section)
    crumbItems.push({
      href: `/category/${rec.cat.id}/${rec.sub ? rec.sub.id + "/" : ""}${rec.section.id}`,
      label: loc(rec.section.name),
    });
  crumbItems.push({ label: title });

  const body =
    pageHead(breadcrumbHTML(crumbItems), title, desc) +
    `<section class="section" style="padding-bottom:40px;">
      <div class="qa-list" style="max-width:860px; margin:0 auto;">
        ${qs.length ? `<h2 style="font-size:1.15rem; margin-bottom:18px;">${qs.length} Questions with Answers</h2>` : ""}
        ${topicQuestionsHTML(rec) || emptyHTML()}
      </div>
    </section>`;

  const pageTitle = `${title} | axomexam`;
  const url = `${BASE}/topic/${rec.path}`;

  return {
    html: shellHTML({
      route: `/topic/${rec.path}`,
      title: pageTitle,
      description: desc,
      keywords: tags,
      canonical: url,
      body,
    }),
    jsonld: faqJSONLD(rec) + breadcrumbJSONLD(crumbItems),
  };
}

function buildMockCategoryPicker() {
  const mockCats = categories.filter((c) => c.id !== "study-guides");
  const cards = mockCats
    .map(
      (c) => `<div class="mock-card" style="margin:12px 0; padding:18px; border:1px solid var(--border,#e2e8f0); border-radius:16px;">
        <div style="font-weight:800; margin-bottom:10px;">${escapeHtml(loc(c.name))}</div>
        <a class="btn btn-primary" href="/mock-test/${c.id}">Start Mock Test</a>
      </div>`
    )
    .join("");
  const body = `
      <div class="mock-intro">
        <h1>Mock Tests for Competitive Exams</h1>
        <p>Timed practice mock tests for every subject with instant scoring and full answer review.</p>
      </div>
      <section class="section" style="padding-bottom:30px;">
        <div class="section-head"><div><h2>Choose a Subject</h2></div></div>
        <div class="mock-grid">${cards}</div>
      </section>`;
  return {
    html: shellHTML({
      route: "/mock-test",
      title: "Free Mock Tests for APSC, ADRE, Assam Police, SSC, Railway | axomexam",
      description: "Take free timed mock tests for Assam competitive exams — APSC, ADRE, Assam Police, SSC and Railway. Instant scoring and answer review.",
      body,
    }),
    jsonld: "",
  };
}

function buildMockSubPicker(cat) {
  const subs = cat.subcategories || [];
  const cards = subs
    .map(
      (s) => `<a class="sub-card reveal" href="/mock-test/${cat.id}/${s.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(s.name))}</div>
        <div style="font-size:0.8rem; color:#64748b;">Mock Test</div>
      </a>`
    )
    .join("");
  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: "/mock-test", label: "Mock Test" },
    { label: loc(cat.name) },
  ]);
  const body = pageHead(crumb, `${loc(cat.name)} Mock Test`, "") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards}</div></section>`;
  const isMath = isMathCat(cat);
  return {
    html: shellHTML({
      route: `/mock-test/${cat.id}`,
      title: isMath
        ? `Mathematics Mock Test for ${EXAM_TITLE} | axomexam`
        : `${loc(cat.name)} Mock Test | axomexam`,
      description: isMath
        ? `Free timed Mathematics mock test with questions and answers for ${EXAM_SENTENCE}.`
        : `Free timed ${loc(cat.name)} mock test with questions and answers for competitive exams in Assam.`,
      canonical: `${BASE}/mock-test/${cat.id}`,
      body,
    }),
    jsonld: breadcrumbJSONLD([
      { href: "/", label: "Home" },
      { href: "/mock-test", label: "Mock Test" },
      { href: `/mock-test/${cat.id}`, label: loc(cat.name) },
    ]),
  };
}

function buildMockSectionPicker(cat, sub) {
  const secs = sub.sections || [];
  const cards = secs
    .map(
      (s) => `<a class="sub-card reveal" href="/mock-test/${cat.id}/${sub.id}/${s.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(s.name))}</div>
        <div style="font-size:0.8rem; color:#64748b;">${(s.topics || []).length} Topics</div>
      </a>`
    )
    .join("");
  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: "/mock-test", label: "Mock Test" },
    { href: `/mock-test/${cat.id}`, label: loc(cat.name) },
    { label: loc(sub.name) },
  ]);
  const body = pageHead(crumb, `${loc(sub.name)} Mock Test`, "") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards}</div></section>`;
  const isMath = isMathCat(cat);
  return {
    html: shellHTML({
      route: `/mock-test/${cat.id}/${sub.id}`,
      title: isMath
        ? `${loc(sub.name)} Mock Test for ${EXAM_TITLE} | axomexam`
        : `${loc(sub.name)} Mock Test | axomexam`,
      description: isMath
        ? `Free timed ${loc(sub.name)} mock test with questions and answers for ${EXAM_SENTENCE}.`
        : `Free timed ${loc(sub.name)} mock test for ${loc(cat.name)} competitive exams in Assam.`,
      canonical: `${BASE}/mock-test/${cat.id}/${sub.id}`,
      body,
    }),
    jsonld: breadcrumbJSONLD([
      { href: "/", label: "Home" },
      { href: "/mock-test", label: "Mock Test" },
      { href: `/mock-test/${cat.id}`, label: loc(cat.name) },
      { href: `/mock-test/${cat.id}/${sub.id}`, label: loc(sub.name) },
    ]),
  };
}

function buildMockTopicPicker(cat, sub, sec) {
  const topics = sec.topics || [];
  const cards = topics
    .map(
      (t) => `<a class="sub-card reveal" href="/mock-test/${cat.id}/${sub.id}/${sec.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(t.name))}</div>
      </a>`
    )
    .join("");
  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: "/mock-test", label: "Mock Test" },
    { href: `/mock-test/${cat.id}`, label: loc(cat.name) },
    { href: `/mock-test/${cat.id}/${sub.id}`, label: loc(sub.name) },
    { label: loc(sec.name) },
  ]);
  const body = pageHead(crumb, `${loc(sec.name)} Mock Test`, "") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards}</div></section>`;
  const isMath = isMathCat(cat);
  return {
    html: shellHTML({
      route: `/mock-test/${cat.id}/${sub.id}/${sec.id}`,
      title: isMath
        ? `${loc(sec.name)} Mock Test for ${EXAM_TITLE} | axomexam`
        : `${loc(sec.name)} Mock Test | axomexam`,
      description: isMath
        ? `Free timed ${loc(sec.name)} mock test with questions and answers for ${EXAM_SENTENCE}.`
        : `Free timed ${loc(sec.name)} mock test for ${loc(cat.name)} competitive exams in Assam.`,
      canonical: `${BASE}/mock-test/${cat.id}/${sub.id}/${sec.id}`,
      body,
    }),
    jsonld: breadcrumbJSONLD([
      { href: "/", label: "Home" },
      { href: "/mock-test", label: "Mock Test" },
      { href: `/mock-test/${cat.id}`, label: loc(cat.name) },
      { href: `/mock-test/${cat.id}/${sub.id}`, label: loc(sub.name) },
      { href: `/mock-test/${cat.id}/${sub.id}/${sec.id}`, label: loc(sec.name) },
    ]),
  };
}

function buildMockSetup(cat) {
  const subs = cat.subcategories || [];
  let topicCount = 0;
  for (const s of subs) for (const sec of s.sections || []) topicCount += (sec.topics || []).length;
  const name = loc(cat.name);
  const body = pageHead(
    breadcrumbHTML([{ href: "/", label: "Home" }, { href: "/mock-test", label: "Mock Test" }, { label: name }]),
    `${name} Mock Test Setup`,
    "Configure your mock test and start practising."
  ) + `<section class="section" style="padding-bottom:40px;"><p>${topicCount} topics available. Choose a topic to start the timed test.</p></section>`;
  const isMath = isMathCat(cat);
  return {
    html: shellHTML({
      route: `/mock-test/${cat.id}/start`,
      title: isMath
        ? `Mathematics Mock Test - Start (${EXAM_TITLE}) | axomexam`
        : `${name} Mock Test - Start | axomexam`,
      description: isMath
        ? `Start a free timed Mathematics mock test with questions and answers for ${EXAM_SENTENCE}.`
        : `Start a free timed ${name} mock test with questions and answers for competitive exams in Assam.`,
      canonical: `${BASE}/mock-test/${cat.id}/start`,
      body,
    }),
    jsonld: "",
  };
}

function buildTrendingPage() {
  const cards = topicIndex
    .filter((r) => r.path.startsWith("trending/"))
    .map(
      (r) => `<a class="topic-card reveal" href="/topic/${r.path}" style="display:block; margin:12px 0; padding:16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:800; color:var(--ink,#0f172a);">${escapeHtml(loc(r.title))}</div>
        <div style="font-size:0.82rem; color:#64748b;">${r.nQuestions || 0} Questions</div>
      </a>`
    )
    .join("");
  const body =
    pageHead(breadcrumbHTML([{ href: "/", label: "Home" }, { label: "Trending Topics" }]), "Trending Topics", "Popular questions for competitive exams in Assam.") +
    `<section class="section" style="padding-bottom:40px;"><div class="topic-grid">${cards}</div></section>`;
  return {
    html: shellHTML({
      route: "/trending",
      title: "Trending Topics | axomexam",
      description: "Trending questions and topics for Assam competitive exams — APSC, ADRE, Assam Police, SSC and Railway.",
      body,
    }),
    jsonld: "",
  };
}

function buildPreviousYear() {
  const exams = PYEAR_EXAMS.filter((ex) => FALLBACK_PYEAR[ex.id]);
  const cards = exams
    .map(
      (ex) => `<a class="sub-card reveal" href="/previous-year/${ex.id}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(ex.name))}</div>
        <div style="font-size:0.8rem; color:#64748b;">Previous Year Question Papers</div>
      </a>`
    )
    .join("");
  const body =
    pageHead(breadcrumbHTML([{ href: "/", label: "Home" }, { label: "Previous Year Questions" }]), "Previous Year Question Papers", "Download solved previous year question papers for Assam competitive exams.") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards || emptyHTML()}</div></section>`;
  return {
    html: shellHTML({
      route: "/previous-year",
      title: "Previous Year Question Papers | axomexam",
      description: "Download previous year question papers for SSC, Railway, Assam Police, DHS DME and other competitive exams.",
      body,
    }),
    jsonld: "",
  };
}

function buildPreviousYearYears(exam) {
  const years = Object.keys(FALLBACK_PYEAR[exam.id] || {}).sort();
  const cards = years
    .map(
      (yr) => `<a class="sub-card reveal" href="/previous-year/${exam.id}/${yr}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(exam.id.toUpperCase())} ${yr}</div>
        <div style="font-size:0.8rem; color:#64748b;">Download Question Paper</div>
      </a>`
    )
    .join("");
  const crumb = breadcrumbHTML([{ href: "/", label: "Home" }, { href: "/previous-year", label: "Previous Year" }, { label: loc(exam.name) }]);
  const body = pageHead(crumb, `${loc(exam.name)} Previous Year Papers`, "") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards}</div></section>`;
  return {
    html: shellHTML({
      route: `/previous-year/${exam.id}`,
      title: `${loc(exam.name)} Previous Year Question Papers | axomexam`,
      description: `Download ${loc(exam.name)} previous year question papers for competitive exam preparation.`,
      canonical: `${BASE}/previous-year/${exam.id}`,
      body,
    }),
    jsonld: "",
  };
}

function buildPreviousYearPapers(exam, year) {
  const files = (FALLBACK_PYEAR[exam.id] || {})[year] || [];
  const cards = files
    .map(
      (f) => `<div class="sub-card reveal" style="margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px;">
        <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(f)}</div>
        <a class="btn btn-sm btn-outline" href="/data/sample/previous-year/${exam.id}/${year}/${f}" download>Download PDF</a>
      </div>`
    )
    .join("");
  const crumb = breadcrumbHTML([
    { href: "/", label: "Home" },
    { href: "/previous-year", label: "Previous Year" },
    { href: `/previous-year/${exam.id}`, label: loc(exam.name) },
    { label: year },
  ]);
  const body = pageHead(crumb, `${loc(exam.name)} ${year} Question Paper`, "") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards || emptyHTML()}</div></section>`;
  return {
    html: shellHTML({
      route: `/previous-year/${exam.id}/${year}`,
      title: `${loc(exam.name)} ${year} Previous Year Question Paper | axomexam`,
      description: `Download the ${loc(exam.name)} ${year} previous year question paper (PDF) for free.`,
      canonical: `${BASE}/previous-year/${exam.id}/${year}`,
      body,
    }),
    jsonld: "",
  };
}

function buildCategoriesPage() {
  const cards = categories
    .map((c) => {
      const n = topicIndex.filter((r) => r.cat.id === c.id).length;
      return `<a class="cat-card reveal" href="/category/${c.id}" style="--cat:${c.color || "#4f46e5"}">
        <span class="cat-meta"><b>${escapeHtml(loc(c.name))}</b><span>${n} Topics</span></span>
      </a>`;
    })
    .join("");
  const body =
    pageHead(breadcrumbHTML([{ href: "/", label: "Home" }, { label: "All Categories" }]), "All Practice Categories", "Browse all subjects available for practice.") +
    `<section class="section" style="padding-bottom:40px;"><div class="cat-grid">${cards}</div></section>`;
  return {
    html: shellHTML({
      route: "/categories",
      title: "All Categories | axomexam",
      description: "Browse all practice categories for competitive exam preparation — GK, Math, Science, Reasoning, English, Computer and more.",
      body,
    }),
    jsonld: "",
  };
}

function buildDownloadsPage() {
  const cards = DOWNLOADS.map(
    (f) => `<div class="sub-card reveal" style="margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px;">
      <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(f)}</div>
      <a class="btn btn-sm btn-outline" href="/data/sample/download/${f}" download>Download PDF</a>
    </div>`
  ).join("");
  const body =
    pageHead(breadcrumbHTML([{ href: "/", label: "Home" }, { label: "Downloads" }]), "Download Study Notes", "Free printable PDF notes for competitive exam preparation.") +
    `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards || emptyHTML()}</div></section>`;
  return {
    html: shellHTML({
      route: "/downloads",
      title: "Download Free PDF Notes | axomexam",
      description: "Download free printable PDF study notes for Assam competitive exams — APSC, ADRE, Assam Police, SSC and Railway.",
      body,
    }),
    jsonld: "",
  };
}

const STATIC_PAGES = {
  about: {
    title: "About Us",
    content:
      "<p>Welcome to <strong>axomexam.in</strong>, your premier online destination for comprehensive and accessible preparation for all competitive examinations in Assam.</p>" +
      "<h2>Our Mission &amp; Vision</h2>" +
      "<p>We are committed to democratizing quality exam resources for candidates preparing for state and national recruitments, including ADRE (Grade III &amp; IV), Assam Police (Sub-Inspector &amp; Constables), APSC, PNRD, Forest Department, and Central RRB examinations.</p>" +
      "<h2>What We Provide</h2>" +
      "<ul><li>Complete bilingual Q&amp;A, chapter-wise notes and explanations in Assamese and English.</li><li>Interactive timed mock tests that simulate real exam environments.</li><li>Print-ready PDF notes for offline revision.</li><li>Previous year papers with verified solutions.</li></ul>" +
      "<h2>Contact &amp; Support</h2>" +
      "<p>Reach out at <a href=\"mailto:axomexam@outlook.com\">axomexam@outlook.com</a>.</p>",
  },
  privacy: {
    title: "Privacy Policy",
    content:
      "<p>At <strong>axomexam.in</strong>, the privacy of our visitors is of paramount importance. This document outlines the types of information received and collected by our platform.</p>" +
      "<h2>1. Information Collection</h2>" +
      "<p>We do not mandate account creation or collect sensitive personal details. Information submitted via contact or feedback forms (such as Name and Email) is used strictly to respond to inquiries.</p>" +
      "<h2>2. Log Files &amp; Analytics</h2>" +
      "<p>We use standard log files (IP addresses, browser type, date/time stamps, referring pages) purely for site maintenance. This data is non-personally identifiable.</p>" +
      "<h2>3. Google AdSense</h2>" +
      "<p>Google, as a third-party vendor, uses cookies to serve contextual advertisements. You can opt out of personalized advertising via Google Ad Settings.</p>" +
      "<h2>4. Consent</h2>" +
      "<p>By using our website, you consent to this Privacy Policy.</p>",
  },
  terms: {
    title: "Terms & Conditions",
    content:
      "<p>By accessing and browsing <strong>axomexam.in</strong>, you accept and agree to the following Terms and Conditions.</p>" +
      "<h2>1. Content Usage</h2>" +
      "<p>All materials, questions, notes and downloads are intended strictly for educational, personal and non-commercial usage. Redistribution or resale without written permission is prohibited.</p>" +
      "<h2>2. Accuracy &amp; Liability</h2>" +
      "<p>Materials are provided on an 'as-is' basis. axomexam.in does not warrant absolute completeness or infallibility for official evaluation criteria.</p>" +
      "<h2>3. External Links</h2>" +
      "<p>We hold no responsibility for the content or policies of third-party platforms we link to.</p>",
  },
  disclaimer: {
    title: "Disclaimer",
    content:
      "<p>All content on <strong>https://axomexam.in</strong> is published in good faith for general educational and exam preparation purposes.</p>" +
      "<h2>1. Non-Affiliation</h2>" +
      "<p>axomexam.in is an independent private educational website, NOT affiliated with or endorsed by the Government of Assam, APSC, SLPRB, or any governmental testing agency. Always cross-reference official gazettes.</p>" +
      "<h2>2. Educational Use</h2>" +
      "<p>Use of study resources and mock practices is at the user's sole discretion.</p>",
  },
  contact: {
    title: "Contact Us",
    content:
      "<p>Have a question, suggestion, or correction? We would love to hear from you.</p>" +
      "<p>Email us at <a href=\"mailto:axomexam@outlook.com\">axomexam@outlook.com</a> and our team will get back to you as soon as possible.</p>",
  },
  submit: {
    title: "Submit Q&A",
    content:
      "<p>Want to contribute questions to <strong>axomexam.in</strong>?</p>" +
      "<p>Use the form below to submit a question with its answer. Reviewed submissions are added to our question bank for students preparing for APSC, ADRE, Assam Police, SSC and Railway exams.</p>",
  },
  search: {
    title: "Search",
    content:
      "<p>Search across all questions, topics and keywords on axomexam.in.</p>" +
      "<p>Type in the search box above to find practice questions, study notes and PDFs for your competitive exam preparation.</p>",
  },
};

function buildStaticPage(key) {
  const page = STATIC_PAGES[key === "privacy-policy" ? "privacy" : key];
  const route = key === "privacy-policy" ? "/privacy-policy" : `/${key}`;
  const crumb = breadcrumbHTML([{ href: "/", label: "Home" }, { label: page.title }]);
  const body =
    pageHead(crumb, page.title, "") +
    `<section class="section" style="padding-bottom:40px;">
      <div style="max-width:840px; margin:0 auto; line-height:1.8; color:#334155;">${page.content}</div>
    </section>`;
  return {
    html: shellHTML({
      route,
      title: `${page.title} | axomexam`,
      description: `${page.title} for axomexam.in — free competitive exam preparation for Assam.`,
      canonical: `${BASE}${route}`,
      body,
    }),
    jsonld: "",
  };
}

/* ================= generate ================= */

const sitemapUrls = [];
const lastmod = new Date().toISOString().slice(0, 10);

function addPage(route, page) {
  let fileRoute = route.replace(/\/+$/, "") + "/index.html";
  if (route === "/") fileRoute = "index.html";
  writeFile(fileRoute, page.html);
  if (page.jsonld) {
    // JSON-LD scripts are appended before </head> for cleanliness
    const abs = path.join(OUT, fileRoute);
    let html = fs.readFileSync(abs, "utf8");
    html = html.replace("</head>", `${page.jsonld}\n</head>`);
    fs.writeFileSync(abs, html, "utf8");
  }
}

function addSitemap(route, priority, changefreq) {
  sitemapUrls.push(`  <url>
    <loc>${BASE}${route === "/" ? "/" : route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq || "weekly"}</changefreq>
    <priority>${priority || "0.7"}</priority>
  </url>`);
}

function main() {
  ensureCleanDir();

  /* Home */
  const home = buildHome();
  addPage("/", home);
  addSitemap("/", "1.0", "daily");

  /* Topic pages */
  for (const rec of topicIndex) {
    const page = buildTopicPage(rec);
    addPage(`/topic/${rec.path}`, page);
    addSitemap(`/topic/${rec.path}`, rec.extra ? "0.7" : "0.8", "weekly");
  }

  /* Category / subcategory / section pages */
  for (const cat of categories) {
    const subs = cat.subcategories || [];
    if (cat.id === "articles") {
      /* articles landing: reuse categories listing pattern */
      const cards = subs
        .map(
          (s) => `<a class="sub-card reveal" href="/category/${cat.id}/${s.id}/read" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;">
            <div style="font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(loc(s.name))}</div>
            <div style="font-size:0.8rem; color:#64748b;">Articles</div>
          </a>`
        )
        .join("");
      const body =
        pageHead(breadcrumbHTML([{ href: "/", label: "Home" }, { label: "Articles" }]), "Articles", "Reading-only study articles in English and Assamese.") +
        `<section class="section" style="padding-bottom:40px;"><div class="sub-grid">${cards}</div></section>`;
      addPage(`/category/${cat.id}`, {
        html: shellHTML({
          route: `/category/${cat.id}`,
          title: "Articles | axomexam",
          description: "Reading-only study articles on Assam and India general knowledge in English and Assamese.",
          canonical: `${BASE}/category/${cat.id}`,
          body,
        }),
        jsonld: "",
      });
      addSitemap(`/category/${cat.id}`, "0.7", "weekly");

      for (const sub of subs) {
        const subPage = buildArticleSubPage(cat, sub);
        addPage(`/category/${cat.id}/${sub.id}`, subPage);
        addSitemap(`/category/${cat.id}/${sub.id}`, "0.7", "weekly");
        const reader = buildArticleReader(cat, sub);
        addPage(`/category/${cat.id}/${sub.id}/read`, reader);
        addSitemap(`/category/${cat.id}/${sub.id}/read`, "0.8", "weekly");
      }
      continue;
    }

    addPage(`/category/${cat.id}`, buildCategoryPage(cat));
    addSitemap(`/category/${cat.id}`, "0.9", "weekly");

    if (subs.length) {
      for (const sub of subs) {
        const secs = sub.sections || [];
        if (secs.length) {
          addPage(`/category/${cat.id}/${sub.id}`, buildSubCategoryPage(cat, sub));
          addSitemap(`/category/${cat.id}/${sub.id}`, "0.8", "weekly");
          for (const sec of secs) {
            addPage(`/category/${cat.id}/${sub.id}/${sec.id}`, buildSectionPage(cat, sub, sec));
            addSitemap(`/category/${cat.id}/${sub.id}/${sec.id}`, "0.75", "weekly");
          }
        } else {
          addPage(`/category/${cat.id}/${sub.id}`, buildSubCategoryPage(cat, sub));
          addSitemap(`/category/${cat.id}/${sub.id}`, "0.8", "weekly");
        }
      }
    } else {
      const secs = cat.sections || [];
      if (secs.length) {
        for (const sec of secs) {
          addPage(`/category/${cat.id}/${sec.id}`, buildSubCategoryPage(cat, { id: sec.id, name: sec.name, description: sec.description, sections: null, topics: sec.topics }));
          addSitemap(`/category/${cat.id}/${sec.id}`, "0.8", "weekly");
        }
      }
    }
  }

  /* Mock test pages */
  const mockHome = buildMockCategoryPicker();
  addPage("/mock-test", mockHome);
  addSitemap("/mock-test", "0.95", "daily");

  for (const cat of categories) {
    if (cat.id === "study-guides" || cat.id === "articles") continue;
    const subs = cat.subcategories || [];
    if (subs.length) {
      addPage(`/mock-test/${cat.id}`, buildMockSubPicker(cat));
      addSitemap(`/mock-test/${cat.id}`, "0.8", "weekly");
      for (const sub of subs) {
        const secs = sub.sections || [];
        if (secs.length) {
          addPage(`/mock-test/${cat.id}/${sub.id}`, buildMockSectionPicker(cat, sub));
          addSitemap(`/mock-test/${cat.id}/${sub.id}`, "0.75", "weekly");
          for (const sec of secs) {
            addPage(`/mock-test/${cat.id}/${sub.id}/${sec.id}`, buildMockTopicPicker(cat, sub, sec));
            addSitemap(`/mock-test/${cat.id}/${sub.id}/${sec.id}`, "0.7", "weekly");
          }
        } else {
          addPage(`/mock-test/${cat.id}/${sub.id}`, buildMockSetup(cat));
          addSitemap(`/mock-test/${cat.id}/${sub.id}`, "0.75", "weekly");
        }
      }
    } else {
      addPage(`/mock-test/${cat.id}/start`, buildMockSetup(cat));
      addSitemap(`/mock-test/${cat.id}/start`, "0.7", "weekly");
    }
  }

  /* Trending */
  const trendPage = buildTrendingPage();
  addPage("/trending", trendPage);
  addSitemap("/trending", "0.85", "daily");

  /* Previous year */
  const pyHome = buildPreviousYear();
  addPage("/previous-year", pyHome);
  addSitemap("/previous-year", "0.85", "weekly");
  for (const exam of PYEAR_EXAMS) {
    if (!FALLBACK_PYEAR[exam.id]) continue;
    addPage(`/previous-year/${exam.id}`, buildPreviousYearYears(exam));
    addSitemap(`/previous-year/${exam.id}`, "0.8", "weekly");
    for (const year of Object.keys(FALLBACK_PYEAR[exam.id] || {}).sort()) {
      addPage(`/previous-year/${exam.id}/${year}`, buildPreviousYearPapers(exam, year));
      addSitemap(`/previous-year/${exam.id}/${year}`, "0.7", "weekly");
    }
  }

  /* Categories / downloads pages */
  addPage("/categories", buildCategoriesPage());
  addSitemap("/categories", "0.85", "weekly");
  addPage("/downloads", buildDownloadsPage());
  addSitemap("/downloads", "0.9", "daily");

  /* Static pages (search is prerendered but kept out of the sitemap) */
  for (const key of ["about", "contact", "privacy", "privacy-policy", "terms", "disclaimer"]) {
    addPage(key === "privacy-policy" ? "/privacy-policy" : `/${key}`, buildStaticPage(key));
    addSitemap(key === "privacy-policy" ? "/privacy-policy" : `/${key}`, "0.6", "monthly");
  }
  addPage("/search", buildStaticPage("search"));
  addPage("/submit", buildStaticPage("submit"));
  addSitemap("/submit", "0.7", "monthly");

  /* Sitemap */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join("\n")}
</urlset>
`;
  writeFile("sitemap.xml", sitemap);

  /* robots.txt (copy, keep sitemap pointer) */
  fs.copyFileSync(path.join(ROOT, "robots.txt"), path.join(OUT, "robots.txt"));

  /* Copy static site assets (shell + assets + data).
     NOTE: root index.html is NOT copied — the generated homepage
     (buildHome) already contains the full SPA shell AND prerendered
     content, so copying the bare shell over it would leave the
     homepage empty for crawlers (AdSense/SEO review). */
  for (const name of ["404.html", "CNAME", "_redirects", "css", "js", "data"]) {
    const src = path.join(ROOT, name);
    const dst = path.join(OUT, name);
    if (fs.existsSync(src)) fs.cpSync(src, dst, { recursive: true });
  }

  console.log("Done.");
  console.log(`  Topic pages:        ${topicIndex.length}`);
  console.log(`  Category pages:     ${categories.length}`);
  console.log(`  Mock test pages:    ${Object.keys(sitemapUrls).length - topicIndex.length - categories.length - 8}`);
  console.log(`  Sitemap URLs:       ${sitemapUrls.length}`);
  console.log(`  Output:             ${OUT}`);
}

main();
