#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/adre-grade-3.structure.js

   Source of truth for the "ADRE 3.0 Grade III" exam book that
   tools/build-adre-grade-3.js writes into the repository.

   It mirrors the shape of data/exams/index.json (exam → section →
   sub-category → sub-sub-category) so the SPA renders the new book
   with no runtime change, and it mirrors the folder layout of
   data/exams/adre-grade-4 so every maintenance tool keeps working.

   Only the exam entry, its sections, the syllabus notes and the
   per-topic study notes live here. The question banks live in
   tools/adre-grade-3.questions.js.
   ============================================================ */

const EXAM = {
  id: "adre-grade-3",
  title: { en: "ADRE 3.0 Grade III", as: "ADRE 3.0 গ্ৰেড III" },
  subtitle: {
    en: "Assam Direct Recruitment Examination — Grade III (SLRC)",
    as: "অসম প্ৰত্যক্ষ নিযুক্তি পৰীক্ষা — গ্ৰেড III (SLRC)",
  },
  note: {
    en: "Choose a subject, then a sub-category to practise question-wise MCQs.",
    as: "এখন বিষয় বাছনি কৰক, তাৰ পিছত উপ-শ্ৰেণী এটা বাছি প্ৰশ্নভিত্তিক MCQ অনুশীলন কৰক।",
  },
  cover: "/images/exams/adre-grade-3-cover.webp",
  coverAlt: {
    en: "ADRE 3.0 (Assam Direct Recruitment Examination) Grade III — book front cover",
    as: "ADRE 3.0 (অসম প্ৰত্যক্ষ নিযুক্তি পৰীক্ষা) গ্ৰেড III — কিতাপৰ বেটুপাত",
  },
  color: "#0f766e",
  icon: "ADRE",
  status: "available",
  sections: [
    {
      id: "syllabus",
      type: "syllabus",
      color: "#6366f1",
      title: { en: "Syllabus", as: "পাঠ্যক্ৰম" },
    },
    {
      id: "elementary-mathematics",
      type: "qa",
      color: "#f59e0b",
      title: { en: "General Mathematics", as: "সাধাৰণ গণিত" },
      subcategories: [
        { id: "number-system", title: { en: "Number System", as: "সংখ্যা পদ্ধতি — বাস্তৱ সংখ্যা, ভগ্নাংশ (Fractions), দশমিক সংখ্যা (Decimals), বিভাজ্যতাৰ নিয়ম।" } },
        { id: "simplification-fractions", title: { en: "Simplification", as: "সৰলীকৰণ — BODMAS নিয়ম।" } },
        { id: "lcm-hcf", title: { en: "LCM & HCF", as: "ল.সা.গু. আৰু গ.সা.উ. (LCM & HCF)।" } },
        { id: "percentage", title: { en: "Percentage", as: "শতাংশ (Percentage)।" } },
        { id: "ratio-proportion", title: { en: "Ratio & Proportion", as: "অনুপাত আৰু সমানুপাত (Ratio & Proportion)।" } },
        { id: "average", title: { en: "Average", as: "গড় (Average)।" } },
        { id: "profit-loss", title: { en: "Profit & Loss", as: "লাভ আৰু ক্ষতি (Profit & Loss)।" } },
        { id: "simple-compound-interest", title: { en: "Simple & Compound Interest", as: "সৰল সুত আৰু চক্ৰবৃদ্ধি সুত (Simple & Compound Interest)।" } },
        { id: "time-speed-distance", title: { en: "Time, Speed & Distance", as: "সময় আৰু দূৰত্ব (Time, Speed & Distance) — ৰে'লগাড়ী আৰু গতিবেগৰ অংক।" } },
        { id: "time-work", title: { en: "Time & Work", as: "সময় আৰু কাৰ্য (Time & Work) — মানুহ আৰু কামৰ হিচাপ।" } },
        { id: "problems-on-ages", title: { en: "Problems on Ages", as: "বয়স সম্বন্ধীয় সমস্যা (Problems on Ages)।" } },
        { id: "basic-mensuration", title: { en: "Basic Mensuration & Geometry", as: "সাধাৰণ পৰিমিতি আৰু জ্যামিতি (Basic Mensuration) — ত্ৰিভুজ, চতুৰ্ভুজ, বৃত্ত, আয়তক্ষেত্ৰ আৰু বৰ্গক্ষেত্ৰৰ পৰিসীমা আৰু কালি (Class 8 & 10 level)।" } },
        { id: "partnership", title: { en: "Partnership", as: "অংশীদাৰিত্ব (Partnership) — মূলধন, সময় আৰু লাভ-ক্ষতিৰ ভাগ।" } },
        { id: "pipes-and-cisterns", title: { en: "Pipes & Cisterns", as: "নল আৰু চৌবাচ্চা (Pipes & Cisterns) — অন্তৰ্গামী আৰু বহিৰ্গামী নল।" } },
        { id: "boats-and-streams", title: { en: "Boats & Streams", as: "নাও আৰু সোঁত (Boats & Streams) — সোঁতৰ দিশ আৰু বিপৰীত দিশৰ গতি।" } },
        { id: "mixture-and-alligation", title: { en: "Mixture & Alligation", as: "মিশ্ৰণ আৰু সংযোগ (Mixture & Alligation) — গড় দাম আৰু ঘনত্ব।" } },
        { id: "algebra", title: { en: "Algebra", as: "বীজগণিত (Algebra) — সমীকৰণ, অভেদ আৰু ৰাশি।" } },
        { id: "surds-and-indices", title: { en: "Surds & Indices", as: "কৰণী আৰু সূচক (Surds & Indices) — ঘাতৰ নিয়ম আৰু মূল।" } },
        { id: "geometry", title: { en: "Geometry", as: "জ্যামিতি (Geometry) — কোণ, ত্ৰিভুজ, বহুভুজ আৰু বৃত্ত।" } },
        { id: "mensuration-2d", title: { en: "Mensuration (2D)", as: "পৰিমিতি — ২-মাত্ৰিক (Mensuration 2D) — সমতল আকৃতিৰ কালি আৰু পৰিসীমা।" } },
        { id: "mensuration-3d", title: { en: "Mensuration (3D)", as: "পৰিমিতি — ৩-মাত্ৰিক (Mensuration 3D) — ঘনক, চুঙা আৰু গোলকৰ আয়তন আৰু পৃষ্ঠকালি।" } },
        { id: "trigonometry", title: { en: "Trigonometry", as: "ত্ৰিকোণমিতি (Trigonometry) — অনুপাত, প্ৰামাণ্য কোণ আৰু অভেদ।" } },
        { id: "statistics", title: { en: "Statistics", as: "পৰিসংখ্যা বিজ্ঞান (Statistics) — মাধ্য, মধ্যক, বহুলক আৰু পৰিসৰ।" } },
        { id: "data-interpretation", title: { en: "Data Interpretation", as: "তথ্য বিশ্লেষণ (Data Interpretation) — তালিকা আৰু লেখচিত্ৰ।" } },
      ],
    },
    {
      id: "history",
      type: "qa",
      color: "#b45309",
      title: { en: "History", as: "ইতিহাস (History)" },
      subcategories: [
        {
          id: "assam-history",
          title: { en: "Assam History", as: "অসমৰ ইতিহাস (Assam History)" },
          subcategories: [
            { id: "assam-history-ancient", title: { en: "Ancient Assam", as: "প্ৰাচীন অসম (Ancient Assam) — বৰ্মন, শালস্তম্ভ আৰু পাল বংশ।" } },
            { id: "assam-history-medieval", title: { en: "Medieval Assam", as: "মধ্যযুগীয় অসম (Medieval Assam) — আহোম যুগ, কোচ ৰাজ্য আৰু য়াণ্ডাবু সন্ধি।" } },
            { id: "assam-history-modern", title: { en: "Modern Assam", as: "আধুনিক অসম (Modern Assam) — ব্ৰিটিছ শাসন, স্বাধীনতা সংগ্ৰাম আৰু আধুনিক অসম।" } },
          ],
        },
        {
          id: "indian-history",
          title: { en: "Indian History", as: "ভাৰতৰ ইতিহাস (Indian History)" },
          subcategories: [
            { id: "indian-history-ancient", title: { en: "Ancient India", as: "প্ৰাচীন ভাৰত (Ancient India) — সিন্ধু সভ্যতা, বৈদিক যুগ, মৌৰ্য আৰু গুপ্ত সাম্ৰাজ্য।" } },
            { id: "indian-history-medieval", title: { en: "Medieval India", as: "মধ্যযুগীয় ভাৰত (Medieval India) — দিল্লী সুলতানী, মোগল সাম্ৰাজ্য আৰু মাৰাঠা।" } },
            { id: "indian-history-modern", title: { en: "Modern India", as: "আধুনিক ভাৰত (Modern India) — ব্ৰিটিছ শাসন আৰু স্বাধীনতা আন্দোলন।" } },
          ],
        },
        { id: "world-history", title: { en: "World History", as: "বিশ্বৰ ইতিহাস (World History) — বিশ্বৰ প্ৰধান ঐতিহাসিক ঘটনাৱলী।" } },
      ],
    },
    {
      id: "general-english",
      type: "qa",
      color: "#0d9488",
      title: { en: "General English", as: "সাধাৰণ ইংৰাজী (General English)" },
      subcategories: [
        {
          id: "grammar",
          title: { en: "Grammar", as: "ব্যাকৰণ (Grammar)" },
          subcategories: [
            { id: "parts-of-speech", title: { en: "Parts of Speech", as: "Parts of Speech — Noun, Pronoun, Verb, Adjective, Adverb আদি।" } },
            { id: "articles-determiners", title: { en: "Articles", as: "Articles — A, An, The।" } },
            { id: "prepositions", title: { en: "Prepositions", as: "Prepositions — In, On, At, To, With আদি।" } },
            { id: "tenses-rules", title: { en: "Tenses", as: "Tenses — Present, Past, Future।" } },
            { id: "subject-verb-agreement", title: { en: "Subject-Verb Agreement", as: "কৰ্তা-ক্ৰিয়াৰ মিল (Subject-Verb Agreement)।" } },
            { id: "voice-change", title: { en: "Voice Change", as: "Voice Change — Active আৰু Passive Voice।" } },
            { id: "narration", title: { en: "Narration", as: "Narration — Direct আৰু Indirect Speech।" } },
          ],
        },
        {
          id: "vocabulary",
          title: { en: "Vocabulary", as: "শব্দভাণ্ডাৰ (Vocabulary)" },
          subcategories: [
            { id: "synonyms", title: { en: "Synonyms", as: "সমাৰ্থক শব্দ (Synonyms)।" } },
            { id: "antonyms", title: { en: "Antonyms", as: "বিপৰীত শব্দ (Antonyms)।" } },
            { id: "one-word-substitution", title: { en: "One Word Substitution", as: "এটা শব্দত প্ৰকাশ (One Word Substitution)।" } },
            { id: "idioms-phrases", title: { en: "Idioms & Phrases", as: "Idioms and Phrases — বাক্যৰীতি আৰু খণ্ডবাক্য।" } },
            { id: "error-detection", title: { en: "Spotting Errors", as: "বাক্যৰ ভুল নিৰ্ণয় (Spotting Errors)।" } },
            { id: "fill-in-the-blanks", title: { en: "Fill in the Blanks", as: "ৰিক্ত স্থান পূৰণ (Fill in the Blanks)।" } },
            { id: "sentence-rearrangement", title: { en: "Sentence Rearrangement", as: "বাক্য সজোৱা (Sentence Rearrangement)।" } },
          ],
        },
      ],
    },
    {
      id: "general-knowledge-assam-gk",
      type: "qa",
      color: "#0ea5e9",
      title: { en: "General Knowledge & Assam GK", as: "সাধাৰণ জ্ঞান আৰু অসম সম্পৰ্কীয় তথ্য (General Knowledge & Assam GK)" },
      subcategories: [
        {
          id: "assam-history-culture",
          title: { en: "Assam's Culture & Literature", as: "অসমৰ সংস্কৃতি আৰু সাহিত্য" },
          subcategories: [
            { id: "assam-folk-culture", title: { en: "Folk Culture, Bihu & Satriya", as: "অসমৰ লোক-সংস্কৃতি, বিহু, উৎসৱ-পাৰ্বণ, সত্ৰীয়া সংস্কৃতি।" } },
            { id: "assamese-literature", title: { en: "Assamese Literature", as: "অসমীয়া সাহিত্যৰ উল্লেখযোগ্য লেখক আৰু গ্ৰন্থসমূহ।" } },
          ],
        },
        {
          id: "assam-geography",
          title: { en: "Assam's Geography", as: "অসমৰ ভূগোল" },
          subcategories: [
            { id: "brahmaputra-barak", title: { en: "Brahmaputra & Barak Rivers", as: "ব্ৰহ্মপুত্ৰ আৰু বৰাক নদী আৰু উপনৈসমূহ।" } },
            { id: "assam-national-parks", title: { en: "National Parks & Sanctuaries", as: "অসমৰ ৰাষ্ট্ৰীয় উদ্যান আৰু অভয়াৰণ্যসমূহ।" } },
            { id: "assam-natural-resources", title: { en: "Natural Resources", as: "প্ৰাকৃতিক সম্পদ — চাহ, খনিজ তেল, কয়লা।" } },
          ],
        },
        {
          id: "india-general-knowledge",
          title: { en: "India General Knowledge", as: "ভাৰতৰ সাধাৰণ জ্ঞান" },
          subcategories: [
            { id: "india-rivers-mountains-states", title: { en: "Rivers, Mountains & States", as: "ভাৰতৰ প্ৰধান নদ-নদী, পৰ্বতমালা আৰু ৰাজ্যসমূহ।" } },
            { id: "important-days-dates", title: { en: "Important Days & Dates", as: "উল্লেখযোগ্য দিন আৰু দিৱস (Important Days & Dates)।" } },
            { id: "awards-honours", title: { en: "Awards & Honours", as: "বঁটা আৰু সন্মান (Awards & Honours)।" } },
            { id: "sports", title: { en: "Sports", as: "খেল-ধেমালি (Sports)।" } },
            { id: "indian-geography", title: { en: "Indian Geography", as: "ভাৰতৰ ভূগোল (Indian Geography)।" } },
          ],
        },
        {
          id: "current-affairs",
          title: { en: "Current Affairs", as: "সাম্প্ৰতিক ঘটনাৱলী (Current Affairs)" },
          subcategories: [
            { id: "assam-india-current-affairs", title: { en: "Assam & India Current Affairs", as: "বিগত ৬-৮ মাহৰ অসম আৰু ভাৰতৰ গুৰুত্বপূৰ্ণ ঘটনাৱলী।" } },
            { id: "government-schemes", title: { en: "Government Schemes", as: "চৰকাৰী আঁচনিসমূহ — বিশেষকৈ অসম চৰকাৰৰ আঁচনি।" } },
          ],
        },
      ],
    },
    {
      id: "logical-reasoning",
      type: "qa",
      color: "#8b5cf6",
      title: { en: "Reasoning & Mental Ability", as: "যুক্তি আৰু বৌদ্ধিক ক্ষমতা (Reasoning & Mental Ability)" },
      subcategories: [
        {
          id: "verbal-reasoning",
          title: { en: "Verbal Reasoning", as: "ভাষিক যুক্তিতৰ্ক" },
          subcategories: [
            { id: "number-alphabet-series", title: { en: "Number Series & Alphabet Series", as: "সংখ্যা আৰু বৰ্ণমালাৰ শৃংখলা চিনাক্তকৰণ।" } },
            { id: "alpha-numeric-series", title: { en: "Alpha-Numeric Series", as: "বৰ্ণ আৰু সংখ্যাৰ মিশ্ৰিত শৃংখলা (Alpha-Numeric Series)।" } },
            { id: "alphabet-test-word-formation", title: { en: "Alphabet Test & Word Formation", as: "বৰ্ণমালা পৰীক্ষা আৰু শব্দ গঠন — আখৰৰ স্থান, অভিধানৰ ক্ৰম আৰু শব্দ গঠন।" } },
            { id: "coding-decoding", title: { en: "Coding-Decoding", as: "আখৰ বা সংখ্যাৰ সংকেত নিৰ্ণয় (Letter Coding, Number Coding)।" } },
            { id: "blood-relations", title: { en: "Blood Relations", as: "তেজৰ বা পৰিয়ালৰ সম্পৰ্ক সম্বন্ধীয় প্ৰশ্ন।" } },
            { id: "direction-distance", title: { en: "Direction Sense Test", as: "দিশ আৰু দূৰত্ব নিৰ্ণয়।" } },
            { id: "analogy", title: { en: "Analogy", as: "সাদৃশ্য নিৰ্ণয় — দুটা শব্দ বা সংখ্যাৰ মাজৰ পাৰস্পৰিক সম্বন্ধ।" } },
            { id: "odd-one-out", title: { en: "Classification / Odd One Out", as: "চাৰিটা বিকল্পৰ মাজৰ পৰা অমিল শব্দ বা সংখ্যা বাছি উলিওৱা।" } },
            { id: "ranking-order", title: { en: "Ranking & Order Test", as: "শাৰী এটাত কোনো ব্যক্তিৰ স্থান (বাওঁ/সোঁ বা ওপৰ/তলৰ পৰা) নিৰ্ণয়।" } },
            { id: "word-formation-dictionary", title: { en: "Word Formation & Dictionary Order", as: "শব্দ গঠন আৰু অভিধানৰ ক্ৰম অনুসৰি সজোৱা।" } },
            { id: "venn-diagrams", title: { en: "Venn Diagrams", as: "জ্যামিতিক চিত্ৰৰ জৰিয়তে শ্ৰেণী বা বস্তুৰ সম্বন্ধ বুজোৱা।" } },
            { id: "syllogism", title: { en: "Syllogism / Statements & Conclusions", as: "বিবৃতি আৰু যুক্তিযুক্ত সিদ্ধান্ত নিৰ্ণয়।" } },
            { id: "mathematical-operations", title: { en: "Mathematical Operations", as: "গাণিতিক চিহ্নৰ সাল-সলনি কৰি মান নিৰ্ণয়।" } },
            { id: "clock-calendar", title: { en: "Clock & Calendar", as: "ঘড়ীৰ কাঁটাৰ কোণ আৰু দিন/তাৰিখ নিৰ্ণয় সম্বন্ধীয় প্ৰশ্ন।" } },
            { id: "data-sufficiency", title: { en: "Data Sufficiency", as: "তথ্য পৰ্যাপ্ততা (Data Sufficiency) — কোনটো তথ্যই উত্তৰ দিবলৈ যথেষ্ট।" } },
            { id: "input-output-machine", title: { en: "Input-Output & Machine", as: "ইনপুট-আউটপুট আৰু যন্ত্ৰৰ ধাপ (Input-Output & Machine)।" } },
          ],
        },
        {
          id: "analytical-critical-reasoning",
          title: { en: "Analytical & Critical Reasoning", as: "বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্ক" },
          subcategories: [
            { id: "seating-arrangement", title: { en: "Seating Arrangement", as: "বহাৰ বিন্যাস — শাৰী, বৃত্ত আৰু বৰ্গাকাৰত বহাৰ প্ৰশ্ন।" } },
            { id: "complex-puzzles", title: { en: "Complex Puzzles", as: "জটিল পাজল — মজিয়া, পেটিকা আৰু সময়সূচীৰ প্ৰশ্ন।" } },
            { id: "inequality", title: { en: "Inequality", as: "অসমতা (Inequality) — চিহ্নৰ অৰ্থ আৰু তুলনাৰ সম্পৰ্ক।" } },
            { id: "statement-conclusions", title: { en: "Statement & Conclusions", as: "বিবৃতি আৰু সিদ্ধান্ত — কোনটো সিদ্ধান্ত যুক্তিসংগতভাৱে ওলাই আহে।" } },
            { id: "statement-assumptions", title: { en: "Statement & Assumptions", as: "বিবৃতি আৰু অনুমান — বিবৃতিত লুকুৱা ধাৰণা নিৰ্ণয়।" } },
            { id: "statement-arguments", title: { en: "Statement & Arguments", as: "বিবৃতি আৰু যুক্তি — শক্তিশালী যুক্তি বাছনি কৰা।" } },
            { id: "statement-course-of-action", title: { en: "Statement & Course of Action", as: "বিবৃতি আৰু কাৰ্যপন্থা — সমস্যাৰ বাবে উপযুক্ত পদক্ষেপ নিৰ্ণয়।" } },
            { id: "cause-effect", title: { en: "Cause & Effect", as: "কাৰণ আৰু ফলাফল (Cause & Effect)।" } },
            { id: "assertion-reason", title: { en: "Assertion & Reason", as: "দাবী আৰু কাৰণ (Assertion & Reason)।" } },
            { id: "decision-making", title: { en: "Decision Making", as: "সিদ্ধান্ত লোৱা (Decision Making) — যোগ্যতাৰ চৰ্তৰ পৰা সিদ্ধান্ত।" } },
            { id: "drawing-inferences", title: { en: "Drawing Inferences", as: "সিদ্ধান্ত টনা (Drawing Inferences) — অনুচ্ছেদৰ পৰা সঠিক অনুমান।" } },
          ],
        },
        {
          id: "non-verbal-reasoning",
          title: { en: "Non-Verbal Reasoning", as: "চিত্ৰভিত্তিক / অ-ভাষিক যুক্তিতৰ্ক" },
          subcategories: [
            { id: "figure-series", title: { en: "Figure Series", as: "চিত্ৰৰ ধাৰাবাহিক ক্ৰম বা পৰৱৰ্তী চিত্ৰ চিনাক্ত কৰা।" } },
            { id: "figure-analogy", title: { en: "Figure Analogy", as: "প্ৰথম দুটা চিত্ৰৰ মাজৰ সম্পৰ্ক চাই তৃতীয় চিত্ৰৰ সঠিক জোৰা উলিওৱা।" } },
            { id: "figure-classification", title: { en: "Figure Classification (Odd One Out)", as: "চিত্ৰৰ ভিতৰত অমিল চিত্ৰটো বাছি উলিওৱা।" } },
            { id: "mirror-water-image", title: { en: "Mirror Image & Water Image", as: "দাপোণ আৰু পানীৰ প্ৰতিবিম্ব নিৰ্ণয়।" } },
            { id: "pattern-completion", title: { en: "Pattern Completion", as: "অসম্পূৰ্ণ চিত্ৰৰ খালী অংশ পূৰণ কৰা।" } },
            { id: "embedded-figures", title: { en: "Embedded Figures", as: "এটা জটিল চিত্ৰৰ ভিতৰত লুকাই থকা নিৰ্দিষ্ট চিত্ৰটো বিচাৰি উলিওৱা।" } },
            { id: "counting-figures", title: { en: "Counting of Figures", as: "চিত্ৰত থকা ত্ৰিভুজ, বৰ্গক্ষেত্ৰ, আয়তক্ষেত্ৰ বা সৰলৰেখাৰ সংখ্যা গণনা কৰা।" } },
            { id: "paper-folding-cutting", title: { en: "Paper Folding & Paper Cutting", as: "কাগজ ভাঁজ কৰা আৰু কটাৰ পিছত কেনেকুৱা দেখাব তাৰ নিৰ্ণয়।" } },
            { id: "cubes-dice", title: { en: "Cubes & Dice", as: "পাশা (Dice)-ৰ বিপৰীত ফলকত থকা সংখ্যা বা বিন্দু নিৰ্ণয়।" } },
            { id: "figure-matrix", title: { en: "Figure Matrix", as: "চিত্ৰ মেট্ৰিক্স — শাৰী আৰু স্তম্ভৰ সম্পৰ্কৰ পৰা নোহোৱা চিত্ৰটো পূৰণ কৰা।" } },
            { id: "rule-detection", title: { en: "Rule Detection", as: "নিয়ম নিৰ্ণয় (Rule Detection) — দিয়া নিয়ম মানি চলা বিকল্পটো বাছনি কৰা।" } },
            { id: "shape-construction-grouping", title: { en: "Shape Construction & Grouping", as: "আকৃতি গঠন আৰু শ্ৰেণীবদ্ধকৰণ — টুকুৰা জোৰা লগাই আকৃতি সজা।" } },
          ],
        },
      ],
    },
    {
      id: "social-studies",
      type: "qa",
      color: "#d97706",
      title: { en: "Social Studies", as: "সামাজিক বিজ্ঞান (Social Studies)" },
      subcategories: [
        {
          id: "polity-constitution",
          title: { en: "Political Science & Constitution", as: "ৰাজনীতি বিজ্ঞান আৰু সংবিধান" },
          subcategories: [
            { id: "constitution-preamble-rights", title: { en: "Constitution, Preamble, Rights & Duties", as: "ভাৰতীয় সংবিধানৰ প্ৰস্তাৱনা, মৌলিক অধিকাৰ আৰু কৰ্তব্য।" } },
            { id: "president-pm-governor-cm", title: { en: "President, PM, Governor & CM", as: "ৰাষ্ট্ৰপতি, প্ৰধানমন্ত্ৰী, ৰাজ্যপাল আৰু মুখ্যমন্ত্ৰীৰ পদবী।" } },
            { id: "panchayati-raj", title: { en: "Panchayati Raj System", as: "পঞ্চায়তী ৰাজ ব্যৱস্থা।" } },
          ],
        },
        {
          id: "economy-environment",
          title: { en: "Economy & Environment", as: "অৰ্থনীতি আৰু পৰিৱেশ" },
          subcategories: [
            { id: "indian-assam-economy", title: { en: "Indian & Assam Economy", as: "ভাৰত আৰু অসমৰ অৰ্থনীতি — কৃষি, উদ্যোগ আৰু বিত্তীয় মূল ধাৰণা।" } },
            { id: "environment-pollution", title: { en: "Environment & Pollution", as: "পৰিৱেশ সংৰক্ষণ আৰু প্ৰদূষণ সম্পৰ্কীয় সজাগতা।" } },
          ],
        },
      ],
    },
  ],
};

/* Syllabus notes (section type: syllabus) — mirrors the Grade IV file. */
const SYLLABUS = {
  id: "syllabus",
  type: "syllabus",
  title: { en: "ADRE 3.0 Grade III Syllabus", as: "ADRE 3.0 গ্ৰেড III পাঠ্যক্ৰম" },
  description: {
    en: "Complete subject-wise syllabus and exam pattern for the ADRE 3.0 Grade III recruitment examination (SLRC). Read it once, then open each subject book to start preparing.",
    as: "ADRE 3.0 গ্ৰেড III নিযুক্তি পৰীক্ষাৰ (SLRC) বাবে বিষয়-ভিত্তিক সম্পূৰ্ণ পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ। এবাৰ পঢ়ি লৈ, প্ৰস্তুতি আৰম্ভ কৰিবলৈ প্ৰতিটো বিষয়-বুকু খোলক।",
  },
  chapters: [
    {
      title: { en: "Exam Pattern", as: "পৰীক্ষাৰ ধৰণ" },
      content: {
        en: "The ADRE 3.0 Grade III (SLRC) written examination is an objective test of multiple-choice questions. The paper is set in the subjects below, and for the posts that require it, knowledge of the Assamese language or the local language of the candidate is also tested. The exact number of questions, marks and the time allowed are fixed by the latest official notification of the SLRC / Government of Assam, so always confirm the current pattern from the official portal before the final weeks of preparation.\n\n- Objective type multiple-choice questions, one correct option out of four\n- Subjects: General Knowledge, General English, General Mathematics and Reasoning & Mental Ability, along with the language paper where applicable\n- Practise with a timer because the paper rewards speed and accuracy together\n- There is no separate descriptive paper for Grade III",
        as: "ADRE 3.0 গ্ৰেড III (SLRC) লিখিত পৰীক্ষা বস্তুনিষ্ঠ, বহুনিৰ্বাচনী প্ৰশ্নৰ পৰীক্ষা। তলৰ বিষয়সমূহৰ পৰা প্ৰশ্ন সোধা হয়, আৰু যিবোৰ পদৰ বাবে প্ৰয়োজন তাত অসমীয়া ভাষা বা প্ৰাৰ্থীৰ স্থানীয় ভাষাৰ জ্ঞানো পৰীক্ষা কৰা হয়। প্ৰশ্নৰ সংখ্যা, নম্বৰ আৰু সময়ৰ সীমা SLRC / অসম চৰকাৰৰ শেহতীয়া অধিসূচনাৰ দ্বাৰা নিৰ্ধাৰিত হয়, গতিকে চূড়ান্ত প্ৰস্তুতিৰ আগতে সদায় আধিকাৰিক পৰ্টেলৰ পৰা বৰ্তমানৰ ধৰণ নিশ্চিত কৰি ল'ব।\n\n- বস্তুনিষ্ঠ, বহুনিৰ্বাচনী প্ৰশ্ন — চাৰিটা বিকল্পৰ পৰা এটা শুদ্ধ উত্তৰ\n- বিষয়সমূহ: সাধাৰণ জ্ঞান, সাধাৰণ ইংৰাজী, সাধাৰণ গণিত আৰু যুক্তি আৰু বৌদ্ধিক ক্ষমতা, আৰু প্ৰযোজ্য ক্ষেত্ৰত ভাষা পত্ৰ\n- টাইমাৰ লগাই অনুশীলন কৰক, কাৰণ এই পত্ৰই দ্ৰুতা আৰু শুদ্ধতা দুয়োটা বিচাৰে\n- গ্ৰেড III ৰ বাবে সুকীয়া ৰচনামূলক পত্ৰ নাই",
      },
    },
    {
      title: { en: "General Mathematics", as: "সাধাৰণ গণিত" },
      content: {
        en: "Category-wise syllabus for the ADRE 3.0 Grade III examination — General Mathematics (সাধাৰণ গণিত).\n\n- Number System: real numbers, fractions, decimals and divisibility rules\n- Simplification: BODMAS rule\n- LCM & HCF\n- Percentage\n- Ratio & Proportion\n- Average\n- Profit & Loss\n- Simple & Compound Interest\n- Time, Speed & Distance: problems on trains and speed\n- Time & Work: work and men problems\n- Problems on Ages\n- Basic Mensuration & Geometry: perimeter and area of triangle, quadrilateral, circle, rectangle and square (Class 8 & 10 level)\n- Partnership, Pipes & Cisterns, Boats & Streams and Mixture & Alligation\n- Algebra, Surds & Indices, Geometry, Mensuration (2D and 3D) and Trigonometry\n- Statistics and Data Interpretation",
        as: "ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ সাধাৰণ গণিতৰ শ্ৰেণী-ভিত্তিক পাঠ্যক্ৰম।\n\n- সংখ্যা পদ্ধতি: বাস্তৱ সংখ্যা, ভগ্নাংশ, দশমিক সংখ্যা আৰু বিভাজ্যতাৰ নিয়ম\n- সৰলীকৰণ: BODMAS নিয়ম\n- ল.সা.গু. আৰু গ.সা.উ.\n- শতাংশ\n- অনুপাত আৰু সমানুপাত\n- গড়\n- লাভ আৰু ক্ষতি\n- সৰল সুত আৰু চক্ৰবৃদ্ধি সুত\n- সময়, দূৰত্ব আৰু গতিবেগ: ৰে'লগাড়ী আৰু গতিবেগৰ অংক\n- সময় আৰু কাৰ্য: মানুহ আৰু কামৰ হিচাপ\n- বয়স সম্বন্ধীয় সমস্যা\n- সাধাৰণ পৰিমিতি আৰু জ্যামিতি: ত্ৰিভুজ, চতুৰ্ভুজ, বৃত্ত, আয়তক্ষেত্ৰ আৰু বৰ্গক্ষেত্ৰৰ পৰিসীমা আৰু কালি (Class 8 & 10 level)\n- অংশীদাৰিত্ব, নল আৰু চৌবাচ্চা, নাও আৰু সোঁত, আৰু মিশ্ৰণ আৰু সংযোগ\n- বীজগণিত, কৰণী আৰু সূচক, জ্যামিতি, পৰিমিতি (২-মাত্ৰিক আৰু ৩-মাত্ৰিক) আৰু ত্ৰিকোণমিতি\n- পৰিসংখ্যা বিজ্ঞান আৰু তথ্য বিশ্লেষণ",
      },
    },
    {
      title: { en: "General English", as: "সাধাৰণ ইংৰাজী (General English)" },
      content: {
        en: "Category-wise syllabus for the ADRE 3.0 Grade III examination — General English (সাধাৰণ ইংৰাজী).\n\nGrammar (ব্যাকৰণ):\n- Parts of Speech — Noun, Pronoun, Verb, Adjective, Adverb\n- Articles — A, An, The\n- Prepositions — In, On, At, To, With\n- Tenses — Present, Past, Future\n- Subject-Verb Agreement\n- Voice Change — Active and Passive Voice\n- Narration — Direct and Indirect Speech\n\nVocabulary (শব্দভাণ্ডাৰ):\n- Synonyms & Antonyms\n- One Word Substitution\n- Idioms & Phrases\n- Spotting Errors\n- Fill in the Blanks\n- Sentence Rearrangement",
        as: "ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ সাধাৰণ ইংৰাজীৰ শ্ৰেণী-ভিত্তিক পাঠ্যক্ৰম।\n\nGrammar (ব্যাকৰণ):\n- Parts of Speech — Noun, Pronoun, Verb, Adjective, Adverb\n- Articles — A, An, The\n- Prepositions — In, On, At, To, With\n- Tenses — Present, Past, Future\n- Subject-Verb Agreement\n- Voice Change — Active আৰু Passive Voice\n- Narration — Direct আৰু Indirect Speech\n\nVocabulary (শব্দভাণ্ডাৰ):\n- Synonyms & Antonyms (সমৰ্থক আৰু বিপৰীত শব্দ)\n- One Word Substitution (এটা শব্দত প্ৰকাশ)\n- Idioms & Phrases (বাক্যৰীতি আৰু খণ্ডবাক্য)\n- Spotting Errors (বাক্যৰ ভুল নিৰ্ণয়)\n- Fill in the Blanks (ৰিক্ত স্থান পূৰণ)\n- Sentence Rearrangement (বাক্য সজোৱা)",
      },
    },
    {
      title: { en: "General Knowledge & Assam GK", as: "সাধাৰণ জ্ঞান আৰু অসম সম্পৰ্কীয় তথ্য" },
      content: {
        en: "Category-wise syllabus for the ADRE 3.0 Grade III examination — General Knowledge and Assam GK.\n\nAssam's History & Culture:\n- Ancient Assam — Varman, Salastambha and Pala dynasties\n- Ahom era and the Koch kingdom\n- Yandabo Treaty and the beginning of British rule\n- Assam in the freedom struggle and the martyrs\n- Folk culture, Bihu, festivals and Satriya culture\n- Assamese literature — authors and their works\n\nAssam's Geography:\n- Brahmaputra and Barak rivers and their tributaries\n- National parks and wildlife sanctuaries\n- Natural resources — tea, petroleum and coal\n\nIndia General Knowledge:\n- Principal rivers, mountain ranges and states\n- Important days and dates\n- Awards and honours\n- Sports\n\nCurrent Affairs:\n- Assam and India current affairs of the last 6 to 12 months\n- Government schemes, especially the schemes of the Assam Government",
        as: "ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ সাধাৰণ জ্ঞান আৰু অসম সম্পৰ্কীয় তথ্যৰ শ্ৰেণী-ভিত্তিক পাঠ্যক্ৰম।\n\nঅসমৰ বুৰঞ্জী আৰু সংস্কৃতি:\n- প্ৰাচীন অসম — বৰ্মন, শালস্তম্ভ আৰু পাল বংশ\n- আহোম যুগ আৰু কোচ ৰাজ্য\n- য়াণ্ডাবু সন্ধি আৰু ব্ৰিটিছ শাসনৰ আৰম্ভণি\n- স্বাধীনতা সংগ্ৰামত অসম আৰু শ্বহীদসকল\n- লোক-সংস্কৃতি, বিহু, উৎসৱ-পাৰ্বণ আৰু সত্ৰীয়া সংস্কৃতি\n- অসমীয়া সাহিত্য — লেখক আৰু তেওঁলোকৰ গ্ৰন্থ\n\nঅসমৰ ভূগোল:\n- ব্ৰহ্মপুত্ৰ আৰু বৰাক নদী আৰু উপনৈসমূহ\n- ৰাষ্ট্ৰীয় উদ্যান আৰু অভয়াৰণ্যসমূহ\n- প্ৰাকৃতিক সম্পদ — চাহ, খনিজ তেল আৰু কয়লা\n\nভাৰতৰ সাধাৰণ জ্ঞান:\n- প্ৰধান নদ-নদী, পৰ্বতমালা আৰু ৰাজ্যসমূহ\n- উল্লেখযোগ্য দিন আৰু দিৱস\n- বঁটা আৰু সন্মান\n- খেল-ধেমালি\n\nসাম্প্ৰতিক ঘটনাৱলী:\n- বিগত ৬ ৰ পৰা ১২ মাহৰ অসম আৰু ভাৰতৰ গুৰুত্বপূৰ্ণ ঘটনাৱলী\n- চৰকাৰী আঁচনিসমূহ — বিশেষকৈ অসম চৰকাৰৰ আঁচনি",
      },
    },
    {
      title: { en: "Reasoning & Mental Ability", as: "যুক্তি আৰু বৌদ্ধিক ক্ষমতা" },
      content: {
        en: "Category-wise syllabus for the ADRE 3.0 Grade III examination — Reasoning and Mental Ability.\n\nVerbal Reasoning:\n- Number series and alphabet series\n- Alpha-numeric series\n- Alphabet test and word formation\n- Coding-decoding\n- Blood relations\n- Direction sense test\n- Analogy\n- Classification and odd one out\n- Ranking and order test\n- Word formation and dictionary order\n- Venn diagrams\n- Syllogism — statements and conclusions\n- Mathematical operations\n- Clock and calendar\n- Data sufficiency\n- Input-output and machine\n\nAnalytical & Critical Reasoning:\n- Seating arrangement\n- Complex puzzles\n- Inequality\n- Statement and conclusions\n- Statement and assumptions\n- Statement and arguments\n- Statement and course of action\n- Cause and effect\n- Assertion and reason\n- Decision making\n- Drawing inferences\n\nNon-Verbal Reasoning:\n- Figure series\n- Figure analogy\n- Figure classification\n- Mirror image and water image\n- Pattern completion\n- Embedded figures\n- Counting of figures\n- Paper folding and paper cutting\n- Cubes and dice\n- Figure matrix\n- Rule detection\n- Shape construction and grouping",
        as: "ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ যুক্তি আৰু বৌদ্ধিক ক্ষমতাৰ শ্ৰেণী-ভিত্তিক পাঠ্যক্ৰম।\n\nভাষিক যুক্তিতৰ্ক:\n- সংখ্যা আৰু বৰ্ণমালাৰ শৃংখলা\n- বৰ্ণ আৰু সংখ্যাৰ মিশ্ৰিত শৃংখলা (Alpha-Numeric Series)\n- বৰ্ণমালা পৰীক্ষা আৰু শব্দ গঠন\n- সংকেত নিৰ্ণয় (Coding-Decoding)\n- তেজৰ সম্পৰ্ক\n- দিশ আৰু দূৰত্ব নিৰ্ণয়\n- সাদৃশ্য (Analogy)\n- শ্ৰেণীবিভাজন আৰু অমিল নিৰ্ণয়\n- ক্ৰম আৰু স্থান নিৰ্ণয়\n- শব্দ গঠন আৰু অভিধানৰ ক্ৰম\n- ভেন ডায়াগ্ৰাম\n- বিবৃতি আৰু সিদ্ধান্ত (Syllogism)\n- গাণিতিক ক্ৰিয়া\n- ঘড়ী আৰু কেলেণ্ডাৰ\n- তথ্য পৰ্যাপ্ততা (Data Sufficiency)\n- ইনপুট-আউটপুট আৰু যন্ত্ৰ (Input-Output & Machine)\n\nবিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্ক:\n- বহাৰ বিন্যাস (Seating Arrangement)\n- জটিল পাজল (Complex Puzzles)\n- অসমতা (Inequality)\n- বিবৃতি আৰু সিদ্ধান্ত\n- বিবৃতি আৰু অনুমান (Statement & Assumptions)\n- বিবৃতি আৰু যুক্তি (Statement & Arguments)\n- বিবৃতি আৰু কাৰ্যপন্থা (Statement & Course of Action)\n- কাৰণ আৰু ফলাফল (Cause & Effect)\n- দাবী আৰু কাৰণ (Assertion & Reason)\n- সিদ্ধান্ত লোৱা (Decision Making)\n- সিদ্ধান্ত টনা (Drawing Inferences)\n\nঅ-ভাষিক যুক্তিতৰ্ক:\n- চিত্ৰ শৃংখলা\n- চিত্ৰ সাদৃশ্য\n- চিত্ৰ শ্ৰেণীবিভাজন\n- দাপোণ আৰু পানীৰ প্ৰতিবিম্ব\n- আৰ্হি পূৰণ\n- লুকুৱা চিত্ৰ (Embedded Figures)\n- চিত্ৰ গণনা\n- কাগজ ভাঁজ আৰু কটা\n- ঘনক আৰু পাশা\n- চিত্ৰ মেট্ৰিক্স (Figure Matrix)\n- নিয়ম নিৰ্ণয় (Rule Detection)\n- আকৃতি গঠন আৰু শ্ৰেণীবদ্ধকৰণ",
      },
    },
    {
      title: { en: "Social Studies", as: "সামাজিক বিজ্ঞান (Social Studies)" },
      content: {
        en: "Category-wise syllabus for the ADRE 3.0 Grade III examination — Social Studies.\n\nIndian History:\n- Ancient, medieval and modern India, and the key events of the freedom movement\n\nPolitical Science & Constitution:\n- Indian Constitution — preamble, fundamental rights and duties\n- President, Prime Minister, Governor and Chief Minister\n- Panchayati Raj system\n\nEconomy & Environment:\n- Basic foundations of the Indian and Assam economy — agriculture and industry\n- Environmental conservation and pollution awareness",
        as: "ADRE 3.0 গ্ৰেড III পৰীক্ষাৰ সামাজিক বিজ্ঞানৰ শ্ৰেণী-ভিত্তিক পাঠ্যক্ৰম।\n\nভাৰতৰ ইতিহাস:\n- প্ৰাচীন, মধ্যযুগ আৰু আধুনিক ভাৰত, আৰু স্বাধীনতা আন্দোলনৰ মূল পৰিঘটনা\n\nৰাজনীতি বিজ্ঞান আৰু সংবিধান:\n- ভাৰতীয় সংবিধান — প্ৰস্তাৱনা, মৌলিক অধিকাৰ আৰু কৰ্তব্য\n- ৰাষ্ট্ৰপতি, প্ৰধানমন্ত্ৰী, ৰাজপাল আৰু মুখ্যমন্ত্ৰী\n- পঞ্চায়তী ৰাজ ব্যৱস্থা\n\nঅৰ্থনীতি আৰু পৰিৱেশ:\n- ভাৰত আৰু অসমৰ অৰ্থনীতিৰ মূল ভিত্তি — কৃষি আৰু উদ্যোগ\n- পৰিৱেশ সংৰক্ষণ আৰু প্ৰদূষণ সম্পৰ্কীয় সজাগতা",
      },
    },
    {
      title: { en: "How to Prepare", as: "কেনেকৈ প্ৰস্তুতি ল'ব" },
      content: {
        en: "A simple plan that works for most aspirants.\n\n- First read the syllabus and understand the exam pattern\n- Practise General Mathematics and Reasoning daily with a timer\n- Revise Assam History, Geography and Culture every week\n- Read current affairs for the last 6 to 12 months\n- Write at least one full mock test every week\n- Review every wrong answer and note down the correct fact\n- Keep your documents and eligibility ready for the verification stage",
        as: "বেছিভাগ প্ৰাৰ্থীৰ বাবে কাম কৰা এটা সৰল পৰিকল্পনা।\n\n- প্ৰথমে পাঠ্যক্ৰম পঢ়ি পৰীক্ষাৰ ধৰণ বুজি লওক\n- প্ৰতিদিনে টাইমাৰ লগাই সাধাৰণ গণিত আৰু যুক্তি অনুশীলন কৰক\n- প্ৰতি সপ্তাহে অসমৰ ইতিহাস, ভূগোল আৰু সংস্কৃতি পুনৰালোচনা কৰক\n- যোৱা ৬ ৰ পৰা ১২ মাহৰ চলিত ঘটনাৱলী পঢ়ক\n- প্ৰতি সপ্তাহে অন্ততঃ এটা সম্পূৰ্ণ মক টেষ্ট লিখক\n- প্ৰতিটো ভুল উত্তৰ পৰীক্ষা কৰি শুদ্ধ তথ্য টুকি ৰাখক\n- যাচাইকৰণ পৰ্যায়ৰ বাবে নথি-পত্ৰ আৰু যোগ্যতা সাজু ৰাখক",
      },
    },
  ],
};

/* Per-topic study note injected as the crawler-facing article
   (<section class="section axo-extra-content" data-axo-extra="1">).
   Kept short, factual and unique to the topic so no two pages repeat. */
const NOTES = require("./adre-grade-3.notes.js");
const HISTORY_NOTES = require("./adre-grade-3.history-notes.js");
const ENGLISH_NOTES = require("./adre-grade-3.english-notes.js");

/* History and English topics carry a longer study article than the base NOTES,
   so the dedicated modules win wherever they define a key. */
const MERGED_NOTES = Object.assign({}, NOTES, HISTORY_NOTES, ENGLISH_NOTES);

module.exports = { EXAM, SYLLABUS, NOTES: MERGED_NOTES };
