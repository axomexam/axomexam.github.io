#!/usr/bin/env node
"use strict";

/*
 * build-current-affairs-content.js
 *
 * The Current Affairs pages are rendered entirely by JavaScript, so the HTML
 * that a crawler or an AdSense reviewer sees is almost empty. That thin
 * content is the reason these pages can be flagged as low value.
 *
 * This script writes a substantial, page-specific static content block into
 * every Current Affairs page:
 *
 *   - a unique editorial article (overview, what is covered, how to prepare)
 *   - a set of real sample questions with answers and explanations
 *   - a visible FAQ
 *   - a matching FAQPage JSON-LD node in <head>
 *   - unique <title> and meta/OpenGraph/Twitter descriptions
 *
 * The block is placed after </main> (outside the #app mount node), so the SPA
 * never removes it and both no-JS visitors and crawlers see it. The script is
 * idempotent and can be re-run safely after new questions are added.
 *
 * Usage, from the repository root:
 *   node scripts/build-current-affairs-content.js
 *   node scripts/build-current-affairs-content.js --check
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SITE = "https://axomexam.in";
const CONTENT = require("./current-affairs-content.data.js");

const CA_DIR = path.join(ROOT, "current-affairs");
const CA_DATA = path.join(ROOT, "data", "current-affairs");
const SAMPLE_COUNT = 12;
const FAQ_HEADING = "Frequently Asked Questions";

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

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

function existingCategories() {
  const idx = readJson(path.join(CA_DATA, "index.json"));
  return (idx && Array.isArray(idx.categories) ? idx.categories : []).map((c) => ({
    id: c.id,
    name: (c.title && c.title.en) || c.id,
  }));
}

function sampleQuestionsHTML(catId, catName) {
  const dir = path.join(CA_DATA, catId);
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /^question-\d+\.json$/.test(f)).sort();
  } catch (e) {
    return "";
  }
  const questions = [];
  for (const f of files) {
    const arr = readJson(path.join(dir, f));
    if (Array.isArray(arr)) questions.push(...arr);
    if (questions.length >= SAMPLE_COUNT) break;
  }
  if (!questions.length) return "";
  const sample = questions.slice(0, SAMPLE_COUNT);
  const list = sample
    .map((q) => {
      const qText = q.question_en || q.question || "";
      const aText = q.answer_en || q.answer || "";
      const exp = q.explanation_en || q.explanation || "";
      const aAs = q.answer_as || "";
      let item = "<li><strong>" + esc(qText) + "</strong><br>";
      item += "<span>Answer: <strong>" + esc(aText) + "</strong></span>";
      if (exp) item += "<br><span>" + esc(exp) + "</span>";
      if (aAs) item += "<br><span lang=\"as\">উত্তৰ: " + esc(aAs) + "</span>";
      item += "</li>";
      return item;
    })
    .join("");

  return (
    "<h3 style=\"color:var(--ink,#0f172a); margin-top:22px;\">Sample " +
    esc(catName) +
    " questions with answers</h3>" +
    "<p>These are a few of the questions from this section. Every question carries the correct answer and a short explanation, and the full list is read online in English or Assamese.</p>" +
    "<ol style=\"margin:8px 0 0 20px; line-height:1.9;\">" +
    list +
    "</ol>"
  );
}

function relatedHTML(catId) {
  const cats = existingCategories().filter((c) => c.id !== catId);
  if (!cats.length) return "";
  const links = cats
    .map(
      (c) =>
        "<a href=\"/current-affairs/" +
        esc(c.id) +
        "\" style=\"color:var(--accent,#2563eb); text-decoration:none;\">" +
        esc(c.name) +
        "</a>"
    )
    .join(" &middot; ");
  return (
    "<h3 style=\"color:var(--ink,#0f172a); margin-top:22px;\">Explore other current affairs sections</h3>" +
    "<p>" +
    links +
    "</p>"
  );
}

function sectionsHTML(sections) {
  return (sections || [])
    .map((s) => {
      let html = "<h3 style=\"color:var(--ink,#0f172a); margin-top:22px;\">" + esc(s.h) + "</h3>";
      if (s.p && s.p.length) html += s.p.map((p) => "<p>" + esc(p) + "</p>").join("");
      if (s.list && s.list.length) {
        html +=
          "<ul style=\"margin:8px 0 0 20px; line-height:1.9;\">" +
          s.list.map((li) => "<li>" + esc(li) + "</li>").join("") +
          "</ul>";
      }
      return html;
    })
    .join("");
}

function faqHTML(faqs) {
  if (!faqs || !faqs.length) return "";
  return (
    "<h3 style=\"color:var(--ink,#0f172a); margin-top:22px;\">" +
    FAQ_HEADING +
    "</h3>" +
    '<div class="seo-faq">' +
    faqs
      .map(
        (f) =>
          "<details style=\"border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;\"><summary style=\"cursor:pointer; font-weight:700; color:var(--ink,#0f172a);\">" +
          esc(f.q) +
          "</summary><p style=\"margin:8px 0 0;\">" +
          esc(f.a) +
          "</p></details>"
      )
      .join("") +
    "</div>"
  );
}

function richSectionHTML(catId, entry, catName, updated, totalQuestions) {
  const lead = (entry.lead || []).map((p) => "<p>" + esc(p) + "</p>").join("");
  const h2 = entry.h2 || catName;
  const isHub = catId === "index";
  const sample = isHub ? "" : sampleQuestionsHTML(catId, catName);
  const countLine =
    !isHub && totalQuestions > 0
      ? "<p><strong>" +
        totalQuestions +
        " questions</strong> with answers and explanations in this section. Last updated " +
        esc(updated || "") +
        " by the axomexam team.</p>"
      : "";

  const inner =
    "<h2 style=\"margin-top:0; color:var(--ink,#0f172a);\">" +
    esc(h2) +
    "</h2>" +
    countLine +
    lead +
    sectionsHTML(entry.sections) +
    sample +
    faqHTML(entry.faqs) +
    relatedHTML(catId);

  return (
    "<!-- ca-rich:" +
    catId +
    " -->\n" +
    '<section class="section ca-rich" data-ca-rich="' +
    esc(catId) +
    '" style="padding-bottom:48px;">' +
    '<div class="container">' +
    '<article class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">' +
    inner +
    "</article>" +
    "</div></section>\n<!-- /ca-rich:" +
    catId +
    " -->"
  );
}

function faqSchemaHTML(catId, entry, canonical) {
  if (!entry.faqs || !entry.faqs.length) return "";
  const node = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": canonical + "#faqpage",
    url: canonical,
    name: FAQ_HEADING,
    isPartOf: { "@id": SITE + "/#website" },
    inLanguage: ["en", "as"],
    mainEntity: entry.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    "<!-- ca-rich-schema:" +
    catId +
    " -->\n  <script type=\"application/ld+json\">" +
    escapeForScript(JSON.stringify(node)) +
    "</script>\n  <!-- /ca-rich-schema -->"
  );
}

function getCanonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  return m ? m[1] : "";
}

function replaceMeta(html, entry) {
  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(entry.title) + "</title>");
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    '<meta name="description" content="' + esc(entry.meta) + '" />'
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    '<meta property="og:title" content="' + esc(entry.title) + '" />'
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    '<meta property="og:description" content="' + esc(entry.meta) + '" />'
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    '<meta name="twitter:title" content="' + esc(entry.title) + '" />'
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    '<meta name="twitter:description" content="' + esc(entry.meta) + '" />'
  );
  return out;
}

function buildPage(html, catId, entry, catName, updated, totalQuestions, canonical) {
  // Remove a previously generated rich block and FAQ schema, then re-add.
  const idRe = catId.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  let out = html.replace(
    new RegExp("\\n?\\s*<!-- ca-rich:" + idRe + " -->[\\s\\S]*?<!-- /ca-rich:" + idRe + " -->", ""),
    ""
  );
  out = out.replace(
    new RegExp("\\n?\\s*<!-- ca-rich-schema:" + idRe + " -->[\\s\\S]*?<!-- /ca-rich-schema -->", ""),
    ""
  );

  out = replaceMeta(out, entry);

  const rich = richSectionHTML(catId, entry, catName, updated, totalQuestions);
  out = out.replace(/<\/main>/, "</main>\n\n" + rich);

  const schema = faqSchemaHTML(catId, entry, canonical);
  if (schema) out = out.replace(/<\/head>/, "  " + schema + "\n</head>");

  return out;
}

function countQuestions(catId) {
  const dir = path.join(CA_DATA, catId);
  let total = 0;
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /^question-\d+\.json$/.test(f));
  } catch (e) {
    return 0;
  }
  for (const f of files) {
    const arr = readJson(path.join(dir, f));
    if (Array.isArray(arr)) total += arr.length;
  }
  return total;
}

function processCategory(catId, htmlFile) {
  const entry = CONTENT[catId];
  if (!entry) {
    console.log("  skip (no content): " + catId);
    return false;
  }
  const html = fs.readFileSync(htmlFile, "utf8");
  const canonical = getCanonical(html) || SITE + "/current-affairs/" + (catId === "index" ? "" : catId + "/");

  let catName = "Current Affairs";
  let updated = "";
  if (catId !== "index") {
    const meta = readJson(path.join(CA_DATA, catId, "index.json"));
    if (meta) {
      catName = (meta.title && meta.title.en) || catId;
      updated = meta.updated || "";
    }
  }
  const total = catId === "index" ? 0 : countQuestions(catId);

  const after = buildPage(html, catId, entry, catName, updated, total, canonical);
  if (after === html) {
    console.log("  up to date: " + path.relative(ROOT, htmlFile));
    return false;
  }
  if (!CHECK) fs.writeFileSync(htmlFile, after, "utf8");
  console.log("  updated:    " + path.relative(ROOT, htmlFile));
  return true;
}

function main() {
  const drift = [];

  if (processCategory("index", path.join(CA_DIR, "index.html"))) drift.push("current-affairs/index.html");

  let files = [];
  try {
    files = fs.readdirSync(CA_DIR, { withFileTypes: true }).filter((e) => e.isDirectory());
  } catch (e) {
    console.error("Cannot read " + CA_DIR);
    process.exit(1);
  }
  for (const d of files) {
    const htmlFile = path.join(CA_DIR, d.name, "index.html");
    if (!fs.existsSync(htmlFile)) continue;
    if (processCategory(d.name, htmlFile)) drift.push(path.relative(ROOT, htmlFile));
  }

  console.log((CHECK ? "Drift: " : "Updated: ") + drift.length + " file(s)");
  if (CHECK && drift.length) process.exitCode = 1;
}

main();
