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

  return { getCategories, getTopic, getTopicMarkdown, listPdfDir, pdfUrl };
})();
