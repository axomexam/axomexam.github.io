# axomexam

A fast, fully responsive, bilingual (English / অসমীয়া) educational website for competitive exam preparation. Students can read **Q&A practice sets** and **download PDF notes** — all content is fetched **dynamically from a GitHub repository** (raw URLs / GitHub API).

Built with plain **HTML + CSS + JavaScript** (no build step, no framework) for maximum speed and simplicity.

## Features

- **Bilingual UI** — one-tap `English | অসমীয়া` switcher in the header (menus, buttons, headings, Q&A and search all switch instantly).
- **Multi-level navigation** — GK ▸ Assam ▸ Geography / Economy / Polity / Panchayat / Art & Culture / History, plus India & World. Every other category (Math, General Science, Reasoning, Current Affairs, Static GK, History) has its own sub-topics.
- **Master Search** — live, debounced search across topic titles, tags and question text in both languages.
- **GitHub-powered content** — categories, Q&A topics load from a public GitHub repo. Ships with bundled sample data as an offline fallback.
- **Q&A reader** — questions from your `topics.json` files are shown directly in serial order with the answer right below each one (`ANSWER: ...`), no multiple-choice clutter. 15 questions per page with a **Next** button, a **Reading Mode** popup (serial Q&A with previous/next page and close), and a one-tap **English ⇄ অসমীয়া** toggle so every question can be read in either language. Fully responsive on mobile and desktop.
- **Mock Tests** — timed mock tests for **every category** (MCQ questions auto-grade; plain Q&A questions switch to self-grading flashcard mode). Includes live timer, progress bar, score ring, full answer review and retry.
- **App-like mobile UI** — dedicated bottom tab bar (Home / Mock Test / Practice / Search / Menu), hamburger accordion menu, safe-area support, 100% viewport fit on phones, tablets and desktops.
- **Animated homepage** — compact hero with live exam countdown ring + floating category chips, category shortcuts, trending topics grid, scroll-reveal animations.
- **Mobile-first** — dedicated hamburger menu with accordions, touch-friendly UI, 100% responsive.

## Quick Start (local preview)

Just serve the folder with any static file server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Connecting your GitHub repository

The site loads all study content from a GitHub repo you control. Open **`js/config.js`** and set:

```js
const CONFIG = {
  USE_REMOTE: true,                    // true = load from GitHub
  OWNER: "your-github-username",       // your GitHub username/org
  REPO: "axomexam-content",            // content repository name
  BRANCH: "main",                      // default branch
};
```

You can also tune mock-test behaviour there:

```js
const CONFIG = {
  MOCK: {
    SECONDS_PER_QUESTION: 30,          // quiz timer per question
    DEFAULT_COUNT: 10,                 // default questions per test (0 = all)
    EXAM_NAME: "APSC CCE Prelims",     // shown in the hero countdown
    EXAM_DATE: "2026-12-31T10:00:00",  // countdown target (ISO date)
  },
};
```

### How to upload questions to GitHub

1. Create a public repository (e.g. `axomexam-content`) on GitHub.
2. Create the folder `data/` and upload your `categories.json` inside it.
3. Create one folder per category inside `content/` — e.g. `content/gk/`, `content/math/`.
4. For every topic, upload one JSON file into its category folder — e.g. `content/gk/brahmaputra-river.json`.
5. Set `OWNER`, `REPO` and `BRANCH` in `js/config.js` to point at your repo.

No API token needed for public repos — content is fetched straight from `raw.githubusercontent.com`.

### Recommended repo layout

```
axomexam-content/
├── data/
│   └── categories.json            # the whole category & navigation tree
└── content/
    ├── gk/
    │   ├── brahmaputra-river.json # one bilingual Q&A topic per file
    │   ├── national-parks.json
    │   └── ...
    ├── math/
    │   └── percentage.json
    └── ...                        # one folder per category id
```

> Public repos need **no API token** — content is fetched via `raw.githubusercontent.com` and the GitHub contents API.

### Adding a category, sub-category or topic (easy)

Adding new study material is a **two-file job**: register the topic in `categories.json`, then upload one question file in the matching folder. You can add as many categories / sub-categories / topics as you want — nothing else in the site needs to change.

**Step 1 — add to `categories.json`.**

You can nest as deep as you like. The simplest shape (category → topics directly):

```json
{
  "categories": [
    {
      "id": "my-category",
      "name": { "en": "My Category", "as": "মোৰ বিষয়" },
      "color": "#10b981",
      "topics": [
        { "id": "my-topic", "name": { "en": "My Topic", "as": "মোৰ বিষয়বস্তু" } }
      ]
    }
  ]
}
```

Need a sub-category? Add `subcategories` (or `sections` if the sub-category has groups):

```json
{
  "id": "my-category",
  "name": { "en": "My Category", "as": "মোৰ বিষয়" },
  "subcategories": [
    {
      "id": "my-sub",
      "name": { "en": "My Sub-category", "as": "উপ-বিষয়" },
      "topics": [
        { "id": "my-topic", "name": { "en": "My Topic", "as": "মোৰ বিষয়বস্তু" } }
      ]
    }
  ]
}
```

Rules to remember:
- `id` must be unique and use lowercase letters / dashes (e.g. `assam-budget`).
- `name` must be `{ "en": "...", "as": "..." }` — the `as` (Assamese) value is optional; English is always shown in menus.
- `color` and `icon` are optional; a default colour/logo is used if you skip them.
- `popularity` (0–10) controls the **Trending Topics** ranking.

**Step 2 — upload the question file** to `content/<category-id>/<topic-id>.json` in your GitHub repo (see schema below).

> The site loads everything from your GitHub repo — after uploading, just refresh the page and the new category / topic appears.

### Data schema

#### `categories.json` — navigation tree

```json
{
  "categories": [
    {
      "id": "gk",
      "name": { "en": "General Knowledge", "as": "সাধাৰণ জ্ঞান" },
      "description": { "en": "...", "as": "..." },
      "color": "#0ea5e9",
      "icon": "GK",
      "subcategories": [
        {
          "id": "assam",
          "name": { "en": "Assam", "as": "অসম" },
          "sections": [
            {
              "id": "geography",
              "name": { "en": "Geography", "as": "ভূগোল" },
              "topics": [
                { "id": "brahmaputra-river",
                  "name": { "en": "Brahmaputra River", "as": "ব্ৰহ্মপুত্ৰ নদী" },
                  "popularity": 9 }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

- Categories may use `subcategories`, `sections`, or plain `topics` (see above).
- `popularity` (0-10) controls the **Trending Topics** ranking. `id` values must be unique within a category.

#### Topic content file — `content/<category>/<topic-id>.json`

```json
{
  "id": "brahmaputra-river",
  "title": { "en": "Brahmaputra River", "as": "ব্ৰহ্মপুত্ৰ নদী" },
  "description": { "en": "...", "as": "..." },
  "tags": ["river", "geography", "নদী"],
  "questions": [
    {
      "q": { "en": "What is the source of the Brahmaputra?", "as": "ব্ৰহ্মপুত্ৰৰ উৎস ক'ত?" },
      "a": { "en": "Angsi Glacier, Tibet.", "as": "আংচি হিমবাহ, তিব্বত।" }
    }
  ]
}
```

- Every text field is bilingual: `{ "en": "...", "as": "..." }`.
- The reader shows your questions **in the order they appear** in the file, 15 per page, with `ANSWER: ...` right below each question (options are only used by mock tests, not the reader). Use the **English ⇄ অসমীয়া** toggle to read either language, and **Reading Mode** for a full-screen popup reader with next/previous page and close buttons.
- `tags` are optional and used by search.

#### MCQ questions (for Mock Tests)

Mock tests use **multiple-choice questions** whenever options are provided, and fall back to a **self-grading flashcard mode** for plain Q&A questions:

```json
{
  "q": { "en": "What is the source of the Brahmaputra?", "as": "ব্ৰহ্মপুত্ৰৰ উৎস ক'ত?" },
  "options": [
    { "en": "Angsi Glacier, Tibet", "as": "আংচি হিমবাহ, তিব্বত" },
    { "en": "Gangotri Glacier", "as": "গংগোত্ৰী হিমবাহ" },
    { "en": "Siachen Glacier", "as": "ছিয়াচেন হিমবাহ" }
  ],
  "correct": 0,
  "a": { "en": "Angsi Glacier, Tibet.", "as": "আংচি হিমবাহ, তিব্বত।" }
}
```

- `options`: array of bilingual choices (2–5 recommended).
- `correct`: zero-based index of the right option.
- `a`: still required — used for the review screen and the Q&A reader.

### Branching and contributing (optional)

- Keep `categories.json` in sync with the files you add under `content/`.
- If a topic file is missing, the site still renders the topic page using the metadata from `categories.json` (graceful fallback).

## Project structure

```
├── index.html            # single page shell
├── css/style.css         # full responsive styling
├── js/config.js          # GitHub repo configuration + palette
├── js/i18n.js            # EN/AS UI string dictionary
├── js/api.js             # GitHub / local data layer
├── js/app.js             # routing, navigation, search, Q&A reader
└── data/sample/          # bundled offline sample content
```

## Customising the UI text

All UI strings live in `js/i18n.js` (the `en` and `as` dictionaries). Add or change any key there.

## Roadmap / ideas

- MCQ quiz mode with instant score
- Offline caching via a Service Worker
- Per-topic `README.md` content support (already stubbed in `api.getTopicMarkdown`)
