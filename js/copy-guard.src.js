/* ============================================================
   Copy guard
   ------------------------------------------------------------
   The rule block at the end of css/style.src.css already makes the
   page content unselectable. This file adds what CSS cannot cancel:
   the gestures that still reach the content (Ctrl+C on a selection
   made before the stylesheet applied, the context menu, dragging an
   image out of a question) and the centred popup that explains why.

   Only #app and the reading modal are guarded. The header search,
   form fields, code inputs and the Share buttons keep working, and
   nothing here touches what a crawler reads.
   ============================================================ */
(function () {
  "use strict";

  if (window.__axoCopyGuard) return;
  window.__axoCopyGuard = true;

  /* The contact pages opt out: a visitor has to be able to copy the email
     address and paste their own message. The attribute sits on <body>, which
     is parsed by the time this deferred script runs. */
  if ((document.body || document.documentElement).hasAttribute("data-axo-copy-page")) return;

  var GUARDED = "#app, #read-modal";
  var ALLOW =
    "input, textarea, select, option, " +
    "[contenteditable]:not([contenteditable='false']), [data-axo-copy-allow]";

  var MESSAGES = {
    en: {
      title: "Copying is off",
      body: "Please read the question and answer here on axomexam.",
    },
    as: {
      title: "কপি কৰাটো বন্ধ",
      body: "অনুগ্ৰহ কৰি প্ৰশ্ন আৰু উত্তৰ ইয়াতে পঢ়ক।",
    },
  };

  var ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/>' +
    '<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>' +
    '<circle cx="12" cy="15.6" r="1.1" fill="currentColor" stroke="none"/></svg>';

  function lang() {
    var value =
      (document.body && document.body.getAttribute("data-lang")) ||
      document.documentElement.lang ||
      "en";
    return String(value).toLowerCase().indexOf("as") === 0 ? "as" : "en";
  }

  function elementOf(node) {
    if (!node) return null;
    return node.nodeType === 1 ? node : node.parentElement;
  }

  function selectionNode() {
    var sel = window.getSelection && window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    return sel.getRangeAt(0).commonAncestorContainer;
  }

  function isGuarded(node) {
    var el = elementOf(node);
    if (!el || !el.closest) return false;
    var root = el.closest(GUARDED);
    if (!root) return false;
    var allowed = el.closest(ALLOW);
    return !(allowed && root.contains(allowed));
  }

  var hideTimer = 0;
  var lastShownAt = 0;

  function popup() {
    var now = Date.now();
    if (now - lastShownAt < 900) return;
    lastShownAt = now;

    var el = document.getElementById("axo-copy-pop");
    if (!el) {
      el = document.createElement("div");
      el.id = "axo-copy-pop";
      el.className = "axo-copy-pop";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.innerHTML =
        '<div class="axo-copy-pop-card">' +
        '<span class="axo-copy-pop-icon">' + ICON + "</span>" +
        '<b class="axo-copy-pop-title"></b>' +
        '<span class="axo-copy-pop-msg"></span>' +
        '<span class="axo-copy-pop-brand">axomexam.in</span>' +
        "</div>";
      document.body.appendChild(el);
    }

    var text = MESSAGES[lang()];
    el.querySelector(".axo-copy-pop-title").textContent = text.title;
    el.querySelector(".axo-copy-pop-msg").textContent = text.body;

    /* Restart the pop-in when a visitor tries again before it faded. */
    el.classList.remove("show");
    void el.offsetWidth;
    el.classList.add("show");

    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      el.classList.remove("show");
    }, 2400);
  }

  function onCopy(event) {
    var target = event.target;
    if (target === document || target === document.body || target === document.documentElement) {
      target = selectionNode();
    }
    if (!isGuarded(target) && !isGuarded(selectionNode())) return;
    event.preventDefault();
    popup();
  }

  document.addEventListener("copy", onCopy, true);
  document.addEventListener("cut", onCopy, true);

  document.addEventListener(
    "contextmenu",
    function (event) {
      if (!isGuarded(event.target)) return;
      var el = elementOf(event.target);
      /* Links keep the native menu so "open in new tab" still works. */
      if (el && el.closest("a[href]")) return;
      event.preventDefault();
      popup();
    },
    true
  );

  document.addEventListener(
    "selectstart",
    function (event) {
      if (isGuarded(event.target)) event.preventDefault();
    },
    true
  );

  document.addEventListener(
    "dragstart",
    function (event) {
      if (isGuarded(event.target)) event.preventDefault();
    },
    true
  );
})();
