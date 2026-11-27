#!/usr/bin/env python3
"""Check exam answers against Gemini with Google Search grounding.

Each batch of questions is sent in one request. The model must answer per
question with a verdict, the option letter it believes correct, the URL it used
and a short quote from that page. Results are appended to a log file, so a
quota stop or a crash never loses finished work and a re-run resumes.

The API key is read from GEMINI_API_KEY and never written to disk.

    export GEMINI_API_KEY=...
    python3 tools/gemini-verify.py --json <bank.json> --from 1 --count 20
    python3 tools/gemini-verify.py --json <bank.json> --all --log tools/verify-log.json

Verdicts: correct | incorrect | uncertain. Only 'incorrect' with a source URL is
a candidate fix; everything else is reported for a human to look at.
"""
import argparse, json, os, re, sys, time, urllib.error, urllib.request

MODEL = os.environ.get("GEMINI_MODEL", "gemini-flash-latest")
GROUNDED = True
ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent"

SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "results": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "n": {"type": "INTEGER"},
                    "verdict": {"type": "STRING", "enum": ["correct", "incorrect", "uncertain"]},
                    "answer": {"type": "STRING", "enum": ["A", "B", "C", "D", "-"]},
                    "source": {"type": "STRING"},
                    "quote": {"type": "STRING"},
                    "confidence": {"type": "STRING", "enum": ["high", "medium", "low"]},
                },
                "required": ["n", "verdict", "answer", "confidence"],
            },
        }
    },
    "required": ["results"],
}

INSTRUCTIONS = """You are fact-checking multiple-choice questions for an Assam (India) exam site.
For every question: search the web, decide whether the marked answer is correct, and reply with JSON only.

Rules:
- verdict "correct" if the marked answer is right.
- verdict "incorrect" only if a source clearly shows another option is right; then give that option's letter.
- verdict "uncertain" if sources are missing, conflicting or the question is ambiguous.
- quote must be copied from the source page, max 25 words.
- Never guess. A missing source is "uncertain", not "incorrect".
"""


def call(key, prompt, grounded=True, retries=4):
    body = {"contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0}}
    if grounded:
        # Google rejects responseSchema together with the search tool, so the
        # grounded call asks for JSON in the prompt and the schema is dropped.
        body["tools"] = [{"google_search": {}}]
    else:
        body["generationConfig"].update({"responseMimeType": "application/json",
                                         "responseSchema": SCHEMA})
    req = urllib.request.Request(
        (ENDPOINT % MODEL) + "?key=" + key,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            detail = e.read().decode()[:300]
            if e.code == 429 and grounded:
                print("  ... 429 with search grounding (%s), retrying ungrounded"
                      % detail.replace("\n", " ")[:120], file=sys.stderr)
                return call(key, prompt, grounded=False, retries=2)
            if e.code in (429, 500, 503):
                wait = 20 * (attempt + 1)
                print("  ... %d (%s), waiting %ds" % (e.code, detail.replace("\n", " ")[:120], wait), file=sys.stderr)
                time.sleep(wait)
                continue
            if e.code == 400 and grounded:
                print("  ... grounding rejected, retrying without it", file=sys.stderr)
                return call(key, prompt, grounded=False, retries=1)
            if e.code in (401, 403):
                raise SystemExit("key rejected (%d): %s" % (e.code, detail))
            raise SystemExit("API error %d: %s" % (e.code, detail))
        except Exception as e:
            if attempt == retries - 1:
                print("  ... network error: %s" % e, file=sys.stderr)
                return None
            time.sleep(10)
    return None


def parse(resp):
    try:
        text = resp["candidates"][0]["content"]["parts"][0]["text"]
        text = re.sub(r"^\s*```(?:json)?|```\s*$", "", text.strip())
        start = text.find("{")
        return json.loads(text[start:]) if start >= 0 else {"results": []}
    except Exception:
        return {"results": []}


def sources(resp):
    urls = []
    try:
        gm = resp["candidates"][0].get("groundingMetadata", {})
        for c in gm.get("groundingChunks", []):
            u = c.get("web", {}).get("uri")
            if u:
                urls.append(u)
    except Exception:
        pass
    return urls


def prompt_for(batch):
    lines = [INSTRUCTIONS, "\nQuestions:"]
    for i, q in enumerate(batch, 1):
        opts = " | ".join("%s) %s" % ("ABCD"[k], o["en"]) for k, o in enumerate(q["options"]))
        lines.append("%d. %s\n   %s\n   Marked answer: %s) %s"
                     % (i, q["q"]["en"], opts, "ABCD"[q["correct"]], q["options"][q["correct"]]["en"]))
    lines.append('\nReply: {"results":[{"n":1,"verdict":"correct|incorrect|uncertain",'
                 '"answer":"A|B|C|D","source":"url","quote":"...","confidence":"high|medium|low"}]}')
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", required=True)
    ap.add_argument("--from", dest="start", type=int, default=1)
    ap.add_argument("--count", type=int, default=20)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--batch", type=int, default=20)
    ap.add_argument("--ids", default="")
    ap.add_argument("--log", default="")
    a = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY", "").strip()
    global GROUNDED
    if os.environ.get("GEMINI_NO_GROUNDING"):
        GROUNDED = False
    if not key:
        raise SystemExit("GEMINI_API_KEY is not set. Paste the key into the command, do not save it to a file.")

    data = json.load(open(a.json, encoding="utf-8"))
    if a.ids:
        want = set(a.ids.split(","))
        items = [q for q in data if q["id"] in want]
    elif a.all:
        items = list(data)
    else:
        items = data[a.start - 1: a.start - 1 + a.count]

    log = {}
    if a.log and os.path.exists(a.log):
        log = json.load(open(a.log, encoding="utf-8"))
    todo = [q for q in items if q["id"] not in log]

    print("questions: %d | already logged: %d | to check: %d" % (len(items), len(items) - len(todo), len(todo)))

    def handle(batch, depth=0):
        """Check a batch; on failure split it in half so one timeout loses little."""
        resp = call(key, prompt_for(batch), grounded=GROUNDED)
        got = parse(resp) if resp else {"results": []}
        if not got.get("results"):
            if len(batch) > 4 and depth < 3:
                mid = len(batch) // 2
                handle(batch[:mid], depth + 1)
                handle(batch[mid:], depth + 1)
                return
            print("  ... giving up on %d question(s): %s" % (len(batch), batch[0]["id"]), file=sys.stderr)
            return
        urls = sources(resp)
        by_n = {r.get("n"): r for r in got.get("results", [])}
        for i, q in enumerate(batch, 1):
            r = by_n.get(i, {"verdict": "uncertain", "answer": "", "confidence": "low"})
            log[q["id"]] = {
                "verdict": r.get("verdict", "uncertain"),
                "answer": r.get("answer", ""),
                "source": r.get("source") or (urls[0] if urls else ""),
                "quote": r.get("quote", ""),
                "confidence": r.get("confidence", "low"),
                "ours": "ABCD"[q["correct"]],
                "our_text": q["options"][q["correct"]]["en"],
                "stem": q["q"]["en"],
            }
            mark = {"correct": "  ok  ", "incorrect": " WRONG", "uncertain": "  ?   "}.get(log[q["id"]]["verdict"], "  ?   ")
            print("%s %-26s %-52s ours=%s model=%s %s"
                  % (mark, q["id"], q["q"]["en"][:52], "ABCD"[q["correct"]], r.get("answer", ""),
                     (r.get("source") or "")[:50]))
        if a.log:
            json.dump(log, open(a.log, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    chunks = [todo[i:i + a.batch] for i in range(0, len(todo), a.batch)]
    for n, chunk in enumerate(chunks, 1):
        handle(chunk)
        print("  batch %d/%d done, logged %d" % (n, len(chunks), len(log)))
        time.sleep(1)

    wrong = [k for k, v in log.items() if v["verdict"] == "incorrect" and v["source"]]
    print("\nwrong with source: %d | uncertain: %d | correct: %d"
          % (len(wrong),
             sum(1 for v in log.values() if v["verdict"] == "uncertain"),
             sum(1 for v in log.values() if v["verdict"] == "correct")))
    if wrong:
        print("\ncandidate fixes:")
        for k in wrong:
            v = log[k]
            print("  %-26s ours=%s (%s) -> model=%s | %s" % (k, v["ours"], v["our_text"][:30], v["answer"], v["source"][:60]))


if __name__ == "__main__":
    main()
