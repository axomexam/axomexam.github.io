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

## Architecture

- `js/app.src.js` is the client-side router and renderer. It replaces the
  contents of `<main id="app">` on every navigation. Anything inside `<main>`
  in the committed HTML is only ever seen by crawlers (and by users before JS
  boots).
- `data/*.json` holds the category/topic/question source of truth.
- `tools/prerender.js` writes the committed HTML from that data.
- `scripts/` and `tools/` contain one-shot content generators. Most are
  idempotent and accept `--check` to report without writing.

## Language model

Both languages live in the same document and the same URL. The toggle is
client-side, driven by the custom `data-axo-lang="en|as"` attribute plus
`body[data-lang]` / `body[data-ui-lang]`. `css/style.css` keys all show/hide
behaviour on `data-axo-lang`, never on the `lang` attribute. So adding or
changing `lang="..."` is safe for layout.

There is no hreflang and there should not be one: there are no separate URLs
per language. `lang="en"` on `<html>`, `lang` on the per-language blocks,
`inLanguage: [en, as]` in the JSON-LD, and `og:locale`/`og:locale:alternate`
carry the bilingual signal.

## Gotcha: do not run tools/latest-schema.js

`tools/latest-schema.js` is stale. Running it deletes the FAQPage node from
every page (593 -> 0) and rewrites `sitemap.xml` and the nav. It was reverted
once already. Use the targeted tools below instead.

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

## Reading progress bar

`js/app.src.js` keeps one shared scroll-progress strip (`#ebk-progress`, styled
by `.ebk-progress` in `css/style.src.css`) for every long reading page. Call
`showReadProgress(color)` after the page content is painted; `renderRoute()`
calls `clearReadProgress()` so the bar never leaks across navigations. It is
wired on the e-book reader, free-practice topic pages, article/study-guide
pages, current-affairs category pages and exam chapter pages. Short picker
pages intentionally have no bar.

## Answering "why is my content invisible to AdSense"

The site ships a static block outside `<main id="app">` on most pages. That is
deliberate: `renderRoute()` replaces `#app` on load and navigation, so content
placed *inside* `<main>` is destroyed for real visitors and never seen. The
static block is the crawler/no-JS copy. Do not move it inside `<main>`.

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
node tools/sync-home-hero-count.js
node tools/inject-static-questions.js
node tools/enrich-thin-pages.js
node tools/extract-deep-articles.js
```

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

`enrich-thin-pages.js` rewrites the 8 hub pages the builder emits, so the
committed state is post-enrichment. A build on top of it reports those 8 pages
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

### Grade III "work in progress" notice

The Grade III book ships with its syllabus and topic tree but a partly filled
question bank. Opening that book shows a bilingual notice two seconds after
the page settles. It is implemented in `js/app.src.js`:

- `EXAM_WIP_NOTICE_IDS` lists the exam ids that get the notice; today only
  `adre-grade-3`. `scheduleExamWipNotice(examId)` is called at the end of
  `renderExamPage`, so any other book is unaffected.
- The timer is module-scoped (`examWipTimer`) and cancelled by
  `closeExamWipModal()`, which `renderRouteInner` calls on every navigation —
  so navigating away within the two seconds prevents it from firing.
- Copy lives under `exams.wipTitle` / `exams.wipMsg` / `exams.wipClose` in
  `js/i18n.src.js`. Both languages are printed at once via `dictStr()` rather
  than following the UI toggle.
- The modal reuses the `.read-modal` shell, so it inherits the dark-theme and
  mobile styles.

To retire it once the questions are complete, delete the
`scheduleExamWipNotice(examId)` call in `renderExamPage` (and the now-unused
`EXAM_WIP_NOTICE_IDS` entry). `node scripts/minify-assets.js` then
`node scripts/stamp-assets.js` must be re-run after editing the `.src` files,
because the deployed `js/*.js` are minified copies.

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
