#!/usr/bin/env node
"use strict";

/*
 * tools/seo-topical-links.js
 *
 * Gives every /topic/ page a "related topics" block: six sibling topics from
 * the same subject/category plus a link up to the category hub. Before this,
 * 331 of 332 topic pages linked to no other topic at all, so Google saw 332
 * isolated leaves instead of a topical cluster.
 *
 * The block reuses the plain h2/ul markup the category pages already ship
 * (no new CSS classes, no layout change) and is written to the /as/ twin in
 * Assamese. Idempotent: a page that already carries data-axo-related is
 * skipped.
 *
 * Usage: node tools/seo-topical-links.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const LIMIT = 6;

const unescape = (s) => String(s || "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");

function listTopicDirs(base) {
  const out = [];
  const walk = (dir) => {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      if (fs.existsSync(path.join(full, "index.html"))) out.push(full);
      walk(full);
    }
  };
  walk(base);
  return out.sort();
}

function pageInfo(dir, base, prefix) {
  const file = path.join(dir, "index.html");
  const h = fs.readFileSync(file, "utf8");
  const t = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(h);
  const title = /<title>([\s\S]*?)<\/title>/i.exec(h);
  const label = unescape((t ? t[1] : title ? title[1] : dir).replace(/<[^>]+>/g, "")).split(/[—|:]/)[0].trim();
  const rel = "/" + prefix + "/" + path.relative(base, dir).split(path.sep).join("/") + "/";
  const segs = path.relative(base, dir).split(path.sep);
  return { dir, file, rel, segs, label, html: h };
}

function categoryKey(segs) {
  /* topic/<subject>/<category>/... groups by category; a two-level
     topic/<subject>/<page> page has no category, so it clusters with its
     subject instead of standing alone. */
  return segs.length >= 3 ? segs.slice(0, 2).join("/") : segs[0];
}

function buildBlock({ siblings, parentHref, parentLabel, lang, catLabel }) {
  const heading = lang === "as"
    ? `সম্পৰ্কিত ${catLabel} বিষয়সমূহ`
    : `Related ${catLabel} topics`;
  const intro = lang === "as"
    ? `<p lang="as">এই বিষয়ৰ সৈতে একে শিতানৰ অন্য বিষয়সমূহ — প্ৰতিটোতে প্ৰশ্ন, শুদ্ধ উত্তৰ আৰু ব্যাখ্যা আছে।</p>`
    : `<p lang="en">More topics from the same section, each with questions, answers and explanations.</p>`;
  const items = siblings.map((s) => `          <li${lang === "as" ? ' lang="as"' : ' lang="en"'}><a href="${s.rel}">${s.label}</a></li>`).join("\n");
  const up = `          <li${lang === "as" ? ' lang="as"' : ' lang="en"'}><a href="${parentHref}">${lang === "as" ? "সকলো" : "All"} ${parentLabel}</a></li>`;
  return `
        <article lang="${lang}" data-axo-lang="${lang}" data-axo-related="1" class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:18px auto 0; text-align:left;">
          <h2 style="margin-top:0; color:var(--ink,#0f172a);">${heading}</h2>
          ${intro}
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
${items}
${up}
          </ul>
        </article>`;
}

/* The related block has to live where the site keeps its crawler copy: in the
   axo-extra-content section that sits *outside* <main id="app"> (the SPA
   rewrites that whole subtree on every navigation). Appending it to the
   existing section also inherits the section's data-axo-path guard and its
   client-side sync, so it never leaks onto another route. */
function insertBlock(html, block, pathname) {
  const secStart = html.search(/<section class="section axo-extra-content"/);
  if (secStart >= 0) {
    const secEnd = html.indexOf("</section>", secStart);
    if (secEnd > 0) return html.slice(0, secEnd) + block + "\n      " + html.slice(secEnd);
  }
  const wrapper = `
  <section class="section axo-extra-content" data-axo-extra="1" data-axo-path="${pathname}" style="padding-bottom:48px;">
    <div class="container">${block}
    </div>
  </section>`;
  const mainEnd = html.lastIndexOf("</main>");
  if (mainEnd > 0) return html.slice(0, mainEnd + 7) + wrapper + html.slice(mainEnd + 7);
  return html;
}

function catLabelFor(subject, category, lang) {
  const p = lang === "as"
    ? path.join(ROOT, "as", "category", subject, ...(category ? [category] : []), "index.html")
    : path.join(ROOT, "category", subject, ...(category ? [category] : []), "index.html");
  try {
    const h = fs.readFileSync(p, "utf8");
    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(h);
    if (h1) {
      return unescape(h1[1].replace(/<[^>]+>/g, ""))
        .replace(/\s+(Questions? with Answers|প্ৰশ্ন.*)$/i, "").replace(/\s*[—|:].*$/, "").trim();
    }
  } catch { /* hub missing: fall back to the slug */ }
  return (category || subject).replace(/-/g, " ");
}

let touched = 0, skipped = 0;

for (const [base, lang, prefix] of [[path.join(ROOT, "topic"), "en", "topic"], [path.join(ROOT, "as", "topic"), "as", "as/topic"]]) {
  if (!fs.existsSync(base)) continue;
  const pages = listTopicDirs(base).map((d) => pageInfo(d, base, prefix));
  const byKey = new Map();
  const bySubject = new Map();
  for (const p of pages) {
    const k = categoryKey(p.segs);
    (byKey.get(k) || byKey.set(k, []).get(k)).push(p);
    const subj = p.segs[0];
    (bySubject.get(subj) || bySubject.set(subj, []).get(subj)).push(p);
  }

  for (const p of pages) {
    if (p.html.includes('data-axo-related="1"')) { skipped++; continue; }
    const key = categoryKey(p.segs);
    const parts = key.split("/");
    const subject = parts[0];
    const category = parts[1] || null;
    const section = p.segs.length > 3 ? p.segs[2] : null;

    const peers = byKey.get(key).filter((o) => o.rel !== p.rel);
    /* Nearest neighbours first: same sub-section, then the rest of the
       category, then a deterministic order so reruns are byte-identical. */
    peers.sort((a, b) => {
      const aNear = section && a.segs[2] === section ? 0 : 1;
      const bNear = section && b.segs[2] === section ? 0 : 1;
      if (aNear !== bNear) return aNear - bNear;
      return a.label.localeCompare(b.label);
    });
    let siblings = peers.slice(0, LIMIT);
    if (!siblings.length) {
      /* Subject-level page (topic/english/parts-of-speech) whose siblings all
         sit one level deeper: cluster with the whole subject. */
      const wide = (bySubject.get(subject) || []).filter((o) => o.rel !== p.rel);
      wide.sort((a, b) => a.label.localeCompare(b.label));
      siblings = wide.slice(0, LIMIT);
    }
    if (!siblings.length) {
      /* A lone page in its subject (topic/english/parts-of-speech is the only
         page under topic/english) still needs an exit: point it at the
         subject's category hubs and the all-categories index. */
      const asPrefix2 = lang === "as" ? "as/" : "";
      const hubs = [];
      const catDir = path.join(ROOT, asPrefix2, "category", subject);
      if (fs.existsSync(path.join(catDir, "index.html"))) {
        hubs.push({ rel: `/${asPrefix2}category/${subject}/`, label: catLabelFor(subject, "", lang) });
      }
      if (fs.existsSync(catDir)) {
        for (const e of fs.readdirSync(catDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
          if (!e.isDirectory() || hubs.length >= LIMIT) continue;
          if (!fs.existsSync(path.join(catDir, e.name, "index.html"))) continue;
          hubs.push({ rel: `/${asPrefix2}category/${subject}/${e.name}/`, label: catLabelFor(subject, e.name, lang) });
        }
      }
      /* Last resort: point the page at its other-language twin, which is the
         same topic and therefore a legitimate related link. */
      const twin = lang === "as" ? p.rel.replace(/^\/as\//, "/") : `/as${p.rel}`;
      if (fs.existsSync(path.join(ROOT, twin.replace(/^\//, ""), "index.html"))) {
        hubs.push({ rel: twin, label: lang === "as" ? "English version" : "অসমীয়া সংস্কৰণ" });
      }
      if (!hubs.length) hubs.push({ rel: `/${asPrefix2}categories/`, label: lang === "as" ? "সকলো শিতান" : "all subjects" });
      siblings = hubs.slice(0, LIMIT);
    }
    if (!siblings.length) { skipped++; continue; }

    const asPrefix = lang === "as" ? "as/" : "";
    const catPath = category ? `${subject}/${category}` : subject;
    const hubRel = section ? `/${asPrefix}category/${catPath}/${section}/` : `/${asPrefix}category/${catPath}/`;
    const hubExists = fs.existsSync(path.join(ROOT, hubRel.replace(/^\//, ""), "index.html"));
    let parentHref = hubExists ? hubRel : `/${asPrefix}category/${subject}/`;
    if (!fs.existsSync(path.join(ROOT, parentHref.replace(/^\//, ""), "index.html"))) {
      parentHref = `/${asPrefix}categories/`; /* no category hub for this cluster */
    }
    const parentLabel = catLabelFor(subject, category || "", lang);
    const block = buildBlock({ siblings, parentHref, parentLabel, lang, catLabel: parentLabel });

    const next = insertBlock(p.html, block, p.rel);
    if (next === p.html) { skipped++; continue; }
    touched++;
    if (!DRY) fs.writeFileSync(p.file, next);
  }
}

console.log(`topic pages updated: ${touched} | already had related links: ${skipped}`);
