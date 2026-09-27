#!/usr/bin/env node
/* ============================================================
   axomexam — tools/build-question-counts.js

   Precomputes every question count used by the SPA and writes a small
   data/counts.json manifest:

     {
       "generatedAt": "...",
       "topicCounts":      { "<category>/<sub>/<section>/<topic>": n, ... },
       "examSectionCounts":{ "<exam>/<section>[/<subpath>]": n, ... },
       "examsTotal": N
     }

   Before this manifest existed the SPA downloaded every topic JSON
   (~24 MB) and every exam question file (~15 MB) on each page load just
   to display counts. With counts.json the browser fetches one small file
   instead, while the actual study content still loads on demand when a
   topic / exam page is opened.

   Re-run this script whenever questions are added, changed or removed:

     node tools/build-question-counts.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SAMPLE = path.join(ROOT, "data", "sample");
const CONTENT_DIR = path.join(SAMPLE, "content");
const EXAMS_DIR = path.join(ROOT, "data", "exams");
const OUT_FILE = path.join(ROOT, "data", "counts.json");

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

/* A content file is either an array of question objects or an object
   with a "questions" array. Anything else counts as zero. */
function countQuestions(data) {
  if (Array.isArray(data)) return data.length;
  if (data && Array.isArray(data.questions)) return data.questions.length;
  return 0;
}

function countQuestionsFile(file) {
  return countQuestions(readJSON(file));
}

/* ------------------------------------------------------------------
   Practice categories → topicCounts
   Mirrors API.getTopic() resolution in js/api.js so the precomputed
   value is exactly what the old runtime loader produced.
   ------------------------------------------------------------------ */
const categoriesData = readJSON(path.join(SAMPLE, "categories.json")) || { categories: [] };
const topicCounts = {};

function resolveTopicFile(cat, sub, topicId) {
  const layout = cat.contentLayout;
  const rels = [];
  if (layout === "flat") {
    rels.push(`${cat.id}/${topicId}.json`);
  } else {
    if (sub && sub.id) {
      if (sub.id === topicId) rels.push(`${cat.id}/${sub.id}.json`);
      rels.push(`${cat.id}/${sub.id}/${topicId}.json`);
    }
    rels.push(`${cat.id}/${topicId}.json`);
  }
  for (const rel of rels) {
    const file = path.join(CONTENT_DIR, rel);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

function addTopic(cat, sub, section, topic) {
  const key = [cat.id, sub ? sub.id : "", section ? section.id : ""]
    .filter(Boolean)
    .concat([topic.id])
    .join("/");
  const file = resolveTopicFile(cat, sub, topic.id);
  topicCounts[key] = file ? countQuestionsFile(file) : 0;
}

function walkCategory(cat) {
  const subs = cat.subcategories || [];
  if (subs.length) {
    subs.forEach((sub) => {
      const sections = sub.sections || [];
      if (sections.length) {
        sections.forEach((sec) => (sec.topics || []).forEach((tp) => addTopic(cat, sub, sec, tp)));
      } else if ((sub.topics || []).length) {
        (sub.topics || []).forEach((tp) => addTopic(cat, sub, null, tp));
      } else {
        const key = [cat.id, sub.id].join("/");
        const file = resolveTopicFile(cat, sub, sub.id);
        topicCounts[key] = file ? countQuestionsFile(file) : 0;
      }
    });
  } else {
    const sections = cat.sections || [];
    if (sections.length) {
      sections.forEach((sec) => (sec.topics || []).forEach((tp) => addTopic(cat, null, sec, tp)));
    } else {
      (cat.topics || []).forEach((tp) => addTopic(cat, null, null, tp));
    }
  }
}

(categoriesData.categories || []).forEach(walkCategory);

/* ------------------------------------------------------------------
   "Your Exams" library → examSectionCounts + examsTotal
   Mirrors examSectionQuestionCount() / examSubtreeQuestionCount() in
   js/app.js (only exams with status "available" are counted; syllabus
   sections are ignored, exactly like the runtime hero counter).
   ------------------------------------------------------------------ */
const examsIndexData = readJSON(path.join(EXAMS_DIR, "index.json")) || { exams: [] };
const exams = Array.isArray(examsIndexData) ? examsIndexData : (examsIndexData.exams || []);
const examSectionCounts = {};

function countLeafQuestions(examId, sectionId, subPath) {
  const dir = path.join(EXAMS_DIR, examId, sectionId, ...subPath);
  let entries = [];
  try {
    entries = fs.readdirSync(dir);
  } catch (e) {
    return 0;
  }
  let total = 0;
  for (const name of entries) {
    if (!/\.json$/i.test(name)) continue;
    if (/^index\.json$/i.test(name)) continue;
    total += countQuestionsFile(path.join(dir, name));
  }
  return total;
}

function countSubtree(examId, sectionId, subPath, node) {
  const children = (node && Array.isArray(node.subcategories)) ? node.subcategories : [];
  let total = 0;
  if (children.length) {
    for (const child of children) {
      total += countSubtree(examId, sectionId, subPath.concat(child.id), child);
    }
  } else {
    total = countLeafQuestions(examId, sectionId, subPath);
  }
  examSectionCounts[`${examId}/${sectionId}/${subPath.join("/")}`] = total;
  return total;
}

let examsTotal = 0;
for (const exam of exams) {
  if (!exam || exam.status !== "available") continue;
  const sections = Array.isArray(exam.sections) ? exam.sections : [];
  for (const sec of sections) {
    if (!sec || sec.type === "syllabus") continue;
    const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
    let n = 0;
    if (subs.length) {
      for (const sub of subs) {
        n += countSubtree(exam.id, sec.id, [sub.id], sub);
      }
    } else {
      n = countQuestionsFile(path.join(EXAMS_DIR, exam.id, `${sec.id}.json`));
    }
    examSectionCounts[`${exam.id}/${sec.id}`] = n;
    examsTotal += n;
  }
}

/* ------------------------------------------------------------------ */
const output = {
  generatedAt: new Date().toISOString(),
  topicCounts,
  examSectionCounts,
  examsTotal,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2) + "\n");
console.log(
  `Wrote ${path.relative(ROOT, OUT_FILE)} — ` +
  `${Object.keys(topicCounts).length} topics, ` +
  `${Object.keys(examSectionCounts).length} exam sections, ` +
  `examsTotal=${examsTotal}`
);
