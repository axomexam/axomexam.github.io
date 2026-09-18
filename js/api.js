/* ============================================================
   axomexam — api.js
   Data layer. Loads categories, topics and PDFs either from a
   configured GitHub repository (raw URLs / GitHub API) or from
   the bundled local sample data.
   ============================================================ */

const API = (() => {
  const RAW = CONFIG.RAW_BASE;
  const API_BASE = CONFIG.API_BASE;
  const P = CONFIG.PATHS;
  const F = CONFIG.FALLBACK;

  /* In-memory cache for auto-discovered exam question banks (per page load) */
  const examQuestionCache = {};

  /* Build a raw.githubusercontent.com URL */
  function rawUrl(path) {
    return `${RAW}/${CONFIG.OWNER}/${CONFIG.REPO}/${CONFIG.BRANCH}/${path}`;
  }

  /* GitHub API URL for a directory listing */
  function apiDirUrl(path) {
    return `${API_BASE}/repos/${CONFIG.OWNER}/${CONFIG.REPO}/contents/${path}?ref=${CONFIG.BRANCH}`;
  }

  async function fetchJSON(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json();
  }

  async function fetchText(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.text();
  }

  /* Public file URL for a PDF (raw URL when remote, local path otherwise) */
  function pdfUrl(categoryId, file) {
    if (CONFIG.USE_REMOTE) return rawUrl(`${P.PDF}/${categoryId}/${file}`);
    return `${F.PDF_BASE}${categoryId}/${file}`;
  }

  /* ---- Categories ---- */
  async function getCategories() {
    const url = CONFIG.USE_REMOTE ? rawUrl(P.CATEGORIES) : F.CATEGORIES_URL;
    const data = await fetchJSON(url);
    return data; // { meta?, categories: [...] }
  }

  /* ---- Topic content (JSON with bilingual Q&A + optional PDF) ----
     Data layout is declared per category in categories.json:
       contentLayout === "flat"  -> files live at content/<cat>/<topic>.json
       otherwise (nested/mixed)  -> try content/<cat>/<sub>/<topic>.json
                                    (or the direct sub file) then flat fallback */
  async function getTopic(categoryId, topicId, subcategoryId, contentLayout) {
    if (categoryId === "trending") {
      const url = CONFIG.USE_REMOTE
        ? rawUrl(`${P.TRENDING}/${topicId}.json`)
        : `${F.TRENDING_BASE}${topicId}.json`;
      return fetchJSON(url);
    }
    const rels = [];
    if (contentLayout === "flat") {
      rels.push(`${categoryId}/${topicId}.json`);
    } else {
      if (subcategoryId && subcategoryId === topicId) rels.push(`${categoryId}/${subcategoryId}.json`);
      if (subcategoryId) rels.push(`${categoryId}/${subcategoryId}/${topicId}.json`);
      rels.push(`${categoryId}/${topicId}.json`);
    }
    let lastErr = null;
    for (const rel of rels) {
      const url = CONFIG.USE_REMOTE ? rawUrl(`${P.CONTENT}/${rel}`) : `${F.CONTENT_BASE}${rel}`;
      try {
        return await fetchJSON(url);
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error(`Topic not found: ${categoryId}/${topicId}`);
  }

  /* ---- Raw text topic (fallback for markdown content if ever used) ---- */
  async function getTopicMarkdown(categoryId, topicId) {
    const url = CONFIG.USE_REMOTE
      ? rawUrl(`${P.CONTENT}/${categoryId}/${topicId}.md`)
      : `${F.CONTENT_BASE}${categoryId}/${topicId}.md`;
    return fetchText(url);
  }

  /* ---- Articles (read-only rich articles under the "articles" category) ----
     Each subcategory of "articles" loads a single JSON file:
     content/articles/<subcategory-id>.json
     Articles are for reading only and never appear in the Downloads list. */
  async function getArticles(subcategoryId) {
    const url = CONFIG.USE_REMOTE
      ? rawUrl(`${P.CONTENT}/articles/${subcategoryId}.json`)
      : `${F.CONTENT_BASE}articles/${subcategoryId}.json`;
    return fetchJSON(url);
  }

  /* ---- Mock test sets ----
     Each set is a single manually uploaded JSON file:
     mock-test/<categoryId>/<subcategoryId>/set-<n>.json
     The file contains the full question list for one mock test set,
     with a "difficulty" field (easy / medium / hard) per question. */
  async function getMockSet(catId, subId, setNumber) {
    const url = CONFIG.USE_REMOTE
      ? rawUrl(`${P.MOCKSETS}/${catId}/${subId}/set-${setNumber}.json`)
      : `${F.MOCKSETS_BASE}${catId}/${subId}/set-${setNumber}.json`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  /* ---- Optional: discover available PDFs from a repo directory
        via the GitHub API. Used to enrich the PDF panel when a
        topic does not declare a pdf field but files exist. ---- */
  async function listPdfDir(categoryId) {
    if (!CONFIG.USE_REMOTE) return [];
    const url = apiDirUrl(`${P.PDF}/${categoryId}`);
    try {
      const items = await fetchJSON(url);
      return (Array.isArray(items) ? items : [])
        .filter((i) => /\.pdf$/i.test(i.name))
        .map((i) => ({ name: i.name, url: i.download_url || rawUrl(`${P.PDF}/${categoryId}/${i.name}`) }));
    } catch {
      return [];
    }
  }

  /* ---- Downloads page: every PDF placed in the "download" folder ---- */
  async function listDownloads() {
    if (CONFIG.USE_REMOTE) {
      try {
        const items = await fetchJSON(apiDirUrl(P.DOWNLOADS));
        return (Array.isArray(items) ? items : [])
          .filter((i) => /\.pdf$/i.test(i.name))
          .map((i) => ({ name: i.name, url: i.download_url || rawUrl(`${P.DOWNLOADS}/${i.name}`) }));
      } catch {
        return [];
      }
    }
    return (F.DOWNLOADS || []).map((name) => ({ name, url: `${F.DOWNLOAD_BASE}${name}` }));
  }

  /* ---- Extra trending topics: JSON files in the "trending-topics" folder ----
     Each file is one trending topic with bilingual title + questions. */
  async function getTrendingTopics() {
    if (CONFIG.USE_REMOTE) {
      let items = [];
      try {
        items = await fetchJSON(apiDirUrl(P.TRENDING));
      } catch { return []; }
      const files = (Array.isArray(items) ? items : []).filter((i) => /\.json$/i.test(i.name));
      const records = await Promise.all(files.map(async (f) => {
        try {
          return await fetchJSON(f.download_url || rawUrl(`${P.TRENDING}/${f.name}`));
        } catch { return null; }
      }));
      return records.filter(Boolean);
    }
    const records = await Promise.all((F.TRENDING || []).map(async (id) => {
      try {
        return await fetchJSON(`${F.TRENDING_BASE}${id}.json`);
      } catch { return null; }
    }));
    return records.filter(Boolean);
  }

  /* ---- Previous year questions ----
     Repo layout: previous-year/<exam-id>/[<sub-exam-id>/]<year>/<file>.pdf ---- */

  /* List the available years (4-digit folders) for an exam (or sub-exam) */
  async function listPreviousYearYears(examId, subId) {
    const relDir = subId ? `${P.PYEAR}/${examId}/${subId}` : `${P.PYEAR}/${examId}`;
    if (CONFIG.USE_REMOTE) {
      try {
        const items = await fetchJSON(apiDirUrl(relDir));
        return (Array.isArray(items) ? items : [])
          .filter((i) => i.type === "dir" && /^\d{4}$/.test(i.name))
          .map((i) => i.name)
          .sort();
      } catch { return []; }
    }
    const node = (F.PYEAR || {})[examId] || {};
    const scope = subId ? (node[subId] || {}) : node;
    return Object.keys(scope).sort();
  }

  /* List the PDF files inside an exam[/sub-exam]/year folder */
  async function listPreviousYearPdfs(examId, year, subId) {
    const relDir = subId ? `${P.PYEAR}/${examId}/${subId}/${year}` : `${P.PYEAR}/${examId}/${year}`;
    if (CONFIG.USE_REMOTE) {
      try {
        const items = await fetchJSON(apiDirUrl(relDir));
        return (Array.isArray(items) ? items : [])
          .filter((i) => /\.pdf$/i.test(i.name))
          .map((i) => ({ name: i.name, url: i.download_url || rawUrl(`${relDir}/${i.name}`) }));
      } catch { return []; }
    }
    const node = (F.PYEAR || {})[examId] || {};
    const scope = subId ? (node[subId] || {}) : node;
    const files = scope[year] || [];
    const relPath = subId ? `${examId}/${subId}/${year}` : `${examId}/${year}`;
    return files.map((name) => ({ name, url: `${F.PYEAR_BASE}${relPath}/${name}` }));
  }

  /* ---- E-Books (read-only library, online reading only) ----
     Each e-book is a single JSON file at data/books/<id>.json in the
     deployed site repo. The library page lists every *.json inside that
     folder through the public GitHub Contents API, so newly uploaded
     books appear automatically without any code change. A bundled
     fallback list (CONFIG.FALLBACK.BOOKS) is used when the API is
     unavailable. */
  async function getBook(bookId) {
    const dir = (CONFIG.EBOOKS && CONFIG.EBOOKS.DIR) || "data/books";
    const rel = `${dir}/${bookId}.json`;
    const url = CONFIG.USE_REMOTE ? rawUrl(rel) : `/${rel}`;
    const data = await fetchJSON(url);
    if (data && !data.id) data.id = bookId;
    return data;
  }

  async function listBooks() {
    let files = [];
    try {
      const cfg = CONFIG.EBOOKS || {};
      const url = `${API_BASE}/repos/${cfg.OWNER || "axomexam"}/${cfg.REPO || "axomexam.github.io"}/contents/${cfg.DIR || "data/books"}?ref=${cfg.BRANCH || "main"}`;
      const items = await fetchJSON(url);
      files = (Array.isArray(items) ? items : [])
        .filter((i) => i.type === "file" && /\.json$/i.test(i.name))
        .map((i) => i.name.replace(/\.json$/i, ""));
    } catch (e) {
      files = (F.BOOKS || []).slice();
    }
    const records = await Promise.all(files.map(async (id) => {
      try {
        return await getBook(id);
      } catch { return null; }
    }));
    return records.filter(Boolean);
  }

  /* ---- Your Exams (read-only exam library, online reading only) ----
     data/exams/index.json lists every exam and its subjects. Each subject
     is a single JSON file at data/exams/<exam-id>/<section-id>.json, so a
     new exam can be added by editing index.json and uploading files. */
  async function listExams() {
    const cfg = CONFIG.EXAMS || {};
    const rel = cfg.INDEX || "data/exams/index.json";
    const url = CONFIG.USE_REMOTE ? rawUrl(rel) : `/${rel}`;
    try {
      const data = await fetchJSON(url);
      const exams = Array.isArray(data) ? data : (data && Array.isArray(data.exams) ? data.exams : []);
      return exams;
    } catch (e) {
      return [];
    }
  }

  async function getExamSection(examId, sectionId) {
    const cfg = CONFIG.EXAMS || {};
    const dir = cfg.DIR || "data/exams";
    const safeExam = String(examId || "").replace(/[^A-Za-z0-9_-]/g, "");
    const safeSec = String(sectionId || "").replace(/[^A-Za-z0-9_-]/g, "");
    if (!safeExam || !safeSec) throw new Error("Invalid exam section");
    const rel = `${dir}/${safeExam}/${safeSec}.json`;
    const url = CONFIG.USE_REMOTE ? rawUrl(rel) : `/${rel}`;
    return fetchJSON(url);
  }

  /* ---- One sub-category question bank ----
     Every *.json file inside the sub-category folder is either ONE question
     object with bilingual text + 4 options, or an ARRAY of such question
     objects (the "practice" layout). Files are discovered from the public
     GitHub Contents API so newly uploaded questions appear automatically.
     When that API is unavailable (offline / local preview), the folder's
     index.json manifest lists the files to load. An index.json manifest is
     never treated as a question. */
  async function listExamQuestions(examId, sectionId, subId, childId) {
    const cfg = CONFIG.EXAMS || {};
    const dir = cfg.DIR || "data/exams";
    const safe = (s) => String(s || "").replace(/[^A-Za-z0-9_-]/g, "");
    const safeExam = safe(examId);
    const safeSec = safe(sectionId);
    const safeSub = safe(subId);
    const safeChild = safe(childId);
    if (!safeExam || !safeSec || !safeSub) throw new Error("Invalid exam sub-category");
    const relDir = `${dir}/${safeExam}/${safeSec}/${safeSub}` + (safeChild ? `/${safeChild}` : "");

    const cacheKey = relDir;
    if (examQuestionCache[cacheKey]) return examQuestionCache[cacheKey];

    const relUrl = (name) => (CONFIG.USE_REMOTE ? rawUrl(`${relDir}/${name}`) : `/${relDir}/${name}`);
    const isManifest = (name) => /^index\.json$/i.test(name);

    let files = [];

    /* Discover question files from the GitHub Contents API */
    const loadFromApi = async () => {
      try {
        const owner = cfg.OWNER || "axomexam";
        const repo = cfg.REPO || "axomexam.github.io";
        const branch = cfg.BRANCH || "main";
        const items = await fetchJSON(
          `${API_BASE}/repos/${owner}/${repo}/contents/${relDir}?ref=${branch}`
        );
        return (Array.isArray(items) ? items : [])
          .filter((i) => i.type === "file" && /\.json$/i.test(i.name) && !isManifest(i.name))
          .map((i) => ({ name: i.name, url: i.download_url || relUrl(i.name) }));
      } catch (e) {
        return [];
      }
    };

    /* The folder's index.json manifest (works offline / local preview) */
    const loadFromManifest = async () => {
      try {
        const man = await fetchJSON(relUrl("index.json"));
        const list = (man && Array.isArray(man.files)) ? man.files : [];
        return list
          .filter((n) => typeof n === "string" && /\.json$/i.test(n) && !isManifest(n))
          .map((name) => ({ name, url: relUrl(name) }));
      } catch (e) {
        return [];
      }
    };

    /* Discover from the public GitHub Contents API first so newly uploaded
       question files appear automatically; the folder's index.json manifest
       is the offline / local-preview fallback. */
    files = await loadFromApi();
    if (!files.length) files = await loadFromManifest();

    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

    const records = await Promise.all(files.map(async (f) => {
      try {
        const data = await fetchJSON(f.url);
        if (Array.isArray(data)) {
          return data.map((item) => {
            if (item && typeof item === "object" && !Array.isArray(item)) {
              if (!item.file) item.file = f.name;
              return item;
            }
            return null;
          });
        }
        if (data && typeof data === "object" && !data.file) data.file = f.name;
        return data;
      } catch (e) {
        return null;
      }
    }));
    const result = records.filter(Boolean).flat().filter(Boolean);
    examQuestionCache[cacheKey] = result;
    return result;
  }

  return {
    getCategories, getTopic, getTopicMarkdown, listPdfDir, pdfUrl,
    listDownloads, getTrendingTopics, listPreviousYearYears, listPreviousYearPdfs,
    getArticles, getMockSet, getBook, listBooks, listExams, getExamSection,
    listExamQuestions,
  };
})();
