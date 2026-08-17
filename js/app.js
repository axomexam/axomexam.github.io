/* ============================================================
   axomexam — app.js
   Application logic: i18n, navigation, routing, rendering,
   search, Q&A reader, and Advanced Timed Mock Tests.
   Supports standard, multi-level subcategories, and flat question JSON schemas.
   Includes dedicated UI language switcher for Category & Sub-category titles.
   ============================================================ */

(() => {
  "use strict";

  /* ================= State ================= */
  const state = {
    categories: [],        // normalized tree
    topicMap: {},          // path -> topic record
    topicIndex: [],        // flat list for search/trending
    ready: false,
    page: 0,               // pagination for current topic page
    lang: "as",            // reading language for Q&A content ("en" | "as")
    uiLang: "as",          // dedicated language for Category & Sub-category titles ("en" | "as")
    mock: null,            // active mock test session
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ================= i18n helpers ================= */
  function t(key) {
    if (typeof I18N !== "undefined" && I18N.en && I18N.en[key]) {
      return I18N.en[key];
    }
    return key;
  }
  function localized(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = state.uiLang || "as";
    return obj[l] || obj.as || obj.en || "";
  }

  /* Universal content extractor supporting both JSON schemas */
  function extractField(item, fieldName) {
    if (!item) return "";
    const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
    
    // Check direct object format: item.q / item.a / item.question
    const obj = item[fieldName] || item[fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName];
    if (obj) {
      if (typeof obj === "string") return obj;
      if (typeof obj === "object") {
        return obj[targetLang] || obj.as || obj.en || "";
      }
    }

    // Check flat keys: item.question_as, item.question_en, item.answer_as, etc.
    const directKey = `${fieldName}_${targetLang}`;
    if (item[directKey] !== undefined) return item[directKey];

    // Fallback across language suffixes
    const asKey = `${fieldName}_as`;
    const enKey = `${fieldName}_en`;
    if (item[asKey] !== undefined) return item[asKey];
    if (item[enKey] !== undefined) return item[enKey];

    return "";
  }

  function localizeContent(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
    return obj[targetLang] || obj.as || obj.en || "";
  }

  /* Universal option list normalizer */
  function getOptionsList(item) {
    if (!item) return [];
    const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;

    // Check array: item.options = [ {en, as}, ... ]
    if (Array.isArray(item.options) && item.options.length) {
      return item.options.map(opt => {
        if (typeof opt === "string") return opt;
        if (typeof opt === "object") return opt[targetLang] || opt.as || opt.en || "";
        return String(opt);
      });
    }

    // Check flat arrays: item.options_as / item.options_en
    const directOpts = item[`options_${targetLang}`];
    if (Array.isArray(directOpts) && directOpts.length) {
      return directOpts;
    }
    if (Array.isArray(item.options_as) && item.options_as.length) return item.options_as;
    if (Array.isArray(item.options_en) && item.options_en.length) return item.options_en;

    return [];
  }

  function applyStaticI18n() {
    const searchEl = $("#master-search");
    if (searchEl) searchEl.placeholder = t("search.placeholder");
    const taglineEl = $("#footer-tagline");
    if (taglineEl) taglineEl.textContent = t("footer.tagline");
    const copyEl = $("#footer-copy");
    if (copyEl) copyEl.textContent = `© ${new Date().getFullYear()} axomexam — ${t("brand.tagline")}`;
    $$("[aria-label]").forEach((el) => {
      const k = el.getAttribute("data-aria-i18n");
      if (k) el.setAttribute("aria-label", t(k));
    });
  }

  /* Category UI Language Switcher HTML Component */
  function categoryLangSwitchHTML() {
    return `
      <div class="cat-lang-toolbar" style="display:flex;justify-content:flex-end;margin-bottom:12px;">
        <div class="lang-switch" role="group" aria-label="Category Title Language">
          <button class="cat-lang-btn ${state.uiLang === "as" ? "active" : ""}" type="button" data-catlang="as" style="padding:4px 12px;font-size:0.84rem;font-weight:700;cursor:pointer;">অসমীয়া</button>
          <button class="cat-lang-btn ${state.uiLang === "en" ? "active" : ""}" type="button" data-catlang="en" style="padding:4px 12px;font-size:0.84rem;font-weight:700;cursor:pointer;">English</button>
        </div>
      </div>`;
  }

  function bindCategoryLangSwitch(renderCallback) {
    $$(".cat-lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.uiLang = btn.dataset.catlang;
        buildDesktopNav();
        buildMobileNav();
        if (renderCallback) renderCallback();
      });
    });
  }

  /* Universal Fetcher for Topic JSON */
  async function fetchTopicData(rec) {
    if (window.API && typeof window.API.getTopic === "function") {
      try {
        let relPath = rec.topic.file;
        if (!relPath) {
          const parts = [rec.cat.id, rec.sub ? rec.sub.id : "", rec.section ? rec.section.id : ""]
            .filter(Boolean)
            .concat([rec.topic.id]);
          relPath = parts.join("/");
        }
        return await API.getTopic(rec.cat.id, relPath);
      } catch (err) {
        return await API.getTopic(rec.cat.id, rec.topic.id);
      }
    }
    return null;
  }

  /* ================= Data normalization ================= */
  function normalize(data) {
    const cats = [];
    const topicMap = {};
    const topicIndex = [];

    const pushTopic = (topic, cat, sub, section) => {
      const path = [cat.id, sub ? sub.id : "", section ? section.id : ""]
        .filter(Boolean)
        .concat([topic.id])
        .join("/");
      const rec = {
        path,
        cat, sub, section, topic,
        title: topic.title || topic.name,
        desc: topic.description,
        tags: topic.tags || [],
        nQuestions: (topic.questions || []).length,
        pdf: topic.pdf || null,
        popularity: Number(topic.popularity) || 0,
      };
      topicMap[path] = rec;
      topicIndex.push(rec);
    };

    const walkCategory = (cat) => {
      cat.name = cat.name || { en: cat.id, as: cat.id };
      cat.description = cat.description || {};
      const subs = cat.subcategories || [];
      if (subs.length) {
        subs.forEach((sub) => {
          sub.name = sub.name || { en: sub.id, as: sub.id };
          const sections = sub.sections || [];
          if (sections.length) {
            sections.forEach((sec) => {
              sec.name = sec.name || { en: sec.id, as: sec.id };
              (sec.topics || []).forEach((tp) => pushTopic(tp, cat, sub, sec));
            });
          } else {
            (sub.topics || []).forEach((tp) => pushTopic(tp, cat, sub, null));
          }
        });
      } else {
        const sections = cat.sections || [];
        if (sections.length) {
          sections.forEach((sec) => {
            sec.name = sec.name || { en: sec.id, as: sec.id };
            (sec.topics || []).forEach((tp) => pushTopic(tp, cat, null, sec));
          });
        } else {
          (cat.topics || []).forEach((tp) => pushTopic(tp, cat, null, null));
        }
      }
      cats.push(cat);
    };

    (data.categories || []).forEach(walkCategory);

    return { categories: cats, topicMap, topicIndex };
  }

  /* ================= Navigation rendering ================= */
  function catColor(id) {
    const c = state.categories.find((x) => x.id === id);
    return (c && c.color) || (typeof CATEGORY_COLORS !== "undefined" ? (CATEGORY_COLORS[id] || CATEGORY_COLORS.default) : "#0ea5e9");
  }
  function catIcon(id) {
    const c = state.categories.find((x) => x.id === id);
    return (c && c.icon) || (typeof CATEGORY_ICONS !== "undefined" ? CATEGORY_ICONS[id] : "A") || "A";
  }
  function catIconHTML(id) {
    const svg = typeof CATEGORY_ICON_SVG !== "undefined" && CATEGORY_ICON_SVG[id];
    if (svg) return `<span class="cat-svg">${svg}</span>`;
    return escapeHtml(catIcon(id));
  }

  function topicIconHTML(topicId, catId) {
    const id = String(topicId || "");
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(id)) return `<span class="cat-svg">${svg}</span>`;
      }
    }
    return catIconHTML(catId);
  }

  function countTopics(cat) {
    return state.topicIndex.filter((r) => r.cat.id === cat.id).length;
  }

  function navLinkHTML(item, activePath) {
    const kids = item.subcategories || item.sections || [];
    const hasKids = !!(kids && kids.length);
    const isActive = activePath && activePath.split("/")[0] === item.id;
    return `
      <li class="${hasKids ? "has-drop" : ""}">
        <a class="nav-link ${isActive ? "active" : ""}" href="#/category/${item.id}">
          <span>${escapeHtml(localized(item.name))}</span>
          ${hasKids ? '<span class="caret"></span>' : ""}
        </a>
        ${hasKids ? renderDesktopDrop(item, activePath) : ""}
      </li>`;
  }

  function renderDesktopDrop(item, activePath) {
    const kids = item.subcategories || item.sections || [];
    return `
      <div class="dropdown">
        ${kids.map((sub) => {
          const grand = sub.sections;
          if (grand && grand.length) {
            return `
              <div class="has-drop">
                <a href="#/category/${item.id}/${sub.id}">
                  <span>${escapeHtml(localized(sub.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${grand.map((sec) => `
                    <a href="#/category/${item.id}/${sub.id}/${sec.id}">
                      <span>${escapeHtml(localized(sec.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`;
          }
          return `<a href="#/category/${item.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>`;
        }).join("")}
      </div>`;
  }

  const FEATURED_IDS = ["gk", "science", "math", "history", "reasoning"];

  function buildDesktopNav() {
    const list = $("#nav-list");
    if (!list) return;
    const activePath = currentPath();
    const featured = state.categories.filter((c) => FEATURED_IDS.includes(c.id));
    const rest = state.categories.filter((c) => !FEATURED_IDS.includes(c.id));
    const items = [];

    items.push(extraLink("#/", t("nav.home"), activePath));
    featured.forEach((c) => items.push(navLinkHTML(c, activePath)));
    items.push(extraLink("#/mock-test", t("nav.mock"), activePath));
    items.push(extraLink("#/downloads", t("nav.downloads"), activePath));
    items.push(moreDropdownHTML(rest, activePath));
    list.innerHTML = items.join("");
  }

  function extraLink(href, label, activePath) {
    const on = activePath.split("/")[0] === href.replace("#/", "");
    return `<li><a class="nav-link ${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a></li>`;
  }

  function moreDropdownHTML(rest, activePath) {
    const root = activePath.split("/")[0];
    const isInside = rest.some((c) => c.id === root) || root === "submit" || root === "previous-year";
    const catLinks = rest.map((c) => {
      const on = root === c.id;
      return `<a class="${on ? "active" : ""}" href="#/category/${c.id}">${escapeHtml(localized(c.name))}</a>`;
    }).join("");
    const extraLinks = [
      ["#/previous-year", t("nav.previousYear")],
      ["#/submit", t("nav.submit")],
    ].map(([href, label]) => {
      const on = root === href.replace("#/", "");
      return `<a class="${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
    }).join("");
    return `
      <li class="has-drop">
        <a class="nav-link ${isInside ? "active" : ""}" href="#/categories">
          <span>${escapeHtml(t("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${catLinks ? `<div class="d-label">${escapeHtml(t("nav.categories"))}</div>${catLinks}` : ""}
          <div class="d-label">${escapeHtml(t("mmenu.extra"))}</div>
          ${extraLinks}
        </div>
      </li>`;
  }

  function buildMobileNav() {
    const nav = $("#mobile-nav");
    if (!nav) return;
    const activePath = currentPath();
    const catParts = state.categories.map((cat) => {
      const kids = cat.subcategories || cat.sections || [];
      return `
        <li>
          <div class="m-row">
            <a class="m-item ${activePath.split("/")[0] === cat.id ? "active" : ""}" href="#/category/${cat.id}">
              ${escapeHtml(localized(cat.name))}
            </a>
            ${kids.length ? `<button class="m-toggle" data-toggle data-target="${cat.id}" aria-label="toggle"><span class="caret"></span></button>` : ""}
          </div>
          ${kids.length ? `<div class="m-sub" id="msub-${cat.id}">${kids.map((sub) => {
            const grand = sub.sections;
            if (grand && grand.length) {
              return `
                <div class="m-row">
                  <a class="m-item" href="#/category/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>
                  <button class="m-toggle" data-toggle data-target="${cat.id}-${sub.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${cat.id}-${sub.id}">
                  ${grand.map((sec) => `<a href="#/category/${cat.id}/${sub.id}/${sec.id}">${escapeHtml(localized(sec.name))}</a>`).join("")}
                </div>`;
            }
            return `<a href="#/category/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>`;
          }).join("")}</div>` : ""}
        </li>`;
    });

    const downloadItem = `
      <li class="m-download">
        <a class="m-item" href="#/downloads">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
          ${escapeHtml(t("nav.downloads"))}
        </a>
      </li>`;
    const prevYearItem = `
      <li class="m-py">
        <a class="m-item" href="#/previous-year">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/></svg>
          ${escapeHtml(t("nav.previousYear"))}
        </a>
      </li>`;
    const ci = state.categories.findIndex((c) => c.id === "computer");
    if (ci !== -1) catParts.splice(ci + 1, 0, prevYearItem, downloadItem);
    else catParts.push(prevYearItem, downloadItem);

    nav.innerHTML = catParts.join("");

    $$("[data-toggle]", nav).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = $(`#msub-${btn.dataset.target}`);
        if (!target) return;
        target.classList.toggle("open");
        btn.classList.toggle("open");
      });
    });
  }

  /* ================= Routing ================= */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    return h.split("/").filter(Boolean);
  }
  function currentPath() {
    return parseHash().filter((s) => s !== "category" && s !== "topic" && s !== "mock-test").join("/");
  }

  function resetScroll() {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }

  async function renderRoute() {
    if (!state.ready) return;
    const segs = parseHash();
    const main = $("#app");
    closeMobileMenu();
    closeReadingModal();
    updateTabbar(segs);
    resetScroll();

    if (segs[0] !== "mock-test" && state.mock && state.mock.timerId) {
      stopMockTimer();
      state.mock = null;
    }

    if (segs.length === 0) return renderHome(main);
    if (segs[0] === "category") {
      const cat = state.categories.find((c) => c.id === segs[1]);
      if (!cat) return render404(main);
      if (segs.length >= 2 && segs[2]) return renderSubOrSection(main, segs);
      return renderCategoryPage(main, cat);
    }
    if (segs[0] === "topic") {
      const path = segs.slice(1).join("/");
      const rec = state.topicMap[path];
      if (!rec) return render404(main);
      return renderTopicPage(main, rec);
    }
    if (segs[0] === "about") return renderStatic(main, "about");
    if (segs[0] === "contact") return renderStatic(main, "contact");
    if (segs[0] === "trending") return renderTrendingPage(main);
    if (segs[0] === "previous-year") return renderPreviousYear(main, segs);
    if (segs[0] === "categories") return renderCategoriesPage(main);
    if (segs[0] === "search") return renderSearchPage(main);
    if (segs[0] === "downloads") return renderDownloadsPage(main);
    if (segs[0] === "submit") return renderSubmitPage(main);
    if (segs[0] === "mock-test") {
      return handleMockRouting(main, segs);
    }
    return render404(main);
  }

  /* ================= Homepage ================= */
  function renderHome(main) {
    const totalQuestions = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0);
    const totalPdfs = state.topicIndex.filter((r) => r.pdf).length;
    const trending = trendingTopics(state.topicIndex).slice(0, typeof CONFIG !== "undefined" ? CONFIG.TRENDING_COUNT : 6);
    const firstCat = state.categories[0]?.id || "gk";

    main.innerHTML = `
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-brand" href="#/">
            <span class="brand-mark">A</span>
            <span class="brand-text">axomexam</span>
          </a>
          <a class="hero-badge" href="#/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${t("hero.daily")}
          </a>
          <h1>${t("hero.title")}</h1>
          <p class="sub">${t("hero.sub")}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/category/${firstCat}">${t("hero.cta")}</a>
            <a class="btn btn-ghost" href="#/mock-test">${t("hero.cta3")}</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${totalQuestions.toLocaleString()}+</b><span>${t("stat.questions")}</span></div>
            <div class="stat"><b>${state.topicIndex.length}+</b><span>${t("stat.topics")}</span></div>
            <div class="stat"><b>${totalPdfs}+</b><span>${t("stat.pdfs")}</span></div>
          </div>
        </div>
        ${heroVisualHTML()}
      </section>

      <section class="section">
        <div class="section-head reveal">
          <div>
            <h2>${t("home.categories")}</h2>
            <p class="sec-sub">${t("home.categories.sub")}</p>
          </div>
        </div>
        <div class="cat-grid">
          ${state.categories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="#/category/${c.id}" style="--cat:${color}" data-delay="${i * 60}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  <b>${escapeHtml(localized(c.name))}</b>
                  <span><span class="cat-count">${countTopics(c)}</span> ${t("cat.topics")}</span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>

      <section class="section" style="padding-bottom: 40px;">
        <div class="section-head reveal">
          <div>
            <h2>${t("home.trending")}</h2>
            <p class="sec-sub">${t("home.trending.sub")}</p>
          </div>
          <a class="see-all" href="#/trending">${t("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="#/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${i * 50}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span>
                <b>${escapeHtml(localized(r.title))}</b>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))} • ${r.nQuestions || 0} ${t("topic.questions")}</span>
              </span>
              <span class="trend-flame">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </span>
            </a>`).join("")}
        </div>
      </section>`;

    observeReveals();
  }

  function heroVisualHTML() {
    const examName = (typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_NAME) || "";
    const target = new Date((typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_DATE) || "2026-12-31").getTime();
    const now = Date.now();
    const daysLeft = target > now ? Math.max(0, Math.ceil((target - now) / 86400000)) : 0;
    const fraction = target > now ? Math.min(1, daysLeft / 365) : 0;
    const C = 314;
    const offset = C * (1 - fraction);
    return `
      <div class="hero-visual">
        <div class="countdown-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="50"></circle>
            <circle class="ring-fg" cx="60" cy="60" r="50" stroke-dashoffset="${offset.toFixed(1)}"></circle>
          </svg>
          <div class="ring-center">
            <span class="ring-num">${daysLeft}</span>
            <span class="ring-label">${t("hero.days")}</span>
            <span class="ring-label">${escapeHtml(examName)}</span>
          </div>
        </div>
        <span class="float-chip c1"><span class="dot"></span>GK</span>
        <span class="float-chip c2"><span class="dot"></span>Math</span>
        <span class="float-chip c3"><span class="dot"></span>Science</span>
      </div>`;
  }

  function trendingTopics(list) {
    return list.slice().sort((a, b) => {
      if (!!a.extra !== !!b.extra) return a.extra ? -1 : 1;
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      return (b.nQuestions || 0) - (a.nQuestions || 0);
    });
  }

  /* ================= Category page ================= */
  function renderCategoryPage(main, cat) {
    const subs = cat.subcategories || cat.sections || [];
    const directTopics = cat.topics || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        ${categoryLangSwitchHTML()}
        <h1>${escapeHtml(localized(cat.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.description)) || escapeHtml(localized(cat.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${subs.length ? `
          <div class="sub-grid">
            ${subs.map((s, i) => `
              <a class="sub-card reveal" href="#/category/${cat.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span><b>${escapeHtml(localized(s.name))}</b>
                  <span>${(s.sections ? s.sections.length : 0) || (s.topics ? s.topics.length : 0)} ${s.sections ? t("cat.subsections") : t("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>`
        : (directTopics.length ? topicListHTML(cat, null, null, directTopics) : emptyHTML())}
      </section>`;
    
    bindCategoryLangSwitch(() => renderCategoryPage(main, cat));
    observeReveals();
  }

  function renderSubOrSection(main, segs) {
    const cat = state.categories.find((c) => c.id === segs[1]);
    const sub = (cat.subcategories || cat.sections || []).find((s) => s.id === segs[2]);
    if (!sub) return render404(main);

    if (segs[3]) {
      const sec = (sub.sections || []).find((s) => s.id === segs[3]);
      if (!sec) return render404(main);
      return renderSectionPage(main, cat, sub, sec);
    }

    const secs = sub.sections;
    const topics = sub.topics;
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="#/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        ${categoryLangSwitchHTML()}
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sub.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${secs && secs.length ? `
          <div class="sub-grid">
            ${secs.map((s, i) => `
              <a class="sub-card reveal" href="#/category/${cat.id}/${sub.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span><b>${escapeHtml(localized(s.name))}</b>
                  <span>${(s.topics || []).length} ${t("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>` : (topics && topics.length ? topicListHTML(cat, sub, null, topics) : emptyHTML())}
      </section>`;
    
    bindCategoryLangSwitch(() => renderSubOrSection(main, segs));
    observeReveals();
  }

  function renderSectionPage(main, cat, sub, sec) {
    const segs = parseHash();
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="#/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span>
          <a href="#/category/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        ${categoryLangSwitchHTML()}
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sec.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${topicListHTML(cat, sub, sec, sec.topics || [])}
      </section>`;
    
    bindCategoryLangSwitch(() => renderSectionPage(main, cat, sub, sec));
    observeReveals();
  }

  function topicListHTML(cat, sub, sec, topics) {
    if (!topics.length) return emptyHTML();
    return `
      <div class="sub-grid">
        ${topics.map((tp, i) => {
          const path = [cat.id, sub ? sub.id : "", sec ? sec.id : ""].filter(Boolean).concat([tp.id]).join("/");
          const rec = state.topicMap[path];
          const qCount = (rec && rec.nQuestions > 0) ? rec.nQuestions : ((tp.questions || []).length);
          const countDisplay = qCount > 0 ? `${qCount} ${t("topic.questions")}` : t("btn.practice");
          return `
            <a class="sub-card reveal" href="#/topic/${path}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span><b>${escapeHtml(localized(tp.name))}</b>
                <span id="count-${path.replace(/\//g, '-')}">${countDisplay}</span>
              </span>
            </a>`;
        }).join("")}
      </div>`;
  }

  function emptyHTML() {
    return `<div class="qa-empty"><div class="big">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M9 9h6"/><path d="M9 13h4"/><path d="m15 16 2 2 4-4"/></svg>
    </div><p>${t("search.noresult")}</p></div>`;
  }

  /* ================= Topic page ================= */
  function breadcrumbForTopic(rec) {
    const bits = [`<a href="#/">${t("breadcrumb.home")}</a>`];
    bits.push(`<a href="#/category/${rec.cat.id}">${escapeHtml(localized(rec.cat.name))}</a>`);
    if (rec.sub) bits.push(`<a href="#/category/${rec.cat.id}/${rec.sub.id}">${escapeHtml(localized(rec.sub.name))}</a>`);
    if (rec.section) bits.push(`<a href="#/category/${rec.cat.id}/${rec.sub ? rec.sub.id + "/" : ""}${rec.section.id}">${escapeHtml(localized(rec.section.name))}</a>`);
    return bits.map((b, i) => (i ? `<span class="bc-sep">/</span>` : "") + b).join("");
  }

  async function renderTopicPage(main, rec) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    try {
      const data = await fetchTopicData(rec);
      if (data) {
        rec.topic = Object.assign({}, rec.topic, data);
        rec.topic.title = rec.topic.title || rec.title;
        rec.nQuestions = (data.questions || []).length;
      }
    } catch { }

    state.page = 0;
    const qs = rec.topic.questions || [];

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1>${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc">${escapeHtml(localized(rec.topic.description)) || ""}</p>
      </div>

      <div class="topic-layout">
        <div>
          <div class="qa-toolbar">
            <span class="qt-info">${qs.length} ${t("topic.questions")}</span>
            <div class="qa-actions">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                ${t("topic.reading")}
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language">
                <button class="lang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as">${t("topic.lang.as")}</button>
                <button class="lang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en">${t("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list"></div>
          <div id="pager"></div>
        </div>
      </div>`;

    renderQAPage();

    $("#qa-reading").addEventListener("click", openReadingModal);
    $$(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        document.body.setAttribute("data-lang", state.lang);
        $$(".lang-btn").forEach((x) => x.classList.toggle("active", x.dataset.lang === state.lang));
        renderQAPage();
        refreshReadingModal();
      });
    });
  }

  function renderQAPage() {
    const rec = currentTopicRec();
    if (!rec) return;
    const qs = rec.topic.questions || [];
    const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
    const totalPages = Math.max(1, Math.ceil(qs.length / perPage));
    const start = state.page * perPage;
    const slice = qs.slice(start, start + perPage);

    const list = $("#qa-list");

    if (!slice.length) {
      list.innerHTML = `<div class="qa-empty"><div class="big">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div><p>${t("toast.noquestions")}</p></div>`;
    } else {
      list.innerHTML = slice.map((item, i) => {
        const n = start + i + 1;
        const qtext = extractField(item, "question");
        const atext = extractField(item, "answer");
        const options = getOptionsList(item);
        const explanation = extractField(item, "explanation");

        return `
          <article class="qa-card" data-n="${n}">
            <div class="qa-q">
              <span class="qno">${n}</span>
              <span class="qtext">${escapeHtml(qtext)}</span>
            </div>
            ${options.length ? `
              <div class="qa-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:6px;margin:10px 0 10px 32px;">
                ${options.map((opt, optIdx) => `
                  <div style="font-size:0.88rem;color:var(--ink-soft);background:var(--bg-subtle,#f8fafc);padding:6px 10px;border-radius:6px;border:1px solid var(--border,#e2e8f0);">
                    <b style="color:var(--primary);margin-right:4px;">(${String.fromCharCode(65 + optIdx)})</b> ${escapeHtml(opt)}
                  </div>
                `).join("")}
              </div>` : ""
            }
            <div class="qa-a">
              <span class="a-label">${t("topic.answer")}:</span>
              <span class="a-body">${escapeHtml(atext)}</span>
            </div>
            ${explanation ? `
              <div class="qa-exp" style="margin-top:6px;font-size:0.84rem;color:var(--ink-muted,#64748b);padding-left:32px;">
                <b>ব্যাখ্যা:</b> ${escapeHtml(explanation)}
              </div>` : ""
            }
          </article>`;
      }).join("");
    }

    const pager = $("#pager");
    if (totalPages > 1) {
      pager.innerHTML = `
        <button id="pg-prev" ${state.page === 0 ? "disabled" : ""}>${t("topic.prev")}</button>
        <span class="pager-info">${state.page + 1} / ${totalPages}</span>
        <button id="pg-next" ${state.page >= totalPages - 1 ? "disabled" : ""}>${t("topic.next")}</button>`;
      $("#pg-prev").addEventListener("click", () => { if (state.page > 0) { state.page--; renderQAPage(); refreshReadingModal(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
      $("#pg-next").addEventListener("click", () => { if (state.page < totalPages - 1) { state.page++; renderQAPage(); refreshReadingModal(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    } else {
      pager.innerHTML = "";
    }
  }

  /* ================= Reading-mode popup ================= */
  function ensureReadingModal() {
    let modal = $("#read-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "read-modal";
    modal.className = "read-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="read-modal-backdrop" id="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" aria-modal="true">
        <div class="read-modal-head">
          <div class="read-modal-titles">
            <span class="read-modal-title"></span>
            <span class="read-modal-sub"></span>
          </div>
          <button id="read-modal-close" class="read-close" type="button" aria-label="Close">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="read-modal-body" id="read-modal-body"></div>
        <div class="read-modal-foot">
          <button id="read-prev" type="button">${t("topic.prev")}</button>
          <span class="read-pageinfo" id="read-pageinfo"></span>
          <button id="read-next" type="button">${t("topic.next")}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $("#read-modal-close", modal).addEventListener("click", closeReadingModal);
    $("#read-modal-backdrop", modal).addEventListener("click", closeReadingModal);
    $("#read-prev", modal).addEventListener("click", () => {
      if (state.page > 0) { state.page--; renderReadingModalPage(); }
    });
    $("#read-next", modal).addEventListener("click", () => {
      const rec = currentTopicRec();
      const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
      const totalPages = rec ? Math.max(1, Math.ceil((rec.topic.questions || []).length / perPage)) : 1;
      if (state.page < totalPages - 1) { state.page++; renderReadingModalPage(); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.hidden) closeReadingModal();
    });
    return modal;
  }

  function openReadingModal() {
    const rec = currentTopicRec();
    if (!rec) return;
    const modal = ensureReadingModal();
    const qs = rec.topic.questions || [];
    $(".read-modal-title", modal).textContent = localized(rec.topic.title);
    $(".read-modal-sub", modal).textContent = `${qs.length} ${t("topic.questions")} • ${state.lang === "as" ? t("topic.lang.as") : t("topic.lang.en")}`;
    modal.hidden = false;
    renderReadingModalPage();
  }

  function closeReadingModal() {
    const modal = $("#read-modal");
    if (modal) modal.hidden = true;
  }

  function renderReadingModalPage() {
    const rec = currentTopicRec();
    const modal = $("#read-modal");
    if (!rec || !modal || modal.hidden) return;
    const qs = rec.topic.questions || [];
    const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
    const totalPages = Math.max(1, Math.ceil(qs.length / perPage));
    const start = state.page * perPage;
    const slice = qs.slice(start, start + perPage);

    $(".read-modal-sub", modal).textContent = `${qs.length} ${t("topic.questions")} • ${state.lang === "as" ? t("topic.lang.as") : t("topic.lang.en")}`;

    const body = $("#read-modal-body", modal);
    body.innerHTML = slice.map((item, i) => {
      const n = start + i + 1;
      const qtext = extractField(item, "question");
      const atext = extractField(item, "answer");
      const options = getOptionsList(item);

      return `
        <article class="qa-card read-item" data-n="${n}">
          <div class="qa-q">
            <span class="qno">${n}</span>
            <span class="qtext">${escapeHtml(qtext)}</span>
          </div>
          ${options.length ? `
            <div class="qa-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:6px;margin:8px 0 8px 32px;">
              ${options.map((opt, optIdx) => `
                <div style="font-size:0.85rem;color:var(--ink-soft);background:var(--bg-subtle,#f8fafc);padding:5px 8px;border-radius:4px;border:1px solid var(--border,#e2e8f0);">
                  <b>(${String.fromCharCode(65 + optIdx)})</b> ${escapeHtml(opt)}
                </div>
              `).join("")}
            </div>` : ""
          }
          <div class="qa-a">
            <span class="a-label">${t("topic.answer")}:</span>
            <span class="a-body">${escapeHtml(atext)}</span>
          </div>
        </article>`;
    }).join("");

    $("#read-pageinfo", modal).textContent = `${state.page + 1} / ${totalPages}`;
    $("#read-prev", modal).disabled = state.page === 0;
    $("#read-next", modal).disabled = state.page >= totalPages - 1;
  }

  function refreshReadingModal() {
    const modal = $("#read-modal");
    if (!modal || modal.hidden) return;
    renderReadingModalPage();
  }

  function currentTopicRec() {
    const segs = parseHash();
    if (segs[0] !== "topic") return null;
    return state.topicMap[segs.slice(1).join("/")];
  }

  /* ================= Trending page ================= */
  function renderTrendingPage(main) {
    const trending = trendingTopics(state.topicIndex);
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.trending.title")}</span></nav>
        <h1>${t("page.trending.title")}</h1>
        <p class="page-desc">${t("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="#/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${(i % 10) * 40}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span><b>${escapeHtml(localized(r.title))}</b>
                <span>${escapeHtml(localized(r.cat.name))}${r.sub ? " • " + escapeHtml(localized(r.sub.name)) : ""} • ${r.nQuestions || 0} ${t("topic.questions")}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= Static pages ================= */
  function renderStatic(main, key) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t(`page.${key}.title`)}</span></nav>
        <h1>${t(`page.${key}.title`)}</h1>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel">
          <p>${t(`page.${key}.p1`)}</p>
          ${key === "about" ? `<p style="margin-top:10px;">${t("page.about.p2")}</p>` : ""}
        </div>
        <div class="info-panel">
          <h2>GitHub</h2>
          <p>${(typeof CONFIG !== "undefined" && CONFIG.USE_REMOTE)
            ? `<a href="https://github.com/${CONFIG.OWNER}/${CONFIG.REPO}" target="_blank" rel="noopener" style="color:var(--primary);font-weight:600;">github.com/${CONFIG.OWNER}/${CONFIG.REPO}</a>`
            : `<a href="https://github.com/" target="_blank" rel="noopener" style="color:var(--primary);font-weight:600;">github.com</a>`}</p>
          <ul>
            <li data-i18n="about.li1">${t("about.li1")}</li>
            <li data-i18n="about.li2">${t("about.li2")}</li>
            <li data-i18n="about.li3">${t("about.li3")}</li>
          </ul>
        </div>
      </section>`;
    applyStaticI18n();
  }

  /* ================= Search ================= */
  function normalizeText(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function allLangs(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return [obj.en, obj.as].filter(Boolean).join(" ");
  }

  function searchIndex(query) {
    const q = normalizeText(query);
    if (q.length < 2) return [];
    const hits = [];
    const searchLimit = typeof CONFIG !== "undefined" ? CONFIG.SEARCH_LIMIT : 20;
    for (const r of state.topicIndex) {
      const titleEn = normalizeText(localized({ en: r.title.en }));
      const titleAs = normalizeText(localized({ as: r.title.as }));
      const tagHits = (r.tags || []).filter((tag) => normalizeText(tag).includes(q));
      const qHits = (r.topic.questions || []).filter((item) => {
        const qStr = (typeof item.q === "object" ? allLangs(item.q) : (item.q || item.question_en || "") + " " + (item.question_as || ""));
        const aStr = (typeof item.a === "object" ? allLangs(item.a) : (item.a || item.answer_en || "") + " " + (item.answer_as || ""));
        return normalizeText(qStr).includes(q) || normalizeText(aStr).includes(q);
      });
      let score = 0;
      if (titleEn.includes(q)) score += 5;
      if (titleAs.includes(q)) score += 5;
      score += tagHits.length * 3;
      score += qHits.length * 1.5;
      if (score > 0) hits.push({ rec: r, score, matchCount: qHits.length + tagHits.length });
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, searchLimit);
  }

  function bindSearch() {
    const input = $("#master-search");
    const box = $("#search-results");
    if (!input || !box) return;
    let timer;

    const close = () => { box.hidden = true; box.innerHTML = ""; };
    const onInput = (e) => {
      clearTimeout(timer);
      const v = e.target.value;
      if (v.trim().length < 2) { close(); return; }
      timer = setTimeout(() => {
        const hits = searchIndex(v);
        if (!hits.length) {
          box.innerHTML = `<div class="sr-empty">${t("search.noresult")}</div>`;
        } else {
          box.innerHTML = `
            <div class="sr-head">${t("search.results")} (${hits.length})</div>
            ${hits.map((h, i) => `
              <a class="sr-item" href="#/topic/${h.rec.path}" data-idx="${i}">
                <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
                <span>
                  <span class="sr-title">${escapeHtml(localized(h.rec.title))}</span>
                  <span class="sr-sub">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.nQuestions || 0} ${t("topic.questions")}</span>
                </span>
              </a>`).join("")}`;
          box.innerHTML += `<a class="sr-item" href="#/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${t("see.all")}</a>`;
        }
        box.hidden = false;
      }, 180);
    };

    input.addEventListener("input", onInput);
    input.addEventListener("focus", () => {
      if (input.value.trim().length >= 2) onInput({ target: input });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap")) close();
    });
    box.addEventListener("click", (e) => {
      const a = e.target.closest("a.sr-item");
      if (a) { input.value = ""; close(); }
    });
  }

  /* ================= Dedicated search page ================= */
  function renderSearchPage(main) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.search")}</span></nav>
        <h1>${t("tab.search")}</h1>
      </div>
      <div class="search-page">
        <div class="sp-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="search" id="page-search" autocomplete="off" spellcheck="false" placeholder="${t("search.placeholder")}" />
        </div>
        <div class="sp-results" id="page-search-results">
          <div class="sp-empty">${t("search.hint")}</div>
        </div>
      </div>`;

    const input = $("#page-search");
    const results = $("#page-search-results");
    let timer;
    input.addEventListener("input", () => {
      clearTimeout(timer);
      const v = input.value;
      timer = setTimeout(() => {
        const q = v.trim();
        if (q.length < 2) {
          results.innerHTML = `<div class="sp-empty">${t("search.hint")}</div>`;
          return;
        }
        const hits = searchIndex(q);
        if (!hits.length) {
          results.innerHTML = `<div class="sp-empty">${t("search.noresult")}</div>`;
          return;
        }
        results.innerHTML = hits.map((h) => `
          <a class="sp-topic" href="#/topic/${h.rec.path}">
            <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
            <span>
              <b>${escapeHtml(localized(h.rec.title))}</b>
              <span>${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.nQuestions || 0} ${t("topic.questions")}</span>
            </span>
          </a>`).join("");
      }, 180);
    });
    input.focus();
  }

  /* ================= Mobile menu ================= */
  function closeMobileMenu() {
    const m = $("#mobile-menu");
    const b = $("#mobile-backdrop");
    const h = $("#hamburger");
    if (m) { m.classList.remove("open"); m.hidden = true; }
    if (b) { b.classList.remove("open"); b.hidden = true; }
    if (h) { h.classList.remove("open"); h.setAttribute("aria-expanded", "false"); }
  }
  function openMobileMenu() {
    const m = $("#mobile-menu");
    const b = $("#mobile-backdrop");
    const h = $("#hamburger");
    if (m) m.hidden = false;
    if (b) b.hidden = false;
    requestAnimationFrame(() => {
      if (m) m.classList.add("open");
      if (b) b.classList.add("open");
    });
    if (h) { h.classList.add("open"); h.setAttribute("aria-expanded", "true"); }
  }

  /* ================= Reveal on scroll ================= */
  let revealObserver;
  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    els.forEach((el) => {
      const d = parseInt(el.dataset.delay || "0", 10);
      if (d) el.style.transitionDelay = `${d}ms`;
    });
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revealObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach((el) => revealObserver.observe(el));
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function render404(main) {
    main.innerHTML = `
      <div class="page-head" style="padding:80px 0;text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p class="page-desc" style="margin:12px auto;">${t("page.error.sub")}</p>
        <div style="margin-top:22px;"><a class="btn btn-primary" href="#/">${t("page.error.btn")}</a></div>
      </div>`;
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ================= Categories page ================= */
  function renderCategoriesPage(main) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.categories")}</span></nav>
        ${categoryLangSwitchHTML()}
        <h1>${t("tab.categories")}</h1>
        <p class="page-desc">${t("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${state.categories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="#/category/${c.id}" style="--cat:${color}" data-delay="${i * 50}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  <b>${escapeHtml(localized(c.name))}</b>
                  <span>${escapeHtml(localized(c.description))}</span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>`;
    
    bindCategoryLangSwitch(() => renderCategoriesPage(main));
    observeReveals();
  }

  /* ================= Downloads page ================= */
  async function renderDownloadsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;

    let files = [];
    try {
      files = await API.listDownloads();
    } catch (err) {
      console.error("Failed to load downloads:", err);
    }

    const card = (f) => `
      <div class="dl-item">
        <span class="dl-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        </span>
        <span class="dl-meta">
          <b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b>
          <span>PDF</span>
        </span>
        <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener">${t("dl.download")}</a>
      </div>`;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.downloads.title")}</span></nav>
        <h1>${t("page.downloads.title")}</h1>
        <p class="page-desc">${t("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${files.length
          ? `<div class="dl-list">${files.map(card).join("")}</div>`
          : `<div class="info-panel"><p>${t("downloads.none")}</p></div>`}
      </section>`;
  }

  /* ================= Previous Year Questions ================= */
  async function renderPreviousYear(main, segs) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;

    if (segs.length === 1) {
      renderPreviousYearExams(main);
      return;
    }

    const exam = ((typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || []).find((e) => e.id === segs[1]);
    if (!exam) return render404(main);

    if (segs.length === 2) {
      const years = await API.listPreviousYearYears(exam.id);
      renderPreviousYearYears(main, exam, years);
      return;
    }

    const year = segs[2];
    const files = await API.listPreviousYearPdfs(exam.id, year);
    renderPreviousYearPapers(main, exam, year, files);
  }

  function renderPreviousYearExams(main) {
    const exams = (typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.previous-year.title")}</span></nav>
        <h1>${t("page.previous-year.title")}</h1>
        <p class="page-desc">${t("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${exams.length ? `
          <div class="section-head"><div><h2>${t("pyear.choose")}</h2><p class="sec-sub">${t("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${exams.map((ex, i) => `
              <a class="sub-card reveal" href="#/previous-year/${ex.id}" style="--cat:${ex.color}" data-delay="${i * 40}">
                <span class="sub-ico">${escapeHtml(ex.icon || ex.id.slice(0, 2).toUpperCase())}</span>
                <span><b>${escapeHtml(localized(ex.name))}</b>
                  <span>${t("pyear.years")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("downloads.none")}</p></div>`}
      </section>`;
    observeReveals();
  }

  function renderPreviousYearYears(main, exam, years) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="#/previous-year">${t("page.previous-year.title")}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(exam.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))}</h1>
        <p class="page-desc">${t("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${years.length ? `
          <div class="sub-grid">
            ${years.map((yr, i) => `
              <a class="sub-card reveal" href="#/previous-year/${exam.id}/${yr}" style="--cat:${exam.color}" data-delay="${i * 50}">
                <span class="sub-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg>
                </span>
                <span><b>${escapeHtml(yr)}</b>
                  <span>${t("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("pyear.noYears")}</p></div>`}
      </section>`;
    observeReveals();
  }

  function renderPreviousYearPapers(main, exam, year, files) {
    const card = (f) => `
      <div class="dl-item">
        <span class="dl-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        </span>
        <span class="dl-meta">
          <b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b>
          <span>${escapeHtml(localized(exam.name))} • ${escapeHtml(year)}</span>
        </span>
        <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener">${t("dl.download")}</a>
      </div>`;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="#/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <a href="#/previous-year/${exam.id}">${escapeHtml(localized(exam.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(year)}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))} — ${escapeHtml(year)}</h1>
        <p class="page-desc">${t("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${files.length
          ? `<div class="dl-list">${files.map(card).join("")}</div>`
          : `<div class="info-panel"><p>${t("pyear.none")}</p></div>`}
      </section>`;
  }

  /* ================= Submit Q&A page ================= */
  function renderSubmitPage(main) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="#/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.submit.title")}</span></nav>
        <h1>${t("page.submit.title")}</h1>
        <p class="page-desc">${t("page.submit.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        <div class="submit-panel">
          <label>${t("submit.name")}
            <input type="text" id="sub-name" maxlength="60" />
          </label>
          <label>${t("submit.topic")}
            <input type="text" id="sub-topic" maxlength="120" placeholder="${escapeHtml(t("submit.topic.ph"))}" />
          </label>
          <label>${t("submit.question")}
            <textarea id="sub-question" rows="4" maxlength="2000" placeholder="${escapeHtml(t("submit.question.ph"))}"></textarea>
          </label>
          <label>${t("submit.answer")}
            <textarea id="sub-answer" rows="3" maxlength="2000" placeholder="${escapeHtml(t("submit.answer.ph"))}"></textarea>
          </label>
          <p class="submit-hint">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/></svg>
            ${t("submit.hint")}
          </p>
          <div class="submit-actions">
            <button class="btn btn-accent" id="sub-wa" type="button">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.1 13.6c-.2.6-1.2 1.1-1.7 1.2-.4 0-.9.2-3-.6-2.5-1-4.1-3.6-4.2-3.8-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.6.8 2 .9 2.1.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.7 1.6.3.2.5.1.7-.1.2-.2.8-.9 1-1.3.2-.3.4-.3.7-.2.3.1 1.7.8 2 1 .3.2.5.3.6.4.1.2.1.7-.1 1.3z"/></svg>
              ${t("submit.sendWhatsApp")}
            </button>
            <button class="btn btn-outline" id="sub-tg" type="button">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21.9 4.6 18.9 19c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.4 12.7 1.8 11.3c-1-.3-1-.9.2-1.4L20.5 3.2c.8-.3 1.5.2 1.4 1.4z"/></svg>
              ${t("submit.sendTelegram")}
            </button>
          </div>
        </div>
      </section>`;

    const send = (channel) => {
      const name = $("#sub-name").value.trim();
      const topic = $("#sub-topic").value.trim();
      const question = $("#sub-question").value.trim();
      const answer = $("#sub-answer").value.trim();
      if (!topic || !question) {
        toast(t("submit.need"));
        return;
      }
      const lines = [
        "axomexam Q&A Submission",
        `Name: ${name || "-"}`,
        `Topic: ${topic}`,
        `Question: ${question}`,
        answer ? `Answer: ${answer}` : "",
      ].filter(Boolean).join("\n");
      const url = channel === "wa"
        ? `https://wa.me/?text=${encodeURIComponent(lines)}`
        : `https://t.me/share/url?url=${encodeURIComponent("https://axomexam.in")}&text=${encodeURIComponent(lines)}`;
      window.open(url, "_blank", "noopener");
    };
    $("#sub-wa").addEventListener("click", () => send("wa"));
    $("#sub-tg").addEventListener("click", () => send("tg"));
  }

  /* ================= MOCK TEST SYSTEM ================= */
  function getTopicsForMockFilter(cat, subId, secId, topicId) {
    const matched = [];
    state.topicIndex.forEach((rec) => {
      if (rec.cat.id !== cat.id) return;
      if (subId && subId !== "all" && (!rec.sub || rec.sub.id !== subId)) return;
      if (secId && (!rec.section || rec.section.id !== secId)) return;
      if (topicId && rec.topic.id !== topicId) return;
      matched.push(rec);
    });
    return matched;
  }

  async function collectQuestionsForMock(cat, subId, secId, topicId) {
    const matchedTopics = getTopicsForMockFilter(cat, subId, secId, topicId);
    if (!matchedTopics.length) return [];

    const results = await Promise.all(
      matchedTopics.map((rec) =>
        fetchTopicData(rec)
          .then((d) => ({ d, rec }))
          .catch(() => null)
      )
    );

    const rawList = [];
    results.forEach((r) => {
      if (!r || !r.d || !Array.isArray(r.d.questions)) return;
      r.d.questions.forEach((qItem) => {
        const qTextObj = (typeof qItem.q === "object") ? qItem.q : {
          en: qItem.question_en || qItem.q || "",
          as: qItem.question_as || qItem.q || ""
        };

        const aTextObj = (typeof qItem.a === "object") ? qItem.a : {
          en: qItem.answer_en || qItem.a || "",
          as: qItem.answer_as || qItem.a || ""
        };

        let optionsList = [];
        if (Array.isArray(qItem.options) && qItem.options.length) {
          optionsList = qItem.options;
        } else if (Array.isArray(qItem.options_en) || Array.isArray(qItem.options_as)) {
          const len = Math.max((qItem.options_en || []).length, (qItem.options_as || []).length);
          for (let i = 0; i < len; i++) {
            optionsList.push({
              en: (qItem.options_en && qItem.options_en[i]) || "",
              as: (qItem.options_as && qItem.options_as[i]) || ""
            });
          }
        }

        const correctIdx = Number.isInteger(qItem.correct_index) 
          ? qItem.correct_index 
          : (Number.isInteger(qItem.correct) ? qItem.correct : 0);

        rawList.push({
          q: qTextObj,
          a: aTextObj,
          options: optionsList.length >= 2 ? optionsList : null,
          correct: correctIdx,
          topicTitle: r.rec.title,
          catId: r.rec.cat.id,
        });
      });
    });

    return rawList;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stopMockTimer() {
    if (state.mock && state.mock.timerId) {
      clearInterval(state.mock.timerId);
      state.mock.timerId = null;
    }
  }

  function showModalPopup({ title, message, confirmText, cancelText, onConfirm }) {
    const existing = $("#confirm-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "confirm-modal";
    modal.className = "read-modal";
    modal.innerHTML = `
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" style="max-width:440px; padding:24px; text-align:center; height:max-content; margin:auto;">
        <h3 style="font-size:1.2rem; margin-bottom:10px;">${escapeHtml(title)}</h3>
        <p style="color:var(--ink-soft); font-size:.92rem; margin-bottom:20px;">${escapeHtml(message)}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-outline" id="modal-cancel-btn" style="flex:1;">${escapeHtml(cancelText || "Cancel")}</button>
          <button class="btn btn-primary" id="modal-confirm-btn" style="flex:1;">${escapeHtml(confirmText || "Confirm")}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $("#modal-cancel-btn", modal).addEventListener("click", () => modal.remove());
    $(".read-modal-backdrop", modal).addEventListener("click", () => modal.remove());
    $("#modal-confirm-btn", modal).addEventListener("click", () => {
      modal.remove();
      if (onConfirm) onConfirm();
    });
  }

  function handleMockRouting(main, segs) {
    if (segs.length === 1) {
      return renderMockCategoryPicker(main);
    }

    const catId = segs[1];
    const cat = state.categories.find((c) => c.id === catId);
    if (!cat) return render404(main);

    const subId = segs[2];
    const secId = segs[3];
    const topicId = segs[4];

    if (subId && subId.startsWith("topic-") || segs.includes("start")) {
      return renderMockSetup(main, cat, subId, secId, topicId);
    }

    const subs = cat.subcategories || [];

    if (!subId && subs.length) {
      return renderMockSubcategoryPicker(main, cat);
    }

    if (subId && !secId) {
      const sub = subs.find((s) => s.id === subId);
      if (sub && sub.sections && sub.sections.length) {
        return renderMockSectionPicker(main, cat, sub);
      }
      return renderMockSetup(main, cat, subId, null, null);
    }

    if (subId && secId) {
      const sub = subs.find((s) => s.id === subId);
      const sec = sub ? (sub.sections || []).find((sc) => sc.id === secId) : null;
      if (sec && sec.topics && sec.topics.length) {
        return renderMockTopicPicker(main, cat, sub, sec);
      }
      return renderMockSetup(main, cat, subId, secId, null);
    }

    return renderMockSetup(main, cat, null, null, null);
  }

  function renderMockCategoryPicker(main) {
    main.innerHTML = `
      <div class="mock-intro">
        <h1>${t("mock.title")}</h1>
        <p>${t("mock.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:30px;">
        <div class="section-head"><div><h2>${t("mock.pick")}</h2><p class="sec-sub">${t("mock.pick.sub")}</p></div></div>
        <div class="mock-grid">
          ${state.categories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <div class="mock-card reveal" style="--cat:${color}" data-delay="${i * 40}">
                <div class="mock-top">
                  <span class="mock-ico">${catIconHTML(c.id)}</span>
                  <span>
                    <b>${escapeHtml(localized(c.name))}</b>
                    <span class="mock-count">${countTopics(c)} ${t("cat.topics")}</span>
                  </span>
                </div>
                <div class="mock-go">
                  <a class="mock-start" href="#/mock-test/${c.id}">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Select Sub-Category
                  </a>
                </div>
              </div>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  function renderMockSubcategoryPicker(main, cat) {
    const subs = cat.subcategories || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">Home</a><span class="bc-sep">/</span>
          <a href="#/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))} — Select Sub-Category</h1>
        <p class="page-desc">Select a specific branch to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${subs.map((s, i) => `
            <a class="sub-card reveal" href="#/mock-test/${cat.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
              <span><b>${escapeHtml(localized(s.name))}</b>
                <span>${(s.sections ? s.sections.length : 0) || (s.topics ? s.topics.length : 0)} Sections</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  function renderMockSectionPicker(main, cat, sub) {
    const secs = sub.sections || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">Home</a><span class="bc-sep">/</span>
          <a href="#/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="#/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Choose a section to begin your test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${secs.map((sec, i) => `
            <a class="sub-card reveal" href="#/mock-test/${cat.id}/${sub.id}/${sec.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(sec.id, cat.id)}</span>
              <span><b>${escapeHtml(localized(sec.name))}</b>
                <span>${(sec.topics || []).length} Topics</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  function renderMockTopicPicker(main, cat, sub, sec) {
    const topics = sec.topics || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">Home</a><span class="bc-sep">/</span>
          <a href="#/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="#/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <a href="#/mock-test/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${topics.map((tp, i) => `
            <a class="sub-card reveal" href="#/mock-test/${cat.id}/start" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span><b>${escapeHtml(localized(tp.name))}</b>
                <span>Take Mock Test</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  async function renderMockSetup(main, cat, subId, secId, topicId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;

    const pool = await collectQuestionsForMock(cat, subId, secId, topicId);

    if (!pool.length) {
      main.innerHTML = `
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          </div>
          <p>${t("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="#/mock-test">← Choose Another Category</a></div>
        </div>`;
      return;
    }

    state.mock = {
      cat,
      pool,
      configured: false,
      count: 0,
      testLang: "as"
    };

    const counts = [10, 20, 50, 100].filter((n) => n <= pool.length);
    if (!counts.includes(pool.length)) counts.push(pool.length);

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="#/">Home</a><span class="bc-sep">/</span>
          <a href="#/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${t("mock.setup.title")}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.name))} • ${pool.length} ${t("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${catColor(cat.id)};width:40px;height:40px;border-radius:11px;">${catIconHTML(cat.id)}</span>
          <b>${escapeHtml(localized(cat.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>

        <!-- Language Choice -->
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${state.mock.testLang === "as" ? "active" : ""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${state.mock.testLang === "en" ? "active" : ""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

        <!-- Question Set Size -->
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">${t("mock.setup.count")} / প্ৰশ্নৰ সংখ্যা বাছনি কৰক:</p>
        <div class="count-picker" id="count-picker">
          ${counts.map((n, i) => `<button type="button" data-count="${n}" class="${i === 0 ? "active" : ""}">${n}</button>`).join("")}
        </div>

        <div class="setup-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span>Stopwatch Timer will track your total time taken. Instant grading on final submission.</span>
        </div>
        <button class="btn btn-primary btn-begin" id="mock-begin-btn">${t("mock.begin")}</button>
      </div>`;

    $$("[data-mocklang]").forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.mock.testLang = b.dataset.mocklang;
      });
    });

    const picker = $("#count-picker");
    let selected = counts[0] || pool.length;
    $$("button", picker).forEach((b) => {
      b.addEventListener("click", () => {
        $$("button", picker).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        selected = parseInt(b.dataset.count, 10);
      });
    });

    /* Start Confirmation Popup */
    $("#mock-begin-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Start Mock Test?",
        message: `You are about to start a ${selected} question test in ${state.mock.testLang === "as" ? "অসমীয়া" : "English"}. Do you want to proceed?`,
        confirmText: "Start Test",
        cancelText: "Cancel",
        onConfirm: () => startMock(selected)
      });
    });
  }

  function startMock(count) {
    if (!state.mock) return;
    const pool = shuffle(state.mock.pool).slice(0, count);
    state.mock = Object.assign(state.mock, {
      pool,
      idx: 0,
      answers: [],
      elapsedSec: 0,
      started: true,
      timerId: null,
    });
    renderMockQuiz();
  }

  function renderMockQuiz() {
    const m = state.mock;
    const q = m.pool[m.idx];
    if (!q) return renderMockResults();
    const main = $("#app");
    const answered = m.answers[m.idx] !== undefined;
    const keys = ["A", "B", "C", "D", "E"];

    const qText = localizeContent(q.q);
    const options = (q.options || []).map(opt => (typeof opt === "object" ? localizeContent(opt) : String(opt)));

    main.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-top">
          <span class="qt-cat">${escapeHtml(localized(m.cat.name))} • Question ${m.idx + 1}/${m.pool.length}</span>
          <span class="quiz-timer" id="quiz-timer" title="Time Elapsed">⏱ ${fmtTime(m.elapsedSec)}</span>
          <button class="quiz-quit" id="quiz-quit-btn">${t("mock.quit")}</button>
        </div>
        <div class="quiz-progress"><span id="quiz-progress" style="width:${((m.idx) / m.pool.length * 100).toFixed(1)}%"></span></div>
        <div class="quiz-card">
          <div class="quiz-qno">Question ${m.idx + 1}</div>
          <div class="quiz-qtext">${escapeHtml(qText)}</div>

          <div class="quiz-options" id="quiz-options">
            ${options.map((opt, i) => `
              <button class="quiz-option" data-opt="${i}" ${answered ? "disabled" : ""}>
                <span class="opt-key">${keys[i]}</span>
                <span>${escapeHtml(opt)}</span>
              </button>`).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" ${!answered ? "disabled" : ""}>
            ${m.idx + 1 === m.pool.length ? "Final Submit" : t("mock.next")} →
          </button>
        </div>
      </div>`;

    const optionsBox = $("#quiz-options");
    if (optionsBox) {
      $$(".quiz-option", optionsBox).forEach((opt) => {
        opt.addEventListener("click", () => {
          if (m.answers[m.idx] !== undefined) return;
          const sel = parseInt(opt.dataset.opt, 10);
          m.answers[m.idx] = sel;
          $$(".quiz-option", optionsBox).forEach((o) => {
            o.disabled = true;
            const i = parseInt(o.dataset.opt, 10);
            if (i === q.correct) o.classList.add("correct");
            else if (i === sel) o.classList.add("wrong");
            if (i === sel) o.classList.add("selected");
          });
          const fb = $("#quiz-feedback");
          fb.classList.add(sel === q.correct ? "good" : "bad");
          fb.style.display = "block";
          fb.textContent = sel === q.correct
            ? t("mock.revealCorrect")
            : `${t("mock.correctAnswer")}: ${escapeHtml(options[q.correct] || "")}`;
          $("#quiz-next").disabled = false;
        });
      });
    }

    $("#quiz-next").addEventListener("click", () => {
      m.idx++;
      if (m.idx >= m.pool.length) {
        stopMockTimer();
        renderMockResults();
      } else {
        renderMockQuiz();
      }
    });

    /* Quit Confirmation Popup */
    $("#quiz-quit-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Quit Mock Test?",
        message: "Are you sure you want to quit the mock test? Your current progress will be lost.",
        confirmText: "Yes, Quit",
        cancelText: "Resume Test",
        onConfirm: () => {
          stopMockTimer();
          state.mock = null;
          location.hash = "#/mock-test";
        }
      });
    });

    if (!m.timerId) startMockTimer();
  }

  function startMockTimer() {
    const m = state.mock;
    const tick = () => {
      if (!m || !m.started || m.timerId === null) return;
      m.elapsedSec++;
      const tEl = $("#quiz-timer");
      if (tEl) {
        tEl.textContent = `⏱ ${fmtTime(m.elapsedSec)}`;
      }
    };
    m.timerId = setInterval(tick, 1000);
  }

  function fmtTime(sec) {
    const s = Math.max(0, sec);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  function renderMockResults() {
    const m = state.mock;
    stopMockTimer();
    if (!m) return;

    let correct = 0, wrong = 0, skipped = 0;
    const results = m.pool.map((q, i) => {
      const a = m.answers[i];
      let ok = false;
      if (a === undefined) skipped++;
      else if (a === q.correct) { ok = true; correct++; }
      else wrong++;
      return { q, a, ok };
    });

    const timeTaken = m.elapsedSec;
    const pct = m.pool.length ? Math.round((correct / m.pool.length) * 100) : 0;
    const msgKey = pct >= 80 ? "mock.result.msgExcellent" : pct >= 55 ? "mock.result.msgGood" : pct >= 35 ? "mock.result.msgAverage" : "mock.result.msgPoor";
    const R = 52.5, C = 2 * Math.PI * R;
    const offset = C * (1 - pct / 100);

    const main = $("#app");
    main.innerHTML = `
      <div class="result-wrap">
        <div class="result-panel">
          <div class="result-ring">
            <svg viewBox="0 0 120 120">
              <circle class="r-bg" cx="60" cy="60" r="${R}"></circle>
              <circle class="r-fg" cx="60" cy="60" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"></circle>
            </svg>
            <div class="result-percent">${pct}%</div>
          </div>
          <h2 style="font-size:1.25rem;">${t("mock.result.title")}</h2>
          <p class="result-msg">${t(msgKey)}</p>
          <div class="result-stats">
            <div class="rstat"><b>${correct}</b><span>${t("mock.result.correct")}</span></div>
            <div class="rstat bad"><b>${wrong}</b><span>${t("mock.result.wrong")}</span></div>
            <div class="rstat skip"><b>${skipped}</b><span>${t("mock.result.skipped")}</span></div>
            <div class="rstat"><b>${fmtTime(timeTaken)}</b><span>Total Time Taken</span></div>
          </div>
          <div class="result-actions">
            <button class="btn btn-primary" id="mock-retry">${t("mock.result.retry")}</button>
            <a class="btn btn-outline" href="#/mock-test">${t("mock.result.changeCat")}</a>
            <button class="btn btn-outline" id="mock-review-toggle">${t("mock.result.review")}</button>
          </div>
        </div>
        <div class="review-list" id="review-list" hidden>
          ${results.map((r, i) => {
            const q = r.q;
            const badge = r.a === undefined
              ? `<span class="rv-badge" style="background:#f1f5f9;color:#64748b;">${t("mock.result.skipped")}</span>`
              : `<span class="rv-badge ${r.ok ? "good" : "bad"}">${r.ok ? "✓ " + t("mock.result.correct") : "✕ " + t("mock.result.wrong")}</span>`;
            
            const options = (q.options || []).map(opt => (typeof opt === "object" ? localizeContent(opt) : String(opt)));
            let ansLine = "";
            if (r.a !== undefined && options.length) {
              ansLine = `<div class="rv-ans"><b>${t("mock.answer")}:</b> ${escapeHtml(options[r.a] || "")}</div>`;
              if (!r.ok) ansLine += `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${escapeHtml(options[q.correct] || "")}</div>`;
            } else if (options.length) {
              ansLine = `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${escapeHtml(options[q.correct] || "")}</div>`;
            }
            return `
              <div class="review-item">
                <div class="rv-q">Q${i + 1}. ${escapeHtml(localizeContent(q.q))}</div>
                ${badge}
                ${ansLine}
              </div>`;
          }).join("")}
        </div>
      </div>`;

    requestAnimationFrame(() => {
      const fg = $(".result-ring .r-fg");
      if (fg) fg.style.strokeDashoffset = offset.toFixed(1);
    });

    $("#mock-retry").addEventListener("click", () => startMock(m.pool.length));
    const reviewBtn = $("#mock-review-toggle");
    reviewBtn.addEventListener("click", () => {
      const list = $("#review-list");
      const hidden = list.hidden;
      list.hidden = !hidden;
      reviewBtn.textContent = hidden ? t("mock.result.hideReview") : t("mock.result.review");
    });

    if (m.timerId) { clearInterval(m.timerId); m.timerId = null; }
  }

  /* ================= Extra trending topics ================= */
  function registerExtraTrending(extras) {
    const extraCat = {
      id: "trending",
      name: { en: "Trending", as: "জনপ্ৰিয়" },
      color: "#f97316",
      icon: "↗",
    };
    extras.forEach((tp) => {
      if (!tp || !tp.id) return;
      const path = `trending/${tp.id}`;
      const rec = {
        path,
        cat: extraCat,
        sub: null,
        section: null,
        topic: tp,
        title: tp.title || tp.name,
        desc: tp.description,
        tags: tp.tags || [],
        nQuestions: (tp.questions || []).length,
        pdf: tp.pdf || null,
        popularity: Number(tp.popularity) || 0,
        extra: true,
      };
      state.topicMap[path] = rec;
      state.topicIndex.push(rec);
    });
  }

  /* ================= Boot ================= */
  async function boot() {
    const pre = $("#preloader");
    document.body.setAttribute("data-lang", "as");
    applyStaticI18n();

    try {
      const data = await API.getCategories();
      Object.assign(state, normalize(data));
    } catch (err) {
      console.error("Failed to load categories:", err);
    }

    /* Load extra trending topics from the trending-topics folder */
    try {
      const extras = await API.getTrendingTopics();
      registerExtraTrending(extras);
    } catch (err) {
      console.error("Failed to load extra trending topics:", err);
    }

    if (state.categories.length) {
      state.ready = true;
      buildDesktopNav();
      buildMobileNav();
      bindSearch();
      window.addEventListener("hashchange", () => { buildDesktopNav(); buildMobileNav(); renderRoute(); });
      renderRoute();

      let loadedTotal = 0;
      state.topicIndex.forEach(async (rec) => {
        try {
          const d = await fetchTopicData(rec);
          if (d && Array.isArray(d.questions)) {
            rec.nQuestions = d.questions.length;
            rec.topic.questions = d.questions;
            
            const el = document.getElementById(`count-${rec.path.replace(/\//g, '-')}`);
            if (el) el.textContent = `${rec.nQuestions} ${t("topic.questions")}`;

            const tEl = document.getElementById(`trend-count-${rec.path.replace(/\//g, '-')}`);
            if (tEl) tEl.textContent = `${escapeHtml(localized(rec.cat.name))} • ${rec.nQuestions} ${t("topic.questions")}`;

            loadedTotal = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0);
            const totalEl = $("#stat-total-questions");
            if (totalEl) totalEl.textContent = `${loadedTotal.toLocaleString()}+`;
          }
        } catch (e) { }
      });

    } else {
      $("#app").innerHTML = `<div class="loader"><p>${t("load.error")}</p></div>`;
    }

    if (pre) setTimeout(() => pre.classList.add("done"), 350);
  }

  function bindHamburger() {
    const burger = $("#hamburger");
    if (!burger) return;
    burger.addEventListener("click", () => {
      const menu = $("#mobile-menu");
      if (menu && menu.classList.contains("open")) closeMobileMenu();
      else openMobileMenu();
    });
    const mb = $("#mobile-backdrop");
    if (mb) mb.addEventListener("click", closeMobileMenu);
    const mc = $("#mobile-close");
    if (mc) mc.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeMobileMenu(); const sr = $("#search-results"); if (sr) sr.hidden = true; }
    });
  }

  function updateTabbar(segs) {
    const tabs = $$("#tabbar .tab-item");
    let active = "home";
    if (segs[0] === "mock-test") active = "mock";
    else if (segs[0] === "categories") active = "categories";
    else if (segs[0] === "search") active = "search";
    else if (segs[0] && segs[0] !== "") active = "";
    tabs.forEach((el) => el.classList.toggle("active", el.dataset.tab === active));
  }

  function bindTabbar() {
    const tm = $("#tab-menu");
    if (tm) tm.addEventListener("click", () => openMobileMenu());
  }

  /* ================= Dark mode ================= */
  function initTheme() {
    const html = document.documentElement;
    const apply = (theme) => {
      if (theme === "dark") html.setAttribute("data-theme", "dark");
      else html.removeAttribute("data-theme");
      try { localStorage.setItem("axomexam-theme", theme); } catch (e) { /* ignore */ }
    };
    $$(".theme-toggle").forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", () => {
        apply(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindHamburger();
    bindTabbar();
    initTheme();
    boot();
  });
})();
