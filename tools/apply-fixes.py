#!/usr/bin/env python3
"""Apply a list of question fixes to the JSON bank and both HTML pages.

    python3 tools/apply-fixes.py fixes.json

Fix file: [{"json": "<bank.json>", "page": "<page dir>", "id": "<question id>",
            "set": {"q": {...}, "options": [...], "correct": 2, "explanation": {...}}}]

Only the keys present in "set" are replaced. Each touched page is re-rendered
from the bank, and an untouched neighbouring block is round-trip checked first,
so a template change fails loudly instead of corrupting the page.
"""
import json, os, re, sys

ROOT = "/workspace/axomexam"
MARK = '<div class="qa-item qs4">'
DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")
APOS = [True]  # books differ on escaping the apostrophe; decided per page


def esc(s):
    out = (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
           .replace('"', "&quot;"))
    return out.replace("'", "&#39;") if APOS[0] else out


def en_block(q, n):
    L = "ABCD"
    p = [MARK, '<div class="qs5" lang="en">Q%d. %s</div>' % (n, esc(q["q"]["en"])),
         '<div class="qs10" lang="as">%s</div>' % esc(q["q"]["as"]), '<div class="qs8">']
    for k, o in enumerate(q["options"]):
        p.append('<div class="qs1" lang="en">(%s) %s <span class="qs2" lang="as">%s</span></div>'
                 % (L[k], esc(o["en"]), esc(o["as"])))
    p.append('</div>')
    c = q["correct"]
    p.append('<div class="qs6" lang="en"><strong>Answer:</strong> <span>%s) %s</span></div>'
             % (L[c], esc(q["options"][c]["en"])))
    p.append('<div class="qs9" lang="as">%s) %s</div>' % (L[c], esc(q["options"][c]["as"])))
    p.append('<div class="qs7" lang="en"><strong>Explanation:</strong> %s</div>' % esc(q["explanation"]["en"]))
    p.append('<div class="qs9" lang="as">%s</div>' % esc(q["explanation"]["as"]))
    p.append('</div>')
    return "".join(p)


def as_block(q, n):
    L = "ABCD"
    p = [MARK, '<div class="qs5" lang="as">%s. %s</div>' % (str(n).translate(DIGITS), esc(q["q"]["as"])),
         '<div class="qs8">']
    for k, o in enumerate(q["options"]):
        p.append('<div class="qs1" lang="as">(%s) %s <span class="qs3" lang="en">(%s)</span></div>'
                 % (L[k], esc(o["as"]), esc(o["en"])))
    p.append('</div>')
    c = q["correct"]
    p.append('<div class="qs6" lang="as"><strong>উত্তৰ:</strong> <span>%s) %s</span></div>'
             % (L[c], esc(q["options"][c]["as"])))
    p.append('<div class="qs7" lang="as"><strong>ব্যাখ্যা:</strong> %s</div>' % esc(q["explanation"]["as"]))
    p.append('</div>')
    return "".join(p)


def patch_pages(page_dir, qs, idxs):
    for prefix, gen in (("", en_block), ("as/", as_block)):
        path = ROOT + "/" + prefix + page_dir + "/index.html"
        h = open(path, encoding="utf-8").read()
        pos = [m.start() for m in re.finditer(re.escape(MARK), h)]
        assert len(pos) == len(qs), (path, len(pos), len(qs))
        probe = idxs[0] - 1 if idxs[0] else idxs[0] + 1
        for apos in (True, False):
            APOS[0] = apos
            if h[pos[probe]:pos[probe + 1]] == gen(qs[probe], probe + 1):
                break
        else:
            raise AssertionError("template mismatch at %s block %d" % (path, probe + 1))
        for i in sorted(idxs, reverse=True):
            end = pos[i + 1] if i + 1 < len(pos) else len(h)
            h = h[:pos[i]] + gen(qs[i], i + 1) + h[end:]
        tmp = path + ".tmp"
        open(tmp, "w", encoding="utf-8").write(h)
        os.replace(tmp, path)
        print("  page ok:", prefix or "en")


fixes = json.load(open(sys.argv[1], encoding="utf-8"))
by_file = {}
for f in fixes:
    by_file.setdefault((f["json"], f["page"]), []).append(f)

for (jp, page), items in by_file.items():
    data = json.load(open(ROOT + "/" + jp, encoding="utf-8"))
    idxs = []
    for it in items:
        idx = next(i for i, q in enumerate(data) if q["id"] == it["id"])
        for k, v in it["set"].items():
            data[idx][k] = v
        idxs.append(idx)
        print("fixed", it["id"])
    open(ROOT + "/" + jp, "w", encoding="utf-8").write(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    patch_pages(page, data, idxs)
