#!/usr/bin/env python3
"""Verify exam answers against Wikipedia, one batch at a time.

For every question it searches Wikipedia with the question text, downloads the
best matching article, and reports which of the four options actually appear in
that article. No model knowledge is involved: the verdict comes only from the
article text, so a SUSPECT row is a question where Wikipedia supports a
distractor and not the marked answer.

    python3 tools/wiki-verify.py --json <bank.json> --from 1 --count 25
    python3 tools/wiki-verify.py --json <bank.json> --ids a-001,a-002
    python3 tools/wiki-verify.py --json <bank.json> --from 1 --count 25 --evidence out.json

Verdicts
  OK        the marked answer appears in the article and no distractor does
  SUSPECT   a distractor appears and the marked answer does not
  AMBIG     the marked answer and a distractor both appear
  NO-DATA   the article does not mention any option (needs a human or a
            different source; the tool never guesses)
"""
import argparse, difflib, json, re, sys, time, urllib.parse, urllib.request

UA = {"User-Agent": "axomexam-factcheck/1.0 (exam-prep fact check; admin@axomexam.in)"}
API = "https://en.wikipedia.org/w/api.php"
STOP = set("""a an the is was were are be been being of in on at to for from by with
who whom whose what which when where why how many much did does do done has have had
that this these those it its as and or not no if then than into over under about
according to known called name named first last""".split())


def api(params):
    params = dict(params, format="json")
    url = API + "?" + urllib.parse.urlencode(params)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25) as r:
                return json.load(r)
        except Exception as e:
            if attempt == 2:
                return {"_error": str(e)}
            time.sleep(1.5)


def query_for(stem):
    quoted = re.findall(r"['\u2018\u2019\"]([^'\u2018\u2019\"]{3,60})['\u2019\u2018\"]", stem)
    tokens = [w for w in re.findall(r"[A-Za-z0-9][A-Za-z0-9\-']*", stem.lower()) if w not in STOP]
    body = " ".join(tokens[:10])
    if quoted:
        return (quoted[0] + " " + body)[:200]
    return body[:200]


def search(q, limit=3):
    d = api({"action": "query", "list": "search", "srsearch": q, "srlimit": limit})
    if "_error" in d:
        return []
    return [x["title"] for x in d.get("query", {}).get("search", [])]


def extract(title, chars=0):
    d = api({"action": "query", "prop": "extracts", "explaintext": 1,
             "titles": title, "redirects": 1, **({"exchars": chars} if chars else {})})
    pages = d.get("query", {}).get("pages", {})
    for p in pages.values():
        return p.get("extract", "") or ""
    return ""


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def strong(option, text):
    o = norm(option)
    return len(o) >= 3 and o in norm(text)


def present(option, text):
    o = norm(option)
    if len(o) < 3:
        return False
    t = norm(text)
    if o in t:
        return True
    # transliteration drift (Sankardeva / Sankardev, Bhattacharyya / Bhattacharya)
    n = len(o)
    for i in range(0, max(1, len(t) - n + 1), 3):
        if difflib.SequenceMatcher(None, o, t[i:i + n]).ratio() >= 0.88:
            return True
    # every significant word appears somewhere
    words = [w for w in re.findall(r"[a-z0-9]+", option.lower()) if len(w) > 3]
    return bool(words) and all(norm(w) in t for w in words)


def sentences(text):
    return [x.strip() for x in re.split(r"(?<=[.!?])\s+", text) if 40 <= len(x.strip()) <= 400]


def quote_for(q, text, limit=2):
    """Return the Wikipedia sentences that mention an option, best first."""
    opts = [o["en"] for o in q["options"]]
    stem_words = [w for w in re.findall(r"[a-z]+", q["q"]["en"].lower()) if len(w) > 4]
    scored = []
    for sn in sentences(text):
        low = sn.lower()
        hit = [k for k, o in enumerate(opts) if present(o, sn)]
        if not hit:
            continue
        score = 0
        if q["correct"] in hit:
            score += 3
        score += sum(2 for w in stem_words if w in low)
        scored.append((score, sn, "".join("ABCD"[k] for k in hit)))
    scored.sort(key=lambda x: -x[0])
    return scored[:limit]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", required=True)
    ap.add_argument("--from", dest="start", type=int, default=1)
    ap.add_argument("--count", type=int, default=25)
    ap.add_argument("--ids", default="")
    ap.add_argument("--evidence", default="")
    ap.add_argument("--quote", action="store_true")
    a = ap.parse_args()

    data = json.load(open(a.json, encoding="utf-8"))
    if a.ids:
        want = set(a.ids.split(","))
        items = [(i, q) for i, q in enumerate(data) if q["id"] in want]
    else:
        items = [(i, q) for i, q in enumerate(data)][a.start - 1: a.start - 1 + a.count]

    rows, ev = [], []
    for i, q in items:
        stem = q["q"]["en"]
        qq = query_for(stem)
        queries = [qq]
        ans_tokens = " ".join([w for w in re.findall(r"[A-Za-z0-9]+", q["options"][q["correct"]]["en"])][:3])
        if ans_tokens:
            queries.append((ans_tokens + " " + " ".join(qq.split()[:4])).strip())
        titles, seen = [], set()
        for query in queries:
            for t in search(query):
                if t not in seen:
                    seen.add(t)
                    titles.append(t)
            time.sleep(0.15)
        text, used = "", ""
        for t in titles[:3]:
            part = extract(t)
            if part:
                used = (used + ", " if used else "") + t
                text += " " + part
            if len(text) > 30000:
                break
        hits = [k for k, o in enumerate(q["options"]) if present(o["en"], text)]
        strong_hits = [k for k, o in enumerate(q["options"]) if strong(o["en"], text)]
        c = q["correct"]
        if not text:
            verdict = "NO-DATA"
        elif c in hits and len(strong_hits) <= 1:
            verdict = "OK"
        elif c in hits:
            verdict = "AMBIG"
        elif strong_hits:
            verdict = "SUSPECT"
        else:
            verdict = "NO-DATA"
        rows.append((q["id"], stem[:70], q["options"][c]["en"][:28], verdict,
                     "".join("ABCD"[k] for k in hits), used[:40]))
        ev.append({"id": q["id"], "query": qq, "article": used, "verdict": verdict,
                   "hits": ["ABCD"[k] for k in hits], "correct": "ABCD"[c],
                   "text": text[:1200]})
        time.sleep(0.25)

    if a.quote:
        for (i, q), r, e in zip(items, rows, ev):
            print("%-26s %-58s [%s] ans=%s" % (r[0], r[1][:58], r[3], r[2]))
            for score, sn, hits in quote_for(q, e["text"]):
                print("     (%s) %s" % (hits, sn[:220]))
            print()
    else:
        for r in rows:
            print("%-28s %-70s %-28s %-8s %-6s %s" % r)
    counts = {}
    for r in rows:
        counts[r[3]] = counts.get(r[3], 0) + 1
    print("\n", " ".join("%s=%d" % (k, v) for k, v in sorted(counts.items())), "| total", len(rows))
    if a.evidence:
        json.dump(ev, open(a.evidence, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("evidence ->", a.evidence)


if __name__ == "__main__":
    main()
