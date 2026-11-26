#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/dhs-dme-technical.structure.js

   Source of truth for the "DHS & DME Technical Grade III" exam book:
   the full A-to-Z syllabus tree (exam → section → sub-category → topic).

   The tree mirrors the shape of data/exams/index.json so the SPA renders
   it with no runtime change, and it mirrors the folder layout of
   data/exams/rrb-ntpc so every maintenance tool keeps working.

   Topics are written as [id, English title, Assamese title] to keep the
   file readable at ~170 topics. A leaf that carries a committed question
   bank is listed in tools/build-dhs-dme-technical.js BANKS; every other
   leaf is published with a "content is being prepared" placeholder.

   Sections follow the published paper: Technical / Science carries the
   bulk of the marks, then General Knowledge, General English, Numerical
   Aptitude and Reasoning.
   ============================================================ */

const t = (id, en, as) => ({ id, title: { en, as } });
const group = (id, en, as, children) => ({ id, title: { en, as }, subcategories: children });

const EXAM = {
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
  cover: "/images/exams/dhs-dme-technical-cover.webp",
  coverAlt: {
    en: "DHS DME Technical Grade III Exam 2026-2027 — Complete Preparation Guide cover",
    as: "DHS DME টেকনিকেল গ্ৰেড III পৰীক্ষা ২০২৬-২০২৭ — সম্পূৰ্ণ প্ৰস্তুতি নিৰ্দেশিকা বেটুপাত",
  },
  logo: "/images/exams/dhs-dme-logo.webp",
  logoAlt: { en: "DHS & DME official logo", as: "DHS আৰু DME চৰকাৰী ল'গ'" },
  color: "#059669",
  icon: "DHS",
  status: "available",
  sections: [
    {
      id: "syllabus",
      type: "syllabus",
      color: "#6366f1",
      title: { en: "Syllabus", as: "পাঠ্যক্ৰম" },
    },

    /* ---------------- 1. Technical / Science ---------------- */
    {
      id: "technical-science",
      type: "qa",
      color: "#10b981",
      title: { en: "Technical / Science", as: "কাৰিকৰী / বিজ্ঞান" },
      subcategories: [
        group("biology", "Biology & Human Body", "জীৱবিজ্ঞান আৰু মানৱ শৰীৰ", [
          t("cell-biology", "Cell Biology", "কোষ বিজ্ঞান"),
          t("genetics-evolution", "Genetics & Evolution", "বংশগতি আৰু বিৱৰ্তন"),
          t("human-anatomy", "Human Anatomy", "মানৱ শৰীৰস্থান"),
          t("human-physiology", "Human Physiology", "মানৱ শৰীৰবিজ্ঞান"),
          t("nutrition-vitamins", "Nutrition & Vitamins", "পুষ্টি আৰু ভিটামিন"),
          t("diseases-health", "Diseases & Health", "ৰোগ আৰু স্বাস্থ্য"),
          t("plant-botany", "Plant Science (Botany)", "উদ্ভিদ বিজ্ঞান"),
          t("animal-zoology", "Animal Science (Zoology)", "প্ৰাণীবিজ্ঞান"),
          t("ecology-environment", "Ecology & Environment", "পৰিৱেশ বিজ্ঞান"),
          t("microbiology-biotechnology", "Microbiology & Biotechnology", "অণুজীৱ আৰু জৈৱপ্ৰযুক্তি"),
          t("general-biology", "General Biology (Mixed Practice)", "সাধাৰণ জীৱবিজ্ঞান (মিশ্ৰ অনুশীলন)"),
        ]),
        group("chemistry", "Chemistry", "ৰসায়ন বিজ্ঞান", [
          t("atomic-structure", "Atomic Structure", "পাৰমাণৱিক গঠন"),
          t("periodic-table", "Periodic Table & Periodicity", "পৰ্যায় সাৰণি আৰু পৰ্যায়বৃত্তি"),
          t("chemical-bonding", "Chemical Bonding", "ৰাসায়নিক বন্ধন"),
          t("acids-bases-salts", "Acids, Bases & Salts", "অম্ল, ক্ষাৰক আৰু লৱণ"),
          t("metals-nonmetals", "Metals & Non-Metals", "ধাতু আৰু অধাতু"),
          t("organic-chemistry", "Organic Chemistry", "জৈৱ ৰসায়ন"),
          t("polymers-materials", "Polymers & Materials", "বহুলক আৰু পদাৰ্থ"),
          t("fuels-combustion", "Fuels & Combustion", "ইন্ধন আৰু দহন"),
          t("water-solutions", "Water & Solutions", "পানী আৰু দ্ৰৱ"),
          t("chemical-reactions", "Chemical Reactions", "ৰাসায়নিক বিক্ৰিয়া"),
          t("everyday-chemistry", "Chemistry in Everyday Life", "দৈনন্দিন জীৱনত ৰসায়ন"),
          t("general-chemistry", "General Chemistry (Mixed Practice)", "সাধাৰণ ৰসায়ন (মিশ্ৰ অনুশীলন)"),
        ]),
        group("physics", "Physics", "পদাৰ্থ বিজ্ঞান", [
          t("units-measurement", "Units & Measurement", "একক আৰু জোখ-মাখ"),
          t("motion-force", "Motion & Force", "গতি আৰু বল"),
          t("work-energy-power", "Work, Energy & Power", "কাৰ্য, শক্তি আৰু ক্ষমতা"),
          t("gravitation", "Gravitation", "মহাকৰ্ষণ"),
          t("heat-thermodynamics", "Heat & Thermodynamics", "তাপ আৰু তাপগতিবিজ্ঞান"),
          t("sound-waves", "Sound & Waves", "শব্দ আৰু তৰংগ"),
          t("light-optics", "Light & Optics", "পোহৰ আৰু আলোকবিজ্ঞান"),
          t("electricity-magnetism", "Electricity & Magnetism", "বিদ্যুৎ আৰু চুম্বকত্ব"),
          t("modern-nuclear-physics", "Modern & Nuclear Physics", "আধুনিক আৰু কেন্দ্ৰীয় পদাৰ্থবিজ্ঞান"),
          t("pressure-fluids", "Pressure & Fluids", "চাপ আৰু তৰল"),
          t("simple-machines", "Simple Machines & Instruments", "সৰল যন্ত্ৰ আৰু যন্ত্ৰপাতি"),
          t("general-physics", "General Physics (Mixed Practice)", "সাধাৰণ পদাৰ্থবিজ্ঞান (মিশ্ৰ অনুশীলন)"),
        ]),
        group("nursing-paramedical", "Nursing & Paramedical", "নাৰ্ছিং আৰু পেৰামেডিকেল", [
          t("fundamentals-nursing", "Fundamentals of Nursing", "নাৰ্ছিংৰ মৌলিক কথা"),
          t("community-health-nursing", "Community Health Nursing", "সমাজ স্বাস্থ্য নাৰ্ছিং"),
          t("medical-surgical-nursing", "Medical-Surgical Nursing", "চিকিৎসা-শল্য নাৰ্ছিং"),
          t("maternal-child-health", "Maternal & Child Health", "মাতৃ আৰু শিশু স্বাস্থ্য"),
          t("pharmacology", "Pharmacology & Drugs", "ঔষধবিজ্ঞান আৰু ঔষধ"),
          t("lab-technology", "Laboratory Technology", "লেবৰেটৰী প্ৰযুক্তি"),
          t("radiography-imaging", "Radiography & Imaging", "ৰেডিঅ'গ্ৰাফী আৰু ইমেজিং"),
          t("physiotherapy-rehabilitation", "Physiotherapy & Rehabilitation", "ফিজিঅ'থেৰাপী আৰু পুনৰ্বাসন"),
          t("hospital-infection-control", "Hospital Infection Control", "চিকিৎসালয়ৰ সংক্ৰমণ নিয়ন্ত্ৰণ"),
          t("first-aid-emergency", "First Aid & Emergency Care", "প্ৰাথমিক চিকিৎসা আৰু জৰুৰীকালীন সেৱা"),
          t("medical-terminology", "Medical Terminology", "চিকিৎসা পৰিভাষা"),
          t("health-programmes-assam", "Health Programmes & Assam Health System", "স্বাস্থ্য আঁচনি আৰু অসমৰ স্বাস্থ্য ব্যৱস্থা"),
        ]),
        group("computer-awareness", "Computer Awareness", "কম্পিউটাৰ সজাগতা", [
          t("computer-fundamentals", "Computer Fundamentals", "কম্পিউটাৰৰ মৌলিক কথা"),
          t("hardware-software", "Hardware & Software", "হাৰ্ডৱেৰ আৰু ছফ্টৱেৰ"),
          t("ms-office", "MS Office Suite", "MS Office ছুইট"),
          t("networking-internet", "Networking & Internet", "নেটৱৰ্কিং আৰু ইণ্টাৰনেট"),
          t("cyber-security", "Cyber Security", "চাইবাৰ সুৰক্ষা"),
          t("dbms-number-system", "DBMS & Number System", "DBMS আৰু সংখ্যা পদ্ধতি"),
        ]),
      ],
    },

    /* ---------------- 2. General Knowledge & Current Affairs ---------------- */
    {
      id: "general-knowledge",
      type: "qa",
      color: "#0ea5e9",
      title: { en: "General Knowledge & Current Affairs", as: "সাধাৰণ জ্ঞান আৰু সাম্প্ৰতিক ঘটনাৱলী" },
      subcategories: [
        group("assam-history", "Assam History", "অসমৰ ইতিহাস", [
          t("assam-history-ancient", "Ancient Assam History", "প্ৰাচীন অসমৰ ইতিহাস"),
          t("assam-history-medieval", "Medieval Assam History", "মধ্যযুগীয় অসমৰ ইতিহাস"),
          t("assam-history-modern", "Modern Assam History", "আধুনিক অসমৰ ইতিহাস"),
        ]),
        group("geography", "Geography", "ভূগোল", [
          t("assam-geography", "Assam Geography", "অসমৰ ভূগোল"),
          t("india-geography", "India Geography", "ভাৰতৰ ভূগোল"),
        ]),
        t("polity", "Indian Polity & Constitution", "ভাৰতৰ ৰাজনীতি আৰু সংবিধান"),
        group("assam-gk", "Assam Specific", "অসম বিষয়ক", [
          t("assam-culture-festivals", "Assam Culture & Festivals", "অসমৰ সংস্কৃতি আৰু উৎসৱ"),
          t("assam-economy", "Assam Economy", "অসমৰ অৰ্থনীতি"),
          t("assam-tribes-communities", "Assam Tribes & Communities", "অসমৰ জনজাতি আৰু সম্প্ৰদায়"),
          t("assam-wildlife-environment", "Assam Wildlife & Environment", "অসমৰ বন্যপ্ৰাণী আৰু পৰিৱেশ"),
          t("assam-current-affairs", "Assam Current Affairs", "অসমৰ সাম্প্ৰতিক ঘটনাৱলী"),
        ]),
        group("india-gk", "India & National", "ভাৰত আৰু ৰাষ্ট্ৰীয়", [
          t("indian-history", "Indian History", "ভাৰতৰ ইতিহাস"),
          t("indian-economy", "Indian Economy", "ভাৰতৰ অৰ্থনীতি"),
          t("indian-art-culture", "Indian Art & Culture", "ভাৰতৰ কলা আৰু সংস্কৃতি"),
          t("indian-governance", "Indian Governance & Institutions", "ভাৰতৰ শাসন আৰু প্ৰতিষ্ঠান"),
        ]),
        group("world-gk", "World & International", "বিশ্ব আৰু আন্তৰ্জাতিক", [
          t("world-geography", "World Geography", "বিশ্বৰ ভূগোল"),
          t("world-history", "World History", "বিশ্বৰ ইতিহাস"),
          t("international-organizations", "International Organizations", "আন্তৰ্জাতিক সংগঠন"),
        ]),
        group("static-gk", "Static GK", "স্থিৰ সাধাৰণ জ্ঞান", [
          t("awards-honours", "Awards & Honours", "বঁটা আৰু সন্মান"),
          t("books-authors", "Books & Authors", "কিতাপ আৰু লেখক"),
          t("important-days", "Important Days & Dates", "গুৰুত্বপূৰ্ণ দিন আৰু তাৰিখ"),
          t("sports-games", "Sports & Games", "ক্ৰীড়া আৰু খেল"),
          t("inventions-discoveries", "Inventions & Discoveries", "আৱিষ্কাৰ আৰু উদ্ভাৱন"),
          t("organizations-institutions", "Organizations & Institutions", "সংগঠন আৰু প্ৰতিষ্ঠান"),
          t("space-defence", "Space & Defence", "মহাকাশ আৰু প্ৰতিৰক্ষা"),
          t("miscellaneous-static-gk", "Miscellaneous Static GK", "বিবিধ স্থিৰ সাধাৰণ জ্ঞান"),
        ]),
        group("current-affairs", "Current Affairs", "সাম্প্ৰতিক ঘটনাৱলী", [
          t("national-international-news", "National & International News", "ৰাষ্ট্ৰীয় আৰু আন্তৰ্জাতিক বাতৰি"),
          t("appointments-obituaries", "Appointments & Obituaries", "নিয়োগ আৰু মৃত্যু-বাতৰি"),
          t("government-schemes", "Government Schemes & Initiatives", "চৰকাৰী আঁচনি আৰু পদক্ষেপ"),
          t("science-tech-environment", "Science, Tech & Environment", "বিজ্ঞান, প্ৰযুক্তি আৰু পৰিৱেশ"),
        ]),
      ],
    },

    /* ---------------- 3. General English ---------------- */
    {
      id: "general-english",
      type: "qa",
      color: "#0d9488",
      title: { en: "General English", as: "সাধাৰণ ইংৰাজী" },
      subcategories: [
        group("grammar", "Grammar", "ব্যাকৰণ", [
          t("parts-of-speech", "Parts of Speech", "শব্দৰ ভাগ"),
          t("articles-determiners", "Articles & Determiners", "Articles আৰু Determiners"),
          t("prepositions", "Prepositions", "পদান্বয়ী অব্যয়"),
          t("tenses", "Tenses", "কাল"),
          t("subject-verb-agreement", "Subject-Verb Agreement", "কৰ্তা-ক্ৰিয়াৰ মিল"),
          t("voice", "Active & Passive Voice", "কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য"),
          t("narration", "Direct & Indirect Speech", "প্ৰত্যক্ষ আৰু পৰোক্ষ উক্তি"),
          t("sentence-correction", "Sentence Correction & Error Detection", "বাক্য শুধৰণি আৰু ভুল ধৰা"),
          t("degrees-of-comparison", "Degrees of Comparison", "তুলনাৰ মাত্ৰা"),
          t("question-tags-modals", "Question Tags & Modals", "Question Tag আৰু Modal"),
          t("conjunctions", "Conjunctions", "সংযোজক অব্যয়"),
          t("non-finite-verbs", "Non-Finite Verbs", "অসমাপিকা ক্ৰিয়া"),
          t("general-grammar", "General Grammar (Mixed Practice)", "সাধাৰণ ব্যাকৰণ (মিশ্ৰ অনুশীলন)"),
        ]),
        group("vocabulary", "Vocabulary", "শব্দভাণ্ডাৰ", [
          t("synonyms", "Synonyms", "সমাৰ্থক শব্দ"),
          t("antonyms", "Antonyms", "বিপৰীত শব্দ"),
          t("one-word-substitution", "One Word Substitution", "এক শব্দ প্ৰতিস্থাপন"),
          t("idioms-phrases", "Idioms & Phrases", "বাগধাৰা আৰু বাক্যাংশ"),
          t("phrasal-verbs", "Phrasal Verbs", "Phrasal Verb"),
          t("spelling", "Spelling & Word Usage", "বানান আৰু শব্দ প্ৰয়োগ"),
          t("word-formation-roots", "Word Formation & Roots", "শব্দ গঠন আৰু মূল"),
          t("homonyms-confusables", "Homonyms & Confusables", "সমোচ্চাৰিত শব্দ"),
          t("general-vocabulary", "General Vocabulary (Mixed Practice)", "সাধাৰণ শব্দভাণ্ডাৰ (মিশ্ৰ অনুশীলন)"),
        ]),
        group("comprehension-usage", "Comprehension & Usage", "বোধশক্তি আৰু প্ৰয়োগ", [
          t("reading-comprehension", "Reading Comprehension", "পঢ়ি বুজাৰ ক্ষমতা"),
          t("cloze-test", "Cloze Test", "Cloze Test"),
          t("sentence-completion", "Sentence Completion", "বাক্য সম্পূৰ্ণ কৰা"),
          t("paragraph-ordering", "Paragraph Ordering", "অনুচ্ছেদ সজোৱা"),
          t("precis-summary", "Precis & Summary Writing", "সাৰাংশ লিখা"),
        ]),
      ],
    },

    /* ---------------- 4. Numerical Aptitude ---------------- */
    {
      id: "numerical-aptitude",
      type: "qa",
      color: "#f59e0b",
      title: { en: "Numerical Aptitude / General Mathematics", as: "সংখ্যাগত দক্ষতা / সাধাৰণ গণিত" },
      subcategories: [
        group("arithmetic", "Arithmetic", "পাটিগণিত", [
          t("number-system", "Number System", "সংখ্যা পদ্ধতি"),
          t("simplification-bodmas", "Simplification & BODMAS", "সৰলীকৰণ আৰু BODMAS"),
          t("decimals-fractions", "Decimals & Fractions", "দশমিক আৰু ভগ্নাংশ"),
          t("lcm-hcf", "LCM & HCF", "ল.সা.গু. আৰু গ.সা.গু."),
          t("percentage", "Percentage", "শতাংশ"),
          t("ratio-proportion", "Ratio & Proportion", "অনুপাত আৰু সমানুপাত"),
          t("average", "Average", "গড়"),
          t("profit-loss-discount", "Profit, Loss & Discount", "লাভ, লোকচান আৰু ৰেহাই"),
          t("simple-interest", "Simple Interest", "সৰল সুত"),
          t("compound-interest", "Compound Interest", "চক্ৰবৃদ্ধি সুত"),
          t("partnership", "Partnership", "অংশীদাৰিত্ব"),
          t("mixture-alligation", "Mixture & Alligation", "মিশ্ৰণ আৰু সংযোগ"),
          t("time-work", "Time & Work", "সময় আৰু কাৰ্য"),
          t("pipes-cisterns", "Pipes & Cisterns", "নল আৰু চৌবাচ্চা"),
          t("time-speed-distance", "Time, Speed & Distance", "সময়, গতি আৰু দূৰত্ব"),
          t("problems-on-trains", "Problems on Trains", "ৰে'লগাড়ীৰ সমস্যা"),
          t("boats-streams", "Boats & Streams", "নাও আৰু সোঁত"),
          t("problems-on-ages", "Problems on Ages", "বয়সৰ সমস্যা"),
        ]),
        group("algebra-geometry", "Algebra, Geometry & Mensuration", "বীজগণিত, জ্যামিতি আৰু পৰিমিতি", [
          t("elementary-algebra", "Elementary Algebra", "প্ৰাথমিক বীজগণিত"),
          t("quadratic-linear-equations", "Quadratic & Linear Equations", "দ্বিঘাত আৰু ৰৈখিক সমীকৰণ"),
          t("geometry", "Geometry", "জ্যামিতি"),
          t("mensuration-2d", "Mensuration 2D", "পৰিমিতি ২D"),
          t("mensuration-3d", "Mensuration 3D", "পৰিমিতি ৩D"),
          t("trigonometry", "Trigonometry", "ত্ৰিকোণমিতি"),
          t("height-distance", "Height & Distance", "উচ্চতা আৰু দূৰত্ব"),
          t("coordinate-geometry", "Coordinate Geometry", "স্থানাংক জ্যামিতি"),
        ]),
        group("data-combinatorics", "Data & Combinatorics", "তথ্য আৰু সমাবেশ", [
          t("statistics", "Statistics", "পৰিসংখ্যা"),
          t("data-interpretation", "Data Interpretation", "তথ্য বিশ্লেষণ"),
          t("permutation-combination", "Permutation & Combination", "বিন্যাস আৰু সমাবেশ"),
          t("probability", "Probability", "সম্ভাৱনা"),
        ]),
      ],
    },

    /* ---------------- 5. Reasoning Ability ---------------- */
    {
      id: "logical-reasoning",
      type: "qa",
      color: "#8b5cf6",
      title: { en: "Reasoning & Mental Ability", as: "তৰ্কশক্তি আৰু মানসিক দক্ষতা" },
      subcategories: [
        group("verbal-reasoning", "Verbal Reasoning", "ভাষিক যুক্তিতৰ্ক", [
          t("analogy", "Analogy", "সাদৃশ্য"),
          t("classification-odd-one-out", "Classification / Odd One Out", "শ্ৰেণীবিভাজন / আঁতৰ বস্তু"),
          t("number-series", "Number Series", "সংখ্যা শৃংখলা"),
          t("alphabet-series", "Alphabet & Alphanumeric Series", "আখৰ আৰু আখৰ-সংখ্যা শৃংখলা"),
          t("coding-decoding", "Coding-Decoding", "সংকেতীকৰণ-অৱসংকেতীকৰণ"),
          t("blood-relations", "Blood Relations", "ৰক্তসম্পৰ্ক"),
          t("direction-distance", "Direction & Distance", "দিশ আৰু দূৰত্ব"),
          t("order-ranking", "Order & Ranking", "ক্ৰম আৰু স্থান"),
          t("alphabet-test-word-formation", "Alphabet Test & Word Formation", "আখৰ পৰীক্ষা আৰু শব্দ গঠন"),
          t("logical-sequence-words", "Logical Sequence of Words", "শব্দৰ যুক্তিসঙ্গত ক্ৰম"),
          t("clock-calendar", "Clock & Calendar", "ঘড়ী আৰু পাঁজি"),
          t("mathematical-operations", "Mathematical Operations", "গাণিতিক ক্ৰিয়া"),
          t("input-output", "Input-Output", "ইনপুট-আউটপুট"),
          t("general-verbal-reasoning", "General Verbal Reasoning (Mixed Practice)", "সাধাৰণ ভাষিক যুক্তিতৰ্ক (মিশ্ৰ অনুশীলন)"),
        ]),
        group("analytical-critical-reasoning", "Analytical & Critical Reasoning", "বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্ক", [
          t("syllogism", "Syllogism", "ন্যায়বাক্য"),
          t("venn-diagrams", "Venn Diagrams", "ভেন চিত্ৰ"),
          t("statement-conclusions", "Statement & Conclusions", "বিবৃতি আৰু সিদ্ধান্ত"),
          t("statement-assumptions", "Statement & Assumptions", "বিবৃতি আৰু ধাৰণা"),
          t("statement-arguments", "Statement & Arguments", "বিবৃতি আৰু যুক্তি"),
          t("statement-course-of-action", "Statement & Courses of Action", "বিবৃতি আৰু কাৰ্যপন্থা"),
          t("cause-effect", "Cause & Effect", "কাৰণ আৰু ফল"),
          t("assertion-reason", "Assertion & Reason", "দাবী আৰু কাৰণ"),
          t("decision-making-data-sufficiency", "Decision Making & Data Sufficiency", "সিদ্ধান্ত গ্ৰহণ আৰু তথ্য পৰ্যাপ্ততা"),
          t("sitting-arrangement", "Seating Arrangement", "বহাৰ বিন্যাস"),
          t("puzzles", "Puzzles", "ধাঁধা"),
          t("inequality", "Inequality", "অসমতা"),
        ]),
        group("non-verbal-reasoning", "Non-Verbal Reasoning", "চিত্ৰভিত্তিক যুক্তিতৰ্ক", [
          t("figure-series", "Figure Series", "চিত্ৰ শৃংখলা"),
          t("figure-analogy-classification", "Figure Analogy & Classification", "চিত্ৰ সাদৃশ্য আৰু শ্ৰেণীবিভাজন"),
          t("mirror-water-image", "Mirror & Water Image", "দাপোণ আৰু পানীৰ প্ৰতিবিম্ব"),
          t("paper-cutting-folding", "Paper Cutting & Folding", "কাগজ কটা আৰু ভাঁজ"),
          t("embedded-figures", "Embedded / Hidden Figures", "সংযোজিত / লুকাই থকা চিত্ৰ"),
          t("pattern-completion", "Pattern Completion", "আৰ্হি সম্পূৰ্ণ কৰা"),
          t("counting-figures", "Counting of Figures", "চিত্ৰ গণনা"),
          t("cube-dice", "Cube & Dice", "ঘনক আৰু লুডু"),
          t("visual-memory", "Visual Memory & Rule Detection", "দৃশ্যমান স্মৃতি আৰু নিয়ম চিনাক্তকৰণ"),
          t("general-non-verbal-reasoning", "General Non-Verbal Reasoning (Mixed Practice)", "সাধাৰণ চিত্ৰভিত্তিক যুক্তিতৰ্ক (মিশ্ৰ অনুশীলন)"),
        ]),
      ],
    },
  ],
};

const SYLLABUS = {
  id: "syllabus",
  type: "syllabus",
  title: {
    en: "DHS & DME Technical Grade III Syllabus",
    as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III পাঠ্যক্ৰম",
  },
  description: {
    en: "Complete subject-wise syllabus and exam pattern for the DHS and DME Grade III Technical recruitment examination (Staff Nurse, Laboratory Technician, Pharmacist, Radiographer and similar posts). Read it once, then open each subject to start preparing.",
    as: "DHS আৰু DME গ্ৰেড III কাৰিকৰী নিযুক্তি পৰীক্ষাৰ (ষ্টাফ নাৰ্ছ, লেবৰেটৰী টেকনিচিয়ান, ফাৰ্মাচিষ্ট, ৰেডিঅ'গ্ৰাফাৰ আৰু একে ধৰণৰ পদ) বাবে বিষয়-ভিত্তিক সম্পূৰ্ণ পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ। এবাৰ পঢ়ি লৈ, প্ৰস্তুতি আৰম্ভ কৰিবলৈ প্ৰতিটো বিষয় খোলক।",
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
        en: "Biology and the human body (anatomy, physiology, health and disease), chemistry and physics at a diploma or degree standard. For nursing and paramedical posts, human biology carries the greatest weight.\n\n- Biology and Human Body — cell biology, genetics and evolution, human anatomy, human physiology, nutrition and vitamins, diseases and health, plant science, animal science, ecology and environment, microbiology and biotechnology\n- Chemistry — atomic structure, periodic table, chemical bonding, acids, bases and salts, metals and non-metals, organic chemistry, polymers and materials, fuels and combustion, water and solutions, chemical reactions, chemistry in everyday life\n- Physics — units and measurement, motion and force, work, energy and power, gravitation, heat and thermodynamics, sound and waves, light and optics, electricity and magnetism, modern and nuclear physics, pressure and fluids, simple machines and instruments\n- Nursing and Paramedical — fundamentals of nursing, community health nursing, medical-surgical nursing, maternal and child health, pharmacology, laboratory technology, radiography and imaging, physiotherapy and rehabilitation, hospital infection control, first aid and emergency care, medical terminology, health programmes and the Assam health system\n- Computer Awareness — computer fundamentals, hardware and software, MS Office, networking and the internet, cyber security, DBMS and number system",
        as: "জীৱ বিজ্ঞান আৰু মানৱ শৰীৰ (শৰীৰস্থান, শৰীৰবিজ্ঞান, স্বাস্থ্য আৰু ৰোগ), ৰসায়ন বিজ্ঞান আৰু পদাৰ্থ বিজ্ঞান — ডিপ্লমা বা ডিগ্ৰী স্তৰত। নাৰ্ছিং আৰু পেৰামেডিকেল পদৰ বাবে মানৱ জীৱবিজ্ঞানৰ ওজন আটাইতকৈ বেছি।\n\n- জীৱবিজ্ঞান আৰু মানৱ শৰীৰ — কোষ বিজ্ঞান, বংশগতি আৰু বিৱৰ্তন, মানৱ শৰীৰস্থান, মানৱ শৰীৰবিজ্ঞান, পুষ্টি আৰু ভিটামিন, ৰোগ আৰু স্বাস্থ্য, উদ্ভিদ বিজ্ঞান, প্ৰাণীবিজ্ঞান, পৰিৱেশ বিজ্ঞান, অণুজীৱ আৰু জৈৱপ্ৰযুক্তি\n- ৰসায়ন বিজ্ঞান — পাৰমাণৱিক গঠন, পৰ্যায় সাৰণি, ৰাসায়নিক বন্ধন, অম্ল, ক্ষাৰক আৰু লৱণ, ধাতু আৰু অধাতু, জৈৱ ৰসায়ন, বহুলক আৰু পদাৰ্থ, ইন্ধন আৰু দহন, পানী আৰু দ্ৰৱ, ৰাসায়নিক বিক্ৰিয়া, দৈনন্দিন জীৱনত ৰসায়ন\n- পদাৰ্থ বিজ্ঞান — একক আৰু জোখ-মাখ, গতি আৰু বল, কাৰ্য, শক্তি আৰু ক্ষমতা, মহাকৰ্ষণ, তাপ আৰু তাপগতিবিজ্ঞান, শব্দ আৰু তৰংগ, পোহৰ আৰু আলোকবিজ্ঞান, বিদ্যুৎ আৰু চুম্বকত্ব, আধুনিক আৰু কেন্দ্ৰীয় পদাৰ্থবিজ্ঞান, চাপ আৰু তৰল, সৰল যন্ত্ৰ আৰু যন্ত্ৰপাতি\n- নাৰ্ছিং আৰু পেৰামেডিকেল — নাৰ্ছিংৰ মৌলিক কথা, সমাজ স্বাস্থ্য নাৰ্ছিং, চিকিৎসা-শল্য নাৰ্ছিং, মাতৃ আৰু শিশু স্বাস্থ্য, ঔষধবিজ্ঞান, লেবৰেটৰী প্ৰযুক্তি, ৰেডিঅ'গ্ৰাফী আৰু ইমেজিং, ফিজিঅ'থেৰাপী আৰু পুনৰ্বাসন, চিকিৎসালয়ৰ সংক্ৰমণ নিয়ন্ত্ৰণ, প্ৰাথমিক চিকিৎসা আৰু জৰুৰীকালীন সেৱা, চিকিৎসা পৰিভাষা, স্বাস্থ্য আঁচনি আৰু অসমৰ স্বাস্থ্য ব্যৱস্থা\n- কম্পিউটাৰ সজাগতা — কম্পিউটাৰৰ মৌলিক কথা, হাৰ্ডৱেৰ আৰু ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা পদ্ধতি",
      },
    },
    {
      title: { en: "General Knowledge & Current Affairs", as: "সাধাৰণ জ্ঞান আৰু সাম্প্ৰতিক ঘটনাৱলী" },
      content: {
        en: "Assam history and geography, Indian polity and the Constitution, and current affairs of national and state importance.\n\n- Assam Specific — history, geography, culture and festivals, economy, tribes and communities, wildlife and environment, current affairs\n- India and National — Indian history, economy, art and culture, governance and institutions\n- World and International — world geography, world history, international organizations\n- Static GK — awards and honours, books and authors, important days, sports, inventions and discoveries, organizations and institutions, space and defence, miscellaneous static GK\n- Current Affairs — national and international news, appointments and obituaries, government schemes, science, technology and environment",
        as: "অসমৰ ইতিহাস আৰু ভূগোল, ভাৰতৰ ৰাজনীতি আৰু সংবিধান, আৰু ৰাষ্ট্ৰীয় তথা ৰাজ্যিক গুৰুত্বৰ সাম্প্ৰতিক ঘটনাৱলী।\n\n- অসম বিষয়ক — ইতিহাস, ভূগোল, সংস্কৃতি আৰু উৎসৱ, অৰ্থনীতি, জনজাতি আৰু সম্প্ৰদায়, বন্যপ্ৰাণী আৰু পৰিৱেশ, সাম্প্ৰতিক ঘটনাৱলী\n- ভাৰত আৰু ৰাষ্ট্ৰীয় — ভাৰতৰ ইতিহাস, অৰ্থনীতি, কলা আৰু সংস্কৃতি, শাসন আৰু প্ৰতিষ্ঠান\n- বিশ্ব আৰু আন্তৰ্জাতিক — বিশ্বৰ ভূগোল, বিশ্বৰ ইতিহাস, আন্তৰ্জাতিক সংগঠন\n- স্থিৰ সাধাৰণ জ্ঞান — বঁটা আৰু সন্মান, কিতাপ আৰু লেখক, গুৰুত্বপূৰ্ণ দিন, ক্ৰীড়া, আৱিষ্কাৰ আৰু উদ্ভাৱন, সংগঠন আৰু প্ৰতিষ্ঠান, মহাকাশ আৰু প্ৰতিৰক্ষা, বিবিধ স্থিৰ সাধাৰণ জ্ঞান\n- সাম্প্ৰতিক ঘটনাৱলী — ৰাষ্ট্ৰীয় আৰু আন্তৰ্জাতিক বাতৰি, নিয়োগ আৰু মৃত্যু-বাতৰি, চৰকাৰী আঁচনি, বিজ্ঞান, প্ৰযুক্তি আৰু পৰিৱেশ",
      },
    },
    {
      title: { en: "General English", as: "সাধাৰণ ইংৰাজী" },
      content: {
        en: "Grammar and vocabulary, plus comprehension and usage.\n\n- Grammar — parts of speech, articles and determiners, prepositions, tenses, subject-verb agreement, active and passive voice, direct and indirect speech, sentence correction and error detection, degrees of comparison, question tags and modals, conjunctions, non-finite verbs\n- Vocabulary — synonyms, antonyms, one word substitution, idioms and phrases, phrasal verbs, spelling and word usage, word formation and roots, homonyms and confusables\n- Comprehension and Usage — reading comprehension, cloze test, sentence completion, paragraph ordering, precis and summary writing",
        as: "ব্যাকৰণ আৰু শব্দভাণ্ডাৰ, লগতে বোধশক্তি আৰু প্ৰয়োগ।\n\n- ব্যাকৰণ — শব্দৰ ভাগ, Articles আৰু Determiners, পদান্বয়ী অব্যয়, কাল, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, প্ৰত্যক্ষ আৰু পৰোক্ষ উক্তি, বাক্য শুধৰণি আৰু ভুল ধৰা, তুলনাৰ মাত্ৰা, Question Tag আৰু Modal, সংযোজক অব্যয়, অসমাপিকা ক্ৰিয়া\n- শব্দভাণ্ডাৰ — সমাৰ্থক শব্দ, বিপৰীত শব্দ, এক শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বাক্যাংশ, Phrasal Verb, বানান আৰু শব্দ প্ৰয়োগ, শব্দ গঠন আৰু মূল, সমোচ্চাৰিত শব্দ\n- বোধশক্তি আৰু প্ৰয়োগ — পঢ়ি বুজাৰ ক্ষমতা, Cloze Test, বাক্য সম্পূৰ্ণ কৰা, অনুচ্ছেদ সজোৱা, সাৰাংশ লিখা",
      },
    },
    {
      title: { en: "Numerical Aptitude / General Mathematics", as: "সংখ্যাগত দক্ষতা / সাধাৰণ গণিত" },
      content: {
        en: "Arithmetic, algebra, geometry, mensuration, data interpretation and basic combinatorics at the standard asked in Assam recruitment papers.\n\n- Arithmetic — number system, simplification and BODMAS, decimals and fractions, LCM and HCF, percentage, ratio and proportion, average, profit, loss and discount, simple interest, compound interest, partnership, mixture and alligation, time and work, pipes and cisterns, time, speed and distance, problems on trains, boats and streams, problems on ages\n- Algebra, Geometry and Mensuration — elementary algebra, quadratic and linear equations, geometry, mensuration 2D, mensuration 3D, trigonometry, height and distance, coordinate geometry\n- Data and Combinatorics — statistics, data interpretation, permutation and combination, probability",
        as: "পাটিগণিত, বীজগণিত, জ্যামিতি, পৰিমিতি, তথ্য বিশ্লেষণ আৰু মৌলিক সমাবেশ — অসমৰ নিযোগ পত্ৰত সোধা মানক স্তৰত।\n\n- পাটিগণিত — সংখ্যা পদ্ধতি, সৰলীকৰণ আৰু BODMAS, দশমিক আৰু ভগ্নাংশ, ল.সা.গু. আৰু গ.সা.গু., শতাংশ, অনুপাত আৰু সমানুপাত, গড়, লাভ, লোকচান আৰু ৰেহাই, সৰল সুত, চক্ৰবৃদ্ধি সুত, অংশীদাৰিত্ব, মিশ্ৰণ আৰু সংযোগ, সময় আৰু কাৰ্য, নল আৰু চৌবাচ্চা, সময়, গতি আৰু দূৰত্ব, ৰে'লগাড়ীৰ সমস্যা, নাও আৰু সোঁত, বয়সৰ সমস্যা\n- বীজগণিত, জ্যামিতি আৰু পৰিমিতি — প্ৰাথমিক বীজগণিত, দ্বিঘাত আৰু ৰৈখিক সমীকৰণ, জ্যামিতি, পৰিমিতি ২D, পৰিমিতি ৩D, ত্ৰিকোণমিতি, উচ্চতা আৰু দূৰত্ব, স্থানাংক জ্যামিতি\n- তথ্য আৰু সমাবেশ — পৰিসংখ্যা, তথ্য বিশ্লেষণ, বিন্যাস আৰু সমাবেশ, সম্ভাৱনা",
      },
    },
    {
      title: { en: "Reasoning & Mental Ability", as: "তৰ্কশক্তি আৰু মানসিক দক্ষতা" },
      content: {
        en: "Verbal, analytical and non-verbal reasoning.\n\n- Verbal Reasoning — analogy, classification and odd one out, number series, alphabet and alphanumeric series, coding-decoding, blood relations, direction and distance, order and ranking, alphabet test and word formation, logical sequence of words, clock and calendar, mathematical operations, input-output\n- Analytical and Critical Reasoning — syllogism, Venn diagrams, statement and conclusions, assumptions, arguments, courses of action, cause and effect, assertion and reason, decision making and data sufficiency, seating arrangement, puzzles, inequality\n- Non-Verbal Reasoning — figure series, figure analogy and classification, mirror and water image, paper cutting and folding, embedded figures, pattern completion, counting of figures, cube and dice, visual memory and rule detection",
        as: "ভাষিক, বিশ্লেষণাত্মক আৰু চিত্ৰভিত্তিক যুক্তিতৰ্ক।\n\n- ভাষিক যুক্তিতৰ্ক — সাদৃশ্য, শ্ৰেণীবিভাজন আৰু আঁতৰ বস্তু, সংখ্যা শৃংখলা, আখৰ আৰু আখৰ-সংখ্যা শৃংখলা, সংকেতীকৰণ-অৱসংকেতীকৰণ, ৰক্তসম্পৰ্ক, দিশ আৰু দূৰত্ব, ক্ৰম আৰু স্থান, আখৰ পৰীক্ষা আৰু শব্দ গঠন, শব্দৰ যুক্তিসঙ্গত ক্ৰম, ঘড়ী আৰু পাঁজি, গাণিতিক ক্ৰিয়া, ইনপুট-আউটপুট\n- বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্ক — ন্যায়বাক্য, ভেন চিত্ৰ, বিবৃতি আৰু সিদ্ধান্ত, ধাৰণা, যুক্তি, কাৰ্যপন্থা, কাৰণ আৰু ফল, দাবী আৰু কাৰণ, সিদ্ধান্ত গ্ৰহণ আৰু তথ্য পৰ্যাপ্ততা, বহাৰ বিন্যাস, ধাঁধা, অসমতা\n- চিত্ৰভিত্তিক যুক্তিতৰ্ক — চিত্ৰ শৃংখলা, চিত্ৰ সাদৃশ্য আৰু শ্ৰেণীবিভাজন, দাপোণ আৰু পানীৰ প্ৰতিবিম্ব, কাগজ কটা আৰু ভাঁজ, সংযোজিত চিত্ৰ, আৰ্হি সম্পূৰ্ণ কৰা, চিত্ৰ গণনা, ঘনক আৰু লুডু, দৃশ্যমান স্মৃতি আৰু নিয়ম চিনাক্তকৰণ",
      },
    },
  ],
};

module.exports = { EXAM, SYLLABUS };
