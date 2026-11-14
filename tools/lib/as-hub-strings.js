"use strict";

/*
 * tools/lib/as-hub-strings.js
 *
 * Assamese translation of the hub-page body text, shared by the twin builder
 * (tools/build-as-twins.js) and the standalone back-fill tool
 * (tools/add-as-hub-content.js).
 *
 * The hub prose (headings, preparation tips, FAQ templates, the per-page
 * blurb sentences) is generated in English by tools/enrich-thin-pages.js and
 * by the runtime. An /as/ twin that keeps that English text is a duplicate of
 * its English twin, so both tools translate it here.
 *
 * Sources of Assamese:
 *   - data/i18n/hub-as.json        exact strings + templated patterns
 *   - data/ categories/exams/current-affairs  en -> as names already on file
 */

const fs = require("fs");
const path = require("path");

const AS_CHAR = /[\u0980-\u09FF]/;

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

/* en -> as labels from the data that already carries Assamese. */
const NAME_AS = new Map();
function addName(obj) {
  if (!obj) return;
  for (const key of ["name", "title", "subtitle"]) {
    const v = obj[key];
    if (v && typeof v === "object" && v.en && v.as) NAME_AS.set(String(v.en).trim(), String(v.as).trim());
  }
}

function createTranslator(root) {
  const HUB = readJSON(path.join(root, "data", "i18n", "hub-as.json")) || { exact: {}, regex: [] };
  const EXACT = HUB.exact || {};
  const PATTERNS = (HUB.regex || []).map((r) => ({ re: new RegExp(r.re), to: r.to }));

  const cats = readJSON(path.join(root, "data", "categories.json"));
  const walkCats = (list) => {
    for (const c of list || []) {
      addName(c);
      walkCats(c.subcategories || c.sections || c.topics);
    }
  };
  walkCats(cats && cats.categories);

  const exams = readJSON(path.join(root, "data", "exams", "index.json"));
  const walkExams = (list) => {
    for (const e of list || []) {
      addName(e);
      walkExams(e.sections || e.subcategories || e.topics);
    }
  };
  walkExams(exams && exams.exams);

  const ca = readJSON(path.join(root, "data", "current-affairs", "index.json"));
  for (const c of (ca && ca.categories) || []) addName(c);

  /* Translate one visible text run; return it unchanged when nothing matches,
     so an English fact without a translation stays readable rather than being
     dropped. */
  function translate(text) {
    const raw = text;
    const lead = /^\s*/.exec(raw)[0];
    const trail = /\s*$/.exec(raw)[0];
    const core = raw.trim();
    if (!core) return raw;

    if (EXACT[core]) return lead + EXACT[core] + trail;
    if (NAME_AS.has(core)) return lead + NAME_AS.get(core) + trail;

    for (const p of PATTERNS) {
      const m = p.re.exec(core);
      if (!m) continue;
      const args = m.slice(1).map((g) => {
        const gv = (g || "").trim();
        return NAME_AS.get(gv) || gv;
      });
      let out = p.to;
      for (let i = args.length; i >= 1; i--) out = out.split("$" + i).join(args[i - 1]);
      return lead + out + trail;
    }
    return raw;
  }

  /* Rewrite the visible text nodes of an HTML fragment, leaving tags and
     attributes intact. */
  function translateFragment(html) {
    return html.replace(/>([^<]+)</g, (m, txt) => {
      if (!/[A-Za-z]{3}/.test(txt)) return m;
      if (AS_CHAR.test(txt)) return m; // already Assamese
      const out = translate(txt);
      return out === txt ? m : ">" + out + "<";
    });
  }

  return { translate, translateFragment, nameCount: NAME_AS.size };
}

module.exports = { createTranslator, AS_CHAR };
