#!/usr/bin/env node
/* ============================================================
   axomexam — tools/build-exam-subcategories.js

   Scaffolds the "Your Exams → Assam Police → subject → sub-category"
   practice layout used by the SPA.

   For every sub-category declared in data/exams/index.json it writes:

     data/exams/<exam>/<section>/<sub>/question-001.json   (one sample MCQ)
     data/exams/<exam>/<section>/<sub>/index.json          (file manifest,
                                                            offline fallback)
     exams/<exam>/<section>/<sub>/index.html               (SEO shell page)

   It also links the sub-categories from the subject's static page and
   appends the new routes to sitemap.xml.

   Question files are ONE QUESTION PER FILE (bilingual, 4 options). New
   questions are auto-discovered from the repo at runtime, so the owner can
   keep dropping question-002.json, question-003.json ... into the folder.

   Usage: node tools/build-exam-subcategories.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXAMS_INDEX = path.join(ROOT, "data", "exams", "index.json");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const BASE = "https://axomexam.in";
const SAMPLE_FILE = "question-001.json";

/* ---- One sample bilingual MCQ per sub-category id ---- */
const QUESTIONS = {
  /* ===== Elementary Mathematics ===== */
  "number-system": {
    q: { en: "Which of the following is an irrational number?", as: "তলৰ কোনটো এটা অপৰিমেয় সংখ্যা?" },
    options: [
      { en: "√2", as: "√2" },
      { en: "0.25", as: "0.25" },
      { en: "3/4", as: "3/4" },
      { en: "-5", as: "-5" },
    ],
    correct: 0,
    explanation: {
      en: "√2 cannot be written as a fraction of two integers, so it is irrational.",
      as: "√2 ক দুটা পূৰ্ণসংখ্যাৰ ভগ্নাংশ হিচাপে লিখিব নোৱাৰি, গতিকে ই অপৰিমেয়।",
    },
  },
  "lcm-hcf": {
    q: { en: "What is the LCM of 12 and 18?", as: "১২ আৰু ১৮ ৰ ল.সা.গু. কিমান?" },
    options: [
      { en: "36", as: "৩৬" },
      { en: "72", as: "৭২" },
      { en: "6", as: "৬" },
      { en: "216", as: "২১৬" },
    ],
    correct: 0,
    explanation: {
      en: "12 = 2²×3 and 18 = 2×3², so LCM = 2²×3² = 36.",
      as: "১২ = ২²×৩ আৰু ১৮ = ২×৩², গতিকে ল.সা.গু. = ২²×৩² = ৩৬।",
    },
  },
  "percentage": {
    q: { en: "The price of sugar rises by 25%. By what percentage should a family reduce its consumption so that the expenditure remains the same?", as: "চেনিৰ দাম ২৫% বৃদ্ধি হয়। খৰচ একে ৰাখিবলৈ এখন পৰিয়ালে ব্যৱহাৰ কিমান শতাংশ কমাব লাগিব?" },
    options: [
      { en: "20%", as: "২০%" },
      { en: "25%", as: "২৫%" },
      { en: "15%", as: "১৫%" },
      { en: "30%", as: "৩০%" },
    ],
    correct: 0,
    explanation: {
      en: "Reduction % = (25 / 125) × 100 = 20%.",
      as: "হ্ৰাস % = (২৫ / ১২৫) × ১০০ = ২০%।",
    },
  },
  "profit-loss": {
    q: { en: "An article bought for ₹200 is sold for ₹250. What is the profit percentage?", as: "২০০ টকাত কিনা এটা বস্তু ২৫০ টকাত বিক্ৰী কৰা হ'ল। লাভৰ শতাংশ কিমান?" },
    options: [
      { en: "25%", as: "২৫%" },
      { en: "20%", as: "২০%" },
      { en: "50%", as: "৫০%" },
      { en: "10%", as: "১০%" },
    ],
    correct: 0,
    explanation: {
      en: "Profit = 250 − 200 = ₹50; Profit % = (50 / 200) × 100 = 25%.",
      as: "লাভ = ২৫০ − ২০০ = ৫০ টকা; লাভ % = (৫০ / ২০০) × ১০০ = ২৫%।",
    },
  },
  "ratio-proportion": {
    q: { en: "If a : b = 2 : 3 and b : c = 4 : 5, then a : c is —", as: "যদি a : b = 2 : 3 আৰু b : c = 4 : 5 হয়, তেন্তে a : c হ'ব —" },
    options: [
      { en: "8 : 15", as: "৮ : ১৫" },
      { en: "2 : 5", as: "২ : ৫" },
      { en: "3 : 4", as: "৩ : ৪" },
      { en: "5 : 8", as: "৫ : ৮" },
    ],
    correct: 0,
    explanation: {
      en: "a : c = (2×4) : (3×5) = 8 : 15.",
      as: "a : c = (২×৪) : (৩×৫) = ৮ : ১৫।",
    },
  },
  "average": {
    q: { en: "What is the average of 5, 10, 15, 20 and 25?", as: "৫, ১০, ১৫, ২০ আৰু ২৫ ৰ গড় কিমান?" },
    options: [
      { en: "15", as: "১৫" },
      { en: "12", as: "১২" },
      { en: "18", as: "১৮" },
      { en: "20", as: "২০" },
    ],
    correct: 0,
    explanation: {
      en: "Sum = 75; average = 75 / 5 = 15.",
      as: "সমষ্টি = ৭৫; গড় = ৭৫ / ৫ = ১৫।",
    },
  },
  "simple-compound-interest": {
    q: { en: "Find the simple interest on ₹5,000 at 10% per annum for 2 years.", as: "৫,০০০ টকাৰ ওপৰত বছৰি ১০% হাৰত ২ বছৰৰ সৰল সুত নিৰ্ণয় কৰক।" },
    options: [
      { en: "₹1,000", as: "১,০০০ টকা" },
      { en: "₹500", as: "৫০০ টকা" },
      { en: "₹1,100", as: "১,১০০ টকা" },
      { en: "₹1,200", as: "১,২০০ টকা" },
    ],
    correct: 0,
    explanation: {
      en: "SI = (P × R × T) / 100 = (5000 × 10 × 2) / 100 = ₹1,000.",
      as: "সৰল সুত = (মূলধন × হাৰ × সময়) / ১০০ = (৫০০০ × ১০ × ২) / ১০০ = ১,০০০ টকা।",
    },
  },
  "time-work": {
    q: { en: "A can finish a work in 10 days and B in 15 days. Working together, in how many days will they finish it?", as: "A এ এটা কাম ১০ দিনত আৰু B এ ১৫ দিনত শেষ কৰিব পাৰে। একেলগে কাম কৰিলে কিমান দিনত শেষ কৰিব?" },
    options: [
      { en: "6 days", as: "৬ দিন" },
      { en: "5 days", as: "৫ দিন" },
      { en: "8 days", as: "৮ দিন" },
      { en: "12 days", as: "১২ দিন" },
    ],
    correct: 0,
    explanation: {
      en: "1/10 + 1/15 = 1/6, so they finish in 6 days.",
      as: "১/১০ + ১/১৫ = ১/৬, গতিকে তেওঁলোকে ৬ দিনত শেষ কৰিব।",
    },
  },
  "time-speed-distance": {
    q: { en: "A car covers 180 km in 3 hours. What is its speed?", as: "এখন গাড়ীয়ে ৩ ঘণ্টাত ১৮০ কিমি দূৰত্ব অতিক্ৰম কৰে। ইয়াৰ গতি কিমান?" },
    options: [
      { en: "60 km/h", as: "৬০ কিমি/ঘণ্টা" },
      { en: "50 km/h", as: "৫০ কিমি/ঘণ্টা" },
      { en: "90 km/h", as: "৯০ কিমি/ঘণ্টা" },
      { en: "45 km/h", as: "৪৫ কিমি/ঘণ্টা" },
    ],
    correct: 0,
    explanation: {
      en: "Speed = Distance / Time = 180 / 3 = 60 km/h.",
      as: "গতি = দূৰত্ব / সময় = ১৮০ / ৩ = ৬০ কিমি/ঘণ্টা।",
    },
  },
  "simplification-fractions": {
    q: { en: "Simplify: 1/2 + 1/3", as: "সৰল কৰক: ১/২ + ১/৩" },
    options: [
      { en: "5/6", as: "৫/৬" },
      { en: "2/5", as: "২/৫" },
      { en: "1/5", as: "১/৫" },
      { en: "2/6", as: "২/৬" },
    ],
    correct: 0,
    explanation: {
      en: "LCM of 2 and 3 is 6: 3/6 + 2/6 = 5/6.",
      as: "২ আৰু ৩ ৰ ল.সা.গু. ৬: ৩/৬ + ২/৬ = ৫/৬।",
    },
  },

  /* ===== General English ===== */
  "vocabulary": {
    q: { en: "Choose the word that is most similar in meaning to 'Abundant'.", as: "'Abundant' ৰ অৰ্থৰ সৈতে আটাইতকৈ মিল থকা শব্দটো বাছনি কৰক।" },
    options: [
      { en: "Plentiful", as: "প্ৰচুৰ" },
      { en: "Scarce", as: "দুৰ্লভ" },
      { en: "Tiny", as: "ক্ষুদ্ৰ" },
      { en: "Rare", as: "বিৰল" },
    ],
    correct: 0,
    explanation: {
      en: "'Abundant' means existing in large quantity; 'plentiful' is its synonym.",
      as: "'Abundant' ৰ অৰ্থ হৈছে প্ৰচুৰ পৰিমাণত থকা; 'plentiful' ইয়াৰ সমাৰ্থক শব্দ।",
    },
  },
  "fill-in-the-blanks": {
    q: { en: "Fill in the blank: She has been living here ___ 2010.", as: "ৰিক্ত স্থান পূৰণ কৰক: She has been living here ___ 2010." },
    options: [
      { en: "since", as: "since (যেতিয়াৰপৰা)" },
      { en: "for", as: "for (বাবে)" },
      { en: "from", as: "from (পৰা)" },
      { en: "by", as: "by (দ্বাৰা)" },
    ],
    correct: 0,
    explanation: {
      en: "'Since' is used with a point of time in the present perfect continuous tense.",
      as: "Present perfect continuous tense ত এটা নিৰ্দিষ্ট সময়ৰ বিন্দুৰ সৈতে 'since' ব্যৱহাৰ হয়।",
    },
  },
  "error-detection": {
    q: { en: "Find the error in the sentence: He do not like tea.", as: "বাক্যটোত থকা ভুলটো বিচাৰি উলিয়াওক: He do not like tea." },
    options: [
      { en: "do", as: "do" },
      { en: "not", as: "not" },
      { en: "like", as: "like" },
      { en: "tea", as: "tea" },
    ],
    correct: 0,
    explanation: {
      en: "'He' takes 'does', so the correct sentence is 'He does not like tea'.",
      as: "'He' ৰ সৈতে 'does' লাগে, গতিকে শুদ্ধ বাক্য হ'ল 'He does not like tea'।",
    },
  },
  "idioms-phrases": {
    q: { en: "The idiom 'to let the cat out of the bag' means —", as: "'to let the cat out of the bag' বাক্যৰীতিটোৰ অৰ্থ —" },
    options: [
      { en: "to reveal a secret", as: "গোপন কথা ফাদিল কৰা" },
      { en: "to free an animal", as: "এটা জন্তু মুকলি কৰা" },
      { en: "to cause trouble", as: "অসুবিধা সৃষ্টি কৰা" },
      { en: "to buy something", as: "কিবা এটা কিনা" },
    ],
    correct: 0,
    explanation: {
      en: "'To let the cat out of the bag' means to disclose a secret carelessly.",
      as: "'To let the cat out of the bag' ৰ অৰ্থ হৈছে অসাৱধানভাৱে গোপন কথা প্ৰকাশ কৰা।",
    },
  },
  "sentence-rearrangement": {
    q: { en: "Choose the correct arrangement: (1) is (2) my (3) this (4) book.", as: "শুদ্ধ সজ্জাটো বাছনি কৰক: (১) is (২) my (৩) this (৪) book।" },
    options: [
      { en: "3-2-1-4", as: "৩-২-১-৪" },
      { en: "1-2-3-4", as: "১-২-৩-৪" },
      { en: "3-1-2-4", as: "৩-১-২-৪" },
      { en: "2-3-1-4", as: "২-৩-১-৪" },
    ],
    correct: 0,
    explanation: {
      en: "The correct sentence is 'This is my book', i.e. 3-2-1-4.",
      as: "শুদ্ধ বাক্য হ'ল 'This is my book', অৰ্থাৎ ৩-২-১-৪।",
    },
  },
  "one-word-substitution": {
    q: { en: "One who loves books is called —", as: "কিতাপ ভাল পোৱা মানুহক কি বোলা হয় —" },
    options: [
      { en: "Bibliophile", as: "Bibliophile" },
      { en: "Bibliography", as: "Bibliography" },
      { en: "Philatelist", as: "Philatelist" },
      { en: "Numismatist", as: "Numismatist" },
    ],
    correct: 0,
    explanation: {
      en: "A book lover is called a bibliophile.",
      as: "কিতাপপ্ৰেমীক bibliophile বোলা হয়।",
    },
  },

  /* ===== Logical Reasoning & Mental Ability ===== */
  "number-alphabet-series": {
    q: { en: "Find the next number in the series: 2, 6, 12, 20, 30, ?", as: "শ্ৰেণীটোৰ পৰৱৰ্তী সংখ্যাটো নিৰ্ণয় কৰক: ২, ৬, ১২, ২০, ৩০, ?" },
    options: [
      { en: "42", as: "৪২" },
      { en: "40", as: "৪০" },
      { en: "44", as: "৪৪" },
      { en: "36", as: "৩৬" },
    ],
    correct: 0,
    explanation: {
      en: "Differences are 4, 6, 8, 10, 12; next term = 30 + 12 = 42.",
      as: "পাৰ্থক্যসমূহ ৪, ৬, ৮, ১০, ১২; পৰৱৰ্তী পদ = ৩০ + ১২ = ৪২।",
    },
  },
  "analogy": {
    q: { en: "Doctor : Hospital :: Teacher : ?", as: "Doctor : Hospital :: Teacher : ?" },
    options: [
      { en: "School", as: "বিদ্যালয়" },
      { en: "Student", as: "শিক্ষাৰ্থী" },
      { en: "Book", as: "কিতাপ" },
      { en: "Class", as: "শ্ৰেণী" },
    ],
    correct: 0,
    explanation: {
      en: "A doctor works in a hospital; a teacher works in a school.",
      as: "ডাক্তৰে চিকিৎসালয়ত কাম কৰে; শিক্ষকে বিদ্যালয়ত কাম কৰে।",
    },
  },
  "odd-one-out": {
    q: { en: "Choose the odd one out: 3, 5, 7, 9", as: "অসদৃশটো বাছনি কৰক: ৩, ৫, ৭, ৯" },
    options: [
      { en: "9", as: "৯" },
      { en: "3", as: "৩" },
      { en: "5", as: "৫" },
      { en: "7", as: "৭" },
    ],
    correct: 0,
    explanation: {
      en: "3, 5 and 7 are prime numbers, but 9 is not a prime number.",
      as: "৩, ৫ আৰু ৭ মৌলিক সংখ্যা, কিন্তু ৯ মৌলিক সংখ্যা নহয়।",
    },
  },
  "blood-relations": {
    q: { en: "Pointing to a man, Rina said, 'He is the son of my mother's only son.' How is the man related to Rina?", as: "এজন মানুহলৈ আঙুলিয়াই ৰিনাই ক'লে, 'তেওঁ মোৰ মাকৰ একমাত্ৰ পুত্ৰৰ পুত্ৰ।' মানুহজন ৰিনাৰ কি সম্পৰ্কীয়?" },
    options: [
      { en: "Nephew", as: "ভতিজা" },
      { en: "Son", as: "পুত্ৰ" },
      { en: "Brother", as: "ভাই" },
      { en: "Uncle", as: "খুড়া" },
    ],
    correct: 0,
    explanation: {
      en: "Rina's mother's only son is Rina's brother; his son is her nephew.",
      as: "ৰিনাৰ মাকৰ একমাত্ৰ পুত্ৰ ৰিনাৰ ভাই; তেওঁৰ পুত্ৰ ৰিনাৰ ভতিজা।",
    },
  },
  "direction-distance": {
    q: { en: "A man walks 5 km north and then 3 km east. How far is he from his starting point?", as: "এজন মানুহে ৫ কিমি উত্তৰ দিশে আৰু তাৰ পিছত ৩ কিমি পূব দিশে খোজ কাঢ়ে। তেওঁ আৰম্ভণি স্থানৰ পৰা কিমান দূৰত?" },
    options: [
      { en: "√34 km", as: "√৩৪ কিমি" },
      { en: "8 km", as: "৮ কিমি" },
      { en: "2 km", as: "২ কিমি" },
      { en: "15 km", as: "১৫ কিমি" },
    ],
    correct: 0,
    explanation: {
      en: "By Pythagoras theorem, distance = √(5² + 3²) = √34 km.",
      as: "পাইথাগোৰাছ উপপাদ্য অনুসৰি, দূৰত্ব = √(৫² + ৩²) = √৩৪ কিমি।",
    },
  },
  "coding-decoding": {
    q: { en: "If CAT is coded as 3-1-20, then DOG is coded as —", as: "যদি CAT ক 3-1-20 হিচাপে ক'ড কৰা হয়, তেন্তে DOG ক ক'ড কৰা হ'ব —" },
    options: [
      { en: "4-15-7", as: "৪-১৫-৭" },
      { en: "4-14-7", as: "৪-১৪-৭" },
      { en: "3-15-7", as: "৩-১৫-৭" },
      { en: "4-15-6", as: "৪-১৫-৬" },
    ],
    correct: 0,
    explanation: {
      en: "Each letter is replaced by its alphabet position: D=4, O=15, G=7.",
      as: "প্ৰতিটো আখৰক ইয়াৰ বৰ্ণমালা স্থানৰে সলনি কৰা হয়: D=৪, O=১৫, G=৭।",
    },
  },
  "venn-diagrams": {
    q: { en: "In a class of 40 students, 25 play football, 20 play cricket and 10 play both. How many play neither game?", as: "৪০ জন ছাত্ৰৰ এটা শ্ৰেণীত ২৫ জনে ফুটবল, ২০ জনে ক্ৰিকেট আৰু ১০ জনে দুয়োটা খেলে। কিমানজনে কোনো খেল নেখেলে?" },
    options: [
      { en: "5", as: "৫" },
      { en: "10", as: "১০" },
      { en: "15", as: "১৫" },
      { en: "0", as: "০" },
    ],
    correct: 0,
    explanation: {
      en: "n(F ∪ C) = 25 + 20 − 10 = 35; neither = 40 − 35 = 5.",
      as: "n(F ∪ C) = ২৫ + ২০ − ১০ = ৩৫; কোনো নেখেলে = ৪০ − ৩৫ = ৫।",
    },
  },
  "non-verbal-reasoning": {
    q: { en: "In a plane mirror, a clock showing 3:00 appears to show —", as: "সমতল দাপোণত, ৩:০০ বজা দেখুওৱা ঘড়ীটোৱে দেখুওৱা যেন লাগে —" },
    options: [
      { en: "9:00", as: "৯:০০" },
      { en: "3:00", as: "৩:০০" },
      { en: "6:00", as: "৬:০০" },
      { en: "12:00", as: "১২:০০" },
    ],
    correct: 0,
    explanation: {
      en: "A mirror reverses left and right, so 3:00 appears as 9:00.",
      as: "দাপোণে বাওঁ আৰু সোঁ ওলোটা কৰে, গতিকে ৩:০০ ক ৯:০০ যেন লাগে।",
    },
  },

  /* ===== Assam's History, Geography & Culture ===== */
  "assam-history": {
    q: { en: "Who was the first Ahom king of Assam?", as: "অসমৰ প্ৰথম আহোম ৰজা কোন আছিল?" },
    options: [
      { en: "Sukapha", as: "চুকাফা" },
      { en: "Suteuphaa", as: "চুতেউফা" },
      { en: "Gadadhar Singha", as: "গদাধৰ সিংহ" },
      { en: "Rudra Singha", as: "ৰুদ্ৰ সিংহ" },
    ],
    correct: 0,
    explanation: {
      en: "Sukapha founded the Ahom kingdom in Assam in 1228.",
      as: "চুকাফাই ১২২৮ চনত অসমত আহোম ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।",
    },
  },
  "assam-geography": {
    q: { en: "Which is the longest river of Assam?", as: "অসমৰ আটাইতকৈ দীঘল নদী কোনখন?" },
    options: [
      { en: "Brahmaputra", as: "ব্ৰহ্মপুত্ৰ" },
      { en: "Barak", as: "বৰাক" },
      { en: "Subansiri", as: "সুবনশিৰি" },
      { en: "Dhansiri", as: "ধনশিৰি" },
    ],
    correct: 0,
    explanation: {
      en: "The Brahmaputra is the longest river of Assam.",
      as: "ব্ৰহ্মপুত্ৰ অসমৰ আটাইতকৈ দীঘল নদী।",
    },
  },
  "assam-culture": {
    q: { en: "Bihu is the main festival of which people?", as: "বিহু কোনসকলৰ প্ৰধান উৎসৱ?" },
    options: [
      { en: "Assamese people", as: "অসমীয়া লোক" },
      { en: "Only tea tribes", as: "কেৱল চাহ জনজাতি" },
      { en: "Only Bodos", as: "কেৱল বড়ো" },
      { en: "Only Rabhas", as: "কেৱল ৰাভা" },
    ],
    correct: 0,
    explanation: {
      en: "Bihu is the principal festival of the Assamese people.",
      as: "বিহু অসমীয়া লোকসকলৰ প্ৰধান উৎসৱ।",
    },
  },

  /* ===== General Knowledge & Current Affairs ===== */
  "indian-history-polity-economy": {
    q: { en: "The Constitution of India came into force on —", as: "ভাৰতৰ সংবিধান কেতিয়া বলৱৎ হৈছিল —" },
    options: [
      { en: "26 January 1950", as: "২৬ জানুৱাৰী ১৯৫০" },
      { en: "15 August 1947", as: "১৫ আগষ্ট ১৯৪৭" },
      { en: "26 November 1949", as: "২৬ নৱেম্বৰ ১৯৪৯" },
      { en: "2 October 1950", as: "২ অক্টোবৰ ১৯৫০" },
    ],
    correct: 0,
    explanation: {
      en: "It came into force on 26 January 1950, celebrated as Republic Day.",
      as: "ই ১৯৫০ চনৰ ২৬ জানুৱাৰীত বলৱৎ হৈছিল, যাক গণৰাজ্য দিৱস হিচাপে পালন কৰা হয়।",
    },
  },
  "general-science": {
    q: { en: "What is the chemical formula of water?", as: "পানীৰ ৰাসায়নিক সংকেত কি?" },
    options: [
      { en: "H₂O", as: "H₂O" },
      { en: "CO₂", as: "CO₂" },
      { en: "O₂", as: "O₂" },
      { en: "NaCl", as: "NaCl" },
    ],
    correct: 0,
    explanation: {
      en: "A water molecule has two hydrogen atoms and one oxygen atom.",
      as: "এটা পানীৰ অণুত দুটা হাইড্ৰজেন আৰু এটা অক্সিজেন পৰমাণু থাকে।",
    },
  },
  "current-affairs": {
    q: { en: "Which Indian city hosted the G20 Summit in 2023?", as: "২০২৩ চনত G20 শীৰ্ষ সন্মিলন কোনখন ভাৰতীয় চহৰত অনুষ্ঠিত হৈছিল?" },
    options: [
      { en: "New Delhi", as: "নতুন দিল্লী" },
      { en: "Mumbai", as: "মুম্বাই" },
      { en: "Bengaluru", as: "বেংগালুৰু" },
      { en: "Chennai", as: "চেন্নাই" },
    ],
    correct: 0,
    explanation: {
      en: "The 2023 G20 Summit was held in New Delhi.",
      as: "২০২৩ চনৰ G20 শীৰ্ষ সন্মিলন নতুন দিল্লীত অনুষ্ঠিত হৈছিল।",
    },
  },
  "sports-awards": {
    q: { en: "What is the highest sporting honour of India?", as: "ভাৰতৰ সৰ্বোচ্চ ক্ৰীড়া সন্মান কি?" },
    options: [
      { en: "Major Dhyan Chand Khel Ratna Award", as: "মেজৰ ধ্যানচান্দ খেলৰত্ন বঁটা" },
      { en: "Arjuna Award", as: "অৰ্জুন বঁটা" },
      { en: "Dronacharya Award", as: "দ্ৰোণাচাৰ্য বঁটা" },
      { en: "Padma Shri", as: "পদ্মশ্ৰী" },
    ],
    correct: 0,
    explanation: {
      en: "The Khel Ratna is India's highest sporting honour.",
      as: "খেলৰত্ন ভাৰতৰ সৰ্বোচ্চ ক্ৰীড়া সন্মান।",
    },
  },
  "important-days-capitals-currencies": {
    q: { en: "What is the currency of Japan?", as: "জাপানৰ মুদ্ৰা কি?" },
    options: [
      { en: "Yen", as: "য়েন" },
      { en: "Yuan", as: "ইউয়ান" },
      { en: "Won", as: "ৱন" },
      { en: "Dollar", as: "ডলাৰ" },
    ],
    correct: 0,
    explanation: {
      en: "The Japanese currency is the yen (¥).",
      as: "জাপানৰ মুদ্ৰা হৈছে য়েন (¥)।",
    },
  },
};

/* ---- Small helpers ---- */
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  return rel;
}

/* ---- Static SEO shell page (same shell as the subject page) ---- */
function buildShellPage({ subEn, subAs, secEn, secAs, examEn, secHref, subHref, descEn, descAs }) {
  const canonical = BASE + subHref + "/";
  const title = `${subEn} — ${secEn} — ${examEn} | axomexam`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical + "#webpage",
    url: canonical,
    name: title,
    inLanguage: ["en", "as"],
    isPartOf: { "@type": "WebSite", "@id": BASE + "/#website", url: BASE + "/", name: "axomexam" },
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${esc(descEn)}" />
  <meta name="description" lang="as" content="${esc(descAs)}" />
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content="${esc(subEn.toLowerCase())}, assam police, slprb, assam police constable, assam police ab ub, assam exams" />

  <meta name="theme-color" content="#2563eb" />
  <title>${esc(title)}</title>

  <!-- Canonical URL (unique per page) -->
  <link rel="canonical" href="${canonical}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="axomexam" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(descEn)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="axomexam - ${esc(subEn)}" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:locale:alternate" content="as_IN" />

  <meta name="twitter:image" content="${BASE}/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(descEn)}" />

  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Fixed Absolute CSS Path -->
  <link rel="stylesheet" href="/css/style.css?v=20260917a" />

  <!-- GitHub Pages / Netlify Clean URL Single Page App Redirection Handler -->
  <script>
    (function() {
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>

  <!-- Google AdSense Script -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4574824794620382" crossorigin="anonymous"></script>

  <!-- KaTeX Math & Formula Rendering Engine -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

  <!-- Robust Zero-Blank-Page PDF Rendering Engines -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <script>
    (function () {
      try {
        var t = localStorage.getItem("axomexam-theme");
        if (t === "dark" || (!t && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      } catch (e) { }
    })();
  </script>
  <script type="application/ld+json">${jsonld}</script>
</head>
<body>

  <!-- ===== Preloader ===== -->
  <div id="preloader" aria-hidden="true">
    <div class="loader-logo">axomexam</div>
    <div class="loader-bar"><span></span></div>
  </div>

  <!-- ===== Header ===== -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand" aria-label="axomexam home">
        <span class="brand-mark">A</span>
        <span class="brand-text">axomexam.in</span>
      </a>

      <div class="header-center">
        <div class="search-wrap" role="search">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="master-search" type="search" autocomplete="off" spellcheck="false"
                 placeholder="Search questions, topics, keywords..." aria-label="Search" />
          <div id="search-results" class="search-results" hidden></div>
        </div>

        <button class="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>
        </button>
      </div>

      <button id="hamburger" class="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <nav class="main-nav" aria-label="Primary navigation">
      <div class="container nav-inner">
        <ul class="nav-list" id="nav-list"></ul>
      </div>
    </nav>

    <nav class="tabbar" id="tabbar" aria-label="App navigation">
      <a href="/" class="tab-item" data-tab="home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
        <span data-i18n="tab.home">Home</span>
      </a>
      <a href="/mock-test" class="tab-item" data-tab="mock">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>
        <span data-i18n="tab.mock">Mock Test</span>
      </a>
      <a href="/categories" class="tab-item" data-tab="categories">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
        <span data-i18n="tab.categories">Practice</span>
      </a>
      <a href="/search" class="tab-item" id="tab-search" data-tab="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <span data-i18n="tab.search">Search</span>
      </a>
      <button class="tab-item" id="tab-menu" data-tab="menu" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        <span data-i18n="tab.menu">Menu</span>
      </button>
    </nav>
  </header>

  <!-- ===== Mobile Menu ===== -->
  <div id="mobile-menu" class="mobile-menu" hidden>
    <div class="mobile-menu-head">
      <span class="brand-mark">A</span>
      <span class="brand-text">axomexam</span>
      <button class="theme-toggle m-theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>
      </button>
      <button id="mobile-close" class="m-close" type="button" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <ul class="mobile-nav" id="mobile-nav"></ul>
  </div>
  <div id="mobile-backdrop" class="mobile-backdrop" hidden></div>

  <!-- ===== Main Content Area ===== -->
  <main id="app" class="container main">
    <div class="page-head">
      <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/exams">Your Exams</a><span class="bc-sep">/</span><a href="/exams/${esc("assam-police")}">${esc(examEn)}</a><span class="bc-sep">/</span><a href="${secHref}">${esc(secEn)}</a><span class="bc-sep">/</span><span>${esc(subEn)}</span></nav>
      <h1>${esc(subEn)}</h1>
      <p class="page-desc">${esc(subAs)} &bull; ${esc(secEn)} &bull; ${esc(examEn)}</p>
      <p class="exams-choose">Online reading only</p>
    </div>
    <section class="section" style="padding-bottom:46px;">
      <p class="ebooks-note">This exam book section is read online only and cannot be downloaded as a PDF.</p>
      <div style="margin-top:18px;"><a class="btn btn-outline btn-sm" href="${secHref}">Back to ${esc(secEn)}</a></div>
    </section>
    <noscript>
      <p>Read ${esc(subEn)} online (no download): <a href="${subHref}">${subHref}</a></p>
    </noscript>
  </main>

  <!-- ===== Footer ===== -->
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">A</span>
        <span class="brand-text">axomexam</span>
        <p id="footer-tagline" class="footer-tagline">Comprehensive Preparation Portal for Assam Competitive Examinations</p>
      </div>
      <div class="footer-links">
        <div>
          <h4 data-i18n="footer.exam">Exams</h4>
          <ul>
            <li><a href="/previous-year/ssc/">SSC</a></li>
            <li><a href="/previous-year/railway/">Railway</a></li>
            <li><a href="/previous-year/assam-police/">Assam Police</a></li>
            <li><a href="/previous-year/guwahati-hc/">Guwahati High Court</a></li>
            <li><a href="/previous-year/dhs-dme/">DHS / DME</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer.quick">Quick Links</h4>
          <ul>
            <li><a href="/" data-i18n="footer.home">Home</a></li>
            <li><a href="/category/articles" data-i18n="nav.articles">Articles</a></li>
            <li><a href="/mock-test" data-i18n="nav.mock">Mock Test</a></li>
            <li><a href="/previous-year">Previous Papers</a></li>
            <li><a href="/ebooks" data-i18n="nav.ebooks">E-Books</a></li>
            <li><a href="/exams" data-i18n="nav.exams">Your Exams</a></li>
            <li><a href="/downloads" data-i18n="nav.downloads">Downloads</a></li>
            <li><a href="/download-app" data-i18n="nav.downloadApp">Download App</a></li>
            <li><a href="/submit" data-i18n="nav.submit">Submit Q&amp;A</a></li>
            <li><a href="/trending" data-i18n="footer.trending">Trending Topics</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer.legal">Legal &amp; Info</h4>
          <ul>
            <li><a href="/about" data-i18n="footer.about">About Us</a></li>
            <li><a href="/contact" data-i18n="footer.contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms &amp; Conditions</a></li>
            <li><a href="/disclaimer">Disclaimer</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom container">
      <p id="footer-copy">&copy; 2026 axomexam.in. All rights reserved.</p>
    </div>
  </footer>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <!-- Fixed Absolute JS Paths -->
  <script src="/js/config.js?v=20260917a"></script>
  <script src="/js/i18n.js?v=20260917a"></script>
  <script src="/js/api.js?v=20260917a"></script>
  <script src="/js/app.js?v=20260917a"></script>
</body>
</html>
`;
}

function main() {
  const index = JSON.parse(fs.readFileSync(EXAMS_INDEX, "utf8"));
  const exam = (index.exams || []).find((e) => e.id === "assam-police");
  if (!exam) throw new Error("assam-police exam not found in index.json");

  const examEn = (exam.title && exam.title.en) || "Assam Police";
  const created = [];
  const missing = [];
  const newUrls = [];

  (exam.sections || []).forEach((sec) => {
    const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
    if (!subs.length) return;
    const secEn = sec.title.en;
    const secAs = sec.title.as || secEn;
    const secHref = `/exams/assam-police/${sec.id}`;

    subs.forEach((sub) => {
      const subEn = sub.title.en;
      const subAs = sub.title.as || subEn;
      const subHref = `${secHref}/${sub.id}`;
      const baseDir = `data/exams/assam-police/${sec.id}/${sub.id}`;

      const sample = QUESTIONS[sub.id];
      if (!sample) {
        missing.push(sub.id);
      } else {
        const record = {
          id: `${sub.id}-001`,
          q: sample.q,
          options: sample.options,
          correct: sample.correct,
          explanation: sample.explanation,
        };
        write(`${baseDir}/${SAMPLE_FILE}`, JSON.stringify(record, null, 2) + "\n");
      }

      const files = sample ? [SAMPLE_FILE] : [];
      write(`${baseDir}/index.json`, JSON.stringify({ subcategory: sub.id, files }, null, 2) + "\n");

      const descEn = `Practise ${subEn} MCQs with answers and explanations for Assam Police Constable (AB & UB) — ${secEn}.`;
      const descAs = `${subAs} ৰ প্ৰশ্ন-উত্তৰ অনুশীলন — ${secAs}, অসম আৰক্ষী কনিষ্টবল (AB & UB)।`;

      write(`exams/assam-police/${sec.id}/${sub.id}/index.html`, buildShellPage({
        subEn, subAs, secEn, secAs, examEn, secHref, subHref, descEn, descAs,
      }));

      created.push(sub.id);
      newUrls.push(subHref + "/");
    });

    linkSubcategoriesOnSectionPage(sec.id, secEn, subs);
  });

  updateSitemap(newUrls);

  console.log(`Sub-categories scaffolded: ${created.length}`);
  if (missing.length) console.log(`Missing sample question for: ${missing.join(", ")}`);
}

function linkSubcategoriesOnSectionPage(secId, secEn, subs) {
  const rel = `exams/assam-police/${secId}/index.html`;
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  let html = fs.readFileSync(abs, "utf8");
  if (html.indexOf("data-exam-subcats") !== -1) return;

  const links = subs.map((s) => {
    const subEn = esc(s.title.en);
    const subAs = esc(s.title.as || s.title.en);
    const href = `/exams/assam-police/${secId}/${s.id}`;
    return `<a class="sub-card reveal" data-exam-subcats href="${href}" style="display:block; margin:10px 0; padding:14px 16px; border:1px solid var(--border,#e2e8f0); border-radius:14px; text-decoration:none;"><b style="color:var(--ink,#0f172a);">${subEn}</b><span style="display:block; color:var(--ink-muted,#64748b); font-size:0.86rem;">${subAs}</span></a>`;
  }).join("\n        ");

  const block = `\n      <section class="section" data-exam-subcats style="padding-bottom:40px;">\n        <h2 style="margin:0 0 6px;">Sub-categories</h2>\n        <div class="sub-grid">\n        ${links}\n        </div>\n      </section>\n    `;

  if (html.indexOf("<noscript>") !== -1) {
    html = html.replace("<noscript>", block + "<noscript>");
  } else {
    html = html.replace("</main>", block + "</main>");
  }
  fs.writeFileSync(abs, html, "utf8");
}

function updateSitemap(urls) {
  if (!fs.existsSync(SITEMAP)) return;
  let xml = fs.readFileSync(SITEMAP, "utf8");
  const lastmod = new Date().toISOString().slice(0, 10);
  const add = [];
  urls.forEach((u) => {
    if (xml.indexOf(`<loc>${BASE}${u}</loc>`) !== -1) return;
    add.push(`  <url>\n    <loc>${BASE}${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  });
  if (!add.length) return;
  xml = xml.replace("</urlset>", add.join("\n") + "\n</urlset>");
  fs.writeFileSync(SITEMAP, xml, "utf8");
}

main();
