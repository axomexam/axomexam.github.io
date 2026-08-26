/* ============================================================
   axomexam — app.js
   Application logic: i18n, navigation, routing, rendering,
   search, Q&A reader, Math Engine (Assamese + English), Mock Tests,
   Dedicated Downloads Search, Detailed Bilingual AdSense Legal Pages,
   Mobile-Optimized Clean Article Reader for Study Guides,
   Pure Path-Based Routing (No # Hashes Anywhere).
   Domain: axomexam.in
   Default UI Language: English ("en").
   ============================================================ */

(() => {
  "use strict";

  /* ================= State ================= */
  const state = {
    categories: [],        
    topicMap: {},          
    topicIndex: [],        
    ready: false,
    page: 0,               
    lang: "as",            
    uiLang: "en",          
    mock: null,            
    isGeneratingPdf: false 
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Direct Vector Brand Logo */
  const BRAND_LOGO_SVG = `
    <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="8" fill="url(#gradLogo)"/>
      <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
      <text x="38" y="21" fill="currentColor" style="color:var(--ink, #0f172a);" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#3b82f6">.in</tspan></text>
    </svg>
  `;

  /* PDF Optimized Vector Logo */
  const PDF_BRAND_LOGO_SVG = `
    <svg width="146" height="28" viewBox="0 0 146 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogoPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill="url(#gradLogoPdf)"/>
      <text x="14" y="19.5" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">A</text>
      <text x="36" y="19.5" fill="#0f172a" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="-0.3">axomexam<tspan fill="#2563eb">.in</tspan></text>
    </svg>
  `;

  /* ================= i18n helpers ================= */
  function t(key) {
    if (typeof I18N !== "undefined") {
      const langObj = I18N[state.uiLang] || I18N.en || I18N.as;
      if (langObj && langObj[key]) return langObj[key];
      if (I18N.en && I18N.en[key]) return I18N.en[key];
    }
    return key;
  }

  function localized(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = state.uiLang || "en";
    return obj[l] || obj.en || obj.as || "";
  }

  /* ================= Math & Formula Formatter ================= */
  function formatMath(str) {
    if (str == null) return "";
    let s = String(str);
    const hasLatex = /\$[^$]+\$|\\\([^\\]+\\\)/.test(s);
    if (!hasLatex) {
      s = escapeHtml(s);
      s = s.replace(/sqrt\(([^)]+)\)/gi, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
      s = s.replace(/√\(([^)]+)\)/g, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
      s = s.replace(/\^{([^}]+)}/g, '<sup>$1</sup>');
      s = s.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, '<sup>$1</sup>');
      s = s.replace(/_{([^}]+)}/g, '<sub>$1</sub>');
      s = s.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, '<sub>$1</sub>');
      s = s.replace(/\+\/-/g, '&plusmn;');
      s = s.replace(/&lt;=/g, '&le;').replace(/&gt;=/g, '&ge;');
    }
    return s;
  }

  function renderMathJax(el) {
    if (!el) return;
    if (typeof renderMathInElement === "function") {
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) { }
    }
  }

  /* Universal content extractor */
  function extractField(item, fieldName, forcedLang) {
    if (!item) return "";
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const longLang = targetLang === "en" ? "english" : "assamese";

    const processVal = (v) => {
      if (v === undefined || v === null) return "";
      if (Array.isArray(v)) {
        return v.map(line => `<div class="qa-step-line" style="margin:0 0 6px 0; padding:0; line-height:1.65; text-align:left;">${formatMath(line)}</div>`).join("");
      }
      if (typeof v === "object") {
        return processVal(v[targetLang] || v.as || v.en || Object.values(v)[0] || "");
      }
      return String(v);
    };

    if (item[longLang] && typeof item[longLang] === "object") {
      if (item[longLang][fieldName] !== undefined) return processVal(item[longLang][fieldName]);
      const shortF = fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName === "explanation" ? "exp" : "";
      if (shortF && item[longLang][shortF] !== undefined) return processVal(item[longLang][shortF]);
    }

    const directKey = `${fieldName}_${targetLang}`;
    if (item[directKey] !== undefined && item[directKey] !== null) return processVal(item[directKey]);

    const shortFieldName = fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName === "explanation" ? "exp" : "";
    if (shortFieldName) {
      const shortDirect = `${shortFieldName}_${targetLang}`;
      if (item[shortDirect] !== undefined && item[shortDirect] !== null) return processVal(item[shortDirect]);
    }

    const candidateKeys = [fieldName];
    if (fieldName === "question") candidateKeys.push("q", "question_text", "headline", "title");
    if (fieldName === "answer") candidateKeys.push("a", "ans", "content", "body", "description");
    if (fieldName === "explanation") candidateKeys.push("exp", "desc", "key_points", "summary");

    for (const k of candidateKeys) {
      const val = item[k];
      if (val !== undefined && val !== null) {
        return processVal(val);
      }
    }

    if (fieldName === "answer") {
      const idx = Number.isInteger(item.answer) ? item.answer
                   : Number.isInteger(item.correct) ? item.correct
                   : Number.isInteger(item.correct_index) ? item.correct_index
                   : -1;
      if (idx >= 0) {
        const opts = getOptionsList(item, targetLang);
        if (opts[idx] !== undefined) return processVal(opts[idx]);
      }
    }

    const asKey = `${fieldName}_as`;
    const enKey = `${fieldName}_en`;
    if (item[asKey] !== undefined && item[asKey] !== null) return processVal(item[asKey]);
    if (item[enKey] !== undefined && item[enKey] !== null) return processVal(item[enKey]);

    return "";
  }

  function localizeContent(obj, forcedLang) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join("\n");
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const val = obj[targetLang] || obj.as || obj.en || "";
    return Array.isArray(val) ? val.join("\n") : String(val);
  }

  function getOptionsList(item, forcedLang) {
    if (!item) return [];
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const longLang = targetLang === "en" ? "english" : "assamese";

    if (item[longLang] && Array.isArray(item[longLang].options)) {
      return item[longLang].options.map(String);
    }

    if (item.options && typeof item.options === "object" && !Array.isArray(item.options)) {
      const optArr = item.options[targetLang] || item.options.as || item.options.en;
      if (Array.isArray(optArr)) return optArr.map(String);
    }

    if (Array.isArray(item.options) && item.options.length) {
      return item.options.map(opt => {
        if (typeof opt === "string") return opt;
        if (typeof opt === "object" && opt !== null) return opt[targetLang] || opt.as || opt.en || "";
        return String(opt);
      });
    }

    const directOpts = item[`options_${targetLang}`];
    if (Array.isArray(directOpts) && directOpts.length) return directOpts.map(String);
    if (Array.isArray(item.options_as) && item.options_as.length) return item.options_as.map(String);
    if (Array.isArray(item.options_en) && item.options_en.length) return item.options_en.map(String);

    return [];
  }

  /* ================= Pure White High-Contrast Stylish Footer ================= */
  function renderDynamicFooter() {
    const footerContainer = $("footer.site-footer") || $("footer");
    if (!footerContainer) return;

    const isAs = state.uiLang === "as";
    footerContainer.innerHTML = `
      <div style="max-width:1100px; margin:0 auto; padding:32px 16px 20px; box-sizing:border-box; color:#ffffff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start; gap:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.15);">
          <div style="flex:1; min-width:240px; text-align:left;">
            <div style="margin-bottom:10px; color:#ffffff;">
              <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
                <defs>
                  <linearGradient id="gradLogoFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6366f1" />
                    <stop offset="100%" stop-color="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="30" height="30" rx="8" fill="url(#gradLogoFooter)"/>
                <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
                <text x="38" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#38bdf8">.in</tspan></text>
              </svg>
            </div>
            <p style="font-size:0.86rem; color:#f8fafc; line-height:1.55; margin:0; max-width:320px; font-weight:400;">
              ${isAs ? "অসমৰ সৰ্ববৃহৎ দ্বিভাষিক প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি মঞ্চ। ADRE, অসম আৰক্ষী, APSC আদি পৰীক্ষাৰ বিনামূলীয়া সমল।" : "Assam's premier bilingual competitive exam preparation portal. Free study notes, mock tests and previous papers."}
            </p>
          </div>
          
          <div style="display:flex; gap:40px; flex-wrap:wrap;">
            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${isAs ? "দ্ৰুত লিংক" : "Quick Links"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/mock-test" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "মক টেষ্ট" : "Mock Test"}</a></li>
                <li><a href="/previous-year" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "বিগত বৰ্ষৰ প্ৰশ্ন" : "Previous Papers"}</a></li>
                <li><a href="/downloads" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "নোটসমূহ ডাউনল'ড" : "Download Notes"}</a></li>
                <li><a href="/category/study-guides" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "অধ্যয়ন নিৰ্দেশিকা" : "Study Guides"}</a></li>
                <li><a href="/submit" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "প্ৰশ্ন প্ৰেৰণ কৰক" : "Submit Q&A"}</a></li>
              </ul>
            </div>

            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${isAs ? "আইনী নীতি" : "Legal & Info"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/about" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "আমাৰ বিষয়ে" : "About Us"}</a></li>
                <li><a href="/contact" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</a></li>
                <li><a href="/privacy" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "গোপনীয়তা নীতি" : "Privacy Policy"}</a></li>
                <li><a href="/terms" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "নীতি আৰু চৰ্তসমূহ" : "Terms & Conditions"}</a></li>
                <li><a href="/disclaimer" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "দাবীত্যাগ" : "Disclaimer"}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style="padding-top:16px; font-size:0.82rem; color:#f8fafc; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; align-items:center;">
          <span>© ${new Date().getFullYear()} <strong style="color:#ffffff;">axomexam.in</strong>. All Rights Reserved.</span>
          <span style="color:#f8fafc;">Made for Assam Competitive Aspirants</span>
        </div>
      </div>
    `;
  }

  function applyStaticI18n() {
    const searchEl = $("#master-search");
    if (searchEl) searchEl.placeholder = t("search.placeholder");
    $$("[aria-label]").forEach((el) => {
      const k = el.getAttribute("data-aria-i18n");
      if (k) el.setAttribute("aria-label", t(k));
    });
    renderDynamicFooter();
  }

  /* Global UI Language Toggle */
  function initGlobalLangToggle() {
    const deskTheme = document.querySelector(".header-center .theme-toggle") || document.querySelector(".site-header .theme-toggle");
    if (deskTheme && !document.querySelector(".desktop-lang-toggle")) {
      const dWrap = document.createElement("div");
      dWrap.className = "desktop-lang-toggle";
      dWrap.style.cssText = "display:inline-flex;align-items:center;background:var(--bg-subtle,#f1f5f9);border:1px solid var(--border,#e2e8f0);border-radius:20px;padding:2px;margin-right:8px;";
      dWrap.innerHTML = `
        <button type="button" class="glang-btn ${state.uiLang === "en" ? "active" : ""}" data-glang="en" style="border:none;background:${state.uiLang === "en" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "en" ? "#fff" : "var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">EN</button>
        <button type="button" class="glang-btn ${state.uiLang === "as" ? "active" : ""}" data-glang="as" style="border:none;background:${state.uiLang === "as" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "as" ? "#fff" : "var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">অসমীয়া</button>
      `;
      deskTheme.insertAdjacentElement("beforebegin", dWrap);
    }

    const mobileMenu = $("#mobile-menu");
    if (mobileMenu && !mobileMenu.querySelector(".mobile-lang-bar")) {
      const mBar = document.createElement("div");
      mBar.className = "mobile-lang-bar";
      mBar.style.cssText = "display:flex;justify-content:center;padding:12px 16px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--bg-subtle,#f8fafc);box-sizing:border-box;";
      mBar.innerHTML = `
        <div style="display:inline-flex;background:var(--bg,#fff);border:1px solid var(--border,#cbd5e1);border-radius:20px;padding:2px;width:100%;max-width:240px;box-sizing:border-box;">
          <button type="button" class="glang-btn ${state.uiLang === "en" ? "active" : ""}" data-glang="en" style="flex:1;border:none;background:${state.uiLang === "en" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "en" ? "#fff" : "var(--ink-soft,#64748b)"};padding:6px 0;border-radius:14px;cursor:pointer;font-size:0.82rem;font-weight:700;text-align:center;">English</button>
          <button type="button" class="glang-btn ${state.uiLang === "as" ? "active" : ""}" data-glang="as" style="flex:1;border:none;background:${state.uiLang === "as" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "as" ? "#fff" : "var(--ink-soft,#64748b)"};padding:6px 0;border-radius:14px;cursor:pointer;font-size:0.82rem;font-weight:700;text-align:center;">অসমীয়া</button>
        </div>
      `;
      mobileMenu.insertBefore(mBar, mobileMenu.firstChild);
    }

    $$(".glang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetLang = btn.dataset.glang;
        if (state.uiLang === targetLang) return;
        state.uiLang = targetLang;
        try { localStorage.setItem("axomexam-ui-lang", targetLang); } catch (err) {}
        
        $$(".glang-btn").forEach((b) => {
          const isAct = b.dataset.glang === state.uiLang;
          b.classList.toggle("active", isAct);
          b.style.background = isAct ? "var(--primary,#0ea5e9)" : "transparent";
          b.style.color = isAct ? "#fff" : "var(--ink-soft,#64748b)";
        });

        applyStaticI18n();
        buildDesktopNav();
        buildMobileNav();
        renderRoute();
      });
    });
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

  /* ================= Navigation helpers ================= */
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
        <a class="nav-link ${isActive ? "active" : ""}" href="/category/${item.id}">
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
                <a href="/category/${item.id}/${sub.id}">
                  <span>${escapeHtml(localized(sub.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${grand.map((sec) => `
                    <a href="/category/${item.id}/${sub.id}/${sec.id}">
                      <span>${escapeHtml(localized(sec.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`;
          }
          return `<a href="/category/${item.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>`;
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

    items.push(extraLink("/", t("nav.home"), activePath));
    featured.forEach((c) => items.push(navLinkHTML(c, activePath)));
    items.push(extraLink("/mock-test", t("nav.mock"), activePath));
    items.push(extraLink("/downloads", t("nav.downloads"), activePath));
    items.push(moreDropdownHTML(rest, activePath));
    list.innerHTML = items.join("");
  }

  function extraLink(href, label, activePath) {
    const on = activePath.split("/")[0] === href.replace(/^\//, "");
    return `<li><a class="nav-link ${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a></li>`;
  }

  function moreDropdownHTML(rest, activePath) {
    const root = activePath.split("/")[0];
    const isInside = rest.some((c) => c.id === root) || ["submit", "previous-year", "contact", "about", "privacy", "privacy-policy", "terms", "disclaimer"].includes(root);
    const catLinks = rest.map((c) => {
      const on = root === c.id;
      return `<a class="${on ? "active" : ""}" href="/category/${c.id}">${escapeHtml(localized(c.name))}</a>`;
    }).join("");
    
    const extraLinks = [
      ["/previous-year", t("nav.previousYear")],
      ["/submit", t("nav.submit")],
      ["/contact", "Contact Us"]
    ].map(([href, label]) => {
      const on = root === href.replace(/^\//, "");
      return `<a class="${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
    }).join("");

    return `
      <li class="has-drop">
        <a class="nav-link ${isInside ? "active" : ""}" href="/categories">
          <span>${escapeHtml(t("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${catLinks ? `<div class="d-label">${escapeHtml(t("nav.categories"))}</div>${catLinks}` : ""}
          <div class="d-label">${escapeHtml(t("mmenu.extra"))}</div>
          ${extraLinks}
        </div>
      </li>`;
  }

  /* ================= Mobile Menu Builder (Fixed Order) ================= */
  function buildMobileNav() {
    const nav = $("#mobile-nav");
    if (!nav) return;
    const activePath = currentPath();
    const catParts = state.categories.map((cat) => {
      const kids = cat.subcategories || cat.sections || [];
      return `
        <li>
          <div class="m-row">
            <a class="m-item ${activePath.split("/")[0] === cat.id ? "active" : ""}" href="/category/${cat.id}">
              ${escapeHtml(localized(cat.name))}
            </a>
            ${kids.length ? `<button class="m-toggle" data-toggle data-target="${cat.id}" aria-label="toggle"><span class="caret"></span></button>` : ""}
          </div>
          ${kids.length ? `<div class="m-sub" id="msub-${cat.id}">${kids.map((sub) => {
            const grand = sub.sections;
            if (grand && grand.length) {
              return `
                <div class="m-row">
                  <a class="m-item" href="/category/${cat.id}/${sub.id}"><span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(sub.name))}</span></a>
                  <button class="m-toggle" data-toggle data-target="${cat.id}-${sub.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${cat.id}-${sub.id}">
                  ${grand.map((sec) => `<a href="/category/${cat.id}/${sub.id}/${sec.id}"><span style="font-weight:600; font-size:0.87rem; color:var(--ink-soft,#475569);">${escapeHtml(localized(sec.name))}</span></a>`).join("")}
                </div>`;
            }
            return `<a href="/category/${cat.id}/${sub.id}"><span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(sub.name))}</span></a>`;
          }).join("")}</div>` : ""}
        </li>`;
    });

    const mBtnStyle = `display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:var(--bg-subtle,#f8fafc);color:var(--ink,#0f172a);font-weight:700;border:1px solid var(--border,#e2e8f0);box-shadow:0 1px 3px rgba(0,0,0,0.03);`;

    const downloadItem = `
      <li class="m-download" style="margin-top:8px;">
        <a class="m-item ${activePath === "downloads" ? "active" : ""}" href="/downloads" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
          ${escapeHtml(t("nav.downloads"))}
        </a>
      </li>`;

    const prevYearItem = `
      <li class="m-py" style="margin-top:6px;">
        <a class="m-item ${activePath === "previous-year" ? "active" : ""}" href="/previous-year" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/></svg>
          ${escapeHtml(t("nav.previousYear"))}
        </a>
      </li>`;

    const submitItem = `
      <li class="m-submit" style="margin-top:6px;">
        <a class="m-item ${activePath === "submit" ? "active" : ""}" href="/submit" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          ${escapeHtml(t("nav.submit"))}
        </a>
      </li>`;

    const contactItem = `
      <li class="m-contact" style="margin-top:6px;margin-bottom:8px;">
        <a class="m-item ${activePath === "contact" ? "active" : ""}" href="/contact" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact Us
        </a>
      </li>`;

    const targetIndex = state.categories.findIndex((c) => c.id === "study-guides");
    const insertPos = targetIndex !== -1 ? targetIndex : state.categories.findIndex((c) => c.id === "computer");

    if (insertPos !== -1) {
      catParts.splice(insertPos + 1, 0, downloadItem, prevYearItem, submitItem, contactItem);
    } else {
      catParts.push(downloadItem, prevYearItem, submitItem, contactItem);
    }

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
  function parsePath() {
    let p = window.location.pathname.replace(/^\/|\/$/g, "");
    if (window.location.search && window.location.search.startsWith("?/")) {
      p = window.location.search.slice(2).replace(/~and~/g, "&");
      window.history.replaceState(null, null, "/" + p);
    }
    return p.split("/").filter(Boolean);
  }

  function currentPath() {
    return parsePath().filter((s) => s !== "category" && s !== "topic" && s !== "mock-test").join("/");
  }

  function navigateTo(url) {
    window.history.pushState(null, null, url);
    buildDesktopNav();
    buildMobileNav();
    renderRoute();
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
    const segs = parsePath();
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
    
    if (["about", "privacy", "privacy-policy", "terms", "disclaimer"].includes(segs[0])) {
      const pageKey = segs[0] === "privacy-policy" ? "privacy" : segs[0];
      return renderStatic(main, pageKey);
    }
    
    if (segs[0] === "contact") return renderContactPage(main);
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
    const totalPdfs = state.topicIndex.length + (state.topicIndex.filter((r) => r.pdf).length);
    const trending = trendingTopics(state.topicIndex).slice(0, typeof CONFIG !== "undefined" ? CONFIG.TRENDING_COUNT : 6);
    const firstCat = state.categories[0]?.id || "gk";

    main.innerHTML = `
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${t("hero.daily")} • ADRE 2.0 / RRB
          </a>
          <h1>${t("hero.title") || "Crack Competitive Exams with Bilingual Q&A & PDF Notes"}</h1>
          <p class="sub">${t("hero.sub") || "Practice thousands of exam questions and download printable PDF notes in both Assamese and English — built for APSC, Assam Police, ADRE, and Central Railways."}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/category/${firstCat}">${t("hero.cta")}</a>
            <a class="btn btn-ghost" href="/mock-test">${t("hero.cta3")}</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${totalQuestions.toLocaleString()}+</b><span>${t("stat.questions")}</span></div>
            <div class="stat"><b>${state.topicIndex.length}+</b><span>${t("stat.topics")}</span></div>
            <div class="stat"><b id="stat-total-pdfs">${totalPdfs}+</b><span>${t("stat.pdfs")}</span></div>
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
              <a class="cat-card reveal" href="/category/${c.id}" style="--cat:${color}" data-delay="${i * 60}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  <b>${escapeHtml(localized(c.name))}</b>
                  <span>${c.id === "articles" ? (state.uiLang === "as" ? "প্ৰবন্ধসমূহ" : "Articles") : `<span class="cat-count">${countTopics(c)}</span> ${c.id === "study-guides" ? (state.uiLang === "as" ? "টা গাইড" : "Guides") : t("cat.topics")}`}</span>
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
          <a class="see-all" href="/trending">${t("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${i * 50}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(r.title))}</span>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))} • ${r.cat.id === "study-guides" ? (state.uiLang === "as" ? "পঢ়ক →" : "Read Guide →") : `${r.nQuestions || 0} ${t("topic.questions")}`}</span>
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
    const examName = (typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_NAME) || "ADRE / Assam Police";
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
        <span class="float-chip c1"><span class="dot"></span>ADRE</span>
        <span class="float-chip c2"><span class="dot"></span>GK & Math</span>
        <span class="float-chip c3"><span class="dot"></span>Assam Police</span>
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
    const isArticlesCat = cat.id === "articles";
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.description)) || escapeHtml(localized(cat.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${subs.length ? `
          <div class="sub-grid">
            ${subs.map((s, i) => `
              <a class="sub-card reveal" href="/category/${cat.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(s.name))}</span>
                  <span style="font-size:0.75rem; font-weight:${isArticlesCat ? "700" : "400"}; color:${isArticlesCat ? catColor(cat.id) : "var(--ink-soft,#64748b)"};">${isArticlesCat ? (state.uiLang === "as" ? "প্ৰবন্ধ পঢ়ক →" : "Read Articles →") : `${(s.sections ? s.sections.length : 0) || (s.topics ? s.topics.length : 0)} ${s.sections ? t("cat.subsections") : t("cat.topics")}`}</span>
                </span>
              </a>`).join("")}
          </div>`
        : (directTopics.length ? topicListHTML(cat, null, null, directTopics) : emptyHTML())}
      </section>`;
    observeReveals();
  }

  function renderSubOrSection(main, segs) {
    const cat = state.categories.find((c) => c.id === segs[1]);
    const sub = (cat.subcategories || cat.sections || []).find((s) => s.id === segs[2]);
    if (!sub) return render404(main);

    /* Articles category — read-only rich articles, never in Downloads */
    if (cat.id === "articles") {
      if (segs[3] === "read") return renderArticleReader(main, cat, sub);
      return renderArticleSubCategoryPage(main, cat, sub);
    }

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
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sub.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${secs && secs.length ? `
          <div class="sub-grid">
            ${secs.map((s, i) => `
              <a class="sub-card reveal" href="/category/${cat.id}/${sub.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(s.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(s.topics || []).length} ${t("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>` : (topics && topics.length ? topicListHTML(cat, sub, null, topics) : emptyHTML())}
      </section>`;
    observeReveals();
  }

  function renderSectionPage(main, cat, sub, sec) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sec.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${topicListHTML(cat, sub, sec, sec.topics || [])}
      </section>`;
    observeReveals();
  }

  function topicListHTML(cat, sub, sec, topics) {
    if (!topics.length) return emptyHTML();
    const isStudyGuide = cat.id === "study-guides";
    const actionLabel = state.uiLang === "as" ? "পঢ়ক (Read Guide) →" : "Read Guide →";

    return `
      <div class="sub-grid">
        ${topics.map((tp, i) => {
          const path = [cat.id, sub ? sub.id : "", sec ? sec.id : ""].filter(Boolean).concat([tp.id]).join("/");
          const rec = state.topicMap[path];
          const qCount = (rec && rec.nQuestions > 0) ? rec.nQuestions : ((tp.questions || []).length);
          const countDisplay = isStudyGuide ? actionLabel : (qCount > 0 ? `${qCount} ${t("topic.questions")}` : t("btn.practice"));

          return `
            <a class="sub-card reveal" href="/topic/${path}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(tp.name))}</span>
                <span id="count-${path.replace(/\//g, '-')}" style="${isStudyGuide ? "color:var(--primary,#2563eb); font-weight:700;" : ""}">${countDisplay}</span>
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

  /* ================= Articles (read-only) =================
     The "articles" category works differently from Q&A topics:
     each subcategory holds a JSON file of rich articles that are
     rendered in a full reading view. They are NOT part of the
     topic index, so they never appear in Downloads / Trending /
     Search — reading only, exactly as required. */
  function renderArticleSubCategoryPage(main, cat, sub) {
    const isAs = state.uiLang === "as";
    main.innerHTML = `
      <div class="page-head art-sub-page-head">
        <nav class="breadcrumb art-breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sub.description)) || escapeHtml(localized(cat.description)) || ""}</p>

        <div class="art-read-cta">
          <a class="art-read-btn" href="/category/${cat.id}/${sub.id}/read">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${isAs ? "প্ৰবন্ধ পঢ়ক" : "Read Articles"}
          </a>
        </div>
        <p class="art-read-note">${isAs ? "পঢ়া-মাত্ৰ শাখা — এই প্ৰবন্ধসমূহ ডাউনলোডৰ বাবে উপলব্ধ নহয়" : "Reading-only section — these articles are not available for download"}</p>
      </div>

      <style>
        .art-sub-page-head { text-align: center; max-width: 760px; margin: 0 auto 8px auto; padding: 30px 16px 4px 16px; box-sizing: border-box; }
        .art-sub-page-head .breadcrumb { justify-content: center; }
        .art-sub-page-head .page-desc { margin-left: auto; margin-right: auto; text-align: center; }
        .art-read-cta { margin: 22px auto 6px auto; display: flex; justify-content: center; }
        .art-read-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 14px 34px; border-radius: 99px; font-weight: 800; font-size: 1rem;
          color: #ffffff; background: linear-gradient(135deg, #e11d48, #f43f5e);
          box-shadow: 0 10px 24px -8px rgba(225,29,72,.55);
          border: none; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; text-decoration: none;
        }
        .art-read-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 30px -10px rgba(225,29,72,.6); }
        .art-read-note { margin-top: 12px; font-size: .8rem; color: var(--ink-faint, #94a3b8); text-align: center; }

        @media (max-width: 520px) {
          .art-sub-page-head h1 { font-size: 1.4rem !important; }
          .art-read-btn { width: 100%; padding: 13px 20px; font-size: .95rem; }
        }
      </style>
    `;
    observeReveals();
  }

  async function renderArticleReader(main, cat, sub) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let data = null;
    try {
      data = await API.getArticles(sub.id);
    } catch (e) {
      data = null;
    }

    if (!data || !((data.articles || data.questions || []).length)) {
      const isAs = state.uiLang === "as";
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${escapeHtml(localized(sub.name))}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${isAs ? "এতিয়ালৈকে ইয়াত কোনো প্ৰবন্ধ যোগ কৰা হোৱা নাই।" : "No articles have been added here yet."}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/category/${cat.id}/${sub.id}">${isAs ? "পিছলৈ যাওক" : "Go Back"}</a></div>
        </div>`;
      return;
    }

    const rec = {
      path: `articles/${sub.id}`,
      cat: cat,
      sub: sub,
      section: null,
      topic: {
        id: sub.id,
        title: (data && data.title) || sub.name,
        description: (data && data.description) || sub.description || {},
        questions: (data && (data.articles || data.questions)) || [],
      },
    };
    renderDedicatedArticlePage(main, rec);
  }

  /* ================= Topic & Article Page Handler ================= */
  function breadcrumbForTopic(rec) {
    const bits = [`<a href="/">${t("breadcrumb.home")}</a>`];
    bits.push(`<a href="/category/${rec.cat.id}">${escapeHtml(localized(rec.cat.name))}</a>`);
    if (rec.sub) bits.push(`<a href="/category/${rec.cat.id}/${rec.sub.id}">${escapeHtml(localized(rec.sub.name))}</a>`);
    if (rec.section) bits.push(`<a href="/category/${rec.cat.id}/${rec.sub ? rec.sub.id + "/" : ""}${rec.section.id}">${escapeHtml(localized(rec.section.name))}</a>`);
    return bits.map((b, i) => (i ? `<span class="bc-sep">/</span>` : "") + b).join("");
  }

  async function renderTopicPage(main, rec) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    try {
      const data = await API.getTopic(rec.cat.id, rec.topic.id);
      if (data) {
        rec.topic = Object.assign({}, rec.topic, data);
        rec.topic.title = rec.topic.title || rec.title;
        rec.nQuestions = (data.questions || []).length;
      }
    } catch { }

    if (rec.cat.id === "study-guides") {
      return renderDedicatedArticlePage(main, rec);
    }

    state.page = 0;
    const qs = rec.topic.questions || [];

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1>${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc">${escapeHtml(localized(rec.topic.description)) || ""}</p>
      </div>

      <div class="topic-layout" style="max-width:100%; margin:0 auto;">
        <div>
          <div class="qa-toolbar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
            <span class="qt-info" style="font-weight:700; font-size:0.92rem; color:var(--ink-soft,#64748b);">${qs.length} ${t("topic.questions")}</span>
            <div class="qa-actions" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                Reading Mode
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language" style="display:inline-flex; border-radius:10px; overflow:hidden; border:1px solid var(--border,#cbd5e1);">
                <button class="lang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${t("topic.lang.as")}</button>
                <button class="lang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${t("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list" style="width:100%; box-sizing:border-box;"></div>
          <div id="pager" style="display:flex; justify-content:center; align-items:center; gap:12px; margin-top:24px;"></div>
        </div>
      </div>
    `;

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

  /* ================= Dedicated Rich Article Layout (Stylish & Mobile-Optimized) ================= */
  function renderDedicatedArticlePage(main, rec) {
    const rawItems = rec.topic.questions || rec.topic.sections || [];
    const isAs = state.lang === "as";
    const isArticles = rec.cat && rec.cat.id === "articles";
    const artBadge = isArticles
      ? (isAs ? "প্ৰবন্ধ পঢ়া • পঢ়া-মাত্ৰ" : "Read Articles • Reading Only")
      : (isAs ? "সম্পূৰ্ণ অধ্যয়ন নিৰ্দেশিকা (Theory Guide)" : "Complete In-Depth Study Guide");

    main.innerHTML = `
      <div class="page-head" style="text-align:left; max-width:860px; margin:0 auto 20px auto; padding:0 16px; box-sizing:border-box;">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1 class="art-main-title">${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc" style="font-size:0.96rem; line-height:1.6; color:var(--ink-soft,#475569); margin:0 0 16px 0;">${escapeHtml(localized(rec.topic.description)) || ""}</p>
        
        <div class="art-top-bar">
          <span style="font-size:0.82rem; font-weight:800; color:var(--primary,#2563eb); text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${artBadge}
          </span>
          <div class="art-lang-switch-box" role="group" aria-label="Article Language">
            <button class="art-glang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as">
              <span class="active-dot"></span>অসমীয়া
            </button>
            <button class="art-glang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en">
              <span class="active-dot"></span>English
            </button>
          </div>
        </div>
      </div>

      <div class="article-wrapper" style="max-width:860px; margin:0 auto; padding:0 16px 50px 16px; box-sizing:border-box;">
        <article id="article-body-content" class="article-card-box"></article>
      </div>

      <style>
        .art-main-title { font-size: 1.8rem; font-weight: 900; line-height: 1.35; color: var(--ink, #0f172a); margin-bottom: 10px; letter-spacing: -0.3px; }
        .art-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border, #e2e8f0); border-bottom: 1px solid var(--border, #e2e8f0); padding: 12px 0; }
        .art-lang-switch-box { display: inline-flex; background: var(--bg-subtle, #f1f5f9); border: 1.5px solid var(--border, #cbd5e1); border-radius: 24px; padding: 3px; gap: 2px; }
        .art-glang-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; font-weight: 700; font-size: 0.82rem; border-radius: 20px; border: none; cursor: pointer; transition: all 0.2s ease-in-out; background: transparent; color: var(--ink-soft, #64748b); }
        .art-glang-btn .active-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: none; }
        .art-glang-btn.active { background: #2563eb !important; color: #ffffff !important; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); }
        .art-glang-btn.active .active-dot { display: inline-block; }
        .article-card-box { background: var(--card-bg, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 20px; padding: 36px 32px; box-shadow: 0 10px 30px -6px rgba(15,23,42,0.04); text-align: left; }
        .article-part-block { margin-bottom: 34px; padding-bottom: 26px; border-bottom: 1px dashed var(--border, #e2e8f0); }
        .article-part-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .art-headline { font-size: 1.3rem; font-weight: 800; color: var(--ink, #0f172a); margin: 0 0 14px 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
        .art-paragraph { font-size: 1.02rem; line-height: 1.85; color: var(--ink-soft, #334155); margin: 0 0 16px 0; text-align: left; word-break: break-word; font-weight: 400; }
        .art-keynote { background: var(--bg-subtle, #f8fafc); border-left: 4px solid var(--primary, #2563eb); padding: 14px 18px; border-radius: 10px; font-size: 0.92rem; line-height: 1.65; color: var(--ink-muted, #475569); border-top: 1px solid var(--border, #f1f5f9); border-right: 1px solid var(--border, #f1f5f9); border-bottom: 1px solid var(--border, #f1f5f9); }
        
        @media (max-width: 640px) {
          .art-main-title { font-size: 1.35rem !important; line-height: 1.35 !important; }
          .article-card-box { padding: 20px 16px !important; border-radius: 14px !important; }
          .art-headline { font-size: 1.12rem !important; }
          .art-paragraph { font-size: 0.95rem !important; line-height: 1.75 !important; }
          .art-top-bar { justify-content: center !important; flex-direction: column !important; text-align: center !important; gap: 10px !important; }
          .art-lang-switch-box { width: 100% !important; justify-content: center !important; }
          .art-glang-btn { flex: 1 !important; justify-content: center !important; padding: 8px 0 !important; }
        }

        [data-theme="dark"] .article-card-box { background: var(--bg-soft, #0f172a) !important; border-color: var(--border, #2b3a55) !important; }
        [data-theme="dark"] .art-lang-switch-box { background: #0f172a !important; border-color: #334155 !important; }
        [data-theme="dark"] .art-glang-btn { color: #94a3b8 !important; }
        [data-theme="dark"] .art-keynote { background: #1e293b !important; border-color: #334155 !important; color: #cbd5e1 !important; }
      </style>
    `;

    const renderArticleText = () => {
      const artBox = $("#article-body-content");
      if (!artBox) return;

      artBox.innerHTML = rawItems.map((item, idx) => {
        const headline = extractField(item, "question");
        const bodyText = extractField(item, "answer");
        const explanation = extractField(item, "explanation");

        return `
          <div class="article-part-block">
            <h2 class="art-headline">
              <span>${formatMath(headline)}</span>
            </h2>
            <div class="art-paragraph">${formatMath(bodyText)}</div>
            ${explanation ? `
              <div class="art-keynote">
                <b style="color:var(--primary,#2563eb);">${state.lang === "as" ? "গুৰুত্বপূৰ্ণ বিষয় (Key Takeaway)" : "Key Highlights"}:</b> ${formatMath(explanation)}
              </div>` : ""
            }
          </div>
        `;
      }).join("");

      renderMathJax(artBox);
    };

    renderArticleText();

    $$(".art-glang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.lang;
        if (state.lang === target) return;
        state.lang = target;
        document.body.setAttribute("data-lang", state.lang);
        
        $$(".art-glang-btn").forEach((x) => {
          x.classList.toggle("active", x.dataset.lang === state.lang);
        });

        renderArticleText();
      });
    });
  }

  /* ================= Smart Hybrid Q&A Renderer ================= */
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

        const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
        const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
        const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

        if (isStepArray) {
          return `
            <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
                ${n}. ${formatMath(qtext)}
              </div>
              ${options.length ? `
                <div class="qa-options-inline" style="margin:0 0 12px 0; padding:0; font-size:0.92rem; color:var(--ink-soft,#334155); display:flex; flex-wrap:wrap; gap:16px; font-weight:500; text-align:left; justify-content:flex-start;">
                  ${options.map((opt, optIdx) => {
                    const hasPrefix = /^\s*[\(\[]?[A-Za-zক-হ০-৯\d]/i.test(opt);
                    const optDisplay = hasPrefix ? opt : `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                    return `<span style="white-space:nowrap;">${formatMath(optDisplay)}</span>`;
                  }).join("")}
                </div>` : ""
              }
              <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
                <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
                ${explanation ? `
                  <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                    <b style="color:var(--ink,#0f172a);">${state.lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${explanation}
                  </div>` : ""
                }
              </div>
            </article>`;
        } else {
          return `
            <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
                <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${n}</span>
                <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${formatMath(qtext)}</span>
              </div>
              ${options.length ? `
                <div class="qa-options" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                  ${options.map((opt, optIdx) => `
                    <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:center; gap:6px; text-align:left;">
                      <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b> 
                      <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
                    </div>
                  `).join("")}
                </div>` : ""
              }
              <div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
                <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${t("topic.answer")}:</span>
                <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${formatMath(atext)}</span>
              </div>
              ${explanation ? `
                <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
                  <b style="color:var(--ink,#0f172a);">${state.lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${formatMath(explanation)}
                </div>` : ""
              }
            </article>`;
        }
      }).join("");

      renderMathJax(list);
    }

    const pager = $("#pager");
    if (totalPages > 1) {
      pager.innerHTML = `
        <button id="pg-prev" class="btn btn-sm btn-outline" ${state.page === 0 ? "disabled" : ""} style="padding:6px 14px; font-weight:700;">${t("topic.prev")}</button>
        <span class="pager-info" style="font-weight:700; font-size:0.88rem; color:var(--ink-soft,#64748b);">${state.page + 1} / ${totalPages}</span>
        <button id="pg-next" class="btn btn-sm btn-outline" ${state.page >= totalPages - 1 ? "disabled" : ""} style="padding:6px 14px; font-weight:700;">${t("topic.next")}</button>`;
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
      <div class="read-modal-box" role="dialog" aria-modal="true" style="max-width:760px; width:92%; margin:auto; border-radius:18px; text-align:left; background:var(--bg,#ffffff);">
        <div class="read-modal-head" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border,#e2e8f0);">
          <div class="read-modal-titles" style="text-align:left;">
            <span class="read-modal-title" style="font-size:1.15rem; font-weight:800; display:block; color:var(--ink,#0f172a);"></span>
            <span class="read-modal-sub" style="font-size:0.82rem; color:var(--ink-muted,#64748b);"></span>
          </div>
          <button id="read-modal-close" class="read-close" type="button" aria-label="Close" style="background:transparent; border:none; cursor:pointer; padding:6px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="read-modal-body" id="read-modal-body" style="padding:20px; max-height:70vh; overflow-y:auto; text-align:left; box-sizing:border-box;"></div>
        <div class="read-modal-foot" style="display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-top:1px solid var(--border,#e2e8f0);">
          <button id="read-prev" type="button" class="btn btn-sm btn-outline" style="padding:6px 16px; font-weight:700;">${t("topic.prev")}</button>
          <span class="read-pageinfo" id="read-pageinfo" style="font-weight:700; font-size:0.88rem; color:var(--ink-soft,#64748b);"></span>
          <button id="read-next" type="button" class="btn btn-sm btn-outline" style="padding:6px 16px; font-weight:700;">${t("topic.next")}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $("#read-modal-close", modal).addEventListener("click", closeReadingModal);
    $("#read-modal-backdrop", modal).addEventListener("click", closeReadingModal);

    $("#read-prev", modal).addEventListener("click", () => {
      if (state.page > 0) {
        state.page--;
        renderQAPage();
        renderReadingModalPage();
        const b = $("#read-modal-body");
        if (b) b.scrollTop = 0;
      }
    });

    $("#read-next", modal).addEventListener("click", () => {
      const rec = currentTopicRec();
      if (!rec) return;
      const qs = rec.topic.questions || [];
      const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
      const totalPages = Math.max(1, Math.ceil(qs.length / perPage));

      if (state.page < totalPages - 1) {
        state.page++;
        renderQAPage();
        renderReadingModalPage();
        const b = $("#read-modal-body");
        if (b) b.scrollTop = 0;
      }
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

      const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
      const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
      const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

      if (isStepArray) {
        return `
          <article class="qa-card read-item" data-n="${n}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="margin:0 0 8px 0; padding:0; font-size:0.96rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
              ${n}. ${formatMath(qtext)}
            </div>
            ${options.length ? `
              <div class="qa-options-inline" style="margin:0 0 10px 0; padding:0; display:flex; flex-wrap:wrap; gap:14px; font-size:0.9rem; color:var(--ink-soft,#334155); font-weight:500; text-align:left; justify-content:flex-start;">
                ${options.map((opt, optIdx) => {
                  const hasPrefix = /^\s*[\(\[]?[A-Za-zক-হ০-৯\d]/i.test(opt);
                  const optDisplay = hasPrefix ? opt : `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                  return `<span style="white-space:nowrap;">${formatMath(optDisplay)}</span>`;
                }).join("")}
              </div>` : ""
            }
            <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:8px; margin:0; font-size:0.88rem; color:var(--ink-soft,#334155); line-height:1.6; text-align:left;">
              <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
            </div>
          </article>`;
      } else {
        return `
          <article class="qa-card read-item" data-n="${n}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 8px 0; padding:0; text-align:left;">
              <span class="qno" style="flex-shrink:0; width:26px; height:26px; border-radius:6px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.84rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; margin-top:1px;">${n}</span>
              <span class="qtext" style="flex:1; font-weight:500; font-size:0.94rem; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">${formatMath(qtext)}</span>
            </div>
            <div class="qa-a" style="margin:6px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
              <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); font-size:0.9rem;">${t("topic.answer")}:</span>
              <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); font-size:0.9rem; line-height:1.45;">${formatMath(atext)}</span>
            </div>
          </article>`;
      }
    }).join("");

    renderMathJax(body);
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
    const segs = parsePath();
    if (segs[0] !== "topic") return null;
    return state.topicMap[segs.slice(1).join("/")];
  }

  /* ================= Trending page ================= */
  function renderTrendingPage(main) {
    const trending = trendingTopics(state.topicIndex);
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.trending.title")}</span></nav>
        <h1>${t("page.trending.title")}</h1>
        <p class="page-desc">${t("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${(i % 10) * 40}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(r.title))}</span>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))}${r.sub ? " • " + escapeHtml(localized(r.sub.name)) : ""} • ${r.cat.id === "study-guides" ? (state.uiLang === "as" ? "পঢ়ক →" : "Read Guide →") : `${r.nQuestions || 0} ${t("topic.questions")}`}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= Detailed Bilingual Legal Pages ================= */
  function renderStatic(main, key) {
    const isAs = state.uiLang === "as";
    let title = "";
    let content = "";

    if (key === "about") {
      title = isAs ? "আমাৰ বিষয়ে" : "About Us";
      content = isAs ? `
        <p><strong>axomexam.in</strong> লৈ আপোনাক স্বাগতম। এইখন অসমৰ বিভিন্ন প্ৰতিযোগিতামূলক পৰীক্ষাৰ শিক্ষাৰ্থীসকলক সৰ্বাংগীনভাৱে সহায় কৰাৰ উদ্দেশ্যে গঢ়ি তোলা এক নিৰ্ভৰযোগ্য আৰু বিনামূলীয়া শিক্ষামূলক ৱেবছাইট।</p>
        <h3>আমাৰ উদ্দেশ্য আৰু লক্ষ্য</h3>
        <p>অসম চৰকাৰৰ বিভিন্ন বিভাগীয় পৰীক্ষা যেনে ADRE (Assam Direct Recruitment Examination), অসম আৰক্ষী (Assam Police SI & Constable), APSC CCE, পঞ্চায়ত আৰু গ্ৰামোন্নয়ন বিভাগ (PNRD), বন বিভাগ, আৰু কেন্দ্ৰীয় ৰে'লৱে (RRB) পৰীক্ষাসমূহৰ বাবে মানসম্পন্ন অধ্যয়ন সমল প্ৰদান কৰাই আমাৰ মূল উদ্দেশ্য।</p>
        <h3>আমি কি কি আগবঢ়াওঁ?</h3>
        <ul style="margin-left:20px; line-height:1.8;">
          <li><strong>দ্বিভাষিক প্ৰশ্নোত্তৰ:</strong> সকলো বিষয়ৰ প্ৰশ্ন আৰু সমাধান অসমীয়া আৰু ইংৰাজী দুয়োটা ভাষাতে উপলব্ধ।</li>
          <li><strong>অধ্যায়ভিত্তিক মক টেষ্ট:</strong> সময় নিৰূপণ ব্যৱস্থাৰে সৈতে আত্ম-মূল্যায়নৰ সুবিধা।</li>
          <li><strong>বিনামূলীয়া প্ৰশ্ন-উত্তৰ PDF:</strong> ম’বাইল আৰু প্ৰিন্ট ফ্ৰেণ্ডলী ফৰ্মেটত নোটসমূহ ডাউনল’ড কৰাৰ ব্যৱস্থা।</li>
          <li><strong>বিগত বৰ্ষৰ প্ৰশ্নকাকত:</strong> পূৰ্বৰ পৰীক্ষাৰ প্ৰশ্নসমূহ উত্তৰসহ অধ্যয়নৰ সুবিধা।</li>
        </ul>
        <h3>যোগাযোগ</h3>
        <p>আপোনাৰ যিকোনো অনুসন্ধান, পৰামৰ্শ বা অভিযোগৰ বাবে আমাৰ অফিচিয়েল ইমেইল <a href="mailto:axomexam@outlook.com" style="color:#2563eb; font-weight:700;">axomexam@outlook.com</a>-ত পোনপটীয়াকৈ যোগাযোগ কৰিব পাৰে।</p>
      ` : `
        <p>Welcome to <strong>axomexam.in</strong>, your premier online destination for comprehensive and accessible preparation for all competitive examinations in Assam.</p>
        <h3>Our Mission & Vision</h3>
        <p>We are committed to democratizing quality exam resources for candidates preparing for state and national recruitments, including ADRE (Grade III & IV), Assam Police (Sub-Inspector & Constables), APSC, PNRD, Forest Department, and Central RRB examinations.</p>
        <h3>What We Provide</h3>
        <ul style="margin-left:20px; line-height:1.8;">
          <li><strong>Bilingual Repository:</strong> Complete Q&A, chapter-wise notes and explanations translated in both Assamese and English.</li>
          <li><strong>Interactive Mock Exams:</strong> Real-time timed practice mock tests designed to simulate exact examination environments.</li>
          <li><strong>Print-Ready PDF Notes:</strong> High-quality, clutter-free natural-flow PDFs downloadable for offline revisions.</li>
          <li><strong>Previous Year Papers:</strong> Systematically organized past question papers with verified solutions.</li>
        </ul>
        <h3>Contact & Support</h3>
        <p>We value community feedback and continuous improvement. Reach out to our academic support team at <a href="mailto:axomexam@outlook.com" style="color:#2563eb; font-weight:700;">axomexam@outlook.com</a>.</p>
      `;
    } else if (key === "privacy" || key === "privacy-policy") {
      title = isAs ? "গোপনীয়তা নীতি" : "Privacy Policy";
      content = isAs ? `
        <p><strong>axomexam.in</strong> ত আপোনাৰ ব্যক্তিগত তথ্যৰ সুৰক্ষা আৰু গোপনীয়তা ৰক্ষা কৰাটো আমাৰ অন্যতম অগ্ৰাধিকাৰ। এই নথিয়ে আমি কি তথ্য সংগ্ৰহ কৰোঁ আৰু সেয়া কেনেদৰে ব্যৱহাৰ কৰোঁ তাৰ স্পষ্ট বিৱৰণ দিয়ে।</p>
        <h3>১. আমি সংগ্ৰহ কৰা তথ্যসমূহ</h3>
        <p>আমি আমাৰ ব্যৱহাৰকাৰীৰ পৰা কোনো গোপনীয় ব্যক্তিগত তথ্য (যেনে বেংক বিৱৰণ, পাছৱৰ্ড আদি) সংগ্ৰহ নকৰোঁ। ব্যৱহাৰকাৰীয়ে যেতিয়া Contact বা Submit ফৰ্ম ব্যৱহাৰ কৰে, তেতিয়া কেৱল নাম আৰু ইমেইল ঠিকনাহে প্ৰয়োজন সাপেক্ষে সংগ্ৰহ কৰা হয়।</p>
        <h3>২. ল'গ ফাইল আৰু এনালিটিক্স</h3>
        <p>আন সকলো ষ্টেণ্ডাৰ্ড ৱেবছাইটৰ দৰে, axomexam.in এ ছাইটৰ কাৰ্যক্ষমতা আৰু ব্যৱহাৰকাৰীৰ অভিজ্ঞতা উন্নত কৰিবলৈ ল’গ ফাইল ব্যৱহাৰ কৰে (যেনে IP ঠিকনা, ব্ৰাউজাৰৰ প্ৰকাৰ, পৃষ্ঠা পৰিদৰ্শনৰ সময়)। এইবোৰ কোনো ব্যক্তিবিশেষৰ পৰিচয়ৰ সৈতে সংযুক্ত নহয়।</p>
        <h3>৩. গুগল ডাবল-ক্লিক DART কুকিজ আৰু বিজ্ঞাপন</h3>
        <p>Google আমাৰ ৱেবছাইটৰ এজন অন্যতম তৃতীয় পক্ষৰ বিজ্ঞাপনদাতা। Google-এ ব্যৱহাৰকাৰীৰ পূৰ্বৰ ইণ্টাৰনেট কাৰ্যকলাপৰ ওপৰত ভিত্তি কৰি প্ৰাসংগিক বিজ্ঞাপন প্ৰদৰ্শন কৰিবলৈ DART কুকিজ ব্যৱহাৰ কৰিব পাৰে। ব্যৱহাৰকাৰীয়ে Google Privacy & Terms পৃষ্ঠালৈ গৈ এই বিজ্ঞাপন ব্যক্তিগতকৰণ নিয়ন্ত্ৰণ কৰিব পাৰে।</p>
        <h3>৪. নীতিৰ সন্মতি</h3>
        <p>আমাৰ ৱেবছাইট ব্যৱহাৰ কৰাৰ জৰিয়তে আপুনি আমাৰ গোপনীয়তা নীতিৰ চৰ্তসমূহত সন্মতি প্ৰকাশ কৰা বুলি গণ্য কৰা হ'ব।</p>
      ` : `
        <p>At <strong>axomexam.in</strong> (accessible via https://axomexam.in), the privacy of our visitors is of paramount importance. This document outlines the types of personal and analytical information received and collected by our platform.</p>
        <h3>1. Information Collection and Handling</h3>
        <p>We do not mandate personal account creation or collect sensitive personal identification details. Information submitted via contact or feedback forms (such as Name and Email) is used strictly to respond to user inquiries.</p>
        <h3>2. Log Files & Standard Analytics</h3>
        <p>Like standard web portals, axomexam.in utilizes standard log files. The data inside includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click metrics. This data is non-personally identifiable and used purely for site maintenance.</p>
        <h3>3. Google AdSense & Third-Party Cookies</h3>
        <p>Google, as a third-party vendor, uses cookies to serve contextual advertisements on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to axomexam.in and other sites across the web. You can opt out of personalized advertising by visiting Google Ad Settings.</p>
        <h3>4. Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to all its operational terms.</p>
      `;
    } else if (key === "terms") {
      title = isAs ? "নীতি আৰু চৰ্তসমূহ" : "Terms & Conditions";
      content = isAs ? `
        <p><strong>axomexam.in</strong> লৈ স্বাগতম। এই ৱেবছাইটটো ব্যৱহাৰ কৰাৰ ক্ষেত্ৰত তলত উল্লেখ কৰা নীতি আৰু চৰ্তসমূহ প্ৰযোজ্য হ'ব:</p>
        <h3>১. বৌদ্ধিক সম্পত্তি আৰু ব্যৱহাৰৰ নিয়ম</h3>
        <p>axomexam.in ত প্ৰকাশিত সকলো পাঠ্যক্ৰম, প্ৰশ্নোত্তৰ, মক টেষ্ট আৰু PDF সমল কেৱল ছাত্ৰ-ছাত্ৰী আৰু পৰীক্ষাৰ্থীৰ ব্যক্তিগত শিক্ষাৰ বাবেহে অনুমোদিত। আমাৰ অনুমতি অবিহনে কোনো সমল ব্যৱসায়িক স্বাৰ্থত পুনৰ প্ৰকাশ, বিক্ৰী বা অনৈতিকভাৱে ব্যৱহাৰ কৰা নিষিদ্ধ।</p>
        <h3>২. তথ্যৰ শুদ্ধতা আৰু সীমাবদ্ধতা</h3>
        <p>আমি সকলো প্ৰশ্ন আৰু উত্তৰ নিৰ্ভুলভাৱে যুগুত কৰিবলৈ যথাসম্ভৱ চেষ্টা কৰোঁ। তথাপিও কোনো তথ্যৰ অনিচ্ছাকৃত ত্ৰুটিৰ বাবে হোৱা শৈক্ষিক বা আনুসংগিক ক্ষতিৰ বাবে ৱেবছাইট প্ৰশাসক আইনগতভাৱে দায়বদ্ধ নহ’ব।</p>
        <h3>৩. বাহ্যিক লিংক</h3>
        <p>আমাৰ ৱেবছাইটত তৃতীয় পক্ষৰ লিংক (যেনে চৰকাৰী জাননী, অফিচিয়েল পৰীক্ষা প’ৰ্টেল আদি) থাকিব পাৰে। সেই বাহ্যিক ৱেবছাইটসমূহৰ সমল বা নীতিৰ বাবে আমি দায়বদ্ধ নহওঁ।</p>
      ` : `
        <p>Welcome to <strong>axomexam.in</strong>. By accessing and browsing this website, you accept and agree to comply with the following Terms and Conditions.</p>
        <h3>1. Content Usage & Intellectual Property</h3>
        <p>All materials, structured questions, study notes, and downloadable assets published on axomexam.in are intended strictly for educational, personal, and non-commercial usage. Redistribution, commercial reproduction, or resale without written permission is strictly prohibited.</p>
        <h3>2. Accuracy & Limitation of Liability</h3>
        <p>While our editorial team endeavors to ensure absolute factual correctness across all subjects, study materials are provided on an 'as-is' basis. axomexam.in does not warrant the completeness or absolute infallibility of contents for official evaluation criteria.</p>
        <h3>3. External Hyperlinks</h3>
        <p>Our pages may occasionally contain links to official external sites or reference sources. We hold no responsibility for the content, privacy guidelines, or accuracy of third-party platforms.</p>
      `;
    } else if (key === "disclaimer") {
      title = isAs ? "দাবীত্যাগ (Disclaimer)" : "Disclaimer";
      content = isAs ? `
        <p><strong>https://axomexam.in</strong> ত প্ৰকাশিত সকলো তথ্য কেৱল সাধাৰণ শিক্ষা আৰু জ্ঞান আহৰণৰ উদ্দেশ্যতহে আগবঢ়োৱা হৈছে।</p>
        <h3>১. চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা</h3>
        <p>axomexam.in কোনো চৰকাৰী সংস্থা, অসম লোকসেৱা আয়োগ (APSC), বা কোনো পৰীক্ষা পৰিচালনা কৰা চৰকাৰী নিগমৰ অফিচিয়েল ৱেবছাইট নহয়। ই এক স্বতন্ত্ৰ শিক্ষামূলক প’ৰ্টেল। অফিচিয়েল জাননীৰ বাবে পৰীক্ষাৰ্থীসকলক সদায় চৰকাৰী গেজেট বা অফিচিয়েল প’ৰ্টেল অনুসৰণ কৰিবলৈ পৰামৰ্শ দিয়া হয়।</p>
        <h3>২. পেছাদাৰী পৰামৰ্শ নহয়</h3>
        <p>আমাৰ ৱেবছাইটত উপলব্ধ সমলসমূহ পৰীক্ষাৰ্থীৰ অনুশীলনৰ সহায়ৰ বাবেহে তৈয়াৰ কৰা হৈছে। ইয়াৰ ওপৰত ভিত্তি কৰি লোৱা যিকোনো সিদ্ধান্ত আপোনাৰ নিজা বিবেচনাধীন।</p>
      ` : `
        <p>All content and question banks on <strong>https://axomexam.in</strong> are published in good faith and solely for general educational, academic, and competitive examination preparation purposes.</p>
        <h3>1. Non-Affiliation with Government Authorities</h3>
        <p>axomexam.in is an independent private educational website. It is NOT affiliated with, sponsored by, or endorsed by the Government of Assam, APSC, SLPRB, State Recruitment Boards, or any governmental testing agency. Candidates must always cross-reference with official state recruitment gazettes.</p>
        <h3>2. Educational Warranties</h3>
        <p>We make no absolute warranties regarding test pattern guarantees or exam success outcomes. Use of study resources and mock practices is at the user's sole discretion.</p>
      `;
    } else {
      content = `<p>${t(`page.${key}.p1`)}</p>`;
    }

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${escapeHtml(title)}</span></nav>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); padding:28px 24px; border-radius:18px; border:1px solid var(--border,#e2e8f0); line-height:1.75; color:var(--ink-soft,#475569); box-shadow:0 8px 24px -4px rgba(15,23,42,0.03); max-width:840px; margin:0 auto; text-align:left;">
          ${content}
        </div>
      </section>`;
    
    applyStaticI18n();
    window.scrollTo(0, 0);
  }

  /* ================= Contact Us Page ================= */
  function renderContactPage(main) {
    const isAs = state.uiLang === "as";
    main.innerHTML = `
      <div class="contact-wrapper" style="width:100%;max-width:520px;margin:10px auto 30px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:20px;border:1px solid var(--line,#e2e8f0);box-shadow:var(--card-shadow, 0 10px 30px -6px rgba(15,23,42,0.06));padding:28px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;box-sizing:border-box;">
        
        <div style="width:58px; height:58px; border-radius:16px; background:rgba(37,99,235,0.1); color:#2563eb; display:flex; align-items:center; justify-content:center; margin-bottom:12px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        <h1 style="font-size:1.38rem; font-weight:800; color:var(--ink,#0f172a); margin:0 0 4px 0; letter-spacing:-0.3px;">${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</h1>
        <p style="font-size:0.84rem; color:var(--ink-soft,#64748b); line-height:1.45; margin:0 0 20px 0; max-width:380px;">
          ${isAs ? "যিকোনো প্ৰশ্ন, পৰামৰ্শ বা সহায়ৰ বাবে আমাৰ লগত যোগাযোগ কৰিব পাৰে।" : "We’d love to hear from you. Reach out for any questions, study materials, or suggestions."}
        </p>

        <div style="width:100%; background:var(--bg-soft,#f8fafc); border:1.5px solid var(--line,#e2e8f0); border-radius:14px; padding:16px 12px; margin-bottom:20px; box-sizing:border-box;">
          <span style="font-size:0.72rem; font-weight:700; color:var(--ink-soft,#64748b); text-transform:uppercase; letter-spacing:0.6px; display:block; margin-bottom:3px;">${isAs ? "অফিচিয়েল ইমেইল" : "Official Support Email"}</span>
          <a href="mailto:axomexam@outlook.com" style="font-size:1.1rem; font-weight:800; color:#2563eb; text-decoration:none; word-break:break-all;">axomexam@outlook.com</a>
        </div>

        <a href="mailto:axomexam@outlook.com" style="width:100%; max-width:260px; padding:12px 18px; font-size:0.92rem; font-weight:700; border-radius:12px; border:none; background:#2563eb; color:#ffffff; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 5px 14px -3px rgba(37,99,235,0.4); transition:all 0.2s ease;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
          ${isAs ? "ইমেইল প্ৰেৰণ কৰক" : "Send an Email"}
        </a>
      </div>
    `;
    applyStaticI18n();
    observeReveals();
  }

  /* ================= Master Search ================= */
  function normalizeText(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function allLangs(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join(" ");
    return [obj.en, obj.as].filter(Boolean).map(x => Array.isArray(x) ? x.join(" ") : x).join(" ");
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
              <a class="sr-item" href="/topic/${h.rec.path}" data-idx="${i}">
                <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
                <span style="display:flex; flex-direction:column; gap:2px;">
                  <span class="sr-title">${escapeHtml(localized(h.rec.title))}</span>
                  <span class="sr-sub">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.cat.id === "study-guides" ? (state.uiLang === "as" ? "নিৰ্দেশিকা" : "Guide") : `${h.rec.nQuestions || 0} ${t("topic.questions")}`}</span>
                </span>
              </a>`).join("")}`;
          box.innerHTML += `<a class="sr-item" href="/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${t("see.all")}</a>`;
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
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.search")}</span></nav>
        <h1>${t("tab.search")}</h1>
      </div>
      <div class="search-page">
        <div class="sp-bar">
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
          <a class="sp-topic" href="/topic/${h.rec.path}">
            <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
            <span style="display:flex; flex-direction:column; gap:2px;">
              <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(h.rec.title))}</span>
              <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.cat.id === "study-guides" ? (state.uiLang === "as" ? "নিৰ্দেশিকা" : "Guide") : `${h.rec.nQuestions || 0} ${t("topic.questions")}`}</span>
            </span>
          </a>`).join("");
      }, 180);
    });
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
        <div style="margin-top:22px;"><a class="btn btn-primary" href="/">${t("page.error.btn")}</a></div>
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
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.categories")}</span></nav>
        <h1>${t("tab.categories")}</h1>
        <p class="page-desc">${t("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${state.categories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="/category/${c.id}" style="--cat:${color}" data-delay="${i * 50}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  <b>${escapeHtml(localized(c.name))}</b>
                  <span>${escapeHtml(localized(c.description))}</span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= PDF Spinner Overlay Helper ================= */
  function showPdfSpinner(message) {
    let spinner = $("#pdf-loading-overlay");
    if (!spinner) {
      spinner = document.createElement("div");
      spinner.id = "pdf-loading-overlay";
      spinner.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.8);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(4px);";
      spinner.innerHTML = `
        <div style="width:48px;height:48px;border:3.5px solid rgba(255,255,255,0.15);border-top:3.5px solid #3b82f6;border-radius:50%;animation:pdfSpin 0.8s linear infinite;margin-bottom:16px;"></div>
        <div id="pdf-spinner-text" style="color:#ffffff;font-size:0.98rem;font-weight:700;letter-spacing:0.3px;font-family:'Plus Jakarta Sans',sans-serif;">${escapeHtml(message || "Generating PDF...")}</div>
        <style>@keyframes pdfSpin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
      `;
      document.body.appendChild(spinner);
    } else {
      $("#pdf-spinner-text").textContent = message || "Generating PDF...";
      spinner.style.display = "flex";
    }
  }

  function hidePdfSpinner() {
    const spinner = $("#pdf-loading-overlay");
    if (spinner) spinner.style.display = "none";
  }

  /* ================= Enhanced Language Selection Modal ================= */
  function showPdfDownloadModal(rec) {
    const existing = $("#pdf-lang-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "pdf-lang-modal";
    modal.className = "read-modal";
    modal.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;display:flex;align-items:center;justify-content:center;";
    modal.innerHTML = `
      <div class="read-modal-backdrop" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);"></div>
      <div class="read-modal-box pdf-pop-box" role="dialog" style="position:relative; z-index:2; width:90%; max-width:340px; padding:24px 20px; text-align:center; background:var(--bg,#ffffff); color:var(--ink,#0f172a); border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); border:1px solid var(--border,#e2e8f0); animation:popIn 0.22s cubic-bezier(0.16,1,0.3,1); box-sizing:border-box; display:flex; flex-direction:column; align-items:center;">
        
        <div style="width:52px; height:52px; background:rgba(37,99,235,0.1); color:#2563eb; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto; font-size:1.6rem;">
          📄
        </div>

        <h3 style="font-size:1.15rem; font-weight:800; margin:0 0 6px 0; color:var(--ink,#0f172a); letter-spacing:-0.2px; text-align:center; width:100%;">Select PDF Language</h3>
        <p style="color:var(--ink-soft,#64748b); font-size:0.84rem; margin:0 0 20px 0; line-height:1.4; padding:0 4px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; text-align:center; width:100%;">
          <b>${escapeHtml(localized(rec.title))}</b>
        </p>

        <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
          <button type="button" class="pdf-action-btn pdf-btn-as-action" id="pdf-btn-as">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot"></span>
              অসমীয়া মাধ্যম (Assamese)
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" class="pdf-action-btn pdf-btn-en-action" id="pdf-btn-en">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot" style="background:#0ea5e9;"></span>
              English Medium
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" id="pdf-btn-cancel" style="border:none; background:transparent; padding:8px; font-size:0.82rem; margin-top:4px; color:var(--ink-muted,#94a3b8); font-weight:700; cursor:pointer; transition:color 0.2s;">
            Cancel
          </button>
        </div>
      </div>
      
      <style>
        @keyframes popIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .pdf-action-btn { width: 100%; padding: 13px 16px; font-weight: 700; font-size: 0.92rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid transparent; cursor: pointer; transition: all 0.15s ease-in-out; outline: none; box-sizing: border-box; user-select: none; }
        .pdf-btn-as-action { background: #2563eb; color: #ffffff; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); }
        .pdf-btn-as-action:hover { background: #1d4ed8; transform: translateY(-1px); }
        .pdf-btn-as-action:active { transform: scale(0.96); }
        .pdf-btn-en-action { background: var(--bg-subtle, #f8fafc); color: var(--ink, #0f172a); border-color: var(--border, #cbd5e1); }
        .pdf-btn-en-action:hover { background: var(--bg-soft, #f1f5f9); border-color: #2563eb; color: #2563eb; transform: translateY(-1px); }
        .pdf-btn-en-action:active { transform: scale(0.96); }
        .btn-indicator-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; }
        [data-theme="dark"] .pdf-pop-box { background: #0f172a !important; border-color: #334155 !important; color: #f8fafc !important; }
        [data-theme="dark"] .pdf-btn-en-action { background: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; }
        [data-theme="dark"] .pdf-btn-en-action:hover { border-color: #38bdf8 !important; color: #38bdf8 !important; }
      </style>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    $("#pdf-btn-cancel", modal).addEventListener("click", close);
    $(".read-modal-backdrop", modal).addEventListener("click", close);

    $("#pdf-btn-as", modal).addEventListener("click", (e) => {
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => { close(); generateTopicPdf(rec, "as"); }, 100);
    });

    $("#pdf-btn-en", modal).addEventListener("click", (e) => {
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => { close(); generateTopicPdf(rec, "en"); }, 100);
    });
  }

  /* ================= Natural Flow-Based A4 PDF Exporter ================= */
  async function generateTopicPdf(rec, lang) {
    if (state.isGeneratingPdf) return;
    state.isGeneratingPdf = true;

    showPdfSpinner(lang === "as" ? "PDF প্ৰস্তুত হৈ আছে, অনুগ্ৰহ কৰি ৰওক..." : "Generating PDF, please wait...");
    await new Promise((r) => setTimeout(r, 40));

    let qs = rec.topic.questions || [];

    if (!qs.length) {
      try {
        const data = await API.getTopic(rec.cat.id, rec.topic.id);
        if (data) {
          qs = Array.isArray(data) ? data : (data.questions || []);
          rec.topic.questions = qs;
        }
      } catch (err) {
        console.error("PDF fetch error:", err);
      }
    }

    if (!qs.length) {
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast(lang === "as" ? "এই বিষয়ত প্ৰশ্ন উপলব্ধ নহয়!" : "No questions available in this topic!");
      return;
    }

    const titleText = rec.title[lang] || rec.title.as || rec.title.en || rec.topic.id;
    const catText = rec.cat.name[lang] || rec.cat.name.as || rec.cat.name.en || "";
    const langLabel = lang === "as" ? "অসমীয়া মাধ্যম" : "English Medium";
    const ansLabel = lang === "as" ? "উত্তৰ" : "Answer";
    const expLabel = lang === "as" ? "ব্যাখ্যা" : "Explanation";
    const fontFam = lang === "as" ? "'Noto Serif Bengali', serif" : "'Plus Jakarta Sans', sans-serif";

    const testMeasureDiv = document.createElement("div");
    testMeasureDiv.style.cssText = "position:absolute; left:-9999px; top:-9999px; visibility:hidden; width:726px; font-family:" + fontFam + ";";
    document.body.appendChild(testMeasureDiv);

    const renderedCards = qs.map((item, idx) => {
      const qText = extractField(item, "question", lang);
      const aText = extractField(item, "answer", lang);
      const exp = extractField(item, "explanation", lang);
      const options = getOptionsList(item, lang);

      const targetLang = lang;
      const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
      const isStepArray = Array.isArray(rawAns) || aText.includes("qa-step-line");

      const row = document.createElement("div");
      row.className = "qa-row";
      row.style.cssText = "border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-bottom:7px; line-height:1.4; text-align:left;";
      
      if (isStepArray) {
        row.innerHTML = `
          <div style="font-size:12.8px; font-weight:700; color:#0f172a; margin-bottom:1px; text-align:left;">${idx + 1}. ${formatMath(qText)}</div>
          ${options.length ? `
            <div style="font-size:11.2px; color:#475569; margin-bottom:3px; display:flex; flex-wrap:wrap; gap:12px; text-align:left; justify-content:flex-start;">
              ${options.map((opt, optIdx) => {
                const hasPrefix = /^\s*[\(\[]?[A-Za-zক-হ০-৯\d]/i.test(opt);
                const optDisplay = hasPrefix ? opt : `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                return `<span>${formatMath(optDisplay)}</span>`;
              }).join("")}
            </div>` : ""
          }
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${aText}</div>
          ${exp ? `<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${expLabel}:</b> ${exp}</div>` : ""}
        `;
      } else {
        row.innerHTML = `
          <div style="font-size:12.8px; font-weight:500; color:#0f172a; margin-bottom:1px; text-align:left;">${idx + 1}. ${formatMath(qText)}</div>
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${ansLabel}: ${formatMath(aText)}</div>
          ${exp ? `<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${expLabel}:</b> ${exp}</div>` : ""}
        `;
      }

      testMeasureDiv.appendChild(row);
      const h = row.offsetHeight + 7;
      return { html: row.outerHTML, height: h };
    });
    testMeasureDiv.remove();

    const pages = [];
    let currentPage = [];
    let currentHeight = 0;
    const pageMaxHeight = 1010;

    renderedCards.forEach(card => {
      if (currentHeight + card.height > pageMaxHeight && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [card.html];
        currentHeight = card.height;
      } else {
        currentPage.push(card.html);
        currentHeight += card.height;
      }
    });
    if (currentPage.length > 0) pages.push(currentPage);

    const totalPages = pages.length;

    const pdfContainer = document.createElement("div");
    pdfContainer.id = "dynamic-pdf-export-container";
    pdfContainer.style.cssText = "position:absolute; left:-9999px; top:-9999px; width:794px; background:#fff;";

    pages.forEach((pageRows, pageIdx) => {
      const pageNum = pageIdx + 1;
      const isFirst = pageNum === 1;

      const pageDiv = document.createElement("div");
      pageDiv.className = "pdf-page-node";
      pageDiv.style.cssText = `
        width: 794px;
        height: 1122px;
        max-height: 1122px;
        background: #ffffff;
        color: #0f172a;
        padding: 20px 34px 14px 34px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: ${fontFam};
      `;

      const headerHtml = isFirst ? `
        <div style="border-bottom:2px solid #4f46e5; padding-bottom:6px; margin-bottom:4px; height:48px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="vertical-align:bottom; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:#0f172a; line-height:1.2; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${escapeHtml(titleText)}</div>
                <div style="font-size:10.5px; color:#64748b; margin-top:2px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${escapeHtml(catText)} • ${lang === "as" ? "মুঠ বিষয়" : "Total Content"}: ${qs.length} | ${langLabel}</div>
              </td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${PDF_BRAND_LOGO_SVG}
              </td>
            </tr>
          </table>
        </div>
      ` : `
        <div style="border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; margin-bottom:4px; height:36px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td></td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${PDF_BRAND_LOGO_SVG}
              </td>
            </tr>
          </table>
        </div>
      `;

      pageDiv.innerHTML = `
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-35deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; pointer-events:none; user-select:none; z-index:0; opacity:0.075; width:140%;">
          <div style="width:110px; height:110px; background:#4f46e5; color:#ffffff; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:68px; font-weight:800; font-family:Arial, sans-serif;">A</div>
          <div style="font-size:58px; font-weight:800; color:#4f46e5; letter-spacing:2px; line-height:1;">axomexam.in</div>
        </div>
        ${headerHtml}
        <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-start; margin-top:8px; margin-bottom:8px;">
          ${pageRows.join("")}
        </div>
        <div style="border-top:1px solid #e2e8f0; padding-top:4px; display:flex; justify-content:space-between; align-items:center; font-size:9.5px; color:#64748b; font-family:'Plus Jakarta Sans', sans-serif; position:relative; z-index:2;">
          <span>© axomexam.in — Free Educational Notes for Assam Competitive Exams</span>
          <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:700; color:#334155; font-size:10px;">— Page ${pageNum} of ${totalPages} —</span>
          <span>axomexam.in</span>
        </div>
      `;

      pdfContainer.appendChild(pageDiv);
    });

    document.body.appendChild(pdfContainer);
    renderMathJax(pdfContainer);

    try {
      if (!window.jspdf || !window.html2canvas) {
        throw new Error("jsPDF or html2canvas library is missing.");
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageElements = pdfContainer.querySelectorAll('.pdf-page-node');

      for (let i = 0; i < pageElements.length; i++) {
        const canvas = await window.html2canvas(pageElements[i], { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        if (i > 0) pdf.addPage('a4', 'p');
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      pdf.save(`${rec.topic.id}-${lang}.pdf`);
      pdfContainer.remove();
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast(lang === "as" ? "PDF ডাউনলোড সফল হ'ল!" : "PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      pdfContainer.remove();
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast("Failed to generate PDF. Please try again.");
    }
  }

  /* ================= Downloads page ================= */
  async function renderDownloadsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let files = [];
    try { files = await API.listDownloads(); } catch (err) {}

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.downloads.title")}</span></nav>
        <h1>${t("page.downloads.title")}</h1>
        <p class="page-desc">${t("page.downloads.sub")}</p>
      </div>

      <section class="section" style="padding-bottom:28px;">
        <div class="section-head" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <h2>Topic-wise Q&A PDF Notes</h2>
            <p class="sec-sub">Download complete bilingual questions & answers for each topic in PDF format.</p>
          </div>
          <div style="width:100%; max-width:320px; margin:0 auto; position:relative;">
            <input type="search" id="dl-search-input" placeholder="Search PDF by topic name..." autocomplete="off" spellcheck="false"
                   style="width:100%; padding:9px 12px 9px 36px; border-radius:20px; border:1px solid var(--border,#cbd5e1); background:var(--bg,#ffffff); color:var(--ink,#0f172a); font-size:0.85rem; outline:none; box-sizing:border-box; box-shadow:0 1px 3px rgba(0,0,0,0.05);" />
            <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:15px; height:15px; color:var(--ink-soft,#64748b);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        <div class="dl-list" id="topic-pdf-list">
          ${state.topicIndex.map((rec, i) => `
            <div class="dl-item reveal topic-dl-card" data-title="${escapeHtml(allLangs(rec.title))}" data-cat="${escapeHtml(allLangs(rec.cat.name))}" data-delay="${(i % 12) * 30}">
              <span class="dl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span class="dl-meta">
                <b>${escapeHtml(localized(rec.title))}</b>
                <span>${escapeHtml(localized(rec.cat.name))}${rec.sub ? " • " + escapeHtml(localized(rec.sub.name)) : ""} • <span id="dl-count-${rec.path.replace(/\//g, '-')}">${rec.nQuestions || 0}</span> ${rec.cat.id === "study-guides" ? "Chapters" : "Questions"}</span>
              </span>
              <button class="dl-btn dl-save topic-pdf-btn" data-path="${escapeHtml(rec.path)}" type="button" style="text-transform:none;">Download</button>
            </div>
          `).join("")}
        </div>
        <div id="dl-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>No matching PDF topic found.</p></div>
      </section>

      <section class="section" style="padding-bottom:44px; border-top:1px solid var(--border,#e2e8f0); padding-top:30px;">
        <div class="section-head"><div><h2>Special E-Books & Hand-written Notes</h2><p class="sec-sub">Direct official PDFs and curated study materials.</p></div></div>
        ${files.length ? `
          <div class="dl-list">
            ${files.map(f => `
              <div class="dl-item">
                <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
                <span class="dl-meta"><b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b><span>PDF Document</span></span>
                <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
              </div>`).join("")}
          </div>` : `<div class="info-panel"><p>No extra manual PDF uploaded yet.</p></div>`}
      </section>`;

    $$(".topic-pdf-btn", main).forEach(btn => {
      btn.addEventListener("click", () => {
        const path = btn.dataset.path;
        const rec = state.topicMap[path];
        if (rec) showPdfDownloadModal(rec);
      });
    });

    const dlSearchInput = $("#dl-search-input");
    const cards = $$(".topic-dl-card", main);
    const noMatch = $("#dl-no-match");

    if (dlSearchInput) {
      dlSearchInput.addEventListener("input", (e) => {
        const q = normalizeText(e.target.value);
        let visibleCount = 0;
        cards.forEach(card => {
          const tName = normalizeText(card.dataset.title);
          const cName = normalizeText(card.dataset.cat);
          if (tName.includes(q) || cName.includes(q)) { card.style.display = ""; visibleCount++; }
          else { card.style.display = "none"; }
        });
        if (noMatch) noMatch.style.display = visibleCount === 0 ? "block" : "none";
      });
    }
    observeReveals();
  }

  /* ================= Previous Year Questions ================= */
  async function renderPreviousYear(main, segs) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    if (segs.length === 1) return renderPreviousYearExams(main);
    const exam = ((typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || []).find((e) => e.id === segs[1]);
    if (!exam) return render404(main);
    if (segs.length === 2) {
      const years = await API.listPreviousYearYears(exam.id);
      return renderPreviousYearYears(main, exam, years);
    }
    const year = segs[2];
    const files = await API.listPreviousYearPdfs(exam.id, year);
    renderPreviousYearPapers(main, exam, year, files);
  }

  function renderPreviousYearExams(main) {
    const exams = (typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.previous-year.title")}</span></nav>
        <h1>${t("page.previous-year.title")}</h1>
        <p class="page-desc">${t("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${exams.length ? `
          <div class="section-head"><div><h2>${t("pyear.choose")}</h2><p class="sec-sub">${t("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${exams.map((ex, i) => `
              <a class="sub-card reveal" href="/previous-year/${ex.id}" style="--cat:${ex.color}" data-delay="${i * 40}">
                <span class="sub-ico">${escapeHtml(ex.icon || ex.id.slice(0, 2).toUpperCase())}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(ex.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.years")}</span>
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
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(exam.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))}</h1>
        <p class="page-desc">${t("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${years.length ? `
          <div class="sub-grid">
            ${years.map((yr, i) => `
              <a class="sub-card reveal" href="/previous-year/${exam.id}/${yr}" style="--cat:${exam.color}" data-delay="${i * 50}">
                <span class="sub-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg></span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(yr)}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("pyear.noYears")}</p></div>`}
      </section>`;
    observeReveals();
  }

  function renderPreviousYearPapers(main, exam, year, files) {
    const card = (f) => `
      <div class="dl-item">
        <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
        <span class="dl-meta"><b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b><span>${escapeHtml(localized(exam.name))} • ${escapeHtml(year)}</span></span>
        <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
      </div>`;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <a href="/previous-year/${exam.id}">${escapeHtml(localized(exam.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(year)}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))} — ${escapeHtml(year)}</h1>
        <p class="page-desc">${t("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${files.length ? `<div class="dl-list">${files.map(card).join("")}</div>` : `<div class="info-panel"><p>${t("pyear.none")}</p></div>`}
      </section>`;
  }

  /* ================= Submit Q&A page ================= */
  function renderSubmitPage(main) {
    main.innerHTML = `
      <div class="success-modal-overlay" id="successPopup" style="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(5px);display:none;place-items:center;z-index:99999;opacity:0;transition:opacity 0.2s ease;">
        <div class="success-modal-card" style="background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:24px;padding:30px 24px;width:82%;max-width:300px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);border:1px solid var(--line,#e2e8f0);">
          <div class="tick-circle" style="width:68px;height:68px;background:#10b981;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px -4px rgba(16,185,129,0.5);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 id="pop-title" style="font-size:1.25rem;font-weight:800;color:var(--ink,#0f172a);margin-bottom:4px;">Sent Successfully!</h3>
          <p id="pop-desc" style="font-size:0.84rem;color:var(--ink-soft,#64748b);font-weight:600;">Your message has been received.</p>
        </div>
      </div>

      <div class="form-wrapper" style="width:100%;max-width:540px;margin:20px auto 40px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:20px;border:1px solid var(--line,#e2e8f0);box-shadow:var(--card-shadow, 0 12px 36px -8px rgba(15,23,42,0.08));padding:30px 24px;display:flex;flex-direction:column;box-sizing:border-box;">
        <div class="form-header" style="display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:22px;gap:12px;">
          <div class="lang-toggle" style="display:inline-flex;background:var(--bg-soft,#f1f5f9);border:1px solid var(--line,#e2e8f0);border-radius:99px;padding:3px;">
            <button type="button" class="lang-btn active" id="btn-en" style="border:none;background:#2563eb;color:#ffffff;padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">EN</button>
            <button type="button" class="lang-btn" id="btn-as" style="border:none;background:transparent;color:var(--ink-soft,#64748b);padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">অসমীয়া</button>
          </div>
          <div class="form-title" style="text-align:center;width:100%;">
            <h2 id="txt-title" style="font-size:1.35rem;font-weight:800;color:var(--ink,#0f172a);letter-spacing:-0.4px;">Submit Q&A Note</h2>
            <p id="txt-desc" style="margin-top:4px;font-size:0.84rem;color:var(--ink-soft,#64748b);">Contribute notes or feedback for aspirants.</p>
          </div>
        </div>

        <form id="qaForm" class="form-body" style="display:flex;flex-direction:column;gap:14px;">
          <input type="hidden" name="apiKey" value="sf_304846a9720d7354070bd57c">
          <input type="hidden" name="replyTo" value="axomexam@outlook.com">
          <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">

          <div class="field">
            <label id="lbl-name" for="name" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Your Name</label>
            <input type="text" id="name" name="name" placeholder="e.g. Rahul Borah" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-email" for="email" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Email Address</label>
            <input type="email" id="email" name="email" placeholder="name@example.com" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-topic" for="subject" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Subject / Topic (Optional)</label>
            <input type="text" id="subject" name="subject" placeholder="e.g. Assam History, Science" style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-question" for="question" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Question (Optional)</label>
            <textarea id="question" name="question" rows="2" placeholder="Type the question here..." style="width:100%;min-height:55px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>
          <div class="field">
            <label id="lbl-answer" for="answer" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Answer / Message (Optional)</label>
            <textarea id="answer" name="answer" rows="3" placeholder="Provide complete answer, steps or message..." style="width:100%;min-height:90px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>

          <div class="captcha-container" style="background:var(--bg-soft,#f8fafc);border:1.5px solid var(--line,#e2e8f0);border-radius:12px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <div class="captcha-left" style="display:flex;align-items:center;gap:8px;">
              <span class="captcha-label" id="lbl-captcha" style="font-size:0.8rem;font-weight:700;color:var(--ink-soft,#64748b);">Security:</span>
              <div class="captcha-badge-wrap" style="display:inline-flex;align-items:center;gap:4px;background:var(--bg,#ffffff);padding:3px 6px 3px 8px;border-radius:8px;border:1px solid var(--line,#cbd5e1);">
                <span class="captcha-math" id="math-expression" style="font-size:0.92rem;font-weight:800;color:#2563eb;user-select:none;">2 + 3 = ?</span>
                <button type="button" class="captcha-refresh-btn" id="btn-refresh-captcha" title="Change Captcha" style="border:none;background:transparent;color:var(--ink-faint,#94a3b8);width:24px;height:24px;display:grid;place-items:center;cursor:pointer;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
                </button>
              </div>
            </div>
            <input type="number" id="captcha-answer" placeholder="Ans" required style="width:80px;text-align:center;font-weight:700;font-size:0.92rem;padding:7px 8px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border:1.5px solid var(--line,#cbd5e1);border-radius:8px;outline:none;-moz-appearance:textfield;">
          </div>

          <button type="submit" id="submitBtn" style="width:100%;padding:14px 20px;font-size:0.95rem;font-weight:700;border-radius:12px;margin-top:4px;cursor:pointer;border:none;background:#2563eb !important;color:#ffffff !important;box-shadow:0 6px 16px -4px rgba(37,99,235,0.45);transition:all 0.2s ease;">
            <span id="txt-btn">Submit</span>
          </button>

          <div id="form-error" class="error-msg" style="padding:10px 12px;border-radius:12px;font-size:0.84rem;font-weight:600;display:none;text-align:center;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;"></div>
        </form>
      </div>
    `;

    const i18nSubmit = {
      en: {
        title: "Submit Q&A Note", desc: "Contribute notes or feedback for aspirants.",
        name: "Your Name", namePh: "e.g. Rahul Borah", email: "Email Address", emailPh: "name@example.com",
        topic: "Subject / Topic (Optional)", topicPh: "e.g. Assam History, Science",
        question: "Question (Optional)", questionPh: "Type the question here...",
        answer: "Answer / Message (Optional)", answerPh: "Provide complete answer, steps or message...",
        captcha: "Security:", captchaPh: "Ans", btn: "Submit", submitting: "Submitting...",
        captchaError: "Incorrect math answer! Please try again.", popTitle: "Sent Successfully!", popDesc: "Your message has been received."
      },
      as: {
        title: "প্ৰশ্ন প্ৰেৰণ কৰক (Submit Q&A)", desc: "প্ৰশ্ন বা বাৰ্তা জমা দি শিক্ষাৰ্থীসকলক সহায় কৰক।",
        name: "আপোনাৰ নাম", namePh: "যেনে: ৰাহুল বৰা", email: "ইমেইল ঠিকনা", emailPh: "name@example.com",
        topic: "বিষয় / অধ্যায় (ঐচ্ছিক)", topicPh: "যেনে: অসম বুৰঞ্জী, বিজ্ঞান",
        question: "প্ৰশ্ন (ঐচ্ছিক)", questionPh: "প্ৰশ্নটো ইয়াত লিখক...",
        answer: "উত্তৰ বা বাৰ্তা (ঐচ্ছিক)", answerPh: "সম্পূৰ্ণ উত্তৰ বা বাৰ্তা ইয়াত লিখক...",
        captcha: "সুৰক্ষা:", captchaPh: "উত্তৰ", btn: "জমা দিয়ক", submitting: "প্ৰেৰণ হৈ আছে...",
        captchaError: "অংকৰ উত্তৰ ভুল হৈছে! পুনৰ চেষ্টা কৰক।", popTitle: "সফলতাৰে প্ৰেৰণ হ'ল!", popDesc: "আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।"
      }
    };

    let currentFormLang = "en";
    let correctCaptcha = 0;

    function generateCaptcha() {
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * 9) + 1;
      correctCaptcha = num1 + num2;
      $("#math-expression").textContent = `${num1} + ${num2} = ?`;
      $("#captcha-answer").value = "";
    }

    function updateFormLanguage(lang) {
      currentFormLang = lang;
      const btnEn = $("#btn-en");
      const btnAs = $("#btn-as");

      if (lang === "en") {
        btnEn.style.background = "#2563eb"; btnEn.style.color = "#ffffff";
        btnAs.style.background = "transparent"; btnAs.style.color = "var(--ink-soft,#64748b)";
      } else {
        btnAs.style.background = "#2563eb"; btnAs.style.color = "#ffffff";
        btnEn.style.background = "transparent"; btnEn.style.color = "var(--ink-soft,#64748b)";
      }

      const tObj = i18nSubmit[lang];
      $("#txt-title").textContent = tObj.title; $("#txt-desc").textContent = tObj.desc;
      $("#lbl-name").textContent = tObj.name; $("#name").placeholder = tObj.namePh;
      $("#lbl-email").textContent = tObj.email; $("#email").placeholder = tObj.emailPh;
      $("#lbl-topic").textContent = tObj.topic; $("#subject").placeholder = tObj.topicPh;
      $("#lbl-question").textContent = tObj.question; $("#question").placeholder = tObj.questionPh;
      $("#lbl-answer").textContent = tObj.answer; $("#answer").placeholder = tObj.answerPh;
      $("#lbl-captcha").textContent = tObj.captcha; $("#captcha-answer").placeholder = tObj.captchaPh;
      $("#txt-btn").textContent = tObj.btn; $("#pop-title").textContent = tObj.popTitle; $("#pop-desc").textContent = tObj.popDesc;
    }

    function showSuccessPopup() {
      const popup = $("#successPopup");
      popup.style.display = "grid"; popup.style.opacity = "1";
      setTimeout(() => {
        popup.style.opacity = "0"; setTimeout(() => { popup.style.display = "none"; }, 200);
      }, 2000);
    }

    $("#btn-en").addEventListener("click", () => updateFormLanguage("en"));
    $("#btn-as").addEventListener("click", () => updateFormLanguage("as"));
    $("#btn-refresh-captcha").addEventListener("click", generateCaptcha);

    $("#qaForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const errorEl = $("#form-error");
      errorEl.style.display = "none";
      const userCaptcha = parseInt($("#captcha-answer").value, 10);
      if (userCaptcha !== correctCaptcha) {
        errorEl.textContent = i18nSubmit[currentFormLang].captchaError;
        errorEl.style.display = "block"; generateCaptcha(); return;
      }

      const submitBtn = $("#submitBtn"); const txtBtn = $("#txt-btn");
      submitBtn.disabled = true; txtBtn.textContent = i18nSubmit[currentFormLang].submitting;

      const topicVal = $("#subject").value.trim() || "General Note";
      const questionVal = $("#question").value.trim() || "N/A";
      const answerVal = $("#answer").value.trim() || "N/A";

      const payload = {
        apiKey: "sf_304846a9720d7354070bd57c",
        replyTo: "axomexam@outlook.com",
        name: $("#name").value.trim(),
        email: $("#email").value.trim(),
        subject: `[axomexam Submission] ${topicVal}`,
        message: `Topic: ${topicVal}\n\nQuestion:\n${questionVal}\n\nAnswer/Message:\n${answerVal}\n\nSent to: axomexam@outlook.com`
      };

      try {
        const response = await fetch("https://api.staticforms.dev/submit", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.success) {
          $("#qaForm").reset(); generateCaptcha(); showSuccessPopup();
        } else {
          errorEl.textContent = data.message || "Failed to submit. Please try again."; errorEl.style.display = "block";
        }
      } catch (err) {
        errorEl.textContent = "Network error. Please check your connection."; errorEl.style.display = "block";
      } finally {
        submitBtn.disabled = false; txtBtn.textContent = i18nSubmit[currentFormLang].btn;
      }
    });

    generateCaptcha();
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
        API.getTopic(rec.cat.id, rec.topic.id)
          .then((d) => ({ d, rec }))
          .catch(() => null)
      )
    );

    const rawList = [];
    results.forEach((r) => {
      if (!r || !r.d) return;
      const list = Array.isArray(r.d) ? r.d : (Array.isArray(r.d.questions) ? r.d.questions : []);
      list.forEach((qItem) => {
        const qTextObj = {
          en: extractField(qItem, "question", "en"),
          as: extractField(qItem, "question", "as")
        };

        const aTextObj = {
          en: extractField(qItem, "answer", "en"),
          as: extractField(qItem, "answer", "as")
        };

        const optsEn = getOptionsList(qItem, "en");
        const optsAs = getOptionsList(qItem, "as");
        let optionsList = [];

        if (optsEn.length || optsAs.length) {
          const maxLen = Math.max(optsEn.length, optsAs.length);
          for (let i = 0; i < maxLen; i++) {
            optionsList.push({ en: optsEn[i] || "", as: optsAs[i] || "" });
          }
        }

        let correctIdx = 0;
        if (typeof qItem.correct === "string") {
          const letter = qItem.correct.trim().toLowerCase();
          const charCode = letter.charCodeAt(0);
          if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
        } else if (Number.isInteger(qItem.correct_index)) {
          correctIdx = qItem.correct_index;
        } else if (Number.isInteger(qItem.correct)) {
          correctIdx = qItem.correct;
        } else if (Number.isInteger(qItem.answer)) {
          correctIdx = qItem.answer;
        }

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
    if (segs.length === 1) return renderMockCategoryPicker(main);

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
    if (!subId && subs.length) return renderMockSubcategoryPicker(main, cat);

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
    const mockCategories = state.categories.filter(c => c.id !== "study-guides");

    main.innerHTML = `
      <div class="mock-intro">
        <h1>${t("mock.title")}</h1>
        <p>${t("mock.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:30px;">
        <div class="section-head"><div><h2>${t("mock.pick")}</h2><p class="sec-sub">${t("mock.pick.sub")}</p></div></div>
        <div class="mock-grid">
          ${mockCategories.map((c, i) => {
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
                  <a class="mock-start" href="/mock-test/${c.id}">
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
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))} — Select Sub-Category</h1>
        <p class="page-desc">Select a specific branch to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${subs.map((s, i) => `
            <a class="sub-card reveal" href="/mock-test/${cat.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(s.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(s.sections ? s.sections.length : 0) || (s.topics ? s.topics.length : 0)} Sections</span>
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
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Choose a section to begin your test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${secs.map((sec, i) => `
            <a class="sub-card reveal" href="/mock-test/${cat.id}/${sub.id}/${sec.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
              <span class="sub-ico">${topicIconHTML(sec.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(sec.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(sec.topics || []).length} Topics</span>
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
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${topics.map((tp, i) => `
            <a class="sub-card reveal" href="/mock-test/${cat.id}/start" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(tp.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">Take Mock Test</span>
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
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${t("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/mock-test">← Choose Another Category</a></div>
        </div>`;
      return;
    }

    state.mock = { cat, pool, configured: false, count: 0, testLang: "as" };
    const counts = [10, 20, 50, 100].filter((n) => n <= pool.length);
    if (!counts.includes(pool.length)) counts.push(pool.length);

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/mock-test">Mock Test</a><span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span></nav>
        <h1>${t("mock.setup.title")}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.name))} • ${pool.length} ${t("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${catColor(cat.id)};width:40px;height:40px;border-radius:11px;">${catIconHTML(cat.id)}</span>
          <b>${escapeHtml(localized(cat.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${state.mock.testLang === "as" ? "active" : ""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${state.mock.testLang === "en" ? "active" : ""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

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
    state.mock = Object.assign(state.mock, { pool, idx: 0, answers: [], elapsedSec: 0, started: true, timerId: null });
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
          <div class="quiz-qtext">${formatMath(qText)}</div>

          <div class="quiz-options" id="quiz-options">
            ${options.map((opt, i) => `
              <button class="quiz-option" data-opt="${i}" ${answered ? "disabled" : ""}>
                <span class="opt-key">${keys[i]}</span>
                <span>${formatMath(opt)}</span>
              </button>`).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" ${!answered ? "disabled" : ""}>
            ${m.idx + 1 === m.pool.length ? "Final Submit" : t("mock.next")} →
          </button>
        </div>
      </div>`;

    const qCard = $(".quiz-card");
    if (qCard) renderMathJax(qCard);

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
          fb.innerHTML = sel === q.correct ? t("mock.revealCorrect") : `${t("mock.correctAnswer")}: ${formatMath(options[q.correct] || "")}`;
          renderMathJax(fb);
          $("#quiz-next").disabled = false;
        });
      });
    }

    $("#quiz-next").addEventListener("click", () => {
      m.idx++;
      if (m.idx >= m.pool.length) { stopMockTimer(); renderMockResults(); }
      else { renderMockQuiz(); }
    });

    $("#quiz-quit-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Quit Mock Test?",
        message: "Are you sure you want to quit the mock test? Your current progress will be lost.",
        confirmText: "Yes, Quit",
        cancelText: "Resume Test",
        onConfirm: () => { stopMockTimer(); state.mock = null; navigateTo("/mock-test"); }
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
      if (tEl) tEl.textContent = `⏱ ${fmtTime(m.elapsedSec)}`;
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
            <a class="btn btn-outline" href="/mock-test">${t("mock.result.changeCat")}</a>
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
              ansLine = `<div class="rv-ans"><b>${t("mock.answer")}:</b> ${formatMath(options[r.a] || "")}</div>`;
              if (!r.ok) ansLine += `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${formatMath(options[q.correct] || "")}</div>`;
            } else if (options.length) {
              ansLine = `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${formatMath(options[q.correct] || "")}</div>`;
            }
            return `
              <div class="review-item">
                <div class="rv-q">Q${i + 1}. ${formatMath(localizeContent(q.q))}</div>
                ${badge}
                ${ansLine}
              </div>`;
          }).join("")}
        </div>
      </div>`;

    const revList = $("#review-list");
    if (revList) renderMathJax(revList);

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

  /* ================= Global Link Handler ================= */
  function bindLinkInterception() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("//") && !a.hasAttribute("download") && a.target !== "_blank") {
        e.preventDefault();
        navigateTo(href);
      }
    });
  }

  /* ================= Boot ================= */
  async function boot() {
    const pre = $("#preloader");
    
    try {
      const savedUiLang = localStorage.getItem("axomexam-ui-lang");
      if (savedUiLang) state.uiLang = savedUiLang;
      else state.uiLang = "en";
    } catch (e) {
      state.uiLang = "en";
    }

    document.body.setAttribute("data-lang", state.lang);
    applyStaticI18n();

    try {
      const data = await API.getCategories();
      Object.assign(state, normalize(data));
    } catch (err) {
      console.error("Failed to load categories:", err);
    }

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
      initGlobalLangToggle();
      bindLinkInterception();

      window.addEventListener("popstate", () => {
        buildDesktopNav();
        buildMobileNav();
        renderRoute();
      });

      renderRoute();

      state.topicIndex.forEach(async (rec) => {
        try {
          const d = await API.getTopic(rec.cat.id, rec.topic.id);
          if (d) {
            const list = Array.isArray(d) ? d : (Array.isArray(d.questions) ? d.questions : []);
            rec.nQuestions = list.length;
            rec.topic.questions = list;
            
            const el = document.getElementById(`count-${rec.path.replace(/\//g, '-')}`);
            if (el && rec.cat.id !== "study-guides") el.textContent = `${rec.nQuestions} ${t("topic.questions")}`;

            const tEl = document.getElementById(`trend-count-${rec.path.replace(/\//g, '-')}`);
            if (tEl && rec.cat.id !== "study-guides") tEl.textContent = `${escapeHtml(localized(rec.cat.name))} • ${rec.nQuestions} ${t("topic.questions")}`;

            const dlEl = document.getElementById(`dl-count-${rec.path.replace(/\//g, '-')}`);
            if (dlEl) dlEl.textContent = `${rec.nQuestions}`;

            const loadedTotal = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0);
            const totalEl = $("#stat-total-questions");
            if (totalEl) totalEl.textContent = `${loadedTotal.toLocaleString()}+`;

            const totalPdfNotes = state.topicIndex.length + (state.topicIndex.filter((r) => r.pdf).length);
            const pdfEl = $("#stat-total-pdfs");
            if (pdfEl) pdfEl.textContent = `${totalPdfNotes}+`;
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

  /* ================= Enhanced Dark Mode Toggle ================= */
  function updateThemeIcons(theme) {
    const isDark = theme === "dark";
    const iconHtml = isDark ? `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="12" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ` : `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    $$(".theme-toggle").forEach((btn) => {
      btn.innerHTML = iconHtml;
      btn.style.cssText = "display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; border:1px solid var(--border,#e2e8f0); background:var(--bg-subtle,#f8fafc); color:var(--ink,#0f172a); cursor:pointer; padding:0; outline:none; transition:all 0.2s ease;";
    });
  }

  function initTheme() {
    const html = document.documentElement;
    let savedTheme = "light";
    try { savedTheme = localStorage.getItem("axomexam-theme") || "light"; } catch (e) { }

    if (savedTheme === "dark") html.setAttribute("data-theme", "dark");
    else html.removeAttribute("data-theme");
    updateThemeIcons(savedTheme);

    const apply = (theme) => {
      if (theme === "dark") html.setAttribute("data-theme", "dark");
      else html.removeAttribute("data-theme");
      try { localStorage.setItem("axomexam-theme", theme); } catch (e) { }
      updateThemeIcons(theme);
    };

    $$(".theme-toggle").forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", () => {
        const isDark = html.getAttribute("data-theme") === "dark";
        apply(isDark ? "light" : "dark");
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
