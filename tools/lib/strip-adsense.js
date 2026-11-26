"use strict";

/*
 * tools/lib/strip-adsense.js
 *
 * Removes every trace of AdSense from a page.
 *
 * Assamese is not a language AdSense supports, and Google's publisher
 * policies forbid ad code on a page whose content is primarily in an
 * unsupported language. The site therefore keeps AdSense on the English
 * pages only and strips it from every /as/ twin.
 *
 * "AdSense footprint" is all four pieces the English pages carry:
 *   1. the site-ownership meta  <meta name="google-adsense-account" …>
 *   2. the googlesyndication dns-prefetch <link>
 *   3. the `<!-- Google AdSense Script -->` comment
 *   4. the ad-serving loader <script …adsbygoogle.js…>
 * plus the ad reservations inside <style id="axo-layout-reserve"> — the
 * `ins.adsbygoogle` / `.google-auto-placed` rules. The `.main-nav` rules in
 * that same block are not ads: they reserve the JS-built desktop nav, so they
 * are kept and the Assamese page keeps its English twin's layout-shift
 * behaviour.
 *
 * Used by tools/build-as-twins.js (so a rebuild cannot re-introduce the
 * footprint) and by tools/strip-adsense-from-as.js (to clean the tree).
 */

const LOADER =
  /[ \t]*<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-[0-9]+" crossorigin="anonymous"><\/script>\n/;
const META = /[ \t]*<meta name="google-adsense-account"[^>]*>[ \t]*\n?/g;
const DNSPREFETCH =
  /[ \t]*<link rel="dns-prefetch" href="https:\/\/pagead2\.googlesyndication\.com"[^>]*>[ \t]*\n?/g;
const COMMENT = /[ \t]*<!-- Google AdSense Script -->[ \t]*\n?/g;
const OLD_AD_BLOCK =
  /[ \t]*<!--[^\n]*Reserve space for Google Auto Ads[^\n]*-->\n[ \t]*<style id="axo-ad-reserve">[\s\S]*?<\/style>[ \t]*\n?/;
const RESERVE_BLOCK =
  /[ \t]*<!--[^\n]*Reserve space for Google Auto Ads[^\n]*-->\n[ \t]*<style id="axo-layout-reserve">[\s\S]*?<\/style>[ \t]*\n?/;

/* The nav-only block an already-stripped Assamese page carries. Normalising it
   to the current NAV_RESERVE_BLOCK keeps the reserved heights in step when the
   desktop nav's own height changes. */
const NAV_ONLY_BLOCK =
  /[ \t]*<!--[^\n]*Reserve space for the JS-built desktop nav[^\n]*-->\n[ \t]*<style id="axo-layout-reserve">[\s\S]*?<\/style>[ \t]*\n?/;

const NAV_RESERVE_BLOCK = [
  "  <!-- Reserve space for the JS-built desktop nav (prevents layout shift / CLS) -->",
  '  <style id="axo-layout-reserve">',
  "    @media (min-width: 901px) and (max-width: 1240px) { .main-nav { min-height: 82px; } }",
  "    @media (min-width: 1241px) { .main-nav { min-height: 95px; } }",
  "  </style>",
  "",
].join("\n");

function stripAdsense(html) {
  let out = html;
  out = out.replace(LOADER, "");
  out = out.replace(META, "");
  out = out.replace(DNSPREFETCH, "");
  out = out.replace(COMMENT, "");
  out = out.replace(OLD_AD_BLOCK, "");
  if (RESERVE_BLOCK.test(out)) {
    out = out.replace(RESERVE_BLOCK, NAV_RESERVE_BLOCK);
  } else {
    out = out.replace(NAV_ONLY_BLOCK, NAV_RESERVE_BLOCK);
  }
  return out;
}

module.exports = { stripAdsense };
