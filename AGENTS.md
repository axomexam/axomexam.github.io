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

## Standing rules — do not lose content, do not change the UI

These apply to every change in this repo. They come from the site owner and
they outrank any cleanup, refactor or "nice to have" an agent might want to do.

- **Never lose content.** No sentence, question, answer, note or FAQ item may
  be dropped, shortened or reworded to make a tool's job easier. If a
  generator wants to rewrite a body, diff it against `HEAD` first and revert
  anything that is not the change you were asked to make.
- **Never change the UI.** Markup, CSS classes, layout, spacing and the
  client-side render path stay as they are. A content or SEO fix must be
  invisible to a reader looking at the page.
- **No ad code on the Assamese (`/as/`) pages.** Assamese is not a supported
  AdSense language. `tools/build-as-twins.js` strips the loader; never add it
  back to a `/as/` page. Only indexable English content pages carry the loader
  (see the loader policy below).
- **Every page gets its own accurate, topic-wise SEO head.** Title,
  description, canonical, hreflang and JSON-LD must describe *that* page's
  actual topic, in the reader's language, with no clamping (`…`), no template
  filler and no duplicate across pages. `tools/seo-audit.js` must stay at
  `dup titles: 0`, `dup descriptions: 0`, `title >60 chars: 0` and
  `desc >160 chars: 0`.
- **All content must be readable by Googlebot with JavaScript off.** The
  crawler copy is the static block *outside* `<main id="app">`; do not move it
  inside `<main>` and do not hide it behind JS. Verify with a Googlebot user
  agent that the URL returns 200, is not `noindex`, and has real words.
- **No broken hreflang.** Every `hreflang="as"` target must exist, and the
  pair must be reciprocal. `tools/seo-audit.js` reports a miss as
  `sitemap alt miss`; it must stay at 0.
- **Verify before shipping.** Run `node tools/seo-audit.js` and confirm
  `thin (<300w): 0`, `missing H1/desc/canonical/JSON-LD: 0`, and the duplicate
  counts above, then check the live URLs return 200 after the Pages build.
- **Keep internal files out of the published site.** `.nojekyll` (repo root)
  and the `Disallow` list in `robots.txt` are load-bearing. Do not delete
  `.nojekyll`, and when you add or remove a path in `robots.txt`, change
  **both** groups. See the two gotchas below.

## Gotcha: `.nojekyll` is load-bearing — do not remove it

The repo serves from `main:/` with GitHub Pages in **legacy** build mode. With
no `.nojekyll`, GitHub runs Jekyll over the repo, and Jekyll turns every root
`*.md` into a published, indexable page rendered in its own theme:

| URL | What it was |
| --- | --- |
| `/AGENTS.html` | this handbook, ~11k words, indexable, no `robots` meta |
| `/SEO-AUDIT.html`, `/SEO-ACTION-PLAN.html` | the internal SEO notes |
| `/AGENTS.md`, `/SEO-*.md` | the raw markdown, served as `text/markdown` |

Jekyll also served its theme CSS at `/assets/css/style.css` (never in the
repo), so those pages looked like part of the site. Search and the AdSense
review saw a large off-topic page wearing the site's own theme, next to the
keyword research in `keyword-map.csv`.

`.nojekyll` at the repo root switches Jekyll off, so only committed files are
served and no `*.md` becomes a page. Nothing else changed: every real page's
bytes were identical before and after (md5 compared), and the only other
casualty is `/assets/css/style.css`, which nothing in the repo links.

Do not "clean up" `.nojekyll` as an empty file — it is the switch.

## Gotcha: a named `User-agent` group replaces the `*` group

`robots.txt` lists 32 named crawlers (Googlebot, Mediapartners-Google, GPTBot,
Bingbot, …). In robots.txt a group that names a user-agent **replaces** the
`*` group for that crawler — it does not merge with it. While the named groups
carried only `Allow: /`, the `Disallow: /dist/` on the `*` group never applied
to Googlebot or to any named crawler, and the same would have been true of
every internal-path `Disallow` added later.

The file therefore repeats the full `Disallow` list inside the named group.
Change **both** groups together, then check the result against the matching
rules (longest matching path wins; `Allow` wins a tie) for Googlebot,
Mediapartners-Google and `*` before pushing.

`/data/` must stay crawlable and is not blocked: the SPA fetches
`/data/mock-test/*.json` at runtime and the previous-year pages link
`/data/**/*.pdf`.

## Session record — Nov 2026 internal-file exposure fix

What was done, so the next agent does not redo or undo it:

- **Bug.** GitHub Pages was running Jekyll on the repo (no `.nojekyll`), so
  the root markdown files were republished as indexable pages in Jekyll's own
  theme: `/AGENTS.html` (~11k words), `/SEO-AUDIT.html`,
  `/SEO-ACTION-PLAN.html`, plus the raw `*.md` served as `text/markdown`. The
  root CSV exports and the tooling under `/tools/`, `/scripts/`, `/android/`
  and the unminified `*.src.js` also returned 200. None of it carried a
  `robots` meta, and `keyword-map.csv` exposed the keyword research.
- **Fix.** Added `.nojekyll` (Jekyll off) and extended `robots.txt` with the
  internal paths. Commit `08bef80848`.
- **Latent bug found at the same time.** The 32 named user-agent groups in
  `robots.txt` each carried only `Allow: /`, and a named group replaces the
  `*` group, so the pre-existing `Disallow: /dist/` had never applied to
  Googlebot or to any named crawler. The named group now repeats the full
  `Disallow` list.
- **Verified.** A spec implementation of the Google matching rules passed
  21/21 cases across Googlebot, Mediapartners-Google, GPTBot, Bingbot and
  `*`. Live after the Pages build: `/AGENTS.html`, `/SEO-*.html` and
  `/assets/css/style.css` return 404, every sampled real page is 200 with an
  unchanged md5, `sitemap.xml` is byte-identical (2380 URLs), and
  `/data/**/*.json`, `/data/**/*.pdf`, `/app/*.apk` and `/js/*.js` still
  return 200. No page, content or UI file changed.
- **Still open for the owner.** The three raw `*.md` still return 200 at the
  server (GitHub Pages has no way to refuse a committed file); they are now
  `Disallow`ed and unlinked, so they should drop out of the index. To remove
  them from the server as well, move them under an excluded directory or stop
  committing them.

## Session record — Nov 2026 Assamese twin + head repair

What was done, so the next agent does not redo or undo it:

- **Bug.** Every `exam-wise-mock-test/{assam-police,dhs-dme,dhs-dme-grade-4,dhs-dme-technical}/set-6..10`
  English page advertised `hreflang="as"` at an `/as/` twin that had never
  been generated (the twin pass was skipped when those sets were added in
  `cd5ab28ca2`). 20 English pages pointed Google at a 404.
- **Fix.** Built the 20 missing twins with `tools/build-as-twins.js`, then
  added `tools/fix-as-twin-heads.js` to repair the clamped Assamese head
  strings from a clean sibling. `sitemap.xml` was regenerated so all 20 pairs
  carry `en` / `as` / `x-default` alternates.
- **Gotcha found while fixing.** A first version of `fix-as-twin-heads.js`
  read the field value from capture group 1; for the description patterns
  group 1 is the markup prefix, so it wrote
  `content="name="description" content=""` and left 15 titles clamped. The
  tool now captures the value in group 2 and rewrites through a replacer that
  keeps the surrounding bytes, and it only touches a head that still carries
  the builder's `…`, so it is idempotent.
- **Verified live.** All 20 twins return 200, `en`↔`as` hreflang is
  reciprocal on both sides, a 70-page Googlebot sample had 0 problems, and
  2379/2380 sitemap URLs returned 200 (one transient 503 that passed on
  retry). `seo-audit` reports `sitemap alt miss: 0`, `thin (<300w): 0`, and
  zero duplicates.
- **Still open for the owner.** Resubmit `sitemap.xml` in Search Console so
  the new `/as/` URLs are recrawled. The "low value content" rejection was
  already addressed by the Nov 2026 content sweep; this change removed a
  crawlability defect that sat on top of it.

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

## Gotcha: copied `<head>` chrome drags the donor page's hreflang along

`tools/build-adre-grade-3.js` builds each page by copying the Grade IV
`elementary-mathematics/number-system` leaf's whole `<head>` and swapping only
the page-specific tags. `pageHead()` originally swapped title, description,
canonical, og/twitter and JSON-LD but not the three
`<link rel="alternate" hreflang=…>` tags, so every Grade III page declared the
Grade IV number-system page as its own en/as/x-default alternate. Google then
read the whole Grade III cluster as alternates of one unrelated leaf.

Any generator that reuses another page's `<head>` must rewrite the hreflang
block too. `pageHead()` now derives all three from `opts.canonical`. The 122
committed pages were repaired in place (hreflang lines only).

## Gotcha: `build-as-twins.js` clamps long Assamese titles with a literal `…`

`clamp()` in `tools/build-as-twins.js` trims any Assamese head string that
runs over 58 characters at a word boundary and appends `…`. Assamese runs
longer than English for the same idea, so ~450 `/as/` pages carry a title that
ends mid-phrase — sometimes after the brand (`… প্ৰশ্নোত্তৰ |…`), which is
worse than a plain long title. Re-running the builder does not fix this: it
re-derives the same clamp, and it also drags in unrelated body drift, so do
not regenerate to fix heads.

The committed `/as/` titles were repaired in place from each page's own
(untruncated) `<h1>`, clamped at a word boundary without the ellipsis, with a
uniqueness pass against every other title and `| axomexam` appended where it
fits under 60 characters. If you re-run the builder and the `…` returns,
re-apply that head-only repair rather than committing the regenerated body.

`tools/fix-as-twin-heads.js` automates that repair for the mock-set twins. It
copies the head wording of the family's highest set twin whose head is already
clean and substitutes the set number, so a repaired twin matches its committed
siblings byte for byte. It only touches `<title>`, `og:title`,
`twitter:title` and the three description fields, and skips a twin whose head
has no ellipsis, so it is idempotent. Run it after `tools/build-as-twins.js`:

```
node tools/fix-as-twin-heads.js            # dry run
node tools/fix-as-twin-heads.js --apply
```

## Gotcha: a new set page needs its `/as/` twin, or the EN page ships a 404 hreflang

`tools/build-exam-wise-mock-pages.js` points every set page's head hreflang
trio at the `/as/` twin (`setHead()` builds `asURL` unconditionally). It does
not create that twin — `tools/build-as-twins.js` does, in a separate pass. If
the builder runs for a new set but the twin pass does not, the EN page
advertises an `hreflang="as"` URL that 404s, and `tools/seo-audit.js` reports
it as `sitemap alt miss`. Always run `build-as-twins.js` after adding sets
(this is what left the 20 `dhs-dme*` / `assam-police` set-6..10 twins missing
until the Nov 2026 sweep), then `tools/seo-indexing-fix.js` so the sitemap
picks up the new `/as/` URLs and their alternates.

Do not use `--only` to build a single twin: `rewriteInternalLinks()` prefixes a
link with `/as/` only when the target is in `twinSet`, which `--only` narrows
to one page, so the rebuilt twin leaks `/category/...`-style links. Run the
full `build-as-twins.js` instead.

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
node tools/fix-as-twin-heads.js     # repair clamped (…) heads from a clean sibling
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

`tools/seo-indexing-fix.js` only *keeps or drops* URLs already present in
`sitemap.xml`; it never adds a brand-new route. A freshly built page therefore
will not appear in the sitemap until its `<url>` block is inserted by hand.
When adding mock-test sets, append the new blocks next to their siblings (after
the matching `set-<n-1>` entry) with the same `<lastmod>` and the en/as/
x-default `xhtml:link` trio, then run `tools/seo-indexing-fix.js` to normalize
and re-verify with `tools/seo-audit.js`. Do not run the tool against a
hand-edited file that is out of its sort order first: it rewrites the whole
`<urlset>` ordering and produces a huge diff that obscures the real additions.
Inserting after the sibling keeps the diff to just the new blocks.

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

  Gotcha for a brand-new set page: the shell carries the hreflang trio of its
  own reference URL (`.../topic/math/arithmetic/boats-and-streams/`), and
  `build-mock-set-pages.js` does not rewrite it, so a freshly created set page
  inherits the math page's hreflang until it is corrected. After adding new
  sets, fix the trio on each new page (or run `tools/build-as-twins.js`, which
  rewrites it) and confirm `hreflang="en"` points at the set's own URL.
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

## AdSense loader policy — which pages carry the loader

The loader is `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4574824794620382" crossorigin="anonymous"></script>`,
placed once in `<head>`, right after the AdSense comment and before the
`html2canvas & jsPDF load on demand` comment. Only the loader lives in the
page; ad units are never hand-written into the HTML.

Rule (from Google's AdSense Program Policies, "Ad placement"): *"Google ads
... may not be placed on any non-content-based page"*, and none may be placed
on pages that are still under construction. So:

- **Loader present** — every indexable page with real study content: the
  homepage, `/topic/**`, `/exams/**` subject and section pages, `/mock-test/**`,
  `/categories/`, `/downloads/`, `/ebooks/`, `/exam-wise-mock-test/**`
  published exams, and `/topic/trending/**` content pages.
- **Loader absent** — legal, utility and trust pages (`/privacy/`, `/terms/`,
  `/disclaimer/`, `/about/`, `/contact/`, `/submit/`, `/download-app/`,
  `/editorial-policy/`, `/editorial-team/`, `/sources/`, `/updates/`), and
  every `noindex` page (Coming Soon exam pages, redirect stubs, search). These
  are non-content pages: ads there are a policy risk, not a win.

Three commits already enforce this for the older pages (`0b3d637d15`,
`055fe253a5`, `3057614748`); the 32 content hub pages were re-covered in the
Nov 2026 sweep once `tools/enrich-hub-study.js` had grown them past the
500-word bar. `tools/build-exam-wise-mock-pages.js` strips the loader from
its Coming Soon pages because it copies the head from a topic page.

Verify before shipping:

```
# indexable pages with the loader / noindex pages with the loader
grep -rl 'adsbygoogle.js' --include=index.html . | ...
# expected: noindex-with-loader = 0
```

Assamese (`/as/`) pages never carry the loader: Assamese is not a supported
AdSense language, and `tools/build-as-twins.js` strips it when it builds the
twins. Do not re-add it there.

## Exam-wise Mock Test portal (`/exam-wise-mock-test/`)

A separate top-level portal (sibling of `/mock-test/` and `/ebooks/`), not
nested under `/mock-test/`. Each published exam gets its own full-paper
(mixed-subject) timed mock test, 5 sets per exam by default. Assam Police,
ADRE Grade III, ADRE Grade IV and the three DHS & DME books (`dhs-dme`,
`dhs-dme-technical`, `dhs-dme-grade-4`) are live; the question count per set
comes from the exam's blueprint (100 for the first five, 50 for
`dhs-dme-grade-4`).

- Data: `data/exam-mock-sets/<examId>/set-N.json` (generated by
  `tools/build-exam-mock-sets.js`), plus a tiny `data/exam-mock-sets/<examId>/index.json`
  manifest (`{count, sets:[...]}`) written by the same tool. The runtime reads
  the manifest (`API.getExamMockIndex`) to learn how many sets exist in one
  small request; without it `detectExamMockSets` would probe set-1..set-N
  sequentially, each ~110 KB, before the picker could paint. Keep the manifest
  in step with the sets — the builder writes both.
- Paper blueprint: `data/exam-mock-sets/blueprints/<examId>.json` fixes the
  section-wise paper (Assam Police: Section A Assam history/geography/culture
  25, B India GK/current affairs 25, C elementary maths 20, D reasoning 15,
  E English 15 — 100 questions, 120 minutes, 50 marks, 0.5 mark per question,
  no negative marking). When a blueprint exists the builder follows it exactly:
  each set draws its fixed count from every section, round-robined across the
  section's sub-categories, and each of the 5 sets takes a *different* slice of
  every section, so no question repeats across a set. With no blueprint the
  builder falls back to a seeded whole-bank shuffle + slice (the ADRE books
  still use this). The blueprint is copied into each set JSON under `blueprint`
  so the runtime and the static builder can show the same details.
- More than 5 sets, and harder ones: a blueprint may carry a `sets` field
  (ADRE Grade III, ADRE Grade IV and Assam Police SI all set `"sets": 10`). The
  first `SETS_PER_EXAM` (5) stay balanced — each takes its slice of the whole
  shuffled section pool.
  The extra sets are the *harder* ones: `hardPoolOrder` scores every remaining question by
  its position in its leaf (banks are written easiest-first, weighted 0.6) and
  its text length (weight 0.4), keeps the hardest `extraCount x need` per
  section, interleaves the leaves so subject coverage is kept, and deals them
  round-robin so the extra sets stay even with one another. Both modes seed a
  `mulberry32` PRNG from `seedFor(...)`, so a rebuild rewrites identical bytes.
  Adding `sets` to a blueprint does not touch the balanced sets — sets 1-5 stay
  byte-identical.
- Dedicated extra bank (used when the exam's own `data/exams/<id>` pool is too
  small to fill the extra sets without repeating a question already live on the
  site): `tools/build-exam-mock-sets.js` also reads
  `data/exam-mock-sets/extra/<examId>/<section>/question-*.json` and merges it
  into the section pool before slicing. The extra sets then draw from the merged
  pool, so a bank of exactly `extraCount x need` fresh questions per section
  fills sets 6-10 with nothing reused. Generate it with a per-exam Python
  authoring tool (`tools/gen-<exam>-extra.py` + a `tools/<abbrev>/` package of
  `common.py` + one module per section), which writes the bank and rotates each
  question's options with a seeded shuffle so answer keys stay balanced.
  `tools/gen-dhs-dme-extra.py` + `tools/dtn/` is the reference (DHS & DME
  Non-Technical, 535 questions across 5 sections; `tools/dtx/` is the Technical
  twin and `tools/dhg4/` the Grade IV one, 253 questions across 3 sections).
  Before committing, verify uniqueness against the *whole* site: collect
  every stem in `data/**/*.json`, exclude the source exam pool, its sets 1-5 and
  the extra bank itself, and confirm the new sets' stems do not intersect.
  Questions whose natural phrasing clashes with an existing site stem are
  reworded via a `reword.py` map rather than dropped.
- Static pages: `tools/build-exam-wise-mock-pages.js` writes
  `/exam-wise-mock-test/` (hub), `/<examId>/` (set picker) and
  `/<examId>/set-N/`. Assamese twins come from `tools/build-as-twins.js`.
  A set page is *live* (setup panel + the full bilingual question list) once its
  set JSON carries a `blueprint`; otherwise it renders the "system upgrade"
  notice.
- Runtime: `js/app.src.js` — `handleExamWiseMockRouting`, `renderExamWisePicker`,
  `renderExamWiseSetPicker`, `renderExamWiseStart` (shared quiz engine,
  `API.getExamMockSet` → `normalizeMockQuestion`), `renderMockStartPanel`
  (language select, count picker, instructions; shows Time + Total Marks and the
  4th instruction rule when the set carries a `blueprint`).
- `examWiseIsLive(id)` gates set access per exam: an exam is playable once its
  blueprint is published (`EXAM_WISE_LIVE`, currently `["assam-police"]`).
  `EXAM_WISE_FORCE_UPGRADE = true` takes the whole portal down again. A gated set
  URL renders `renderExamWiseUpgrade`: the professional setup panel (language +
  instructions) with a disabled Start button, plus the bilingual popup
  `showExamWiseUpgradePopup()` ("system upgrade ho raha hai / question-answer ban
  raha hai, 1-2 ghante baad check kijiye"). The subject-wise mock tests are
  unaffected and keep the 3-2-1-0 countdown (`showMockIntro`).
- Bilingual notices that must show both languages at once use `tLang(key, lang)`
  (fixed-language lookup), NOT `t()` twice — `t()` follows the interface toggle,
  so calling it for "en" and "as" renders the same string twice.
- Detailing panels (`hubContent()`, `examContent()`, `setContent()`) are written
  *inside* `<main id="app">`, which `renderRoute()` replaces on load. They are
  therefore the crawler / no-JS copy only. For real visitors the same text is
  re-appended by `appendSeoFaq(main, …)` in `renderExamWisePicker`,
  `renderExamWiseSetPicker` and `renderExamWiseUpgrade` (`examWiseHubSeo`,
  `examWiseExamSeo`, `examWiseSetSeo`). Edit the builder and the renderer
  together or the two copies drift.
- Build order after editing: `node tools/build-exam-wise-mock-pages.js` →
  `node tools/build-as-twins.js` → `node scripts/minify-assets.js` →
  `node scripts/stamp-assets.js`. The coming-soon pages are `noindex`, so
  `build-as-twins.js` skips them — do not link a coming-soon EN page to an
  `/as/` twin, or the link 404s.

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
  `pageHead()` strips the borrowed leaf's hreflang trio before writing, so each
  page gets the correct pair from `build-as-twins.js` afterwards (a borrowed
  canonical pair would otherwise point every new page at the Grade IV leaf).
- The three DHS & DME books (`dhs-dme`, `dhs-dme-technical`, `dhs-dme-grade-4`)
  are generated by `tools/build-dhs-dme.js` from
  `tools/dhs-dme.structure.js`, sharing one question pool. Each book declares a
  `POOL_CURSOR` offset so the books take disjoint slices; a published/used-text
  set in the builder drops any question whose text already appeared in an
  earlier book, so no question repeats across the three books.
- The Assam Police SI book (`assam-police-si`) is generated by
  `tools/build-assam-police-si.js` from `tools/assam-police-si.structure.js`.
  It is the degree-level companion of `assam-police` and draws its bank from
  the constable book's leaves plus the shared `data/mock-test` pools, so it
  deliberately does *not* seed `assam-police` as a used-text source; it does
  seed every *other* book and every published `data/exam-mock-sets/*/set-*.json`
  (except its own), so no SI question repeats a live mock question. Its pages
  are built by the shared `tools/lib/exam-book-pages.js` (also used by
  `tools/build-dhs-dme.js`). The SI paper is 100 Q / 100 marks / 180 min / 1
  mark per question / 0.5 negative marking, in three parts (Reasoning &
  Aptitude 35, GK/Science/Current Affairs 35, Assam History/Geography/Culture
  30) — see `data/exam-mock-sets/blueprints/assam-police-si.json`.
- `data/exam-mock-sets/blueprints/<exam>.json` drives the full-paper sets.
  `tools/build-exam-mock-sets.js` reads it and distributes the set's questions
  across the blueprint's sections. The exam-wise hub order is curated in
  `EXAM_HUB_ORDER` in both `tools/build-exam-wise-mock-pages.js` and
  `js/app.src.js` (keep them in sync); an exam becomes playable once it is
  added to `EXAM_WISE_LIVE` in `js/app.src.js`.
- `data/exams/index.json` is hand-formatted with compact one-line sub-category
  objects. The builder splices its entry into the raw text instead of
  re-serialising, so running it never reformats the other exams. Preserve that
  when editing the registration block.

## Android app (APK) — the home banner counts

`android/` is a thin WebView shell (`MainActivity.java`) that loads the live
site (`HOME_URL = https://axomexam.in/`) and injects its own promo banner on
the home route (`#axo-banner`), hiding the site hero with CSS. The banner used
to carry **hardcoded** question / topic counts baked into the APK
(`51,221+ questions / 574+ topics`), so it went stale the moment the site
gained questions — the installed app kept showing the old number while the web
hero moved on.

Two independent fixes keep it honest, and both should stay:

1. **Site-side (`js/app.src.js` → `syncAppBanner` / `watchAppBanner`).** The
   shell only *hides* the hero with CSS, so the hero's live counters
   (`#stat-total-questions`, `#stat-total-topics`, filled from `counts.json`)
   are still in the DOM. `syncAppBanner` copies them onto the banner's
   `.axo-banner-stats` tiles and the two prose lines, and `watchAppBanner`
   re-runs it on `#app` mutations because the shell re-injects the banner on
   every route change. This corrects **already-installed** APKs without a
   rebuild, since they load the live page. It is a no-op in a normal browser
   (no `#axo-banner` there).
2. **Native (`MainActivity.java` → `APP_CSS_JS`).** The banner markup now uses
   `{Q}` / `{T}` placeholders instead of literals, and `axoFillBanner()` swaps
   them for the hero counters after injecting the banner. So a future APK build
   is correct by construction and never flashes a stale number.

The APK cannot be built in the agent sandbox: it needs the Android SDK + JDK
and the release keystore (`axomexam-release.jks`, via `AXO_KEYSTORE` /
`AXO_STORE_PASS` / `AXO_KEY_ALIAS` / `AXO_KEY_PASS`), which is a secret. After
editing `MainActivity.java`, rebuild with `./gradlew assembleRelease` and bump
`versionCode` / `versionName` in `android/app/build.gradle`, then drop the new
`app/axomexam-v<ver>.apk` in place and update the version string on
`/download-app/` (`js/app.src.js` + `tools/prerender.js`, and the APK filename
in both). Because of fix (1), a stale APK on someone's phone still shows the
correct count as soon as it reloads the site — the native fix only removes the
build-time drift.

`tools/build-adre-grade-3-cover.js` renders the book cover to
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
(`topicCounts` + `examsTotal` + `mockTotal` from `data/counts.json`, plus
current-affairs and trending questions). The root `index.html` is served as-is
(prerender writes to the gitignored `dist/`, it does not own the homepage), so
the hero number used to be hand-edited and drifted stale every time questions
were added. Run it after `build-question-counts.js`; `--check` reports drift
without writing.

The mock-test question count is the `mockTotal` field
`tools/build-question-counts.js` writes to `data/counts.json`. The mock banks
(`data/mock-test` and the published `data/exam-mock-sets` set files) are built
*from* the practice (`data/content`) and exam-book (`data/exams`) banks, so most
of their questions already sit in the banks the hero counts. `mockTotal` is only
the questions that are genuinely new, computed by `tools/lib/question-bank.js`
(`mockQuestionsNotInCore`), which fingerprints every question (stem + options,
or the current-affairs stem + answer) and drops the ones that already appear in
the practice / exam banks. Adding the raw mock totals instead would roughly
double-count them. `exam-mock-sets/extra/` is build-time input only (its
questions are copied into the published sets), so it is deliberately not counted
on its own. `js/app.src.js` reads `counts.mockTotal` in
`applyPrecomputedCounts` and adds it in `renderHome` / `updateHeroTotals`;
`tools/prerender.js` adds the same field to the prerendered `dist/` copy. If a
new mock bank is added, include it in `mockQuestionsNotInCore` too.

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

## Pushing

Before every push, confirm the remote tip is an ancestor of `HEAD` so no other
contributor's work is overwritten:

```
git fetch origin && git merge-base --is-ancestor origin/main HEAD && echo SAFE
```

The git credential-helper token may be read-only for this repo (push fails with
`403 ... denied`). When that happens, push once with a write-enabled PAT in the
URL rather than changing the stored remote:

```
git push https://<PAT>@github.com/axomexam/axomexam.github.io.git main
```

GitHub Pages rebuilds automatically; poll
`/repos/axomexam/axomexam.github.io/pages/builds/latest` until `status` is
`built`, then spot-check the new URLs return 200.

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
node tools/fix-as-twin-heads.js         # repair clamped (…) heads from a clean sibling
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
