/* ============================================================
   axomexam — app.js
   Application logic: i18n, navigation, routing, rendering,
   search, Q&A reader, Math Engine (Assamese + English), Mock Tests,
   Dedicated Downloads Search, Detailed Bilingual AdSense Legal Pages,
   Mobile-Optimized Clean Article Reader for Study Guides,
   Pure Path-Based Routing (No # Hashes Anywhere).
   Domain: axomexam.in
   Default UI Language: English ("en").
   ============================================================ */

(() => {
  "use strict";

  /* ================= State ================= */
  const state = {
    categories: [],        
    topicMap: {},          
    topicIndex: [],        
    ready: false,
    page: 0,               
    lang: "as",            
    uiLang: "en",          
    mock: null,            
    isGeneratingPdf: false,
    mockSetCache: {},
    examMockSetCache: {},
    mockSetCount: {},
    mockLiveCounts: {},
    exams: null,
    examQuestionTotal: 0,
    examTotalLoaded: false,
    examTotalPromise: null,
    counts: null,
    topicsTotal: 0,
    mockTotal: 0,
    caCounts: null,
    caQuestionTotal: 0,
    caTotalPromise: null,
    searchCorpusReady: false
  };

  /* Max mock test set number to probe per subcategory */
  const MAX_MOCK_SETS = 20;
  /* Minimum number of set cards to show once at least one set exists */
  const DEFAULT_VISIBLE_SETS = 5;
  /* Exam-wise mock tests go live one exam at a time: an exam is playable once
     its section-wise paper blueprint (data/exam-mock-sets/blueprints/<id>.json)
     is published. Exams not listed here keep the bilingual "we'll be back in
     1-2 hours" notice. Set EXAM_WISE_FORCE_UPGRADE to true to take the whole
     portal down again without touching the list. */
  const EXAM_WISE_FORCE_UPGRADE = false;
  const EXAM_WISE_LIVE = ["assam-police-si", "assam-police", "adre-grade-3", "adre-grade-4", "dhs-dme", "dhs-dme-technical", "dhs-dme-grade-4"];
  const examWiseIsLive = (id) => !EXAM_WISE_FORCE_UPGRADE && EXAM_WISE_LIVE.indexOf(id) !== -1;
  /* Curated hub order. Live exams follow this priority (any live exam not
     listed ranks after those that are); every Coming Soon exam is pushed to
     the end, so it can never sit above a live paper. An exam takes its slot
     as soon as its first set is published. */
  const EXAM_HUB_ORDER = ["assam-police-si", "assam-police", "adre-grade-3", "adre-grade-4", "dhs-dme-technical", "dhs-dme", "dhs-dme-grade-4", "guwahati-hc"];
  const orderExamWiseHub = (exams) => exams
    .map((e, i) => ({ e, i }))
    .sort((a, b) => {
      const rank = (x) => {
        if (!examIsAvailable(x.e)) return 1000;
        const j = EXAM_HUB_ORDER.indexOf(x.e.id);
        return j === -1 ? 500 : j;
      };
      return (rank(a) - rank(b)) || (a.i - b.i);
    })
    .map((x) => x.e);
  /* Number of real downloadable PDF files shipped with the site. Kept in
     sync by tools/inject-static-questions.js so the homepage never claims
     more PDFs than it actually serves. */
  const PDF_NOTE_COUNT = 21;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ================= On-demand third-party libraries =================
     html2canvas / jsPDF are only needed when the user generates a PDF or
     shares a result card. KaTeX is only needed on pages that actually
     contain math delimiters. All three are loaded lazily instead of
     shipping ~600 KB of unused JavaScript on every page. */
  let _pdfLibsPromise = null;
  let _html2canvasPromise = null;
  let _katexPromise = null;

  function loadScriptOnce(src, timeoutMs) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      let settled = false;
      const finish = (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        s.onload = s.onerror = null;
        if (err) {
          if (s.parentNode) s.parentNode.removeChild(s);
          reject(err);
        } else {
          resolve();
        }
      };
      const timer = setTimeout(() => finish(new Error("Timed out loading " + src)), timeoutMs || 15000);
      s.src = src;
      s.async = true;
      s.onload = () => finish();
      s.onerror = () => finish(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  /* Try mirrors in order so a blocked/slow CDN never breaks PDF export. */
  async function loadScriptWithFallback(urls, timeoutMs) {
    let lastErr = null;
    for (let i = 0; i < urls.length; i++) {
      try {
        await loadScriptOnce(urls[i], timeoutMs);
        return;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error("Failed to load script");
  }

  function loadStyleOnce(id, href) {
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  function ensureKatex() {
    if (typeof window.renderMathInElement === "function") return Promise.resolve();
    if (!_katexPromise) {
      loadStyleOnce("katex-css", "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css");
      _katexPromise = loadScriptOnce("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js")
        .then(() => loadScriptOnce("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"))
        .catch((e) => { _katexPromise = null; throw e; });
    }
    return _katexPromise;
  }

  const HTML2CANVAS_URLS = [
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
    "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
    "https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"
  ];
  const JSPDF_URLS = [
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
    "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
    "https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"
  ];

  function ensureHtml2canvas() {
    if (window.html2canvas) return Promise.resolve();
    if (!_html2canvasPromise) {
      _html2canvasPromise = loadScriptWithFallback(HTML2CANVAS_URLS, 15000)
        .catch((e) => { _html2canvasPromise = null; throw e; });
    }
    return _html2canvasPromise;
  }

  function ensurePdfLibs() {
    if (window.jspdf && window.html2canvas) return Promise.resolve();
    if (!_pdfLibsPromise) {
      _pdfLibsPromise = (async () => {
        if (!window.html2canvas) await ensureHtml2canvas();
        if (!window.jspdf) {
          await loadScriptWithFallback(JSPDF_URLS, 15000);
        }
      })().catch((e) => { _pdfLibsPromise = null; throw e; });
    }
    return _pdfLibsPromise;
  }

  /* Direct Vector Brand Logo */
  const BRAND_LOGO_SVG = `
    <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="8" fill="url(#gradLogo)"/>
      <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
      <text x="38" y="21" fill="currentColor" style="color:var(--ink, #0f172a);" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#3b82f6">.in</tspan></text>
    </svg>
  `;

  /* PDF Optimized Vector Logo */
  const PDF_BRAND_LOGO_SVG = `
    <svg width="146" height="28" viewBox="0 0 146 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogoPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill="url(#gradLogoPdf)"/>
      <text x="14" y="19.5" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">A</text>
      <text x="36" y="19.5" fill="#0f172a" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="-0.3">axomexam<tspan fill="#2563eb">.in</tspan></text>
    </svg>
  `;

  /* ================= i18n helpers ================= */
  function t(key) {
    if (typeof I18N !== "undefined") {
      const langObj = I18N[state.uiLang] || I18N.en || I18N.as;
      if (langObj && langObj[key]) return langObj[key];
      if (I18N.en && I18N.en[key]) return I18N.en[key];
    }
    return key;
  }

  /* Content-language variant of t(): follows the URL-derived content
     language rather than the interface toggle, so `/as/` pages render
     Assamese page headings and body copy while the header chrome stays
     in the visitor's chosen interface language. Falls back to English. */
  function tc(key) {
    if (typeof I18N !== "undefined") {
      const l = state.lang || "en";
      const langObj = I18N[l];
      if (langObj && langObj[key]) return langObj[key];
      if (I18N.en && I18N.en[key]) return I18N.en[key];
    }
    return key;
  }

  /* Fixed-language lookup for the few places that must show both languages
     at once (bilingual notices), independent of the interface toggle. */
  function tLang(key, lang) {
    if (typeof I18N !== "undefined" && I18N[lang] && I18N[lang][key]) return I18N[lang][key];
    return t(key);
  }

  /* Translate a key and fill {placeholder} slots. Used by the exam-wise setup
     panel, whose time / marks / marking text and instruction rules are derived
     from the exam's blueprint rather than hardcoded, so Assam Police (100 Q,
     50 marks, 2 h, no negative marking) and ADRE Grade III (150 Q, 150 marks,
     3 h, 0.25 negative marking) each read correctly. */
  function tf(key, vars) {
    return String(t(key)).replace(/\{(\w+)\}/g, (m, name) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : m
    );
  }

  /* Same as tf() but for a fixed language, used for the bilingual instruction
     rules whose Assamese twin must also follow the blueprint numbers. */
  function tfLang(key, lang, vars) {
    return String(tLang(key, lang)).replace(/\{(\w+)\}/g, (m, name) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : m
    );
  }

  /* Content strings (category/topic/exam names, descriptions, body prose)
     follow the URL-derived content language, not the interface toggle.
     The header toggle switches chrome only; `/as/` pages must render
     Assamese content even when the interface is left in English. */
  function localized(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = state.lang || "en";
    return obj[l] || obj.en || obj.as || "";
  }

  /* Menu chrome follows the interface language, not the content language:
     an /as/ page renders Assamese content but keeps the header, dropdown and
     mobile menu in English until the visitor flips the header EN/অসমীয়া
     toggle. Content strings keep using localized(). */
  function navName(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = state.uiLang || "en";
    return obj[l] || obj.en || obj.as || "";
  }

  /* Practice cards show the English and Assamese names together, the same
     way the exam-book cards do. English is the primary label; the Assamese
     name is rendered underneath and only when it differs from the English. */
  function catNameHTML(obj) {
    const en = ebkLang(obj, "en");
    const as = ebkLang(obj, "as");
    const asLine = as && as !== en ? `<span class="cat-as">${escapeHtml(as)}</span>` : "";
    return `<b>${escapeHtml(en)}</b>${asLine}`;
  }

  function subNameHTML(obj, fontSize) {
    const en = ebkLang(obj, "en");
    const as = ebkLang(obj, "as");
    const asLine = as && as !== en ? `<span class="sub-as">${escapeHtml(as)}</span>` : "";
    return `<span style="font-weight:600; font-size:${fontSize}; color:var(--ink,#0f172a);">${escapeHtml(en)}</span>${asLine}`;
  }

  /* ================= Deep content for thin hub pages =================
     These blurbs describe the real scope of each subject. They are
     combined with live data (topic names + real question counts) so that
     every category, mock-test and previous-year page carries genuine,
     page-specific study content instead of a bare list of links. */
  const SUBJECT_INFO = {
    gk: "General Knowledge carries a large weight in almost every Assam recruitment examination. It combines Assam-specific history, literature, geography, art and culture with Indian polity, history, geography and economics. Because the section is factual and predictable, consistent revision usually converts into a high, reliable score in ADRE, Assam Police and APSC papers.",
    "assam-history": "Assam History covers the ancient Kamarupa kingdom and its rulers, the medieval Ahom and Koch dynasties, the Burmese invasions and the Treaty of Yandabo, and the colonial and freedom-struggle period. Questions generally test dynasties, capitals, battles, treaties and administrative reforms.",
    "assam-literature": "Assam Literature spans the pre-Vaishnavite period, Sankaradeva and the Vaishnavite age, the Ahom-era chronicles, and the modern era from Arunodoi to Jonaki. Aspirants are asked about authors, works, literary movements and major awards.",
    "indian-history": "Indian History covers ancient civilisations, the Mauryas and Guptas, medieval Sultanates and the Mughals, and the modern freedom movement. Questions focus on timelines, personalities, administrative systems and landmark events.",
    polity: "Political Science covers the Indian Constitution, fundamental rights and duties, the Union and State machinery, panchayati raj, and Assam-specific provisions such as the Sixth Schedule and Article 371B. It is a high-scoring, factual section.",
    geography: "Geography covers physical, economic and social geography with dedicated blocks on the rivers, hills, climate and resources of Assam, alongside Indian and world geography. Map-based and location questions are common.",
    economics: "Economics covers basic economic concepts, Indian economic policy and planning, budgeting and banking, along with the agriculture and industry of Assam. Questions are mostly conceptual and current-affairs linked.",
    "art-culture": "Art and Culture covers the festivals, dance, music, crafts, temples and heritage of Assam and India. Questions test classical dances, musical instruments, festivals, monuments and folk traditions.",
    math: "Mathematics tests numerical ability and quantitative aptitude and is one of the biggest scoring areas in ADRE, Assam Police, SSC and Railway tests. It brings together arithmetic, advanced math and statistics with data interpretation.",
    arithmetic: "Arithmetic covers percentages, profit and loss, ratio and proportion, averages, time-speed-distance, time and work, simple and compound interest, and mensuration. These topics carry the largest number of questions in state recruitment papers.",
    "advanced-math": "Advanced Math covers algebra, geometry, trigonometry, number systems and higher-level problem solving. It is especially useful for APSC, SSC and technical posts.",
    "statistics-and-data-interpretation": "Statistics and Data Interpretation covers averages, measures of central tendency, tables, bar and pie charts, and line graphs. The focus is on fast calculation and reading data accurately.",
    science: "General Science covers Physics, Chemistry and Biology at a Class 6 to 10 level, which is the standard followed by Assam government recruitment tests. Questions test everyday science, definitions, units and simple applications.",
    physics: "Physics covers motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and the basics of modern physics. Units, definitions and simple numericals are frequently asked.",
    chemistry: "Chemistry covers matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry. Chemical formulae and common reactions are important.",
    biology: "Biology covers the human body and its systems, nutrition and health, plants, cell biology, ecology and the environment. Health and disease questions are common in Assam Police and ADRE tests.",
    reasoning: "Reasoning Ability tests logical and analytical thinking through verbal, non-verbal and critical reasoning questions. Because speed and accuracy decide the score, timed practice is essential.",
    "verbal-reasoning": "Verbal Reasoning covers series, coding-decoding, blood relations, direction sense, analogy and classification. Most questions become quick to solve with regular practice.",
    "analytical-critical-reasoning": "Analytical and Critical Reasoning covers statements and conclusions, assumptions, syllogism, seating arrangement and puzzles. It rewards careful reading over guesswork.",
    "non-verbal-reasoning": "Non-Verbal Reasoning covers figure series, mirror and water images, paper folding, embedded figures and pattern completion. Spatial visualisation is the main skill tested.",
    english: "General English tests grammar, vocabulary, sentence structure and comprehension. It appears in ADRE, Assam Police, SSC and Railway exams and is relatively easy to score with steady revision.",
    "parts-of-speech": "Parts of Speech covers nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections, and how each of them functions inside a sentence.",
    grammar: "Grammar covers tenses, articles, subject-verb agreement, active and passive voice, direct and indirect speech, and common error spotting.",
    "sentence-structure": "Sentence Structure covers sentence types, phrases and clauses, sentence correction, and paragraph organisation and ordering.",
    vocabulary: "Vocabulary covers synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling. Regular reading and short word lists help the most.",
    computer: "Computer Awareness tests the fundamentals of computers, software and operating systems, MS Office, networking and the internet, cyber security, DBMS and number systems. It is a quick-scoring section in ADRE and other state tests.",
    "fundamentals-hardware": "Computer Fundamentals and Hardware covers input and output devices, memory, storage, the CPU and the generations of computers.",
    "software-os": "Software and Operating Systems covers types of software, the functions of an operating system, file management, and common Windows and Linux features.",
    "ms-office-suite": "MS Office Suite covers Microsoft Word, Excel and PowerPoint, including commonly used menu options, shortcuts and formulas.",
    "networking-internet": "Networking and Internet covers network types and topologies, IP addresses, protocols such as HTTP and FTP, browsers, email and internet services.",
    "cyber-security": "Cyber Security covers online threats such as viruses, malware, phishing and hacking, along with passwords, encryption and safe internet practices.",
    "dbms-number-shortcuts": "DBMS, Number System and Shortcuts covers database basics, number system conversions, and keyboard shortcuts with their common uses.",
    articles: "Articles are long-form, easy-reading study pieces that explain a topic in depth and in simple bilingual language, so you can build conceptual clarity before attempting questions.",
    "assam-police": "Assam Police previous year papers help you understand the actual question pattern, difficulty level and frequently repeated topics for Sub-Inspector and Constable recruitment conducted by SLPRB.",
    "dhs-dme": "DHS and DME previous year papers cover the question patterns for Directorate of Health Services and Directorate of Medical Education recruitment in Assam.",
    "guwahati-hc": "Guwahati High Court previous year papers cover the pattern for Grade III, Grade IV, Junior Assistant (JAA) and related recruitment under the High Court of Assam.",
    railway: "Railway previous year papers cover NTPB, Group D, ALP and related central railway recruitment patterns, including the computer-based test structure.",
    ssc: "SSC previous year papers cover CGL, CHSL, MTS and related central government recruitment patterns, useful for candidates preparing for both central and state posts."
  };

  /* Assamese parallel of SUBJECT_INFO, mirrored in data/i18n/subject-info-as.json. */
  const SUBJECT_INFO_AS = {
    "gk": "প্ৰায় প্ৰতিটো অসম নিয়োগ পৰীক্ষাত সাধাৰণ জ্ঞানৰ ভাৰ যথেষ্ট বেছি। ইয়াত অসম-নিৰ্দিষ্ট ইতিহাস, সাহিত্য, ভূগোল, কলা-সংস্কৃতিৰ লগতে ভাৰতীয় ৰাজনীতি, ইতিহাস, ভূগোল আৰু অৰ্থনীতি সন্নিৱিষ্ট। শিতানটো তথ্যভিত্তিক আৰু পূৰ্বানুমেয় হোৱাৰ বাবে নিয়মীয়া পুনৰালোচনাই ADRE, অসম আৰক্ষী আৰু APSC ৰ প্ৰশ্নকাকতত উচ্চ আৰু নিৰ্ভৰযোগ্য নম্বৰলৈ ৰূপান্তৰিত হয়।",
    "assam-history": "অসমৰ ইতিহাসত প্ৰাচীন কামৰূপ ৰাজ্য আৰু তাৰ শাসকসকল, মধ্যযুগীয় আহোম আৰু কোচ ৰাজবংশ, বৰ্মী আক্ৰমণ আৰু য়াণ্ডাবু সন্ধি, লগতে উপনিবেশিক আৰু স্বাধীনতা-সংগ্ৰামৰ কাল সামৰি লোৱা হৈছে। প্ৰশ্নত সাধাৰণতে ৰাজবংশ, ৰাজধানী, যুদ্ধ, সন্ধি আৰু প্ৰশাসনিক সংস্কাৰৰ ওপৰত গুৰুত্ব দিয়া হয়।",
    "assam-literature": "অসমীয়া সাহিত্যই প্ৰাক-বৈষ্ণৱ যুগ, শংকৰদেৱ আৰু বৈষ্ণৱ যুগ, আহোম-যুগৰ বুৰঞ্জী, আৰু অৰুণোদয়ৰ পৰা জোনাকীলৈকে আধুনিক যুগ সামৰি লৈছে। প্ৰাৰ্থীসকলক লেখক, ৰচনা, সাহিত্যিক আন্দোলন আৰু প্ৰধান বঁটাৰ বিষয়ে সোধা হয়।",
    "indian-history": "ভাৰতৰ ইতিহাসত প্ৰাচীন সভ্যতা, মৌৰ্য আৰু গুপ্ত, মধ্যযুগীয় চুলতানী আৰু মোগল, আৰু আধুনিক স্বাধীনতা আন্দোলন সামৰি লোৱা হৈছে। প্ৰশ্নত সময়ৰেখা, ব্যক্তিত্ব, প্ৰশাসনিক ব্যৱস্থা আৰু যুগান্তকাৰী ঘটনাৰ ওপৰত গুৰুত্ব দিয়া হয়।",
    "polity": "ৰাজনীতি বিজ্ঞানত ভাৰতীয় সংবিধান, মৌলিক অধিকাৰ আৰু কৰ্তব্য, সংঘ আৰু ৰাজ্যৰ শাসন-ব্যৱস্থা, পঞ্চায়তী ৰাজ, আৰু ষষ্ঠ অনুসূচী তথা অনুচ্ছেদ 371B ৰ দৰে অসম-নিৰ্দিষ্ট বিধান সামৰি লোৱা হৈছে। ই এক উচ্চ নম্বৰ দিয়া, তথ্যভিত্তিক শিতান।",
    "geography": "ভূগোলত ভৌতিক, অৰ্থনৈতিক আৰু সামাজিক ভূগোল সামৰি লোৱা হৈছে, লগতে অসমৰ নদ-নদী, পাহাৰ, জলবায়ু আৰু সম্পদৰ ওপৰত সুকীয়া অংশ, আৰু ভাৰতীয় তথা বিশ্ব ভূগোল। মানচিত্ৰভিত্তিক আৰু স্থান-সংক্ৰান্ত প্ৰশ্ন সঘনাই আহে।",
    "economics": "অৰ্থনীতিত মূল অৰ্থনৈতিক ধাৰণা, ভাৰতীয় অৰ্থনৈতিক নীতি আৰু পৰিকল্পনা, বাজেট আৰু বেংকিং, লগতে অসমৰ কৃষি আৰু উদ্যোগ সামৰি লোৱা হৈছে। প্ৰশ্নবোৰ বেছিভাগ ধাৰণাগত আৰু চলিত ঘটনাৱলীৰ সৈতে সংযুক্ত।",
    "art-culture": "কলা আৰু সংস্কৃতিত অসম আৰু ভাৰতৰ উৎসৱ, নৃত্য, সংগীত, হস্তশিল্প, মন্দিৰ আৰু ঐতিহ্য সামৰি লোৱা হৈছে। প্ৰশ্নত শাস্ত্ৰীয় নৃত্য, সংগীত-যন্ত্ৰ, উৎসৱ, স্মৃতিস্তম্ভ আৰু লোক-পৰম্পৰা পৰীক্ষা কৰা হয়।",
    "math": "গণিতে সংখ্যাগত দক্ষতা আৰু পৰিমাণগত অভিৰুচি পৰীক্ষা কৰে আৰু ADRE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ আটাইতকৈ বেছি নম্বৰ দিয়া ক্ষেত্ৰসমূহৰ এটা। ইয়াত পাটিগণিত, উচ্চ গণিত আৰু তথ্য বিশ্লেষণসহ পৰিসংখ্যা একত্ৰিত কৰা হৈছে।",
    "arithmetic": "পাটিগণিতত শতকৰা, লাভ-লোকচান, অনুপাত আৰু সমানুপাত, গড়, সময়-দূৰত্ব, সময় আৰু কাম, সৰল আৰু যৌগিক সুত, আৰু ক্ষেত্ৰমিতি সামৰি লোৱা হৈছে। ৰাজ্যিক নিয়োগৰ প্ৰশ্নকাকতত এই বিষয়বোৰৰ পৰাই আটাইতকৈ বেছি প্ৰশ্ন আহে।",
    "advanced-math": "উচ্চ গণিতত বীজগণিত, জ্যামিতি, ত্ৰিকোণমিতি, সংখ্যা প্ৰণালী আৰু উচ্চস্তৰৰ সমস্যা সমাধান সামৰি লোৱা হৈছে। ই বিশেষকৈ APSC, SSC আৰু কাৰিকৰী পদৰ বাবে উপযোগী।",
    "statistics-and-data-interpretation": "পৰিসংখ্যা আৰু তথ্য বিশ্লেষণত গড়, কেন্দ্ৰীয় প্ৰৱণতাৰ মাপ, তালিকা, দণ্ড আৰু পাই চিত্ৰ, আৰু ৰৈখিক লেখ সামৰি লোৱা হৈছে। ইয়াৰ মূল লক্ষ্য দ্ৰুত গণনা আৰু তথ্য শুদ্ধভাৱে পঢ়া।",
    "science": "সাধাৰণ বিজ্ঞানত ষষ্ঠৰ পৰা দশম শ্ৰেণীৰ স্তৰত পদাৰ্থ বিজ্ঞান, ৰসায়ন বিজ্ঞান আৰু জীৱ বিজ্ঞান সামৰি লোৱা হৈছে, যি অসম চৰকাৰৰ নিয়োগ পৰীক্ষাত অনুসৰণ কৰা মান। প্ৰশ্নত দৈনন্দিন বিজ্ঞান, সংজ্ঞা, একক আৰু সৰল প্ৰয়োগ পৰীক্ষা কৰা হয়।",
    "physics": "পদাৰ্থ বিজ্ঞানত গতি, বল, কাম আৰু শক্তি, মহাকৰ্ষণ, তাপ, পোহৰ, ধ্বনি, বিদ্যুৎ আৰু চুম্বকত্ব, আৰু আধুনিক পদাৰ্থ বিজ্ঞানৰ মূল কথা সামৰি লোৱা হৈছে। একক, সংজ্ঞা আৰু সৰল সংখ্যাগত প্ৰশ্ন সঘনাই সোধা হয়।",
    "chemistry": "ৰসায়ন বিজ্ঞানত পদাৰ্থ, পৰমাণু আৰু অণু, পৰ্যায়বৃত্ত তালিকা, অম্ল আৰু ক্ষাৰক, ধাতু আৰু অধাতু, আৰু দৈনন্দিন ৰসায়ন সামৰি লোৱা হৈছে। ৰাসায়নিক সংকেত আৰু সাধাৰণ বিক্ৰিয়া গুৰুত্বপূৰ্ণ।",
    "biology": "জীৱ বিজ্ঞানত মানৱ শৰীৰ আৰু তাৰ তন্ত্ৰ, পুষ্টি আৰু স্বাস্থ্য, উদ্ভিদ, কোষ বিজ্ঞান, পৰিৱেশ বিজ্ঞান আৰু পৰিৱেশ সামৰি লোৱা হৈছে। অসম আৰক্ষী আৰু ADRE পৰীক্ষাত স্বাস্থ্য আৰু ৰোগ-সংক্ৰান্ত প্ৰশ্ন সঘনাই আহে।",
    "reasoning": "যুক্তি আৰু মানসিক ক্ষমতাই ভাষিক, চিত্ৰভিত্তিক আৰু বিশ্লেষণাত্মক যুক্তিতৰ্কৰ জৰিয়তে যুক্তি আৰু বিশ্লেষণাত্মক চিন্তা পৰীক্ষা কৰে। গতি আৰু শুদ্ধতাই নম্বৰ নিৰ্ধাৰণ কৰে বাবে সময়বদ্ধ অনুশীলন অতি প্ৰয়োজনীয়।",
    "verbal-reasoning": "ভাষিক যুক্তিতৰ্কত শ্ৰেণী, সংকেত-আবোৰণ, ৰক্তসম্পৰ্ক, দিশ-জ্ঞান, সাদৃশ্য আৰু শ্ৰেণীবিভাজন সামৰি লোৱা হৈছে। নিয়মীয়া অনুশীলনৰ লগে লগে বেছিভাগ প্ৰশ্ন দ্ৰুতভাৱে সমাধান কৰিব পৰা যায়।",
    "analytical-critical-reasoning": "বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্কত উক্তি আৰু সিদ্ধান্ত, অনুমান, ন্যায়-নিৰ্ণয়, আসন-বিন্যাস আৰু ধাঁধা সামৰি লোৱা হৈছে। ই অনুমানতকৈ সাৱধানে পঢ়াৰ ওপৰত গুৰুত্ব দিয়ে।",
    "non-verbal-reasoning": "চিত্ৰভিত্তিক যুক্তিতৰ্কত চিত্ৰ শ্ৰেণী, দাপোণ আৰু জল প্ৰতিবিম্ব, কাগজ ভাঁজ, অন্তৰ্নিহিত চিত্ৰ আৰু আৰ্হি সম্পূৰ্ণ কৰা সামৰি লোৱা হৈছে। ইয়াত মূলত স্থানিক কল্পনাশক্তি পৰীক্ষা কৰা হয়।",
    "english": "সাধাৰণ ইংৰাজীয়ে ব্যাকৰণ, শব্দভাণ্ডাৰ, বাক্য গঠন আৰু বুজি-পঢ়াৰ ক্ষমতা পৰীক্ষা কৰে। ই ADRE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাত আহে আৰু নিয়মীয়া পুনৰালোচনাৰে তুলনামূলকভাৱে সহজে নম্বৰ পোৱা যায়।",
    "parts-of-speech": "পদ প্ৰকাৰণত বিশেষ্য, সৰ্বনাম, ক্ৰিয়া, বিশেষণ, ক্ৰিয়া-বিশেষণ, সম্বন্ধবাচক, সংযোজক আৰু আবেগসূচক সামৰি লোৱা হৈছে, আৰু বাক্যত প্ৰতিটোৰ কাৰ্য বৰ্ণনা কৰা হৈছে।",
    "grammar": "ব্যাকৰণত কাল, নিৰ্দেশক, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, প্ৰত্যক্ষ আৰু পৰোক্ষ উক্তি, আৰু সাধাৰণ ভুল চিনাক্তকৰণ সামৰি লোৱা হৈছে।",
    "sentence-structure": "বাক্য গঠনত বাক্যৰ প্ৰকাৰ, বাক্যাংশ আৰু উপবাক্য, বাক্য সংশোধন, আৰু অনুচ্ছেদ সংগঠন আৰু ক্ৰমবিন্যাস সামৰি লোৱা হৈছে।",
    "vocabulary": "শব্দভাণ্ডাৰত সমাৰ্থক শব্দ, বিপৰীত শব্দ, এক-শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বাক্যাংশ, আৰু বানান সামৰি লোৱা হৈছে। নিয়মীয়া পঢ়া আৰু চুটি শব্দ-তালিকাই আটাইতকৈ বেছি সহায় কৰে।",
    "computer": "কম্পিউটাৰ সজাগতাই কম্পিউটাৰৰ মূল কথা, ছফ্টৱেৰ আৰু অপাৰেটিং চিষ্টেম, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা প্ৰণালী পৰীক্ষা কৰে। ADRE আৰু অন্যান্য ৰাজ্যিক পৰীক্ষাত ই দ্ৰুত নম্বৰ দিয়া শিতান।",
    "fundamentals-hardware": "কম্পিউটাৰৰ মূল কথা আৰু হাৰ্ডৱেৰত ইনপুট আৰু আউটপুট যন্ত্ৰ, স্মৃতি, সংৰক্ষণ, CPU আৰু কম্পিউটাৰৰ প্ৰজন্ম সামৰি লোৱা হৈছে।",
    "software-os": "ছফ্টৱেৰ আৰু অপাৰেটিং চিষ্টেমত ছফ্টৱেৰৰ প্ৰকাৰ, অপাৰেটিং চিষ্টেমৰ কাৰ্য, ফাইল পৰিচালনা, আৰু Windows আৰু Linux ৰ সাধাৰণ বৈশিষ্ট্য সামৰি লোৱা হৈছে।",
    "ms-office-suite": "MS Office Suite ত Microsoft Word, Excel আৰু PowerPoint সামৰি লোৱা হৈছে, লগতে সঘনাই ব্যৱহৃত মেনু বিকল্প, চৰ্টকাট আৰু সূত্ৰ।",
    "networking-internet": "নেটৱৰ্কিং আৰু ইণ্টাৰনেটত নেটৱৰ্কৰ প্ৰকাৰ আৰু ট'পলজি, IP ঠিকনা, HTTP আৰু FTP ৰ দৰে প্ৰট'কল, ব্ৰাউজাৰ, ইমেইল আৰু ইণ্টাৰনেট সেৱা সামৰি লোৱা হৈছে।",
    "cyber-security": "চাইবাৰ সুৰক্ষাত ভাইৰাছ, মেলৱেৰ, ফিশ্বিং আৰু হেকিঙৰ দৰে অনলাইন ভাবুকি, লগতে সুৰক্ষিত ইণ্টাৰনেট অভ্যাস সামৰি লোৱা হৈছে।",
    "dbms-number-shortcuts": "DBMS, সংখ্যা প্ৰণালী আৰু চৰ্টকাটত ডাটাবেছৰ মূল কথা, সংখ্যা প্ৰণালীৰ ৰূপান্তৰ, আৰু কীব'ৰ্ড চৰ্টকাট সামৰি লোৱা হৈছে।",
    "articles": "প্ৰবন্ধবোৰ হৈছে দীঘলীয়া, সহজ-পঢ়া অধ্যয়ন ৰচনা যিয়ে এটা বিষয় গভীৰভাৱে আৰু সৰল ভাষাত ব্যাখ্যা কৰে। সংগ্ৰহটোৱে সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি লৈছে।",
    "assam-police": "অসম আৰক্ষীৰ বিগত বছৰৰ প্ৰশ্নকাকতে প্ৰকৃত প্ৰশ্নৰ আৰ্হি, কঠিনতা আৰু বাৰে বাৰে অহা বিষয়সমূহ বুজিবলৈ সহায় কৰে। এই পৃষ্ঠাৰ পৰা আপুনি প্ৰশ্নকাকত ডাউনলোড কৰি পৰীক্ষাৰ আগতে অনুশীলন কৰিব পাৰে।",
    "dhs-dme": "DHS আৰু DME ৰ বিগত বছৰৰ প্ৰশ্নকাকতে স্বাস্থ্য সেৱা সঞ্চালকালয় (DHS) আৰু চিকিৎসা শিক্ষা সঞ্চালকালয় (DME) ৰ পৰীক্ষাৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।",
    "guwahati-hc": "গুৱাহাটী উচ্চ ন্যায়ালয়ৰ বিগত বছৰৰ প্ৰশ্নকাকতে গ্ৰেড III, গ্ৰেড IV, জুনিয়ৰ সহায়ক আৰু অন্যান্য পদৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।",
    "railway": "ৰে'লৱেৰ বিগত বছৰৰ প্ৰশ্নকাকতে NTPC, Group D, ALP আৰু সম্পৰ্কিত কেন্দ্ৰীয় ৰে'লৱে নিয়োগ পৰীক্ষাৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।"
  };

  /* ==== BEGIN GENERATED DEEP CONTENT (scripts/build-deep-content.js) ==== */
  const DEEP_CONTENT = {"arithmetic":{"title":"Arithmetic Questions and Short Tricks for ADRE, APSC and Assam Police | axomexam","meta":"Free arithmetic practice for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Percentage, profit and loss, ratio, average, time and work, SI and CI with bilingual explanations.","lead":["Arithmetic is the backbone of the quantitative aptitude section in almost every Assam government recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, DHS, DME, Gauhati High Court, SSC and Railway papers all test the same core arithmetic chapters, and these questions often decide whether a candidate clears the cut-off.","On axomexam the subject is organised chapter by chapter so that you can build speed and accuracy step by step. Every topic links to a practice set with worked solutions in English and Assamese, so you learn the exact method the examiner expects instead of memorising individual answers."],"sections":[{"h":"Why arithmetic decides your mathematics score","p":["Numerical ability usually carries 15 to 25 questions in Assam recruitment papers and arithmetic forms the largest share of that block. The questions are formula-based and repetitive, which means a well-practised candidate can solve them quickly and score reliably. Because the same chapters repeat across state and central exams, one solid round of arithmetic preparation pays off in several tests at the same time."]},{"h":"Arithmetic chapters covered on axomexam","list":["Number System and Simplification — divisibility rules, HCF, LCM, remainders, surds and fast calculation.","Percentage — increase and decrease, successive change and percentage-based word problems.","Ratio and Proportion — direct and inverse proportion and division of quantities.","Profit, Loss and Discount — cost price, selling price, marked price, successive discounts and dishonest-dealer problems.","Average — simple average, weighted average and average age and speed problems.","Time and Work — efficiency, work and wages and pipes and cisterns.","Time, Speed and Distance — relative speed, problems on trains, boats and streams.","Simple and Compound Interest — instalments, growth and depreciation.","Mensuration — area, perimeter, volume and surface area of standard shapes.","Problems on Ages, Partnership and Mixture and Alligation."]},{"h":"Most repeated arithmetic chapters in ADRE and Assam Police","p":["Based on past papers, the following chapters appear again and again and deserve extra revision: percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest, and mensuration. If you are short on time, master these eight first."]},{"h":"How to prepare arithmetic for Assam exams","list":["Learn the formula or short method for a chapter before attempting its questions.","Solve 15 to 20 questions per topic every day and time yourself with a stopwatch.","Keep a formula notebook and revise it for five minutes before each practice session.","Read the explanation for every wrong answer and note the exact reason for the mistake.","Re-attempt the same set after three days and check whether your accuracy has improved.","Take a full timed mock test every week to get used to exam-day pressure."]},{"h":"Common mistakes to avoid","list":["Rushing through reading and misreading values such as 'less than' and 'more than'.","Skipping the units and mixing percentages with absolute numbers.","Solving every question the long way instead of using short tricks.","Ignoring mensuration because it looks difficult — it is one of the most predictable chapters."]}],"faqs":[{"q":"Which arithmetic topics are most important for ADRE 2.0?","a":"Percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest and mensuration carry the highest marks. Practise these before the less frequently asked chapters."},{"q":"How can I improve my speed in arithmetic calculations?","a":"Use tables up to 20, squares up to 30, and percentage-to-fraction conversions. Practise with a timer and use approximation wherever the options allow it."},{"q":"Is arithmetic in Assam Police exams difficult?","a":"No. Assam Police arithmetic stays close to the standard patterns. With regular practice and correct basics, most candidates can attempt the entire section comfortably."},{"q":"Can I practise arithmetic in Assamese on axomexam?","a":"Yes. Questions and explanations are bilingual. You can switch between Assamese and English at any time, so the same concept is reinforced in both languages."},{"q":"How much time should I give to arithmetic every day?","a":"One to one-and-a-half hours of focused practice is enough for most aspirants. Spend the first 20 minutes on formulas and the rest on timed questions and error review."},{"q":"Is arithmetic practice on axomexam free?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}]},"non-verbal-reasoning":{"title":"Non-Verbal Reasoning Questions with Answers for ADRE and APSC | axomexam","meta":"Practice non-verbal reasoning for ADRE, Assam Police, APSC, SSC and Railway exams. Figure series, mirror and water images, paper folding, embedded figures, figure matrix, cube and dice.","lead":["Non-verbal reasoning tests how quickly you can read visual information such as figures, patterns, shapes and spatial arrangements. It does not depend on language or vocabulary, so the marks are decided purely by your powers of observation and practice.","This section appears in ADRE, Assam Police, APSC CCE, SSC, Railway and many other recruitment tests. On axomexam every chapter links to a practice set with clear visual explanations so you can train your eye to spot the rule behind each figure quickly."],"sections":[{"h":"What non-verbal reasoning actually tests","p":["Each question shows a sequence or a group of figures and asks you to find the next figure, the odd figure or the hidden figure. The underlying rule may involve rotation, reflection, addition or removal of parts, shading, or movement of elements. Once you identify the rule, the answer follows almost mechanically — which is why this section can become very high-scoring."]},{"h":"Non-verbal reasoning chapters covered on axomexam","list":["Image Series — find the next figure by tracking rotation, growth and shading.","Image Analogy — apply the same relationship between a pair of figures.","Image Classification — pick the figure that does not fit the group.","Mirror Images — reflect a figure across a vertical mirror line.","Water Images — reflect a figure across a horizontal water line.","Paper Folding and Paper Cutting — visualise the punched pattern after unfolding.","Embedded Figures — locate a smaller figure hidden inside a larger one.","Completion of Incomplete Pattern — identify the missing piece of a design.","Figure Matrix — follow the row and column logic of a matrix of figures.","Counting of Figures — count triangles, squares or straight lines in a complex figure.","Cube and Dice — solve painted-cube, dice-rule and opposite-face problems.","Rule Detection and Shape Construction."]},{"h":"Non-verbal reasoning preparation strategy","list":["Practise every chapter by drawing the figures yourself; the hand learns the pattern as fast as the eye.","For series questions, check rotation, number of elements, shading and symmetry one by one.","Memorise the dice rule and opposite-face tricks for cube and dice questions.","Solve at least 20 figures a day and note down the rule you missed for each wrong answer.","Use a mirror or folded paper for the first few mirror, water and paper-folding questions.","Attempt figure-based sets in timed blocks to build visual speed."]},{"h":"Common mistakes to avoid","list":["Guessing the rule from the first two figures instead of checking it against all figures.","Confusing clockwise and anticlockwise rotation.","Losing track of the number of dots, lines or shaded parts.","Rushing through counting-figures questions, which need a systematic point-by-point count."]}],"faqs":[{"q":"Is non-verbal reasoning hard to prepare?","a":"No. It rewards consistent practice more than talent. Once you learn the standard rule types, most questions become quick and mechanical."},{"q":"Which non-verbal topics are most important for ADRE and Assam Police?","a":"Image series, analogy, mirror and water images, paper folding and cutting, embedded figures and counting of figures are asked most frequently."},{"q":"How do I solve cube and dice questions quickly?","a":"Learn the dice rule for adjacent and opposite faces and the counting rule for painted cubes. With these two methods most questions can be solved in a few seconds."},{"q":"Can I practise non-verbal reasoning in Assamese?","a":"Yes. The practice sets and explanations are bilingual, so you can read them in Assamese or English and switch whenever you want."},{"q":"How much daily practice does non-verbal reasoning need?","a":"Twenty to thirty figures a day is enough. Regular short sessions work better than occasional long ones for visual reasoning."},{"q":"Is non-verbal reasoning practice free on axomexam?","a":"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"verbal-reasoning":{"title":"Verbal Reasoning Questions and Practice for ADRE, APSC and Assam Police | axomexam","meta":"Free verbal reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Analogy, coding-decoding, blood relations, direction sense, series, syllogism and clock and calendar.","lead":["Verbal reasoning checks how well you can find patterns in words, numbers and letters, and how logically you can follow a set of statements. It is one of the most reliable scoring areas in the reasoning section because the patterns repeat year after year.","This page covers the full verbal reasoning syllabus for ADRE, Assam Police, APSC CCE, SSC and Railway exams. Each chapter links to a practice set with step-by-step bilingual explanations so that you understand the logic behind every answer."],"sections":[{"h":"Why verbal reasoning is high-scoring","p":["Most verbal reasoning questions follow a fixed set of rules — the same logic that has appeared in previous papers. Coding-decoding, blood relations, direction sense and series in particular can be mastered with a handful of techniques. Once the rules are clear, these questions take little time and rarely go wrong."]},{"h":"Verbal reasoning chapters covered on axomexam","list":["Analogy — identify the relationship between a given pair of words or numbers.","Classification and Odd One Out — find the item that does not belong to the group.","Number Series, Alphabet Series and Alpha-Numeric Series.","Coding-Decoding — letter, number and symbol based coding rules.","Blood Relations — family trees, generations and coded relationships.","Direction and Distance Test — track movement and find the final direction.","Order and Ranking — arrange people by height, age, marks or position.","Alphabet Test and Word Formation.","Logical Venn Diagrams — decide the correct relationship between sets.","Syllogism — draw valid conclusions from given statements.","Clock and Calendar — angle, hands, odd days and day-of-the-week problems.","Mathematical Operations, Data Sufficiency and Input-Output."]},{"h":"Verbal reasoning preparation strategy","list":["Learn the standard rule for each chapter, then solve fifty questions of that chapter.","For series, always check difference, ratio, square, cube and alternating patterns in order.","Draw blood-relation and direction questions on paper instead of solving them mentally.","Memorise the Venn diagram combinations and the odd-days table for calendar questions.","Maintain a log of every question where you guessed, and revise it before the exam.","Practise mixed sets so you learn to switch logic quickly under time pressure."]},{"h":"Common mistakes to avoid","list":["Not reading the question carefully — one changed word can change the whole logic.","Assuming extra information that is not given, especially in syllogism.","Mixing up the direction of movement in direction-sense questions.","Spending too long on one puzzle instead of moving on and returning later."]}],"faqs":[{"q":"Which verbal reasoning topics are most important for ADRE?","a":"Coding-decoding, blood relations, direction sense, series, analogy and classification are the most frequently asked topics in ADRE and Assam Police papers."},{"q":"Is verbal reasoning easier than non-verbal reasoning?","a":"Many candidates find verbal reasoning easier because the rules are clearly defined. Personal strength varies, so practise both and see where you score faster."},{"q":"How do I solve coding-decoding questions quickly?","a":"Compare the given word with its code and note the shift in positions of letters and numbers. Once the shift is identified, apply it to the new word."},{"q":"Can I prepare verbal reasoning in Assamese?","a":"Yes. Questions and explanations are available in both Assamese and English, and you can switch languages while reading."},{"q":"How many reasoning questions should I solve daily?","a":"Fifty to sixty questions across two or three chapters is a healthy daily target, along with a review of every mistake."},{"q":"Is verbal reasoning practice on axomexam free?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free, with no login or subscription."}]},"analytical-critical-reasoning":{"title":"Analytical and Critical Reasoning Practice for ADRE and APSC | axomexam","meta":"Practice analytical and critical reasoning for ADRE, APSC, Assam Police, SSC and Railway. Seating arrangement, puzzles, statement and assumption, conclusion, assertion and reason.","lead":["Analytical and critical reasoning measures how well you can organise information and judge arguments. It covers seating arrangements, complex puzzles, coded inequalities, and the statement-based chapters such as assumption, conclusion, argument and course of action.","This is the part of reasoning where careful reading matters more than quick guessing. On axomexam each chapter includes solved examples and practice sets with detailed bilingual explanations so that you can see exactly how a conclusion is derived from the given statements."],"sections":[{"h":"What the analytical and critical section demands","p":["Puzzle and arrangement questions test your ability to place people or objects according to a set of conditions. The statement-based chapters test your judgement of what is implied, assumed, strengthened or weakened by a given passage. Both require patience, and both become much easier once you learn to represent information in a simple diagram or table."]},{"h":"Analytical and critical reasoning chapters covered on axomexam","list":["Seating Arrangement — linear, circular and square arrangements with mixed clues.","Complex Puzzles — floor, box, scheduling, month and category based puzzles.","Inequality — direct and coded inequalities with all possible conclusions.","Statement and Assumptions — identify the implicit assumption behind a statement.","Statement and Conclusions — decide which conclusion logically follows.","Statement and Arguments — judge the strength of arguments for and against.","Statement and Course of Action — choose the most practical response.","Cause and Effect — separate the cause from the effect.","Assertion and Reason — evaluate the link between an assertion and its reason.","Decision Making, Drawing Inferences and Data Sufficiency."]},{"h":"Analytical and critical reasoning preparation strategy","list":["For arrangements and puzzles, draw the layout and mark fixed positions first, then the uncertain ones.","Learn the standard conclusion rules for inequality and syllogism and apply them mechanically.","For assumption and conclusion questions, separate what is stated from what is only implied.","Practise puzzles of increasing difficulty instead of jumping straight to complex sets.","Review the full solution even when your answer was correct, to confirm the reasoning.","Attempt one full puzzle set under a timer every day to build stamina."]},{"h":"Common mistakes to avoid","list":["Adding real-world knowledge that is not part of the given passage.","Assuming a conclusion is valid when it is only probably true.","Making a single wrong placement early in a puzzle and then continuing with it.","Spending a large amount of time on one puzzle and losing easy marks elsewhere."]}],"faqs":[{"q":"Are puzzles and seating arrangement important for ADRE?","a":"Yes. Analytical reasoning, including seating arrangement and puzzles, carries good weight and also appears in the Assam Police and APSC papers."},{"q":"How do I improve in statement and conclusion questions?","a":"Decide clearly what the statement guarantees. A conclusion that needs extra information beyond the statement is not valid."},{"q":"What is the difference between assumption and conclusion?","a":"An assumption is an unstated idea the speaker takes for granted, while a conclusion is the logical result that follows from the given information."},{"q":"How much time should I spend on one puzzle?","a":"If a puzzle is not opening up within about a minute and a half, mark the possibilities and move on. Return to it after finishing the easier questions."},{"q":"Can I practise analytical reasoning in Assamese?","a":"Yes. All practice sets and explanations are bilingual, so you can study in Assamese or English as you prefer."},{"q":"Is analytical reasoning practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"science":{"title":"General Science Questions for ADRE, Assam Police and SSC | axomexam","meta":"Free general science practice for ADRE, Assam Police, APSC, SSC and Railway. Physics, Chemistry and Biology questions at Class 6 to 10 level with bilingual explanations.","lead":["General Science is one of the most predictable sections in Assam government recruitment exams. The questions come from Physics, Chemistry and Biology at roughly the Class 6 to 10 level, so a candidate who has revised the school textbooks carefully can score very well.","On axomexam the subject is divided into Physics, Chemistry and Biology, each with chapter-wise practice sets and explanations. The focus is on everyday science, definitions, units, simple applications and the health and environment facts that examiners repeat most often."],"sections":[{"h":"Which science questions are asked","p":["Questions usually test basic definitions, units of measurement, common chemical formulae, parts and functions of the human body, plant and animal classification, and everyday applications of physics and chemistry. Direct memory questions and simple numericals from physics make up a large part of the paper."]},{"h":"Science chapters covered on axomexam","list":["Physics — motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and basic modern physics.","Chemistry — matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry.","Biology — the human body and its systems, nutrition and health, plants, cell biology, genetics, ecology and the environment."]},{"h":"Most repeated science topics in Assam exams","list":["Units and measurements of physical quantities.","Human body systems, especially the digestive, circulatory and nervous systems.","Vitamins, their sources and deficiency diseases.","Common chemical formulae and everyday chemical reactions.","Scientific names, plant and animal classification.","Environment, pollution and ecological terms."]},{"h":"General science preparation strategy","list":["Revise one chapter from the NCERT or standard textbook, then attempt its practice set immediately.","Make short notes of definitions, units and formulae — these are asked directly.","Memorise common abbreviations, vitamins and deficiency diseases in table form.","Practise physics numericals separately, since they need formula application.","Revise the diagrams of important systems and experiments.","Attempt a mixed science set every week to check retention."]},{"h":"Common mistakes to avoid","list":["Skipping Biology as 'easy' and losing direct-mark questions.","Confusing units and symbols of similar physical quantities.","Studying from too many sources instead of mastering one standard textbook.","Ignoring everyday-science questions that are based on daily-life observations."]}],"faqs":[{"q":"What is the standard of science questions in ADRE and Assam Police?","a":"Most questions are at the Class 6 to 10 level. A careful revision of school textbooks covers the vast majority of the syllabus."},{"q":"Which science subject is most important for Assam exams?","a":"All three carry weight, but Biology and everyday science appear most frequently, followed by Physics and Chemistry."},{"q":"Do I need to memorise formulas for general science?","a":"Only a limited set — mainly units, simple physics formulae and common chemical equations. Most questions are direct and factual."},{"q":"Can I study general science in Assamese?","a":"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{"q":"How should I revise science before the exam?","a":"Use short notes and tables for facts, units and formulae, and solve past-paper questions to see which facts repeat."},{"q":"Is general science practice free on axomexam?","a":"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"english":{"title":"General English Grammar and Vocabulary for ADRE, Assam Police | axomexam","meta":"Practice general English for ADRE, Assam Police, APSC, SSC and Railway. Grammar, parts of speech, sentence structure, vocabulary, synonyms, antonyms, idioms and error spotting.","lead":["General English is a steady, low-risk scoring section in ADRE, Assam Police, APSC, SSC and Railway exams. It tests grammar, vocabulary and comprehension, and the syllabus is limited — which means regular revision quickly translates into marks.","On axomexam the subject is organised into grammar, parts of speech, sentence structure and vocabulary, with practice questions and clear explanations. The goal is to help you recognise the same rule in an exam question, even when it is worded differently."],"sections":[{"h":"What general English tests","p":["The section checks whether you can identify correct grammar in use, choose the right word for a blank, spot an error in a sentence, and understand the meaning of words and phrases. Direct questions on synonyms, antonyms, one-word substitution and idioms are common."]},{"h":"English chapters covered on axomexam","list":["Grammar — tenses, articles, subject-verb agreement, active and passive voice, and direct and indirect speech.","Parts of Speech — nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.","Sentence Structure — sentence types, phrases and clauses, sentence correction and paragraph ordering.","Vocabulary — synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling."]},{"h":"Most repeated English topics","list":["Subject-verb agreement and common error spotting.","Tenses and their correct usage.","Prepositions and articles.","Synonyms, antonyms and one-word substitutions.","Idioms and phrases with their meanings.","Fill in the blanks and cloze tests."]},{"h":"General English preparation strategy","list":["Revise one grammar rule at a time and then solve twenty questions on it.","Read one short passage daily and note unfamiliar words with their meanings.","Learn five new words, five synonyms and three idioms every day.","Practise error-spotting by reading a sentence as a whole before choosing an option.","Revise the rules of articles, prepositions and subject-verb agreement most often.","Attempt a full English set weekly to track your accuracy."]},{"h":"Common mistakes to avoid","list":["Choosing an option because it 'sounds correct' instead of applying the rule.","Ignoring articles and prepositions, which are asked every year.","Learning words without usage or example sentences.","Reading the entire comprehension passage before looking at the questions."]}],"faqs":[{"q":"Is general English easy to score in ADRE?","a":"Yes. The syllabus is limited and rule-based, so with steady revision most candidates can score well above average in this section."},{"q":"Which grammar topics are most important?","a":"Tenses, subject-verb agreement, articles, prepositions, active and passive voice and direct and indirect speech are asked most often."},{"q":"How can I improve my vocabulary quickly?","a":"Learn words in small daily sets with their usage, and revise synonyms, antonyms, one-word substitutions and idioms regularly."},{"q":"Can I study English in Assamese on axomexam?","a":"The explanations are bilingual so that the rule is clear in both languages, and the questions follow the English exam pattern."},{"q":"Is comprehension asked in these exams?","a":"Yes, many papers include a short reading-comprehension passage along with the direct grammar and vocabulary questions."},{"q":"Is general English practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"articles":{"title":"Study Articles and Notes for Assam Competitive Exams | axomexam","meta":"Read free high-quality study articles for ADRE, APSC, Assam Police, SSC and Railway exams. Long-form notes on general knowledge, mathematics, science, reasoning, English and computers.","lead":["Axomexam articles are long-form study pieces that explain a topic in depth and in simple language. They are written to build conceptual clarity before you attempt questions, which makes them ideal for beginning a new topic or revising one that keeps going wrong.","The collection spans general knowledge, mathematics, general science, reasoning ability, general English and computer awareness, so there is a suitable article whether you are strengthening a weak area or looking for a quick revision of a familiar one."],"sections":[{"h":"How to use the articles section","p":["Read the article once to understand the concept, then attempt the related practice set. Articles are deliberately kept simple and example-driven so that the idea stays with you when you face a similar question in the exam."]},{"h":"Article categories available","list":["General Knowledge — Assam history, literature, geography, polity, economy and art and culture.","Mathematics — arithmetic, advanced math and data interpretation concepts explained step by step.","General Science — physics, chemistry and biology topics in everyday language.","Reasoning Ability — verbal, non-verbal and analytical reasoning techniques.","General English — grammar rules, vocabulary building and common error patterns.","Computer Awareness — fundamentals, software, MS Office, networking and cyber security."]},{"h":"How articles help your exam preparation","list":["They explain the 'why' behind a rule, which helps you apply it to new questions.","They are ideal revision material in the final weeks before the exam.","They connect theory with solved examples from previous papers.","They build the reading habit needed for comprehension and general awareness."]},{"h":"Tips to get the most from study articles","list":["Read with a pen and note down key points and formulas.","Attempt the linked practice set immediately after reading.","Revisit the article after a week to test your retention.","Use the bilingual view to strengthen terminology in both English and Assamese."]}],"faqs":[{"q":"What kind of articles are published on axomexam?","a":"Long-form, easy-reading study pieces on general knowledge, mathematics, science, reasoning, English and computer awareness, written for Assam competitive exams."},{"q":"Are the articles useful for ADRE and APSC?","a":"Yes. The articles cover the concepts and facts that appear in ADRE, APSC CCE, Assam Police, SSC and Railway papers."},{"q":"Should I read articles before or after practice questions?","a":"Read the article first to understand the concept, then attempt the linked practice set and review your mistakes."},{"q":"Are the articles available in Assamese?","a":"The content is designed to support both Assamese and English readers, and the key terms are explained in both languages."},{"q":"How often are new articles added?","a":"New articles are added regularly, so check the page again as you progress through your syllabus."},{"q":"Is the articles section free to use?","a":"Yes. Every article and study resource on axomexam.in is completely free with no login or subscription."}]},"math":{"title":"Mathematics for ADRE, APSC and Assam Police Exams | axomexam","meta":"Free mathematics practice for ADRE, Assam Police, APSC, SSC and Railway. Arithmetic, advanced math, statistics and data interpretation with bilingual step-by-step solutions.","lead":["Mathematics, or quantitative aptitude, is one of the highest-scoring areas in ADRE, Assam Police, APSC, SSC and Railway exams. The subject rewards practice: the more patterns you have seen, the faster and more accurately you solve on exam day.","On axomexam mathematics is divided into arithmetic, advanced math, and statistics and data interpretation. Each section builds from the basics to exam-level questions so that you can strengthen one area at a time."],"sections":[{"h":"Why mathematics matters in Assam exams","p":["Numerical ability carries a large number of questions and is usually the section where well-prepared candidates pull ahead. Because the concepts are fixed and the patterns repeat, mathematics gives a better return on preparation time than most other subjects."]},{"h":"Mathematics sections covered on axomexam","list":["Arithmetic — number system, percentage, ratio, profit and loss, average, time and work, time and distance, and simple and compound interest.","Advanced Math — algebra, geometry, trigonometry, number systems and higher-level problem solving.","Statistics and Data Interpretation — averages, tables, bar charts, pie charts and line graphs."]},{"h":"Mathematics preparation strategy","list":["Master the basics of a chapter before moving to its advanced questions.","Learn and apply short tricks instead of solving every question the long way.","Practise with a timer to build the speed the exam demands.","Keep a formula notebook and revise it regularly.","Analyse every wrong answer to find whether the mistake was conceptual or careless.","Take a full maths mock test every week and track your accuracy."]},{"h":"Common mistakes to avoid","list":["Attempting advanced questions without clear basics.","Ignoring data interpretation, which offers easy marks for careful readers.","Making calculation errors under time pressure because of skipped approximation practice.","Not practising enough variety of question types."]}],"faqs":[{"q":"Which mathematics topics are most important for ADRE?","a":"Arithmetic forms the core, especially percentage, ratio, average, profit and loss, time and work and time–speed–distance. Advanced math and data interpretation add the remaining marks."},{"q":"Is advanced math needed for Assam Police and ADRE?","a":"Basic algebra and geometry are useful, while the emphasis stays on arithmetic. APSC and technical posts need a stronger grip on advanced math."},{"q":"How can I increase my calculation speed?","a":"Memorise tables, squares, cubes and percentage-to-fraction values, and practise approximation techniques with timed sets."},{"q":"How much time should I spend on mathematics daily?","a":"One to one-and-a-half hours of focused practice per day is enough when combined with regular error review and weekly mock tests."},{"q":"Can I practise mathematics in Assamese?","a":"Yes. All practice sets and step-by-step explanations are bilingual and can be read in Assamese or English."},{"q":"Is mathematics practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"reasoning":{"title":"Reasoning Ability Questions for ADRE, APSC and Assam Police | axomexam","meta":"Free reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Verbal, non-verbal and analytical reasoning with step-by-step bilingual explanations and timed sets.","lead":["Reasoning ability tests logical and analytical thinking rather than memorised facts. It is divided into verbal reasoning, non-verbal reasoning and analytical and critical reasoning, and together they form a scoring section in ADRE, Assam Police, APSC, SSC and Railway exams.","Because speed and accuracy decide the score in reasoning, timed practice is essential. On axomexam each of the three branches has chapter-wise sets followed by detailed explanations, so you can train both the logic and the pace."],"sections":[{"h":"Why reasoning is a high-scoring section","p":["Reasoning questions follow fixed patterns that repeat across papers. Once a candidate learns the standard rules for series, coding, arrangements and statement-based questions, the section becomes fast and dependable. It also requires no additional study material beyond regular practice."]},{"h":"Reasoning branches covered on axomexam","list":["Verbal Reasoning — analogy, classification, series, coding-decoding, blood relations, direction sense, ranking, syllogism and clock and calendar.","Non-Verbal Reasoning — figure series, mirror and water images, paper folding and cutting, embedded figures, figure matrix, counting of figures and cube and dice.","Analytical and Critical Reasoning — seating arrangement, puzzles, inequality, and statement-based chapters such as assumption, conclusion, argument and course of action."]},{"h":"Reasoning preparation strategy","list":["Learn the rule for a chapter, then solve a set of at least twenty questions on it.","Draw diagrams for arrangements, blood relations and directions instead of solving mentally.","Practise mixed sets to get used to switching logic quickly.","Time every set so that speed improves along with accuracy.","Review wrong answers immediately and note the rule you missed.","Attempt a full reasoning mock test every week."]},{"h":"Common mistakes to avoid","list":["Guessing the logic instead of checking it against every part of the question.","Getting stuck on a single puzzle while easier questions wait.","Ignoring non-verbal reasoning because it looks unfamiliar.","Not practising enough variety, so unfamiliar patterns feel difficult in the exam."]}],"faqs":[{"q":"How many reasoning questions come in ADRE and Assam Police?","a":"The reasoning section usually carries between 15 and 25 questions depending on the post and paper."},{"q":"Which reasoning branch is most important?","a":"All three are asked, but verbal and analytical reasoning usually carry more questions than non-verbal reasoning."},{"q":"How can I improve reasoning speed?","a":"Learn the standard rules and then practise timed sets. Drawing diagrams for arrangements and puzzles also saves a lot of time."},{"q":"Is reasoning difficult for beginners?","a":"No. It is one of the most practice-friendly sections. With consistent daily practice, beginners improve quickly."},{"q":"Can I prepare reasoning in Assamese?","a":"Yes. Questions and explanations are bilingual and you can switch between Assamese and English while reading."},{"q":"Is reasoning practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"computer":{"title":"Computer Awareness Questions for ADRE, Assam Police and APSC | axomexam","meta":"Free computer awareness practice for ADRE, Assam Police, APSC, SSC and Railway. Fundamentals, hardware, software, MS Office, networking, cyber security, DBMS and number system.","lead":["Computer awareness is one of the quickest sections to prepare and score in ADRE, Assam Police, APSC, DHS, DME, Gauhati High Court and other state recruitment exams. Most questions are direct and factual, so a short, focused revision can secure almost full marks.","On axomexam the subject is divided into fundamentals and hardware, software and operating systems, MS Office, networking and the internet, cyber security, and DBMS with number system and shortcuts. Each chapter links to a practice set with clear explanations."],"sections":[{"h":"What computer awareness covers","p":["The syllabus begins with the basics of computers, their generations, input and output devices and memory, and then moves to software, operating systems and application packages. Networking and the internet, cyber security and database concepts complete the section."]},{"h":"Computer chapters covered on axomexam","list":["Computer Fundamentals and Hardware — generations, input and output devices, memory, storage and the CPU.","Software and Operating System — types of software, functions of an operating system, file management and common Windows and Linux features.","MS Office Suite — Word, Excel and PowerPoint, including menu options, shortcuts and formulas.","Networking and Internet — network types and topologies, IP addresses, protocols, browsers, email and internet services.","Cyber Security — viruses, malware, phishing, hacking, passwords, encryption and safe internet practices.","DBMS, Number System and Shortcuts — database basics, number system conversions and keyboard shortcuts."]},{"h":"Most repeated computer topics in Assam exams","list":["Generations of computers and their characteristics.","Input, output and storage devices with examples.","Keyboard shortcuts for common operations.","Basic MS Word and MS Excel functions and formulas.","Full forms of common computer abbreviations.","Types of computer viruses and cyber safety tips."]},{"h":"Computer awareness preparation strategy","list":["Make a one-page list of full forms and abbreviations and revise it daily.","Learn the keyboard shortcuts by actually using them on a computer.","Prepare a small table of input, output and storage devices.","Practise basic Excel formulas and Word menu options.","Revise number system conversions with a few examples each.","Attempt a chapter-wise set after studying each topic."]},{"h":"Common mistakes to avoid","list":["Ignoring the topic because it seems easy, and then forgetting the full forms.","Mixing up similar terms such as RAM and ROM, or hardware and software.","Not practising shortcuts, which are asked directly every year.","Studying advanced topics while the basics remain unclear."]}],"faqs":[{"q":"Is computer awareness asked in ADRE and Assam Police?","a":"Yes. It is part of the general awareness section and is one of the easiest areas to score in, because most questions are direct and factual."},{"q":"How much time is needed to prepare computer awareness?","a":"A focused revision of one or two weeks is usually enough, since the syllabus is small and mostly factual."},{"q":"Which computer topics are most important?","a":"Fundamentals, hardware and software differences, MS Office shortcuts and formulas, networking basics and cyber security are asked most often."},{"q":"Do I need a computer to prepare this section?","a":"A computer helps for shortcuts and MS Office, but the theory can be prepared from notes and practice questions on any device."},{"q":"Can I study computer awareness in Assamese?","a":"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{"q":"Is computer awareness practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]}};
  /* ==== END GENERATED DEEP CONTENT ==== */

  /* ==== BEGIN GENERATED DEEP CONTENT AS (scripts/build-deep-content.js) ==== */
  const DEEP_CONTENT_AS = {"arithmetic":{"title":"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে গণিতৰ প্ৰশ্ন আৰু চুটি কৌশল | axomexam","meta":"ADRE 2.0, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া গণিত অনুশীলন। শতাংশ, লাভ-ক্ষতি, অনুপাত, গড়, সময় আৰু কাম, SI আৰু CI — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।","lead":["প্ৰায় প্ৰতিটো অসম চৰকাৰী নিযুক্তি পৰীক্ষাৰ পৰিমাণাত্মক যোগ্যতা শিতানৰ মূল ভেটি হৈছে গণিত। ADRE গ্ৰেড ৩ আৰু গ্ৰেড ৪, অসম আৰক্ষী কনষ্টেবল আৰু চাব-ইন্সপেক্টৰ, APSC CCE, DHS, DME, গুৱাহাটী উচ্চ ন্যায়ালয়, SSC আৰু ৰে'লৱেৰ প্ৰশ্নকাকতত একেই মূল গণিত অধ্যায়বোৰ পৰীক্ষা কৰা হয়, আৰু এই প্ৰশ্নবোৰেই প্ৰায়ে নিৰ্ধাৰণ কৰে এজন প্ৰাৰ্থীয়ে কাট-অফ পাৰ কৰিব নে নাই।","axomexam ত বিষয়টো অধ্যায় অনুসৰি সজোৱা হৈছে, যাতে আপুনি ধাপে ধাপে গতি আৰু শুদ্ধতা গঢ়ি তুলিব পাৰে। প্ৰতিটো বিষয় ইংৰাজী আৰু অসমীয়াত সমাধানৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি বেলেগ বেলেগ উত্তৰ মনত ৰখাৰ পৰিৱৰ্তে পৰীক্ষকে বিচৰা সঠিক পদ্ধতিটো শিকে।"],"sections":[{"h":"কিয় গণিতেই আপোনাৰ নম্বৰ নিৰ্ধাৰণ কৰে","p":["অসমৰ নিযুক্তি প্ৰশ্নকাকতত সংখ্যাগত ক্ষমতাই সাধাৰণতে ১৫ৰ পৰা ২৫ টা প্ৰশ্ন বহন কৰে আৰু সেই অংশৰ আটাইতকৈ ডাঙৰ ভাগটো গণিতেই। প্ৰশ্নবোৰ সূত্ৰভিত্তিক আৰু পুনৰাবৃত্তিমূলক, যাৰ অৰ্থ হ'ল এজন ভালদৰে অনুশীলন কৰা প্ৰাৰ্থীয়ে ইয়াক দ্ৰুতভাৱে সমাধান কৰি নিৰ্ভৰযোগ্যভাৱে নম্বৰ পাব পাৰে। ৰাজ্যিক আৰু কেন্দ্ৰীয় পৰীক্ষাত একেই অধ্যায়বোৰ পুনৰাবৃত্তি হয়, গতিকে গণিতৰ এটা ভাল প্ৰস্তুতিয়ে একেসময়তে কেইবাটাও পৰীক্ষাত লাভ দিয়ে।"]},{"h":"axomexam ত সামৰি লোৱা গণিতৰ অধ্যায়বোৰ","list":["সংখ্যা পদ্ধতি আৰু সৰলীকৰণ — বিভাজ্যতাৰ নিয়ম, HCF, LCM, ভাগশেষ, কৰণী আৰু দ্ৰুত গণনা।","শতাংশ — বৃদ্ধি আৰু হ্ৰাস, ক্ৰমিক পৰিৱৰ্তন আৰু শতাংশভিত্তিক শব্দ সমস্যা।","অনুপাত আৰু সমানুপাত — প্ৰত্যক্ষ আৰু ব্যস্ত সমানুপাত আৰু ৰাশিৰ ভাগ।","লাভ, ক্ষতি আৰু ৰেহাই — ক্ৰয়মূল্য, বিক্ৰয়মূল্য, চিহ্নিত মূল্য, ক্ৰমিক ৰেহাই আৰু অসাধু ব্যৱসায়ীৰ সমস্যা।","গড় — সৰল গড়, ভাৰিত গড় আৰু গড় বয়স তথা গড় বেগৰ সমস্যা।","সময় আৰু কাম — দক্ষতা, কাম আৰু মজুৰি, আৰু নল আৰু চৌবাচ্চা।","সময়, বেগ আৰু দূৰত্ব — আপেক্ষিক বেগ, ৰে'লৰ সমস্যা, নাৱ আৰু সোঁত।","সৰল আৰু চক্ৰবৃদ্ধি সুত — কিস্তি, বৃদ্ধি আৰু অৱক্ষয়।","ক্ষেত্ৰমিতি — প্ৰামাণ্য আকৃতিৰ কালি, পৰিসীমা, আয়তন আৰু পৃষ্ঠকালি।","বয়স, ভাগীদাৰী আৰু মিশ্ৰণ তথা এ্যালিগেচনৰ সমস্যা।"]},{"h":"ADRE আৰু অসম আৰক্ষীত সৰ্বাধিক পুনৰাবৃত্তি হোৱা অধ্যায়বোৰ","p":["বিগত প্ৰশ্নকাকতৰ ভিত্তিত তলৰ অধ্যায়বোৰ বাৰে বাৰে আহে আৰু ইয়াক অতিৰিক্তভাৱে পুনৰাবৃত্তি কৰা উচিত: শতাংশ, লাভ-ক্ষতি, অনুপাত আৰু সমানুপাত, গড়, সময় আৰু কাম, সময়-বেগ-দূৰত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত, আৰু ক্ষেত্ৰমিতি। যদি সময় কম, তেন্তে প্ৰথমে এই আঠটা আয়ত্ত কৰক।"]},{"h":"অসম পৰীক্ষাৰ বাবে গণিত কেনেদৰে প্ৰস্তুতি কৰিব","list":["এটা অধ্যায়ৰ প্ৰশ্ন কৰাৰ আগতে তাৰ সূত্ৰ বা চুটি পদ্ধতি শিকক।","প্ৰতিদিনে প্ৰতিটো বিষয়ৰ ১৫ৰ পৰা ২০ টা প্ৰশ্ন সমাধান কৰক আৰু ষ্টপৱাচ লৈ নিজৰ সময় জুখক।","এখন সূত্ৰৰ টোকাবহী ৰাখক আৰু প্ৰতিটো অনুশীলনৰ আগতে পাঁচ মিনিট পুনৰাবৃত্তি কৰক।","প্ৰতিটো ভুল উত্তৰৰ ব্যাখ্যা পঢ়ক আৰু ভুলৰ সঠিক কাৰণটো টুকি লওক।","তিনি দিনৰ পিছত একেই ছেট আকৌ চেষ্টা কৰক আৰু আপোনাৰ শুদ্ধতা বাঢ়িছে নে নাই পৰীক্ষা কৰক।","পৰীক্ষাৰ দিনৰ চাপৰ অভ্যাস কৰিবলৈ সপ্তাহে এটা সম্পূৰ্ণ সময়বদ্ধ মক টেষ্ট লওক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["খৰখেদাকৈ পঢ়ি 'কম' আৰু 'বেছি'ৰ দৰে মান ভুলকৈ পঢ়া।","একক এৰি দিয়া আৰু শতাংশক নিৰপেক্ষ সংখ্যাৰ সৈতে মিহলাই পেলোৱা।","চুটি কৌশল ব্যৱহাৰ নকৰি প্ৰতিটো প্ৰশ্ন দীঘল পদ্ধতিত সমাধান কৰা।","কঠিন যেন লাগে বুলি ক্ষেত্ৰমিতি এৰি দিয়া — ই আটাইতকৈ অনুমানযোগ্য অধ্যায়বোৰৰ এটা।"]}],"faqs":[{"q":"ADRE 2.0 ৰ বাবে কোনবোৰ গণিতৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"শতাংশ, লাভ-ক্ষতি, অনুপাত আৰু সমানুপাত, গড়, সময় আৰু কাম, সময়-বেগ-দূৰত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত আৰু ক্ষেত্ৰমিতিয়ে সৰ্বাধিক নম্বৰ বহন কৰে। কমকৈ সোধা অধ্যায়বোৰৰ আগতে এইবোৰ অনুশীলন কৰক।"},{"q":"গণিতৰ গণনাত মই মোৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?","a":"২০ লৈকে নামতা, ৩০ লৈকে বৰ্গ আৰু শতাংশৰ পৰা ভগ্নাংশলৈ ৰূপান্তৰ ব্যৱহাৰ কৰক। টাইমাৰ লৈ অনুশীলন কৰক আৰু য'ত বিকল্পই অনুমতি দিয়ে ত'ত আসন্ন মান ব্যৱহাৰ কৰক।"},{"q":"অসম আৰক্ষীৰ পৰীক্ষাত গণিত কঠিন নেকি?","a":"নহয়। অসম আৰক্ষীৰ গণিত মানক আৰ্হিৰ ওচৰতেই থাকে। নিয়মীয়া অনুশীলন আৰু সঠিক ভেটিৰ সৈতে বেছিভাগ প্ৰাৰ্থীয়ে সম্পূৰ্ণ শিতানটো আৰামেৰে কৰিব পাৰে।"},{"q":"axomexam ত অসমীয়াত গণিত অনুশীলন কৰিব পাৰিম নেকি?","a":"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক। আপুনি যিকোনো সময়তে অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে, যাৰ ফলত একেখিনি ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।"},{"q":"প্ৰতিদিনে গণিতক কিমান সময় দিয়া উচিত?","a":"বেছিভাগ প্ৰাৰ্থীৰ বাবে এঘণ্টাৰ পৰা দেৰ ঘণ্টা একাগ্ৰ অনুশীলন যথেষ্ট। প্ৰথম ২০ মিনিট সূত্ৰত আৰু বাকীখিনি সময়বদ্ধ প্ৰশ্ন তথা ভুল পৰ্যালোচনাত খৰচ কৰক।"},{"q":"axomexam ত গণিতৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া। কোনো লগইন, চাবস্ক্ৰিপচন বা গুপুত মাচুল নাই।"}]},"non-verbal-reasoning":{"title":"ADRE আৰু APSC ৰ বাবে উত্তৰসহ অ-মৌখিক যুক্তি প্ৰশ্ন | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে অ-মৌখিক যুক্তি অনুশীলন। চিত্ৰ শ্ৰেণী, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ, অন্তৰ্নিহিত চিত্ৰ, চিত্ৰ মেট্ৰিক্স, ঘনক আৰু পাশা।","lead":["অ-মৌখিক যুক্তিয়ে জুখে আপুনি চিত্ৰ, আৰ্হি, আকৃতি আৰু স্থানিক বিন্যাসৰ দৰে দৃশ্যমান তথ্য কিমান দ্ৰুতভাৱে পঢ়িব পাৰে। ই ভাষা বা শব্দভাণ্ডাৰৰ ওপৰত নিৰ্ভৰ নকৰে, গতিকে নম্বৰ সম্পূৰ্ণৰূপে আপোনাৰ পৰ্যবেক্ষণ শক্তি আৰু অনুশীলনৰ ওপৰত নিৰ্ধাৰিত হয়।","এই শিতান ADRE, অসম আৰক্ষী, APSC CCE, SSC, ৰে'লৱে আৰু বহু অন্য নিযুক্তি পৰীক্ষাত আহে। axomexam ত প্ৰতিটো অধ্যায় স্পষ্ট দৃশ্যমান ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি প্ৰতিটো চিত্ৰৰ পিছৰ নিয়মটো দ্ৰুতভাৱে ধৰা পেলাবলৈ চকু প্ৰশিক্ষণ দিব পাৰে।"],"sections":[{"h":"অ-মৌখিক যুক্তিয়ে প্ৰকৃততে কি পৰীক্ষা কৰে","p":["প্ৰতিটো প্ৰশ্নই এটা ক্ৰম বা চিত্ৰৰ এটা গোট দেখুৱায় আৰু আপোনাক পৰৱৰ্তী চিত্ৰ, অদ্ভুত চিত্ৰ বা লুকাই থকা চিত্ৰ বিচাৰিবলৈ কয়। অন্তৰ্নিহিত নিয়মটোত ঘূৰ্ণন, প্ৰতিফলন, অংশ যোগ বা বাদ, ছাঁ দিয়া, বা উপাদানৰ গতি জড়িত থাকিব পাৰে। এবাৰ নিয়মটো চিনি পোৱাৰ পিছত উত্তৰটো প্ৰায় যান্ত্ৰিকভাৱে আহে — সেয়ে এই শিতানটো অতি উচ্চ-নম্বৰ হ'ব পাৰে।"]},{"h":"axomexam ত সামৰি লোৱা অ-মৌখিক যুক্তিৰ অধ্যায়বোৰ","list":["চিত্ৰ শ্ৰেণী — ঘূৰ্ণন, বৃদ্ধি আৰু ছাঁ ট্ৰেক কৰি পৰৱৰ্তী চিত্ৰ বিচাৰক।","চিত্ৰ সাদৃশ্য — চিত্ৰৰ এযোৰৰ মাজৰ একেই সম্পৰ্ক প্ৰয়োগ কৰক।","চিত্ৰ শ্ৰেণীবিভাগ — গোটত নিমিলা চিত্ৰটো বাছনি কৰক।","দাপোনৰ প্ৰতিবিম্ব — উলম্ব দাপোন ৰেখাৰ ওপৰত চিত্ৰটো প্ৰতিফলিত কৰক।","পানীৰ প্ৰতিবিম্ব — অনুভূমিক পানী ৰেখাৰ ওপৰত চিত্ৰটো প্ৰতিফলিত কৰক।","কাগজ ভাঁজ আৰু কাগজ কটা — মেলি দিয়াৰ পিছত ফুটাৰ আৰ্হিটো কল্পনা কৰক।","অন্তৰ্নিহিত চিত্ৰ — ডাঙৰ চিত্ৰ এটাত লুকাই থকা সৰু চিত্ৰটো বিচাৰক।","অসম্পূৰ্ণ আৰ্হিৰ সম্পূৰ্ণতা — এটা আৰ্হিৰ নোহোৱা টুকুৰাটো চিনি পেলাওক।","চিত্ৰ মেট্ৰিক্স — চিত্ৰৰ মেট্ৰিক্স এটাৰ শাৰী আৰু স্তম্ভৰ যুক্তি অনুসৰণ কৰক।","চিত্ৰ গণনা — এটা জটিল চিত্ৰত ত্ৰিভুজ, বৰ্গ বা সৰল ৰেখা গণনা কৰক।","ঘনক আৰু পাশা — ৰঙ কৰা ঘনক, পাশাৰ নিয়ম আৰু বিপৰীত পৃষ্ঠৰ সমস্যা সমাধান কৰক।","নিয়ম চিনাক্তকৰণ আৰু আকৃতি নিৰ্মাণ।"]},{"h":"অ-মৌখিক যুক্তি প্ৰস্তুতিৰ কৌশল","list":["প্ৰতিটো অধ্যায় চিত্ৰ নিজে আঁকি অনুশীলন কৰক; চকুৰ দৰেই হাতেও আৰ্হিটো শিকে।","শ্ৰেণীৰ প্ৰশ্নৰ বাবে এটা এটাকৈ ঘূৰ্ণন, উপাদানৰ সংখ্যা, ছাঁ আৰু প্ৰতিসমতা পৰীক্ষা কৰক।","ঘনক আৰু পাশাৰ প্ৰশ্নৰ বাবে পাশাৰ নিয়ম আৰু বিপৰীত পৃষ্ঠৰ কৌশল মনত ৰাখক।","প্ৰতিদিনে অন্ততঃ ২০ টা চিত্ৰ সমাধান কৰক আৰু প্ৰতিটো ভুল উত্তৰৰ বাবে হেৰুওৱা নিয়মটো টুকি লওক।","প্ৰথম কেইটা দাপোন, পানী আৰু কাগজ ভাঁজৰ প্ৰশ্নৰ বাবে এখন দাপোন বা ভাঁজ কৰা কাগজ ব্যৱহাৰ কৰক।","দৃশ্যমান গতি গঢ়িবলৈ চিত্ৰভিত্তিক ছেট সময়বদ্ধ খণ্ডত চেষ্টা কৰক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["সকলো চিত্ৰৰ সৈতে পৰীক্ষা নকৰি প্ৰথম দুটা চিত্ৰৰ পৰা নিয়ম অনুমান কৰা।","ঘড়ীৰ কাঁটাৰ দিশ আৰু বিপৰীত দিশ লৈ খেলিমেলি কৰা।","বিন্দু, ৰেখা বা ছাঁ দিয়া অংশৰ সংখ্যাৰ হিচাপ হেৰুওৱা।","চিত্ৰ গণনাৰ প্ৰশ্নত খৰখেদা কৰা, যিবোৰত পদ্ধতিগতভাৱে বিন্দু-বিন্দু গননা প্ৰয়োজন।"]}],"faqs":[{"q":"অ-মৌখিক যুক্তি প্ৰস্তুতি কৰা কঠিন নেকি?","a":"নহয়। ই প্ৰতিভাতকৈ ধাৰাবাহিক অনুশীলনক পুৰস্কৃত কৰে। এবাৰ মানক নিয়মৰ প্ৰকাৰবোৰ শিকিলে বেছিভাগ প্ৰশ্ন দ্ৰুত আৰু যান্ত্ৰিক হৈ পৰে।"},{"q":"ADRE আৰু অসম আৰক্ষীৰ বাবে কোনবোৰ অ-মৌখিক বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"চিত্ৰ শ্ৰেণী, সাদৃশ্য, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু কটা, অন্তৰ্নিহিত চিত্ৰ আৰু চিত্ৰ গণনা সৰ্বাধিক বাৰে সোধা হয়।"},{"q":"ঘনক আৰু পাশাৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?","a":"সংলগ্ন আৰু বিপৰীত পৃষ্ঠৰ বাবে পাশাৰ নিয়ম আৰু ৰঙ কৰা ঘনকৰ বাবে গণনাৰ নিয়ম শিকক। এই দুটা পদ্ধতিৰে বেছিভাগ প্ৰশ্ন কেইছেকেণ্ডতে সমাধান কৰিব পাৰি।"},{"q":"মই অসমীয়াত অ-মৌখিক যুক্তি অনুশীলন কৰিব পাৰিম নেকি?","a":"হয়। অনুশীলন ছেট আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে আৰু যেতিয়া বিচাৰে সলনি কৰিব পাৰে।"},{"q":"অ-মৌখিক যুক্তিৰ বাবে দৈনিক কিমান অনুশীলন প্ৰয়োজন?","a":"প্ৰতিদিনে বিশৰ পৰা ত্ৰিশটা চিত্ৰ যথেষ্ট। দৃশ্যমান যুক্তিৰ বাবে নিয়মীয়া চুটি অৱস্থান মাজে মাজে দীঘল অৱস্থানতকৈ ভাল কাম কৰে।"},{"q":"axomexam ত অ-মৌখিক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"verbal-reasoning":{"title":"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে মৌখিক যুক্তি প্ৰশ্ন আৰু অনুশীলন | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া মৌখিক যুক্তি অনুশীলন। সাদৃশ্য, সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, শ্ৰেণী, ন্যায়বাক্য আৰু ঘড়ী-পঞ্জিকা।","lead":["মৌখিক যুক্তিয়ে পৰীক্ষা কৰে আপুনি শব্দ, সংখ্যা আৰু আখৰৰ আৰ্হি কিমান ভালদৰে বিচাৰি পায় আৰু এটা বিবৃতিৰ সংহতি কিমান যুক্তিসংগতভাৱে অনুসৰণ কৰিব পাৰে। যুক্তিৰ শিতানৰ আটাইতকৈ নিৰ্ভৰযোগ্য নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা, কাৰণ আৰ্হিবোৰ বছৰৰ পিছত বছৰ পুনৰাবৃত্তি হয়।","এই পৃষ্ঠাই ADRE, অসম আৰক্ষী, APSC CCE, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে সম্পূৰ্ণ মৌখিক যুক্তিৰ পাঠ্যক্ৰম সামৰি লয়। প্ৰতিটো অধ্যায় ধাপে ধাপে দ্বিভাষিক ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি প্ৰতিটো উত্তৰৰ পিছৰ যুক্তিটো বুজি পায়।"],"sections":[{"h":"কিয় মৌখিক যুক্তি উচ্চ-নম্বৰ","p":["বেছিভাগ মৌখিক যুক্তি প্ৰশ্নই এক নিৰ্দিষ্ট নিয়মৰ গোট অনুসৰণ কৰে — বিগত প্ৰশ্নকাকতত অহা একেই যুক্তি। বিশেষকৈ সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ আৰু শ্ৰেণী মুষ্টিমেয় কৌশলৰে আয়ত্ত কৰিব পাৰি। এবাৰ নিয়মবোৰ স্পষ্ট হ'লে এই প্ৰশ্নবোৰে কম সময় লয় আৰু কেতিয়াও ভুল নহয়।"]},{"h":"axomexam ত সামৰি লোৱা মৌখিক যুক্তিৰ অধ্যায়বোৰ","list":["সাদৃশ্য — শব্দ বা সংখ্যাৰ এযোৰৰ মাজৰ সম্পৰ্ক চিনি পেলাওক।","শ্ৰেণীবিভাগ আৰু অদ্ভুত এটাক বাছনি কৰা — গোটত নিমিলা বস্তুটো বিচাৰক।","সংখ্যা শ্ৰেণী, বৰ্ণমালা শ্ৰেণী আৰু বৰ্ণ-সংখ্যা শ্ৰেণী।","সংকেত-অৱগুঞ্জন — আখৰ, সংখ্যা আৰু সংকেতভিত্তিক সংকেতৰ নিয়ম।","ৰক্তসম্পৰ্ক — পৰিয়াল বৃক্ষ, প্ৰজন্ম আৰু সংকেতযুক্ত সম্পৰ্ক।","দিশ আৰু দূৰত্ব পৰীক্ষা — গতি ট্ৰেক কৰক আৰু চূড়ান্ত দিশ বিচাৰক।","ক্ৰম আৰু স্থান — উচ্চতা, বয়স, নম্বৰ বা অৱস্থান অনুসৰি মানুহ সজাওক।","বৰ্ণমালা পৰীক্ষা আৰু শব্দ গঠন।","যুক্তিসংগত ভেন ডায়াগ্ৰাম — গোটৰ মাজৰ সঠিক সম্পৰ্ক নিৰ্ণয় কৰক।","ন্যায়বাক্য — দিয়া বিবৃতিবোৰৰ পৰা বৈধ সিদ্ধান্ত উলিয়াওক।","ঘড়ী আৰু পঞ্জিকা — কোণ, কাঁটা, অদ্ভুত দিন আৰু সপ্তাহৰ দিনৰ সমস্যা।","গাণিতিক কাৰ্য, তথ্য পৰ্যাপ্ততা আৰু ইনপুট-আউটপুট।"]},{"h":"মৌখিক যুক্তি প্ৰস্তুতিৰ কৌশল","list":["প্ৰতিটো অধ্যায়ৰ মানক নিয়ম শিকক, তাৰ পিছত সেই অধ্যায়ৰ পঞ্চাশটা প্ৰশ্ন সমাধান কৰক।","শ্ৰেণীৰ বাবে সদায় ক্ৰমে পাৰ্থক্য, অনুপাত, বৰ্গ, ঘনক আৰু পৰ্যায়ক্ৰমে সলনি হোৱা আৰ্হি পৰীক্ষা কৰক।","ৰক্তসম্পৰ্ক আৰু দিশৰ প্ৰশ্ন মনত সমাধান নকৰি কাগজত আঁকক।","ভেন ডায়াগ্ৰামৰ সংযোগ আৰু পঞ্জিকাৰ প্ৰশ্নৰ বাবে অদ্ভুত দিনৰ তালিকা মনত ৰাখক।","য'ত অনুমান কৰিছে তেনে প্ৰতিটো প্ৰশ্নৰ এখন লগ ৰাখক আৰু পৰীক্ষাৰ আগতে পুনৰাবৃত্তি কৰক।","মিশ্ৰ ছেট অনুশীলন কৰক, যাতে সময়ৰ চাপত যুক্তি দ্ৰুতভাৱে সলনি কৰিবলৈ শিকে।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["প্ৰশ্নটো মন কৰি নপঢ়া — এটা শব্দ সলনি হ'লে গোটেই যুক্তিটো সলনি হ'ব পাৰে।","বিশেষকৈ ন্যায়বাক্যত নিদিয়া অতিৰিক্ত তথ্য ধৰি লোৱা।","দিশ অনুভৱৰ প্ৰশ্নত গতিৰ দিশ ওলোটাই পেলোৱা।","এটা ধাঁধাত বেছি সময় খৰচ কৰা, পিছত ঘূৰি অহাৰ পৰিৱৰ্তে।"]}],"faqs":[{"q":"ADRE ৰ বাবে কোনবোৰ মৌখিক যুক্তিৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, শ্ৰেণী, সাদৃশ্য আৰু শ্ৰেণীবিভাগ ADRE আৰু অসম আৰক্ষীৰ প্ৰশ্নকাকতত সৰ্বাধিক বাৰে সোধা হয়।"},{"q":"মৌখিক যুক্তি অ-মৌখিক যুক্তিতকৈ সহজ নেকি?","a":"বহু প্ৰাৰ্থীয়ে মৌখিক যুক্তিক সহজ পায় কাৰণ নিয়মবোৰ স্পষ্টভাৱে নিৰ্ধাৰিত। ব্যক্তিগত শক্তি বেলেগ বেলেগ, গতিকে দুয়োটা অনুশীলন কৰি দেখক আপুনি ক'ত দ্ৰুত নম্বৰ পায়।"},{"q":"সংকেত-অৱগুঞ্জনৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?","a":"দিয়া শব্দটো তাৰ সংকেতৰ সৈতে তুলনা কৰক আৰু আখৰ তথা সংখ্যাৰ অৱস্থানৰ পৰিৱৰ্তন মন কৰক। এবাৰ পৰিৱৰ্তনটো চিনি পোৱাৰ পিছত নতুন শব্দত প্ৰয়োগ কৰক।"},{"q":"মই অসমীয়াত মৌখিক যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?","a":"হয়। প্ৰশ্ন আৰু ব্যাখ্যা অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত উপলব্ধ, আৰু পঢ়ি থাকোঁতে আপুনি ভাষা সলনি কৰিব পাৰে।"},{"q":"প্ৰতিদিনে কিমান যুক্তিৰ প্ৰশ্ন সমাধান কৰা উচিত?","a":"দুই বা তিনি অধ্যায়ৰ পঞ্চাশৰ পৰা ষাঠিটা প্ৰশ্ন এটা সুস্থ দৈনিক লক্ষ্য, লগতে প্ৰতিটো ভুলৰ পৰ্যালোচনা।"},{"q":"axomexam ত মৌখিক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"analytical-critical-reasoning":{"title":"ADRE আৰু APSC ৰ বাবে বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি অনুশীলন | axomexam","meta":"ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ বাবে বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি অনুশীলন। আসন বিন্যাস, ধাঁধা, বিবৃতি আৰু ধাৰণা, সিদ্ধান্ত, দাবী আৰু কাৰণ।","lead":["বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিয়ে জুখে আপুনি তথ্য কিমান ভালদৰে সজাই ৰাখিব পাৰে আৰু তৰ্ক কিমান ভালদৰে বিচাৰ কৰিব পাৰে। ইয়াত আসন বিন্যাস, জটিল ধাঁধা, সংকেতযুক্ত অসমতা, আৰু ধাৰণা, সিদ্ধান্ত, তৰ্ক আৰু কাৰ্যপন্থাৰ দৰে বিবৃতিভিত্তিক অধ্যায়বোৰ সামৰি লোৱা হয়।","যুক্তিৰ এই অংশটোৱেই সেই ঠাই য'ত খৰখেদাকৈ অনুমান কৰাতকৈ সাৱধানে পঢ়াটো বেছি গুৰুত্বপূৰ্ণ। axomexam ত প্ৰতিটো অধ্যায়ত সমাধান কৰা উদাহৰণ আৰু বিশদ দ্বিভাষিক ব্যাখ্যাৰ সৈতে অনুশীলন ছেট আছে, যাতে দিয়া বিবৃতিবোৰৰ পৰা এটা সিদ্ধান্ত কেনেদৰে ওলায় আপুনি সঠিকভাৱে দেখিব পাৰে।"],"sections":[{"h":"বিশ্লেষণাত্মক আৰু সমালোচনাত্মক শিতানে কি বিচাৰে","p":["ধাঁধা আৰু বিন্যাসৰ প্ৰশ্নই চৰ্তৰ এটা গোট অনুসৰি মানুহ বা বস্তু ৰাখিবলৈ আপোনাৰ ক্ষমতা পৰীক্ষা কৰে। বিবৃতিভিত্তিক অধ্যায়বোৰে কি বুজোৱা হৈছে, কি ধৰি লোৱা হৈছে, কি শক্তিশালী বা দুৰ্বল কৰা হৈছে সেই বিষয়ে আপোনাৰ বিচাৰ পৰীক্ষা কৰে।"]},{"h":"axomexam ত সামৰি লোৱা বিশ্লেষণাত্মক যুক্তিৰ অধ্যায়বোৰ","list":["আসন বিন্যাস — ৰৈখিক, বৃত্তাকাৰ আৰু জটিল শাৰী বিন্যাস।","ধাঁধা — বিষয়ভিত্তিক বিন্যাস, গোট আৰু দিন-ভিত্তিক ধাঁধা।","সংকেতযুক্ত অসমতা আৰু গাণিতিক অসমতা।","বিবৃতি আৰু ধাৰণা — লুকাই থকা ধাৰণাটো চিনি পেলাওক।","বিবৃতি আৰু সিদ্ধান্ত, বিবৃতি আৰু কাৰ্যপন্থা।","তৰ্ক — শক্তিশালী আৰু দুৰ্বল তৰ্ক চিনাক্ত কৰক।","কাৰণ আৰু প্ৰভাৱ, আৰু উপযুক্ত যুক্তি।"]},{"h":"বিশ্লেষণাত্মক যুক্তি প্ৰস্তুতিৰ কৌশল","list":["প্ৰতিটো ধাঁধাৰ চৰ্তবোৰ তালিকাত লিখি চিত্ৰ বা টেবুল হিচাপে সজাওক।","সম্ভাৱ্য অৱস্থানবোৰ বাদ দি আগবাঢ়ক, যাতে এটা সঠিক বিন্যাসত উপনীত হয়।","বিবৃতিভিত্তিক প্ৰশ্নৰ বাবে প্ৰদত্ত তথ্যৰ বাহিৰে আন একো ধৰি নল'ব।","তৰ্কৰ প্ৰশ্নত দাবীটো আৰু তাৰ কাৰণ সুকীয়াকৈ চিনি পেলাওক।","প্ৰতিদিনে এটা জটিল ধাঁধা সময়বদ্ধভাৱে সমাধান কৰক।","ভুল উত্তৰবোৰ বিশ্লেষণ কৰি কি চৰ্ত হেৰুওৱা হ'ল চিনি পেলাওক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["চৰ্তবোৰ মনত ৰাখি সমাধান কৰাৰ পৰিৱৰ্তে প্ৰথম অৱস্থানতে অনুমান কৰা।","বিবৃতিভিত্তিক প্ৰশ্নত নিদিয়া তথ্য ধৰি লোৱা।","ধাঁধাৰ এটা অংশ পাহৰি গৈ ভুল বিন্যাসত উপনীত হোৱা।","এটা কঠিন ধাঁধাত বেছি সময় খৰচ কৰি সহজ প্ৰশ্ন এৰি দিয়া।"]}],"faqs":[{"q":"বিশ্লেষণাত্মক যুক্তি কঠিন নেকি?","a":"ই ধৈৰ্য আৰু পদ্ধতিগত চিন্তাৰ ওপৰত নিৰ্ভৰ কৰে। নিয়মীয়া অনুশীলনৰ সৈতে ই যুক্তিৰ শিতানৰ এটা নিৰ্ভৰযোগ্য নম্বৰৰ উৎস হৈ পৰে।"},{"q":"ADRE আৰু APSC ৰ বাবে কোনবোৰ বিশ্লেষণাত্মক বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"আসন বিন্যাস, ধাঁধা, সংকেতযুক্ত অসমতা, বিবৃতি-সিদ্ধান্ত আৰু তৰ্ক সৰ্বাধিক বাৰে সোধা হয়।"},{"q":"ধাঁধাৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?","a":"চৰ্তবোৰ এটা টেবুলত লিখক আৰু প্ৰতিটো সম্ভাৱনা বাদ দি আগবাঢ়ক। এটা বা দুটা সম্ভাৱনা আঁচি ল'লে বাকীখিনি সহজে ওলায়।"},{"q":"মই অসমীয়াত বিশ্লেষণাত্মক যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?","a":"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে।"},{"q":"দৈনিক কিমান সময় দিয়া উচিত?","a":"দিনে এঘণ্টা ধাঁধা আৰু বিবৃতিভিত্তিক প্ৰশ্নত দিয়া উচিত, লগতে প্ৰতিটো ভুলৰ পৰ্যালোচনা।"},{"q":"axomexam ত বিশ্লেষণাত্মক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"science":{"title":"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে সাধাৰণ বিজ্ঞান প্ৰশ্ন | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া সাধাৰণ বিজ্ঞান অনুশীলন। পদাৰ্থ বিজ্ঞান, ৰসায়ন, জীৱ বিজ্ঞান আৰু পৰিৱেশ — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।","lead":["সাধাৰণ বিজ্ঞান ADRE, অসম আৰক্ষী, APSC, SSC, ৰে'লৱে আৰু প্ৰায় প্ৰতিটো অসম ৰাজ্যিক নিযুক্তি পৰীক্ষাৰ সাধাৰণ জ্ঞান শিতানৰ এটা নিশ্চিত অংশ। প্ৰশ্নবোৰ সাধাৰণতে ধাৰণাভিত্তিক আৰু দৈনন্দিন জীৱনৰ সৈতে জড়িত, গতিকে সঠিক প্ৰস্তুতিৰ সৈতে এই শিতানৰ নম্বৰ সহজে লাভ কৰিব পাৰি।","axomexam ত বিষয়টো পদাৰ্থ বিজ্ঞান, ৰসায়ন, জীৱ বিজ্ঞান আৰু পৰিৱেশ বিজ্ঞানত বিভক্ত। প্ৰতিটো অধ্যায়ৰ প্ৰশ্নৰ সৈতে স্পষ্ট দ্বিভাষিক ব্যাখ্যা আছে, যাতে আপুনি কেৱল উত্তৰ মনত নৰখি ধাৰণাটোও বুজি পায়।"],"sections":[{"h":"কিয় সাধাৰণ বিজ্ঞান গুৰুত্বপূৰ্ণ","p":["অসমৰ নিযুক্তি পৰীক্ষাত সাধাৰণ বিজ্ঞানৰ প্ৰশ্নই সাধাৰণ জ্ঞান শিতানৰ এটা উল্লেখযোগ্য অংশ গঠন কৰে। প্ৰশ্নবোৰ সাধাৰণতে দৈনন্দিন পৰিঘটনা, স্বাস্থ্য, খাদ্য, শক্তি আৰু পৰিৱেশৰ ওপৰত আধাৰিত, গতিকে সাধাৰণ বুজবুজৰ সৈতে বেছিভাগ প্ৰশ্নৰ উত্তৰ দিব পাৰি।"]},{"h":"axomexam ত সামৰি লোৱা বিজ্ঞানৰ অধ্যায়বোৰ","list":["পদাৰ্থ বিজ্ঞান — গতি, বল, শক্তি, কাম, তাপ, পোহৰ, শব্দ আৰু বিদ্যুৎ।","ৰসায়ন — পদাৰ্থৰ প্ৰকাৰ, পৰমাণু, অণু, মৌল, যৌগ, মিশ্ৰণ আৰু দৈনন্দিন ৰসায়ন।","জীৱ বিজ্ঞান — কোষ, উদ্ভিদ, প্ৰাণী, মানৱ শৰীৰ, ৰোগ আৰু পুষ্টি।","পৰিৱেশ বিজ্ঞান — পৰিৱেশ তন্ত্ৰ, প্ৰদূষণ, জৈৱ বৈচিত্ৰ্য আৰু সংৰক্ষণ।","বৈজ্ঞানিক যন্ত্ৰ আৰু একক, আৰু আৱিষ্কাৰ তথা আৱিষ্কাৰক।"]},{"h":"অসম পৰীক্ষাত সৰ্বাধিক পুনৰাবৃত্তি হোৱা বিজ্ঞানৰ বিষয়","list":["মানৱ শৰীৰৰ অংগ আৰু তন্ত্ৰ।","ৰোগ আৰু সিহঁতৰ কাৰণ তথা প্ৰতিষেধক।","পুষ্টি, ভিটামিন আৰু সিহঁতৰ অভাৱজনিত ৰোগ।","বিদ্যুৎ আৰু চুম্বকত্বৰ মূল ধাৰণা।","দৈনন্দিন জীৱনত ব্যৱহৃত ৰাসায়নিক যৌগ।","প্ৰদূষণৰ প্ৰকাৰ আৰু ইয়াৰ প্ৰভাৱ।"]},{"h":"বিজ্ঞান প্ৰস্তুতিৰ কৌশল","list":["প্ৰতিটো ধাৰণা দৈনন্দিন জীৱনৰ উদাহৰণৰ সৈতে সংযোগ কৰক।","গুৰুত্বপূৰ্ণ সূত্ৰ, একক আৰু প্ৰতীকৰ এখন চুটি টোকা প্ৰস্তুত কৰক।","ভিটামিন, ৰোগ আৰু যন্ত্ৰৰ তালিকা টেবুল হিচাপে বনাই পুনৰাবৃত্তি কৰক।","প্ৰতিদিনে এটা অধ্যায়ৰ প্ৰশ্ন অনুশীলন কৰক।","ভুল উত্তৰবোৰৰ কাৰণ বিশ্লেষণ কৰক।","সাপ্তাহিকভাৱে এটা মিশ্ৰ ছেট চেষ্টা কৰক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["একক আৰু জোখ-মাখৰ প্ৰতি মন নিদিয়া।","পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ ধাৰণা মিহলাই পেলোৱা।","কেৱল তথ্য মনত ৰখা, ধাৰণাটো নুবুজা।","দৈনন্দিন বিজ্ঞানৰ প্ৰশ্নক হেয়জ্ঞান কৰা — এইবোৰেই সৰ্বাধিক বাৰে আহে।"]}],"faqs":[{"q":"ADRE আৰু অসম আৰক্ষীত সাধাৰণ বিজ্ঞান কিমান গুৰুত্বপূৰ্ণ?","a":"সাধাৰণ জ্ঞান শিতানৰ এটা উল্লেখযোগ্য অংশ সাধাৰণ বিজ্ঞানৰ, আৰু ই সহজে নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা।"},{"q":"বিজ্ঞানৰ বাবে কোনবোৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"মানৱ শৰীৰ, পুষ্টি আৰু ভিটামিন, ৰোগ, বিদ্যুৎৰ মূল ধাৰণা আৰু প্ৰদূৰ্ণ সৰ্বাধিক বাৰে সোধা হয়।"},{"q":"বিজ্ঞান প্ৰস্তুতি কৰিবলৈ কিমান সময় লাগে?","a":"সঠিক ধাৰণাৰ সৈতে দুইৰ পৰা তিনিটা সপ্তাহৰ নিয়মীয়া পুনৰাবৃত্তি বেছিভাগ প্ৰাৰ্থীৰ বাবে যথেষ্ট।"},{"q":"মই অসমীয়াত বিজ্ঞান পঢ়িব পাৰিম নেকি?","a":"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে।"},{"q":"ৰসায়নৰ বাবে পৃথক প্ৰস্তুতি প্ৰয়োজন নেকি?","a":"পৃথকভাৱে বেছি নহয়, কিন্তু দৈনন্দিন ৰসায়ন আৰু মূল মৌল তথা যৌগবোৰ ভালদৰে জনাটো প্ৰয়োজন।"},{"q":"axomexam ত বিজ্ঞানৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"english":{"title":"ADRE, অসম আৰক্ষী আৰু APSC ৰ বাবে সাধাৰণ ইংৰাজী | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া সাধাৰণ ইংৰাজী অনুশীলন। ব্যাকৰণ, শব্দভাণ্ডাৰ, বাক্য গঠন আৰু বোধগম্যতা — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।","lead":["সাধাৰণ ইংৰাজী ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাত এটা স্থিৰ আৰু কম-ঝুঁকিৰ নম্বৰ দিয়া শিতান। ইয়াত ব্যাকৰণ, শব্দভাণ্ডাৰ আৰু বোধগম্যতা পৰীক্ষা কৰা হয়, আৰু নিয়মবোৰ জনাৰ সৈতে এই শিতানৰ নম্বৰ সহজে লাভ কৰিব পাৰি।","axomexam ত বিষয়টো ব্যাকৰণ, বক্তৃতাৰ অংশ, বাক্য গঠন আৰু শব্দভাণ্ডাৰত সজোৱা হৈছে, অনুশীলন প্ৰশ্ন আৰু স্পষ্ট ব্যাখ্যাৰ সৈতে।"],"sections":[{"h":"সাধাৰণ ইংৰাজীয়ে কি পৰীক্ষা কৰে","p":["এই শিতানে পৰীক্ষা কৰে আপুনি ব্যৱহাৰত থকা সঠিক ব্যাকৰণ চিনি পায় নেকি, খালী ঠাইত সঠিক শব্দ বাছনি কৰিব পাৰে নেকি, বাক্যত ভুল ধৰা পেলাব পাৰে নেকি, আৰু এটা অনুচ্ছেদৰ অৰ্থ বুজিব পাৰে নেকি।"]},{"h":"axomexam ত সামৰি লোৱা ইংৰাজীৰ অধ্যায়বোৰ","list":["ব্যাকৰণ — কাল, articles, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, আৰু প্ৰত্যক্ষ তথা পৰোক্ষ উক্তি।","বক্তৃতাৰ অংশ — বিশেষ্য, সৰ্বনাম, ক্ৰিয়া, বিশেষণ, ক্ৰিয়া বিশেষণ, পূৰ্বসৰ্গ, সংযোজক আৰু আবেগসূচক।","বাক্য গঠন — বাক্যৰ প্ৰকাৰ, বাক্যাংশ আৰু উপবাক্য, বাক্য সংশোধন আৰু অনুচ্ছেদ ক্ৰম।","শব্দভাণ্ডাৰ — সমাৰ্থক, বিপৰীত, এক-শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বানান।"]},{"h":"সৰ্বাধিক পুনৰাবৃত্তি হোৱা ইংৰাজীৰ বিষয়","list":["কৰ্তা-ক্ৰিয়াৰ মিল আৰু সাধাৰণ ভুল চিনাক্তকৰণ।","কাল আৰু সিহঁতৰ সঠিক ব্যৱহাৰ।","পূৰ্বসৰ্গ আৰু articles।","সমাৰ্থক, বিপৰীত আৰু এক-শব্দ প্ৰতিস্থাপন।","বাগধাৰা আৰু সিহঁতৰ অৰ্থ।","খালী ঠাই পূৰণ আৰু ক্ল'জ টেষ্ট।"]},{"h":"সাধাৰণ ইংৰাজী প্ৰস্তুতিৰ কৌশল","list":["এক সময়ত এটা ব্যাকৰণৰ নিয়ম পুনৰাবৃত্তি কৰক আৰু তাৰ ওপৰত বিশটা প্ৰশ্ন সমাধান কৰক।","প্ৰতিদিনে এটা চুটি অনুচ্ছেদ পঢ়ক আৰু অপৰিচিত শব্দ আৰু সিহঁতৰ অৰ্থ টুকি লওক।","প্ৰতিদিনে পাঁচটা নতুন শব্দ, পাঁচটা সমাৰ্থক আৰু তিনিটা বাগধাৰা শিকক।","বিকল্প বাছনি কৰাৰ আগতে বাক্যটো সম্পূৰ্ণ পঢ়ি ভুল চিনাক্তকৰণৰ অভ্যাস কৰক।","articles, পূৰ্বসৰ্গ আৰু কৰ্তা-ক্ৰিয়াৰ মিলৰ নিয়ম সৰ্বাধিক বাৰে পুনৰাবৃত্তি কৰক।","আপোনাৰ শুদ্ধতা জুখিবলৈ সপ্তাহে এটা সম্পূৰ্ণ ইংৰাজী ছেট চেষ্টা কৰক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["নিয়ম প্ৰয়োগ নকৰি 'শুদ্ধ যেন শুনা যায়' বুলি বিকল্প বাছনি কৰা।","articles আৰু পূৰ্বসৰ্গ এৰি দিয়া, যিবোৰ প্ৰতি বছৰে সোধা হয়।","ব্যৱহাৰ বা উদাহৰণ বাক্য নোহোৱাকৈ শব্দ শিকা।","প্ৰশ্ন চোৱাৰ আগতে গোটেই বোধগম্যতাৰ অনুচ্ছেদ পঢ়া।"]}],"faqs":[{"q":"ADRE ত সাধাৰণ ইংৰাজীত নম্বৰ লাভ কৰা সহজ নেকি?","a":"হয়। পাঠ্যক্ৰম সীমিত আৰু নিয়মভিত্তিক, গতিকে নিয়মীয়া পুনৰাবৃত্তিৰ সৈতে বেছিভাগ প্ৰাৰ্থীয়ে এই শিতানত গড়তকৈ ভাল নম্বৰ পাব পাৰে।"},{"q":"কোনবোৰ ব্যাকৰণৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"কাল, কৰ্তা-ক্ৰিয়াৰ মিল, articles, পূৰ্বসৰ্গ, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, আৰু প্ৰত্যক্ষ তথা পৰোক্ষ উক্তি সৰ্বাধিক বাৰে সোধা হয়।"},{"q":"মই শব্দভাণ্ডাৰ দ্ৰুতভাৱে কেনেদৰে উন্নত কৰিম?","a":"প্ৰতিদিনে সৰু সৰু গোটত শব্দ আৰু সিহঁতৰ ব্যৱহাৰ শিকক, আৰু সমাৰ্থক, বিপৰীত, এক-শব্দ প্ৰতিস্থাপন তথা বাগধাৰা নিয়মীয়াকৈ পুনৰাবৃত্তি কৰক।"},{"q":"axomexam ত অসমীয়াত ইংৰাজী পঢ়িব পাৰিম নেকি?","a":"ব্যাখ্যাবোৰ দ্বিভাষিক, যাতে দুয়ো ভাষাত নিয়মটো স্পষ্ট হয়, আৰু প্ৰশ্নবোৰে ইংৰাজী পৰীক্ষাৰ আৰ্হি অনুসৰণ কৰে।"},{"q":"এই পৰীক্ষাবোৰত বোধগম্যতা সোধা হয় নেকি?","a":"হয়, বহু প্ৰশ্নকাকতত প্ৰত্যক্ষ ব্যাকৰণ আৰু শব্দভাণ্ডাৰৰ প্ৰশ্নৰ লগতে এটা চুটি পঢ়া-বোধগম্যতাৰ অনুচ্ছেদও থাকে।"},{"q":"axomexam ত সাধাৰণ ইংৰাজীৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"articles":{"title":"অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া অধ্যয়ন প্ৰবন্ধ | axomexam","meta":"ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া উচ্চমানৰ অধ্যয়ন প্ৰবন্ধ পঢ়ক। সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তি, ইংৰাজী আৰু কম্পিউটাৰৰ দীঘলীয়া টোকা।","lead":["axomexam ৰ প্ৰবন্ধবোৰ হৈছে দীঘলীয়া অধ্যয়ন সামগ্ৰী, যিয়ে এটা বিষয় গভীৰভাৱে আৰু সৰল ভাষাত ব্যাখ্যা কৰে। এইবোৰ প্ৰশ্ন কৰাৰ আগতে ধাৰণাগত স্পষ্টতা গঢ়িবলৈ লিখা হয়, যাৰ ফলত নতুন বিষয় আৰম্ভ কৰিবলৈ বা বাৰে বাৰে ভুল হোৱা বিষয় পুনৰাবৃত্তি কৰিবলৈ এইবোৰ উপযুক্ত।","সংগ্ৰহটোৱে সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তিৰ ক্ষমতা, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি লয়, গতিকে দুৰ্বল ক্ষেত্ৰ শক্তিশালী কৰিবলৈ বা চিনাকি বিষয়ৰ দ্ৰুত পুনৰাবৃত্তিৰ বাবে উপযুক্ত প্ৰবন্ধ সদায় থাকে।"],"sections":[{"h":"প্ৰবন্ধ শিতান কেনেদৰে ব্যৱহাৰ কৰিব","p":["ধাৰণাটো বুজিবলৈ এবাৰ প্ৰবন্ধটো পঢ়ক, তাৰ পিছত সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰক। প্ৰবন্ধবোৰ জাণী সৰল আৰু উদাহৰণমুখী ৰখা হয়, যাতে পৰীক্ষাত এটা একেধৰণৰ প্ৰশ্ন দেখিলে ধাৰণাটো আপোনাৰ লগত থাকে।"]},{"h":"উপলব্ধ প্ৰবন্ধৰ শ্ৰেণীবোৰ","list":["সাধাৰণ জ্ঞান — অসমৰ ইতিহাস, সাহিত্য, ভূগোল, ৰাজনীতি, অৰ্থনীতি আৰু কলা তথা সংস্কৃতি।","গণিত — পাটিগণিত, উন্নত গণিত আৰু তথ্য বিশ্লেষণৰ ধাৰণা ধাপে ধাপে ব্যাখ্যা।","সাধাৰণ বিজ্ঞান — পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ বিষয় দৈনন্দিন ভাষাত।","যুক্তিৰ ক্ষমতা — মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক যুক্তিৰ কৌশল।","সাধাৰণ ইংৰাজী — ব্যাকৰণৰ নিয়ম, শব্দভাণ্ডাৰ গঢ়া আৰু সাধাৰণ ভুলৰ আৰ্হি।","কম্পিউটাৰ সজাগতা — মূল কথা, ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং আৰু চাইবাৰ সুৰক্ষা।"]},{"h":"প্ৰবন্ধই আপোনাৰ প্ৰস্তুতিত কেনেদৰে সহায় কৰে","list":["ই এটা নিয়মৰ পিছৰ 'কিয়'টো ব্যাখ্যা কৰে, যি নতুন প্ৰশ্নত প্ৰয়োগ কৰিবলৈ সহায় কৰে।","পৰীক্ষাৰ আগৰ শেষ সপ্তাহবোৰত এইবোৰ আদৰ্শ পুনৰাবৃত্তিৰ সামগ্ৰী।","ই তত্ত্বক বিগত প্ৰশ্নকাকতৰ সমাধান কৰা উদাহৰণৰ সৈতে সংযোগ কৰে।","ই বোধগম্যতা আৰু সাধাৰণ সজাগতাৰ বাবে প্ৰয়োজনীয় পঢ়াৰ অভ্যাস গঢ়ে।"]},{"h":"অধ্যয়ন প্ৰবন্ধৰ পৰা সৰ্বাধিক লাভ কৰাৰ টিপছ","list":["কলম লৈ পঢ়ক আৰু মূল কথাবোৰ তথা সূত্ৰ টুকি লওক।","পঢ়াৰ লগে লগে সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰক।","আপোনাৰ মনত ৰখাৰ ক্ষমতা পৰীক্ষা কৰিবলৈ এসপ্তাহৰ পিছত প্ৰবন্ধটো আকৌ চাওক।","ইংৰাজী আৰু অসমীয়া দুয়ো ভাষাত পৰিভাষা শক্তিশালী কৰিবলৈ দ্বিভাষিক দৃশ্য ব্যৱহাৰ কৰক।"]}],"faqs":[{"q":"axomexam ত কেনেধৰণৰ প্ৰবন্ধ প্ৰকাশ কৰা হয়?","a":"অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তি, ইংৰাজী আৰু কম্পিউটাৰ সজাগতাৰ দীঘলীয়া, সহজ-পঢ়া অধ্যয়ন সামগ্ৰী।"},{"q":"প্ৰবন্ধবোৰ ADRE আৰু APSC ৰ বাবে উপযোগী নেকি?","a":"হয়। প্ৰবন্ধবোৰে ADRE, APSC CCE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে প্ৰশ্নকাকতত অহা ধাৰণা আৰু তথ্য সামৰি লয়।"},{"q":"অনুশীলন প্ৰশ্নৰ আগতে নে পিছত প্ৰবন্ধ পঢ়া উচিত?","a":"ধাৰণাটো বুজিবলৈ আগতে প্ৰবন্ধটো পঢ়ক, তাৰ পিছত সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰি আপোনাৰ ভুল পৰ্যালোচনা কৰক।"},{"q":"প্ৰবন্ধবোৰ অসমীয়াত উপলব্ধ নেকি?","a":"সামগ্ৰীখন অসমীয়া আৰু ইংৰাজী দুয়ো পঢ়ুৱৈক সহায় কৰিবলৈ সজোৱা হৈছে, আৰু মূল পৰিভাষাবোৰ দুয়ো ভাষাত ব্যাখ্যা কৰা হয়।"},{"q":"নতুন প্ৰবন্ধ কিমান সঘনাই যোগ কৰা হয়?","a":"নতুন প্ৰবন্ধ নিয়মীয়াকৈ যোগ কৰা হয়, গতিকে আপোনাৰ পাঠ্যক্ৰম আগবাঢ়ি যোৱাৰ লগে লগে পৃষ্ঠাটো আকৌ চাওক।"},{"q":"প্ৰবন্ধ শিতান বিনামূলীয়াকৈ ব্যৱহাৰ কৰিব পাৰি নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো প্ৰবন্ধ আৰু অধ্যয়ন সমল সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"math":{"title":"ADRE, APSC আৰু অসম আৰক্ষী পৰীক্ষাৰ বাবে গণিত | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া গণিত অনুশীলন। পাটিগণিত, উন্নত গণিত, পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ — দ্বিভাষিক ধাপে ধাপে সমাধানৰ সৈতে।","lead":["গণিত বা পৰিমাণাত্মক যোগ্যতা ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ সৰ্বাধিক নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা। বিষয়টোৱে অনুশীলনক পুৰস্কৃত কৰে: যিমান বেছি আৰ্হি আপুনি দেখিছে, সিমান দ্ৰুত আৰু শুদ্ধভাৱে পৰীক্ষাৰ দিনা সমাধান কৰিব।","axomexam ত গণিতক পাটিগণিত, উন্নত গণিত, আৰু পৰিসংখ্যা তথা তথ্য বিশ্লেষণত ভাগ কৰা হৈছে। প্ৰতিটো শিতান ভেটিৰ পৰা পৰীক্ষাৰ স্তৰৰ প্ৰশ্নলৈ গঢ়ি উঠে, যাতে আপুনি এক সময়ত এটা ক্ষেত্ৰ শক্তিশালী কৰিব পাৰে।"],"sections":[{"h":"অসম পৰীক্ষাত গণিত কিয় গুৰুত্বপূৰ্ণ","p":["সংখ্যাগত ক্ষমতাই বহু প্ৰশ্ন বহন কৰে আৰু সাধাৰণতে এই শিতানটোৱেই সেই ঠাই য'ত ভালদৰে প্ৰস্তুত প্ৰাৰ্থীয়ে আগবাঢ়ি যায়। ধাৰণাবোৰ নিৰ্দিষ্ট আৰু আৰ্হিবোৰ পুনৰাবৃত্তি হয়, গতিকে গণিতে বেছিভাগ অন্য বিষয়তকৈ প্ৰস্তুতিৰ সময়ত ভাল প্ৰতিদান দিয়ে।"]},{"h":"axomexam ত সামৰি লোৱা গণিতৰ শিতানবোৰ","list":["পাটিগণিত — সংখ্যা পদ্ধতি, শতাংশ, অনুপাত, লাভ-ক্ষতি, গড়, সময় আৰু কাম, সময় আৰু দূৰত্ব, আৰু সৰল তথা চক্ৰবৃদ্ধি সুত।","উন্নত গণিত — বীজগণিত, জ্যামিতি, ত্ৰিকোণমিতি, সংখ্যা পদ্ধতি আৰু উচ্চ স্তৰৰ সমস্যা সমাধান।","পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ — গড়, টেবুল, বাৰ চাৰ্ট, পাই চাৰ্ট আৰু ৰেখা লেখ।"]},{"h":"গণিত প্ৰস্তুতিৰ কৌশল","list":["এটা অধ্যায়ৰ উন্নত প্ৰশ্নলৈ যোৱাৰ আগতে ভেটিটো আয়ত্ত কৰক।","প্ৰতিটো প্ৰশ্ন দীঘল পদ্ধতিত সমাধান নকৰি চুটি কৌশল শিকি প্ৰয়োগ কৰক।","পৰীক্ষাই দাবী কৰা গতি গঢ়িবলৈ টাইমাৰ লৈ অনুশীলন কৰক।","এখন সূত্ৰৰ টোকাবহী ৰাখক আৰু নিয়মীয়াকৈ পুনৰাবৃত্তি কৰক।","প্ৰতিটো ভুল উত্তৰ বিশ্লেষণ কৰি ভুলটো ধাৰণাগত নে অসাৱধানতাৰ পৰা হ'ল বিচাৰক।","সপ্তাহে এটা সম্পূৰ্ণ গণিতৰ মক টেষ্ট লৈ আপোনাৰ শুদ্ধতা জুখক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["স্পষ্ট ভেটি নোহোৱাকৈ উন্নত প্ৰশ্ন চেষ্টা কৰা।","তথ্য বিশ্লেষণ এৰি দিয়া, যি সাৱধান পঢ়ুৱৈৰ বাবে সহজ নম্বৰ দিয়ে।","আসন্ন মানৰ অভ্যাস নকৰাৰ বাবে সময়ৰ চাপত গণনাৰ ভুল কৰা।","প্ৰশ্নৰ প্ৰকাৰৰ পৰ্যাপ্ত বৈচিত্ৰ্য অনুশীলন নকৰা।"]}],"faqs":[{"q":"ADRE ৰ বাবে কোনবোৰ গণিতৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"পাটিগণিতেই মূল, বিশেষকৈ শতাংশ, অনুপাত, গড়, লাভ-ক্ষতি, সময় আৰু কাম আৰু সময়-বেগ-দূৰত্ব। উন্নত গণিত আৰু তথ্য বিশ্লেষণে বাকী নম্বৰবোৰ যোগ কৰে।"},{"q":"অসম আৰক্ষী আৰু ADRE ৰ বাবে উন্নত গণিত প্ৰয়োজন নেকি?","a":"মৌলিক বীজগণিত আৰু জ্যামিতি উপযোগী, কিন্তু গুৰুত্ব পাটিগণিতৰ ওপৰতেই থাকে। APSC আৰু কাৰিকৰী পদৰ বাবে উন্নত গণিতত বেছি দখল প্ৰয়োজন।"},{"q":"মই মোৰ গণনাৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?","a":"নামতা, বৰ্গ, ঘনক আৰু শতাংশৰ পৰা ভগ্নাংশলৈ মান মনত ৰাখক, আৰু সময়বদ্ধ ছেটৰ সৈতে আসন্ন মানৰ কৌশল অনুশীলন কৰক।"},{"q":"প্ৰতিদিনে গণিতত কিমান সময় দিয়া উচিত?","a":"নিয়মীয়া ভুল পৰ্যালোচনা আৰু সাপ্তাহিক মক টেষ্টৰ সৈতে দিনে এঘণ্টাৰ পৰা দেৰ ঘণ্টা একাগ্ৰ অনুশীলন যথেষ্ট।"},{"q":"মই অসমীয়াত গণিত অনুশীলন কৰিব পাৰিম নেকি?","a":"হয়। সকলো অনুশীলন ছেট আৰু ধাপে ধাপে ব্যাখ্যা দ্বিভাষিক আৰু অসমীয়া বা ইংৰাজীত পঢ়িব পাৰি।"},{"q":"axomexam ত গণিতৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"reasoning":{"title":"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে যুক্তিৰ ক্ষমতাৰ প্ৰশ্ন | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া যুক্তি অনুশীলন। মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক যুক্তি — দ্বিভাষিক ধাপে ধাপে ব্যাখ্যা আৰু সময়বদ্ধ ছেটৰ সৈতে।","lead":["যুক্তিৰ ক্ষমতাই মনত ৰখা তথ্যৰ পৰিৱৰ্তে যুক্তিসংগত আৰু বিশ্লেষণাত্মক চিন্তা পৰীক্ষা কৰে। ই মৌখিক যুক্তি, অ-মৌখিক যুক্তি আৰু বিশ্লেষণাত্মক তথা সমালোচনাত্মক যুক্তিত বিভক্ত, আৰু একেলগে এইবোৰে ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাত এটা নম্বৰ দিয়া শিতান গঠন কৰে।","যুক্তিত গতি আৰু শুদ্ধতাই নম্বৰ নিৰ্ধাৰণ কৰে, গতিকে সময়বদ্ধ অনুশীলন অপৰিহাৰ্য। axomexam ত তিনিওটা শাখাৰ অধ্যায়ভিত্তিক ছেটৰ পিছত বিশদ ব্যাখ্যা আছে, যাতে আপুনি যুক্তি আৰু গতি দুয়োটা প্ৰশিক্ষণ দিব পাৰে।"],"sections":[{"h":"কিয় যুক্তি উচ্চ-নম্বৰ শিতান","p":["যুক্তিৰ প্ৰশ্নবোৰে নিৰ্দিষ্ট আৰ্হি অনুসৰণ কৰে, যিবোৰ প্ৰশ্নকাকতবোৰত পুনৰাবৃত্তি হয়। এবাৰ প্ৰাৰ্থীয়ে শ্ৰেণী, সংকেত, বিন্যাস আৰু বিবৃতিভিত্তিক প্ৰশ্নৰ মানক নিয়ম শিকিলে শিতানটো দ্ৰুত আৰু নিৰ্ভৰযোগ্য হৈ পৰে। ইয়াত নিয়মীয়া অনুশীলনৰ বাহিৰে অন্য অধ্যয়ন সামগ্ৰীৰ প্ৰয়োজন নাই।"]},{"h":"axomexam ত সামৰি লোৱা যুক্তিৰ শাখাবোৰ","list":["মৌখিক যুক্তি — সাদৃশ্য, শ্ৰেণীবিভাগ, শ্ৰেণী, সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, স্থান নিৰ্ণয়, ন্যায়বাক্য আৰু ঘড়ী-পঞ্জিকা।","অ-মৌখিক যুক্তি — চিত্ৰ শ্ৰেণী, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু কটা, অন্তৰ্নিহিত চিত্ৰ, চিত্ৰ মেট্ৰিক্স, চিত্ৰ গণনা আৰু ঘনক তথা পাশা।","বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি — আসন বিন্যাস, ধাঁধা, অসমতা, আৰু ধাৰণা, সিদ্ধান্ত, তৰ্ক আৰু কাৰ্যপন্থাৰ দৰে বিবৃতিভিত্তিক অধ্যায়।"]},{"h":"যুক্তি প্ৰস্তুতিৰ কৌশল","list":["এটা অধ্যায়ৰ নিয়ম শিকক, তাৰ পিছত তাৰ ওপৰত অন্ততঃ বিশটা প্ৰশ্নৰ ছেট সমাধান কৰক।","বিন্যাস, ৰক্তসম্পৰ্ক আৰু দিশৰ বাবে মনত সমাধান নকৰি চিত্ৰ আঁকক।","যুক্তি দ্ৰুতভাৱে সলনি কৰিবলৈ অভ্যস্ত হ'বলৈ মিশ্ৰ ছেট অনুশীলন কৰক।","শুদ্ধতাৰ লগে লগে গতি বাঢ়িবলৈ প্ৰতিটো ছেট সময় জুখক।","ভুল উত্তৰবোৰ তৎক্ষণাত পৰ্যালোচনা কৰি হেৰুওৱা নিয়মটো টুকি লওক।","সপ্তাহে এটা সম্পূৰ্ণ যুক্তিৰ মক টেষ্ট চেষ্টা কৰক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["প্ৰশ্নৰ প্ৰতিটো অংশৰ সৈতে পৰীক্ষা নকৰি যুক্তিটো অনুমান কৰা।","সহজ প্ৰশ্ন ৰৈ থকাৰ সময়ত এটা ধাঁধাত আটকি থকা।","অচিনাকি যেন লাগে বুলি অ-মৌখিক যুক্তি এৰি দিয়া।","পৰ্যাপ্ত বৈচিত্ৰ্য অনুশীলন নকৰা, যাৰ ফলত পৰীক্ষাত অচিনাকি আৰ্হিবোৰ কঠিন যেন লাগে।"]}],"faqs":[{"q":"ADRE আৰু অসম আৰক্ষীত কিমান যুক্তিৰ প্ৰশ্ন আহে?","a":"পদ আৰু প্ৰশ্নকাকতৰ ওপৰত নিৰ্ভৰ কৰি যুক্তিৰ শিতানত সাধাৰণতে ১৫ৰ পৰা ২৫ টা প্ৰশ্ন থাকে।"},{"q":"কোনটো যুক্তিৰ শাখা আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"তিনিওটা সোধা হয়, কিন্তু মৌখিক আৰু বিশ্লেষণাত্মক যুক্তিত সাধাৰণতে অ-মৌখিক যুক্তিতকৈ বেছি প্ৰশ্ন থাকে।"},{"q":"মই যুক্তিৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?","a":"মানক নিয়মবোৰ শিকি তাৰ পিছত সময়বদ্ধ ছেট অনুশীলন কৰক। বিন্যাস আৰু ধাঁধাৰ বাবে চিত্ৰ আঁকিলেও বহু সময় ৰাহি হয়।"},{"q":"নতুনকৈ আৰম্ভ কৰা প্ৰাৰ্থীৰ বাবে যুক্তি কঠিন নেকি?","a":"নহয়। ই আটাইতকৈ অনুশীলন-বান্ধৱ শিতানবোৰৰ এটা। ধাৰাবাহিক দৈনিক অনুশীলনৰ সৈতে নতুনকৈ আৰম্ভ কৰা প্ৰাৰ্থীয়ে দ্ৰুতভাৱে উন্নতি কৰে।"},{"q":"মই অসমীয়াত যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?","a":"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক আৰু পঢ়ি থাকোঁতে আপুনি অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে।"},{"q":"axomexam ত যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"computer":{"title":"ADRE, অসম আৰক্ষী আৰু APSC ৰ বাবে কম্পিউটাৰ সজাগতা প্ৰশ্ন | axomexam","meta":"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া কম্পিউটাৰ সজাগতা অনুশীলন। মূল কথা, হাৰ্ডৱেৰ, ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা পদ্ধতি।","lead":["কম্পিউটাৰ সজাগতা ADRE, অসম আৰক্ষী, APSC, DHS, DME, গুৱাহাটী উচ্চ ন্যায়ালয় আৰু অন্য ৰাজ্যিক নিযুক্তি পৰীক্ষাত প্ৰস্তুতি তথা নম্বৰ লাভ কৰিবলৈ আটাইতকৈ দ্ৰুত শিতানবোৰৰ এটা। বেছিভাগ প্ৰশ্ন প্ৰত্যক্ষ আৰু তথ্যভিত্তিক, গতিকে চুটি, একাগ্ৰ পুনৰাবৃত্তিৰ সৈতে প্ৰায় সম্পূৰ্ণ নম্বৰ নিশ্চিত কৰিব পাৰি।","axomexam ত বিষয়টো মূল কথা আৰু হাৰ্ডৱেৰ, ছফ্টৱেৰ আৰু অপাৰেটিং ছিষ্টেম, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, আৰু DBMS তথা সংখ্যা পদ্ধতি আৰু চুটি কৌশলত বিভক্ত। প্ৰতিটো অধ্যায় স্পষ্ট ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত।"],"sections":[{"h":"কম্পিউটাৰ সজাগতাই কি সামৰি লয়","p":["পাঠ্যক্ৰম আৰম্ভ হয় কম্পিউটাৰৰ মূল কথা, সিহঁতৰ প্ৰজন্ম, ইনপুট আৰু আউটপুট যন্ত্ৰ আৰু স্মৃতিৰ পৰা, তাৰ পিছত ছফ্টৱেৰ, অপাৰেটিং ছিষ্টেম আৰু এপ্লিকেচন পেকেজলৈ যায়। নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা আৰু ডেটাবেছৰ ধাৰণাই শিতানটো সম্পূৰ্ণ কৰে।"]},{"h":"axomexam ত সামৰি লোৱা কম্পিউটাৰৰ অধ্যায়বোৰ","list":["কম্পিউটাৰৰ মূল কথা আৰু হাৰ্ডৱেৰ — প্ৰজন্ম, ইনপুট আৰু আউটপুট যন্ত্ৰ, স্মৃতি, সংৰক্ষণ আৰু CPU।","ছফ্টৱেৰ আৰু অপাৰেটিং ছিষ্টেম — ছফ্টৱেৰৰ প্ৰকাৰ, অপাৰেটিং ছিষ্টেমৰ কাম, ফাইল পৰিচালনা আৰু সাধাৰণ Windows তথা Linux বৈশিষ্ট্য।","MS Office ছুইট — Word, Excel আৰু PowerPoint, মেনু বিকল্প, চুটি কৌশল আৰু সূত্ৰসহ।","নেটৱৰ্কিং আৰু ইণ্টাৰনেট — নেটৱৰ্কৰ প্ৰকাৰ আৰু ট'প'লজি, IP ঠিকনা, প্ৰ'ট'কল, ব্ৰাউজাৰ, ইমেইল আৰু ইণ্টাৰনেট সেৱা।","চাইবাৰ সুৰক্ষা — ভাইৰাছ, মেলৱেৰ, ফিছিং, হেকিং, পাছৱৰ্ড, এনক্ৰিপচন আৰু সুৰক্ষিত ইণ্টাৰনেট অভ্যাস।","DBMS, সংখ্যা পদ্ধতি আৰু চুটি কৌশল — ডেটাবেছৰ মূল কথা, সংখ্যা পদ্ধতিৰ ৰূপান্তৰ আৰু কীবৰ্ড চুটি কৌশল।"]},{"h":"অসম পৰীক্ষাত সৰ্বাধিক পুনৰাবৃত্তি হোৱা কম্পিউটাৰৰ বিষয়","list":["কম্পিউটাৰৰ প্ৰজন্ম আৰু সিহঁতৰ বৈশিষ্ট্য।","ইনপুট, আউটপুট আৰু সংৰক্ষণ যন্ত্ৰ উদাহৰণসহ।","সাধাৰণ কাৰ্যৰ বাবে কীবৰ্ড চুটি কৌশল।","মৌলিক MS Word আৰু MS Excel ফলন আৰু সূত্ৰ।","সাধাৰণ কম্পিউটাৰ সংক্ষিপ্ত ৰূপৰ সম্পূৰ্ণ ৰূপ।","কম্পিউটাৰ ভাইৰাছৰ প্ৰকাৰ আৰু চাইবাৰ সুৰক্ষাৰ টিপছ।"]},{"h":"কম্পিউটাৰ সজাগতা প্ৰস্তুতিৰ কৌশল","list":["সংক্ষিপ্ত ৰূপ আৰু সম্পূৰ্ণ ৰূপৰ এপৃষ্ঠাৰ তালিকা বনাই প্ৰতিদিনে পুনৰাবৃত্তি কৰক।","কীবৰ্ড চুটি কৌশল কম্পিউটাৰত প্ৰকৃততে ব্যৱহাৰ কৰি শিকক।","ইনপুট, আউটপুট আৰু সংৰক্ষণ যন্ত্ৰৰ এটা সৰু টেবুল প্ৰস্তুত কৰক।","মৌলিক Excel সূত্ৰ আৰু Word মেনু বিকল্প অনুশীলন কৰক।","সংখ্যা পদ্ধতিৰ ৰূপান্তৰ কেইটামান উদাহৰণৰ সৈতে পুনৰাবৃত্তি কৰক।","প্ৰতিটো বিষয় পঢ়াৰ পিছত অধ্যায়ভিত্তিক ছেট এটা চেষ্টা কৰক।"]},{"h":"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে","list":["সহজ যেন লাগে বুলি বিষয়টো এৰি দিয়া, আৰু পিছত সম্পূৰ্ণ ৰূপবোৰ পাহৰি যোৱা।","RAM আৰু ROM, বা হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ দৰে একেধৰণৰ শব্দ মিহলাই পেলোৱা।","চুটি কৌশল অনুশীলন নকৰা, যিবোৰ প্ৰতি বছৰে প্ৰত্যক্ষভাৱে সোধা হয়।","ভেটি অস্পষ্ট ৰাখি উন্নত বিষয় পঢ়া।"]}],"faqs":[{"q":"ADRE আৰু অসম আৰক্ষীত কম্পিউটাৰ সজাগতা সোধা হয় নেকি?","a":"হয়। ই সাধাৰণ সজাগতা শিতানৰ অংশ আৰু নম্বৰ লাভ কৰিবলৈ আটাইতকৈ সহজ ক্ষেত্ৰবোৰৰ এটা, কাৰণ বেছিভাগ প্ৰশ্ন প্ৰত্যক্ষ আৰু তথ্যভিত্তিক।"},{"q":"কম্পিউটাৰ সজাগতা প্ৰস্তুতি কৰিবলৈ কিমান সময় লাগে?","a":"পাঠ্যক্ৰম সৰু আৰু বেছিভাগ তথ্যভিত্তিক হোৱাৰ বাবে এৰ পৰা দুই সপ্তাহৰ একাগ্ৰ পুনৰাবৃত্তি সাধাৰণতে যথেষ্ট।"},{"q":"কোনবোৰ কম্পিউটাৰৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?","a":"মূল কথা, হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ পাৰ্থক্য, MS Office চুটি কৌশল আৰু সূত্ৰ, নেটৱৰ্কিংৰ মূল কথা আৰু চাইবাৰ সুৰক্ষা সৰ্বাধিক বাৰে সোধা হয়।"},{"q":"এই শিতান প্ৰস্তুতি কৰিবলৈ কম্পিউটাৰ প্ৰয়োজন নেকি?","a":"চুটি কৌশল আৰু MS Office ৰ বাবে কম্পিউটাৰে সহায় কৰে, কিন্তু তত্ত্বখন টোকা আৰু অনুশীলন প্ৰশ্নৰ পৰা যিকোনো যন্ত্ৰত প্ৰস্তুতি কৰিব পাৰি।"},{"q":"মই অসমীয়াত কম্পিউটাৰ সজাগতা পঢ়িব পাৰিম নেকি?","a":"হয়। axomexam ৰ অনুশীলন ছেট আৰু ব্যাখ্যা দ্বিভাষিক আৰু অসমীয়া বা ইংৰাজীত পঢ়িব পাৰি।"},{"q":"axomexam ত কম্পিউটাৰ সজাগতাৰ অনুশীলন বিনামূলীয়া নেকি?","a":"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]}};
  /* ==== END GENERATED DEEP CONTENT AS ==== */

  function subjectInfo(id) {
    if (state.lang === "as" && SUBJECT_INFO_AS[id]) return SUBJECT_INFO_AS[id];
    return SUBJECT_INFO[id] || "";
  }

  /* Preparation tips. The Assamese wording mirrors SUBJECT_INFO_AS so an /as/
     page carries Assamese advice instead of the English list. */
  const TIPS_AS = {
    quant: [
      "অনুশীলন আৰম্ভ কৰাৰ আগতে এই শিতানৰ মূল সূত্ৰ আৰু ধাৰণাসমূহ পুনৰালোচনা কৰক।",
      "ঘড়ী লগাই প্ৰশ্ন সমাধান কৰক, যাতে পৰীক্ষাৰ দিনা প্ৰয়োজনীয় গতিত অভ্যস্ত হয়।",
      "প্ৰতিটো ভুল উত্তৰৰ ব্যাখ্যা পঢ়ক আৰু কিয় ভুল কৰিছিল সেইটো টুকি লওক।",
      "কেইদিনমানৰ পিছত একেখিনি ছেটলৈ ঘূৰি আহি নিজৰ শুদ্ধতা বাঢ়িছে নে নাই পৰীক্ষা কৰক।"
    ],
    general: [
      "প্ৰথমে বিষয়ৰ টোকা এবাৰ পঢ়ক, তাৰ পিছত সম্পৰ্কিত প্ৰশ্ন সমাধান কৰি নিজৰ স্মৃতি পৰীক্ষা কৰক।",
      "যি তথ্যবোৰ বাৰে বাৰে পাহৰি যাই সেইবোৰ চিহ্নিত কৰি চুটি চুটি অধিবেশনত পুনৰালোচনা কৰক।",
      "দুয়োটা ভাষাত অনুশীলন কৰক, যাতে একেখিনি তথ্য অসমীয়া আৰু ইংৰাজী দুয়োতে চিনি পায়।",
      "শুদ্ধ উত্তৰ দিয়া প্ৰশ্নৰো ব্যাখ্যা পঢ়ক, যাতে মনত ৰখাৰ শক্তি বাঢ়ে।"
    ],
  };

  function subjectTips(id) {
    const quant = ["math", "arithmetic", "advanced-math", "statistics-and-data-interpretation", "science", "physics", "chemistry", "biology", "reasoning", "verbal-reasoning", "analytical-critical-reasoning", "non-verbal-reasoning", "computer", "dbms-number-shortcuts"];
    const isQuant = quant.indexOf(id) !== -1;
    if (state.lang === "as") return isQuant ? TIPS_AS.quant : TIPS_AS.general;
    if (isQuant) {
      return [
        "Revise the basic formulas and concepts of this section before you begin practising.",
        "Attempt the questions under a timer so that you get used to the speed expected on exam day.",
        "Read the explanation for every wrong answer and note down exactly why you missed it.",
        "Return to the same sets after a few days and check whether your accuracy has improved."
      ];
    }
    return [
      "Read the topic notes once, then attempt the related questions to test your recall.",
      "Mark the facts you keep forgetting and revise them in short, repeated sessions.",
      "Practise in both languages so you can recognise the same fact in Assamese and English.",
      "Review the explanations even for questions you answered correctly to strengthen retention."
    ];
  }

  function seoFaqBlockHTML(spec) {
    const info = spec.info || "";
    const items = spec.items || [];
    const tips = spec.tips || [];
    const faqs = spec.faqs || [];
    const as = state.lang === "as";
    const listHTML = items.length
      ? `<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${escapeHtml(as ? "ইয়াত কি কি সামৰি লোৱা হৈছে" : "What is covered here")}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${items.map((it) => `<li><strong>${escapeHtml(it.name)}</strong>${it.count ? ` &mdash; ${it.count} ${escapeHtml(it.unit || "topics")}` : ""}</li>`).join("")}</ul>`
      : "";
    const tipsHTML = tips.length
      ? `<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${escapeHtml((as ? "কেনেকৈ প্ৰস্তুতি ল'ব: " : "How to prepare ") + (spec.name || ""))}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${tips.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
      : "";
    const faqHTML = faqs.length
      ? `<h3 style="color:var(--ink,#0f172a); margin-top:24px;">${escapeHtml(as ? "সঘনাই সোধা প্ৰশ্ন" : "Frequently Asked Questions")}</h3><div class="seo-faq">${faqs.map((f) => `<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(f.q)}</summary><p style="margin:8px 0 0;">${escapeHtml(f.a)}</p></details>`).join("")}</div>`
      : "";
    return `
      <section class="section seo-deep" style="padding-bottom:48px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          <h2 style="margin-top:0; color:var(--ink,#0f172a);">${escapeHtml(spec.h2 || spec.name || "")}</h2>
          ${info ? `<p>${escapeHtml(info)}</p>` : ""}
          ${listHTML}
          ${tipsHTML}
          ${faqHTML}
        </div>
      </section>`;
  }

  function appendSeoFaq(main, spec) {
    if (!main || !spec) return;
    const tmp = document.createElement("div");
    tmp.innerHTML = seoFaqBlockHTML(spec);
    if (tmp.firstElementChild) main.appendChild(tmp.firstElementChild);
  }

  /* ---- Rich, hand-written page content (see scripts/deep-content.data.js).
     Rendered identically to the pre-rendered static block so that SPA
     navigation shows the same content a crawler sees. ---- */
  function deepFaqHTML(faqs) {
    if (!faqs || !faqs.length) return "";
    const as = state.lang === "as";
    return '<h3 style="color:var(--ink,#0f172a); margin-top:22px;">' + (as ? "সঘনাই সোধা প্ৰশ্ন" : "Frequently Asked Questions") + '</h3><div class="seo-faq">' +
      faqs.map((f) => '<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">' + escapeHtml(f.q) + '</summary><p style="margin:8px 0 0;">' + escapeHtml(f.a) + "</p></details>").join("") +
      "</div>";
  }

  function deepSectionsHTML(sections) {
    return (sections || []).map((s) => {
      let html = '<h3 style="color:var(--ink,#0f172a); margin-top:22px;">' + escapeHtml(s.h) + "</h3>";
      if (s.p && s.p.length) html += s.p.map((p) => "<p>" + escapeHtml(p) + "</p>").join("");
      if (s.list && s.list.length) html += '<ul style="margin:8px 0 0 20px; line-height:1.9;">' + s.list.map((li) => "<li>" + escapeHtml(li) + "</li>").join("") + "</ul>";
      return html;
    }).join("");
  }

  function deepSectionHTML(entry) {
    const lead = (entry.lead || []).map((p) => "<p>" + escapeHtml(p) + "</p>").join("");
    const h2 = entry.h2 || String(entry.title || "").replace(/\s*\|\s*axomexam\s*$/i, "");
    return '<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;"><div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;"><h2 style="margin-top:0; color:var(--ink,#0f172a);">' + escapeHtml(h2) + "</h2>" + lead + deepSectionsHTML(entry.sections) + deepFaqHTML(entry.faqs) + "</div></section>";
  }

  function autoSeo(main, o) {
    const deep = o && o.id
      ? (state.lang === "as" ? DEEP_CONTENT_AS[o.id] || DEEP_CONTENT[o.id] : DEEP_CONTENT[o.id])
      : null;
    if (deep) {
      const tmp = document.createElement("div");
      tmp.innerHTML = deepSectionHTML(deep);
      if (tmp.firstElementChild) main.appendChild(tmp.firstElementChild);
      return;
    }
    const name = o.name || "";
    const info = o.info || subjectInfo(o.id) || "";
    const faqs = (o.faqs || []).slice();
    const count = o.count || 0;
    const total = o.total || 0;
    if (!o.noDefaults) {
      const as = state.lang === "as";
      faqs.push({
        q: as ? name + " axomexam ত বিনামূলীয়া নেকি?" : "Is " + name + " available for free on axomexam?",
        a: as
          ? "হয়। axomexam.in ৰ প্ৰতিটো মক টেষ্ট, প্ৰশ্ন-সংগ্ৰহ, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া। কোনো লগইন, চাবস্ক্ৰিপচন বা গুপুত মাচুল নাই।"
          : "Yes. Every mock test, question bank, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."
      });
      faqs.push({
        q: as ? name + " অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত পঢ়িব পাৰিম নেকি?" : "Can I study " + name + " in Assamese as well as English?",
        a: as
          ? "হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক। পঢ়ি থাকোঁতে অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে, যাৰ ফলত একেখিনি ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।"
          : "Yes. Questions and explanations are bilingual. You can switch between Assamese and English while reading so the same concept is reinforced in both languages."
      });
      if (count > 0) {
        faqs.push({
          q: as ? name + " ৰ বাবে কিমান সমল উপলব্ধ?" : "How much material is available for " + name + "?",
          a: as
            ? "এই শিতানত এতিয়া " + count + " টা বিষয়" + (total > 0 ? " আৰু প্ৰায় " + total + " টা প্ৰশ্ন" : "") + " আছে, নতুন প্ৰশ্ন যোগ হোৱাৰ লগে লগে নিয়মীয়াকৈ হালনাগাদ কৰা হয়।"
            : "This section currently offers " + count + " topics" + (total > 0 ? " with around " + total + " questions" : "") + " and is updated regularly as new questions are added."
        });
      }
    }
    appendSeoFaq(main, {
      h2: o.h2 || (name + (state.lang === "as" ? " — পৰিচয়" : " - Overview")),
      name: name,
      info: info,
      items: o.items || [],
      tips: o.tips || subjectTips(o.id),
      faqs: faqs
    });
  }

  /* ================= Math & Formula Formatter ================= */
  function formatMath(str) {
    if (str == null) return "";
    let s = String(str);
    const hasLatex = /\$[^$]+\$|\\\([^\\]+\\\)/.test(s);
    if (!hasLatex) {
      s = escapeHtml(s);
      s = s.replace(/sqrt\(([^)]+)\)/gi, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
      s = s.replace(/√\(([^)]+)\)/g, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
      s = s.replace(/\^{([^}]+)}/g, '<sup>$1</sup>');
      s = s.replace(/\^\(([^)]+)\)/g, '<sup>$1</sup>');
      s = s.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, '<sup>$1</sup>');
      s = s.replace(/_{([^}]+)}/g, '<sub>$1</sub>');
      s = s.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, '<sub>$1</sub>');
      s = s.replace(/\+\/-/g, '&plusmn;');
      s = s.replace(/&lt;=/g, '&le;').replace(/&gt;=/g, '&ge;');
    }
    return s;
  }

  function renderMathJax(el) {
    if (!el) return Promise.resolve();
    /* Only pay for KaTeX when the element actually contains math. */
    if (!/\$|\\\(|\\\[/.test(el.textContent || "")) return Promise.resolve();
    return ensureKatex().then(function () {
      if (typeof renderMathInElement !== "function") return;
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) { }
    }).catch(function () { });
  }

  /* Universal content extractor */
  function extractField(item, fieldName, forcedLang) {
    if (!item) return "";
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const longLang = targetLang === "en" ? "english" : "assamese";

    const processVal = (v) => {
      if (v === undefined || v === null) return "";
      if (Array.isArray(v)) {
        return v.map(line => `<div class="qa-step-line" style="margin:0 0 6px 0; padding:0; line-height:1.65; text-align:left;">${formatMath(line)}</div>`).join("");
      }
      if (typeof v === "object") {
        return processVal(v[targetLang] || v.as || v.en || Object.values(v)[0] || "");
      }
      return String(v);
    };

    const maybeResolveAnswer = (val) =>
      fieldName === "answer" ? resolveOptionAnswer(item, val, targetLang) : val;

    /* For multiple-choice questions the answer must clearly point to the
       correct option (A/B/C/D). When options + a correct option key exist,
       prefer "(Letter) option text" over a free-form descriptive answer so
       the reader can see exactly which choice is right. Step-by-step array
       answers are left untouched. */
    if (fieldName === "answer") {
      const idx = getCorrectOptionIndex(item);
      const opts = getOptionsList(item, targetLang);
      const rawAnsVal = item.answer !== undefined ? item.answer : item.a;
      const isStepAnswer = Array.isArray(rawAnsVal)
        || (rawAnsVal && typeof rawAnsVal === "object" && Object.keys(rawAnsVal).some((k) => Array.isArray(rawAnsVal[k])));
      if (idx >= 0 && idx < opts.length && opts[idx] !== undefined && String(opts[idx]).trim() !== "" && !isStepAnswer) {
        return processVal(resolveOptionAnswer(item, idx, targetLang));
      }
    }

    if (item[longLang] && typeof item[longLang] === "object") {
      if (item[longLang][fieldName] !== undefined) return processVal(maybeResolveAnswer(item[longLang][fieldName]));
      const shortF = fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName === "explanation" ? "exp" : "";
      if (shortF && item[longLang][shortF] !== undefined) return processVal(maybeResolveAnswer(item[longLang][shortF]));
    }

    const directKey = `${fieldName}_${targetLang}`;
    if (item[directKey] !== undefined && item[directKey] !== null) return processVal(maybeResolveAnswer(item[directKey]));

    const shortFieldName = fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName === "explanation" ? "exp" : "";
    if (shortFieldName) {
      const shortDirect = `${shortFieldName}_${targetLang}`;
      if (item[shortDirect] !== undefined && item[shortDirect] !== null) return processVal(maybeResolveAnswer(item[shortDirect]));
    }

    const candidateKeys = [fieldName];
    if (fieldName === "question") candidateKeys.push("q", "question_text", "headline", "title");
    if (fieldName === "answer") candidateKeys.push("a", "ans", "content", "body", "description");
    if (fieldName === "explanation") candidateKeys.push("exp", "desc", "key_points", "summary");

    for (const k of candidateKeys) {
      const val = item[k];
      if (val !== undefined && val !== null) {
        return processVal(maybeResolveAnswer(val));
      }
    }

    if (fieldName === "answer") {
      const idx = Number.isInteger(item.answer) ? item.answer
                   : Number.isInteger(item.correct) ? item.correct
                   : Number.isInteger(item.correct_index) ? item.correct_index
                   : -1;
      if (idx >= 0) {
        const opts = getOptionsList(item, targetLang);
        if (opts[idx] !== undefined) return processVal(resolveOptionAnswer(item, idx, targetLang));
      }
    }

    const asKey = `${fieldName}_as`;
    const enKey = `${fieldName}_en`;
    if (item[asKey] !== undefined && item[asKey] !== null) return processVal(item[asKey]);
    if (item[enKey] !== undefined && item[enKey] !== null) return processVal(item[enKey]);

    return "";
  }

  function localizeContent(obj, forcedLang) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join("\n");
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const val = obj[targetLang] || obj.as || obj.en || "";
    return Array.isArray(val) ? val.join("\n") : String(val);
  }

  function getOptionsList(item, forcedLang) {
    if (!item) return [];
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const longLang = targetLang === "en" ? "english" : "assamese";

    if (item[longLang] && Array.isArray(item[longLang].options)) {
      return item[longLang].options.map(String);
    }

    if (item.options && typeof item.options === "object" && !Array.isArray(item.options)) {
      const optArr = item.options[targetLang] || item.options.as || item.options.en;
      if (Array.isArray(optArr)) return optArr.map(String);
    }

    if (Array.isArray(item.options) && item.options.length) {
      return item.options.map(opt => {
        if (typeof opt === "string") return opt;
        if (typeof opt === "object" && opt !== null) return opt[targetLang] || opt.as || opt.en || "";
        return String(opt);
      });
    }

    const directOpts = item[`options_${targetLang}`];
    if (Array.isArray(directOpts) && directOpts.length) return directOpts.map(String);
    if (Array.isArray(item.options_as) && item.options_as.length) return item.options_as.map(String);
    if (Array.isArray(item.options_en) && item.options_en.length) return item.options_en.map(String);

    return [];
  }

  /* Resolve a stored answer (option letter like "A" / "b)" or a 0-based
     option index) into a readable "letter + option text" form, e.g.
     "(B) 7.2 days". Non-option answers (plain text, arrays, localized
     objects) are returned untouched so normal Q&A content is unaffected. */
  function resolveOptionAnswer(item, rawVal, forcedLang) {
    const opts = getOptionsList(item, forcedLang);
    if (!opts || !opts.length) return rawVal;

    const letters = "ABCDEFGHIJ";
    let idx = -1;

    if (Number.isInteger(rawVal)) {
      idx = rawVal;
    } else if (typeof rawVal === "string") {
      const m = /^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(rawVal.trim());
      if (m) idx = letters.indexOf(m[1].toUpperCase());
    }

    if (idx < 0 || idx >= opts.length) return rawVal;

    const letter = letters[idx] || "";
    const optText = opts[idx];
    if (optText === undefined || optText === null || String(optText).trim() === "") {
      return letter || rawVal;
    }
    return letter ? `(${letter}) ${optText}` : String(optText);
  }

  /* Detect the 0-based correct option index from any of the common keys
     (an integer index, or a letter such as "a" / "(B)"). Returns -1 when
     no usable option key is present. */
  function getCorrectOptionIndex(item) {
    if (!item) return -1;
    const candidates = [item.correct, item.correct_index, item.answer, item.a];
    for (const c of candidates) {
      if (Number.isInteger(c)) return c;
      if (typeof c === "string") {
        const m = /^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(c.trim());
        if (m) return "ABCDEFGHIJ".indexOf(m[1].toUpperCase());
      }
    }
    return -1;
  }

  /* ================= Visual media support (figures, shapes & data tables) =================
     Reasoning questions (esp. non-verbal reasoning) often carry a picture or a
     diagram instead of plain text: image analogy, image classification, venn
     diagrams, mirror/water images, figure series, counting of figures, shape
     construction, and data-table based puzzles. A question may provide:

       item.fig          -> trusted HTML (usually an inline <svg> shape diagram or
                             an <img src="...">) shown under the question text.
       item.table        -> structured data table { head?: [...], rows: [[...]],
                             caption?: {...} } rendered as a real HTML table.
       option.fig        -> a figure attached to an individual option (used when
                             the choices themselves are pictures/shapes).

   All SVG / image content is authored by the site owner (not end users); the
   sanitizer below still strips script tags & event handlers as a safety net. */

  function sanitizeMedia(html) {
    if (html == null) return "";
    return String(html)
      .replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, "")
      .replace(/<\s*script[\s\S]*$/gi, "")
      .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
      .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
      .replace(/javascript\s*:/gi, "");
  }

  function tableBlockHTML(tbl) {
    if (!tbl) return "";
    const obj = tbl && typeof tbl === "object" && !Array.isArray(tbl) ? tbl : { rows: tbl };
    const head = Array.isArray(obj.head) ? obj.head : (Array.isArray(obj.headers) ? obj.headers : []);
    const rows = Array.isArray(obj.rows) ? obj.rows : [];
    if (!head.length && !rows.length) return "";
    const cellHTML = (v) => (v === undefined || v === null ? "" : formatMath(localizeContent(v)));
    const cap = obj.caption ? `<div class="nv-table-cap">${escapeHtml(localizeContent(obj.caption))}</div>` : "";
    return `
      <div class="nv-table-wrap">${cap}
        <table class="nv-table">
          ${head.length ? `<thead><tr>${head.map((h) => `<th>${cellHTML(h)}</th>`).join("")}</tr></thead>` : ""}
          <tbody>${rows.map((r) => `<tr>${(Array.isArray(r) ? r : []).map((td) => `<td>${cellHTML(td)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>`;
  }

  /* Block of media attached to one question (figure + optional data table). */
  function mediaBlock(item) {
    if (!item) return "";
    const parts = [];
    if (item.fig) parts.push(`<div class="nv-media">${sanitizeMedia(item.fig)}</div>`);
    if (item.table) parts.push(tableBlockHTML(item.table));
    return parts.join("");
  }

  /* Detect whether the options of a question are picture/shape choices. */
  function figureOptions(item) {
    if (!item || !Array.isArray(item.options)) return null;
    if (!item.options.some((o) => o && typeof o === "object" && o.fig)) return null;
    return item.options.map((o, i) => {
      const letters = "ABCDEFGHIJ";
      const letter = o && typeof o === "object" && o.option ? String(o.option) : letters[i] || "";
      if (!o || typeof o !== "object") return { letter, fig: "", text: String(o || "") };
      return { letter, fig: sanitizeMedia(o.fig || ""), text: localizeContent(o) || "" };
    });
  }

  /* Option grid for picture/shape choices (each option = a labelled figure). */
  function figureOptionsHTML(item, { compact } = {}) {
    const fops = figureOptions(item);
    if (!fops) return "";
    return `
      <div class="nv-fig-grid${compact ? " nv-fig-grid-compact" : ""}">
        ${fops.map((o) => `
          <div class="nv-fig-item">
            <div class="nv-fig-key">(${o.letter})</div>
            <div class="nv-fig-box">${o.fig || (o.text ? `<span class="nv-fig-textonly">${formatMath(o.text)}</span>` : "")}</div>
            ${o.fig && o.text ? `<div class="nv-fig-cap">${formatMath(o.text)}</div>` : ""}
          </div>`).join("")}
      </div>`;
  }

  /* ================= Pure White High-Contrast Stylish Footer ================= */

  /* Mock-test option helpers (option text + optional figure). */
  function mockOptText(opt) {
    if (opt == null) return "";
    return typeof opt === "object" ? localizeContent(opt) : String(opt);
  }
  function mockOptFig(opt) {
    return opt && typeof opt === "object" && typeof opt.fig === "string" ? sanitizeMedia(opt.fig) : "";
  }
  function renderDynamicFooter() {
    const footerContainer = $("footer.site-footer") || $("footer");
    if (!footerContainer) return;

    const isAs = state.uiLang === "as";
    footerContainer.innerHTML = `
      <div style="max-width:1100px; margin:0 auto; padding:32px 16px 20px; box-sizing:border-box; color:#ffffff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start; gap:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.15);">
          <div style="flex:1; min-width:240px; text-align:left;">
            <div style="margin-bottom:10px; color:#ffffff;">
              <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
                <defs>
                  <linearGradient id="gradLogoFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6366f1" />
                    <stop offset="100%" stop-color="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="30" height="30" rx="8" fill="url(#gradLogoFooter)"/>
                <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
                <text x="38" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#38bdf8">.in</tspan></text>
              </svg>
            </div>
            <p style="font-size:0.86rem; color:#f8fafc; line-height:1.55; margin:0; max-width:320px; font-weight:400;">
              ${isAs ? "অসমৰ সৰ্ববৃহৎ দ্বিভাষিক প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি মঞ্চ। ADRE, অসম আৰক্ষী, APSC আদি পৰীক্ষাৰ বিনামূলীয়া সমল।" : "Assam's premier bilingual competitive exam preparation portal. Free study notes, mock tests and previous papers."}
            </p>
            <p class="footer-contact">
              ${isAs ? "যোগাযোগ:" : "Contact:"} <a href="mailto:contact@axomexam.in">contact@axomexam.in</a>
            </p>
          </div>
          
          <div style="display:flex; gap:40px; flex-wrap:wrap;">
            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${isAs ? "দ্ৰুত লিংক" : "Quick Links"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a></li>
                <li><a href="/previous-year" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "বিগত বৰ্ষৰ প্ৰশ্ন" : "Previous Papers"}</a></li>
                <li><a href="/editorial-policy/" class="axo-editorial-link">${isAs ? "সম্পাদকীয় নীতি" : "Editorial Policy"}</a></li>
                <li><a href="/editorial-team/" class="axo-editorial-link">${isAs ? "সম্পাদকীয় দল" : "Editorial Team"}</a></li>
                <li><a href="/sources/" class="axo-editorial-link">${isAs ? "চৰকাৰী উৎস" : "Official Sources"}</a></li>
                <li><a href="/updates/" class="axo-editorial-link">${isAs ? "সমল হালনাগাদ" : "Content Updates"}</a></li>
                <li><a href="/download-app" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "এপ ডাউনলোড" : "Download App"}</a></li>
                <li><a href="/submit" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "প্ৰশ্ন প্ৰেৰণ কৰক" : "Submit Q&A"}</a></li>
              </ul>
            </div>

            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${isAs ? "আইনী নীতি" : "Legal & Info"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/about" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "আমাৰ বিষয়ে" : "About Us"}</a></li>
                <li><a href="/contact" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</a></li>
                <li><a href="/privacy" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "গোপনীয়তা নীতি" : "Privacy Policy"}</a></li>
                <li><a href="/terms" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "নীতি আৰু চৰ্তসমূহ" : "Terms & Conditions"}</a></li>
                <li><a href="/disclaimer" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "দাবীত্যাগ" : "Disclaimer"}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom-bar">
          <span class="fbb-made">Made for Assam Competitive Aspirants</span>
          <span class="fbb-contact">${isAs ? "যোগাযোগ কৰক :" : "Contact us :"} <a href="mailto:contact@axomexam.in">contact@axomexam.in</a></span>
          <span class="fbb-copy">© ${new Date().getFullYear()} <strong>axomexam.in</strong>. All Rights Reserved.</span>
        </div>
      </div>
    `;
  }

  function applyStaticI18n() {
    const searchEl = $("#master-search");
    if (searchEl) searchEl.placeholder = t("search.placeholder");
    $$("[aria-label]").forEach((el) => {
      const k = el.getAttribute("data-aria-i18n");
      if (k) el.setAttribute("aria-label", t(k));
    });
    renderDynamicFooter();
    refreshWhatsappChat();
    renderNotifications();
  }

  /* ================= WhatsApp "Chat with us" button =================
     A right-edge tab that stays hidden until the visitor scrolls the footer
     into view, then slides in. It lives directly on <body> because
     renderRoute() replaces the whole #app subtree on every navigation and
     would otherwise destroy it. The label follows the interface language,
     so applyStaticI18n() refreshes it whenever the header toggle flips. */
  let waChatEl = null;
  let waFooterObserver = null;
  let waChatSuppressed = false;

  function whatsappChatUrl() {
    const cfg = (typeof CONFIG !== "undefined" && CONFIG.WHATSAPP) || {};
    /* wa.me expects digits only: country code followed by the number. */
    const phone = String(cfg.PHONE || "").replace(/[^\d]/g, "");
    if (!phone) return "";
    const msg = t("wa.prefill") || cfg.MESSAGE || "";
    return "https://wa.me/" + phone + (msg ? "?text=" + encodeURIComponent(msg) : "");
  }

  function buildWhatsappChat() {
    if (waChatEl) return waChatEl;
    const href = whatsappChatUrl();
    if (!href) return null;
    const el = document.createElement("a");
    el.id = "wa-chat";
    el.className = "wa-chat";
    el.href = href;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.setAttribute("aria-label", t("wa.chatHint"));
    el.innerHTML = `<span class="wa-chat-ico" aria-hidden="true">${svgWhatsapp()}</span><span class="wa-chat-text" data-wa-text>${escapeHtml(t("wa.chat"))}</span>`;
    document.body.appendChild(el);
    waChatEl = el;
    return el;
  }

  function refreshWhatsappChat() {
    if (!waChatEl) return;
    const href = whatsappChatUrl();
    if (href) waChatEl.href = href;
    waChatEl.setAttribute("aria-label", t("wa.chatHint"));
    const label = waChatEl.querySelector("[data-wa-text]");
    if (label) label.textContent = t("wa.chat");
  }

  function syncWhatsappChatVisibility() {
    if (!waChatEl) return;
    waChatEl.classList.toggle("is-hidden", waChatSuppressed);
  }

  /* Hidden while a mock test is running so a stray tap cannot interrupt it. */
  function setWhatsappChatSuppressed(on) {
    waChatSuppressed = !!on;
    syncWhatsappChatVisibility();
  }

  function initWhatsappChat() {
    const el = buildWhatsappChat();
    if (!el) return;
    const footer = $("footer.site-footer") || $("footer");
    if (waFooterObserver) { waFooterObserver.disconnect(); waFooterObserver = null; }
    if (!("IntersectionObserver" in window) || !footer) {
      /* No observer support: show it rather than losing the contact path. */
      el.classList.add("is-visible");
      return;
    }
    waFooterObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => el.classList.toggle("is-visible", en.isIntersecting));
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    waFooterObserver.observe(footer);
    syncWhatsappChatVisibility();
  }

  /* Global UI Language Toggle */
  function initGlobalLangToggle() {
    const deskTheme = document.querySelector(".header-center .theme-toggle") || document.querySelector(".site-header .theme-toggle");
    if (deskTheme && !document.querySelector(".desktop-lang-toggle")) {
      const dWrap = document.createElement("div");
      dWrap.className = "desktop-lang-toggle";
      dWrap.innerHTML = `
        <button type="button" class="glang-btn ${state.uiLang === "en" ? "active" : ""}" data-glang="en">EN</button>
        <button type="button" class="glang-btn ${state.uiLang === "as" ? "active" : ""}" data-glang="as">অসমীয়া</button>
      `;
      deskTheme.insertAdjacentElement("beforebegin", dWrap);
    }

    $$(".glang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetLang = btn.dataset.glang;
        if (state.uiLang === targetLang) return;
        state.uiLang = targetLang;
        document.body.setAttribute("data-ui-lang", targetLang);
        try { localStorage.setItem("axomexam-ui-lang", targetLang); } catch (err) {}
        
        $$(".glang-btn").forEach((b) => {
          b.classList.toggle("active", b.dataset.glang === state.uiLang);
        });

        applyStaticI18n();
        buildDesktopNav();
        buildMobileNav();
        renderRoute();
      });
    });
  }

  /* ================= Data normalization ================= */
  function normalize(data) {
    const cats = [];
    const topicMap = {};
    const topicIndex = [];

    const pushTopic = (topic, cat, sub, section) => {
      const path = [cat.id, sub ? sub.id : "", section ? section.id : ""]
        .filter(Boolean)
        .concat([topic.id])
        .join("/");
      const rec = {
        path,
        cat, sub, section, topic,
        title: topic.title || topic.name,
        desc: topic.description,
        tags: topic.tags || [],
        nQuestions: (topic.questions || []).length,
        pdf: topic.pdf || null,
        popularity: Number(topic.popularity) || 0,
      };
      topicMap[path] = rec;
      topicIndex.push(rec);
    };

    const walkCategory = (cat) => {
      cat.name = cat.name || { en: cat.id, as: cat.id };
      cat.description = cat.description || {};
      const subs = cat.subcategories || [];
      if (subs.length) {
        subs.forEach((sub) => {
          sub.name = sub.name || { en: sub.id, as: sub.id };
          const sections = sub.sections || [];
          if (sections.length) {
            sections.forEach((sec) => {
              sec.name = sec.name || { en: sec.id, as: sec.id };
              (sec.topics || []).forEach((tp) => pushTopic(tp, cat, sub, sec));
            });
          } else if ((sub.topics || []).length) {
            (sub.topics || []).forEach((tp) => pushTopic(tp, cat, sub, null));
          } else {
            const leaf = {
              id: sub.id,
              name: sub.name,
              description: sub.description,
              popularity: Number(sub.popularity) || 0
            };
            const path = [cat.id, sub.id].join("/");
            const rec = {
              path, cat, sub, section: null, topic: leaf,
              title: leaf.name, desc: leaf.description, tags: [],
              nQuestions: 0, pdf: null, popularity: leaf.popularity
            };
            topicMap[path] = rec;
            topicIndex.push(rec);
          }
        });
      } else {
        const sections = cat.sections || [];
        if (sections.length) {
          sections.forEach((sec) => {
            sec.name = sec.name || { en: sec.id, as: sec.id };
            (sec.topics || []).forEach((tp) => pushTopic(tp, cat, null, sec));
          });
        } else {
          (cat.topics || []).forEach((tp) => pushTopic(tp, cat, null, null));
        }
      }
      cats.push(cat);
    };

    (data.categories || []).forEach(walkCategory);
    return { categories: cats, topicMap, topicIndex };
  }

  /* Apply precomputed counts from data/counts.json so the UI shows exact
     numbers without downloading every topic / exam file on page load.
     Records missing from the manifest keep their previous value. */
  function applyPrecomputedCounts(counts) {
    if (!counts || typeof counts !== "object") return;
    state.counts = counts;

    const topicCounts = counts.topicCounts || {};
    state.topicIndex.forEach((rec) => {
      if (Object.prototype.hasOwnProperty.call(topicCounts, rec.path)) {
        rec.nQuestions = Number(topicCounts[rec.path]) || 0;
      }
    });

    if (typeof counts.examsTotal === "number") {
      state.examQuestionTotal = counts.examsTotal;
      state.examTotalLoaded = true;
    }

    /* Mock-test questions that are not already counted in the practice /
       exam banks (build-question-counts.js dedupes them). Added to the
       homepage total so the mock sets move the counter too. */
    if (typeof counts.mockTotal === "number") {
      state.mockTotal = counts.mockTotal;
    }

    /* Topic total across every library (practice + exam books + current
       affairs + trending). The practice-library index alone never moved when
       a whole exam book or CA category was added, so the hero counter stuck. */
    if (typeof counts.topicsTotal === "number") {
      state.topicsTotal = counts.topicsTotal;
    }
  }

  /* ================= Navigation helpers ================= */
  function catColor(id) {
    const c = state.categories.find((x) => x.id === id);
    return (c && c.color) || (typeof CATEGORY_COLORS !== "undefined" ? (CATEGORY_COLORS[id] || CATEGORY_COLORS.default) : "#0ea5e9");
  }
  function catIcon(id) {
    const c = state.categories.find((x) => x.id === id);
    return (c && c.icon) || (typeof CATEGORY_ICONS !== "undefined" ? CATEGORY_ICONS[id] : "A") || "A";
  }
  function catIconHTML(id) {
    const svg = typeof CATEGORY_ICON_SVG !== "undefined" && CATEGORY_ICON_SVG[id];
    if (svg) return `<span class="cat-svg">${svg}</span>`;
    return escapeHtml(catIcon(id));
  }

  function topicIconHTML(topicId, catId) {
    const id = String(topicId || "");
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(id)) return `<span class="cat-svg">${svg}</span>`;
      }
    }
    return catIconHTML(catId);
  }

  function countTopics(cat) {
    return state.topicIndex.filter((r) => r.cat.id === cat.id).length;
  }

  /* Home grid order — keep the Articles card directly below Computer Awareness */
  function homeCategoriesOrder() {
    const list = state.categories.slice();
    const artIdx = list.findIndex((c) => c.id === "articles");
    if (artIdx !== -1) {
      const [art] = list.splice(artIdx, 1);
      const pos = list.findIndex((c) => c.id === "computer");
      if (pos !== -1) list.splice(pos + 1, 0, art);
      else list.push(art);
    }
    return list;
  }

  function navLinkHTML(item, activePath) {
    const kids = item.subcategories || item.sections || [];
    const hasKids = !!(kids && kids.length);
    const isActive = activePath && activePath.split("/")[0] === item.id;
    return `
      <li class="${hasKids ? "has-drop" : ""}">
        <a class="nav-link ${isActive ? "active" : ""}" href="/category/${item.id}">
          <span>${escapeHtml(navName(item.name))}</span>
          ${hasKids ? '<span class="caret"></span>' : ""}
        </a>
        ${hasKids ? renderDesktopDrop(item, activePath) : ""}
      </li>`;
  }

  function renderDesktopDrop(item, activePath) {
    const kids = item.subcategories || item.sections || [];
    return `
      <div class="dropdown">
        ${kids.map((sub) => {
          const grand = sub.sections;
          if (grand && grand.length) {
            return `
              <div class="has-drop">
                <a href="/category/${item.id}/${sub.id}">
                  <span>${escapeHtml(navName(sub.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${grand.map((sec) => `
                    <a href="/category/${item.id}/${sub.id}/${sec.id}">
                      <span>${escapeHtml(navName(sec.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`;
          }
          const isLeaf = !(sub.topics && sub.topics.length);
          const href = isLeaf ? `/topic/${item.id}/${sub.id}` : `/category/${item.id}/${sub.id}`;
          return `<a href="${href}">${escapeHtml(navName(sub.name))}</a>`;
        }).join("")}
      </div>`;
  }

  const FEATURED_IDS = ["gk", "science", "math", "history", "reasoning"];

  function buildDesktopNav() {
    const list = $("#nav-list");
    if (!list) return;
    const activePath = currentPath();
    const featured = state.categories.filter((c) => FEATURED_IDS.includes(c.id));
    const rest = state.categories.filter((c) => !FEATURED_IDS.includes(c.id));
    const items = [];

    items.push(extraLink("/", t("nav.home"), activePath));
    featured.forEach((c) => items.push(navLinkHTML(c, activePath)));
    items.push(extraLink("/mock-test", t("nav.mock"), activePath));
    items.push(extraLink("/exams", t("nav.exams"), activePath));
    items.push(extraLink("/downloads", t("nav.downloads"), activePath));
    items.push(moreDropdownHTML(rest, activePath));
    list.innerHTML = items.join("");
  }

  function extraLink(href, label, activePath) {
    const on = activePath.split("/")[0] === href.replace(/^\//, "");
    return `<li><a class="nav-link ${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a></li>`;
  }

  function moreDropdownHTML(rest, activePath) {
    const root = activePath.split("/")[0];
    const isInside = rest.some((c) => c.id === root) || ["submit", "previous-year", "ebooks", "exams", "exam-wise-mock-test", "download-app", "contact", "about", "privacy", "privacy-policy", "terms", "disclaimer"].includes(root);

    const links = rest.map((c) => {
      const on = root === c.id;
      return `<a class="${on ? "active" : ""}" href="/category/${c.id}">${escapeHtml(navName(c.name))}</a>`;
    });

    /* E-Books and Your Exams sit directly below the Articles link inside "More ▸" */
    const ebookOn = root === "ebooks";
    const ebookLink = `
      <a class="ebook-nav-link ${ebookOn ? "active" : ""}" href="/ebooks">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        <span>${escapeHtml(t("nav.ebooks"))}</span>
      </a>`;
    const examsOn = root === "exams";
    const examsLink = `
      <a class="ebook-nav-link ${examsOn ? "active" : ""}" href="/exams">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        <span>${escapeHtml(t("nav.exams"))}</span>
      </a>`;
    const examMockOn = root === "exam-wise-mock-test";
    const examMockLink = `
      <a class="ebook-nav-link ${examMockOn ? "active" : ""}" href="/exam-wise-mock-test">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span>${escapeHtml(t("nav.examMock"))}</span>
      </a>`;
    const artPos = rest.findIndex((c) => c.id === "articles");
    if (artPos !== -1) links.splice(artPos + 1, 0, ebookLink, examsLink, examMockLink);
    else links.push(ebookLink, examsLink, examMockLink);

    const catLinks = links.join("");

    const extraLinks = [
      ["/previous-year", t("nav.previousYear")],
      ["/submit", t("nav.submit")],
      ["/contact", t("nav.contact")],
      ["/download-app", t("nav.downloadApp")]
    ].map(([href, label]) => {
      const on = root === href.replace(/^\//, "");
      return `<a class="${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
    }).join("");

    return `
      <li class="has-drop">
        <a class="nav-link ${isInside ? "active" : ""}" href="/categories">
          <span>${escapeHtml(t("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${catLinks ? `<div class="d-label">${escapeHtml(t("nav.categories"))}</div>${catLinks}` : ""}
          <div class="d-label">${escapeHtml(t("mmenu.extra"))}</div>
          ${extraLinks}
        </div>
      </li>`;
  }

  /* ================= Mobile Menu Builder (Fixed Order) ================= */
  function buildMobileNav() {
    const nav = $("#mobile-nav");
    if (!nav) return;
    const activePath = currentPath();
    const orderedCats = homeCategoriesOrder();
    /* Mobile-only order: keep Articles directly ABOVE Computer Awareness */
    const mobileCats = orderedCats.slice();
    const mArtIdx = mobileCats.findIndex((c) => c.id === "articles");
    const mCompIdx = mobileCats.findIndex((c) => c.id === "computer");
    if (mArtIdx !== -1 && mCompIdx !== -1 && mArtIdx !== mCompIdx - 1) {
      const [art] = mobileCats.splice(mArtIdx, 1);
      mobileCats.splice(mobileCats.findIndex((c) => c.id === "computer"), 0, art);
    }

    const segs = parsePath();
    const svgWrap = (inner) =>
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    /* catIconHTML already returns its own <span class="cat-svg"><svg>…</svg></span>.
       Wrapping that in another <svg> makes the parser close the outer element at
       the nested <span>, leaving an empty 18px-tall <svg> that pushes the real
       glyph off-centre. Only bare path markup (quick tiles, "more" links) needs
       the wrapper, so skip it when the value is already a complete element. */
    const iconTile = (inner, color) =>
      `<span class="m-ico" style="--mc:${color}">${/^\s*<(?:svg|span)\b/i.test(inner) ? inner : svgWrap(inner)}</span>`;
    const isActive = (href) => {
      const h = href.replace(/^\//, "").replace(/\/$/, "");
      if (h === "mock-test") return segs[0] === "mock-test";
      if (h === "exam-wise-mock-test") return segs[0] === "exam-wise-mock-test";
      return activePath === h || activePath.split("/")[0] === h;
    };

    const catParts = mobileCats.map((cat) => {
      const kids = cat.subcategories || cat.sections || [];
      return `
        <li class="m-cat">
          <div class="m-row">
            <a class="m-item ${activePath.split("/")[0] === cat.id ? "active" : ""}" href="/category/${cat.id}">
              ${iconTile(catIconHTML(cat.id), catColor(cat.id))}
              <span class="m-txt">
                <b>${escapeHtml(navName(cat.name))}</b>
                <small>${countTopics(cat)} ${escapeHtml(t("cat.topics"))}</small>
              </span>
            </a>
            ${kids.length ? `<button class="m-toggle" data-toggle data-target="${cat.id}" aria-label="toggle"><span class="caret"></span></button>` : ""}
          </div>
          ${kids.length ? `<div class="m-sub" id="msub-${cat.id}">${kids.map((sub) => {
            const grand = sub.sections;
            if (grand && grand.length) {
              return `
                <div class="m-row m-sub-row">
                  <a class="m-sub-link" href="/category/${cat.id}/${sub.id}">${escapeHtml(navName(sub.name))}</a>
                  <button class="m-toggle m-toggle-sm" data-toggle data-target="${cat.id}-${sub.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${cat.id}-${sub.id}">
                  ${grand.map((sec) => `<a class="m-sub-link" href="/category/${cat.id}/${sub.id}/${sec.id}">${escapeHtml(navName(sec.name))}</a>`).join("")}
                </div>`;
            }
            const isLeaf = !(sub.topics && sub.topics.length);
            const href = isLeaf ? `/topic/${cat.id}/${sub.id}` : `/category/${cat.id}/${sub.id}`;
            return `<a class="m-sub-link" href="${href}">${escapeHtml(navName(sub.name))}</a>`;
          }).join("")}</div>` : ""}
        </li>`;
    });

    /* Quick tiles — the destinations an aspirant reaches for first, as
       colour-tinted cards instead of a plain text list. */
    const tiles = [
      { href: "/mock-test", key: "nav.mock", color: "#0ea5e9", svg: `<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>` },
      { href: "/exam-wise-mock-test", key: "nav.examMock", color: "#6366f1", svg: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`, isNew: true },
      { href: "/ebooks", key: "nav.ebooks", color: "#f59e0b", svg: `<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>` },
      { href: "/exams", key: "nav.exams", color: "#8b5cf6", svg: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>` },
      { href: "/downloads", key: "nav.downloads", color: "#0d9488", svg: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>` },
    ];
    const tileParts = tiles.map((it) => `
      <a class="m-tile ${isActive(it.href) ? "active" : ""}" href="${it.href}" style="--mc:${it.color}">
        ${it.isNew ? `<span class="m-new">${state.uiLang === "as" ? "নতুন" : "NEW"}</span>` : ""}
        ${iconTile(it.svg, it.color)}
        <b>${escapeHtml(t(it.key))}</b>
      </a>`);

    /* Secondary links, as a compact two-column grid. */
    const moreItems = [
      { href: "/previous-year", key: "nav.previousYear", color: "#10b981", svg: `<path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>` },
      { href: "/download-app", key: "nav.downloadApp", color: "#16a34a", svg: `<rect x="7" y="2" width="10" height="20" rx="2.2"/><path d="M12 7v7"/><path d="m9.5 11.5 2.5 2.5 2.5-2.5"/>` },
      { href: "/submit", key: "nav.submit", color: "#e11d48", svg: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>` },
      { href: "/contact", label: state.uiLang === "as" ? "যোগাযোগ" : "Contact Us", color: "#64748b", svg: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>` },
    ];
    const moreParts = moreItems.map((it) => `
      <a class="m-more ${isActive(it.href) ? "active" : ""}" href="${it.href}" style="--mc:${it.color}">
        ${iconTile(it.svg, it.color)}
        <span>${escapeHtml(it.label || t(it.key))}</span>
      </a>`);

    nav.innerHTML = `
      <li class="m-block">
        <p class="m-label">${escapeHtml(t("nav.quickStart"))}</p>
        <div class="m-tiles">${tileParts.join("")}</div>
      </li>
      <li class="m-block">
        <p class="m-label">${escapeHtml(t("nav.categories"))}</p>
        <ul class="m-cats">${catParts.join("")}</ul>
      </li>
      <li class="m-block">
        <p class="m-label">${escapeHtml(t("mmenu.extra"))}</p>
        <div class="m-more-grid">${moreParts.join("")}</div>
      </li>`;

    $$("[data-toggle]", nav).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = $(`#msub-${btn.dataset.target}`);
        if (!target) return;
        target.classList.toggle("open");
        btn.classList.toggle("open");
      });
    });
  }

  /* ================= Routing ================= */
  function parsePath() {
    let p = window.location.pathname.replace(/^\/|\/$/g, "");
    /* Assamese pages live under /as/; strip it so the router sees exactly the
       same segments as the English counterpart. */
    p = p.replace(/^as(?:\/|$)/, "");
    if (window.location.search && window.location.search.startsWith("?/")) {
      p = window.location.search.slice(2).replace(/~and~/g, "&");
      window.history.replaceState(null, null, "/" + p);
    }
    return p.split("/").filter(Boolean);
  }

  /* True when the page currently open is the Assamese variant (/as/...). */
  function isAssamesePath() {
    return /^\/as(\/|$)/.test(window.location.pathname);
  }

  /* The other-language URL for the page currently open. */
  function counterpartUrl() {
    const p = window.location.pathname;
    const m = p.match(/^\/as(\/.*)?$/);
    return m ? (m[1] || "/") : "/as" + p;
  }

  function currentPath() {
    return parsePath().filter((s) => s !== "category" && s !== "topic" && s !== "mock-test").join("/");
  }

  function navigateTo(url) {
    window.history.pushState(null, null, url);
    buildDesktopNav();
    buildMobileNav();
    renderRoute();
  }

  function resetScroll() {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }

  /* Scroll to an element by id without touching the URL. The sticky header
     is accounted for so the target is not hidden underneath it. */
  function scrollToId(id, smooth) {
    if (!id) return false;
    let target = null;
    try {
      target = document.getElementById(id) || document.querySelector(`[name="${CSS.escape(id)}"]`);
    } catch (e) {
      target = document.getElementById(id);
    }
    if (!target) return false;

    const headerH = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h")
    ) || 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;

    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = smooth ? "smooth" : "auto";
    window.scrollTo(0, Math.max(0, top));
    if (smooth) {
      /* Restore the default once the animation would have finished, so
         later in-page jumps keep working normally. */
      setTimeout(() => { html.style.scrollBehavior = prev; }, 600);
    } else {
      html.style.scrollBehavior = prev;
    }
    return true;
  }

  function applyHashScroll() {
    const raw = window.location.hash;
    if (!raw || raw === "#") return;
    let id = raw.slice(1);
    try { id = decodeURIComponent(id); } catch (e) { /* keep raw */ }
    if (!scrollToId(id, false)) return;
    /* Drop the fragment from the visible URL now that the jump is done, so
       shared links and the address bar stay clean. */
    try {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    } catch (e) { /* ignore */ }
  }

  /* Keep <title>, meta description and canonical unique per route for SEO */
  function updateSEO() {
    try {
      const segs = parsePath();
      let title = "axomexam | Assam Exam Preparation – Mock Tests, Previous Papers & PDF Notes";
      let desc = "Free bilingual (Assamese & English) Q&A, mock tests and PDF notes for Assam exam, ADRE, APSC and Assam Police preparation.";

      if (segs[0] === "topic") {
        const rec = state.topicMap[segs.slice(1).join("/")];
        if (rec) {
          const t = localized(rec.topic.title || rec.title);
          title = t ? t + " | axomexam" : title;
          const d = localized(rec.topic.description || rec.desc);
          if (d) desc = d;
        }
      } else if (segs[0] === "category" && segs[1]) {
        const cat = state.categories.find((c) => c.id === segs[1]);
        if (cat) {
          const n = localized(cat.name);
          title = n ? n + " | axomexam" : title;
          const d = localized(cat.description);
          if (d) desc = d;
        }
      } else if (segs[0] === "mock-test") {
        const cat = state.categories.find((c) => c.id === segs[1]);
        const n = cat ? localized(cat.name) : "";
        title = (n ? n + " " : "") + "Mock Test | axomexam";
      } else if (segs[0] === "exam-wise-mock-test") {
        const exam = (state.exams || []).find((e) => e.id === segs[1]);
        const exName = exam ? localized(exam.title) : "";
        const sec = exam && segs[2] ? (exam.sections || []).find((s) => s.id === segs[2]) : null;
        const secName = sec ? localized(sec.title) : "";
        if (secName) {
          title = secName + " Mock Test — " + exName + " | axomexam";
          desc = "Take a free timed " + secName + " mock test for " + exName + " with instant scoring and bilingual answer review.";
        } else if (exName) {
          title = exName + " Mock Test | axomexam";
          desc = "Take free timed mock tests for " + exName + " subject-wise with instant scoring and bilingual answer review.";
        } else {
          title = "Exam-wise Mock Test | axomexam";
          desc = "Take free exam-wise timed mock tests for Assam Police, ADRE Grade III and ADRE Grade IV — instant scoring and bilingual answer review.";
        }
      } else if (segs[0] === "previous-year") {
        title = "Previous Year Question Papers | axomexam";
      } else if (segs[0] === "trending") {
        title = "Trending Topics | axomexam";
      } else if (segs[0] === "downloads") {
        title = "Download Free PDF Notes | axomexam";
      } else if (segs[0] === "download-app") {
        title = "Download axomexam App (APK) | axomexam";
        desc = "Download the free axomexam Android app (APK, v2.6) — mock tests, bilingual Q&A practice, e-books and previous year papers for ADRE, APSC, Assam Police, SSC & Railway exams.";
      } else if (segs[0] === "ebooks") {
        title = segs[1] ? "Read E-Book Online | axomexam" : "E-Books Library | axomexam";
        desc = "Free online e-books for Assam competitive exams (ADRE, APSC, Assam Police) — Assam History, Indian History, Art & Culture, Polity, Economy and Geography. Read online in English and Assamese, no PDF download.";
      } else if (segs[0] === "exams") {
        const exam = (state.exams || []).find((e) => e.id === segs[1]);
        const exName = exam ? examBookName(exam) : "";
        const sec = exam && segs[2] ? (exam.sections || []).find((s) => s.id === segs[2]) : null;
        const secName = sec ? localized(sec.title) : "";
        const sub = sec && segs[3] ? (sec.subcategories || []).find((s) => s.id === segs[3]) : null;
        const subName = sub ? localized(sub.title) : "";
        if (subName) {
          title = subName + (secName ? " — " + secName : "") + " | axomexam";
          desc = "Practise " + subName + " MCQs with answers and explanations for Assam Police Constable (AB & UB) and other competitive exams in Assam.";
        } else if (secName) {
          title = secName + (exName ? " — " + exName : "") + " | axomexam";
        } else if (segs[1]) {
          title = (exName ? exName + " " : "") + "Exam Book | axomexam";
        } else {
          title = "Your Exams | axomexam";
        }
        if (!subName) desc = "Choose your exam and prepare subject-wise — syllabus, Elementary Mathematics, General English, Logical Reasoning & Mental Ability, Assam's History, Geography & Culture and General Knowledge & Current Affairs. Read online in English and Assamese.";
      } else if (segs[0] === "current-affairs") {
        const slug = (segs[1] || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        if (slug) {
          title = slug + " Current Affairs Q&A | axomexam";
          desc = "Free " + slug + " current affairs questions with explained answers in Assamese and English — updated regularly by the axomexam team.";
        } else {
          title = "Free Current Affairs Questions & Answers | axomexam";
          desc = "Free bilingual current affairs Q&A for Assam competitive exams — sports, awards, appointments, economy, environment and more, updated by the axomexam team.";
        }
      } else if (segs[0] === "categories") {
        title = "All Categories | axomexam";
      } else if (["about", "privacy", "privacy-policy", "terms", "disclaimer", "contact", "submit", "editorial-policy", "editorial-team", "sources", "updates"].includes(segs[0])) {
        const map = { about: "About Us", privacy: "Privacy Policy", "privacy-policy": "Privacy Policy", terms: "Terms & Conditions", disclaimer: "Disclaimer", contact: "Contact Us", submit: "Submit Q&A", "editorial-policy": "Editorial Policy", "editorial-team": "Editorial Team", sources: "Official Sources", updates: "Content Updates" };
        title = (map[segs[0]] || "axomexam") + " | axomexam";
      }

      document.title = title;
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
      }
      m.content = desc;

      let p = window.location.pathname;
      if (!p.endsWith("/")) p += "/";
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.href = window.location.origin + p;
    } catch (e) { }
  }

  /* ============ Current Affairs static content sync ============
     Each Current Affairs page ships a rich static block (editorial +
     sample questions + FAQ) that sits outside #app, right after </main>,
     so crawlers/no-JS visitors see it. The SPA only re-renders #app, so
     during client-side navigation that block would keep showing the
     previously visited page. Keep it in sync with the current route. */
  const caStaticCache = Object.create(null);
  let caStaticRequest = null;

  function currentCaStaticId() {
    const el = document.querySelector("section.ca-rich");
    return el ? el.getAttribute("data-ca-rich") : null;
  }

  function removeCaStaticBlock() {
    const section = document.querySelector("section.ca-rich");
    if (section) section.remove();
    const nodes = Array.from(document.head.childNodes);
    const start = nodes.findIndex((n) => n.nodeType === 8 && /ca-rich-schema:/.test(n.nodeValue || ""));
    if (start === -1) return;
    for (let i = start; i < nodes.length; i++) {
      const node = nodes[i];
      const isEnd = node.nodeType === 8 && /\/ca-rich-schema/.test(node.nodeValue || "");
      if (node.parentNode) node.parentNode.removeChild(node);
      if (isEnd) break;
    }
  }

  async function syncCurrentAffairsStaticBlock(targetId) {
    const token = (caStaticRequest = {});
    const current = currentCaStaticId();

    if (!targetId) {
      if (current !== null) removeCaStaticBlock();
      return;
    }
    if (current === targetId) return;

    const url = targetId === "index"
      ? "/current-affairs/"
      : "/current-affairs/" + encodeURIComponent(targetId) + "/";

    let html = caStaticCache[url];
    if (html === undefined) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        html = caStaticCache[url] = await res.text();
      } catch (e) {
        return;
      }
    }
    if (caStaticRequest !== token) return;

    let doc;
    try { doc = new DOMParser().parseFromString(html, "text/html"); } catch (e) { return; }
    const section = doc.querySelector("section.ca-rich");
    if (!section) return;

    const headNodes = Array.from(doc.head.childNodes);
    const startIdx = headNodes.findIndex((n) => n.nodeType === 8 && /ca-rich-schema:/.test(n.nodeValue || ""));
    const schemaNodes = [];
    if (startIdx !== -1) {
      for (let i = startIdx; i < headNodes.length; i++) {
        const node = headNodes[i];
        const isEnd = node.nodeType === 8 && /\/ca-rich-schema/.test(node.nodeValue || "");
        schemaNodes.push(document.importNode(node, true));
        if (isEnd) break;
      }
    }

    removeCaStaticBlock();

    const main = document.getElementById("app");
    const sectionNode = document.importNode(section, true);
    if (main && main.parentNode) main.parentNode.insertBefore(sectionNode, main.nextSibling);
    else document.body.appendChild(sectionNode);

    schemaNodes.forEach((node) => document.head.appendChild(node));

    const title = doc.querySelector("title");
    if (title && title.textContent) document.title = title.textContent;
    const newDesc = doc.querySelector('meta[name="description"]');
    const curDesc = document.querySelector('meta[name="description"]');
    if (newDesc && curDesc) curDesc.setAttribute("content", newDesc.getAttribute("content") || "");
  }

  /* ============ Per-page extra-content static sync ============
     Topic / exam / mock-test / category / previous-year pages ship a
     pre-rendered <section class="axo-extra-content"> (overview + tips +
     FAQ) outside #app plus a small guard script that hides it unless
     location.pathname matches its data-axo-path. That guard also watches
     #app for mutations, so during SPA client-side navigation it hides the
     previous page's block while renderRoute() only rewrites #app - the
     new page's block never appears and a manual reload is required.
     Fetch the target page, pull its block and swap it in so the extra
     content shows immediately. */
  const extraStaticCache = Object.create(null);
  let extraStaticRequest = null;

  function normalizeExtraPath(p) {
    if (!p) return "/";
    return p.length > 1 && p.charAt(p.length - 1) !== "/" ? p + "/" : p;
  }

  /* Two page-specific blocks live outside #app and are therefore never
     rewritten by renderRoute(): the axo-extra-content section
     (overview + topics + tips + FAQ) and the editorial-credit panel
     (author + reference source + published date). The extra block has a
     location.pathname guard, but the credit block has none, so without
     this sync the previous topic's "Reference source" line stays visible
     after client-side navigation. Replace both from the fetched page and
     preserve their DOM order (extra first, then credit last). */
  async function syncExtraStaticBlock(targetPath) {
    const token = (extraStaticRequest = {});
    const existing = document.querySelector("section.axo-extra-content");
    const existingCredit = document.querySelector("[data-axo-editorial-credit]");
    const currentPath = existing ? normalizeExtraPath(existing.getAttribute("data-axo-path")) : null;

    const removeBlocks = () => {
      if (existing) existing.remove();
      if (existingCredit) existingCredit.remove();
    };

    if (!targetPath) {
      removeBlocks();
      return;
    }
    const want = normalizeExtraPath(targetPath);
    if (currentPath === want) return;

    let html = extraStaticCache[want];
    if (html === undefined) {
      try {
        const res = await fetch(want, { cache: "no-store" });
        html = extraStaticCache[want] = res.ok ? await res.text() : "";
      } catch (e) {
        return;
      }
    }
    if (extraStaticRequest !== token) return;

    if (!html) {
      removeBlocks();
      return;
    }

    let doc;
    try { doc = new DOMParser().parseFromString(html, "text/html"); } catch (e) { return; }

    const section = doc.querySelector("section.axo-extra-content");
    const creditSection = doc.querySelector("[data-axo-editorial-credit]");
    const main = document.getElementById("app");

    if (section) {
      const node = document.importNode(section, true);
      node.style.display = "";
      if (existing) {
        existing.replaceWith(node);
      } else {
        const credit = document.querySelector("[data-axo-editorial-credit]");
        let parent;
        let anchor;
        if (credit) {
          parent = credit.parentNode;
          anchor = credit;
        } else if (main) {
          parent = main.parentNode;
          anchor = main.nextSibling;
        } else {
          parent = null;
          anchor = null;
        }
        if (parent) parent.insertBefore(node, anchor);
        else document.body.appendChild(node);
      }
    } else if (existing) {
      existing.remove();
    }

    if (creditSection) {
      const creditNode = document.importNode(creditSection, true);
      if (existingCredit) {
        existingCredit.replaceWith(creditNode);
      } else {
        const extra = document.querySelector("section.axo-extra-content");
        let parent;
        let anchor;
        if (extra) {
          parent = extra.parentNode;
          anchor = extra.nextSibling;
        } else if (main) {
          parent = main.parentNode;
          anchor = main.nextSibling;
        } else {
          parent = null;
          anchor = null;
        }
        if (parent) parent.insertBefore(creditNode, anchor);
        else document.body.appendChild(creditNode);
      }
    } else if (existingCredit) {
      existingCredit.remove();
    }
  }

  async function renderRoute() {
    const done = await renderRouteInner();
    applyHashScroll();
    return done;
  }

  async function renderRouteInner() {
    if (!state.ready) return;
    const segs = parsePath();
    const main = $("#app");
    closeMobileMenu();
    closeReadingModal();
    updateTabbar(segs);
    resetScroll();
    updateSEO();
    syncCurrentAffairsStaticBlock(segs[0] === "current-affairs" ? (segs[1] || "index") : null);
    syncExtraStaticBlock(segs.length ? window.location.pathname : null);
    clearReadProgress();

    if (segs[0] !== "mock-test" && state.mock && state.mock.timerId) {
      stopMockTimer();
      state.mock = null;
      disarmMockBackGuard();
    }
    if (segs[0] !== "mock-test") setWhatsappChatSuppressed(false);

    state.lang = isAssamesePath() ? "as" : "en";
    document.body.setAttribute("data-lang", state.lang);

    if (segs.length === 0) return renderHome(main);
    if (segs[0] === "category") {
      const cat = state.categories.find((c) => c.id === segs[1]);
      if (!cat) return render404(main);
      if (segs.length >= 2 && segs[2]) return renderSubOrSection(main, segs);
      return renderCategoryPage(main, cat);
    }
    if (segs[0] === "topic") {
      const path = segs.slice(1).join("/");
      const rec = state.topicMap[path];
      if (!rec) return render404(main);
      return renderTopicPage(main, rec);
    }
    
    if (["about", "privacy", "privacy-policy", "terms", "disclaimer", "editorial-policy", "editorial-team", "sources", "updates"].includes(segs[0])) {
      const pageKey = segs[0] === "privacy-policy" ? "privacy" : segs[0];
      return renderStatic(main, pageKey);
    }
    
    if (segs[0] === "contact") return renderContactPage(main);
    if (segs[0] === "trending") return renderTrendingPage(main);
    if (segs[0] === "previous-year") return renderPreviousYear(main, segs);
    if (segs[0] === "categories") return renderCategoriesPage(main);
    if (segs[0] === "search") return renderSearchPage(main);
    if (segs[0] === "downloads") return renderDownloadsPage(main);
    if (segs[0] === "download-app") return renderDownloadAppPage(main);
    if (segs[0] === "ebooks") {
      if (segs[1]) return renderEbookReaderPage(main, segs[1]);
      return renderEbooksPage(main);
    }
    if (segs[0] === "exams") {
      if (segs[1] && segs[2] && segs[3] && segs[4]) return renderExamSubSubcategoryPage(main, segs[1], segs[2], segs[3], segs[4]);
      if (segs[1] && segs[2] && segs[3]) return renderExamSubcategoryPage(main, segs[1], segs[2], segs[3]);
      if (segs[1] && segs[2]) return renderExamSectionPage(main, segs[1], segs[2]);
      if (segs[1]) return renderExamPage(main, segs[1]);
      return renderExamsPage(main);
    }
    if (segs[0] === "exam-wise-mock-test") return handleExamWiseMockRouting(main, segs);
    if (segs[0] === "current-affairs") {
      if (segs[1]) return renderCurrentAffairsCategoryPage(main, segs[1]);
      return renderCurrentAffairsPage(main);
    }
    if (segs[0] === "submit") return renderSubmitPage(main);
    if (segs[0] === "mock-test") {
      return handleMockRouting(main, segs);
    }
    return render404(main);
  }

  /* ================= Homepage ================= */
  function renderHome(main) {
    const totalQuestions = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0) + (state.examQuestionTotal || 0) + (state.caQuestionTotal || 0) + (state.mockTotal || 0);
    /* Topic total comes from counts.json (practice + exam books + current
       affairs + trending); the practice index alone misses the exam books. */
    const totalTopics = state.topicsTotal || state.topicIndex.length;
    /* Only real downloadable PDF files count here; every other study
       resource on the site is an HTML page, not a PDF. */
    const totalPdfs = PDF_NOTE_COUNT;
    const trending = trendingTopics(state.topicIndex).slice(0, typeof CONFIG !== "undefined" ? CONFIG.TRENDING_COUNT : 6);

    main.innerHTML = `
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${t("hero.daily")} • ADRE 3.0 / RRB
          </a>
          <h1>${t("hero.title") || "Crack Assam Competitive Exams with Bilingual Q&A & PDF Notes"}</h1>
          <p class="sub">${t("hero.sub") || "Practice thousands of questions for Assam competitive exams and download printable PDF notes in both Assamese and English — for ADRE 3.0, APSC, Assam Police, SSC, Railway & more."}</p>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${totalQuestions.toLocaleString()}+</b><span>${t("stat.questions")}</span></div>
            <div class="stat"><b id="stat-total-topics">${totalTopics.toLocaleString()}+</b><span>${t("stat.topics")}</span></div>
            <div class="stat"><b id="stat-total-pdfs">${totalPdfs}+</b><span>${t("stat.pdfs")}</span></div>
          </div>
        </div>
        ${heroVisualHTML()}
      </section>

      <section class="section feat-sec">
        <div class="section-head reveal">
          <div>
            <h2>${state.uiLang === "as" ? "সুবিধাসমূহ" : "Features"}</h2>
            <p class="sec-sub">${state.uiLang === "as" ? "আৰম্ভ কৰিবলৈ এটা বিকল্প বাছনি কৰক" : "Quick ways to start your preparation"}</p>
          </div>
        </div>
        <div class="feat-grid">
          <a class="feat-card reveal" href="/categories/" style="--fc:#4f46e5">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়াকৈ অনুশীলন আৰম্ভ কৰক" : "Free Practicing"}</b><span>${state.uiLang === "as" ? "বিষয়ভিত্তিক প্ৰশ্ন অনুশীলন" : "Practice Q&A by subject"}</span></span>
          </a>
          <a class="feat-card reveal" href="/mock-test" style="--fc:#0ea5e9">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়াকৈ মক টেষ্ট দিয়ক" : "Free Mock Test"}</b><span>${state.uiLang === "as" ? "সময়বদ্ধ পৰীক্ষা-ধৰণৰ টেষ্ট" : "Timed exam-pattern tests"}</span></span>
          </a>
          <a class="feat-card reveal" href="/ebooks" style="--fc:#f59e0b">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া ই-বুক" : "Free eBooks"}</b><span>${state.uiLang === "as" ? "যিকোনো সময়ত অনলাইন পঢ়ক" : "Read online, anytime"}</span></span>
          </a>
          <a class="feat-card feat-new reveal" href="/exam-wise-mock-test" style="--fc:#6366f1">
            <span class="feat-new-badge"><span class="fnb-dot"></span>${state.uiLang === "as" ? "নতুন" : "NEW"}</span>
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "পৰীক্ষা-ভিত্তিক মক টেষ্ট" : "Exam-wise Mock Test"}</b><span>${state.uiLang === "as" ? "অসম আৰক্ষী, ADRE, APSC আৰু TET" : "Assam Police, ADRE, APSC & TET"}</span></span>
          </a>
          <a class="feat-card feat-new reveal" href="/exams" style="--fc:#8b5cf6">
            <span class="feat-new-badge"><span class="fnb-dot"></span>${state.uiLang === "as" ? "নতুন" : "NEW"}</span>
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া পৰীক্ষা-বহী" : "Free Exam Books"}</b><span>${state.uiLang === "as" ? "পৰীক্ষা-ভিত্তিক প্ৰস্তুতি" : "Exam-wise preparation"}</span></span>
          </a>
          <a class="feat-card reveal" href="/previous-year" style="--fc:#10b981">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "পূৰ্ববৰ্তী বছৰৰ প্ৰশ্ন" : "Previous Year Questions"}</b><span>${state.uiLang === "as" ? "পূৰ্বৰ প্ৰশ্নপত্ৰসমূহ" : "Solved past papers"}</span></span>
          </a>
          <a class="feat-card reveal" href="/category/articles" style="--fc:#e11d48">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া সবিশেষ প্ৰবন্ধ" : "Free Detailed Articles"}</b><span>${state.uiLang === "as" ? "অধ্যয়ন প্ৰবন্ধ" : "Study articles"}</span></span>
          </a>
          <a class="feat-card reveal" href="/downloads" style="--fc:#0d9488">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া PDF টোকা" : "Free PDF Notes"}</b><span>${state.uiLang === "as" ? "প্ৰিন্ট কৰিব পৰা PDF নোট" : "Printable PDF notes"}</span></span>
          </a>
          <a class="feat-card reveal" href="/current-affairs" style="--fc:#ef4444">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/><path d="M8 16h3"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া চলিত ঘটনাৱলী" : "Free Current Affairs"}</b><span>${state.uiLang === "as" ? "আপডেট: ১ অক্টোবৰ ২০২৬ • দৈনিক প্ৰশ্ন আৰু ব্যাখ্যা" : "Updated: 1 October 2026 • Q&A with answers"}</span></span>
          </a>
          <a class="feat-card feat-app reveal" href="/download-app/" style="--fc:#16a34a">
            <span class="feat-ico feat-ico-app"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v7"/><path d="m9 7 3 3 3-3"/><path d="M4 15.5c2.5-1.3 5.5-1.3 8 0 2.5-1.3 5.5-1.3 8 0"/><path d="M4 19c2.5-1.3 5.5-1.3 8 0 2.5-1.3 5.5-1.3 8 0"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া এপ ডাউনলোড কৰক" : "Download Free App"}</b><span>${state.uiLang === "as" ? "এণ্ড্ৰইড APK • v2.6" : "Android APK • v2.6"}</span></span>
          </a>
        </div>
        <style>
          .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .feat-card { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 20px 16px; border-radius: 18px; border: 1px solid var(--line); background: radial-gradient(140% 140% at 100% 0%, color-mix(in srgb, var(--fc) 13%, transparent), transparent 58%), linear-gradient(180deg, var(--bg), var(--bg-soft)); box-shadow: var(--card-shadow); overflow: hidden; isolation: isolate; transition: transform .28s cubic-bezier(.22, .61, .36, 1), box-shadow .28s, border-color .28s; }
          .feat-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, color-mix(in srgb, var(--fc) 78%, transparent), transparent 46%, color-mix(in srgb, var(--fc) 45%, transparent)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; opacity: 0; transition: opacity .28s; pointer-events: none; }
          .feat-card::after { content: ""; position: absolute; top: 0; bottom: 0; left: -120%; width: 55%; background: linear-gradient(100deg, transparent, color-mix(in srgb, var(--fc) 26%, transparent), transparent); transform: skewX(-18deg); transition: left .75s cubic-bezier(.22, .61, .36, 1); pointer-events: none; }
          .feat-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--fc) 42%, var(--line)); box-shadow: 0 20px 42px -20px color-mix(in srgb, var(--fc) 60%, transparent), var(--card-shadow-hover); }
          .feat-card:hover::before { opacity: 1; }
          .feat-card:hover::after { left: 145%; }
          .feat-card:active { transform: translateY(-2px) scale(.99); }
          .feat-ico { flex: 0 0 auto; width: 50px; height: 50px; border-radius: 15px; display: grid; place-items: center; color: #fff; background: linear-gradient(145deg, color-mix(in srgb, var(--fc) 82%, #fff), var(--fc) 52%, color-mix(in srgb, var(--fc) 68%, #000)); box-shadow: 0 12px 24px -12px color-mix(in srgb, var(--fc) 90%, transparent), inset 0 1px 0 rgba(255, 255, 255, .4); transition: transform .28s cubic-bezier(.22, .61, .36, 1), box-shadow .28s; }
          .feat-new-badge { position: absolute; top: 8px; right: 8px; z-index: 2; display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px 3px 7px; border-radius: 999px; font-size: .58rem; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: #fff; background: linear-gradient(120deg, #ff4d6d, #f43f5e 46%, #d90429); box-shadow: 0 6px 16px -6px rgba(217, 4, 41, .85), inset 0 1px 0 rgba(255, 255, 255, .45); animation: fnbPulse 1.9s ease-in-out infinite; }
          .feat-new-badge .fnb-dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 0 rgba(255, 255, 255, .75); animation: fnbDot 1.9s ease-out infinite; }
          .feat-card:hover .feat-new-badge { animation-play-state: paused; transform: scale(1.06); }
          @keyframes fnbPulse { 0%, 100% { box-shadow: 0 6px 16px -6px rgba(217, 4, 41, .85), inset 0 1px 0 rgba(255, 255, 255, .45), 0 0 0 0 rgba(244, 63, 94, .5); } 50% { box-shadow: 0 8px 20px -6px rgba(217, 4, 41, .95), inset 0 1px 0 rgba(255, 255, 255, .55), 0 0 0 6px rgba(244, 63, 94, 0); } }
          @keyframes fnbDot { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, .8); } 70%, 100% { box-shadow: 0 0 0 5px rgba(255, 255, 255, 0); } }
          @media (prefers-reduced-motion: reduce) { .feat-new-badge, .feat-new-badge .fnb-dot { animation: none; } }
          .feat-card:hover .feat-ico { transform: scale(1.07) rotate(-4deg); box-shadow: 0 16px 30px -12px color-mix(in srgb, var(--fc) 95%, transparent), inset 0 1px 0 rgba(255, 255, 255, .5); }
          .feat-ico svg { width: 23px; height: 23px; }
          .feat-ico-app { position: relative; overflow: hidden; border-radius: 14px; background: linear-gradient(150deg, #4ade80, #22c55e 42%, #15803d); box-shadow: 0 12px 24px -12px rgba(22, 163, 74, .95), inset 0 1px 0 rgba(255, 255, 255, .55), inset 0 -8px 16px -8px rgba(0, 0, 0, .28); }
          .feat-ico-app::before { content: ""; position: absolute; inset: 2px 2px auto; height: 46%; border-radius: 12px 12px 50% 50%; background: linear-gradient(180deg, rgba(255, 255, 255, .4), transparent); pointer-events: none; }
          .feat-ico-app::after { content: ""; position: absolute; right: -9px; bottom: -9px; width: 26px; height: 26px; border-radius: 50%; background: rgba(255, 255, 255, .18); pointer-events: none; }
          .feat-ico-app svg { position: relative; z-index: 1; width: 26px; height: 26px; filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .2)); }
          .feat-body { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 3px; min-width: 0; }
          .feat-body b { font-size: .98rem; font-weight: 700; letter-spacing: -.2px; color: var(--ink); }
          .feat-body span { font-size: .775rem; line-height: 1.35; color: var(--ink-faint); }
          @media (max-width: 640px) {
            .feat-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
            .feat-card { gap: 9px; padding: 16px 12px; border-radius: 16px; min-height: 118px; }
            .feat-ico { width: 44px; height: 44px; border-radius: 13px; }
            .feat-ico svg { width: 21px; height: 21px; }
            .feat-body b { font-size: .9rem; }
            .feat-body span { font-size: .71rem; }
          }
        </style>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <div>
            <h2>${t("home.categories")}</h2>
            <p class="sec-sub">${t("home.categories.sub")}</p>
          </div>
        </div>
        <div class="cat-grid">
          ${homeCategoriesOrder().map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="/category/${c.id}" data-cat="${c.id}" style="--cat:${color}" data-delay="${i * 60}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  ${catNameHTML(c.name)}
                  <span><span class="cat-count">${countTopics(c)}</span> ${c.id === "study-guides" ? (state.uiLang === "as" ? "টা গাইড" : "Guides") : t("cat.topics")}</span>
                </span>
              </a>`;
          }).join("")}
        </div>
        <style>
          @media (min-width: 544px) and (max-width: 799px) {
            .cat-card[data-cat="articles"] { grid-column: 2; }
          }
        </style>
      </section>

      <section class="section" style="padding-bottom: 40px;">
        <div class="section-head reveal">
          <div>
            <h2>${t("home.trending")}</h2>
            <p class="sec-sub">${t("home.trending.sub")}</p>
          </div>
          <a class="see-all" href="/trending">${t("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${i * 50}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(r.title))}</span>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))} • ${r.cat.id === "study-guides" ? (state.uiLang === "as" ? "পঢ়ক →" : "Read Guide →") : `${r.nQuestions || 0} ${t("topic.questions")}`}</span>
              </span>
              <span class="trend-flame">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </span>
            </a>`).join("")}
        </div>
      </section>

      <section class="section start-sec">
        <div class="section-head reveal">
          <div>
            <h2>${state.uiLang === "as" ? "অসম পৰীক্ষাৰ প্ৰস্তুতি আৰম্ভ কৰক" : "Start Your Assam Exam Preparation"}</h2>
            <p class="sec-sub">${state.uiLang === "as" ? "axomexam ত নতুন? অধ্যয়ন পুথিভঁৰাল কেনেকৈ সজোৱা হৈছে আৰু ক'ৰপৰা আৰম্ভ কৰিব, তলত চাওক" : "New to axomexam? Here is how the study library is organised and where to begin"}</p>
          </div>
        </div>
        <div class="start-grid">
          ${[
            {
              href: "/exams/",
              t: state.uiLang === "as" ? "আপোনাৰ পৰীক্ষা বাছনি কৰক" : "Pick your exam",
              d: state.uiLang === "as"
                ? "আপুনি যি নিযুক্তিৰ বাবে প্ৰস্তুতি লৈছে সেইটো বাছনি কৰক — ADRE 3.0 গ্ৰেড III বা IV, APSC CCE, অসম আৰক্ষী AB আৰু UB বা SI, DHS আৰু DME, গুৱাহাটী উচ্চ ন্যায়ালয়, SSC বা ৰে'লৱে — আৰু সেই পত্ৰখনৰ পাঠ্যক্ৰম অনুসৰি বিষয়ৰ তালিকা অনুসৰণ কৰক।"
                : "Choose the recruitment you are targeting — ADRE 3.0 Grade III or Grade IV, APSC CCE, Assam Police AB and UB or SI, DHS and DME, Guwahati High Court, SSC or Railway — and follow the syllabus-wise subject list for that paper.",
              cta: state.uiLang === "as" ? "পৰীক্ষা আৰু পাঠ্যক্ৰম চাওক &rarr;" : "Browse exams and syllabus →",
            },
            {
              href: "/categories/",
              t: state.uiLang === "as" ? "বিষয়ভিত্তিক অধ্যয়ন কৰক" : "Study topic by topic",
              d: state.uiLang === "as"
                ? "প্ৰশ্নভঁৰাল বিষয় আৰু উপ-বিষয় অনুসৰি সজোৱা হৈছে: অসম সাধাৰণ জ্ঞান, ইতিহাস, ভূগোল, ৰাজনীতি, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ। প্ৰতিটো বিষয়ৰ পৃষ্ঠাত টোকা, প্ৰশ্ন আৰু প্ৰতিটো উত্তৰৰ ব্যাখ্যা আছে।"
                : "The question bank is organised by subject and sub-topic: Assam General Knowledge, History, Geography, Polity, Mathematics, General Science, Reasoning, General English and Computer Awareness. Each topic page carries the notes, the questions and a worked explanation for every answer.",
              cta: state.uiLang === "as" ? "সকলো বিষয় চাওক &rarr;" : "See all subjects →",
            },
            {
              href: "/mock-test/",
              t: state.uiLang === "as" ? "সময়বদ্ধ মক টেষ্ট দিয়ক" : "Attempt timed mock tests",
              d: state.uiLang === "as"
                ? "প্ৰতিটো মক টেষ্ট এটা লাইভ কাউণ্টডাউনত চলে আৰু প্ৰকৃত প্ৰশ্নপত্ৰৰ আৰ্হি অনুসৰণ কৰে, তাৎক্ষণিক ফলাফল আৰু উত্তৰ পৰ্যালোচনাৰ সৈতে। এটা ছেট দিয়ক, হেৰুওৱা প্ৰশ্নৰ ব্যাখ্যা পঢ়ক, তাৰ পিছত কেইদিনমানৰ পিছত পুনৰ চেষ্টা কৰক।"
                : "Every mock test runs on a live countdown and follows the real paper pattern, with instant results and an answer review. Attempt a set, read the explanations for the questions you miss, then re-attempt it after a few days.",
              cta: state.uiLang === "as" ? "মক টেষ্ট দিয়ক &rarr;" : "Take a mock test →",
            },
            {
              href: "/downloads/",
              t: state.uiLang === "as" ? "PDF টোকাৰে পুনৰাবৃত্তি কৰক" : "Revise with PDF notes",
              d: state.uiLang === "as"
                ? "প্ৰিণ্ট কৰিব পৰা PDF টোকা, ই-বুক আৰু পূৰ্ববৰ্তী বছৰৰ সমাধান কৰা প্ৰশ্নপত্ৰ ডাউনলোড কৰক যাতে আপুনি অফলাইনত পুনৰাবৃত্তি কৰিব পাৰে। axomexam.in ত সকলো বিনামূলীয়া, দ্বিভাষিক আৰু একাউণ্ট বা লগইনৰ প্ৰয়োজন নাই।"
                : "Download the printable PDF notes, e-books and previous year solved papers so you can revise offline. Everything on axomexam.in is free, bilingual and needs no account or login.",
              cta: state.uiLang === "as" ? "PDF টোকা লওক &rarr;" : "Get PDF notes →",
            },
          ].map((c, i) => `
          <div class="start-card reveal" data-delay="${i * 60}">
            <span class="start-num">${i + 1}</span>
            <b>${c.t}</b>
            <p>${c.d}</p>
            <a href="${c.href}">${c.cta}</a>
          </div>`).join("")}
        </div>
        <style>
          .start-sec .start-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(238px,1fr)); gap:16px; }
          .start-card { display:flex; flex-direction:column; gap:9px; padding:20px; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:var(--radius,14px); box-shadow:var(--card-shadow,0 1px 2px rgba(15,23,42,.06), 0 8px 24px -12px rgba(15,23,42,.12)); transition:transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s, border-color .22s; }
          .start-card:hover { transform:translateY(-4px); box-shadow:var(--card-shadow-hover,0 2px 4px rgba(15,23,42,.08), 0 16px 40px -16px rgba(79,70,229,.28)); border-color:var(--primary,#4f46e5); }
          .start-num { width:34px; height:34px; flex:0 0 auto; display:grid; place-items:center; border-radius:10px; font-weight:800; font-size:.95rem; color:#fff; background:var(--grad,linear-gradient(135deg,#4f46e5,#7c3aed 55%,#22d3ee 130%)); }
          .start-card b { font-size:1rem; letter-spacing:-.2px; color:var(--ink,#0f172a); }
          .start-card p { margin:0; font-size:.88rem; line-height:1.65; color:var(--ink-soft,#475569); }
          .start-card a { margin-top:auto; font-size:.86rem; font-weight:700; color:var(--primary,#4f46e5); }
          .start-card a:hover { text-decoration:underline; }
        </style>
      </section>

      <section class="section" style="padding-bottom:40px;">
        <div class="section-head reveal">
          <div>
            <h2>Assam Exam Preparation at Your Fingertips</h2>
            <p class="sec-sub">Free mock tests, previous year papers & study notes for every Assam competitive exam</p>
          </div>
        </div>
        <style>
          .seo-read-more { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
          .seo-read-more.expanded { display:block; -webkit-line-clamp:unset; }
        </style>
        <div style="max-width:860px; margin:0 auto; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:26px 28px; box-shadow:0 6px 20px -8px rgba(15,23,42,0.06); text-align:left;">
          <div class="seo-read-more" id="seo-read-more">
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0 0 14px 0;">
              <b style="color:var(--ink,#0f172a);">axomexam</b> is a free bilingual study platform built for <b>Assam exam</b> aspirants — however you search for it, whether <b>axom exam</b>, <b>assam exam</b> or <b>assamexam</b>. Whether you are preparing for the <b>ADRE</b> (Assam Direct Recruitment Examination), <b>APSC</b>, <b>Assam Police</b>, or central exams like SSC and Railway, you will find thousands of practice questions, mock tests and previous year papers — all available in both English and Assamese. Many students look for the <b>exam Assam</b> or <b>exam Axom</b> (অসম পৰীক্ষা), and <b>axomexam</b> makes sure every major Assam government recruitment exam is covered here.
            </p>
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0 0 14px 0;">
              From Assam General Knowledge, Assam History and Assam Geography to Indian Polity, Mathematics, Reasoning, General English and Science, the question bank is organised subject-wise so you can practise topic by topic. Each question includes a clear answer and explanation, and every mock test runs on a live timer just like the real exam — completely free, with no registration needed.
            </p>
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0;">
              Get started with a <a href="/mock-test" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">free mock test</a>, go through the <a href="/previous-year" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">previous year solved papers</a>, or download <a href="/downloads" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">PDF study notes</a> for offline practice.
            </p>
          </div>
          <button id="seo-read-more-btn" type="button" style="margin-top:14px; padding:8px 18px; border-radius:99px; font-weight:800; font-size:0.85rem; cursor:pointer; color:var(--primary,#2563eb); background:var(--primary-soft,#eff6ff); border:1px solid var(--border,#cbd5e1);">Read More</button>
        </div>
      </section>

      <section class="section" style="padding-bottom:40px;">
        <div class="section-head reveal">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p class="sec-sub">Everything you need to know about practising on axomexam</p>
          </div>
        </div>
        <div style="max-width:860px; margin:0 auto; text-align:left;">
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Is axomexam free to use?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. axomexam is completely free. All mock tests, previous year solved papers and PDF notes are available without registration or payment.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Which exams does axomexam cover?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">axomexam covers Assam state exams such as ADRE (Assam Direct Recruitment Examination), APSC, Assam Police / SLPRB, DHS and DME/DTE, as well as central exams including SSC (CGL, CHSL, GD) and Railway (RRB NTPC, Group D).</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Are the questions available in Assamese as well as English?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. Every question, answer and explanation on axomexam is bilingual, so you can practise in both Assamese and English.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Does axomexam provide timed mock tests?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. axomexam mock tests run on a live timer and follow the real exam pattern, with instant results and answer explanations.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Can I download PDF notes and previous year papers?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. PDF study notes, e-books and previous year solved papers can be downloaded for offline practice.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Do I need an account to practise on axomexam?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">No. You can start practising mock tests and questions immediately without creating an account.</p>
          </details>
        </div>
      </section>`;

    const seoBtn = $("#seo-read-more-btn");
    if (seoBtn) {
      seoBtn.addEventListener("click", () => {
        const box = $("#seo-read-more");
        if (!box) return;
        const expanded = box.classList.contains("expanded");
        box.classList.toggle("expanded", !expanded);
        seoBtn.textContent = expanded ? "Read More" : "Read Less";
      });
    }

    observeReveals();
    loadExamQuestionTotal();
    loadCurrentAffairsTotal();
  }

  function heroVisualHTML() {
    const examName = (typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_NAME) || "ADRE / Assam Police";
    const target = new Date((typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_DATE) || "2026-12-31").getTime();
    const now = Date.now();
    const daysLeft = target > now ? Math.max(0, Math.ceil((target - now) / 86400000)) : 0;
    const fraction = target > now ? Math.min(1, daysLeft / 365) : 0;
    const C = 314;
    const offset = C * (1 - fraction);
    return `
      <div class="hero-visual">
        <div class="countdown-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="50"></circle>
            <circle class="ring-fg" cx="60" cy="60" r="50" stroke-dashoffset="${offset.toFixed(1)}"></circle>
          </svg>
          <div class="ring-center">
            <span class="ring-num">${daysLeft}</span>
            <span class="ring-label">${t("hero.days")}</span>
            <span class="ring-label">${escapeHtml(examName)}</span>
          </div>
        </div>
        <span class="float-chip c1"><span class="dot"></span>ADRE</span>
        <span class="float-chip c2"><span class="dot"></span>GK & Math</span>
        <span class="float-chip c3"><span class="dot"></span>Assam Police</span>
      </div>`;
  }

  function trendingTopics(list) {
    return list.slice().sort((a, b) => {
      if (!!a.extra !== !!b.extra) return a.extra ? -1 : 1;
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      return (b.nQuestions || 0) - (a.nQuestions || 0);
    });
  }

  /* ================= Category page ================= */
  function renderCategoryPage(main, cat) {
    const subs = cat.subcategories || cat.sections || [];
    const directTopics = cat.topics || [];
    const isArticlesCat = cat.id === "articles";
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.description)) || escapeHtml(localized(cat.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${subs.length ? `
          <div class="sub-grid">
            ${subs.map((s, i) => {
              const isLeaf = !isArticlesCat && !(s.sections && s.sections.length) && !(s.topics && s.topics.length);
              const rec = isLeaf ? state.topicMap[`${cat.id}/${s.id}`] : null;
              const href = isArticlesCat
                ? `/category/${cat.id}/${s.id}/read`
                : (isLeaf ? `/topic/${cat.id}/${s.id}` : `/category/${cat.id}/${s.id}`);
              const meta = isArticlesCat
                ? (state.uiLang === "as" ? "প্ৰবন্ধ পঢ়ক →" : "Read Articles →")
                : isLeaf
                  ? `<span id="count-${rec ? rec.path.replace(/\//g, '-') : `${cat.id}-${s.id}`}">${rec && rec.nQuestions > 0 ? `${rec.nQuestions} ${t("topic.questions")}` : t("btn.practice")}</span>`
                  : `${(s.sections ? s.sections.length : 0) || (s.topics ? s.topics.length : 0)} ${s.sections ? t("cat.subsections") : t("cat.topics")}`;
              return `
              <a class="sub-card reveal" href="${href}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  ${subNameHTML(s.name, "0.94rem")}
                  <span style="font-size:0.75rem; font-weight:${isArticlesCat ? "700" : "400"}; color:${isArticlesCat ? catColor(cat.id) : "var(--ink-soft,#64748b)"};">${meta}</span>
                </span>
              </a>`;
            }).join("")}
          </div>`
        : (directTopics.length ? topicListHTML(cat, null, null, directTopics) : emptyHTML())}
      </section>`;
    observeReveals();
    const catRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id);
    const catQuestions = catRecs.reduce((a, r) => a + (r.nQuestions || 0), 0);
    const catItems = subs.map((s) => ({
      name: localized(s.name),
      count: (s.sections && s.sections.length) || (s.topics && s.topics.length) || 0
    }));
    autoSeo(main, {
      id: cat.id,
      name: localized(cat.name),
      count: subs.length,
      total: catQuestions,
      h2: localized(cat.name) + " preparation for Assam exams",
      items: catItems
    });
  }

  function renderSubOrSection(main, segs) {
    const cat = state.categories.find((c) => c.id === segs[1]);
    const sub = (cat.subcategories || cat.sections || []).find((s) => s.id === segs[2]);
    if (!sub) return render404(main);

    /* Articles category — read-only rich articles, never in Downloads */
    if (cat.id === "articles") {
      return renderArticleReader(main, cat, sub);
    }

    if (segs[3]) {
      const sec = (sub.sections || []).find((s) => s.id === segs[3]);
      if (!sec) return render404(main);
      return renderSectionPage(main, cat, sub, sec);
    }

    if (!(sub.sections && sub.sections.length) && !(sub.topics && sub.topics.length)) {
      const rec = state.topicMap[`${cat.id}/${sub.id}`];
      if (rec) return renderTopicPage(main, rec);
    }

    const secs = sub.sections;
    const topics = sub.topics;
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sub.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${secs && secs.length ? `
          <div class="sub-grid">
            ${secs.map((s, i) => `
              <a class="sub-card reveal" href="/category/${cat.id}/${sub.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  ${subNameHTML(s.name, "0.94rem")}
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(s.topics || []).length} ${t("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>` : (topics && topics.length ? topicListHTML(cat, sub, null, topics) : emptyHTML())}
      </section>`;
    observeReveals();
    const subRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id && r.sub && r.sub.id === sub.id);
    const subQuestions = subRecs.reduce((a, r) => a + (r.nQuestions || 0), 0);
    const subItems = (secs && secs.length ? secs : (topics || [])).map((s) => ({
      name: localized(s.name),
      count: (s.topics && s.topics.length) || 0
    }));
    autoSeo(main, {
      id: sub.id,
      name: localized(sub.name),
      count: subItems.length,
      total: subQuestions,
      h2: localized(sub.name) + " - topics and practice questions",
      items: subItems
    });
  }

  function renderSectionPage(main, cat, sub, sec) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sec.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${topicListHTML(cat, sub, sec, sec.topics || [])}
      </section>`;
    observeReveals();
    const secRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id && r.sub && r.sub.id === sub.id && r.section && r.section.id === sec.id);
    const secQuestions = secRecs.reduce((a, r) => a + (r.nQuestions || 0), 0);
    autoSeo(main, {
      id: sec.id,
      name: localized(sec.name),
      count: (sec.topics || []).length,
      total: secQuestions,
      h2: localized(sec.name) + " - practice questions and revision",
      items: (sec.topics || []).map((tp) => ({ name: localized(tp.name), count: (state.topicMap[[cat.id, sub.id, sec.id, tp.id].join("/")] || {}).nQuestions || 0, unit: "questions" }))
    });
  }

  function topicListHTML(cat, sub, sec, topics) {
    if (!topics.length) return emptyHTML();
    const isStudyGuide = cat.id === "study-guides";
    const actionLabel = state.uiLang === "as" ? "পঢ়ক (Read Guide) →" : "Read Guide →";

    return `
      <div class="sub-grid">
        ${topics.map((tp, i) => {
          const path = [cat.id, sub ? sub.id : "", sec ? sec.id : ""].filter(Boolean).concat([tp.id]).join("/");
          const rec = state.topicMap[path];
          const qCount = (rec && rec.nQuestions > 0) ? rec.nQuestions : ((tp.questions || []).length);
          const countDisplay = isStudyGuide ? actionLabel : (qCount > 0 ? `${qCount} ${t("topic.questions")}` : t("btn.practice"));

          return `
            <a class="sub-card reveal" href="/topic/${path}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                ${subNameHTML(tp.name, "0.91rem")}
                <span id="count-${path.replace(/\//g, '-')}" style="${isStudyGuide ? "color:var(--primary,#2563eb); font-weight:700;" : ""}">${countDisplay}</span>
              </span>
            </a>`;
        }).join("")}
      </div>`;
  }

  function emptyHTML() {
    return `<div class="qa-empty"><div class="big">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M9 9h6"/><path d="M9 13h4"/><path d="m15 16 2 2 4-4"/></svg>
    </div><p>${t("search.noresult")}</p></div>`;
  }

  /* ================= Articles (read-only) =================
     The "articles" category works differently from Q&A topics:
     each subcategory holds a JSON file of rich articles that are
     rendered in a full reading view. They are NOT part of the
     topic index, so they never appear in Downloads / Trending /
     Search — reading only, exactly as required. */
  async function renderArticleReader(main, cat, sub) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let data = null;
    try {
      data = await API.getArticles(sub.id);
    } catch (e) {
      data = null;
    }

    if (!data || !((data.articles || data.questions || []).length)) {
      const isAs = state.lang === "as";
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${escapeHtml(localized(sub.name))}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${isAs ? "এতিয়ালৈকে ইয়াত কোনো প্ৰবন্ধ যোগ কৰা হোৱা নাই।" : "No articles have been added here yet."}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/category/${cat.id}">${isAs ? "পিছলৈ যাওক" : "Go Back"}</a></div>
        </div>`;
      return;
    }

    const rec = {
      path: `articles/${sub.id}`,
      cat: cat,
      sub: sub,
      section: null,
      topic: {
        id: sub.id,
        title: (data && data.title) || sub.name,
        description: (data && data.description) || sub.description || {},
        questions: (data && (data.articles || data.questions)) || [],
      },
    };
    renderDedicatedArticlePage(main, rec);
  }

  /* ================= Topic & Article Page Handler ================= */
  function breadcrumbForTopic(rec) {
    const bits = [`<a href="/">${t("breadcrumb.home")}</a>`];
    bits.push(`<a href="/category/${rec.cat.id}">${escapeHtml(localized(rec.cat.name))}</a>`);
    if (rec.sub) bits.push(`<a href="/category/${rec.cat.id}/${rec.sub.id}">${escapeHtml(localized(rec.sub.name))}</a>`);
    if (rec.section) bits.push(`<a href="/category/${rec.cat.id}/${rec.sub ? rec.sub.id + "/" : ""}${rec.section.id}">${escapeHtml(localized(rec.section.name))}</a>`);
    return bits.map((b, i) => (i ? `<span class="bc-sep">/</span>` : "") + b).join("");
  }

  async function renderTopicPage(main, rec) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    try {
      const data = await API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout);
      if (data) {
        rec.topic = Object.assign({}, rec.topic, data);
        rec.topic.title = rec.topic.title || rec.title;
        rec.nQuestions = (data.questions || []).length;
      }
    } catch { }

    if (rec.cat.id === "study-guides") {
      return renderDedicatedArticlePage(main, rec);
    }

    const qs = rec.topic.questions || [];

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1>${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc">${escapeHtml(localized(rec.topic.description)) || ""}</p>
      </div>

      <div class="topic-layout" style="max-width:100%; margin:0 auto;">
        <div>
          <div class="qa-toolbar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
            <span class="qt-info" style="font-weight:700; font-size:0.92rem; color:var(--ink-soft,#64748b);">${qs.length} ${t("topic.questions")}</span>
            <div class="qa-actions" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                Reading Mode
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language" style="display:inline-flex; border-radius:10px; overflow:hidden; border:1px solid var(--border,#cbd5e1);">
                <button class="lang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${t("topic.lang.as")}</button>
                <button class="lang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${t("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list" style="width:100%; box-sizing:border-box;"></div>
        </div>
      </div>
    `;

    renderQAPage();
    showReadProgress(catColor(rec.cat.id));

    $("#qa-reading").addEventListener("click", openReadingModal);
    $$(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        document.body.setAttribute("data-lang", state.lang);
        $$(".lang-btn").forEach((x) => x.classList.toggle("active", x.dataset.lang === state.lang));
        /* Both languages already live in the DOM; just swap the visible one. */
        refreshReadingModal();
      });
    });
  }

  /* ================= Dedicated Rich Article Layout (Stylish & Mobile-Optimized) ================= */
  function renderDedicatedArticlePage(main, rec) {
    const rawItems = rec.topic.questions || rec.topic.sections || [];
    const isAs = state.lang === "as";
    const isArticles = rec.cat && rec.cat.id === "articles";
    const artBadge = isArticles
      ? (isAs ? "প্ৰবন্ধ পঢ়া • পঢ়া-মাত্ৰ" : "Read Articles • Reading Only")
      : (isAs ? "সম্পূৰ্ণ অধ্যয়ন নিৰ্দেশিকা (Theory Guide)" : "Complete In-Depth Study Guide");

    main.innerHTML = `
      <div class="page-head" style="text-align:left; max-width:860px; margin:0 auto 20px auto; padding:0 16px; box-sizing:border-box;">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1 class="art-main-title">${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc" style="font-size:0.96rem; line-height:1.6; color:var(--ink-soft,#475569); margin:0 0 16px 0;">${escapeHtml(localized(rec.topic.description)) || ""}</p>
        
        <div class="art-top-bar">
          <span style="font-size:0.82rem; font-weight:800; color:var(--primary,#2563eb); text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${artBadge}
          </span>
          <div class="art-lang-switch-box" role="group" aria-label="Article Language">
            <button class="art-glang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as">
              <span class="active-dot"></span>অসমীয়া
            </button>
            <button class="art-glang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en">
              <span class="active-dot"></span>English
            </button>
          </div>
        </div>
      </div>

      <div class="article-wrapper" style="max-width:860px; margin:0 auto; padding:0 16px 50px 16px; box-sizing:border-box;">
        <article id="article-body-content" class="article-card-box"></article>
      </div>

      <style>
        .art-main-title { font-size: 1.8rem; font-weight: 900; line-height: 1.35; color: var(--ink, #0f172a); margin-bottom: 10px; letter-spacing: -0.3px; }
        .art-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border, #e2e8f0); border-bottom: 1px solid var(--border, #e2e8f0); padding: 12px 0; }
        .art-lang-switch-box { display: inline-flex; background: var(--bg-subtle, #f1f5f9); border: 1.5px solid var(--border, #cbd5e1); border-radius: 24px; padding: 3px; gap: 2px; }
        .art-glang-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; font-weight: 700; font-size: 0.82rem; border-radius: 20px; border: none; cursor: pointer; transition: all 0.2s ease-in-out; background: transparent; color: var(--ink-soft, #64748b); }
        .art-glang-btn .active-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: none; }
        .art-glang-btn.active { background: #2563eb !important; color: #ffffff !important; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); }
        .art-glang-btn.active .active-dot { display: inline-block; }
        .article-card-box { background: var(--card-bg, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 20px; padding: 36px 32px; box-shadow: 0 10px 30px -6px rgba(15,23,42,0.04); text-align: left; }
        .article-part-block { margin-bottom: 34px; padding-bottom: 26px; border-bottom: 1px dashed var(--border, #e2e8f0); }
        .article-part-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .art-headline { font-size: 1.3rem; font-weight: 800; color: var(--ink, #0f172a); margin: 0 0 14px 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
        .art-paragraph { font-size: 1.02rem; line-height: 1.85; color: var(--ink-soft, #334155); margin: 0 0 16px 0; text-align: left; word-break: break-word; font-weight: 400; }
        .art-keynote { background: var(--bg-subtle, #f8fafc); border-left: 4px solid var(--primary, #2563eb); padding: 14px 18px; border-radius: 10px; font-size: 0.92rem; line-height: 1.65; color: var(--ink-muted, #475569); border-top: 1px solid var(--border, #f1f5f9); border-right: 1px solid var(--border, #f1f5f9); border-bottom: 1px solid var(--border, #f1f5f9); }
        
        @media (max-width: 640px) {
          .art-main-title { font-size: 1.35rem !important; line-height: 1.35 !important; }
          .article-card-box { padding: 20px 16px !important; border-radius: 14px !important; }
          .art-headline { font-size: 1.12rem !important; }
          .art-paragraph { font-size: 0.95rem !important; line-height: 1.75 !important; }
          .art-top-bar { justify-content: center !important; flex-direction: column !important; text-align: center !important; gap: 10px !important; }
          .art-lang-switch-box { width: 100% !important; justify-content: center !important; }
          .art-glang-btn { flex: 1 !important; justify-content: center !important; padding: 8px 0 !important; }
        }

        [data-theme="dark"] .article-card-box { background: var(--bg-soft, #0f172a) !important; border-color: var(--border, #2b3a55) !important; }
        [data-theme="dark"] .art-lang-switch-box { background: #0f172a !important; border-color: #334155 !important; }
        [data-theme="dark"] .art-glang-btn { color: #94a3b8 !important; }
        [data-theme="dark"] .art-keynote { background: #1e293b !important; border-color: #334155 !important; color: #cbd5e1 !important; }
      </style>
    `;

    const renderArticleText = () => {
      const artBox = $("#article-body-content");
      if (!artBox) return;

      artBox.innerHTML = ["en", "as"].map((lang) => {
        const keyLabel = lang === "as" ? "গুৰুত্বপূৰ্ণ বিষয় (Key Takeaway)" : "Key Highlights";
        return `<div data-axo-lang="${lang}">${rawItems.map((item) => {
          const headline = extractField(item, "question", lang);
          const bodyText = extractField(item, "answer", lang);
          const explanation = extractField(item, "explanation", lang);

          return `
            <div class="article-part-block">
              <h2 class="art-headline">
                <span>${formatMath(headline)}</span>
              </h2>
              <div class="art-paragraph">${formatMath(bodyText)}</div>
              ${explanation ? `
                <div class="art-keynote">
                  <b style="color:var(--primary,#2563eb);">${keyLabel}:</b> ${formatMath(explanation)}
                </div>` : ""
              }
            </div>
          `;
        }).join("")}</div>`;
      }).join("");

      renderMathJax(artBox);
    };

    renderArticleText();
    showReadProgress(catColor(rec.cat && rec.cat.id));

    $$(".art-glang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.lang;
        if (state.lang === target) return;
        state.lang = target;
        document.body.setAttribute("data-lang", state.lang);
        
        $$(".art-glang-btn").forEach((x) => {
          x.classList.toggle("active", x.dataset.lang === state.lang);
        });
      });
    });
  }

  /* ================= Smart Hybrid Q&A Renderer ================= */
  function renderQAPage() {
    const rec = currentTopicRec();
    if (!rec) return;
    const qs = rec.topic.questions || [];
    /* Every question is rendered into the DOM, not just the current page.
       Crawlers that execute JavaScript (Googlebot) then receive the whole
       topic instead of a single 15-question page. */
    const start = 0;
    const slice = qs;

    const list = $("#qa-list");

    const wideFigTopic = /(?:^|\/)(image-series|image-analogy)$/.test(rec.path || "");
    list.classList.toggle("nv-fig-wide", wideFigTopic);

    if (!slice.length) {
      list.innerHTML = `<div class="qa-empty"><div class="big">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div><p>${t("toast.noquestions")}</p></div>`;
    } else {
      list.innerHTML = slice.map((item, i) => {
        const n = start + i + 1;
        const active = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
        const other = active === "as" ? "en" : "as";
        /* Both languages are emitted so JS-executing crawlers receive the full
           bilingual content; the existing data-axo-lang rules show only the
           active language, so the reader-facing UI is unchanged. */
        return `<div data-axo-lang="${active}">${topicQACardHTML(item, n, active)}</div>`
          + `<div data-axo-lang="${other}">${topicQACardHTML(item, n, other)}</div>`;
      }).join("");

      renderMathJax(list);
    }
  }

  /* Render one topic question card for a given language. Extracted so the
     caller can emit every question in both languages. */
  function topicQACardHTML(item, n, lang) {
    {
        const qtext = extractField(item, "question", lang);
        const atext = extractField(item, "answer", lang);
        const options = getOptionsList(item, lang);
        const explanation = extractField(item, "explanation", lang);
        const media = mediaBlock(item);
        const fopts = figureOptions(item);

        const targetLang = lang;
        const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
        const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

        if (isStepArray) {
          return `
            <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
                ${n}. ${formatMath(qtext)}
              </div>
              ${media}
              ${fopts ? figureOptionsHTML(item, { compact: true }) : options.length ? `
                <div class="qa-options-inline" style="margin:0 0 12px 0; padding:0; font-size:0.92rem; color:var(--ink-soft,#334155); display:flex; flex-direction:column; gap:6px; font-weight:500; text-align:left; align-items:flex-start;">
                  ${options.map((opt, optIdx) => {
                    const optDisplay = `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                    return `<span>${formatMath(optDisplay)}</span>`;
                  }).join("")}
                </div>` : ""
              }
              <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
                <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
                ${explanation ? `
                  <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                    <b style="color:var(--ink,#0f172a);">${lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${explanation}
                  </div>` : ""
                }
              </div>
            </article>`;
        } else {
          return `
            <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
                <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${n}</span>
                <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${formatMath(qtext)}</span>
              </div>
              ${media}
              ${fopts ? figureOptionsHTML(item) : options.length ? `
                <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                  ${options.map((opt, optIdx) => `
                    <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                      <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b> 
                      <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
                    </div>
                  `).join("")}
                </div>` : ""
              }
              <div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
                <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${t("topic.answer")}:</span>
                <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${formatMath(atext)}</span>
              </div>
              ${explanation ? `
                <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
                  <b style="color:var(--ink,#0f172a);">${lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${formatMath(explanation)}
                </div>` : ""
              }
            </article>`;
        }
    }
  }

  /* ================= Reading-mode popup ================= */
  function ensureReadingModal() {
    let modal = $("#read-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "read-modal";
    modal.className = "read-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="read-modal-backdrop" id="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" aria-modal="true" style="max-width:760px; width:92%; margin:auto; border-radius:18px; text-align:left; background:var(--bg,#ffffff);">
        <div class="read-modal-head" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border,#e2e8f0);">
          <div class="read-modal-titles" style="text-align:left;">
            <span class="read-modal-title" style="font-size:1.15rem; font-weight:800; display:block; color:var(--ink,#0f172a);"></span>
            <span class="read-modal-sub" style="font-size:0.82rem; color:var(--ink-muted,#64748b);"></span>
          </div>
          <button id="read-modal-close" class="read-close" type="button" aria-label="Close" style="background:transparent; border:none; cursor:pointer; padding:6px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="read-modal-body" id="read-modal-body" style="padding:20px; max-height:70vh; overflow-y:auto; text-align:left; box-sizing:border-box;"></div>
      </div>`;
    document.body.appendChild(modal);

    $("#read-modal-close", modal).addEventListener("click", closeReadingModal);
    $("#read-modal-backdrop", modal).addEventListener("click", closeReadingModal);

    return modal;
  }

  function openReadingModal() {
    const rec = currentTopicRec();
    if (!rec) return;
    const modal = ensureReadingModal();
    const qs = rec.topic.questions || [];
    $(".read-modal-title", modal).textContent = localized(rec.topic.title);
    $(".read-modal-sub", modal).textContent = `${qs.length} ${t("topic.questions")} • ${state.lang === "as" ? t("topic.lang.as") : t("topic.lang.en")}`;
    modal.hidden = false;
    renderReadingModalPage();
  }

  function closeReadingModal() {
    const modal = $("#read-modal");
    if (modal) modal.hidden = true;
  }

  function renderReadingModalPage() {
    const rec = currentTopicRec();
    const modal = $("#read-modal");
    if (!rec || !modal || modal.hidden) return;
    const qs = rec.topic.questions || [];

    $(".read-modal-sub", modal).textContent = `${qs.length} ${t("topic.questions")} • ${state.lang === "as" ? t("topic.lang.as") : t("topic.lang.en")}`;

    const body = $("#read-modal-body", modal);
    body.innerHTML = qs.map((item, i) => {
      const n = i + 1;
      const qtext = extractField(item, "question");
      const atext = extractField(item, "answer");
      const options = getOptionsList(item);
      const media = mediaBlock(item);
      const fopts = figureOptions(item);

      const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
      const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
      const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

      if (isStepArray) {
        return `
          <article class="qa-card read-item" data-n="${n}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="margin:0 0 8px 0; padding:0; font-size:0.96rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
              ${n}. ${formatMath(qtext)}
            </div>
            ${media}
            ${fopts ? figureOptionsHTML(item, { compact: true }) : options.length ? `
              <div class="qa-options-inline" style="margin:0 0 10px 0; padding:0; display:flex; flex-direction:column; gap:6px; font-size:0.9rem; color:var(--ink-soft,#334155); font-weight:500; text-align:left; align-items:flex-start;">
                ${options.map((opt, optIdx) => {
                  const optDisplay = `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                  return `<span>${formatMath(optDisplay)}</span>`;
                }).join("")}
              </div>` : ""
            }
            <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:8px; margin:0; font-size:0.88rem; color:var(--ink-soft,#334155); line-height:1.6; text-align:left;">
              <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
            </div>
          </article>`;
      } else {
        return `
          <article class="qa-card read-item" data-n="${n}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 8px 0; padding:0; text-align:left;">
              <span class="qno" style="flex-shrink:0; width:26px; height:26px; border-radius:6px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.84rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; margin-top:1px;">${n}</span>
              <span class="qtext" style="flex:1; font-weight:500; font-size:0.94rem; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">${formatMath(qtext)}</span>
            </div>
            ${media}
            ${fopts ? figureOptionsHTML(item) : options.length ? `
              <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                ${options.map((opt, optIdx) => `
                  <div style="font-size:0.86rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:7px 10px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                    <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b>
                    <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
                  </div>
                `).join("")}
              </div>` : ""
            }
            <div class="qa-a" style="margin:6px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
              <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); font-size:0.9rem;">${t("topic.answer")}:</span>
              <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); font-size:0.9rem; line-height:1.45;">${formatMath(atext)}</span>
            </div>
          </article>`;
      }
    }).join("");

    renderMathJax(body);
  }

  function refreshReadingModal() {
    const modal = $("#read-modal");
    if (!modal || modal.hidden) return;
    renderReadingModalPage();
  }

  function currentTopicRec() {
    const segs = parsePath();
    if (segs[0] !== "topic") return null;
    return state.topicMap[segs.slice(1).join("/")];
  }

  /* ================= Trending page ================= */
  function renderTrendingPage(main) {
    const trending = trendingTopics(state.topicIndex);
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.trending.title")}</span></nav>
        <h1>${t("page.trending.title")}</h1>
        <p class="page-desc">${t("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${(i % 10) * 40}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(r.title))}</span>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))}${r.sub ? " • " + escapeHtml(localized(r.sub.name)) : ""} • ${r.cat.id === "study-guides" ? (state.uiLang === "as" ? "পঢ়ক →" : "Read Guide →") : `${r.nQuestions || 0} ${t("topic.questions")}`}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= Detailed Bilingual Legal Pages ================= */
  function renderStatic(main, key) {
    const isAs = state.lang === "as";
    let title = "";
    let desc = "";
    let content = "";

    if (key === "about") {
      title = isAs ? "axomexam সম্পৰ্কে" : "About axomexam";
      desc = isAs ? "আমি কোন, আমাৰ অধ্যয়ন সামগ্ৰী কেনেদৰে প্ৰস্তুত কৰা হয়, আৰু অসমৰ প্ৰতিজন পৰীক্ষাৰ্থীৰ বাবে ইয়াক কেনেদৰে বিনামূলীয়া আৰু নিৰ্ভুল ৰখা হয়।" : "Who we are, how our study material is prepared, and how we keep it free and accurate for every Assam exam aspirant.";
      content = isAs ? `
        <p><strong>axomexam.in</strong> হৈছে অসমৰ চৰকাৰী নিযুক্তি পৰীক্ষা আৰু ৰাজ্যখনত জনপ্ৰিয় কেন্দ্ৰীয় পৰীক্ষাসমূহৰ বাবে প্ৰস্তুতি চলাই থকা প্ৰাৰ্থীসকলৰ বাবে এখন স্বতন্ত্ৰ, বিনামূলীয়া অধ্যয়ন মঞ্চ। ই দ্বিভাষিক অনুশীলন প্ৰশ্নৰ এখন সৰু সংগ্ৰহ হিচাপে আৰম্ভ হৈছিল আৰু এতিয়া সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি এটা সংগঠিত লাইব্ৰেৰী হৈ পৰিছে — য'ত প্ৰতিটো প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত উপলব্ধ।</p>

        <h2>আমাৰ লক্ষ্য</h2>
        <p>আমাৰ বিশ্বাস যে সৰু চহৰত পঢ়া এজন প্ৰাৰ্থীয়ে চহৰৰ কোচিং কেন্দ্ৰৰ প্ৰাৰ্থীৰ দৰেই একে মানৰ অনুশীলন সমল পোৱা উচিত — কোনো মাচুল নিদিয়াকৈ আৰু একাউণ্ট নখুলাকৈ। axomexam.in ৰ প্ৰতিটো অংশ পঢ়া, অনুশীলন কৰা আৰু ডাউনল'ড কৰা বিনামূলীয়া, আৰু ভাষা কেতিয়াও প্ৰস্তুতিৰ বাধা নহয়।</p>

        <h2>আমি কি আগবঢ়াওঁ</h2>
        <ul>
          <li><strong>বিষয়ভিত্তিক প্ৰশ্ন-সংগ্ৰহ:</strong> সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি আৰু ইংৰাজীত, প্ৰতিটোৰ উত্তৰ আৰু প্ৰয়োজনত ধাপে ধাপে সমাধানসহ।</li>
          <li><strong>সময় নিৰ্ধাৰিত মক টেষ্ট:</strong> প্ৰকৃত প্ৰশ্নকাকতৰ আৰ্হি অনুসৰি, লাইভ কাউণ্টডাউন, তৎক্ষণাত ফলাফল আৰু উত্তৰ পুনৰীক্ষণসহ।</li>
          <li><strong>বিগত বৰ্ষৰ সমাধান কৰা প্ৰশ্নকাকত:</strong> SSC, ৰে'লৱে, অসম আৰক্ষী, গুৱাহাটী উচ্চ ন্যায়ালয়, DHS আৰু DME আদি পৰীক্ষাৰ বাবে।</li>
          <li><strong>ই-বুক আৰু PDF নোট:</strong> পুনৰাবৃত্তিৰ বাবে, অসমৰ ইতিহাস, ভাৰতীয় ৰাজনীতি, ভূগোল, অৰ্থনীতি, কলা আৰু সংস্কৃতি আদি সামৰি।</li>
          <li><strong>এখন বিনামূলীয়া Android এপ:</strong> যাতে অনুশীলন সামগ্ৰী য'ত-ত'ৱে অফলাইনত ব্যৱহাৰ কৰিব পাৰি।</li>
        </ul>

        <h2>আমাৰ সমল কেনেদৰে প্ৰস্তুত কৰা হয়</h2>
        <p>প্ৰতিটো বিষয় প্ৰথমে সংশ্লিষ্ট পৰীক্ষাৰ চৰকাৰী পাঠ্যক্ৰম অনুসৰি শিতান আৰু বিষয়ত ভাগ কৰা হয়। তাৰ পিছত বিষয় অনুসৰি প্ৰশ্ন যোগ কৰি সত্যতা, বানান আৰু স্পষ্টতা পৰীক্ষা কৰা হয়। যি প্ৰাৰ্থীয়ে এটা প্ৰশ্ন ভুল কৰিছে তেওঁ উত্তৰটো মুখস্থ নকৰি ধাৰণাটো বুজি পোৱাৰ বাবে সহজ ভাষাত ব্যাখ্যা লিখা হয়। প্ৰকাশৰ আগতে তথ্যসমূহ চৰকাৰী জাননী, মানক প্ৰসংগ পুথি আৰু ৰাজহুৱাভাৱে উপলব্ধ চৰকাৰী উৎসৰ সৈতে মিলাই পৰীক্ষা কৰা হয়।</p>

        <h2>সম্পাদকীয় মান</h2>
        <p>সকলো সামগ্ৰী axomexam সম্পাদকীয় দলৰ দ্বাৰা প্ৰস্তুত আৰু পৰ্যালোচনা কৰা হয়, যিয়ে কেৱল এই মঞ্চৰ অধ্যয়ন সমলত কাম কৰে। কোনো পৰীক্ষা, কোচিং প্ৰতিষ্ঠান বা সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বাবে আমি ধন লোৱা নাই, আৰু পৃষ্ঠপোষকতা কৰা সামগ্ৰী কেতিয়াও অধ্যয়ন সমল হিচাপে প্ৰকাশ নকৰা হয়। পাঠ্যক্ৰম, পৰীক্ষাৰ আৰ্হি বা তথ্য সলনি হ'লে পৃষ্ঠাসমূহ নিয়মীয়াকৈ পৰ্যালোচনা আৰু হালনাগাদ কৰা হয়।</p>

        <h2>শুদ্ধতা আৰু সংশোধন</h2>
        <p>আমি প্ৰতিটো তথ্য সঠিক ৰাখিবলৈ চেষ্টা কৰোঁ, কিন্তু পৰীক্ষাৰ আৰ্হি, পাঠ্যক্ৰমৰ বিৱৰণ আৰু চৰকাৰী জাননী সলনি হ'ব পাৰে। axomexam.in এখন স্বতন্ত্ৰ অধ্যয়ন সহায়িকা, চৰকাৰী প'ৰ্টেল নহয় — তাৰিখ, যোগ্যতা আৰু পৰীক্ষাৰ আৰ্হি সদায় চৰকাৰী জাননীৰ পৰা নিশ্চিত কৰক। আপুনি কিবা ভুল বা ভাঙা লিংক পালে পৃষ্ঠাৰ লিংক আৰু সঠিক তথ্যসহ আমালৈ লিখক, আমি যাচাই কৰি সংশোধন কৰিম। সংশোধন আৰু অৱদান কেতিয়াও কোনো বাণিজ্যিক উদ্দেশ্যত ব্যৱহাৰ কৰা নহয়।</p>

        <h2>axomexam কাৰ দ্বাৰা পৰিচালিত</h2>
        <p>axomexam.in প্ৰতিষ্ঠা আৰু সম্পাদনা কৰে <strong>axomexam সম্পাদকীয় দলে</strong>। সম্পাদকীয় দলত আছে <strong>হৰ্ষ বৰ্মন</strong> (দল পৰিচালক, ইতিহাসত M.A.), <strong>অভিক ৰয়</strong> (দল সদস্য, MBA) আৰু <strong>গৌতম দাস</strong> (দল সদস্য, B.Sc.)। তেওঁলোকৰ ভূমিকা আৰু পৰ্যালোচনাৰ কাৰ্যপ্ৰবাহ <a href="/editorial-team/">সম্পাদকীয় দল পৃষ্ঠা</a>ত বৰ্ণনা কৰা হৈছে।</p>

        <h2>এই ছাইট কাৰ বাবে</h2>
        <p>এই সামগ্ৰী ADRE তৃতীয় আৰু চতুৰ্থ শ্ৰেণী, অসম আৰক্ষী উপ-পৰিদৰ্শক আৰু কনিষ্টবল, APSC, পঞ্চায়ত আৰু গ্ৰামোন্নয়ন, বন বিভাগ, DHS আৰু DME, লগতে SSC CGL, CHSL আৰু GD, আৰু RRB NTPC আৰু Group D ৰ দৰে কেন্দ্ৰীয় পৰীক্ষাৰ প্ৰাৰ্থীসকলৰ বাবে ডিজাইন কৰা হৈছে। আপুনি আৰম্ভণিৰ পৰা শিকিছে নে চূড়ান্ত পুনৰাবৃত্তি কৰিছে, বিষয়ভিত্তিক গাঁথনিয়ে আপোনাক নিজৰ গতিত অধ্যয়ন কৰিবলৈ দিয়ে।</p>

        <h2>যোগাযোগ কৰক</h2>
        <p>প্ৰশ্ন, সংশোধন আৰু পৰামৰ্শ সদায় স্বাগতম। <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> লৈ ইমেইল কৰক বা আমাৰ <a href="/contact/">যোগাযোগ পৃষ্ঠা</a> ব্যৱহাৰ কৰক। আমি সাধাৰণতে দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত উত্তৰ দিওঁ।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p><strong>axomexam.in</strong> is an independent, free study platform for candidates preparing for government recruitment examinations in Assam and for central examinations that are popular in the state. It began as a small collection of bilingual practice questions and has grown into a structured library that covers General Knowledge, Mathematics, General Science, Reasoning Ability, General English and Computer Awareness — with every question, answer and explanation available in both English and Assamese.</p>

        <h2>Our Mission</h2>
        <p>We believe that a candidate studying in a small town should have access to the same quality of practice material as a candidate in a city coaching centre — without paying a fee and without creating an account. Every part of axomexam.in is free to read, practise and download, and language is never a barrier to preparation.</p>

        <h2>What We Offer</h2>
        <ul>
          <li><strong>Topic-wise question banks</strong> in General Knowledge, Mathematics, General Science, Reasoning and English, each with answers and, wherever needed, step-by-step working.</li>
          <li><strong>Timed mock tests</strong> that follow the real paper pattern, with a live countdown, instant results and answer review.</li>
          <li><strong>Previous year solved papers</strong> for exams such as SSC, Railway, Assam Police, Guwahati High Court, DHS and DME.</li>
          <li><strong>E-books and PDF notes</strong> for revision, covering Assam History, Indian Polity, Geography, Economy, Art and Culture, and more.</li>
          <li><strong>A free Android app</strong> so practice material can be used offline on the go.</li>
        </ul>

        <h2>How Our Content Is Prepared</h2>
        <p>Each subject is first divided into sections and topics that follow the official syllabus of the relevant examination. Questions are then added topic by topic and checked for factual accuracy, spelling and clarity. Explanations are written in plain language so that a candidate who answered a question incorrectly can understand the concept instead of simply memorising the answer. Facts are cross-checked against official notifications, standard reference books and publicly available government sources before publishing.</p>

        <h2>Editorial Standards</h2>
        <p>All material is prepared and reviewed by the axomexam editorial team, which works only on study content for this platform. We do not accept payment for including any exam, coaching institute or product, and sponsored material is never published as study content. Pages are reviewed periodically and updated whenever a syllabus, exam pattern or fact changes.</p>

        <h2>Accuracy and Corrections</h2>
        <p>We try to keep every fact correct, but examination patterns, syllabus details and official notifications can change. axomexam.in is an independent study aid and not a government portal — always confirm dates, eligibility and exam patterns from the official notification. If you find an error or a broken link, write to us with the page link and the correct information, and we will verify it and make the correction. Corrections and contributions are never used for any commercial purpose.</p>

        <h2>Who This Site Is For</h2>
        <p>The material is designed for aspirants of ADRE Grade III and IV, Assam Police Sub-Inspector and Constable, APSC, Panchayat and Rural Development, Forest Department, DHS and DME, and for central exams such as SSC CGL, CHSL and GD, and RRB NTPC and Group D. Whether you are starting from the basics or doing a final revision, the topic-wise structure lets you study at your own pace.</p>

        <h2>Contact Us</h2>
        <p>Questions, corrections and suggestions are always welcome. Email <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> or use our <a href="/contact/">contact page</a>. We usually reply within two to three working days.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "privacy" || key === "privacy-policy") {
      title = isAs ? "গোপনীয়তা নীতি" : "Privacy Policy";
      desc = isAs ? "axomexam.in এ আপোনাৰ তথ্য কেনেকৈ সংগ্ৰহ, ব্যৱহাৰ আৰু সুৰক্ষিত কৰা হয়, কুকিজ, Google AdSense বিজ্ঞাপন আৰু আপোনাৰ অধিকাৰসমূহ।" : "How axomexam.in collects, uses and protects information, how cookies and Google AdSense advertising work, and the choices and rights you have.";
      content = isAs ? `
        <p>এই গোপনীয়তা নীতিয়ে ব্যাখ্যা কৰে যে আপুনি <strong>axomexam.in</strong> পৰিদৰ্শন বা ব্যৱহাৰ কৰোঁতে — আমাৰ ৱেবছাইট, অধ্যয়ন সামগ্ৰী, মক টেষ্ট, ই-বুক, ডাউনল'ডযোগ্য PDF টোকা আৰু আমাৰ Android এপ ব্যৱহাৰ কৰোঁতে — আমি কেনেকৈ তথ্য সংগ্ৰহ, ব্যৱহাৰ, সংৰক্ষণ আৰু ভাগ-বাটোৱাৰা কৰোঁ। ই আপোনাৰ ওচৰত থকা বিকল্পসমূহো ব্যাখ্যা কৰে।</p>
        <p>axomexam.in ব্যৱহাৰ কৰিলে আপুনি এই গোপনীয়তা নীতিত সন্মতি জনোৱা বুলি ধৰা হয়। কোনো অংশত সন্মত নহ'লে অনুগ্ৰহ কৰি ৱেবছাইট ব্যৱহাৰ নকৰিব।</p>

        <h3>১. আমি সংগ্ৰহ কৰা তথ্য</h3>
        <p><strong>১.১ আপুনি আমাক দিয়া তথ্য।</strong> প্ৰায় সকলো অধ্যয়ন সামগ্ৰী একাউণ্ট নাখুলাকৈ পঢ়িব, অনুশীলন কৰিব আৰু ডাউনল'ড কৰিব পাৰি। সমল পাবলৈ আমি নাম, ঠিকনা, জন্ম তাৰিখ বা পেমেন্ট তথ্য নিবিচাৰোঁ। আপুনি স্বইচ্ছাৰে দিয়া তথ্যহে সংগ্ৰহ কৰা হয় — যোগাযোগ ফৰ্ম বা ইমেইলত নাম, ইমেইল আৰু বাৰ্তা; প্ৰশ্ন আগবঢ়োৱা ফৰ্মত দিয়া নাম, ইমেইল আৰু প্ৰশ্ন; আৰু কপিৰাইট বা টেকডাউন অনুৰোধৰ সপক্ষে দিয়া তথ্য।</p>
        <p><strong>১.২ স্বয়ংক্ৰিয়ভাৱে সংগ্ৰহ কৰা তথ্য।</strong> বেছিভাগ ৱেবছাইটৰ দৰেই আমি আৰু আমাৰ তৃতীয় পক্ষৰ সেৱা প্ৰদানকাৰীয়ে কিছু কাৰিকৰী তথ্য স্বয়ংক্ৰিয়ভাৱে লিপিবদ্ধ কৰোঁ — IP ঠিকনা, ব্ৰাউজাৰৰ প্ৰকাৰ আৰু সংস্কৰণ, ডিভাইচ আৰু অপাৰেটিং চিষ্টেম, ভাষা, পৰিদৰ্শিত পৃষ্ঠা, পৰিদৰ্শনৰ তাৰিখ আৰু সময়, ব্যয় কৰা সময় আৰু প্ৰেৰণকাৰী লিংক। এই তথ্য সামগ্ৰিকভাৱে সুৰক্ষা, ত্ৰুটি-সমাধান, কাৰ্যক্ষমতা আৰু ব্যৱহাৰ বিশ্লেষণৰ বাবে ব্যৱহাৰ কৰা হয় আৰু ই আপোনাক পোনপটীয়াকৈ চিনাক্ত নকৰে।</p>
        <p><strong>১.৩ আপোনাৰ ডিভাইচত সংৰক্ষিত পছন্দ।</strong> আপুনি বাছনি কৰা ভাষা (ইংৰাজী বা অসমীয়া) আৰু লাইট বা ডাৰ্ক থীম মনত ৰাখিবলৈ আমি ব্ৰাউজাৰৰ লোকেল ষ্ট'ৰেজ ব্যৱহাৰ কৰোঁ। এই সেটিংসমূহ আপোনাৰ ডিভাইচতে থাকে আৰু আপোনাক চিনাক্ত কৰিবলৈ ব্যৱহাৰ নহয়।</p>

        <h3>২. কুকিজ আৰু একেধৰণৰ প্ৰযুক্তি</h3>
        <p>কুকিজ হৈছে ৱেবছাইটে আপোনাৰ ডিভাইচত ৰখা সৰু টেক্সট ফাইল। আমি আৰু আমাৰ তৃতীয় পক্ষৰ অংশীদাৰসকলে তলত দিয়া উদ্দেশ্যত কুকি, ৱেব বিকন, পিক্সেল আৰু একেধৰণৰ প্ৰযুক্তি ব্যৱহাৰ কৰোঁ।</p>
        <ul>
          <li><strong>অত্যাৱশ্যকীয় / পছন্দ কুকি:</strong> ছাইট কাৰ্যক্ষম ৰাখিবলৈ আৰু আপোনাৰ থীম আৰু ভাষাৰ বাছনি মনত ৰাখিবলৈ।</li>
          <li><strong>এনালিটিক্স কুকি:</strong> দৰ্শকে ছাইট কেনেকৈ ব্যৱহাৰ কৰে বুজি সমল আৰু গতি উন্নত কৰিবলৈ।</li>
          <li><strong>বিজ্ঞাপন কুকি:</strong> Google আৰু অন্য বিজ্ঞাপন অংশীদাৰসকলে বিজ্ঞাপন দেখুৱাব আৰু জোখ ল'বলৈ, লগতে ব্যক্তিগতকৃত বিজ্ঞাপনৰ বাবেও।</li>
        </ul>
        <p>ব্ৰাউজাৰৰ সেটিঙৰ জৰিয়তে আপুনি কুকি নিয়ন্ত্ৰণ বা মচিব পাৰে। কুকি অক্ষম কৰিলে ৱেবছাইটৰ কিছুমান অংশ (যেনে থীম আৰু ভাষাৰ স্মৃতি) ইচ্ছামতে কাম নকৰিব পাৰে।</p>

        <h3>৩. Google AdSense আৰু তৃতীয় পক্ষৰ বিজ্ঞাপন</h3>
        <p>অধ্যয়ন সামগ্ৰী বিনামূলীয়া ৰাখিবলৈ axomexam.in বিজ্ঞাপনেৰে চলি থাকে। আমি <strong>Google AdSense</strong> ব্যৱহাৰ কৰোঁ আৰু অন্য তৃতীয় পক্ষৰ বিজ্ঞাপন নেটৱৰ্কৰ সৈতেও কাম কৰিব পাৰোঁ।</p>
        <ul>
          <li>তৃতীয় পক্ষৰ বিক্ৰেতা, <strong>Google সহ</strong>, এই ৱেবছাইট আৰু/বা ইণ্টাৰনেটৰ অন্য ৱেবছাইটলৈ আপোনাৰ আগৰ ভ্ৰমণৰ ভিত্তিত বিজ্ঞাপন দেখুৱাবলৈ কুকি ব্যৱহাৰ কৰে।</li>
          <li>Google এ বিজ্ঞাপন কুকি (যেনে <strong>DoubleClick DART কুকি</strong>) ব্যৱহাৰ কৰি আপোনালৈ প্ৰাসংগিক বিজ্ঞাপন দেখুৱাব পাৰে।</li>
          <li>আপোনাৰ অঞ্চল আৰু সন্মতিৰ ওপৰত নিৰ্ভৰ কৰি Google এ <strong>ব্যক্তিগতকৃত</strong> বা <strong>অ-ব্যক্তিগতকৃত</strong> বিজ্ঞাপন দেখুৱাব পাৰে। অ-ব্যক্তিগতকৃত বিজ্ঞাপন পৃষ্ঠাৰ সমলৰ ওপৰত আধাৰিত, আপোনাৰ আগৰ আচৰণৰ ওপৰত নহয়।</li>
          <li>তৃতীয় পক্ষৰ বিজ্ঞাপন নেটৱৰ্কে তেওঁলোকৰ নিজা কুকি বা একেধৰণৰ প্ৰযুক্তিৰ জৰিয়তে তথ্য সংগ্ৰহ কৰিব পাৰে, আৰু সেই তথ্যৰ ব্যৱহাৰ তেওঁলোকৰ নিজা গোপনীয়তা নীতিয়ে নিয়ন্ত্ৰণ কৰে।</li>
        </ul>
        <p><strong>ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থকাৰ উপায়:</strong></p>
        <ul>
          <li>Google এ কৰা ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থাকিবলৈ <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener nofollow">Google Ads Settings</a> লৈ যাওক।</li>
          <li>কিছুমান তৃতীয় পক্ষৰ বিক্ৰেতাৰ কুকি ব্যৱহাৰৰ পৰা আঁতৰি থাকিবলৈ <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener nofollow">www.aboutads.info</a> লৈ যাওক।</li>
          <li>ইউৰোপীয় অৰ্থনৈতিক অঞ্চল, যুক্তৰাজ্য বা ছুইজাৰলেণ্ডত থাকিলে <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener nofollow">www.youronlinechoices.eu</a> লৈ গৈ বিজ্ঞাপনৰ পছন্দ নিয়ন্ত্ৰণ কৰক।</li>
          <li>Google এ তেওঁৰ সেৱা ব্যৱহাৰ কৰা ছাইটৰ পৰা তথ্য কেনেকৈ ব্যৱহাৰ কৰে জানিবলৈ <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener nofollow">policies.google.com/technologies/ads</a> চাওক।</li>
        </ul>
        <p>ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থকাৰ অৰ্থ এইটো নহয় যে আপুনি বিজ্ঞাপন নেদেখিব; ইয়াৰ অৰ্থ হ'ল আপুনি দেখা বিজ্ঞাপনবোৰ আপোনাৰ আগ্ৰহৰ সৈতে কম প্ৰাসংগিক হ'ব পাৰে।</p>

        <h3>৪. আমি তথ্য কেনেকৈ ব্যৱহাৰ কৰোঁ</h3>
        <ul>
          <li>ৱেবছাইট, সমল আৰু এপ পৰিচালনা, ৰক্ষণাবেক্ষণ আৰু উন্নত কৰিবলৈ।</li>
          <li>আপোনাৰ প্ৰশ্ন, সংশোধন, অৱদান আৰু টেকডাউন অনুৰোধৰ উত্তৰ দিবলৈ।</li>
          <li>মঞ্চখন বিনামূলীয়া ৰখা বিজ্ঞাপন দেখুৱাব আৰু জোখ ল'বলৈ।</li>
          <li>সুৰক্ষা ঘটনা, অপব্যৱহাৰ, স্পাম আৰু কাৰিকৰী ত্ৰুটি নিৰীক্ষণ কৰিবলৈ।</li>
          <li>কোন বিষয় আৰু সুবিধা আটাইতকৈ উপযোগী বুজি নতুন সমলৰ পৰিকল্পনা কৰিবলৈ।</li>
          <li>প্ৰযোজ্য আইনী দায়িত্ব পালন কৰিবলৈ।</li>
        </ul>

        <h3>৫. তথ্য ভাগ-বাটোৱাৰা আৰু প্ৰকাশ</h3>
        <p>আমি আপোনাৰ ব্যক্তিগত তথ্য বিক্ৰী নকৰোঁ। কেৱল তলত দিয়া সীমিত অৱস্থাতহে তথ্য ভাগ কৰিব পাৰোঁ:</p>
        <ul>
          <li><strong>সেৱা প্ৰদানকাৰী আৰু বিজ্ঞাপন অংশীদাৰ:</strong> যেনে Google AdSense, হোষ্টিং, এনালিটিক্স আৰু ইমেইল প্ৰদানকাৰী, যিসকলে আমাৰ হৈ তথ্য প্ৰক্ৰিয়া কৰে।</li>
          <li><strong>আইনী প্ৰয়োজন:</strong> আইন, নিয়ম বা বলবৎ চৰকাৰী অনুৰোধ মানিবলৈ তথ্য প্ৰকাশ কৰিবলগীয়া হ'লে।</li>
          <li><strong>অধিকাৰ সুৰক্ষা:</strong> আমাৰ অধিকাৰ, ব্যৱহাৰকাৰী বা ৰাইজৰ সুৰক্ষা, বা জালিয়াতি আৰু সুৰক্ষা বিষয়ৰ তদন্তৰ বাবে প্ৰয়োজন হ'লে।</li>
          <li><strong>ব্যৱসায় হস্তান্তৰ:</strong> ৱেবছাইট বা ইয়াৰ সম্পদ হস্তান্তৰ বা একত্ৰীকৰণ হ'লে তথ্য সেই লেনদেনৰ অংশ হিচাপে হস্তান্তৰ হ'ব পাৰে।</li>
        </ul>

        <h3>৬. তথ্য সংৰক্ষণ</h3>
        <p>যোগাযোগ আৰু অৱদানৰ বাৰ্তা কেৱল উত্তৰ দি সমাধান কৰিবলৈ যিমান প্ৰয়োজন তিমান সময় ৰাখোঁ, তাৰ পিছত ৰেকৰ্ড ৰাখিবলৈ এক যুক্তিসংগত সময়লৈ। স্বয়ংক্ৰিয়ভাৱে সংগ্ৰহ কৰা কাৰিকৰী আৰু এনালিটিক্স তথ্য এই নীতিত উল্লেখ কৰা উদ্দেশ্যৰ বাবে যিমান প্ৰয়োজন তিমান সময় সামগ্ৰিক ৰূপত সংৰক্ষণ কৰা হয়। বিজ্ঞাপন অংশীদাৰসকলে তেওঁলোকৰ নিজা নীতি অনুসৰি তথ্য সংৰক্ষণ কৰে।</p>

        <h3>৭. তথ্য সুৰক্ষা</h3>
        <p>তথ্য সুৰক্ষিত ৰাখিবলৈ আমি যুক্তিসংগত কাৰিকৰী আৰু সাংগঠনিক ব্যৱস্থা লওঁ, য'ত ৱেবছাইট HTTPS ৰ জৰিয়তে পৰিৱেশন কৰাও অন্তৰ্ভুক্ত। তথাপিও ইণ্টাৰনেটত প্ৰেৰণ বা ইলেক্ট্ৰনিক সংৰক্ষণৰ কোনো পদ্ধতিয়েই সম্পূৰ্ণ নিৰাপদ নহয়, আৰু আমি সম্পূৰ্ণ নিৰাপত্তাৰ নিশ্চয়তা দিব নোৱাৰোঁ।</p>

        <h3>৮. আপোনাৰ অধিকাৰ আৰু বিকল্প</h3>
        <p>আপোনাৰ অৱস্থানৰ ওপৰত নিৰ্ভৰ কৰি আপোনাৰ তলত দিয়া অধিকাৰ থাকিব পাৰে:</p>
        <ul>
          <li>আমাৰ ওচৰত থকা আপোনাৰ ব্যক্তিগত তথ্য চাবলৈ অনুৰোধ কৰা।</li>
          <li>আপোনাৰ ব্যক্তিগত তথ্য শুধৰোৱা বা মচিবলৈ অনুৰোধ কৰা।</li>
          <li>কিছুমান প্ৰক্ৰিয়াৰ বিৰোধিতা বা সীমাবদ্ধতা, আৰু সন্মতিভিত্তিক প্ৰক্ৰিয়াৰ সন্মতি প্ৰত্যাহাৰ।</li>
          <li>ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থকা (ধাৰা ৩ চাওক)।</li>
          <li>আপোনাৰ স্থানীয় তথ্য সুৰক্ষা কৰ্তৃপক্ষৰ ওচৰত অভিযোগ কৰা।</li>
        </ul>
        <p>এই অধিকাৰসমূহ ব্যৱহাৰ কৰিবলৈ <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> লৈ ইমেইল কৰক। আমি যুক্তিসংগত সময়ৰ ভিতৰত উত্তৰ দিম আৰু আপোনাৰ অনুৰোধ যাচাই কৰিবলগীয়া হ'ব পাৰে।</p>

        <h3>৯. শিশুৰ গোপনীয়তা</h3>
        <p>axomexam.in প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰাৰ্থীসকলৰ বাবে। আমি ১৩ বছৰৰ তলৰ (বা আপোনাৰ দেশত প্ৰযোজ্য ন্যূনতম বয়সৰ তলৰ) শিশুৰ পৰা সজ্ঞানে ব্যক্তিগত তথ্য সংগ্ৰহ নকৰোঁ। অভিভাৱকে এনে তথ্য দিয়া হৈছে বুলি ভাবিলে আমাক জনাওক, আমি মচি দিম।</p>

        <h3>১০. তৃতীয় পক্ষৰ লিংক</h3>
        <p>কিছুমান পৃষ্ঠাই চৰকাৰী নিয়োগ প'ৰ্টেল, এপ ষ্ট'ৰ বা প্ৰসংগ উৎসৰ দৰে বাহ্যিক ৱেবছাইটলৈ লিংক দিয়ে। সেই ৱেবছাইটসমূহৰ গোপনীয়তা পদ্ধতি বা সমলৰ বাবে আমি দায়বদ্ধ নহয়, আৰু ব্যৱহাৰ কৰাৰ আগতে তেওঁলোকৰ গোপনীয়তা নীতি পঢ়িবলৈ পৰামৰ্শ দিওঁ।</p>

        <h3>১১. আন্তৰ্জাতিক তথ্য স্থানান্তৰ</h3>
        <p>Google সহ আমাৰ সেৱা প্ৰদানকাৰীসকলে আপোনাৰ দেশৰ বাহিৰে অন্য দেশত তথ্য প্ৰক্ৰিয়া আৰু সংৰক্ষণ কৰিব পাৰে। প্ৰয়োজন হ'লে এনে স্থানান্তৰ তেওঁলোকৰ নিজা গোপনীয়তা নীতিত বৰ্ণনা কৰা উপযুক্ত সুৰক্ষাৰে কৰা হয়।</p>

        <h3>১২. এই নীতিত পৰিৱৰ্তন</h3>
        <p>আমাৰ পদ্ধতি, প্ৰযুক্তি বা আইনী প্ৰয়োজনৰ পৰিৱৰ্তন প্ৰতিফলিত কৰিবলৈ আমি সময়ে সময়ে এই নীতি হালনাগাদ কৰিব পাৰোঁ। শেহতীয়া সংস্কৰণ সদায় এই পৃষ্ঠাত উপলব্ধ থাকিব আৰু তলৰ "শেষ হালনাগাদ" তাৰিখ সংশোধন কৰা হ'ব। পৰিৱৰ্তনৰ পিছত ৱেবছাইট ব্যৱহাৰ কৰি থাকিলে আপুনি হালনাগাদ নীতিত সন্মতি জনোৱা বুলি ধৰা হ'ব।</p>

        <h3>১৩. আমাৰ সৈতে যোগাযোগ</h3>
        <p>এই গোপনীয়তা নীতি বা আপোনাৰ তথ্যৰ বিষয়ে কোনো প্ৰশ্ন, চিন্তা বা অনুৰোধ থাকিলে যোগাযোগ কৰক:</p>
        <ul>
          <li><strong>ইমেইল:</strong> <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a></li>
          <li><strong>যোগাযোগ পৃষ্ঠা:</strong> <a href="/contact/">axomexam.in/contact</a></li>
        </ul>
        <p style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p>This Privacy Policy explains how <strong>axomexam.in</strong> ("we", "us", "our") collects, uses, stores and shares information when you visit or use our website, study material, mock tests, e-books, downloadable PDF notes and our Android app. It also describes the choices you have and how you can control the information connected with your use of the platform.</p>
        <p>By accessing or using axomexam.in you agree to this Privacy Policy. If you do not agree with any part of it, please do not use the website.</p>

        <h3>1. Information We Collect</h3>
        <p><strong>1.1 Information you give us.</strong> You can read, practise and download almost all study material without creating an account. We do not ask for your name, address, date of birth or payment details to access content. Personal information is collected only when you choose to provide it: your name, email address, subject and message through the contact form or email; any name, email and questions you submit through the Submit Q&amp;A form; and the details you provide to support a copyright or takedown request.</p>
        <p><strong>1.2 Information collected automatically.</strong> Like most websites, when you visit axomexam.in our servers and third-party service providers automatically record certain technical information, including IP address, browser type and version, device type and operating system, language, the pages you visit, the date and time of your visit, the time spent and the referring page or link. This information is used in aggregate for security, troubleshooting, performance and usage analysis and does not directly identify you.</p>
        <p><strong>1.3 Preferences stored on your device.</strong> We use your browser's local storage to remember choices such as your selected language (English or Assamese) and light or dark theme. These settings stay on your device and are not used to identify you.</p>

        <h3>2. Cookies and Similar Technologies</h3>
        <p>Cookies are small text files placed on your device by a website. We and our third-party partners use cookies, web beacons, pixels and similar technologies for the purposes described below.</p>
        <ul>
          <li><strong>Strictly necessary / preference cookies:</strong> to keep the site working and remember your theme and language choices.</li>
          <li><strong>Analytics cookies:</strong> to understand how visitors use the site so that we can improve content and speed.</li>
          <li><strong>Advertising cookies:</strong> set by Google and other advertising partners to display and measure advertisements, including personalised advertising.</li>
        </ul>
        <p>You can control or delete cookies through your browser settings. If you disable cookies, some parts of the website (for example theme and language memory) may not work as intended.</p>

        <h3>3. Google AdSense and Third-Party Advertising</h3>
        <p>axomexam.in is supported by advertising so that the study material can remain free. We use <strong>Google AdSense</strong> and may also work with other third-party advertising networks and vendors.</p>
        <ul>
          <li>Third-party vendors, <strong>including Google</strong>, use cookies to serve ads based on your prior visits to this website and/or other websites on the internet.</li>
          <li>Google's use of advertising cookies (including the <strong>DoubleClick DART cookie</strong>) enables Google and its partners to serve ads to you based on your visit to our site and/or other sites on the internet.</li>
          <li>Depending on your region and consent choices, Google may serve either <strong>personalised</strong> or <strong>non-personalised</strong> ads. Non-personalised ads are based on the content of the page rather than your past behaviour.</li>
          <li>Third-party ad networks may collect information directly through their own cookies, web beacons or similar technologies, and their handling of that information is governed by their own privacy policies, not ours.</li>
        </ul>
        <p><strong>How to opt out of personalised advertising:</strong></p>
        <ul>
          <li>Visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener nofollow">Google Ads Settings</a> to opt out of personalised advertising by Google.</li>
          <li>Visit <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener nofollow">www.aboutads.info</a> to opt out of some third-party vendors' use of cookies for personalised advertising.</li>
          <li>If you are in the European Economic Area, the United Kingdom or Switzerland, visit <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener nofollow">www.youronlinechoices.eu</a> to manage your advertising preferences.</li>
          <li>Learn more about how Google uses information from sites that use its services at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener nofollow">policies.google.com/technologies/ads</a>.</li>
        </ul>
        <p>Opting out of personalised advertising does not mean you will stop seeing ads; it means the ads you see may be less relevant to your interests.</p>

        <h3>4. How We Use Information</h3>
        <ul>
          <li>To operate, maintain and improve the website, content and app.</li>
          <li>To respond to your queries, corrections, contributions and takedown requests.</li>
          <li>To display and measure advertising that keeps the platform free.</li>
          <li>To monitor for security incidents, abuse, spam and technical errors.</li>
          <li>To understand which subjects and features are most useful and to plan new content.</li>
          <li>To comply with applicable legal obligations.</li>
        </ul>

        <h3>5. Sharing and Disclosure of Information</h3>
        <p>We do not sell your personal information. We may share information only in the following limited situations:</p>
        <ul>
          <li><strong>Service providers and advertising partners:</strong> such as Google AdSense, hosting, analytics and email providers, who process information on our behalf or as independent controllers under their own policies.</li>
          <li><strong>Legal requirements:</strong> where we are required to disclose information to comply with a law, regulation, legal process or enforceable government request.</li>
          <li><strong>Protection of rights:</strong> where disclosure is necessary to protect our rights, the safety of users or the public, or to investigate fraud or security issues.</li>
          <li><strong>Business transfer:</strong> if the website or its assets are transferred or merged, information may be transferred as part of that transaction.</li>
        </ul>

        <h3>6. Data Retention</h3>
        <p>We keep contact and contribution messages only for as long as needed to respond to and resolve them, and then for a reasonable period for record-keeping. Automatically collected technical and analytics data is retained in aggregate form for as long as necessary for the purposes described in this policy. Advertising partners retain data according to their own retention policies.</p>

        <h3>7. Data Security</h3>
        <p>We take reasonable technical and organisational measures to protect information, including serving the website over HTTPS. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

        <h3>8. Your Rights and Choices</h3>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Request access to the personal information we hold about you.</li>
          <li>Request correction or deletion of your personal information.</li>
          <li>Object to or restrict certain processing, and withdraw consent where processing is based on consent.</li>
          <li>Opt out of personalised advertising (see section 3).</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a>. We will respond within a reasonable period and may need to verify your request.</p>

        <h3>9. Children's Privacy</h3>
        <p>axomexam.in is intended for candidates preparing for competitive examinations. We do not knowingly collect personal information from children under 13 (or the minimum age applicable in your country). If a parent or guardian believes that a child has provided personal information, please contact us and we will delete it.</p>

        <h3>10. Third-Party Links</h3>
        <p>Some pages link to external websites such as official recruitment portals, app stores or reference sources. We are not responsible for the privacy practices or content of those websites, and we encourage you to read their privacy policies before using them.</p>

        <h3>11. International Data Transfers</h3>
        <p>Our service providers, including Google, may process and store information in countries other than your own. Where required, such transfers are carried out using appropriate safeguards as described in the providers' own privacy policies.</p>

        <h3>12. Changes to This Privacy Policy</h3>
        <p>We may update this policy from time to time to reflect changes in our practices, technology or legal requirements. The latest version will always be available on this page, and the "Last updated" date below will be revised. Continued use of the website after changes means you accept the updated policy.</p>

        <h3>13. Contact Us</h3>
        <p>If you have any questions, concerns or requests about this Privacy Policy or your information, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a></li>
          <li><strong>Contact page:</strong> <a href="/contact/">axomexam.in/contact</a></li>
        </ul>
        <p style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "terms") {
      title = isAs ? "নীতি আৰু চৰ্তসমূহ" : "Terms & Conditions";
      desc = isAs ? "axomexam.in ৰ ৱেবছাইট, অধ্যয়ন টোকা, মক টেষ্ট আৰু ডাউনল'ডসমূহ ব্যৱহাৰ কৰাৰ নিয়ম আৰু চৰ্তসমূহ।" : "The rules and conditions for using the axomexam.in website, study notes, mock tests and downloads.";
      content = isAs ? `
        <p>এই ৱেবছাইটত প্ৰৱেশ কৰি ব্ৰাউজ কৰিলে আপুনি তলত উল্লেখ কৰা নীতি আৰু চৰ্তসমূহ মানি লোৱা বুলি ধৰা হয়। এই চৰ্তসমূহে আপুনি সামগ্ৰীৰ সৈতে কি কৰিব পাৰে, ছাইটে কি নিশ্চয়তা দিয়ে আৰু কি নিদিয়ে, আৰু বিজ্ঞাপন তথা বাহ্যিক লিংকৰ সৈতে সম্পৰ্ক কেনেকুৱা তাক ব্যাখ্যা কৰে।</p>

        <h3>১. সামগ্ৰীৰ ব্যৱহাৰ</h3>
        <ul>
          <li>অনুশীলন প্ৰশ্ন, টোকা আৰু মক টেষ্ট নিজৰ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে পঢ়িব আৰু ব্যৱহাৰ কৰিবলৈ বিনামূলীয়া।</li>
          <li>ব্যক্তিগত অধ্যয়নৰ বাবে আপুনি পৃষ্ঠা ছপা বা সংৰক্ষণ কৰিব পাৰে।</li>
          <li>লিখিত অনুমতি অবিহনে সমল অন্য ৱেবছাইট বা এপত পুনৰ প্ৰকাশ কৰা বা বিক্ৰী কৰা নিষিদ্ধ।</li>
          <li>সমলৰ কোনো অংশ পুনৰ লিখি বা সম্পাদনা কৰি নিজৰ নামত প্ৰকাশ কৰা নিষিদ্ধ।</li>
        </ul>

        <h3>২. তথ্যৰ শুদ্ধতা আৰু দায়বদ্ধতা</h3>
        <ul>
          <li>উত্তৰ আৰু ব্যাখ্যা শুদ্ধ ৰাখিবলৈ প্ৰতিটো প্ৰচেষ্টা কৰা হয়, তথাপিও ত্ৰুটি থাকিব পাৰে।</li>
          <li>সামগ্ৰী সাধাৰণ প্ৰস্তুতিৰ বাবে দিয়া হয়, ই কোনো চৰকাৰী প্ৰশ্নকাকত নহয়।</li>
          <li>কোনো প্ৰামাণিক তথ্যৰ বাবে সদায় চৰকাৰী জাননী বা গেজেটৰ ওপৰত নিৰ্ভৰ কৰক।</li>
          <li>সামগ্ৰীৰ ওপৰত ভিত্তি কৰি লোৱা যিকোনো সিদ্ধান্ত আপোনাৰ নিজা বিবেচনাধীন।</li>
        </ul>

        <h3>৩. বিজ্ঞাপন আৰু বাহ্যিক লিংক</h3>
        <ul>
          <li>ছাইটখন বিজ্ঞাপনেৰে চলি থাকে, যিয়ে অধ্যয়ন সামগ্ৰী বিনামূলীয়া ৰাখে।</li>
          <li>বিজ্ঞাপন আৰু সম্পাদকীয় সিদ্ধান্ত সম্পূৰ্ণ পৃথক; কোনো বিজ্ঞাপনদাতাক সমলত স্থান দিয়া নহয়।</li>
          <li>অন্য ৱেবছাইটলৈ লিংক কেৱল সুবিধাৰ বাবে দিয়া হয়; তেওঁলোকৰ সমল বা নীতি axomexam ৰ নিয়ন্ত্ৰণত নাই।</li>
        </ul>

        <h3>৪. প্ৰায়ে সোধা প্ৰশ্ন</h3>
        <p><strong>axomexam ব্যৱহাৰ কৰিবলৈ মই পইচা দিব লাগিব নেকি?</strong> নালাগে। অনুশীলন প্ৰশ্ন, টোকা, মক টেষ্ট আৰু PDF বিনামূলীয়া। ছাইটখন বিজ্ঞাপনেৰে চলি থাকে, যিয়ে সামগ্ৰী বিনামূলীয়া ৰাখে।</p>
        <p><strong>মই মোৰ নিজা ছাইট বা এপত সমল পুনৰ ব্যৱহাৰ কৰিব পাৰিম নেকি?</strong> নিজৰ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে আপুনি পৃষ্ঠা পঢ়িব, ছপা কৰিব আৰু সংৰক্ষণ কৰিব পাৰে। সমল পুনৰ প্ৰকাশ বা বিক্ৰী কৰিবলৈ প্ৰথমে লিখিত অনুমতি লাগে।</p>
        <p><strong>একাউণ্ট লাগে নেকি?</strong> ছাইটৰ কোনো অংশৰ বাবেই একাউণ্ট নালাগে। ছাইন আপ বা লগইন কৰিবলৈ একো নাই।</p>
        <p><strong>ভুল পালে মই কি কৰিম?</strong> পৃষ্ঠাৰ লিংক আৰু সংশোধন <a href="/submit/">প্ৰশ্ন আগবঢ়াওক</a> পৃষ্ঠাৰ জৰিয়তে পঠিয়াওক। সংশোধনসমূহ যাচাই কৰি নিশ্চিত হ'লে প্ৰয়োগ কৰা হয়।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p>By accessing and browsing <strong>axomexam.in</strong>, you accept and agree to the following Terms and Conditions. These terms explain what you may do with the material and what the site does and does not promise.</p>

        <h3>1. Content Usage</h3>
        <ul>
          <li>Practice questions, notes and mock tests are free to read and use for your own exam preparation.</li>
          <li>You may print or save pages for personal study.</li>
          <li>Republishing the content on another website or app, or selling it, is not allowed without written permission.</li>
        </ul>

        <h3>2. Accuracy &amp; Liability</h3>
        <ul>
          <li>Every effort is made to keep answers and explanations correct, but errors can still occur.</li>
          <li>The material is provided for general preparation and is not an official question paper.</li>
          <li>For anything authoritative, always rely on the official notification or gazette.</li>
        </ul>

        <h3>3. Advertising and Links</h3>
        <ul>
          <li>The site is supported by advertising, which keeps the material free.</li>
          <li>Links to other websites are provided for convenience; their content is not controlled by axomexam.</li>
        </ul>

        <h3>4. Frequently Asked Questions</h3>
        <p><strong>Do I have to pay to use axomexam?</strong> No. The practice questions, notes, mock tests and PDFs are free. The site is supported by advertising, which is what keeps the material free.</p>
        <p><strong>Can I reuse the content on my own site or app?</strong> You may read, print and save pages for your own exam preparation. Republishing or selling the content needs written permission first.</p>
        <p><strong>Do I need an account?</strong> No account is needed for any part of the site. There is nothing to sign up for and no login.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "disclaimer") {
      title = isAs ? "দায়মুক্তি" : "Disclaimer";
      desc = isAs ? "axomexam.in ৰ সীমা, চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা আৰু অধ্যয়ন সামগ্ৰী ব্যৱহাৰৰ চৰ্তসমূহ।" : "The scope of axomexam.in, its non-affiliation with government bodies, and the terms on which its study material is used.";
      content = isAs ? `
        <p><strong>https://axomexam.in</strong> ত প্ৰকাশিত সকলো সমল আৰু প্ৰশ্ন-সংগ্ৰহ সৎ বিশ্বাসেৰে আৰু কেৱল সাধাৰণ শিক্ষা, একাডেমিক আৰু প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতিৰ উদ্দেশ্যত প্ৰকাশ কৰা হৈছে। তলৰ দায়মুক্তিয়ে ইয়াত প্ৰকাশিত সামগ্ৰীৰ সীমা স্পষ্ট কৰে।</p>

        <h3>১. চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা</h3>
        <p>axomexam.in এক স্বতন্ত্ৰ ব্যক্তিগত শিক্ষামূলক ৱেবছাইট। ই অসম চৰকাৰ, APSC, SLPRB, ৰাজ্যিক নিয়োগ পৰিষদ বা কোনো চৰকাৰী পৰীক্ষা সংস্থাৰ সৈতে সংযুক্ত, পৃষ্ঠপোষিত বা অনুমোদিত <strong>নহয়</strong>। পৰীক্ষাৰ্থীসকলে সদায় চৰকাৰী নিয়োগ গেজেটৰ সৈতে মিলাই পৰীক্ষা কৰিব লাগে।</p>

        <h3>২. শিক্ষামূলক ব্যৱহাৰ</h3>
        <ul>
          <li>অনুশীলন প্ৰশ্ন আৰু টোকা কেৱল সাধাৰণ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে প্ৰকাশ কৰা হয়।</li>
          <li>এইবোৰ চৰকাৰী প্ৰশ্নকাকত নহয় আৰু পৰীক্ষাত অহাৰ কোনো নিশ্চয়তা নাই।</li>
          <li>পৰীক্ষাৰ ধৰণ বা পাঠ্যক্ৰম সলনি হ'লে পুৰণি তথ্য ভুল হ'ব পাৰে।</li>
          <li>কোনো প্ৰামাণিক তথ্যৰ বাবে সদায় চৰকাৰী জাননী বা গেজেট চাওক।</li>
        </ul>

        <h3>৩. তথ্যৰ শুদ্ধতা আৰু সীমাবদ্ধতা</h3>
        <ul>
          <li>প্ৰকাশৰ আগতে সমল মানক প্ৰসংগ সামগ্ৰীৰ সৈতে মিলাই পৰীক্ষা কৰা হয়।</li>
          <li>তথাপিও ত্ৰুটি থাকিব পাৰে; সংশোধন <a href="/submit/">প্ৰশ্ন আগবঢ়াওক</a> পৃষ্ঠাৰ জৰিয়তে পঠিয়াব পাৰে।</li>
          <li>অধ্যয়ন সামগ্ৰী আৰু মক অনুশীলনৰ ব্যৱহাৰ আপোনাৰ নিজা বিবেচনাধীন।</li>
        </ul>

        <h3>৪. প্ৰায়ে সোধা প্ৰশ্ন</h3>
        <p><strong>axomexam এখন চৰকাৰী ৱেবছাইট নেকি?</strong> নহয়। axomexam এখন স্বতন্ত্ৰ অধ্যয়ন ছাইট। ই অসম চৰকাৰ, APSC, SLPRB বা কোনো নিয়োগ পৰিষদৰ সৈতে সংযুক্ত বা অনুমোদিত নহয়।</p>
        <p><strong>অনুশীলন প্ৰশ্নবোৰ চৰকাৰী প্ৰশ্নকাকত নেকি?</strong> নহয়। এইবোৰ অনুশীলনৰ বাবে লিখা আৰু চৰকাৰী প্ৰশ্নকাকত নহয়। প্ৰামাণিক তথ্যৰ বাবে সদায় চৰকাৰী জাননী বা গেজেট চাওক।</p>
        <p><strong>ভুল পালে মই কি কৰিম?</strong> পৃষ্ঠাৰ লিংক আৰু সংশোধন <a href="/submit/">প্ৰশ্ন আগবঢ়াওক</a> পৃষ্ঠাৰ জৰিয়তে পঠিয়াওক। জনোৱা সংশোধনসমূহ মানক প্ৰসংগৰ সৈতে মিলাই যাচাই কৰি নিশ্চিত হ'লে প্ৰয়োগ কৰা হয়।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p>All content and question banks on <strong>https://axomexam.in</strong> are published in good faith and solely for general educational and competitive examination preparation purposes.</p>

        <h3>1. Non-Affiliation with Government Authorities</h3>
        <p>axomexam.in is an independent private educational website. It is <strong>NOT</strong> affiliated with, sponsored by, or endorsed by the Government of Assam, APSC, SLPRB, State Recruitment Boards, or any governmental testing agency. Candidates must always cross-reference with official state recruitment gazettes.</p>

        <h3>2. Educational Use</h3>
        <ul>
          <li>Practice questions and notes are published for general exam preparation only.</li>
          <li>They are not official question papers and carry no guarantee of appearing in an exam.</li>
          <li>For anything authoritative, always check the official notification or gazette.</li>
          <li>Use of the study material and mock practice is at your own discretion.</li>
        </ul>

        <h3>3. Frequently Asked Questions</h3>
        <p><strong>Is axomexam an official government website?</strong> No. axomexam is an independent study site. It is not run by, connected to, or endorsed by the Government of Assam, APSC, SLPRB or any recruitment board.</p>
        <p><strong>Are the practice questions official question papers?</strong> No. They are written for practice and are not official papers. For anything authoritative, always check the official notification or gazette.</p>
        <p><strong>What should I do if I find a mistake?</strong> Send the page link and the correction through the <a href="/submit/">Submit Q&amp;A</a> page. Reported corrections are checked against standard reference material and applied once confirmed.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "editorial-policy") {
      title = isAs ? "সম্পাদকীয় নীতি" : "Editorial Policy";
      desc = isAs ? "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে axomexam.in ৰ দ্বিভাষিক অধ্যয়ন সামগ্ৰী কেনেদৰে পৰিকল্পনা, লিখন, তথ্য-যাচাই, পৰ্যালোচনা আৰু সংশোধন কৰা হয়।" : "How axomexam.in plans, writes, fact-checks, reviews and corrects its bilingual study material for Assam competitive examinations.";
      content = isAs ? `
        <p><strong>axomexam.in</strong> এ অসম ৰাজ্যিক নিযুক্তি পৰীক্ষা আৰু অসমত জনপ্ৰিয় কেন্দ্ৰীয় পৰীক্ষাসমূহৰ বাবে বিনামূলীয়া দ্বিভাষিক অধ্যয়ন সামগ্ৰী প্ৰকাশ কৰে। এই পৃষ্ঠাই ব্যাখ্যা কৰে যে সামগ্ৰী কেৱে প্ৰস্তুত কৰে, কেনেদৰে পৰীক্ষা কৰা হয়, কি উৎস ব্যৱহাৰ কৰা হয়, ভুল কেনেদৰে সংশোধন কৰা হয়, আৰু বিজ্ঞাপনক সম্পাদকীয় সিদ্ধান্তৰ পৰা কেনেদৰে পৃথক ৰখা হয়। এই নীতি এই ৱেবছাইটত প্ৰকাশিত প্ৰতিটো প্ৰশ্ন-সংগ্ৰহ, মক টেষ্ট, বিগত বৰ্ষৰ প্ৰশ্নকাকত, ই-বুক, PDF নোট আৰু প্ৰবন্ধৰ ক্ষেত্ৰত প্ৰযোজ্য।</p>

        <h2>সামগ্ৰী কেৱে প্ৰস্তুত কৰে</h2>
        <p>সামগ্ৰী <a href="/editorial-team/">axomexam সম্পাদকীয় দল</a>এ পৰিকল্পনা আৰু পৰ্যালোচনা কৰে, যিয়ে কেৱল এই মঞ্চৰ অধ্যয়ন সামগ্ৰীত কাম কৰে। প্ৰকাশৰ আগতে প্ৰতিটো পৃষ্ঠা এজন বিষয়-পৰ্যালোচকে আৰু অসমীয়া পাঠৰ বাবে এজন ভাষা-পৰ্যালোচকে পৰীক্ষা কৰে। কোনো কোচিং প্ৰতিষ্ঠান, প্ৰকাশক বা পৰীক্ষা প'ৰ্টেলৰ সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বিনিময়ত আমি ধন লোৱা নাই, আৰু কোনো পৃষ্ঠপোষকতা কৰা পৃষ্ঠাক অধ্যয়ন সামগ্ৰী হিচাপে উপস্থাপন কৰা নহয়।</p>

        <h2>এখন পৃষ্ঠা কেনেদৰে সৃষ্টি কৰা হয়</h2>
        <ol>
          <li><strong>পাঠ্যক্ৰমৰ মিল।</strong> প্ৰতিটো শিতান প্ৰথমে সংশ্লিষ্ট পৰীক্ষাৰ চৰকাৰী পাঠ্যক্ৰম বা জাননীৰ সৈতে মিলাই লোৱা হয়, যাতে পৃষ্ঠাত থকা বিষয়বোৰ প্ৰকৃততে প্ৰশ্নকাকতত অহা বিষয় হয়।</li>
          <li><strong>খচৰা প্ৰস্তুত।</strong> প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা সহজ ভাষাত লিখা হয়। সংখ্যাগত বা যুক্তিৰ প্ৰশ্নত কেৱল চূড়ান্ত উত্তৰ নহয়, কামৰ ধাপবোৰো দেখুওৱা হয়। ইংৰাজী আৰু অসমীয়া সংস্কৰণ একেলগে প্ৰস্তুত কৰা হয় যাতে দুয়োটা সংস্কৰণে একে সামগ্ৰী সামৰি লয়।</li>
          <li><strong>তথ্য-যাচাই।</strong> তথ্য, তাৰিখ, নাম আৰু সংখ্যাগত উত্তৰ চৰকাৰী জাননী আৰু চৰকাৰী প'ৰ্টেল, ৰাজহুৱা বিগত বৰ্ষৰ প্ৰশ্নকাকত, আৰু মানক বিদ্যালয় বা প্ৰসংগ সামগ্ৰীৰ সৈতে মিলাই পৰীক্ষা কৰা হয়। যি তথ্য যাচাই কৰিব নোৱাৰি, তাক সত্য হিচাপে প্ৰকাশ কৰা নহয়।</li>
          <li><strong>ভাষা পৰ্যালোচনা।</strong> অসমীয়া সংস্কৰণ শুদ্ধ পাৰিভাষিক শব্দ, বানান আৰু স্বাভাৱিক প্ৰয়োগৰ বাবে পঢ়া হয়, কেৱল শব্দে শব্দে অনুবাদ নহয়। কাৰিকৰী শব্দবোৰ অসমীয়া প্ৰশ্নকাকতত ব্যৱহৃত ৰূপতেই ৰখা হয়।</li>
          <li><strong>প্ৰকাশ আৰু পুনৰ পৰ্যালোচনা।</strong> প্ৰতিটো পৃষ্ঠাত প্ৰকাশৰ তাৰিখ আৰু শেষ হালনাগাদৰ তাৰিখ থাকে। পাঠ্যক্ৰম, পৰীক্ষাৰ আৰ্হি বা চৰকাৰী জাননী সলনি হ'লে সামগ্ৰী পুনৰ পৰ্যালোচনা কৰা হয়।</li>
        </ol>

        <h2>আমি ব্যৱহাৰ কৰা উৎস</h2>
        <p>আমি প্ৰাথমিক আৰু ৰাজহুৱাভাৱে উপলব্ধ সামগ্ৰীৰ ওপৰত নিৰ্ভৰ কৰোঁ: চৰকাৰী নিযুক্তি জাননী আৰু সংশোধনী, চৰকাৰী পৰীক্ষা প'ৰ্টেল, ৰাজহুৱা বিগত বৰ্ষৰ প্ৰশ্নকাকত, আৰু মানক বিদ্যালয়-স্তৰৰ পাঠ্যপুথি। আমি অনুসৰণ কৰা চৰকাৰী প'ৰ্টেলৰ তালিকা <a href="/sources/">চৰকাৰী উৎস পৃষ্ঠা</a>ত ৰখা হৈছে।</p>
        <p>আমি বাণিজ্যিক পুথিৰ অধ্যায়, প্ৰশ্ন-সংগ্ৰহ বা ব্যাখ্যামূলক পাঠ পুনৰুত্পাদন নকৰোঁ। যি বিষয় সাধাৰণতে এটা নিৰ্দিষ্ট ধৰণে ব্যাখ্যা কৰা হয়, আমি নিজৰ ব্যাখ্যা লিখি পাঠ্যক্ৰম আৰু ৰাজহুৱা সামগ্ৰীৰ সৈতে মিলাই পৰীক্ষা কৰোঁ। তৃতীয় পক্ষৰ প্ৰকাশনৰ উল্লেখ আমাৰ নিজৰ যাচাইৰ বিকল্প নহয়।</p>

        <h2>AI সহায়ক সঁজুলিৰ ব্যৱহাৰ</h2>
        <p>অন্যান্য আধুনিক প্ৰকাশকৰ দৰেই আমি পাঠ খচৰা, সজ্জিত কৰা আৰু অনুবাদ কৰাত সহায় কৰিবলৈ ছফ্টৱেৰ, যাৰ ভিতৰত AI ভাষা সঁজুলিও আছে, ব্যৱহাৰ কৰোঁ। এই সঁজুলিবোৰ কেৱল খচৰা সহায়ক হিচাপেহে ব্যৱহাৰ কৰা হয়। প্ৰতিটো প্ৰকাশিত পৃষ্ঠা লাইভ হোৱাৰ আগতে এজন ব্যক্তিয়ে পৰ্যালোচনা কৰে, তথ্য ওপৰত বৰ্ণনা কৰা উৎসৰ সৈতে যাচাই কৰা হয়, আৰু প্ৰকাশিত সমলৰ দায়িত্ব সম্পাদকীয় দলৰ। আমি পৰ্যালোচনা নকৰা যন্ত্ৰ-আউটপুট স্বয়ংক্ৰিয়ভাৱে প্ৰকাশ নকৰোঁ, আৰু পৰীক্ষাৰ জাননী, তাৰিখ বা ফলাফল সৃষ্টি কৰিবলৈ AI সঁজুলি ব্যৱহাৰ নকৰোঁ।</p>

        <h2>শুদ্ধতা, সংশোধন আৰু হালনাগাদ</h2>
        <p>পৰীক্ষাৰ বিৱৰণ সঘনাই সলনি হয়। যদি আপুনি ভুল উত্তৰ, পুৰণি তথ্য, ভাঙা লিংক বা অনুবাদৰ ভুল পায়, তেন্তে পৃষ্ঠাৰ ঠিকনা আৰু শুদ্ধ তথ্যসহ <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> লৈ লিখক। আমি প্ৰতিটো অভিযোগ উৎসৰ সৈতে যাচাই কৰি পৃষ্ঠা সলনি কৰোঁ, আৰু দুই-তিনি কৰ্মদিৱসৰ ভিতৰত উত্তৰ দিবলৈ চেষ্টা কৰোঁ। সংশোধন লাইভ পৃষ্ঠাত কৰা হয় আৰু শেষ হালনাগাদৰ তাৰিখ সলনি কৰা হয়। প্ৰধান পৰিৱৰ্তনৰ ৰেকৰ্ড <a href="/updates/">সমল হালনাগাদ পৃষ্ঠা</a>ত ৰখা হয়।</p>
        <p>axomexam.in এখন স্বতন্ত্ৰ অধ্যয়ন সহায়িকা। ই চৰকাৰী প'ৰ্টেল নহয় আৰু কোনো নিযুক্তি ব'ৰ্ডক প্ৰতিনিধিত্ব নকৰে। আবেদন কৰাৰ আগতে যোগ্যতা, তাৰিখ আৰু পৰীক্ষাৰ আৰ্হি চৰকাৰী জাননীৰ পৰা সদায় নিশ্চিত কৰক।</p>

        <h2>বিজ্ঞাপন আৰু সম্পাদকীয় স্বাধীনতা</h2>
        <p>ৱেবছাইটটো ব্যৱহাৰ কৰিবলৈ বিনামূলীয়া আৰু বিজ্ঞাপনৰ দ্বাৰা সমৰ্থিত। বিজ্ঞাপন তৃতীয় পক্ষৰ নেটৱৰ্কে পৰিবেশন কৰে আৰু সম্পাদকীয় সমলৰ পৰা স্পষ্টভাৱে পৃথক থাকে। বিজ্ঞাপনদাতাই অধ্যয়ন সামগ্ৰী পৰ্যালোচনা, অনুমোদন বা প্ৰভাৱিত নকৰে, আৰু বিজ্ঞাপনৰ উপস্থিতি বিজ্ঞাপিত সামগ্ৰীৰ অনুমোদন নহয়।</p>
        <p>আমি ভুল পৃষ্ঠা, ৰিডাইৰেক্ট পৃষ্ঠা, সন্ধান ফলাফল বা অধ্যয়ন সামগ্ৰী নথকা অন্য স্ক্ৰীনত বিজ্ঞাপন নৰখোঁ। বিজ্ঞাপন থকা পৃষ্ঠাত ওপৰত বৰ্ণনা কৰা সম্পূৰ্ণ বিষয়বস্তু থাকে, কেৱল বিজ্ঞাপন দেখুওৱাৰ বাবে লিখা সাৰাংশ নহয়।</p>

        <h2>যোগাযোগ</h2>
        <p>এই নীতিৰ বিষয়ে প্ৰশ্ন, সংশোধনৰ অনুৰোধ আৰু অৱদান <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> লৈ বা <a href="/contact/">যোগাযোগ পৃষ্ঠা</a>ৰ জৰিয়তে পঠিয়াব পাৰে।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p><strong>axomexam.in</strong> publishes free bilingual study material for Assam state recruitment examinations and for central examinations that are popular in Assam. This page explains who prepares that material, how it is checked, which sources are used, how errors are corrected, and how advertising is kept separate from editorial decisions. It applies to every question bank, mock test, previous year paper, e-book, PDF note and article published on this website.</p>

        <h2>Who prepares the content</h2>
        <p>Content is planned and reviewed by the <a href="/editorial-team/">Axomexam Editorial Team</a>, which works only on study material for this platform. Every page is checked by a subject reviewer and, for Assamese text, by a language reviewer before it is published. We do not accept payment from coaching institutes, publishers or exam portals in exchange for including their material, and no sponsored page is presented as study content.</p>

        <h2>How a page is created</h2>
        <ol>
          <li><strong>Syllabus mapping.</strong> Each section is first matched to the official syllabus or notification of the examination it supports, so that the topics on the page are the topics that the paper actually tests.</li>
          <li><strong>Drafting.</strong> Questions, answers and explanations are written in plain language. Wherever a numerical or reasoning question needs working, the steps are shown instead of only the final answer. English and Assamese versions are prepared together so that the two versions cover the same material.</li>
          <li><strong>Fact-checking.</strong> Facts, dates, names and numerical answers are cross-checked against official notifications and government portals, public previous year question papers, and standard school or reference material. A statement that cannot be verified is not published as fact.</li>
          <li><strong>Language review.</strong> The Assamese version is read for correct terminology, spelling and natural usage, not merely translated word for word. Technical terms are kept in the form used in Assamese exam papers.</li>
          <li><strong>Publishing and review.</strong> Each page carries a published date and a last-updated date. Content is reviewed again when a syllabus, exam pattern or official notification changes.</li>
        </ol>

        <h2>Sources we use</h2>
        <p>We rely on primary and publicly available material: official recruitment notifications and corrigenda, official exam portals, public previous year question papers, and standard school-level textbooks. A list of the official portals we monitor is maintained on the <a href="/sources/">official sources page</a>.</p>
        <p>We do not reproduce chapters, question banks or explanatory text from commercial books. Where a topic is commonly explained in a particular way, we write our own explanation and check it against the syllabus and public material. References to third-party publications are not used as a substitute for our own verification.</p>

        <h2>Use of AI-assisted tools</h2>
        <p>Like many modern publishers, we use software, including AI language tools, to help draft, format and translate text. These tools are used as drafting aids only. Every published page is reviewed by a person before it goes live, facts are checked against the sources described above, and the editorial team is responsible for what is published. We do not auto-publish unreviewed machine output, and we do not use AI tools to invent exam notifications, dates or results.</p>

        <h2>Accuracy, corrections and updates</h2>
        <p>Examination details change often. If you find a wrong answer, an outdated fact, a broken link or a translation error, write to <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> with the page address and the correct information. We verify every report against a source before changing a page, and we aim to reply within two to three working days. Corrections are made on the live page and the last-updated date is changed. A record of major changes is kept on the <a href="/updates/">content updates page</a>.</p>
        <p>axomexam.in is an independent study aid. It is not a government portal and does not represent any recruitment board. Always confirm eligibility, dates and the exam pattern from the official notification before applying.</p>

        <h2>Advertising and editorial independence</h2>
        <p>The website is free to use and is supported by advertising. Advertising is served by third-party networks and is clearly distinguishable from editorial content. Advertisers do not review, approve or influence study material, and the presence of an advertisement is not an endorsement of the advertised product.</p>
        <p>We do not place advertising on error pages, redirect pages, search results or other screens that contain no study content. Pages that carry advertising contain the full topic material described above, not a summary written only to host ads.</p>

        <h2>Contact</h2>
        <p>Questions about this policy, correction requests and contributions can be sent to <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> or through the <a href="/contact/">contact page</a>.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "editorial-team") {
      title = isAs ? "সম্পাদকীয় দল" : "Editorial Team";
      desc = isAs ? "axomexam সম্পাদকীয় দল: axomexam.in ত প্ৰকাশিত দ্বিভাষিক অধ্যয়ন সামগ্ৰী কেৱে পৰিকল্পনা, লিখন, তথ্য-যাচাই আৰু পৰ্যালোচনা কৰে।" : "The Axomexam Editorial Team: who plans, writes, fact-checks and reviews the bilingual study material published on axomexam.in.";
      content = isAs ? `
        <p>axomexam.in ৰ প্ৰতিটো পৃষ্ঠা axomexam সম্পাদকীয় দলে প্ৰস্তুত আৰু পৰীক্ষা কৰে। দলটো সৰু আৰু কেৱল এই মঞ্চৰ অধ্যয়ন সামগ্ৰীত কাম কৰে। এই পৃষ্ঠাই জড়িত ভূমিকা, পৰ্যালোচনাৰ কাৰ্যপ্ৰবাহ, আৰু প্ৰতিজন অৱদানকাৰীয়ে মানি চলিবলগীয়া মানদণ্ড ব্যাখ্যা কৰে।</p>

        <h2>সম্পাদকীয় দলৰ ভূমিকা</h2>
        <ul>
          <li><strong>সমল পৰিকল্পনা আৰু পাঠ্যক্ৰমৰ মিল।</strong> চৰকাৰী জাননী আৰু পাঠ্যক্ৰম অনুসৰণ কৰে, কোন বিষয় কোন পৰীক্ষাৰ শিতানত পৰে নিৰ্ধাৰণ কৰে, আৰু পাঠ্যক্ৰমৰ পৰা বাদ পৰা সামগ্ৰী আঁতৰায়।</li>
          <li><strong>বিষয় লেখক।</strong> সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী, কম্পিউটাৰ সজাগতা আৰু চলিত ঘটনাৱলীত প্ৰশ্ন, উত্তৰ আৰু ধাপে ধাপে ব্যাখ্যা প্ৰস্তুত কৰে।</li>
          <li><strong>অসমীয়া ভাষা পৰ্যালোচক।</strong> অসমীয়া সংস্কৰণৰ শুদ্ধ পাৰিভাষিক শব্দ, বানান আৰু স্বাভাৱিক প্ৰয়োগ পৰীক্ষা কৰে, আৰু ইয়াৰ পৰিসৰ ইংৰাজী সংস্কৰণৰ সৈতে মিলে নে নাই নিশ্চিত কৰে।</li>
          <li><strong>তথ্য-যাচাই আৰু গুণগত পৰ্যালোচনা।</strong> প্ৰকাশৰ আগতে তথ্য, তাৰিখ, নাম আৰু সংখ্যাগত উত্তৰ চৰকাৰী জাননী, ৰাজহুৱা প্ৰশ্নকাকত আৰু মানক প্ৰসংগ সামগ্ৰীৰ সৈতে যাচাই কৰে।</li>
          <li><strong>কাৰিকৰী পৰ্যালোচনা।</strong> পৃষ্ঠাৰ গাঁথনি, ম'বাইলত পঢ়নক্ষমতা, সন্ধান, ডাউনল'ডযোগ্য ফাইল আৰু প্ৰকাশিত পৃষ্ঠাৰ অভিগম্যতা পৰীক্ষা কৰে।</li>
        </ul>

        <h2>এখন পৃষ্ঠা কেনেদৰে পৰ্যালোচনা কৰা হয়</h2>
        <ol>
          <li>বিষয়টো চৰকাৰী পাঠ্যক্ৰম বা জাননীৰ সৈতে মিলাই লোৱা হয়।</li>
          <li>উত্তৰ আৰু ব্যাখ্যাসহ ইংৰাজী আৰু অসমীয়াত খচৰা লিখা হয়।</li>
          <li>দ্বিতীয় এজন পৰ্যালোচকে তথ্য আৰু প্ৰতিটো সংখ্যাগত বা যুক্তিৰ প্ৰশ্নৰ কাম পৰীক্ষা কৰে।</li>
          <li>অসমীয়া পাঠৰ ভাষাৰ গুণ পৰ্যালোচনা কৰা হয়।</li>
          <li>প্ৰকাশৰ তাৰিখ আৰু শেষ হালনাগাদৰ তাৰিখসহ পৃষ্ঠা প্ৰকাশ কৰা হয়, আৰু পৰীক্ষাৰ আৰ্হি সলনি হ'লে পুনৰ পৰ্যালোচনা কৰা হয়।</li>
        </ol>
        <p>AI সহায়ক খচৰাৰ নীতিকে ধৰি সম্পূৰ্ণ প্ৰক্ৰিয়া <a href="/editorial-policy/">সম্পাদকীয় নীতি</a>ত বৰ্ণনা কৰা হৈছে।</p>

        <h2>প্ৰতিজন অৱদানকাৰীয়ে মানি চলা মানদণ্ড</h2>
        <ul>
          <li>মৌলিক ব্যাখ্যা লিখক; বাণিজ্যিক পুথি বা অন্য ৱেবছাইটৰ পাঠ, প্ৰশ্ন বা নোট কপি নকৰিব।</li>
          <li>তথ্য চৰকাৰী বা ৰাজহুৱা উৎসৰ সৈতে যাচাই কৰক আৰু অযাচিত দাবীক সত্য হিচাপে উপস্থাপন নকৰিব।</li>
          <li>সংখ্যাগত আৰু যুক্তিৰ প্ৰশ্নত কেৱল উত্তৰ নহয়, কামৰ ধাপো দেখুওৱাক।</li>
          <li>ইংৰাজী আৰু অসমীয়া সংস্কৰণৰ পৰিসৰ আৰু কাঠিন্য সমান ৰাখক।</li>
          <li>জনোৱা ভুলসমূহ সময়মতে সংশোধন কৰক আৰু পৰিৱৰ্তন লিপিবদ্ধ কৰক।</li>
          <li>বিজ্ঞাপন আৰু সম্পাদকীয় সিদ্ধান্ত পৃথক ৰাখক।</li>
        </ul>

        <h2>স্বাধীনতা আৰু পুঁজি</h2>
        <p>axomexam.in স্বাধীনভাৱে পৰিচালিত আৰু ব্যৱহাৰ কৰিবলৈ বিনামূলীয়া। ই বিজ্ঞাপনৰ দ্বাৰা পুঁজিৰ যোগান ধৰে আৰু নিজৰ অধ্যয়ন সামগ্ৰীত কোনো পৰীক্ষা, কোচিং প্ৰতিষ্ঠান, পুথি বা সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বাবে ধন লোৱা নাই। দলৰ সদস্যসকলে পৃষ্ঠপোষকতা কৰা সামগ্ৰী সম্পাদকীয় সমল হিচাপে প্ৰকাশ নকৰে।</p>

        <h2>অৱদান আৰু সংশোধন</h2>
        <p>শিক্ষক, বিষয় বিশেষজ্ঞ আৰু ভুল ধৰা পেলোৱা পৰীক্ষাৰ্থীসকলক <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> লৈ লিখিবলৈ আমন্ত্ৰণ জনাইছোঁ। সোনকালে যাচাই কৰিব পৰাকৈ পৃষ্ঠাৰ ঠিকনা আৰু সংশোধনৰ উৎস অন্তৰ্ভুক্ত কৰিব। আপুনি <a href="/contact/">যোগাযোগ পৃষ্ঠা</a>ও ব্যৱহাৰ কৰিব পাৰে।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p>Every page on axomexam.in is produced and checked by the Axomexam Editorial Team. The team is small and works only on study material for this platform. This page explains the roles involved, the review workflow, and the standards every contributor agrees to follow.</p>

        <h2>Roles in the editorial team</h2>
        <ul>
          <li><strong>Content planning and syllabus mapping.</strong> Tracks official notifications and syllabi, decides which topics belong to which exam section, and retires material that is no longer part of the syllabus.</li>
          <li><strong>Subject writers.</strong> Prepare questions, answers and step-by-step explanations in General Knowledge, Mathematics, General Science, Reasoning, General English, Computer Awareness and current affairs.</li>
          <li><strong>Assamese language reviewer.</strong> Checks the Assamese version for correct terminology, spelling and natural usage, and makes sure it matches the English version in scope.</li>
          <li><strong>Fact-check and quality review.</strong> Verifies facts, dates, names and numerical answers against official notifications, public question papers and standard reference material before publishing.</li>
          <li><strong>Technical review.</strong> Checks page structure, mobile readability, search, downloadable files and accessibility of the published page.</li>
        </ul>

        <h2>How a page is reviewed</h2>
        <ol>
          <li>The topic is matched to the official syllabus or notification.</li>
          <li>A draft is written in English and Assamese with answers and explanations.</li>
          <li>A second reviewer checks the facts and the working of every numerical or reasoning question.</li>
          <li>The Assamese text is reviewed for language quality.</li>
          <li>The page is published with a published date and a last-updated date, and is revisited when the exam pattern changes.</li>
        </ol>
        <p>The full process, including our policy on AI-assisted drafting, is described in the <a href="/editorial-policy/">editorial policy</a>.</p>

        <h2>Standards every contributor follows</h2>
        <ul>
          <li>Write original explanations; do not copy text, questions or notes from commercial books or other websites.</li>
          <li>Check facts against official or public sources and do not present an unverified claim as fact.</li>
          <li>Show the working for numerical and reasoning questions, not only the answer.</li>
          <li>Keep the English and Assamese versions equivalent in coverage and difficulty.</li>
          <li>Correct reported errors promptly and record the change.</li>
          <li>Keep advertising and editorial decisions separate.</li>
        </ul>

        <h2>Independence and funding</h2>
        <p>axomexam.in is independently run and free to use. It is funded by advertising and does not accept payment for including any exam, coaching institute, book or product in its study material. Team members do not publish sponsored material as editorial content.</p>

        <h2>Contributions and corrections</h2>
        <p>Teachers, subject experts and candidates who spot an error are welcome to write to <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a>. Please include the page address and the source for the correction so that it can be verified quickly. You can also use the <a href="/contact/">contact page</a>.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "sources") {
      title = isAs ? "চৰকাৰী উৎস আৰু তথ্যসূত্ৰ" : "Official Sources & References";
      desc = isAs ? "axomexam.in ৰ অধ্যয়ন সামগ্ৰী প্ৰস্তুত আৰু যাচাই কৰিবলৈ ব্যৱহৃত চৰকাৰী পৰীক্ষা প'ৰ্টেল, জাননী যাচাই আৰু প্ৰসংগ সামগ্ৰী।" : "Official exam portals, notification checks and reference material used to prepare and verify study content on axomexam.in.";
      content = isAs ? `
        <p>অধ্যয়ন সামগ্ৰী তেতিয়াহে উপযোগী হয় যেতিয়া ই চৰকাৰী পৰীক্ষাৰ সৈতে মিলে। এই পৃষ্ঠাই আমি অনুসৰণ কৰা চৰকাৰী প'ৰ্টেলৰ তালিকা দিয়ে আৰু axomexam.in ৰ সমলত প্ৰভাৱ পেলোৱাৰ আগতে এখন জাননী কেনেদৰে যাচাই কৰা হয় তাক ব্যাখ্যা কৰে। আমি এখন স্বতন্ত্ৰ ৱেবছাইট আৰু এই কোনো সংস্থাৰ সৈতে সংযুক্ত নহয়।</p>

        <h2>চৰকাৰী পৰীক্ষা প'ৰ্টেল</h2>
        <div class="axo-sources-table-wrap" style="overflow-x:auto;">
          <table class="axo-sources-table" style="width:100%; border-collapse:collapse; font-size:0.95rem;">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">পৰীক্ষা সংস্থা</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">তাত কি চাব</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">চৰকাৰী প'ৰ্টেল</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLPRB অসম</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">অসম আৰক্ষী কনিষ্টবল আৰু উপ-পৰিদৰ্শকৰ জাননী, পাঠ্যক্ৰম, প্ৰৱেশপত্ৰ আৰু ফলাফল</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slprbassam.in/" rel="noopener nofollow" target="_blank">slprbassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLRC অসম</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">ADRE তৃতীয় আৰু চতুৰ্থ শ্ৰেণীৰ জাননী, পৰীক্ষাৰ আৰ্হি আৰু ফলাফল</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slrcassam.in/" rel="noopener nofollow" target="_blank">slrcassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">APSC</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">সংযুক্ত প্ৰতিযোগিতামূলক পৰীক্ষা আৰু আয়োগৰ অন্যান্য পৰীক্ষা</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://apsc.nic.in/" rel="noopener nofollow" target="_blank">apsc.nic.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">কৰ্মচাৰী নিৰ্বাচন আয়োগ</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">CGL, CHSL, GD, MTS আৰু অন্যান্য কেন্দ্ৰীয় জাননী আৰু উত্তৰ-কুঞ্জিকা</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://ssc.gov.in/" rel="noopener nofollow" target="_blank">ssc.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">ভাৰতীয় ৰে'লৱে</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">RRB NTPC, Group D, ALP আৰু অন্যান্য ৰে'লৱে নিযুক্তি জাননী</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://www.indianrailways.gov.in/" rel="noopener nofollow" target="_blank">indianrailways.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px;">গুৱাহাটী উচ্চ ন্যায়ালয়</td>
                <td style="padding:10px;">তৃতীয় আৰু চতুৰ্থ শ্ৰেণীৰ নিযুক্তি জাননী আৰু ফলাফল</td>
                <td style="padding:10px;"><a href="https://ghconline.gov.in/" rel="noopener nofollow" target="_blank">ghconline.gov.in</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>এখন জাননী কেনেদৰে যাচাই কৰা হয়</h2>
        <ol>
          <li>আমি জাননীখন নিযুক্তি সংস্থাৰ চৰকাৰী প'ৰ্টেলত খোলোঁ, কোনো কোচিং বা বাতৰি ৱেবছাইটত নহয়।</li>
          <li>বিজ্ঞাপন নম্বৰ, পদ, খালী পদৰ সংখ্যা আৰু শেষ তাৰিখ নিযুক্তি সংস্থাই প্ৰকাশ কৰা PDF ৰ সৈতে মিলাই পৰীক্ষা কৰোঁ।</li>
          <li>প্ৰথম বিজ্ঞাপনৰ পিছত কোনো সংশোধনী বা সময় বঢ়োৱা জাননী জাৰি হৈছে নেকি পৰীক্ষা কৰোঁ।</li>
          <li>বিৱৰণ চৰকাৰী নথিপত্ৰৰ সৈতে মিলাৰ পিছতহে সংশ্লিষ্ট পৃষ্ঠা হালনাগাদ কৰোঁ।</li>
          <li>চৰকাৰী তথ্য অস্পষ্ট হ'লে অনুমানেৰে পূৰণ নকৰি পৃষ্ঠাত সেই কথা উল্লেখ কৰোঁ।</li>
        </ol>

        <h2>প্ৰসংগ সামগ্ৰী</h2>
        <p>চৰকাৰী জাননীৰ উপৰিও আমাৰ ব্যাখ্যা মানক বিদ্যালয়-স্তৰৰ পাঠ্যপুথি, ৰাজহুৱা বিগত বৰ্ষৰ প্ৰশ্নকাকত আৰু বহুলভাৱে স্বীকৃত বিষয়-প্ৰসংগৰ সৈতে যাচাই কৰা হয়। প্ৰশ্ন আৰু ব্যাখ্যা আমাৰ নিজৰ শব্দত লিখা হয়। আমি বাণিজ্যিক পুথিৰ অধ্যায় পুনৰুত্পাদন নকৰোঁ, আৰু ছাইটৰ অন্য ঠাইত কোনো পুথিৰ উল্লেখ কৰাৰ অৰ্থ ইয়াৰ পাঠ কপি কৰা বুলি দাবী নহয়।</p>

        <h2>উৎসৰ সমস্যা জনোৱা</h2>
        <p>যদি কোনো লিংক ভাঙি গৈছে, জাননী সলনি হৈছে বা কোনো পৃষ্ঠাই উৎস ভুলকৈ উল্লেখ কৰিছে, তেন্তে পৃষ্ঠাৰ ঠিকনাসহ <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> লৈ লিখক। সংশোধন কেনেদৰে কৰা হয়, সেই বিষয়ে <a href="/editorial-policy/">সম্পাদকীয় নীতি</a>ত চাওক।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p>Study material is only useful if it matches the official examination. This page lists the official portals we monitor and explains how a notification is verified before it affects the content on axomexam.in. We are an independent website and are not connected to any of these organisations.</p>

        <h2>Official exam portals</h2>
        <div class="axo-sources-table-wrap" style="overflow-x:auto;">
          <table class="axo-sources-table" style="width:100%; border-collapse:collapse; font-size:0.95rem;">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Exam body</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">What to check there</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Official portal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLPRB Assam</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Assam Police constable and sub-inspector notifications, syllabus, admit cards and results</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slprbassam.in/" rel="noopener nofollow" target="_blank">slprbassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLRC Assam</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">ADRE Grade III and Grade IV notifications, exam pattern and results</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slrcassam.in/" rel="noopener nofollow" target="_blank">slrcassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">APSC</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Combined Competitive Examination and other commission examinations</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://apsc.nic.in/" rel="noopener nofollow" target="_blank">apsc.nic.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Staff Selection Commission</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">CGL, CHSL, GD, MTS and other central notifications and answer keys</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://ssc.gov.in/" rel="noopener nofollow" target="_blank">ssc.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Indian Railways</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">RRB NTPC, Group D, ALP and other railway recruitment notices</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://www.indianrailways.gov.in/" rel="noopener nofollow" target="_blank">indianrailways.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px;">Gauhati High Court</td>
                <td style="padding:10px;">Grade III and Grade IV recruitment notices and results</td>
                <td style="padding:10px;"><a href="https://ghconline.gov.in/" rel="noopener nofollow" target="_blank">ghconline.gov.in</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How a notification is verified</h2>
        <ol>
          <li>We open the notice on the official portal of the recruiting body, not on a coaching or news website.</li>
          <li>We check the advertisement number, the post, the number of vacancies and the last date against the PDF published by the recruiting body.</li>
          <li>We check whether a corrigendum or extension notice has been issued after the first advertisement.</li>
          <li>We update the relevant page only after the details match the official document.</li>
          <li>Where the official information is unclear, the page says so instead of filling the gap with a guess.</li>
        </ol>

        <h2>Reference material</h2>
        <p>Besides official notifications, our explanations are checked against standard school-level textbooks, public previous year question papers and widely accepted subject references. Questions and explanations are written in our own words. We do not reproduce chapters from commercial books, and the mention of any book elsewhere on the site is not a claim that its text has been copied.</p>

        <h2>Reporting a source problem</h2>
        <p>If a link is broken, a notification has changed or a page cites a source incorrectly, write to <a href="mailto:contact@axomexam.in" class="axo-email">contact@axomexam.in</a> with the page address. See the <a href="/editorial-policy/">editorial policy</a> for how corrections are handled.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else if (key === "updates") {
      title = isAs ? "সমল হালনাগাদ" : "Content Updates";
      desc = isAs ? "axomexam.in ৰ অধ্যয়ন সামগ্ৰীত কৰা সংশোধন, পাঠ্যক্ৰমৰ হালনাগাদ, নতুন শিতান আৰু সম্পাদকীয় পৰিৱৰ্তনৰ তাৰিখসহ ৰেকৰ্ড।" : "A dated record of corrections, syllabus updates, new sections and editorial changes made to axomexam.in study material.";
      content = isAs ? `
        <p>এই পৃষ্ঠাই অধ্যয়ন সামগ্ৰী আৰু ছাইট পৰিচালনাৰ পদ্ধতিত কৰা উল্লেখযোগ্য পৰিৱৰ্তন লিপিবদ্ধ কৰে। সৰু বানান সংশোধন তালিকাভুক্ত নকৰা হয়, কিন্তু পাঠ্যক্ৰমৰ পৰিৱৰ্তন, নতুন শিতান, উত্তৰৰ সংশোধন আৰু নীতিৰ পৰিৱৰ্তন লিপিবদ্ধ কৰা হয়। নতুন ভুক্তি প্ৰথমে দেখুওৱা হয়।</p>

        <h2>৫ নৱেম্বৰ ২০২৬ &mdash; এঘাৰখন বিষয় পৃষ্ঠাত অসমীয়া টোকা</h2>
        <ul>
          <li>কেৱল ইংৰাজী প্ৰবন্ধ থকা এঘাৰখন বিষয় পৃষ্ঠাত অসমীয়া অধ্যয়ন টোকা যোগ কৰা হৈছে, যাতে প্ৰতিখন পৃষ্ঠা আৰু তাৰ অসমীয়া সংস্কৰণত দুয়োটা ভাষাৰ সমল থাকে।</li>
          <li>সেই অসমীয়া টোকা লিখা build ধাপটোও যোগ কৰা হৈছে, যাতে ভৱিষ্যতে পুনৰ নিৰ্মাণ কৰিলেও সেয়া হেৰাই নাযায়।</li>
        </ul>

        <h2>৪ নৱেম্বৰ ২০২৬ &mdash; প্ৰতিখন সূচী পৃষ্ঠাত অধ্যয়ন সামগ্ৰী যোগ</h2>
        <ul>
          <li>শ্ৰেণী, পৰীক্ষা, মক-টেষ্ট, পূৰ্বৰ বছৰৰ প্ৰশ্ন আৰু বিষয় সূচী পৃষ্ঠাসমূহক চমু লিংক-তালিকাৰ পৰা বিষয়ভিত্তিক পৰিসৰ, জীৱন্ত প্ৰশ্নসংখ্যা, সমাধান কৰা নমুনা প্ৰশ্ন আৰু পুনৰালোচনা টোকাসহ সম্পূৰ্ণ অধ্যয়ন পৃষ্ঠালৈ বৃদ্ধি কৰা হৈছে।</li>
          <li>একেই পৃষ্ঠাসমূহত অসমীয়া আৰু ইংৰাজী দুয়োটা ভাষাত চমু সঘনাই সোধা প্ৰশ্ন শিতান যোগ কৰা হৈছে।</li>
          <li>এই পৃষ্ঠাসমূহৰ অসমীয়া সংস্কৰণ পুনৰ নিৰ্মাণ কৰা হৈছে যাতে দুয়োটা ভাষাই একে সামগ্ৰী বহন কৰে।</li>
        </ul>

        <h2>৩ নৱেম্বৰ ২০২৬ &mdash; প্ৰতিষ্ঠাপকৰ পৰিচয় আৰু সম্পাদকীয় স্বচ্ছতা</h2>
        <ul>
          <li>প্ৰতিষ্ঠাপক আৰু মুখ্য সম্পাদক বপন বৰ্মনক সম্পাদকীয় দল পৃষ্ঠাত দৃশ্যমান পৰিচয় আৰু ৰাজহুৱা যোগাযোগ লিংকসহ যোগ কৰা হৈছে।</li>
          <li>প্ৰতিষ্ঠাপকক ছাইটৰ Organization structured data ত এজন ব্যক্তি হিচাপে লিপিবদ্ধ কৰা হৈছে আৰু তেওঁৰ পৰিচয় পৃষ্ঠাৰ সৈতে সংযোগ কৰা হৈছে, যাতে ছাইট এজন নামযুক্ত আৰু দায়বদ্ধ প্ৰকাশকৰ নামত চলিব পাৰে।</li>
          <li>সম্পাদকীয় নীতি, সংশোধন নীতি আৰু প্ৰকাশকৰ যোগাযোগৰ তথ্য Organization structured data ত প্ৰকাশ কৰা হৈছে, যাতে সন্ধান ইঞ্জিনে ছাইটৰ দায়িত্ব কাৰ ওপৰত আছে সেয়া যাচাই কৰিব পাৰে।</li>
        </ul>


        <h2>২৩ অক্টোবৰ ২০২৬ &mdash; সম্পাদকীয় গুণগত পৰ্যালোচনা</h2>
        <ul>
          <li>লেখক পৰিচয়, উৎসৰ টোকা আৰু শেষ হালনাগাদৰ তাৰিখকে ধৰি প্ৰতিটো বিষয় পৃষ্ঠাৰ সম্পাদকীয় উপস্থাপন পৰ্যালোচনা কৰা হৈছে।</li>
          <li>সন্ধান ইঞ্জিনে ব্যৱহাৰ নকৰা আৰু পাঠকক সহায় নকৰা keyword meta টেগ আঁতৰোৱা হৈছে।</li>
          <li>বাণিজ্যিক প্ৰসংগ পুথিৰ উল্লেখ চৰকাৰী পাঠ্যক্ৰম আৰু ৰাজহুৱা উৎসৰ উল্লেখেৰে সলনি কৰা হৈছে, আৰু প্ৰভাৱিত বাক্যবোৰ নিজৰ শব্দত পুনৰ লিখা হৈছে।</li>
          <li>এই পৰিৱৰ্তন-তালিকা, <a href="/editorial-policy/">সম্পাদকীয় নীতি</a>, <a href="/editorial-team/">সম্পাদকীয় দল</a> পৃষ্ঠা আৰু <a href="/sources/">চৰকাৰী উৎস</a> পৃষ্ঠা যোগ কৰা হৈছে।</li>
          <li>ভুল পৃষ্ঠা, ৰিডাইৰেক্ট পৃষ্ঠা, সন্ধান পৃষ্ঠা আৰু অধ্যয়ন সামগ্ৰী নথকা অন্য স্ক্ৰীনৰ পৰা বিজ্ঞাপন আঁতৰোৱা হৈছে।</li>
        </ul>

        <h2>২২ অক্টোবৰ ২০২৬ &mdash; নকল বিৱৰণৰ সংশোধন</h2>
        <ul>
          <li>সন্ধান ইঞ্জিনৰ ছাইট স্কেনত ধৰা পৰা এখন নকল meta description টেগ আঁতৰোৱা হৈছে।</li>
        </ul>

        <h2>২ অক্টোবৰ ২০২৬ &mdash; চলিত ঘটনাৱলীৰ হালনাগাদ</h2>
        <ul>
          <li>অৰ্থনীতি আৰু বেংকিং, পৰিৱেশ আৰু পৰিৱেশ বিজ্ঞান, শীৰ্ষ সন্মিলন, ৰেংকিং আৰু প্ৰতিবেদন, আৰু মৃতকৰ্মকে ধৰি চলিত ঘটনাৱলীৰ শিতানসমূহ হালনাগাদ কৰা হৈছে।</li>
        </ul>

        <h2>১৮ ছেপ্তেম্বৰ ২০২৬ &mdash; ছাইট প্ৰকাশ</h2>
        <ul>
          <li>অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিষয়ভিত্তিক দ্বিভাষিক প্ৰশ্ন-সংগ্ৰহ, মক টেষ্ট, বিগত বৰ্ষৰ প্ৰশ্নকাকত আৰু PDF নোট প্ৰকাশ কৰা হৈছে।</li>
        </ul>

        <h2>হালনাগাদ কেনেদৰে লিপিবদ্ধ কৰা হয়</h2>
        <p>কোনো পৃষ্ঠা সংশোধন কৰিলে তাৰ শেষ হালনাগাদৰ তাৰিখ সলনি হয়, আৰু পাঠকে শিকা বা নিৰ্ভৰ কৰা তথ্যত প্ৰভাৱ পৰিলে পৰিৱৰ্তনৰ সাৰাংশ ইয়াত দিয়া হয়। পৰীক্ষাৰ জাননী, পাঠ্যক্ৰমৰ পৰিৱৰ্তন আৰু উত্তৰৰ সংশোধন সদায় লিপিবদ্ধ কৰা হয়। নতুন সামগ্ৰী <a href="/feed.xml">RSS ফীড</a>ৰ জৰিয়তে অনুসৰণ কৰিব পাৰে বা <a href="/contact/">যোগাযোগ পৃষ্ঠা</a>ৰ জৰিয়তে প্ৰয়োজনীয় সংশোধন জনাব পাৰে।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ৫ নৱেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      ` : `
        <p>This page records substantive changes to the study material and to the way the site is run. Small spelling fixes are not listed, but syllabus changes, new sections, corrections to answers and policy changes are. The newest entries appear first.</p>

        <h2>5 November 2026 &mdash; Assamese notes on eleven topic pages</h2>
        <ul>
          <li>Added Assamese study notes to eleven topic pages that carried only the English article, so each page and its Assamese version now show content in both languages.</li>
          <li>Added the build step that writes those Assamese notes, so a future rebuild cannot drop them again.</li>
        </ul>

        <h2>4 November 2026 &mdash; Study content added to every index page</h2>
        <ul>
          <li>Expanded the category, exam, mock-test, previous-year and topic index pages from short link lists into full study pages with topic-wise coverage, live question counts, worked sample questions and revision notes.</li>
          <li>Added a short frequently-asked-questions section to the same pages, written in both English and Assamese.</li>
          <li>Rebuilt the Assamese versions of those pages so the two languages carry the same content.</li>
        </ul>

        <h2>3 November 2026 &mdash; Founder attribution and editorial transparency</h2>
        <ul>
          <li>Added the founder and editor-in-chief, Bapon Barmon, to the editorial team page with a visible profile and a public contact link.</li>
          <li>Recorded the founder in the site&#39;s Organization structured data as a Person, linked to the founder&#39;s profile page, so that the site is attributed to a named and accountable publisher.</li>
          <li>Published the editorial policy, corrections policy and publisher contact details in the Organization structured data so that search engines can verify who is responsible for the site.</li>
        </ul>


        <h2>23 October 2026 &mdash; Editorial quality review</h2>
        <ul>
          <li>Reviewed the editorial presentation of every topic page, including author attribution, source notes and last-updated dates.</li>
          <li>Removed keyword meta tags that were not used by search engines and did not help readers.</li>
          <li>Replaced references to commercial reference books with official syllabus and public-source references, and rewrote the affected sentences in our own words.</li>
          <li>Added this changelog, the <a href="/editorial-policy/">editorial policy</a>, the <a href="/editorial-team/">editorial team</a> page and the <a href="/sources/">official sources</a> page.</li>
          <li>Removed advertising from error pages, redirect pages, search pages and other screens without study content.</li>
        </ul>

        <h2>22 October 2026 &mdash; Duplicate description fix</h2>
        <ul>
          <li>Removed a duplicate meta description tag that had been flagged during a search-engine site scan.</li>
        </ul>

        <h2>2 October 2026 &mdash; Current affairs update</h2>
        <ul>
          <li>Updated the current affairs sections, including economy and banking, environment and ecology, summits and conferences, rankings and reports, and obituaries.</li>
        </ul>

        <h2>18 September 2026 &mdash; Site published</h2>
        <ul>
          <li>Published the topic-wise bilingual question banks, mock tests, previous year papers and PDF notes for Assam competitive examinations.</li>
        </ul>

        <h2>How updates are recorded</h2>
        <p>When a page is corrected, its last-updated date changes and the change is summarised here if it affects what a reader learns or relies on. Exam notifications, syllabus changes and corrections to answers are always recorded. You can follow new material through the <a href="/feed.xml">RSS feed</a> or report a needed correction through the <a href="/contact/">contact page</a>.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 5 November 2026 &middot; Publisher: axomexam.in</p>
      `;
    } else {
      content = `<p>${t(`page.${key}.p1`)}</p>`;
    }

    if (["editorial-policy", "editorial-team", "sources", "updates"].includes(key)) {
      const links = [
        ["/editorial-policy/", isAs ? "সম্পাদকীয় নীতি" : "Editorial Policy"],
        ["/editorial-team/", isAs ? "সম্পাদকীয় দল" : "Editorial Team"],
        ["/sources/", isAs ? "চৰকাৰী উৎস" : "Official Sources"],
        ["/updates/", isAs ? "সমল হালনাগাদ" : "Content Updates"],
      ];
      content += `
        <p class="axo-editorial-links" style="margin-top:26px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); line-height:2;">
          <strong>Axomexam Editorial:</strong>
          ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join(" &middot; ")}
        </p>`;
    }

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${escapeHtml(title)}</span></nav>
        <h1>${escapeHtml(title)}</h1>
        ${desc ? `<p class="page-desc">${escapeHtml(desc)}</p>` : ""}
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel${["editorial-policy", "editorial-team", "sources", "updates"].includes(key) ? " axo-editorial-page" : ""}" style="background:var(--bg,#ffffff); padding:28px 24px; border-radius:18px; border:1px solid var(--border,#e2e8f0); line-height:1.75; color:var(--ink-soft,#475569); box-shadow:0 8px 24px -4px rgba(15,23,42,0.03); max-width:860px; margin:0 auto; text-align:left;">
          ${content}
        </div>
      </section>`;
    
    applyStaticI18n();
    window.scrollTo(0, 0);
  }

  /* ================= Contact Us Page ================= */
  function renderContactPage(main) {
    const isAs = state.lang === "as";
    const subjectOptions = isAs
      ? ["সমল সংশোধন", "ভাঙা লিংক বা ডাউনল'ড সমস্যা", "নতুন বিষয়ৰ অনুৰোধ", "প্ৰশ্ন আগবঢ়াওক", "কপিৰাইট / টেকডাউন অনুৰোধ", "অন্যান্য"]
      : ["Content correction", "Broken link or download problem", "New topic request", "Contribute questions", "Copyright / takedown request", "Other"];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</span></nav>
        <h1>${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</h1>
        <p class="page-desc">${isAs ? "ভুল উত্তৰ জনাওক, নতুন বিষয় বিচাৰক, প্ৰশ্ন আগবঢ়াওক, বা পৰীক্ষাৰ প্ৰস্তুতিত সহায় বিচাৰক।" : "Report a wrong answer, request a topic, contribute questions, or ask for help with your exam preparation."}</p>
      </div>

      <section class="section" style="padding-bottom:40px;">
        <article style="max-width:860px; margin:0 auto; line-height:1.85; color:var(--ink-soft,#475569); text-align:left;">
          <p>${isAs ? "আমি লাভ কৰা প্ৰতিটো বাৰ্তা পঢ়োঁ আৰু সেই প্ৰতিক্ৰিয়া axomexam.in ৰ প্ৰশ্ন-সংগ্ৰহ, নোট আৰু মক টেষ্ট উন্নত কৰিবলৈ ব্যৱহাৰ কৰোঁ। আপুনি এটা ভুল উত্তৰ জনাব, নতুন এটা বিষয়ৰ পৰামৰ্শ দিব, প্ৰশ্ন আগবঢ়াব বা অধ্যয়ন সামগ্ৰীৰ বিষয়ে সোধা-পোছা কৰিব বিচাৰে নে নাই — এই পৃষ্ঠাই আমাৰ সৈতে যোগাযোগ কৰাৰ আটাইতকৈ ভাল উপায় ব্যাখ্যা কৰে।" : "We read every message we receive and use the feedback to improve the question banks, notes and mock tests on axomexam.in. Whether you want to report a wrong answer, suggest a new topic, contribute questions or ask about study material, this page explains the best way to reach us."}</p>

          <h2>${isAs ? "ইমেইল সহায়" : "Email Support"}</h2>
          <p>${isAs ? "যোগাযোগৰ আটাইতকৈ দ্ৰুত উপায় হ'ল" : "The fastest way to contact us is by email at"} <a href="mailto:support@axomexam.in" class="axo-email">support@axomexam.in</a>${isAs ? " লৈ ইমেইল। আমাক উত্তৰ দিবলৈ অনুগ্ৰহ কৰি এটা বৈধ ইমেইল ঠিকনাৰ পৰা লিখক। আমি সাধাৰণতে" : ". Please write from a valid email address so that we can reply. We usually respond within"} <strong>${isAs ? "দুৰৰ পৰা তিনি কৰ্মদিৱসৰ" : "two to three working days"}</strong>${isAs ? " ভিতৰত উত্তৰ দিওঁ।" : "."}</p>

          <form id="contact-form" action="mailto:support@axomexam.in" method="post" enctype="text/plain" style="margin:22px 0 10px; padding:22px; border:1px solid var(--border,#e2e8f0); border-radius:16px; background:var(--card-bg,#fff);">
            <h3 style="margin-top:0; color:var(--ink,#0f172a);">${isAs ? "আমাক এটা বাৰ্তা পঠিয়াওক" : "Send us a message"}</h3>
            <div style="margin-bottom:12px;">
              <label for="c-name" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "আপোনাৰ নাম" : "Your name"}</label>
              <input id="c-name" name="name" type="text" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-email" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "আপোনাৰ ইমেইল" : "Your email"}</label>
              <input id="c-email" name="email" type="email" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-subject" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "বিষয়" : "Subject"}</label>
              <select id="c-subject" name="subject" style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;">
                ${subjectOptions.map((o) => `<option>${o}</option>`).join("")}
              </select>
            </div>
            <div style="margin-bottom:16px;">
              <label for="c-message" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "বাৰ্তা" : "Message"}</label>
              <textarea id="c-message" name="message" rows="5" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">${isAs ? "বাৰ্তা পঠিয়াওক" : "Send message"}</button>
            <p style="font-size:0.82rem; color:#64748b; margin:10px 0 0;">${isAs ? "ই আপোনাৰ ইমেইল এপটো তথ্য ভৰাই খুলিব। যদি নুখুলে, তেন্তে পোনপটীয়াকৈ" : "This opens your email app with the details filled in. If it does not open, simply email us directly at"} <a href="mailto:support@axomexam.in" class="axo-email">support@axomexam.in</a>${isAs ? " লৈ ইমেইল কৰক।" : "."}</p>
          </form>

          <h2>${isAs ? "আপোনাৰ বাৰ্তাত কি অন্তৰ্ভুক্ত কৰিব" : "What to Include in Your Message"}</h2>
          <ul>
            <li>${isAs ? "<strong>সমল সংশোধনৰ বাবে:</strong> পৃষ্ঠাৰ সঠিক লিংক, প্ৰশ্ন নম্বৰ, আপুনি ভুল বুলি ভবা কথাটো, আৰু এটা চুটি কাৰণ বা উৎসসহ সঠিক উত্তৰ।" : "<strong>For a content correction:</strong> the exact page link, the question number, what you believe is wrong, and the correct answer with a short reason or source."}</li>
            <li>${isAs ? "<strong>ভাঙা লিংক বা ডাউনল'ড সমস্যাৰ বাবে:</strong> লিংকটো দেখা পোৱা পৃষ্ঠা আৰু ফাইল বা প্ৰশ্নকাকতৰ নাম।" : "<strong>For a broken link or download problem:</strong> the page where the link appears and the name of the file or paper."}</li>
            <li>${isAs ? "<strong>নতুন বিষয় অনুৰোধৰ বাবে:</strong> পৰীক্ষাৰ নাম, বিষয় আৰু আমি যোগ কৰিবলগীয়া নিৰ্দিষ্ট বিষয়টো।" : "<strong>For a new topic request:</strong> the exam name, subject and the specific topic you would like us to add."}</li>
            <li>${isAs ? "<strong>প্ৰশ্ন আগবঢ়োৱাৰ বাবে:</strong> বিষয়, প্ৰশ্ন চাৰিটা বিকল্পসহ, সঠিক বিকল্প আৰু এটা চুটি ব্যাখ্যা।" : "<strong>For contributing questions:</strong> the subject, topic, questions with four options, the correct option and a brief explanation."}</li>
          </ul>

          <h2>${isAs ? "উত্তৰৰ সময়" : "Response Time"}</h2>
          <p>${isAs ? "আমি প্ৰতিটো প্ৰামাণিক বাৰ্তাৰ উত্তৰ দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত দিবলৈ চেষ্টা কৰোঁ। বাৰ্তাসমূহ অহা ক্ৰমত পৰিচালনা কৰা হয়, আৰু যাচাইযোগ্য উৎসসহ সমল সংশোধনসমূহ সাধাৰণতে আগতে প্ৰক্ৰিয়া কৰা হয়।" : "We aim to reply to every genuine message within two to three working days. Messages are handled in the order they arrive, and content corrections that include a verifiable source are usually processed first."}</p>

          <h2>${isAs ? "কপিৰাইট সমল জনাওক" : "Report Copyright Content"}</h2>
          <p>${isAs ? "যদি আপুনি বিশ্বাস কৰে যে axomexam.in ৰ কোনো সামগ্ৰীয়ে আপোনাৰ কপিৰাইট উলংঘা কৰিছে, পৃষ্ঠাৰ লিংক আৰু মালিকীস্বত্বৰ প্ৰমাণসহ আমালৈ ইমেইল কৰক। আমি অনুৰোধ পৰ্যালোচনা কৰি প্ৰয়োজন হ'লে সামগ্ৰী আঁতৰাব। আমি বৌদ্ধিক সম্পত্তিক সন্মান কৰোঁ আৰু বৈধ টেকডাউন অনুৰোধসমূহ তৎক্ষণাত পালন কৰোঁ।" : "If you believe any material on axomexam.in infringes your copyright, email us with the page link and proof of ownership. We will review the request and remove the material if required. We respect intellectual property and act on valid takedown requests promptly."}</p>

          <h2>${isAs ? "সাধাৰণ প্ৰশ্ন" : "Common Questions"}</h2>
          <p>${isAs ? "<strong>ফোন নম্বৰ বা লাইভ চেট আছে নেকি?</strong> ফোন নম্বৰ নাই। প্ৰতিটো পৃষ্ঠাৰ তলত থকা \"আমাৰ সৈতে কথা পাতক\" বুটাম ব্যৱহাৰ কৰি WhatsAppত আমাৰ সৈতে যোগাযোগ কৰিব পাৰে, অথবা সবিশেষ বা কপিৰাইট সম্পৰ্কীয় অনুসন্ধানৰ বাবে ইমেইল কৰিব পাৰে।" : "<strong>Is there a phone number or live chat?</strong> There is no phone line. You can reach us on WhatsApp using the \"Chat with us\" button at the bottom of every page, or by email for detailed or copyright-related queries."}</p>
          <p>${isAs ? "<strong>মই অধ্যয়ন পৰিকল্পনা বিচাৰিব পাৰোঁ নেকি?</strong> হয়। আপুনি যি পৰীক্ষাৰ বাবে প্ৰস্তুতি চলাইছে আৰু পৰীক্ষাৰ তাৰিখ কওক, আমি আপোনাক আটাইতকৈ প্ৰাসংগিক শিতান আৰু অধ্যয়নৰ পৰামৰ্শিত ক্ৰমলৈ নিৰ্দেশ কৰিম।" : "<strong>Can I request a study plan?</strong> Yes. Tell us the exam you are preparing for and the date of the exam, and we will point you to the most relevant sections and a suggested order of study."}</p>
          <p>${isAs ? "<strong>আপোনালোকে মোৰ তথ্য শ্বেয়াৰ বা বিক্ৰী কৰে নেকি?</strong> কেতিয়াও নহয়। আপোনাৰ ইমেইল কেৱল আপোনাৰ অনুসন্ধানৰ উত্তৰ দিবলৈ ব্যৱহাৰ কৰা হয়, আমাৰ <a href=\"/privacy/\">গোপনীয়তা নীতি</a>ত ব্যাখ্যা কৰাৰ দৰে।" : "<strong>Do you share or sell my details?</strong> Never. Your email is used only to reply to your query, as explained in our <a href=\"/privacy/\">Privacy Policy</a>."}</p>
          <p>${isAs ? "<strong>মই ছাইটলৈ প্ৰশ্ন আগবঢ়াব পাৰোঁ নেকি?</strong> হয়। চাৰিটা বিকল্প আৰু এটা চুটি ব্যাখ্যাসহ পঠিয়াওক, আমাৰ দলে প্ৰকাশৰ আগতে পৰ্যালোচনা কৰিব।" : "<strong>Can I contribute questions to the site?</strong> Yes. Send them with four options and a short explanation, and our team will review them before publishing."}</p>

          <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>${isAs ? "শেষ হালনাগাদ:" : "Last updated:"}</strong> ${isAs ? "২০ ছেপ্তেম্বৰ ২০২৬" : "20 September 2026"} &middot; ${isAs ? "প্ৰকাশক:" : "Publisher:"} axomexam.in</p>
        </article>
      </section>
    `;

    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = (document.getElementById("c-name") || {}).value || "";
        const email = (document.getElementById("c-email") || {}).value || "";
        const subject = (document.getElementById("c-subject") || {}).value || "Website enquiry";
        const message = (document.getElementById("c-message") || {}).value || "";
        const body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
        window.location.href = "mailto:support@axomexam.in?subject=" + encodeURIComponent("[axomexam] " + subject) + "&body=" + encodeURIComponent(body);
      });
    }

    applyStaticI18n();
    observeReveals();
    window.scrollTo(0, 0);
  }

  /* ================= Master Search ================= */
  function normalizeText(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function allLangs(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join(" ");
    return [obj.en, obj.as].filter(Boolean).map(x => Array.isArray(x) ? x.join(" ") : x).join(" ");
  }

  function searchIndex(query) {
    const q = normalizeText(query);
    if (q.length < 2) return [];
    const hits = [];
    const searchLimit = typeof CONFIG !== "undefined" ? CONFIG.SEARCH_LIMIT : 20;
    for (const r of state.topicIndex) {
      const titleEn = normalizeText(localized({ en: r.title.en }));
      const titleAs = normalizeText(localized({ as: r.title.as }));
      const tagHits = (r.tags || []).filter((tag) => normalizeText(tag).includes(q));
      const qHits = (r.topic.questions || []).filter((item) => {
        const qStr = (typeof item.q === "object" ? allLangs(item.q) : (item.q || item.question_en || "") + " " + (item.question_as || ""));
        const aStr = (typeof item.a === "object" ? allLangs(item.a) : (item.a || item.answer_en || "") + " " + (item.answer_as || ""));
        return normalizeText(qStr).includes(q) || normalizeText(aStr).includes(q);
      });
      let score = 0;
      if (titleEn.includes(q)) score += 5;
      if (titleAs.includes(q)) score += 5;
      score += tagHits.length * 3;
      score += qHits.length * 1.5;
      if (score > 0) hits.push({ rec: r, score, matchCount: qHits.length + tagHits.length });
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, searchLimit);
  }

  /* Full-text search over question/answer bodies needs every topic loaded.
     Instead of downloading all of them on boot (the old behaviour, ~24 MB),
     the corpus is loaded on demand the first time the user actually searches,
     with limited concurrency, and cached for the rest of the session. */
  let _searchCorpusPromise = null;
  function ensureSearchCorpus() {
    if (state.searchCorpusReady) return Promise.resolve();
    if (_searchCorpusPromise) return _searchCorpusPromise;
    _searchCorpusPromise = (async () => {
      const queue = state.topicIndex.filter((r) => !(r.topic && Array.isArray(r.topic.questions) && r.topic.questions.length));
      const worker = async () => {
        while (queue.length) {
          const rec = queue.shift();
          try {
            const data = await API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout);
            if (data) {
              const list = Array.isArray(data) ? data : (Array.isArray(data.questions) ? data.questions : []);
              rec.topic.questions = list;
              if (!rec.nQuestions) rec.nQuestions = list.length;
            }
          } catch (e) { /* individual topic failures are non-fatal */ }
        }
      };
      const workers = Math.min(8, queue.length);
      await Promise.all(Array.from({ length: workers }, worker));
      state.searchCorpusReady = true;
    })().finally(() => { _searchCorpusPromise = null; });
    return _searchCorpusPromise;
  }

  function bindSearch() {
    const input = $("#master-search");
    const box = $("#search-results");
    if (!input || !box) return;
    let timer;

    const close = () => { box.hidden = true; box.innerHTML = ""; };

    const renderDropdown = (v) => {
      const hits = searchIndex(v);
      if (!hits.length) {
        box.innerHTML = `<div class="sr-empty">${t("search.noresult")}</div>`;
      } else {
        box.innerHTML = `
          <div class="sr-head">${t("search.results")} (${hits.length})</div>
          ${hits.map((h, i) => `
            <a class="sr-item" href="/topic/${h.rec.path}" data-idx="${i}">
              <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span class="sr-title">${escapeHtml(localized(h.rec.title))}</span>
                <span class="sr-sub">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.cat.id === "study-guides" ? (state.uiLang === "as" ? "নিৰ্দেশিকা" : "Guide") : `${h.rec.nQuestions || 0} ${t("topic.questions")}`}</span>
              </span>
            </a>`).join("")}`;
        box.innerHTML += `<a class="sr-item" href="/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${t("see.all")}</a>`;
      }
      box.hidden = false;
    };

    const onInput = (e) => {
      clearTimeout(timer);
      const v = e.target.value;
      if (v.trim().length < 2) { close(); return; }
      timer = setTimeout(() => {
        renderDropdown(v);
        ensureSearchCorpus().then(() => {
          if (!box.hidden && input.value.trim() === v.trim()) renderDropdown(v);
        });
      }, 180);
    };

    input.addEventListener("input", onInput);
    input.addEventListener("focus", () => {
      if (input.value.trim().length >= 2) onInput({ target: input });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap")) close();
    });
    box.addEventListener("click", (e) => {
      const a = e.target.closest("a.sr-item");
      if (a) { input.value = ""; close(); }
    });
  }

  /* ================= Dedicated search page ================= */
  function renderSearchPage(main) {
    const featured = FEATURED_IDS
      .map((id) => state.categories.find((c) => c.id === id))
      .filter(Boolean)
      .slice(0, 6);
    const chips = featured
      .map((c) => `<a class="sp-chip" href="/category/${c.id}">${escapeHtml(localized(c.name))}</a>`)
      .join("");

    const emptyHTML = () => `
      <div class="sp-empty">
        <span class="sp-empty-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <span>${t("search.hint")}</span>
      </div>`;

    const noResultHTML = () => `
      <div class="sp-empty">
        <span class="sp-empty-ico is-warn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
        </span>
        <span>${t("search.noresult")}</span>
      </div>`;

    main.innerHTML = `
      <div class="page-head sp-page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.search")}</span></nav>
      </div>
      <div class="search-page">
        <div class="sp-hero">
          <span class="sp-hero-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <h1 class="sp-hero-title">${t("tab.search")}</h1>
          <p class="sp-hero-sub">${t("search.hint")}</p>
        </div>
        <div class="sp-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="search" id="page-search" autocomplete="off" spellcheck="false" placeholder="${t("search.placeholder")}" aria-label="${t("tab.search")}" />
          <button type="button" class="sp-clear" id="page-search-clear" aria-label="Clear search" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        ${chips ? `<div class="sp-sugg"><span class="sp-sugg-label">${t("search.popular")}</span><div class="sp-sugg-list">${chips}</div></div>` : ""}
        <div class="sp-results" id="page-search-results">${emptyHTML()}</div>
      </div>`;

    const input = $("#page-search");
    const results = $("#page-search-results");
    const clear = $("#page-search-clear");
    let timer;
    const run = () => {
      const q = input.value.trim();
      if (clear) clear.hidden = !q;
      if (q.length < 2) {
        results.innerHTML = emptyHTML();
        return;
      }
      const hits = searchIndex(q);
      if (!hits.length) {
        results.innerHTML = noResultHTML();
        return;
      }
      results.innerHTML = hits.map((h) => `
        <a class="sp-topic" href="/topic/${h.rec.path}">
          <span class="sp-topic-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
          </span>
          <span class="sp-topic-body">
            <span class="sp-topic-title">${escapeHtml(localized(h.rec.title))}</span>
            <span class="sp-topic-meta">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.cat.id === "study-guides" ? (state.uiLang === "as" ? "নিৰ্দেশিকা" : "Guide") : `${h.rec.nQuestions || 0} ${t("topic.questions")}`}</span>
          </span>
          <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
        </a>`).join("");
    };
    if (clear) {
      clear.addEventListener("click", () => {
        input.value = "";
        clear.hidden = true;
        input.focus();
        results.innerHTML = emptyHTML();
      });
    }
    input.addEventListener("input", () => {
      clearTimeout(timer);
      const v = input.value;
      if (clear) clear.hidden = !v.trim();
      timer = setTimeout(() => {
        run();
        ensureSearchCorpus().then(() => {
          if (input.value.trim() === v.trim()) run();
        });
      }, 180);
    });
  }

  /* ================= Mobile menu ================= */
  function closeMobileMenu() {
    const m = $("#mobile-menu");
    const b = $("#mobile-backdrop");
    const h = $("#hamburger");
    if (m) { m.classList.remove("open"); m.hidden = true; }
    if (b) { b.classList.remove("open"); b.hidden = true; }
    if (h) { h.classList.remove("open"); h.setAttribute("aria-expanded", "false"); }
  }
  function openMobileMenu() {
    const m = $("#mobile-menu");
    const b = $("#mobile-backdrop");
    const h = $("#hamburger");
    if (m) m.hidden = false;
    if (b) b.hidden = false;
    requestAnimationFrame(() => {
      if (m) m.classList.add("open");
      if (b) b.classList.add("open");
    });
    if (h) { h.classList.add("open"); h.setAttribute("aria-expanded", "true"); }
  }

  /* ================= Reveal on scroll ================= */
  let revealObserver;
  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    els.forEach((el) => {
      const d = parseInt(el.dataset.delay || "0", 10);
      if (d) el.style.transitionDelay = `${d}ms`;
    });
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revealObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach((el) => revealObserver.observe(el));
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function render404(main) {
    main.innerHTML = `
      <div class="page-head" style="padding:80px 0;text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p class="page-desc" style="margin:12px auto;">${t("page.error.sub")}</p>
        <div style="margin-top:22px;"><a class="btn btn-primary" href="/">${t("page.error.btn")}</a></div>
      </div>`;
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ================= Categories page ================= */
  function renderCategoriesPage(main) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.categories")}</span></nav>
        <h1>${t("tab.categories")}</h1>
        <p class="page-desc">${t("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${state.categories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="/category/${c.id}" style="--cat:${color}" data-delay="${i * 50}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  ${catNameHTML(c.name)}
                  <span><span class="cat-count">${countTopics(c)}</span> ${c.id === "study-guides" ? (state.uiLang === "as" ? "টা গাইড" : "Guides") : t("cat.topics")}</span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= PDF Spinner Overlay Helper ================= */
  function showPdfSpinner(message) {
    let spinner = $("#pdf-loading-overlay");
    if (!spinner) {
      spinner = document.createElement("div");
      spinner.id = "pdf-loading-overlay";
      spinner.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.8);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;backdrop-filter:blur(4px);";
      spinner.innerHTML = `
        <div style="width:48px;height:48px;border:3.5px solid rgba(255,255,255,0.15);border-top:3.5px solid #3b82f6;border-radius:50%;animation:pdfSpin 0.8s linear infinite;margin-bottom:16px;flex:0 0 auto;"></div>
        <div id="pdf-spinner-text" style="color:#ffffff;font-size:0.98rem;font-weight:700;letter-spacing:0.3px;line-height:1.6;text-align:center;max-width:min(92vw,460px);margin:0 auto;padding:0 4px;font-family:'Plus Jakarta Sans',sans-serif;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(message || "Generating PDF...")}</div>
        <style>@keyframes pdfSpin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
      `;
      document.body.appendChild(spinner);
    } else {
      $("#pdf-spinner-text").textContent = message || "Generating PDF...";
      spinner.style.display = "flex";
    }
  }

  function hidePdfSpinner() {
    const spinner = $("#pdf-loading-overlay");
    if (spinner) spinner.style.display = "none";
  }

  /* ================= Enhanced Language Selection Modal ================= */
  function showPdfDownloadModal(rec) {
    const existing = $("#pdf-lang-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "pdf-lang-modal";
    modal.className = "read-modal";
    modal.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;display:flex;align-items:center;justify-content:center;";
    modal.innerHTML = `
      <div class="read-modal-backdrop" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);"></div>
      <div class="read-modal-box pdf-pop-box" role="dialog" style="position:relative; z-index:2; width:90%; max-width:340px; padding:24px 20px; text-align:center; background:var(--bg,#ffffff); color:var(--ink,#0f172a); border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); border:1px solid var(--border,#e2e8f0); animation:popIn 0.22s cubic-bezier(0.16,1,0.3,1); box-sizing:border-box; display:flex; flex-direction:column; align-items:center;">
        
        <div style="width:52px; height:52px; background:rgba(37,99,235,0.1); color:#2563eb; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto; font-size:1.6rem;">
          📄
        </div>

        <h3 style="font-size:1.15rem; font-weight:800; margin:0 0 6px 0; color:var(--ink,#0f172a); letter-spacing:-0.2px; text-align:center; width:100%;">Select PDF Language</h3>
        <p style="color:var(--ink-soft,#64748b); font-size:0.84rem; margin:0 0 20px 0; line-height:1.4; padding:0 4px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; text-align:center; width:100%;">
          <b>${escapeHtml(localized(rec.title))}</b>
        </p>

        <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
          <button type="button" class="pdf-action-btn pdf-btn-as-action" id="pdf-btn-as">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot"></span>
              অসমীয়া মাধ্যম (Assamese)
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" class="pdf-action-btn pdf-btn-en-action" id="pdf-btn-en">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot" style="background:#0ea5e9;"></span>
              English Medium
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" id="pdf-btn-cancel" style="border:none; background:transparent; padding:8px; font-size:0.82rem; margin-top:4px; color:var(--ink-muted,#94a3b8); font-weight:700; cursor:pointer; transition:color 0.2s;">
            Cancel
          </button>
        </div>
      </div>
      
      <style>
        @keyframes popIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .pdf-action-btn { width: 100%; padding: 13px 16px; font-weight: 700; font-size: 0.92rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid transparent; cursor: pointer; transition: all 0.15s ease-in-out; outline: none; box-sizing: border-box; user-select: none; }
        .pdf-btn-as-action { background: #2563eb; color: #ffffff; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); }
        .pdf-btn-as-action:hover { background: #1d4ed8; transform: translateY(-1px); }
        .pdf-btn-as-action:active { transform: scale(0.96); }
        .pdf-btn-en-action { background: var(--bg-subtle, #f8fafc); color: var(--ink, #0f172a); border-color: var(--border, #cbd5e1); }
        .pdf-btn-en-action:hover { background: var(--bg-soft, #f1f5f9); border-color: #2563eb; color: #2563eb; transform: translateY(-1px); }
        .pdf-btn-en-action:active { transform: scale(0.96); }
        .btn-indicator-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; }
        [data-theme="dark"] .pdf-pop-box { background: #0f172a !important; border-color: #334155 !important; color: #f8fafc !important; }
        [data-theme="dark"] .pdf-btn-en-action { background: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; }
        [data-theme="dark"] .pdf-btn-en-action:hover { border-color: #38bdf8 !important; color: #38bdf8 !important; }
      </style>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    $("#pdf-btn-cancel", modal).addEventListener("click", close);
    $(".read-modal-backdrop", modal).addEventListener("click", close);

    $("#pdf-btn-as", modal).addEventListener("click", (e) => {
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => { close(); generateTopicPdf(rec, "as"); }, 100);
    });

    $("#pdf-btn-en", modal).addEventListener("click", (e) => {
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => { close(); generateTopicPdf(rec, "en"); }, 100);
    });
  }

  /* ================= Natural Flow-Based A4 PDF Exporter ================= */
  async function generateTopicPdf(rec, lang) {
    if (state.isGeneratingPdf) return;
    state.isGeneratingPdf = true;

    const pdfWaitMsg = lang === "as" ? "PDF প্ৰস্তুত হৈ আছে, অনুগ্ৰহ কৰি অপেক্ষা কৰক..." : "Generating PDF, please wait...";
    showPdfSpinner(pdfWaitMsg);
    await new Promise((r) => setTimeout(r, 40));

    let qs = rec.topic.questions || [];

    if (!qs.length) {
      try {
        const data = await API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout);
        if (data) {
          qs = Array.isArray(data) ? data : (data.questions || []);
          rec.topic.questions = qs;
        }
      } catch (err) {
        console.error("PDF fetch error:", err);
      }
    }

    if (!qs.length) {
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast(lang === "as" ? "এই বিষয়ত প্ৰশ্ন উপলব্ধ নহয়!" : "No questions available in this topic!");
      return;
    }

    const titleText = rec.title[lang] || rec.title.as || rec.title.en || rec.topic.id;
    const catText = rec.cat.name[lang] || rec.cat.name.as || rec.cat.name.en || "";
    const langLabel = lang === "as" ? "অসমীয়া মাধ্যম" : "English Medium";
    const ansLabel = lang === "as" ? "উত্তৰ" : "Answer";
    const expLabel = lang === "as" ? "ব্যাখ্যা" : "Explanation";
    const fontFam = lang === "as" ? "'Noto Serif Bengali', serif" : "'Plus Jakarta Sans', sans-serif";

    const testMeasureDiv = document.createElement("div");
    testMeasureDiv.style.cssText = "position:absolute; left:-9999px; top:-9999px; visibility:hidden; width:726px; font-family:" + fontFam + ";";
    document.body.appendChild(testMeasureDiv);

    const renderedRows = qs.map((item, idx) => {
      const qText = extractField(item, "question", lang);
      const aText = extractField(item, "answer", lang);
      const exp = extractField(item, "explanation", lang);
      const options = getOptionsList(item, lang);
      const media = mediaBlock(item);
      const fopts = figureOptions(item);

      const targetLang = lang;
      const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
      const isStepArray = Array.isArray(rawAns) || aText.includes("qa-step-line");

      const row = document.createElement("div");
      row.className = "qa-row";
      row.style.cssText = "border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-bottom:7px; line-height:1.4; text-align:left;";
      
      if (isStepArray) {
        row.innerHTML = `
          <div style="font-size:12.8px; font-weight:700; color:#0f172a; margin-bottom:1px; text-align:left;">${idx + 1}. ${formatMath(qText)}</div>
          ${media}
          ${fopts ? figureOptionsHTML(item, { compact: true }) : options.length ? `
            <div style="font-size:11.2px; color:#475569; margin-bottom:3px; display:flex; flex-wrap:wrap; gap:12px; text-align:left; justify-content:flex-start;">
              ${options.map((opt, optIdx) => {
                const optDisplay = `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                return `<span>${formatMath(optDisplay)}</span>`;
              }).join("")}
            </div>` : ""
          }
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${aText}</div>
          ${exp ? `<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${expLabel}:</b> ${exp}</div>` : ""}
        `;
      } else {
        row.innerHTML = `
          <div style="font-size:12.8px; font-weight:500; color:#0f172a; margin-bottom:1px; text-align:left;">${idx + 1}. ${formatMath(qText)}</div>
          ${media}
          ${fopts ? figureOptionsHTML(item, { compact: true }) : ""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${ansLabel}: ${formatMath(aText)}</div>
          ${exp ? `<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${expLabel}:</b> ${exp}</div>` : ""}
        `;
      }

      testMeasureDiv.appendChild(row);
      return row;
    });

    /* Render math and load the Bengali webfonts before measuring, so every
       card gets its real final height and nothing shifts/overflows later. */
    await renderMathJax(testMeasureDiv);
    if (document.fonts && document.fonts.ready) {
      await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]);
    }
    const renderedCards = renderedRows.map((row) => ({
      html: row.outerHTML,
      height: row.offsetHeight + 7
    }));
    testMeasureDiv.remove();

    const pages = [];
    let currentPage = [];
    let currentHeight = 0;
    const pageMaxHeight = 1010;

    renderedCards.forEach(card => {
      if (currentHeight + card.height > pageMaxHeight && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [card.html];
        currentHeight = card.height;
      } else {
        currentPage.push(card.html);
        currentHeight += card.height;
      }
    });
    if (currentPage.length > 0) pages.push(currentPage);

    const totalPages = pages.length;

    const pdfContainer = document.createElement("div");
    pdfContainer.id = "dynamic-pdf-export-container";
    pdfContainer.style.cssText = "position:absolute; left:-9999px; top:-9999px; width:794px; background:#fff;";

    function buildPdfPage(pageRows, pageNum) {
      const isFirst = pageNum === 1;

      const pageDiv = document.createElement("div");
      pageDiv.className = "pdf-page-node";
      pageDiv.style.cssText = `
        width: 794px;
        height: 1122px;
        max-height: 1122px;
        background: #ffffff;
        color: #0f172a;
        padding: 20px 34px 14px 34px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: ${fontFam};
      `;

      const headerHtml = isFirst ? `
        <div style="border-bottom:2px solid #4f46e5; padding-bottom:6px; margin-bottom:4px; height:48px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="vertical-align:bottom; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:#0f172a; line-height:1.2; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${escapeHtml(titleText)}</div>
                <div style="font-size:10.5px; color:#64748b; margin-top:2px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${escapeHtml(catText)} • ${lang === "as" ? "মুঠ বিষয়" : "Total Content"}: ${qs.length} | ${langLabel}</div>
              </td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${PDF_BRAND_LOGO_SVG}
              </td>
            </tr>
          </table>
        </div>
      ` : `
        <div style="border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; margin-bottom:4px; height:36px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td></td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${PDF_BRAND_LOGO_SVG}
              </td>
            </tr>
          </table>
        </div>
      `;

      pageDiv.innerHTML = `
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-35deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; pointer-events:none; user-select:none; z-index:0; opacity:0.075; width:140%;">
          <div style="width:110px; height:110px; background:#4f46e5; color:#ffffff; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:68px; font-weight:800; font-family:Arial, sans-serif;">A</div>
          <div style="font-size:58px; font-weight:800; color:#4f46e5; letter-spacing:2px; line-height:1;">axomexam.in</div>
        </div>
        ${headerHtml}
        <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-start; margin-top:8px; margin-bottom:8px;">
          ${pageRows.join("")}
        </div>
        <div style="border-top:1px solid #e2e8f0; padding-top:4px; display:flex; justify-content:space-between; align-items:center; font-size:9.5px; color:#64748b; font-family:'Plus Jakarta Sans', sans-serif; position:relative; z-index:2;">
          <span>© axomexam.in — Free Educational Notes for Assam Competitive Exams</span>
          <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:700; color:#334155; font-size:10px;">— Page ${pageNum} of ${totalPages} —</span>
          <span>axomexam.in</span>
        </div>
      `;

      return pageDiv;
    }

    document.body.appendChild(pdfContainer);

    try {
      await ensurePdfLibs();
      if (!window.jspdf || !window.html2canvas) {
        throw new Error("jsPDF or html2canvas library is missing.");
      }
      if (document.fonts && document.fonts.ready) {
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]);
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');

      /* Lower resolution on phones / low-memory devices keeps the canvas
         small enough to avoid the out-of-memory crashes that used to make
         the download fail outright. */
      const smallScreen = window.matchMedia ? window.matchMedia("(max-width: 820px)").matches : false;
      const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
      const scale = smallScreen || lowMemory ? 1.5 : 2;
      const total = pages.length;

      /* html2canvas has a large fixed cost per call, so capture several
         pages in one pass and slice the bitmap. Memory stays bounded by
         the pixel budget below. */
      const pxPerPage = 794 * 1122 * scale * scale;
      const maxPixels = smallScreen || lowMemory ? 8e6 : 16e6;
      const batchSize = Math.max(1, Math.min(4, Math.floor(maxPixels / pxPerPage)));
      const pagePxHeight = Math.round(1122 * scale);

      for (let start = 0; start < total; start += batchSize) {
        const count = Math.min(batchSize, total - start);
        showPdfSpinner(lang === "as"
          ? `PDF প্ৰস্তুত হৈ আছে (${start + 1}/${total}), অনুগ্ৰহ কৰি অপেক্ষা কৰক...`
          : `Generating PDF (${start + 1}/${total}), please wait...`);
        await new Promise((r) => setTimeout(r, 0));

        const batchWrap = document.createElement("div");
        batchWrap.style.cssText = "width:794px; background:#ffffff;";
        for (let j = 0; j < count; j++) {
          const pageDiv = buildPdfPage(pages[start + j], start + j + 1);
          pageDiv.style.margin = "0";
          batchWrap.appendChild(pageDiv);
        }
        pdfContainer.appendChild(batchWrap);

        let canvas;
        try {
          canvas = await window.html2canvas(batchWrap, {
            scale: scale,
            useCORS: true,
            allowTaint: false,
            logging: false,
            backgroundColor: "#ffffff"
          });
          const pxWidth = canvas.width;
          for (let j = 0; j < count; j++) {
            const sliceHeight = Math.min(pagePxHeight, canvas.height - j * pagePxHeight);
            if (sliceHeight <= 0) break;
            const slice = document.createElement("canvas");
            slice.width = pxWidth;
            slice.height = sliceHeight;
            slice.getContext("2d").drawImage(
              canvas,
              0, j * pagePxHeight, pxWidth, sliceHeight,
              0, 0, pxWidth, sliceHeight
            );
            const imgData = slice.toDataURL("image/jpeg", 0.9);
            slice.width = 0;
            slice.height = 0;
            if (start + j > 0) pdf.addPage("a4", "p");
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
          }
        } finally {
          if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
          }
          canvas = null;
          if (batchWrap.parentNode) batchWrap.remove();
        }
      }

      const filename = `${rec.topic.id}-${lang}.pdf`;
      let savedByApp = false;

      /* Newer Android builds expose a small bridge that writes the PDF bytes
         straight to the Downloads folder. Inside the app the WebView's
         DownloadListener can only pass http(s) URLs to DownloadManager, so a
         blob: URL can never be saved there — the bridge is the only reliable
         path. */
      const appBridge = window.AxoApp;
      if (appBridge && typeof appBridge.savePdf === "function") {
        try {
          const dataUri = String(pdf.output("datauristring") || "");
          appBridge.savePdf(dataUri.substring(dataUri.indexOf(",") + 1), filename);
          savedByApp = true;
        } catch (bridgeErr) {
          console.error("App PDF bridge failed:", bridgeErr);
        }
      }

      if (savedByApp) {
        /* The native side shows its own "download started" toast. */
      } else if (isInAxomexamApp()) {
        toast(lang === "as"
          ? "অ্যাপত PDF ছেভ কৰিব নোৱাৰি। Chrome ত axomexam.in খুলি ডাউনলোড কৰক।"
          : "Can't save PDF inside the app. Open axomexam.in in Chrome and download there.");
      } else {
        try {
          pdf.save(filename);
        } catch (saveErr) {
          const blobUrl = pdf.output("bloburl");
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = filename;
          a.rel = "noopener";
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            if (a.parentNode) a.parentNode.removeChild(a);
            URL.revokeObjectURL(blobUrl);
          }, 4000);
        }
        toast(lang === "as" ? "PDF ডাউনলোড সফল হ'ল!" : "PDF downloaded successfully!");
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast(lang === "as"
        ? "PDF বনাব পৰা নগ'ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।"
        : "Failed to generate PDF. Please try again.");
    } finally {
      if (pdfContainer.parentNode) pdfContainer.remove();
      hidePdfSpinner();
      state.isGeneratingPdf = false;
    }
  }

  /* ================= Downloads page ================= */
  async function renderDownloadsPage(main) {
    const isAs = state.lang === "as";
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let files = [];
    try { files = await API.listDownloads(); } catch (err) {}

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${tc("page.downloads.title")}</span></nav>
        <h1>${tc("page.downloads.title")}</h1>
        <p class="page-desc">${escapeHtml(tc("page.downloads.desc"))}</p>
      </div>

      <section class="section" style="padding-bottom:28px;">
        <div class="section-head" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <h2>${isAs ? "বিষয়ভিত্তিক প্ৰশ্ন-উত্তৰ PDF টোকা" : "Topic-wise Q&A PDF Notes"}</h2>
            <p class="sec-sub">${isAs ? "প্ৰতিটো বিষয়ৰ সম্পূৰ্ণ দ্বিভাষিক প্ৰশ্ন আৰু উত্তৰ PDF ৰূপত ডাউনলোড কৰক।" : "Download complete bilingual questions & answers for each topic in PDF format."}</p>
          </div>
          <div style="width:100%; max-width:320px; margin:0 auto; position:relative;">
            <input type="search" id="dl-search-input" placeholder="${isAs ? "বিষয়ৰ নামেৰে PDF সন্ধান কৰক..." : "Search PDF by topic name..."}" autocomplete="off" spellcheck="false"
                   style="width:100%; padding:9px 12px 9px 36px; border-radius:20px; border:1px solid var(--border,#cbd5e1); background:var(--bg,#ffffff); color:var(--ink,#0f172a); font-size:0.85rem; outline:none; box-sizing:border-box; box-shadow:0 1px 3px rgba(0,0,0,0.05);" />
            <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:15px; height:15px; color:var(--ink-soft,#64748b);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        <div class="dl-list" id="topic-pdf-list">
          ${state.topicIndex.map((rec, i) => `
            <div class="dl-item reveal topic-dl-card" data-title="${escapeHtml(allLangs(rec.title))}" data-cat="${escapeHtml(allLangs(rec.cat.name))}" data-delay="${(i % 12) * 30}">
              <span class="dl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span class="dl-meta">
                <b>${escapeHtml(localized(rec.title))}</b>
                <span>${escapeHtml(localized(rec.cat.name))}${rec.sub ? " • " + escapeHtml(localized(rec.sub.name)) : ""} • <span id="dl-count-${rec.path.replace(/\//g, '-')}">${rec.nQuestions || 0}</span> ${rec.cat.id === "study-guides" ? (isAs ? "অধ্যায়" : "Chapters") : (isAs ? "প্ৰশ্ন" : "Questions")}</span>
              </span>
              <button class="dl-btn dl-save topic-pdf-btn" data-path="${escapeHtml(rec.path)}" type="button" style="text-transform:none;">${isAs ? "ডাউনলোড" : "Download"}</button>
            </div>
          `).join("")}
        </div>
        <div id="dl-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${isAs ? "মিল থকা PDF বিষয় পোৱা নগ'ল।" : "No matching PDF topic found."}</p></div>
      </section>

      <section class="section" style="padding-bottom:44px; border-top:1px solid var(--border,#e2e8f0); padding-top:30px;">
        <div class="section-head"><div><h2>${isAs ? "বিশেষ ই-বুক আৰু হাতে লিখা টোকা" : "Special E-Books & Hand-written Notes"}</h2><p class="sec-sub">${isAs ? "প্ৰত্যক্ষ চৰকাৰী PDF আৰু নিৰ্বাচিত অধ্যয়ন সামগ্ৰী।" : "Direct official PDFs and curated study materials."}</p></div></div>
        ${files.length ? `
          <div class="dl-list">
            ${files.map(f => `
              <div class="dl-item">
                <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
                <span class="dl-meta"><b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b><span>${isAs ? "PDF দস্তাবেজ" : "PDF Document"}</span></span>
                <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener" style="text-transform:none;">${isAs ? "ডাউনলোড" : "Download"}</a>
              </div>`).join("")}
          </div>` : `<div class="info-panel"><p>${isAs ? "এতিয়ালৈ কোনো অতিৰিক্ত PDF আপলোড কৰা নাই।" : "No extra manual PDF uploaded yet."}</p></div>`}
      </section>`;

    $$(".topic-pdf-btn", main).forEach(btn => {
      btn.addEventListener("click", () => {
        const path = btn.dataset.path;
        const rec = state.topicMap[path];
        if (rec) showPdfDownloadModal(rec);
      });
    });

    const dlSearchInput = $("#dl-search-input");
    const cards = $$(".topic-dl-card", main);
    const noMatch = $("#dl-no-match");

    if (dlSearchInput) {
      dlSearchInput.addEventListener("input", (e) => {
        const q = normalizeText(e.target.value);
        let visibleCount = 0;
        cards.forEach(card => {
          const tName = normalizeText(card.dataset.title);
          const cName = normalizeText(card.dataset.cat);
          if (tName.includes(q) || cName.includes(q)) { card.style.display = ""; visibleCount++; }
          else { card.style.display = "none"; }
        });
        if (noMatch) noMatch.style.display = visibleCount === 0 ? "block" : "none";
      });
    }
    observeReveals();
  }

  /* ================= E-Books Library (read-only shelf) =================
     Topic-wise online e-books for Assam competitive exams. Every book is a
     JSON file uploaded to /data/books/<id>.json. Clicking a book opens it
     directly in a reading view with topic-wise explanations. Books are
     reading-only and are never offered as a PDF download. */
  function ebkColor(book) {
    const c = book && book.color;
    return /^#[0-9a-fA-F]{3,8}$/.test(c || "") ? c : "#4f46e5";
  }

  function ebkLang(obj, lang) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = lang || state.lang || "en";
    if (obj[l] && String(obj[l]).trim()) return obj[l];
    return obj.en || obj.as || "";
  }

  function ebkContentHTML(text) {
    if (text == null) return "";
    const lines = String(text).split("\n");
    let html = "";
    let listOpen = false;
    const closeList = () => { if (listOpen) { html += "</ul>"; listOpen = false; } };
    lines.forEach((raw) => {
      const line = (raw || "").trim();
      if (!line) { closeList(); return; }
      const bullet = line.match(/^[-•*]\s+(.*)$/);
      if (bullet) {
        if (!listOpen) { html += '<ul class="ebk-list">'; listOpen = true; }
        html += `<li>${formatMath(bullet[1])}</li>`;
      } else {
        closeList();
        html += `<p class="ebk-para">${formatMath(line)}</p>`;
      }
    });
    closeList();
    return html;
  }

  async function renderEbooksPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let books = [];
    try {
      books = await API.listBooks();
    } catch (e) {
      books = [];
    }

    const showEmpty = (extra) => {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${t("ebooks.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${escapeHtml(extra || t("ebooks.empty"))}</p></div>`;
    };

    if (!books.length) return showEmpty();

    const sorted = books.slice().sort((a, b) =>
      ebkLang(a.title, "en").localeCompare(ebkLang(b.title, "en")));

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("nav.ebooks")}</span>
        </nav>
        <h1>${t("ebooks.title")}</h1>
        <p class="page-desc">${t("ebooks.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid">
          ${sorted.map((book, bi) => {
            const chCount = (book.chapters || []).length;
            const color = ebkColor(book);
            const titleEn = ebkLang(book.title, "en");
            const subjectEn = ebkLang(book.subject, "en");
            const cover = book.cover ? String(book.cover) : "";
            const coverAlt = ebkLang(book.coverAlt, state.lang) || (titleEn + " e-book cover");
            const coverInner = cover
              ? `<img class="ebook-cover-img" src="${escapeHtml(cover)}" alt="${escapeHtml(coverAlt)}" loading="lazy" decoding="async">`
              : `<span class="ebook-cover-frame" aria-hidden="true"></span>
                  <span class="ebook-cover-top">
                    <span class="ebook-cover-publisher">axomexam</span>
                    <span class="ebook-cover-tag">E-Book</span>
                  </span>
                  <span class="ebook-cover-title">
                    <span class="ebk-tt-en">${escapeHtml(titleEn)}</span>
                  </span>
                  <span class="ebook-cover-subject">${escapeHtml(subjectEn)}</span>`;
            return `
              <a class="ebook-card reveal" href="/ebooks/${encodeURIComponent(book.id)}" style="--ebk:${color}" data-delay="${bi * 60}">
                <span class="ebook-cover${cover ? " has-photo" : ""}">${coverInner}</span>
                <span class="ebook-meta">
                  <b>${escapeHtml(titleEn)}</b>
                  <span class="ebook-meta-sub"><span>${chCount} ${t("ebooks.chapters")}</span></span>
                  <span class="ebook-read-btn">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
                    ${t("ebooks.readNow")}
                  </span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= E-Book Reader (reading mode only) ================= */
  function ebkReaderBodyHTML(book, lang, idPrefix) {
    const chapters = book.chapters || [];
    const prefix = String(idPrefix || "ebk-ch").replace(/[^A-Za-z0-9_-]/g, "");
    const toc = chapters.map((c, i) => `
      <a class="ebk-toc-item" href="#${prefix}-${i}">
        <span class="ebk-toc-no">${i + 1}</span>
        <span>${escapeHtml(ebkLang(c.title, lang))}</span>
      </a>`).join("");
    const list = chapters.map((c, i) => `
      <section class="ebk-chapter" id="${prefix}-${i}">
        <h3 class="ebk-ch-title"><span class="ebk-ch-no">${i + 1}</span>${escapeHtml(ebkLang(c.title, lang))}</h3>
        <div class="ebk-ch-body">${ebkContentHTML(ebkLang(c.content, lang))}</div>
      </section>`).join("");
    return `
      ${chapters.length > 1 ? `<nav class="ebk-toc" aria-label="${escapeHtml(t("ebooks.toc"))}"><h4>${t("ebooks.toc")}</h4>${toc}</nav>` : ""}
      <div class="ebk-chapters">${list}</div>`;
  }

  /* Reading progress bar — mobile browsers hide the native scrollbar while
     reading, so long pages (e-books, free-practice Q&A, articles, exam
     chapters, current affairs) show a slim fixed strip at the top that
     tracks how far down the page the reader has scrolled. */
  let readProgressRaf = null;
  function scheduleReadProgress() {
    if (readProgressRaf) return;
    readProgressRaf = requestAnimationFrame(drawReadProgress);
  }
  function drawReadProgress() {
    readProgressRaf = null;
    const fill = document.getElementById("ebk-progress-fill");
    if (!fill) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const top = window.pageYOffset || doc.scrollTop || 0;
    const pct = max > 0 ? Math.min(100, Math.max(0, (top / max) * 100)) : 0;
    fill.style.width = pct.toFixed(2) + "%";
    fill.parentElement.setAttribute("aria-valuenow", String(Math.round(pct)));
  }
  function clearReadProgress() {
    const bar = document.getElementById("ebk-progress");
    if (bar) bar.remove();
    window.removeEventListener("scroll", scheduleReadProgress);
    window.removeEventListener("resize", scheduleReadProgress);
    if (readProgressRaf) { cancelAnimationFrame(readProgressRaf); readProgressRaf = null; }
  }
  function showReadProgress(color) {
    clearReadProgress();
    const bar = document.createElement("div");
    bar.id = "ebk-progress";
    bar.className = "ebk-progress";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-label", t("readProgress.label") || "Reading progress");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    bar.setAttribute("aria-valuenow", "0");
    if (color) bar.style.setProperty("--ebk", color);
    const fill = document.createElement("span");
    fill.id = "ebk-progress-fill";
    bar.appendChild(fill);
    document.body.appendChild(bar);
    window.addEventListener("scroll", scheduleReadProgress, { passive: true });
    window.addEventListener("resize", scheduleReadProgress);
    scheduleReadProgress();
  }

  async function renderEbookReaderPage(main, bookId) {
    const safeId = String(bookId || "").replace(/[^A-Za-z0-9_-]/g, "");
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    if (!safeId) return render404(main);

    let book = null;
    try {
      book = await API.getBook(safeId);
    } catch (e) {
      book = null;
    }

    if (!book || !book.title || !(book.chapters && book.chapters.length)) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${t("ebooks.empty")}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/ebooks">${t("ebooks.backToLib")}</a></div>
        </div>`;
      return;
    }

    const chapters = book.chapters || [];
    let readLang = (state.lang === "as") ? "as" : "en";
    const titleEn = ebkLang(book.title, "en");
    const titleAs = ebkLang(book.title, "as");
    const subjectEn = ebkLang(book.subject, "en");
    const subjectAs = ebkLang(book.subject, "as");
    const color = ebkColor(book);
    const hasAsTitle = titleAs && titleAs !== titleEn;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/ebooks">${t("nav.ebooks")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(subjectEn)}${subjectAs && subjectAs !== subjectEn ? `<span class="ebk-chip-as"> ${escapeHtml(subjectAs)}</span>` : ""}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(titleEn)}${hasAsTitle ? `<span class="ebk-head-title-as">${escapeHtml(titleAs)}</span>` : ""}</h2>
            ${book.description ? `<p class="ebk-desc">${escapeHtml(localized(book.description)).replace(/\n/g, "<br>")}</p>` : ""}
            <div class="ebk-head-meta">
              ${book.author ? `<span><b>${escapeHtml(localized(book.author))}</b></span>` : ""}
              <span>${chapters.length} ${t("ebooks.chapters")}</span>
              ${book.updated ? `<span>${t("ebooks.updated")}: ${escapeHtml(book.updated)}</span>` : ""}
            </div>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-ebklang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-ebklang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ebk-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/ebooks">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("ebooks.backToLib")}
          </a>
        </div>
      </div>`;

    const body = $("#ebk-body");
    if (body) {
      body.innerHTML = ["en", "as"].map((lang) =>
        `<div data-axo-lang="${lang}">${ebkReaderBodyHTML(book, lang, lang === "en" ? "ebk-ch" : "ebk-ch-as")}</div>`
      ).join("");
    }
    showReadProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.ebklang;
        if (readLang === target) return;
        readLang = target;
        state.lang = readLang;
        document.body.setAttribute("data-lang", readLang);
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.ebklang === readLang));
        scheduleReadProgress();
      });
    });
  }

  /* ================= Your Exams (read-only exam library) =================
     Exam books work exactly like e-books: read-only, online only, never
     downloadable as a PDF. data/exams/index.json lists every exam and its
     sections. Each section is one JSON file at
     data/exams/<exam-id>/<section-id>.json and is shown in a simple
     reading view (Q&A question banks or syllabus notes). */
  const EXAM_SECTION_ICONS = {
    syllabus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/></svg>',
    "elementary-mathematics": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h4"/></svg>',
    "general-english": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h6"/></svg>',
    "logical-reasoning": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>',
    "assam-history-geography-culture": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-6h5v6"/></svg>',
    "general-knowledge-current-affairs": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>',
  };

  function examSectionIcon(sec) {
    const id = (sec && sec.id) || "";
    if (EXAM_SECTION_ICONS[id]) return EXAM_SECTION_ICONS[id];
    if (sec && sec.type === "syllabus") return EXAM_SECTION_ICONS.syllabus;
    return EXAM_SECTION_ICONS.default;
  }

  function examColor(exam, section) {
    const c = (section && section.color) || (exam && exam.color);
    return /^#[0-9a-fA-F]{3,8}$/.test(c || "") ? c : "#4f46e5";
  }

  async function getExamsList() {
    if (Array.isArray(state.exams)) return state.exams;
    let exams = [];
    try { exams = await API.listExams(); } catch (e) { exams = []; }
    state.exams = Array.isArray(exams) ? exams : [];
    return state.exams;
  }

  function findExam(examId) {
    return (state.exams || []).find((e) => e.id === examId) || null;
  }

  function examIsAvailable(exam) {
    return !!(exam && exam.status === "available" && (exam.sections || []).length);
  }

  /* Free Exam Books readiness is kept separate from exam.status on purpose:
     exam.status also gates the exam-wise mock tests and the hero question
     total, so flipping it would take those down too. Only these three books
     are shown as ready in the /exams/ listing; every other book shows
     "Coming Soon" while its content stays unpublished. */
  const EXAM_BOOKS_READY = ["assam-police", "adre-grade-3", "adre-grade-4"];
  function examBookIsReady(exam) {
    return !!(exam && EXAM_BOOKS_READY.indexOf(exam.id) !== -1 && (exam.sections || []).length);
  }

  /* Display name for the exam books. Only the Assam Police Constable book
     needs a longer label than its registry title, so the override lives here
     instead of in data/exams/index.json: that title is also what the
     exam-wise mock-test hub reads, and the mock hub must not change. */
  const EXAM_BOOK_NAMES = {
    "assam-police": { en: "Assam Police AB & UB", as: "অসম আৰক্ষী AB আৰু UB" },
  };
  function examBookName(exam, lang) {
    const custom = exam ? EXAM_BOOK_NAMES[exam.id] : null;
    if (custom) return custom[lang || state.lang || "en"] || custom.en;
    return ebkLang(exam && exam.title, lang);
  }

  /* The Coming Soon panel shared by the exam book page and every section page
     of a book that is not ready yet. */
  function examBookComingSoonHTML(exam) {
    const color = examColor(exam);
    const titleEn = examBookName(exam, "en");
    const titleAs = examBookName(exam, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    return `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>
        </nav>
      </div>
      <div class="exam-soon-panel" style="--ebk:${color}">
        <span class="exam-soon-ico">${EXAM_SECTION_ICONS.default}</span>
        <h1>${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? ` <span class="exam-soon-as">${escapeHtml(titleAs)}</span>` : ""}</h1>
        ${subEn ? `<p class="exam-soon-sub">${escapeHtml(subEn)}</p>` : ""}
        <span class="exam-soon-chip">${t("exams.comingSoon")}</span>
        <p class="exam-soon-msg">${escapeHtml(t("exams.comingSoonMsg"))}</p>
        <a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a>
      </div>`;
  }

  function examCoverAlt(exam, lang) {
    const txt = ebkLang(exam && exam.coverAlt, lang) || examBookName(exam, lang);
    return txt || "Exam book cover";
  }

  /* Alt text for the square exam logo tile. Falls back to the cover alt so a
     coming-soon exam that has no logo still gets a sensible description. */
  function examLogoAlt(exam, lang) {
    const txt = ebkLang(exam && exam.logoAlt, lang) || ebkLang(exam && exam.coverAlt, lang) || examBookName(exam, lang);
    return txt || "Exam logo";
  }

  function examBookCardHTML(exam, i) {
    const color = examColor(exam);
    const titleEn = examBookName(exam, "en");
    const titleAs = examBookName(exam, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    const available = examBookIsReady(exam);
    const statusLabel = available ? t("exams.readNow") : t("exams.comingSoon");
    const name = normalizeText(titleEn + " " + titleAs + " " + subEn);
    const cover = exam.cover ? String(exam.cover) : "";
    const soonBadge = available ? "" : `<span class="exam-soon-badge">${escapeHtml(t("exams.comingSoon"))}</span>`;
    const coverInner = cover
      ? `<img class="ebook-cover-img" src="${escapeHtml(cover)}" alt="${escapeHtml(examCoverAlt(exam, state.lang))}" loading="lazy" decoding="async">${soonBadge}`
      : `<span class="ebook-cover-frame" aria-hidden="true"></span>
          <span class="ebook-cover-top">
            <span class="ebook-cover-publisher">axomexam</span>
            <span class="ebook-cover-tag">${escapeHtml(available ? t("nav.exams") : t("exams.comingSoon"))}</span>
          </span>
          <span class="ebook-cover-title">
            <span class="ebk-tt-en">${escapeHtml(titleEn)}</span>
            ${titleAs && titleAs !== titleEn ? `<span class="ebk-tt-as">${escapeHtml(titleAs)}</span>` : ""}
          </span>
          <span class="ebook-cover-subject">${escapeHtml(subEn)}</span>
          ${soonBadge}`;
    return `
      <a class="ebook-card reveal exam-card ${available ? "" : "is-soon"}" href="/exams/${encodeURIComponent(exam.id)}" style="--ebk:${color}" data-name="${escapeHtml(name)}" data-delay="${(i % 8) * 50}">
        <span class="ebook-cover${cover ? " has-photo" : ""}">${coverInner}</span>
        <span class="ebook-meta">
          <b>${escapeHtml(titleEn)}</b>
          <span class="ebook-meta-sub">${titleAs && titleAs !== titleEn ? `<span class="ebk-tt-as">${escapeHtml(titleAs)}</span>` : `<span>${escapeHtml(subEn)}</span>`}</span>
          <span class="ebook-read-btn">${escapeHtml(statusLabel)}</span>
        </span>
      </a>`;
  }

  /* ================= Free Current Affairs =================
     A separate bilingual Q&A library (Sports, Awards, Appointments ...).
     data/current-affairs/index.json lists the sub-categories; each
     sub-category folder keeps one JSON question per file, discovered at
     runtime like the Your Exams library. Every category page carries its
     topic intro, the upload date and "uploaded by axomexam team", then a
     simple question with an explained answer and a language toggle. */
  const CA_ICONS = {
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

  function currentAffairsIcon(cat) {
    const key = (cat && cat.icon) || "";
    if (CA_ICONS[key]) return CA_ICONS[key];
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      const hay = ((cat && cat.id) || "") + " " + ((cat && cat.title && cat.title.en) || "");
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(hay)) return svg;
      }
    }
    return (typeof CATEGORY_ICON_SVG !== "undefined" && CATEGORY_ICON_SVG["current-affairs"]) || CA_ICONS.globe;
  }

  function currentAffairsCardHTML(cat, i) {
    const color = cat.color || "#ef4444";
    const nameEn = ebkLang(cat.title, "en");
    const nameAs = ebkLang(cat.title, "as");
    return `
      <a class="sub-card reveal exam-sec-card" href="/current-affairs/${encodeURIComponent(cat.id)}" style="--cat:${color}" data-delay="${(i % 8) * 40}">
        <span class="sub-ico"><span class="cat-svg">${currentAffairsIcon(cat)}</span></span>
        <span class="exam-sec-txt">
          <b>${escapeHtml(nameEn)}</b>
          ${nameAs && nameAs !== nameEn ? `<span class="exam-sec-as">${escapeHtml(nameAs)}</span>` : ""}
          <span class="exam-sec-count" data-ca-count="${escapeHtml(cat.id)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`;
  }

  async function renderCurrentAffairsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let cats = [];
    try { cats = await API.listCurrentAffairs(); } catch (e) { cats = []; }
    if (!Array.isArray(cats)) cats = [];

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("nav.currentAffairs")}</span>
        </nav>
        <h1>${t("ca.title")}</h1>
        <p class="page-desc">${t("ca.sub")}</p>
        <p class="exams-choose">${t("ca.choose")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        ${cats.length
          ? `<div class="sub-grid exam-sec-grid" style="--cat:#ef4444">${cats.map((c, i) => currentAffairsCardHTML(c, i)).join("")}</div>`
          : `<div class="qa-empty"><div class="big">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/></svg>
            </div><p>${escapeHtml(t("ca.empty"))}</p></div>`}
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${escapeHtml(t("ca.note"))}
        </p>
      </section>`;
    observeReveals();
    refreshCurrentAffairsCounts();
    loadCurrentAffairsTotal();
  }

  async function renderCurrentAffairsCategoryPage(main, catId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;

    let meta = null;
    let questions = [];
    try { meta = await API.getCurrentAffairsCategory(catId); } catch (e) { meta = null; }
    try { questions = await API.listCurrentAffairsQuestions(catId); } catch (e) { questions = []; }
    if (!Array.isArray(questions)) questions = [];

    if (!meta) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("ca.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("ca.noCategory"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/current-affairs">${t("ca.back")}</a></div>
        </div>`;
      return;
    }

    const color = meta.color || "#ef4444";
    const titleEn = ebkLang(meta.title, "en") || catId;
    const titleAs = ebkLang(meta.title, "as");
    const readLang = state.lang === "as" ? "as" : "en";
    const count = questions.length;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/current-affairs">${t("nav.currentAffairs")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${t("nav.currentAffairs")}</span>
              <span class="ebk-chip">${t("ca.questions")}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? `<span class="ebk-head-title-as">${escapeHtml(titleAs)}</span>` : ""}</h2>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${t("ca.uploadedBy")}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-calang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-calang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ca-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/current-affairs">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("ca.back")}
          </a>
        </div>
      </div>`;

    const body = $("#ca-body");
    const updated = meta.updated || "";
    const uploadedBy = meta.uploadedBy || "axomexam team";
    const paint = () => {
      if (!body) return;
      const introHTML = ["en", "as"].map((lang) => {
        const intro = ebkLang(meta.intro, lang);
        return intro
          ? `<div data-axo-lang="${lang}"><div class="ca-intro" style="margin:0 0 14px; padding:14px 16px; border-radius:14px; border:1px solid var(--border,#e2e8f0); background:linear-gradient(180deg, color-mix(in srgb, ${color} 9%, transparent), transparent); font-size:.92rem; line-height:1.65; color:var(--ink-soft,#334155); text-align:left;">${escapeHtml(intro)}</div></div>`
          : "";
      }).join("");
      const metaHTML = ["en", "as"].map((lang) => `
        <div data-axo-lang="${lang}"><div class="ca-meta" style="display:flex; flex-wrap:wrap; gap:6px 18px; margin:0 0 18px; font-size:.78rem; color:var(--ink-muted,#64748b);">
          ${updated ? `<span><b>${lang === "as" ? "আপডেট" : "Updated"}:</b> ${escapeHtml(updated)}</span>` : ""}
          <span><b>${lang === "as" ? "আপলোড কৰিছে" : "Uploaded by"}:</b> ${escapeHtml(uploadedBy)}</span>
        </div></div>`).join("");
      /* All current-affairs questions are rendered in both languages so
         JS-executing crawlers see the full set. */
      const qHTML = count
        ? bilingualQAList(questions, 0, true)
        : `<div class="qa-empty"><p>${escapeHtml(t("ca.noContent"))}</p></div>`;
      body.innerHTML = introHTML + metaHTML + qHTML;
    };
    paint();
    showReadProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.calang;
        state.lang = target === "en" ? "en" : "as";
        document.body.setAttribute("data-lang", state.lang);
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.calang === state.lang));
        scheduleReadProgress();
      });
    });
  }

  async function renderExamsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    const exams = await getExamsList();

    if (!exams.length) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${t("exams.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div><p>${escapeHtml(t("exams.empty"))}</p></div>`;
      return;
    }

    const sorted = exams.slice().sort((a, b) => {
      const av = examBookIsReady(a) ? 0 : 1;
      const bv = examBookIsReady(b) ? 0 : 1;
      if (av !== bv) return av - bv;
      return ebkLang(a.title, "en").localeCompare(ebkLang(b.title, "en"));
    });

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("nav.exams")}</span>
        </nav>
        <h1>${t("exams.title")}</h1>
        <p class="page-desc">${t("exams.sub")}</p>
        <p class="exams-choose">${t("exams.choose")}</p>
        <div class="exams-search-wrap">
          <svg class="exams-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="exam-search" type="search" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(t("exams.search.ph"))}" aria-label="${escapeHtml(t("exams.search.ph"))}" />
        </div>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid" id="exams-grid">${sorted.map((e, i) => examBookCardHTML(e, i)).join("")}</div>
        <div id="exams-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${escapeHtml(t("exams.noMatch"))}</p></div>
      </section>`;

    const input = $("#exam-search");
    const cards = $$(".exam-card", main);
    const noMatch = $("#exams-no-match");
    if (input) {
      input.addEventListener("input", () => {
        const q = normalizeText(input.value);
        let visible = 0;
        cards.forEach((card) => {
          const match = !q || (card.dataset.name || "").indexOf(q) !== -1;
          card.style.display = match ? "" : "none";
          if (match) visible++;
        });
        if (noMatch) noMatch.style.display = visible ? "none" : "block";
      });
    }
    observeReveals();
  }

  function examSectionCardHTML(exam, sec, i) {
    const color = examColor(exam, sec);
    const nameEn = ebkLang(sec.title, "en");
    const nameAs = ebkLang(sec.title, "as");
    const isSyllabus = (sec.type === "syllabus");
    return `
      <a class="sub-card reveal exam-sec-card" href="/exams/${encodeURIComponent(exam.id)}/${encodeURIComponent(sec.id)}" style="--cat:${color}" data-delay="${(i % 8) * 40}">
        <span class="sub-ico">${examSectionIcon(sec)}</span>
        <span class="exam-sec-txt">
          <b>${escapeHtml(nameEn)}</b>
          ${nameAs && nameAs !== nameEn ? `<span class="exam-sec-as">${escapeHtml(nameAs)}</span>` : ""}
          ${isSyllabus ? "" : `<span class="exam-sec-count" data-count-exam="${escapeHtml(exam.id)}" data-count-section="${escapeHtml(sec.id)}" hidden></span>`}
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`;
  }

  function examSubIcon(sub) {
    const id = ((sub && sub.id) || "").toLowerCase();
    const label = String(ebkLang(sub && sub.title, "en") || "").toLowerCase();
    const hay = id + " " + label;
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(hay)) return svg;
      }
    }
    return EXAM_SECTION_ICONS.default;
  }

  function examSubcategoryCardHTML(exam, sec, sub, i, parentSubId) {
    const color = examColor(exam, sec);
    const nameEn = ebkLang(sub.title, "en");
    const nameAs = ebkLang(sub.title, "as");
    const href = `/exams/${encodeURIComponent(exam.id)}/${encodeURIComponent(sec.id)}/${parentSubId ? encodeURIComponent(parentSubId) + "/" : ""}${encodeURIComponent(sub.id)}`;
    const countPath = parentSubId ? `${parentSubId}/${sub.id}` : sub.id;
    return `
      <a class="sub-card reveal exam-sec-card" href="${href}" style="--cat:${color}" data-delay="${(i % 8) * 40}">
        <span class="sub-ico">${examSubIcon(sub)}</span>
        <span class="exam-sec-txt">
          <b>${escapeHtml(nameEn)}</b>
          ${nameAs && nameAs !== nameEn ? `<span class="exam-sec-as">${escapeHtml(nameAs)}</span>` : ""}
          <span class="exam-sec-count" data-count-exam="${escapeHtml(exam.id)}" data-count-section="${escapeHtml(sec.id)}" data-count-path="${escapeHtml(countPath)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`;
  }

  /* ---- Question counts on exam cards ----
     Counts resolve lazily after the grid renders so the page paints
     immediately; each card's badge fills in as its folder is read. */
  function examFindSubNode(subs, path) {
    let list = subs || [];
    let node = null;
    for (const id of path) {
      node = list.find((s) => s && s.id === id) || null;
      if (!node) return null;
      list = node.subcategories || [];
    }
    return node;
  }

  async function examSubtreeQuestionCount(examId, sectionId, path, node) {
    const children = (node && Array.isArray(node.subcategories)) ? node.subcategories : [];
    if (children.length) {
      const sums = await Promise.all(
        children.map((c) => examSubtreeQuestionCount(examId, sectionId, path.concat(c.id), c))
      );
      return sums.reduce((a, b) => a + b, 0);
    }
    const qs = await API.listExamQuestions(examId, sectionId, path[0], path[1]);
    return qs.length;
  }

  async function examSectionQuestionCount(examId, sec) {
    const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
    if (subs.length) {
      const sums = await Promise.all(
        subs.map((s) => examSubtreeQuestionCount(examId, sec.id, [s.id], s))
      );
      return sums.reduce((a, b) => a + b, 0);
    }
    const data = await API.getExamSection(examId, sec.id);
    return ((data && data.questions) || []).length;
  }

  async function hydrateExamCardCounts(scope, exam) {
    if (!scope || !exam) return;
    const badges = Array.from(scope.querySelectorAll(".exam-sec-count"));
    const precomputed = state.counts && state.counts.examSectionCounts;
    await Promise.all(badges.map(async (badge) => {
      const examId = badge.dataset.countExam || exam.id;
      const secId = badge.dataset.countSection;
      const sec = (exam.sections || []).find((s) => s.id === secId);
      if (!sec || sec.type === "syllabus") return;
      const pathStr = badge.dataset.countPath || "";
      if (precomputed) {
        const key = pathStr ? `${examId}/${secId}/${pathStr}` : `${examId}/${secId}`;
        if (Object.prototype.hasOwnProperty.call(precomputed, key)) {
          const pn = Number(precomputed[key]) || 0;
          if (pn > 0) {
            badge.textContent = `${pn} ${t("topic.questions")}`;
            badge.hidden = false;
          }
          return;
        }
      }
      let n = 0;
      try {
        if (pathStr) {
          const path = pathStr.split("/").filter(Boolean);
          const node = examFindSubNode(sec.subcategories || [], path);
          n = await examSubtreeQuestionCount(examId, secId, path, node);
        } else {
          n = await examSectionQuestionCount(examId, sec);
        }
      } catch (e) {
        n = 0;
      }
      if (n > 0) {
        badge.textContent = `${n} ${t("topic.questions")}`;
        badge.hidden = false;
      }
    }));
  }

  /* Total questions in one exam book, from the precomputed manifest when
     available, otherwise by walking the book live. */
  async function examBookQuestionCount(exam) {
    if (!exam) return 0;
    const precomputed = state.counts && state.counts.examSectionCounts;
    if (precomputed) {
      let sum = 0;
      let seen = false;
      Object.keys(precomputed).forEach((key) => {
        const parts = key.split("/");
        if (parts[0] !== exam.id) return;
        if (parts.length !== 2) return;
        const sec = (exam.sections || []).find((s) => s.id === parts[1]);
        if (!sec || sec.type === "syllabus") return;
        seen = true;
        sum += Number(precomputed[key]) || 0;
      });
      if (seen) return sum;
    }
    const sections = (exam.sections || []).filter((s) => s.type !== "syllabus");
    const counts = await Promise.all(
      sections.map((s) => examSectionQuestionCount(exam.id, s).catch(() => 0))
    );
    return counts.reduce((a, b) => a + b, 0);
  }

  async function hydrateExamBookTotal(scope, exam) {
    const el = scope && scope.querySelector(".exam-book-total");
    if (!el) return;
    const n = await examBookQuestionCount(exam);
    if (!n) return;
    const num = n.toLocaleString("en-IN");
    el.textContent = `${num} ${t("exams.totalQuestions")}`;
    el.hidden = false;
  }

  /* Recompute the homepage hero counters (used live while counts load). */
  function updateHeroTotals() {
    const totalEl = $("#stat-total-questions");
    if (totalEl) {
      const total = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0)
        + (state.examQuestionTotal || 0) + (state.caQuestionTotal || 0) + (state.mockTotal || 0);
      totalEl.textContent = `${total.toLocaleString()}+`;
    }
    const pdfEl = $("#stat-total-pdfs");
    if (pdfEl) {
      pdfEl.textContent = `${PDF_NOTE_COUNT}+`;
    }
    const topicsEl = $("#stat-total-topics");
    if (topicsEl) {
      const topics = state.topicsTotal || state.topicIndex.length;
      topicsEl.textContent = `${topics.toLocaleString()}+`;
    }
    syncAppBanner();
  }

  /* The Android app is a WebView shell: it hides the site hero and injects its
     own promo banner whose question / topic counts are baked into the APK. Those
     hardcoded numbers go stale the moment the site gains questions. The shell
     loads this live page, so rewrite the banner from the same counts.json data
     the hero uses - this corrects already-installed APKs without a rebuild.
     No-op in a normal browser, where the banner never exists. */
  function syncAppBanner() {
    const banner = document.getElementById("axo-banner");
    if (!banner) return;
    const stats = banner.querySelectorAll(".axo-banner-stats b");
    if (!stats.length) return;

    /* Prefer the hero's own counters (the shell only hides the hero with CSS,
       so its text is still in the DOM) - that keeps the banner and hero equal
       by construction. Fall back to computing from state if the hero is gone. */
    const heroQ = document.getElementById("stat-total-questions");
    const heroT = document.getElementById("stat-total-topics");
    let q = heroQ && heroQ.textContent.trim();
    let tp = heroT && heroT.textContent.trim();
    if (!q) {
      const total = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0)
        + (state.examQuestionTotal || 0) + (state.caQuestionTotal || 0) + (state.mockTotal || 0);
      if (!total) return;
      q = `${total.toLocaleString()}+`;
    }
    if (!tp) tp = `${(state.topicsTotal || state.topicIndex.length).toLocaleString()}+`;

    const prevQ = stats[0].textContent;
    const prevT = stats[1] ? stats[1].textContent : "";
    if (prevQ === q && prevT === tp) return;
    stats[0].textContent = q;
    if (stats[1]) stats[1].textContent = tp;

    /* The two prose lines repeat the same numbers; swap the old strings for
       the new ones so the text matches the stat tiles. */
    banner.querySelectorAll(".axo-banner-as, .axo-banner-en").forEach((p) => {
      let html = p.innerHTML;
      if (prevQ && prevQ !== q) html = html.split(prevQ).join(q);
      if (prevT && prevT !== tp) html = html.split(prevT).join(tp);
      p.innerHTML = html;
    });
  }

  /* The shell re-injects the banner on route changes, so watch #app and keep it
     in step. */
  function watchAppBanner() {
    if (document.getElementById("axo-banner")) syncAppBanner();
    const app = document.getElementById("app");
    if (!app || !window.MutationObserver) return;
    new MutationObserver(() => syncAppBanner()).observe(app, { childList: true, subtree: true });
  }

  /* Sum every question in the "Your Exams" library and add it to the hero
     counter. Runs once per page load; updates the counter as each exam loads. */
  function loadExamQuestionTotal() {
    /* Precomputed total from data/counts.json — no exam files downloaded. */
    if (state.counts && typeof state.counts.examsTotal === "number") {
      state.examQuestionTotal = state.counts.examsTotal;
      state.examTotalLoaded = true;
      updateHeroTotals();
      return Promise.resolve(state.examQuestionTotal);
    }
    if (state.examTotalPromise) return state.examTotalPromise;
    state.examTotalPromise = (async () => {
      try {
        await getExamsList();
        const exams = (state.exams || []).filter((e) => examIsAvailable(e));
        let total = 0;
        for (const exam of exams) {
          const sections = Array.isArray(exam.sections) ? exam.sections : [];
          const parts = await Promise.all(sections.map((sec) => {
            if (!sec || sec.type === "syllabus") return Promise.resolve(0);
            return examSectionQuestionCount(exam.id, sec).catch(() => 0);
          }));
          total += parts.reduce((a, b) => a + b, 0);
          state.examQuestionTotal = total;
          updateHeroTotals();
        }
        state.examQuestionTotal = total;
        state.examTotalLoaded = true;
      } catch (e) {
        /* leave the counter as-is if exam data is unavailable */
      }
      updateHeroTotals();
      return state.examQuestionTotal;
    })();
    return state.examTotalPromise;
  }

  /* Current Affairs live counts. The total feeds the homepage hero counter
     and each category card shows its own question count, hydrated once its
     folder is read (mirrors the "Your Exams" section cards). */
  function refreshCurrentAffairsCounts() {
    const counts = state.caCounts || {};
    $$(".exam-sec-count[data-ca-count]").forEach((badge) => {
      const id = badge.dataset.caCount;
      if (!id || !Object.prototype.hasOwnProperty.call(counts, id)) return;
      const n = Number(counts[id]) || 0;
      if (n > 0) {
        badge.textContent = `${n} ${t("topic.questions")}`;
        badge.hidden = false;
      }
    });
  }

  /* Sum every question in the Free Current Affairs library and add it to the
     hero counter. Runs once per page load; the counter updates as soon as the
     counts arrive. */
  function loadCurrentAffairsTotal() {
    if (state.caTotalPromise) return state.caTotalPromise;
    state.caTotalPromise = (async () => {
      try {
        const data = await API.getCurrentAffairsCounts();
        state.caCounts = (data && data.counts) || {};
        state.caQuestionTotal = (data && data.total) || 0;
        updateHeroTotals();
        refreshCurrentAffairsCounts();
      } catch (e) {
        /* leave the counters as-is if current affairs data is unavailable */
      }
      return state.caQuestionTotal;
    })();
    return state.caTotalPromise;
  }

  async function renderExamPage(main, examId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);

    if (!exam) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const color = examColor(exam);
    const titleEn = examBookName(exam, "en");
    const titleAs = examBookName(exam, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    const subAs = ebkLang(exam.subtitle, "as");
    const available = examBookIsReady(exam);

    if (!available) {
      main.innerHTML = examBookComingSoonHTML(exam);
      return;
    }

    const sections = exam.sections || [];
    const cover = exam.cover ? String(exam.cover) : "";
    const titleHTML = `${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? ` <span class="exam-head-as">${escapeHtml(titleAs)}</span>` : ""}`;
    const descHTML = `${escapeHtml(subEn)}${subAs && subAs !== subEn ? ` &bull; ${escapeHtml(subAs)}` : ""}`;
    const crumbHTML = `
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>`;
    const headHTML = cover
      ? `<div class="page-head">
          <nav class="breadcrumb">${crumbHTML}</nav>
        </div>
        <section class="exam-cover-hero" style="--ebk:${color}">
          <div class="exam-cover-hero-media">
            <img src="${escapeHtml(cover)}" alt="${escapeHtml(examCoverAlt(exam, state.lang))}" width="912" height="1166" loading="eager" decoding="async">
          </div>
          <div class="exam-cover-hero-info">
            <h1>${titleHTML}</h1>
            <p class="page-desc">${descHTML}</p>
            <p class="exam-book-total" hidden></p>
            <p class="exams-choose">${t("exams.subjects")}</p>
          </div>
        </section>`
      : `<div class="page-head">
          <nav class="breadcrumb">${crumbHTML}</nav>
          <h1>${titleHTML}</h1>
          <p class="page-desc">${descHTML}</p>
          <p class="exam-book-total" hidden></p>
          <p class="exams-choose">${t("exams.subjects")}</p>
        </div>`;
    main.innerHTML = `
      ${headHTML}
      <section class="section" style="padding-bottom:46px;">
        <div class="sub-grid exam-sec-grid" style="--cat:${color}">
          ${sections.map((sec, i) => examSectionCardHTML(exam, sec, i)).join("")}
        </div>
      </section>`;
    observeReveals();
    hydrateExamCardCounts(main, exam);
    hydrateExamBookTotal(main, exam);
  }

  /* Options list for an exam question — same 4-option view as the practice section. */
  function examOptionsHTML(q, lang) {
    const options = getOptionsList(q, lang);
    if (!options.length) return "";
    return `
      <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
        ${options.map((opt, optIdx) => `
          <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
            <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b>
            <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
          </div>
        `).join("")}
      </div>`;
  }

  /* Resolve the stored answer to something readable.
     - A text option is shown with its letter, e.g. "A) Forsake".
     - Picture/shape options have no text, so the stored index (or letter)
       is shown as the option letter instead, e.g. "A". */
  function examResolveAnswer(q, lang, answerText) {
    const plain = String(answerText || "").replace(/<[^>]+>/g, "").trim();
    if (plain) {
      const m = /^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(plain);
      if (!m) return answerText;
      const options = getOptionsList(q, lang);
      const idx = m[1].toLowerCase().charCodeAt(0) - 97;
      if (options[idx] === undefined || options[idx] === "") return answerText;
      return `${m[1].toUpperCase()}) ${options[idx]}`;
    }

    /* No textual answer: for picture/shape choices fall back to the letter. */
    const fops = figureOptions(q);
    if (fops && fops.length) {
      const raw = q && q.correct !== undefined ? q.correct : (q ? q.answer : undefined);
      if (Number.isInteger(raw)) {
        if (raw >= 0 && raw < fops.length) {
          return fops[raw].letter || String.fromCharCode(65 + raw);
        }
      } else if (typeof raw === "string") {
        const lm = /^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(raw.trim());
        if (lm) return lm[1].toUpperCase();
      }
    }
    return answerText;
  }

  function examQACardHTML(q, n, lang, hideCat) {
    const cat = hideCat ? "" : ebkLang(q.category, lang);
    const qtext = extractField(q, "question", lang);
    const atext = examResolveAnswer(q, lang, extractField(q, "answer", lang));
    const explanation = extractField(q, "explanation", lang);
    const media = mediaBlock(q);
    const fopts = figureOptions(q);

    const rawAns = (q.a && typeof q.a === "object" && q.a[lang]) || q.a || q.answer;
    const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

    const catChip = cat
      ? `<span style="display:block; margin-bottom:4px; font-size:.68rem; font-weight:800; letter-spacing:.4px; text-transform:uppercase; color:var(--ebk,#4f46e5);">${escapeHtml(cat)}</span>`
      : "";

    if (isStepArray) {
      return `
        <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
          <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
            ${catChip}${n}. ${formatMath(qtext)}
          </div>
          ${media}
          ${fopts ? figureOptionsHTML(q, { compact: true }) : examOptionsHTML(q, lang)}
          <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
            <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
            ${explanation ? `
              <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                <b style="color:var(--ink,#0f172a);">${lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${explanation}
              </div>` : ""}
          </div>
        </article>`;
    }

    return `
      <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
        <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
          <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${n}</span>
          <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${catChip}${formatMath(qtext)}</span>
        </div>
        ${media}
        ${fopts ? figureOptionsHTML(q) : examOptionsHTML(q, lang)}
        ${atext ? `<div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
          <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${t("topic.answer")}:</span>
          <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${formatMath(atext)}</span>
        </div>` : ""}
        ${explanation ? `
          <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
            <b style="color:var(--ink,#0f172a);">${lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${formatMath(explanation)}
          </div>` : ""}
      </article>`;
  }

  /* Emit every question twice, once per language, so JS-executing crawlers
     receive both the English and Assamese sets. The existing data-axo-lang
     CSS rules keep only the active language visible to readers. */
  function bilingualQAList(questions, start, hideCat) {
    const items = Array.isArray(questions) ? questions : [];
    const firstNo = Number.isInteger(start) ? start : 0;
    return `<div class="qa-list">${items.map((q, i) =>
      ["en", "as"].map((lang) =>
        `<div data-axo-lang="${lang}">${examQACardHTML(q, firstNo + i + 1, lang, !!hideCat)}</div>`
      ).join("")
    ).join("")}</div>`;
  }

  /* Render the whole question set on one page. Kept as a factory so callers
     keep using `const paint = makePaginatedQA(...); paint();`. */
  function makePaginatedQA(body, questions, emptyHTML) {
    const items = Array.isArray(questions) ? questions : [];
    return () => {
      if (!body) return;
      if (!items.length) {
        body.innerHTML = emptyHTML || `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;
        return;
      }
      body.innerHTML = bilingualQAList(items, 0, false);
    };
  }

  function examBodyHTML(data, sec, lang, idPrefix) {
    const type = data.type || (sec && sec.type) || "qa";
    const prefix = String(idPrefix || "exam-ch").replace(/[^A-Za-z0-9_-]/g, "");

    if (type === "syllabus" || (data.chapters && data.chapters.length)) {
      const chapters = data.chapters || [];
      if (!chapters.length) return `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;
      return `<div class="ebk-chapters">${chapters.map((c, i) => `
        <section class="ebk-chapter" id="${prefix}-${i}">
          <h3 class="ebk-ch-title"><span class="ebk-ch-no">${i + 1}</span>${escapeHtml(ebkLang(c.title, lang))}</h3>
          <div class="ebk-ch-body">${ebkContentHTML(ebkLang(c.content, lang))}</div>
        </section>`).join("")}</div>`;
    }

    const qs = Array.isArray(data.questions) ? data.questions : [];
    if (!qs.length) return `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;

    return `<div class="qa-list">${qs.map((q, i) => examQACardHTML(q, i + 1, lang)).join("")}</div>`;
  }

  /* Render syllabus/chapter-style exam content in both languages. */
  function bilingualExamBody(data, sec) {
    return ["en", "as"].map((lang) =>
      `<div data-axo-lang="${lang}">${examBodyHTML(data, sec, lang, lang === "en" ? "exam-ch" : "exam-ch-as")}</div>`
    ).join("");
  }

  async function renderExamSectionPage(main, examId, sectionId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);
    const sec = exam ? (exam.sections || []).find((s) => s.id === sectionId) : null;

    if (exam && !examBookIsReady(exam)) {
      main.innerHTML = examBookComingSoonHTML(exam);
      return;
    }

    if (!exam || !sec) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
    if (subs.length) {
      const color = examColor(exam, sec);
      const examEn = examBookName(exam, "en");
      const secEn = ebkLang(sec.title, "en");
      const secAs = ebkLang(sec.title, "as");
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(secEn)}</span>
          </nav>
          <h1>${escapeHtml(secEn)}${secAs && secAs !== secEn ? ` <span class="exam-head-as">${escapeHtml(secAs)}</span>` : ""}</h1>
          <p class="exams-choose">${t("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${color}">
            ${subs.map((sub, i) => examSubcategoryCardHTML(exam, sec, sub, i)).join("")}
          </div>
        </section>`;
      observeReveals();
      hydrateExamCardCounts(main, exam);
      return;
    }

    let data = null;
    try { data = await API.getExamSection(examId, sectionId); } catch (e) { data = null; }

    const color = examColor(exam, sec);
    const examEn = examBookName(exam, "en");
    const secEn = ebkLang(sec.title, "en");

    if (!data) {
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(secEn)}</span>
          </nav>
          <h1>${escapeHtml(secEn)}</h1>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${escapeHtml(t("exams.noContent"))}</p>
        <div style="margin-top:16px;"><a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(examId)}">${t("exams.backToExams")}</a></div></div>`;
      return;
    }

    const readLang = state.lang === "as" ? "as" : "en";
    const titleD = ebkLang(data.title, "en") || secEn;
    const titleDAs = ebkLang(data.title, "as") || ebkLang(sec.title, "as");
    const descD = localized(data.description);
    const isSyllabus = (data.type || sec.type) === "syllabus";

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleD)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(examEn)}</span>
              <span class="ebk-chip">${escapeHtml(isSyllabus ? t("exams.syllabus") : t("exams.questions"))}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(titleD)}${titleDAs && titleDAs !== titleD ? `<span class="ebk-head-title-as">${escapeHtml(titleDAs)}</span>` : ""}</h2>
            ${descD ? `<p class="ebk-desc">${escapeHtml(descD).replace(/\n/g, "<br>")}</p>` : ""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-exlang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-exlang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(examId)}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("exams.backToExams")}
          </a>
        </div>
      </div>`;

    const body = $("#exam-body");
    const secType = data.type || (sec && sec.type);
    const isChapterData = secType === "syllabus" || (data.chapters && data.chapters.length);
    const paint = isChapterData
      ? () => { if (body) body.innerHTML = bilingualExamBody(data, sec); }
      : makePaginatedQA(body, Array.isArray(data.questions) ? data.questions : [], `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`);
    paint();
    showReadProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.exlang;
        state.lang = target;
        document.body.setAttribute("data-lang", target);
        Array.from(main.querySelectorAll(".lang-btn")).forEach((x) => x.classList.toggle("active", x.dataset.exlang === target));
        scheduleReadProgress();
      });
    });
  }

  async function renderExamSubcategoryPage(main, examId, sectionId, subId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);
    const sec = exam ? (exam.sections || []).find((s) => s.id === sectionId) : null;
    const sub = sec ? (sec.subcategories || []).find((s) => s.id === subId) : null;

    if (exam && !examBookIsReady(exam)) {
      main.innerHTML = examBookComingSoonHTML(exam);
      return;
    }

    if (!exam || !sec || !sub) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const childSubs = Array.isArray(sub.subcategories) ? sub.subcategories : [];
    if (childSubs.length) {
      const color = examColor(exam, sec);
      const examEn = examBookName(exam, "en");
      const secEn = ebkLang(sec.title, "en");
      const subEn = ebkLang(sub.title, "en");
      const subAs = ebkLang(sub.title, "as");
      const secHref = `/exams/${encodeURIComponent(examId)}/${encodeURIComponent(sectionId)}`;
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <a href="${secHref}">${escapeHtml(secEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(subEn)}</span>
          </nav>
          <h1>${escapeHtml(subEn)}${subAs && subAs !== subEn ? ` <span class="exam-head-as">${escapeHtml(subAs)}</span>` : ""}</h1>
          <p class="exams-choose">${t("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${color}">
            ${childSubs.map((child, i) => examSubcategoryCardHTML(exam, sec, child, i, sub.id)).join("")}
          </div>
        </section>`;
      observeReveals();
      hydrateExamCardCounts(main, exam);
      return;
    }

    const color = examColor(exam, sec);
    const examEn = examBookName(exam, "en");
    const secEn = ebkLang(sec.title, "en");
    const subEn = ebkLang(sub.title, "en");
    const subAs = ebkLang(sub.title, "as");
    const secHref = `/exams/${encodeURIComponent(examId)}/${encodeURIComponent(sectionId)}`;

    let questions = [];
    try { questions = await API.listExamQuestions(examId, sectionId, subId); } catch (e) { questions = []; }
    if (!Array.isArray(questions)) questions = [];

    const readLang = state.lang === "as" ? "as" : "en";
    const count = questions.length;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <a href="${secHref}">${escapeHtml(secEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(subEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(examEn)}</span>
              <span class="ebk-chip">${escapeHtml(t("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(subEn)}${subAs && subAs !== subEn ? `<span class="ebk-head-title-as">${escapeHtml(subAs)}</span>` : ""}</h2>
            ${count ? `<p class="ebk-desc">${count} ${escapeHtml(t("exams.questionCount"))}</p>` : ""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-exlang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-exlang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${secHref}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("exams.backToSection")}
          </a>
        </div>
      </div>`;

    const body = $("#exam-body");
    const paint = makePaginatedQA(body, questions, `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`);
    paint();
    showReadProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.exlang;
        state.lang = target;
        document.body.setAttribute("data-lang", target);
        Array.from(main.querySelectorAll(".lang-btn")).forEach((x) => x.classList.toggle("active", x.dataset.exlang === target));
        scheduleReadProgress();
      });
    });
  }

  async function renderExamSubSubcategoryPage(main, examId, sectionId, subId, childId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);
    const sec = exam ? (exam.sections || []).find((s) => s.id === sectionId) : null;
    const sub = sec ? (sec.subcategories || []).find((s) => s.id === subId) : null;
    const child = sub ? (sub.subcategories || []).find((s) => s.id === childId) : null;

    if (exam && !examBookIsReady(exam)) {
      main.innerHTML = examBookComingSoonHTML(exam);
      return;
    }

    if (!exam || !sec || !sub || !child) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const color = examColor(exam, sec);
    const examEn = examBookName(exam, "en");
    const secEn = ebkLang(sec.title, "en");
    const subEn = ebkLang(sub.title, "en");
    const childEn = ebkLang(child.title, "en");
    const childAs = ebkLang(child.title, "as");
    const secHref = `/exams/${encodeURIComponent(examId)}/${encodeURIComponent(sectionId)}`;
    const subHref = `${secHref}/${encodeURIComponent(subId)}`;

    let questions = [];
    try { questions = await API.listExamQuestions(examId, sectionId, subId, childId); } catch (e) { questions = []; }
    if (!Array.isArray(questions)) questions = [];

    const readLang = state.lang === "as" ? "as" : "en";
    const count = questions.length;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <a href="${secHref}">${escapeHtml(secEn)}</a><span class="bc-sep">/</span>
          <a href="${subHref}">${escapeHtml(subEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(childEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(examEn)}</span>
              <span class="ebk-chip">${escapeHtml(t("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(childEn)}${childAs && childAs !== childEn ? `<span class="ebk-head-title-as">${escapeHtml(childAs)}</span>` : ""}</h2>
            ${count ? `<p class="ebk-desc">${count} ${escapeHtml(t("exams.questionCount"))}</p>` : ""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-exlang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-exlang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${subHref}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${escapeHtml(t("exams.backToSection"))}
          </a>
        </div>
      </div>`;

    const body = $("#exam-body");
    const paint = makePaginatedQA(body, questions, `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`);
    paint();
    showReadProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.exlang;
        state.lang = target;
        document.body.setAttribute("data-lang", target);
        Array.from(main.querySelectorAll(".lang-btn")).forEach((x) => x.classList.toggle("active", x.dataset.exlang === target));
        scheduleReadProgress();
      });
    });
  }

  /* ================= Download App (APK) ================= */
  function renderDownloadAppPage(main) {
    const isAs = state.lang === "as";
    const features = isAs ? [
      ["সকলো মক টেষ্ট", "অধ্যায়ভিত্তিক সময়সীমাযুক্ত মক টেষ্ট, তাৎক্ষণিক স্ক'ৰ আৰু পৰ্যালোচনাৰ সৈতে — প্ৰকৃত পৰীক্ষাৰ দৰেই।"],
      ["দ্বিভাষিক প্ৰশ্ন-উত্তৰ অনুশীলন", "ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা।"],
      ["য'ত-ত'ত ই-বুক", "এপৰ ভিতৰতে প্ৰতিটো বিষয়ৰ ই-বুক পঢ়ক — অসমৰ ইতিহাস, ৰাজনীতি, ভূগোল আৰু অধিক।"],
      ["পূৰ্ববৰ্তী বছৰৰ প্ৰশ্নপত্ৰ", "পৰীক্ষা আৰু বছৰ অনুসৰি সজোৱা সমাধানসহ পূৰ্ববৰ্তী প্ৰশ্নপত্ৰ।"],
      ["PDF টোকা আৰু ডাউনল'ড", "অধ্যয়ন সামগ্ৰী সংৰক্ষণ কৰি অফলাইন পুনৰীক্ষণৰ বাবে সাজু ৰাখক।"],
      ["হালধীয়া আৰু দ্ৰুত", "সম্পূৰ্ণ axomexam অভিজ্ঞতা এক সৰু ১.৬৮ MB এপত।"]
    ] : [
      ["All Mock Tests", "Timed chapter-wise mock tests with instant score and review, exactly like the real exam."],
      ["Bilingual Q&A Practice", "Practice questions, answers and explanations in both English and Assamese."],
      ["E-Books On the Go", "Read every subject e-book right inside the app — Assam History, Polity, Geography and more."],
      ["Previous Year Papers", "Solved past papers organised by exam and year for focused revision."],
      ["PDF Notes & Downloads", "Save study material and keep it ready for offline revision."],
      ["Lightweight & Fast", "The complete axomexam experience in a compact 1.68 MB app."]
    ];
    const feats = features.map(([title, text]) => `
        <div class="appdl-feature">
          <span class="appdl-ico"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
          <h3>${title}</h3>
          <p>${text}</p>
        </div>`).join("");

    const faqs = isAs ? [
      ["axomexam এপ বিনামূলীয়া নেকি?", "হয়। এপটো ১০০% বিনামূলীয়া, কোনো ছাইন-আপ, চাবোন বা লুকুৱা শুল্ক নাই।"],
      ["ইয়াক Google Play Store ত কিয় নাই?", "প্ৰতিজন প্ৰাৰ্থীৰ বাবে বিনামূলীয়া ৰাখিবলৈ আমি এপটো প্ৰত্যক্ষ APK ডাউনল'ড হিচাপে বিতৰণ কৰোঁ। পিছত Play Store ত মুকলি কৰিব পাৰি।"],
      ["ইণ্টাৰনেট সংযোগ লাগে নেকি?", "হয়। অধ্যয়ন সামগ্ৰী, মক টেষ্ট আৰু টোকা অনলাইনত ল'ড হয়, গতিকে সক্ৰিয় সংযোগ প্ৰয়োজন।"],
      ["ইনষ্টল কৰা নিৰাপদ নেকি?", "হয়। এইটো আমাৰ নিজা চৰকাৰী বিল্ড। সুৰক্ষাৰ বাবে কেৱল এই পৃষ্ঠাৰ পৰা (axomexam.in) ডাউনল'ড কৰক।"],
      ["কোনবোৰ Android সংস্কৰণ সমৰ্থিত?", "এপটো শেহতীয়া Android System WebView থকা আধুনিক Android ফোনত কাম কৰে।"]
    ] : [
      ["Is the axomexam app free?", "Yes. The app is 100% free with no sign-up, subscription or hidden charges."],
      ["Why is it not on the Google Play Store?", "We distribute the app as a direct APK download so it stays free for every aspirant. A Play Store release may come later."],
      ["Do I need an internet connection?", "Yes. Study content, mock tests and notes are loaded online, so an active connection is required."],
      ["Is it safe to install?", "Yes. This is our own official build. For your safety, download it only from this page (axomexam.in)."],
      ["Which Android versions are supported?", "The app works on modern Android phones with an up-to-date Android System WebView."]
    ];
    const faqHTML = faqs.map(([q, a]) => `
        <details class="appdl-faq">
          <summary>${q}</summary>
          <p>${a}</p>
        </details>`).join("");

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${isAs ? "এপ ডাউনলোড" : "Download App"}</span></nav>
        <h1>${isAs ? "axomexam এপ ডাউনলোড কৰক" : "Download the axomexam App"}</h1>
        <p class="page-desc">${isAs ? "axomexam Android এপ লাভ কৰক — সকলো মক টেষ্ট, দ্বিভাষিক প্ৰশ্ন-উত্তৰ অনুশীলন, ই-বুক আৰু পূৰ্ববৰ্তী বছৰৰ প্ৰশ্নপত্ৰ এক হালধীয়া এপত। বিনামূলীয়া, ছাইন-আপ নালাগে।" : "Get the axomexam Android app — all mock tests, bilingual Q&amp;A practice, e-books and previous year papers in one lightweight app. Free, no sign-up."}</p>
      </div>

      <section class="section appdl-hero">
        <div class="appdl-card">
          <img class="appdl-logo" src="/app/axomexam-icon.png" alt="axomexam app logo" width="104" height="104" />
          <div class="appdl-body">
            <h2 class="appdl-title">axomexam — Exam Prep App</h2>
            <p class="appdl-tag">${isAs ? "অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি, এতিয়া আপোনাৰ ফোনত।" : "Assam competitive exam preparation, now on your phone."}</p>
            <ul class="appdl-meta">
              <li><b>${isAs ? "সংস্কৰণ" : "Version"}</b> 2.6</li>
              <li><b>${isAs ? "আকাৰ" : "Size"}</b> 1.68 MB</li>
              <li><b>${isAs ? "আপডেট" : "Updated"}</b> ${isAs ? "৬ নৱেম্বৰ ২০২৬" : "6 Nov 2026"}</li>
              <li><b>${isAs ? "ফৰ্মেট" : "Format"}</b> APK</li>
              <li><b>${isAs ? "পেকেজ" : "Package"}</b> in.axomexam.app</li>
              <li><b>${isAs ? "মূল্য" : "Price"}</b> ${isAs ? "বিনামূলীয়া" : "Free"}</li>
            </ul>
            <div class="appdl-actions">
              <a class="btn btn-accent appdl-download" href="/app/axomexam-v2.6.apk" download>${isAs ? "APK ডাউনলোড কৰক (1.68 MB)" : "Download APK (1.68 MB)"}</a>
              <a class="btn btn-outline" href="#install">${isAs ? "কেনেকৈ ইনষ্টল কৰিব" : "How to install"}</a>
            </div>
            <p class="appdl-note">${isAs ? "প্ৰত্যক্ষ ডাউনল'ড · ছাইন-আপ নালাগে · ১০০% বিনামূলীয়া" : "Direct download · No sign-up · 100% free"}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">${isAs ? "এপৰ ভিতৰত কি আছে" : "What's inside the app"}</h2>
        <div class="appdl-grid">${feats}</div>
      </section>

      <section class="section" id="install">
        <h2 class="appdl-section-title">${isAs ? "APK কেনেকৈ ইনষ্টল কৰিব" : "How to install the APK"}</h2>
        <ol class="appdl-steps">
          ${isAs ? `<li><b>APK ডাউনলোড কৰক।</b> ওপৰৰ ডাউনলোড বুটামত টিপক। <code>axomexam-v2.6.apk</code> ফাইলটো আপোনাৰ ফোনত সংৰক্ষিত হ'ব।</li>
          <li><b>ইনষ্টলৰ অনুমতি দিয়ক।</b> Android এ বাধা দিলে, Settings খুলি আপোনাৰ ব্ৰাউজাৰৰ বাবে “Install unknown apps” (বা “Unknown sources”) সক্ৰিয় কৰক।</li>
          <li><b>এপটো ইনষ্টল কৰক।</b> ডাউনল'ড কৰা ফাইলটো Downloads বা জাননীৰ পৰা খুলি <b>Install</b> টিপক।</li>
          <li><b>খুলি শিকা আৰম্ভ কৰক।</b> আপোনাৰ এপ ড্ৰয়াৰৰ পৰা <b>axomexam</b> আৰম্ভ কৰি অনুশীলন আৰম্ভ কৰক।</li>` : `<li><b>Download the APK.</b> Tap the Download button above. The file <code>axomexam-v2.6.apk</code> will be saved to your phone.</li>
          <li><b>Allow the install.</b> If Android blocks it, open Settings and enable “Install unknown apps” (or “Unknown sources”) for your browser.</li>
          <li><b>Install the app.</b> Open the downloaded file from Downloads or the notification, then tap <b>Install</b>.</li>
          <li><b>Open and start learning.</b> Launch <b>axomexam</b> from your app drawer and begin practising.</li>`}
        </ol>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">${isAs ? "ছিষ্টেমৰ প্ৰয়োজনীয়তা" : "System requirements"}</h2>
        <ul class="appdl-meta">
          <li><b>${isAs ? "প্লেটফৰ্ম" : "Platform"}</b> Android</li>
          <li><b>${isAs ? "এপ সংস্কৰণ" : "App version"}</b> 2.6</li>
          <li><b>${isAs ? "ফাইলৰ আকাৰ" : "File size"}</b> 1.68 MB</li>
          <li><b>${isAs ? "ইণ্টাৰনেট" : "Internet"}</b> ${isAs ? "প্ৰয়োজন" : "Required"}</li>
          <li><b>${isAs ? "মূল্য" : "Price"}</b> ${isAs ? "বিনামূলীয়া" : "Free"}</li>
        </ul>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">${isAs ? "প্ৰায়ে সোধা প্ৰশ্ন" : "Frequently asked questions"}</h2>
        <div class="appdl-faqs">${faqHTML}</div>
      </section>

      <section class="section">
        <div class="appdl-safety">
          ${isAs ? `<b>সুৰক্ষা আৰু দায়মুক্তি:</b> আপোনাৰ সুৰক্ষাৰ বাবে কেৱল এই চৰকাৰী পৃষ্ঠাৰ পৰা (axomexam.in) এপটো ডাউনল'ড কৰক। axomexam APSC, অসম আৰক্ষী, SSC, ৰে'লৱে, ADRE বা কোনো চৰকাৰী সংস্থাৰ চৰকাৰী এপ <b>নহয়</b>। সকলো পৰীক্ষাৰ নাম আৰু ট্ৰেডমাৰ্ক তেওঁলোকৰ নিজৰ মালিকৰ। এইটো এক স্বতন্ত্ৰ অধ্যয়ন সহায়ক।` : `<b>Safety &amp; disclaimer:</b> For your security, download the app only from this official page (axomexam.in). axomexam is NOT an official app of APSC, Assam Police, SSC, Railway, ADRE or any government body. All exam names and trademarks belong to their respective owners. This is an independent study aid.`}
        </div>
      </section>`;
    const dlLink = main.querySelector(".appdl-download");
    if (dlLink) dlLink.addEventListener("click", markAppPromptDone);
    observeReveals();
  }

  /* ================= Previous Year Questions ================= */
  async function renderPreviousYear(main, segs) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    if (segs.length === 1) return renderPreviousYearExams(main);
    const exam = ((typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || []).find((e) => e.id === segs[1]);
    if (!exam) return render404(main);

    const children = Array.isArray(exam.children) ? exam.children : [];
    const hasChildren = children.length > 0;

    if (hasChildren) {
      if (segs.length === 2) return renderPreviousYearSubExams(main, exam, children);
      const subExam = children.find((c) => c.id === segs[2]);
      if (!subExam) return render404(main);
      if (segs.length === 3) {
        const years = await API.listPreviousYearYears(exam.id, subExam.id);
        return renderPreviousYearYears(main, subExam, years, exam);
      }
      const year = segs[3];
      const files = await API.listPreviousYearPdfs(exam.id, year, subExam.id);
      return renderPreviousYearPapers(main, subExam, year, files, exam);
    }

    if (segs.length === 2) {
      const years = await API.listPreviousYearYears(exam.id);
      return renderPreviousYearYears(main, exam, years);
    }
    const year = segs[2];
    const files = await API.listPreviousYearPdfs(exam.id, year);
    renderPreviousYearPapers(main, exam, year, files);
  }

  function renderPreviousYearSubExams(main, exam, children) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(exam.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))}</h1>
        <p class="page-desc">${t("pyear.chooseSection.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="section-head"><div><h2>${t("pyear.chooseSection")}</h2></div></div>
        <div class="sub-grid">
          ${children.map((c, i) => `
            <a class="sub-card reveal" href="/previous-year/${exam.id}/${c.id}" style="--cat:${c.color || exam.color}" data-delay="${i * 40}">
              <span class="sub-ico">${escapeHtml(c.icon || c.id.slice(0, 2).toUpperCase())}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(c.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.years")}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: exam.id,
      name: localized(exam.name) + " Previous Year Papers",
      count: children.length,
      h2: localized(exam.name) + " Previous Year Question Papers",
      items: children.map((c) => ({ name: localized(c.name), count: 0 }))
    });
  }

  function renderPreviousYearExams(main) {
    const exams = (typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.previous-year.title")}</span></nav>
        <h1>${t("page.previous-year.title")}</h1>
        <p class="page-desc">${t("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${exams.length ? `
          <div class="section-head"><div><h2>${t("pyear.choose")}</h2><p class="sec-sub">${t("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${exams.map((ex, i) => `
              <a class="sub-card reveal" href="/previous-year/${ex.id}" style="--cat:${ex.color}" data-delay="${i * 40}">
                <span class="sub-ico">${escapeHtml(ex.icon || ex.id.slice(0, 2).toUpperCase())}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(ex.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.years")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("downloads.none")}</p></div>`}
      </section>`;
    observeReveals();
    autoSeo(main, {
      name: "Previous Year Question Papers",
      noDefaults: true,
      h2: "Previous Year Question Papers for Assam and Central Exams",
      info: "Solving previous year papers is the fastest way to understand the real difficulty of an examination. On this page you can download original question papers year by year for Assam Police, DHS and DME, Guwahati High Court, Railway and SSC recruitment. Use them to identify repeated topics, judge the weight of each section and plan your revision with evidence rather than guesswork.",
      items: exams.map((ex) => ({ name: localized(ex.name), count: 0 })),
      tips: [
        "Attempt the paper once under a timer without looking at any notes.",
        "Compare your answers with the official key and list every repeated topic.",
        "Shortlist the two or three sections where you lost the most marks.",
        "Reattempt the same paper after two weeks to confirm real improvement."
      ],
      faqs: [
        { q: "Are these the original previous year question papers?", a: "Yes. Each PDF is a compiled question paper for the mentioned exam and year, provided for practice and revision." },
        { q: "Can I download the papers for offline practice?", a: "Yes. Every paper can be downloaded as a PDF and used on a mobile or printed copy for offline practice." },
        { q: "Do previous year papers repeat in the actual exam?", a: "Exact questions rarely repeat, but the topics, difficulty level and question style repeat often. That is why solving them is so useful." }
      ]
    });
  }

  function renderPreviousYearYears(main, exam, years, parent) {
    const parentCrumb = parent
      ? `<a href="/previous-year/${parent.id}">${escapeHtml(localized(parent.name))}</a><span class="bc-sep">/</span>`
      : "";
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${parentCrumb}
          <span>${escapeHtml(localized(exam.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))}</h1>
        <p class="page-desc">${t("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${years.length ? `
          <div class="sub-grid">
            ${years.map((yr, i) => `
              <a class="sub-card reveal" href="/previous-year/${parent ? parent.id + "/" : ""}${exam.id}/${yr}" style="--cat:${exam.color}" data-delay="${i * 50}">
                <span class="sub-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg></span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(yr)}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("pyear.noYears")}</p></div>`}
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: exam.id,
      name: localized(exam.name) + " previous year papers",
      count: years.length,
      h2: localized(exam.name) + " Previous Year Papers by Year",
      items: years.map((yr) => ({ name: String(yr), count: 0 }))
    });
  }

  function renderPreviousYearPapers(main, exam, year, files, parent) {
    const examHref = parent ? `/previous-year/${parent.id}/${exam.id}` : `/previous-year/${exam.id}`;
    const parentCrumb = parent
      ? `<a href="/previous-year/${parent.id}">${escapeHtml(localized(parent.name))}</a><span class="bc-sep">/</span>`
      : "";
    const card = (f) => `
      <div class="dl-item">
        <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
        <span class="dl-meta"><b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b><span>${escapeHtml(localized(exam.name))} • ${escapeHtml(year)}</span></span>
        <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
      </div>`;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${parentCrumb}
          <a href="${examHref}">${escapeHtml(localized(exam.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(year)}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))} — ${escapeHtml(year)}</h1>
        <p class="page-desc">${t("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${files.length ? `<div class="dl-list">${files.map(card).join("")}</div>` : `<div class="info-panel"><p>${t("pyear.none")}</p></div>`}
      </section>`;
    autoSeo(main, {
      id: exam.id,
      name: localized(exam.name) + " " + year + " question paper",
      count: files.length,
      h2: localized(exam.name) + " " + year + " Question Paper",
      items: files.map((f) => ({ name: f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "), count: 0 })),
      faqs: [
        { q: "Is the " + localized(exam.name) + " " + year + " paper a solved or unsolved paper?", a: "The PDF contains the question paper for practice. Attempt it first, then cross-check your answers with the relevant answer key or study notes on axomexam.in." },
        { q: "Can I download the " + localized(exam.name) + " " + year + " paper?", a: "Yes. Use the download button beside the paper to save the PDF for offline practice." }
      ]
    });
  }

  /* ================= Submit Q&A page ================= */
  function renderSubmitPage(main) {
    const isAs = state.lang === "as";
    main.innerHTML = `
      <div class="success-modal-overlay" id="successPopup" style="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(5px);display:none;place-items:center;z-index:99999;opacity:0;transition:opacity 0.2s ease;">
        <div class="success-modal-card" style="background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:24px;padding:30px 24px;width:82%;max-width:300px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);border:1px solid var(--line,#e2e8f0);">
          <div class="tick-circle" style="width:68px;height:68px;background:#10b981;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px -4px rgba(16,185,129,0.5);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 id="pop-title" style="font-size:1.25rem;font-weight:800;color:var(--ink,#0f172a);margin-bottom:4px;">${isAs ? "সফলতাৰে প্ৰেৰণ হ'ল!" : "Sent Successfully!"}</h3>
          <p id="pop-desc" style="font-size:0.84rem;color:var(--ink-soft,#64748b);font-weight:600;">${isAs ? "আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।" : "Your message has been received."}</p>
        </div>
      </div>

      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${isAs ? "প্ৰশ্ন আগবঢ়াওক" : "Submit Q&A"}</span></nav>
        <h1>${isAs ? "প্ৰশ্ন আগবঢ়াওক" : "Submit Q&A"}</h1>
      </div>

      <section class="section axo-main-content" data-axo-main-content="1" style="padding-bottom:24px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          ${isAs ? `<h2 style="margin-top:0; color:var(--ink,#0f172a);">axomexam লৈ প্ৰশ্ন আগবঢ়াওক</h2>
          <p>axomexam এ পঢ়ুৱৈসকলে পঠিওৱা অনুশীলন প্ৰশ্ন গ্ৰহণ কৰে, সেই অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাসমূহৰ বাবে যিবোৰ ইয়াৰ পৰিসৰত আছে। প্ৰকাশৰ আগতে জমা দিয়া প্ৰশ্ন পৰ্যালোচনা কৰা হয়, গতিকে প্ৰশ্ন-সংগ্ৰহত একে মানদণ্ড বজাই ৰখা হয় আৰু প্ৰতিটো প্ৰকাশিত প্ৰশ্নৰ সৈতে উত্তৰ আৰু এটা ব্যাখ্যা থাকে।</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">কি পঠিয়াব</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>প্ৰশ্নৰ লিখনি, অনুগ্ৰহ কৰি অসমীয়া সংস্কৰণটো লগত ৰাখি।</li>
            <li>চাৰিটা বিকল্প, শুদ্ধ বিকল্পটো স্পষ্টভাৱে চিহ্নিত কৰি।</li>
            <li>কিয় সেই বিকল্পটো শুদ্ধ তাৰ এটা চুটি ব্যাখ্যা।</li>
            <li>প্ৰশ্নটো যি পৰীক্ষা আৰু বিষয়ৰ, তাৰ নাম।</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">ইয়াৰ পিছত কি হয়</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>মানক প্ৰসংগ সামগ্ৰীৰ সৈতে মিলাই জমা দিয়া প্ৰশ্নৰ শুদ্ধতা পৰীক্ষা কৰা হয়।</li>
            <li>গ্ৰহণ কৰা প্ৰশ্নসমূহ মিল থকা বিষয় বা পৰীক্ষাৰ শিতানত যোগ কৰা হয়।</li>
            <li>শুধৰণিৰ প্ৰয়োজন থকা প্ৰশ্ন এটা টোকাসহ ঘূৰাই দিয়া হয়।</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">এটা ভাল প্ৰশ্ন লিখা</h3>
          <p>এটা উপযোগী অনুশীলন প্ৰশ্নই এটা স্পষ্ট তথ্য বা এটা স্পষ্ট পদক্ষেপ পৰীক্ষা কৰে, আৰু ভুল বিকল্পসমূহ স্পষ্টভাৱে ভুল নহৈ যুক্তিসংগত হোৱা উচিত। এটা তথ্যত সংখ্যা, তাৰিখ বা নাম থাকিলে, পঠিওৱাৰ আগতে মানক প্ৰসংগৰ সৈতে মিলাই চাওক, আৰু কোনটো প্ৰসংগ ব্যৱহাৰ কৰিলে তাক কওক। দুয়োটা ভাষাত লিখা একে প্ৰশ্ন বিশেষভাৱে স্বাগতম, কাৰণ ইয়াক অসমীয়া আৰু ইংৰাজী পৃষ্ঠাত একেলগে প্ৰকাশ কৰিব পাৰি।</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">সংশোধন</h3>
          <p>প্ৰকাশিত প্ৰশ্নত ভুল দেখা পাইলে, পৃষ্ঠাৰ লিংক আৰু সংশোধন যোগাযোগ ফৰ্মৰ জৰিয়তে পঠিয়াওক। সংশোধনসমূহ নতুন প্ৰশ্নৰ দৰেই পৰীক্ষা কৰা হয় আৰু সাধাৰণতে কেইদিনমানৰ ভিতৰত প্ৰয়োগ কৰা হয়।</p>` : `<h2 style="margin-top:0; color:var(--ink,#0f172a);">Contributing questions to axomexam</h2>
          <p>axomexam accepts reader-submitted practice questions for the Assam competitive exams it covers. A submission is reviewed before it is published, so the question bank keeps a consistent standard and every published question carries an answer and an explanation.</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What to send</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>The question text, ideally with the Assamese version alongside it.</li>
            <li>Four options with the correct one clearly marked.</li>
            <li>A short explanation of why that option is correct.</li>
            <li>The exam and subject the question belongs to.</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What happens next</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>The submission is checked for accuracy against standard reference material.</li>
            <li>Accepted questions are added to the matching topic or exam section.</li>
            <li>Questions that need correction are returned with a note.</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Writing a good question</h3>
          <p>A useful practice question tests one clear fact or one clear step, and the wrong options should be plausible rather than obviously wrong. Where a fact has a number, a date or a name, check it against a standard reference before sending it, and say which reference you used. The same question written in both languages is especially welcome, because it can be published to the Assamese and English versions of the page together.</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Corrections</h3>
          <p>If you spot a mistake in a published question, send the page link and the correction through the contact form. Corrections are checked the same way as new questions and are usually applied within a few days.</p>`}
        </div>
      </section>

      <div class="form-wrapper" style="width:100%;max-width:540px;margin:20px auto 40px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:20px;border:1px solid var(--line,#e2e8f0);box-shadow:var(--card-shadow, 0 12px 36px -8px rgba(15,23,42,0.08));padding:30px 24px;display:flex;flex-direction:column;box-sizing:border-box;">
        <div class="form-header" style="display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:22px;gap:12px;">
          <div class="lang-toggle" style="display:inline-flex;background:var(--bg-soft,#f1f5f9);border:1px solid var(--line,#e2e8f0);border-radius:99px;padding:3px;">
            <button type="button" class="lang-btn active" id="btn-en" style="border:none;background:#2563eb;color:#ffffff;padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">EN</button>
            <button type="button" class="lang-btn" id="btn-as" style="border:none;background:transparent;color:var(--ink-soft,#64748b);padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">অসমীয়া</button>
          </div>
          <div class="form-title" style="text-align:center;width:100%;">
            <h2 id="txt-title" style="font-size:1.35rem;font-weight:800;color:var(--ink,#0f172a);letter-spacing:-0.4px;">Submit Q&A Note</h2>
            <p id="txt-desc" style="margin-top:4px;font-size:0.84rem;color:var(--ink-soft,#64748b);">Contribute notes or feedback for aspirants.</p>
          </div>
        </div>

        <form id="qaForm" class="form-body" style="display:flex;flex-direction:column;gap:14px;">
          <input type="hidden" name="apiKey" value="sf_304846a9720d7354070bd57c">
          <input type="hidden" name="replyTo" value="support@axomexam.in">
          <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">

          <div class="field">
            <label id="lbl-name" for="name" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Your Name</label>
            <input type="text" id="name" name="name" placeholder="e.g. Rahul Borah" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-email" for="email" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Email Address</label>
            <input type="email" id="email" name="email" placeholder="name@example.com" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-topic" for="subject" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Subject / Topic (Optional)</label>
            <input type="text" id="subject" name="subject" placeholder="e.g. Assam History, Science" style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-question" for="question" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Question (Optional)</label>
            <textarea id="question" name="question" rows="2" placeholder="Type the question here..." style="width:100%;min-height:55px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>
          <div class="field">
            <label id="lbl-answer" for="answer" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Answer / Message (Optional)</label>
            <textarea id="answer" name="answer" rows="3" placeholder="Provide complete answer, steps or message..." style="width:100%;min-height:90px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>

          <div class="captcha-container" style="background:var(--bg-soft,#f8fafc);border:1.5px solid var(--line,#e2e8f0);border-radius:12px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <div class="captcha-left" style="display:flex;align-items:center;gap:8px;">
              <span class="captcha-label" id="lbl-captcha" style="font-size:0.8rem;font-weight:700;color:var(--ink-soft,#64748b);">Security:</span>
              <div class="captcha-badge-wrap" style="display:inline-flex;align-items:center;gap:4px;background:var(--bg,#ffffff);padding:3px 6px 3px 8px;border-radius:8px;border:1px solid var(--line,#cbd5e1);">
                <span class="captcha-math" id="math-expression" style="font-size:0.92rem;font-weight:800;color:#2563eb;user-select:none;">2 + 3 = ?</span>
                <button type="button" class="captcha-refresh-btn" id="btn-refresh-captcha" title="Change Captcha" style="border:none;background:transparent;color:var(--ink-faint,#94a3b8);width:24px;height:24px;display:grid;place-items:center;cursor:pointer;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
                </button>
              </div>
            </div>
            <input type="number" id="captcha-answer" placeholder="Ans" required style="width:80px;text-align:center;font-weight:700;font-size:0.92rem;padding:7px 8px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border:1.5px solid var(--line,#cbd5e1);border-radius:8px;outline:none;-moz-appearance:textfield;">
          </div>

          <button type="submit" id="submitBtn" style="width:100%;padding:14px 20px;font-size:0.95rem;font-weight:700;border-radius:12px;margin-top:4px;cursor:pointer;border:none;background:#2563eb !important;color:#ffffff !important;box-shadow:0 6px 16px -4px rgba(37,99,235,0.45);transition:all 0.2s ease;">
            <span id="txt-btn">Submit</span>
          </button>

          <div id="form-error" class="error-msg" style="padding:10px 12px;border-radius:12px;font-size:0.84rem;font-weight:600;display:none;text-align:center;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;"></div>
        </form>
      </div>
    `;

    const i18nSubmit = {
      en: {
        title: "Submit Q&A Note", desc: "Contribute notes or feedback for aspirants.",
        name: "Your Name", namePh: "e.g. Rahul Borah", email: "Email Address", emailPh: "name@example.com",
        topic: "Subject / Topic (Optional)", topicPh: "e.g. Assam History, Science",
        question: "Question (Optional)", questionPh: "Type the question here...",
        answer: "Answer / Message (Optional)", answerPh: "Provide complete answer, steps or message...",
        captcha: "Security:", captchaPh: "Ans", btn: "Submit", submitting: "Submitting...",
        captchaError: "Incorrect math answer! Please try again.", popTitle: "Sent Successfully!", popDesc: "Your message has been received."
      },
      as: {
        title: "প্ৰশ্ন প্ৰেৰণ কৰক (Submit Q&A)", desc: "প্ৰশ্ন বা বাৰ্তা জমা দি শিক্ষাৰ্থীসকলক সহায় কৰক।",
        name: "আপোনাৰ নাম", namePh: "যেনে: ৰাহুল বৰা", email: "ইমেইল ঠিকনা", emailPh: "name@example.com",
        topic: "বিষয় / অধ্যায় (ঐচ্ছিক)", topicPh: "যেনে: অসম বুৰঞ্জী, বিজ্ঞান",
        question: "প্ৰশ্ন (ঐচ্ছিক)", questionPh: "প্ৰশ্নটো ইয়াত লিখক...",
        answer: "উত্তৰ বা বাৰ্তা (ঐচ্ছিক)", answerPh: "সম্পূৰ্ণ উত্তৰ বা বাৰ্তা ইয়াত লিখক...",
        captcha: "সুৰক্ষা:", captchaPh: "উত্তৰ", btn: "জমা দিয়ক", submitting: "প্ৰেৰণ হৈ আছে...",
        captchaError: "অংকৰ উত্তৰ ভুল হৈছে! পুনৰ চেষ্টা কৰক।", popTitle: "সফলতাৰে প্ৰেৰণ হ'ল!", popDesc: "আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।"
      }
    };

    let currentFormLang = state.lang === "as" ? "as" : "en";
    let correctCaptcha = 0;

    function generateCaptcha() {
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * 9) + 1;
      correctCaptcha = num1 + num2;
      $("#math-expression").textContent = `${num1} + ${num2} = ?`;
      $("#captcha-answer").value = "";
    }

    function updateFormLanguage(lang) {
      currentFormLang = lang;
      const btnEn = $("#btn-en");
      const btnAs = $("#btn-as");

      if (lang === "en") {
        btnEn.style.background = "#2563eb"; btnEn.style.color = "#ffffff";
        btnAs.style.background = "transparent"; btnAs.style.color = "var(--ink-soft,#64748b)";
      } else {
        btnAs.style.background = "#2563eb"; btnAs.style.color = "#ffffff";
        btnEn.style.background = "transparent"; btnEn.style.color = "var(--ink-soft,#64748b)";
      }

      const tObj = i18nSubmit[lang];
      $("#txt-title").textContent = tObj.title; $("#txt-desc").textContent = tObj.desc;
      $("#lbl-name").textContent = tObj.name; $("#name").placeholder = tObj.namePh;
      $("#lbl-email").textContent = tObj.email; $("#email").placeholder = tObj.emailPh;
      $("#lbl-topic").textContent = tObj.topic; $("#subject").placeholder = tObj.topicPh;
      $("#lbl-question").textContent = tObj.question; $("#question").placeholder = tObj.questionPh;
      $("#lbl-answer").textContent = tObj.answer; $("#answer").placeholder = tObj.answerPh;
      $("#lbl-captcha").textContent = tObj.captcha; $("#captcha-answer").placeholder = tObj.captchaPh;
      $("#txt-btn").textContent = tObj.btn; $("#pop-title").textContent = tObj.popTitle; $("#pop-desc").textContent = tObj.popDesc;
    }

    function showSuccessPopup() {
      const popup = $("#successPopup");
      popup.style.display = "grid"; popup.style.opacity = "1";
      setTimeout(() => {
        popup.style.opacity = "0"; setTimeout(() => { popup.style.display = "none"; }, 200);
      }, 2000);
    }

    $("#btn-en").addEventListener("click", () => updateFormLanguage("en"));
    $("#btn-as").addEventListener("click", () => updateFormLanguage("as"));
    $("#btn-refresh-captcha").addEventListener("click", generateCaptcha);
    updateFormLanguage(currentFormLang);

    $("#qaForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const errorEl = $("#form-error");
      errorEl.style.display = "none";
      const userCaptcha = parseInt($("#captcha-answer").value, 10);
      if (userCaptcha !== correctCaptcha) {
        errorEl.textContent = i18nSubmit[currentFormLang].captchaError;
        errorEl.style.display = "block"; generateCaptcha(); return;
      }

      const submitBtn = $("#submitBtn"); const txtBtn = $("#txt-btn");
      submitBtn.disabled = true; txtBtn.textContent = i18nSubmit[currentFormLang].submitting;

      const topicVal = $("#subject").value.trim() || "General Note";
      const questionVal = $("#question").value.trim() || "N/A";
      const answerVal = $("#answer").value.trim() || "N/A";

      const payload = {
        apiKey: "sf_304846a9720d7354070bd57c",
        replyTo: "support@axomexam.in",
        name: $("#name").value.trim(),
        email: $("#email").value.trim(),
        subject: `[axomexam Submission] ${topicVal}`,
        message: `Topic: ${topicVal}\n\nQuestion:\n${questionVal}\n\nAnswer/Message:\n${answerVal}\n\nSent to: support@axomexam.in`
      };

      try {
        const response = await fetch("https://api.staticforms.dev/submit", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.success) {
          $("#qaForm").reset(); generateCaptcha(); showSuccessPopup();
        } else {
          errorEl.textContent = data.message || "Failed to submit. Please try again."; errorEl.style.display = "block";
        }
      } catch (err) {
        errorEl.textContent = "Network error. Please check your connection."; errorEl.style.display = "block";
      } finally {
        submitBtn.disabled = false; txtBtn.textContent = i18nSubmit[currentFormLang].btn;
      }
    });

    generateCaptcha();
  }

  /* ================= MOCK TEST SYSTEM ================= */
  function getTopicsForMockFilter(cat, subId, secId, topicId) {
    const matched = [];
    state.topicIndex.forEach((rec) => {
      if (rec.cat.id !== cat.id) return;
      if (subId && subId !== "all" && (!rec.sub || rec.sub.id !== subId)) return;
      if (secId && (!rec.section || rec.section.id !== secId)) return;
      if (topicId && rec.topic.id !== topicId) return;
      matched.push(rec);
    });
    return matched;
  }

  async function collectQuestionsForMock(cat, subId, secId, topicId) {
    const matchedTopics = getTopicsForMockFilter(cat, subId, secId, topicId);
    if (!matchedTopics.length) return [];

    const results = await Promise.all(
      matchedTopics.map((rec) =>
        API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout)
          .then((d) => ({ d, rec }))
          .catch(() => null)
      )
    );

    const rawList = [];
    results.forEach((r) => {
      if (!r || !r.d) return;
      const list = Array.isArray(r.d) ? r.d : (Array.isArray(r.d.questions) ? r.d.questions : []);
      list.forEach((qItem) => {
        const qTextObj = {
          en: extractField(qItem, "question", "en"),
          as: extractField(qItem, "question", "as")
        };

        const aTextObj = {
          en: extractField(qItem, "answer", "en"),
          as: extractField(qItem, "answer", "as")
        };

        const optsEn = getOptionsList(qItem, "en");
        const optsAs = getOptionsList(qItem, "as");
        const rawOpts = Array.isArray(qItem.options) ? qItem.options : [];
        let optionsList = [];

        if (optsEn.length || optsAs.length) {
          const maxLen = Math.max(optsEn.length, optsAs.length);
          for (let i = 0; i < maxLen; i++) {
            const src = rawOpts[i];
            optionsList.push({
              en: optsEn[i] || "",
              as: optsAs[i] || "",
              fig: src && typeof src === "object" && typeof src.fig === "string" ? src.fig : ""
            });
          }
        }

        let correctIdx = 0;
        if (typeof qItem.correct === "string") {
          const letter = qItem.correct.trim().toLowerCase();
          const charCode = letter.charCodeAt(0);
          if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
        } else if (typeof qItem.a === "string") {
          const letter = qItem.a.trim().toLowerCase();
          const charCode = letter.charCodeAt(0);
          if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
        } else if (Number.isInteger(qItem.correct_index)) {
          correctIdx = qItem.correct_index;
        } else if (Number.isInteger(qItem.correct)) {
          correctIdx = qItem.correct;
        } else if (Number.isInteger(qItem.answer)) {
          correctIdx = qItem.answer;
        }

        rawList.push({
          q: qTextObj,
          a: aTextObj,
          fig: typeof qItem.fig === "string" ? qItem.fig : "",
          table: qItem.table || null,
          options: optionsList.length >= 2 ? optionsList : null,
          correct: correctIdx,
          topicTitle: r.rec.title,
          catId: r.rec.cat.id,
        });
      });
    });

    return rawList;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stopMockTimer() {
    if (state.mock && state.mock.timerId) {
      clearInterval(state.mock.timerId);
      state.mock.timerId = null;
    }
  }

  /* Guard the browser Back button while a mock test is in progress.
     We push a marker entry when the test starts and, on popstate, re-push
     it and ask for confirmation before letting the user leave. */
  let mockBackGuard = false;
  let mockGuardUrl = "";

  function armMockBackGuard() {
    if (mockBackGuard) return;
    mockBackGuard = true;
    mockGuardUrl = location.href;
    try { history.pushState({ axoMockGuard: Date.now() }, "", mockGuardUrl); } catch (e) { }
  }

  function disarmMockBackGuard() {
    mockBackGuard = false;
  }

  /* Quit / leave should step back exactly one history entry — to the page the
     test was started from — instead of jumping to the mock-test landing page. */
  function leaveMockTest() {
    disarmMockBackGuard();
    stopMockTimer();
    state.mock = null;
    setWhatsappChatSuppressed(false);
    if (history.state && history.state.axoMockGuard) {
      history.back();
      return;
    }
    if (mockGuardUrl) {
      navigateTo(mockGuardUrl);
      return;
    }
    navigateTo("/mock-test");
  }

  function handleMockBackGuard() {
    if (!mockBackGuard || !state.mock || !state.mock.started) return false;
    const promptOpen = !!document.getElementById("confirm-modal");
    try { history.pushState({ axoMockGuard: Date.now() }, "", mockGuardUrl || location.href); } catch (e) { }
    if (promptOpen) return true;
    showModalPopup({
      title: "Leave Mock Test?",
      message: "Are you sure you want to leave the mock test? Your current progress will be lost.",
      confirmText: "Yes, Leave",
      cancelText: "Stay",
      onConfirm: leaveMockTest
    });
    return true;
  }

  function showModalPopup({ title, message, confirmText, cancelText, onConfirm }) {
    const existing = $("#confirm-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "confirm-modal";
    modal.className = "read-modal";
    modal.innerHTML = `
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box confirm-modal-box" role="dialog">
        <h3 style="font-size:1.12rem; margin-bottom:9px;">${escapeHtml(title)}</h3>
        <p style="color:var(--ink-soft); font-size:.9rem; margin-bottom:18px; line-height:1.55;">${escapeHtml(message)}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-outline" id="modal-cancel-btn" style="flex:1;">${escapeHtml(cancelText || "Cancel")}</button>
          <button class="btn btn-primary" id="modal-confirm-btn" style="flex:1;">${escapeHtml(confirmText || "Confirm")}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $("#modal-cancel-btn", modal).addEventListener("click", () => modal.remove());
    $(".read-modal-backdrop", modal).addEventListener("click", () => modal.remove());
    $("#modal-confirm-btn", modal).addEventListener("click", () => {
      modal.remove();
      if (onConfirm) onConfirm();
    });
  }

  function mockSubcategories(cat) {
    if (!cat) return [];
    if (cat.id === "english") {
      return [
        { id: "grammar", name: { en: "Grammar", as: "ব্যাকৰণ" } },
        { id: "vocabulary", name: { en: "Vocabulary", as: "শব্দভাণ্ডাৰ" } }
      ];
    }
    if (cat.id === "computer") {
      return [
        { id: "comp-fundamentals", name: { en: "Fundamentals", as: "মৌলিক" } },
        { id: "ms-office", name: { en: "MS Office", as: "MS Office" } }
      ];
    }
    return cat.subcategories || [];
  }

  function isEnglishContent(segs) {
    if (!segs || !segs.length) return false;
    if (segs[0] === "category" && segs[1] === "english") return true;
    if (segs[0] === "topic" && segs[1] === "english") return true;
    if (segs[0] === "mock-test" && segs[1] === "english") return true;
    if (segs[0] === "category" && segs[1] === "articles" && segs[2] === "english") return true;
    /* English-subject sections inside an exam book, e.g.
       /exams/assam-police/general-english/... — these open in English by
       default, and the topic's own EN/অসমীয়া toggle still lets the reader
       switch to Assamese. */
    if (segs[0] === "exams" && /english/i.test(segs[2] || "")) return true;
    return false;
  }

  function handleMockRouting(main, segs) {
    if (segs.length === 1) return renderMockCategoryPicker(main);

    const catId = segs[1];
    const cat = state.categories.find((c) => c.id === catId);
    if (!cat) return render404(main);

    const subId = segs[2];
    const secId = segs[3];
    const topicId = segs[4];

    if (subId && subId.startsWith("topic-") || segs.includes("start")) {
      return renderMockSetup(main, cat, subId, secId, topicId);
    }

    const subs = mockSubcategories(cat);
    if (!subId && subs.length) return renderMockSubcategoryPicker(main, cat);

    if (subId && !secId) {
      const sub = subs.find((s) => s.id === subId);
      if (sub) {
        return renderMockSubLevel(main, cat, sub);
      }
      return renderMockSetup(main, cat, subId, null, null);
    }

    if (subId && secId) {
      const sub = subs.find((s) => s.id === subId);
      if (!sub) return render404(main);

      /* Manual JSON mock test sets: /mock-test/<cat>/<sub>/set-<n> */
      if (/^set-\d+$/.test(secId)) {
        const setNumber = parseInt(secId.replace("set-", ""), 10);
        if (!(setNumber >= 1 && setNumber <= MAX_MOCK_SETS)) return render404(main);
        return renderMockSetDifficulty(main, cat, sub, setNumber);
      }

      const sec = (sub.sections || []).find((sc) => sc.id === secId);
      if (sec && sec.topics && sec.topics.length) {
        return renderMockTopicPicker(main, cat, sub, sec);
      }
      return renderMockSetup(main, cat, subId, secId, null);
    }

    return renderMockSetup(main, cat, null, null, null);
  }

  /* ================= Exam-wise Mock Test (standalone portal) =================
     A dedicated portal, in the same spirit as Your Exams and E-Books, that
     keeps each recruitment exam apart, so a candidate for Assam Police, ADRE
     Grade III or ADRE Grade IV practises a full paper for that exam instead
     of a mixed subject bank. Each set is a full-length paper that mixes every
     subject of the exam; the questions are prebuilt from data/exams/<exam>/...
     (the "Your Exams" library) into data/exam-mock-sets/<exam>/set-N.json and
     run through the same timed quiz engine.

     Routes:
       /exam-wise-mock-test/                          exam picker
       /exam-wise-mock-test/<exam>/                   full-paper set picker
       /exam-wise-mock-test/<exam>/set-N/             setup + start        */

  function examWiseAvailableExams() {
    return (state.exams || []).filter((e) => examIsAvailable(e));
  }

  async function handleExamWiseMockRouting(main, segs) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;
    await getExamsList();

    const examId = segs[1];
    const setSeg = segs[2];

    if (!examId) return renderExamWisePicker(main);

    const exam = findExam(examId);
    if (!exam) return render404(main);
    if (!examIsAvailable(exam)) return renderExamWiseComingSoon(main, exam);

    const setMatch = setSeg && /^set-(\d+)$/.exec(setSeg);
    if (setMatch) {
      if (!examWiseIsLive(exam.id)) return renderExamWiseUpgrade(main, exam, parseInt(setMatch[1], 10));
      return renderExamWiseStart(main, exam, parseInt(setMatch[1], 10));
    }
    if (setSeg) return render404(main);
    return renderExamWiseSetPicker(main, exam);
  }

  /* How many full-paper sets exist for one exam, and how many questions each
     set carries. The published manifest (data/exam-mock-sets/<exam>/index.json)
     answers both in one small request; if it is missing we fall back to probing
     set-1..set-N in parallel and reading the first set's length. Returns
     { sets, questions }. */
  async function detectExamMockSets(examId) {
    const cacheKey = `exw:${examId}`;
    if (state.examMockSetCache && state.examMockSetCache[cacheKey]) return state.examMockSetCache[cacheKey];

    let result = null;
    const manifest = await API.getExamMockIndex(examId);
    if (manifest && manifest.sets.length) {
      result = { sets: manifest.sets.slice().sort((a, b) => a - b), questions: manifest.questions || 0 };
    } else {
      const probes = await Promise.all(
        Array.from({ length: MAX_MOCK_SETS }, (_, i) => API.getExamMockSet(examId, i + 1))
      );
      const sets = [];
      for (let n = 1; n <= MAX_MOCK_SETS; n++) {
        const data = probes[n - 1];
        if (data && Array.isArray(data.questions) && data.questions.length) sets.push(n);
        else break;
      }
      const first = probes[0];
      const questions = first && Array.isArray(first.questions) ? first.questions.length : 0;
      result = { sets, questions };
    }

    state.examMockSetCache = state.examMockSetCache || {};
    state.examMockSetCache[cacheKey] = result;
    return result;
  }

  function renderExamWiseComingSoon(main, exam) {
    const titleEn = ebkLang(exam.title, "en");
    const titleAs = ebkLang(exam.title, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exam-wise-mock-test">${t("mock.examwise.title")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>
        </nav>
      </div>
      <div class="exam-soon-panel" style="--ebk:${examColor(exam)}">
        <span class="exam-soon-ico">${EXAM_SECTION_ICONS.default}</span>
        <h1>${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? ` <span class="exam-soon-as">${escapeHtml(titleAs)}</span>` : ""}</h1>
        ${subEn ? `<p class="exam-soon-sub">${escapeHtml(subEn)}</p>` : ""}
        <span class="exam-soon-chip">${t("exams.comingSoon")}</span>
        <p class="exam-soon-msg">${escapeHtml(t("mock.examwise.comingSoonMsg"))}</p>
        <a class="btn btn-accent" href="/exam-wise-mock-test">${t("mock.examwise.back")}</a>
      </div>`;
  }

  async function renderExamWisePicker(main) {
    const exams = orderExamWiseHub(state.exams || []);
    const counts = {};
    await Promise.all(exams.filter((e) => examIsAvailable(e)).map(async (e) => {
      counts[e.id] = await detectExamMockSets(e.id);
    }));
    const cards = exams.map((e, i) => {
      const available = examIsAvailable(e);
      const nSets = (counts[e.id] && counts[e.id].sets.length) || 0;
      const nQ = (counts[e.id] && counts[e.id].questions) || 100;
      const titleEn = ebkLang(e.title, "en");
      const titleAs = ebkLang(e.title, "as");
      const subEn = ebkLang(e.subtitle, "en");
      const subAs = ebkLang(e.subtitle, "as");
      const logo = e.logo ? String(e.logo) : (e.cover ? String(e.cover) : "");
      const href = `/exam-wise-mock-test/${encodeURIComponent(e.id)}`;
      const fallback = `<span class="exw-thumb-fallback" aria-hidden="true">${escapeHtml(e.icon || titleEn.slice(0, 3).toUpperCase())}</span>`;
      const thumb = logo
        ? `${fallback}<img class="exw-thumb-img" src="${escapeHtml(logo)}" alt="${escapeHtml(examLogoAlt(e, state.lang))}" loading="lazy" decoding="async" onerror="this.remove()">`
        : fallback;
      const badge = available
        ? `<span class="exw-badge exw-badge-live">${escapeHtml(t("mock.examwise.live"))}</span>`
        : `<span class="exw-badge exw-badge-soon">${escapeHtml(t("exams.comingSoon"))}</span>`;
      const meta = available
        ? escapeHtml(tf("mock.examwise.fullPaperMetaSets", { n: nQ, s: nSets }))
        : escapeHtml(subEn || t("exams.comingSoon"));
      return `
        <a class="exw-card reveal ${available ? "" : "is-soon"}" style="--c:${examColor(e)}" data-delay="${i * 50}" href="${href}">
          <span class="exw-thumb">${thumb}${badge}</span>
          <span class="exw-body">
            <span class="exw-title">${escapeHtml(titleEn)}</span>
            ${titleAs && titleAs !== titleEn ? `<span class="exw-as">${escapeHtml(titleAs)}</span>` : ""}
            ${subAs && subAs !== subEn ? `<span class="exw-sub">${escapeHtml(subAs)}</span>` : ""}
            <span class="exw-meta">${meta}</span>
          </span>
          <span class="exw-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
        </a>`;
    }).join("");

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <span>${t("mock.examwise.title")}</span>
        </nav>
        <h1>${t("mock.examwise.title")}</h1>
        <p class="page-desc">${t("mock.examwise.desc")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="mt-topics-head"><h2>${t("mock.examwise.chooseExam")}</h2><p>${t("mock.examwise.chooseExamSub")}</p></div>
        <div class="exw-grid">${cards}</div>
      </section>`;
    observeReveals();
    appendSeoFaq(main, examWiseHubSeo(counts));
  }

  /* Detailing panel for the exam-wise hub. The static copy lives inside
     <main> (crawler / no-JS view) and is therefore destroyed by renderRoute,
     so the same content is appended here for real visitors — the pattern the
     subject-wise mock-test, e-books and category hubs already follow. */
  function examWiseHubSeo(counts) {
    counts = counts || {};
    const names = examWiseAvailableExams().map((e) => ebkLang(e.title, "en")).join(", ")
      || "Assam Police, ADRE Grade III and ADRE Grade IV";
    return {
      name: t("mock.examwise.title"),
      noDefaults: true,
      h2: "Exam-wise mock tests for Assam recruitment exams",
      info: "A subject-wise mock test drills one topic. An exam-wise mock test does the opposite: it hands you a complete question paper — every subject of the exam mixed together, in the order the real paper uses, with a live timer running while you attempt it. That is the part most candidates never practise, and it is where the real paper surprises them.",
      items: examWiseAvailableExams().map((e) => ({
        name: ebkLang(e.title, "en"),
        count: (counts[e.id] && counts[e.id].questions) || 100,
        unit: "questions per set"
      })),
      tips: [
        "Open the exam that matches your recruitment.",
        "Pick a full paper set — start with Set 1 and move up.",
        "Choose your question language and start the timed test.",
        "Submit to get an instant score, then read the bilingual answer review for every question."
      ],
      faqs: [
        { q: "What is an exam-wise mock test?", a: "An exam-wise mock test is a single full-length paper that mixes every subject of one recruitment exam — for example Assam Police or ADRE Grade III — and runs under a live timer, so it works exactly like the real examination hall instead of a single-subject practice drill." },
        { q: "How many questions are in each set?", a: "Each full paper set carries the same number of bilingual questions as the real exam paper — 100 for Assam Police, 150 for ADRE Grade III — with four options each, an answer key and a short explanation in both Assamese and English." },
        { q: "Are the mock tests different for each exam?", a: `Yes. Each exam has its own separate sets built from its own syllabus and question bank — ${names} are kept apart.` },
        { q: "Are these mock tests free?", a: "Yes. Every exam-wise mock test on axomexam is 100% free and can be reattempted as many times as you like." },
        { q: "Can I practise in Assamese?", a: "Yes. Every question, option and explanation is available in both Assamese and English, and you can choose the question language before the test begins." }
      ]
    };
  }

  async function renderExamWiseSetPicker(main, exam) {
    const examEn = ebkLang(exam.title, "en");
    const examAs = ebkLang(exam.title, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    const subAs = ebkLang(exam.subtitle, "as");
    const detected = await detectExamMockSets(exam.id);
    const sets = detected.sets;
    const nQuestions = detected.questions || 100;
    const visible = Math.max(DEFAULT_VISIBLE_SETS, ...(sets.length ? sets : [0]));
    const existing = new Set(sets);
    const color = examColor(exam);
    const logo = exam.logo ? String(exam.logo) : "";
    const cover = logo || (exam.cover ? String(exam.cover) : "");

    const stats = [
      { ico: `<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/>`, label: t("mock.examwise.statSets"), value: String(sets.length) },
      { ico: `<circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/>`, label: t("mock.examwise.statQuestions"), value: String(nQuestions) },
      { ico: `<path d="M4 5h16v14H4z"/><path d="M8 9h8"/><path d="M8 13h5"/>`, label: t("mock.examwise.statLangs"), value: "অসমীয়া / EN" },
      { ico: `<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>`, label: t("mock.examwise.statMode"), value: t("mock.examwise.modeTimed") }
    ];

    const setCards = Array.from({ length: visible }, (_, i) => {
      const n = i + 1;
      if (existing.has(n)) {
        return `
        <a class="set-card reveal" href="/exam-wise-mock-test/${encodeURIComponent(exam.id)}/set-${n}" style="--cat:${color}" data-delay="${i * 40}">
          <span class="set-card-head">
            <span class="set-num">${String(n).padStart(2, "0")}</span>
            <span class="set-status">${t("mock.examwise.available")}</span>
          </span>
          <span class="set-name">${t("mock.examwise.fullPaperSet")} ${n}</span>
          <span class="set-meta">${escapeHtml(tf("mock.examwise.setMetaN", { n: nQuestions }))}</span>
          <span class="set-go">
            <span>${t("mock.examwise.start")}</span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </a>`;
      }
      return `
        <div class="set-card set-card-locked reveal" style="--cat:${color}" data-delay="${i * 40}">
          <span class="set-card-head">
            <span class="set-num">${String(n).padStart(2, "0")}</span>
            <span class="set-status set-status-locked">${t("exams.comingSoon")}</span>
          </span>
          <span class="set-name">${t("mock.examwise.fullPaperSet")} ${n}</span>
          <span class="set-meta">${t("mock.examwise.notPublished")}</span>
        </div>`;
    }).join("");

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exam-wise-mock-test">${t("mock.examwise.title")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(examEn)}</span>
        </nav>
      </div>

      <div class="exw-hero" style="--c:${color}">
        <span class="exw-hero-thumb">
          ${cover ? `<img src="${escapeHtml(cover)}" alt="${escapeHtml(logo ? examLogoAlt(exam, state.lang) : examCoverAlt(exam, state.lang))}" loading="eager" decoding="async" onerror="this.remove()">` : `<span class="exw-hero-fallback">${escapeHtml(exam.icon || examEn.slice(0, 2).toUpperCase())}</span>`}
        </span>
        <span class="exw-hero-body">
          <span class="exw-hero-chip">${escapeHtml(t("mock.examwise.title"))}</span>
          <h1 class="exw-hero-title">${escapeHtml(examEn)}${examAs && examAs !== examEn ? ` <span class="exw-hero-as" lang="as">${escapeHtml(examAs)}</span>` : ""}</h1>
          ${subAs && subAs !== subEn ? `<span class="exw-hero-sub" lang="as">${escapeHtml(subAs)}</span>` : (subEn ? `<span class="exw-hero-sub">${escapeHtml(subEn)}</span>` : "")}
          <span class="exw-hero-stats">
            ${stats.map((s) => `<span class="exw-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${s.ico}</svg><b>${escapeHtml(s.value)}</b>${escapeHtml(s.label)}</span>`).join("")}
          </span>
        </span>
      </div>

      ${!examWiseIsLive(exam.id) ? `
      <div class="upgrade-banner" role="status">
        <span class="upgrade-dot" aria-hidden="true"></span>
        <span>${t("mock.examwise.upgradeBanner")}</span>
        <span class="upgrade-banner-as" lang="as">${t("mock.examwise.upgrade.msg")}</span>
      </div>` : ""}

      <section class="section" style="padding-bottom:46px;">
        <div class="mt-topics-head">
          <h2>${t("mock.examwise.setsHead")}</h2>
          <p>${t("mock.examwise.setsHeadSub")}</p>
        </div>
        <div class="set-grid">${setCards}</div>
      </section>

      <section class="section" style="padding-bottom:52px;">
        <div class="mt-block exw-howto">
          <div class="mt-label">${t("mock.examwise.howItWorks")}</div>
          <ol class="exw-howto-list">
            <li><span class="exw-howto-num">1</span>${t("mock.examwise.how1")}</li>
            <li><span class="exw-howto-num">2</span>${t("mock.examwise.how2")}</li>
            <li><span class="exw-howto-num">3</span>${t("mock.examwise.how3")}</li>
          </ol>
        </div>
      </section>`;
    observeReveals();
    appendSeoFaq(main, examWiseExamSeo(exam, examEn, sets.length, nQuestions));
  }

  /* Detailing panel for one exam's set picker. Mirrors the static copy the
     builder writes inside <main>, which renderRoute replaces for visitors. */
  function examWiseExamSeo(exam, examEn, nSets, nQuestions) {
    const q = nQuestions || 100;
    const secs = (exam.sections || [])
      .filter((s) => s.id !== "syllabus")
      .map((s) => ebkLang(s.title, "en") || s.id);
    const subEn = ebkLang(exam.subtitle, "en");
    return {
      name: examEn,
      noDefaults: true,
      h2: `${examEn} full-paper mock test`,
      info: `The ${examEn} mock test on this page is a full paper, not a single-subject practice set. Each of the ${nSets} sets mixes every subject of the ${examEn}${subEn ? ` (${subEn})` : ""} paper and runs to a fixed length of ${q} questions under a live timer, so you practise the paper end to end the way it is actually set.`,
      items: secs.map((s) => ({ name: s })),
      tips: [
        "Attempt one set fully under the timer before checking any answer.",
        "Note every wrong answer and the subject it belongs to.",
        "Revise that subject in the exam book, then attempt the next set.",
        "Compare your set-to-set scores to track whether accuracy is improving."
      ],
      faqs: [
        { q: `What is the ${examEn} mock test?`, a: `It is a full-length, timed mock test for the ${examEn} recruitment exam. Each set mixes every subject of the paper and carries ${q} bilingual questions with answers and explanations.` },
        { q: "How many full papers are there?", a: `There are ${nSets} full paper sets for ${examEn}. Every set is a complete ${q}-question paper.` },
        { q: `Which subjects are covered in the ${examEn} paper?`, a: secs.join(", ") + "." },
        { q: "Is the test timed?", a: "Yes. Every set runs on a live timer so you learn to manage your time the way you must in the real examination hall." },
        { q: "Are answers and explanations given?", a: "Yes. After you submit, you see your score and a bilingual review of every question with the correct answer and a short explanation." }
      ]
    };
  }

  /* Temporary "system upgrade" notice shown in place of a full-paper set for
     an exam whose blueprint is not published yet (see examWiseIsLive). Shows
     the normal, professional setup panel (language, instructions, details) so
     the page still looks complete, replaces the count picker with a preparing
     notice, and opens a bilingual popup. The Start button re-opens the popup
     instead of starting the quiz. */
  async function renderExamWiseUpgrade(main, exam, setNumber) {
    const examEn = ebkLang(exam.title, "en");
    const color = examColor(exam);
    const setTitle = `${t("mock.examwise.fullPaperSet")} ${setNumber}`;
    const steps = [
      { key: "mock.examwise.upgrade.step1", state: "done" },
      { key: "mock.examwise.upgrade.step2", state: "active" },
      { key: "mock.examwise.upgrade.step3", state: "" }
    ];

    state.mock = null;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exam-wise-mock-test">${t("mock.examwise.title")}</a><span class="bc-sep">/</span>
          <a href="/exam-wise-mock-test/${encodeURIComponent(exam.id)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(setTitle)}</span>
        </nav>
        <h1>${escapeHtml(examEn)} — ${escapeHtml(setTitle)}</h1>
        <p class="page-desc">${t("mock.examwise.setup.desc")}</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${color}">
          <span class="mt-hero-icon"><span class="cat-svg">${examSectionIcon({ id: "gk" })}</span></span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${escapeHtml(examEn)}</span>
            <span class="mt-hero-title">${escapeHtml(setTitle)}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${(await detectExamMockSets(exam.id)).questions || 100} ${t("mock.questions")}</span>
              <span class="mt-chip">অসমীয়া / English</span>
            </span>
          </span>
        </div>

        <div class="upgrade-panel upgrade-panel-inline" style="--c:${color}">
          <span class="upgrade-badge"><span class="upgrade-dot" aria-hidden="true"></span>${escapeHtml(tLang("mock.examwise.upgrade.badge", "en"))}</span>
          <h2 class="upgrade-title">${escapeHtml(tLang("mock.examwise.upgrade.title", "en"))}</h2>
          <p class="upgrade-as" lang="as">${escapeHtml(tLang("mock.examwise.upgrade.title", "as"))}</p>
          <p class="upgrade-msg">${escapeHtml(tLang("mock.examwise.upgrade.msg", "en"))}</p>
          <p class="upgrade-msg upgrade-as" lang="as">${escapeHtml(tLang("mock.examwise.upgrade.msg", "as"))}</p>
          <span class="upgrade-eta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${escapeHtml(tLang("mock.examwise.upgrade.eta", "en"))}
          </span>
          <ul class="upgrade-steps">
            ${steps.map((s) => `
              <li class="upgrade-step ${s.state}">
                <span class="upgrade-step-ico">${s.state === "done"
                  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.2 4.2L19 7"/></svg>`
                  : `<span class="upgrade-spin"></span>`}</span>
                <span>
                  <span>${escapeHtml(tLang(s.key, "en"))}</span>
                  <span class="upgrade-step-as" lang="as">${escapeHtml(tLang(s.key, "as"))}</span>
                </span>
              </li>`).join("")}
          </ul>
        </div>

        <div class="mt-block">
          <div class="mt-label">${t("mock.examwise.lang")} <span>প্ৰশ্নৰ ভাষা</span></div>
          <div class="mt-segmented">
            <button type="button" class="mt-seg-btn active" data-mocklang="as"><span class="mt-seg-ico">অ</span> অসমীয়া (Assamese)</button>
            <button type="button" class="mt-seg-btn" data-mocklang="en"><span class="mt-seg-ico">A</span> English</button>
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">${t("mock.examwise.instructions")} <span>নিৰ্দেশনা</span></div>
          <p class="mt-sub">${t("mock.examwise.instructionsSub")}</p>
          <ul class="mt-rules">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${t("mock.examwise.rule1")}<span class="mt-rule-as" lang="as">${tLang("mock.examwise.ruleAs1", "as")}</span></span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>${t("mock.examwise.rule2")}<span class="mt-rule-as" lang="as">${tLang("mock.examwise.ruleAs2", "as")}</span></span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg><span>${t("mock.examwise.rule3")}<span class="mt-rule-as" lang="as">${tLang("mock.examwise.ruleAs3", "as")}</span></span></li>
          </ul>
        </div>

        <div class="mt-ready">
          <span class="mt-ready-txt"><b>${t("mock.examwise.readyTitle")}</b><span>${t("mock.examwise.readySub")}</span></span>
          <button class="btn mt-start" id="mock-begin-btn">${t("mock.begin")} →</button>
        </div>
      </div>`;

    const beginBtn = $("#mock-begin-btn", main);
    if (beginBtn) beginBtn.addEventListener("click", () => showExamWiseUpgradePopup());
    $$("[data-mocklang]", main).forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]", main).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
      });
    });
    showExamWiseUpgradePopup();
    appendSeoFaq(main, examWiseSetSeo(exam, examEn, setNumber, (await detectExamMockSets(exam.id)).questions));
  }

  /* Detailing panel for one full-paper set. Mirrors the static copy the
     builder writes inside <main> (crawler / no-JS view). */
  function examWiseSetSeo(exam, examEn, setNumber, nQuestions) {
    const q = nQuestions || 100;
    const secList = (exam.sections || [])
      .filter((s) => s.id !== "syllabus")
      .map((s) => ebkLang(s.title, "en") || s.id)
      .join(", ");
    return {
      name: `${examEn} Full Paper Set ${setNumber}`,
      noDefaults: true,
      h2: `${examEn} Full Paper Set ${setNumber}`,
      info: `Full Paper Set ${setNumber} of the ${examEn} exam-wise mock test is a complete ${q}-question paper that mixes every subject of the exam — ${secList} — and runs under a live timer, exactly like the real test. When you start this set you choose your question language (Assamese or English) and the timer begins. On submit you get an instant score along with the correct answer and a short explanation for every question, in both languages.`,
      tips: [
        "Pick your question language.",
        "Start the timer and attempt the whole paper without pausing.",
        "Submit and review the explanations for the questions you missed.",
        "Reattempt the set later and compare your score."
      ],
      faqs: [
        { q: `How many questions are in ${examEn} Full Paper Set ${setNumber}?`, a: `${q} bilingual questions with four options each, covering every subject of the paper.` },
        { q: `Is ${examEn} Set ${setNumber} timed?`, a: "Yes. The set runs on a live timer from the moment you start, so it works like the real examination." },
        { q: "Can I see the answers?", a: "Yes. After you submit, every question shows the correct option and a short explanation in both Assamese and English." },
        { q: "Can I reattempt this set?", a: "Yes. All sets are free and unlimited — you can reattempt any set as many times as you like." }
      ]
    };
  }

  /* Bilingual upgrade popup. English is the primary line (title + body), the
     Assamese twin sits underneath in a slightly muted style, so a visitor
     reading either language understands the message at a glance. */
  function showExamWiseUpgradePopup() {
    const existing = $("#examwise-upgrade-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "examwise-upgrade-modal";
    modal.className = "read-modal upgrade-modal";
    modal.innerHTML = `
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box upgrade-modal-box" role="dialog" aria-modal="true" aria-label="${escapeHtml(t("mock.examwise.upgrade.popupTitle"))}">
        <span class="upgrade-modal-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/>
            <path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M18.4 5.6l-2.1 2.1"/><path d="M7.7 16.3l-2.1 2.1"/>
            <circle cx="12" cy="12" r="3.4"/>
          </svg>
        </span>
        <span class="upgrade-badge">
          <span class="upgrade-dot" aria-hidden="true"></span>
          ${escapeHtml(tLang("mock.examwise.upgrade.badge", "en"))}
        </span>
        <h3 class="upgrade-modal-title">${escapeHtml(tLang("mock.examwise.upgrade.popupTitle", "en"))}</h3>
        <p class="upgrade-modal-as" lang="as">${escapeHtml(tLang("mock.examwise.upgrade.popupTitle", "as"))}</p>
        <p class="upgrade-modal-msg">${escapeHtml(tLang("mock.examwise.upgrade.popupMsg", "en"))}</p>
        <p class="upgrade-modal-msg upgrade-modal-as" lang="as">${escapeHtml(tLang("mock.examwise.upgrade.popupMsg", "as"))}</p>
        <span class="upgrade-eta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          ${escapeHtml(tLang("mock.examwise.upgrade.eta", state.lang))}
        </span>
        <button type="button" class="btn btn-primary" id="upgrade-modal-ok">${escapeHtml(tLang("mock.examwise.upgrade.ok", state.lang))}</button>
      </div>`;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    $("#upgrade-modal-ok", modal).addEventListener("click", close);
    $(".read-modal-backdrop", modal).addEventListener("click", close);
  }

  async function renderExamWiseStart(main, exam, setNumber) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;

    const data = await API.getExamMockSet(exam.id, setNumber);
    const list = data && Array.isArray(data.questions) ? data.questions : [];
    const pool = list.map(normalizeMockQuestion).filter((q) => q && q.options && q.options.length >= 2);
    const bp = data && data.blueprint ? data.blueprint : null;

    const examEn = ebkLang(exam.title, "en");
    const examAs = ebkLang(exam.title, "as");
    const setTitle = `${t("mock.examwise.fullPaperSet")} ${setNumber}`;

    if (!pool.length) {
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exam-wise-mock-test">${t("mock.examwise.title")}</a><span class="bc-sep">/</span>
            <a href="/exam-wise-mock-test/${encodeURIComponent(exam.id)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(setTitle)}</span>
          </nav>
        </div>
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${t("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/exam-wise-mock-test/${encodeURIComponent(exam.id)}">← ${t("mock.examwise.back")}</a></div>
        </div>`;
      return;
    }

    renderMockStartPanel(main, {
      cat: null,
      pool,
      testLang: "as",
      iconHtml: `<span class="cat-svg">${examSectionIcon({ id: "gk" })}</span>`,
      color: examColor(exam),
      heroCat: examEn,
      heroTitle: setTitle,
      title: `${examEn} — ${setTitle}`,
      breadcrumb: [
        { href: "/", label: "Home" },
        { href: "/exam-wise-mock-test", label: t("mock.examwise.title") },
        { href: `/exam-wise-mock-test/${encodeURIComponent(exam.id)}`, label: examEn },
        { label: setTitle }
      ],
      setInfo: { title: setTitle, subject: examEn },
      blueprint: bp,
      /* One full paper, fixed length — no count picker. */
      countOptions: [pool.length],
      onStart: startSetMock
    });
  }

  /* Subcategory landing: show manual JSON sets when available,
     otherwise fall back to the old section / topic flow. */
  async function renderMockSubLevel(main, cat, sub) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;
    const sets = await detectMockSets(cat.id, sub.id);
    return renderMockSetPicker(main, cat, sub, sets);
  }

  /* Baseline set/question counts for the mock-test landing cards. These are
     only the values shown for the first paint — the real numbers are detected
     live from the published set-*.json files (see refreshMockLandingCounts). */
  const MOCK_LANDING_META = {
    gk: { sets: 70, q: 1750 },
    math: { sets: 30, q: 750 },
    science: { sets: 15, q: 375 },
    reasoning: { sets: 15, q: 375 },
    english: { sets: 10, q: 250 },
    computer: { sets: 10, q: 250 }
  };

  /* Resolve the static URL of one published mock set file. */
  function mockSetUrl(catId, subId, n) {
    if (CONFIG.USE_REMOTE) {
      return `${CONFIG.RAW_BASE}/${CONFIG.OWNER}/${CONFIG.REPO}/${CONFIG.BRANCH}/${CONFIG.PATHS.MOCKSETS}/${catId}/${subId}/set-${n}.json`;
    }
    return `${CONFIG.FALLBACK.MOCKSETS_BASE}${catId}/${subId}/set-${n}.json`;
  }

  /* Lightweight existence check for one set file. A HEAD request avoids
     downloading the (often large) question JSON just to count sets. */
  async function mockSetExists(catId, subId, n) {
    try {
      const res = await fetch(mockSetUrl(catId, subId, n), { method: "HEAD", cache: "no-store" });
      if (res.status === 405 || res.status === 501) {
        return hasMockQuestions(await API.getMockSet(catId, subId, n));
      }
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  /* Count how many consecutive set files are published for a subcategory.
     Results are cached per session so each set is probed at most once. */
  async function countMockSetsForSub(catId, subId) {
    const key = catId + "/" + subId;
    if (Object.prototype.hasOwnProperty.call(state.mockSetCount, key)) {
      return state.mockSetCount[key];
    }
    let total = 0;
    for (let n = 1; n <= MAX_MOCK_SETS; n++) {
      if (await mockSetExists(catId, subId, n)) total++;
      else break;
    }
    state.mockSetCount[key] = total;
    return total;
  }

  /* Live per-category set / question totals probed from the published files. */
  async function computeMockCategoryCounts(cat) {
    const counts = await Promise.all(mockSubcategories(cat).map((s) => countMockSetsForSub(cat.id, s.id)));
    const sets = counts.reduce((a, b) => a + b, 0);
    const baseline = MOCK_LANDING_META[cat.id];
    const perSet = baseline && baseline.sets ? Math.round(baseline.q / baseline.sets) : 25;
    return { sets, questions: sets * perSet };
  }

  /* Replace the baseline landing-card meta with the live counts as soon as the
     probes finish, then refresh the hero totals. */
  function refreshMockLandingCounts(cats) {
    cats.forEach((c) => {
      computeMockCategoryCounts(c).then((live) => {
        if (!live.sets) return;
        state.mockLiveCounts[c.id] = live;
        const card = document.querySelector(`.mv-card[data-mock-cat="${c.id}"]`);
        const meta = card && card.querySelector(".mv-card-meta");
        if (meta) meta.textContent = `${live.sets} sets · ${live.questions} questions`;
        updateMockHeroTotals();
      }).catch(() => {});
    });
  }

  function updateMockHeroTotals() {
    const cats = state.categories.filter((c) => c.id !== "study-guides" && c.id !== "articles");
    let sets = 0;
    let questions = 0;
    let found = false;
    cats.forEach((c) => {
      const live = state.mockLiveCounts[c.id];
      if (!live) return;
      sets += live.sets;
      questions += live.questions;
      found = true;
    });
    if (!found) return;
    const setEl = $("#mock-stat-sets");
    const qEl = $("#mock-stat-questions");
    if (setEl) setEl.textContent = String(sets);
    if (qEl) qEl.textContent = String(questions);
  }

  /* Sum of the static baseline counts for the categories that exist. */
  function mockLandingBaseline() {
    let sets = 0;
    let questions = 0;
    state.categories.forEach((c) => {
      const meta = MOCK_LANDING_META[c.id];
      if (!meta) return;
      sets += meta.sets;
      questions += meta.q;
    });
    return { sets, questions };
  }

  function bilingualName(obj) {
    if (obj == null) return { en: "", as: "" };
    if (typeof obj === "string") return { en: obj, as: "" };
    const en = obj.en || obj.as || "";
    const as = obj.as && obj.as !== en ? obj.as : "";
    return { en, as };
  }

  function mockTileHTML(opts) {
    const color = opts.color || catColor(opts.catId);
    const delay = opts.delay || 0;
    const asLine = opts.as ? `<span class="mt-tile-as">${escapeHtml(opts.as)}</span>` : "";
    const meta = opts.meta ? `<span class="mt-tile-meta">${opts.meta}</span>` : "";
    const ico = opts.iconHtml || topicIconHTML(opts.id, opts.catId);
    return `<a class="mt-tile reveal" href="${opts.href}" style="--c:${color}" data-delay="${delay}">
        <span class="mt-tile-ico">${ico}</span>
        <span class="mt-tile-en">${escapeHtml(opts.en)}</span>
        ${asLine}
        ${meta}
      </a>`;
  }

  function mockTopicsHead(name) {
    return `<div class="mt-topics-head">
        <h2>${escapeHtml(name)} Mock Test</h2>
        <p>Choose a topic below to begin your timed mock test.</p>
      </div>`;
  }

  function mockLandingCard(c, i) {
    const color = catColor(c.id);
    const nm = c.name;
    const en = typeof nm === "string" ? nm : (nm && nm.en) || "";
    const as = typeof nm === "string" ? "" : (nm && nm.as) || "";
    const meta = MOCK_LANDING_META[c.id];
    const metaText = meta ? `${meta.sets} sets · ${meta.q} questions` : `${countTopics(c)} topics`;
    return `
      <a class="mv-card reveal" style="--c:${color}" data-delay="${i * 50}" data-mock-cat="${c.id}" href="/mock-test/${c.id}">
        <span class="mv-card-ico">${catIconHTML(c.id)}</span>
        <span class="mv-card-body">
          <span class="mv-card-title">${escapeHtml(en)}</span>
          ${as ? `<span class="mv-card-as">${escapeHtml(as)}</span>` : ""}
          <span class="mv-card-meta">${metaText}</span>
        </span>
        <span class="mv-card-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
      </a>`;
  }

  /* Promo banner pointing at the standalone Exam-wise Mock Test portal. */
  function examWiseLandingCards() {
    const exams = examWiseAvailableExams();
    if (!exams.length) return "";
    const names = exams.map((e) => ebkLang(e.title, "en")).join(" · ");
    return `
      <a class="mv-promo reveal" href="/exam-wise-mock-test">
        <span class="mv-promo-new"><span class="fnb-dot"></span>${state.uiLang === "as" ? "নতুন" : "NEW"}</span>
        <span class="mv-promo-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
        <span class="mv-promo-body">
          <b>${escapeHtml(t("mock.examwise.landingTitle"))}</b>
          <span>${escapeHtml(t("mock.examwise.landingSub"))}</span>
          <span class="mv-promo-chips">${escapeHtml(names)}</span>
        </span>
        <span class="mv-promo-go">${escapeHtml(t("mock.examwise.landingCta"))}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </a>`;
  }

  async function renderMockCategoryPicker(main) {
    /* Exam-wise cards are drawn from the live exam library, so the picker
       waits for it before painting. */
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;
    await getExamsList();
    const mockCategories = state.categories.filter(c => c.id !== "study-guides" && c.id !== "articles");
    const baseline = mockLandingBaseline();
    const examWiseCards = examWiseLandingCards();

    main.innerHTML = `
      <section class="mv-landing">
        <div class="mv-hero">
          <span class="mv-badge"><span class="dot"></span>100% Free · English &amp; Assamese</span>
          <h1>${t("mock.title")} for Competitive Exams</h1>
          <p class="mv-hero-sub">Take timed mock tests designed exactly like the real exam to build speed, accuracy and confidence for ADRE 3.0, Assam Police, APSC, Gauhati High Court, SSC and Railway exams.</p>
          <div class="mv-stats">
            <div class="mv-stat"><b>100+</b><span>Subjects</span></div>
            <div class="mv-stat"><b id="mock-stat-sets">${baseline.sets}</b><span>Practice Sets</span></div>
            <div class="mv-stat"><b id="mock-stat-questions">${baseline.questions}</b><span>Questions</span></div>
            <div class="mv-stat"><b>100%</b><span>Free Forever</span></div>
          </div>
          <div class="mv-cta">
            <a class="mv-btn mv-btn-primary" href="#subjects">${escapeHtml(t("mock.startMain"))}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a class="mv-btn mv-btn-ghost" href="#exam-wise">${escapeHtml(t("nav.examMock"))}</a>
          </div>
        </div>

        ${examWiseCards ? `<div class="mv-section" id="exam-wise">
          ${examWiseCards}
        </div>` : ""}

        <div class="mv-exams reveal">
          <div class="mv-exams-head">
            <h2>Which exams do these Mock Tests cover?</h2>
            <p class="mv-exams-as">এই মক টেষ্টবোৰে কোন কোন পৰীক্ষা সামৰি লয়?</p>
            <p class="mv-exams-sub">Timed mock tests built on the exact syllabus &amp; pattern of:<br>তলত দিয়া পৰীক্ষাসমূহৰ পাঠ্যক্ৰম আৰু আৰ্হি অনুসৰি প্ৰস্তুত কৰা সময়সীমা থকা মক টেষ্ট:</p>
          </div>
          <ul class="mv-exams-list">
            <li><b>Assam Police</b><span>অসম আৰক্ষী</span></li>
            <li><b>ADRE 3.0</b><span>ADRE ৩.০</span></li>
            <li><b>APSC</b><span>এ পি এছ চি</span></li>
            <li><b>Gauhati High Court</b><span>গুৱাহাটী উচ্চ ন্যায়ালয়</span></li>
            <li><b>SSC</b><span>এছ এছ চি</span></li>
            <li><b>Railway (RRB)</b><span>ৰে'লৱে (RRB)</span></li>
            <li><b>DHS &amp; DME</b><span>ডি এইচ এছ আৰু ডি এম ই</span></li>
            <li><b>And many more...</b><span>আৰু অন্যান্য প্ৰতিযোগিতামূলক পৰীক্ষা</span></li>
          </ul>
        </div>

        <div class="mv-section" id="subjects">
          <div class="mv-head"><h2>${t("mock.pick")}</h2><p>${t("mock.pick.sub")}</p></div>
          <div class="mv-grid">
            ${mockCategories.map((c, i) => mockLandingCard(c, i)).join("")}
          </div>
        </div>

        <div class="mv-section">
          <div class="mv-head"><h2>Why practise with axomexam?</h2><p>Everything you need to simulate the real exam</p></div>
          <div class="mv-features">
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
              <b>Live Timer</b><p>Every test runs on a real exam-style countdown so you learn to manage your time.</p>
            </div>
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span>
              <b>Instant Scoring</b><p>Your score and accuracy are calculated the moment you submit the paper.</p>
            </div>
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
              <b>Answer Review</b><p>See the correct answer and a clear explanation for every question you attempt.</p>
            </div>
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
              <b>Bilingual</b><p>Practise in both English and Assamese — switch anytime during the test.</p>
            </div>
          </div>
        </div>

        <div class="mv-section">
          <div class="mv-head"><h2>How it works</h2><p>Three simple steps to test yourself</p></div>
          <div class="mv-steps">
            <div class="mv-step"><span class="mv-step-num">1</span><b>Pick a subject</b><p>Choose the subject and paper you want to practise from the grid above.</p></div>
            <div class="mv-step"><span class="mv-step-num">2</span><b>Attempt the test</b><p>Answer the questions within the live timer just like the real examination hall.</p></div>
            <div class="mv-step"><span class="mv-step-num">3</span><b>Review &amp; improve</b><p>Study the instant result and explanations, then reattempt to track your progress.</p></div>
          </div>
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      name: "Mock Tests",
      noDefaults: true,
      h2: "Timed Mock Tests for Assam Competitive Exams",
      info: "Each mock test on axomexam.in works like the real examination. A live timer runs while you attempt the questions, your score is calculated instantly, and every question is followed by a clear bilingual explanation. The sets are arranged subject-wise and paper-wise so you can practise exactly the section you are preparing for.",
      items: mockCategories.map((c) => ({ name: localized(c.name), count: countTopics(c) })),
      tips: [
        "Start with the subject you find hardest, so you have the most time to improve it.",
        "Attempt one full set under the timer before checking any answer.",
        "Maintain an error log of every wrong answer and revise it weekly.",
        "Increase the number of questions gradually once your accuracy is stable."
      ],
      faqs: [
        { q: "How does the online mock test work?", a: "Choose a subject, pick a paper and attempt the questions within the timer. Once you submit, you immediately see your score along with the correct answers and explanations." },
        { q: "Can I attempt the mock tests more than once?", a: "Yes. All mock tests are unlimited. You can reattempt any set as many times as you like at no cost." },
        { q: "Are the mock tests suitable for ADRE and Assam Police?", a: "Yes. The subjects and question patterns follow the syllabus of ADRE 3.0, Assam Police, APSC, Gauhati High Court, SSC and Railway recruitment exams." }
      ]
    });
    refreshMockLandingCounts(mockCategories);
  }

  function renderMockSubcategoryPicker(main, cat) {
    const subs = mockSubcategories(cat);
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))}</h1>
        <p class="page-desc">Choose a paper to begin your timed mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${mockTopicsHead(localized(cat.name))}
        <div class="mt-tile-grid">
          ${subs.map((s, i) => {
            const nm = bilingualName(s.name);
            const topicN = (s.sections || []).reduce((n, sec) => n + ((sec.topics || []).length), 0) || (s.topics || []).length;
            const meta = topicN
              ? `${topicN} ${topicN === 1 ? "topic" : "topics"}`
              : "Timed practice sets";
            return mockTileHTML({
              href: `/mock-test/${cat.id}/${s.id}`,
              catId: cat.id,
              id: s.id,
              en: nm.en,
              as: nm.as,
              meta,
              delay: i * 40
            });
          }).join("")}
        </div>
      </section>`;
    observeReveals();
    const mSubRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id);
    autoSeo(main, {
      id: cat.id,
      name: localized(cat.name) + " Mock Test",
      count: subs.length,
      total: mSubRecs.reduce((a, r) => a + (r.nQuestions || 0), 0),
      h2: localized(cat.name) + " Mock Tests with Answers",
      items: subs.map((s) => ({ name: localized(s.name), count: 0 }))
    });
  }

  function renderMockSectionPicker(main, cat, sub) {
    const secs = sub.sections || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Choose a section to begin your test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${mockTopicsHead(localized(sub.name))}
        <div class="mt-tile-grid">
          ${secs.map((sec, i) => {
            const nm = bilingualName(sec.name);
            const n = (sec.topics || []).length;
            return mockTileHTML({
              href: `/mock-test/${cat.id}/${sub.id}/${sec.id}`,
              catId: cat.id,
              id: sec.id,
              en: nm.en,
              as: nm.as,
              meta: `${n} ${n === 1 ? "topic" : "topics"}`,
              delay: i * 50
            });
          }).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: sub.id,
      name: localized(sub.name) + " Mock Test",
      count: secs.length,
      h2: localized(sub.name) + " Mock Test - " + localized(cat.name),
      items: secs.map((s) => ({ name: localized(s.name), count: (s.topics || []).length }))
    });
  }

  function renderMockTopicPicker(main, cat, sub, sec) {
    const topics = sec.topics || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${mockTopicsHead(localized(sec.name))}
        <div class="mt-tile-grid">
          ${topics.map((tp, i) => {
            const nm = bilingualName(tp.name);
            return mockTileHTML({
              href: `/mock-test/${cat.id}/start`,
              catId: cat.id,
              id: tp.id,
              en: nm.en,
              as: nm.as,
              meta: "Take Mock Test",
              delay: i * 40
            });
          }).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: sec.id,
      name: localized(sec.name) + " Mock Test",
      count: topics.length,
      h2: localized(sec.name) + " Mock Test Questions",
      items: topics.map((tp) => ({ name: localized(tp.name), count: 0 }))
    });
  }

  /* ================= Manual JSON Mock Test Sets ================= */

  function hasMockQuestions(data) {
    if (!data) return false;
    if (Array.isArray(data)) return data.length > 0;
    return Array.isArray(data.questions) && data.questions.length > 0;
  }

  /* Probe set-N.json files until the first gap to discover how many
     sets exist for a subcategory. Results are cached per session. */
  async function detectMockSets(catId, subId) {
    const cacheKey = catId + "/" + subId;
    if (state.mockSetCache[cacheKey]) return state.mockSetCache[cacheKey];

    const found = [];
    for (let n = 1; n <= MAX_MOCK_SETS; n++) {
      const data = await API.getMockSet(catId, subId, n);
      if (hasMockQuestions(data)) {
        found.push(n);
      } else {
        break;
      }
    }
    state.mockSetCache[cacheKey] = found;
    return found;
  }

  /* Normalise one question object from a manually uploaded set file
     into the internal quiz format used by the mock test engine. */
  function normalizeMockQuestion(item) {
    if (!item || typeof item !== "object") return null;

    const qTextObj = {
      en: extractField(item, "question", "en"),
      as: extractField(item, "question", "as")
    };
    if (!qTextObj.en && !qTextObj.as) return null;

    const aTextObj = {
      en: extractField(item, "answer", "en"),
      as: extractField(item, "answer", "as")
    };

    const optsEn = getOptionsList(item, "en");
    const optsAs = getOptionsList(item, "as");
    const rawOpts = Array.isArray(item.options) ? item.options : [];
    let optionsList = [];
    if (optsEn.length || optsAs.length) {
      const maxLen = Math.max(optsEn.length, optsAs.length);
      for (let i = 0; i < maxLen; i++) {
        const src = rawOpts[i];
        optionsList.push({
          en: optsEn[i] || "",
          as: optsAs[i] || "",
          fig: src && typeof src === "object" && typeof src.fig === "string" ? src.fig : ""
        });
      }
    }

    let correctIdx = 0;
    if (typeof item.correct === "string") {
      const letter = item.correct.trim().toLowerCase();
      const charCode = letter.charCodeAt(0);
      if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
    } else if (typeof item.a === "string") {
      const letter = item.a.trim().toLowerCase();
      const charCode = letter.charCodeAt(0);
      if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
    } else if (Number.isInteger(item.correct_index)) {
      correctIdx = item.correct_index;
    } else if (Number.isInteger(item.correct)) {
      correctIdx = item.correct;
    } else if (Number.isInteger(item.answer)) {
      correctIdx = item.answer;
    }

    let difficulty = String(item.difficulty || "medium").toLowerCase().trim();
    if (difficulty !== "easy" && difficulty !== "hard") difficulty = "medium";

    const expTextObj = {
      en: extractField(item, "explanation", "en"),
      as: extractField(item, "explanation", "as")
    };

    return {
      q: qTextObj,
      a: aTextObj,
      fig: typeof item.fig === "string" ? item.fig : "",
      table: item.table || null,
      options: optionsList.length >= 2 ? optionsList : null,
      correct: correctIdx,
      difficulty: difficulty,
      explanation: { en: expTextObj.en, as: expTextObj.as }
    };
  }

  async function loadMockSetQuestions(cat, sub, setNumber) {
    const data = await API.getMockSet(cat.id, sub.id, setNumber);
    if (!hasMockQuestions(data)) return null;
    const list = Array.isArray(data) ? data : (Array.isArray(data.questions) ? data.questions : []);
    const questions = list.map(normalizeMockQuestion).filter(Boolean);
    if (!questions.length) return null;
    return {
      setNumber,
      title: (data && data.title) || `Set ${setNumber}`,
      subject: (data && data.subject) || (sub && sub.name) || "",
      questions
    };
  }

  function groupByDifficulty(questions) {
    const groups = { easy: [], medium: [], hard: [] };
    (questions || []).forEach((q) => {
      if (!q.options || q.options.length < 2) return;
      groups[q.difficulty] = groups[q.difficulty] || [];
      groups[q.difficulty].push(q);
    });
    return groups;
  }

  function difficultyLabel(d, lang) {
    const l = lang || state.uiLang;
    if (d === "easy") return l === "as" ? "সহজ" : "Easy";
    if (d === "hard") return l === "as" ? "কঠিন" : "Hard";
    return l === "as" ? "মধ্যম" : "Medium";
  }

  function renderMockSetPicker(main, cat, sub, setNumbers) {
    const existing = new Set(setNumbers);
    const visible = Math.max(DEFAULT_VISIBLE_SETS, ...setNumbers);

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Pick a set to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="set-grid">
          ${Array.from({ length: visible }, (_, i) => {
            const n = i + 1;
            if (existing.has(n)) {
              return `
              <a class="set-card reveal" href="/mock-test/${cat.id}/${sub.id}/set-${n}" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
                <span class="set-card-head">
                  <span class="set-num">${String(n).padStart(2, "0")}</span>
                  <span class="set-status">Available</span>
                </span>
                <span class="set-name">Mock Test Set ${n}</span>
                <span class="set-meta">Full paper • Instant scoring</span>
                <span class="set-go">
                  <span>Start Test</span>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </a>`;
            }
            return `
              <div class="set-card set-card-locked reveal" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
                <span class="set-card-head">
                  <span class="set-num">${String(n).padStart(2, "0")}</span>
                  <span class="set-status set-status-locked">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Coming Soon
                  </span>
                </span>
                <span class="set-name">Mock Test Set ${n}</span>
                <span class="set-meta">Not published yet</span>
              </div>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  async function renderMockSetDifficulty(main, cat, sub, setNumber) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;

    const loaded = await loadMockSetQuestions(cat, sub, setNumber);
    if (!loaded) {
      main.innerHTML = `
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>Questions for Set ${setNumber} have not been uploaded yet. Please check back soon.</p>
          <div style="margin-top:18px;">
            <a class="btn btn-outline" href="/mock-test/${cat.id}/${sub.id}">← Back to Sets</a>
          </div>
        </div>`;
      return;
    }

    const quizPool = loaded.questions.filter((q) => q.options && q.options.length >= 2);
    const fullPool = quizPool.length ? quizPool : loaded.questions;
    const countOptions = [10, 15, 20, 25].filter((n) => n <= fullPool.length);
    if (!countOptions.length) countOptions.push(fullPool.length);
    const defaultCount = countOptions.includes(25) ? 25 : countOptions[countOptions.length - 1];

    state.mock = {
      cat, pool: fullPool, configured: false, count: defaultCount,
      testLang: cat.id === "english" ? "en" : "as",
      setInfo: { setNumber, title: loaded.title, subject: localized(sub.name) }
    };

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(loaded.title)}</span>
        </nav>
        <h1>${escapeHtml(loaded.title)} — ${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Choose your language and start when ready.</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${catColor(cat.id)}">
          <span class="mt-hero-icon">${catIconHTML(cat.id)}</span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${escapeHtml(localized(cat.name))}</span>
            <span class="mt-hero-title">${escapeHtml(loaded.title)} • ${escapeHtml(localized(sub.name))}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${state.mock.pool.length} ${t("mock.questions")}</span>
              <span class="mt-chip">অসমীয়া / English</span>
            </span>
          </span>
        </div>

        <div class="mt-block">
          <div class="mt-label">Question Language <span>প্ৰশ্নৰ ভাষা</span></div>
          <div class="mt-segmented">
            <button type="button" class="mt-seg-btn ${state.mock.testLang === "as" ? "active" : ""}" data-mocklang="as">
              <span class="mt-seg-ico">অ</span> অসমীয়া (Assamese)
            </button>
            <button type="button" class="mt-seg-btn ${state.mock.testLang === "en" ? "active" : ""}" data-mocklang="en">
              <span class="mt-seg-ico">A</span> English
            </button>
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">Number of Questions <span>প্ৰশ্নৰ সংখ্যা</span></div>
          <div class="count-picker" id="set-count-picker" style="margin:0;">
            ${countOptions.map((n) => `<button type="button" data-count="${n}" class="${n === defaultCount ? "active" : ""}">${n}</button>`).join("")}
          </div>
        </div>

        <button class="btn mt-start" id="mock-begin-btn">${t("mock.begin")} →</button>

        <div class="mt-block">
          <div class="mt-label">Instructions <span>নিৰ্দেশনা</span></div>
          <ul class="mt-rules">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>This is a timed test — a stopwatch tracks your total time.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>Choose the best answer. Results are graded instantly on submit.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>You can quit anytime — your current progress will be lost.</li>
          </ul>
        </div>
      </div>`;

    $$("[data-mocklang]").forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.mock.testLang = b.dataset.mocklang;
      });
    });

    let selectedCount = defaultCount;
    const countPicker = $("#set-count-picker");
    if (countPicker) {
      $$("button", countPicker).forEach((b) => {
        b.addEventListener("click", () => {
          $$("button", countPicker).forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          selectedCount = parseInt(b.dataset.count, 10);
          state.mock.count = selectedCount;
        });
      });
    }

    $("#mock-begin-btn").addEventListener("click", () => {
      showModalPopup({
        title: `Start ${loaded.title}?`,
        message: `You are about to start a ${selectedCount} question mock test in ${state.mock.testLang === "as" ? "অসমীয়া" : "English"}. Do you want to proceed?`,
        confirmText: "Start Test",
        cancelText: "Cancel",
        onConfirm: () => startSetMock(selectedCount)
      });
    });
  }

  /* Shared "configure and start" panel for the exam-wise (Assam Police /
     ADRE Grade III & IV) mock tests. Renders the hero, the language switch,
     the question-count picker and the instructions, then wires the Start
     button to `opts.onStart`. */
  /* Exam-wise display strings derived from an exam's paper blueprint, so the
     setup panel and instruction rules read the real paper's numbers instead of
     the old hardcoded 100 Q / 50 marks / 2 h / no-negative set. Falls back to
     the Assam Police shape when no blueprint is supplied. */
  const AS_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  function asDigits(str) {
    return String(str).replace(/[0-9]/g, (d) => AS_DIGITS[+d]);
  }

  function bpDisplay(bp) {
    const q = bp ? bp.sections.reduce((n, s) => n + s.questions, 0) : 100;
    const mins = (bp && bp.durationMinutes) || 120;
    const total = (bp && bp.totalMarks) || 50;
    const per = (bp && bp.marksPerQuestion) || 0.5;
    const neg = (bp && bp.negativeMarking) || 0;
    const hours = Math.round((mins / 60) * 10) / 10;
    const marking = neg > 0
      ? tf("mock.examwise.bpMarkingVal", { m: per, neg })
      : tf("mock.examwise.bpMarkingNoNeg", { m: per });
    return {
      questions: q,
      time: tf("mock.examwise.bpTimeVal", { mins, hours }),
      marks: tf("mock.examwise.bpMarksVal", { n: total }),
      marking,
      rule1: tf("mock.examwise.bpRule1", { mins, hours }),
      rule2: tf("mock.examwise.bpRule2", { n: q, m: per, total }),
      rule3: neg > 0 ? tf("mock.examwise.bpRule3Neg", { neg }) : t("mock.examwise.bpRule3"),
      asRule1: tfLang("mock.examwise.bpRule1", "as", { mins: asDigits(mins), hours: asDigits(hours) }),
      asRule2: tfLang("mock.examwise.bpRule2", "as", { n: asDigits(q), m: asDigits(per), total: asDigits(total) }),
      asRule3: neg > 0 ? tfLang("mock.examwise.bpRule3Neg", "as", { neg: asDigits(neg) }) : tLang("mock.examwise.bpRule3", "as"),
    };
  }

  function renderMockStartPanel(main, opts) {
    const pool = opts.pool || [];
    const bp = opts.blueprint || null;
    const bpd = bpDisplay(bp);
    const countOptions = (opts.countOptions || [10, 15, 20, 25]).filter((n) => n <= pool.length);
    if (!countOptions.length) countOptions.push(pool.length);
    const defaultCount = countOptions.includes(25) ? 25 : countOptions[countOptions.length - 1];
    const testLang = opts.testLang || "as";

    state.mock = {
      cat: opts.cat || null,
      pool,
      configured: false,
      count: defaultCount,
      testLang,
      blueprint: bp,
      setInfo: opts.setInfo || null
    };

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          ${(opts.breadcrumb || []).map((c) => `${c.href ? `<a href="${c.href}">${escapeHtml(c.label)}</a><span class="bc-sep">/</span>` : `<span>${escapeHtml(c.label)}</span>`}`).join("")}
        </nav>
        <h1>${escapeHtml(opts.title)}</h1>
        <p class="page-desc">${t("mock.examwise.setup.desc")}</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${opts.color}">
          <span class="mt-hero-icon">${opts.iconHtml}</span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${escapeHtml(opts.heroCat)}</span>
            <span class="mt-hero-title">${escapeHtml(opts.heroTitle)}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${pool.length} ${t("mock.questions")}</span>
              <span class="mt-chip">অসমীয়া / English</span>
            </span>
          </span>
        </div>

        <div class="mt-block mt-details">
          <div class="mt-label">${t("mock.examwise.details")} <span>পৰীক্ষাৰ বিৱৰণ</span></div>
          <div class="mt-detail-grid">
            ${bp ? "" : `<span class="mt-detail"><span class="mt-detail-k">${t("mock.examwise.detailQuestions")}</span><b id="mt-count-val">${defaultCount}</b></span>`}
            <span class="mt-detail"><span class="mt-detail-k">${t("mock.examwise.detailLang")}</span><b id="mt-lang-val">${testLang === "as" ? "অসমীয়া" : "English"}</b></span>
            <span class="mt-detail"><span class="mt-detail-k">${t("mock.examwise.detailMode")}</span><b>${t("mock.examwise.modeTimed")}</b></span>
            ${bp ? `<span class="mt-detail"><span class="mt-detail-k">${t("mock.examwise.detailTime")}</span><b>${escapeHtml(bpd.time)}</b></span>` : ""}
            ${bp ? `<span class="mt-detail"><span class="mt-detail-k">${t("mock.examwise.detailMarks")}</span><b>${escapeHtml(bpd.marks)}</b></span>` : ""}
            <span class="mt-detail"><span class="mt-detail-k">${t("mock.examwise.detailMarking")}</span><b>${bp ? escapeHtml(bpd.marking) : t("mock.examwise.markingVal")}</b></span>
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">${t("mock.examwise.lang")} <span>প্ৰশ্নৰ ভাষা</span></div>
          <div class="mt-segmented">
            <button type="button" class="mt-seg-btn ${testLang === "as" ? "active" : ""}" data-mocklang="as">
              <span class="mt-seg-ico">অ</span> অসমীয়া (Assamese)
            </button>
            <button type="button" class="mt-seg-btn ${testLang === "en" ? "active" : ""}" data-mocklang="en">
              <span class="mt-seg-ico">A</span> English
            </button>
          </div>
        </div>

        ${bp ? "" : `<div class="mt-block">
          <div class="mt-label">${t("mock.examwise.count")} <span>প্ৰশ্নৰ সংখ্যা</span></div>
          <div class="count-picker" id="set-count-picker" style="margin:0;">
            ${countOptions.map((n) => `<button type="button" data-count="${n}" class="${n === defaultCount ? "active" : ""}">${n}</button>`).join("")}
          </div>
        </div>`}

        <div class="mt-block">
          <div class="mt-label">${t("mock.examwise.instructions")} <span>নিৰ্দেশনা</span></div>
          <p class="mt-sub">${t("mock.examwise.instructionsSub")}</p>
          <ul class="mt-rules">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${bp ? escapeHtml(bpd.rule1) : t("mock.examwise.rule1")}<span class="mt-rule-as" lang="as">${bp ? escapeHtml(bpd.asRule1) : tLang("mock.examwise.ruleAs1", "as")}</span></span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>${bp ? escapeHtml(bpd.rule2) : t("mock.examwise.rule2")}<span class="mt-rule-as" lang="as">${bp ? escapeHtml(bpd.asRule2) : tLang("mock.examwise.ruleAs2", "as")}</span></span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg><span>${bp ? escapeHtml(bpd.rule3) : t("mock.examwise.rule3")}<span class="mt-rule-as" lang="as">${bp ? escapeHtml(bpd.asRule3) : tLang("mock.examwise.ruleAs3", "as")}</span></span></li>
            ${bp ? `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><span>${t("mock.examwise.rule4")}<span class="mt-rule-as" lang="as">${tLang("mock.examwise.ruleAs4", "as")}</span></span></li>` : ""}
          </ul>
        </div>

        <div class="mt-ready">
          <span class="mt-ready-txt"><b>${t("mock.examwise.readyTitle")}</b><span>${t("mock.examwise.readySub")}</span></span>
          <button class="btn mt-start" id="mock-begin-btn">${t("mock.begin")} →</button>
        </div>
      </div>`;

    $$("[data-mocklang]").forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.mock.testLang = b.dataset.mocklang;
        const lv = $("#mt-lang-val");
        if (lv) lv.textContent = b.dataset.mocklang === "as" ? "অসমীয়া" : "English";
      });
    });

    let selectedCount = defaultCount;
    const countPicker = $("#set-count-picker");
    if (countPicker) {
      $$("button", countPicker).forEach((b) => {
        b.addEventListener("click", () => {
          $$("button", countPicker).forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          selectedCount = parseInt(b.dataset.count, 10);
          state.mock.count = selectedCount;
          const cv = $("#mt-count-val");
          if (cv) cv.textContent = String(selectedCount);
        });
      });
    }

    const beginBtn = $("#mock-begin-btn");
    if (beginBtn) {
      beginBtn.addEventListener("click", () => {
        showModalPopup({
          title: t("mock.examwise.confirm.title"),
          message: t("mock.examwise.confirm.msg")
            .replace("{n}", selectedCount)
            .replace("{lang}", state.mock.testLang === "as" ? "অসমীয়া" : "English"),
          confirmText: t("mock.begin"),
          cancelText: t("mock.examwise.confirm.cancel"),
          onConfirm: () => opts.onStart(selectedCount)
        });
      });
    }
  }

  function startSetMock(count) {
    if (!state.mock) return;
    const source = state.mock.pool.filter((q) => q.options && q.options.length >= 2);
    const full = source.length ? source : state.mock.pool;
    const n = Math.min(count || full.length, full.length);
    state.mock = Object.assign(state.mock, {
      pool: shuffle(full).slice(0, n),
      count: n,
      idx: 0,
      answers: [],
      elapsedSec: 0,
      started: true,
      introPending: true,
      timerId: null
    });
    renderMockQuiz();
  }

  async function renderMockSetup(main, cat, subId, secId, topicId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;

    const pool = await collectQuestionsForMock(cat, subId, secId, topicId);
    if (!pool.length) {
      main.innerHTML = `
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${t("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/mock-test">← Choose Another Category</a></div>
        </div>`;
      return;
    }

    state.mock = { cat, pool, configured: false, count: 0, testLang: cat.id === "english" ? "en" : "as" };
    const counts = [10, 20, 50, 100].filter((n) => n <= pool.length);
    if (!counts.includes(pool.length)) counts.push(pool.length);

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/mock-test">Mock Test</a><span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span></nav>
        <h1>${t("mock.setup.title")}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.name))} • ${pool.length} ${t("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${catColor(cat.id)};width:40px;height:40px;border-radius:11px;">${catIconHTML(cat.id)}</span>
          <b>${escapeHtml(localized(cat.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${state.mock.testLang === "as" ? "active" : ""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${state.mock.testLang === "en" ? "active" : ""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">${t("mock.setup.count")} / প্ৰশ্নৰ সংখ্যা বাছনি কৰক:</p>
        <div class="count-picker" id="count-picker">
          ${counts.map((n, i) => `<button type="button" data-count="${n}" class="${i === 0 ? "active" : ""}">${n}</button>`).join("")}
        </div>

        <button class="btn btn-begin" id="mock-begin-btn">${t("mock.begin")}</button>
        <div class="setup-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span>Stopwatch Timer will track your total time taken. Instant grading on final submission.</span>
        </div>
      </div>`;

    $$("[data-mocklang]").forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.mock.testLang = b.dataset.mocklang;
      });
    });

    const picker = $("#count-picker");
    let selected = counts[0] || pool.length;
    $$("button", picker).forEach((b) => {
      b.addEventListener("click", () => {
        $$("button", picker).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        selected = parseInt(b.dataset.count, 10);
      });
    });

    $("#mock-begin-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Start Mock Test?",
        message: `You are about to start a ${selected} question test in ${state.mock.testLang === "as" ? "অসমীয়া" : "English"}. Do you want to proceed?`,
        confirmText: "Start Test",
        cancelText: "Cancel",
        onConfirm: () => startMock(selected)
      });
    });
  }

  function startMock(count) {
    if (!state.mock) return;
    const pool = shuffle(state.mock.pool).slice(0, count);
    state.mock = Object.assign(state.mock, { pool, idx: 0, answers: [], elapsedSec: 0, started: true, introPending: true, timerId: null });
    renderMockQuiz();
  }

  function renderMockQuiz() {
    const m = state.mock;
    const q = m.pool[m.idx];
    if (!q) return renderMockResults();
    /* Keep the floating WhatsApp tab out of the way while a test is running. */
    setWhatsappChatSuppressed(true);
    const main = $("#app");
    const answered = m.answers[m.idx] !== undefined;
    const keys = ["A", "B", "C", "D", "E"];

    const qText = localizeContent(q.q);
    const optList = q.options || [];
    const qMedia = mediaBlock(q);
    const catName = m.cat ? localized(m.cat.name) : "";
    const setLabel = m.setInfo
      ? `${escapeHtml(catName ? catName + " • " : "")}${escapeHtml(m.setInfo.title)}`
      : escapeHtml(catName);

    main.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-top">
          <span class="qt-cat">${setLabel} • Question ${m.idx + 1}/${m.pool.length}</span>
          <span class="quiz-timer" id="quiz-timer" title="Time Elapsed"><span id="quiz-timer-val">${fmtTime(m.elapsedSec)}</span></span>
          <button class="quiz-quit" id="quiz-quit-btn">${t("mock.quit")}</button>
        </div>
        <div class="quiz-progress"><span id="quiz-progress" style="width:${((m.idx) / m.pool.length * 100).toFixed(1)}%"></span></div>
        <div class="quiz-card">
          <div class="quiz-qno">Question ${m.idx + 1}</div>
          <div class="quiz-qtext">${formatMath(qText)}</div>
          ${qMedia}

          <div class="quiz-options" id="quiz-options">
            ${optList.map((opt, i) => {
              const tx = mockOptText(opt);
              const fg = mockOptFig(opt);
              return `
              <button class="quiz-option${fg ? " quiz-option-fig" : ""}" data-opt="${i}" ${answered ? "disabled" : ""}>
                <span class="opt-key">${keys[i]}</span>
                <span class="opt-main">${fg ? `<span class="opt-fig">${fg}</span>` : ""}${tx ? `<span class="opt-text">${formatMath(tx)}</span>` : ""}</span>
              </button>`;
            }).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" type="button">
            ${m.idx + 1 === m.pool.length ? "Final Submit" : (answered ? t("mock.next") + " →" : t("mock.skip") + " →")}
          </button>
        </div>
      </div>`;

    resetScroll();

    const qCard = $(".quiz-card");
    if (qCard) renderMathJax(qCard);

    const optionsBox = $("#quiz-options");
    if (optionsBox) {
      $$(".quiz-option", optionsBox).forEach((opt) => {
        opt.addEventListener("click", () => {
          if (m.answers[m.idx] !== undefined) return;
          const sel = parseInt(opt.dataset.opt, 10);
          m.answers[m.idx] = sel;
          $$(".quiz-option", optionsBox).forEach((o) => {
            o.disabled = true;
            const i = parseInt(o.dataset.opt, 10);
            if (i === q.correct) o.classList.add("correct");
            else if (i === sel) o.classList.add("wrong");
            if (i === sel) o.classList.add("selected");
          });
          const fb = $("#quiz-feedback");
          fb.classList.add(sel === q.correct ? "good" : "bad");
          fb.style.display = "block";
          const corrOpt = optList[q.correct];
          const corrLetter = corrOpt && typeof corrOpt === "object" && corrOpt.option
            ? String(corrOpt.option)
            : (keys[q.correct] || "");
          const corrHTML = `${corrLetter ? `<b>(${corrLetter})</b> ` : ""}${mockOptFig(corrOpt) ? `<span class="opt-fig fb-fig">${mockOptFig(corrOpt)}</span>` : ""}${mockOptText(corrOpt) ? formatMath(mockOptText(corrOpt)) : ""}`;
          fb.innerHTML = sel === q.correct ? t("mock.revealCorrect") : `${t("mock.correctAnswer")}: ${corrHTML || corrLetter || ""}`;
          renderMathJax(fb);
          const nextBtn = $("#quiz-next");
          if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent = m.idx + 1 === m.pool.length ? "Final Submit" : t("mock.next") + " →";
          }
        });
      });
    }

    $("#quiz-next").addEventListener("click", () => {
      m.idx++;
      if (m.idx >= m.pool.length) { stopMockTimer(); renderMockResults(); }
      else { renderMockQuiz(); }
    });

    $("#quiz-quit-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Quit Mock Test?",
        message: "Are you sure you want to quit the mock test? Your current progress will be lost.",
        confirmText: "Yes, Quit",
        cancelText: "Resume Test",
        onConfirm: () => leaveMockTest()
      });
    });

    if (m.introPending) {
      m.introPending = false;
      armMockBackGuard();
      showMockIntro(() => startMockTimer());
    } else {
      if (!m.timerId) startMockTimer();
      armMockBackGuard();
    }
  }

  function showMockIntro(done) {
    const old = document.getElementById("mock-intro");
    if (old) old.remove();

    const stage = document.createElement("div");
    stage.className = "mock-intro";
    stage.id = "mock-intro";
    stage.innerHTML = `
      <div class="mi-backdrop"></div>
      <div class="mi-stage">
        <div class="mi-ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <linearGradient id="mi-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#6366f1"></stop>
                <stop offset="1" stop-color="#22d3ee"></stop>
              </linearGradient>
            </defs>
            <circle class="mi-ring-bg" cx="100" cy="100" r="88"></circle>
            <circle class="mi-ring-fg" cx="100" cy="100" r="88"></circle>
          </svg>
          <div class="mi-core"><div class="mi-count" id="mi-count">3</div></div>
        </div>
        <div class="mi-text">
          <span class="mi-title">Test Started</span>
          <span class="mi-line"></span>
          <span class="mi-sub">All the best • শুভকামনা</span>
        </div>
      </div>`;
    document.body.appendChild(stage);

    const miStage = stage.querySelector(".mi-stage");
    const ringFg = stage.querySelector(".mi-ring-fg");
    const countEl = stage.querySelector("#mi-count");
    const from = 3, step = 600;
    if (miStage) miStage.style.setProperty("--ring-dur", step + "ms");

    requestAnimationFrame(() => {
      stage.classList.add("in");
    });

    const paint = (n) => {
      countEl.textContent = String(n);
      countEl.classList.remove("tick");
      void countEl.offsetWidth;
      countEl.classList.add("tick");
      if (ringFg) {
        ringFg.classList.remove("fill");
        void ringFg.getBoundingClientRect();
        ringFg.classList.add("fill");
      }
    };
    paint(from);

    let n = from;
    const timer = setInterval(() => {
      n--;
      if (n >= 0) { paint(n); return; }
      clearInterval(timer);
      stage.classList.add("go");
      countEl.outerHTML = `<div class="mi-check" id="mi-count"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg></div>`;
      setTimeout(() => {
        stage.classList.add("out");
        setTimeout(() => { stage.remove(); if (done) done(); }, 520);
      }, 880);
    }, step);
  }

  function startMockTimer() {
    const m = state.mock;
    const tick = () => {
      if (!m || !m.started || m.timerId === null) return;
      m.elapsedSec++;
      const tEl = $("#quiz-timer-val");
      if (tEl) tEl.textContent = fmtTime(m.elapsedSec);
    };
    m.timerId = setInterval(tick, 1000);
  }

  function fmtTime(sec) {
    const s = Math.max(0, sec);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  function renderMockResults() {
    const m = state.mock;
    stopMockTimer();
    disarmMockBackGuard();
    setWhatsappChatSuppressed(false);
    if (!m) return;

    let correct = 0, wrong = 0, skipped = 0;
    const results = m.pool.map((q, i) => {
      const a = m.answers[i];
      let ok = false;
      if (a === undefined) skipped++;
      else if (a === q.correct) { ok = true; correct++; }
      else wrong++;
      return { q, a, ok };
    });

    const timeTaken = m.elapsedSec;
    const pct = m.pool.length ? Math.round((correct / m.pool.length) * 100) : 0;
    const msgKey = pct >= 80 ? "mock.result.msgExcellent" : pct >= 55 ? "mock.result.msgGood" : pct >= 35 ? "mock.result.msgAverage" : "mock.result.msgPoor";
    const R = 52.5, C = 2 * Math.PI * R;
    const offset = C * (1 - pct / 100);

    const main = $("#app");
    main.innerHTML = `
      <div class="result-wrap">
        <div class="result-panel">
          <div class="result-ring">
            <svg viewBox="0 0 120 120">
              <circle class="r-bg" cx="60" cy="60" r="${R}"></circle>
              <circle class="r-fg" cx="60" cy="60" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"></circle>
            </svg>
            <div class="result-percent">${pct}%</div>
          </div>
          <h2 style="font-size:1.25rem;">${t("mock.result.title")}</h2>
          ${m.setInfo ? `<p style="font-size:.85rem; color:var(--ink-soft,#64748b); margin:2px 0 0;">${escapeHtml(m.setInfo.title)}${m.setInfo.difficulty ? " • " + difficultyLabel(m.setInfo.difficulty) : ""}</p>` : ""}
          <p class="result-msg">${t(msgKey)}</p>
          <div class="result-stats">
            <div class="rstat"><b>${correct}</b><span>${t("mock.result.correct")}</span></div>
            <div class="rstat bad"><b>${wrong}</b><span>${t("mock.result.wrong")}</span></div>
            <div class="rstat skip"><b>${skipped}</b><span>${t("mock.result.skipped")}</span></div>
            <div class="rstat"><b>${fmtTime(timeTaken)}</b><span>Total Time Taken</span></div>
          </div>
          <div class="result-actions">
            <button class="btn btn-accent" id="mock-share-btn">${svgShareIcon()} ${t("mock.result.share")}</button>
            <button class="btn btn-outline" id="mock-retry">${t("mock.result.retry")}</button>
            <a class="btn btn-outline" href="/mock-test">${t("mock.result.changeCat")}</a>
            <button class="btn btn-outline" id="mock-review-toggle">${t("mock.result.review")}</button>
            <a class="btn btn-outline" href="/mock-test">${t("mock.result.exit")}</a>
          </div>
        </div>
        <div class="review-list" id="review-list" hidden>
          ${results.map((r, i) => {
            const q = r.q;
            const badge = r.a === undefined
              ? `<span class="rv-badge" style="background:#f1f5f9;color:#64748b;">${t("mock.result.skipped")}</span>`
              : `<span class="rv-badge ${r.ok ? "good" : "bad"}">${r.ok ? "✓ " + t("mock.result.correct") : "✕ " + t("mock.result.wrong")}</span>`;

            const optList = q.options || [];
            const rvOpt = (idx) => {
              if (!optList[idx]) return "";
              const letter = String.fromCharCode(65 + idx);
              const fg = mockOptFig(optList[idx]);
              const tx = mockOptText(optList[idx]);
              return `<b>(${letter})</b> ${fg ? `<span class="rv-fig">${fg}</span>` : ""}${tx ? formatMath(tx) : (fg ? "" : "(No text)")}`;
            };
            let ansLine = "";
            if (r.a !== undefined && optList.length) {
              ansLine = `<div class="rv-ans"><b>${t("mock.answer")}:</b> ${rvOpt(r.a)}</div>`;
              if (!r.ok) ansLine += `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${rvOpt(q.correct)}</div>`;
            } else if (optList.length) {
              ansLine = `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${rvOpt(q.correct)}</div>`;
            }
            const expText = localizeContent(q.explanation);
            const expLabel = (state.mock && state.mock.testLang === "as") ? "ব্যাখ্যা" : "Explanation";
            const expLine = expText ? `<div class="rv-exp"><b>${expLabel}:</b> ${formatMath(expText)}</div>` : "";
            return `
              <div class="review-item">
                <div class="rv-q">Q${i + 1}. ${formatMath(localizeContent(q.q))}</div>
                ${mediaBlock(q)}
                ${badge}
                ${ansLine}
                ${expLine}
              </div>`;
          }).join("")}
        </div>
      </div>`;

    resetScroll();

    const revList = $("#review-list");
    if (revList) renderMathJax(revList);

    requestAnimationFrame(() => {
      const fg = $(".result-ring .r-fg");
      if (fg) fg.style.strokeDashoffset = offset.toFixed(1);
    });

    $("#mock-retry").addEventListener("click", () => startMock(m.pool.length));
    const shareBtn = $("#mock-share-btn");
    if (shareBtn) shareBtn.addEventListener("click", openMockShareModal);
    const reviewBtn = $("#mock-review-toggle");
    reviewBtn.addEventListener("click", () => {
      const list = $("#review-list");
      const hidden = list.hidden;
      list.hidden = !hidden;
      reviewBtn.textContent = hidden ? t("mock.result.hideReview") : t("mock.result.review");
    });

    if (m.timerId) { clearInterval(m.timerId); m.timerId = null; }
  }

  /* ================= Share result as a report card ================= */
  const SHARE_SITE_ORIGIN = "https://axomexam.in";

  function svgShareIcon() {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>`;
  }
  function svgWhatsapp() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  }
  function svgFacebook() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  }
  function svgTelegram() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;
  }
  function svgTwitter() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  }
  function svgMoreApps() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>`;
  }
  function svgDownload() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  }
  function svgCopy() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  }
  function svgCamera() {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  }
  function svgAvatarPlaceholder() {
    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  }
  function svgTrophy() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
  }

  function buildShareSummary() {
    const m = state.mock;
    if (!m) return null;
    let correct = 0, wrong = 0, skipped = 0;
    m.pool.forEach((q, i) => {
      const a = m.answers[i];
      if (a === undefined) skipped++;
      else if (a === q.correct) correct++;
      else wrong++;
    });
    const pct = m.pool.length ? Math.round((correct / m.pool.length) * 100) : 0;
    const msgKey = pct >= 80 ? "mock.result.msgExcellent" : pct >= 55 ? "mock.result.msgGood" : pct >= 35 ? "mock.result.msgAverage" : "mock.result.msgPoor";
    let path = "/mock-test";
    if (location.pathname && location.pathname.indexOf("/mock-test/") === 0) path = location.pathname.replace(/\/index\.html$/, "");
    const setTitle = (m.setInfo && m.setInfo.title) ? m.setInfo.title : "";
    const subject = (m.setInfo && m.setInfo.subject) ? m.setInfo.subject : localized(m.cat && m.cat.name);
    const title = setTitle ? (subject ? subject + " • " + setTitle : setTitle) : (localized(m.cat && m.cat.name) + " Mock Test");
    return {
      correct, wrong, skipped, pct, msgKey,
      url: SHARE_SITE_ORIGIN + path,
      title,
      time: fmtTime(m.elapsedSec),
      count: m.pool.length
    };
  }

  function shareTextFor(S) {
    return t("share.text")
      .replace("{p}", String(S.pct))
      .replace("{t}", S.title)
      .replace("{url}", S.url)
      .replace("{site}", SHARE_SITE_ORIGIN);
  }

  function dataUrlToBlob(dataUrl) {
    const parts = String(dataUrl).split(",");
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    const bin = atob(parts[1]);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  function rcRoundRect(ctx, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  function drawShareBrandPng() {
    const scale = 2, w = 186, h = 34, font = "'Plus Jakarta Sans','Inter',Arial,sans-serif";
    const c = document.createElement("canvas");
    c.width = w * scale;
    c.height = h * scale;
    const ctx = c.getContext("2d");
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    rcRoundRect(ctx, 0, 0, 34, 34, 9);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 18px " + font;
    ctx.fillText("A", 17, 17);
    ctx.textAlign = "left";
    ctx.font = "800 21px " + font;
    ctx.fillText("axomexam.in", 46, 17);
    return c.toDataURL("image/png");
  }

  function drawShareBadgePng(label) {
    const scale = 2, h = 28, padX = 16, font = "'Plus Jakarta Sans','Inter',Arial,sans-serif";
    const measure = document.createElement("canvas").getContext("2d");
    measure.font = "800 11px " + font;
    const w = Math.ceil(measure.measureText(label).width + padX * 2);
    const c = document.createElement("canvas");
    c.width = w * scale;
    c.height = h * scale;
    const ctx = c.getContext("2d");
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    rcRoundRect(ctx, 0.5, 0.5, w - 1, h - 1, 99);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "800 11px " + font;
    ctx.fillText(label, w / 2, h / 2);
    return c.toDataURL("image/png");
  }

  async function generateReportImage(S, name, photo) {
    try { await document.fonts.ready; } catch (e) {}
    const R = 52.5, C = 2 * Math.PI * R;
    const offset = C * (1 - Math.max(0, Math.min(100, S.pct)) / 100);
    const initial = (String(name || "").trim().charAt(0) || "A").toUpperCase();
    const svgFont = "font-family:'Plus Jakarta Sans','Inter',Arial,sans-serif";
    const brandPng = drawShareBrandPng();
    const badgePng = drawShareBadgePng(t("share.reportBadge"));
    const avatar = photo
      ? ('<img src="' + photo + '" alt="" />')
      : ('<svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true"><text x="42" y="56.5" text-anchor="middle" fill="#ffffff" font-size="40" font-weight="800" style="' + svgFont + '">' + escapeHtml(initial) + '</text></svg>');
    const stats = [
      { v: S.correct, l: t("mock.result.correct") },
      { v: S.wrong, l: t("mock.result.wrong") },
      { v: S.skipped, l: t("mock.result.skipped") },
      { v: S.time, l: t("mock.result.time") }
    ];
    const card = document.createElement("div");
    card.className = "report-card";
    card.innerHTML =
      '<div class="rc-top">' +
        '<div class="rc-brand"><img src="' + brandPng + '" alt="" /></div>' +
        '<div class="rc-badge"><img src="' + badgePng + '" alt="" /></div>' +
      '</div>' +
      '<div class="rc-user">' +
        '<div class="rc-avatar' + (photo ? ' has-photo' : '') + '">' + avatar + '</div>' +
        '<div><div class="rc-name">' + escapeHtml(name) + '</div>' +
        '<div class="rc-test">' + escapeHtml(S.title) + '</div></div>' +
      '</div>' +
      '<div class="rc-score-row">' +
        '<div class="rc-ring">' +
          '<svg class="rc-ring-arc" viewBox="0 0 120 120">' +
            '<circle class="rc-r-bg" cx="60" cy="60" r="' + R + '"></circle>' +
            '<circle class="rc-r-fg" cx="60" cy="60" r="' + R + '" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '"></circle>' +
          '</svg>' +
          '<svg class="rc-ring-label" viewBox="0 0 120 120" aria-hidden="true">' +
            '<text x="60" y="71" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="800" style="' + svgFont + '">' + S.pct + '%</text>' +
            '<text x="60" y="88" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-size="9" font-weight="700" style="' + svgFont + '">' + escapeHtml(t("share.score")) + '</text>' +
          '</svg>' +
        '</div>' +
        '<div class="rc-msg">' +
          '<div class="rc-msg-title">' + escapeHtml(t(S.msgKey)) + '</div>' +
          '<div class="rc-msg-sub">' + escapeHtml(S.correct + " " + t("mock.result.correct") + "  •  " + S.wrong + " " + t("mock.result.wrong") + "  •  " + S.skipped + " " + t("mock.result.skipped")) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="rc-stats">' +
        stats.map(function (st) { return '<div class="rc-stat"><b>' + escapeHtml(String(st.v)) + '</b><span>' + escapeHtml(st.l) + '</span></div>'; }).join("") +
      '</div>' +
      '<div class="rc-challenge">' +
        '<div class="rc-challenge-ico">' + svgTrophy() + '</div>' +
        '<div><div class="rc-challenge-title">' + escapeHtml(t("share.challenge")) + '</div>' +
        '<div class="rc-challenge-link">' + escapeHtml(S.url) + '</div></div>' +
      '</div>' +
      '<div class="rc-foot">' +
        '<div class="rc-foot-line">' + escapeHtml(t("share.cardLine1").replace("{p}", String(S.pct)).replace("{t}", S.title).replace("{site}", SHARE_SITE_ORIGIN + "/")) + '</div>' +
        '<div class="rc-foot-line rc-foot-link">' + escapeHtml(S.url) + '</div>' +
      '</div>';

    const holder = document.createElement("div");
    holder.className = "report-card-holder";
    holder.appendChild(card);
    document.body.appendChild(holder);
    try {
      await ensureHtml2canvas();
      if (!window.html2canvas) throw new Error("html2canvas unavailable");
      const canvas = await window.html2canvas(card, { scale: 2, useCORS: true, logging: false, backgroundColor: "#4f46e5" });
      return canvas.toDataURL("image/png");
    } finally {
      holder.remove();
    }
  }

  function triggerDownload(dataUrl, fileName) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function nativeShareFile(file, text) {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: text, title: "axomexam Result" });
        return true;
      } catch (err) {
        if (err && err.name === "AbortError") return true;
      }
    }
    return false;
  }

  async function copyShareLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      toast(t("share.linkCopied"));
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); toast(t("share.linkCopied")); } catch (e2) {}
      ta.remove();
    }
  }

  function openMockShareModal() {
    const S = buildShareSummary();
    if (!S) return;
    const existing = $("#share-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "share-modal";
    modal.className = "read-modal share-modal";
    modal.innerHTML =
      '<div class="read-modal-backdrop"></div>' +
      '<div class="read-modal-box" role="dialog" aria-modal="true">' +
        '<div class="read-modal-head">' +
          '<div class="read-modal-titles">' +
            '<span class="read-modal-title" id="share-modal-title">' + escapeHtml(t("share.title")) + '</span>' +
            '<span class="read-modal-sub" id="share-modal-sub">' + escapeHtml(t("share.subtitle")) + '</span>' +
          '</div>' +
          '<button class="read-close" id="share-close" type="button" aria-label="Close">✕</button>' +
        '</div>' +
        '<div class="read-modal-body" id="share-body">' +
          '<form class="share-form" id="share-form" novalidate>' +
            '<div>' +
              '<label for="share-name">' + escapeHtml(t("share.nameLabel")) + '</label>' +
              '<input type="text" id="share-name" maxlength="40" autocomplete="name" placeholder="' + escapeHtml(t("share.namePlaceholder")) + '" />' +
            '</div>' +
            '<div>' +
              '<label>' + escapeHtml(t("share.photoLabel")) + '</label>' +
              '<div class="share-photo-row">' +
                '<div class="share-photo-preview" id="share-photo-preview">' + svgAvatarPlaceholder() + '</div>' +
                '<div class="share-photo-actions">' +
                  '<label class="share-file-btn" for="share-photo-input">' + svgCamera() + ' ' + escapeHtml(t("share.photoChoose")) + '</label>' +
                  '<input type="file" id="share-photo-input" accept="image/*" hidden />' +
                  '<button type="button" class="share-photo-remove" id="share-photo-remove" hidden>' + escapeHtml(t("share.photoRemove")) + '</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex; gap:10px; margin-top:6px;">' +
              '<button type="button" class="btn btn-outline" id="share-cancel">' + escapeHtml(t("share.cancel")) + '</button>' +
              '<button type="submit" class="btn btn-primary" id="share-generate">' + escapeHtml(t("share.generate")) + '</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    let photoData = "";
    const close = () => modal.remove();
    $("#share-close", modal).addEventListener("click", close);
    $(".read-modal-backdrop", modal).addEventListener("click", close);
    $("#share-cancel", modal).addEventListener("click", close);

    const photoInput = $("#share-photo-input", modal);
    const photoPreview = $("#share-photo-preview", modal);
    const photoRemove = $("#share-photo-remove", modal);
    photoInput.addEventListener("change", () => {
      const file = photoInput.files && photoInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        photoData = String(reader.result || "");
        photoPreview.innerHTML = '<img src="' + photoData + '" alt="" />';
        photoRemove.hidden = false;
      };
      reader.readAsDataURL(file);
    });
    photoRemove.addEventListener("click", () => {
      photoData = "";
      photoInput.value = "";
      photoPreview.innerHTML = svgAvatarPlaceholder();
      photoRemove.hidden = true;
    });

    $("#share-form", modal).addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = $("#share-name", modal);
      const name = (nameInput.value || "").trim();
      if (!name) { toast(t("share.nameRequired")); nameInput.focus(); return; }
      const genBtn = $("#share-generate", modal);
      genBtn.disabled = true;
      genBtn.textContent = t("share.generating");
      let dataUrl = "";
      try {
        dataUrl = await generateReportImage(S, name, photoData);
      } catch (err) {
        console.error("Report card generation failed:", err);
        genBtn.disabled = false;
        genBtn.textContent = t("share.generate");
        toast(t("share.error"));
        return;
      }
      showSharePreview(modal, { S, name, dataUrl });
    });
  }

  function showSharePreview(modal, payload) {
    const S = payload.S;
    const dataUrl = payload.dataUrl;
    const text = shareTextFor(S);
    const fileName = "axomexam-report-" + S.pct + "percent.png";
    const body = $("#share-body", modal);
    if (!body) return;

    const target = (cls, kind, i18nKey, icon) =>
      '<button type="button" class="share-target ' + cls + '" data-share="' + kind + '">' + icon + '<span>' + escapeHtml(t(i18nKey)) + '</span></button>';

    body.innerHTML =
      '<img class="share-preview-img" src="' + dataUrl + '" alt="' + escapeHtml(t("share.previewTitle")) + '" />' +
      '<div class="share-targets">' +
        target("wa", "whatsapp", "share.whatsapp", svgWhatsapp()) +
        target("fb", "facebook", "share.facebook", svgFacebook()) +
        target("tg", "telegram", "share.telegram", svgTelegram()) +
        target("tw", "twitter", "share.twitter", svgTwitter()) +
        target("more", "more", "share.more", svgMoreApps()) +
        target("dl", "dl", "share.download", svgDownload()) +
        target("copy", "copy", "share.copy", svgCopy()) +
      '</div>' +
      '<button type="button" class="btn btn-outline" id="share-back" style="width:100%;">← ' + escapeHtml(t("share.back")) + '</button>';

    const titleEl = $("#share-modal-title", modal);
    if (titleEl) titleEl.textContent = t("share.previewTitle");
    const subEl = $("#share-modal-sub", modal);
    if (subEl) subEl.textContent = t("share.shareNow");

    const blob = dataUrlToBlob(dataUrl);
    let file = blob;
    try { file = new File([blob], fileName, { type: "image/png" }); } catch (e) { file = blob; }
    const canFiles = !!(navigator.canShare && navigator.canShare({ files: [file] }));

    $("#share-back", modal).addEventListener("click", () => {
      modal.remove();
      openMockShareModal();
    });

    $$("[data-share]", modal).forEach((btn) => {
      btn.addEventListener("click", async () => {
        const kind = btn.dataset.share;
        const enc = encodeURIComponent;
        if (kind === "whatsapp") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://wa.me/?text=" + enc(text), "_blank");
        } else if (kind === "facebook") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + enc(S.url) + "&quote=" + enc(text), "_blank");
        } else if (kind === "telegram") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://t.me/share/url?url=" + enc(S.url) + "&text=" + enc(text), "_blank");
        } else if (kind === "twitter") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://twitter.com/intent/tweet?url=" + enc(S.url) + "&text=" + enc(text), "_blank");
        } else if (kind === "more") {
          if (canFiles) { if (await nativeShareFile(file, text)) return; }
          triggerDownload(dataUrl, fileName);
          await copyShareLink(text);
        } else if (kind === "dl") {
          triggerDownload(dataUrl, fileName);
          toast(t("share.downloaded"));
        } else if (kind === "copy") {
          await copyShareLink(text);
        }
      });
    });
  }

  /* ================= Extra trending topics ================= */
  function registerExtraTrending(extras) {
    const extraCat = {
      id: "trending",
      name: { en: "Trending", as: "জনপ্ৰিয়" },
      color: "#f97316",
      icon: "↗",
    };
    extras.forEach((tp) => {
      if (!tp || !tp.id) return;
      const path = `trending/${tp.id}`;
      const rec = {
        path,
        cat: extraCat,
        sub: null,
        section: null,
        topic: tp,
        title: tp.title || tp.name,
        desc: tp.description,
        tags: tp.tags || [],
        nQuestions: (tp.questions || []).length,
        pdf: tp.pdf || null,
        popularity: Number(tp.popularity) || 0,
        extra: true,
      };
      state.topicMap[path] = rec;
      state.topicIndex.push(rec);
    });
  }

  /* ================= Content Language Switch (URL-driven) ================= */
  /* The in-page language buttons (topic / articles / e-books / exams /
     current-affairs) reload into the counterpart URL, so each language gets
     its own addressable page. The universal header toggle (data-glang) is
     deliberately excluded here - it keeps its instant, no-reload UI behaviour
     and only ever changes the interface language. */
  function initContentLangSwitch() {
    const SEL = "[data-lang],[data-ebklang],[data-exlang],[data-calang]";
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(SEL);
      if (!btn || btn.tagName !== "BUTTON") return;
      const want =
        btn.getAttribute("data-lang") ||
        btn.getAttribute("data-ebklang") ||
        btn.getAttribute("data-exlang") ||
        btn.getAttribute("data-calang");
      if (want !== "en" && want !== "as") return;
      const onAs = isAssamesePath();
      if ((want === "as" && onAs) || (want === "en" && !onAs)) return;
      /* Only reload when this page actually has a counterpart in that
         language. Pages without one keep their original in-place switch, so
         a partial /as/ rollout never sends a visitor to a 404. */
      if (!document.querySelector(`link[rel="alternate"][hreflang="${want}"]`)) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.href = counterpartUrl() + window.location.search + window.location.hash;
    }, true);
  }

  /* ================= Global Link Handler ================= */
  function bindLinkInterception() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("/topic/")) return;
      if (href.startsWith("#")) {
        /* In-page anchor: scroll without writing the fragment into the URL,
           so visitors (and shared links) never see /mock-test#subjects. */
        const id = href.slice(1);
        if (id) {
          e.preventDefault();
          scrollToId(id, true);
        }
        return;
      }
      if (href.startsWith("/") && !href.startsWith("//") && !a.hasAttribute("download") && a.target !== "_blank") {
        e.preventDefault();
        const hashAt = href.indexOf("#");
        if (hashAt > -1) {
          const path = href.slice(0, hashAt);
          const id = href.slice(hashAt + 1);
          const current = window.location.pathname.replace(/\/index\.html$/, "");
          if (path === current || path === current + "/" || path.replace(/\/$/, "") === current.replace(/\/$/, "")) {
            scrollToId(id, true);
            return;
          }
          navigateTo(path);
          setTimeout(() => scrollToId(id, true), 0);
          return;
        }
        navigateTo(href);
      }
    });
  }

  /* ================= Boot ================= */
  async function boot() {
    const pre = $("#preloader");
    /* Content language comes from the URL, so set it before the first paint
       to avoid a flash of the wrong language. UI language is restored from
       localStorage (or defaults to English) and never forced by the URL. */
    state.lang = isAssamesePath() ? "as" : "en";
    
    try {
      const savedUiLang = localStorage.getItem("axomexam-ui-lang");
      if (savedUiLang) state.uiLang = savedUiLang;
      else state.uiLang = "en";
    } catch (e) {
      state.uiLang = "en";
    }

    document.body.setAttribute("data-lang", state.lang);
    document.body.setAttribute("data-ui-lang", state.uiLang);
    applyStaticI18n();
    initNotifications();
    initAppPrompt();
    initWhatsappChat();

    /* Fetch boot data in parallel (was sequential) to shorten time-to-render. */
    const [categoriesData, countsData, trendingData] = await Promise.all([
      API.getCategories().catch((err) => {
        console.error("Failed to load categories:", err);
        return null;
      }),
      API.getCounts().catch(() => null),
      API.getTrendingTopics().catch((err) => {
        console.error("Failed to load extra trending topics:", err);
        return null;
      }),
    ]);

    if (categoriesData) Object.assign(state, normalize(categoriesData));
    if (countsData) applyPrecomputedCounts(countsData);
    if (trendingData) registerExtraTrending(trendingData);

    if (state.categories.length) {
      state.ready = true;
      buildDesktopNav();
      buildMobileNav();
      bindSearch();
      initGlobalLangToggle();
      initContentLangSwitch();
      bindLinkInterception();

      window.addEventListener("popstate", () => {
        if (handleMockBackGuard()) return;
        buildDesktopNav();
        buildMobileNav();
        renderRoute();
      });

      renderRoute();

      /* Counts are taken from data/counts.json (applyPrecomputedCounts),
         so no per-topic downloads happen during boot. */
      updateHeroTotals();

      /* Inside the Android shell, keep its injected promo banner in step with
         the live counts (the banner's own numbers are baked into the APK). */
      watchAppBanner();

    } else {
      $("#app").innerHTML = `<div class="loader"><p>${t("load.error")}</p></div>`;
    }

    if (pre) setTimeout(() => pre.classList.add("done"), 350);
  }

  /* ================= Expandable "Read More" Page Description ================= */
  function enhancePageDesc() {
    const app = $("#app");
    if (!app) return;

    const READ_MORE = (typeof I18N !== "undefined" && I18N.en && I18N.en["desc.readMore"]) || "Read More";
    const READ_LESS = (typeof I18N !== "undefined" && I18N.en && I18N.en["desc.readLess"]) || "Show Less";

    app.querySelectorAll(".page-desc").forEach((el) => {
      if (el.dataset.enhanced === "1") return;
      el.dataset.enhanced = "1";

      const raw = el.textContent || "";
      if (!raw.includes("\n")) return;

      const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
      let html = "";
      let inList = false;
      lines.forEach((line) => {
        const m = line.match(/^[•\-*]\s*(.*)$/);
        if (m) {
          if (!inList) { html += "<ul>"; inList = true; }
          html += "<li>" + escapeHtml(m[1]) + "</li>";
        } else {
          if (inList) { html += "</ul>"; inList = false; }
          html += "<p>" + escapeHtml(line) + "</p>";
        }
      });
      if (inList) html += "</ul>";

      const wrapper = document.createElement("div");
      wrapper.className = "page-desc desc-expandable";
      wrapper.dataset.enhanced = "1";
      wrapper.innerHTML = '<div class="desc-inner">' + html + "</div>";
      el.replaceWith(wrapper);

      const inner = wrapper.querySelector(".desc-inner");
      const lineH = parseFloat(getComputedStyle(inner).lineHeight) || 24;
      const collapsedMax = Math.round(lineH * 3.2);
      if (inner.scrollHeight <= collapsedMax) return;

      inner.style.setProperty("--desc-max", collapsedMax + "px");
      wrapper.classList.add("is-collapsed");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "desc-toggle";
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = READ_MORE +
        '<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
      btn.addEventListener("click", () => {
        const collapsed = wrapper.classList.toggle("is-collapsed");
        inner.style.maxHeight = "";
        btn.innerHTML = (collapsed ? READ_MORE : READ_LESS) +
          '<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
        btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
      });
      wrapper.appendChild(btn);
    });
  }

  function initDescEnhancer() {
    const app = $("#app");
    if (!app) return;
    enhancePageDesc();
    const mo = new MutationObserver(() => enhancePageDesc());
    mo.observe(app, { childList: true, subtree: true });
  }

  function bindHamburger() {
    const burger = $("#hamburger");
    if (!burger) return;
    burger.addEventListener("click", () => {
      const menu = $("#mobile-menu");
      if (menu && menu.classList.contains("open")) closeMobileMenu();
      else openMobileMenu();
    });
    const mb = $("#mobile-backdrop");
    if (mb) mb.addEventListener("click", closeMobileMenu);
    const mc = $("#mobile-close");
    if (mc) mc.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeMobileMenu(); const sr = $("#search-results"); if (sr) sr.hidden = true; }
    });
  }

  function updateTabbar(segs) {
    const tabs = $$("#tabbar .tab-item");
    let active = "home";
    if (segs[0] === "mock-test" || segs[0] === "exam-wise-mock-test") active = "mock";
    else if (segs[0] === "categories" || segs[0] === "category" || segs[0] === "topic") active = "categories";
    else if (segs[0] === "exams") active = "exams";
    else if (segs[0] === "search") active = "search";
    else if (segs[0] && segs[0] !== "") active = "";
    tabs.forEach((el) => el.classList.toggle("active", el.dataset.tab === active));
  }

  function bindTabbar() {
    const tm = $("#tab-menu");
    if (tm) tm.addEventListener("click", () => openMobileMenu());
  }

  /* ================= Enhanced Dark Mode Toggle ================= */
  function updateThemeIcons(theme) {
    const isDark = theme === "dark";
    const iconHtml = isDark ? `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="12" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ` : `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    $$(".theme-toggle").forEach((btn) => {
      btn.innerHTML = iconHtml;
    });
  }

  /* ================= Header notifications =================
     A bell button sits directly after the dark-mode toggle in the header
     (desktop bar and mobile top bar share the same .header-center, so one
     insertion point covers both). The list is short and curated, so it is
     rendered from this array; the labels follow the universal (interface)
     language toggle through applyStaticI18n(). */
  const NOTIFICATIONS = [
    {
      title: { en: "Exam-wise free mock tests are live — test now", as: "পৰীক্ষা-ভিত্তিক বিনামূলীয়া মক টেষ্ট উপলব্ধ — এতিয়াই পৰীক্ষা দিয়ক" },
      desc: { en: "Full-paper timed mock tests for Assam Police, ADRE Grade III & IV and DHS & DME, with bilingual questions and instant scoring.", as: "অসম আৰক্ষী, ADRE তৃতীয় আৰু চতুৰ্থ শ্ৰেণী আৰু DHS আৰু DME-ৰ বাবে সম্পূৰ্ণ প্ৰশ্নকাকতৰ সময়বদ্ধ মক টেষ্ট, দ্বিভাষিক প্ৰশ্ন আৰু তৎক্ষণাত ফলাফলসহ।" },
      href: "/exam-wise-mock-test/",
    },
    {
      title: { en: "New app version 2.6 available — update now", as: "এপৰ নতুন সংস্কৰণ 2.6 উপলব্ধ — এতিয়াই আপডেট কৰক" },
      desc: { en: "Floating bottom bar, blue footer, faster loading and bug fixes. Tap to download the latest APK.", as: "ফ্ল'টিং তলৰ বাৰ, নীলা ফুটাৰ, দ্ৰুত লোডিং আৰু বাগ ফিক্স। শেহতীয়া APK ডাউনল'ড কৰিবলৈ টিপক।" },
      href: "/download-app/",
    },
    {
      title: { en: "ADRE 3.0 Grade III exam book is live", as: "ADRE 3.0 তৃতীয় শ্ৰেণীৰ পৰীক্ষা-বহী উপলব্ধ" },
      desc: { en: "Complete syllabus, chapter notes and bilingual practice sets.", as: "সম্পূৰ্ণ পাঠ্যক্ৰম, অধ্যায় টোকা আৰু দ্বিভাষিক অনুশীলন সংহতি।" },
      href: "/exams/adre-grade-3/",
    },
    {
      title: { en: "ADRE 3.0 Grade IV exam book is live", as: "ADRE 3.0 চতুৰ্থ শ্ৰেণীৰ পৰীক্ষা-বহী উপলব্ধ" },
      desc: { en: "Subject-wise questions with answers and explanations.", as: "উত্তৰ আৰু ব্যাখ্যাৰ সৈতে বিষয়ভিত্তিক প্ৰশ্ন।" },
      href: "/exams/adre-grade-4/",
    },
    {
      title: { en: "Assam Police exam book is live", as: "অসম আৰক্ষী পৰীক্ষা-বহী উপলব্ধ" },
      desc: { en: "Constable (AB & UB) syllabus, notes and practice sets.", as: "কনিষ্টবল (AB আৰু UB) পাঠ্যক্ৰম, টোকা আৰু অনুশীলন সংহতি।" },
      href: "/exams/assam-police/",
    },
  ];

  const NOTIF_STRINGS = {
    label: { en: "Notifications", as: "জাননী" },
    count: { en: (n) => `${n} new`, as: (n) => `${n} টা নতুন` },
    allRead: { en: "You're all caught up", as: "সকলো পঢ়া হৈছে" },
    markAll: { en: "Mark all read", as: "সকলো পঢ়া বুলি চিহ্নিত কৰক" },
    foot: { en: "Tap a notification to open it", as: "খুলিবলৈ এটা জাননীত টিপক" },
  };

  /* Read state is per-browser, keyed by href so it survives a reorder. */
  const NOTIF_READ_KEY = "axomexam-notif-read";
  let notifRead = null;

  function notifReadSet() {
    if (notifRead) return notifRead;
    try {
      const raw = JSON.parse(localStorage.getItem(NOTIF_READ_KEY) || "[]");
      notifRead = new Set(Array.isArray(raw) ? raw : []);
    } catch (e) {
      notifRead = new Set();
    }
    return notifRead;
  }

  function notifSaveRead() {
    try { localStorage.setItem(NOTIF_READ_KEY, JSON.stringify([...notifReadSet()])); } catch (e) {}
  }

  function notifUnreadCount() {
    const read = notifReadSet();
    return NOTIFICATIONS.filter((n) => !read.has(n.href)).length;
  }

  function notifMarkRead(href) {
    const read = notifReadSet();
    if (read.has(href)) return false;
    read.add(href);
    notifSaveRead();
    renderNotifications();
    return true;
  }

  function notifMarkAllRead() {
    const read = notifReadSet();
    let changed = false;
    NOTIFICATIONS.forEach((n) => { if (!read.has(n.href)) { read.add(n.href); changed = true; } });
    if (changed) { notifSaveRead(); renderNotifications(); }
  }

  function notifString(key) {
    const l = state.uiLang || "en";
    const entry = NOTIF_STRINGS[key];
    if (!entry) return "";
    const v = entry[l] || entry.en;
    return typeof v === "function" ? v(notifUnreadCount()) : v;
  }

  function notificationText(obj) {
    const l = state.uiLang || "en";
    return (obj && (obj[l] || obj.en)) || "";
  }

  function renderNotifications() {
    const list = document.getElementById("notif-list");
    if (!list) return;

    const label = notifString("label");
    const toggle = document.getElementById("notif-toggle");
    if (toggle) {
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
    }

    const read = notifReadSet();
    const unread = notifUnreadCount();

    const badge = document.getElementById("notif-badge");
    if (badge) {
      badge.textContent = String(unread);
      badge.hidden = unread === 0;
    }

    const count = document.getElementById("notif-count");
    if (count) count.textContent = unread ? notifString("count") : notifString("allRead");

    const markAll = document.getElementById("notif-mark-all");
    if (markAll) {
      markAll.textContent = notifString("markAll");
      markAll.hidden = unread === 0;
    }

    const head = document.getElementById("notif-head-title");
    if (head) head.textContent = label;
    const foot = document.getElementById("notif-foot");
    if (foot) foot.textContent = notifString("foot");

    list.innerHTML = NOTIFICATIONS.map((n, i) => `
      <a class="notif-item${read.has(n.href) ? " is-read" : ""}" href="${n.href}" data-href="${n.href}">
        <span class="notif-num">${i + 1}</span>
        <span class="notif-body"><b>${escapeHtml(notificationText(n.title))}</b><span>${escapeHtml(notificationText(n.desc))}</span></span>
      </a>`).join("");
  }

  function initNotifications() {
    const themeBtn = document.querySelector(".header-center .theme-toggle");
    if (!themeBtn || document.getElementById("notif-wrap")) return;

    const wrap = document.createElement("div");
    wrap.className = "notif-wrap";
    wrap.id = "notif-wrap";
    wrap.innerHTML = `
      <button class="notif-toggle" id="notif-toggle" type="button" aria-expanded="false" aria-controls="notif-panel" aria-haspopup="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span class="notif-badge" id="notif-badge"></span>
      </button>
      <div class="notif-panel" id="notif-panel" hidden>
        <div class="notif-head">
          <b id="notif-head-title"></b>
          <span class="notif-head-right">
            <button class="notif-mark-all" id="notif-mark-all" type="button"></button>
            <span class="notif-count" id="notif-count"></span>
          </span>
        </div>
        <div class="notif-list" id="notif-list"></div>
        <div class="notif-foot" id="notif-foot"></div>
      </div>`;
    themeBtn.insertAdjacentElement("afterend", wrap);

    const toggle = wrap.querySelector("#notif-toggle");
    const panel = wrap.querySelector("#notif-panel");
    const list = wrap.querySelector("#notif-list");
    const markAll = wrap.querySelector("#notif-mark-all");

    const close = () => {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (panel.hidden) open(); else close();
    });

    /* Mark the tapped item read, then let the link navigate as usual. */
    list.addEventListener("click", (e) => {
      const item = e.target.closest(".notif-item");
      if (!item) return;
      if (item.dataset.href) notifMarkRead(item.dataset.href);
      close();
    });

    markAll.addEventListener("click", (e) => {
      e.stopPropagation();
      notifMarkAllRead();
    });

    document.addEventListener("click", (e) => {
      if (panel.hidden) return;
      if (!wrap.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) close();
    });

    /* The panel lives in the header (outside #app), so nothing tears it down
       when the SPA swaps the page; close it on history navigation too. */
    window.addEventListener("popstate", close);

    renderNotifications();
  }

  /* ================= Mobile App Download Prompt ================= */
  const APP_PROMPT_DONE_KEY = "axomexam-app-prompt-done";
  let appPromptDismissed = false;

  function appPromptDone() {
    try { return localStorage.getItem(APP_PROMPT_DONE_KEY) === "1"; } catch (e) { return false; }
  }

  function dismissAppPrompt() {
    appPromptDismissed = true;
    const el = document.getElementById("app-prompt");
    if (!el) return;
    el.classList.remove("show");
    window.setTimeout(() => { if (el) el.hidden = true; }, 300);
  }

  function markAppPromptDone() {
    try { localStorage.setItem(APP_PROMPT_DONE_KEY, "1"); } catch (e) { }
    dismissAppPrompt();
  }

  /* The axomexam Android app is a WebView wrapper, so the promo popup must
     never appear inside it. Detect the app via a JS bridge (if the app exposes
     one), a custom "axomexam" user-agent, or the standard Android WebView "wv" marker. */
  function isInAxomexamApp() {
    try {
      if (window.axomexamApp || window.__AXOMEXAM_APP__ || window.AxomexamApp) return true;
      const ua = (navigator.userAgent || "").toLowerCase();
      if (ua.indexOf("axomexam") !== -1) return true;
      if (/(^|[;( ])wv([; )]|$)/.test(ua)) return true;
    } catch (e) { }
    return false;
  }

  function initAppPrompt() {
    if (isInAxomexamApp()) return;
    if (window.matchMedia && !window.matchMedia("(max-width: 900px)").matches) return;
    if (appPromptDone()) return;

    const el = document.createElement("div");
    el.id = "app-prompt";
    el.className = "app-prompt";
    el.hidden = true;
    el.innerHTML = `
      <a class="app-prompt-link" href="/download-app">
        <img class="app-prompt-icon" src="/app/axomexam-icon.png" alt="" width="40" height="40" />
        <span class="app-prompt-text">
          <b>${escapeHtml(t("appPrompt.title"))}</b>
          <span>${escapeHtml(t("appPrompt.msg"))}</span>
        </span>
      </a>
      <button class="app-prompt-close" type="button" aria-label="${escapeHtml(t("appPrompt.close"))}" title="${escapeHtml(t("appPrompt.close"))}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>`;
    document.body.appendChild(el);

    el.querySelector(".app-prompt-close").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissAppPrompt();
    });
    el.querySelector(".app-prompt-link").addEventListener("click", () => {
      dismissAppPrompt();
    });

    window.setTimeout(() => {
      if (appPromptDismissed || appPromptDone()) return;
      el.hidden = false;
      el.classList.add("show");
    }, 5000);
  }

  function initTheme() {
    const html = document.documentElement;
    let savedTheme = "light";
    try { savedTheme = localStorage.getItem("axomexam-theme") || "light"; } catch (e) { }

    if (savedTheme === "dark") html.setAttribute("data-theme", "dark");
    else html.removeAttribute("data-theme");
    updateThemeIcons(savedTheme);

    const apply = (theme) => {
      if (theme === "dark") html.setAttribute("data-theme", "dark");
      else html.removeAttribute("data-theme");
      try { localStorage.setItem("axomexam-theme", theme); } catch (e) { }
      updateThemeIcons(theme);
    };

    $$(".theme-toggle").forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", () => {
        const isDark = html.getAttribute("data-theme") === "dark";
        apply(isDark ? "light" : "dark");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindHamburger();
    bindTabbar();
    initTheme();
    initDescEnhancer();
    boot();
  });
})();
