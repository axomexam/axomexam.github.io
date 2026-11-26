"use strict";

/* ============================================================
   axomexam — tools/lib/exam-book-names.js

   Display name overrides for the "Your Exams" books.

   A book's registry title lives in data/exams/index.json, but that
   same title is also what the exam-wise mock-test hub reads. The
   Assam Police Constable book needs a longer label in the book
   surfaces ("Assam Police AB & UB") while the mock hub keeps the
   short one, so the override lives here and is applied only by the
   book-page builders and the runtime (js/app.src.js).

   Keep this map in step with EXAM_BOOK_NAMES in js/app.src.js.
   ============================================================ */

const EXAM_BOOK_NAMES = {
  "assam-police": { en: "Assam Police AB & UB", as: "অসম আৰক্ষী AB আৰু UB" },
};

function examBookName(exam, lang) {
  const custom = exam ? EXAM_BOOK_NAMES[exam.id] : null;
  if (custom) return custom[lang] || custom.en;
  return exam && exam.title ? exam.title[lang] || exam.title.en || "" : "";
}

module.exports = { EXAM_BOOK_NAMES, examBookName };
