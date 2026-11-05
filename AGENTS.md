# AGENTS.md

Static bilingual (English + Assamese) exam-prep site served from the repository
root by GitHub Pages at https://axomexam.in. There is no build step at deploy
time: the committed `index.html` files are what GitHub Pages serves.

## Pushing to `main` — never overwrite anyone's work

This repository is shared and other people push to `main` while an agent is
working. Before every push, confirm the remote tip is an ancestor of `HEAD`;
if it is not, someone pushed in the meantime and the push must be stopped and
rebased instead of forced.

Use the helper, which enforces this and refuses unsafe pushes:

```bash
tools/safe-push.sh origin main
```

It fetches, checks that `origin/main` is reachable from `HEAD` (a pure
fast-forward), and only then pushes. If the remote has commits that `HEAD`
lacks, it prints `BLOCKED` and exits without pushing, so nothing is lost. On
a block, rebase and re-run:

```bash
git rebase origin/main        # resolve conflicts, keep both sides' work
tools/safe-push.sh origin main
```

Never use `git push --force` or `--force-with-lease` to `main`, and never
push directly with `git push` without this check. A manual equivalent of the
guard is:

```bash
git fetch origin main
git merge-base --is-ancestor origin/main HEAD || { echo BLOCKED; exit 1; }
git push origin HEAD:main
```

## Gotcha: hand-edited pages that a tool regenerates

`tools/inject-as-static-pages.js` rewrites the Assamese body of the legal and
editorial pages (`about`, `privacy`, `terms`, `disclaimer`,
`editorial-policy`, `editorial-team`, `sources`, `updates`) from the
`isAs ? \`...\`` branch in `js/app.src.js`. That branch is the source of truth
for those pages.

`/updates/` and `/about/` have been hand-edited in the served HTML several
times (the English `/updates/` page carries entries that were never added to
`js/app.src.js`). Running the injector then silently drops the hand-added
text from the `/as/` twin. If you edit one of those pages by hand, add the
same content to `js/app.src.js` in the same commit, or the next injector run
loses it.

The same trap applies to any commit that stages the whole tree: a stale
`/as/` page already sitting dirty in the working tree gets published even
though the change you intended was elsewhere. Run
`git status` before `git add -A` and check that every modified file is one you
meant to touch.

## Architecture

- `js/app.src.js` is the client-side router and renderer. It replaces the
  contents of `<main id="app">` on every navigation. Anything inside `<main>`
  in the committed HTML is only ever seen by crawlers (and by users before JS
  boots).
- `data/*.json` holds the category/topic/question source of truth.
- `tools/prerender.js` writes the committed HTML from that data.
- `scripts/` and `tools/` contain one-shot content generators. Most are
  idempotent and accept `--check` to report without writing.

## Theme contract — light and dark

`css/style.src.css` is the only editable stylesheet; `css/style.css` is the
minified output. Run `node scripts/minify-assets.js` then
`node scripts/stamp-assets.js` after editing, or the committed HTML keeps
pointing at a stale `?v=` hash.

The theme is selected by `data-theme="dark"` on `<html>`, restored from
`localStorage["axomexam-theme"]`. Every colour used in dark mode must come
from a custom property that is **defined in both** the `:root` (light) and
`[data-theme="dark"]` blocks. Two failure modes to watch for:

- `js/app.js` emits inline styles that reference properties by name, e.g.
  `background:var(--card-bg,#fff)`. If the property is missing from
  `style.src.css` the `#fff` fallback wins and the surface stays white while
  the inherited text colour is the dark theme's near-white — unreadable. Add
  the property to both blocks rather than relying on the fallback.
- A rule that hardcodes a light `background` with no `[data-theme="dark"]`
  override. Unstyled `input`/`select`/`textarea` are the same problem, since
  they fall back to the UA white fill; the global dark override covers those.

Deliberately exempt: the offscreen PDF-export container
(`#dynamic-pdf-export-container`) and `.report-card`/`.rc-challenge` inside
the share card, which are white-on-dark by design and must not be re-tinted.

### Contact addresses — `a.axo-email`

Every `contact@axomexam.in` / `support@axomexam.in` link in page content
carries `class="axo-email"`, which makes it bold and gives it a tinted chip so
a reader can spot the address. The rule lives in `css/style.src.css` and has a
`[data-theme="dark"]` variant, so both themes are readable.

The two footer anchors (`.footer-contact`, `.fbb-contact`) are deliberately
left without the class — the footer already colours them, and a chip there
looks wrong. Keep it that way: `tools/inject-as-static-pages.js` and
`tools/prerender.js` write the footer from templates, and the class must not be
added to those two lines.

The three source files that emit these links are `js/app.src.js` (the legal /
editorial panels), `tools/prerender.js` (the `/about` and `/contact` bodies)
and the served HTML. Add the class in all three, or a rebuild drops it.

## Language model — two separate toggles

There are **two** language controls and they must not be confused.

1. **Universal header toggle** (`data-glang`). Switches the *interface* language
   only. Instant, client-side, **never changes the URL and never reloads**.
   Restored from `localStorage` on load (default `en`).

2. **Content toggle** (`data-lang`, `data-ebklang`, `data-exlang`, `data-calang`).
   Switches the *content* language and is URL-driven: the Assamese twin of
   `/topic/...` lives at `/as/topic/...`. `js/app.src.js` derives the content
   language from the path alone (`isAssamesePath()`), strips the `as/` segment
   before routing, and `counterpartUrl()` computes the twin URL. One global
   capture-phase listener (`initContentLangSwitch`, selector
   `[data-lang],[data-ebklang],[data-exlang],[data-calang]`) handles all of
   them; the older per-renderer in-place handlers are dead code kept as a
   fallback.

   **The content toggle only reloads when the counterpart actually exists.**
   It checks for `link[rel="alternate"][hreflang="<target>"]` in the head. A
   page with no twin keeps the original in-place behaviour, so the partial
   `/as/` rollout never navigates a visitor to a 404.

`data-mocklang` (mock-test internal language) is deliberately **not** in the
content-toggle selector and must stay out.

The toggle show/hide is keyed on `data-axo-lang` plus `body[data-lang]` /
`body[data-ui-lang]` in `css/style.css`, never on the `lang` attribute, so
adding or changing `lang="..."` is safe for layout.

`/as/` twins carry their own `lang="as"`, self-referential canonical, and
Assamese title/meta. Every twinned page emits three hreflang links on **both**
sides (`en`, `as`, `x-default`).

The full twin set is generated by `tools/build-as-twins.js` (see below);
`tools/build-bilingual-page.js <rel-path> "<as title>" "<as meta>" "<as h1>"`
remains for creating a single twin by hand. All 981 indexable pages now have a
twin; the 24 noindex pages deliberately do not.

## Assamese twins — `tools/build-as-twins.js`

Generates every `/as/` twin from its committed English page plus the Assamese
strings already in `data/` (`exams/index.json`, `categories.json`,
`books/*.json`, `content/**/*.json`, `mock-test/**/*.json`). Idempotent;
`--check` reports drift without writing, `--only <rel>` builds one page.

What a twin changes relative to its English page:

- `<html lang="as">`, self-canonical, `og:url`, and every absolute
  `axomexam.in/<rel>/` self URL inside the JSON-LD graph (so `@id`, `url`,
  breadcrumb items point at `/as/`).
- `<body data-lang="as">` so the Assamese content renders from the static
  HTML, before and without JS (`css/style.css` keys visibility on it, and the
  runtime sets the same value from the URL).
- Assamese `<title>`, `description`, `keywords`, `og:`/`twitter:`
  title+description, `og:locale` = `as_IN` with `en_IN` alternate, and the
  first `<h1>`. The keywords list is rebuilt from the Assamese name (via
  `keywordsAs`) so the twin advertises Assamese queries, not the English
  list it inherited.
- JSON-LD `inLanguage` becomes `["as"]`. Every English page ships
  `["en","as"]` (it serves both languages on one URL); a `/as/` twin is
  Assamese-primary, so leaving the English value there mis-signals it.
- Bilingual pairs inside `<main>` are reordered Assamese-first
  (`assameseFirst`), as are the `data-axo-lang` extra-content and
  editorial-credit panels (`assamesePanelFirst`). Both halves stay in the
  DOM and CSS hides one per `body[data-lang]`, so a reader sees no change —
  but a crawler now reads Assamese before English on the Assamese URL.
- Internal `href="/…"` and JSON-LD `https://axomexam.in/…` links are rewritten
  to the matching `/as/` page **only when that twin exists**, so a link never
  lands on a 404 and the SPA stays in Assamese.
- The three hreflang links, added on both sides.

Everything else — CSS, scripts and the remaining body markup — is the
English page verbatim, so the runtime (`isAssamesePath()`) renders the same
route with the Assamese content it already ships.

Head-text rules live in `headFor(rel)`: one branch per page family (utility,
topic, category, exams, mock-test, previous-year, ebooks, …). `clamp` trims a
string to a snippet-friendly length, `titled` keeps the distinguishing suffix,
`labelFor` falls back to the longest known name prefix plus a readable tail,
and a final `uniquify` pass appends the trailing path segment if two heads
still collide. The English page only ever gains the hreflang block.

Run order after a content change:

```bash
node tools/build-as-twins.js        # regenerate /as/ twins + hreflang
node tools/build-as-content.js      # all remaining /as/ content passes
node tools/seo-indexing-fix.js      # adds the /as/ URLs + sitemap hreflang
node tools/seo-audit.js --as        # verify (EN + AS + twin pairing)
```

### Assamese content passes — `tools/build-as-content.js`

`build-as-twins.js` translates the visible `page-desc` while it builds (via
`tools/lib/as-page-desc.js`), but several `/as/` pages carry their body from a
separate source, so they need their own pass. `tools/build-as-content.js` runs
all of them in the right order:

1. `tools/inject-as-static-pages.js` — legal / editorial pages: copies the
   `isAs ? \`…\`` panel out of `js/app.src.js`.
2. `tools/add-as-hub-content.js` — hub prose (headings, FAQ, blurb) via
   `data/i18n/hub-as.json` and `tools/lib/as-hub-strings.js`.
3. `tools/translate-deep-content.js` — deep-content category articles.
4. `tools/translate-as-syllabus.js` — ADRE Grade IV and Assam Police syllabus
   pages, from `data/i18n/syllabus-as.js` (their served body was still the
   English article).
5. `tools/sync-as-renderer-pages.js` — Submit and Download-App, whose body is
   drawn entirely by `renderSubmitPage` / `renderDownloadAppPage`.
6. `tools/dedupe-as-twins.js` — drop the English deep-article panel from the
   `<section data-axo-extra="1">` block of every `/as/` topic and exam page.
   This must run after any pass that re-injects the bilingual panel, or the
   twin serves the full English article again.
7. `tools/translate-as-page-descs.js` — back-fill / drift check for the visible
   `page-desc` on every twin.

The `page-desc` inner HTML can hold its own `<p>` / `<ul>` children, because the
description is emitted from multi-line data by `descHTML()`. Both this tool and
`build-as-twins.js` locate the element with `pageDescSpan()` from
`tools/lib/as-page-desc.js`, which walks the nested `<p>` depth. A lazy
`[\s\S]*?</p>` stops at the first nested close tag, so it replaces one paragraph
and leaves the rest of the English block in place — an unbalanced, half-English
description under an Assamese heading.

Every pass is idempotent, so re-running the whole file is safe. Run it after
any full `prerender.js` + `build-as-twins.js` rebuild, or the served `/as/`
HTML drifts back to English under an Assamese URL — which is exactly the
"low-value / duplicate content" signal the AdSense review flagged. Check the
current state with `node tools/build-as-content.js --check`.

The visible body is what a crawler reads before JavaScript runs, so a page can
be bilingual at runtime and still look like an English duplicate in the served
HTML. Audit with a raw fetch, not a browser:

```bash
curl -s https://axomexam.in/as/<page>/ | python3 -c 'import sys,re,html; h=sys.stdin.read(); b=re.search(r"<main\b.*?</main>",h,re.S).group(0); t=html.unescape(re.sub(r"<[^>]+>"," ",b)); print(len(t.split()), sum(1 for c in t if "\u0980"<=c<="\u09ff")/max(1,len(t)))'
```

`tools/seo-indexing-fix.js` also writes the `xhtml:link` alternates into every
sitemap entry. Google reads hreflang from the page head and from the sitemap,
so both carry the same en/as/x-default trio; each twin advertises the same set
so the clusters stay reciprocal. The `<urlset>` therefore declares the
`xhtml` namespace. Verify a change with `tools/seo-audit.js`, which compares
the head block against the sitemap entry for every URL.

`tools/enhance-meta.js` and `tools/enrich-thin-pages.js` are twin-safe: they
add a page-level WebPage node without disturbing the Assamese head.

## Gotcha: do not run tools/latest-schema.js

`tools/latest-schema.js` was stale and destructive: running it deleted the
FAQPage node from every page (593 -> 0) and rewrote `sitemap.xml` and the nav.
It has since been repaired for the cases below, but still treat it with care.

Fixed in the founder-attribution work (Nov 2026):

- it now preserves an existing `FAQPage` node instead of dropping it, so
  re-running no longer wipes the injector's work.
- `/as/` is classified as a home page, so its `Organization` and `WebSite`
  nodes survive a rebuild.
- the `Organization` node carries `founder` (Person "Bapon Barmon") and
  `employee`, and is emitted on the editorial team pages too.

Still true: the checked-in HTML is ahead of the generator in places (titles and
some nodes were edited by hand). Running it over the whole tree produces a huge
unrelated diff. To change a few pages, copy those files plus
`tools/latest-schema.js` into a throwaway `git worktree` of HEAD, run it there,
and copy only the files you meant to change back.

Never `require('./tools/latest-schema.js')` from another script: it runs the
full rewrite on load.

## Crawler-facing tools

All three are idempotent; run with `--check` first.

- `tools/expand-quiz-schema.js` - rebuilds `Quiz.hasPart` from the questions
  actually visible in the page. Only the `hasPart` array changes; every other
  JSON-LD node and property is preserved.
- `tools/fix-stale-category-links.js` - retargets leaf sub-category links on
  `/category/<cat>/` pages from the noindex `/category/<cat>/<sub>/`
  duplicate to the canonical `/topic/<cat>/<sub>/`, matching what
  `renderCategoryPage` does at runtime. It skips any leaf whose `/category/`
  page is genuinely indexable (canonical points at itself).
- `tools/add-lang-attributes.js` - adds `lang="as"`/`lang="en"` to elements
  that already carry `data-axo-lang`. `data-axo-lang` is preserved.
- `tools/inject-ebook-bilingual.js` - rebuilds `<div id="ebk-body">` on
  `/ebooks/<id>/` reader pages so both the English and the Assamese chapters
  are in the served HTML, each in its own `lang="en"`/`lang="as"` wrapper
  (never `data-axo-lang`, which `css/style.css` hides until
  `body[data-lang=as]`). Everything outside `#ebk-body` is untouched. Mirrors
  `ebkBilingualBodyHTML` in `tools/prerender.js`, which now emits the same
  markup.
- `tools/apply-real-dates.js` - derives `datePublished`/`dateModified`, the
  visible `Published:`/`Last updated:` labels and `sitemap.xml` `<lastmod>`
  from git history. `git log` is newest-first, so the *last* entry for a path
  is the creation date and the *first* is the last modification.
- `tools/fix-faq-schema-visibility.js` - rebuilds the `FAQPage` node from the
  Q&A the site marks `data-axo-faq="1"`, dropping any pair that repeats
  site-wide. Pages with no unique visible FAQ lose the node. Handles both
  `@graph`-shaped pages and current-affairs pages that ship a standalone
  `FAQPage` script.
- `tools/fix-orphan-links.js` - links the two indexable pages that had no
  inbound links from their parents, and adds the matching ItemList entry.
- `tools/scan-404.js` - read-only. Checks every sitemap URL and every internal
  `href`/`src` against committed files; exits non-zero on a broken target.
- `tools/build-mock-set-pages.js` - writes the crawler-facing HTML for every
  mock-test set page (`mock-test/<cat>/<sub>/set-N/index.html`) from
  `data/mock-test/**/set-N.json`, plus the three missing subcategory pages
  (english/grammar, english/vocabulary, computer/ms-office). The set question
  bank is otherwise fetched at runtime, so without this tool a crawler sees only
  a spinner. It writes the full bilingual question list inside `<main id="app">`
  (replaced by `renderRoute()` for real visitors), unique meta/canonical, and
  WebPage + LearningResource + Breadcrumb + FAQ + Quiz JSON-LD. It also injects
  a marker-delimited "mock test sets" block before the footer on each parent
  subcategory page so every set URL has an inbound link, adds the new URLs to
  `sitemap.xml` with the data file's git date as `<lastmod>`, and emits links in
  the trailing-slash form `tools/seo-indexing-fix.js` produces. The shell
  template is read from `topic/math/arithmetic/boats-and-streams/`, which the
  tool never writes, so re-runs cannot drift. Pages it owns carry
  `<!-- generated by tools/build-mock-set-pages.js -->`; a subcategory page
  without that marker is treated as hand-written and is never overwritten.
  Idempotent; `--check` reports drift instead of writing.
- `tools/fix-duplicate-bilingual-text.js` - removes the doubled value the
  question generators used to print when an option or answer reads the same in
  both languages. Most options are numbers, so `(B) 2` was followed by an
  Assamese span that also said `2`, and the answer line repeated itself in a
  sibling div. Only the fragment whose text matches its pair is dropped; a
  genuinely different Assamese string is kept. The four generators
  (`build-mock-set-pages.js`, `build-adre-grade-3.js`,
  `build-orphan-topic-pages.js`, `inject-static-questions.js`) now skip the
  duplicate at source, so a rebuild cannot reintroduce it. Idempotent;
  `--check` reports drift instead of writing.
- `tools/fix-editorial-sources.js` - repairs the English `Sources:` line in
  the editorial-credit block. Several builders reuse that block verbatim from
  the math reference page (`topic/math/arithmetic/boats-and-streams`), which
  hard-codes `standard mathematics reference material`, so 814 generated pages
  on other subjects claimed a math source. The tool derives the subject from
  the page path and writes the canonical line already used by the matching
  `topic/` pages (see `tools/lib/editorial-sources.js` for the table). Only the
  Sources value changes. Idempotent; `--check` reports drift instead of
  writing. The three builders (`build-mock-set-pages.js`,
  `build-orphan-topic-pages.js`, `build-adre-grade-3.js`) now call
  `applySourcesLine()`/`sourcesLine()` at build time, so a rebuild cannot
  reintroduce the wrong line. Do NOT run those builders to fix a Sources line:
  they regenerate from a stale shell and would also revert newer
  title/description/keywords on the same pages. Use the fix tool instead.

## SEO analysis tools

Read-only with respect to page HTML — they produce reports, they do not edit
pages. Both are idempotent; re-running yields byte-identical CSVs.

- `tools/build-keyword-map.js` → `keyword-map.csv` (995 rows). One target
  keyword set per page, built from two sources in priority order:
  1. the hand-written bilingual `tags` array already present in 238
     `data/content/**/*.json` topic files, used as the secondary keywords
     because a human chose them for that topic;
  2. TF-IDF terms mined from the other 752 pages' own `<main>` question
     stems (`qa-item` blocks), with a noise gate that drops stopwords,
     bare numbers, leading articles and weak phrase endings.
  Emits `primary_kw` / `secondary_kw` / `longtail_kw` / `content_terms` plus a
  ready `suggested_title` (≤60 chars), `suggested_meta` (≤160), `suggested_h1`
  and `suggested_h2`. A dedupe pass makes keywords, titles and metas unique
  site-wide; where two pages share a topic name under different parents it
  appends the parent segment; for `/exams/<book>/…` that qualifier is the
  exam book's name, because Grade III and Grade IV reuse topic ids and the
  section name alone would not tell those pages apart. The only remaining
  duplicate is the genuine `privacy/` vs `privacy-policy/` page pair.
  Section-root hub pages (`exams/index.html`, `ebooks/index.html`, …) are left
  alone — their committed titles are hand-written and already describe them —
  except the eleven that carried a title under 30 characters, which are fixed
  from `UTILITY_TITLES` in the same file. The walk skips `as/`: those pages
  carry their own hand-written Assamese title/description/keywords and the
  English pass would empty them.
- `tools/build-page-actions.js` → `page-actions.csv` (995 rows). Reads each
  committed page and emits the task flags: `TITLE`, `META`, `H1`,
  `H1-MISSING`, `H2-ADD`, `THIN` (<300 words), `NOINDEX`, `SCHEMA`, `OK`.
  Headings are counted inside `<main>` plus the prerendered
  `data-axo-extra="1"` prose block only — nav/footer headings do not count,
  otherwise a page with no real sub-headings looks fine. `H2-ADD` fires when
  the content scope has fewer than 3 `h2`+`h3` headings combined.
- `tools/apply-keyword-map.js` — writes the keyword map into the committed
  pages. For each row it rewrites, in the page's existing markup, only
  `<title>`, `<meta name="description">`, the matching `og:`/`twitter:`
  title+description, the first `<h1>`, and `<meta name="keywords">` (inserted
  if absent). Canonical, robots, JSON-LD, links, body text and attribute order
  are left byte-identical. Run `build-keyword-map.js` first. `--check` reports
  drift without writing; it is idempotent, so a second run reports 0 changes.
  Two categories of page are deliberately skipped: section-root hubs
  (`exams/index.html`, …) and redirect stubs (`http-equiv="refresh"`), which
  keep their own "This page has moved" title. Dedupe of keywords/titles/metas
  is scoped to *indexable* pages only — a noindex stub is expected to repeat
  the indexable page it duplicates, so it never forces that page to take a
  worse title.

Regenerate after any content change:

```bash
node tools/build-keyword-map.js    # -> keyword-map.csv
node tools/apply-keyword-map.js    # write titles/metas/H1s into the pages
node tools/build-page-actions.js   # -> page-actions.csv (reads final pages)
```

`SEO-AUDIT.md` holds the findings, `SEO-ACTION-PLAN.md` the work order.
`seo-audit.csv` is the raw per-page current-state scan. When the plan was
written: 665 titles carried no exam context, 580 metas exceeded 160 chars, 72
pages were under 300 words, 21 were noindex, and 17 `data/content/**` files
(~1,931 questions) had no `/topic/` page at all. Layers 2 and 3
(`apply-keyword-map`, the orphan-page builder, the utility-page enrichment)
have since closed those: re-check with `tools/seo-audit.js`.

- `tools/seo-audit.js` — read-only whole-site re-check of the numbers the
  action plan tracks (missing H1/description/canonical/JSON-LD, thin pages,
  over-long titles and metas, duplicate titles/H1s/descriptions, length
  stats). Titles and metas are entity-decoded before measuring, so `&amp;`
  counts as one character. `--json` for machine output, `--list` to print
  offending URLs. Run this after any generator so the plan's numbers stay
  honest.
- `tools/build-orphan-topic-pages.js` — writes the `/topic/` page for every
  `data/content/**` bank that had none (the "Layer 1" work). Each page is
  built from a committed shell with a unique title/description/keywords/
  canonical, WebPage + Quiz + Breadcrumb + FAQ JSON-LD, the full bilingual
  question list and an editorial credit dated from the source file's own git
  history. It also registers the topic in `data/categories.json` so the SPA
  router resolves it, adds one card + ItemList entry to the parent section
  page, and appends the URL to `sitemap.xml`. Pages it owns carry
  `<!-- generated by tools/build-orphan-topic-pages.js -->`. Idempotent;
  `--check` reports drift instead of writing. Keep its `SPECS` array in sync
  with any new orphan bank. The page it writes carries an English-only
  `axo-extra-content` panel; the Assamese sibling comes from
  `tools/inject-as-extra-from-deep.js` (below), not from this builder.
- `tools/inject-as-extra-from-deep.js` — appends the Assamese half of a page's
  deep article to its `<section class="section axo-extra-content">` block. A
  page's extra section is written by whichever generator owns the page, and
  most of those emit an English-only `info-panel`. The Assamese article is
  already on disk in `data/deep-articles/<rel>.json` under the `as` key; this
  tool copies it back into the served HTML as a
  `<article lang="as" data-axo-lang="as" class="info-panel">` sibling, byte-
  identical to the panels the other 547 pages carry. Without it a page
  generated after the Assamese pass ran keeps only the English panel, and its
  `/as/` twin serves English prose under an Assamese URL — the duplicate-
  content signal the AdSense review flagged. Idempotent: a section that
  already has `data-axo-lang="as"` is skipped; `--check` reports drift only.
- `tools/enrich-utility-pages.js` — gives the thin utility pages
  (`categories/`, `trending/`, `submit/`, `disclaimer/`, `terms/`,
  `downloads/`) a page-specific prose block plus a short FAQ written from the
  same data the runtime uses. The gate is a word count (<300 words), not a
  character count, so a markup-heavy `<main>` does not pass as thick.
  Marker-guarded and idempotent; `--check` reports only.
- `tools/enrich-thin-pages.js` — the same idea for every other thin directory
  page. Exam pages get a block built from the book's own structure (sections,
  sub-categories and live question counts) plus a short FAQ; a page still
  under 300 words is grown with its sibling routes in the same book. Pages
  outside the exam book (mock-test subjects, current-affairs, e-books,
  previous-year, category sections) get a generic block written from the link
  cards already in `<main>`. The walk skips `dist/`, `as/`, assets and the six
  pages `enrich-utility-pages.js` owns. Marker-guarded and idempotent; run it
  after the builders and before the keyword pass.
- `tools/enrich-hub-study.js` — the deeper pass over the *indexable hub pages*
  that `enrich-thin-pages.js` grew to ~300 words but that still fall under the
  500-word bar AdSense reads for "low-value content". It is data-model driven
  rather than link-card driven: it reads the same `data/**` files the runtime
  does and writes a per-family study block (category root/sub, exam
  page/section/sub, mock-test cat/sub/section, previous-year root/exam/paper,
  topic, current-affairs). Blocks carry real question counts, worked sample
  questions, subject-matched book notes and a short FAQ, all bilingual. The
  gate is a 500-word count of the text inside `<main>`.
  - Pages it owns are marked `data-axo-study="1"` (a pure marker: no CSS or JS
    reads it, so the block stays visible to crawlers and no-JS visitors). The
    marker is the idempotency guard.
  - English-style subjects (`english/grammar`, `english/vocabulary`,
    `english/grammar-vocab`) keep their topics as separate `/topic/` pages with
    no section tree in `categories.json`. `englishTopics()` resolves the real
    leaf banks from `data/content/**` and `englishSubjectBlock()` lists them, so
    those hubs are built from genuine topic data instead of a link card alone.
  - Where a page has no structured model at all (SSC/Railway/DHS previous-year
    papers, `computer/ms-office`), `examStudyNotes()` falls back to the
    general-studies book notes so the page still carries subject material.
  - Idempotent: a second run rewrites 0 pages. Run it after the builders and
    `enrich-thin-pages.js`, then rebuild the Assamese twins.

## Reading progress bar

`js/app.src.js` keeps one shared scroll-progress strip (`#ebk-progress`, styled
by `.ebk-progress` in `css/style.src.css`) for every long reading page. Call
`showReadProgress(color)` after the page content is painted; `renderRoute()`
calls `clearReadProgress()` so the bar never leaks across navigations. It is
wired on the e-book reader, free-practice topic pages, article/study-guide
pages, current-affairs category pages and exam chapter pages. Short picker
pages intentionally have no bar.

## Floating WhatsApp "Chat with us" tab

`initWhatsappChat()` in `js/app.src.js` builds one `<a id="wa-chat">` and
appends it to `<body>` — never inside `<main id="app">`, because
`renderRoute()` replaces that subtree and would destroy it. Number and default
message live in `CONFIG.WHATSAPP` (`js/config.src.js`); the label and the
pre-filled text come from `wa.chat` / `wa.chatHint` / `wa.prefill` in
`js/i18n.src.js`, so `applyStaticI18n()` refreshes them on a language toggle.

Visibility is an `IntersectionObserver` on `footer.site-footer`: the tab is
parked off the right edge (`transform: translateX(105%)`) and slides in when
the footer enters the viewport. If the observer is missing, the tab is shown
rather than dropping the contact path. `setWhatsappChatSuppressed(true)` hides
it while a mock test runs (`renderMockQuiz`) and `false` restores it on
`leaveMockTest`, `renderMockResults`, and any route change leaving
`/mock-test`.

Two layout constraints to keep in mind when editing `.wa-chat`: on mobile it
sits at `bottom: 150px` so it clears the fixed tab bar *and* the app-download
promo, whose top edge rests at 142px above the viewport bottom; and the pulse
ring grows to `scale(1.5)`, which keeps its 45px diameter inside the pill's own
50px height instead of spilling onto the page.

## Answering "why is my content invisible to AdSense"

The site ships a static block outside `<main id="app">` on most pages. That is
deliberate: `renderRoute()` replaces `#app` on load and navigation, so content
placed *inside* `<main>` is destroyed for real visitors and never seen. The
static block is the crawler/no-JS copy. Do not move it inside `<main>`.

## AdSense trust signals (audited Nov 2026)

The 22 Oct 2026 rejection was "low-value content". The trust layer now in place:

- **Publisher identity.** The `Organization` node (`https://axomexam.in/#organization`)
  has `founder` (Person "Bapon Barmon", `@id`
  `https://axomexam.in/editorial-team/#bapon-barmon`) and `employee`, plus
  `publishingPrinciples`, `correctionsPolicy`, `ethicsPolicy` and `email`. The
  founder's `@id` resolves to a visible card on both editorial-team pages.
  Topic-page bylines stay "axomexam team" on purpose; only the founder is a
  named person.
- **Privacy policy.** The canonical, indexable page is `/privacy/` (13 sections,
  ~1300 words, linked from the footer). `/privacy-policy/` is a `noindex`
  duplicate whose canonical points at `/privacy/`. Do not "fix" the duplicate
  by editing it: the real page is `/privacy/`.
- **Changelog.** `/updates/` is the dated record that signals ongoing curation;
  add an entry for any substantive change and keep `/as/updates/` in step.
- **Content is genuinely unique.** Exam pages average ~4500 words and ~6%
  pairwise similarity; topic pages run 6000-8800 words. Thin pages are the
  redirect stubs under `exams/assam-police/logical-reasoning/`, which are
  `noindex` and carry no ad unit on purpose.
- **No thin indexable page (Nov 2026 follow-up).** After the rejection the
  whole indexable tree was swept: `tools/enrich-hub-study.js` grew the 111
  remaining sub-500-word hub pages to 500-2600 words of real bilingual
  content, and the Assamese twins were rebuilt so `/as/` is thick too.
  `node tools/seo-audit.js` now reports `thin (<300w): 0` and `words: min 304`
  across 1005 pages. Any new hub page must clear 500 words before it ships.

When resubmitting, the fix must be live and crawlable first: verify with a
Googlebot user agent that the page returns 200, has real words in the static
block, and is not `noindex`.

## Exam books

The `/exams/<id>/` books are generated, not hand-edited. Each one has a
`tools/build-<exam>.js` that reads a matching structure/notes/questions trio
and writes the JSON plus every HTML page. `tools/build-adre-grade-3.js` is the
reference for a book that is not a copy of an existing one:

- Content lives in `tools/adre-grade-3.structure.js` (sections, sub-category
  tree, syllabus, notes) and `tools/adre-grade-3.questions.js` (question bank
  keyed by leaf id). The builder derives everything else.
- One topic, one question file. Every topic keeps its whole bank in a single
  `question-001.json` as an array, exactly like `data/exams/adre-grade-4` and
  `data/exams/assam-police`; `index.json` is only the manifest. Do not split a
  topic into `question-002.json`, `question-003.json`, ... — the builder writes
  the whole bank to `question-001.json` and prunes any per-question leftovers
  from an older build (it keeps a numbered file only if it holds a question id
  the bank does not have, so hand-added extras survive).
- The page chrome (head, fonts, footer, guard script) is copied from a Grade IV
  leaf page, so keep that file's structure intact if you touch either book.
- `data/exams/index.json` is hand-formatted with compact one-line sub-category
  objects. The builder splices its entry into the raw text instead of
  re-serialising, so running it never reformats the other exams. Preserve that
  when editing the registration block.
- `tools/build-adre-grade-3-cover.js` renders the book cover to
  `images/exams/adre-grade-3-cover.webp` with headless Chromium + Pillow. It is
  not part of the normal build because it needs network access for the webfonts.

After a content change, run the pipeline in this order and commit the result:

```
node tools/build-adre-grade-3.js
node tools/build-question-counts.js
node tools/sync-exam-book-totals.js
node tools/sync-home-hero-count.js
node tools/inject-static-questions.js
node tools/enrich-thin-pages.js
node tools/inject-as-extra-from-deep.js
node tools/extract-deep-articles.js
node tools/build-keyword-map.js
node tools/apply-keyword-map.js
node tools/build-page-actions.js
```

The last three are the SEO pass. `build-keyword-map.js` mines the freshly
built pages into `keyword-map.csv`, `apply-keyword-map.js` writes the titles,
metas, H1s and keywords back into those pages, and `build-page-actions.js`
re-scans the result into `page-actions.csv`. Keep them last so the keyword data
reflects the pages just built. `apply-keyword-map.js` is idempotent — running
it twice in a row leaves the tree unchanged.

`tools/sync-exam-book-totals.js` writes the book's total question count
("14,932 questions available in this book") into each exam landing page,
just above the "What you will prepare" heading. The number is the sum of that
book's top-level `examSectionCounts` entries in `data/counts.json` (syllabus
sections carry no questions), so it matches the runtime and stays correct
when questions are added. The client-side render in `js/app.src.js`
(`renderExamPage` → `hydrateExamBookTotal`) fills the same line from
`counts.examSectionCounts` on the live page; the tool keeps the committed
HTML — what crawlers and no-JS visitors see — in step. Run it right after
`build-question-counts.js`.

`tools/sync-home-hero-count.js` rewrites the homepage hero block in the
committed root `index.html` so its question count matches the runtime
(`topicCounts` + `examsTotal` from `data/counts.json`, plus current-affairs
and trending questions). The root `index.html` is served as-is (prerender
writes to the gitignored `dist/`, it does not own the homepage), so the hero
number used to be hand-edited and drifted stale every time questions were
added. Run it after `build-question-counts.js`; `--check` reports drift
without writing.

The hero's Topics count comes from the `topicsTotal` field that
`tools/build-question-counts.js` writes to `data/counts.json`: the practice
library topics plus the exam-book leaf topics plus the current-affairs
categories plus the trending topics. It used to be `topicIndex.length`
alone, so adding a whole exam book or a Current Affairs category never moved
it and the number stuck at 325. `js/app.src.js` reads `counts.topicsTotal`
in `applyPrecomputedCounts` and renders it in `renderHome` /
`updateHeroTotals`; `tools/prerender.js` uses the same field for the
prerendered `dist/` copy. Add the count from every library a new topic could
land in, or the hero will drift again.

`enrich-thin-pages.js` rewrites every thin hub page the builders emit, so the
committed state is post-enrichment. A build on top of it reports those pages
as changed again; that is expected, and the tree is stable after the enrich
step. Finish with `node tools/scan-404.js` (expect `broken targets: 0`) and
confirm the page count on disk equals the `exams/<id>` count in `sitemap.xml`.

Grade III and Grade IV share topic ids, so a question id such as
`number-system-001` exists in both books. That is fine — ids are scoped per
book. Question *text*, however, must not repeat across books: check the other
book's question text before adding entries, or the two books will look like
one padded bank.

### Grade III History section

The Grade III book keeps its history questions in a dedicated `history`
section (id `history`) that sits directly after `elementary-mathematics`. It
has three sub-categories: `assam-history` and `indian-history`, each with
`…-ancient`, `…-medieval` and `…-modern` leaves, and a flat `world-history`
leaf with no children. Because history now lives only here, the duplicate
history topics were removed from the other sections: the GK section's
`assam-history-culture` group keeps only `assam-folk-culture` and
`assamese-literature` (it is titled "Assam's Culture & Literature"), and
Social Studies no longer carries `indian-history`. Do not re-add a history
topic to another section or the book will show two copies of it.

### Answer-key balancing (all src-backed banks)

The compact source rows are written with the natural answer first, so a
generator that copies them straight across would put every correct key in the
same position. `build-history-questions.js`, `build-polity-questions.js`,
`build-economy-questions.js` and `build-english-questions.js` therefore rotate
each question's options with `balanceKeys()` (a seeded LCG, so a rebuild is
reproducible) and `rotateOptions()`. A question whose options include a
positional phrase such as "all of these" or "none of the above" keeps its
original order and key, because those phrases only make sense in the written
order. Add the same two helpers when you add a new src-backed generator, and
keep explanations free of "option A/B/C/D" references — the rotation would make
such a reference wrong. After a regeneration, check that no topic has one
option holding ≥50% of the keys.

### Balancing hand-uploaded banks (Grade IV, Assam Police)

`data/exams/adre-grade-4/` and `data/exams/assam-police/` hold their banks as
hand-written `question-*.json` (no generator), so a topic authored with the
natural answer first ends up with every key in one slot. Run

```
node tools/balance-answer-keys.js --check              # audit every book
node tools/balance-answer-keys.js --book assam-police  # rewrite the skewed topics
```

The tool reorders each question's `options` text in place and follows the
answer to its new index; it never changes which option is correct, the question
or the explanation. Questions whose options contain a positional phrase ("all
of these", "none of the above") or a figure keep their written order. It uses
the same seeded sequence as the build-time generators, so a re-run is
reproducible. After running it, rebuild the static pages with
`node tools/inject-static-questions.js` so the site shows the new letters, then
`--check` should report zero skewed topics.

### Grade III history question banks

The history topics of the Grade III book are too large to keep inline in
`tools/adre-grade-3.questions.js`. Their banks live in `tools/history-src/`,
one file per topic (or `…​.part2.js`, `…​.part3.js` … when a topic is
bigger), as compact rows:

```js
["question en", "question as",
 ["o1 en","o1 as","o2 en","o2 as","o3 en","o3 as","o4 en","o4 as"],
 correctIndex, "explanation en", "explanation as"]
```

Run `node tools/build-history-questions.js` to expand them into
`tools/adre-grade-3.questions.history.js`; `tools/adre-grade-3.questions.js`
merges that file over its inline banks at the end, so the generated banks win
for those topic ids. The generator rejects a row with a missing bilingual
field, a wrong option count, an out-of-range answer or a duplicate question
text. Always regenerate after editing `tools/history-src/` — never edit the
generated file by hand.

### Grade III GK question banks

The larger GK topics keep their banks in `tools/gk-src/`, one file per topic,
in the same compact row shape as `tools/history-src/`. The list of topics the
generator expands is the `TOPICS` array in `tools/build-gk-questions.js`
(currently the Culture & Literature, National Parks, Brahmaputra & Barak,
Natural Resources, India Rivers/Mountains/States, Important Days, Awards,
Sports, Indian Geography, Assam & India Current Affairs and Government Schemes
topics). A topic without a source file is simply skipped:

```js
["question en", "question as",
 ["o1 en","o1 as","o2 en","o2 as","o3 en","o3 as","o4 en","o4 as"],
 correctIndex, "explanation en", "explanation as"]
```

Run `node tools/build-gk-questions.js` to expand them into
`tools/adre-grade-3.questions.gk.js`, which `tools/adre-grade-3.questions.js`
merges over its inline banks at the end (so the generated banks win for those
topic ids). Regenerate after editing `tools/gk-src/` — never edit the generated
file by hand. The generator rejects a row with a missing bilingual field, a
wrong option count, an out-of-range answer or a duplicate question text.

### Grade III Polity question banks

The three "Political Science & Constitution" topics
(`constitution-preamble-rights`, `president-pm-governor-cm`,
`panchayati-raj`) keep their large banks in `tools/polity-src/`, one file per
topic (split into `*.part2.js`, `*.part3.js` when long), in the same compact
row shape as `tools/gk-src/`:

```js
["question en", "question as",
 ["o1 en","o1 as","o2 en","o2 as","o3 en","o3 as","o4 en","o4 as"],
 correctIndex, "explanation en", "explanation as"]
```

Run `node tools/build-polity-questions.js` to expand them into
`tools/adre-grade-3.questions.polity.js`, which `tools/adre-grade-3.questions.js`
merges over its inline banks at the end. Regenerate after editing
`tools/polity-src/` — never edit the generated file by hand.

### Grade III Economy & Environment question banks

The two "Economy & Environment" topics (`indian-assam-economy`,
`environment-pollution`) keep their large banks in `tools/economy-src/`, one
file per topic (split into `*.part2.js`, `*.part3.js` when long), in the same
compact row shape as `tools/gk-src/`:

```js
["question en", "question as",
 ["o1 en","o1 as","o2 en","o2 as","o3 en","o3 as","o4 en","o4 as"],
 correctIndex, "explanation en", "explanation as"]
```

Run `node tools/build-economy-questions.js` to expand them into
`tools/adre-grade-3.questions.economy.js`, which `tools/adre-grade-3.questions.js`
merges over its inline banks at the end. Regenerate after editing
`tools/economy-src/` — never edit the generated file by hand.

### Grade III study-notes articles

`tools/adre-grade-3.notes.js` holds the crawler-facing study article for every
topic, keyed by leaf sub-category id. Each block is
`{ h2: {en,as}, p: {en:[],as:[]}, list: {en:[],as:[]}, faqs: [{q:{en,as},a:{en,as}}] }`
and `noteArticle(topicId)` in `tools/build-adre-grade-3.js` renders it below the
Q&A. The 24 elementary-mathematics topics each carry 1000+ words in **both**
English and Assamese (measured as the words in `p` + `list` + `faqs`, and again
on the rendered page). Keep the two languages parallel paragraph-for-paragraph
so the EN/AS toggle stays aligned. Source blocks for those 12 live in
`/workspace/gen/nb_*.py`; `python3 /workspace/gen/patch_notes.py` splices them
into the notes file, replacing only the keys it defines and preserving key order.

The seven History topics carry their long article in a separate module,
`tools/adre-grade-3.history-notes.js`, merged over the base NOTES in
`tools/adre-grade-3.structure.js` (the dedicated module wins per key). Each of
the seven (Assam Ancient/Medieval/Modern, Indian Ancient/Medieval/Modern, World
History) is 1300+ words in English and 1000+ in Assamese. Add new long topics
here rather than editing the base notes file, to keep that file's diff small.

The mathematics topic tree mirrors the 23-topic practice section under
`data/content/math/`. `basic-mensuration` is the Class 8/10 mensuration topic
and is kept alongside the deeper `mensuration-2d` and `mensuration-3d`. The
extra twelve topics (partnership through data-interpretation) were appended to
the hand-formatted notes file by `/workspace/gen/splice_notes.py`, which writes
the new keys as text blocks in the file's own style and leaves the existing keys
byte-for-byte untouched — never re-serialise the whole file through JSON, that
produces a multi-thousand-line diff.

### Grade III question conventions

- Numeral style: `q` and `explanation` keep Western digits in both languages
  (`20`, `12.5`); only `options[].as` uses Assamese digits (`২০`, `১২.৫`).
  The option `en` always keeps Western digits.
- The topic bank is read at runtime from the GitHub Contents API on `main`,
  not from the committed `question-001.json`. Local edits therefore only
  appear in the browser after the branch is merged to `main`; the committed
  JSON and the crawler-facing `index.html` show them immediately.
- Answer-key balance: the right option should be spread over A/B/C/D rather
  than clustered on one letter. General Mathematics now sits at 36 each across
  its 144 questions.
- The twelve added mathematics topics hold 64-164 questions each, so every topic
  in the book carries at least 60. Numeric options (bare numbers, ratios,
  fractions, powers) get Assamese digits in `options[].as`; options that carry
  words or symbols such as `sqrt` and `pi` keep the same text in both languages.

### Grade III "work in progress" notice (removed)

The Grade III book used to show a bilingual "content is still being prepared"
notice two seconds after the book opened. The question bank is complete now,
so the notice and all its wiring were deleted: `EXAM_WIP_NOTICE_IDS`,
`scheduleExamWipNotice()`, `ensureExamWipModal()`, `closeExamWipModal()`,
`examWipNoticeHTML()`, `dictStr()` and the `examWipTimer` in `js/app.src.js`,
the `exams.wipTitle` / `exams.wipMsg` / `exams.wipClose` copy in
`js/i18n.src.js`, and the `.exam-wip-*` rules in `css/style.src.css`. Run
`node scripts/minify-assets.js` then `node scripts/stamp-assets.js` after
editing the `.src` files, because the deployed `js/*.js` and `css/*.css` are
minified copies.

## Verifying a change

There is no test suite. Verify with scripts that diff the working tree against
`HEAD`:

- Confirm `canonical`, `robots`, `<title>`, `meta description`, and the visible
  text are unchanged on every touched file.
- Confirm every JSON-LD block still parses.
- Confirm tag counts (`<div`, `<main`, `<section`, ...) are unchanged.
- For visual checks, headless Chromium screenshots are available
  (`chromium --headless --no-sandbox --screenshot=...`). Compare the content
  region (below `y=60`); the header band varies between runs even on an
  unchanged file, so it is not a reliable signal.

Never change a URL, a canonical target, or `sitemap.xml` as a side effect of
a content fix.

### Icon alignment invariants

Three icon traps have already caused visible misalignment; keep these in mind
before editing icon containers or the tile builders in `js/app.src.js`.

- `iconTile(inner, color)` must not wrap `inner` when it is already a complete
  element. `catIconHTML()` returns `<span class="cat-svg"><svg>…</svg></span>`,
  and `svgWrap()` wraps a value in another `<svg>`. Nesting a `<span>` inside an
  `<svg>` makes the parser close the outer element early, leaving an empty
  18px-tall `<svg>` in front of the real icon, which pushes the glyph up and to
  the right (offX ≈ +12px, offY ≈ −3.5px). The guard is
  `/^\s*<(?:svg|span)\b/i.test(inner) ? inner : svgWrap(inner)`. A bare `<` test
  is wrong: it also matches the quick-tile path markup (`<circle`, `<path`) and
  drops their wrapper entirely.
- `.m-ico` (mobile-menu icon chip) must centre its glyph with
  `display: flex; align-items: center; justify-content: center`. A grid box
  (`place-items: center`) looks identical for a bare `<svg>`, but the category
  rows wrap their glyph in `<span class="cat-svg">`, and a grid box leaves that
  wrapper on the text baseline — the icon then sits at the tile bottom
  (measured gap 20.5px above / 0px below instead of 8/8). `.cat-svg` itself must
  also shrink-wrap (`display: flex; …`), otherwise its inherited line box is
  taller than the glyph and the icon floats above centre.
- Every id in `data/categories.json` needs an entry in `CATEGORY_ICON_SVG`
  (`js/config.src.js`). A missing entry falls back to the plain text field
  (`"A"` for `articles`), which renders invisibly inside an `<svg>` because a
  bare text node is not drawn without `<text>`, leaving a blank tile.
- The bottom tab bar mixes four `<a>` tabs with one `<button>` ("Menu").
  Buttons do not inherit the body `line-height`, so `.tab-item` pins
  `line-height: 1.6` to keep all five icons on the same row.

## Assamese (/as/) twin build order

The `/as/` tree is generated, not hand-edited. Run the steps in this order;
each one is idempotent, and running them out of order leaves stale copies:

```
node scripts/build-deep-content.js      # regenerates DEEP_CONTENT / DEEP_CONTENT_AS in js/app.src.js
node scripts/inject-faq-schema.js       # FAQPage nodes from the visible FAQ (English pages)
node tools/build-as-twins.js            # copies English pages into /as/ and rewrites the head
node tools/add-as-hub-content.js        # Assamese hub body copy
node tools/inject-as-static-pages.js    # Assamese static pages (about, contact, ...)
node tools/inject-as-extra-from-deep.js # Assamese deep-article panel on English topic/exam pages
node tools/translate-deep-content.js    # Assamese deep-content blocks on the 10 category hubs
node tools/dedupe-as-twins.js           # drop the English copy from bilingual /as/ pages
node scripts/inject-faq-schema.js       # re-run last: the twins now hold Assamese FAQ text
node scripts/minify-assets.js && node scripts/stamp-assets.js
```

`tools/dedupe-as-twins.js` must run after the twins are built and after every
generator that writes both languages into one page, because it is what removes
the English half from the Assamese URL. It covers four shapes:

- `/as/ebooks/<id>/` — drops the `lang="en"` book wrapper (`class="ebk-chapters"`).
- `/as/category/articles/<cat>/read/` — rebuilds the `<article>` Q&A list from
  `data/content/articles/<cat>.json` using the Assamese fields only.
- `/as/exams/<exam>/syllabus/` — keeps only the Assamese half of the panel.
- every other `/as/` page with a deep-article panel — drops the
  `<article|div lang="en" data-axo-lang="en" class="info-panel">` sibling that
  sits inside the `<section data-axo-extra="1">` block. The panels in
  `<section data-axo-editorial-credit="1">` are left alone: those follow the
  interface language toggle, so both halves must stay in the DOM.

It only writes under `/as/`, only when the page still carries real Assamese text
after the edit, and it is idempotent (`--check` reports drift without writing).
Without it, the `/as/` twin serves the English body and is a near-duplicate of
its English counterpart.

`js/app.src.js` selects `DEEP_CONTENT_AS` over `DEEP_CONTENT` when
`state.lang === "as"`, so the pre-rendered Assamese HTML and the runtime agree.
`scripts/inject-faq-schema.js` must run after the twins are built: it reads the
visible FAQ, so an `/as/` page that is still English at that point gets an
English FAQPage node. It declares `inLanguage` from the page path and counts
boilerplate per language, so a translated twin is not dropped as a duplicate of
its English counterpart.
