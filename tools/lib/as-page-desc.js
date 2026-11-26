"use strict";

/*
 * tools/lib/as-page-desc.js
 *
 * Assamese copy for the visible <p class="page-desc"> on a page, looked up
 * from the Assamese strings already in data/ (categories, content, current
 * affairs, i18n) with Assamese templates for the generated mock-test and
 * utility pages.
 *
 * Why this exists: tools/prerender.js writes the page-desc from the English
 * data, so the /as/ twin inherited an English sentence under an Assamese
 * heading — a visible duplicate of its English twin. Both the twin builder
 * and the standalone back-fill tool (tools/translate-as-page-descs.js) call
 * this so a rebuild keeps the Assamese paragraph.
 */

const fs = require("fs");
const path = require("path");

const AS_CHAR = /[\u0980-\u09FF]/;

/* Return the [start,end) of the visible <p class="page-desc"> element, or null.
   The description is emitted from multi-line data, so its inner HTML can hold
   its own <p> / <ul> children. A lazy `[\s\S]*?</p>` therefore stops at the
   first nested close tag and leaves the rest of the block behind, which shows
   English prose under an Assamese heading and unbalances the tags. Walk the
   nested <p> depth instead. */
function pageDescSpan(html) {
  const open = /<p class="page-desc"[^>]*>/.exec(html);
  if (!open) return null;
  const re = /<p\b[^>]*>|<\/p>/g;
  re.lastIndex = open.index + open[0].length;
  let depth = 1;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].slice(0, 2) === "</") {
      depth--;
      if (depth === 0) return { start: open.index, inner: open.index + open[0].length, end: re.lastIndex };
    } else depth++;
  }
  return null;
}

const readJSON = (p) => {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) { return null; }
};

function createPageDescTranslator(root) {
  const categories = readJSON(path.join(root, "data", "categories.json")) || { categories: [] };
  const catById = new Map((categories.categories || []).map((c) => [c.id, c]));

  const caIndex = readJSON(path.join(root, "data", "current-affairs", "index.json")) || { categories: [] };
  const caById = new Map((caIndex.categories || []).map((c) => [c.id, c]));

  const subjectInfoAs = readJSON(path.join(root, "data", "i18n", "subject-info-as.json")) || {};

  function contentFile(segs) {
    const tries = [];
    if (segs.length >= 4) tries.push(segs.slice(1, 4));
    if (segs.length >= 3) tries.push([segs[1], segs[2]]);
    if (segs.length >= 3) tries.push([segs[1], segs[segs.length - 1]]);
    for (const t of tries) {
      const d = readJSON(path.join(root, "data", "content", ...t) + ".json");
      if (d) return d;
    }
    return null;
  }

  function contentDesc(segs) {
    const d = contentFile(segs);
    return (d && d.description && d.description.as) || null;
  }

  function contentTitle(segs) {
    const d = contentFile(segs);
    return (d && d.title && d.title.as) || null;
  }

  /* Exam section titles live in data/exams/<exam>/<section>.json. */
  function examTitle(segs) {
    if (segs.length < 3) return null;
    const d = readJSON(path.join(root, "data", "exams", segs[1], segs[2]) + ".json");
    return (d && d.title && d.title.as) || null;
  }

  /* Exam sub-category titles live in data/exams/<exam>/index.json. */
  function examSubTitle(segs) {
    if (segs.length < 4) return null;
    const idx = readJSON(path.join(root, "data", "exams", "index.json"));
    const exam = (idx && idx.exams || []).find((e) => e.id === segs[1]);
    if (!exam) return null;
    let list = exam.sections || [];
    let node = null;
    for (const id of segs.slice(2)) {
      node = list.find((s) => s && s.id === id) || null;
      if (!node) return null;
      list = node.subcategories || [];
    }
    return (node && node.title && node.title.as) || null;
  }

  function descFor(rel) {
    const segs = rel.split("/").filter(Boolean);

    if (segs[0] === "topic") {
      const d = contentDesc(segs);
      if (d) return d;
      const topic = segs[segs.length - 1];
      if (subjectInfoAs[topic]) return subjectInfoAs[topic];
      const title = contentTitle(segs) || topic.replace(/-/g, " ");
      const cat = catById.get(segs[1]);
      const catName = (cat && cat.name && cat.name.as) || "";
      const subId = segs.length >= 4 ? segs[2] : "";
      const sub = cat && (cat.subcategories || []).find((s) => s.id === subId);
      const subName = (sub && sub.name && sub.name.as) || "";
      const where = [catName, subName].filter(Boolean).join(" › ");
      return `${title} — ${where ? where + " শিতানৰ " : ""}অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে দ্বিভাষিক (ইংৰাজী আৰু অসমীয়া) প্ৰশ্ন আৰু উত্তৰ, ব্যাখ্যা আৰু টোকা। সম্পূৰ্ণ বিনামূলীয়া।`;
    }

    if (segs[0] === "category") {
      const cat = catById.get(segs[1]);
      if (!cat) return null;
      if (segs.length === 2) return (cat.description && cat.description.as) || null;
      const d = contentDesc(segs);
      if (d) return d;
      const sub = (cat.subcategories || []).find((s) => s.id === segs[segs.length - 1]);
      const subName = (sub && sub.name && sub.name.as) || segs[segs.length - 1];
      return `${subName} — axomexam.in ত অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া প্ৰশ্ন আৰু উত্তৰ, উদাহৰণ আৰু টোকা।`;
    }

    if (segs[0] === "current-affairs") {
      if (segs.length === 1) {
        return "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক চলিত ঘটনাৱলী প্ৰশ্ন আৰু উত্তৰ — ৰাষ্ট্ৰীয়, আন্তৰ্জাতিক আৰু ৰাজ্যিক বাতৰি।";
      }
      const c = caById.get(segs[1]);
      return (c && c.intro && c.intro.as) || null;
    }

    if (segs[0] === "mock-test") {
      const isSet = /^set-\d+$/.test(segs[segs.length - 1]);
      if (isSet) {
        const setNo = segs[segs.length - 1].replace("set-", "");
        const subj = segs.length >= 3 ? segs[segs.length - 2] : "";
        const info = subjectInfoAs[subj];
        const lead = info ? info.split("।")[0] + "। " : "";
        return `${lead}মক টেষ্ট ছেট ${setNo} ত এই বিষয়ৰ দ্বিভাষিক প্ৰশ্ন আছে, প্ৰতিটোৰ উত্তৰ আৰু চুটি ব্যাখ্যাৰ সৈতে। অনুশীলনৰ বাবে অনলাইনত সময়বদ্ধ পৰীক্ষা দিয়ক বা তলত সম্পূৰ্ণ ছেট পঢ়ক।`;
      }
      const subj = segs[segs.length - 1];
      const info = subjectInfoAs[subj];
      if (info) return `${info} মক টেষ্টে সময়বদ্ধ প্ৰশ্ন, তাৎক্ষণিক ফলাফল আৰু উত্তৰৰ পৰ্যালোচনা আগবঢ়ায়।`;
      return "আপোনাৰ মক টেষ্ট সজাই অনুশীলন আৰম্ভ কৰক।";
    }

    if (segs[0] === "exams") {
      if (segs.length === 1) {
        return "আপুনি যি পৰীক্ষাৰ প্ৰস্তুতি লৈছে সেইখন বাছনি কৰক। প্ৰতিখন পৰীক্ষা কিতাপে পাঠ্যক্ৰম, প্ৰাথমিক গণিত, সাধাৰণ ইংৰাজী, যুক্তি আৰু মানসিক ক্ষমতা, অসমৰ ইতিহাস, ভূগোল আৰু সংস্কৃতি — সকলো একেলগে আনে।";
      }
      const d = contentDesc(segs);
      if (d) return d;
      const topic = segs[segs.length - 1];
      if (subjectInfoAs[topic]) return subjectInfoAs[topic];
      const title = examSubTitle(segs) || examTitle(segs) || contentTitle(segs);
      if (title) return `${title} — axomexam.in ত অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে দ্বিভাষিক প্ৰশ্ন, উত্তৰ আৰু টোকা।`;
      const leaf = topic.replace(/-/g, " ");
      return `${leaf} — অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে দ্বিভাষিক প্ৰশ্ন, উত্তৰ আৰু টোকা axomexam.in ত।`;
    }

    if (segs[0] === "download-app") {
      return "axomexam Android এপ ডাউনলোড কৰক — সকলো মক টেষ্ট, দ্বিভাষিক প্ৰশ্ন-উত্তৰ অনুশীলন, ই-বুক আৰু বিগত বছৰৰ প্ৰশ্নকাকত এক হালধীয়া এপত। বিনামূলীয়া, ছাইন-আপ নালাগে।";
    }

    if (segs[0] === "categories") return "অনুশীলনৰ বাবে উপলব্ধ সকলো বিষয় চাওক।";
    if (segs[0] === "ebooks") {
      return "ADRE 2.0, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে প্ৰাৰ্থীৰ বাবে সৰল দ্বিভাষিক (ইংৰাজী আৰু অসমীয়া) ভাষাত লিখা বিষয়ভিত্তিক অনলাইন ই-বুক। প্ৰতিখন কিতাপ অধ্যায় অনুসৰি সজোৱা, যাতে আপুনি যি বিষয়ৰ প্ৰস্তুতি লৈছে ঠিক সেয়াই পঢ়িব পাৰে।";
    }
    if (segs[0] === "previous-year") {
      return "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে সমাধানসহ বিগত বছৰৰ প্ৰশ্নকাকত ডাউনলোড কৰক।";
    }
    if (segs[0] === "downloads") {
      return "বিষয়ভিত্তিক প্ৰিন্ট কৰিব পৰা PDF টোকা, সমাধানসহ বিগত বছৰৰ প্ৰশ্নকাকত আৰু বিশেষ ই-বুক — সকলো বিনামূলীয়া। প্ৰতিটো PDF ত দ্বিভাষিক (ইংৰাজী আৰু অসমীয়া) প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা আছে, যি অফলাইন পঢ়া আৰু পুনৰীক্ষণৰ বাবে উপযুক্ত।";
    }

    return null;
  }

  /* Return the Assamese page-desc for `rel`, or null when there is none. */
  return (rel) => descFor(rel);
}

module.exports = { createPageDescTranslator, AS_CHAR, pageDescSpan };
