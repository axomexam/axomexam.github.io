/* ============================================================
   axomexam — leaderboard-ui.js

   The UI half of the social leaderboard: the opt-in popup that
   appears before a mock test is graded, and the /leaderboard page
   with the subject → sub-category picker, the top five, the
   visitor's own rank and the topic-wise accuracy graph.

   Data and network calls live in js/leaderboard.js, exposed as
   window.AXOLeaderboard. This file only touches the DOM.
   ============================================================ */
(function () {
  "use strict";

  const LB = window.AXOLeaderboard;

  /* ---------- helpers ---------- */

  function el(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* The leaderboard is page content, so its copy follows the content
     language of the URL (/as/... = Assamese) exactly like the headings the
     app renders with tc() and localized(). Falling back to the interface
     language keeps the popup readable if the bridge is ever unavailable. */
  function tx(key, fallback) {
    try {
      const app = window.AXOApp;
      const lookup = (app && app.tc) || (app && app.t);
      if (typeof lookup === "function") {
        const v = lookup(key);
        if (v && v !== key) return v;
      }
    } catch (e) { /* ignore */ }
    return fallback || key;
  }

  function uiLang() {
    try {
      const app = window.AXOApp;
      if (app && typeof app.contentLang === "function") {
        return app.contentLang() === "as" ? "as" : "en";
      }
      return app && app.uiLang() === "as" ? "as" : "en";
    } catch (e) { return "en"; }
  }

  /* ---------- pre-submit opt-in popup ---------- */

  let popupBusy = false;

  /* Called just before the final score screen is shown. It never blocks
     the result: whatever the visitor chooses, `done` runs. */
  function beforeFinalSubmit(done) {
    let scope = null;
    let pct = 0;
    try {
      const m = window.AXOApp && window.AXOApp.mock();
      if (m && LB && LB.resolveScope && LB.resolveScope(m.cat && m.cat.id, m.subId)) {
        scope = LB.resolveScope(m.cat.id, m.subId);
        let correct = 0;
        m.pool.forEach((q, i) => { if (m.answers[i] === q.correct) correct++; });
        pct = m.pool.length ? Math.round((correct / m.pool.length) * 100) : 0;
      }
    } catch (e) { scope = null; }

    /* No leaderboard for this scope, or the module is unavailable: just
       show the result. */
    if (!scope || !LB || !LB.enabled()) { done(); return; }

    /* Record the attempt locally either way; the graph is private. */
    try { LB.recordAttempt(scope, pct); } catch (e) { /* ignore */ }

    /* Already has a name: update quietly in the background, show result now. */
    const name = LB.storedName();
    if (name) {
      LB.submitScore(scope, pct, name).catch(() => {});
      done();
      return;
    }

    /* No name of their own yet, so ask. Skipping writes nothing at all:
       no leaderboard row, no name reservation. */
    askToJoin(scope, pct, done);
  }

  function askToJoin(scope, pct, done) {
    const box = document.createElement("div");
    box.className = "lb-modal";
    box.id = "lb-join-modal";
    box.innerHTML = `
      <div class="lb-modal-backdrop"></div>
      <div class="lb-modal-box" role="dialog" aria-modal="true" aria-labelledby="lb-join-title">
        <div class="lb-modal-ico">🏆</div>
        <h3 id="lb-join-title">${esc(tx("lb.join.title", "Join the leaderboard?"))}</h3>
        <p>${esc(tx("lb.join.body", "Your name will be shown on the leaderboard with your best score. If you skip, your name and score are not saved anywhere."))}</p>
        <div class="lb-modal-actions">
          <button class="btn btn-outline" id="lb-join-skip" type="button">${esc(tx("lb.join.skip", "Skip"))}</button>
          <button class="btn btn-primary" id="lb-join-yes" type="button">${esc(tx("lb.join.yes", "Yes, add me"))}</button>
        </div>
      </div>`;
    document.body.appendChild(box);

    let finished = false;
    const close = () => box.remove();
    const finish = () => { if (finished) return; finished = true; close(); done(); };

    /* The popup deliberately has no close button and no backdrop dismissal:
       the visitor must choose Skip or Yes, so the choice is never made by a
       stray tap on the dimmed background. */
    el("lb-join-skip").addEventListener("click", () => {
      if (finished) return;
      finish();
    });
    el("lb-join-yes").addEventListener("click", () => {
      if (finished) return;
      close();
      askName(scope, pct, done);
    });
  }

  /* Shared name-entry modal. `mode` decides what a valid name does:
     - "join"    — reserve the name, submit the score, remember the name.
     - "profile" — reserve the name and remember it locally only. Existing
                   board rows keep the name they were submitted with; the
                   new name shows up from the next mock test onward.
     Validation is identical in both modes, so junk is rejected either way. */
  function nameModal(opts) {
    const mode = opts.mode;
    const box = document.createElement("div");
    box.className = "lb-modal";
    box.id = "lb-name-modal";
    box.innerHTML = `
      <div class="lb-modal-backdrop"></div>
      <div class="lb-modal-box" role="dialog" aria-modal="true" aria-labelledby="lb-name-title">
        <div class="lb-modal-ico">${mode === "profile" ? "👤" : "✍️"}</div>
        <h3 id="lb-name-title">${esc(opts.title)}</h3>
        <p>${esc(opts.body)}</p>
        ${opts.current ? `<p class="lb-profile-current">${esc(tx("lb.profile.current", "Current name"))}: <b>${esc(opts.current)}</b></p>` : ""}
        <input class="lb-name-input" id="lb-name-input" type="text" maxlength="20"
               autocomplete="off" spellcheck="false" placeholder="${esc(tx("lb.name.ph", "Your name"))}">
        <p class="lb-name-err" id="lb-name-err" role="alert"></p>
        <div class="lb-modal-actions">
          <button class="btn btn-outline" id="lb-name-cancel" type="button">${esc(opts.cancelLabel)}</button>
          <button class="btn btn-primary" id="lb-name-save" type="button">${esc(opts.saveLabel)}</button>
        </div>
      </div>`;
    document.body.appendChild(box);

    const input = el("lb-name-input");
    const err = el("lb-name-err");
    const save = el("lb-name-save");
    setTimeout(() => input.focus(), 30);

    let finished = false;
    const close = () => box.remove();
    const finish = () => { if (finished) return; finished = true; close(); opts.done(); };

    /* No backdrop dismissal: Cancel is the explicit way out, and it means
       "no name after all" — which writes nothing. */
    el("lb-name-cancel").addEventListener("click", () => {
      if (finished) return;
      close();
      finish();
    });

    const showErr = (key, fallback) => { err.textContent = tx(key, fallback); };

    const attemptSave = async () => {
      if (popupBusy) return;
      const check = LB.validateName(input.value);
      if (!check.ok) {
        if (check.code === "short") showErr("lb.name.short", "Please enter at least 2 characters.");
        else if (check.code === "long") showErr("lb.name.long", "Please keep the name within 20 characters.");
        else if (check.code === "chars") showErr("lb.name.chars", "Only letters, numbers, spaces and underscore are allowed.");
        else if (check.code === "junk") showErr("lb.name.junk", "Please enter your real name, not a random word.");
        else if (check.code === "noname") showErr("lb.name.noname", "Please enter a name with at least one letter.");
        else showErr("lb.name.bad", "This name is not allowed. Please choose another.");
        input.focus();
        return;
      }

      popupBusy = true;
      save.disabled = true;
      err.textContent = "";

      /* A dropped connection rejects instead of resolving, so the reset has
         to live in `finally`: otherwise the button stays disabled and the
         visitor is left with no explanation. */
      try {
        const reserved = await LB.reserveName(check.name);
        if (!reserved.ok) {
          showErr("lb.name.taken", "Two people are already using this name. Please add a middle name or initial.");
          return;
        }

        if (mode === "join") {
          const saved = await LB.submitScore(opts.scope, opts.pct, check.name);
          if (!saved.ok) {
            if (saved.code === "rate") { showErr("lb.name.rate", "Daily leaderboard limit reached."); return; }
            showErr("lb.name.err", "Could not save right now. Please try again.");
            return;
          }
        }

        LB.storeName(check.name);
        finish();
      } catch (e) {
        showErr("lb.name.err", "Could not save right now. Please try again.");
      } finally {
        popupBusy = false;
        save.disabled = false;
      }
    };

    save.addEventListener("click", attemptSave);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") attemptSave(); });
  }

  function askName(scope, pct, done) {
    nameModal({
      mode: "join",
      scope: scope,
      pct: pct,
      title: tx("lb.name.title", "Enter your name"),
      body: tx("lb.name.body", "This name will appear on the leaderboard."),
      saveLabel: tx("lb.name.save", "Save and submit"),
      cancelLabel: tx("lb.name.cancel", "Cancel"),
      done: done,
    });
  }

  /* Profile popup, opened from the icon on the leaderboard page. Saving a
     new name here does not rewrite rows already on the board — those keep
     the name they were submitted with. The next mock test submitted under
     the new name carries it onto the board. */
  function openProfile(done) {
    nameModal({
      mode: "profile",
      title: tx("lb.profile.title", "Your profile"),
      body: tx("lb.profile.body", "Set the name shown on the leaderboard. Scores you already submitted keep their old name; your next mock test uses this one."),
      current: LB.storedName(),
      saveLabel: tx("lb.profile.save", "Save name"),
      cancelLabel: tx("lb.name.cancel", "Cancel"),
      done: done,
    });
  }

  /* ---------- /leaderboard page ---------- */

  const page = {
    subject: null,
    requestId: 0,
  };

  function defaultSubject() {
    return (LB.SUBJECTS[0] && LB.SUBJECTS[0].id) || "gk";
  }

  function subjectName(id, lang) {
    const s = LB.SUBJECTS.find((x) => x.id === id);
    if (!s) return id;
    return lang === "as" ? s.name.as : s.name.en;
  }

  function subsOf(subject) {
    return (LB.SUBS[subject] || []).map((r) => ({ id: r[0], en: r[1], as: r[2] }));
  }

  function subLabel(sub, lang) {
    return lang === "as" ? sub.as : sub.en;
  }

  /* Query-string value, used to open the page on a specific subject tab
     when the visitor arrives from a mock-test scorecard shortcut. */
  function queryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || "";
    } catch (e) { return ""; }
  }

  function subjectFromQuery() {
    const want = queryParam("subject");
    return LB.SUBJECTS.some((s) => s.id === want) ? want : null;
  }

  /* One card per sub-category of the chosen subject, so every board is
     visible at once instead of hiding behind a second dropdown. */
  function boardCardHTML(sub, lang) {
    return `
      <div class="lb-subcard" id="lb-sub-${esc(sub.id)}">
        <div class="lb-subcard-head">
          <h2>${esc(subLabel(sub, lang))}</h2>
          <span class="lb-subcard-badge">${esc(tx("lb.top5", "Top 5"))}</span>
        </div>
        <div class="lb-subcard-body" id="lb-board-${esc(sub.id)}">
          <div class="lb-skel">${esc(tx("lb.loading", "Loading leaderboard…"))}</div>
        </div>
      </div>`;
  }

  /* The scorecard shortcut carries ?subject=…&sub=…; once the visitor picks
     a tab themselves the query is stale, so drop it. */
  function clearDeepLink() {
    if (!window.location.search) return;
    try { window.history.replaceState(null, null, window.location.pathname); } catch (e) { /* ignore */ }
  }

  function renderPage(container) {
    const lang = uiLang();
    const fromQuery = subjectFromQuery();
    if (fromQuery) page.subject = fromQuery;
    const subject = page.subject || defaultSubject();
    /* Remember the subject: tab clicks and re-renders read it back, so it
       must not be left null after the first paint. */
    page.subject = subject;
    page.requestId++;
    const subs = subsOf(subject);

    container.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${esc(tx("breadcrumb.home", "Home"))}</a><span class="bc-sep">/</span><span>${esc(tx("lb.title", "Leaderboard"))}</span>
        </nav>
        <div class="page-head-row">
          <h1>🏆 ${esc(tx("lb.title", "Leaderboard"))}</h1>
          <button class="lb-profile-btn" id="lb-profile-btn" type="button"
                  aria-label="${esc(tx("lb.profile.title", "Your profile"))}"
                  title="${esc(tx("lb.profile.title", "Your profile"))}">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span class="lb-profile-name">${esc(LB.storedName() || tx("lb.profile.setName", "Set name"))}</span>
          </button>
        </div>
        <p class="page-desc">${esc(tx("lb.sub", ""))}</p>
      </div>

      <section class="lb-wrap">
        <div class="lb-tabs" id="lb-tabs" role="tablist" aria-label="${esc(tx("lb.subject", "Subject"))}">
          ${LB.SUBJECTS.map((s) => `
            <button type="button" role="tab" class="lb-tab${s.id === subject ? " active" : ""}"
              data-subject="${esc(s.id)}" aria-selected="${s.id === subject ? "true" : "false"}">
              ${esc(lang === "as" ? s.name.as : s.name.en)}
            </button>`).join("")}
        </div>

        <div class="lb-boards" id="lb-boards">
          ${subs.length
            ? subs.map((sub) => boardCardHTML(sub, lang)).join("")
            : `<div class="lb-empty">${esc(tx("lb.empty", "No scores here yet. Be the first to join!"))}</div>`}
        </div>

        <div class="lb-card lb-graphcard">
          <div class="lb-card-head">
            <h2>${esc(tx("lb.graphTitle", "Your accuracy by sub-category"))}</h2>
          </div>
          <div id="lb-graph" class="lb-graph"></div>
        </div>
      </section>`;

    /* Profile icon: rename yourself. Rows already on the board keep their
       old name; the next mock test submitted carries the new one. */
    const profileBtn = el("lb-profile-btn");
    if (profileBtn) {
      profileBtn.addEventListener("click", () => {
        openProfile(() => {
          const label = profileBtn.querySelector(".lb-profile-name");
          if (label) label.textContent = LB.storedName() || tx("lb.profile.setName", "Set name");
        });
      });
    }

    const tabs = el("lb-tabs");
    if (tabs) {
      Array.prototype.forEach.call(tabs.querySelectorAll(".lb-tab"), (btn) => {
        btn.addEventListener("click", () => {
          if (btn.dataset.subject === page.subject) return;
          clearDeepLink();
          page.subject = btn.dataset.subject;
          renderPage(container);
        });
      });
    }

    subs.forEach((sub) => loadCard(subject, sub, lang));
    renderGraph();

    /* Arrived from a scorecard shortcut: bring the matching sub-category
       card into view so the visitor's own board is the first thing seen. */
    const wantSub = queryParam("sub");
    if (wantSub && subs.some((s) => s.id === wantSub)) {
      const card = el("lb-sub-" + wantSub);
      if (card) {
        card.classList.add("lb-subcard-target");
        const reveal = () => { try { card.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { /* ignore */ } };
        if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(reveal);
        else reveal();
      }
    }
  }

  /* A card's board plus, when the visitor has a row of their own, one
     highlighted line under the top five. The rank comes free when the
     visitor is already inside the five rows we fetched; otherwise it costs
     two aggregation reads, so we only pay that when the local history says
     this device actually attempted the scope. */
  async function loadCard(subject, sub, lang) {
    const scope = subject + "/" + sub.id;
    const bodyEl = el("lb-board-" + sub.id);
    if (!bodyEl) return;
    const req = page.requestId;

    try {
      const top = await LB.fetchTop(scope, 5);
      if (req !== page.requestId) return;
      if (!top.ok) { bodyEl.innerHTML = errorBlock(); return; }

      const dev = LB.deviceId();
      const at = top.rows.findIndex((r) => r.deviceId && r.deviceId === dev);

      /* Inside the five the highlighted row already says everything, so a
         second "your rank" line would just repeat it. Only reach for the
         two-read rank query when the visitor is outside the five we have. */
      let ownHTML = "";
      if (at < 0 && attemptedLocally(scope)) {
        const mine = await LB.fetchMyRank(scope);
        if (req !== page.requestId) return;
        if (mine && mine.ok && mine.rank > 0) ownHTML = ownLine(mine.mine, mine.rank, mine.total, lang);
      }

      const rowsHTML = top.rows.length
        ? top.rows.map((row, i) => rowHTML(row, i + 1, lang, row.deviceId === dev)).join("")
        : `<div class="lb-empty">${esc(tx("lb.empty", "No scores here yet. Be the first to join!"))}</div>`;

      bodyEl.innerHTML = rowsHTML + ownHTML;
    } catch (e) {
      if (req !== page.requestId) return;
      bodyEl.innerHTML = errorBlock();
    }
  }

  function attemptedLocally(scope) {
    try {
      const best = LB.bestByScope();
      return !!best && Object.prototype.hasOwnProperty.call(best, scope);
    } catch (e) { return false; }
  }

  function ownLine(row, rank, total, lang) {
    const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
    return `
      <div class="lb-myline">
        <span class="lb-myline-tag">${esc(tx("lb.you", "Your rank"))}</span>
        <span class="lb-myline-rank">${medal || "#" + rank}</span>
        <span class="lb-myline-name">${esc(row.name)}</span>
        <span class="lb-myline-score">${row.bestPct}%</span>
        ${total != null ? `<span class="lb-myline-of">${esc(tx("lb.of", "of"))} ${total}</span>` : ""}
      </div>`;
  }

  function errorBlock() {
    return `<div class="lb-empty">${esc(tx("lb.error", "Could not load the leaderboard right now."))}
      <button class="lb-retry" type="button" onclick="location.reload()">${esc(tx("lb.retry", "Retry"))}</button></div>`;
  }

  function rowHTML(row, rank, lang, highlight) {
    const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
    return `
      <div class="lb-row${highlight ? " lb-row-me" : ""}">
        <span class="lb-row-rank">${medal || "#" + rank}</span>
        <span class="lb-row-name">${esc(row.name)}</span>
        <span class="lb-row-score">${row.bestPct}%</span>
      </div>`;
  }

  /* Topic-wise accuracy graph, drawn from the private local history. */
  function renderGraph() {
    const host = el("lb-graph");
    if (!host) return;
    const lang = uiLang();

    const best = LB.bestByScope();
    const rows = [];
    LB.SUBJECTS.forEach((s) => {
      subsOf(s.id).forEach((sub) => {
        const scope = s.id + "/" + sub.id;
        if (scope in best) {
          rows.push({ scope: scope, label: subjectName(s.id, lang) + " • " + (lang === "as" ? sub.as : sub.en), pct: best[scope] });
        }
      });
    });

    if (!rows.length) {
      host.innerHTML = `<div class="lb-empty">${esc(tx("lb.graphEmpty", "Attempt a few practice sets to see your accuracy graph."))}</div>`;
      return;
    }

    rows.sort((a, b) => b.pct - a.pct);
    const weakest = rows[rows.length - 1];

    host.innerHTML = `
      <div class="lb-bars">
        ${rows.map((r) => `
          <div class="lb-bar-row">
            <span class="lb-bar-label" title="${esc(r.label)}">${esc(r.label)}</span>
            <span class="lb-bar-track">
              <span class="lb-bar-fill" style="width:${Math.max(2, r.pct)}%;--v:${r.pct}"></span>
            </span>
            <span class="lb-bar-val">${r.pct}%</span>
          </div>`).join("")}
      </div>
      <p class="lb-weak">${esc(tx("lb.graphWeak", "Weakest"))}: <b>${esc(weakest.label)}</b> — ${weakest.pct}%</p>`;
  }

  window.AXOLeaderboardUI = {
    beforeFinalSubmit: beforeFinalSubmit,
    renderPage: renderPage,
  };
})();
