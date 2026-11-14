# SEO Audit — axomexam.in

Site: https://axomexam.in (GitHub Pages, static HTML, 995 HTML files, 972 URLs in sitemap)
Audit date: 2026-10-31
Method: full crawl of the repo (all 995 pages parsed for title, meta description,
canonical, robots, H1/H2/H3, word count, images, JSON-LD) + live HTTP checks.

Overall: the technical foundation is genuinely strong (clean robots.txt, valid
sitemap with lastmod, canonical on almost every page, rich JSON-LD, OG/Twitter
tags, alt text on every image, llms.txt for AI engines, fast response). The
weak point is **on-page targeting**: most titles/descriptions do not contain the
keyword a student actually types, and several genuinely different pages compete
for the same query. That is what is capping rankings.

Important clarification (verified from the data, not assumed): the repeated
topics across exams are **not duplicate content**. Each exam variant ships its
own question bank. Measured overlap of actual question text:

| Comparison | Questions each | Shared |
|---|---|---|
| /topic/ percentage vs ADRE Grade IV | 50 vs 54 | 0 |
| ADRE Grade IV vs ADRE Grade III | 54 vs 69 | 0 |
| ADRE Grade IV vs Assam Police | 54 vs 28 | 0 |
| Mock-test set-1 vs set-2 vs set-3 | 25 each | 0 |

Body-text similarity between the variants is only 5-13%. So Google is not
seeing duplication; it is seeing several different pages that target the same
query, with the same H1 and near-identical titles. That is **cannibalisation,
not duplication**, and it is fixed by differentiating intent, not by deleting
pages.

---

## 1. Issue counts (whole site)

| Issue | Pages affected | Severity |
|---|---|---|
| Meta description longer than 160 chars (truncated in Google) | 578 | High |
| Titles longer than 60 chars (truncated in SERP) | 286 | High |
| Generic titles `<Topic> \| axomexam` (no keyword, no exam name) | 526 | High |
| Internal links pointing to noindex redirect stubs | 2039 links | High |
| Titles shorter than 30 chars (under-optimised) | 65 | High |
| Duplicate H1 across different pages | 99 groups | Medium |
| Mock-test pages with templated (near-identical) titles/descriptions | 200 pages / 20 families | Medium |
| Canonical points to a different URL than the page | 21 | Medium |
| Thin content (< 300 words) | 80 (most are intentional stubs) | Medium |
| Missing meta description | 14 | Medium |
| Duplicate title groups | 8 | Medium |
| Duplicate description groups | 8 | Medium |
| noindex pages | 23 (mostly intentional) | Low |
| Missing H1 | 15 (all noindex stubs) | Low |
| Missing canonical | 1 (404.html) | Low |
| No JSON-LD | 2 (404, 1 stub) | Low |
| Images without alt | 0 | — |

Word-count spread: 737 pages over 1000 words, 119 pages 300-599, 56 pages
100-299, 24 pages under 100. Content depth on real pages is good.

---

## 1b. Priority 0 — Content that has no page at all (why some keywords cannot rank)

This is the single biggest reason a keyword the site "has content for" does not
rank: **the content exists in the data but no page renders it.**

- `data/content/**/*.json` holds 335 topic banks, **20,891 questions** total.
- Only 320 topic pages are committed.
- 17 content files have **no matching page anywhere**, and their question text
  is not present in any committed HTML:

| Content file | Questions | Page? |
|---|---|---|
| data/content/gk/ancient-assam.json | 300 | none |
| data/content/gk/medieval-assam.json | 300 | none |
| data/content/gk/ancient-india.json | 350 | none |
| data/content/gk/medieval-india.json | 350 | none |
| data/content/gk/modern-assam.json | 300 | none |
| data/content/gk/solar-system.json | 100 | none |
| data/content/gk/national-parks.json | 60 | none (1 Q appears elsewhere) |
| data/content/gk/brahmaputra-river.json | 50 | none |
| data/content/articles/*.json (6 files) | 108 | none |
| data/content/science/human-body.json | 5 | none |
| data/content/history/freedom-struggle.json | 4 | none |
| data/content/gk/bihu-festival.json | 4 | none |
| **Total invisible** | **~1,931** | |

Example: `solar-system.json` has 100 questions, and the phrase "study of the
Universe" appears in **0** HTML files. A student searching "solar system
questions" cannot find the site, because Google has never seen that page.

Fix: render these 17 banks into pages (the repo already has
`tools/prerender.js`), add them to the sitemap, and link them from the relevant
category pages. This alone opens ~1,900 questions to search.

Verified good: 758 pages already ship their questions in **static HTML**, so
Google can read them without running JavaScript. The questions are not
JS-hidden.

---

## 1c. Priority 0 — Pages have no body text, so they cannot rank for topic keywords

Questions render statically, but the pages carry almost no explanatory prose
and almost no heading structure:

| Page type | Non-question words | H2 count |
|---|---|---|
| /topic/math/arithmetic/percentage/ | ~143 | 1 ("50 Questions with Answers") |
| /exams/adre-grade-4/.../percentage/ | ~118 | 1 |
| /mock-test/.../set-1/ | ~103 | 1 |

A page whose only heading is "50 Questions with Answers" gives Google no
signal about the topic, no subtopics, and no text to match a query like
"percentage tricks" or "how to solve percentage questions".

Fix: add a short real intro (150-250 words) plus 3-5 H2 sections per page,
e.g. for Percentage: `What is Percentage`, `Percentage Formulas`, `Shortcut
Tricks`, `Solved Examples`, `FAQs`. The data already exists in the banks; it
just needs prose around it.

---

## 2. Priority 1 — Titles and meta descriptions (biggest ranking lever)

### 2a. Titles with no keyword and no exam context (665 pages)

**665 of 995 titles mention no exam at all** (`ADRE`, `APSC`, `Assam Police`,
`SSC`, `Railway`, `DHS`, `DME`, `Grade`) — Google has nothing to match against
an exam-qualified query. Of those, 243 are a bare `<Topic> | axomexam` with no
keyword either. Most topic and mock-test pages carry a bare
`<Topic> | axomexam` title with no keyword and no exam context. Google has
nothing to match against a query.

Examples found:

| Page | Current title | Problem |
|---|---|---|
| /topic/math/arithmetic/percentage/ | `Percentage \| axomexam` | 18 chars, no exam, no intent |
| /topic/reasoning/verbal-reasoning/analogy/ | `Analogy \| axomexam` | 18 chars |
| /topic/english/grammar-vocab/tenses/ | `Tenses \| axomexam` | duplicate of another page |
| /exams/ | `Your Exams \| axomexam` | hub page with a placeholder title |
| /category/articles/math/ | `Mathematics \| axomexam` | 22 chars |

The page content is already good (e.g. /topic/math/arithmetic/percentage/ has
3,573 words, 50 solved questions, 3 H2s, full JSON-LD). Only the title and
description are letting it down.

**Fix pattern per template**

Topic leaf:
- Before: `Percentage | axomexam`
- After: `Percentage Questions with Answers — ADRE, APSC & Assam Police` (59)

Mock-test set:
- Before: `Non-Verbal Reasoning Mock Test Set 1 | axomexam`
- After: `Non-Verbal Reasoning Mock Test Set 1 (Free, 25 Qs) — ADRE & APSC` (63)
  (or keep 47-char form but add one exam word)

Exam leaf:
- Before: `Percentage — General Mathematics — ADRE 3.0 Grade IV | axomexam` (63)
- After: `Percentage MCQs — ADRE 3.0 Grade IV General Mathematics` (56)

Hub pages:
- `/exams/` → `Assam Exam Question Banks — ADRE, APSC, Assam Police, SSC`
- `/about/` → `About axomexam — Free Bilingual Assam Exam Prep Platform`
- `/contact/` → `Contact axomexam — Support, Corrections & Feedback`

Rule: primary keyword first, one exam name, brand optional at the end, 50-60 chars.

### 2b. Titles over 60 chars (286 pages)

Almost all are exam pages ending with `(Bilingual English & Assamese)`. That
phrase eats the pixel budget and Google cuts it off. Drop it from the title
(keep the bilingual signal in the H1 and the description).

- Before: `Chemistry - Environmental Chemistry Question Bank (250 Questions, Bilingual English & Assamese) | axomexam` (110)
- After: `Environmental Chemistry Question Bank — 250 Solved Qs | axomexam` (64)

### 2c. Meta descriptions over 160 chars (578 pages)

- Before (173 chars): `Practice Networking & Internet questions with answers in English and Assamese. Relevant for ADRE, APSC, Assam Police, DHS, DME, SSC and Railway exams.`
- After (152 chars): `Practice Networking & Internet questions with answers and explanations for ADRE, APSC and Assam Police. Free, bilingual, no sign-up.`

Keep one keyword, one exam list, one CTA, under 160 characters. Also fix the 14
missing descriptions and the 7 under 70 chars (mostly the noindex stubs, low
priority).

---

## 3. Priority 1 — 2,039 internal links point to noindex stubs

There are 15 legacy redirect stub pages, for example
`/exams/assam-police/logical-reasoning/blood-relations/` which is
`noindex` and meta-refreshes to
`/exams/assam-police/logical-reasoning/verbal-reasoning/blood-relations/`.

The stubs themselves are handled correctly (canonical + noindex). The problem:
**2,039 internal links across the site still point at the stub URLs instead of
the final URL.** Google follows each link, lands on a noindex page, and the
link equity is wasted. It also slows crawling.

Fix: run the existing `tools/fix-stale-category-links.js` pattern across the
site so every internal link and every nav item points to the canonical final
URL, not the stub. Verify with a link check after.

---

## 4. Priority 2 — Keyword cannibalisation across URL sections (NOT duplication)

The same topic exists under several URL patterns, and the pages are genuinely
different content (0 shared questions, see the table above). So this is a
targeting problem, not a duplication problem:

- `/topic/math/arithmetic/percentage/` (concept + mixed-exam bank, 50 Qs)
- `/category/math/arithmetic/percentage/` (listing/navigation)
- `/exams/adre-grade-4/elementary-mathematics/percentage/` (54 Qs, ADRE IV)
- `/exams/adre-grade-3/elementary-mathematics/percentage/` (69 Qs, ADRE III)
- `/exams/assam-police/elementary-mathematics/percentage/` (28 Qs, Police)

The problem is that all of them share the **same H1 (`Percentage`)** and
near-identical titles. Google has to choose one page for `percentage questions`
and may split signals between them.

99 H1 values are reused across pages, e.g. `Parts of Speech` on 5 pages,
`Percentage` / `Average` / `Number System` on 4 each.

Fix: keep every page (the content is unique and useful), but make the intent
distinct in H1 and title, and cross-link them with descriptive anchors.
- /topic/ page: concept-first, all-exam angle.
  Title: `Percentage Questions with Answers — ADRE, APSC & Assam Police`
  H1: `Percentage: Concepts, Tricks & Solved Questions`
- /exams/adre-grade-4/...: exam-first.
  Title: `Percentage MCQs — ADRE 3.0 Grade IV General Mathematics`
  H1: `Percentage Questions for ADRE 3.0 Grade IV`
- /exams/assam-police/...: exam-first.
  Title: `Percentage MCQs — Assam Police Constable (AB & UB)`
  H1: `Percentage Questions for Assam Police`

This is the preferred route. Do **not** consolidate or noindex these pages; the
question banks are unique and each one can rank for its own exam-qualified query.

---

## 5. Priority 2 — 200 mock-test pages are unique but look templated

20 families, 200 pages. Verified: the question sets are **different** (set-1
vs set-2 vs set-3 share 0 of 25 questions). So these are not duplicates either.

The issue is presentation. Title is `X Mock Test Set N` and the meta
description is identical except the number, so Google sees 10 near-identical
templates per topic and often keeps only one indexed ("Crawled - currently not
indexed" for the rest).

Fix: keep all sets, make each one legible as its own resource:
- Add the exam(s) the set targets and a difficulty note in title/description.
- Add unique H2s (e.g. "Topics covered in Set 1").
- Cross-link sets to each other and to the parent mock-test topic page so they
  form a series Google can crawl through.
- Do not canonical the sets to the parent; they are distinct question sets and
  can each rank for `non-verbal reasoning mock test set N`.

---

## 6. Priority 2 — Canonical and sitemap hygiene

21 pages declare a canonical that points to a different URL. Fifteen are the
redirect stubs (fine). The rest need review to confirm the target is intended
and indexable (it is):

| Page | Canonical points to |
|---|---|
| /privacy-policy/ | /privacy/ |
| /topic/english/grammar-vocab/tenses/ | /topic/english/grammar/tenses/ |
| /category/computer/networking-internet/ | /topic/computer/networking-internet/ |
| /category/computer/ms-office-suite/ | /topic/computer/ms-office-suite/ |
| ... 6 category/computer/* pages | matching /topic/computer/* page |

The sitemap itself is clean: all 972 URLs match a page canonical, no noindex
URL is listed, lastmod is present on every entry. One gap: the redirect stubs
use meta-refresh + JS instead of an HTTP 301. GitHub Pages cannot issue 301s,
so this is a platform limit, but it means Google treats them as soft-404s.
Moving to Cloudflare Pages (the repo already ships `_headers` and `_redirects`
for it) would let you serve real 301s.

---

## 7. Priority 3 — Thin and placeholder pages

80 pages are under 300 words. Most are the noindex stubs, which is fine. Real
pages worth fixing:

- /ebooks/ (132 words) — add intro copy and a short description per e-book
- /downloads/ (164 words)
- /search/ (73 words, noindex, fine)
- /404.html (0 words)

Also: 9 e-book pages share the same H1
`axomexam - Assam Competitive Exam Preparation Portal`. Give each e-book its own
H1 (e.g. `Indian Economy E-Book — Free PDF for ADRE & APSC`).

---

## 8. What is already good (do not change)

- robots.txt: complete, AI crawlers explicitly allowed, sitemap declared.
- sitemap.xml: valid, 972 URLs, lastmod on every entry.
- Canonical tags: present on 994/995 pages.
- JSON-LD: BreadcrumbList (991), WebPage (921), FAQPage (890),
  LearningResource (550), Quiz (513) — very strong.
- Open Graph and Twitter cards: complete on content pages.
- Image alt text: 100% coverage.
- llms.txt and llms-full.txt: present, good for AI/answer engines.
- Performance: homepage responds in ~0.16s; fonts preloaded; CSS versioned;
  CLS reserved space for ads.
- Language model: correct by design (no hreflang, bilingual on one URL).

---

## 9. Suggested order of work

1. Bulk-fix the 286 over-length titles and 578 over-length descriptions
   (template rules above). Biggest, fastest win.
2. Give the 200 topic/exam/mock pages keyword-bearing titles (remove the bare
   `<Topic> | axomexam` pattern).
3. Repoint the 2,039 internal links off the noindex stubs to the final URLs.
4. Differentiate H1 + intent across /topic/, /category/, /exams/ for the 99
   duplicated H1 topics.
5. Give the 200 mock-test set pages distinct titles/descriptions and cross-links (keep all of them; the question sets are unique).
6. Fix the 14 missing descriptions and the e-book H1s.
7. Move to Cloudflare Pages for real 301 redirects (optional, higher effort).

## 10. Keyword strategy — what to target on every page

A per-page keyword map is generated in `keyword-map.csv`. For each of the 995
pages it gives: primary keyword, secondary keywords, long-tail keywords,
content terms, and a suggested title / meta description / H1 / H2 structure.

**Every page's keywords come from that page's own content, not a site-wide
template.** Two layers are combined:

- **Layer A — topic/intent** from the page's slug + exam context. This gives
  the primary keyword and the title pattern. It is what makes
  `topic/.../percentage/` and `topic/.../profit-and-loss/` target different
  primary keywords.
- **Layer B — distinctive content terms** mined from THAT page's own question
  stems with TF-IDF. Terms that are unique to the page rise to the top
  ("cost price", "selling price" on the profit-and-loss page; "convex lens",
  "refractive index" on the optics page). These become the secondary keywords
  and the extra H2 sections.

**Curated tags win over mining.** 238 topic JSON files already carry a
hand-written bilingual `tags` array (e.g. percentage.json has
`["percentage","percent","increase-decrease","discount","math","assam-exam","শতাংশ"]`).
Where a page has curated tags, those are used as the secondary keywords instead
of the mined terms, because a human chose them for that topic. Mined terms fill
in only the 752 pages without curated tags.

Only question stems and headings are mined (not options or explanations), so
the extracted terms describe the page's actual subject. A quality gate drops
noise words ("therefore", "step", "convert"), digit fragments ("250 questions"),
leading articles and weak phrase endings.

Why this matters: giving every page the same keyword set would recreate the
cannibalisation problem from section 6. Layer B is what keeps each page's
keyword set genuinely different.

Result: across all 995 pages there is **1 duplicate primary keyword** and
**1 duplicate suggested title** — and that single pair is `privacy/` vs
`privacy-policy/`, two copies of the same legal page that should be one page
with a redirect. Every content page owns a distinct keyword and title.

Search volume and live rankings are not available here (needs Google Search
Console / Keyword Planner); this is a content-based map.

### `keyword-map.csv` columns

| Column | Meaning |
|---|---|
| `path` | page path |
| `section` | topic / exams / mock-test / category / previous-year / ... |
| `primary_kw` | main keyword for the page |
| `secondary_kw` | 2-4 supporting keywords (curated tags where available) |
| `longtail_kw` | longer, low-competition queries |
| `content_terms` | terms mined from this page's own questions (Layer B) |
| `suggested_title` | ready-to-use title tag |
| `suggested_meta` | ready-to-use meta description |
| `suggested_h1` | ready-to-use H1 |
| `suggested_h2` | ready-to-use H2 section headings |

### Final checks (all 995 pages)

| Check | Result |
|---|---|
| Rows | 995 |
| Pages with a primary keyword | 995 |
| Duplicate primary keywords | 1 (`privacy/` vs `privacy-policy/` — duplicate page) |
| Duplicate suggested titles | 1 (same pair) |
| Suggested titles over 60 chars | 0 |
| Suggested metas over 160 chars | 0 |
| Pages using curated tags | 238 |
| Pages using mined terms | 752 |

### Keyword pattern per template

| Template | Primary keyword pattern | Example (Percentage) |
|---|---|---|
| /topic/<subj>/.../ | `<topic> questions with answers` | `percentage questions with answers` |
| /exams/<exam>/.../ | `<topic> questions for <exam>` | `percentage questions for adre 3.0 grade iv` |
| /mock-test/.../set-N/ | `<topic> mock test set N` | `non verbal reasoning mock test set 1` |
| /category/.../ | `<topic> questions` | `reasoning questions` |

### Long-tail keywords (low competition, fast wins)

These are the queries a student actually types. Each topic page should carry
them in body text and H2s:

- `<topic> questions for ADRE`
- `<topic> questions for Assam Police`
- `<topic> shortcuts and tricks`
- `<topic> mcq with answers pdf`
- `<exam> <topic> previous year questions`
- `free <topic> mock test with answers`

### Placement map (where each keyword goes)

| Location | What to place |
|---|---|
| Title tag | primary keyword first, one exam name |
| Meta description | primary + one long-tail, one CTA, < 160 chars |
| H1 | primary keyword, natural phrasing |
| H2 | secondary + long-tail ("Percentage Formulas", "Shortcut Tricks") |
| First 100 words | primary keyword once |
| URL slug | already good, keep |
| Image alt | topic name |
| Internal links | descriptive anchor ("percentage questions for ADRE") |

### Example, fully worked (topic/math/arithmetic/percentage/)

| Element | Now | Suggested |
|---|---|---|
| Title | `Percentage \| axomexam` | `Percentage Questions with Answers — ADRE, APSC & Assam Police` |
| Meta | (173 chars, truncated) | `Practice percentage questions with step-by-step answers and explanations for ADRE, APSC and Assam Police. Free, bilingual, no sign-up.` (134) |
| H1 | `Percentage` | `Percentage: Concepts, Tricks & Solved Questions` |
| H2 | `50 Questions with Answers` | `What is Percentage` · `Percentage Formulas` · `Shortcut Tricks` · `Solved Examples` · `FAQs` |

Every row of `keyword-map.csv` already has this filled in for all 995 pages.

### The competition question

The pages that currently rank for these terms are typically large exam-prep
portals and PDF aggregators. They win on two things this site can match:
question volume (already strong) and keyword-explicit pages (the gap). A page
titled `Percentage | axomexam` cannot outrank a page titled `Percentage
Questions with Answers PDF for ADRE & Assam Police`, regardless of content
quality. That is the fix.

---

## 11. Deliverables

- `seo-audit.csv` — one row per page: current title/desc/canonical/robots/H1/
  H2/words/images/JSON-LD + issue flags.
- `keyword-map.csv` — one row per page: primary / secondary / long-tail
  keywords + suggested title, meta description, H1, H2.
- This report.

Note on limits: search volume, live ranking positions and backlink data are not
available from the repo and need Google Search Console / Keyword Planner. The
above is content and on-page analysis only.
