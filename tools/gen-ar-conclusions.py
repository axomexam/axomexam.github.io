#!/usr/bin/env python3
"""Statement & Conclusions: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi, as_num

rows = []


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


OPTS = [("Only conclusion I follows", "কেৱল সিদ্ধান্ত I অনুসৰণ কৰে"),
        ("Only conclusion II follows", "কেৱল সিদ্ধান্ত II অনুসৰণ কৰে"),
        ("Both conclusions follow", "দুয়োটা সিদ্ধান্ত অনুসৰণ কৰে"),
        ("Neither conclusion follows", "কোনো সিদ্ধান্তই অনুসৰণ নকৰে")]

DATA = [
    (400, 240, "boys", "ল'ৰা", "school", "বিদ্যালয়"),
    (500, 300, "girls", "ছোৱালী", "college", "মহাবিদ্যালয়"),
    (250, 100, "teachers", "শিক্ষক", "institute", "প্ৰতিষ্ঠান"),
    (600, 600, "graduates", "স্নাতক", "office", "কাৰ্যালয়"),
    (320, 96, "doctors", "চিকিৎসক", "hospital", "চিকিৎসালয়"),
    (450, 270, "farmers", "কৃষক", "village", "গাঁও"),
    (800, 200, "engineers", "অভিযন্তা", "company", "কোম্পানী"),
    (150, 150, "players", "খেলুৱৈ", "academy", "একাডেমী"),
    (280, 140, "singers", "গায়ক", "group", "দল"),
    (360, 90, "writers", "লেখক", "club", "ক্লাব"),
    (240, 180, "scientists", "বিজ্ঞানী", "lab", "গৱেষণাগাৰ"),
    (500, 125, "artists", "শিল্পী", "studio", "ষ্টুডিঅ'"),
]


def concl_set(N, k, x_en, x_as):
    pct = k * 100 // N
    exact_pct = (k * 100) % N == 0
    out = []
    out.append((f"Most of them are {x_en}.", f"তেওঁলোকৰ অধিকাংশই {x_as}।", k * 2 > N))
    out.append((f"All of them are {x_en}.", f"তেওঁলোক সকলোৱেই {x_as}।", k == N))
    out.append((f"At least some of them are {x_en}.", f"তেওঁলোকৰ অন্ততঃ কিছু {x_as}।", k > 0))
    out.append((f"None of them is {x_en}.", f"তেওঁলোকৰ কোনেও {x_as} নহয়।", k == 0))
    out.append((f"More than half of them are not {x_en}.",
                f"তেওঁলোকৰ অৰ্ধেকতকৈ অধিক {x_as} নহয়।", k * 2 < N))
    out.append((f"Exactly {pct}% of them are {x_en}.",
                f"তেওঁলোকৰ ঠিক {as_num(pct)}% {x_as}।", exact_pct))
    out.append((f"Only a few of them are {x_en}.",
                f"তেওঁলোকৰ কেৱল অলপ {x_as}।", k * 4 < N))
    return out


PAIRS = [(0, 1), (0, 4), (2, 3), (5, 0), (6, 0), (1, 2), (0, 2), (4, 5), (3, 0), (6, 2)]

cands_all = []
for N, k, x_en, x_as, place_en, place_as in DATA:
    cs = concl_set(N, k, x_en, x_as)
    for i, j in PAIRS:
        c1, c2 = cs[i], cs[j]
        v1, v2 = c1[2], c2[2]
        idx = 2 if (v1 and v2) else 0 if v1 else 1 if v2 else 3
        st_en = f"Statement: In a {place_en} with {N} members, {k} are {x_en}."
        st_as = f"বিবৃতি: {place_as} ত {as_num(N)} জন সদস্যৰ ভিতৰত {as_num(k)} জন {x_as}।"
        stem_en = f"{st_en} Conclusions: I. {c1[0]} II. {c2[0]}"
        stem_as = f"{st_as} সিদ্ধান্ত: I. {c1[1]} II. {c2[1]}"
        cands_all.append((idx, stem_en, stem_as, OPTS[idx][0], OPTS[idx][1],
                          [o for o in OPTS if o[0] != OPTS[idx][0]],
                          f"Conclusion I {'follows' if v1 else 'does not follow'} and conclusion II "
                          f"{'follows' if v2 else 'does not follow'}. Hence: {OPTS[idx][0]}.",
                          f"সিদ্ধান্ত I {'অনুসৰণ কৰে' if v1 else 'অনুসৰণ নকৰে'}, সিদ্ধান্ত II "
                          f"{'অনুসৰণ কৰে' if v2 else 'অনুসৰণ নকৰে'}। সেয়ে: {OPTS[idx][1]}।"))

valid_items = [c for c in cands_all if c[0] != 3]
neither = [c for c in cands_all if c[0] == 3][:18]
for item in valid_items[:70] + neither:
    add(*item[1:])

append_bi("statement-conclusions", rows)
