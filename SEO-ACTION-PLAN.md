# SEO Action Plan — axomexam.in

## The goal (one line)

**Har page apne topic ke liye ek clear, keyword-explicit target ho — aur site
par maujood har content ka apna indexable page ho. Phir jo bhi keyword site ke
content mein hai, uska ek page hota hai jo us keyword par rank kar sakta hai.**

Iske teen hisse hain:

1. **Har content ka page ho** — jo data mein hai par render nahi hua, uska page
   banao. Warna us keyword par kuch rank karne ko hi nahi hai.
2. **Har page ka apna keyword ho** — page ke actual content se nikla, kisi
   site-wide template se nahi. Isse do page aapas mein compete nahi karenge.
3. **Woh keyword page par dikhe** — title, meta, H1, H2 aur body text mein. Jo
   keyword page par nahi likha, us par Google rank nahi karayega.

---

## Kaam ki teen layers

| Layer | Kya | Kahan | Count |
|---|---|---|---|
| **1. Pages banao** | data mein hai, page nahi hai | `data/content/**` | 17 files, ~1,931 Qs |
| **2. Keywords lagao** | har page ka target keyword | `keyword-map.csv` | 995 pages |
| **3. Fix technical** | canonical, noindex, schema, links | `page-actions.csv` | 995 pages |

---

## Layer 1 — Jo pages banane hain (sabse bada win)

Ye content data mein pada hai, par site par page nahi hai. Inka koi page nahi =
in keywords par rank karne ka koi mauka nahi.

| Content file | Questions | Naya page |
|---|---|---|
| `data/content/gk/ancient-assam.json` | 300 | `/topic/gk/assam-history/ancient-assam/` |
| `data/content/gk/medieval-assam.json` | 300 | `/topic/gk/assam-history/medieval-assam/` |
| `data/content/gk/modern-assam.json` | 300 | `/topic/gk/assam-history/modern-assam/` |
| `data/content/gk/ancient-india.json` | 350 | `/topic/gk/indian-history/ancient-india/` |
| `data/content/gk/medieval-india.json` | 350 | `/topic/gk/indian-history/medieval-india/` |
| `data/content/gk/solar-system.json` | 100 | `/topic/gk/geography/solar-system/` |
| `data/content/gk/national-parks.json` | 60 | `/topic/gk/geography/national-parks/` |
| `data/content/gk/brahmaputra-river.json` | 50 | `/topic/gk/geography/brahmaputra-river/` |
| `data/content/science/human-body.json` | 5 | `/topic/science/human-body/` |
| `data/content/history/freedom-struggle.json` | 4 | `/topic/history/freedom-struggle/` |
| `data/content/gk/bihu-festival.json` | 4 | `/topic/gk/art-culture/bihu-festival/` |
| `data/content/articles/*.json` (6) | 108 | `/category/articles/<subject>/` |

**Total: 17 pages, ~1,931 questions.** Repo mein `tools/prerender.js` already
hai — usse render karo, phir sitemap mein daalo aur category pages se link karo.

Har naye page par bhi Layer 2 ke keyword rules lagao.

---

## Layer 2 — Har page ka keyword (995 pages, ready)

`keyword-map.csv` mein har page ka ready target hai:

| Column | Kya |
|---|---|
| `primary_kw` | page ka main keyword |
| `secondary_kw` | 2-4 supporting keywords |
| `longtail_kw` | lambi, low-competition queries |
| `content_terms` | us page ke apne questions se nikle terms |
| `suggested_title` | ready title (≤60 char) |
| `suggested_meta` | ready meta description (≤160 char) |
| `suggested_h1` | ready H1 |
| `suggested_h2` | ready H2 sections |

Keyword **page ke apne content se** aaya hai (slug + us page ke question
stems), isliye har page ka set alag hai. Result: **0 duplicate keyword,
0 duplicate title.**

---

## Layer 3 — Per-page action list (995 pages, ready)

`page-actions.csv` batata hai har page par exactly kya karna hai. Columns:

`path` · `section` · `words_now` · `title_now` · `title_len_now` ·
`title_new` · `meta_len_now` · `meta_new` · `h1_now` · `h1_new` · `h2_new` ·
`primary_kw` · `tasks`

`tasks` column = is page ka kaam. Count:

| Task | Kitne pages | Kya karna |
|---|---|---|
| `TITLE` | 970 | naya title lagao |
| `META` | 979 | naya meta description lagao (580 committed meta 160+ char ke hain) |
| `H1` | 814 | naya H1 lagao |
| `H2-ADD` | 249 | 3-5 H2/H3 section add karo (content pages with <3 subheadings) |
| `THIN` | 72 | body text badhao (300+ words) |
| `NOINDEX` | 21 | noindex hatao ya page merge karo |
| `H1-MISSING` | 14 | H1 add karo |
| `SCHEMA` | 1 | JSON-LD add karo |
| `OK` | 8 | kuch nahi (legal/about/contact/404/search) |

> Note: `META` 979 hai kyunki committed meta descriptions ki quality kharab hai —
> **579 pages ka meta 160 char se lamba hai** (Google kaat deta hai), 14 pages
> par meta hi nahi. Sirf 398 pages ka meta 70-160 char ke beech hai.

---

## Priority order (kis order mein karna hai)

### P0 — Rank karne ki buniyad (isse pehle kuch nahi hoga)
1. ~~**17 orphan pages banao** (Layer 1)~~ — **DONE**: 15 banks ke liye
   `tools/build-orphan-topic-pages.js` se indexable `/topic/` pages ban gaye
   (1,823 questions), sitemap + categories.json + parent cards ke saath.
2. ~~**970 titles badlo** (`TITLE`)~~ — **DONE** (`tools/apply-keyword-map.js`)
3. ~~**814 H1 badlo** (`H1`) + **14 missing H1 add karo**~~ — **DONE**
4. ~~**979 meta descriptions badlo** (`META`)~~ — **DONE**; 0 ab 160+ char se
   lamba (entity-decoded count)

### P1 — Content depth
5. **249 pages par H2/H3 sections add karo** (`H2-ADD`)
6. ~~**72 thin pages ka body text badhao** (`THIN`)~~ — **DONE**; 0 page ab
   300 words se kam nahi (`tools/enrich-utility-pages.js` +
   `tools/enrich-thin-pages.js`). Thin page ka minimum ab 303 words hai.
7. ~~Naye pages ka intro + H2~~ — **DONE** (Layer 1 ke saath hi)
7a. ~~**26 chhote titles (<30 char)** theek karo~~ — **DONE**. Title generator
   (`build-keyword-map.js`) ab exam book ka naam qualifier ki tarah use karta
   hai, isliye Grade III/IV ke same-topic pages ab duplicate nahi hain; 11
   hand-written utility pages (`about/`, `contact/`, `terms/`, `exams/`, ...)
   ke liye explicit target titles add kiye. Title length ab min 34 / avg 51.

### P2 — Technical hygiene
8. **24 noindex pages** ka faisla (`NOINDEX`) — **RESOLVED**. Har noindex page
   ek live page ka duplicate hai (canonical ek indexable URL par jata hai), aur
   koi bhi noindex page sitemap mein nahi hai. Sirf teen exceptions bachi hain,
   teeno deliberate: `trending/` (144-word hub, canonical khud par),
   `topic/trending/assam-gk-special/` aur `topic/english/grammar-vocab/tenses/`
   — ye `/trending/` aur `/topic/english/grammar/tenses/` ke purane URL hain
   jo `tools/seo-indexing-fix.js` ke NOINDEX list mein hain. `privacy-policy/`
   aur `search/` intentionally noindex hain.
9. **1 page par JSON-LD add karo** (`SCHEMA`)
10. **79 orphan pages** ko category pages se link karo (internal links)

### P3 — Off-page (repo ke bahar)
12. Google Search Console setup + sitemap submit
13. GSC se asli query data → priority tune karo

---

## Kya NAHI karna (aapki clarification)

**Same topic alag exams mein duplicate NAHI hai.** Audit se confirm:
- Different exam banks ke beech **0 shared questions**
- Mock-test sets ke beech **0 shared questions**
- Sirf `topic` vs `assam-police` ke beech 3 shared the

Toh `percentage` ka `topic/` page, `exams/adre-grade-4/` page, aur
`exams/assam-police/` page — **teeno alag rahenge**, teeno apne exam keyword par
target karenge. Kisi ko delete nahi karna.

Jo asli problem thi woh **duplicate content nahi, duplicate presentation thi** —
same H1, same title pattern. Woh Layer 2 se theek ho raha hai: har page ko
apna keyword milta hai.

---

## Deliverables

| File | Kya | Rows |
|---|---|---|
| `SEO-AUDIT.md` | audit report | — |
| `seo-audit.csv` | current state + issues | 995 |
| `keyword-map.csv` | target keywords + title/meta/H1/H2 | 995 |
| `page-actions.csv` | per-page task list (yeh file) | 995 |
| `SEO-ACTION-PLAN.md` | yeh plan | — |

---

## Definition of done

- [x] 15 orphan content pages live + sitemap mein (1,823 questions)
- [x] 981/981 indexable pages par unique title
- [x] 981/981 indexable pages par ek H1
- [x] 981/981 indexable pages par meta description (93-160 char)
- [ ] 249 pages par 3+ subheadings
- [x] 0 thin pages (sab 300+ words; min 303)
- [x] 0 chhote titles (<30 char), 0 duplicate titles/H1/descriptions
- [x] 981 sitemap URLs = 981 indexable pages (0 conflict, 0 missing)
- [x] 981/981 pages par JSON-LD
- [x] orphan pages ko parent card + internal link
- [ ] GSC mein sitemap submit

Verify karo: `node tools/seo-audit.js` (aur `--list` for offenders).

---

## Regenerate kaise karein

```bash
node tools/build-keyword-map.js   # -> keyword-map.csv
node tools/build-page-actions.js  # -> page-actions.csv
node tools/seo-audit.js           # live re-check of the numbers above
```

Dono tools idempotent hain — dobara chalane par same output. Content ya
`categories.json` badalne par dobara chalao, phir `keyword-map.csv` ke naye
`primary_kw` par target karo.
