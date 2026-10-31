#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam - tools/build-adre-grade-3.js

   Builds the "ADRE 3.0 Grade III" exam book from
   tools/adre-grade-3.structure.js + tools/adre-grade-3.notes.js
   + the question banks in tools/adre-grade-3.questions.js.

   Writes, idempotently:
     data/exams/adre-grade-3.json
     data/exams/adre-grade-3/syllabus.json
     data/exams/adre-grade-3/<section>.json
     data/exams/adre-grade-3/<sec>/<sub>/index.json
     data/exams/adre-grade-3/<sec>/<sub>/question-001.json
     exams/adre-grade-3/index.html
     exams/adre-grade-3/<section>/index.html
     exams/adre-grade-3/<sec>/<sub>/index.html

   Like data/exams/adre-grade-4, each topic keeps its whole bank in a
   single question-001.json; index.json is only the manifest.

   Usage:
     node tools/build-adre-grade-3.js
     node tools/build-adre-grade-3.js --dry-run
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const { EXAM, SYLLABUS, NOTES } = require("./adre-grade-3.structure.js");
const QUESTIONS = require("./adre-grade-3.questions.js");

const BASE = "https://axomexam.in";
const GRADE4 = path.join(ROOT, "exams", "adre-grade-4");
const DATE = "2026-10-29";

let written = 0;
let skipped = 0;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function lang(obj, key) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[key] || obj.en || "";
}

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  const next = content.endsWith("\n") ? content : content + "\n";
  let prev = null;
  try { prev = fs.readFileSync(abs, "utf8"); } catch (e) {}
  if (prev === next) { skipped++; return; }
  if (!DRY) {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, next, "utf8");
  }
  written++;
}

function writeJSON(rel, obj) {
  write(rel, JSON.stringify(obj, null, 2));
}

function removeFile(rel) {
  const abs = path.join(ROOT, rel);
  try { fs.rmSync(abs); } catch (e) {}
}

/* Names of the question-*.json files already on disk for a topic, sorted so
   question-010.json follows question-009.json rather than question-002.json. */
function listQuestionFiles(rel) {
  try {
    return fs.readdirSync(path.join(ROOT, rel))
      .filter((n) => /^question-.*\.json$/i.test(n))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch (e) {
    return [];
  }
}

function readQuestions(rel) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
    if (Array.isArray(d)) return d.filter((q) => q && typeof q === "object");
    if (d && typeof d === "object") return [d];
  } catch (e) {}
  return [];
}

/* JSON in the style of data/exams/index.json: objects whose values are all
   short strings collapse onto one line, deeper structures stay expanded. */
function compactJSON(value, indent, keyIndent) {
  const pad = " ".repeat(indent);
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const items = value.map((v) => pad + "  " + compactJSON(v, indent + 2, indent + 2));
    return "[\n" + items.join(",\n") + "\n" + pad + "]";
  }
  const keys = Object.keys(value);
  const inline = keys.every((k) => {
    const v = value[k];
    return v === null || typeof v !== "object";
  });
  const oneLine = "{" + keys.map((k) => ` ${JSON.stringify(k)}: ${JSON.stringify(value[k])}`).join(",") + " }";
  if (inline && oneLine.length + indent <= 150) return oneLine;
  const lines = keys.map((k) => {
    const v = value[k];
    return pad + "  " + JSON.stringify(k) + ": " + compactJSON(v, indent + 2, indent + 2);
  });
  return "{\n" + lines.join(",\n") + "\n" + pad + "}";
}

/* ---------------- chrome reuse ----------------
   The Grade IV pages carry the final head (fonts, analytics, JSON-LD)
   and footer. We copy them verbatim and swap only the page-specific
   parts. */
function chrome() {
  const leaf = fs.readFileSync(
    path.join(GRADE4, "elementary-mathematics", "number-system", "index.html"),
    "utf8"
  );
  const headEnd = leaf.indexOf("</head>") + "</head>".length;
  const bodyStart = leaf.indexOf("<body>");
  const footerStart = leaf.indexOf("<!-- ===== Footer ===== -->");
  const guard = leaf.indexOf('<script data-axo-guard="1">');
  return {
    head: leaf.slice(0, headEnd),
    bodyOpenToMain: leaf.slice(bodyStart, leaf.indexOf('<main id="app"')),
    footer: leaf.slice(footerStart),
    guardScript: guard >= 0 ? leaf.slice(guard, leaf.indexOf("</script>", guard) + 9) : "",
  };
}
const CHROME = chrome();

function pageHead(opts) {
  let head = CHROME.head;
  const set = (re, val) => { head = head.replace(re, val); };
  set(/<title>[\s\S]*?<\/title>/, `<title>${esc(opts.title)}</title>`);
  set(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(opts.desc)}" />`);
  set(/<meta name="theme-color"[^>]*>/, `<meta name="theme-color" content="${opts.themeColor}" />`);
  set(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${opts.canonical}" />`);
  set(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(opts.title)}" />`);
  set(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(opts.desc)}" />`);
  set(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${opts.canonical}" />`);
  set(/<meta property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${esc(opts.imageAlt)}" />`);
  set(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(opts.title)}" />`);
  set(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(opts.desc)}" />`);
  set(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${BASE}${EXAM.cover}" />`);
  set(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${BASE}${EXAM.cover}" />`);
  const ldStart = head.indexOf('<script type="application/ld+json">');
  if (ldStart >= 0) {
    const ldEnd = head.indexOf("</script>", ldStart) + "</script>".length;
    head = head.slice(0, ldStart) + opts.jsonld + head.slice(ldEnd);
  }
  return head;
}

/* ---------------- structured data ---------------- */
function jsonld(opts) {
  const graph = [
    {
      "@type": "WebPage",
      "@id": opts.canonical + "#webpage",
      url: opts.canonical,
      name: opts.title,
      inLanguage: ["en", "as"],
      isPartOf: { "@id": BASE + "/#website" },
      publisher: { "@id": BASE + "/#organization" },
      description: opts.desc,
      primaryImageOfPage: { "@type": "ImageObject", url: BASE + EXAM.cover },
      breadcrumb: { "@id": opts.canonical + "#breadcrumb" },
      datePublished: DATE,
      dateModified: DATE,
      isAccessibleForFree: true,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".page-desc"] },
    },
  ];
  if (opts.teaches) {
    graph.push({
      "@type": "LearningResource",
      "@id": opts.canonical + "#learningresource",
      name: opts.title,
      description: opts.desc,
      learningResourceType: "Exam question bank",
      educationalLevel: "Competitive exams",
      teaches: opts.teaches,
      about: { "@type": "Thing", name: opts.teaches },
      inLanguage: ["en", "as"],
      isPartOf: { "@id": BASE + "/#website" },
      publisher: { "@id": BASE + "/#organization" },
      datePublished: DATE,
      dateModified: DATE,
      isAccessibleForFree: true,
      author: { "@id": BASE + "/#organization" },
    });
  }
  graph.push({
    "@type": "BreadcrumbList",
    "@id": opts.canonical + "#breadcrumb",
    itemListElement: opts.crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  });
  if (opts.faqs && opts.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": opts.canonical + "#faqpage",
      url: opts.canonical,
      name: "Frequently Asked Questions",
      isPartOf: { "@id": BASE + "/#website" },
      inLanguage: ["en", "as"],
      mainEntity: opts.faqs,
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function faqEntities(topicId) {
  const note = NOTES[topicId];
  if (!note) return [];
  const out = [];
  for (const f of note.faqs || []) {
    out.push({ "@type": "Question", name: f.q.en, acceptedAnswer: { "@type": "Answer", text: f.a.en } });
    out.push({ "@type": "Question", name: f.q.as, acceptedAnswer: { "@type": "Answer", text: f.a.as } });
  }
  return out;
}

function breadcrumbHTML(crumbs) {
  const items = crumbs.map((c, i) =>
    i === crumbs.length - 1 ? `<span>${esc(c.name)}</span>` : `<a href="${c.url}">${esc(c.name)}</a>`
  );
  return `<nav class="breadcrumb">${items.join('<span class="bc-sep">/</span>')}</nav>`;
}

/* ---------------- question rendering ---------------- */
function normalize(q) {
  const options = Array.isArray(q.options)
    ? q.options.map((o) => ({ en: lang(o, "en"), as: lang(o, "as") })).filter((o) => o.en)
    : [];
  const correct = Number.isInteger(q.correct) ? q.correct : -1;
  let aEn = "";
  let aAs = "";
  if (correct >= 0 && options[correct]) {
    const letter = String.fromCharCode(65 + correct);
    aEn = `${letter}) ${options[correct].en}`;
    aAs = options[correct].as ? `${letter}) ${options[correct].as}` : "";
  }
  return {
    q: { en: lang(q.q, "en"), as: lang(q.q, "as") },
    options,
    a: { en: aEn, as: aAs },
    ex: { en: lang(q.explanation, "en"), as: lang(q.explanation, "as") },
  };
}

function qaItemHTML(q, n) {
  const parts = [
    `<div lang="en" style="font-weight:800; font-size:1.02rem; line-height:1.5; margin-bottom:6px;">Q${n}. ${esc(q.q.en)}</div>`,
  ];
  if (q.q.as) parts.push(`<div lang="as" style="color:#64748b; font-size:0.9rem; line-height:1.6; margin-bottom:8px;">${esc(q.q.as)}</div>`);
  if (q.options.length) {
    const opts = q.options
      .map((o, i) => `<div lang="en" style="margin:2px 0;">(${String.fromCharCode(65 + i)}) ${esc(o.en)}${o.as ? ` <span lang="as" style="color:#64748b;">${esc(o.as)}</span>` : ""}</div>`)
      .join("");
    parts.push(`<div style="margin-top:8px; color:#334155;">${opts}</div>`);
  }
  if (q.a.en) parts.push(`<div lang="en" style="margin-top:8px;"><strong>Answer:</strong> <span>${esc(q.a.en)}</span></div>`);
  if (q.a.as) parts.push(`<div lang="as" style="color:#64748b; font-size:0.9rem;">${esc(q.a.as)}</div>`);
  if (q.ex.en) parts.push(`<div lang="en" style="margin-top:6px; font-size:0.9rem; color:#64748b;"><strong>Explanation:</strong> ${esc(q.ex.en)}</div>`);
  if (q.ex.as) parts.push(`<div lang="as" style="font-size:0.9rem; color:#64748b;">${esc(q.ex.as)}</div>`);
  return `<div class="qa-item" style="margin-bottom:22px;">${parts.join("")}</div>`;
}

/* ---------------- notes article ---------------- */
function noteArticle(topicId) {
  const note = NOTES[topicId];
  if (!note) return null;
  const build = (key) => {
    const paras = (note.p[key] || []).map((t) => `<p>${esc(t)}</p>`).join("");
    const list = (note.list[key] || []).length
      ? `<ul>${note.list[key].map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
      : "";
    const faqs = (note.faqs || [])
      .map((f) => `<details data-axo-faq="1"><summary>${esc(f.q[key])}</summary><p style="margin:8px 0 0;">${esc(f.a[key])}</p></details>`)
      .join("");
    return `<h2>${esc(note.h2[key])}</h2>\n${paras}\n${list}\n<h3>${key === "en" ? "Frequently Asked Questions" : "সততে সোধা প্ৰশ্ন"}</h3>\n${faqs}`;
  };
  return { en: build("en"), as: build("as") };
}

/* ---------------- page shell ---------------- */
function pageShell(opts) {
  const guard = CHROME.guardScript ? `\n  ${CHROME.guardScript}` : "";
  return `<!DOCTYPE html>
<html lang="en">
${opts.head}
${CHROME.bodyOpenToMain}<main id="app" class="container main">
${opts.mainHTML}
  </main>
${opts.extraHTML || ""}
${CHROME.footer}${guard}`;
}

function editorialBlock(secTitle) {
  return `  <section class="section" data-axo-editorial-credit="1" style="padding-top:2px; padding-bottom:22px;">
          <div lang="en" data-axo-lang="en" class="info-panel" style="max-width:900px; margin:0 auto; background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:16px; padding:20px 22px; line-height:1.8; color:var(--ink-soft,#475569); text-align:left;">
            <p style="margin:0 0 12px;">${esc(lang(secTitle, "en"))} for the ADRE 3.0 Grade III examination. The questions and explanations follow the patterns used in recent Assam recruitment papers, and each topic is written so that the method can be reproduced in the examination hall.</p>
            <div class="editorial-meta"><span class="editorial-meta-item"><strong>Author:</strong> <a href="/editorial-team/#axomexam-team">axomexam team</a></span><span class="editorial-meta-item"><strong>Reviewed by:</strong> <a href="/editorial-team/">Axomexam Editorial Team</a></span><span class="editorial-meta-item"><strong>Sources:</strong> Official exam syllabus and standard reference material</span><span class="editorial-meta-item"><strong>Published:</strong> 29 October 2026</span><span class="editorial-meta-item"><strong>Last updated:</strong> 29 October 2026</span><span class="editorial-meta-item"><a href="/editorial-policy/">How we review</a></span></div>
          </div>
<div lang="as" data-axo-lang="as" class="info-panel" style="max-width:900px; margin:0 auto; background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:16px; padding:20px 22px; line-height:1.8; color:var(--ink-soft,#475569); text-align:left;">
<p style="margin:0 0 12px;">ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ ${esc(lang(secTitle, "as"))}। প্ৰশ্ন আৰু ব্যাখ্যাবোৰ শেহতীয়া অসম নিয়োগ পত্ৰত ব্যৱহৃত আৰ্হি অনুসৰি প্ৰস্তুত, আৰু প্ৰতিটো অধ্যায় এনে ধৰণে লিখা হৈছে যাতে পৰীক্ষা কক্ষত পদ্ধতিটো পুনৰ উলিয়াব পাৰি।</p>
<div class="editorial-meta"><span class="editorial-meta-item"><strong>লেখক:</strong> <a href="/editorial-team/#axomexam-team">axomexam টীম</a></span><span class="editorial-meta-item"><strong>পৰ্যালোচনা:</strong> <a href="/editorial-team/">Axomexam Editorial Team</a></span><span class="editorial-meta-item"><strong>প্ৰসংগ উৎস:</strong> মানক প্ৰসংগ পুথি আৰু বিশ্বাসযোগ্য অনলাইন উৎস</span><span class="editorial-meta-item"><strong>প্ৰকাশিত:</strong> 29 অক্টোবৰ 2026</span><span class="editorial-meta-item"><strong>শেহতীয়া আপডেট:</strong> 29 অক্টোবৰ 2026</span></div>
</div>
        </section>`;
}

/* ---------------- build ---------------- */
const examPath = `/exams/${EXAM.id}`;
const examCanonical = `${BASE}${examPath}/`;
const crumbsRoot = [
  { name: "Home", url: BASE + "/" },
  { name: "Your Exams", url: BASE + "/exams/" },
];

function examEntry() {
  return {
    id: EXAM.id,
    title: EXAM.title,
    subtitle: EXAM.subtitle,
    note: EXAM.note,
    cover: EXAM.cover,
    coverAlt: EXAM.coverAlt,
    color: EXAM.color,
    icon: EXAM.icon,
    status: EXAM.status,
    sections: EXAM.sections.map((s) => {
      const out = { id: s.id, type: s.type, color: s.color, title: s.title };
      if (Array.isArray(s.subcategories)) out.subcategories = s.subcategories;
      return out;
    }),
  };
}

writeJSON(`data/exams/${EXAM.id}.json`, examEntry());
writeJSON(`data/exams/${EXAM.id}/syllabus.json`, SYLLABUS);

/* topic data files + collect leaf list */
const leaves = [];
for (const sec of EXAM.sections) {
  if (sec.type === "syllabus") continue;
  writeJSON(`data/exams/${EXAM.id}/${sec.id}.json`, {
    id: sec.id,
    type: "qa",
    title: sec.title,
    subject: sec.title,
    description: {
      en: `Topic-wise question bank for the ADRE 3.0 Grade III examination - ${lang(sec.title, "en")}.`,
      as: `ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ ${lang(sec.title, "as")}ৰ বিষয়-ভিত্তিক প্ৰশ্ন-বেংক।`,
    },
    questions: [],
  });
  for (const sub of sec.subcategories || []) {
    const children = Array.isArray(sub.subcategories) ? sub.subcategories : [];
    if (children.length) {
      writeJSON(`data/exams/${EXAM.id}/${sec.id}/${sub.id}/index.json`, { subcategory: sub.id, files: [] });
      for (const leaf of children) leaves.push({ sec, group: sub, leaf });
    } else {
      leaves.push({ sec, group: null, leaf: sub });
    }
  }
}

/* One question file per topic, holding the whole bank as an array — the same
   layout data/exams/adre-grade-4 uses. Anything a previous build left behind
   as a per-question split (question-002.json, question-003.json, ...) is
   removed, but a file that carries a question id not present in the bank is
   treated as a hand-added extra and kept. */
for (const item of leaves) {
  const parts = [item.sec.id, ...(item.group ? [item.group.id] : []), item.leaf.id];
  const rel = ["data", "exams", EXAM.id, ...parts].join("/");
  const bank = QUESTIONS[item.leaf.id] || [];
  const primary = "question-001.json";
  writeJSON(`${rel}/${primary}`, bank);

  const ids = new Set(bank.map((q) => q && q.id).filter(Boolean));
  const files = [primary];
  for (const name of listQuestionFiles(rel)) {
    if (name === primary) continue;
    const extra = readQuestions(`${rel}/${name}`);
    const isLeftoverSplit =
      extra.length > 0 && extra.every((q) => q && q.id && ids.has(q.id));
    if (isLeftoverSplit) {
      if (!DRY) removeFile(`${rel}/${name}`);
      written++;
    } else {
      files.push(name);
    }
  }
  files.sort();
  writeJSON(`${rel}/index.json`, { subcategory: item.leaf.id, files });
}

/* ---------------- hub page ---------------- */
{
  const title = `${lang(EXAM.title, "en")} Exam Book | axomexam`;
  const desc = `${lang(EXAM.title, "en")} exam book - complete syllabus and topic-wise practice for ${EXAM.sections
    .filter((s) => s.type !== "syllabus").map((s) => lang(s.title, "en")).join(", ")}.`;
  const crumbs = [...crumbsRoot, { name: lang(EXAM.title, "en") }];
  const head = pageHead({
    title, desc, canonical: examCanonical, themeColor: EXAM.color,
    imageAlt: `axomexam - ${lang(EXAM.title, "en")} Exam Book`,
    jsonld: jsonld({ canonical: examCanonical, title, desc, crumbs }),
  });
  const cards = EXAM.sections.map((s) => `        <a class="sub-card reveal" data-exam-subcats href="${examPath}/${s.id}/" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;"><b style="color:var(--ink,#0f172a);">${esc(lang(s.title, "en"))}</b><span style="display:block; color:var(--ink-muted,#64748b); font-size:0.86rem;">${esc(lang(s.title, "as"))}</span></a>`).join("\n");
  const bookTotal = leaves.reduce((a, l) => a + (QUESTIONS[l.leaf.id] || []).length, 0);
  const bookTotalLabel = `${bookTotal.toLocaleString("en-IN")} questions available in this book &bull; ${bookTotal.toLocaleString("en-IN")} টা প্ৰশ্ন এই পুথিত উপলব্ধ`;
  const mainHTML = `    <div class="page-head">
      ${breadcrumbHTML(crumbs)}
      <h1>${esc(lang(EXAM.title, "en"))}</h1>
      <p class="page-desc">${esc(lang(EXAM.subtitle, "as"))} &bull; ${esc(lang(EXAM.title, "as"))}</p>
      <p class="exam-book-total">${bookTotalLabel}</p>
    </div>

    <section class="section" data-exam-subcats style="padding-bottom:40px;">
      <h2 style="margin:0 0 6px;">Subjects</h2>
      <div class="sub-grid">
${cards}
      </div>
    </section>`;
  write(`exams/${EXAM.id}/index.html`, pageShell({ head, mainHTML, extraHTML: editorialBlock(EXAM.title) + "\n" }));
}

/* ---------------- section pages ---------------- */
for (const sec of EXAM.sections) {
  if (sec.type === "syllabus") continue;
  const subs = (sec.subcategories || []).flatMap((sub) =>
    Array.isArray(sub.subcategories) && sub.subcategories.length
      ? sub.subcategories.map((c) => ({ parent: sub, leaf: c }))
      : [{ parent: null, leaf: sub }]
  );
  const canonical = `${BASE}${examPath}/${sec.id}/`;
  const title = `${lang(sec.title, "en")} - ${lang(EXAM.title, "en")} Exam Book | axomexam`;
  const desc = `${lang(EXAM.title, "en")} ${lang(sec.title, "en")} - read the complete book online in English and Assamese.`;
  const crumbs = [...crumbsRoot, { name: lang(EXAM.title, "en"), url: examCanonical }, { name: lang(sec.title, "en") }];
  const head = pageHead({
    title, desc, canonical, themeColor: sec.color,
    imageAlt: `axomexam - ${lang(sec.title, "en")}`,
    jsonld: jsonld({ canonical, title, desc, crumbs }),
  });
  const cards = subs.map((s) => {
    const href = `${examPath}/${sec.id}/${s.parent ? s.parent.id + "/" : ""}${s.leaf.id}/`;
    return `        <a class="sub-card reveal" data-exam-subcats href="${href}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;"><b style="color:var(--ink,#0f172a);">${esc(lang(s.leaf.title, "en"))}</b><span style="display:block; color:var(--ink-muted,#64748b); font-size:0.86rem;">${esc(lang(s.leaf.title, "as"))}</span></a>`;
  }).join("\n");
  const mainHTML = `    <div class="page-head">
      ${breadcrumbHTML(crumbs)}
      <h1>${esc(lang(sec.title, "en"))}</h1>
      <p class="page-desc">${esc(lang(sec.title, "as"))} &bull; ${esc(lang(EXAM.title, "as"))}</p>
    </div>

    <section class="section" style="padding-bottom:46px;">
      <div style="margin-top:18px;"><a class="btn btn-outline btn-sm" href="${examPath}/">Back to ${esc(lang(EXAM.title, "en"))}</a></div>
    </section>
    <section class="section" data-exam-subcats style="padding-bottom:40px;">
      <h2 style="margin:0 0 6px;">Sub-categories</h2>
      <div class="sub-grid">
${cards}
      </div>
    </section>`;
  write(`exams/${EXAM.id}/${sec.id}/index.html`, pageShell({ head, mainHTML, extraHTML: editorialBlock(sec.title) + "\n" }));
}

/* ---------------- sub-category (group) pages ----------------
   Nested sub-categories (Vocabulary, Grammar, Verbal Reasoning, ...) get
   their own hub page listing the leaf topics inside them. */
for (const sec of EXAM.sections) {
  if (sec.type === "syllabus") continue;
  for (const sub of sec.subcategories || []) {
    const children = Array.isArray(sub.subcategories) ? sub.subcategories : [];
    if (!children.length) continue;
    const route = `${examPath}/${sec.id}/${sub.id}`;
    const canonical = `${BASE}${route}/`;
    const total = children.reduce((a, c) => a + (QUESTIONS[c.id] || []).length, 0);
    const title = `${lang(sub.title, "en")} - ${lang(sec.title, "en")} - ${lang(EXAM.title, "en")} | axomexam`;
    const desc = `${lang(sub.title, "en")} - ${lang(sec.title, "en")} practice for ${lang(EXAM.title, "en")}: ${children.length} sub-categories, ${total} bilingual questions with answers and explanations.`;
    const crumbs = [
      ...crumbsRoot,
      { name: lang(EXAM.title, "en"), url: examCanonical },
      { name: lang(sec.title, "en"), url: `${BASE}${examPath}/${sec.id}/` },
      { name: lang(sub.title, "en") },
    ];
    const head = pageHead({
      title, desc, canonical, themeColor: sec.color,
      imageAlt: `axomexam - ${lang(sub.title, "en")}`,
      jsonld: jsonld({ canonical, title, desc, crumbs, teaches: lang(sec.title, "en") }),
    });
    const cards = children.map((c) => `        <a class="sub-card reveal" data-exam-subcats href="${route}/${c.id}/" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;"><b style="color:var(--ink,#0f172a);">${esc(lang(c.title, "en"))}</b><span style="display:block; color:var(--ink-muted,#64748b); font-size:0.86rem;">${esc(lang(c.title, "as"))}</span></a>`).join("\n");
    const mainHTML = `    <div class="page-head">
      ${breadcrumbHTML(crumbs)}
      <h1>${esc(lang(sub.title, "en"))}</h1>
      <p class="page-desc">${esc(lang(sub.title, "as"))} &bull; ${esc(lang(sec.title, "en"))} &bull; ${esc(lang(EXAM.title, "en"))}</p>
    </div>

    <section class="section" style="padding-bottom:46px;">
      <div style="margin-top:18px;"><a class="btn btn-outline btn-sm" href="${examPath}/${sec.id}/">Back to ${esc(lang(sec.title, "en"))}</a></div>
    </section>
    <section class="section" data-exam-subcats style="padding-bottom:40px;">
      <h2 style="margin:0 0 6px;">Sub-categories</h2>
      <div class="sub-grid">
${cards}
      </div>
    </section>`;
    write(`exams/${EXAM.id}/${sec.id}/${sub.id}/index.html`, pageShell({ head, mainHTML, extraHTML: editorialBlock(sec.title) + "\n" }));
  }
}

/* ---------------- leaf pages ---------------- */
for (const item of leaves) {
  const parts = [item.sec.id, ...(item.group ? [item.group.id] : []), item.leaf.id];
  const route = `${examPath}/${parts.join("/")}`;
  const canonical = `${BASE}${route}/`;
  const bank = (QUESTIONS[item.leaf.id] || []).map(normalize);
  const title = `${lang(item.leaf.title, "en")} - ${lang(item.sec.title, "en")} - ${lang(EXAM.title, "en")} | axomexam`;
  const desc = `Practise ${lang(item.leaf.title, "en")} MCQs with answers and explanations for ${lang(EXAM.title, "en")} - ${lang(item.sec.title, "en")}.`;
  const crumbs = [
    ...crumbsRoot,
    { name: lang(EXAM.title, "en"), url: examCanonical },
    { name: lang(item.sec.title, "en"), url: `${BASE}${examPath}/${item.sec.id}/` },
    ...(item.group ? [{ name: lang(item.group.title, "en"), url: `${BASE}${examPath}/${item.sec.id}/${item.group.id}/` }] : []),
    { name: lang(item.leaf.title, "en") },
  ];
  const article = noteArticle(item.leaf.id);
  const head = pageHead({
    title, desc, canonical, themeColor: item.sec.color,
    imageAlt: `axomexam - ${lang(item.leaf.title, "en")}`,
    jsonld: jsonld({ canonical, title, desc, crumbs, teaches: lang(item.sec.title, "en"), faqs: faqEntities(item.leaf.id) }),
  });
  const mainHTML = `    <div class="page-head">
      ${breadcrumbHTML(crumbs)}
      <h1>${esc(lang(item.leaf.title, "en"))}</h1>
      <p class="page-desc">${esc(lang(item.leaf.title, "as"))} &bull; ${esc(lang(item.sec.title, "en"))} &bull; ${esc(lang(EXAM.title, "en"))}</p>
    </div>

    <section class="section" style="padding-bottom:46px;">
      <div style="margin-top:18px;"><a class="btn btn-outline btn-sm" href="${examPath}/${item.sec.id}/">Back to ${esc(lang(item.sec.title, "en"))}</a></div>
    </section>
    <section class="section" style="padding-bottom:40px;"><!-- axo-static-qa --><div class="qa-list" style="max-width:860px; margin:0 auto;"><h2 style="font-size:1.15rem; margin-bottom:18px;">${bank.length} Questions with Answers</h2>${bank.map((q, i) => qaItemHTML(q, i + 1)).join("")}</div></section>`;
  const extra = article
    ? `  <section class="section axo-extra-content" data-axo-extra="1" data-axo-path="${route}/" style="padding-bottom:48px;">
      <article lang="en" data-axo-lang="en" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
${article.en}
      </article>
      <article lang="as" data-axo-lang="as" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
${article.as}
      </article>
    </section>
` + editorialBlock(item.sec.title) + "\n"
    : editorialBlock(item.sec.title) + "\n";
  write(`exams/${EXAM.id}/${parts.join("/")}/index.html`, pageShell({ head, mainHTML, extraHTML: extra }));
}


/* ---------------- register in data/exams/index.json ----------------
   The index is hand-formatted with compact one-line sub-category objects.
   Re-serialising it would reformat every other exam, so the entry is
   spliced into the raw text instead and only this exam's block changes. */
{
  const idxRel = "data/exams/index.json";
  const idxAbs = path.join(ROOT, idxRel);
  const raw = fs.readFileSync(idxAbs, "utf8");
  const entry = examEntry();

  const objEnd = (text, openIdx) => {
    let depth = 0;
    let inStr = false;
    let esc2 = false;
    for (let i = openIdx; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (esc2) esc2 = false;
        else if (ch === "\\") esc2 = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') inStr = true;
      else if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (!depth) return i; }
    }
    return -1;
  };

  const blockFor = (id) => {
    const key = `"id": "${id}"`;
    const at = raw.indexOf(key);
    if (at === -1) return null;
    const open = raw.lastIndexOf("{", at);
    const close = objEnd(raw, open);
    if (open === -1 || close === -1) return null;
    return { open, end: close + 1 };
  };

  const existing = blockFor(EXAM.id);
  const anchor = blockFor("adre-grade-4");
  const text = "    " + compactJSON(entry, 4);
  if (existing) {
    write(idxRel, raw.slice(0, existing.open) + text.trimStart() + raw.slice(existing.end));
  } else if (anchor) {
    write(idxRel, raw.slice(0, anchor.end) + ",\n" + text + raw.slice(anchor.end));
  }
}

/* ---------------- sitemap ---------------- */
{
  const smAbs = path.join(ROOT, "sitemap.xml");
  if (fs.existsSync(smAbs)) {
    let xml = fs.readFileSync(smAbs, "utf8");
    const urls = [
      `${examPath}/`,
      ...EXAM.sections.map((s) => `${examPath}/${s.id}/`),
      ...leaves.map((l) => `${examPath}/${[l.sec.id, ...(l.group ? [l.group.id] : []), l.leaf.id].join("/")}/`),
      ...EXAM.sections.flatMap((s) =>
        (s.subcategories || [])
          .filter((sub) => Array.isArray(sub.subcategories) && sub.subcategories.length)
          .map((sub) => `${examPath}/${s.id}/${sub.id}/`)
      ),
    ];
    const add = [];
    for (const u of urls) {
      if (xml.indexOf(`<loc>${BASE}${u}</loc>`) !== -1) continue;
      add.push(`  <url>\n    <loc>${BASE}${u}</loc>\n    <lastmod>${DATE}</lastmod>\n  </url>`);
    }
    if (add.length) {
      xml = xml.replace("</urlset>", add.join("\n") + "\n</urlset>");
      write("sitemap.xml", xml);
    }
  }
}


/* ---------------- syllabus page ---------------- */
{
  const sec = EXAM.sections.find((s) => s.type === "syllabus");
  const route = `${examPath}/${sec.id}`;
  const canonical = `${BASE}${route}/`;
  const title = `${lang(SYLLABUS.title, "en")} and Exam Pattern | axomexam`;
  const desc = lang(SYLLABUS.description, "en");
  const crumbs = [...crumbsRoot, { name: lang(EXAM.title, "en"), url: examCanonical }, { name: lang(sec.title, "en") }];
  const head = pageHead({
    title, desc, canonical, themeColor: sec.color,
    imageAlt: `axomexam - ${lang(SYLLABUS.title, "en")}`,
    jsonld: jsonld({ canonical, title, desc, crumbs }),
  });
  const articleFor = (key) => {
    const parts = [];
    for (const c of SYLLABUS.chapters) {
      const body = lang(c.content, key);
      const blocks = String(body).split("\n\n").map((b) => {
        const lines = b.split("\n").filter((l) => l.trim());
        if (lines.length > 1 && lines.slice(1).every((l) => /^\s*[-•]/.test(l))) {
          const head0 = `<p><strong>${esc(lines[0].trim())}</strong></p>`;
          const items = lines.slice(1).map((l) => `<li>${esc(l.replace(/^\s*[-•]\s*/, "").trim())}</li>`).join("");
          return head0 + `<ul>${items}</ul>`;
        }
        return `<p>${esc(b.replace(/\n/g, " ").trim())}</p>`;
      }).join("");
      parts.push(`<h3>${esc(lang(c.title, key))}</h3>\n${blocks}`);
    }
    return parts.join("\n");
  };
  const mainHTML = `    <div class="page-head">
      ${breadcrumbHTML(crumbs)}
      <h1>${esc(lang(sec.title, "en"))}</h1>
      <p class="page-desc">${esc(lang(sec.title, "as"))} &bull; ${esc(lang(EXAM.title, "en"))}</p>
    </div>

    <section class="section" style="padding-bottom:46px;">
      <article class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:18px auto 0; text-align:left;">
        <h2>${esc(lang(SYLLABUS.title, "en"))} and Exam Pattern (SLRC Assam)</h2>
        <p>${esc(lang(SYLLABUS.description, "en"))}</p>
${articleFor("en")}
        <h3>${esc(lang(SYLLABUS.title, "as"))}</h3>
${articleFor("as")}
        <p style="margin-top:22px; padding-top:14px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Note:</strong> axomexam.in is an independent study platform and is not affiliated with SLRC or the Government of Assam. Verify all details from the official notification.</p>
      </article>
      <div style="margin-top:18px; text-align:center;"><a class="btn btn-outline btn-sm" href="${examPath}/">Back to ${esc(lang(EXAM.title, "en"))}</a></div>
    </section>`;
  write(`exams/${EXAM.id}/${sec.id}/index.html`, pageShell({ head, mainHTML, extraHTML: editorialBlock(SYLLABUS.title) + "\n" }));
}


/* ---------------- exams/index.html crawler copy ----------------
   The runtime renders the exam list from data/exams/index.json, so real
   visitors already see the new book. The committed HTML also carries a
   static copy for crawlers and no-JS users; keep it in step. */
{
  const file = path.join(ROOT, "exams", "index.html");
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, "utf8");
    const examEn = lang(EXAM.title, "en");
    const examAs = lang(EXAM.title, "as");
    const href = `${examPath}/`;
    const label = `${examEn} — Syllabus, Mathematics, History, English, Reasoning, Assam GK & Current Affairs`;
    const qaSecs = EXAM.sections.filter((s) => s.type !== "syllabus");
    const total = leaves.reduce((a, l) => a + (QUESTIONS[l.leaf.id] || []).length, 0);
    let touched = false;

    /* noscript list */
    if (html.indexOf(`href="${href}"`) === -1) {
      const li = `        <li><a href="${href}">${esc(label)}</a></li>\n`;
      const anchor = html.indexOf(`<li><a href="${examPath.replace(/3$/, "4")}/"`) !== -1
        ? html.indexOf(`href="/exams/adre-grade-4/"`)
        : -1;
      if (anchor !== -1) {
        const lineEnd = html.indexOf("\n", anchor) + 1;
        html = html.slice(0, lineEnd) + li + html.slice(lineEnd);
      } else {
        const ulEnd = html.indexOf("</ul>", html.indexOf("<noscript>"));
        if (ulEnd !== -1) html = html.slice(0, ulEnd) + li + html.slice(ulEnd);
      }
      touched = true;
    }

    /* ItemList JSON-LD */
    html = html.replace(/(<script[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi, (full, open, body, close) => {
      if (body.indexOf('"ItemList"') === -1) return full;
      let data;
      try { data = JSON.parse(body); } catch (e) { return full; }
      const list = (data["@graph"] || []).find((n) => n && n["@type"] === "ItemList");
      if (!list || !Array.isArray(list.itemListElement)) return full;
      const url = `${BASE}${href}`;
      if (list.itemListElement.some((el) => el && el.url === url)) return full;
      const at = list.itemListElement.findIndex((el) => el && el.url === `${BASE}${examPath.replace(/3$/, "4")}/`);
      const item = { "@type": "ListItem", position: 0, name: label, url };
      if (at !== -1) list.itemListElement.splice(at + 1, 0, item);
      else list.itemListElement.push(item);
      list.itemListElement.forEach((el, i) => { el.position = i + 1; });
      list.numberOfItems = list.itemListElement.length;
      touched = true;
      return open + JSON.stringify(data).replace(/<\/(script)/gi, "<\\/$1") + close;
    });

    /* "Exams covered" summary list */
    if (html.indexOf(`<strong>${examEn}</strong>`) === -1) {
      const li = `          <li><strong>${esc(examEn)}</strong> <span lang="as">${esc(examAs)}</span> — ${EXAM.sections.length} sections, ${total.toLocaleString("en-IN")} practice questions.</li>\n`;
      const at = html.indexOf(`<strong>ADRE 3.0 Grade IV</strong>`);
      if (at !== -1) {
        const lineEnd = html.indexOf("\n", at) + 1;
        html = html.slice(0, lineEnd) + li + html.slice(lineEnd);
        touched = true;
      }
    }

    if (touched) write("exams/index.html", html);
  }
}

/* ---------------- upload guide ----------------
   data/exams/adre-grade-3/README.md mirrors the Grade IV guide so the
   folder layout stays self-documenting for future question uploads. */
{
  const rows = [];
  for (const sec of EXAM.sections) {
    for (const sub of sec.subcategories || []) {
      const children = Array.isArray(sub.subcategories) ? sub.subcategories : [];
      if (children.length) {
        for (const c of children) {
          rows.push(`| ${lang(sec.title, "en")} | ${lang(sub.title, "en")} → ${lang(c.title, "en")} | \`${sec.id}/${sub.id}/${c.id}\` |`);
        }
      } else {
        rows.push(`| ${lang(sec.title, "en")} | ${lang(sub.title, "en")} | \`${sec.id}/${sub.id}\` |`);
      }
    }
  }
  const readme = `# ${lang(EXAM.title, "en")} — Question Upload Guide

This folder uses the **exact same structure as** \`data/exams/adre-grade-4/\`.
The list of sections and topics is controlled by \`data/exams/index.json\` (repo root).

## How the folder is organised

\`\`\`
data/exams/adre-grade-3/
  syllabus.json                       <- syllabus notes (section type: syllabus)
  <section>.json                      <- section landing data (e.g. elementary-mathematics.json)
  <section>/<topic>/
    index.json                        <- manifest listing the question files
    question-001.json                 <- the whole question bank for the topic
  <section>/<group>/<topic>/          <- for topics that sit inside a group
    index.json
    question-001.json
\`\`\`

## Rules

1. Upload questions **only** inside the exact topic folder shown in the table below.
2. Keep the whole bank for a topic in its single \`question-001.json\`. One topic, one file — exactly like \`data/exams/adre-grade-4\`. Add \`question-002.json\` and upward only if a topic genuinely needs a second file, and then list it in \`index.json\`'s \`"files"\` array.
3. Do not put questions in \`index.json\`. That file is only a manifest.
4. A question file holds an array \`[ ... ]\` of question objects.
5. Every question needs bilingual \`en\` and \`as\` text for \`q\`, each option and the \`explanation\`. \`correct\` is the 0-based index of the right option.

### Sample question file

\`\`\`json
[
  {
    "id": "synonyms-002",
    "q": { "en": "...", "as": "..." },
    "options": [
      { "en": "...", "as": "..." },
      { "en": "...", "as": "..." },
      { "en": "...", "as": "..." },
      { "en": "...", "as": "..." }
    ],
    "correct": 0,
    "explanation": { "en": "...", "as": "..." }
  }
]
\`\`\`

## Where to upload — section & topic wise

| Section | Topic | Upload folder (inside \`data/exams/adre-grade-3/\`) |
| --- | --- | --- |
| Syllabus | Syllabus notes | \`syllabus.json\` |
${rows.join("\n")}

---

Everything in this folder is generated by \`tools/build-adre-grade-3.js\` from
\`tools/adre-grade-3.structure.js\`, \`tools/adre-grade-3.notes.js\` and
\`tools/adre-grade-3.questions.js\`. Re-run that script after editing the sources
instead of hand-editing the JSON here.
`;
  write(`data/exams/${EXAM.id}/README.md`, readme);
}

console.log(`build-adre-grade-3${DRY ? " (dry-run)" : ""}`);
console.log(`  sections : ${EXAM.sections.length}`);
console.log(`  topics   : ${leaves.length}`);
console.log(`  questions: ${leaves.reduce((a, l) => a + (QUESTIONS[l.leaf.id] || []).length, 0)}`);
console.log(`  written  : ${written}   unchanged: ${skipped}`);
