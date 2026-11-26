/* ============================================================
   axomexam — leaderboard.js

   Social leaderboard backed by Cloud Firestore, called over the
   REST API so no SDK bundle is needed on a static GitHub Pages
   site. The public web config is read from window.AXOMEXAM_FIREBASE_CONFIG
   (js/firebase-config.js).

   Privacy: no login, no email, no account. A random per-browser
   device id is generated locally and never shown. The only piece
   of personal data stored is the display name the visitor types,
   and only if they opt in from the pre-submit popup.

   Collections
     lb_scores/{deviceId}__{scopeKey}   best score per device per scope
     lb_names/{nameLower}               name reservation, slot 1
     lb_names/{nameLower}~2             name reservation, slot 2

   Two candidates can genuinely share a name, so a name admits up to
   NAME_SLOTS devices. Each slot is its own document, which keeps the
   create-if-absent rule as the whole check and needs no rules change.
   A "~" cannot appear in a display name, so slot ids never collide.

   Scope keys are the site's own sub-category ids ("gk/assam-history").
   Firestore document ids cannot contain "/", so the document id uses
   the scope with "/" replaced by "-"; the `scope` field keeps the
   original value.
   ============================================================ */
(function () {
  "use strict";

  const LS_DEVICE = "axomexam-device-id";
  const LS_NAME = "axomexam-name";
  const LS_HISTORY = "axomexam-mock-history";
  const LS_RATE = "axomexam-lb-rate";
  const DAILY_LIMIT = 20;
  const HISTORY_MAX = 300;

  /* How many devices may share one display name. Two candidates can
     genuinely have the same name, so one slot per name was too strict;
     more than two turns the board into a squatting target. */
  const NAME_SLOTS = 2;

  /* ---------- the 26 leaderboard scopes ---------- */
  /* Mirrors GROWTH-ROADMAP.md. Only sub-categories that have practice
     sets appear here; the six "articles" sub-categories do not. */
  const SUBJECTS = [
    { id: "gk", name: { en: "General Knowledge", as: "সাধাৰণ জ্ঞান" } },
    { id: "math", name: { en: "Mathematics", as: "গণিত" } },
    { id: "science", name: { en: "General Science", as: "সাধাৰণ বিজ্ঞান" } },
    { id: "reasoning", name: { en: "Reasoning Ability", as: "যুক্তি বিচাৰণ ক্ষমতা" } },
    { id: "english", name: { en: "General English", as: "সাধাৰণ ইংৰাজী" } },
    { id: "computer", name: { en: "Computer Awareness", as: "কম্পিউটাৰ সজাগতা" } },
  ];

  const SUBS = {
    gk: [
      ["assam-history", "Assam History", "অসমৰ ইতিহাস"],
      ["indian-history", "Indian History", "ভাৰতীয় ইতিহাস"],
      ["geography", "Geography", "ভূগোল"],
      ["economics", "Economics", "অৰ্থনীতি"],
      ["art-culture", "Art & Culture", "কলা আৰু সংস্কৃতি"],
      ["assam-literature", "Assam Literature", "অসমীয়া সাহিত্য"],
      ["polity", "Political Science", "ৰাজনীতি বিজ্ঞান"],
    ],
    math: [
      ["arithmetic", "Arithmetic", "পাটিগণিত"],
      ["advanced-math", "Advanced Math", "উচ্চ গণিত"],
      ["statistics-and-data-interpretation", "Statistics & DI", "পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ"],
    ],
    science: [
      ["biology", "Biology", "জীৱ বিজ্ঞান"],
      ["physics", "Physics", "পদাৰ্থ বিজ্ঞান"],
      ["chemistry", "Chemistry", "ৰসায়ন বিজ্ঞান"],
    ],
    reasoning: [
      ["verbal-reasoning", "Verbal Reasoning", "মৌখিক যুক্তি"],
      ["analytical-critical-reasoning", "Analytical & Critical", "বিশ্লেষণাত্মক যুক্তি"],
      ["non-verbal-reasoning", "Non-Verbal Reasoning", "অবাচ্য যুক্তি"],
    ],
    english: [
      ["vocabulary", "Vocabulary", "শব্দভাণ্ডাৰ"],
      ["grammar", "Grammar", "ব্যাকৰণ"],
      ["parts-of-speech", "Parts of Speech", "পদ"],
      ["sentence-structure", "Sentence Structure", "বাক্য গঠন"],
    ],
    computer: [
      ["ms-office-suite", "MS Office Suite", "MS Office ছুট"],
      ["networking-internet", "Networking & Internet", "নেটৱৰ্কিং আৰু ইন্টাৰনেট"],
      ["cyber-security", "Cyber Security", "চাইবাৰ নিৰাপত্তা"],
      ["software-os", "Software & OS", "চফ্টৱেৰ আৰু OS"],
      ["fundamentals-hardware", "Fundamentals & Hardware", "মৌলিক ধাৰণা আৰু হাৰ্ডৱেৰ"],
      ["dbms-number-shortcuts", "DBMS & Shortcuts", "DBMS আৰু চৰ্টকাট"],
    ],
  };

  /* Mock-test sub ids that differ from the leaderboard scope ids. */
  const SUB_ALIAS = {
    "computer/comp-fundamentals": "computer/fundamentals-hardware",
    "computer/ms-office": "computer/ms-office-suite",
  };

  function subName(scope, lang) {
    const parts = String(scope).split("/");
    const list = SUBS[parts[0]] || [];
    const row = list.find((r) => r[0] === parts[1]);
    if (!row) return parts[1] || "";
    return lang === "as" ? row[2] : row[1];
  }

  /* Turn a mock-test (catId, subId) pair into a canonical leaderboard
     scope, or null when the pair has no leaderboard. */
  function resolveScope(catId, subId) {
    if (!catId || !subId) return null;
    const key = catId + "/" + subId;
    const scope = SUB_ALIAS[key] || key;
    const parts = scope.split("/");
    const list = SUBS[parts[0]] || [];
    return list.some((r) => r[0] === parts[1]) ? scope : null;
  }

  function scopeKey(scope) {
    return String(scope).replace(/\//g, "-");
  }

  /* ---------- small helpers ---------- */

  function config() {
    return (typeof window !== "undefined" && window.AXOMEXAM_FIREBASE_CONFIG) || null;
  }

  function enabled() {
    const c = config();
    return !!(c && c.projectId && c.apiKey);
  }

  function apiBase() {
    const c = config();
    return "https://firestore.googleapis.com/v1/projects/" + c.projectId +
      "/databases/(default)/documents";
  }

  function docRoot() {
    const c = config();
    return "projects/" + c.projectId + "/databases/(default)/documents";
  }

  function key() {
    return "?key=" + encodeURIComponent(config().apiKey);
  }

  function randHex(n) {
    const bytes = new Uint8Array(n / 2);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function deviceId() {
    let id = null;
    try { id = localStorage.getItem(LS_DEVICE); } catch (e) { id = null; }
    if (!id || !/^d_[0-9a-f]{8,}$/.test(id)) {
      id = "d_" + randHex(24);
      try { localStorage.setItem(LS_DEVICE, id); } catch (e) { /* private mode */ }
    }
    return id;
  }

  function storedName() {
    try { return localStorage.getItem(LS_NAME) || ""; } catch (e) { return ""; }
  }

  function storeName(name) {
    try { localStorage.setItem(LS_NAME, name); } catch (e) { /* ignore */ }
  }

  /* ---------- name validation ---------- */

  /* Deliberately short. The goal is to keep the public board readable,
     not to build a complete filter; the security rules enforce shape
     and the owner can remove an entry from the console. */
  const BAD_WORDS = [
    "fuck", "shit", "bitch", "bastard", "asshole", "dick", "pussy", "rape",
    "sex", "porn", "nude", "cock", "cunt", "whore", "slut", "madarchod",
    "bhosdi", "chutiya", "chutiyaa", "gandu", "gaand", "harami", "kamina",
    "randi", "bhadwa", "bhosdike", "loda", "lodu", "suar", "kutta",
  ];

  /* Words people type to get past a required field. Matched whole, after
     lowercasing and dropping spaces, underscores and digits, so "Test",
     "test_1" and "TEST 12" all land here. */
  const JUNK_NAMES = [
    "test", "testing", "tester", "admin", "administrator", "user", "username",
    "guest", "null", "undefined", "none", "name", "noname",
    "anonymous", "unknown", "unknownuser", "asdf", "asdfasdf", "qwerty",
    "abc", "abcd", "abcde", "abcabc", "xyz", "xxx", "yyy", "zzz", "aaa",
    "bbb", "ccc", "temp", "demo", "sample", "dummy", "foo", "bar", "baz",
    "lorem", "ipsum", "blah", "hello", "hi", "hey", "student", "candidate",
  ];

  /* Four characters straight off a keyboard row or the alphabet is a mash,
     not a name. Checked both ways, so "asdf", "fdsa" and "4321" all hit. */
  const KEY_ROWS = [
    "qwertyuiop", "asdfghjkl", "zxcvbnm", "1234567890",
    "abcdefghijklmnopqrstuvwxyz",
  ];

  function hasKeyRun(flat) {
    return KEY_ROWS.some((row) => {
      const rev = row.split("").reverse().join("");
      for (let i = 0; i + 4 <= row.length; i++) {
        if (flat.includes(row.slice(i, i + 4)) || flat.includes(rev.slice(i, i + 4))) return true;
      }
      return false;
    });
  }

  /* Five consonants in a row ("asdfgh", "qwrtp") cannot start a real name
     in any language that spells itself out. */
  function hasConsonantRun(letters) {
    let run = 0;
    for (let i = 0; i < letters.length; i++) {
      run = "aeiouy".includes(letters[i]) ? 0 : run + 1;
      if (run >= 5) return true;
    }
    return false;
  }

  function allSameChar(s) {
    for (let i = 1; i < s.length; i++) if (s[i] !== s[0]) return false;
    return s.length > 1;
  }

  function normalizeName(raw) {
    return String(raw == null ? "" : raw)
      .replace(/[\u200B-\u200D\uFEFF]/g, "")   /* zero-width chars */
      .replace(/[\u0000-\u001F\u007F]/g, "")   /* control chars */
      .replace(/\s+/g, " ")
      .trim();
  }

  function validateName(raw) {
    const name = normalizeName(raw);
    if (name.length < 2) return { ok: false, code: "short", name };
    if (name.length > 20) return { ok: false, code: "long", name };
    /* Letters and combining marks in any script, digits, space, underscore.
       The marks matter: an Assamese or Devanagari vowel sign is a combining
       mark (\p{M}), not a letter, so a plain \p{L} class rejects a name like
       "ৰাহুল". */
    if (!/^[\p{L}\p{M}\p{N} _]+$/u.test(name)) return { ok: false, code: "chars", name };
    const flat = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (flat && BAD_WORDS.some((w) => flat.includes(w))) {
      return { ok: false, code: "bad", name };
    }

    /* Must hold at least one letter. "1234" and "1 2 3" are not names.
       Script-aware: \p{L} keeps "ৰাহুল" valid while rejecting digits-only. */
    const lettersOnly = name.replace(/[^\p{L}\p{M}]/gu, "");
    if (!lettersOnly) return { ok: false, code: "noname", name };

    /* The mash checks below are Latin-only. `flat` drops every non-ASCII
       character, so for an Assamese or Devanagari name it comes out empty
       and these tests are skipped rather than misfiring. Digits may tag
       onto a real name ("Rahul Das 21"); they cannot be the whole thing. */
    const word = flat.replace(/[0-9]/g, "");
    if (flat && !word) return { ok: false, code: "noname", name };

    if (word) {
      if (JUNK_NAMES.indexOf(word) !== -1) return { ok: false, code: "junk", name };
      if (allSameChar(word)) return { ok: false, code: "junk", name };
      if (hasKeyRun(flat)) return { ok: false, code: "junk", name };
      if (hasConsonantRun(word)) return { ok: false, code: "junk", name };
    }

    return { ok: true, name };
  }

  /* ---------- rate limit (client side, best effort) ---------- */

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function rateState() {
    let st = null;
    try { st = JSON.parse(localStorage.getItem(LS_RATE) || "null"); } catch (e) { st = null; }
    if (!st || st.day !== today()) st = { day: today(), n: 0 };
    return st;
  }

  function rateBump() {
    const st = rateState();
    st.n += 1;
    try { localStorage.setItem(LS_RATE, JSON.stringify(st)); } catch (e) { /* ignore */ }
    return st.n;
  }

  function rateLeft() {
    return Math.max(0, DAILY_LIMIT - rateState().n);
  }

  /* ---------- mock history (powers the topic-wise graph) ---------- */

  function readHistory() {
    try { return JSON.parse(localStorage.getItem(LS_HISTORY) || "[]") || []; } catch (e) { return []; }
  }

  function recordAttempt(scope, pct) {
    if (!scope || !Number.isFinite(pct)) return;
    const list = readHistory();
    list.push({ scope: scope, pct: Math.round(pct), ts: Date.now() });
    while (list.length > HISTORY_MAX) list.shift();
    try { localStorage.setItem(LS_HISTORY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }

  function bestByScope() {
    const out = {};
    readHistory().forEach((h) => {
      if (!h || !h.scope) return;
      if (!(h.scope in out) || h.pct > out[h.scope]) out[h.scope] = h.pct;
    });
    return out;
  }

  /* ---------- Firestore REST calls ---------- */

  function toValue(v) {
    if (typeof v === "number") return { integerValue: String(Math.round(v)) };
    return { stringValue: String(v) };
  }

  function fromValue(v) {
    if (!v) return undefined;
    if ("integerValue" in v) return parseInt(v.integerValue, 10);
    if ("doubleValue" in v) return Number(v.doubleValue);
    if ("stringValue" in v) return v.stringValue;
    return undefined;
  }

  async function commit(writes) {
    const res = await fetch(apiBase() + ":commit" + key(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ writes: writes }),
    });
    const body = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, body: body };
  }

  /* Slot 1 keeps the bare lowercased name so existing reservations stay
     valid; later slots get a "~n" suffix, which no display name can carry. */
  function nameSlotId(lower, slot) {
    return slot === 1 ? lower : lower + "~" + slot;
  }

  function nameSlotUrl(lower, slot) {
    return apiBase() + "/lb_names/" + encodeURIComponent(nameSlotId(lower, slot)) + key();
  }

  async function nameSlotHolder(lower, slot) {
    const res = await fetch(nameSlotUrl(lower, slot), { cache: "no-store" });
    if (!res.ok) return null;
    const doc = await res.json().catch(() => null);
    return doc && doc.fields && doc.fields.deviceId ? doc.fields.deviceId.stringValue : null;
  }

  /* Reserve a name. A name admits up to NAME_SLOTS devices, so this walks
     the slots: a slot already held by this device means success, a slot
     held by someone else is skipped, and the first free slot is claimed
     with a create-if-absent write. Running out of slots means the name is
     full. */
  async function reserveName(name) {
    /* Normalise here, not only in the caller: otherwise "Rahul  Das" and
       "Rahul Das" would reserve two different document IDs and the same
       display name could appear twice. */
    const lower = normalizeName(name).toLowerCase();
    const dev = deviceId();

    for (let slot = 1; slot <= NAME_SLOTS; slot++) {
      const holder = await nameSlotHolder(lower, slot);
      if (holder === dev) return { ok: true };
      if (holder) continue;

      const w = {
        update: {
          name: docRoot() + "/lb_names/" + nameSlotId(lower, slot),
          fields: { deviceId: toValue(dev) },
        },
        currentDocument: { exists: false },
        updateTransforms: [{ fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" }],
      };
      const r = await commit([w]);
      if (r.ok) return { ok: true };
      if (r.status === 409 || r.status === 400 || r.status === 403) {
        /* Lost the race, or the slot filled meanwhile. Only claim this
           slot if it turned out to be ours; otherwise try the next. */
        if ((await nameSlotHolder(lower, slot)) === dev) return { ok: true };
        continue;
      }
      return { ok: false, code: "error" };
    }
    return { ok: false, code: "taken" };
  }

  async function readOwnScore(scope) {
    const id = deviceId() + "__" + scopeKey(scope);
    const res = await fetch(apiBase() + "/lb_scores/" + encodeURIComponent(id) + key(), { cache: "no-store" });
    if (!res.ok) return null;
    const doc = await res.json().catch(() => null);
    if (!doc || !doc.fields) return null;
    return {
      bestPct: fromValue(doc.fields.bestPct),
      attempts: fromValue(doc.fields.attempts),
      name: doc.fields.name && doc.fields.name.stringValue,
      deviceId: doc.fields.deviceId && doc.fields.deviceId.stringValue,
    };
  }

  /* Save a result: keep the best percentage, bump the attempt count. */
  async function submitScore(scope, pct, name) {
    if (!enabled()) return { ok: false, code: "disabled" };
    if (rateLeft() <= 0) return { ok: false, code: "rate" };

    const dev = deviceId();
    const id = dev + "__" + scopeKey(scope);
    const prev = await readOwnScore(scope);
    const best = Math.max(pct, prev && Number.isFinite(prev.bestPct) ? prev.bestPct : 0);
    const attempts = (prev && prev.attempts ? prev.attempts : 0) + 1;

    const fields = {
      name: toValue(normalizeName(name)),
      deviceId: toValue(dev),
      scope: toValue(scope),
      bestPct: toValue(best),
      attempts: toValue(attempts),
    };
    const w = {
      update: { name: docRoot() + "/lb_scores/" + id, fields: fields },
      updateTransforms: [{ fieldPath: "updatedAt", setToServerValue: "REQUEST_TIME" }],
    };
    const r = await commit([w]);
    if (!r.ok) return { ok: false, code: "error" };
    rateBump();
    return { ok: true, bestPct: best, attempts: attempts };
  }

  /* Top entries for one scope, best first. */
  async function fetchTop(scope, limit) {
    const q = {
      structuredQuery: {
        from: [{ collectionId: "lb_scores" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "scope" },
            op: "EQUAL",
            value: toValue(scope),
          },
        },
        orderBy: [{ field: { fieldPath: "bestPct" }, direction: "DESCENDING" }],
        limit: limit || 100,
      },
    };
    const res = await fetch(apiBase() + ":runQuery" + key(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q),
    });
    if (!res.ok) return { ok: false, status: res.status };
    const rows = await res.json().catch(() => []);
    const out = [];
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      if (!row || !row.document) return;
      const f = row.document.fields || {};
      const id = row.document.name.split("/documents/").pop();
      out.push({
        id: id,
        name: f.name ? f.name.stringValue : "",
        bestPct: fromValue(f.bestPct),
        attempts: fromValue(f.attempts),
        deviceId: f.deviceId ? f.deviceId.stringValue : "",
      });
    });
    return { ok: true, rows: out };
  }

  /* Total number of entries in one scope. A count aggregation is billed as
     a single document read, however many entries exist, so this keeps the
     free daily read quota intact as the board grows. */
  async function countScope(scope) {
    const body = {
      structuredAggregationQuery: {
        structuredQuery: {
          from: [{ collectionId: "lb_scores" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "scope" },
              op: "EQUAL",
              value: toValue(scope),
            },
          },
        },
        aggregations: [{ alias: "c", count: {} }],
      },
    };
    const res = await fetch(apiBase() + ":runAggregationQuery" + key(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const rows = await res.json().catch(() => null);
    const first = Array.isArray(rows) ? rows[0] : rows;
    const v = first && first.result && first.result.aggregateFields && first.result.aggregateFields.c;
    return v ? fromValue(v) : null;
  }

  /* How many entries in one scope beat a given percentage. A count
     aggregation costs a single read whatever the board size, so the rank
     never has to download the documents it is ranking against.

     The orderBy is not cosmetic: Firestore only accepts the scope+bestPct
     range filter when the query names the composite index's own sort
     order (scope, bestPct DESC). Drop it and the query is rejected as
     needing a new index, so it must stay. */
  async function countAbove(scope, pct) {
    const body = {
      structuredAggregationQuery: {
        structuredQuery: {
          from: [{ collectionId: "lb_scores" }],
          where: {
            compositeFilter: {
              op: "AND",
              filters: [
                {
                  fieldFilter: {
                    field: { fieldPath: "scope" },
                    op: "EQUAL",
                    value: toValue(scope),
                  },
                },
                {
                  fieldFilter: {
                    field: { fieldPath: "bestPct" },
                    op: "GREATER_THAN",
                    value: toValue(pct),
                  },
                },
              ],
            },
          },
          orderBy: [{ field: { fieldPath: "bestPct" }, direction: "DESCENDING" }],
        },
        aggregations: [{ alias: "c", count: {} }],
      },
    };
    const res = await fetch(apiBase() + ":runAggregationQuery" + key(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const rows = await res.json().catch(() => null);
    const first = Array.isArray(rows) ? rows[0] : rows;
    const v = first && first.result && first.result.aggregateFields && first.result.aggregateFields.c;
    return v ? fromValue(v) : null;
  }

  /* Rank of this device inside one scope, in three fixed reads: the
     device's own score, how many entries beat it, and the scope total.
     This used to page through the board 300 documents at a time until it
     found the device, which charged a read for every document it skipped;
     a 300-entry board cost ~306 reads per page view. Counting instead
     keeps the cost flat as the board grows. */
  async function fetchMyRank(scope) {
    const mine = await readOwnScore(scope);
    if (!mine || !Number.isFinite(mine.bestPct)) {
      const total = await countScope(scope);
      if (total === null) return { ok: false };
      return { ok: true, rank: 0, total: total, mine: null };
    }

    const results = await Promise.all([countAbove(scope, mine.bestPct), countScope(scope)]);
    if (results[0] === null || results[1] === null) return { ok: false };
    return { ok: true, rank: results[0] + 1, total: results[1], mine: mine };
  }

  window.AXOLeaderboard = {
    enabled: enabled,
    deviceId: deviceId,
    storedName: storedName,
    storeName: storeName,
    normalizeName: normalizeName,
    validateName: validateName,
    rateLeft: rateLeft,
    DAILY_LIMIT: DAILY_LIMIT,
    resolveScope: resolveScope,
    scopeKey: scopeKey,
    subName: subName,
    SUBJECTS: SUBJECTS,
    SUBS: SUBS,
    recordAttempt: recordAttempt,
    readHistory: readHistory,
    bestByScope: bestByScope,
    reserveName: reserveName,
    readOwnScore: readOwnScore,
    submitScore: submitScore,
    fetchTop: fetchTop,
    countScope: countScope,
    countAbove: countAbove,
    fetchMyRank: fetchMyRank,
  };
})();
