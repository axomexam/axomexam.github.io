#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/assam-police-si.structure.js

   Source of truth for the Assam Police Sub-Inspector (SI) exam book
   that tools/build-assam-police-si.js writes into the repository.

   The SLPRB Assam Police SI (UB/AB) written paper is a 100-question,
   100-mark, 3-hour objective test with 0.5 negative marking, split into
   three parts:

     Part I   Logical Reasoning, Aptitude & Basic Mathematics   35 Q
     Part II  General Knowledge, Science & Current Affairs       35 Q
     Part III History, Geography & Culture of Assam & India      30 Q

   The book mirrors the shape of data/exams/index.json (exam →
   section → sub-category) so the SPA renders it with no runtime change,
   and it mirrors the folder layout of data/exams/assam-police so every
   maintenance tool keeps working.

   Every question is sourced from the *existing* Assam Police question
   bank (data/exams/assam-police/...) and the shared subject pools
   (data/mock-test/...). The SI book is degree-level, so the builder
   prefers the harder, analytical questions where a pool offers them.
   It has its own cover image and shares the logo with Assam Police Constable.
   ============================================================ */

const COVER = "/images/exams/assam-police-si-cover.webp";
const LOGO = "/images/exams/assam-police-logo.webp";
const COVER_ALT = {
  en: "Assam Police Sub-Inspector (UB & AB) Recruitment Exam — book front cover",
  as: "অসম আৰক্ষী উপ-পৰিদৰ্শক (UB আৰু AB) নিযুক্তি পৰীক্ষা — কিতাপৰ বেটুপাত",
};
const LOGO_ALT = { en: "Assam Police official logo", as: "অসম আৰক্ষী চৰকাৰী ল'গ'" };

const SYLLABUS_SEC = {
  id: "syllabus",
  type: "syllabus",
  color: "#6366f1",
  title: { en: "Syllabus", as: "পাঠ্যক্ৰম" },
};

const EXAM = {
  id: "assam-police-si",
  title: { en: "Assam Police Sub-Inspector (SI)", as: "অসম আৰক্ষী উপ-পৰিদৰ্শক (SI)" },
  subtitle: {
    en: "Sub-Inspector of Police (UB & AB) — SLPRB Assam",
    as: "আৰক্ষী উপ-পৰিদৰ্শক (UB আৰু AB) — SLPRB অসম",
  },
  note: {
    en: "Choose a subject, then a sub-category to practise question-wise MCQs.",
    as: "এখন বিষয় বাছনি কৰক, তাৰ পিছত উপ-শ্ৰেণী এটা বাছি প্ৰশ্নভিত্তিক MCQ অনুশীলন কৰক।",
  },
  cover: COVER,
  coverAlt: COVER_ALT,
  logo: LOGO,
  logoAlt: LOGO_ALT,
  color: "#1d4ed8",
  icon: "SI",
  status: "available",
  sections: [
    SYLLABUS_SEC,
    {
      id: "logical-reasoning",
      type: "qa",
      color: "#8b5cf6",
      title: { en: "Logical Reasoning & Mental Ability", as: "তৰ্কশক্তি আৰু মানসিক দক্ষতা" },
      subcategories: [
        { id: "verbal-reasoning", source: "exams/assam-police/logical-reasoning/verbal-reasoning", title: { en: "Verbal Reasoning", as: "ভাষিক যুক্তিতৰ্ক" } },
        { id: "non-verbal-reasoning", source: "exams/assam-police/logical-reasoning/non-verbal-reasoning", title: { en: "Non-Verbal Reasoning", as: "চিত্ৰভিত্তিক যুক্তিতৰ্ক" } },
      ],
    },
    {
      id: "elementary-mathematics",
      type: "qa",
      color: "#f59e0b",
      title: { en: "Aptitude & Basic Mathematics", as: "যোগ্যতা আৰু প্ৰাথমিক গণিত" },
      subcategories: [
        { id: "number-system", source: "exams/assam-police/elementary-mathematics/number-system", title: { en: "Number System & Simplification", as: "সংখ্যা পদ্ধতি আৰু সৰলীকৰণ" } },
        { id: "lcm-hcf", source: "exams/assam-police/elementary-mathematics/lcm-hcf", title: { en: "LCM & HCF", as: "ল.সা.গু. আৰু গ.সা.গু." } },
        { id: "percentage", source: "exams/assam-police/elementary-mathematics/percentage", title: { en: "Percentage", as: "শতাংশ" } },
        { id: "profit-loss", source: "exams/assam-police/elementary-mathematics/profit-loss", title: { en: "Profit, Loss & Discount", as: "লাভ, লোকচান আৰু ৰেহাই" } },
        { id: "ratio-proportion", source: "exams/assam-police/elementary-mathematics/ratio-proportion", title: { en: "Ratio, Proportion & Partnership", as: "অনুপাত, সমানুপাত আৰু অংশীদাৰিত্ব" } },
        { id: "average", source: "exams/assam-police/elementary-mathematics/average", title: { en: "Average, Mixture & Alligation", as: "গড়, মিশ্ৰণ আৰু মিশ্ৰণ-নিয়ম" } },
        { id: "simple-compound-interest", source: "exams/assam-police/elementary-mathematics/simple-compound-interest", title: { en: "Simple & Compound Interest", as: "সৰল আৰু চক্ৰবৃদ্ধি সুত" } },
        { id: "time-work", source: "exams/assam-police/elementary-mathematics/time-work", title: { en: "Time, Work & Pipes", as: "সময়, কাৰ্য আৰু নল-চুঙা" } },
        { id: "time-speed-distance", source: "exams/assam-police/elementary-mathematics/time-speed-distance", title: { en: "Time, Speed, Distance, Trains & Boats", as: "সময়, গতি, দূৰত্ব, ৰে'ল আৰু নাও" } },
      ],
    },
    {
      id: "general-knowledge-science-current-affairs",
      type: "qa",
      color: "#0ea5e9",
      title: { en: "General Knowledge, Science & Current Affairs", as: "সাধাৰণ জ্ঞান, বিজ্ঞান আৰু সাম্প্ৰতিক ঘটনা" },
      subcategories: [
        { id: "indian-polity-constitution", source: "mock-test/gk/polity", title: { en: "Indian Polity & Constitution", as: "ভাৰতৰ ৰাজনীতি আৰু সংবিধান" } },
        { id: "indian-history-national-movement", source: "mock-test/gk/indian-history", title: { en: "Indian History & National Movement", as: "ভাৰতৰ ইতিহাস আৰু জাতীয় আন্দোলন" } },
        { id: "indian-world-geography", source: "mock-test/gk/geography", title: { en: "Indian & World Geography", as: "ভাৰত আৰু বিশ্বৰ ভূগোল" } },
        { id: "general-science-technology", source: "mock-test/science", title: { en: "General Science & Technology", as: "সাধাৰণ বিজ্ঞান আৰু প্ৰযুক্তি" } },
        { id: "indian-history-polity-economy", source: "exams/assam-police/general-knowledge-current-affairs/indian-history-polity-economy", title: { en: "Indian History, Polity & Economy", as: "ভাৰতৰ ইতিহাস, ৰাজনীতি আৰু অৰ্থনীতি" } },
        { id: "current-affairs", source: "exams/assam-police/general-knowledge-current-affairs/current-affairs", title: { en: "Current Affairs", as: "সাম্প্ৰতিক ঘটনা" } },
        { id: "static-gk", source: "exams/assam-police/general-knowledge-current-affairs/important-days-capitals-currencies", title: { en: "Static GK — Days, Capitals & Currencies", as: "স্থিৰ সাধাৰণ জ্ঞান — দিৱস, ৰাজধানী আৰু মুদ্ৰা" } },
      ],
    },
    {
      id: "assam-history-geography-culture",
      type: "qa",
      color: "#10b981",
      title: { en: "History, Geography & Culture of Assam", as: "অসমৰ ইতিহাস, ভূগোল আৰু সংস্কৃতি" },
      subcategories: [
        { id: "assam-history", source: "exams/assam-police/assam-history-geography-culture/assam-history", title: { en: "Assam History", as: "অসমৰ ইতিহাস" } },
        { id: "assam-geography", source: "exams/assam-police/assam-history-geography-culture/assam-geography", title: { en: "Assam Geography & Environment", as: "অসমৰ ভূগোল আৰু পৰিৱেশ" } },
        { id: "assam-culture", source: "exams/assam-police/assam-history-geography-culture/assam-culture", title: { en: "Assam Art, Literature & Culture", as: "অসমৰ কলা, সাহিত্য আৰু সংস্কৃতি" } },
      ],
    },
  ],
  syllabus: {
    title: { en: "Assam Police Sub-Inspector (SI) Syllabus", as: "অসম আৰক্ষী উপ-পৰিদৰ্শক (SI) পাঠ্যক্ৰম" },
    description: {
      en: "Complete part-wise syllabus and exam pattern for the Assam Police Sub-Inspector (UB & AB) written examination conducted by the State Level Police Recruitment Board (SLPRB), Assam.",
      as: "ৰাজ্যিক পৰ্যায়ৰ আৰক্ষী নিযুক্তি ব'ৰ্ড (SLPRB), অসমৰ দ্বাৰা পৰিচালিত অসম আৰক্ষী উপ-পৰিদৰ্শক (UB আৰু AB) লিখিত পৰীক্ষাৰ বাবে অংশ-ভিত্তিক সম্পূৰ্ণ পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ।",
    },
    chapters: [
      {
        title: { en: "Exam Pattern", as: "পৰীক্ষাৰ ধৰণ" },
        content: {
          en: "The Assam Police Sub-Inspector (UB & AB) written examination is an objective test of multiple-choice questions. The paper carries 100 questions of one mark each, for a total of 100 marks, and the time allowed is 3 hours (180 minutes). There is a negative marking of 0.5 mark for every wrong answer, so a candidate should answer with care and skip only when genuinely unsure.\n\nThe paper is divided into three parts:\n- Part I: Logical Reasoning, Aptitude and Basic Mathematics — 35 questions\n- Part II: General Knowledge, Science and Current Affairs — 35 questions\n- Part III: History, Geography and Culture of Assam and India — 30 questions\n\nThe question paper is bilingual: every question and every option is printed in English and in Assamese. The standard of the questions is that of a graduate (degree) level examination, with analytical and statement-based formats alongside direct factual questions. Shortlisted candidates are called for a Physical Standard Test (PST) and Physical Efficiency Test (PET) after the written examination.",
          as: "অসম আৰক্ষী উপ-পৰিদৰ্শক (UB আৰু AB) লিখিত পৰীক্ষাখন বহুবিকল্পভিত্তিক প্ৰশ্নৰ এক উদ্দেশ্যমূলক পৰীক্ষা। প্ৰশ্নকাকতত ১০০ টা প্ৰশ্ন থাকে, প্ৰতিটোৰে ১ নম্বৰ, মুঠ ১০০ নম্বৰ, আৰু সময় ৩ ঘণ্টা (১৮০ মিনিট)। প্ৰতিটো ভুল উত্তৰৰ বাবে ০.৫ নম্বৰ ঋণাত্মক মাৰ্কিং আছে, গতিকে সাৱধানে উত্তৰ দিয়ক আৰু সঁচাকৈয়ে নিশ্চিত নহ'লে এৰি যাওক।\n\nপ্ৰশ্নকাকত তিনিটা অংশত বিভক্ত:\n- অংশ I: তৰ্কশক্তি, যোগ্যতা আৰু প্ৰাথমিক গণিত — ৩৫ টা প্ৰশ্ন\n- অংশ II: সাধাৰণ জ্ঞান, বিজ্ঞান আৰু সাম্প্ৰতিক ঘটনা — ৩৫ টা প্ৰশ্ন\n- অংশ III: অসম আৰু ভাৰতৰ ইতিহাস, ভূগোল আৰু সংস্কৃতি — ৩০ টা প্ৰশ্ন\n\nপ্ৰশ্নকাকত দ্বিভাষিক: প্ৰতিটো প্ৰশ্ন আৰু প্ৰতিটো বিকল্প ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত দিয়া হয়। প্ৰশ্নসমূহৰ মান স্নাতক (ডিগ্ৰী) স্তৰৰ, বিশ্লেষণাত্মক আৰু উক্তি-ভিত্তিক আৰ্হিৰ লগতে প্ৰত্যক্ষ তথ্যভিত্তিক প্ৰশ্ন থাকে। লিখিত পৰীক্ষাৰ পাছত চুটি তালিকাভুক্ত প্ৰাৰ্থীক শাৰীৰিক মানদণ্ড পৰীক্ষা (PST) আৰু শাৰীৰিক দক্ষতা পৰীক্ষা (PET) লৈ মতা হয়।",
        },
      },
      {
        title: { en: "Part I — Logical Reasoning, Aptitude & Basic Mathematics", as: "অংশ I — তৰ্কশক্তি, যোগ্যতা আৰু প্ৰাথমিক গণিত" },
        content: {
          en: "This part carries 35 questions in two blocks. Reasoning and mental ability covers coding-decoding, number and alphabet series, blood relations, direction sense, syllogism and Venn diagrams, seating arrangement, statement and assumption or conclusion, analogy, odd one out and mathematical operations. Quantitative aptitude and basic mathematics covers number system, LCM and HCF, simplification, percentage, profit, loss and discount, ratio, proportion and partnership, simple and compound interest, time and work, pipes and cisterns, time, speed, distance, trains and boats, averages, mixtures and alligation. The standard is Class X (HSLC) and above.",
          as: "এই অংশত ৩৫ টা প্ৰশ্ন দুটা খণ্ডত থাকে। তৰ্কশক্তি আৰু মানসিক দক্ষতাত সংকেত-আবোৰণ, সংখ্যা আৰু বৰ্ণ শৃংখলা, ৰক্তসম্পৰ্ক, দিশ-জ্ঞান, উক্তি-সিদ্ধান্ত আৰু ভেন ডায়াগ্ৰাম, আসন বিন্যাস, উক্তি আৰু অনুমান বা সিদ্ধান্ত, সাদৃশ্য, অদ্ভুতটো বাছনি আৰু গাণিতিক ক্ৰিয়া সন্নিৱিষ্ট। পৰিমাণাত্মক যোগ্যতা আৰু প্ৰাথমিক গণিতত সংখ্যা পদ্ধতি, ল.সা.গু. আৰু গ.সা.গু., সৰলীকৰণ, শতাংশ, লাভ, লোকচান আৰু ৰেহাই, অনুপাত, সমানুপাত আৰু অংশীদাৰিত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত, সময় আৰু কাৰ্য, নল আৰু চুঙা, সময়, গতি, দূৰত্ব, ৰে'ল আৰু নাও, গড়, মিশ্ৰণ আৰু মিশ্ৰণ-নিয়ম সন্নিৱিষ্ট। মান দশম শ্ৰেণী (HSLC) আৰু তাৰ ওপৰৰ।",
        },
      },
      {
        title: { en: "Part II — General Knowledge, Science & Current Affairs", as: "অংশ II — সাধাৰণ জ্ঞান, বিজ্ঞান আৰু সাম্প্ৰতিক ঘটনা" },
        content: {
          en: "This part carries 35 questions covering Indian polity and the Constitution (fundamental rights, directive principles, fundamental duties, writs, emergency provisions, amendments, President and Governor powers, judiciary and Panchayati Raj), Indian history and the national movement (ancient, medieval and modern India, the 1857 revolt, socio-religious reform, the Gandhian phases, the INA and Partition), Indian and world geography (physiography, river systems, climate and monsoon, minerals, agriculture, biosphere reserves, straits and boundaries), general science and technology (human physiology, diseases, immunology, nutrition and vitamins, everyday physics and chemistry, ISRO missions and defence technology) and current affairs and static GK (national and international events of the past six to twelve months, sports, defence exercises, government schemes and international summits).",
          as: "এই অংশত ৩৫ টা প্ৰশ্ন থাকে — ভাৰতৰ ৰাজনীতি আৰু সংবিধান (মৌলিক অধিকাৰ, নিৰ্দেশাত্মক নীতি, মৌলিক কৰ্তব্য, ৰিট, জৰুৰীকালীন ব্যৱস্থা, সংশোধনী, ৰাষ্ট্ৰপতি আৰু ৰাজ্যপালৰ ক্ষমতা, ন্যায়পালিকা আৰু পঞ্চায়তী ৰাজ), ভাৰতৰ ইতিহাস আৰু জাতীয় আন্দোলন (প্ৰাচীন, মধ্য আৰু আধুনিক ভাৰত, ১৮৫৭ চনৰ বিদ্ৰোহ, সমাজ-ধৰ্ম সংস্কাৰ, গান্ধীবাদী পৰ্যায়, আইএনএ আৰু দেশভাগ), ভাৰত আৰু বিশ্বৰ ভূগোল (ভূ-প্ৰকৃতি, নদী প্ৰণালী, জলবায়ু আৰু মৌচুমী, খনিজ, কৃষি, জীৱমণ্ডল সংৰক্ষিত অঞ্চল, সাগৰীয় সন্ধি আৰু সীমা), সাধাৰণ বিজ্ঞান আৰু প্ৰযুক্তি (মানৱ শৰীৰবিজ্ঞান, ৰোগ, অনাক্ৰমণিকা, পুষ্টি আৰু ভিটামিন, দৈনন্দিন পদাৰ্থ আৰু ৰসায়ন, ইছৰ' অভিযান আৰু প্ৰতিৰক্ষা প্ৰযুক্তি) আৰু সাম্প্ৰতিক ঘটনা তথা স্থিৰ সাধাৰণ জ্ঞান (যোৱা ছৰ পৰা বাৰ মাহৰ ৰাষ্ট্ৰীয় তথা আন্তৰ্জাতিক ঘটনা, ক্ৰীড়া, প্ৰতিৰক্ষা অভ্যাস, চৰকাৰী আঁচনি আৰু আন্তৰ্জাতিক শীৰ্ষ সন্মিলন)।",
        },
      },
      {
        title: { en: "Part III — History, Geography & Culture of Assam and India", as: "অংশ III — অসম আৰু ভাৰতৰ ইতিহাস, ভূগোল আৰু সংস্কৃতি" },
        content: {
          en: "This part carries 30 questions on Assam. Assam history covers ancient Kamarupa (the Varman, Salastambha and Pala dynasties and Hiuen Tsang's account), medieval Assam (Sukapha, the Paik and Khel systems, the Ahom-Mughal conflicts, the Battle of Saraighat, Lachit Borphukan and the Koch kingdom), and modern Assam (the Moamoria rebellion, the Burmese invasions, the Treaty of Yandaboo, British annexation, the 1857 revolt, the Phulaguri Dhawa, the Patharughat uprising and Assam's role in the Quit India movement). Assam geography covers physiography, the Brahmaputra and Barak river systems, climate, soil, forests, minerals, the national parks and wildlife sanctuaries, and Ramsar sites such as Deepor Beel. Assam art, literature and culture covers the neo-Vaishnavite movement, Srimanta Sankardeva, the Sattras, Ankiya Naat and Borgeet, Sattriya dance, folk dances and musical instruments, the ethnic communities and their festivals, the history of Assamese literature and the Jnanpith and Sahitya Akademi awardees. Contemporary Assam covers infrastructure landmarks, GI tags, state symbols and flagship welfare schemes.",
          as: "এই অংশত অসমৰ ওপৰত ৩০ টা প্ৰশ্ন থাকে। অসমৰ ইতিহাসত প্ৰাচীন কামৰূপ (বৰ্মন, শালস্তম্ভ আৰু পাল বংশ আৰু হিউৱেন চাঙৰ বিৱৰণ), মধ্য অসম (চুকাফা, পাইক আৰু খেল পদ্ধতি, আহোম-মোগল সংঘৰ্ষ, শৰাইঘাটৰ যুদ্ধ, লাচিত বৰফুকন আৰু কোচ ৰাজ্য), আৰু আধুনিক অসম (মোৱামৰীয়া বিদ্ৰোহ, বৰ্মী আক্ৰমণ, য়াণ্ডাবু সন্ধি, ব্ৰিটিছৰ অধিগ্ৰহণ, ১৮৫৭ চনৰ বিদ্ৰোহ, ফুলগুৰি ধৱা, পাথৰুঘাটৰ বিদ্ৰোহ আৰু ভাৰত এৰা আন্দোলনত অসমৰ ভূমিকা) সন্নিৱিষ্ট। অসমৰ ভূগোলত ভূ-প্ৰকৃতি, ব্ৰহ্মপুত্ৰ আৰু বৰাক নদী প্ৰণালী, জলবায়ু, মাটি, অৰণ্য, খনিজ, ৰাষ্ট্ৰীয় উদ্যান আৰু অভয়াৰণ্য, আৰু দীপৰ বিলৰ দৰে ৰামচাৰ স্থান সন্নিৱিষ্ট। অসমৰ কলা, সাহিত্য আৰু সংস্কৃতিত নৱ-বৈষ্ণৱ আন্দোলন, শ্ৰীমন্ত শংকৰদেৱ, সত্ৰ, অংকীয়া নাট আৰু বৰগীত, সত্ৰীয়া নৃত্য, লোকনৃত্য আৰু বাদ্যযন্ত্ৰ, জনগোষ্ঠী আৰু তেওঁলোকৰ উৎসৱ, অসমীয়া সাহিত্যৰ ইতিহাস আৰু জ্ঞানপীঠ তথা সাহিত্য অকাডেমি বঁটা বিজয়ী সন্নিৱিষ্ট। সমসাময়িক অসমত আন্তঃগাঁথনিৰ স্থাপত্য, ভৌগোলিক সংকেত (GI টেগ), ৰাজ্যিক প্ৰতীক আৰু প্ৰধান কল্যাণমূলক আঁচনি সন্নিৱিষ্ট।",
        },
      },
    ],
  },
};

module.exports = { EXAMS: [EXAM] };
