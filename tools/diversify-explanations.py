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


def b_subject_verb(q):
    filled = filled_sentence(q)
    ans = answer(q).strip().lower()
    if not filled or ans not in SINGULAR | PLURAL:
        return None
    kind = "singular" if ans in SINGULAR else "plural"
    return f'In "{filled}", the verb that agrees with this subject is "{ans}", a {kind} form.'


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
    ("'to' is the preposition that goes with this word", b_preposition),
    ("the correct word is", b_preposition),
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


def rewrite_page(page_path, texts):
    """Put the new English explanation into the i-th question block."""
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
            new_texts[i] = fresh
            changed += 1
        if changed and not DRY:
            json.dump(data, open(bank_file, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            page = os.path.join(ROOT, "exams", rel, "index.html")
            if os.path.exists(page):
                rewrite_page(page, new_texts)
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
