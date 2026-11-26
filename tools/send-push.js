#!/usr/bin/env node
"use strict";

/*
 * Broadcast one notification to every subscribed browser.
 *
 * The owner's workflow:
 *   1. Edit data/notifications.json — add the item at the top of `items`.
 *   2. GitHub → Actions → "Send notification" → Run workflow, pick the id.
 *      (Or just run this script locally; see the usage below.)
 *
 * The bell list on the site reads the same file, so the in-page list and the
 * browser notification always carry identical text.
 *
 * Subscribers live in the Firestore collection `push_subs` (one document per
 * browser, id = sha256(endpoint)). Reading that collection needs a service
 * account: it holds push endpoints, which are enough to deliver a message to
 * a person, so it is deliberately not publicly readable.
 *
 * Environment:
 *   VAPID_PUBLIC_KEY    from js/push-config.js (the same key)
 *   VAPID_PRIVATE_KEY   secret; never commit it
 *   VAPID_SUBJECT       mailto:contact@axomexam.in
 *   FIREBASE_SA_JSON    the service-account JSON, as a string
 *   GCP_ACCESS_TOKEN    alternative to FIREBASE_SA_JSON: a ready OAuth token
 *
 * Usage (from the repository root):
 *   node tools/send-push.js                    # newest item in the feed
 *   node tools/send-push.js --id <id>          # one specific item
 *   node tools/send-push.js --dry-run          # report counts, send nothing
 *   node tools/send-push.js --lang en          # ignore stored language
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = process.cwd();
const FEED = path.join(ROOT, "data", "notifications.json");
const COLLECTION = "push_subs";

function parseArgs(argv) {
  const out = { id: null, dryRun: false, lang: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--id") out.id = argv[++i];
    else if (a === "--lang") out.lang = argv[++i];
  }
  return out;
}

function readFeed() {
  if (!fs.existsSync(FEED)) {
    throw new Error("Missing " + path.relative(ROOT, FEED));
  }
  const data = JSON.parse(fs.readFileSync(FEED, "utf8"));
  const items = Array.isArray(data) ? data : data.items || [];
  return items.filter((it) => it && it.id && it.url && it.title);
}

function pickItem(items, id) {
  if (!items.length) throw new Error("data/notifications.json has no usable items");
  if (!id) return items[0];
  const found = items.find((it) => it.id === id);
  if (!found) {
    throw new Error(
      "No item with id '" + id + "'. Available: " + items.map((i) => i.id).join(", ")
    );
  }
  return found;
}


/* A 201 from the push service means FCM accepted the message, not that a
   phone displayed it. Printing the device behind each row is how a dead,
   emulated or never-installed subscription is told apart from a real one. */
function reportSubscribers(subs) {
  console.log("Subscribers: " + subs.length);
  const now = Date.now();
  for (const sub of subs) {
    const age = sub.created ? Math.floor((now - sub.created) / 86400000) + "d" : "?";
    let host = "?";
    try { host = new URL(sub.endpoint).host; } catch (e) { host = "?"; }
    console.log(
      "  " + sub.id.slice(0, 8) +
      "  lang=" + sub.lang +
      "  at=" + (sub.created ? new Date(sub.created).toISOString() : "?") +
      "  tz=" + (sub.tz || "?") +
      "  push=" + host +
      "  ua=" + (sub.ua || "?")
    );
  }
}

/* ---------- Google auth ---------- */

function base64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/* A service account signs a JWT with its private key, then trades it for an
   access token. Doing this by hand keeps the workflow free of the whole
   googleapis dependency tree. */
async function accessTokenFromServiceAccount(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const unsigned =
    base64url(JSON.stringify(header)) + "." + base64url(JSON.stringify(claims));
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(sa.private_key);
  const assertion = unsigned + "." + base64url(signature);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: assertion,
    }),
  });

  if (!res.ok) {
    throw new Error("Token exchange failed: " + res.status + " " + (await res.text()));
  }
  const body = await res.json();
  return body.access_token;
}

async function getAccessToken() {
  if (process.env.GCP_ACCESS_TOKEN) return process.env.GCP_ACCESS_TOKEN;
  const raw = process.env.FIREBASE_SA_JSON;
  if (!raw) {
    throw new Error("Set FIREBASE_SA_JSON (service account) or GCP_ACCESS_TOKEN");
  }
  return accessTokenFromServiceAccount(JSON.parse(raw));
}

/* ---------- Firestore reads ---------- */

async function listSubscribers(token, projectId) {
  const base =
    "https://firestore.googleapis.com/v1/projects/" + projectId +
    "/databases/(default)/documents/" + COLLECTION;

  const subs = [];
  let pageToken = null;

  do {
    const url = new URL(base);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url, {
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 404) return subs; /* collection not created yet */
    if (!res.ok) {
      throw new Error("Firestore list failed: " + res.status + " " + (await res.text()));
    }

    const body = await res.json();
    for (const doc of body.documents || []) {
      const f = doc.fields || {};
      const endpoint = f.endpoint && f.endpoint.stringValue;
      const p256dh = f.p256dh && f.p256dh.stringValue;
      const auth = f.auth && f.auth.stringValue;
      if (!endpoint || !p256dh || !auth) continue;
      subs.push({
        id: doc.name.split("/").pop(),
        endpoint: endpoint,
        keys: { p256dh: p256dh, auth: auth },
        lang: (f.lang && f.lang.stringValue) || "en",
        /* Metadata only, for the dry-run report. */
        ua: (f.ua && f.ua.stringValue) || "",
        tz: (f.tz && f.tz.stringValue) || "",
        created: Number((f.created && f.created.integerValue) || 0),
      });
    }
    pageToken = body.nextPageToken || null;
  } while (pageToken);

  return subs;
}

async function deleteDoc(token, projectId, id) {
  const url =
    "https://firestore.googleapis.com/v1/projects/" + projectId +
    "/databases/(default)/documents/" + COLLECTION + "/" + encodeURIComponent(id);
  await fetch(url, { method: "DELETE", headers: { Authorization: "Bearer " + token } })
    .catch(() => {});
}

/* ---------- main ---------- */

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const items = readFeed();
  const item = pickItem(items, args.id);

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    "axomexam-web-push";

  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:contact@axomexam.in";

  if (!args.dryRun && (!publicKey || !privateKey)) {
    throw new Error("Set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY (see .github/workflows/push-notify.yml)");
  }

  const token = await getAccessToken();
  const subs = await listSubscribers(token, projectId);

  console.log("Notification: " + item.id);
  console.log("Title (en):   " + item.title.en);
  console.log("Subscribers:  " + subs.length);

  if (args.dryRun) {
    reportSubscribers(subs);
    return;
  }

  /* Loaded here so --dry-run and a missing dependency still report counts. */
  const webpush = require("web-push");
  webpush.setVapidDetails(subject, publicKey, privateKey);

  let sent = 0;
  let dropped = 0;
  let failed = 0;

  for (const sub of subs) {
    const lang = args.lang || (sub.lang === "as" ? "as" : "en");
    const pick = (v) => (v && typeof v === "object" ? v[lang] || v.en || v.as : v || "");

    const payload = JSON.stringify({
      id: item.id,
      title: pick(item.title),
      body: pick(item.body),
      url: item.url,
      icon: "/android-chrome-192x192.png",
      badge: "/notification-badge.png",
    });

    /* An automated browser can hold a valid subscription that no person
       will ever see. It accepts every push, so it inflates the count and
       hides the real audience — drop it before it is counted. */
    if (/HeadlessChrome/i.test(sub.ua || "")) {
      await deleteDoc(token, projectId, sub.id);
      console.log("  removed automated browser " + sub.id.slice(0, 8));
      continue;
    }

    try {
      const res = await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys },
        payload,
        {
          TTL: 60 * 60 * 24,
          /* Android holds normal-urgency messages until the phone leaves
             Doze, which can be hours. A study alert is worth waking for. */
          urgency: "high",
        }
      );
      sent++;
      console.log(
        "  ok " + sub.id.slice(0, 8) +
        " http=" + ((res && res.statusCode) || "?") +
        " msg=" + (((res && res.headers) || {})["location"] || "-")
      );
    } catch (err) {
      /* 404/410 means the browser is gone for good — clean the row so the
         next broadcast is faster. Anything else is transient. */
      if (err && (err.statusCode === 404 || err.statusCode === 410)) {
        dropped++;
        await deleteDoc(token, projectId, sub.id);
      } else {
        failed++;
        console.warn(
          "  failed " + sub.id.slice(0, 12) + ": " + (err && err.statusCode) + " " + (err && err.message)
        );
      }
    }
  }

  console.log("Sent: " + sent + "  dropped(dead): " + dropped + "  failed: " + failed);
  if (failed && !sent) process.exitCode = 1;
}

main().catch((err) => {
  console.error("ERROR: " + (err && err.message ? err.message : err));
  process.exitCode = 1;
});
