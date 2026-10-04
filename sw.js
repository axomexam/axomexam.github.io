/* ============================================================
   axomexam — service worker
   Long-lived runtime caching for first-party static assets so
   repeat visits do not re-download JS/CSS/images even though
   GitHub Pages caps HTTP Cache-Control at 10 minutes.

   Strategy:
     - HTML navigations  -> network-first (content stays fresh)
     - Static assets      -> stale-while-revalidate (instant load,
                             refreshed in the background)
     - Third-party/CDN    -> never touched (ads, analytics, fonts)
     - Range requests     -> never touched (PDF streaming)

   CACHE_VERSION is derived from the content hashes of the precached
   assets by scripts/stamp-assets.js, so it only changes (and only then
   purges the old cache) when an asset's bytes actually change.
   ============================================================ */
const CACHE_VERSION = "c255c433";
const CACHE_NAME = "axomexam-static-" + CACHE_VERSION;

/* Warm the cache on install with the current asset versions. */
const PRECACHE = [
  "/css/style.css?v=a33612c4",
  "/js/config.js?v=478e713c",
  "/js/i18n.js?v=cadb56fa",
  "/js/api.js?v=3176a18e",
  "/js/app.js?v=394a085b",
  "/app/axomexam-icon.png",
];

const STATIC_RE = /\.(?:css|js|mjs|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(
        PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" })))
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }

  /* Leave cross-origin traffic alone (AdSense, GA, Google Fonts, KaTeX). */
  if (url.origin !== self.location.origin) return;

  /* Do not interfere with byte-range requests (e.g. streaming a PDF). */
  if (request.headers.has("range")) return;

  const accept = request.headers.get("accept") || "";

  /* HTML: always try the network first so page content stays up to date. */
  if (request.mode === "navigate" || accept.includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch (e) {
          return (
            (await caches.match(request)) ||
            (await caches.match("/")) ||
            Response.error()
          );
        }
      })()
    );
    return;
  }

  /* Static assets: serve from cache instantly, refresh in background. */
  if (STATIC_RE.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);

        const network = fetch(request)
          .then((response) => {
            if (response && response.ok && response.type === "basic") {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);

        if (cached) {
          event.waitUntil(network.catch(() => {}));
          return cached;
        }
        return network;
      })()
    );
  }
});
