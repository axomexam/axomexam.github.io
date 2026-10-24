# AGENTS.md

Static bilingual (English + Assamese) exam-prep site served from the repository
root by GitHub Pages at https://axomexam.in. There is no build step at deploy
time: the committed `index.html` files are what GitHub Pages serves.

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

## Answering "why is my content invisible to AdSense"

The site ships a static block outside `<main id="app">` on most pages. That is
deliberate: `renderRoute()` replaces `#app` on load and navigation, so content
placed *inside* `<main>` is destroyed for real visitors and never seen. The
static block is the crawler/no-JS copy. Do not move it inside `<main>`.

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
