/* ============================================================
   axomexam — push.js

   Browser (Web Push) notifications, opt-in only.

   Nothing here asks for permission on page load. A visitor who has stayed
   45 seconds is shown an in-page card, and only its "Turn on
   notifications" button calls Notification.requestPermission(). A prompt
   shown without a gesture is ignored by most browsers, so a real tap is
   the single entry point.

   Where the subscription lives
     Firestore collection push_subs, one document per browser, id =
     sha256(endpoint). Fields: endpoint, p256dh, auth, lang, tz, ua,
     created. The public may only create and delete; reading needs a
     service account, which only tools/send-push.js uses. That keeps
     endpoints (enough to deliver a push) out of other visitors' reach.
     Unsubscribing deletes the document, so turning the row off and on
     again works without any update permission.

   Delivery
     .github/workflows/push-notify.yml runs tools/send-push.js, which
     reads data/notifications.json and pushes the chosen item to every
     stored subscription. So the bell list and the phone notification
     always carry the same text.

   Language
     The subscription records the visitor's interface language, so a
     bilingual item is delivered in the language that visitor reads.
   ============================================================ */
(function () {
  "use strict";

  const LS_LANG = "axomexam-ui-lang";

  /* How long a visitor must stay on the site before the opt-in prompt is
     offered, and how long "Not now" is respected. The delay is
     read from push-config.js so preview and production differ by one value
     instead of a code change. */
  const DEFAULT_DWELL_MS = 45000;
  /* "Not now" and a prompt that was left unanswered both rest for three
     days. The two are kept as separate constants because they answer
     different questions and may drift apart later. */
  const DISMISS_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;
  const SHOWN_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;
  const PROMPT_KEY = "axomexam-push-prompt";
  const DWELL_KEY = "axomexam-push-dwell";
  const RESULT_GRACE_MS = 6000;

  const STR = {
    promptTitle: { en: "Never miss a new practice set", as: "নতুন অনুশীলন সংহতি নেৰিব" },
    promptBody: {
      en: "Get exam updates and new practice sets as a browser notification, even when axomexam is closed.",
      as: "পৰীক্ষাৰ আপডেট আৰু নতুন অনুশীলন সংহতি ব্ৰাউজাৰ জাননী হিচাপে পাওক, axomexam বন্ধ থাকিলেও।",
    },
    promptYes: { en: "Turn on notifications", as: "জাননী চালু কৰক" },
    promptNo: { en: "Not now", as: "এতিয়া নহয়" },
    promptBusy: { en: "Please wait…", as: "অনুগ্ৰহ কৰি অপেক্ষা কৰক…" },
    promptAllowTitle: { en: "Tap Allow in the browser box", as: "ব্ৰাউজাৰৰ বাকচত Allow টিপক" },
    promptAllowBody: {
      en: "Your browser is asking now. Choose Allow so exam updates reach you.",
      as: "আপোনাৰ ব্ৰাউজাৰে এতিয়া সোধিছে। পৰীক্ষাৰ আপডেট পাবলৈ Allow বাছনি কৰক।",
    },
  };

  let busy = false;
  let subscribed = false;
  let statePromise = null;
  let promptEl = null;
  let dwellStart = null;
  let dwellTicker = null;
  let resultSeenAt = 0;

  function lang() {
    try {
      return localStorage.getItem(LS_LANG) === "as" ? "as" : "en";
    } catch (e) {
      return "en";
    }
  }

  function s(key) {
    const entry = STR[key];
    return (entry && (entry[lang()] || entry.en)) || "";
  }

  function cfg() {
    return window.AXOMEXAM_PUSH_CONFIG || null;
  }

  /* The project id and API key live in push-config.js so this works on the
     few pages that never load js/firebase-config.js. */
  function firebase() {
    const c = cfg();
    if (!c || !c.projectId || !c.apiKey) return null;
    return { projectId: c.projectId, apiKey: c.apiKey };
  }

  function supported() {
    return (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window &&
      !!cfg() &&
      !!cfg().vapidPublicKey &&
      !!firebase()
    );
  }

  /* iOS delivers Web Push only to a site added to the Home Screen, and a
     normal Safari tab reports no PushManager at all. The opt-in prompt is
     therefore pointless there; the header bell shows the install steps
     instead, through PUSH.needsInstall. */
  function isIosNeedingInstall() {
    const ua = navigator.userAgent || "";
    const iOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && "ontouchend" in document);
    if (!iOS) return false;
    const standalone =
      window.navigator.standalone === true ||
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
    return !standalone;
  }

  function base64ToUint8(base64) {
    const pad = "=".repeat((4 - (base64.length % 4)) % 4);
    const raw = atob((base64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  async function sha256Hex(text) {
    const buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function collectionUrl() {
    const c = firebase();
    return (
      "https://firestore.googleapis.com/v1/projects/" + c.projectId +
      "/databases/(default)/documents/" + encodeURIComponent(cfg().collection)
    );
  }

  function docUrl(id) {
    return collectionUrl() + "/" + encodeURIComponent(id) + "?key=" +
      encodeURIComponent(firebase().apiKey);
  }

  function json(sub) {
    return sub.toJSON ? sub.toJSON() : sub;
  }

  async function saveSubscription(sub) {
    const data = json(sub);
    const id = await sha256Hex(data.endpoint);

    const body = {
      fields: {
        endpoint: { stringValue: data.endpoint },
        p256dh: { stringValue: (data.keys && data.keys.p256dh) || "" },
        auth: { stringValue: (data.keys && data.keys.auth) || "" },
        lang: { stringValue: lang() },
        tz: { stringValue: Intl.DateTimeFormat().resolvedOptions().timeZone || "" },
        ua: { stringValue: (navigator.userAgent || "").slice(0, 180) },
        created: { integerValue: String(Date.now()) },
      },
    };

    const create = () =>
      fetch(
        collectionUrl() + "?documentId=" + encodeURIComponent(id) +
          "&key=" + encodeURIComponent(firebase().apiKey),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

    let res = await create();

    /* A 409 means a row for this browser already exists — left over from a
       previous opt-in. The public cannot update, so replace it. */
    if (res.status === 409) {
      await fetch(docUrl(id), { method: "DELETE" }).catch(() => {});
      res = await create();
    }

    return res.ok || res.status === 409;
  }

  async function registration() {
    return navigator.serviceWorker.ready;
  }

  async function currentSubscription() {
    try {
      const reg = await registration();
      return await reg.pushManager.getSubscription();
    } catch (e) {
      return null;
    }
  }

  async function enable() {
    if (busy) return false;
    busy = true;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        subscribed = false;
        return false;
      }
      const reg = await registration();
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8(cfg().vapidPublicKey),
        });
      }
      subscribed = await saveSubscription(sub);
    } catch (e) {
      subscribed = false;
    } finally {
      busy = false;
    }
    return subscribed;
  }

  function visible(el) {
    return !!el && el.getClientRects().length > 0;
  }

  /* A running mock test owns the screen: a notification prompt there costs
     the visitor marks, so the prompt waits for a calmer page. */
  function testRunning() {
    return visible(document.getElementById("quiz-timer"));
  }

  function dialogOpen() {
    const nodes = document.querySelectorAll('[role="dialog"], .read-modal-box');
    for (let i = 0; i < nodes.length; i++) {
      if (visible(nodes[i])) return true;
    }
    return false;
  }

  function promptMemory() {
    try {
      return JSON.parse(localStorage.getItem(PROMPT_KEY) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function rememberPrompt(patch) {
    try {
      localStorage.setItem(PROMPT_KEY, JSON.stringify(Object.assign(promptMemory(), patch)));
    } catch (e) {}
  }

  function mayPrompt() {
    if (!supported()) return false;
    if (isIosNeedingInstall()) return false;
    if (Notification.permission !== "default") return false;
    if (subscribed) return false;
    if (document.visibilityState !== "visible") return false;
    const seen = promptMemory();
    if (seen.dismissedAt && Date.now() - seen.dismissedAt < DISMISS_COOLDOWN_MS) return false;
    /* The prompt is shown once per visit, not once per page. Without this a
       visitor who reads past the threshold and simply navigates on would be
       asked again on every topic they open. */
    if (seen.shownAt && Date.now() - seen.shownAt < SHOWN_COOLDOWN_MS) return false;
    if (testRunning() || dialogOpen()) return false;
    return true;
  }

  function promptMarkup() {
    return (
      '<div class="axo-push-prompt-card" role="dialog" aria-modal="true" aria-labelledby="axo-push-prompt-title">' +
      '<div class="axo-push-prompt-ico" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
      '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>' +
      "</svg></div>" +
      '<h2 class="axo-push-prompt-title" id="axo-push-prompt-title">' + s("promptTitle") + "</h2>" +
      '<p class="axo-push-prompt-body" data-prompt-body>' + s("promptBody") + "</p>" +
      '<div class="axo-push-prompt-actions" data-prompt-actions>' +
      '<button class="axo-push-prompt-yes" type="button" data-prompt="yes">' + s("promptYes") + "</button>" +
      '<button class="axo-push-prompt-no" type="button" data-prompt="no">' + s("promptNo") + "</button>" +
      "</div></div>"
    );
  }

  function cancelPrompt() {
    if (!promptEl) return;
    const el = promptEl;
    promptEl = null;
    el.classList.remove("is-in");
    window.setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 220);
  }

  function closePrompt() {
    rememberPrompt({ dismissedAt: Date.now() });
    cancelPrompt();
  }

  function showPrompt() {
    if (promptEl || !mayPrompt()) return;

    const host = document.createElement("div");
    host.className = "axo-push-prompt";
    host.innerHTML = promptMarkup();
    document.body.appendChild(host);
    promptEl = host;
    rememberPrompt({ shownAt: Date.now() });
    window.requestAnimationFrame(function () {
      host.classList.add("is-in");
    });

    /* Only the two buttons dismiss this. A stray tap on the page behind must
       not decide for the visitor, so backdrop clicks are ignored. */
    host.addEventListener("click", function (e) {
      const btn = e.target.closest && e.target.closest("[data-prompt]");
      if (!btn) return;
      if (btn.dataset.prompt === "yes") {
        acceptPrompt(host);
      } else {
        closePrompt();
      }
    });

    const focusTarget = host.querySelector('[data-prompt="yes"]');
    if (focusTarget) focusTarget.focus();
  }

  async function acceptPrompt(host) {
    const title = host.querySelector(".axo-push-prompt-title");
    const body = host.querySelector("[data-prompt-body]");
    const actions = host.querySelector("[data-prompt-actions]");

    /* The browser's permission box appears beside this one. Tell the visitor
       what to press there, and leave both buttons visible so the card never
       looks stuck while the native box waits for an answer. */
    if (title) title.textContent = s("promptAllowTitle");
    if (body) body.textContent = s("promptAllowBody");
    if (actions) actions.innerHTML = '<button class="axo-push-prompt-yes" type="button" disabled>' + s("promptBusy") + "</button>";

    const ok = await enable();

    /* A blocked answer, or a box closed without choosing, both land here with
       permission still open. Treated like "Not now" so the dwell timer cannot
       reopen the card on this page, while a later visit may still ask. */
    if (!ok) rememberPrompt({ dismissedAt: Date.now() });

    cancelPrompt();
  }

  /* Count only the time the tab is actually in front of the visitor, so a
     page left open in a background tab does not trigger the prompt the
     moment it is reopened. Kept in sessionStorage so walking from topic to
     topic adds up instead of restarting the clock on every page load. */
  function dwellStored() {
    try {
      const v = Number(sessionStorage.getItem(DWELL_KEY) || 0);
      return v > 0 ? v : 0;
    } catch (e) {
      return 0;
    }
  }

  function dwellSave(ms) {
    try {
      sessionStorage.setItem(DWELL_KEY, String(Math.round(ms)));
    } catch (e) {}
  }

  function dwellElapsed() {
    return dwellStored() + (dwellStart === null ? 0 : Date.now() - dwellStart);
  }

  function dwellMs() {
    const c = cfg();
    const v = c && c.promptDelayMs;
    return typeof v === "number" && v > 0 ? v : DEFAULT_DWELL_MS;
  }

  /* A finished mock test is the best moment to ask: the visitor just saw a
     score, so the visit has paid off. The scorecard is the only screen that
     carries .result-wrap, and it replaces the quiz, so the timer is gone.
     Held back a few seconds so the score can be read before anything covers
     it. */
  function resultReady() {
    if (!visible(document.querySelector(".result-wrap"))) {
      resultSeenAt = 0;
      return false;
    }
    if (!resultSeenAt) resultSeenAt = Date.now();
    return Date.now() - resultSeenAt >= RESULT_GRACE_MS;
  }

  /* Runs on a timer rather than a one-shot: a visitor whose dwell is already
     complete may still be mid mock test or inside a dialog, and the prompt
     should appear as soon as that clears. */
  function dwellTick() {
    if (promptEl) return;
    if (!resultReady() && dwellElapsed() < dwellMs()) return;
    if (mayPrompt()) showPrompt();
  }

  function pauseDwell() {
    if (dwellStart !== null) {
      dwellSave(dwellStored() + (Date.now() - dwellStart));
      dwellStart = null;
    }
    if (dwellTicker) {
      window.clearInterval(dwellTicker);
      dwellTicker = null;
    }
  }

  function startDwell() {
    if (dwellTicker || document.visibilityState !== "visible") return;
    if (dwellStart === null) dwellStart = Date.now();
    dwellTicker = window.setInterval(dwellTick, 1000);
    dwellTick();
  }

  function refreshState() {
    if (statePromise) return statePromise;
    statePromise = currentSubscription()
      .then(function (sub) {
        subscribed = !!sub && Notification.permission === "granted";
      })
      .catch(function () {})
      .then(function () {
        statePromise = null;
      });
    return statePromise;
  }

  window.PUSH = {
    supported: supported,
    /* Exposed so the header bell can show install steps to an iPhone visitor
       instead of a button that Apple would never answer. */
    needsInstall: isIosNeedingInstall,
    state: function () {
      if (!supported()) return "unsupported";
      if (subscribed) return "subscribed";
      if (Notification.permission === "denied") return "denied";
      return "default";
    },
  };

  function boot() {
    refreshState();

    /* app.js paints the bell before this file runs, so it needs a nudge to
       repaint the iPhone install steps now that PUSH.needsInstall exists. */
    window.dispatchEvent(new CustomEvent("axo:push-ready"));

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        if (!promptEl) startDwell();
      } else {
        pauseDwell();
      }
    });

    /* The page is about to be replaced by the next topic. Bank the elapsed
       time first, or the visit's total would only ever hold the last page. */
    window.addEventListener("pagehide", pauseDwell);

    startDwell();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
