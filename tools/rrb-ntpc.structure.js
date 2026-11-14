#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/rrb-ntpc.structure.js

   Source of truth for the "RRB NTPC" exam book that
   tools/build-rrb-ntpc.js writes into the repository.

   It mirrors the shape of data/exams/index.json (exam → section →
   sub-category → sub-sub-category) so the SPA renders the new book with
   no runtime change, and it mirrors the folder layout of
   data/exams/adre-grade-3 so every maintenance tool keeps working.

   The book is deliberately registered with status "coming-soon": the
   tree (sections and topics) is published now so the owner can keep
   dropping question files, while the /exams/ listing keeps showing the
   "Coming Soon" chip until the book is flipped to "available".

   The sample question banks live in tools/rrb-ntpc.questions.js.
   ============================================================ */

const EXAM = {
  id: "rrb-ntpc",
  title: { en: "RRB NTPC", as: "RRB NTPC" },
  subtitle: {
    en: "Railway Non-Technical Popular Categories — CBT-1 & CBT-2",
    as: "ৰে'লৱে অ-কাৰিকৰী জনপ্ৰিয় শ্ৰেণী — CBT-1 আৰু CBT-2",
  },
  note: {
    en: "Choose a subject, then a sub-category to practise question-wise MCQs.",
    as: "এখন বিষয় বাছনি কৰক, তাৰ পিছত উপ-শ্ৰেণী এটা বাছি প্ৰশ্নভিত্তিক MCQ অনুশীলন কৰক।",
  },
  cover: "/images/exams/rrb-ntpc-cover.webp",
  logo: "/images/exams/rrb-ntpc-logo.webp",
  logoAlt: {
    en: "RRB NTPC book cover thumbnail",
    as: "RRB NTPC কিতাপৰ বেটুপাতৰ থাম্বনেইল",
  },
  coverAlt: {
    en: "Indian Railways RRB NTPC Recruitment Exam — book front cover",
    as: "ভাৰতীয় ৰে'লৱে RRB NTPC নিযুক্তি পৰীক্ষা — কিতাপৰ বেটুপাত",
  },
  color: "#0ea5e9",
  icon: "NTPC",
  status: "coming-soon",
  sections: [
    {
      id: "syllabus",
      type: "syllabus",
      color: "#6366f1",
      title: { en: "Syllabus", as: "পাঠ্যক্ৰম" },
    },
    {
      id: "general-awareness",
      type: "qa",
      color: "#2563eb",
      title: { en: "General Awareness", as: "সাধাৰণ জ্ঞান" },
      subcategories: [
        {
          id: "general-science",
          title: { en: "General Science", as: "সাধাৰণ বিজ্ঞান" },
          subcategories: [
            { id: "biology", title: { en: "Biology", as: "জীৱবিজ্ঞান" } },
            { id: "physics", title: { en: "Physics", as: "পদাৰ্থবিজ্ঞান" } },
            { id: "chemistry", title: { en: "Chemistry", as: "ৰসায়নবিজ্ঞান" } },
          ],
        },
        {
          id: "history",
          title: { en: "History (General Studies)", as: "ইতিহাস (সাধাৰণ অধ্যয়ন)" },
          subcategories: [
            { id: "ancient-history", title: { en: "Ancient History", as: "প্ৰাচীন ইতিহাস" } },
            { id: "medieval-history", title: { en: "Medieval History", as: "মধ্যযুগৰ ইতিহাস" } },
            { id: "modern-history", title: { en: "Modern History", as: "আধুনিক ইতিহাস" } },
          ],
        },
        {
          id: "geography",
          title: { en: "Geography (General Studies)", as: "ভূগোল (সাধাৰণ অধ্যয়ন)" },
          subcategories: [
            { id: "indian-geography", title: { en: "Indian Geography", as: "ভাৰতৰ ভূগোল" } },
            { id: "world-geography", title: { en: "World Geography", as: "বিশ্বৰ ভূগোল" } },
          ],
        },
        {
          id: "polity",
          title: { en: "Polity (General Studies)", as: "ৰাজনীতি (সাধাৰণ অধ্যয়ন)" },
          subcategories: [
            { id: "constitution", title: { en: "Constitution & Fundamental Rights", as: "সংবিধান আৰু মৌলিক অধিকাৰ" } },
            { id: "governance", title: { en: "Union & State Governance", as: "কেন্দ্ৰ আৰু ৰাজ্য শাসন" } },
          ],
        },
        {
          id: "economy",
          title: { en: "Economy (General Studies)", as: "অৰ্থনীতি (সাধাৰণ অধ্যয়ন)" },
          subcategories: [
            { id: "indian-economy", title: { en: "Indian Economy", as: "ভাৰতৰ অৰ্থনীতি" } },
            { id: "assam-economy", title: { en: "Assam Economy", as: "অসমৰ অৰ্থনীতি" } },
          ],
        },
        {
          id: "static-gk-computers",
          title: { en: "Static GK & Basics of Computers", as: "স্থিৰ সাধাৰণ জ্ঞান আৰু কম্পিউটাৰৰ মৌলিক কথা" },
          subcategories: [
            { id: "art-culture", title: { en: "Art & Culture", as: "কলা আৰু সংস্কৃতি" } },
            { id: "organizations-institutions", title: { en: "Organizations & Institutions", as: "সংগঠন আৰু প্ৰতিষ্ঠান" } },
            { id: "space-defence", title: { en: "Space & Defence", as: "মহাকাশ আৰু প্ৰতিৰক্ষা" } },
            { id: "miscellaneous-static-gk", title: { en: "Miscellaneous Static GK", as: "বিবিধ স্থিৰ সাধাৰণ জ্ঞান" } },
            { id: "basic-computers", title: { en: "Basics of Computers", as: "কম্পিউটাৰৰ মৌলিক কথা" } },
          ],
        },
        {
          id: "current-affairs",
          title: { en: "Current Affairs (Last 10–12 Months)", as: "সাম্প্ৰতিক ঘটনা (শেষ ১০–১২ মাহ)" },
          subcategories: [
            { id: "national-international-news", title: { en: "National & International News", as: "ৰাষ্ট্ৰীয় আৰু আন্তৰ্জাতিক বাতৰি" } },
            { id: "appointments-obituaries", title: { en: "Appointments & Obituaries", as: "নিয়োগ আৰু মৃত্যু-বাতৰি" } },
            { id: "government-schemes-initiatives", title: { en: "Government Schemes & Initiatives", as: "চৰকাৰী আঁচনি আৰু পদক্ষেপ" } },
            { id: "sports", title: { en: "Sports", as: "ক্ৰীড়া" } },
            { id: "awards-books-indexes", title: { en: "Awards, Books & Indexes", as: "বঁটা, কিতাপ আৰু সূচক" } },
            { id: "science-tech-environment", title: { en: "Science, Tech & Environment", as: "বিজ্ঞান, প্ৰযুক্তি আৰু পৰিৱেশ" } },
          ],
        },
      ],
    },
    {
      id: "mathematics",
      type: "qa",
      color: "#f59e0b",
      title: { en: "Mathematics", as: "গণিত" },
      subcategories: [
        { id: "number-system", title: { en: "Number System", as: "সংখ্যা পদ্ধতি" } },
        { id: "simplification-bodmas", title: { en: "Simplification & BODMAS", as: "সৰলীকৰণ আৰু BODMAS" } },
        { id: "decimals-fractions", title: { en: "Decimals & Fractions", as: "দশমিক আৰু ভগ্নাংশ" } },
        { id: "surds-indices", title: { en: "Surds & Indices", as: "কৰণী আৰু সূচক" } },
        { id: "square-cube-root", title: { en: "Square Root & Cube Root", as: "বৰ্গমূল আৰু ঘনমূল" } },
        { id: "lcm-hcf", title: { en: "LCM & HCF", as: "ল.সা.গু. আৰু গ.সা.গু." } },
        { id: "percentage", title: { en: "Percentage", as: "শতাংশ" } },
        { id: "ratio-proportion", title: { en: "Ratio & Proportion", as: "অনুপাত আৰু সমানুপাত" } },
        { id: "partnership", title: { en: "Partnership", as: "অংশীদাৰিত্ব" } },
        { id: "average", title: { en: "Average", as: "গড়" } },
        { id: "problems-on-ages", title: { en: "Problems on Ages", as: "বয়সৰ সমস্যা" } },
        { id: "mixture-alligation", title: { en: "Mixture & Alligation", as: "মিশ্ৰণ আৰু সংযোগ" } },
        { id: "profit-loss-discount", title: { en: "Profit, Loss & Discount", as: "লাভ, লোকচান আৰু ৰেহাই" } },
        { id: "simple-interest", title: { en: "Simple Interest (SI)", as: "সৰল সুত (SI)" } },
        { id: "compound-interest", title: { en: "Compound Interest (CI)", as: "চক্ৰবৃদ্ধি সুত (CI)" } },
        { id: "time-work", title: { en: "Time & Work", as: "সময় আৰু কাৰ্য" } },
        { id: "work-wages", title: { en: "Work & Wages", as: "কাৰ্য আৰু মজুৰি" } },
        { id: "pipes-cisterns", title: { en: "Pipes & Cisterns", as: "নল আৰু চৌবাচ্চা" } },
        { id: "time-speed-distance", title: { en: "Time, Speed & Distance", as: "সময়, গতি আৰু দূৰত্ব" } },
        { id: "problems-on-trains", title: { en: "Problems on Trains", as: "ৰে'লগাড়ীৰ সমস্যা" } },
        { id: "boats-streams", title: { en: "Boats & Streams", as: "নাও আৰু সোঁত" } },
        { id: "race-circular-track", title: { en: "Race & Circular Track", as: "দৌৰ আৰু বৃত্তাকাৰ পথ" } },
        { id: "elementary-algebra", title: { en: "Elementary Algebra", as: "প্ৰাথমিক বীজগণিত" } },
        { id: "quadratic-linear-equations", title: { en: "Quadratic & Linear Equations", as: "দ্বিঘাত আৰু ৰৈখিক সমীকৰণ" } },
        { id: "mensuration-2d", title: { en: "Mensuration 2D (Area & Perimeter)", as: "পৰিমিতি ২D (কালি আৰু পৰিসীমা)" } },
        { id: "mensuration-3d", title: { en: "Mensuration 3D (Volume & Surface Area)", as: "পৰিমিতি ৩D (আয়তন আৰু পৃষ্ঠকালি)" } },
        { id: "geometry", title: { en: "Geometry (Lines, Angles, Triangles, Circles)", as: "জ্যামিতি (ৰেখা, কোণ, ত্ৰিভুজ, বৃত্ত)" } },
        { id: "coordinate-geometry", title: { en: "Coordinate Geometry (Basic)", as: "স্থানাংক জ্যামিতি (মৌলিক)" } },
        { id: "trigonometry", title: { en: "Trigonometry", as: "ত্ৰিকোণমিতি" } },
        { id: "height-distance", title: { en: "Height & Distance", as: "উচ্চতা আৰু দূৰত্ব" } },
        { id: "statistics", title: { en: "Statistics (Mean, Median, Mode, SD)", as: "পৰিসংখ্যা (মাধ্য, মধ্যমা, বহুলক, SD)" } },
        { id: "data-interpretation", title: { en: "Data Interpretation (Table, Bar, Pie, Line Graph)", as: "তথ্য বিশ্লেষণ (তালিকা, দণ্ড, পাই, ৰেখা লেখ)" } },
      ],
    },
    {
      id: "reasoning",
      type: "qa",
      color: "#8b5cf6",
      title: { en: "General Intelligence & Reasoning", as: "সাধাৰণ বুদ্ধি আৰু যুক্তিতৰ্ক" },
      subcategories: [
        {
          id: "verbal-reasoning",
          title: { en: "Verbal Reasoning", as: "ভাষিক যুক্তিতৰ্ক" },
          subcategories: [
            { id: "analogy", title: { en: "Analogy (Number, Letter & Word-based)", as: "সাদৃশ্য (সংখ্যা, আখৰ আৰু শব্দভিত্তিক)" } },
            { id: "classification-odd-one-out", title: { en: "Classification / Odd One Out", as: "শ্ৰেণীবিভাজন / আঁতৰ বস্তু" } },
            { id: "number-series", title: { en: "Number Series (Missing & Wrong Number)", as: "সংখ্যা শৃংখলা (অনুপস্থিত আৰু ভুল সংখ্যা)" } },
            { id: "alphabet-series", title: { en: "Alphabet Series & Alphanumeric Series", as: "আখৰ শৃংখলা আৰু আখৰ-সংখ্যা শৃংখলা" } },
            { id: "coding-decoding", title: { en: "Coding-Decoding", as: "সংকেতীকৰণ-অৱসংকেতীকৰণ" } },
            { id: "blood-relations", title: { en: "Blood Relations", as: "ৰক্তসম্পৰ্ক" } },
            { id: "direction-distance", title: { en: "Direction & Distance", as: "দিশ আৰু দূৰত্ব" } },
            { id: "order-ranking", title: { en: "Order & Ranking", as: "ক্ৰম আৰু স্থান" } },
            { id: "sitting-arrangement", title: { en: "Sitting Arrangement", as: "বহাৰ বিন্যাস" } },
            { id: "puzzles", title: { en: "Puzzles", as: "ধাঁধা" } },
            { id: "mathematical-operations", title: { en: "Mathematical Operations", as: "গাণিতিক ক্ৰিয়া" } },
            { id: "inequality", title: { en: "Inequality", as: "অসমতা" } },
            { id: "alphabet-test", title: { en: "Alphabet Test & Word Formation", as: "আখৰ পৰীক্ষা আৰু শব্দ গঠন" } },
            { id: "logical-sequence-words", title: { en: "Logical Sequence of Words & Dictionary Order", as: "শব্দৰ যুক্তিসঙ্গত ক্ৰম আৰু অভিধান ক্ৰম" } },
            { id: "clock-calendar", title: { en: "Clock & Calendar", as: "ঘড়ী আৰু পাঁজি" } },
            { id: "input-output", title: { en: "Input-Output (Machine Input)", as: "ইনপুট-আউটপুট (মেচিন ইনপুট)" } },
          ],
        },
        {
          id: "analytical-logical-reasoning",
          title: { en: "Analytical & Logical Reasoning", as: "বিশ্লেষণাত্মক আৰু যুক্তিভিত্তিক যুক্তিতৰ্ক" },
          subcategories: [
            { id: "syllogism", title: { en: "Syllogism", as: "ন্যাস" } },
            { id: "venn-diagrams", title: { en: "Venn Diagrams", as: "ভেন চিত্ৰ" } },
            { id: "statement-conclusions", title: { en: "Statement & Conclusions", as: "বিবৃতি আৰু সিদ্ধান্ত" } },
            { id: "statement-assumptions", title: { en: "Statement & Assumptions", as: "বিবৃতি আৰু ধাৰণা" } },
            { id: "statement-arguments", title: { en: "Statement & Arguments", as: "বিবৃতি আৰু যুক্তি" } },
            { id: "statement-course-of-action", title: { en: "Statement & Courses of Action", as: "বিবৃতি আৰু কাৰ্যপন্থা" } },
            { id: "cause-effect", title: { en: "Cause & Effect", as: "কাৰণ আৰু ফল" } },
            { id: "assertion-reason", title: { en: "Assertion & Reason", as: "দাবী আৰু কাৰণ" } },
            { id: "decision-making-data-sufficiency", title: { en: "Decision Making & Data Sufficiency", as: "সিদ্ধান্ত গ্ৰহণ আৰু তথ্য পৰ্যাপ্ততা" } },
          ],
        },
        {
          id: "non-verbal-reasoning",
          title: { en: "Non-Verbal Reasoning", as: "চিত্ৰভিত্তিক যুক্তিতৰ্ক" },
          subcategories: [
            { id: "counting-figures", title: { en: "Counting of Figures", as: "চিত্ৰ গণনা" } },
            { id: "mirror-water-image", title: { en: "Mirror Image & Water Image", as: "দাপোণৰ প্ৰতিবিম্ব আৰু পানীৰ প্ৰতিবিম্ব" } },
            { id: "paper-cutting-folding", title: { en: "Paper Cutting & Folding", as: "কাগজ কটা আৰু ভাঁজ" } },
            { id: "embedded-figures", title: { en: "Embedded / Hidden Figures", as: "সংযোজিত / লুকাই থকা চিত্ৰ" } },
            { id: "pattern-completion", title: { en: "Completion of Incomplete Pattern", as: "অসম্পূৰ্ণ আৰ্হি সম্পূৰ্ণ কৰা" } },
            { id: "figure-series", title: { en: "Figure Series & Analogy", as: "চিত্ৰ শৃংখলা আৰু সাদৃশ্য" } },
            { id: "cube-dice", title: { en: "Cube & Dice", as: "ঘনক আৰু লুডু" } },
          ],
        },
      ],
    },
  ],
};

const SYLLABUS = {
  id: "syllabus",
  type: "syllabus",
  title: { en: "RRB NTPC Syllabus", as: "RRB NTPC পাঠ্যক্ৰম" },
  description: {
    en: "Subject-wise syllabus and exam pattern for the Railway Recruitment Board Non-Technical Popular Categories (NTPC) Computer Based Tests (CBT-1 and CBT-2). Read it once, then open each subject to start preparing.",
    as: "ৰে'লৱে নিযুক্তি ব'ৰ্ডৰ অ-কাৰিকৰী জনপ্ৰিয় শ্ৰেণী (NTPC) কম্পিউটাৰ ভিত্তিক পৰীক্ষা (CBT-1 আৰু CBT-2) ৰ বিষয়-ভিত্তিক পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ। এবাৰ পঢ়ি লৈ, প্ৰস্তুতি আৰম্ভ কৰিবলৈ প্ৰতিটো বিষয় খোলক।",
  },
  chapters: [
    {
      title: { en: "General Awareness", as: "সাধাৰণ জ্ঞান" },
      content: {
        en: "General Awareness carries 40 questions in CBT-1 and 50 in CBT-2, drawn from current affairs and static general knowledge.\n\n- General Science — Biology, Physics and Chemistry at a school level\n- General Studies — History (ancient, medieval and modern), Geography (Indian and world), Polity and Economy\n- Static GK & Basics of Computers — art and culture, organizations, space and defence, miscellaneous static GK, computer fundamentals\n- Current Affairs — national and international news, appointments, government schemes, sports, awards and books, science, technology and environment of the last 10–12 months",
        as: "সাধাৰণ জ্ঞানে CBT-1 ত ৪০ টা আৰু CBT-2 ত ৫০ টা প্ৰশ্ন বহন কৰে, যি সাম্প্ৰতিক ঘটনা আৰু স্থিৰ সাধাৰণ জ্ঞানৰ পৰা লোৱা হয়।\n\n- সাধাৰণ বিজ্ঞান — বিদ্যালয় স্তৰৰ জীৱবিজ্ঞান, পদাৰ্থবিজ্ঞান আৰু ৰসায়নবিজ্ঞান\n- সাধাৰণ অধ্যয়ন — ইতিহাস (প্ৰাচীন, মধ্য আৰু আধুনিক), ভূগোল (ভাৰত আৰু বিশ্ব), ৰাজনীতি আৰু অৰ্থনীতি\n- স্থিৰ সাধাৰণ জ্ঞান আৰু কম্পিউটাৰৰ মৌলিক কথা — কলা-সংস্কৃতি, সংগঠন, মহাকাশ-প্ৰতিৰক্ষা, বিবিধ স্থিৰ সাধাৰণ জ্ঞান, কম্পিউটাৰৰ মৌলিক কথা\n- সাম্প্ৰতিক ঘটনা — শেষ ১০–১২ মাহৰ ৰাষ্ট্ৰীয়-আন্তৰ্জাতিক বাতৰি, নিয়োগ, চৰকাৰী আঁচনি, ক্ৰীড়া, বঁটা-কিতাপ, বিজ্ঞান-প্ৰযুক্তি আৰু পৰিৱেশ",
      },
    },
    {
      title: { en: "Mathematics", as: "গণিত" },
      content: {
        en: "Mathematics carries 30 questions in CBT-1 and 35 in CBT-2, covering arithmetic, advanced maths and data interpretation.\n\n- Number system, simplification and BODMAS, decimals, fractions, surds and indices, square and cube roots, LCM and HCF\n- Percentage, ratio and proportion, partnership, average, ages, mixture and alligation, profit, loss and discount\n- Simple and compound interest, time and work, work and wages, pipes and cisterns, time, speed and distance, trains, boats and streams, races\n- Elementary algebra, quadratic and linear equations, mensuration 2D and 3D, geometry, coordinate geometry, trigonometry, height and distance\n- Statistics and data interpretation (table, bar, pie and line graphs)",
        as: "গণিতে CBT-1 ত ৩০ টা আৰু CBT-2 ত ৩৫ টা প্ৰশ্ন থাকে, যি পাটিগণিত, উচ্চতৰ গণিত আৰু তথ্য বিশ্লেষণ সামৰি লয়।\n\n- সংখ্যা পদ্ধতি, সৰলীকৰণ আৰু BODMAS, দশমিক, ভগ্নাংশ, কৰণী আৰু সূচক, বৰ্গমূল আৰু ঘনমূল, ল.সা.গু. আৰু গ.সা.গু.\n- শতাংশ, অনুপাত আৰু সমানুপাত, অংশীদাৰিত্ব, গড়, বয়স, মিশ্ৰণ আৰু সংযোগ, লাভ, লোকচান আৰু ৰেহাই\n- সৰল আৰু চক্ৰবৃদ্ধি সুত, সময় আৰু কাৰ্য, কাৰ্য আৰু মজুৰি, নল আৰু চৌবাচ্চা, সময়, গতি আৰু দূৰত্ব, ৰে'লগাড়ী, নাও আৰু সোঁত, দৌৰ\n- প্ৰাথমিক বীজগণিত, দ্বিঘাত আৰু ৰৈখিক সমীকৰণ, পৰিমিতি ২D আৰু ৩D, জ্যামিতি, স্থানাংক জ্যামিতি, ত্ৰিকোণমিতি, উচ্চতা আৰু দূৰত্ব\n- পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ (তালিকা, দণ্ড, পাই আৰু ৰেখা লেখ)",
      },
    },
    {
      title: { en: "General Intelligence & Reasoning", as: "সাধাৰণ বুদ্ধি আৰু যুক্তিতৰ্ক" },
      content: {
        en: "Reasoning carries 30 questions in CBT-1 and 35 in CBT-2.\n\n- Verbal Reasoning — analogy, classification, number and alphabet series, coding-decoding, blood relations, direction and distance, order and ranking, sitting arrangement, puzzles, mathematical operations, inequality, alphabet test, logical sequence of words, clock and calendar, input-output\n- Analytical & Logical Reasoning — syllogism, Venn diagrams, statement and conclusions, assumptions, arguments, courses of action, cause and effect, assertion and reason, decision making and data sufficiency\n- Non-Verbal Reasoning — counting of figures, mirror and water image, paper cutting and folding, embedded figures, pattern completion, figure series and analogy, cubes and dice",
        as: "যুক্তিতৰ্কই CBT-1 ত ৩০ টা আৰু CBT-2 ত ৩৫ টা প্ৰশ্ন বহন কৰে।\n\n- ভাষিক যুক্তিতৰ্ক — সাদৃশ্য, শ্ৰেণীবিভাজন, সংখ্যা আৰু আখৰ শৃংখলা, সংকেতীকৰণ-অৱসংকেতীকৰণ, ৰক্তসম্পৰ্ক, দিশ আৰু দূৰত্ব, ক্ৰম আৰু স্থান, বহাৰ বিন্যাস, ধাঁধা, গাণিতিক ক্ৰিয়া, অসমতা, আখৰ পৰীক্ষা, শব্দৰ যুক্তিসঙ্গত ক্ৰম, ঘড়ী আৰু পাঁজি, ইনপুট-আউটপুট\n- বিশ্লেষণাত্মক আৰু যুক্তিভিত্তিক যুক্তিতৰ্ক — ন্যাস, ভেন চিত্ৰ, বিবৃতি আৰু সিদ্ধান্ত, ধাৰণা, যুক্তি, কাৰ্যপন্থা, কাৰণ আৰু ফল, দাবী আৰু কাৰণ, সিদ্ধান্ত গ্ৰহণ আৰু তথ্য পৰ্যাপ্ততা\n- চিত্ৰভিত্তিক যুক্তিতৰ্ক — চিত্ৰ গণনা, দাপোণ আৰু পানীৰ প্ৰতিবিম্ব, কাগজ কটা আৰু ভাঁজ, সংযোজিত চিত্ৰ, আৰ্হি সম্পূৰ্ণ কৰা, চিত্ৰ শৃংখলা আৰু সাদৃশ্য, ঘনক আৰু লুডু",
      },
    },
    {
      title: { en: "Exam Pattern & Marking", as: "পৰীক্ষাৰ ধৰণ আৰু নম্বৰ বিভাজন" },
      content: {
        en: "CBT-1 carries 100 questions of one mark each in 90 minutes: Mathematics 30, General Intelligence and Reasoning 30, General Awareness 40. A wrong answer carries a penalty of one-third of the marks allotted to that question.\n\nCBT-2 carries 120 questions in 90 minutes: Mathematics 35, General Intelligence and Reasoning 35, General Awareness 50. There is no sectional cut-off; candidates are shortlisted on the total score with the applicable normalisation across shifts.",
        as: "CBT-1 ত ৯০ মিনিটত এটা নম্বৰৰ ১০০ টা প্ৰশ্ন থাকে: গণিত ৩০, সাধাৰণ বুদ্ধি আৰু যুক্তিতৰ্ক ৩০, সাধাৰণ জ্ঞান ৪০। ভুল উত্তৰৰ বাবে সেই প্ৰশ্নৰ নম্বৰৰ এটা-তৃতীয়াংশ কটা যায়।\n\nCBT-2 ত ৯০ মিনিটত ১২০ টা প্ৰশ্ন থাকে: গণিত ৩৫, সাধাৰণ বুদ্ধি আৰু যুক্তিতৰ্ক ৩৫, সাধাৰণ জ্ঞান ৫০। শাখাভিত্তিক কাট-অফ নাথাকে; মুঠ নম্বৰৰ ভিত্তিত চিটপত্ৰ কৰা হয় আৰু বিভিন্ন শ্বিফ্টৰ মাজত স্বাভাৱিকীকৰণ প্ৰয়োগ হয়।",
      },
    },
  ],
};

module.exports = { EXAM, SYLLABUS };
