#!/usr/bin/env python3
"""Degrees of Comparison: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "degrees-of-comparison"

ADJ = [
    ("tall", "taller", "tallest"), ("short", "shorter", "shortest"),
    ("big", "bigger", "biggest"), ("small", "smaller", "smallest"),
    ("fast", "faster", "fastest"), ("slow", "slower", "slowest"),
    ("strong", "stronger", "strongest"), ("weak", "weaker", "weakest"),
    ("happy", "happier", "happiest"), ("sad", "sadder", "saddest"),
    ("rich", "richer", "richest"), ("poor", "poorer", "poorest"),
    ("young", "younger", "youngest"), ("old", "older", "oldest"),
    ("wise", "wiser", "wisest"), ("kind", "kinder", "kindest"),
    ("brave", "braver", "bravest"), ("clever", "cleverer", "cleverest"),
    ("beautiful", "more beautiful", "most beautiful"),
    ("useful", "more useful", "most useful"),
    ("careful", "more careful", "most careful"),
    ("difficult", "more difficult", "most difficult"),
    ("important", "more important", "most important"),
    ("interesting", "more interesting", "most interesting"),
    ("comfortable", "more comfortable", "most comfortable"),
    ("expensive", "more expensive", "most expensive"),
    ("intelligent", "more intelligent", "most intelligent"),
    ("popular", "more popular", "most popular"),
    ("famous", "more famous", "most famous"),
    ("dangerous", "more dangerous", "most dangerous"),
    ("delicious", "more delicious", "most delicious"),
    ("wonderful", "more wonderful", "most wonderful"),
    ("honest", "more honest", "most honest"),
    ("polite", "politer", "politest"),
    ("simple", "simpler", "simplest"),
    ("modern", "more modern", "most modern"),
    ("active", "more active", "most active"),
    ("attractive", "more attractive", "most attractive"),
    ("creative", "more creative", "most creative"),
    ("generous", "more generous", "most generous"),
    ("confident", "more confident", "most confident"),
    ("patient", "more patient", "most patient"),
    ("gentle", "gentler", "gentlest"),
    ("narrow", "narrower", "narrowest"),
    ("deep", "deeper", "deepest"),
    ("high", "higher", "highest"),
    ("low", "lower", "lowest"),
    ("long", "longer", "longest"),
]

IRREG = [
    ("good", "better", "best"), ("bad", "worse", "worst"),
    ("many", "more", "most"), ("much", "more", "most"),
    ("little", "less", "least"), ("far", "farther", "farthest"),
    ("old", "elder", "eldest"), ("late", "later", "latest"),
    ("near", "nearer", "nearest"), ("well", "better", "best"),
]

rows = []


def q(stem, correct, dists, exp_en, exp_as):
    rows.append({
        "stem": stem,
        "stem_as": "শুদ্ধ বিকল্প বাছনি কৰা: " + stem,
        "correct": (correct, correct),
        "dists": [(d, d) for d in dists],
        "exp_en": exp_en,
        "exp_as": exp_as,
    })


def comp_dists(pos, comp, sup):
    if comp.startswith("more "):
        return [pos, sup, pos + "er"]
    return [pos, sup, "more " + pos]


def sup_dists(pos, comp, sup):
    if sup.startswith("most "):
        return [comp, pos, pos + "est"]
    return [comp, pos, "most " + pos]


for pos, comp, sup in ADJ:
    q(f"The comparative degree of '{pos}' is ___.", comp, comp_dists(pos, comp, sup),
      f"The comparative degree of '{pos}' is '{comp}'.",
      f"'{pos}' ৰ তুলনামূলক ৰূপ '{comp}'।")
    q(f"The superlative degree of '{pos}' is ___.", sup, sup_dists(pos, comp, sup),
      f"The superlative degree of '{pos}' is '{sup}'.",
      f"'{pos}' ৰ অতিশয় ৰূপ '{sup}'।")

for pos, comp, sup in IRREG:
    q(f"The comparative degree of '{pos}' is ___.", comp, comp_dists(pos, comp, sup),
      f"'{pos}' is irregular: its comparative form is '{comp}'.",
      f"'{pos}' অপ্ৰত্যয়ী: ইয়াৰ তুলনামূলক ৰূপ '{comp}'।")
    q(f"The superlative degree of '{pos}' is ___.", sup, sup_dists(pos, comp, sup),
      f"'{pos}' is irregular: its superlative form is '{sup}'.",
      f"'{pos}' অপ্ৰত্যয়ী: ইয়াৰ অতিশয় ৰূপ '{sup}'।")

for pos, comp, sup in ADJ[:30]:
    q(f"Choose the correct comparative form of '{pos}': She is ___ than her sister.", comp,
      [pos, sup, "more " + comp if not comp.startswith("more") else comp + "er"],
      f"The comparative '{comp}' is used with 'than'.",
      f"'than' ৰ সৈতে তুলনামূলক ৰূপ '{comp}' ব্যৱহাৰ হয়।")
    q(f"Choose the correct superlative form of '{pos}': She is the ___ girl in the class.", sup,
      [comp, pos, "most " + sup if not sup.startswith("most") else sup + "est"],
      f"The superlative '{sup}' is used with 'the' for one among many.",
      f"অনেকৰ ভিতৰত এজনীক সূচাবলৈ 'the' ৰ সৈতে অতিশয় ৰূপ '{sup}' ব্যৱহাৰ হয়।")

append(LEAF, rows)
