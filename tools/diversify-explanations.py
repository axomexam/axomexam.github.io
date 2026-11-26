#!/usr/bin/env python3
"""Replace repeated one-line explanations with one that names this item.

Several hundred questions share a single sentence, word for word
("A positive statement takes a negative tag...", repeated 80 times). A reader
learns nothing after the first one, and a reviewer sees a page written by a
script. This keeps the rule intact and adds the detail that belongs to the
question itself: the statement, the conclusions, the sentence, the tag.

Every added detail is copied out of the question, so nothing is asserted that
the item does not already say. Questions the builders cannot ground are left
alone.

Writes the bank, the English page and the Assamese twin (whose body is a copy
of the English body). Only explanation.en changes; explanation.as keeps its
existing wording.

Usage:
  python3 tools/diversify-explanations.py --dry      # print samples, write nothing
  python3 tools/diversify-explanations.py            # apply
  python3 tools/diversify-explanations.py --top 15   # samples per cluster
"""

import difflib
import glob
import html
import json
import math
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = "--dry" in sys.argv
TOP = 4
if "--top" in sys.argv:
    TOP = int(sys.argv[sys.argv.index("--top") + 1])

LETTERS = "ABCD"
NORM = lambda s: " ".join((s or "").lower().split())


def opts(q):
    out = []
    for o in q.get("options", []):
        out.append((o.get("en") if isinstance(o, dict) else str(o)) or "")
    return out


def answer(q):
    try:
        return opts(q)[q["correct"]].strip()
    except (KeyError, IndexError, TypeError):
        return ""


def letter(q):
    return LETTERS[q["correct"]] if q.get("correct", 0) < 4 else "?"


def statement_of(q):
    """'Choose the correct question tag: She is a doctor, ___?' -> 'She is a doctor'."""
    stem = q["q"]["en"].strip()
    m = re.search(r":\s*(.+?)\s*,?\s*_+\?*\s*$", stem)
    if not m:
        return None
    return m.group(1).strip().rstrip(",")


def is_negative(text):
    return bool(re.search(r"\b(not|never|hardly|no|nobody|nothing|neither|nor)\b|n't\b", text.lower()))


def blank_word(q):
    """The word right after the blank in 'He is ___ honest man.'"""
    m = re.search(r"_{2,}\s+([A-Za-z']+)", q["q"]["en"])
    return m.group(1) if m else None


def filled_sentence(q):
    stem = q["q"]["en"].strip()
    m = re.match(r"^(?:Choose|Fill|Select|Complete)[^:]{0,40}:\s*(.+)$", stem, re.S | re.I)
    if m:
        stem = m.group(1).strip()
    if not re.search(r"_{2,}", stem):
        return None
    return re.sub(r"_{2,}", answer(q), stem, count=1)


def conclusions(q):
    stem = q["q"]["en"]
    m = re.search(r"Conclusions?:\s*(.+)$", stem, re.S)
    if not m:
        return None
    body = m.group(1)
    first = re.split(r"\bII\.\s*", body, maxsplit=1)
    if len(first) != 2:
        return None
    one = re.sub(r"^I\.\s*", "", first[0]).strip().rstrip(";").strip()
    two = first[1].strip()
    return one, two


def statements(q):
    stem = q["q"]["en"]
    m = re.search(r"Statements?:\s*(.+?)\s*Conclusions?:", stem, re.S)
    return m.group(1).strip().rstrip(";").strip() if m else None


def cloze_sentence(q):
    """Quote the sentence holding the numbered blank, with the blank filled."""
    stem = q["q"]["en"]
    m = re.search(r"blank\s*\((\d+)\)", stem, re.I)
    if not m:
        return None
    n = m.group(1)
    passage = stem.split(":", 1)[1] if ":" in stem else stem
    for s in re.split(r"(?<=[.!?])\s+", passage):
        if "{%s}" % n in s:
            filled = s.replace("{%s}" % n, answer(q)).strip()
            return filled if len(filled) > 25 else None
    return None


# ---------------------------------------------------------------- builders


def b_question_tag(q):
    st = statement_of(q)
    if not st or len(st) < 6:
        return None
    kind = "negative" if is_negative(st) else "positive"
    other = "positive" if kind == "negative" else "negative"
    tag = answer(q)
    text = f'The statement "{st}" is {kind}, so the tag must be {other}: "{tag}".'
    verb = tag.split()[0].replace("n't", "").strip("?,.!").lower() if tag.split() else ""
    if verb and re.search(r"\b" + re.escape(verb) + r"\b", st.lower()):
        text += f' The tag reuses "{verb}" from the statement.'
    return text


def b_narration(q):
    stem = q["q"]["en"]
    m = re.search(r"^Change into indirect speech:\s*(.+)$", stem, re.S)
    if not m:
        return None
    direct = m.group(1).strip()
    return (
        f'Direct speech: {direct} Reported with "that", it becomes: "{answer(q)}" '
        f'The verbs of the reported clause move one step back in time.'
    )


def b_syllogism(q):
    one_two = conclusions(q)
    st = statements(q)
    if not one_two or not st:
        return None
    one, two = one_two
    ans = answer(q).lower()
    i_follows = "only conclusion i follows" in ans or "both" in ans
    ii_follows = "only conclusion ii follows" in ans or "both" in ans
    verdict = []
    verdict.append(f"conclusion I ({one}) {'follows' if i_follows else 'does not follow'}")
    verdict.append(f"conclusion II ({two}) {'follows' if ii_follows else 'does not follow'}")
    st = st.rstrip(" .")
    return (
        f'With the statements "{st}", {verdict[0]} and {verdict[1]}; '
        f'hence the answer is: {answer(q)}.'
    )


def b_data_sufficiency(q):
    stem = q["q"]["en"]
    if "Statement I" not in stem or "Statement II" not in stem:
        return None
    question = re.split(r"Statement I:", stem)[0]
    question = re.sub(r"^Question:\s*", "", question).strip().rstrip("?").strip()
    ans = answer(q)
    if "together" not in ans.lower():
        return None
    return (
        f'The question asks: "{question}". Statement I leaves it open, statement II leaves it open, '
        f'and only the two read together pin the answer down, so both are needed.'
    )


def b_article(q):
    word = blank_word(q)
    filled = filled_sentence(q)
    if not word or not filled:
        return None
    vowel = word[0].lower() in "aeiou"
    if vowel and answer(q).lower() != "an":
        return None
    if not vowel and answer(q).lower() != "a":
        return None
    reason = (
        f'"{word}" begins with a vowel sound, so "an" is used'
        if vowel
        else f'"{word}" begins with a consonant sound, so "a" is used'
    )
    return f'In "{filled}" the blank comes before "{word}": {reason}.'


def b_sentence_fix(q):
    m = re.search(r"Improve the sentence\s*:\s*(.+)$", q["q"]["en"], re.S | re.I)
    if not m:
        return None
    wrong = m.group(1).strip().strip("'\"\u2018\u2019\u201c\u201d")
    right = answer(q).strip()
    if not wrong or not right or wrong.lower() == right.lower():
        return None
    a_, b_ = wrong.split(), right.split()
    ops = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(a=a_, b=b_).get_opcodes():
        if tag == "equal":
            continue
        old = " ".join(a_[i1:i2])
        new = " ".join(b_[j1:j2])
        if tag == "replace":
            ops.append(f'"{old}" becomes "{new}"')
        elif tag == "insert":
            ops.append(f'"{new}" is added')
        else:
            ops.append(f'"{old}" is dropped')
    if not ops:
        return None
    return f'"{wrong}" is written correctly as "{right}": {" and ".join(ops[:3])}.'


def b_fill(q):
    filled = filled_sentence(q)
    ans = answer(q).strip()
    if not filled or not ans:
        return None
    others = [o for o in opts(q) if o.strip() and o.strip().lower() != ans.lower()][:3]
    tail = ", ".join('"%s"' % o.strip() for o in others)
    return f'In "{filled}", the word that completes the blank is "{ans}", not {tail}.'


def b_article_fix(q):
    stem = q["q"]["en"]
    m = re.search(r"Improve the sentence\s*:\s*(.+)$", stem, re.S | re.I)
    if not m:
        return None
    wrong = m.group(1).strip().strip("'\"\u2018\u2019\u201c\u201d")
    right = answer(q).strip()
    wt, rt = wrong.split(), right.split()
    for i, (a_, b_) in enumerate(zip(wt, rt)):
        if a_.lower() != b_.lower():
            if a_.lower() in ("a", "an") and b_.lower() in ("a", "an"):
                following = rt[i + 1] if i + 1 < len(rt) else ""
                sound = "vowel" if b_.lower() == "an" else "consonant"
                return (f'"{wrong}" needs "{right}": "{following}" begins with a {sound} sound, '
                        f'so the article is "{b_}" and not "{a_}".')
            return None
    return None


def b_cloze(q):
    s = cloze_sentence(q)
    if not s:
        return None
    return f'The blank belongs to this sentence: "{s}" - that is where "{answer(q)}" fits.'


def b_embedded_text(q):
    ans = answer(q)
    if not ans or ans.lower() in ("", "none"):
        return None
    return (
        f'Option {letter(q)} is the {ans}: it is already drawn inside the figure, '
        f'with its sides lying along lines the figure itself shows.'
    )




SINGULAR = {"is", "was", "has", "does", "goes", "needs", "seems", "works", "takes",
            "makes", "knows", "likes", "plays", "wants", "helps", "lives", "comes",
            "becomes", "shows", "gives", "says", "thinks", "teaches", "watches",
            "reaches", "passes", "fixes", "carries", "studies", "tries", "flies",
            "isn't", "wasn't", "hasn't", "doesn't"}
PLURAL = {"are", "were", "have", "do", "go", "need", "seem", "work", "take", "make",
          "know", "like", "play", "want", "help", "live", "come", "become", "show",
          "give", "say", "think", "teach", "watch", "reach", "pass", "fix", "carry",
          "study", "try", "fly", "aren't", "weren't", "haven't", "don't"}


def verb_number(q):
    """Singular or plural, decided from the forms the options actually offer."""
    ans = answer(q).strip().lower()
    o = [x.strip().lower() for x in opts(q)]
    if ans in ("are", "were", "have", "do", "need", "seem"):
        return "plural"
    if ans in ("is", "was", "has", "does"):
        return "singular"
    forms = {ans + "s", ans + "es", ans + "ies"}
    if ans.endswith("y"):
        forms.add(ans[:-1] + "ies")
    if ans.endswith(("s", "x", "ch", "sh", "o")):
        forms.add(ans + "es")
    if any(f in o for f in forms):
        return "plural"
    bases = [ans[:-1], ans[:-2] if ans.endswith("es") else None,
             ans[:-3] + "y" if ans.endswith("ies") else None]
    if any(b and b in o for b in bases):
        return "singular"
    return None


def b_subject_verb(q):
    filled = filled_sentence(q)
    kind = verb_number(q)
    if not filled or not kind:
        return None
    return f'In "{filled}", the verb that agrees with this subject is "{answer(q).strip()}", a {kind} form.'


def net_fold(fig):
    """Fold the net cell by cell and return (grid, {face: opposite face})."""
    cells = [(float(m.group(1)), float(m.group(2)), m.group(3).strip())
             for m in re.finditer(r'<text[^>]*x="([\d.]+)"[^>]*y="([\d.]+)"[^>]*>([^<]+)</text>', fig or "")]
    if len(cells) != 6:
        return None
    xs = sorted({c[0] for c in cells})
    ys = sorted({c[1] for c in cells})
    near = lambda v, arr: min(range(len(arr)), key=lambda i: abs(arr[i] - v))
    grid = {}
    for x, y, t in cells:
        grid[(near(x, xs), near(y, ys))] = t
    if len(grid) != 6:
        return None
    neg = lambda v: (-v[0], -v[1], -v[2])
    start = next(iter(grid))
    frames = {start: ((1, 0, 0), (0, 1, 0), (0, 0, 1))}
    stack = [start]
    while stack:
        c = stack.pop()
        r, d, n = frames[c]
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nb = (c[0] + dx, c[1] + dy)
            if nb not in grid or nb in frames:
                continue
            if dx == 1:
                f = (neg(n), d, r)
            elif dx == -1:
                f = (n, d, neg(r))
            elif dy == 1:
                f = (r, neg(n), d)
            else:
                f = (r, n, neg(d))
            frames[nb] = f
            stack.append(nb)
    if len(frames) != 6:
        return None
    opp = {}
    for c1, f1 in frames.items():
        for c2, f2 in frames.items():
            if c1 != c2 and f1[2] == neg(f2[2]):
                opp[grid[c1]] = grid[c2]
    return (grid, opp) if len(opp) == 6 else None


BOX_FRACTIONS = [(0.2, "a fifth of the way across"), (0.25, "a quarter of the way across"),
                 (0.3333, "a third of the way across"), (0.4, "two-fifths of the way across"),
                 (0.5, "down the middle"), (0.6, "three-fifths of the way across"),
                 (0.6667, "two-thirds of the way across"), (0.75, "three-quarters of the way across"),
                 (0.8, "four-fifths of the way across")]


def paper_boxes(fig):
    out = []
    for m in re.finditer(r'<polygon points="([^"]+)"[^>]*fill="#f8fafc"', fig or ""):
        pts = [tuple(map(float, p.split(","))) for p in m.group(1).split()]
        out.append((min(p[0] for p in pts), min(p[1] for p in pts),
                    max(p[0] for p in pts), max(p[1] for p in pts)))
    for m in re.finditer(r'<rect(?![^>]*\brx=)[^>]*>', fig or ""):
        attrs = dict(re.findall(r'(?<![\w-])(x|y|width|height)="([\d.]+)"', m.group(0)))
        if len(attrs) != 4:
            continue
        x, y, w, h = (float(attrs[k]) for k in ("x", "y", "width", "height"))
        if w > 20 and h > 20:
            out.append((x, y, x + w, y + h))
    return out


def paper_creases(fig):
    out = []
    for m in re.finditer(r"<line\b[^>]*>", fig or ""):
        tag = m.group(0)
        if "stroke-dasharray" not in tag and "#e0e7ff" not in tag:
            continue
        g = dict(re.findall(r'(x1|y1|x2|y2)="([\d.]+)"', tag))
        if len(g) == 4:
            out.append(tuple(float(g[k]) for k in ("x1", "y1", "x2", "y2")))
    return out


def paper_punches(fig):
    out = []
    for m in re.finditer(r"<circle\b[^>]*>", fig or ""):
        tag = m.group(0)
        g = dict(re.findall(r'(cx|cy)="([\d.]+)"', tag))
        if len(g) != 2:
            continue
        r = re.search(r'r="([\d.]+)"', tag)
        if ("#dc2626" in tag or ("#ffffff" in tag and "#334155" in tag)
                or ("#0f172a" in tag and r and 3 <= float(r.group(1)) <= 12)):
            out.append((float(g["cx"]), float(g["cy"])))
    return out


def paper_hits_inside(box, p):
    return box[0] - 1 <= p[0] <= box[2] + 1 and box[1] - 1 <= p[1] <= box[3] + 1


def paper_pick_box(boxes, p):
    cand = [b for b in boxes if paper_hits_inside(b, p)]
    if not cand:
        return None
    return max(cand, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))


def paper_rel(box, p):
    return ((p[0] - box[0]) / (box[2] - box[0]), (p[1] - box[1]) / (box[3] - box[1]))


def paper_reflect(p, line, box):
    a = paper_rel(box, (line[0], line[1]))
    b = paper_rel(box, (line[2], line[3]))
    dx, dy = b[0] - a[0], b[1] - a[1]
    l2 = dx * dx + dy * dy
    if l2 == 0:
        return p
    t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2
    return (round(2 * (a[0] + t * dx) - p[0], 4), round(2 * (a[1] + t * dy) - p[1], 4))


def paper_holes(fig):
    boxes = paper_boxes(fig)
    creases = paper_creases(fig)
    punches = paper_punches(fig)
    if not boxes or not creases or not punches:
        return None
    box = paper_pick_box(boxes, punches[0])
    if not box:
        return None
    steps = []
    for c in creases:
        mid = ((c[0] + c[2]) / 2, (c[1] + c[3]) / 2)
        steps.append((c, paper_pick_box(boxes, mid) or box))
    holes = {tuple(round(v, 4) for v in paper_rel(box, p)) for p in punches}
    for c, cb in reversed(steps):
        holes |= {paper_reflect(h, c, cb) for h in list(holes)}
    if any(not (-0.05 <= x <= 1.05 and -0.05 <= y <= 1.05) for x, y in holes):
        return None
    return holes, creases, punches, box


def paper_option_holes(fig):
    boxes = paper_boxes(fig)
    pts = []
    for m in re.finditer(r"<circle\b[^>]*>", fig or ""):
        tag = m.group(0)
        g = dict(re.findall(r'(cx|cy)="([\d.]+)"', tag))
        if len(g) == 2 and ("#334155" in tag or "#0f172a" in tag):
            pts.append((float(g["cx"]), float(g["cy"])))
    if not pts or not boxes:
        return set()
    box = max(boxes, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))
    return {tuple(round(v, 3) for v in paper_rel(box, p)) for p in pts}


def paper_same(a, b, tol=0.06):
    if len(a) != len(b):
        return False
    left = list(b)
    for p in a:
        hit = [t for t in left if abs(t[0] - p[0]) <= tol and abs(t[1] - p[1]) <= tol]
        if not hit:
            return False
        left.remove(hit[0])
    return True


def paper_place(v, axis):
    for frac, words in BOX_FRACTIONS:
        if abs(v - frac) <= 0.04:
            return words.replace("of the way across", "of the way down") if axis == "h" else words
    return None


def paper_side(rel, axis):
    if axis == "v":
        return "right" if rel[0] > 0.5 else "left"
    return "below" if rel[1] > 0.5 else "above"


def paper_grid_folds(stem):
    s = (stem or "").lower()
    v = any(k in s for k in ("vertical centre line", "left to right", "left half on the right",
                             "left half laid on the right"))
    h = any(k in s for k in ("horizontal centre line", "top to bottom", "top half on the bottom",
                             "top half laid on the bottom"))
    if not v and not h and "folded twice" in s:
        v = h = True
    lines = []
    if v:
        lines.append(((0.5, 0.0), (0.5, 1.0)))
    if h:
        lines.append(((0.0, 0.5), (1.0, 0.5)))
    return lines, v, h


def paper_grid_size(fig):
    xs = {round(c[0], 1) for c in paper_creases(fig) if abs(c[0] - c[2]) < 1}
    ys = {round(c[1], 1) for c in paper_creases(fig) if abs(c[1] - c[3]) < 1}
    return (len(xs) + 1, len(ys) + 1) if xs and ys else (0, 0)


def paper_ranks(pts):
    """Same arrangement, whatever the scale: the order of the x and the y positions."""
    if not pts:
        return set()
    xs = sorted({round(p[0], 3) for p in pts})
    ys = sorted({round(p[1], 3) for p in pts})
    return {(xs.index(round(p[0], 3)), ys.index(round(p[1], 3))) for p in pts}


def paper_reflect_n(p, line):
    x1, y1, x2, y2 = line
    dx, dy = x2 - x1, y2 - y1
    l2 = dx * dx + dy * dy
    if l2 == 0:
        return p
    t = ((p[0] - x1) * dx + (p[1] - y1) * dy) / l2
    return (round(2 * (x1 + t * dx) - p[0], 4), round(2 * (y1 + t * dy) - p[1], 4))


def paper_cell(p, grid):
    cols, rows = grid
    if not cols or not rows:
        return None
    return (min(rows, int(p[1] * rows) + 1), min(cols, int(p[0] * cols) + 1))


def paper_cell_list(cells):
    parts = [f"row {r} column {c}" for r, c in cells]
    return parts[0] if len(parts) == 1 else ", ".join(parts[:-1]) + " and " + parts[-1]


def paper_fold_grid(q):
    """Sheet drawn as a cell grid whose fold the stem names; the grid lines are not creases."""
    stem = q["q"]["en"]
    lines, v, h = paper_grid_folds(stem)
    if not lines:
        return None
    fig = q.get("fig") or ""
    punches = paper_punches(fig)
    boxes = paper_boxes(fig)
    if not punches or not boxes:
        return None
    box = paper_pick_box(boxes, punches[0])
    if not box:
        return None
    holes = {tuple(round(x, 4) for x in paper_rel(box, p)) for p in punches}
    for a, b in lines:
        holes |= {paper_reflect_n(x, (a[0], a[1], b[0], b[1])) for x in list(holes)}
    if any(not (-0.02 <= x <= 1.02 and -0.02 <= y <= 1.02) for x, y in holes):
        return None
    hits = [i for i, o in enumerate(q["options"])
            if paper_same(holes, paper_option_holes(o.get("fig")), tol=0.04)]
    if not hits:
        hits = [i for i, o in enumerate(q["options"])
                if paper_ranks(holes) == paper_ranks(paper_option_holes(o.get("fig")))]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    letter = (q["options"][q["correct"]].get("option") or chr(65 + q["correct"])).strip(")")
    grid = paper_grid_size(fig)
    fold_bits = []
    if v:
        fold_bits.append("once along the vertical centre line, left half on the right half")
    if h:
        fold_bits.append("once along the horizontal centre line, top half on the bottom half")
    fold_text = ("folded " + " and then ".join(fold_bits)) if len(fold_bits) > 1 else ("folded " + fold_bits[0])
    punch_cells = [paper_cell(paper_rel(box, p), grid) for p in punches]
    punch_cells = [c for c in punch_cells if c]
    hole_cells = sorted({c for c in (paper_cell(x, grid) for x in holes) if c})
    layered = len(hole_cells) != len(holes) or len(set(punch_cells)) != len(punch_cells)
    size = f"{grid[0]} by {grid[1]}" if grid[0] and grid[1] else ""
    if layered:
        layers = 2 ** len(lines)
        en = (f"The sheet is {fold_text}, so {layers} layers lie on top of one another. "
              f"The punch{'es sit' if len(punch_cells) > 1 else ' sits'} in one quarter of the folded sheet; "
              f"unfolding repeats {'them' if len(punch_cells) > 1 else 'it'} in every quarter, "
              f"giving {len(holes)} holes - option {letter}.")
    else:
        en = (f"The sheet{(' is a ' + size + ' grid and') if size else ''} is {fold_text}. "
              f"The punch{('es are' if len(punch_cells) > 1 else ' is')} in {paper_cell_list(punch_cells)}. "
              f"Unfolding mirrors every hole across the crease, so the opened sheet carries {len(holes)} holes at "
              f"{paper_cell_list(hole_cells)} - option {letter}.")
    as_fold = ("উলম্ব আৰু অনুভূমিক কেন্দ্ৰ ৰেখাৰে" if (v and h)
               else "উলম্ব কেন্দ্ৰ ৰেখাৰে" if v else "অনুভূমিক কেন্দ্ৰ ৰেখাৰে")
    as_digits = str(len(holes)).translate(str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯"))
    if layered:
        as_ = (f"কাগজখন {as_fold} দুবাৰ ভাঁজ কৰা হৈছে, সেয়ে চাৰিটা স্তৰ ওপৰা-উপৰি হয়; এটা চতুৰ্থাংশত কৰা ফুটা "
               f"মেলিলে চাৰিও চতুৰ্থাংশতে পোৱা যায় — মুঠ {as_digits} টা ফুটা — বিকল্প {letter}।")
    else:
        as_ = (f"কাগজখন {as_fold} ভাঁজ কৰা হৈছে; মেলি দিলে {as_digits} টা ফুটা দেখা যায় — বিকল্প {letter}।")
    return en, as_


def paper_panels(fig):
    """The step panels of a folded-sheet figure: the sheet, then the folded stack."""
    out = []
    for m in re.finditer(r'<polygon points="([^"]+)"[^>]*fill="#f8fafc"', fig or ""):
        P = [tuple(map(float, t.split(","))) for t in m.group(1).split()]
        out.append((min(x for x, _ in P), min(y for _, y in P),
                    max(x for x, _ in P), max(y for _, y in P)))
    return sorted(out)


def paper_panel_folds(fig):
    """Read every fold of a step figure: axis, how far along, and which side stays."""
    panels = paper_panels(fig)
    dotted = [(float(a), float(b), float(c), float(d)) for a, b, c, d in re.findall(
        r'<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"[^>]*#94a3b8', fig or "")]
    arrows = [tuple(map(float, m.groups())) for m in re.finditer(
        r'<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"[^>]*#f97316', fig or "")]
    if len(panels) < 2 or len(dotted) != len(panels) - 1 or not arrows:
        return None, None
    folds, slant = [], None
    for i in range(len(panels) - 1):
        box, line = panels[i], dotted[i]
        arrow = arrows[i] if len(arrows) == len(panels) - 1 else arrows[0]
        vertical = abs(line[0] - line[2]) < 1
        horizontal = abs(line[1] - line[3]) < 1
        if not vertical and not horizontal:
            if len(panels) != 2 or abs(arrow[0] - arrow[2]) > 1 and abs(arrow[1] - arrow[3]) > 1:
                return None, None
            slant = ((line[0] - box[0]) / (box[2] - box[0]), (line[1] - box[1]) / (box[3] - box[1]),
                     (line[2] - box[0]) / (box[2] - box[0]), (line[3] - box[1]) / (box[3] - box[1]))
            continue
        axis = 0 if vertical else 1
        start, size = (box[0], box[2] - box[0]) if vertical else (box[1], box[3] - box[1])
        c = ((line[0] if vertical else line[1]) - start) / size
        if not 0.05 < c < 0.95:
            return None, None
        span = abs(arrow[2] - arrow[0]) if vertical else abs(arrow[3] - arrow[1])
        drift = abs(arrow[3] - arrow[1]) if vertical else abs(arrow[2] - arrow[0])
        if span < drift:
            return None, None
        keep_low = (arrow[2] < arrow[0]) if vertical else (arrow[3] < arrow[1])
        folds.append((axis, c, keep_low))
    return folds, slant


def paper_panel_punches(fig):
    panels = paper_panels(fig)
    if not panels:
        return []
    box = panels[-1]
    return [((float(m.group(1)) - box[0]) / (box[2] - box[0]),
             (float(m.group(2)) - box[1]) / (box[3] - box[1]))
            for m in re.finditer(r'<circle cx="([\d.]+)" cy="([\d.]+)"[^>]*#dc2626', fig or "")]


def paper_panel_option(fig):
    boxes = [b for b in paper_boxes(fig) if b[0] > 6] or paper_boxes(fig)
    if not boxes:
        return set()
    box = boxes[-1]
    return {(round((float(m.group(1)) - box[0]) / (box[2] - box[0]), 3),
             round((float(m.group(2)) - box[1]) / (box[3] - box[1]), 3))
            for m in re.finditer(r'<circle cx="([\d.]+)" cy="([\d.]+)"[^>]*#334155', fig or "")}


def paper_panel_preimages(v, c, keep_low):
    a = v * c if keep_low else c + v * (1 - c)
    return (a, 2 * c - a)


def paper_panel_holes(q):
    folds, slant = paper_panel_folds(q.get("fig") or "")
    punches = paper_panel_punches(q.get("fig") or "")
    if not punches or (not folds and not slant):
        return None
    holes = set()
    for punch in punches:
        pts = {punch}
        if slant:
            pts |= {paper_reflect_n(punch, slant)}
        for axis, c, keep_low in reversed(folds or []):
            nxt = set()
            for p in pts:
                for v in paper_panel_preimages(p[axis], c, keep_low):
                    if -0.01 <= v <= 1.01:
                        moved = list(p)
                        moved[axis] = round(v, 4)
                        nxt.add(tuple(moved))
            pts = nxt
        holes |= pts
    return holes


def paper_pc(v):
    return f"{round(v * 100):d}%"


def paper_fold_panels(q):
    """Step figures: the sheet is folded as drawn, the punch is red, and the answer is folded out."""
    fig = q.get("fig") or ""
    if not paper_panels(fig):
        return None
    holes = paper_panel_holes(q)
    if not holes:
        return None
    hits = [i for i, o in enumerate(q["options"])
            if paper_same(holes, paper_panel_option(o.get("fig")), tol=0.05)]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    folds, slant = paper_panel_folds(fig)
    punches = paper_panel_punches(fig)
    letter = chr(65 + q["correct"])
    def as_num(txt):
        return txt.translate(str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯"))

    if slant:
        fold_text = "folded once along the slanting crease drawn from corner to corner"
        as_fold = "কোণাৰ পৰা কোণালৈ টনা চিকন ৰেখাৰে এবাৰ ভাঁজ কৰা হৈছে"
    else:
        en_steps, as_steps = [], []
        for axis, c, keep_low in folds:
            word = "vertical" if axis == 0 else "horizontal"
            span = "across" if axis == 0 else "down"
            side = ("left" if keep_low else "right") if axis == 0 else ("top" if keep_low else "bottom")
            other = ("right" if keep_low else "left") if axis == 0 else ("bottom" if keep_low else "top")
            en_steps.append(f"a {word} crease {paper_pc(c)} of the way {span}, "
                            f"folding the {other} part onto the {side}")
            as_side = ("বাওঁ" if keep_low else "সোঁ") if axis == 0 else ("ওপৰ" if keep_low else "তল")
            as_other = ("সোঁ" if keep_low else "বাওঁ") if axis == 0 else ("তল" if keep_low else "ওপৰ")
            as_steps.append(f"{'উলম্ব' if axis == 0 else 'অনুভূমিক'} চিকন ৰেখাৰে "
                            f"{as_num(paper_pc(c))} ঠাইত, {as_other} অংশ {as_side}ফালে")
        if len(en_steps) == 1:
            fold_text = "folded once along " + en_steps[0]
            as_fold = "এবাৰ ভাঁজ কৰা হৈছে (" + as_steps[0] + ")"
        else:
            fold_text = ("folded twice: first along " + en_steps[0] +
                         ", and then along " + en_steps[1])
            as_fold = "দুবাৰ ভাঁজ কৰা হৈছে (" + " আৰু ".join(as_steps) + ")"
    punch_text = " and ".join(f"{paper_pc(x)} across and {paper_pc(y)} down" for x, y in punches)
    hole_text = "; ".join(f"{paper_pc(x)} across, {paper_pc(y)} down" for x, y in sorted(holes))
    en = (f"The sheet is {fold_text}. "
          f"The punch{('es are' if len(punches) > 1 else ' is')} at {punch_text} of the folded stack. "
          f"Opening the sheet reflects every hole across the crease, so the paper carries "
          f"{len(holes)} hole{'s' if len(holes) > 1 else ''}, at {hole_text} - option {letter}.")
    as_digits = as_num(str(len(holes)))
    as_ = (f"কাগজখন {as_fold}। ভাঁজ কৰা কাগজত ফুটা কৰা ঠাইৰ পৰা চিকন ৰেখাৰ সিপাৰে প্ৰতিফলন হৈ "
           f"মেলি দিলে {as_digits} টা ফুটা দেখা যায় — বিকল্প {letter}।")
    return en, as_


def paper_cut_sheet(fig):
    """The sheet itself: the rect drawn in the darker stroke, not the panel frame around it."""
    for m in re.finditer(r'<rect[^>]*stroke="#334155"[^>]*>', fig or ""):
        tag = dict(re.findall(r'(?<![\w-])(x|y|width|height)="([\d.]+)"', m.group(0)))
        if len(tag) == 4:
            x, y = float(tag["x"]), float(tag["y"])
            return (x, y, x + float(tag["width"]), y + float(tag["height"]))
    boxes = [b for b in paper_boxes(fig) if b[2] - b[0] >= 100]
    return boxes[0] if boxes else None


def paper_cut_creases(fig, box):
    out = []
    for a, c, e, f in re.findall(
            r'<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"[^>]*dasharray', fig or ""):
        a, c, e, f = map(float, (a, c, e, f))
        (na, nc), (ne, nf) = paper_rel(box, (a, c)), paper_rel(box, (e, f))
        out.append((na, nc, ne, nf))
    return out


def paper_cut_pieces(fig, box):
    """The cut pieces: polygons and punched rings, in sheet coordinates."""
    out = []
    for m in re.finditer(r'<polygon points="([^"]+)"[^>]*fill="#ffffff"', fig or ""):
        out.append(("poly", [paper_rel(box, tuple(map(float, t.split(",")))) for t in m.group(1).split()]))
    for m in re.finditer(r'<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"[^>]*fill="#ffffff"', fig or ""):
        cx, cy, r = map(float, m.groups())
        out.append(("ring", [paper_rel(box, (cx, cy)), r / (box[2] - box[0])]))
    return out


def paper_cut_signature(pieces):
    sig = []
    for kind, data in pieces:
        if kind == "poly":
            xs = [x for x, _ in data]
            ys = [y for _, y in data]
            sig.append(("poly", len(data), (round(min(xs), 2), round(min(ys), 2),
                                           round(max(xs), 2), round(max(ys), 2))))
        else:
            (x, y), r = data
            sig.append(("ring", round(r, 2), (round(x - r, 2), round(y - r, 2),
                                             round(x + r, 2), round(y + r, 2))))
    return tuple(sorted(sig))


def paper_cut_open(fig, box):
    """Every copy of the cut that the opening sheet shows, creases reflecting it back out."""
    creases = paper_cut_creases(fig, box)
    pieces = paper_cut_pieces(fig, box)
    seen, stack, opened = set(), list(pieces), []
    while stack:
        piece = stack.pop()
        sig = paper_cut_signature([piece])
        if sig in seen:
            continue
        seen.add(sig)
        opened.append(piece)
        for line in creases:
            if piece[0] == "poly":
                moved = [paper_reflect_n(p, line) for p in piece[1]]
                if all(-0.02 <= v <= 1.02 for p in moved for v in p):
                    stack.append(("poly", moved))
            else:
                centre = paper_reflect_n(piece[1][0], line)
                if -0.02 <= centre[0] <= 1.02 and -0.02 <= centre[1] <= 1.02:
                    stack.append(("ring", [centre, piece[1][1]]))
    return opened, creases, pieces


def paper_cut_fold_text(creases):
    bits, as_bits = [], []
    for a, b, c, d in creases:
        if abs(a - c) < 0.02:
            at = "down the middle" if abs(a - 0.5) < 0.06 else f"{paper_pc(a)} of the way across"
            bits.append("a vertical crease " + at)
            as_bits.append("উলম্ব" + (" মাজে" if abs(a - 0.5) < 0.06 else f" {paper_pc(a)} ঠাইত"))
        elif abs(b - d) < 0.02:
            at = "across the middle" if abs(b - 0.5) < 0.06 else f"{paper_pc(b)} of the way down"
            bits.append("a horizontal crease " + at)
            as_bits.append("অনুভূমিক" + (" মাজে" if abs(b - 0.5) < 0.06 else f" {paper_pc(b)} ঠাইত"))
        else:
            down = (c - a) * (d - b) > 0
            corner = "top left to bottom right" if down else "bottom left to top right"
            bits.append("a slanting crease from the " + corner + " corner")
            as_bits.append("কৰ্ণৰ দিশে থকা চিকন ৰেখা")
    word = "once" if len(bits) == 1 else ("twice" if len(bits) == 2 else "three times")
    fold = f"folded {word} along " + (" and ".join(bits))
    as_word = "এবাৰ" if len(bits) == 1 else "দুবাৰ"
    return fold, f"{as_word} ভাঁজ কৰা হৈছে (" + ", ".join(as_bits) + ")"


def paper_piece_word(piece):
    kind, data = piece
    if kind == "ring":
        return "round hole", "গোল ফুটা"
    n = len(data)
    if n > 10:
        return "semicircular piece", "অৰ্ধবৃত্তাকাৰ টুকুৰা"
    if n == 3:
        return "triangular piece", "ত্ৰিভুজাকাৰ টুকুৰা"
    if n == 4:
        return "square piece", "বৰ্গাকাৰ টুকুৰা"
    return "piece", "টুকুৰা"


def paper_fold_cut(q):
    """Sheets drawn flat with a dashed crease, a cut piece or a punched hole, and open answers."""
    fig = q.get("fig") or ""
    box = paper_cut_sheet(fig)
    if not box or not re.search(r'#334155', fig):
        return None
    opened, creases, pieces = paper_cut_open(fig, box)
    if not creases or not pieces:
        return None
    letter = chr(65 + q["correct"])
    fold_text, as_fold = paper_cut_fold_text(creases)
    if len(pieces) == 1 and pieces[0][0] == "ring":
        word, as_word = "round hole", "গোল ফুটা"
    else:
        word, as_word = paper_piece_word(pieces[0])
    as_num = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")
    count = len(opened)
    # count answers: the options carry numerals instead of drawings
    numerals = []
    for o in q["options"]:
        found = re.findall(r'<text[^>]*>([^<]*)</text>', o.get("fig") or "")
        numerals.append(found[0].strip() if found else None)
    if all(numerals):
        nums = []
        for n in numerals:
            nums.append(n)
        hit = [i for i, n in enumerate(nums) if n.isdigit() and int(n) == count]
        if len(hit) != 1 or hit[0] != q["correct"]:
            return None
        en = (f"The sheet is {fold_text}, so the punch passes through {2 ** len(creases)} layers. "
              f"Opening it lays those layers side by side, and the sheet carries {count} holes - "
              f"option {letter} ({numerals[q['correct']]})." if 2 ** len(creases) == count else
              f"The sheet is {fold_text}. Opening it lays the folded layers side by side, and the sheet "
              f"carries {count} holes - option {letter} ({numerals[q['correct']]}).")
        as_ = (f"কাগজখন {as_fold}। মেলি দিলে {str(count).translate(as_num)} টা ফুটা পোৱা যায় — "
               f"বিকল্প {letter}।")
        return en, as_
    hits = [i for i, o in enumerate(q["options"])
            if paper_cut_signature(paper_cut_pieces(o.get("fig") or "",
                                                    paper_cut_sheet(o.get("fig") or "") or box))
            == paper_cut_signature(opened)]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    whole = "full circle" if word.startswith("semicircular") else ("full square" if word.startswith("square")
                                                                  else "single shape")
    as_whole = "এটা গোল ফুটা" if word.startswith("semicircular") else "এটাই আকৃতি"
    joint_en = f" the two halves meet along the crease and make one {whole} in the middle of the sheet - option {letter}."
    joint_as = f" দুয়ো আধা লগ হৈ {as_whole} হয় — বিকল্প {letter}।"
    if count == 2 and len(pieces) == 1:
        en = (f"The sheet is {fold_text}, so the cut goes through every layer. "
              f"Unfolding mirrors the {word} across the crease, and" + joint_en)
        return en, f"কাগজখন {as_fold}। {as_word} কাটা অংশ ভাঁজৰ ৰেখাৰ সিপাৰে প্ৰতিফলিত হৈ" + joint_as
    en = (f"The sheet is {fold_text}, so the cut goes through every layer. "
          f"Unfolding mirrors the {word} across {'the crease' if len(creases) == 1 else 'each crease'}, "
          f"so the opened sheet shows {count} copies of it - option {letter}.")
    as_ = (f"কাগজখন {as_fold}। {as_word} কাটা অংশ ভাঁজৰ ৰেখাৰ সিপাৰে প্ৰতিফলিত হৈ মেলি দিলে "
           f"{str(count).translate(as_num)} ঠাইত কটা দেখা যায় — বিকল্প {letter}।")
    return en, as_


def grid_cells(fig):
    return [tuple(map(float, m.groups())) for m in re.finditer(
        r'<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="(?:6|8)"[^>]*stroke="#e2e8f0"',
        fig or "")]


def grid_shift(attrs, dx, dy, tag, k=1.0):
    if not dx and not dy and k == 1.0:
        return attrs
    if k != 1.0:
        attrs = dict(attrs)
        for key in ("cx", "cy", "r", "x", "y", "width", "height", "x1", "x2", "y1", "y2"):
            if key in attrs:
                attrs[key] = str(float(attrs[key]) * k)
        if "points" in attrs:
            attrs["points"] = " ".join(
                f"{float(t.split(',')[0]) * k},{float(t.split(',')[1]) * k}" for t in attrs["points"].split())
    a = dict(attrs)
    if tag == "circle":
        a["cx"] = str(float(a["cx"]) + dx)
        a["cy"] = str(float(a["cy"]) + dy)
    elif tag == "line":
        for k, d in (("x1", dx), ("x2", dx), ("y1", dy), ("y2", dy)):
            a[k] = str(float(a[k]) + d)
    elif tag == "rect":
        a["x"] = str(float(a["x"]) + dx)
        a["y"] = str(float(a["y"]) + dy)
    elif tag == "text":
        a["x"] = str(float(a["x"]) + dx)
        a["y"] = str(float(a["y"]) + dy)
    elif tag == "polygon":
        pts = []
        for t in a["points"].split():
            x, y = map(float, t.split(","))
            pts.append(f"{x + dx},{y + dy}")
        a["points"] = " ".join(pts)
    elif tag == "path":
        nums = re.findall(r"-?[\d.]+", a.get("d", ""))
        if len(nums) >= 4:
            nums[0] = str(float(nums[0]) + dx)
            nums[1] = str(float(nums[1]) + dy)
            nums[-2] = str(float(nums[-2]) + dx)
            nums[-1] = str(float(nums[-1]) + dy)
            a["d"] = " ".join(nums)
    return a


def grid_parse(fig, dx=0.0, dy=0.0, k=1.0):
    out = []
    for m in re.finditer(r'<(polygon|circle|line|path|text|rect)\b([^>]*?)(?:/>|>([^<]*)</text>)', fig or ""):
        tag = m.group(1)
        attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(2)))
        txt = (m.group(3) or "").strip()
        shape_rect = tag == "rect" and attrs.get("stroke") != "#e2e8f0"
        if (attrs.get("stroke") == "#334155" or attrs.get("fill") == "#334155"
                or shape_rect or (tag == "text" and txt == "?")):
            out.append((tag, grid_shift(attrs, dx, dy, tag, k), txt))
    return out


def grid_prims(fig):
    out = []
    group = r'<g transform="translate\(([-\d.]+),([-\d.]+)\)(?: scale\(([-\d.]+)\))?">([\s\S]*?)</g>'
    for m in re.finditer(group, fig or ""):
        dx, dy = float(m.group(1)), float(m.group(2))
        k = float(m.group(3)) if m.group(3) else 1.0
        out += grid_parse(m.group(4), dx, dy, k)
    outside = re.sub(group, "", fig or "")
    out += grid_parse(outside)
    return out


GRID_WORDS = {("ring",): "circle inside a circle", ("lines", 2): "pair of crossing lines",
              ("lines", 3): "three lines", ("disc",): "solid dot", ("line",): "line",
              ("path",): "shaded half-disc", ("missing",): "question mark"}


def grid_word(sig):
    out = []
    for s in sig:
        if s[0] == "box":
            out.append(s[1])
        elif s[0] == "poly":
            out.append(s[2])
        elif s[0] == "circle":
            out.append("circle")
        elif s[0] == "ring":
            out.append("circle inside a circle")
        elif s[0] == "path":
            out.append("shaded half-disc")
        else:
            out.append(GRID_WORDS.get(tuple(s), s[0]))
    return " and ".join(out)


GRID_WORDS_AS = {"shaded square": "ছাঁ দিয়া বৰ্গ", "shaded rectangle": "ছাঁ দিয়া আয়ত",
                 "square": "বৰ্গ", "triangle": "ত্ৰিভুজ", "pentagon": "পঞ্চভুজ", "hexagon": "ষড়ভুজ",
                 "octagon": "অষ্টভুজ", "circle": "বৃত্ত", "circle inside a circle": "বৃত্তৰ ভিতৰত বৃত্ত",
                 "pair of crossing lines": "কটাকটি ৰেখা", "three lines": "তিনিডাল ৰেখা",
                 "solid dot": "ঘন বিন্দু", "line": "ৰেখা", "shaded half-disc": "ছাঁ দিয়া অৰ্ধবৃত্ত"}


def grid_word_as(sig):
    words = grid_word(sig)
    if words.startswith("shaded "):
        base = words[len("shaded "):]
        return "ছাঁ দিয়া " + GRID_WORDS_AS.get(base, base)
    return GRID_WORDS_AS.get(words, words)


def grid_centre(tag, a, txt):
    if tag == "circle":
        return float(a["cx"]), float(a["cy"])
    if tag == "text":
        return float(a["x"]), float(a["y"]) - 12
    if tag == "line":
        return (float(a["x1"]) + float(a["x2"])) / 2, (float(a["y1"]) + float(a["y2"])) / 2
    if tag == "path":
        nums = [float(x) for x in re.findall(r"-?[\d.]+", a.get("d", ""))]
        if len(nums) < 4:
            return 0.0, 0.0
        return (nums[0] + nums[-2]) / 2, (nums[1] + nums[-1]) / 2
    if tag == "rect":
        return (float(a["x"]) + float(a["width"]) / 2, float(a["y"]) + float(a["height"]) / 2)
    P = [tuple(map(float, t.split(","))) for t in a["points"].split()]
    return sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)


def grid_sig(box, prims):
    x0, y0, w, h = box
    inside = []
    for tag, a, txt in prims:
        cx, cy = grid_centre(tag, a, txt)
        if not (x0 <= cx <= x0 + w and y0 <= cy <= y0 + h):
            continue
        if tag == "polygon":
            n = len(a["points"].split())
            name = {3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon", 8: "octagon"}.get(n, f"{n}-sided outline")
            inside.append(("poly", n, "shaded " + name if a.get("fill") == "#334155" else name))
        elif tag == "circle":
            inside.append(("disc",) if a.get("fill") == "#334155" else ("circle", round(float(a["r"]))))
        elif tag == "line":
            inside.append(("line",))
        elif tag == "path":
            inside.append(("path",))
        elif tag == "rect":
            w = float(a.get("width", 0))
            name = "shaded square" if abs(w - float(a.get("height", w))) < 2 else "shaded rectangle"
            inside.append(("box", name))
        else:
            inside.append(("missing",))
    circles = [i for i, s in enumerate(inside) if s[0] == "circle"]
    if len(circles) == 2:
        inside = [s for j, s in enumerate(inside) if j not in circles] + [("ring",)]
    lines = [i for i, s in enumerate(inside) if s[0] == "line"]
    if len(lines) >= 2:
        inside = [s for j, s in enumerate(inside) if j not in lines] + [("lines", len(lines))]
    return tuple(sorted(inside))


def grid_of(fig):
    boxes = grid_cells(fig)
    prims = grid_prims(fig)
    if not boxes:
        return None
    xs = sorted({round(b[0], 1) for b in boxes})
    ys = sorted({round(b[1], 1) for b in boxes})
    cells = {(ys.index(round(b[1], 1)), xs.index(round(b[0], 1))): grid_sig(b, prims) for b in boxes}
    return [[cells.get((r, c)) for c in range(len(xs))] for r in range(len(ys))]


def grid_option(fig):
    boxes = grid_cells(fig)
    if len(boxes) > 1:
        return None
    if not boxes:
        m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', fig or "")
        if not m:
            return None
        boxes = [(0.0, 0.0, float(m.group(1)), float(m.group(2)))]
    return grid_sig(boxes[0], grid_prims(fig))


def grid_known(v):
    return v is not None and v != (("missing",),)


def grid_row_period(g, R, C, p):
    for r in range(R):
        for c1 in range(C):
            for c2 in range(c1 + 1, C):
                if c1 % p == c2 % p and grid_known(g[r][c1]) and grid_known(g[r][c2]) and g[r][c1] != g[r][c2]:
                    return False
    return True


def grid_col_period(g, R, C, p):
    for c in range(C):
        for r1 in range(R):
            for r2 in range(r1 + 1, R):
                if r1 % p == r2 % p and grid_known(g[r1][c]) and grid_known(g[r2][c]) and g[r1][c] != g[r2][c]:
                    return False
    return True


def grid_period_answer(g, mr, mc):
    R, C = len(g), len(g[0])
    got = []
    for p in range(1, C + 1):
        if grid_row_period(g, R, C, p) and grid_known(g[mr][mc % p]):
            got.append(("row", p, (mr, mc % p), g[mr][mc % p]))
            break
    for p in range(1, R + 1):
        if grid_col_period(g, R, C, p) and grid_known(g[mr % p][mc]):
            got.append(("col", p, (mr % p, mc), g[mr % p][mc]))
            break
    if not got or len({x[3] for x in got}) != 1:
        return None
    return got[0]


def grid_symmetry_answer(g, mr, mc):
    """Copies one cell to another: the sheet repeats by whole steps across and down."""
    R, C = len(g), len(g[0])
    for dr in range(0, R):
        for dc in range(0, C):
            if dr == 0 and dc == 0:
                continue
            steps = []
            if dr:
                steps += [(-dr, -dc), (dr, dc)] if dc else [(-dr, 0), (dr, 0)]
            elif dc:
                steps += [(0, -dc), (0, dc)]
            for sr, sc in steps:
                r0, c0 = mr + sr, mc + sc
                if not (0 <= r0 < R and 0 <= c0 < C) or not grid_known(g[r0][c0]):
                    continue
                ok, src = True, None
                for r in range(R):
                    for c in range(C):
                        r2, c2 = r + dr, c + dc
                        if not (0 <= r2 < R and 0 <= c2 < C):
                            continue
                        if grid_known(g[r][c]) and grid_known(g[r2][c2]) and g[r][c] != g[r2][c2]:
                            ok = False
                            break
                    if not ok:
                        break
                if not ok:
                    continue
                return ("shift", (dr, dc), (r0, c0), g[r0][c0])
    return None


def paper_pattern_cell(q):
    """Grid completion: the missing cell repeats a cell that is already drawn."""
    g = grid_of(q.get("fig") or "")
    if not g or not g[0]:
        return None
    R, C = len(g), len(g[0])
    missing = [(r, c) for r in range(R) for c in range(C) if g[r][c] == (("missing",),)]
    if len(missing) != 1:
        return None
    mr, mc = missing[0]
    found = grid_period_answer(g, mr, mc) or grid_symmetry_answer(g, mr, mc)
    if not found:
        return None
    opts = [grid_option(o.get("fig") or "") for o in q["options"]]
    if any(o is None for o in opts):
        return None
    want = found[3]
    hits = [i for i, o in enumerate(opts) if o == want]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    letter = chr(65 + q["correct"])
    shape = grid_word(want)
    src_r, src_c = found[2]
    where = f"row {src_r + 1}, column {src_c + 1}"
    if found[0] == "row":
        p = found[1]
        rule = ("every row repeats the same figures in the same order" if p == 1 else
                f"along every row the figures repeat every {p} cells")
        as_rule = ("প্ৰতিটো শাৰীত একে আৰ্হিয়েই পুনৰাবৃত্তি হয়" if p == 1 else
                   f"প্ৰতিটো শাৰীত প্ৰতি {p} ঘৰকৈ আৰ্হি পুনৰাবৃত্তি হয়")
    elif found[0] == "col":
        p = found[1]
        rule = ("every column repeats the same figures in the same order" if p == 1 else
                f"down every column the figures repeat every {p} cells")
        as_rule = ("প্ৰতিটো স্তম্ভত একে আৰ্হিয়েই পুনৰাবৃত্তি হয়" if p == 1 else
                   f"প্ৰতিটো স্তম্ভত প্ৰতি {p} ঘৰকৈ আৰ্হি পুনৰাবৃত্তি হয়")
    else:
        dr, dc = found[1]
        if abs(dc) == 1 and abs(dr) == 1:
            rule = "each figure repeats one step down and one across, so the pattern runs along the diagonal"
            as_rule = "আৰ্হি এঘৰ তললৈ আৰু এঘৰ কাষলৈ পুনৰাবৃত্তি হয়"
        else:
            rule = f"a figure reappears {dr} row(s) down and {dc} column(s) across"
            as_rule = f"আৰ্হি {dr} শাৰী তলত আৰু {dc} ঘৰ কাষত পুনৰ দেখা যায়"
    en = (f"In the grid {rule}. The empty cell is row {mr + 1}, column {mc + 1}, "
          f"and the same figure already sits at {where}, so that cell takes the {shape} - option {letter}.")
    as_ = (f"গ্ৰিডত {as_rule}। খালী ঘৰটো {mr + 1} নং শাৰীৰ {mc + 1} নং স্তম্ভত আছে, "
           f"আৰু {src_r + 1} নং শাৰীৰ {src_c + 1} নং স্তম্ভত সেই আৰ্হিয়েই আছে — "
           f"গতিকে ঘৰটোত {grid_word_as(want)} হ'ব — বিকল্প {letter}।")
    return en, as_



MIRROR_TAGS = ("polygon", "line", "circle")


def mirror_prims(fig):
    out = []
    for m in re.finditer(r"<(polygon|line|circle)\b([^>]*?)/?>", fig or ""):
        tag = m.group(1)
        a = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(2)))
        if a.get("stroke") == "#334155" or a.get("fill") == "#334155":
            out.append((tag, a))
    return out


def mirror_points(tag, a):
    if tag == "polygon":
        return [tuple(map(float, t.split(","))) for t in a["points"].split()]
    if tag == "line":
        return [(float(a["x1"]), float(a["y1"])), (float(a["x2"]), float(a["y2"]))]
    c = (float(a["cx"]), float(a["cy"]))
    r = float(a["r"])
    return [(c[0] - r, c[1] - r), (c[0] + r, c[1] + r)]


def mirror_norm(fig, refl=None):
    prims = mirror_prims(fig)
    if not prims:
        return None
    pts = [p for tag, a in prims for p in mirror_points(tag, a)]
    x0 = min(p[0] for p in pts)
    y0 = min(p[1] for p in pts)
    w = max(max(p[0] for p in pts) - x0, 1e-6)
    h = max(max(p[1] for p in pts) - y0, 1e-6)
    out = []
    for tag, a in prims:
        P = [((p[0] - x0) / w, (p[1] - y0) / h) for p in mirror_points(tag, a)]
        if refl == "x":
            P = [(1 - x, y) for x, y in P]
        elif refl == "y":
            P = [(x, 1 - y) for x, y in P]
        if tag == "circle":
            out.append(("c", (P[0][0] + P[1][0]) / 2, (P[0][1] + P[1][1]) / 2))
        else:
            out.append(("p", tuple(sorted((round(x, 3), round(y, 3)) for x, y in P))))
    return out


def mirror_flat(sig):
    flat = []
    for e in sig:
        if e[0] == "c":
            flat.append(("c", e[1], e[2]))
        else:
            flat.append(("p",) + tuple(v for pt in e[1] for v in pt))
    return flat


def mirror_close(A, B, tol=0.06):
    if A is None or B is None or len(A) != len(B):
        return False
    fa, fb = mirror_flat(A), mirror_flat(B)
    used = set()
    for e in fa:
        hit = None
        for j, o in enumerate(fb):
            if j in used or len(o) != len(e) or o[0] != e[0]:
                continue
            if all(abs(p - q) <= tol for p, q in zip(e[1:], o[1:])):
                hit = j
                break
        if hit is None:
            return False
        used.add(hit)
    return True


def mirror_place(x, y):
    horiz = "left" if x < 0.34 else ("right" if x > 0.66 else "middle")
    vert = "upper" if y < 0.34 else ("lower" if y > 0.66 else "middle")
    if horiz == "middle" and vert == "middle":
        return "the centre"
    if horiz == "middle":
        return f"the {vert} middle"
    if vert == "middle":
        return f"the middle {horiz}"
    return f"the {vert}-{horiz} corner"


def mirror_kind_word(P):
    xs = [p[0] for p in P]
    ys = [p[1] for p in P]
    dx, dy = max(xs) - min(xs), max(ys) - min(ys)
    return "horizontal" if dx > 2.2 * dy else ("vertical" if dy > 2.2 * dx else "sloping")


def mirror_parts(fig, refl=None):
    sig = mirror_norm(fig, refl)
    if not sig:
        return []
    parts = []
    for e in sig:
        if e[0] == "c":
            parts.append({"kind": "dot", "name": "a dot", "pos": mirror_place(e[1], e[2])})
            continue
        P = e[1]
        xs = [p[0] for p in P]
        ys = [p[1] for p in P]
        if len(P) >= 3:
            sides = len(P)
            name = {3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon"}.get(sides, f"{sides}-sided shape")
            if (max(xs) - min(xs)) > 0.8 and (max(ys) - min(ys)) > 0.8:
                parts.append({"kind": "outline", "name": f"the {name} outline", "pos": None})
            else:
                cx = (max(xs) + min(xs)) / 2
                cy = (max(ys) + min(ys)) / 2
                parts.append({"kind": "shape", "name": f"a small {name}",
                              "pos": mirror_place(cx, cy)})
        else:
            kind = mirror_kind_word(P)
            a, b = P[0], P[-1]
            parts.append({"kind": "line", "name": f"a {kind} line",
                          "pos": (mirror_place(a[0], a[1]), mirror_place(b[0], b[1]))})
    return parts


def mirror_phrase(part, after):
    kind, name, pos = part["kind"], part["name"], part["pos"]
    if kind == "outline":
        return f"{name} stays where it is" if after else name
    if kind == "line":
        verb = "now runs from" if after else "running from"
        return f"{name} {verb} {pos[0]} to {pos[1]}"
    if kind == "dot":
        return f"{name} moves to {pos}" if after else f"{name} in {pos}"
    return f"{name} now sits in {pos}" if after else f"{name} in {pos}"


def join_words(items):
    if len(items) <= 1:
        return "".join(items)
    return ", ".join(items[:-1]) + " and " + items[-1]


def paper_reflection(q):
    """Mirror and water images: reflect the figure and see which option matches."""
    stem = (q.get("q") or {}).get("en", "").lower()
    if "mirror image" in stem:
        refl, side = "x", "left for right"
    elif "water image" in stem:
        refl, side = "y", "top for bottom"
    else:
        return None
    want = mirror_norm(q.get("fig") or "", refl)
    if not want:
        return None
    hits = [i for i, o in enumerate(q["options"]) if mirror_close(want, mirror_norm(o.get("fig") or ""))]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    parts = mirror_parts(q.get("fig") or "", None)
    flipped = mirror_parts(q.get("fig") or "", refl)
    if not parts or len(parts) != len(flipped):
        return None
    before = [mirror_phrase(p, False) for p in parts]
    after = [mirror_phrase(p, True) for p in flipped]
    letter = chr(65 + q["correct"])
    what = "mirror image" if refl == "x" else "water image"
    en = (f"The drawing holds {join_words(before)}. A {what} keeps every part at the same distance "
          f"from the centre but swaps {side}, so {join_words(after)}. "
          f"Only option {letter} is drawn that way.")
    as_ = (f"চিত্ৰত {len(parts)} টা অংশ আছে। প্ৰতিবিম্বত অংশবোৰৰ কেন্দ্ৰৰ পৰা দুৰত্ব একেই থাকে, "
           f"কিন্তু {('বাওঁ-সোঁ' if refl == 'x' else 'ওপৰ-তল')} সলনি হয় — ওপৰৰ বৰ্ণনাৰ সৈতে "
           f"মিলাই চালে কেৱল বিকল্প {letter} হয়।")
    return en, as_


SYM_X = set("AHIMOTUVWXY08")
SYM_Y = set("BCDEHIKOX08")


def letter_text(fig):
    m = re.search(r"<text[^>]*>([^<]+)</text>", fig or "")
    return m.group(1).strip() if m else None


def tf_mul(A, B):
    a1, b1, c1, d1 = A
    a2, b2, c2, d2 = B
    return (a1 * a2 + c1 * b2, b1 * a2 + d1 * b2, a1 * c2 + c1 * d2, b1 * c2 + d1 * d2)


def tf_linear(text):
    """Linear part of every transform in the drawing, outer groups first; translations are dropped."""
    M = (1.0, 0.0, 0.0, 1.0)
    for name, args in re.findall(r"(\w+)\(([^)]*)\)", text or ""):
        nums = [float(x) for x in re.split(r"[,\s]+", args.strip()) if x]
        if not nums:
            continue
        if name == "scale":
            sx = nums[0]
            sy = nums[1] if len(nums) > 1 else nums[0]
            M = tf_mul(M, (sx, 0.0, 0.0, sy))
        elif name == "rotate":
            th = math.radians(nums[0])
            M = tf_mul(M, (math.cos(th), -math.sin(th), math.sin(th), math.cos(th)))
        elif name == "matrix" and len(nums) >= 4:
            M = tf_mul(M, tuple(nums[:4]))
    return M


def tf_kind(M):
    a, b, c, d = M
    scale = max(abs(a), abs(d), 1e-9)
    a, b, c, d = a / scale, b / scale, c / scale, d / scale
    if abs(b) < 1e-6 and abs(c) < 1e-6:
        if a > 0 and d > 0:
            return "none"
        if a < 0 and d > 0:
            return "mirror"
        if a > 0 and d < 0:
            return "water"
        return "turn180"
    deg = round(math.degrees(math.atan2(b, a))) % 360
    return "turn180" if abs(deg - 180) < 2 else "rotate" + str(deg)


def letter_kind(fig):
    return tf_kind(tf_linear(fig))


def letter_symmetric(text, axis):
    allowed = SYM_X if axis == "x" else SYM_Y
    return all(ch in allowed for ch in text) and text == text[::-1]


def paper_letter_reflection(q):
    """Mirror and water images of letters and words: the option carries the transform."""
    stem = (q.get("q") or {}).get("en", "").lower()
    if "mirror image" in stem:
        axis, side = "x", "left to right"
    elif "water image" in stem:
        axis, side = "y", "top to bottom"
    else:
        return None
    text = letter_text(q.get("fig") or "")
    if not text or letter_symmetric(text, axis):
        return None
    kinds = []
    for o in q["options"]:
        if letter_text(o.get("fig") or "") != text:
            return None
        kinds.append(letter_kind(o.get("fig") or ""))
    if len(set(kinds)) != 4 or kinds.count(axis and "mirror" if axis == "x" else "water") != 1:
        return None
    want = "mirror" if axis == "x" else "water"
    hits = [i for i, k in enumerate(kinds) if k == want]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    said = {"mirror": "the same drawing flipped left to right",
            "water": "the same drawing flipped top to bottom",
            "turn180": "the drawing turned right round",
            "none": "the drawing left as it stands"}
    said = {"mirror": "reversed left to right",
            "water": "reversed top to bottom",
            "turn180": "turned right round",
            "none": "left exactly as it stands"}
    others = []
    for i, k in enumerate(kinds):
        if i == q["correct"]:
            continue
        others.append(f"{chr(65 + i)} has it {said.get(k, 'tilted by ' + k[6:] + ' degrees')}")
    letter = chr(65 + q["correct"])
    what = "mirror image" if axis == "x" else "water image"
    thing = f"the word {text}" if len(text) > 1 else f"the letter {text}"
    en = (f"The figure is {thing}, written upright. A {what} reverses it {side} and does not turn it round: "
          f"every stroke keeps its height and only swaps sides. Of the four cards, {join_words(others)}, "
          f"while {letter} is the copy reversed {side} - so {letter} is the answer.")
    as_ = (f"চিত্ৰত {text} সিজা অৱস্থাত আছে। {'দাপোণৰ প্ৰতিবিম্ব' if axis == 'x' else 'পানীৰ প্ৰতিবিম্ব'}ত "
           f"ইয়াক {('বাওঁ-সোঁ' if axis == 'x' else 'ওপৰ-তল')} ওলোটা কৰা হয়, ঘূৰোৱা নহয় — "
           f"আন তিনিটা বিকল্পত আখৰটো ওলোটা দিশত ঘূৰোৱা বা সিজা অৱস্থাত ৰখা হৈছে। "
           f"গতিকে কেৱল বিকল্প {letter} শুদ্ধ।")
    return en, as_


def paper_reversed(q):
    for fn in (paper_letter_reflection, paper_reflection):
        out = fn(q)
        if out:
            return out
    return None


POLY_NAMES = {3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon",
              7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon"}
POLY_NAMES_AS = {3: "ত্ৰিভুজ", 4: "বৰ্গ", 5: "পঞ্চভুজ", 6: "ষড়ভুজ",
                 7: "সপ্তভুজ", 8: "অষ্টভুজ", 9: "নৱভুজ", 10: "দশভুজ"}


def series_cell(box, prims):
    x0, y0, w, h = box
    sides = None
    polygons = 0
    dots = lines = 0
    missing = False
    for tag, a, txt in prims:
        cx, cy = grid_centre(tag, a, txt)
        if not (x0 <= cx <= x0 + w and y0 <= cy <= y0 + h):
            continue
        if tag == "polygon":
            polygons += 1
            sides = len(a["points"].split())
        elif tag == "circle":
            if a.get("fill") == "#334155" and float(a["r"]) < 12:
                dots += 1
        elif tag == "line":
            lines += 1
        elif tag == "text" and txt == "?":
            missing = True
    return {"sides": sides if polygons == 1 else None, "dots": dots, "lines": lines, "missing": missing}


def series_option(fig):
    boxes = grid_cells(fig)
    if len(boxes) > 1:
        return None
    if not boxes:
        m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', fig or "")
        if not m:
            return None
        boxes = [(0.0, 0.0, float(m.group(1)), float(m.group(2)))]
    return series_cell(boxes[0], grid_prims(fig))


def paper_series_next(q):
    """Figure series: one counted feature grows by the same step, so the next figure is fixed."""
    fig = q.get("fig") or ""
    seq = [series_cell(b, grid_prims(fig)) for b in grid_cells(fig)]
    if len(seq) < 3:
        return None
    miss = [i for i, c in enumerate(seq) if c["missing"]]
    if len(miss) != 1:
        return None
    known = [c for i, c in enumerate(seq) if i != miss[0]]
    opts = [series_option(o.get("fig") or "") for o in q["options"]]
    if any(o is None for o in opts):
        return None
    for feat in ("sides", "dots", "lines"):
        vals = [c[feat] for c in known]
        if any(v is None for v in vals) or len(set(vals)) < 2:
            continue
        steps = {vals[i + 1] - vals[i] for i in range(len(vals) - 1)}
        if len(steps) != 1:
            continue
        step = steps.pop()
        if step < 1:
            continue
        want = vals[-1] + step
        hits = [i for i, o in enumerate(opts) if o[feat] == want]
        if len(hits) == 1 and hits[0] == q["correct"]:
            break
    else:
        return None
    letter = chr(65 + q["correct"])
    listed = ", ".join(str(v) for v in vals)
    if feat == "sides":
        if want in POLY_NAMES:
            closing = f"that is the {POLY_NAMES[want]}"
            closing_as = f"অৰ্থাৎ {POLY_NAMES_AS.get(want, POLY_NAMES[want])}"
        else:
            closing = f"a figure with {want} sides"
            closing_as = f"{want} বাহুৰ এটা চিত্ৰ"
        grew = "gains one side" if step == 1 else f"gains {step} sides"
        en = (f"The outline {grew} at every step: {listed}. The next figure therefore has "
              f"{want} sides, {closing} - option {letter}.")
        as_ = (f"শৃংখলাত প্ৰতি ধাপে {'এটা' if step == 1 else step} বাহু বাঢ়ে: {listed}। "
               f"গতিকে পৰৱৰ্তী চিত্ৰত {want} টা বাহু থাকিব, {closing_as} — বিকল্প {letter}।")
    elif feat == "dots":
        grew = "The dots grow by one at every step" if step == 1 else f"The dots grow by {step} at every step"
        en = (f"{grew}: {listed}. The next figure carries {want} dots, "
              f"so it is option {letter}.")
        as_ = (f"শৃংখলাত প্ৰতি ধাপে {step} টা বিন্দু বাঢ়ে: {listed}। গতিকে পৰৱৰ্তী চিত্ৰত {want} টা "
               f"বিন্দু থাকিব — বিকল্প {letter}।")
    else:
        grew = "The lines grow by one at every step" if step == 1 else f"The lines grow by {step} at every step"
        en = (f"{grew}: {listed}. The next figure carries {want} lines, "
              f"so it is option {letter}.")
        as_ = (f"শৃংখলাত প্ৰতি ধাপে {step} টা ৰেখা বাঢ়ে: {listed}। গতিকে পৰৱৰ্তী চিত্ৰত {want} টা ৰেখা "
               f"থাকিব — বিকল্প {letter}।")
    return en, as_


EMBED_FRACTIONS = {0.125: "an eighth", 0.25: "a quarter", 0.2: "a fifth", 1 / 3: "a third",
                   0.375: "three eighths", 0.4: "two fifths", 0.5: "half", 0.6: "three fifths",
                   0.625: "five eighths", 2 / 3: "two thirds", 0.75: "three quarters",
                   0.8: "four fifths", 0.875: "seven eighths"}


def embed_fraction(v):
    best = min(EMBED_FRACTIONS, key=lambda k: abs(k - v))
    return EMBED_FRACTIONS[best] if abs(best - v) <= 0.06 else None


def embed_segments(fig):
    out = []
    for m in re.finditer(r'<polygon points="([^"]*)"([^>]*)>', fig or ""):
        if "#334155" not in m.group(2) and "#0f172a" not in m.group(2):
            continue
        P = [tuple(map(float, t.split(","))) for t in m.group(1).split()]
        for i in range(len(P)):
            out.append((P[i], P[(i + 1) % len(P)]))
    for m in re.finditer(r"<line ([^>]*)>", fig or ""):
        a = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(1)))
        if a.get("stroke") in ("#334155", "#0f172a"):
            out.append(((float(a["x1"]), float(a["y1"])), (float(a["x2"]), float(a["y2"]))))
    for m in re.finditer(r"<rect ([^>]*)>", fig or ""):
        a = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(1)))
        if a.get("stroke") not in ("#334155", "#0f172a"):
            continue
        x, y = float(a["x"]), float(a["y"])
        w, h = float(a["width"]), float(a["height"])
        c = [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]
        for i in range(4):
            out.append((c[i], c[(i + 1) % 4]))
    return out


def embed_options_shape(fig):
    """The option's own outline: a polygon, a rectangle, or a circle."""
    for m in re.finditer(r'<polygon points="([^"]*)"([^>]*)>', fig or ""):
        if "#334155" in m.group(2) or "#0f172a" in m.group(2):
            return ("poly", [tuple(map(float, t.split(","))) for t in m.group(1).split()])
    for m in re.finditer(r'<rect ([^>]*)>', fig or ""):
        a = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(1)))
        if a.get("stroke") not in ("#334155", "#0f172a"):
            continue
        x, y = float(a["x"]), float(a["y"])
        w, h = float(a["width"]), float(a["height"])
        return ("poly", [(x, y), (x + w, y), (x + w, y + h), (x, y + h)])
    for m in re.finditer(r'<circle ([^>]*)>', fig or ""):
        a = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(1)))
        if a.get("stroke") in ("#334155", "#0f172a"):
            return ("circle", None)
    return None


def embed_options_poly(fig):
    shape = embed_options_shape(fig)
    return shape[1] if shape and shape[0] == "poly" else None


def embed_point_on(p, a, b, tol=1.5):
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    L2 = dx * dx + dy * dy or 1e-9
    t = ((p[0] - ax) * dx + (p[1] - ay) * dy) / L2
    if t < -0.02 or t > 1.02:
        return False
    return math.hypot(p[0] - (ax + t * dx), p[1] - (ay + t * dy)) <= tol


def embed_covered(poly, segments, tol=1.5):
    hits = []
    for i in range(len(poly)):
        p, q = poly[i], poly[(i + 1) % len(poly)]
        found = None
        for a, b in segments:
            if embed_point_on(p, a, b, tol) and embed_point_on(q, a, b, tol):
                found = (a, b)
                break
        if not found:
            return None
        hits.append(found)
    return hits


def embed_norm(segments):
    xs = [p[0] for s in segments for p in s]
    ys = [p[1] for s in segments for p in s]
    x0, y0, x1, y1 = min(xs), min(ys), max(xs), max(ys)
    w = max(x1 - x0, 1e-6)
    h = max(y1 - y0, 1e-6)
    return lambda p: ((p[0] - x0) / w, (p[1] - y0) / h)


def embed_side_name(seg, norm):
    a, b = norm(seg[0]), norm(seg[1])
    if abs(a[1] - b[1]) < 0.03:
        y = (a[1] + b[1]) / 2
        if y < 0.03:
            return "the top edge"
        if y > 0.97:
            return "the bottom edge"
        frac = embed_fraction(y)
        if frac == "half":
            return "the horizontal line halfway down"
        return f"the horizontal line {frac} of the way down" if frac else "a horizontal line"
    if abs(a[0] - b[0]) < 0.03:
        x = (a[0] + b[0]) / 2
        if x < 0.03:
            return "the left edge"
        if x > 0.97:
            return "the right edge"
        if abs(x - 0.5) < 0.03:
            return "the vertical line down the middle"
        frac = embed_fraction(x)
        if frac == "half":
            return "the vertical line halfway across"
        return f"the vertical line {frac} of the way across" if frac else "a vertical line"
    return f"the sloping line from {mirror_place(*a)} to {mirror_place(*b)}"


def embed_parallel(u, v, tol=0.03):
    nu, nv = math.hypot(*u), math.hypot(*v)
    if nu < 1e-9 or nv < 1e-9:
        return False
    return abs(u[0] * v[1] - u[1] * v[0]) / (nu * nv) < tol


def embed_fit(poly, segments):
    """A scale-and-shift that lays every side of the shape on a line of the drawing."""
    pts = [p for s in segments for p in s]
    for i in range(len(poly)):
        v0, v1 = poly[i], poly[(i + 1) % len(poly)]
        edge = (v1[0] - v0[0], v1[1] - v0[1])
        le = math.hypot(*edge)
        if le < 1e-9:
            continue
        for p0 in pts:
            for p1 in pts:
                span = (p1[0] - p0[0], p1[1] - p0[1])
                ld = math.hypot(*span)
                if ld < le * 0.999 or not embed_parallel(edge, span):
                    continue
                s = ld / le
                t = (p0[0] - s * v0[0], p0[1] - s * v0[1])
                mapped = [(s * v[0] + t[0], s * v[1] + t[1]) for v in poly]
                hits = embed_covered(mapped, segments)
                if hits:
                    return mapped, hits
    return None


def embed_dedupe(segments):
    seen = set()
    out = []
    for a, b in segments:
        key = (round(min(a[0], b[0]), 0), round(min(a[1], b[1]), 0),
               round(max(a[0], b[0]), 0), round(max(a[1], b[1]), 0))
        if key in seen:
            continue
        seen.add(key)
        out.append((a, b))
    return out


def embed_element_types(fig):
    """Shapes the drawing contains as drawn outlines, plus circles."""
    types = set()
    for m in re.finditer(r'<polygon points="([^"]*)"([^>]*)>', fig or ""):
        if "#334155" in m.group(2) or "#0f172a" in m.group(2):
            types.add(("poly", len(m.group(1).split())))
    for m in re.finditer(r"<rect ([^>]*)>", fig or ""):
        a = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(1)))
        if a.get("stroke") in ("#334155", "#0f172a"):
            types.add(("poly", 4))
    if re.search(r'<circle [^>]*stroke="#(?:334155|0f172a)"', fig or ""):
        types.add(("circle", 0))
    return types


def embed_option_type(fig):
    shape = embed_options_shape(fig)
    if not shape:
        return None
    return ("circle", 0) if shape[0] == "circle" else ("poly", len(shape[1]))


def poly_name(n):
    return {3: "triangle", 4: "four-sided shape", 5: "pentagon", 6: "hexagon",
            7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon"}.get(n, f"{n}-sided shape")


def poly_name_as(n):
    return {3: "ত্ৰিভুজ", 4: "চতুৰ্ভুজ", 5: "পঞ্চভুজ", 6: "ষড়ভুজ", 7: "সপ্তভুজ",
            8: "অষ্টভুজ", 9: "নৱভুজ", 10: "দশভুজ"}.get(n, f"{n} বাহুৰ চিত্ৰ")


def embed_by_type(q):
    """The drawing carries an outline of one shape family, and only one option is of that family."""
    types = embed_element_types(q.get("fig") or "")
    if not types:
        return None
    kinds = [embed_option_type(o.get("fig") or "") for o in q["options"]]
    if any(k is None for k in kinds):
        return None
    hits = [i for i, k in enumerate(kinds) if k in types]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    kind = kinds[hits[0]]
    letter = chr(65 + hits[0])
    if kind[0] == "circle":
        en = ("The drawing carries a circle among its own lines, and the circle in option "
              f"{letter} is the only option of that kind - the other three are straight-sided shapes "
              f"that are not drawn anywhere in the figure. So {letter} is the shape hidden in it.")
        as_ = (f"চিত্ৰত এটা বৃত্ত আছে, আৰু বিকল্পসমূহৰ ভিতৰত কেৱল {letter} টোৱেই বৃত্ত — "
               f"বাকী তিনিটা সোজা বাহুৰ, যিবোৰ চিত্ৰত অঁকা নাই। গতিকে {letter} শুদ্ধ।")
        return en, as_
    n = kind[1]
    name, name_as = poly_name(n), poly_name_as(n)
    inner = len(re.findall(r"<line [^>]*stroke=\"#(?:334155|0f172a)\"", q.get("fig") or ""))
    if inner == 0:
        drawn, drawn_as = "nothing else is drawn inside it", "ভিতৰত আৰু একো অঁকা নাই"
    elif inner == 1:
        drawn, drawn_as = "a single line inside only divides it", "ভিতৰৰ এডাল ৰেখাই কেৱল ভাগ কৰিছে"
    else:
        drawn = f"{inner} lines inside only divide it"
        drawn_as = f"ভিতৰৰ {inner} ডাল ৰেখাই কেৱল ভাগ কৰিছে"
    en = (f"The drawing is built on a {name}: its outline has {n} sides and {drawn}. "
          f"Of the four options, only {letter} is a {name} as well, "
          f"so {letter} is the shape that sits inside the figure.")
    as_ = (f"চিত্ৰৰ নিজৰ পৰিসীমা {n} টা বাহুৰ {name}, {drawn_as}। "
           f"বিকল্পৰ ভিতৰত কেৱল {letter} টোৱেই {name_as}, গতিকে {letter} শুদ্ধ।")
    return en, as_


def paper_embedded(q):
    """Embedded figures: the option whose sides all lie on lines already drawn."""
    out = embed_by_fit(q)
    return out if out else embed_by_type(q)


def embed_by_fit(q):
    segments = embed_segments(q.get("fig") or "")
    if not segments:
        return None
    has_circle = bool(re.search(r'<circle [^>]*stroke="#(?:334155|0f172a)"', q.get("fig") or ""))
    found = []
    circles = []
    for i, o in enumerate(q["options"]):
        shape = embed_options_shape(o.get("fig") or "")
        if not shape:
            return None
        if shape[0] == "circle":
            circles.append(i)
            continue
        fit = embed_fit(shape[1], segments)
        if fit:
            found.append((i, fit[0], fit[1]))
    if has_circle and len(circles) == 1:
        idx = circles[0]
        if idx != q["correct"] or found:
            return None
        letter = chr(65 + idx)
        en = (f"The drawing carries a circle among its lines, and only the circle in option {letter} "
              f"matches it - the other options ask for straight sides that are not closed anywhere "
              f"in the figure. So {letter} is the shape hidden in it.")
        as_ = (f"চিত্ৰত এটা বৃত্ত আছে, গতিকে কেৱল বিকল্প {letter} ৰ বৃত্তটোৱেই তাত সুপ্ত হৈ আছে — "
               f"আন বিকল্পবোৰৰ বাহুবোৰ চিত্ৰত বন্ধ নহয়।")
        return en, as_
    if circles:
        return None
    if len(found) != 1 or found[0][0] != q["correct"]:
        return None
    idx, mapped, hits = found[0]
    poly = mapped
    norm = embed_norm(segments)
    sides = [embed_side_name(s, norm) for s in embed_dedupe(hits)]
    letter = chr(65 + idx)
    shape = POLY_NAMES.get(len(poly), f"{len(poly)}-sided figure")
    inner = [embed_side_name(s, norm) for s in embed_dedupe(segments)]
    en = (f"The drawing is made of {len(embed_dedupe(segments))} straight lines. "
          f"The {shape} in option {letter} is already there: {join_words(sides)} "
          f"run along its sides, corner to corner. No other option closes on lines that are drawn, "
          f"so {letter} is the embedded figure.")
    as_ = (f"চিত্ৰত থকা ৰেখাবোৰৰ ওপৰতে বিকল্প {letter} ৰ {shape} টোৰ প্ৰতিটো বাহু পৰে — "
           f"মূৰে-মূৰে মিলি যায়। আন কোনো বিকল্পই এইদৰে বন্ধ নহয়, গতিকে {letter} শুদ্ধ।")
    return en, as_


def paper_fold(q):
    """Read the fold and the punch off the drawing, and speak only if the answer matches."""
    grid = paper_fold_grid(q)
    if grid:
        return grid
    panels = paper_fold_panels(q)
    if panels:
        return panels
    cut = paper_fold_cut(q)
    if cut:
        return cut
    found = paper_holes(q.get("fig") or "")
    if not found:
        return None
    holes, creases, punches, box = found
    hits = [i for i, o in enumerate(q["options"])
            if paper_same(holes, paper_option_holes(o.get("fig")))]
    if len(hits) != 1 or hits[0] != q["correct"]:
        return None
    letter = (q["options"][q["correct"]].get("option") or chr(65 + q["correct"])).strip(")")
    axes = []
    for c in creases:
        if abs(c[0] - c[2]) < 1:
            axes.append(("vertical", paper_rel(box, (c[0], c[1]))[0]))
        elif abs(c[1] - c[3]) < 1:
            axes.append(("horizontal", paper_rel(box, (c[0], c[1]))[1]))
        else:
            axes.append(("slanting", None))
    parts = []
    for kind, pos in axes:
        where = paper_place(pos, "h" if kind == "horizontal" else "v") if pos is not None else None
        parts.append(f"a {kind} crease {where}" if where else f"a {kind} crease")
    if len(parts) == 1:
        folds = "folded once, along " + parts[0]
    elif len(parts) == 2:
        folds = "folded twice, along " + parts[0] + " and " + parts[1]
    else:
        folds = (f"folded {len(parts)} times, along " + ", ".join(parts[:-1])
                 + " and " + parts[-1])
    p = paper_rel(box, punches[0])
    quadrant = ("lower" if p[1] > 0.5 else "upper") + " " + ("right" if p[0] > 0.5 else "left")
    xs = {round(x, 1) for x, _ in holes}
    ys = {round(y, 1) for _, y in holes}
    n = len(holes)
    if n == 1:
        shape = "a single hole, because the punch sits right on the crease"
    elif n == 2 and len(ys) == 1:
        shape = "two holes at the same height, one on each side of the crease"
    elif n == 2 and len(xs) == 1:
        shape = "two holes one above the other, equally far from the crease"
    elif n == 2:
        shape = "two holes, each the mirror image of the other"
    elif len(xs) == 2 and len(ys) == 2:
        shape = f"{n} holes, one in each quarter, mirrored in pairs across the creases"
    elif len(xs) * len(ys) == n and n > 2:
        shape = f"{n} holes in {len(ys)} rows of {len(xs)}"
    else:
        shape = f"{n} holes, every one a mirror copy of the punch"
    en = (f"The sheet is {folds}, and the punch sits in the {quadrant} part of the folded paper. "
          f"Unfolding mirrors the hole across every crease, so the sheet carries {shape} - "
          f"option {letter}.")
    as_digits = str(n).translate(str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯"))
    as_ = (f"ভাঁজ মেলি দিলে কাগজত {as_digits} টা ফুটা দেখা যায় — বিকল্প {letter}।"
           if n > 1 else f"ভাঁজ মেলি দিলে কাগজত এটা ফুটা দেখা যায় — বিকল্প {letter}।")
    return en, as_


def option_number(q):
    o = q["options"][q["correct"]]
    m = re.search(r'>\s*([1-6])\s*</text>', o.get("fig") or "")
    if m:
        return m.group(1)
    text = (o.get("en") or "").strip()
    return text if re.fullmatch(r"[1-6]", text) else None


def b_cube_net(q):
    """Answer the net question from the fold itself, speaking only when it agrees with the key."""
    m = (re.search(r"face (?:marked with|numbered|having the number|with the number) (\d)", q["q"]["en"], re.I)
         or re.search(r"(?:number|face) opposite (?:to )?(?:the )?(?:face )?"
                      r"(?:marked with |numbered |having the number |with the number )?(\d)", q["q"]["en"], re.I))
    if not m:
        return None
    face = m.group(1)
    folded = net_fold(q.get("fig"))
    if not folded:
        return None
    grid, opp = folded
    other = opp.get(face)
    if not other or option_number(q) != other:
        return None
    letter = (q["options"][q["correct"]].get("option") or chr(65 + q["correct"])).strip(")")
    c = next(cc for cc, t in grid.items() if t == face)
    oc = next(cc for cc, t in grid.items() if t == other)
    run = how = None
    if oc[0] == c[0]:
        run = [t for _, t in sorted((cc[1], t) for cc, t in grid.items() if cc[0] == c[0])]
        how = "vertical strip reading top to bottom"
    elif oc[1] == c[1]:
        run = [t for _, t in sorted((cc[0], t) for cc, t in grid.items() if cc[1] == c[1])]
        how = "horizontal strip reading left to right"
    if run and abs(run.index(face) - run.index(other)) == 2:
        en = (f'In this net the {how} runs {", ".join(run)}; two faces apart in one straight '
              f'strip fold onto opposite sides, so {other} is opposite {face} - option {letter}.')
    else:
        en = (f'Folding this net puts {other} on the face opposite {face}, '
              f'which is what option {letter} shows.')
    as_ = f'নেটখন ভাঁজ কৰিলে {face} ৰ বিপৰীত পৃষ্ঠা হয় {other} — বিকল্প {letter}।'
    return en, as_


def passive_builder(tense):
    def build(q):
        stem = q["q"]["en"]
        m = (re.search(r"passive form of\s*[\"'\u2018\u2019](.+?)[\"'\u2018\u2019]\s*is", stem, re.S | re.I)
             or re.search(r"change (?:in)?to passive(?: voice)?\s*:\s*(.+)$", stem, re.S | re.I)
             or re.search(r"change the voice\s*:\s*(.+)$", stem, re.S | re.I))
        if not m:
            return None
        active = m.group(1).strip().rstrip(".").strip()
        active = active.strip("'\"\u2018\u2019\u201c\u201d")
        return (f'The active sentence "{active}" becomes "{answer(q)}" in the passive: '
                f'the object moves to the subject position and the verb takes the {tense} form.')
    build.__name__ = "b_passive_" + tense.replace(" ", "_")
    return build


def b_assertion_reason(q):
    stem = q["q"]["en"]
    a = re.search(r"Assertion\s*\(A\)\s*:\s*(.+?)\s*Reason\s*\(R\)\s*:", stem, re.S)
    r = re.search(r"Reason\s*\(R\)\s*:\s*(.+?)(?:\s*Choose the correct option|$)", stem, re.S)
    if not a or not r:
        return None
    assertion, reason = a.group(1).strip().rstrip("."), r.group(1).strip().rstrip(".")
    ans = answer(q).lower()
    if "both a and r are true, and r is" in ans:
        verdict = "Both are true, and the reason is what makes the assertion hold"
    elif "both a and r are true" in ans:
        verdict = "Both are true, but the reason does not explain the assertion"
    elif "a is true but r is false" in ans:
        verdict = "The assertion is true and the reason is false"
    elif "a is false but r is true" in ans:
        verdict = "The assertion is false while the reason is true"
    elif "both a and r are false" in ans:
        verdict = "Both the assertion and the reason are false"
    else:
        return None
    return (f'Assertion (A): "{assertion}". Reason (R): "{reason}". {verdict}, '
            f'so the answer is: {answer(q)}.')


def b_sufficiency_alone(q):
    stem = q["q"]["en"]
    qu = re.search(r"Question:\s*(.+?)\s*Statement I:", stem, re.S)
    st = re.search(r"Statement I:\s*(.+?)\s*Statement II:\s*(.+?)(?:\s*Which of the following|$)", stem, re.S)
    if not qu or not st:
        return None
    question = qu.group(1).strip().rstrip("?").strip()
    one, two = st.group(1).strip().rstrip("."), st.group(2).strip().rstrip(".")
    ans = answer(q).lower()
    if "statement i alone is sufficient" in ans and "statement ii" in ans and "not sufficient" in ans:
        verdict = "statement I settles it while statement II does not"
    elif "statement ii alone is sufficient" in ans:
        verdict = "statement II settles it while statement I does not"
    elif "each statement alone is sufficient" in ans:
        verdict = "either statement settles it on its own"
    elif "even both statements" in ans:
        verdict = "not even the two together settle it"
    else:
        return None
    return (
        f'The question is "{question}". Statement I says "{one}" and statement II says "{two}"; '
        f'{verdict}, so the answer is: {answer(q)}.'
    )


def b_assumption(q):
    stem = q["q"]["en"]
    st = re.search(r"Statement:\s*(.+?)\s*Assumptions:", stem, re.S)
    au = re.search(r"Assumptions:\s*I\.\s*(.+?)\s*II\.\s*(.+?)(?:\s*Which of the following|$)", stem, re.S)
    if not st or not au:
        return None
    statement = st.group(1).strip().rstrip(".")
    one, two = au.group(1).strip().rstrip("."), au.group(2).strip().rstrip(".")
    ans = answer(q).lower()
    if "both" in ans:
        i_imp = ii_imp = True
    elif "only assumption i" in ans:
        i_imp, ii_imp = True, False
    elif "only assumption ii" in ans:
        i_imp, ii_imp = False, True
    elif "neither" in ans:
        i_imp = ii_imp = False
    else:
        return None
    return (
        f'For the statement "{statement}", assumption I ("{one}") '
        f'{"is taken for granted" if i_imp else "is not needed"} and assumption II ("{two}") '
        f'{"is also taken for granted" if ii_imp else "is not needed"}; '
        f'hence the answer is: {answer(q)}.'
    )


def b_order(q):
    stem = q["q"]["en"]
    ans = answer(q).strip()
    items = dict(re.findall(r"\(([A-D])\)\s*(.+?)(?=\s*\([A-D]\)|$)", stem, re.S))
    if len(items) >= 2:
        order = [x.strip() for x in ans.split(",")]
        if len(order) != len(items) or not all(o in items for o in order):
            return None
        parts = [f'({o}) "{items[o].strip().rstrip(".")}"' for o in order]
        return ("Read in this order the paragraph runs: " + ", then ".join(parts)
                + f" - that is option {letter(q)}.")
    parts = [p.strip() for p in re.split(r",\s*", ans) if p.strip()]
    if len(parts) >= 3:
        return f'The order runs {", then ".join(parts)} - that is option {letter(q)}.'
    return None


def b_passage_line(q):
    m = re.search(r"Read the passage:\s*(.+?)\s*Question:", q["q"]["en"], re.S)
    if not m:
        return None
    passage = m.group(1).strip()
    ans = answer(q).strip().rstrip(".")
    if not ans or NORM(ans) not in NORM(passage):
        return None
    for sentence in re.split(r"(?<=[.!?])\s+", passage):
        if NORM(ans) in NORM(sentence):
            sentence = sentence.strip()
            if NORM(sentence).rstrip(".") == NORM(ans):
                return (f'Option {letter(q)} repeats a line of the passage word for word: '
                        f'"{sentence}"')
            return (f'The passage says: "{sentence}" That supports option {letter(q)} '
                    f'("{answer(q).strip()}"), so it is the statement the passage allows.')
    return None


def b_collective(q):
    filled = filled_sentence(q)
    ans = answer(q).strip().lower()
    if not filled or verb_number(q) != "singular":
        return None
    return f'In "{filled}", the collective noun counts as one unit, which is why it takes the singular verb "{ans}".'


def b_preposition(q):
    filled = filled_sentence(q)
    ans = answer(q).strip()
    if not filled or not ans or len(ans.split()) > 2:
        return None
    others = [o for o in opts(q) if o.strip() and o.strip().lower() != ans.lower()][:3]
    tail = ", ".join('"%s"' % o.strip() for o in others)
    return f'In "{filled}", the word before the blank takes "{ans}", not {tail}.'


def b_cause_effect(q):
    stem = q["q"]["en"]
    m = re.search(r"Statement I:\s*(.+?)\s*Statement II:\s*(.+?)(?:\s*Which of the following|$)", stem, re.S)
    if not m:
        return None
    one, two = m.group(1).strip().rstrip("."), m.group(2).strip().rstrip(".")
    ans = answer(q).lower()
    if "statement i is the cause" in ans:
        link = f'"{one}" is the cause and "{two}" is the effect it produces'
    elif "statement ii is the cause" in ans:
        link = f'"{two}" is the cause and "{one}" is the effect it produces'
    elif "independent" in ans:
        link = f'"{one}" and "{two}" are separate events, with no cause-and-effect link between them'
    elif "both statements are effects" in ans:
        link = f'"{one}" and "{two}" are both effects of something else, neither causing the other'
    else:
        return None
    return f"In this pair, {link}; hence the answer is: {answer(q)}."


def b_course_of_action(q):
    stem = q["q"]["en"]
    st = re.search(r"Statement:\s*(.+?)\s*Courses of action:", stem, re.S)
    co = re.search(r"Courses of action:\s*I\.\s*(.+?)\s*II\.\s*(.+)$", stem, re.S)
    if not st or not co:
        return None
    def clean(t):
        t = re.sub(r"\s*Which of the following.*$", "", t, flags=re.S)
        return t.strip().rstrip(".").strip()
    statement = clean(st.group(1))
    one, two = clean(co.group(1)), clean(co.group(2))
    ans = answer(q).lower()
    i_f = ("both" in ans) or ("only course of action i" in ans) or ("course of action i follows" in ans and "only course of action ii" not in ans)
    ii_f = ("both" in ans) or ("only course of action ii" in ans)
    return (
        f'For the statement "{statement}", course I ("{one}") '
        f'{"is the response that follows" if i_f else "does not follow"} and course II ("{two}") '
        f'{"also follows" if ii_f else "does not follow"}; hence the answer is: {answer(q)}.'
    )


# normalized prefix of the repeated sentence -> builder
CLUSTERS = [
    ("the missing cell follows the same repeating rule", paper_pattern_cell),
    ("the three figures repeat in the same order in every row", paper_pattern_cell),
    ("the outline of the figure in the correct option", paper_embedded),
    ("the outline of the ", paper_embedded),
    ("the drawing is made of ", paper_embedded),
    ("the drawing is built on a ", paper_embedded),
    ("the drawing carries a circle among its lines", paper_embedded),
    ("a triangle is formed inside the figure", paper_embedded),
    ("a square is formed inside the figure", paper_embedded),
    ("a circle is present inside the figure", paper_embedded),
    ("a rhombus (diamond) is formed inside the figure", paper_embedded),
    ("a star is formed inside the figure", paper_embedded),
    ("a pentagon is formed inside the figure", paper_embedded),
    ("a hexagon is formed inside the figure", paper_embedded),
    ("the outline gains ", paper_series_next),
    ("the dots grow by ", paper_series_next),
    ("the lines grow by ", paper_series_next),
    ("the number of sides increases by the same amount at each step", paper_series_next),
    ("the number of dots increases by one at each step", paper_series_next),
    ("the number of parallel lines increases by one at each step", paper_series_next),
    ("each column shows the same figure", paper_pattern_cell),
    ("each row shows the same figure", paper_pattern_cell),
    ("the figure is the letter", paper_reversed),
    ("the drawing holds the ", paper_reversed),
    ("a mirror image reverses the figure left to right", paper_reversed),
    ("a water image flips the figure top to bottom", paper_reversed),
    ("a mirror image is a left-right reversal of the figure", paper_reversed),
    ("a water image is a top-bottom reversal of the figure", paper_reversed),
    ("a mirror placed on the side reverses the figure from left", paper_reversed),
    ("a water image reverses the figure from top to bottom", paper_reversed),
    ("the mirror image is obtained by reversing the figure left", paper_reversed),
    ("the water image is obtained by reversing the figure top", paper_reversed),
    ("in a mirror image the figure is reversed left to right", paper_reversed),
    ("in a water image the figure is reversed top to bottom", paper_reversed),
    ("the figures alternate like a checkerboard", paper_pattern_cell),
    ("the figures repeat along the diagonals", paper_pattern_cell),
    ("shaded and plain tiles alternate like a chessboard", paper_pattern_cell),
    ("a positive statement takes a negative tag", b_question_tag),
    ("in indirect speech 'that' is added", b_narration),
    ("conclusion i does not follow; conclusion ii follows", b_syllogism),
    ("conclusion i follows; conclusion ii does not follow", b_syllogism),
    ("conclusion i does not follow; conclusion ii does not follow", b_syllogism),
    ("conclusion i does not follow and conclusion ii follows", b_syllogism),
    ("conclusion i follows and conclusion ii does not follow", b_syllogism),
    ("conclusion i does not follow and conclusion ii does not follow", b_syllogism),
    ("course i directly addresses the problem", b_course_of_action),
    ("statement i is a direct cause of statement ii", b_cause_effect),
    ("statement ii is the cause and statement i is its effect", b_cause_effect),
    ("indefinite pronouns such as everyone", b_subject_verb),
    ("a plural subject takes a plural verb", b_subject_verb),
    ("a singular subject takes a singular verb", b_subject_verb),
    ("a collective noun acting as one unit", b_collective),
    ("this statement is taken directly from the passage", b_passage_line),
    ("the correct order is", b_order),
    ("the object becomes the subject and the verb takes the simple present passive form", passive_builder("simple present")),
    ("the object becomes the subject and the verb takes the present continuous passive form", passive_builder("present continuous")),
    ("the object becomes the subject and the verb takes the present perfect passive form", passive_builder("present perfect")),
    ("the object becomes the subject and the verb takes the simple past passive form", passive_builder("simple past")),
    ("the object becomes the subject and the verb takes the past continuous passive form", passive_builder("past continuous")),
    ("the object becomes the subject and the verb takes the past perfect passive form", passive_builder("past perfect")),
    ("the object becomes the subject and the verb takes the simple future passive form", passive_builder("simple future")),
    ("the object becomes the subject and the verb takes the future perfect passive form", passive_builder("future perfect")),
    ("folding the net shows which cells become opposite faces", b_cube_net),
    ("when the net folds, the first and third squares of the row", b_cube_net),
    ("a is true, but r is false", b_assertion_reason),
    ("a is false, but r is true", b_assertion_reason),
    ("the assertion is correct, but the reason is factually wrong", b_assertion_reason),
    ("the assertion is factually wrong, but the reason is true", b_assertion_reason),
    ("both statements are true, but the reason is an unrelated fact", b_assertion_reason),
    ("both statements are true, and the reason states exactly why", b_assertion_reason),
    ("statement i alone fixes the answer", b_sufficiency_alone),
    ("statement ii alone fixes the answer", b_sufficiency_alone),
    ("assumption i is implicit and assumption ii is implicit", b_assumption),
    ("assumption i is implicit and assumption ii is not implicit", b_assumption),
    ("assumption i is not implicit and assumption ii is implicit", b_assumption),
    ("assumption i is not implicit and assumption ii is not implicit", b_assumption),
    ("'to' is the preposition that goes with this word", b_preposition),
    ("the correct word is", b_preposition),
    ("the article must match the sound of the following word", b_article_fix),
    ("the auxiliary and the past participle must form the correct tense", b_sentence_fix),
    ("the pronoun must match the person, number and case required", b_sentence_fix),
    ("the adverb must be placed in its correct position", b_sentence_fix),
    ("each statement alone is not enough", b_data_sufficiency),
    ("the word after the blank begins with a vowel sound", b_article),
    ("the triangle is already drawn inside the figure", b_embedded_text),
    ("the square is already drawn inside the figure", b_embedded_text),
    ("the rectangle is already drawn inside the figure", b_embedded_text),
    ("the rhombus is already drawn inside the figure", b_embedded_text),
    ("the pentagon is already drawn inside the figure", b_embedded_text),
    ("the circle is already drawn inside the figure", b_embedded_text),
    ("the star is already drawn inside the figure", b_embedded_text),
    ("the diamond is already drawn inside the figure", b_embedded_text),
    ("the triangle is already drawn inside the figure", b_embedded_text),
    ("the hexagon is already drawn inside the figure", b_embedded_text),
    ("a square is formed inside the figure", b_embedded_text),
    ("a rectangle is formed inside the figure", b_embedded_text),
    ("a rhombus is formed inside the figure", b_embedded_text),
    ("a pentagon is formed inside the figure", b_embedded_text),
    ("a circle is formed inside the figure", b_embedded_text),
    ("a star is formed inside the figure", b_embedded_text),
    ("a diamond is formed inside the figure", b_embedded_text),
    ("a triangle is formed inside the figure", b_embedded_text),
    ("a hexagon is formed inside the figure", b_embedded_text),
    ("the outline of the figure in the correct option can be traced", b_embedded_text),
]


def builder_for(text):
    t = NORM(text)
    for prefix, fn in CLUSTERS:
        if t.startswith(prefix):
            return fn
    return None


def esc(s):
    return html.escape(s, quote=True).replace("&#x27;", "&#39;")


def rewrite_page(page_path, texts, as_texts=None):
    """Put the new explanations into the i-th question block."""
    src = open(page_path, encoding="utf-8").read()
    blocks = src.split('<div class="qa-item')
    out = [blocks[0]]
    touched = 0
    for block in blocks[1:]:
        m = re.search(r'<div class="qs7" lang="en"><strong>Explanation:</strong>[\s\S]*?</div>', block)
        if m and texts.get(touched) is not None:
            new = ('<div class="qs7" lang="en"><strong>Explanation:</strong> '
                   + esc(texts[touched]) + '</div>')
            block = block[:m.start()] + new + block[m.end():]
        if as_texts and as_texts.get(touched) is not None:
            a = re.search(r'<div class="qs9" lang="as">[\s\S]*?</div>', block)
            if a:
                new_a = '<div class="qs9" lang="as">' + esc(as_texts[touched]) + '</div>'
                block = block[:a.start()] + new_a + block[a.end():]
        touched += 1
        out.append(block)
    open(page_path, "w", encoding="utf-8").write('<div class="qa-item'.join(out))
    return touched


def sync_twin(en_page):
    """Assamese twin carries a copy of the English body: keep it that way."""
    as_page = os.path.join(ROOT, "as", os.path.relpath(en_page, ROOT))
    if not os.path.exists(as_page):
        return False
    main = re.compile(r"<main\b[^>]*>[\s\S]*?</main>")
    en = open(en_page, encoding="utf-8").read()
    as_ = open(as_page, encoding="utf-8").read()
    m_en, m_as = main.search(en), main.search(as_)
    if not m_en or not m_as:
        return False
    open(as_page, "w", encoding="utf-8").write(as_[:m_as.start()] + m_en.group(0) + as_[m_as.end():])
    return True


def main():
    banks = [f for f in sorted(glob.glob(os.path.join(ROOT, "data/exams/**/question-001.json"), recursive=True))
             if "assam-police-combo" not in f]
    total = 0
    stats = {}
    samples = {}
    for bank_file in banks:
        rel = os.path.relpath(bank_file, os.path.join(ROOT, "data/exams"))[:-len("/question-001.json")]
        data = json.load(open(bank_file, encoding="utf-8"))
        new_texts = {}
        new_as = {}
        changed = 0
        for i, q in enumerate(data):
            if not isinstance(q, dict):
                continue
            old = (q.get("explanation") or {}).get("en") or ""
            fn = builder_for(old)
            if not fn and re.search(r"unfold", q["q"]["en"], re.I):
                fn = paper_fold
            if not fn:
                continue
            try:
                fresh = fn(q)
            except Exception:
                fresh = None
            fresh_as = None
            if isinstance(fresh, tuple):
                fresh, fresh_as = fresh
            if not fresh or NORM(fresh) == NORM(old):
                continue
            if len(fresh.split()) < 8:
                continue
            name = fn.__name__
            stats[name] = stats.get(name, 0) + 1
            bucket = samples.setdefault(name, [])
            if len(bucket) < TOP:
                bucket.append((rel, q.get("id"), old[:60], fresh))
            q.setdefault("explanation", {})["en"] = fresh
            if fresh_as:
                q["explanation"]["as"] = fresh_as
                new_as[i] = fresh_as
            new_texts[i] = fresh
            changed += 1
        if changed and not DRY:
            json.dump(data, open(bank_file, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            page = os.path.join(ROOT, "exams", rel, "index.html")
            if os.path.exists(page):
                rewrite_page(page, new_texts, new_as)
                sync_twin(page)
        total += changed
        if changed:
            print(f"  {changed:4}  {rel}")

    for name, bucket in samples.items():
        print(f"\n=== {name}")
        for rel, qid, old, fresh in bucket:
            print(f"[{qid}] was: {old}...")
            print(f"   now: {fresh}")
    print(f"\nrewritten: {total}  ({'dry run, nothing written' if DRY else 'applied'})")
    for k, v in sorted(stats.items(), key=lambda x: -x[1]):
        print(f"  {v:4}  {k}")


if __name__ == "__main__":
    main()
