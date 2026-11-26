#!/usr/bin/env python3
"""Venn Diagrams: 80+ very hard bilingual questions (set arithmetic)."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


TWO = [
    ("Cricket", "ক্ৰিকেট", "Football", "ফুটবল", 60, 35, 30, 12),
    ("Tea", "চাহ", "Coffee", "কফি", 80, 45, 40, 15),
    ("Maths", "গণিত", "Science", "বিজ্ঞান", 50, 32, 28, 10),
    ("Hindi", "হিন্দী", "English", "ইংৰাজী", 70, 38, 34, 14),
    ("Singing", "গান গোৱা", "Dancing", "নাচা", 45, 26, 24, 8),
    ("Chess", "দবা", "Carrom", "কেৰম", 55, 30, 25, 9),
]

for a_en, a_as, b_en, b_as, N, a, b, both in TWO:
    union = a + b - both
    only_a = a - both
    neither = N - union
    exactly_one = union - both
    add(f"In a group of {N} students, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like at least one of the two?",
        f"{as_num(N)} জন ছাত্ৰৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। কমেও এটাই ভাল পোৱা ছাত্ৰ কিমান?",
        union, [union + 2, union - 2, a + b],
        f"At least one = {a} + {b} - {both} = {union}.",
        f"কমেও এটা = {as_num(a)} + {as_num(b)} - {as_num(both)} = {as_num(union)}।")
    add(f"In a group of {N} students, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like only {a_en}?",
        f"{as_num(N)} জন ছাত্ৰৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। কেৱল {a_as} ভাল পোৱা ছাত্ৰ কিমান?",
        only_a, [a, only_a + both, only_a + 2],
        f"Only {a_en} = {a} - {both} = {only_a}.",
        f"কেৱল {a_as} = {as_num(a)} - {as_num(both)} = {as_num(only_a)}।")
    add(f"In a group of {N} students, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like neither?",
        f"{as_num(N)} জন ছাত্ৰৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। এটাও ভাল নোপোৱা ছাত্ৰ কিমান?",
        neither, [N - a - b, neither + 2, neither - 2],
        f"Neither = {N} - ({a} + {b} - {both}) = {neither}.",
        f"এটাও নহয় = {as_num(N)} - {as_num(union)} = {as_num(neither)}।")
    add(f"In a group of {N} students, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like exactly one subject?",
        f"{as_num(N)} জন ছাত্ৰৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। কেৱল এটা বিষয় ভাল পোৱা ছাত্ৰ কিমান?",
        exactly_one, [union, exactly_one + 2, a + b],
        f"Exactly one = ({a} - {both}) + ({b} - {both}) = {exactly_one}.",
        f"কেৱল এটা = {as_num(exactly_one)}।")

THREE = [
    ("Physics", "পদাৰ্থবিজ্ঞান", "Chemistry", "ৰসায়ন", "Maths", "গণিত", 100, 50, 45, 40, 15, 12, 10, 5),
    ("Tea", "চাহ", "Coffee", "কফি", "Milk", "গাখীৰ", 120, 60, 50, 45, 20, 15, 12, 6),
    ("Cricket", "ক্ৰিকেট", "Football", "ফুটবল", "Hockey", "হকী", 90, 45, 40, 35, 12, 10, 8, 4),
    ("English", "ইংৰাজী", "Hindi", "হিন্দী", "Assamese", "অসমীয়া", 110, 55, 50, 48, 18, 16, 14, 7),
]

for a_en, a_as, b_en, b_as, c_en, c_as, N, a, b, c, ab, bc, ca, abc in THREE:
    union = a + b + c - ab - bc - ca + abc
    only_a = a - ab - ca + abc
    none = N - union
    exactly_two = ab + bc + ca - 3 * abc
    add(f"In a class of {N} students, {a} study {a_en}, {b} study {b_en}, {c} study {c_en}, {ab} study {a_en} and {b_en}, {bc} study {b_en} and {c_en}, {ca} study {c_en} and {a_en}, and {abc} study all three. How many study at least one?",
        f"{as_num(N)} জন ছাত্ৰৰ শ্ৰেণীত {as_num(a)} জনে {a_as} পঢ়ে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা পঢ়ে। কমেও এটা পঢ়া ছাত্ৰ কিমান?",
        union, [union + 3, union - 3, a + b + c],
        f"Union = {a}+{b}+{c}-{ab}-{bc}-{ca}+{abc} = {union}.",
        f"সংযোগ = {as_num(union)}।")
    add(f"In a class of {N} students, {a} study {a_en}, {b} study {b_en}, {c} study {c_en}, {ab} study {a_en} and {b_en}, {bc} study {b_en} and {c_en}, {ca} study {c_en} and {a_en}, and {abc} study all three. How many study only {a_en}?",
        f"{as_num(N)} জন ছাত্ৰৰ শ্ৰেণীত {as_num(a)} জনে {a_as} পঢ়ে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা পঢ়ে। কেৱল {a_as} পঢ়া ছাত্ৰ কিমান?",
        only_a, [only_a + 2, only_a - 2, a],
        f"Only {a_en} = {a} - {ab} - {ca} + {abc} = {only_a}.",
        f"কেৱল {a_as} = {as_num(only_a)}।")
    add(f"In a class of {N} students, {a} study {a_en}, {b} study {b_en}, {c} study {c_en}, {ab} study {a_en} and {b_en}, {bc} study {b_en} and {c_en}, {ca} study {c_en} and {a_en}, and {abc} study all three. How many study none of the three?",
        f"{as_num(N)} জন ছাত্ৰৰ শ্ৰেণীত {as_num(a)} জনে {a_as} পঢ়ে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা পঢ়ে। এটাও নপঢ়া ছাত্ৰ কিমান?",
        none, [none + 2, none - 2, union],
        f"None = {N} - {union} = {none}.",
        f"এটাও নহয় = {as_num(N)} - {as_num(union)} = {as_num(none)}।")
    add(f"In a class of {N} students, {a} study {a_en}, {b} study {b_en}, {c} study {c_en}, {ab} study {a_en} and {b_en}, {bc} study {b_en} and {c_en}, {ca} study {c_en} and {a_en}, and {abc} study all three. How many study exactly two subjects?",
        f"{as_num(N)} জন ছাত্ৰৰ শ্ৰেণীত {as_num(a)} জনে {a_as} পঢ়ে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা পঢ়ে। কেৱল দুটা বিষয় পঢ়া ছাত্ৰ কিমান?",
        exactly_two, [ab + bc + ca, exactly_two + 3, exactly_two - 3],
        f"Exactly two = {ab}+{bc}+{ca} - 3×{abc} = {exactly_two}.",
        f"কেৱল দুটা = {as_num(exactly_two)}।")

TWO2 = [
    ("Apple", "আপেল", "Mango", "আম", 75, 42, 36, 18),
    ("Cycling", "চাইকেল চলোৱা", "Swimming", "সাঁতৰা", 65, 34, 30, 11),
    ("History", "ইতিহাস", "Geography", "ভূগোল", 58, 31, 27, 13),
    ("Painting", "চিত্ৰ আঁকা", "Music", "সংগীত", 52, 29, 25, 7),
    ("Coffee", "কফি", "Juice", "জুচ", 88, 47, 39, 16),
    ("Badminton", "বেডমিণ্টন", "Tennis", "টেনিছ", 48, 27, 22, 6),
    ("Biology", "জীৱবিজ্ঞান", "Physics", "পদাৰ্থবিজ্ঞান", 72, 40, 33, 17),
    ("Walking", "খোজ কঢ়া", "Jogging", "দৌৰা", 62, 36, 28, 12),
]
for a_en, a_as, b_en, b_as, N, a, b, both in TWO2:
    union = a + b - both
    only_a = a - both
    neither = N - union
    exactly_one = union - both
    add(f"In a group of {N} people, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like at least one?",
        f"{as_num(N)} জনৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। কমেও এটাই ভাল পোৱা লোক কিমান?",
        union, [union + 2, union - 2, a + b],
        f"At least one = {a} + {b} - {both} = {union}.",
        f"কমেও এটা = {as_num(union)}।")
    add(f"In a group of {N} people, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like only {b_en}?",
        f"{as_num(N)} জনৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। কেৱল {b_as} ভাল পোৱা লোক কিমান?",
        b - both, [b, b - both + 2, b + both],
        f"Only {b_en} = {b} - {both} = {b-both}.",
        f"কেৱল {b_as} = {as_num(b-both)}।")
    add(f"In a group of {N} people, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like neither?",
        f"{as_num(N)} জনৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। এটাও ভাল নোপোৱা লোক কিমান?",
        neither, [N - a - b, neither + 2, neither - 2],
        f"Neither = {N} - {union} = {neither}.",
        f"এটাও নহয় = {as_num(neither)}।")
    add(f"In a group of {N} people, {a} like {a_en}, {b} like {b_en} and {both} like both. How many like exactly one?",
        f"{as_num(N)} জনৰ ভিতৰত {as_num(a)} জনে {a_as} ভাল পায়, {as_num(b)} জনে {b_as} ভাল পায় আৰু {as_num(both)} জনে দুয়োটাই ভাল পায়। কেৱল এটাই ভাল পোৱা লোক কিমান?",
        exactly_one, [union, exactly_one + 2, a + b],
        f"Exactly one = {a} + {b} - 2×{both} = {exactly_one}.",
        f"কেৱল এটা = {as_num(exactly_one)}।")

THREE2 = [
    ("Apple", "আপেল", "Banana", "কল", "Mango", "আম", 130, 65, 58, 52, 22, 18, 16, 8),
    ("Reading", "পঢ়া", "Writing", "লিখা", "Speaking", "কোৱা", 95, 48, 42, 38, 16, 14, 12, 6),
    ("Cats", "মেকুৰী", "Dogs", "কুকুৰ", "Birds", "চৰাই", 85, 40, 38, 32, 12, 10, 9, 4),
    ("Rice", "ভাত", "Dal", "দাইল", "Curry", "তৰকাৰী", 140, 70, 62, 58, 24, 20, 18, 9),
    ("Red", "ৰঙা", "Blue", "নীলা", "Green", "সেউজীয়া", 105, 52, 46, 41, 17, 14, 13, 6),
    ("Train", "ৰে'ল", "Bus", "বাছ", "Flight", "বিমান", 150, 72, 65, 55, 26, 22, 19, 10),
]
for a_en, a_as, b_en, b_as, c_en, c_as, N, a, b, c, ab, bc, ca, abc in THREE2:
    union = a + b + c - ab - bc - ca + abc
    only_a = a - ab - ca + abc
    none = N - union
    exactly_two = ab + bc + ca - 3 * abc
    add(f"In a survey of {N} people, {a} use {a_en}, {b} use {b_en}, {c} use {c_en}, {ab} use {a_en} and {b_en}, {bc} use {b_en} and {c_en}, {ca} use {c_en} and {a_en}, and {abc} use all three. How many use at least one?",
        f"{as_num(N)} জনৰ সমীক্ষাত {as_num(a)} জনে {a_as} ব্যৱহাৰ কৰে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা ব্যৱহাৰ কৰে। কমেও এটা ব্যৱহাৰ কৰা লোক কিমান?",
        union, [union + 3, union - 3, a + b + c],
        f"Union = {union}.",
        f"সংযোগ = {as_num(union)}।")
    add(f"In a survey of {N} people, {a} use {a_en}, {b} use {b_en}, {c} use {c_en}, {ab} use {a_en} and {b_en}, {bc} use {b_en} and {c_en}, {ca} use {c_en} and {a_en}, and {abc} use all three. How many use none?",
        f"{as_num(N)} জনৰ সমীক্ষাত {as_num(a)} জনে {a_as} ব্যৱহাৰ কৰে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা ব্যৱহাৰ কৰে। এটাও ব্যৱহাৰ নকৰা লোক কিমান?",
        none, [none + 2, none - 2, union],
        f"None = {N} - {union} = {none}.",
        f"এটাও নহয় = {as_num(none)}।")
    add(f"In a survey of {N} people, {a} use {a_en}, {b} use {b_en}, {c} use {c_en}, {ab} use {a_en} and {b_en}, {bc} use {b_en} and {c_en}, {ca} use {c_en} and {a_en}, and {abc} use all three. How many use only {a_en}?",
        f"{as_num(N)} জনৰ সমীক্ষাত {as_num(a)} জনে {a_as} ব্যৱহাৰ কৰে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা ব্যৱহাৰ কৰে। কেৱল {a_as} ব্যৱহাৰ কৰা লোক কিমান?",
        only_a, [only_a + 2, only_a - 2, a],
        f"Only {a_en} = {a} - {ab} - {ca} + {abc} = {only_a}.",
        f"কেৱল {a_as} = {as_num(only_a)}।")
    add(f"In a survey of {N} people, {a} use {a_en}, {b} use {b_en}, {c} use {c_en}, {ab} use {a_en} and {b_en}, {bc} use {b_en} and {c_en}, {ca} use {c_en} and {a_en}, and {abc} use all three. How many use exactly two?",
        f"{as_num(N)} জনৰ সমীক্ষাত {as_num(a)} জনে {a_as} ব্যৱহাৰ কৰে, {as_num(b)} জনে {b_as}, {as_num(c)} জনে {c_as}, {as_num(ab)} জনে {a_as} আৰু {b_as}, {as_num(bc)} জনে {b_as} আৰু {c_as}, {as_num(ca)} জনে {c_as} আৰু {a_as}, আৰু {as_num(abc)} জনে তিনিওটা ব্যৱহাৰ কৰে। কেৱল দুটা ব্যৱহাৰ কৰা লোক কিমান?",
        exactly_two, [ab + bc + ca, exactly_two + 3, exactly_two - 3],
        f"Exactly two = {ab}+{bc}+{ca} - 3×{abc} = {exactly_two}.",
        f"কেৱল দুটা = {as_num(exactly_two)}।")

append("venn-diagrams", rows)
