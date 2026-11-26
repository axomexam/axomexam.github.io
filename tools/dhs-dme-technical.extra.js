#!/usr/bin/env node
"use strict";

/*
 * tools/dhs-dme-technical.extra.js
 *
 * Gives the DHS & DME Technical Grade III topic pages that have a long-form
 * article the same bilingual study panel the RRB NTPC book carries: a
 *
 *   <section class="section axo-extra-content" data-axo-extra="1"
 *            data-axo-path="/exams/dhs-dme-technical/.../">
 *
 * block after </main>, holding an English panel and an Assamese panel
 * (overview paragraphs + key-facts list + a short FAQ).
 *
 * The prose lives in tools/dhs-dme-technical-articles/<group>/<leaf>.js, one
 * module per topic, keyed "<section>/<group>/<leaf>" for a grouped section and
 * "<section>/<leaf>" for a flat one. tools/build-as-twins.js copies the block
 * into the /as/ twin and reorders the panels, so this tool only writes the
 * English page.
 *
 * Idempotent: an existing block is replaced in place, so a second run produces
 * byte-identical output.
 *
 * Usage:
 *   node tools/dhs-dme-technical.extra.js          # apply
 *   node tools/dhs-dme-technical.extra.js --check  # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const EXAM_ID = "dhs-dme-technical";

function loadArticles() {
  const base = path.join(__dirname, "dhs-dme-technical-articles");
  const out = {};
  if (!fs.existsSync(base)) return out;
  for (const group of fs.readdirSync(base)) {
    const gdir = path.join(base, group);
    if (!fs.statSync(gdir).isDirectory()) continue;
    for (const f of fs.readdirSync(gdir)) {
      if (!f.endsWith(".js")) continue;
      out[`${group}/${f.replace(/\.js$/, "")}`] = require(path.join(gdir, f));
    }
  }
  return out;
}

const ARTICLES = loadArticles();

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const PANEL_OPEN =
  '<article lang="%L" data-axo-lang="%L" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.85; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">';

function panel(lang, a) {
  const paras = a.p[lang].map((t) => `<p>${esc(t)}</p>`).join("\n");
  const list = a.list[lang].length
    ? `<h3>${lang === "en" ? "Key facts to remember" : "মনত ৰখাৰ যোগ্য মূল তথ্য"}</h3>\n<ul>${a.list[lang].map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
    : "";
  const faqs = a.faqs
    .map(
      (f) =>
        `<details data-axo-faq="1"><summary>${esc(f.q[lang])}</summary><p style="margin:8px 0 0;">${esc(f.a[lang])}</p></details>`
    )
    .join("");
  const faqHeading = lang === "en" ? "Frequently Asked Questions" : "সততে সোধা প্ৰশ্ন";
  return `${PANEL_OPEN.replace(/%L/g, lang)}
<h2>${esc(a.h2[lang])}</h2>
${paras}
${list}
<h3>${faqHeading}</h3>
${faqs}
</article>`;
}

function sectionHTML(route, a) {
  return `  <section class="section axo-extra-content" data-axo-extra="1" data-axo-path="${route}/" style="padding-bottom:48px;">
    <div class="container">
${panel("en", a)}
${panel("as", a)}
    </div>
  </section>`;
}

const SECTION_RE = /[ \t]*<section class="section axo-extra-content"[\s\S]*?<\/section>\n?/;

function applyPanel(rel, route, a) {
  const abs = path.join(ROOT, rel);
  if (!a || !fs.existsSync(abs)) return "missing";
  const block = sectionHTML(route, a) + "\n";
  const html = fs.readFileSync(abs, "utf8");

  let out;
  if (SECTION_RE.test(html)) {
    out = html.replace(SECTION_RE, block);
  } else {
    const m = /<\/main>\n/.exec(html);
    if (!m) return "missing";
    out = html.slice(0, m.index + m[0].length) + block + html.slice(m.index + m[0].length);
  }

  if (out === html) return "skipped";
  if (!CHECK) fs.writeFileSync(abs, out, "utf8");
  return "written";
}

function main() {
  const { EXAM } = require("./dhs-dme-technical.structure.js");
  const examPath = `exams/${EXAM_ID}`;
  let written = 0, skipped = 0, missing = 0;

  /* A topic group page and its leaf pages can each carry an article, so both
     levels are candidates and only the ones with a module are touched. */
  for (const sec of EXAM.sections) {
    if (sec.type === "syllabus") continue;
    for (const group of sec.subcategories || []) {
      const children = Array.isArray(group.subcategories) ? group.subcategories : [];
      const pages = [{ key: `${sec.id}/${group.id}`, parts: [group.id] }];
      for (const leaf of children) {
        pages.push({ key: `${sec.id}/${group.id}/${leaf.id}`, parts: [group.id, leaf.id] });
      }
      for (const page of pages) {
        const rel = `${examPath}/${sec.id}/${page.parts.join("/")}/index.html`;
        const route = `/${examPath}/${sec.id}/${page.parts.join("/")}`;
        const res = applyPanel(rel, route, ARTICLES[page.key]);
        if (res === "written") written++;
        else if (res === "skipped") skipped++;
        else missing++;
      }
    }
  }

  console.log(`dhs-dme-technical.extra${CHECK ? " (check)" : ""}`);
  console.log(`  panels written : ${written}`);
  console.log(`  unchanged      : ${skipped}`);
  console.log(`  no article yet : ${missing}`);
  if (CHECK && written) process.exitCode = 1;
}

main();
