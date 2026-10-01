#!/usr/bin/env node
/* ============================================================
   axomexam — tools/build-current-affairs.js

   Scaffolds the "Free Current Affairs" section used by the SPA.

   For every sub-category declared below it writes:

     data/current-affairs/index.json                      (section manifest)
     data/current-affairs/<id>/index.json                 (category meta + file list)
     data/current-affairs/<id>/question-001.json          (one sample Q&A)
     current-affairs/index.html                           (SEO shell page)
     current-affairs/<id>/index.html                      (SEO shell page)

   Question files are ONE QUESTION PER FILE (bilingual, intro + explained
   answer). New questions are auto-discovered from the repo at runtime, so
   the owner can keep dropping question-002.json, question-003.json ... into
   any category folder.

   Usage: node tools/build-current-affairs.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const BASE = "https://axomexam.in";
const DIR = "data/current-affairs";
const UPDATED = "2026-10-01";
const UPLOADED_BY = "axomexam team";

/* ---- The 15 current-affairs sub-categories ---- */
const CATEGORIES = [
  {
    id: "sports",
    color: "#16a34a",
    icon: "trophy",
    title: { en: "Sports", as: "ক্ৰীড়া" },
    intro: {
      en: "Latest sports news, tournaments, winners and records from India and around the world. These questions cover cricket, football, olympics, national games and major championships.",
      as: "ভাৰত আৰু বিশ্বৰ শেহতীয়া ক্ৰীড়া বাতৰি, প্ৰতিযোগিতা, বিজেতা আৰু অভিলেখ। এই প্ৰশ্নসমূহত ক্ৰিকেট, ফুটবল, অলিম্পিক, ৰাষ্ট্ৰীয় খেল আৰু প্ৰধান চেম্পিয়নশ্বিপ সামৰি লোৱা হৈছে।",
    },
    q: {
      en: "Which country hosted the 2022 FIFA World Cup?",
      as: "২০২২ চনৰ ফিফা বিশ্বকাপ কোনে আয়োজন কৰিছিল?",
      aen: "Qatar",
      aas: "কাটাৰ",
      een: "The 2022 FIFA World Cup was held in Qatar from 20 November to 18 December 2022. It was the first World Cup hosted in the Arab world.",
      eas: "২০২২ চনৰ ফিফা বিশ্বকাপ কাটাৰত ২০ নৱেম্বৰৰ পৰা ১৮ ডিচেম্বৰ ২০২২ লৈকে অনুষ্ঠিত হৈছিল। ই আৰৱ বিশ্বৰ প্ৰথমখন বিশ্বকাপ আছিল।",
    },
  },
  {
    id: "awards-honours",
    color: "#f59e0b",
    icon: "award",
    title: { en: "Awards & Honours", as: "বঁটা আৰু সন্মান" },
    intro: {
      en: "National and international awards, honours and recognitions. Questions on Bharat Ratna, Padma awards, Nobel Prizes, sports awards and literary honours.",
      as: "ৰাষ্ট্ৰীয় আৰু আন্তঃৰাষ্ট্ৰীয় বঁটা, সন্মান আৰু স্বীকৃতি। ভাৰত ৰত্ন, পদ্ম বঁটা, নোবেল বঁটা, ক্ৰীড়া বঁটা আৰু সাহিত্যিক সন্মানৰ প্ৰশ্ন।",
    },
    q: {
      en: "Which is the highest civilian award of India?",
      as: "ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান কোনটো?",
      aen: "Bharat Ratna",
      aas: "ভাৰত ৰত্ন",
      een: "The Bharat Ratna is the highest civilian award of the Republic of India. It was instituted in 1954 and is awarded for exceptional service towards advancement of art, literature, science and public service.",
      eas: "ভাৰত ৰত্ন ভাৰত গণৰাজ্যৰ সৰ্বোচ্চ অসামৰিক সন্মান। ১৯৫৪ চনত আৰম্ভ কৰা এই বঁটা কলা, সাহিত্য, বিজ্ঞান আৰু ৰাজহুৱা সেৱাৰ অসাধাৰণ অৱদানৰ বাবে প্ৰদান কৰা হয়।",
    },
  },
  {
    id: "important-days-themes",
    color: "#e11d48",
    icon: "calendar",
    title: { en: "Important Days & Themes", as: "গুৰুত্বপূৰ্ণ দিৱস আৰু থিম" },
    intro: {
      en: "National and international days observed through the year along with their yearly themes. A high-scoring, factual area in every current-affairs paper.",
      as: "বছৰজুৰি পালন কৰা ৰাষ্ট্ৰীয় আৰু আন্তঃৰাষ্ট্ৰীয় দিৱস আৰু তাৰ বছৰেকীয়া থিম। প্ৰতিখন চলিত ঘটনাৱলীৰ প্ৰশ্নপত্ৰত এইটো এটা উচ্চ নম্বৰৰ, তথ্যভিত্তিক ক্ষেত্ৰ।",
    },
    q: {
      en: "World Environment Day is observed on which date every year?",
      as: "বিশ্ব পৰিৱেশ দিৱস প্ৰতি বছৰে কোন তাৰিখে পালন কৰা হয়?",
      aen: "5 June",
      aas: "৫ জুন",
      een: "World Environment Day is celebrated on 5 June every year to encourage awareness and action for the protection of the environment. It was first held in 1974.",
      eas: "বিশ্ব পৰিৱেশ দিৱস প্ৰতি বছৰে ৫ জুনত পৰিৱেশ সুৰক্ষাৰ বাবে সজাগতা আৰু পদক্ষেপ উৎসাহিত কৰিবলৈ পালন কৰা হয়। ই প্ৰথমবাৰ ১৯৭৪ চনত পালন কৰা হৈছিল।",
    },
  },
  {
    id: "books-authors",
    color: "#8b5cf6",
    icon: "book",
    title: { en: "Books & Authors", as: "গ্ৰন্থ আৰু লেখক" },
    intro: {
      en: "Newly released books, their authors and important literary works. Also covers famous autobiographies, award-winning books and Assamese literature.",
      as: "শেহতীয়াকৈ প্ৰকাশিত গ্ৰন্থ, তেওঁলোকৰ লেখক আৰু গুৰুত্বপূৰ্ণ সাহিত্যকৰ্ম। লগতে বিখ্যাত আত্মজীৱনী, বঁটা-প্ৰাপ্ত গ্ৰন্থ আৰু অসমীয়া সাহিত্যও সামৰি লোৱা হৈছে।",
    },
    q: {
      en: "Who is the author of the autobiography 'Wings of Fire'?",
      as: "'ৱিংছ অৱ ফায়াৰ' আত্মজীৱনীখনৰ লেখক কোন?",
      aen: "Dr. A.P.J. Abdul Kalam",
      aas: "ড° এ.পি.জে. আব্দুল কালাম",
      een: "'Wings of Fire' is the autobiography of Dr. A.P.J. Abdul Kalam, the former President of India and a renowned scientist.",
      eas: "'ৱিংছ অৱ ফায়াৰ' ভাৰতৰ প্ৰাক্তন ৰাষ্ট্ৰপতি আৰু প্ৰখ্যাত বিজ্ঞানী ড° এ.পি.জে. আব্দুল কালামৰ আত্মজীৱনী।",
    },
  },
  {
    id: "appointments-resignations",
    color: "#0ea5e9",
    icon: "user",
    title: { en: "Appointments & Resignations", as: "নিযুক্তি আৰু পদত্যাগ" },
    intro: {
      en: "Who's who — recent appointments, promotions and resignations in constitutional posts, government offices, corporations and international organisations.",
      as: "কোন ক'ত — সাংবিধানিক পদ, চৰকাৰী কাৰ্যালয়, নিগম আৰু আন্তঃৰাষ্ট্ৰীয় সংস্থাসমূহত শেহতীয়া নিযুক্তি, পদোন্নতি আৰু পদত্যাগ।",
    },
    q: {
      en: "Who appoints the Chief Justice of India?",
      as: "ভাৰতৰ প্ৰধান ন্যায়াধীশক কোনে নিযুক্তি দিয়ে?",
      aen: "The President of India",
      aas: "ভাৰতৰ ৰাষ্ট্ৰপতি",
      een: "The President of India appoints the Chief Justice of India and the other judges of the Supreme Court under Article 124 of the Constitution.",
      eas: "সংবিধানৰ অনুচ্ছেদ ১২৪ অনুসৰি ভাৰতৰ ৰাষ্ট্ৰপতিয়ে ভাৰতৰ প্ৰধান ন্যায়াধীশ আৰু উচ্চতম ন্যায়ালয়ৰ অন্যান্য ন্যায়াধীশক নিযুক্তি দিয়ে।",
    },
  },
  {
    id: "science-technology",
    color: "#2563eb",
    icon: "atom",
    title: { en: "Science & Technology", as: "বিজ্ঞান আৰু প্ৰযুক্তি" },
    intro: {
      en: "Space missions, ISRO and DRDO achievements, new technologies, inventions, defence technology and scientific research updates.",
      as: "মহাকাশ অভিযান, ইছৰো আৰু ডি আৰ ডি অ' ৰ সাফল্য, নতুন প্ৰযুক্তি, আৱিষ্কাৰ, প্ৰতিৰক্ষা প্ৰযুক্তি আৰু বৈজ্ঞানিক গৱেষণাৰ আপডেট।",
    },
    q: {
      en: "Chandrayaan-3 made a soft landing near which region of the Moon?",
      as: "চন্দ্ৰযান-৩-এ চন্দ্ৰৰ কোন অঞ্চলৰ ওচৰত কোমল অৱতৰণ কৰিছিল?",
      aen: "The lunar south pole",
      aas: "চন্দ্ৰৰ দক্ষিণ মেৰু",
      een: "Chandrayaan-3 landed near the lunar south pole on 23 August 2023, making India the first country to soft-land in that region.",
      eas: "চন্দ্ৰযান-৩-এ ২৩ আগষ্ট ২০২৩ তাৰিখে চন্দ্ৰৰ দক্ষিণ মেৰুৰ ওচৰত অৱতৰণ কৰিছিল, যাৰ ফলত ভাৰত সেই অঞ্চলত কোমল অৱতৰণ কৰা প্ৰথম দেশ হিচাপে পৰিগণিত হয়।",
    },
  },
  {
    id: "state-current-affairs",
    color: "#db2777",
    icon: "map",
    title: { en: "State Current Affairs", as: "ৰাজ্যিক পৰিক্ৰমা" },
    intro: {
      en: "Assam and North-East specific current affairs — state government schemes, appointments, infrastructure, festivals, culture and regional events.",
      as: "অসম আৰু উত্তৰ-পূৰ্বাঞ্চলৰ চলিত ঘটনাৱলী — ৰাজ্য চৰকাৰৰ আঁচনি, নিযুক্তি, আন্তঃগাঁথনি, উৎসৱ, সংস্কৃতি আৰু আঞ্চলিক ঘটনা।",
    },
    q: {
      en: "Which river is known as the lifeline of Assam?",
      as: "কোন নদীক অসমৰ জীৱন-ৰেখা বুলি জনা যায়?",
      aen: "The Brahmaputra",
      aas: "ব্ৰহ্মপুত্ৰ",
      een: "The Brahmaputra river is called the lifeline of Assam as it supports agriculture, transport, fisheries and the livelihood of a large part of the state's population.",
      eas: "ব্ৰহ্মপুত্ৰ নদীটোক অসমৰ জীৱন-ৰেখা বুলি কোৱা হয় কাৰণ ই কৃষি, পৰিবহণ, মাছ ধৰা আৰু ৰাজ্যৰ বৃহৎ জনসংখ্যাৰ জীৱিকা ধৰি ৰাখে।",
    },
  },
  {
    id: "international-affairs",
    color: "#0891b2",
    icon: "globe",
    title: { en: "International Affairs", as: "আন্তঃৰাষ্ট্ৰীয় পৰিক্ৰমা" },
    intro: {
      en: "World events, bilateral relations, treaties, international organisations, global politics and important declarations from abroad.",
      as: "বিশ্বৰ ঘটনা, দ্বিপাক্ষিক সম্পৰ্ক, চুক্তি, আন্তঃৰাষ্ট্ৰীয় সংস্থা, বিশ্ব ৰাজনীতি আৰু বিদেশৰ পৰা গুৰুত্বপূৰ্ণ ঘোষণা।",
    },
    q: {
      en: "Where is the headquarters of the United Nations located?",
      as: "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় ক'ত অৱস্থিত?",
      aen: "New York, USA",
      aas: "নিউয়ৰ্ক, আমেৰিকা",
      een: "The United Nations headquarters is located in New York City, United States. It was established on 24 October 1945.",
      eas: "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় আমেৰিকাৰ নিউয়ৰ্ক মহানগৰত অৱস্থিত। ই ২৪ অক্টোবৰ ১৯৪৫ চনত স্থাপিত হৈছিল।",
    },
  },
  {
    id: "national-affairs",
    color: "#4f46e5",
    icon: "flag",
    title: { en: "National Affairs", as: "ৰাষ্ট্ৰীয় পৰিক্ৰমা" },
    intro: {
      en: "Important national events, government policies, bills and acts, schemes, Parliament sessions and decisions affecting India.",
      as: "গুৰুত্বপূৰ্ণ ৰাষ্ট্ৰীয় ঘটনা, চৰকাৰী নীতি, বিধেয়ক আৰু আইন, আঁচনি, সংসদৰ অধিৱেশন আৰু ভাৰতক প্ৰভাৱিত কৰা সিদ্ধান্ত।",
    },
    q: {
      en: "The Indian Parliament consists of the President and which two Houses?",
      as: "ভাৰতীয় সংসদত ৰাষ্ট্ৰপতিৰ লগতে কোন দুটা সদন থাকে?",
      aen: "Rajya Sabha and Lok Sabha",
      aas: "ৰাজ্যসভা আৰু লোকসভা",
      een: "Under Article 79 of the Constitution, the Parliament of India consists of the President, the Council of States (Rajya Sabha) and the House of the People (Lok Sabha).",
      eas: "সংবিধানৰ অনুচ্ছেদ ৭৯ অনুসৰি ভাৰতৰ সংসদ ৰাষ্ট্ৰপতি, ৰাজ্য পৰিষদ (ৰাজ্যসভা) আৰু জনগণৰ সদন (লোকসভাৰে) গঠিত।",
    },
  },
  {
    id: "defence-security",
    color: "#334155",
    icon: "shield",
    title: { en: "Defence & Security", as: "প্ৰতিৰক্ষা আৰু নিৰাপত্তা" },
    intro: {
      en: "Indian armed forces, defence exercises, missile tests, security operations, gallantry awards and defence acquisitions.",
      as: "ভাৰতীয় সশস্ত্ৰ বাহিনী, প্ৰতিৰক্ষা অভ্যাস, ক্ষেপণাস্ত্ৰ পৰীক্ষা, নিৰাপত্তা অভিযান, বীৰত্ব বঁটা আৰু প্ৰতিৰক্ষা সংগ্ৰহ।",
    },
    q: {
      en: "Which is the highest gallantry award of India?",
      as: "ভাৰতৰ সৰ্বোচ্চ বীৰত্ব বঁটা কোনটো?",
      aen: "Param Vir Chakra",
      aas: "পৰম বীৰ চক্ৰ",
      een: "The Param Vir Chakra is the highest military decoration of India, awarded for the most conspicuous bravery or self-sacrifice in the presence of the enemy.",
      eas: "পৰম বীৰ চক্ৰ ভাৰতৰ সৰ্বোচ্চ সামৰিক সন্মান, শত্ৰুৰ সন্মুখত অসাধাৰণ বীৰত্ব বা আত্মবলিদানৰ বাবে প্ৰদান কৰা হয়।",
    },
  },
  {
    id: "economy-banking",
    color: "#059669",
    icon: "coins",
    title: { en: "Economy & Banking", as: "অৰ্থনীতি আৰু বেংকিং" },
    intro: {
      en: "Union Budget, GDP updates, RBI policies, banking news, economic surveys, taxes and financial institutions.",
      as: "কেন্দ্ৰীয় বাজেট, জিডিপি আপডেট, আৰ বি আই নীতি, বেংকিং বাতৰি, অৰ্থনৈতিক সমীক্ষা, কৰ আৰু বিত্তীয় প্ৰতিষ্ঠান।",
    },
    q: {
      en: "Which institution is the central bank of India?",
      as: "ভাৰতৰ কেন্দ্ৰীয় বেংক কোনটো প্ৰতিষ্ঠান?",
      aen: "The Reserve Bank of India (RBI)",
      aas: "ভাৰতীয় ৰিজাৰ্ভ বেংক (আৰ বি আই)",
      een: "The Reserve Bank of India (RBI) is the central bank of India. It was established on 1 April 1935 and regulates the country's monetary policy.",
      eas: "ভাৰতীয় ৰিজাৰ্ভ বেংক (আৰ বি আই) ভাৰতৰ কেন্দ্ৰীয় বেংক। ই ১ এপ্ৰিল ১৯৩৫ চনত স্থাপিত হৈছিল আৰু দেশৰ মুদ্ৰা নীতি নিয়ন্ত্ৰণ কৰে।",
    },
  },
  {
    id: "rankings-reports-indices",
    color: "#d97706",
    icon: "chart",
    title: { en: "Rankings, Reports & Indices", as: "সূচক আৰু প্ৰতিবেদন" },
    intro: {
      en: "Global and national rankings, indices and reports such as HDI, Ease of Doing Business and development reports published by international agencies.",
      as: "বিশ্ব আৰু ৰাষ্ট্ৰীয় ৰেংকিং, সূচক আৰু প্ৰতিবেদন যেনে এইচ ডি আই, ব্যৱসায় কৰাৰ সহজতা আৰু আন্তঃৰাষ্ট্ৰীয় সংস্থাই প্ৰকাশ কৰা উন্নয়ন প্ৰতিবেদন।",
    },
    q: {
      en: "The Human Development Index (HDI) is published by which organisation?",
      as: "মানৱ উন্নয়ন সূচক (এইচ ডি আই) কোনটো সংস্থাই প্ৰকাশ কৰে?",
      aen: "UNDP",
      aas: "ইউ এন ডি পি",
      een: "The Human Development Index (HDI) is published annually by the United Nations Development Programme (UNDP) in its Human Development Report.",
      eas: "মানৱ উন্নয়ন সূচক (এইচ ডি আই) ৰাষ্ট্ৰসংঘৰ উন্নয়ন কাৰ্যসূচী (ইউ এন ডি পি)-এ বছৰেকীয়া মানৱ উন্নয়ন প্ৰতিবেদনত প্ৰকাশ কৰে।",
    },
  },
  {
    id: "environment-ecology",
    color: "#15803d",
    icon: "leaf",
    title: { en: "Environment & Ecology", as: "পৰিৱেশ আৰু জৈৱ-বৈচিত্ৰ্য" },
    intro: {
      en: "Climate change, wildlife, biodiversity, pollution, conservation programmes and environmental summits and agreements.",
      as: "জলবায়ু পৰিৱৰ্তন, বন্যপ্ৰাণী, জৈৱ-বৈচিত্ৰ্য, প্ৰদূষণ, সংৰক্ষণ কাৰ্যসূচী আৰু পৰিৱেশ শীৰ্ষ সন্মিলন আৰু চুক্তি।",
    },
    q: {
      en: "Kaziranga National Park is famous for which animal?",
      as: "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান কোনটো জন্তুৰ বাবে বিখ্যাত?",
      aen: "The one-horned rhinoceros",
      aas: "এশিঙীয়া গঁড়",
      een: "Kaziranga National Park in Assam is famous for the Indian one-horned rhinoceros and is a UNESCO World Heritage Site.",
      eas: "অসমৰ কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান ভাৰতীয় এশিঙীয়া গঁড়ৰ বাবে বিখ্যাত আৰু ই ইউনেস্কোৰ বিশ্ব ঐতিহ্য ক্ষেত্ৰ।",
    },
  },
  {
    id: "summits-conferences",
    color: "#c026d3",
    icon: "users",
    title: { en: "Summits & Conferences", as: "শীৰ্ষ সন্মিলন আৰু বৈঠক" },
    intro: {
      en: "Major bilateral and multilateral summits — G20, BRICS, SAARC, ASEAN, UN conferences and their host cities and outcomes.",
      as: "প্ৰধান দ্বিপাক্ষিক আৰু বহুপাক্ষিক শীৰ্ষ সন্মিলন — জি২০, ব্ৰিক্স, চাৰ্ক, আছিয়ান, ৰাষ্ট্ৰসংঘৰ সন্মিলন আৰু তেওঁলোকৰ আয়োজক চহৰ আৰু ফলাফল।",
    },
    q: {
      en: "Which country hosted the 2023 G20 Summit?",
      as: "২০২৩ চনৰ জি২০ শীৰ্ষ সন্মিলন কোনে আয়োজন কৰিছিল?",
      aen: "India",
      aas: "ভাৰত",
      een: "India hosted the 2023 G20 Summit in New Delhi on 9–10 September 2023. Its theme was 'Vasudhaiva Kutumbakam'.",
      eas: "ভাৰতে ৯–১০ ছেপ্তেম্বৰ ২০২৩ তাৰিখে নতুন দিল্লীত ২০২৩ চনৰ জি২০ শীৰ্ষ সন্মিলন আয়োজন কৰিছিল। ইয়াৰ থিম আছিল 'বসুধৈৱ কুটুম্বকম'।",
    },
  },
  {
    id: "obituaries",
    color: "#64748b",
    icon: "flower",
    title: { en: "Obituaries", as: "শোকবাৰ্তা" },
    intro: {
      en: "Noted personalities who passed away — their contributions, achievements and the fields they served in.",
      as: "প্ৰয়াত বিশিষ্ট ব্যক্তিত্ব — তেওঁলোকৰ অৱদান, কৃতিত্ব আৰু তেওঁলোকে সেৱা আগবঢ়োৱা ক্ষেত্ৰ।",
    },
    q: {
      en: "Who was popularly known as the 'Missile Man of India'?",
      as: "কাক জনপ্ৰিয়ভাৱে 'ভাৰতৰ ক্ষেপণাস্ত্ৰ মানৱ' বুলি জনা গৈছিল?",
      aen: "Dr. A.P.J. Abdul Kalam",
      aas: "ড° এ.পি.জে. আব্দুল কালাম",
      een: "Dr. A.P.J. Abdul Kalam, who passed away in 2015, was called the 'Missile Man of India' for his work on India's missile programmes.",
      eas: "ড° এ.পি.জে. আব্দুল কালাম, যিয়ে ২০১৫ চনত ইহলীলা সম্বৰণ কৰিছিল, ভাৰতৰ ক্ষেপণাস্ত্ৰ কাৰ্যসূচীৰ কামৰ বাবে 'ভাৰতৰ ক্ষেপণাস্ত্ৰ মানৱ' বুলি জনা গৈছিল।",
    },
  },
];

const SAMPLE_FILE = "question-001.json";

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  return rel;
}

/* Inline SVG icons for the category cards (24x24, stroke-based). */
const ICONS = {
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
  atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.4"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V2"/><path d="M5 3c4 0 4 3 8 3s4-3 8-3v10c-4 0-4-3-8-3s-4 3-8 3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 14.6c2.4.5 4 2.1 4 4.4"/></svg>',
  flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M12 16a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M2 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/><path d="M16 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/></svg>',
};

function catIconSvg(icon) {
  return ICONS[icon] || ICONS.globe;
}

/* ---- Static SEO shell page ---- */
function shellPage({ cat, catHref, cardsHtml }) {
  const titleEn = cat ? cat.title.en : "Free Current Affairs";
  const titleAs = cat ? cat.title.as : "বিনামূলীয়া চলিত ঘটনাৱলী";
  const heading = cat ? `${titleEn} — Free Current Affairs | axomexam` : "Free Current Affairs Questions & Answers | axomexam";
  const descEn = cat ? cat.intro.en : "Free bilingual current affairs Q&A for Assam competitive exams — sports, awards, appointments, economy, environment and more. Updated by the axomexam team.";
  const descAs = cat ? cat.intro.as : "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক চলিত ঘটনাৱলীৰ প্ৰশ্ন-উত্তৰ — ক্ৰীড়া, বঁটা, নিযুক্তি, অৰ্থনীতি, পৰিৱেশ আৰু অধিক।";
  const canonical = BASE + catHref + "/";
  const crumb = cat
    ? `<a href="/">Home</a><span class="bc-sep">/</span><a href="/current-affairs">Free Current Affairs</a><span class="bc-sep">/</span><span>${esc(titleEn)}</span>`
    : `<a href="/">Home</a><span class="bc-sep">/</span><span>Free Current Affairs</span>`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical + "#webpage",
    url: canonical,
    name: heading,
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
  <meta name="keywords" content="${esc(titleEn.toLowerCase())}, current affairs, assam current affairs, current affairs mcq, axomexam, adre current affairs, assam police current affairs" />

  <meta name="theme-color" content="#ef4444" />
  <title>${esc(heading)}</title>

  <link rel="canonical" href="${canonical}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="axomexam" />
  <meta property="og:title" content="${esc(heading)}" />
  <meta property="og:description" content="${esc(descEn)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="axomexam - ${esc(titleEn)}" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:locale:alternate" content="as_IN" />

  <meta name="twitter:image" content="${BASE}/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(heading)}" />
  <meta name="twitter:description" content="${esc(descEn)}" />

  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" /></noscript>

  <link rel="stylesheet" href="/css/style.css?v=20260917a" />

  <script>
    (function() {
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>

  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4574824794620382" crossorigin="anonymous"></script>

  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

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

  <div id="preloader" aria-hidden="true">
    <div class="loader-logo">axomexam</div>
    <div class="loader-bar"><span></span></div>
  </div>

  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand" aria-label="axomexam home">
        <span class="brand-mark">A</span>
        <span class="brand-text">axomexam.in</span>
      </a>
      <div class="header-center">
        <div class="search-wrap" role="search">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="master-search" type="search" autocomplete="off" spellcheck="false" placeholder="Search questions, topics, keywords..." aria-label="Search" />
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
    <nav class="main-nav" aria-label="Primary navigation"><div class="container nav-inner"><ul class="nav-list" id="nav-list"></ul></div></nav>
    <nav class="tabbar" id="tabbar" aria-label="App navigation">
      <a href="/" class="tab-item" data-tab="home"><span data-i18n="tab.home">Home</span></a>
      <a href="/mock-test" class="tab-item" data-tab="mock"><span data-i18n="tab.mock">Mock Test</span></a>
      <a href="/categories" class="tab-item" data-tab="categories"><span data-i18n="tab.categories">Practice</span></a>
      <a href="/search" class="tab-item" id="tab-search" data-tab="search"><span data-i18n="tab.search">Search</span></a>
      <button class="tab-item" id="tab-menu" data-tab="menu" type="button"><span data-i18n="tab.menu">Menu</span></button>
    </nav>
  </header>

  <div id="mobile-menu" class="mobile-menu" hidden>
    <div class="mobile-menu-head">
      <span class="brand-mark">A</span>
      <span class="brand-text">axomexam</span>
      <button id="mobile-close" class="m-close" type="button" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <ul class="mobile-nav" id="mobile-nav"></ul>
  </div>
  <div id="mobile-backdrop" class="mobile-backdrop" hidden></div>

  <main id="app" class="container main">
    <div class="page-head">
      <nav class="breadcrumb">${crumb}</nav>
      <h1>${esc(titleEn)}</h1>
      <p class="page-desc">${esc(descEn)}</p>
    </div>
    <section class="section" style="padding-bottom:46px;">
      ${cardsHtml || ""}
    </section>
    <noscript>
      <p>${esc(descAs)}</p>
      <p><a href="${catHref}">${catHref}</a></p>
    </noscript>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">A</span>
        <span class="brand-text">axomexam</span>
        <p id="footer-tagline" class="footer-tagline">Comprehensive Preparation Portal for Assam Competitive Exams</p>
      </div>
      <div class="footer-links">
        <div>
          <h4 data-i18n="footer.quick">Quick Links</h4>
          <ul>
            <li><a href="/" data-i18n="footer.home">Home</a></li>
            <li><a href="/current-affairs">Free Current Affairs</a></li>
            <li><a href="/mock-test" data-i18n="nav.mock">Mock Test</a></li>
            <li><a href="/ebooks" data-i18n="nav.ebooks">E-Books</a></li>
            <li><a href="/exams" data-i18n="nav.exams">Your Exams</a></li>
            <li><a href="/downloads" data-i18n="nav.downloads">Downloads</a></li>
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
    <div class="footer-bottom container"><p id="footer-copy">&copy; 2026 axomexam.in. All rights reserved.</p></div>
  </footer>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script src="/js/config.js?v=20260917a"></script>
  <script src="/js/i18n.js?v=20260917a"></script>
  <script src="/js/api.js?v=20260917a"></script>
  <script src="/js/app.js?v=20260917a"></script>
</body>
</html>
`;
}

function cardGridHtml() {
  return `<div class="sub-grid exam-sec-grid" style="--cat:#ef4444">` + CATEGORIES.map((c, i) => `
    <a class="sub-card reveal exam-sec-card" href="/current-affairs/${c.id}" style="--cat:${c.color}" data-delay="${(i % 8) * 40}">
      <span class="sub-ico"><span class="cat-svg">${catIconSvg(c.icon)}</span></span>
      <span class="exam-sec-txt">
        <b>${esc(c.title.en)}</b>
        <span class="exam-sec-as">${esc(c.title.as)}</span>
      </span>
      <span class="exam-sec-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>
    </a>`).join("") + `</div>`;
}

function main() {
  const created = [];

  /* 1. Section manifest */
  const index = {
    meta: {
      title: { en: "Free Current Affairs", as: "বিনামূলীয়া চলিত ঘটনাৱলী" },
      note: "Add a sub-category here and create data/current-affairs/<id>/index.json plus question-XXX.json files inside its folder.",
    },
    categories: CATEGORIES.map((c) => ({
      id: c.id,
      color: c.color,
      icon: c.icon,
      title: c.title,
      intro: c.intro,
    })),
  };
  created.push(write(`${DIR}/index.json`, JSON.stringify(index, null, 2) + "\n"));

  /* 2. Per-category data + sample question + static page */
  CATEGORIES.forEach((c) => {
    const catMeta = {
      id: c.id,
      title: c.title,
      color: c.color,
      icon: c.icon,
      intro: c.intro,
      updated: UPDATED,
      uploadedBy: UPLOADED_BY,
      files: [SAMPLE_FILE],
    };
    created.push(write(`${DIR}/${c.id}/index.json`, JSON.stringify(catMeta, null, 2) + "\n"));

    const question = {
      id: `${c.id}-001`,
      category: c.title.en,
      question_en: c.q.en,
      question_as: c.q.as,
      answer_en: c.q.aen,
      answer_as: c.q.aas,
      explanation_en: c.q.een,
      explanation_as: c.q.eas,
      uploadedAt: UPDATED,
      uploadedBy: UPLOADED_BY,
    };
    created.push(write(`${DIR}/${c.id}/${SAMPLE_FILE}`, JSON.stringify(question, null, 2) + "\n"));

    created.push(write(`current-affairs/${c.id}/index.html`, shellPage({
      cat: c,
      catHref: `/current-affairs/${c.id}`,
    })));
  });

  /* 3. Landing static page */
  created.push(write("current-affairs/index.html", shellPage({
    cat: null,
    catHref: "/current-affairs",
    cardsHtml: cardGridHtml(),
  })));

  /* 4. Sitemap */
  const urls = ["/current-affairs"].concat(CATEGORIES.map((c) => `/current-affairs/${c.id}`));
  updateSitemap(urls);

  console.log(`Current affairs files written: ${created.length}`);
  console.log(`Categories: ${CATEGORIES.length}`);
  console.log(`Sitemap URLs added: ${urls.length}`);
}

function updateSitemap(urls) {
  if (!fs.existsSync(SITEMAP)) return;
  let xml = fs.readFileSync(SITEMAP, "utf8");
  const additions = [];
  urls.forEach((u) => {
    const loc = BASE + u + "/";
    if (xml.includes(`<loc>${loc}</loc>`)) return;
    additions.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${UPDATED}</lastmod>\n  </url>`);
  });
  if (!additions.length) return;
  xml = xml.replace("</urlset>", additions.join("\n") + "\n</urlset>");
  fs.writeFileSync(SITEMAP, xml, "utf8");
}

main();
