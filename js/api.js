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

  /* ---- Topic content (JSON with bilingual Q&A + optional PDF) ---- */
  async function getTopic(categoryId, topicId) {
    if (categoryId === "trending") {
      const url = CONFIG.USE_REMOTE
        ? rawUrl(`${P.TRENDING}/${topicId}.json`)
        : `${F.TRENDING_BASE}${topicId}.json`;
      return fetchJSON(url);
    }
    const url = CONFIG.USE_REMOTE
      ? rawUrl(`${P.CONTENT}/${categoryId}/${topicId}.json`)
      : `${F.CONTENT_BASE}${categoryId}/${topicId}.json`;
    return fetchJSON(url);
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
     Repo layout: previous-year/<exam-id>/<year>/<file>.pdf ---- */

  /* List the available years (4-digit folders) for an exam */
  async function listPreviousYearYears(examId) {
    if (CONFIG.USE_REMOTE) {
      try {
        const items = await fetchJSON(apiDirUrl(`${P.PYEAR}/${examId}`));
        return (Array.isArray(items) ? items : [])
          .filter((i) => i.type === "dir" && /^\d{4}$/.test(i.name))
          .map((i) => i.name)
          .sort();
      } catch { return []; }
    }
    return Object.keys((F.PYEAR || {})[examId] || {}).sort();
  }

  /* List the PDF files inside an exam/year folder */
  async function listPreviousYearPdfs(examId, year) {
    if (CONFIG.USE_REMOTE) {
      try {
        const items = await fetchJSON(apiDirUrl(`${P.PYEAR}/${examId}/${year}`));
        return (Array.isArray(items) ? items : [])
          .filter((i) => /\.pdf$/i.test(i.name))
          .map((i) => ({ name: i.name, url: i.download_url || rawUrl(`${P.PYEAR}/${examId}/${year}/${i.name}`) }));
      } catch { return []; }
    }
    const files = ((F.PYEAR || {})[examId] || {})[year] || [];
    return files.map((name) => ({ name, url: `${F.PYEAR_BASE}${examId}/${year}/${name}` }));
  }

  return {
    getCategories, getTopic, getTopicMarkdown, listPdfDir, pdfUrl,
    listDownloads, getTrendingTopics, listPreviousYearYears, listPreviousYearPdfs,
    getArticles,
  };
})();
