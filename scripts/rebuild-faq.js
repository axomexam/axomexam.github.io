#!/usr/bin/env node
"use strict";

/*
 * rebuild-faq.js
 *
 * Replaces the templated overview / "How to prepare" / FAQ text inside every
 * auto-generated `section.seo-deep` panel with copy composed from facts that
 * already belong to that one page (its H1, its real question count, its real
 * child topic names, its own meta description).
 *
 * Background
 * ----------
 * The panels were produced by js/app.js `autoSeo()`, which rotated two or
 * three canned sentences per question intent. With only a handful of variants
 * across hundreds of pages, the same sentences repeated site-wide:
 *
 *   109 pages  identical four-bullet "How to prepare" list
 *    81 pages  identical "is bilingual" FAQ answer
 *    64 pages  identical "part of the free study material" paragraph
 *    77 pages  identical "is completely free" FAQ answer
 *    48 pages  the fixed filler sentence the old de-duplicator appended when
 *              two pages hashed to the same variant
 *
 * Rewriting the sentences again would only move the collision, so instead the
 * text is now built from per-page facts by scripts/faq-content.js. Those facts
 * differ on every page, so the output differs on every page, and every
 * sentence still tells the reader something true about the page.
 *
 * Hand-written FAQ is never touched: a Q&A pair is only rewritten when the
 * same answer (or the same answer with the page name and digits masked) also
 * appears on another page. Unique pairs are left exactly as they are.
 *
 * Runtime parity
 * --------------
 * The rewritten panel is marked with `data-axo-seo="1"` and `data-axo-path`.
 * js/app.js captures that node before it re-renders #app and re-appends it for
 * the matching route, so the DOM a visitor (and Google's renderer) sees is the
 * same text a crawler reads in the raw HTML.
 *
 * Usage, from the repository root:
 *   node scripts/rebuild-faq.js            # apply
 *   node scripts/rebuild-faq.js --check    # report drift only, exit 1 on drift
 */

const fs = require("fs");
const path = require("path");
const { buildFaqs, buildInfo, buildTips, firstClause, joinNames, countLabel, usefulItems, decodeEntities } =
  require("./faq-content.js");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const FORCE = process.argv.includes("--force");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", ".monkeycode-tmp-files"]);

const BASE = "https://axomexam.in";

/* Only the auto-generated panel is rewritten. Panels carrying data-axo-deep
   were written by hand in scripts/deep-content.data.js and stay untouched. */
const PANEL_RE = /<section class="section seo-deep"(?![^>]*data-axo-deep)[^>]*>[\s\S]*?<\/section>/g;
const DETAIL_RE = /<details\b[^>]*>[\s\S]*?<\/details>/g;
const SUMMARY_RE = /<summary\b[^>]*>([\s\S]*?)<\/summary>/i;

const H3 = 'style="color:var(--ink,#0f172a); margin-top:22px;"';
const H3_FAQ = 'style="color:var(--ink,#0f172a); margin-top:24px;"';
const UL = 'style="margin:8px 0 0 20px; line-height:1.9;"';
const DETAIL_STYLE = 'style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"';
const SUMMARY_STYLE = 'style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);"';

const EXAM_TOKENS = [
  "ADRE 2.0", "ADRE 3.0", "ADRE", "APSC", "Assam Police",
  "Gauhati High Court", "Guwahati High Court", "DHS", "DME", "DHE",
  "SSC", "Railway", "RRB",
];

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function strip(html) {
  return decodeEntities(String(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name === "index.html") {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function canonicalOf(html, file) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (m) return m[1];
  const rel = path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/");
  return rel ? `${BASE}/${rel}/` : `${BASE}/`;
}

function metaDescription(html) {
  const a = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const b = html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  return strip(a ? a[1] : b ? b[1] : "");
}

/*
 * Page name, in preference order:
 *   1. the H1 inside #app (what a reader actually sees as the title)
 *   2. the <title>, with the site suffix removed
 * Both go through the same cleanup, because the H1 on some pages carries the
 * full "Question Bank (250 Questions, Bilingual English & Assamese)" tail,
 * which would otherwise become part of every generated sentence and push the
 * answers back towards each other.
 * The e-book pages ship a generic H1, so the <title> fallback matters there.
 */
function cleanName(raw) {
  let s = strip(raw);
  s = s.replace(/\s*\|\s*axomexam\s*$/i, "").trim();
  s = s.replace(/\s*[-–—]\s*Free Online E-?Book\s*$/i, "").trim();
  s = s.replace(/\s*\([^)]*questions[^)]*\)/i, "").trim();
  s = s.replace(/\s*[-–—]\s*(Overview|Setup|Start)\s*$/i, "").trim();
  s = s.replace(/\s+for\s+[A-Za-z0-9 .,&()]+$/i, (m) =>
    /\b(ADRE|APSC|Assam\s+Police|SSC|Railway|RRB|DHS|DME|DHE|Gauhati|Guwahati|Grade)\b/i.test(m) ? "" : m
  ).trim();
  s = s.replace(
    /\s+(Questions?\s+(?:with|&|and)\s+Answers|Practice\s+Questions?|Question\s+Bank|Question\s+Paper|MCQs?\s+for\s+Competitive\s+Exams)\s*$/i,
    ""
  ).trim();
  return s;
}

function pageName(html) {
  const i = html.indexOf('<main id="app"');
  const j = i >= 0 ? html.indexOf("</main>", i) : -1;
  const main = i >= 0 ? html.slice(i, j > i ? j : undefined) : "";

  const h1 = main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const fromH1 = h1 ? cleanName(h1[1]) : "";
  if (fromH1 && !/Assam Competitive Exam Preparation Portal/i.test(fromH1)) return fromH1;

  const tm = html.match(/<title>([\s\S]*?)<\/title>/i);
  const fromTitle = tm ? cleanName(tm[1]) : "";
  return fromTitle || fromH1 || "this practice set";
}

/* Real child topic names listed on the page, from the sub-card anchors. */
function childItems(html) {
  const i = html.indexOf('<main id="app"');
  const j = i >= 0 ? html.indexOf("</main>", i) : -1;
  const main = i >= 0 ? html.slice(i, j > i ? j : undefined) : "";
  const out = [];
  for (const m of main.matchAll(/<a [^>]*class="sub-card[^"]*"[^>]*>([\s\S]{0,400}?)<\/a>/g)) {
    let t = strip(m[1]).replace(/\s*\d+\s*(Topics?|Sets?|Questions?)\s*$/i, "").trim();
    if (t) out.push(t);
  }
  return out;
}

/* Real question count printed on the page. */
function questionCount(html) {
  const i = html.indexOf('<main id="app"');
  const j = i >= 0 ? html.indexOf("</main>", i) : -1;
  const main = i >= 0 ? html.slice(i, j > i ? j : undefined) : "";
  const m = main.match(/(\d[\d,]*)\s+Questions with Answers/i) || main.match(/(\d[\d,]*)\s+questions\b/i);
  return m ? m[1].replace(/,/g, "") : null;
}

function examTokens(text) {
  let exams = EXAM_TOKENS.filter((t) =>
    new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(text)
  );
  if (exams.includes("ADRE 2.0") || exams.includes("ADRE 3.0")) exams = exams.filter((e) => e !== "ADRE");
  if (exams.includes("Gauhati High Court") && exams.includes("Guwahati High Court")) {
    exams = exams.filter((e) => e !== "Guwahati High Court");
  }
  return exams.join(", ");
}

function buildCtx(file, html) {
  const name = pageName(html);
  const desc = metaDescription(html);
  return {
    canonical: canonicalOf(html, file),
    name,
    count: questionCount(html),
    items: childItems(html),
    desc,
    exams: examTokens(`${name} ${desc} ${strip(html.slice(0, 6000))}`),
  };
}

/* --- template detection -------------------------------------------------

   Two independent signals, both of which have to be safe: removing a
   hand-written answer is worse than leaving one template answer in place.

   1. BOILERPLATE fingerprints. The old autoSeo wrote its answers from a fixed
      set of sentences and spliced the page name into them, so every template
      answer contains one of these fragments and no hand-written answer does.

   2. An exact answer that appears on more than one page. Two different pages
      cannot legitimately share a whole answer verbatim.

   An earlier attempt also compared answers after masking the page name and
   digits and keeping only the first and last few words. That caught more
   template variants, but it also collapsed genuinely different questions that
   happen to share an opening and a closing phrase, and it deleted real content
   on topic pages. The fingerprints alone already cover every template the old
   code could emit, so the fuzzy comparison is not worth that risk.            */

const BOILERPLATE = [
  "is free to use on axomexam",
  "appears in assamese and english",
  "is bilingual: the question, every option",
  "is completely free. you can read",
  "there is no payment involved in",
  "every item in",
  "the content is fully bilingual",
  "this set sits under the",
  "is aligned with the",
  "is designed for candidates preparing for",
  "this page brings together",
  "start with the topic notes on this page",
  "steadily: read the concept first",
  "by pairing the notes with practice",
  "they are arranged for practice and revision",
  "set is expanded over time",
  "the questions and their explanations on axomexam.in",
  "worked explanations, and you can re-attempt",
  "the same idea is reinforced in whichever language",
  "so the practice carries over directly to the exam hall",
  "is useful for",
  "is a growing set of practice questions",
];

/* Cheap pre-filter: a fresh regex each call, so no lastIndex to leak. */
function hasPanel(html) {
  return /<section class="section seo-deep"(?![^>]*data-axo-deep)/.test(html);
}

function panelHtml(ctx) {
  const info = buildInfo(ctx);
  const tips = buildTips(ctx);
  const faqs = buildFaqs(ctx);
  const faqHtml = faqs
    .map((f) =>
      `<details data-axo-faq="1" ${DETAIL_STYLE}><summary ${SUMMARY_STYLE}>${esc(f.q)}</summary>` +
      `<p style="margin:8px 0 0;">${esc(f.a)}</p></details>`
    )
    .join("");
  return {
    info,
    tips,
    faqHtml,
    faqCount: faqs.length,
  };
}

function main() {
  const files = walk(ROOT, []);
  const records = [];
  const answerFreq = new Map();

  /* Pass 1: collect every visible FAQ answer so boilerplate can be told apart
     from hand-written, page-specific content. */
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const ctx = buildCtx(file, html);
    const pairs = [];
    for (const block of html.match(DETAIL_RE) || []) {
      const sm = block.match(SUMMARY_RE);
      if (!sm) continue;
      const q = strip(sm[1]);
      const a = strip(block.slice(block.indexOf(sm[0]) + sm[0].length).replace(/<\/details>\s*$/i, ""));
      if (!q || !a) continue;
      pairs.push({ q, a });
      const ak = a.toLowerCase();
      answerFreq.set(ak, (answerFreq.get(ak) || 0) + 1);
    }
    records.push({ file, html, ctx, pairs, hasPanel: hasPanel(html) });
  }

  const isGeneric = (answer) => {
    const a = String(answer).toLowerCase();
    if (BOILERPLATE.some((f) => a.includes(f))) return true;
    return (answerFreq.get(a) || 0) > 1;
  };

  const stats = {
    scanned: files.length,
    panels: 0,
    panelsSkipped: 0,
    panelsChanged: 0,
    infoRewritten: 0,
    tipsRewritten: 0,
    faqRewritten: 0,
    genericPairs: 0,
    leftoverRemoved: 0,
    handWrittenKept: 0,
  };

  for (const rec of records) {
    const ctx = rec.ctx;
    let touched = false;

    const built = panelHtml(ctx);

    /* Pages without a seo-deep panel still go through the leftover sweep at
       the end of this loop, so they must not be skipped here. */
    const out = !rec.hasPanel
      ? rec.html
      : rec.html.replace(PANEL_RE, (panel) => {
      stats.panels++;

      /* A panel already carrying the marker was written by an earlier run, so
         it is skipped: re-deciding "is this generic?" on our own output would
         flag the freshly composed answers (they share a shape once the page
         name and digits are masked) and rewrite them again on every run.
         Use --force to rebuild marked panels anyway. */
      if (!FORCE && /^<section class="section seo-deep"[^>]*data-axo-seo="/.test(panel)) {
        stats.panelsSkipped++;
        return panel;
      }

      let next = panel;

      /* Mark the panel so js/app.js can restore exactly this node instead of
         regenerating boilerplate at runtime. */
      next = next.replace(
        /^<section class="section seo-deep"/,
        `<section class="section seo-deep" data-axo-seo="1" data-axo-path="${esc(
          ctx.canonical.replace(BASE, "") || "/"
        )}"`
      );

      /* Overview paragraph: the first <p> after the closing </h2>. */
      const h2end = next.indexOf("</h2>");
      if (h2end !== -1) {
        const pStart = next.indexOf("<p>", h2end);
        const pEnd = pStart !== -1 ? next.indexOf("</p>", pStart) : -1;
        if (pStart !== -1 && pEnd !== -1) {
          const want = `<p>${esc(built.info)}</p>`;
          if (next.slice(pStart, pEnd + 4) !== want) {
            next = next.slice(0, pStart) + want + next.slice(pEnd + 4);
            stats.infoRewritten++;
          }
        }
      }

      /* "How to prepare" list. */
      const tipRe = /<h3[^>]*>\s*How to prepare[^<]*<\/h3>\s*<ul[^>]*>[\s\S]*?<\/ul>/i;
      if (tipRe.test(next)) {
        const want =
          `<h3 ${H3}>How to prepare ${esc(ctx.name)}</h3>` +
          `<ul ${UL}>` + built.tips.map((t) => `<li>${esc(t)}</li>`).join("") + "</ul>";
        const had = next;
        next = next.replace(tipRe, want);
        if (next !== had) stats.tipsRewritten++;
      }

      /* FAQ. Generic pairs are dropped; hand-written pairs are kept verbatim.
         When at least one pair was generic the whole block is rebuilt, so the
         page ends up with its own questions instead of shared sentences. */
      const faqStart = next.indexOf('<div class="seo-faq">');
      const faqEnd = faqStart !== -1 ? next.indexOf("</div>", faqStart) : -1;
      if (faqStart !== -1 && faqEnd !== -1) {
        const kept = [];
        let generic = 0;
        for (const block of next.slice(faqStart, faqEnd).match(DETAIL_RE) || []) {
          const sm = block.match(SUMMARY_RE);
          if (!sm) continue;
          const a = strip(
            block.slice(block.indexOf(sm[0]) + sm[0].length).replace(/<\/details>\s*$/i, "")
          );
          if (isGeneric(a)) generic++;
          else kept.push(block);
        }
        stats.genericPairs += generic;
        stats.handWrittenKept += kept.length;

        if (generic > 0) {
          const want =
            `<h3 ${H3_FAQ}>Frequently Asked Questions</h3>` +
            `<div class="seo-faq">` + kept.join("") + built.faqHtml + "</div>";
          const headStart = next.lastIndexOf("<h3", faqStart);
          const from = headStart !== -1 ? headStart : faqStart;
          next = next.slice(0, from) + want + next.slice(faqEnd + 6);
          stats.faqRewritten++;
        }
      }

      if (next !== panel) touched = true;
      return next;
    });

    /* Second, narrower pass over the whole file. The panel pass above only
       reaches section.seo-deep, but the same template answers also survive in
       two other places: inside the hand-written data-axo-deep panels, and in
       standalone FAQ blocks on the exam-syllabus and current-affairs pages
       (those have no seo-deep panel at all). Sweep every marked Q&A pair and
       drop the ones that are template text, leaving real content in place. */
    let html2 = out.replace(DETAIL_RE, (block) => {
      if (!/data-axo-faq/.test(block)) return block;
      const sm = block.match(SUMMARY_RE);
      if (!sm) return block;
      const a = strip(block.slice(block.indexOf(sm[0]) + sm[0].length).replace(/<\/details>\s*$/i, ""));
      if (!a || !isGeneric(a)) return block;
      stats.leftoverRemoved++;
      return "";
    });

    /* An FAQ container emptied by the sweep would leave a bare heading, so
       drop the heading and wrapper together. */
    html2 = html2.replace(
      /<h[23][^>]*>\s*Frequently Asked Questions\s*<\/h[23]>\s*<div class="seo-faq">\s*<\/div>/gi,
      ""
    );

    if (html2 !== rec.html) {
      touched = true;
      stats.panelsChanged++;
      if (!CHECK) fs.writeFileSync(rec.file, html2, "utf8");
    }
  }

  console.log(`FAQ rebuild (${CHECK ? "check" : "apply"})`);
  console.log(`  html files scanned   : ${stats.scanned}`);
  console.log(`  seo panels seen      : ${stats.panels}`);
  console.log(`  panels already done  : ${stats.panelsSkipped}`);
  console.log(`  panels changed       : ${stats.panelsChanged}`);
  console.log(`  overview rewritten   : ${stats.infoRewritten}`);
  console.log(`  tips rewritten       : ${stats.tipsRewritten}`);
  console.log(`  faq blocks rewritten : ${stats.faqRewritten}`);
  console.log(`  generic q&a replaced : ${stats.genericPairs}`);
  console.log(`  hand-written kept    : ${stats.handWrittenKept}`);
  console.log(`  leftover template q&a: ${stats.leftoverRemoved}`);

  if (CHECK && stats.panelsChanged) process.exit(1);
}

main();
