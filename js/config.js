/* ============================================================
   axomexam — config.js
   Central configuration. Point CONFIG to your own GitHub repo
   to load live content. See README.md for the full data schema.
   ============================================================ */

const CONFIG = {
  /* --- GitHub content source ---
     Set USE_REMOTE = true and fill in owner / repo / branch to
     load categories + topics + PDFs directly from a GitHub repo.
     Keep USE_REMOTE = false to use the bundled local sample data. */
  USE_REMOTE: false,
  OWNER: "your-github-username",
  REPO: "axomexam-content",
  BRANCH: "main",

  /* GitHub API base. Raw URLs are used for file contents so no
     token is required for public repos. */
  RAW_BASE: "https://raw.githubusercontent.com",
  API_BASE: "https://api.github.com",

  /* Paths inside the content repo */
  PATHS: {
    CATEGORIES: "data/categories.json",
    CONTENT: "content",        // <category>/<topic>.json
    PDF: "pdfs",               // <category>/<file>.pdf
    DOWNLOADS: "download",     // flat folder of PDFs shown on the Downloads page
    TRENDING: "trending-topics", // folder of JSON files for extra trending topics
    PYEAR: "previous-year",    // <exam>/<year>/<file>.pdf for Previous Year Questions
  },

  /* Local fallback bundle (Fixed with Absolute Paths) */
  FALLBACK: {
    CATEGORIES_URL: "/data/sample/categories.json",
    CONTENT_BASE: "/data/sample/content/",
    PDF_BASE: "/data/sample/pdfs/",
    /* Downloads page — flat list of PDFs inside /data/sample/download/ */
    DOWNLOAD_BASE: "/data/sample/download/",
    DOWNLOADS: ["brahmaputra-river.pdf", "country-capital.pdf"],
    /* Extra trending topics — JSON files inside /data/sample/trending-topics/ */
    TRENDING_BASE: "/data/sample/trending-topics/",
    TRENDING: ["assam-gk-special"],
    /* Previous year questions — /data/sample/previous-year/<exam>/<year>/<file>.pdf */
    PYEAR_BASE: "/data/sample/previous-year/",
    PYEAR: {
      ssc: { "2023": ["ssc-cgl-2023.pdf"], "2024": ["ssc-cgl-2024.pdf"] },
      railway: { "2023": ["rrb-2023.pdf"] },
      "guwahati-hc": { "2024": ["ghc-steno-2024.pdf"] },
      "dhs-dme": { "2023": ["dhs-dme-2023.pdf"] },
      "assam-police": { "2022": ["assam-police-ab-2022.pdf"] },
    },
  },

  /* Exams shown under "More ▸ Previous Year Questions".
     Folders for each exam live inside the previous-year folder of your repo:
     previous-year/<id>/<year>/<file>.pdf */
  PYEAR_EXAMS: [
    { id: "ssc", name: { en: "SSC", as: "SSC" }, color: "#ef4444", icon: "SSC" },
    { id: "railway", name: { en: "Railway", as: "ৰে'লৱে" }, color: "#0ea5e9", icon: "Rly" },
    { id: "guwahati-hc", name: { en: "Guwahati High Court", as: "গুৱাহাটী উচ্চ ন্যায়ালয়" }, color: "#8b5cf6", icon: "HC" },
    { id: "dhs-dme", name: { en: "DHS DME", as: "DHS DME" }, color: "#10b981", icon: "DHS" },
    { id: "assam-police", name: { en: "Assam Police", as: "অসম আৰক্ষী" }, color: "#2563eb", icon: "AP" },
    { id: "apsc", name: { en: "APSC", as: "APSC" }, color: "#d97706", icon: "APSC" },
    { id: "apdcl", name: { en: "APDCL", as: "APDCL" }, color: "#059669", icon: "APDCL" },
    { id: "adre", name: { en: "ADRE", as: "ADRE" }, color: "#db2777", icon: "ADRE" },
  ],

  /* How many questions per page in the Q&A reader */
  PER_PAGE: 15,

  /* How many trending topics to show on the homepage */
  TRENDING_COUNT: 8,

  /* Search result limit */
  SEARCH_LIMIT: 20,

  /* Mock test settings */
  MOCK: {
    /* Seconds allowed per question before auto-submit */
    SECONDS_PER_QUESTION: 30,
    /* Default number of questions per mock test (0 = all available) */
    DEFAULT_COUNT: 10,
    /* Optional: fixed exam countdown shown in the hero (ISO date). */
    EXAM_NAME: "APSC CCE Prelims",
    EXAM_DATE: "2026-12-31T10:00:00",
  },
};

/* Colour palette used to tint category cards */
const CATEGORY_COLORS = {
  gk: "#0ea5e9",
  math: "#f59e0b",
  science: "#10b981",
  reasoning: "#8b5cf6",
  "current-affairs": "#ef4444",
  "static-gk": "#64748b",
  history: "#d97706",
  english: "#0d9488",
  computer: "#2563eb",
  trending: "#f97316",
  default: "#4f46e5",
};

/* Fallback text monograms for categories without an SVG logo */
const CATEGORY_ICONS = {
  gk: "GK",
  math: "∑",
  science: "⚛",
  reasoning: "▶",
  "current-affairs": "≟",
  "static-gk": "✒",
  history: "H",
  english: "En",
  computer: "💻",
  trending: "↗",
};

/* Inline SVG logos (24x24, stroke-based) used on category cards */
const CATEGORY_ICON_SVG = {
  gk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',
  math: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6"/><path d="M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/></svg>',
  science: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.4"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)"/></svg>',
  reasoning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>',
  "current-affairs": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/><path d="M8 16h3"/></svg>',
  "static-gk": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M6 18v-8"/><path d="M10 18v-8"/><path d="M14 18v-8"/><path d="M18 18v-8"/><path d="m12 2 9 4H3z"/></svg>',
  english: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg>',
  computer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
  trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
};

/* Topic logo rules (24x24 stroke SVGs) */
const TOPIC_ICON_RULES = [
  [/symbol|emblem|flag|anthem/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V2"/><path d="M5 3c4 0 4 3 8 3s4-3 8-3v10c-4 0-4-3-8-3s-4 3-8 3"/></svg>'],
  [/river|water|flood|wave/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 15c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/></svg>'],
  [/park|forest|wildlife|national/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 6 10h3v4h6v-4h3z"/><path d="M9 14h6v4H9z"/><path d="M12 18v4"/></svg>'],
  [/district|map|states|capital|country|world/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'],
  [/budget|economy|finance|bank|profit|loss|money|tax|tea/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>'],
  [/constitution|rights|preamble|polity|assembly|governor|panchayat|parliament|president|minister|law/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10"/><path d="M9.5 21V10"/><path d="M14.5 21V10"/><path d="M19 21V10"/><path d="M2 10 12 4l10 6z"/></svg>'],
  [/festival|bihu|culture|tradition|handloom|textile|craft|likhat|asom/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h16"/><path d="M5 21 12 3l7 18"/><path d="M8 14h8"/><path d="M8 14v4"/><path d="M16 14v4"/></svg>'],
  [/kingdom|dynasty|ahom|ancient|medieval|modern|sultanate|valley|struggle|freedom|movement|indus|history/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M6 18v-8"/><path d="M10 18v-8"/><path d="M14 18v-8"/><path d="M18 18v-8"/><path d="m12 2 9 4H3z"/></svg>'],
  [/organis|organization|united|international/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>'],
  [/percent|percentage|ratio|average|interest|simplif|equation|algebra|geometry|triangle|area|perimeter/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6"/><path d="M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/></svg>'],
  [/time|work|speed|hour|clock|day|date|calendar/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'],
  [/unit|measure|motion|force|physics/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="20" height="6" rx="1"/><path d="M6 9v3M10 9v3M14 9v3M18 9v3"/></svg>'],
  [/chemical|chemistry|element|atom|symbol/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6l-3.5 8a3 3 0 0 0 3 4h5a3 3 0 0 0 3-4L14 8V2"/><path d="M8 14h8"/></svg>'],
  [/body|biology|human|organ|cell|health/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-9-8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 3.5-9 8-9 8z"/></svg>'],
  [/analogy|series|coding|decoding|reasoning|puzzle/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>'],
  [/news|current|affair|august|award|honour/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/><path d="M8 16h3"/></svg>'],
  [/sport|game|trophy/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/></svg>'],
  [/literature|book|author|writer/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>'],
  [/english|grammar|tense|preposition|synonym|antonym|idiom|phrase|vocabulary|word|spelling|essay/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z"/><path d="M14 6l4 4"/></svg>'],
  [/computer|software|hardware|ms-word|ms-excel|excel|word|spreadsheet|office|internet|network|fundamentals/i, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>'],
];
