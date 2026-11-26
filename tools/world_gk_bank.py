#!/usr/bin/env python3
"""Row builder for the world-GK source parts (tools/world-gk-src/*.json)."""

import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "tools", "world-gk-src")


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", str(s).lower()).strip()


def existing_stems():
    stems = set()
    for name in sorted(os.listdir(SRC)):
        if not name.endswith(".json"):
            continue
        for row in json.load(open(os.path.join(SRC, name))):
            stems.add(norm(row[0]))
    return stems


class Rows:
    def __init__(self):
        self.rows = []
        self.seen = existing_stems()

    def add(self, q_en, q_as, opts, correct, exp_en, exp_as):
        if norm(q_en) in self.seen:
            return False
        self.seen.add(norm(q_en))
        o = [[en, as_] for en, as_ in opts]
        self.rows.append([q_en, q_as, o[0], o[1], o[2], o[3], correct, exp_en, exp_as])
        return True

    def attr(self, table, stem_en, stem_as, exp_en, exp_as, tails=None, step=7):
        """table rows: (entity_en, entity_as, value_en, value_as)."""
        values = [(r[2], r[3]) for r in table]
        for i, (e_en, e_as, v_en, v_as) in enumerate(table):
            opts = [(v_en, v_as)]
            k = 1
            while len(opts) < 4 and k < 4 * len(values):
                cand = values[(i + k * step) % len(values)]
                k += 1
                if cand[0] != v_en and all(c[0] != cand[0] for c in opts):
                    opts.append(cand)
            tail = tails[i % len(tails)] if tails else ""
            self.add(stem_en.format(e=e_en), stem_as.format(e=e_as), opts, 0,
                     exp_en.format(e=e_en, v=v_en) + tail,
                     exp_as.format(e=e_as, v=v_as))

    def write(self, name):
        path = os.path.join(SRC, name)
        with open(path, "w") as fh:
            json.dump(self.rows, fh, ensure_ascii=False, indent=1)
            fh.write("\n")
        print(f"{name}: {len(self.rows)} rows")
