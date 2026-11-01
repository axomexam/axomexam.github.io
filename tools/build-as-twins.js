#!/usr/bin/env node
"use strict";

/*
 * tools/build-as-twins.js
 *
 * Gives every indexable English page its own Assamese URL under /as/, so the
 * Assamese version can be crawled, indexed and ranked on its own.
 *
 * What it does, per page
 * ----------------------
 *   English page  -> add the three hreflang <link> tags (en / as / x-default).
 *                    Nothing else changes.
 *   Assamese page -> a copy of the English markup with:
 *                      <html lang="as">
 *                      Assamese <title>, meta description, og:* / twitter:*
 *                      Assamese <h1>
 *                      self-referential canonical + og:url under /as/
 *                      every absolute self-URL inside the JSON-LD graph
 *                      the same hreflang trio
 *
 * The page *body* is copied verbatim apart from `<body data-lang="as">`. That
 * is deliberate: the runtime (js/app.src.js) reads the language from the URL
 * alone, and every question block already ships both languages side by side
 * (lang="en" / lang="as"), so the copy renders in Assamese the moment
 * body[data-lang=as] is set — which the static markup now does itself, before
 * and without JS. This is exactly how the one hand-built twin worked before.
 *
 * The theme, CSS and English markup are never touched, so the site looks
 * identical in both languages.
 *
 * Idempotent: re-running rewrites the same bytes. `--check` reports drift
 * without writing. `--only <rel>` and `--limit <n>` are for spot checks.
 *
 * Usage:
 *   node tools/build-as-twins.js            # build every twin
 *   node tools/build-as-twins.js --check    # report, do not write
 *   node tools/build-as-twins.js --only topic/gk/geography/assam-geography-sec/national-parks
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BASE = "https://axomexam.in";

const argv = process.argv.slice(2);
const CHECK = argv.includes("--check");
const onlyIdx = argv.indexOf("--only");
const ONLY = onlyIdx >= 0 ? argv[onlyIdx + 1].replace(/^\/+|\/+$/g, "") : null;
const limIdx = argv.indexOf("--limit");
const LIMIT = limIdx >= 0 ? parseInt(argv[limIdx + 1], 10) : 0;

/* ------------------------------------------------------------------ */
/* what to skip                                                        */
/* ------------------------------------------------------------------ */

const SKIP_DIRS = new Set([
  ".git", "node_modules", "dist", ".github", "_preview", "tools", "scripts",
  "data", "js", "css", "images", "app", "as",
]);

/* Pages that must not get a twin: error page, and the routes that are
   deliberately noindex (they have no unique content of their own). */
const SKIP_ROUTES = new Set([
  "404.html",
  "search",
  "trending",
  "topic/trending/assam-gk-special",
  "topic/english/grammar-vocab/tenses",
]);

/* ------------------------------------------------------------------ */
/* data: Assamese names for every page type                            */
/* ------------------------------------------------------------------ */

const readJSON = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
};

const asOf = (o) => (o && typeof o === "object" ? o.as || "" : "");

/* path -> { en, as } for categories.json (cat/sub/sec/topic) */
const catNames = new Map();
{
  const data = readJSON(path.join(ROOT, "data", "categories.json"));
  for (const cat of (data && data.categories) || []) {
    const walk = (node, trail) => {
      const p = trail.join("/");
      catNames.set(p, { en: node.name && node.name.en, as: asOf(node.name) });
      for (const sub of node.subcategories || []) walk(sub, [...trail, sub.id]);
      for (const sec of node.sections || []) walk(sec, [...trail, sec.id]);
      for (const top of node.topics || []) walk(top, [...trail, top.id]);
    };
    walk(cat, [cat.id]);
  }
}

/* path -> { en, as } for data/exams/index.json (exam/sec/sub/topic) */
const examNames = new Map();
{
  const data = readJSON(path.join(ROOT, "data", "exams", "index.json"));
  for (const exam of (data && data.exams) || []) {
    const walk = (node, trail) => {
      examNames.set(trail.join("/"), { en: node.title && node.title.en, as: asOf(node.title) });
      for (const sec of node.sections || []) walk(sec, [...trail, sec.id]);
      for (const sub of node.subcategories || []) walk(sub, [...trail, sub.id]);
      for (const top of node.topics || []) walk(top, [...trail, top.id]);
    };
    walk(exam, [exam.id]);
  }
}

/* book id -> Assamese title */
const bookNames = new Map();
for (const f of fs.readdirSync(path.join(ROOT, "data", "books"))) {
  if (!f.endsWith(".json")) continue;
  const b = readJSON(path.join(ROOT, "data", "books", f));
  if (b && b.title) bookNames.set(b.id, { en: b.title.en, as: asOf(b.title) });
}

/* current-affairs id -> Assamese title */
const caNames = new Map();
{
  const data = readJSON(path.join(ROOT, "data", "current-affairs", "index.json"));
  for (const c of (data && data.categories) || []) {
    caNames.set(c.id, { en: c.title && c.title.en, as: asOf(c.title) });
  }
}

/* topic-content description keyed by the topic path inside a category */
const topicDescAs = new Map();
for (const cat of fs.readdirSync(path.join(ROOT, "data", "content"))) {
  const dir = path.join(ROOT, "data", "content", cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    const d = readJSON(path.join(dir, f));
    const desc = d && d.description && d.description.as;
    if (desc) topicDescAs.set(`${cat}/${f.replace(/\.json$/, "")}`, desc);
  }
}

/* topic-content title keyed by topic id, from the files under data/content */
const contentTitle = new Map();
for (const cat of fs.readdirSync(path.join(ROOT, "data", "content"))) {
  const dir = path.join(ROOT, "data", "content", cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    const d = readJSON(path.join(dir, f));
    if (d && d.title) contentTitle.set(f.replace(/\.json$/, ""), { en: d.title.en, as: asOf(d.title) });
  }
}

/* mock-test subject -> Assamese label (subjects are English-only in data) */
const mockSubjects = {
  "Arithmetic": "পাটিগণিত",
  "Advanced Mathematics": "উচ্চ গণিত",
  "Statistics and Data Interpretation": "পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ",
  "Biology": "জীৱ বিজ্ঞান",
  "Chemistry": "ৰসায়ন বিজ্ঞান",
  "Physics": "পদাৰ্থ বিজ্ঞান",
  "English Grammar": "ইংৰাজী ব্যাকৰণ",
  "English Vocabulary": "ইংৰাজী শব্দভাণ্ডাৰ",
  "Computer Fundamentals": "কম্পিউটাৰৰ মূল কথা",
  "MS Office": "MS Office",
  "Assam History": "অসমৰ ইতিহাস",
  "Indian History": "ভাৰতৰ ইতিহাস",
  "Assam Literature": "অসমীয়া সাহিত্য",
  "Geography": "ভূগোল",
  "Economics": "অৰ্থনীতি",
  "Political Science (Mixed Topics)": "ৰাজনীতি বিজ্ঞান",
  "Verbal": "ভাষিক যুক্তিতৰ্ক",
  "Non-Verbal": "চিত্ৰভিত্তিক যুক্তিতৰ্ক",
  "Analytical & Critical Reasoning": "বিশ্লেষণাত্মক যুক্তিতৰ্ক",
  "Critical & Analytical": "বিশ্লেষণাত্মক যুক্তিতৰ্ক",
  "Assam & India Art and Culture": "অসম আৰু ভাৰতৰ কলা-সংস্কৃতি",
};

/* previous-year path segment -> Assamese label */
const prevSeg = {
  adre: "ADRE", "assam-police": "অসম আৰক্ষী", "dhs-dme": "DHS আৰু DME",
  "guwahati-hc": "গুৱাহাটী উচ্চ ন্যায়ালয়", railway: "ৰে'লৱে", ssc: "SSC",
  "rrb-ntpc": "RRB NTPC", "rrb-alp": "RRB ALP", "rrb-group-d": "RRB Group D",
  si: "SI", "ab-ub": "AB/UB", driver: "চালক", "grade-3": "গ্ৰেড III", "grade-4": "গ্ৰেড IV",
};

/* hand-written hub / utility pages */
const UTILITY_AS = {
  "": {
    title: "axomexam — অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি",
    meta: "ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক প্ৰশ্নোত্তৰ, মক টেষ্ট আৰু PDF নোট। কোনো sign-up নাই।",
    h1: "অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি",
  },
  "about": {
    title: "axomexam ৰ বিষয়ে — অসমৰ বাবে বিনামূলীয়া প্ৰস্তুতি",
    meta: "axomexam.in এ ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক অধ্যয়ন সামগ্ৰী প্ৰকাশ কৰে। জানক আমি কিদৰে কাম কৰো।",
    h1: "axomexam ৰ বিষয়ে",
  },
  "contact": {
    title: "যোগাযোগ — ভুল জনাওক, বিষয় বিচাৰক",
    meta: "axomexam.in ৰ সৈতে যোগাযোগ কৰক — ভুল উত্তৰ জনাওক, নতুন বিষয় বিচাৰক, প্ৰশ্ন আগবঢ়াওক বা সহায় বিচাৰক।",
    h1: "যোগাযোগ",
  },
  "privacy": {
    title: "গোপনীয়তা নীতি — axomexam",
    meta: "axomexam.in এ আপোনাৰ তথ্য কেনেদৰে সংগ্ৰহ, ব্যৱহাৰ আৰু সুৰক্ষিত ৰাখে, আৰু বিজ্ঞাপন তথা কুকিৰ বিষয়ে জানক।",
    h1: "গোপনীয়তা নীতি",
  },
  "privacy-policy": {
    title: "গোপনীয়তা নীতি — axomexam",
    meta: "axomexam.in এ আপোনাৰ তথ্য কেনেদৰে সংগ্ৰহ, ব্যৱহাৰ আৰু সুৰক্ষিত ৰাখে, আৰু বিজ্ঞাপন তথা কুকিৰ বিষয়ে জানক।",
    h1: "গোপনীয়তা নীতি",
  },
  "terms": {
    title: "নিয়ম আৰু চৰ্ত — axomexam অধ্যয়ন সামগ্ৰী",
    meta: "axomexam.in ব্যৱহাৰ কৰাৰ নিয়ম আৰু চৰ্ত — অধ্যয়ন সামগ্ৰী কেৱল ব্যক্তিগত, শিক্ষামূলক ব্যৱহাৰৰ বাবে।",
    h1: "নিয়ম আৰু চৰ্ত",
  },
  "disclaimer": {
    title: "দায়মুক্তি — axomexam চৰকাৰী ৱেবছাইট নহয়",
    meta: "axomexam.in অসম চৰকাৰ, APSC বা SLPRB ৰ সৈতে জড়িত নহয়; ইয়াৰ প্ৰশ্নসমূহ কেৱল অনুশীলনৰ বাবে।",
    h1: "দায়মুক্তি",
  },
  "editorial-policy": {
    title: "সম্পাদকীয় নীতি — axomexam",
    meta: "axomexam.in ৰ সামগ্ৰী কেনেদৰে প্ৰস্তুত, পৰীক্ষা আৰু শুধৰণি কৰা হয়, আৰু বিজ্ঞাপনক সম্পাদকীয় সিদ্ধান্তৰ পৰা কেনেদৰে পৃথক ৰখা হয়।",
    h1: "সম্পাদকীয় নীতি",
  },
  "editorial-team": {
    title: "সম্পাদকীয় দল — axomexam",
    meta: "axomexam.in ৰ প্ৰশ্ন-সংগ্ৰহ, নোট আৰু মক টেষ্ট প্ৰস্তুত আৰু পৰীক্ষা কৰা সম্পাদকীয় দলৰ বিষয়ে জানক।",
    h1: "সম্পাদকীয় দল",
  },
  "sources": {
    title: "উৎস — axomexam",
    meta: "axomexam.in ৰ প্ৰশ্ন আৰু তথ্য ক'ৰ পৰা লোৱা হয় — প্ৰামাণিক পুথি, চৰকাৰী জাননী আৰু বিশ্বাসযোগ্য অনলাইন উৎস।",
    h1: "উৎস",
  },
  "updates": {
    title: "শেহতীয়া হালনাগাদ — axomexam",
    meta: "axomexam.in ৰ নতুন প্ৰশ্ন-সংগ্ৰহ, মক টেষ্ট, নোট আৰু বিষয়ৰ শেহতীয়া হালনাগাদ।",
    h1: "শেহতীয়া হালনাগাদ",
  },
  "categories": {
    title: "সকলো অনুশীলন শিতান — GK, গণিত, যুক্তিতৰ্ক",
    meta: "axomexam.in ৰ সকলো অনুশীলন শিতান — সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তিতৰ্ক, ইংৰাজী, কম্পিউটাৰ আৰু অধিক।",
    h1: "সকলো অনুশীলন শিতান",
  },
  "exams": {
    title: "আপোনাৰ পৰীক্ষা — বিনামূলীয়া প্ৰশ্ন-সংগ্ৰহ",
    meta: "আপোনাৰ পৰীক্ষা বাছনি কৰক আৰু ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ পাঠ্যক্ৰম, বিষয়ভিত্তিক প্ৰশ্ন আৰু নোট চাওক — বিনামূলীয়া।",
    h1: "আপোনাৰ পৰীক্ষা",
  },
  "ebooks": {
    title: "বিনামূলীয়া ই-বুক আৰু PDF নোট — axomexam",
    meta: "ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ বাবে বিষয়ভিত্তিক দ্বিভাষিক ই-বুক আৰু PDF নোট — অনলাইনত বিনামূলীয়াকৈ পঢ়ক।",
    h1: "বিনামূলীয়া ই-বুক আৰু PDF নোট",
  },
  "downloads": {
    title: "বিনামূলীয়া PDF ডাউনলোড — axomexam",
    meta: "অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে প্ৰিন্ট-যোগ্য PDF নোট আৰু অধ্যয়ন সামগ্ৰী বিনামূলীয়াকৈ ডাউনলোড কৰক।",
    h1: "বিনামূলীয়া PDF ডাউনলোড",
  },
  "download-app": {
    title: "axomexam এপ ডাউনলোড কৰক",
    meta: "axomexam এণ্ড্ৰইড এপ ডাউনলোড কৰক — অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক প্ৰশ্নোত্তৰ আৰু মক টেষ্ট।",
    h1: "axomexam এপ ডাউনলোড কৰক",
  },
  "submit": {
    title: "প্ৰশ্ন আগবঢ়াওক — axomexam",
    meta: "axomexam.in লৈ নতুন প্ৰশ্ন আগবঢ়াওক বা ভুল জনাওক — আপোনাৰ অৱদান আমাৰ প্ৰশ্ন-সংগ্ৰহ উন্নত কৰে।",
    h1: "প্ৰশ্ন আগবঢ়াওক",
  },
  "mock-test": {
    title: "বিনামূলীয়া মক টেষ্ট — ADRE, APSC, অসম আৰক্ষী",
    meta: "ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ বাবে বিষয়ভিত্তিক সময়বদ্ধ মক টেষ্ট — দ্বিভাষিক, তৎক্ষণাত ফলাফল আৰু উত্তৰ।",
    h1: "বিনামূলীয়া মক টেষ্ট",
  },
  "previous-year": {
    title: "বিগত বছৰৰ প্ৰশ্নকাকত — ADRE, APSC, অসম আৰক্ষী",
    meta: "ADRE, APSC, অসম আৰক্ষী, SSC, ৰে'লৱে আৰু গুৱাহাটী উচ্চ ন্যায়ালয়ৰ বিগত বছৰৰ প্ৰশ্নকাকত উত্তৰসহ — বিনামূলীয়া।",
    h1: "বিগত বছৰৰ প্ৰশ্নকাকত",
  },
  "current-affairs": {
    title: "চলিত ঘটনাৱলী — প্ৰশ্নোত্তৰ | axomexam",
    meta: "সাম্প্ৰতিক চলিত ঘটনাৱলীৰ প্ৰশ্ন আৰু উত্তৰ — অসম আৰু ভাৰতৰ বাবে, ADRE, APSC আৰু অসম আৰক্ষী পৰীক্ষাৰ দ্বিভাষিক প্ৰস্তুতি।",
    h1: "চলিত ঘটনাৱলী",
  },
};

/* ------------------------------------------------------------------ */
/* Assamese head strings per page type                                 */
/* ------------------------------------------------------------------ */

const EXAM_LIST_AS = "ADRE, APSC, অসম আৰক্ষী";
/* Short suffixes: a long suffix shrinks the room left for the page name and
   makes two long names truncate to the same string. */
const CAT_SUFFIX = "প্ৰশ্ন | ADRE, APSC";
const TOPIC_SUFFIX = "প্ৰশ্নোত্তৰ | ADRE";

/* Assamese question words appended to the keyword set. Search engines treat
   the two scripts as separate queries, so a page reachable by an Assamese
   query needs Assamese terms in its keywords, not the English ones. */
const KW_AS = ["প্ৰশ্ন উত্তৰ", "MCQ", "কুইজ", "অনুশীলন প্ৰশ্ন", "অসম"];
const KW_AS_TAIL = "বিনামূলীয়া প্ৰশ্ন";

/* Build the Assamese keyword list for a page: its own Assamese name plus the
   generic question words, deduped and length-capped. */
function keywordsAs(name) {
  const base = String(name || "")
    .replace(/\s*—\s*[\s\S]*$/, "")
    .replace(/[।.]\s*$/, "")
    /* The meta content is a comma-separated list, so a comma inside the page
       name ("Time, Speed & Distance") would split into phantom keywords. */
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const out = [];
  const seen = new Set();
  for (const t of [base, ...KW_AS.map((w) => `${base} ${w}`), KW_AS_TAIL]) {
    const v = t.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out.join(", ");
}

/* Assamese text runs longer than English for the same idea, and some data
   titles are whole descriptive phrases, so trim to a search-snippet-friendly
   length at a word boundary. */
function clamp(s, max) {
  s = String(s || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.5 ? cut.slice(0, sp) : cut).replace(/[\s—–,-]+$/, "") + "…";
}

const titleCase = (s) => String(s || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* Longest path prefix present in a name map. */
function deepest(map, segs) {
  for (let i = segs.length; i > 0; i--) {
    const hit = map.get(segs.slice(0, i).join("/"));
    if (hit && hit.as) return hit;
  }
  return null;
}

/* Assamese label for a path: the longest known prefix, plus a readable form
   of any trailing segments the map does not cover (so a child page is never
   labelled exactly like its parent). */
function labelFor(map, segs) {
  for (let i = segs.length; i > 0; i--) {
    const hit = map.get(segs.slice(0, i).join("/"));
    if (hit && hit.as) {
      const tail = segs.slice(i).map(titleCase).join(" ").trim();
      return tail ? `${hit.as} ${tail}` : hit.as;
    }
  }
  return segs.map(titleCase).join(" ").trim();
}

/* A title that always keeps the distinguishing suffix (the exam name) even
   after trimming, so two pages that share a topic name stay distinct. */
function titled(name, suffix) {
  /* Keep at least 24 chars of the name: a smaller budget makes two long
     sibling names truncate to the same string and collide. */
  const budget = Math.max(24, 57 - suffix.length - 3);
  return clamp(name, budget) + " — " + suffix;
}

function headFor(rel) {
  const segs = rel === "" ? [] : rel.split("/");

  if (UTILITY_AS[rel]) return UTILITY_AS[rel];

  /* /topic/<cat>/<sub?>/<sec?>/<topic>/ */
  if (segs[0] === "topic" && segs.length >= 2) {
    const trail = segs.slice(1);
    let name = deepest(catNames, trail) ? labelFor(catNames, trail) : "";
    if (!name) name = (contentTitle.get(trail[trail.length - 1]) || {}).as || "";
    if (name) {
      const desc = topicDescAs.get(trail.join("/"));
      return {
        title: titled(name, TOPIC_SUFFIX),
        meta: desc
          ? clamp(desc, 158)
          : `${EXAM_LIST_AS} পৰীক্ষাৰ বাবে ${name}ৰ গুৰুত্বপূৰ্ণ প্ৰশ্ন আৰু ব্যাখ্যা — বিনামূলীয়া, দ্বিভাষিক।`,
        h1: `${name} — প্ৰশ্নোত্তৰ`,
      };
    }
  }

  /* /category/<cat>/... */
  if (segs[0] === "category") {
    const rest = segs.slice(1);
    /* /category/<cat>/<sub>/read is the sub's article page, not the hub. */
    const isRead = rest[rest.length - 1] === "read";
    const base = isRead ? rest.slice(0, -1) : rest;
    const label = labelFor(catNames, base);
    if (label) {
      const head = isRead ? `${label} — প্ৰবন্ধ` : label;
      const meta = isRead
        ? `${EXAM_LIST_AS} পৰীক্ষাৰ বাবে ${label}ৰ বিষয়ে বিশদ প্ৰবন্ধ, ধাৰণা আৰু উদাহৰণসহ ব্যাখ্যা — বিনামূলীয়া, দ্বিভাষিক।`
        : `${EXAM_LIST_AS} পৰীক্ষাৰ বাবে ${label}ৰ প্ৰশ্ন আৰু ব্যাখ্যা — বিনামূলীয়া, দ্বিভাষিক, sign-up নাই।`;
      return {
        title: titled(head, CAT_SUFFIX),
        meta,
        h1: `${head} — প্ৰশ্ন আৰু উত্তৰ`,
      };
    }
  }

  /* /exams/<exam>/<sec?>/<topic?>/ */
  if (segs[0] === "exams" && segs.length >= 2) {
    const trail = segs.slice(1);
    let name = (examNames.get(trail.join("/")) || {}).as || "";
    const exam = (examNames.get(trail[0]) || {}).as || "";
    if (!name) {
      const ct = contentTitle.get(trail[trail.length - 1]) || {};
      name = ct.as || "";
    }
    /* Exam leaf names are sometimes a whole description ("X — detail (Code)");
       keep the label plus any bracketed code so sibling leaves (2D/3D) stay
       distinct. */
    const shortName = (() => {
      const base = name.split(/\s*—\s*/)[0].replace(/[।.]\s*$/, "").trim() || name;
      const par = /\(([^)]*)\)/.exec(name);
      /* `base` is the text before the em-dash, so it usually still carries
         the trailing "(...)" that `par` matched; appending it again would
         produce "Name (X) (X)". */
      if (!par || base.endsWith(`(${par[1]})`)) return base;
      return `${base} (${par[1]})`;
    })();
    if (name) {
      if (segs.length === 2) {
        return {
          title: `${name} পৰীক্ষাৰ প্ৰস্তুতি — বিনামূলীয়া প্ৰশ্ন | axomexam`,
          meta: `${name} পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক প্ৰশ্ন, পাঠ্যক্ৰম আৰু বিগত বছৰৰ প্ৰশ্নকাকত — সকলো বিষয়, sign-up নাই।`,
          h1: `${name} পৰীক্ষাৰ প্ৰস্তুতি`,
        };
      }
      return {
        title: titled(shortName, `${exam} | প্ৰশ্ন আৰু উত্তৰ`),
        meta: `${exam} পৰীক্ষাৰ বাবে ${shortName}ৰ প্ৰশ্ন আৰু ব্যাখ্যা — বিনামূলীয়া, দ্বিভাষিক।`,
        h1: `${shortName} — ${exam}`,
      };
    }
    return {
      title: titled(shortName || "যুক্তিতৰ্ক", `${exam || "অসম আৰক্ষী"} | প্ৰশ্ন আৰু উত্তৰ`),
      meta: `${exam || "অসম আৰক্ষী"} পৰীক্ষাৰ বাবে ${shortName || "যুক্তিতৰ্ক"}ৰ প্ৰশ্ন আৰু ব্যাখ্যা — বিনামূলীয়া, দ্বিভাষিক।`,
      h1: `${shortName || "যুক্তিতৰ্ক"} — ${exam || "অসম আৰক্ষী"}`,
    };
  }

  /* /mock-test/<cat>/<sub?>/set-N? */
  if (segs[0] === "mock-test" && segs.length >= 2) {
    const setIdx = segs.findIndex((s) => /^set-\d+$/.test(s));
    const setNum = setIdx >= 0 ? segs[setIdx].replace("set-", "") : "";
    const subSlug = (setIdx >= 0 ? segs.slice(0, setIdx) : segs).slice(-1)[0];
    const subEn = subSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const subAs = mockSubjects[subEn] || subEn;
    return {
      title: setNum
        ? `${subAs} মক টেষ্ট ছেট ${setNum} — ${EXAM_LIST_AS}`
        : `${subAs} মক টেষ্ট — ${EXAM_LIST_AS}`,
      meta: `বিনামূলীয়া সময়বদ্ধ ${subAs} মক টেষ্ট${setNum ? ` ছেট ${setNum}` : ""} — 25 টা দ্বিভাষিক প্ৰশ্ন, তৎক্ষণাত ফলাফল আৰু উত্তৰ।`,
      h1: setNum ? `${subAs} মক টেষ্ট — ছেট ${setNum}` : `${subAs} মক টেষ্ট`,
    };
  }

  /* /previous-year/<exam>/<stream?>/<year?>/ */
  if (segs[0] === "previous-year" && segs.length >= 2) {
    const label = segs
      .slice(1)
      .map((s) => prevSeg[s] || (/^\d{4}$/.test(s) ? s : s.replace(/-/g, " ")))
      .join(" ");
    return {
      title: `${label} বিগত বছৰৰ প্ৰশ্নকাকত | axomexam`,
      meta: `${label}ৰ বিগত বছৰৰ প্ৰশ্নকাকত উত্তৰসহ সমাধান কৰক — বিনামূলীয়া, দ্বিভাষিক।`,
      h1: `${label} বিগত বছৰৰ প্ৰশ্নকাকত`,
    };
  }

  /* /ebooks/<book>/ */
  if (segs[0] === "ebooks" && segs.length >= 2) {
    const book = bookNames.get(segs[1]) || {};
    const name = book.as || book.en || segs[1].replace(/-/g, " ");
    return {
      title: `${name} ই-বুক — বিনামূলীয়া PDF | axomexam`,
      meta: `${name}ৰ বিনামূলীয়া দ্বিভাষিক ই-বুক অনলাইনত পঢ়ক — অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে, sign-up নাই।`,
      h1: `${name} ই-বুক`,
    };
  }

  /* /current-affairs/<id>/ */
  if (segs[0] === "current-affairs" && segs.length >= 2) {
    const name = (caNames.get(segs[1]) || {}).as || "";
    if (name) {
      return {
        title: `${name} চলিত ঘটনাৱলী — প্ৰশ্নোত্তৰ | axomexam`,
        meta: `${name} চলিত ঘটনাৱলীৰ প্ৰশ্ন আৰু উত্তৰ — ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে দ্বিভাষিক অনুশীলন।`,
        h1: `${name} চলিত ঘটনাৱলী`,
      };
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* internal-link rewriting inside a twin                               */
/* ------------------------------------------------------------------ */

/* Asset prefixes that must never be moved under /as/. */
const ASSET_RE = /^\/(css|js|images|app|data|fonts|favicon|apple-touch|android-chrome|manifest|og-image|feed\.xml|sitemap|robots|ads\.txt|sw\.js|llms|_headers|_redirects|\.well-known|404\.html)/;

/* Point a twin's internal page links at the matching /as/ page, but only
   when that twin actually exists, so a link never 404s. The runtime reads
   the language from the URL, so these links also keep the SPA in Assamese. */
function rewriteInternalLinks(html, twinSet) {
  const asFor = (rel) => (rel === "" ? "/as/" : twinSet.has(rel) ? `/as/${rel}/` : null);

  /* href="/..." */
  html = html.replace(/href="(\/[^"]*)"/g, (m, v) => {
    if (v.startsWith("//")) return m;
    if (ASSET_RE.test(v)) return m;
    const [p, suffix] = /^([^?#]*)([?#].*)?$/.exec(v).slice(1);
    const rel = p.replace(/^\/+|\/+$/g, "");
    const as = asFor(rel);
    return as ? `href="${as}${suffix || ""}"` : m;
  });

  /* absolute https://axomexam.in/<rel>/ inside JSON-LD (breadcrumb items) */
  html = html.replace(/https:\/\/axomexam\.in(\/[^"'\s)]*)?/g, (m, p) => {
    if (!p) return m;
    const rel = p.replace(/^\/+|\/+$/g, "");
    if (!rel) return m;
    const as = asFor(rel);
    return as ? `https://axomexam.in${as}` : m;
  });

  return html;
}

/* ------------------------------------------------------------------ */
/* twin construction                                                   */
/* ------------------------------------------------------------------ */

function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hreflangBlock(enURL, asURL) {
  return [
    `<link rel="alternate" hreflang="en" href="${enURL}" />`,
    `<link rel="alternate" hreflang="as" href="${asURL}" />`,
    `<link rel="alternate" hreflang="x-default" href="${enURL}" />`,
  ].join("\n  ");
}

/* Replace a meta tag's content by matching on any of the given substrings. */
function setMeta(html, matches, value) {
  /* Each entry is a separate tag to update (og:title and twitter:title are
     two tags), so replace every one, not just the first found. */
  for (const m of matches) {
    /* Require whitespace after the attribute so "og:locale" cannot also
       match the "og:locale:alternate" tag. */
    const re = new RegExp(`(<meta[^>]*${m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s[^>]*content=")[^"]*(")`, "gi");
    html = html.replace(re, `$1${escAttr(value)}$2`);
  }
  return html;
}

/* Some English pages ship two `keywords` metas: the English list plus a
   `lang="as"` variant. Once `setMeta` writes the same Assamese value into
   both, the twin would carry a duplicate tag, so keep only the first. */
function dedupeKeywords(html) {
  let seen = false;
  return html.replace(/[ \t]*<meta name="keywords"[^>]*>\s*\n?/g, (tag) => {
    if (seen) return "";
    seen = true;
    return tag;
  });
}

/* Stable-partition the direct children of every `.qa-item` so the Assamese
   sibling of each English/Assamese pair comes first. The pairs carry a plain
   `lang` attribute (not `data-axo-lang`), so both halves stay visible; only
   the reading order changes, which is what a crawler sees first on /as/. */
function assameseFirst(html) {
  const OPEN = '<div class="qa-item"';
  let out = "";
  let pos = 0;
  for (;;) {
    const at = html.indexOf(OPEN, pos);
    if (at < 0) break;
    const openEnd = html.indexOf(">", at) + 1;
    /* Balanced scan for the qa-item's own closing tag; a lazy regex would
       stop at the nested options wrapper, which also ends in `</div></div>`. */
    const re = /<div\b|<\/div>/g;
    re.lastIndex = openEnd;
    let depth = 1;
    let end = -1;
    let m;
    while ((m = re.exec(html))) {
      depth += m[0] === "<div" ? 1 : -1;
      if (depth === 0) { end = m.index + 6; break; }
    }
    if (end < 0) break;
    const item = html.slice(at, end);
    const head = openEnd - at;
    const inner = item.slice(head, item.length - 6);
    const kids = [];
    let d = 0, start = -1;
    re.lastIndex = 0;
    while ((m = re.exec(inner))) {
      if (m[0] === "<div") {
        if (d === 0) start = m.index;
        d++;
      } else {
        d--;
        if (d === 0) kids.push(inner.slice(start, m.index + 6));
      }
    }
    for (let i = 0; i < kids.length - 1; i++) {
      if (/^<div lang="en"/.test(kids[i]) && /^<div lang="as"/.test(kids[i + 1])) {
        const tmp = kids[i];
        kids[i] = kids[i + 1];
        kids[i + 1] = tmp;
        i++;
      }
    }
    out += html.slice(pos, at) + item.slice(0, head) + kids.join("") + "</div>";
    pos = end;
  }
  return out + html.slice(pos);
}

/* Put the `data-axo-lang="as"` sibling panel before its `en` twin inside the
   two blocks that ship both. CSS hides one of the pair, so the reader never
   sees the swap; only the crawler reading the served HTML does. */
function assamesePanelFirst(html) {
  /* extra-content: <article en> then <article as> */
  html = html.replace(
    /(<section class="section axo-extra-content"[\s\S]*?<\/section>)/,
    (block) => {
      const parts = block.split(/(?=<article\b[^>]*data-axo-lang=)/);
      if (parts.length < 3) return block;
      const head = parts[0];
      const panels = parts.slice(1);
      const asIdx = panels.findIndex((p) => /data-axo-lang="as"/.test(p));
      const enIdx = panels.findIndex((p) => /data-axo-lang="en"/.test(p));
      if (asIdx < 0 || enIdx < 0 || asIdx < enIdx) return block;
      const [asP] = panels.splice(asIdx, 1);
      panels.splice(enIdx, 0, asP);
      return head + panels.join("");
    }
  );
  /* editorial credit: <div en> then <div as> */
  html = html.replace(
    /(<section class="section" data-axo-editorial-credit="1"[\s\S]*?<\/section>)/,
    (block) => {
      const parts = block.split(/(?=<div\b[^>]*data-axo-lang=)/);
      if (parts.length < 3) return block;
      const head = parts[0];
      const panels = parts.slice(1);
      const asIdx = panels.findIndex((p) => /data-axo-lang="as"/.test(p));
      const enIdx = panels.findIndex((p) => /data-axo-lang="en"/.test(p));
      if (asIdx < 0 || enIdx < 0 || asIdx < enIdx) return block;
      const [asP] = panels.splice(asIdx, 1);
      panels.splice(enIdx, 0, asP);
      return head + panels.join("");
    }
  );
  return html;
}

function buildTwin(enHTML, rel, head) {
  const asURL = `${BASE}/as/${rel ? rel + "/" : ""}`;

  let out = enHTML;

  /* language + self URLs */
  out = out.replace(/<html([^>]*)\blang="[^"]*"/, '<html$1lang="as"');
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${asURL}$2`);
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${asURL}$2`);

  /* Mark the body as Assamese so the correct language renders before (and
     without) JS. css/style.css keys visibility on body[data-lang=as] and the
     runtime sets the same value from the URL, so this only makes the served
     HTML agree with what the router would do. */
  out = out.replace(/<body([^>]*)>/, (m, attrs) => {
    const cleaned = attrs.replace(/\s*data-lang="[^"]*"/g, "");
    return `<body${cleaned} data-lang="as">`;
  });

  /* any absolute self URL inside the JSON-LD graph -> the /as/ twin */
  if (rel) {
    const selfRe = new RegExp(`${BASE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/${rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`, "g");
    out = out.replace(selfRe, `${BASE}/as/${rel}/`);
  }

  /* Assamese head text */
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(head.title)}</title>`);
  out = setMeta(out, ['name="description"'], head.meta);
  out = setMeta(out, ['property="og:title"', 'name="twitter:title"'], head.title);
  out = setMeta(out, ['property="og:description"', 'name="twitter:description"'], head.meta);
  out = setMeta(out, ['property="og:locale"'], "as_IN");
  out = setMeta(out, ['property="og:locale:alternate"'], "en_IN");

  /* Assamese keywords. The English page's `keywords` list is a list of
     English queries; on the Assamese twin it would advertise the wrong
     language, so replace it with the Assamese name plus the generic
     Assamese question words. */
  out = setMeta(out, ['name="keywords"'], keywordsAs(head.h1 || head.title));
  out = dedupeKeywords(out);

  /* Assamese H1 */
  out = out.replace(/(<h1[^>]*>)[\s\S]*?(<\/h1>)/, `$1${escAttr(head.h1)}$2`);

  /* The twin is the Assamese page, so its schema must not claim English.
     `inLanguage` is `["en","as"]` on every English page (the site is
     bilingual), but a `/as/` page is Assamese-primary. */
  out = out.replace(/"inLanguage":\s*\[\s*"en"\s*,\s*"as"\s*\]/g, '"inLanguage":["as"]');
  out = out.replace(/"inLanguage":\s*"en"/g, '"inLanguage":"as"');

  /* Lead with Assamese: put the Assamese half of every bilingual pair first
     in the served HTML so a crawler reads Assamese before English. */
  out = assamesePanelFirst(assameseFirst(out));

  return out;
}

/* Add the hreflang trio right after the canonical, replacing any previous
   set so the tool is idempotent. */
function addHreflang(html, rel) {
  const enURL = `${BASE}/${rel ? rel + "/" : ""}`;
  const asURL = `${BASE}/as/${rel ? rel + "/" : ""}`;
  const hl = hreflangBlock(enURL, asURL);
  if (/hreflang="as"/.test(html)) {
    html = html.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n?/g, "");
  }
  return html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  ${hl}`);
}

function addHreflangToEnglish(enHTML, rel) {
  if (/hreflang="as"/.test(enHTML)) return enHTML;
  return addHreflang(enHTML, rel);
}

/* ------------------------------------------------------------------ */
/* walk                                                                */
/* ------------------------------------------------------------------ */

const enPages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === "index.html") {
      const rel = path.relative(ROOT, dir).split(path.sep).join("/");
      if (rel === "") enPages.push({ rel: "", file: path.join(dir, e.name) });
      else enPages.push({ rel, file: path.join(dir, e.name) });
    }
  }
})(ROOT);
/* the site root is a single file, not a directory */
enPages.push({ rel: "", file: path.join(ROOT, "index.html") });

const seen = new Set();
const jobs = [];
let skipped = 0;
for (const { rel, file } of enPages) {
  if (seen.has(rel)) continue;
  seen.add(rel);
  if (SKIP_ROUTES.has(rel)) continue;
  if (ONLY && rel !== ONLY) continue;
  /* A page that is deliberately noindex (a duplicate stub or a redirect)
     gets no twin, and must not claim a head string in the uniqueness pass
     either, or an indexable sibling is pushed onto an uglier fallback. */
  if (/content="noindex/i.test(fs.readFileSync(file, "utf8"))) { skipped++; continue; }
  const head = headFor(rel);
  if (!head) continue;
  jobs.push({
    rel, file,
    head: { title: clamp(head.title, 58), meta: clamp(head.meta, 158), h1: head.h1 },
  });
}

/* The set of pages that will have a twin, so a twin only links to a twin
   that exists. */
const twinSet = new Set(jobs.map((j) => j.rel));

/* Last-resort uniqueness: a few sibling names differ only in a token that
   sits after the trim point (Mensuration 2D vs 3D). Append the trailing
   path segment so the head stays distinct. */
(function uniquify() {
  const usedT = new Set(), usedH = new Set();
  for (const j of jobs) {
    const segs = j.rel.split("/").filter(Boolean);
    let n = 0, t = j.head.title, h = j.head.h1;
    while ((usedT.has(t) || usedH.has(h)) && n < segs.length) {
      n++;
      const tok = segs.slice(-n).map(titleCase).join(" ");
      t = `${clamp(j.head.title, 57 - tok.length - 3)} (${tok})`;
      h = `${j.head.h1} (${tok})`;
    }
    j.head.title = t;
    j.head.h1 = h;
    usedT.add(t);
    usedH.add(h);
  }
})();

let built = 0, changed = 0;
const done = new Set();

for (const { rel, file, head } of jobs) {
  if (done.has(rel)) continue;
  done.add(rel);
  if (LIMIT && built >= LIMIT) break;

  const enHTML = fs.readFileSync(file, "utf8");

  const asDir = path.join(ROOT, "as", rel);
  const asFile = path.join(asDir, "index.html");

  const enOut = addHreflangToEnglish(enHTML, rel);
  const asOut = addHreflang(rewriteInternalLinks(buildTwin(enOut, rel, head), twinSet), rel);

  const enDirty = enOut !== enHTML;
  const asPrev = fs.existsSync(asFile) ? fs.readFileSync(asFile, "utf8") : null;
  const asDirty = asOut !== asPrev;

  if (!CHECK) {
    if (enDirty) fs.writeFileSync(file, enOut);
    if (asDirty) {
      fs.mkdirSync(asDir, { recursive: true });
      fs.writeFileSync(asFile, asOut);
    }
  }
  built++;
  if (enDirty || asDirty) changed++;
}

console.log(`as-twins: pages ${enPages.length} | built ${built} | changed ${changed} | skipped ${skipped}`);
