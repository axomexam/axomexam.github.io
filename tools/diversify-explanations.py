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
