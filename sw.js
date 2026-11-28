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
const CACHE_VERSION = "8e667371";
const CACHE_NAME = "axomexam-static-" + CACHE_VERSION;

/* Warm the cache on install with the current asset versions. */
const PRECACHE = [
  "/css/style.css?v=ae61008a",
  "/js/config.js?v=114ec96d",
  "/js/i18n.js?v=271ea529",
  "/js/api.js?v=ee743a8e",
  "/js/app.js?v=413f16f9",
  "/js/leaderboard.js?v=77af1848",
  "/js/leaderboard-ui.js?v=a867886f",
  "/js/push.js?v=771a1cdd",
  "/js/install.js?v=a9e84cbb",
  "/js/copy-guard.js?v=98bd0293",
  "/app/axomexam-icon.png",
  "/android-chrome-192x192.png",
  "/notification-badge.png",
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

/* ============================================================
   Web Push

   A push can arrive while the site is closed, so the notification is
   shown here. The payload already carries the text in the language of
   the subscriber it is addressed to (tools/send-push.js resolves that
   from the stored `lang`), so nothing is fetched at display time.

   Payload shape (written by tools/send-push.js):
     { id, title, body, url }
   ============================================================ */
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {};
  }

  const title = data.title || "axomexam";
  const body = data.body || "";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      /* Absolute URLs: Chrome resolves a relative icon against the service
         worker scope, and a miss silently falls back to the Chrome logo.
         The payload may override either one so a future item can carry its
         own artwork. */
      icon: data.icon ? new URL(data.icon, self.location.origin).href
                      : self.location.origin + "/android-chrome-192x192.png",
      /* The badge is masked to a single colour by the OS, so it must be a
         transparent glyph on transparent ground. A full-colour square here
         renders as a grey blob on Android. */
      badge: data.badge ? new URL(data.badge, self.location.origin).href
                        : self.location.origin + "/notification-badge.png",
      /* One tag per item, so re-sending the same item replaces the old
         notification instead of stacking duplicates on the lock screen. */
      tag: data.id || "axomexam",
      renotify: !!data.id,
      data: { url: data.url || "/" },
    })
  );
});

/* Clicking a notification reuses an open tab on the site when there is
   one, and opens the target otherwise — never a duplicate tab. */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    (async () => {
      const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      const origin = self.location.origin;

      for (const client of list) {
        let same = false;
        try {
          same = new URL(client.url).origin === origin;
        } catch (e) {
          same = false;
        }
        if (!same) continue;

        try {
          await client.focus();
          if ("navigate" in client) await client.navigate(target);
        } catch (e) {
          /* focus() rejects on some mobile browsers; the open below covers it. */
        }
        return;
      }

      await self.clients.openWindow(target);
    })()
  );
});

/* Chrome occasionally rotates a subscription. The old endpoint is dead,
   so without this the visitor silently stops receiving pushes. The new
   endpoint is written with the page's own language preference, which is
   the best signal available inside the worker. */
self.addEventListener("pushsubscriptionchange", (event) => {
  const next = event.newSubscription;
  if (!next) return;

  event.waitUntil(
    (async () => {
      const json = next.toJSON ? next.toJSON() : next;
      const project = "axomexam-web-push";
      const apiKey = "AIzaSyC501rLZyw7kTC5W8DNnyIc7WUPHJ_0zME";
      const base =
        "https://firestore.googleapis.com/v1/projects/" + project +
        "/databases/(default)/documents/push_subs";

      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(json.endpoint)
      );
      const id = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      await fetch(base + "?documentId=" + id + "&key=" + apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            endpoint: { stringValue: json.endpoint },
            p256dh: { stringValue: (json.keys && json.keys.p256dh) || "" },
            auth: { stringValue: (json.keys && json.keys.auth) || "" },
            lang: { stringValue: "en" },
            created: { integerValue: String(Date.now()) },
          },
        }),
      }).catch(() => {});
    })()
  );
});
