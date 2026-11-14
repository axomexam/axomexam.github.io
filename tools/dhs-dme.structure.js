#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/dhs-dme.structure.js

   Source of truth for the three DHS & DME exam books that
   tools/build-dhs-dme.js writes into the repository:

     dhs-dme            Non-Technical Grade III  (100 Q)
     dhs-dme-technical  Technical Grade III      (100 Q)
     dhs-dme-grade-4    Grade IV                  (50 Q)

   Each book mirrors the shape of data/exams/index.json (exam →
   section → sub-category) so the SPA renders it with no runtime
   change, and it mirrors the folder layout of data/exams/adre-grade-4
   so every maintenance tool keeps working.

   Each sub-category carries a `source` pointing at a shared subject
   bank under data/mock-test/, which the builder reads to fill the
   topic's question file. All three books share the DHS & DME cover
   and logo.
   ============================================================ */

const COVER = "/images/exams/dhs-dme-cover.webp";
const LOGO = "/images/exams/dhs-dme-logo.webp";
const COVER_ALT = {
  en: "A Handbook of Recruitment Examination (DME, DHS, AYUSH & NHM) — book front cover",
  as: "নিযুক্তি পৰীক্ষাৰ হাতপুথি (DME, DHS, AYUSH আৰু NHM) — কিতাপৰ বেটুপাত",
};
const LOGO_ALT = { en: "DHS & DME official logo", as: "DHS আৰু DME চৰকাৰী ল'গ'" };

const SYLLABUS_SEC = {
  id: "syllabus",
  type: "syllabus",
  color: "#6366f1",
  title: { en: "Syllabus", as: "পাঠ্যক্ৰম" },
};

/* ---------------- 1. Non-Technical Grade III ---------------- */

const NON_TECH = {
  id: "dhs-dme",
  title: { en: "DHS & DME Non-Technical Grade III", as: "DHS আৰু DME অসামৰিক গ্ৰেড III" },
  subtitle: {
    en: "Directorate of Health Services & Directorate of Medical Education — Grade III (Non-Technical)",
    as: "স্বাস্থ্য সেৱা সঞ্চালকালয় আৰু চিকিৎসা শিক্ষা সঞ্চালকালয় — গ্ৰেড III (অসামৰিক)",
  },
  note: {
    en: "Choose a subject, then a sub-category to practise question-wise MCQs.",
    as: "এখন বিষয় বাছনি কৰক, তাৰ পিছত উপ-শ্ৰেণী এটা বাছি প্ৰশ্নভিত্তিক MCQ অনুশীলন কৰক।",
  },
  cover: COVER,
  coverAlt: COVER_ALT,
  logo: LOGO,
  logoAlt: LOGO_ALT,
  color: "#10b981",
  icon: "DHS",
  status: "available",
  sections: [
    SYLLABUS_SEC,
    {
      id: "general-knowledge",
      type: "qa",
      color: "#0ea5e9",
      title: { en: "General Knowledge (Assam & India)", as: "সাধাৰণ জ্ঞান (অসম আৰু ভাৰত)" },
      subcategories: [
        { id: "assam-history", source: "gk/assam-history", title: { en: "Assam History", as: "অসমৰ ইতিহাস" } },
        { id: "geography", source: "gk/geography", title: { en: "Geography", as: "ভূগোল" } },
        { id: "art-culture", source: "gk/art-culture", title: { en: "Assam Art & Culture", as: "অসমৰ কলা-সংস্কৃতি" } },
        { id: "assam-literature", source: "gk/assam-literature", title: { en: "Assamese Literature", as: "অসমীয়া সাহিত্য" } },
        { id: "indian-history", source: "gk/indian-history", title: { en: "Indian History", as: "ভাৰতৰ ইতিহাস" } },
        { id: "polity", source: "gk/polity", title: { en: "Indian Polity & Constitution", as: "ভাৰতৰ ৰাজনীতি আৰু সংবিধান" } },
        { id: "economics", source: "gk/economics", title: { en: "Indian & Assam Economy", as: "ভাৰত আৰু অসমৰ অৰ্থনীতি" } },
      ],
    },
    {
      id: "elementary-mathematics",
      type: "qa",
      color: "#f59e0b",
      title: { en: "Elementary Mathematics", as: "প্ৰাথমিক গণিত" },
      subcategories: [
        { id: "arithmetic", source: "math/arithmetic", title: { en: "Arithmetic", as: "পাটিগণিত" } },
        { id: "advanced-math", source: "math/advanced-math", title: { en: "Advanced Mathematics", as: "উচ্চ গণিত" } },
        { id: "statistics-and-data-interpretation", source: "math/statistics-and-data-interpretation", title: { en: "Statistics & Data Interpretation", as: "পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ" } },
      ],
    },
    {
      id: "logical-reasoning",
      type: "qa",
      color: "#8b5cf6",
      title: { en: "Reasoning & Mental Ability", as: "তৰ্কশক্তি আৰু মানসিক দক্ষতা" },
      subcategories: [
        { id: "verbal-reasoning", source: "reasoning/verbal-reasoning", title: { en: "Verbal Reasoning", as: "ভাষিক যুক্তিতৰ্ক" } },
        { id: "non-verbal-reasoning", source: "reasoning/non-verbal-reasoning", title: { en: "Non-Verbal Reasoning", as: "চিত্ৰভিত্তিক যুক্তিতৰ্ক" } },
        { id: "analytical-critical-reasoning", source: "reasoning/analytical-critical-reasoning", title: { en: "Analytical & Critical Reasoning", as: "বিশ্লেষণাত্মক যুক্তিতৰ্ক" } },
      ],
    },
    {
      id: "general-english",
      type: "qa",
      color: "#0d9488",
      title: { en: "General English", as: "সাধাৰণ ইংৰাজী" },
      subcategories: [
        { id: "grammar", source: "english/grammar", title: { en: "Grammar", as: "ব্যাকৰণ" } },
        { id: "vocabulary", source: "english/vocabulary", title: { en: "Vocabulary", as: "শব্দভাণ্ডাৰ" } },
      ],
    },
    {
      id: "computer-knowledge",
      type: "qa",
      color: "#2563eb",
      title: { en: "Computer Knowledge", as: "কম্পিউটাৰ জ্ঞান" },
      subcategories: [
        { id: "computer-fundamentals", source: "computer/comp-fundamentals", title: { en: "Computer Fundamentals", as: "কম্পিউটাৰৰ মৌলিক জ্ঞান" } },
        { id: "ms-office", source: "computer/ms-office", title: { en: "MS Office", as: "এম এছ অফিচ" } },
      ],
    },
  ],
  syllabus: {
    title: { en: "DHS & DME Non-Technical Grade III Syllabus", as: "DHS আৰু DME অসামৰিক গ্ৰেড III পাঠ্যক্ৰম" },
    description: {
      en: "Complete subject-wise syllabus and exam pattern for the DHS (Directorate of Health Services) and DME (Directorate of Medical Education) Grade III Non-Technical recruitment examination.",
      as: "DHS (স্বাস্থ্য সেৱা সঞ্চালকালয়) আৰু DME (চিকিৎসা শিক্ষা সঞ্চালকালয়) গ্ৰেড III অসামৰিক নিযুক্তি পৰীক্ষাৰ বাবে বিষয়-ভিত্তিক সম্পূৰ্ণ পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ।",
    },
    chapters: [
      {
        title: { en: "Exam Pattern", as: "পৰীক্ষাৰ ধৰণ" },
        content: {
          en: "The DHS and DME Grade III Non-Technical written examination is an objective test of multiple-choice questions. The paper carries 100 questions of one mark each, for a total of 100 marks, and the time allowed is 2 hours (120 minutes). There is no negative marking, so a candidate should attempt every question.\n\nThe paper is set in the subjects below:\n- General Knowledge (Assam and India) — 30 to 35 questions\n- Elementary Mathematics — 20 to 25 questions\n- Reasoning and Mental Ability — 15 to 20 questions\n- General English — 15 to 20 questions\n- Computer Knowledge — 10 to 15 questions\n\nThe question paper is bilingual: every question and every option is printed in English and in Assamese. For posts such as LDA and Computer Assistant, a computer typing or skill test is held after the written examination.",
          as: "DHS আৰু DME গ্ৰেড III অসামৰিক লিখিত পৰীক্ষাখন বহুবিকল্পভিত্তিক প্ৰশ্নৰ এক উদ্দেশ্যমূলক পৰীক্ষা। প্ৰশ্নকাকতত ১০০ টা প্ৰশ্ন থাকে, প্ৰতিটোৰে ১ নম্বৰ, মুঠ ১০০ নম্বৰ, আৰু সময় ২ ঘণ্টা (১২০ মিনিট)। ঋণাত্মক মাৰ্কিং নাই, গতিকে প্ৰাৰ্থীয়ে প্ৰতিটো প্ৰশ্নৰ উত্তৰ দিয়া উচিত।\n\nপ্ৰশ্নকাকত তলত দিয়া বিষয়সমূহত প্ৰস্তুত কৰা হয়:\n- সাধাৰণ জ্ঞান (অসম আৰু ভাৰত) — ৩০ ৰ পৰা ৩৫ টা প্ৰশ্ন\n- প্ৰাথমিক গণিত — ২০ ৰ পৰা ২৫ টা প্ৰশ্ন\n- তৰ্কশক্তি আৰু মানসিক দক্ষতা — ১৫ ৰ পৰা ২০ টা প্ৰশ্ন\n- সাধাৰণ ইংৰাজী — ১৫ ৰ পৰা ২০ টা প্ৰশ্ন\n- কম্পিউটাৰ জ্ঞান — ১০ ৰ পৰা ১৫ টা প্ৰশ্ন\n\nপ্ৰশ্নকাকত দ্বিভাষিক: প্ৰতিটো প্ৰশ্ন আৰু প্ৰতিটো বিকল্প ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত দিয়া হয়। LDA আৰু কম্পিউটাৰ সহায়কৰ দৰে পদৰ বাবে লিখিত পৰীক্ষাৰ পাছত কম্পিউটাৰ টাইপিং বা দক্ষতা পৰীক্ষা অনুষ্ঠিত কৰা হয়।",
        },
      },
      {
        title: { en: "General Knowledge (Assam & India)", as: "সাধাৰণ জ্ঞান (অসম আৰু ভাৰত)" },
        content: {
          en: "This section carries the largest weight. It covers the history, geography, art, culture and literature of Assam, together with Indian history, polity, geography and economy, and current affairs of national and state importance.",
          as: "এই শিতানত আটাইতকৈ বেছি ভাৰ থাকে। ইয়াত অসমৰ ইতিহাস, ভূগোল, কলা-সংস্কৃতি আৰু সাহিত্যৰ লগতে ভাৰতৰ ইতিহাস, ৰাজনীতি, ভূগোল আৰু অৰ্থনীতি, আৰু ৰাষ্ট্ৰীয় তথা ৰাজ্যপ্ৰধান গুৰুত্বৰ সাম্প্ৰতিক ঘটনাৱলী সন্নিৱিষ্ট।",
        },
      },
      {
        title: { en: "Elementary Mathematics", as: "প্ৰাথমিক গণিত" },
        content: {
          en: "Arithmetic, advanced mathematics and statistics at a Class X (HSLC) standard. The questions test percentage, ratio, average, profit and loss, interest, time-speed-distance, time and work, mensuration, algebra and simple data interpretation.",
          as: "দশম শ্ৰেণীৰ (HSLC) মানৰ পাটিগণিত, উচ্চ গণিত আৰু পৰিসংখ্যা। প্ৰশ্নত শতাংশ, অনুপাত, গড়, লাভ-লোকচান, সুত, সময়-দূৰত্ব, সময় আৰু কাৰ্য, ক্ষেত্ৰমিতি, বীজগণিত আৰু সৰল তথ্য বিশ্লেষণ পৰীক্ষা কৰা হয়।",
        },
      },
      {
        title: { en: "Reasoning & Mental Ability", as: "তৰ্কশক্তি আৰু মানসিক দক্ষতা" },
        content: {
          en: "Verbal reasoning, non-verbal reasoning and analytical and critical reasoning — series, coding-decoding, blood relations, direction sense, analogy, classification, figures, statements and conclusions.",
          as: "ভাষিক যুক্তিতৰ্ক, চিত্ৰভিত্তিক যুক্তিতৰ্ক আৰু বিশ্লেষণাত্মক যুক্তিতৰ্ক — শ্ৰেণী, সংকেত-আবোৰণ, ৰক্তসম্পৰ্ক, দিশ-জ্ঞান, সাদৃশ্য, শ্ৰেণীবিভাজন, চিত্ৰ, উক্তি আৰু সিদ্ধান্ত।",
        },
      },
      {
        title: { en: "General English", as: "সাধাৰণ ইংৰাজী" },
        content: {
          en: "Grammar and vocabulary — parts of speech, articles, prepositions, tenses, subject-verb agreement, voice, narration, synonyms and antonyms, one-word substitution, idioms and phrases, and spelling.",
          as: "ব্যাকৰণ আৰু শব্দভাণ্ডাৰ — পদ প্ৰকাৰণ, আৰ্টিকল, সম্বন্ধবাচক, কাল, কৰ্তা-ক্ৰিয়াৰ সংগতি, বাচ্য, প্ৰত্যক্ষ-পৰোক্ষ উক্তি, সমাৰ্থক আৰু বিপৰীত শব্দ, এশব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বানান।",
        },
      },
      {
        title: { en: "Computer Knowledge", as: "কম্পিউটাৰ জ্ঞান" },
        content: {
          en: "Computer fundamentals, hardware and software, operating systems, the MS Office suite (Word, Excel, PowerPoint), networking and the internet, and cyber security.",
          as: "কম্পিউটাৰৰ মৌলিক জ্ঞান, হাৰ্ডৱেৰ আৰু ছফ্টৱেৰ, অপাৰেটিং ছিষ্টেম, এম এছ অফিচ (ৱৰ্ড, এক্সেল, পাৱাৰপইণ্ট), নেটৱৰ্কিং আৰু ইণ্টাৰনেট, আৰু চাইবাৰ সুৰক্ষা।",
        },
      },
    ],
  },
};

/* ---------------- 2. Technical Grade III ---------------- */

const TECH = {
  id: "dhs-dme-technical",
  title: { en: "DHS & DME Technical Grade III", as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III" },
  subtitle: {
    en: "Directorate of Health Services & Directorate of Medical Education — Grade III (Technical)",
    as: "স্বাস্থ্য সেৱা সঞ্চালকালয় আৰু চিকিৎসা শিক্ষা সঞ্চালকালয় — গ্ৰেড III (কাৰিকৰী)",
  },
  note: {
    en: "Choose a subject, then a sub-category to practise question-wise MCQs.",
    as: "এখন বিষয় বাছনি কৰক, তাৰ পিছত উপ-শ্ৰেণী এটা বাছি প্ৰশ্নভিত্তিক MCQ অনুশীলন কৰক।",
  },
  cover: COVER,
  coverAlt: COVER_ALT,
  logo: LOGO,
  logoAlt: LOGO_ALT,
  color: "#059669",
  icon: "DHS",
  status: "available",
  sections: [
    SYLLABUS_SEC,
    {
      id: "technical-science",
      type: "qa",
      color: "#10b981",
      title: { en: "Technical / Science (Diploma & Degree Level)", as: "কাৰিকৰী / বিজ্ঞান (ডিপ্লমা আৰু ডিগ্ৰী স্তৰ)" },
      subcategories: [
        { id: "biology", source: "science/biology", title: { en: "Biology & Human Body", as: "জীৱ বিজ্ঞান আৰু মানৱ শৰীৰ" } },
        { id: "chemistry", source: "science/chemistry", title: { en: "Chemistry", as: "ৰসায়ন বিজ্ঞান" } },
        { id: "physics", source: "science/physics", title: { en: "Physics", as: "পদাৰ্থ বিজ্ঞান" } },
      ],
    },
    {
      id: "general-knowledge",
      type: "qa",
      color: "#0ea5e9",
      title: { en: "General Knowledge & Current Affairs", as: "সাধাৰণ জ্ঞান আৰু সাম্প্ৰতিক ঘটনাৱলী" },
      subcategories: [
        { id: "assam-history", source: "gk/assam-history", title: { en: "Assam History", as: "অসমৰ ইতিহাস" } },
        { id: "geography", source: "gk/geography", title: { en: "Geography", as: "ভূগোল" } },
        { id: "polity", source: "gk/polity", title: { en: "Indian Polity & Constitution", as: "ভাৰতৰ ৰাজনীতি আৰু সংবিধান" } },
      ],
    },
    {
      id: "general-english",
      type: "qa",
      color: "#0d9488",
      title: { en: "General English", as: "সাধাৰণ ইংৰাজী" },
      subcategories: [
        { id: "grammar", source: "english/grammar", title: { en: "Grammar", as: "ব্যাকৰণ" } },
        { id: "vocabulary", source: "english/vocabulary", title: { en: "Vocabulary", as: "শব্দভাণ্ডাৰ" } },
      ],
    },
    {
      id: "logical-reasoning",
      type: "qa",
      color: "#8b5cf6",
      title: { en: "Reasoning & Mental Ability", as: "তৰ্কশক্তি আৰু মানসিক দক্ষতা" },
      subcategories: [
        { id: "verbal-reasoning", source: "reasoning/verbal-reasoning", title: { en: "Verbal Reasoning", as: "ভাষিক যুক্তিতৰ্ক" } },
        { id: "non-verbal-reasoning", source: "reasoning/non-verbal-reasoning", title: { en: "Non-Verbal Reasoning", as: "চিত্ৰভিত্তিক যুক্তিতৰ্ক" } },
      ],
    },
  ],
  syllabus: {
    title: { en: "DHS & DME Technical Grade III Syllabus", as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III পাঠ্যক্ৰম" },
    description: {
      en: "Complete subject-wise syllabus and exam pattern for the DHS and DME Grade III Technical recruitment examination (Staff Nurse, Laboratory Technician, Pharmacist, Radiographer and similar posts).",
      as: "DHS আৰু DME গ্ৰেড III কাৰিকৰী নিযুক্তি পৰীক্ষাৰ (ষ্টাফ নাৰ্ছ, লেবৰেটৰী টেকনিচিয়ান, ফাৰ্মাচিষ্ট, ৰেডিঅ'গ্ৰাফাৰ আৰু একে ধৰণৰ পদ) বাবে বিষয়-ভিত্তিক সম্পূৰ্ণ পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ।",
    },
    chapters: [
      {
        title: { en: "Exam Pattern", as: "পৰীক্ষাৰ ধৰণ" },
        content: {
          en: "The DHS and DME Grade III Technical written examination is an objective test of multiple-choice questions. The paper carries 100 questions of one mark each, for a total of 100 marks, and the time allowed is 2 hours (120 minutes). There is no negative marking.\n\nThe paper is set in the subjects below:\n- Concerned Technical / Diploma / Degree syllabus — 75 to 80 questions\n- General Knowledge and Current Affairs — 10 to 15 questions\n- General English and Reasoning — 10 questions\n\nThe technical questions follow the syllabus of the candidate's own diploma or degree (nursing, pharmacy, laboratory technology, radiography and so on). The question paper is bilingual in English and Assamese.",
          as: "DHS আৰু DME গ্ৰেড III কাৰিকৰী লিখিত পৰীক্ষাখন বহুবিকল্পভিত্তিক প্ৰশ্নৰ এক উদ্দেশ্যমূলক পৰীক্ষা। প্ৰশ্নকাকতত ১০০ টা প্ৰশ্ন থাকে, প্ৰতিটোৰে ১ নম্বৰ, মুঠ ১০০ নম্বৰ, আৰু সময় ২ ঘণ্টা (১২০ মিনিট)। ঋণাত্মক মাৰ্কিং নাই।\n\nপ্ৰশ্নকাকত তলত দিয়া বিষয়সমূহত প্ৰস্তুত কৰা হয়:\n- সম্পৰ্কিত কাৰিকৰী / ডিপ্লমা / ডিগ্ৰী পাঠ্যক্ৰম — ৭৫ ৰ পৰা ৮০ টা প্ৰশ্ন\n- সাধাৰণ জ্ঞান আৰু সাম্প্ৰতিক ঘটনাৱলী — ১০ ৰ পৰা ১৫ টা প্ৰশ্ন\n- সাধাৰণ ইংৰাজী আৰু তৰ্কশক্তি — ১০ টা প্ৰশ্ন\n\nকাৰিকৰী প্ৰশ্নসমূহ প্ৰাৰ্থীৰ নিজৰ ডিপ্লমা বা ডিগ্ৰী পাঠ্যক্ৰমৰ (নাৰ্ছিং, ফাৰ্মাচী, লেবৰেটৰী টেকন'লজী, ৰেডিঅ'গ্ৰাফী আদি) অনুসৰি হয়। প্ৰশ্নকাকত ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত দ্বিভাষিক।",
        },
      },
      {
        title: { en: "Technical / Science", as: "কাৰিকৰী / বিজ্ঞান" },
        content: {
          en: "Biology and the human body (anatomy, physiology, health and disease), chemistry and physics at a diploma or degree standard. For nursing and paramedical posts, human biology carries the greatest weight.",
          as: "জীৱ বিজ্ঞান আৰু মানৱ শৰীৰ (শৰীৰস্থান, শৰীৰবিজ্ঞান, স্বাস্থ্য আৰু ৰোগ), ৰসায়ন বিজ্ঞান আৰু পদাৰ্থ বিজ্ঞান — ডিপ্লমা বা ডিগ্ৰী মানৰ। নাৰ্ছিং আৰু পেৰামেডিকেল পদৰ বাবে মানৱ জীৱ বিজ্ঞানৰ ভাৰ আটাইতকৈ বেছি।",
        },
      },
      {
        title: { en: "General Knowledge & Current Affairs", as: "সাধাৰণ জ্ঞান আৰু সাম্প্ৰতিক ঘটনাৱলী" },
        content: {
          en: "Assam history and geography, Indian polity and the Constitution, and current affairs of national and state importance.",
          as: "অসমৰ ইতিহাস আৰু ভূগোল, ভাৰতৰ ৰাজনীতি আৰু সংবিধান, আৰু ৰাষ্ট্ৰীয় তথা ৰাজ্যপ্ৰধান গুৰুত্বৰ সাম্প্ৰতিক ঘটনাৱলী।",
        },
      },
      {
        title: { en: "General English & Reasoning", as: "সাধাৰণ ইংৰাজী আৰু তৰ্কশক্তি" },
        content: {
          en: "Grammar and vocabulary (parts of speech, articles, prepositions, tenses, synonyms and antonyms), and verbal and non-verbal reasoning.",
          as: "ব্যাকৰণ আৰু শব্দভাণ্ডাৰ (পদ প্ৰকৰণ, আৰ্টিকল, সম্বন্ধবাচক, কাল, সমাৰ্থক আৰু বিপৰীত শব্দ), আৰু ভাষিক তথা চিত্ৰভিত্তিক যুক্তিতৰ্ক।",
        },
      },
    ],
  },
};

/* ---------------- 3. Grade IV ---------------- */

const GRADE4 = {
  id: "dhs-dme-grade-4",
  title: { en: "DHS & DME Grade IV", as: "DHS আৰু DME গ্ৰেড IV" },
  subtitle: {
    en: "Directorate of Health Services & Directorate of Medical Education — Grade IV (Peon, Ward Boy, Chowkidar & similar)",
    as: "স্বাস্থ্য সেৱা সঞ্চালকালয় আৰু চিকিৎসা শিক্ষা সঞ্চালকালয় — গ্ৰেড IV (পিয়ন, ৱাৰ্ড বয়, চৌকিদাৰ আদি)",
  },
  note: {
    en: "Choose a subject, then a sub-category to practise question-wise MCQs.",
    as: "এখন বিষয় বাছনি কৰক, তাৰ পিছত উপ-শ্ৰেণী এটা বাছি প্ৰশ্নভিত্তিক MCQ অনুশীলন কৰক।",
  },
  cover: COVER,
  coverAlt: COVER_ALT,
  logo: LOGO,
  logoAlt: LOGO_ALT,
  color: "#34d399",
  icon: "DHS",
  status: "available",
  sections: [
    SYLLABUS_SEC,
    {
      id: "general-knowledge",
      type: "qa",
      color: "#0ea5e9",
      title: { en: "General Knowledge", as: "সাধাৰণ জ্ঞান" },
      subcategories: [
        { id: "assam-history", source: "gk/assam-history", title: { en: "Assam History", as: "অসমৰ ইতিহাস" } },
        { id: "geography", source: "gk/geography", title: { en: "Geography", as: "ভূগোল" } },
        { id: "art-culture", source: "gk/art-culture", title: { en: "Art & Culture", as: "কলা-সংস্কৃতি" } },
        { id: "indian-history", source: "gk/indian-history", title: { en: "Indian History", as: "ভাৰতৰ ইতিহাস" } },
      ],
    },
    {
      id: "basic-mathematics",
      type: "qa",
      color: "#f59e0b",
      title: { en: "Basic Mathematics", as: "সাধাৰণ গণিত" },
      subcategories: [
        { id: "arithmetic", source: "math/arithmetic", title: { en: "Arithmetic", as: "পাটিগণিত" } },
      ],
    },
    {
      id: "general-english",
      type: "qa",
      color: "#0d9488",
      title: { en: "Basic English", as: "সাধাৰণ ইংৰাজী" },
      subcategories: [
        { id: "grammar", source: "english/grammar", title: { en: "Grammar", as: "ব্যাকৰণ" } },
        { id: "vocabulary", source: "english/vocabulary", title: { en: "Vocabulary", as: "শব্দভাণ্ডাৰ" } },
      ],
    },
  ],
  syllabus: {
    title: { en: "DHS & DME Grade IV Syllabus", as: "DHS আৰু DME গ্ৰেড IV পাঠ্যক্ৰম" },
    description: {
      en: "Complete subject-wise syllabus and exam pattern for the DHS and DME Grade IV recruitment examination (Peon, Ward Boy, Ward Girl, Chowkidar, Aya and similar posts).",
      as: "DHS আৰু DME গ্ৰেড IV নিযুক্তি পৰীক্ষাৰ (পিয়ন, ৱাৰ্ড বয়, ৱাৰ্ড গাৰ্ল, চৌকিদাৰ, আয়া আৰু একে ধৰণৰ পদ) বাবে বিষয়-ভিত্তিক সম্পূৰ্ণ পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ।",
    },
    chapters: [
      {
        title: { en: "Exam Pattern", as: "পৰীক্ষাৰ ধৰণ" },
        content: {
          en: "The DHS and DME Grade IV written examination is an objective test of multiple-choice questions. The paper carries 50 questions of one mark each, for a total of 50 marks, and the time allowed is 1 hour 30 minutes (90 minutes). There is no negative marking, so a candidate should attempt every question.\n\nThe paper is set in the subjects below:\n- General Knowledge — 20 to 25 questions\n- Basic Mathematics — 10 to 15 questions\n- Basic English — 10 to 15 questions\n\nThe standard of the questions is Class VIII. The question paper is bilingual in English and Assamese.",
          as: "DHS আৰু DME গ্ৰেড IV লিখিত পৰীক্ষাখন বহুবিকল্পভিত্তিক প্ৰশ্নৰ এক উদ্দেশ্যমূলক পৰীক্ষা। প্ৰশ্নকাকতত ৫০ টা প্ৰশ্ন থাকে, প্ৰতিটোৰে ১ নম্বৰ, মুঠ ৫০ নম্বৰ, আৰু সময় ১ ঘণ্টা ৩০ মিনিট (৯০ মিনিট)। ঋণাত্মক মাৰ্কিং নাই, গতিকে প্ৰাৰ্থীয়ে প্ৰতিটো প্ৰশ্নৰ উত্তৰ দিয়া উচিত।\n\nপ্ৰশ্নকাকত তলত দিয়া বিষয়সমূহত প্ৰস্তুত কৰা হয়:\n- সাধাৰণ জ্ঞান — ২০ ৰ পৰা ২৫ টা প্ৰশ্ন\n- সাধাৰণ গণিত — ১০ ৰ পৰা ১৫ টা প্ৰশ্ন\n- সাধাৰণ ইংৰাজী — ১০ ৰ পৰা ১৫ টা প্ৰশ্ন\n\nপ্ৰশ্নসমূহৰ মান অষ্টম শ্ৰেণীৰ। প্ৰশ্নকাকত ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত দ্বিভাষিক।",
        },
      },
      {
        title: { en: "General Knowledge", as: "সাধাৰণ জ্ঞান" },
        content: {
          en: "Assam history, geography and culture, and Indian history at a Class VIII standard.",
          as: "অসমৰ ইতিহাস, ভূগোল আৰু সংস্কৃতি, আৰু ভাৰতৰ ইতিহাস — অষ্টম শ্ৰেণীৰ মানত।",
        },
      },
      {
        title: { en: "Basic Mathematics", as: "সাধাৰণ গণিত" },
        content: {
          en: "Basic arithmetic — number operations, fractions, percentage, average, ratio, profit and loss, and simple interest at a Class VIII standard.",
          as: "প্ৰাথমিক পাটিগণিত — সংখ্যাৰ ক্ৰিয়া, ভগ্নাংশ, শতাংশ, গড়, অনুপাত, লাভ-লোকচান, আৰু সৰল সুত — অষ্টম শ্ৰেণীৰ মানত।",
        },
      },
      {
        title: { en: "Basic English", as: "সাধাৰণ ইংৰাজী" },
        content: {
          en: "Basic grammar (parts of speech, articles, prepositions, tenses) and vocabulary (synonyms, antonyms, one-word substitution, idioms) at a Class VIII standard.",
          as: "প্ৰাথমিক ব্যাকৰণ (পদ প্ৰকৰণ, আৰ্টিকল, সম্বন্ধবাচক, কাল) আৰু শব্দভাণ্ডাৰ (সমাৰ্থক, বিপৰীত, এশব্দ প্ৰতিস্থাপন, বাগধাৰা) — অষ্টম শ্ৰেণীৰ মানত।",
        },
      },
    ],
  },
};

module.exports = { EXAMS: [NON_TECH, TECH, GRADE4] };
