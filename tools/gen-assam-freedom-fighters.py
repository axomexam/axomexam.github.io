#!/usr/bin/env python3
"""Generate data/trending-topics/assam-freedom-fighters.json.

150 most-important bilingual (English + Assamese) questions on the Assam
freedom movement and its freedom fighters, in the same schema the other
trending topics use. Regenerate with:

    python3 tools/gen-assam-freedom-fighters.py

Rows are written with the natural answer first and then rotated by a seeded
LCG so no option holds a disproportionate share of the keys, matching the
convention in tools/build-history-questions.js.
"""
import json, os, random, re

Q = []
RAW = []


def o(en, as_):
    return {"en": en, "as": as_}


def q(en, as_, opts, correct, ex_en, ex_as):
    RAW.append({
        "q": {"en": en, "as": as_},
        "opts": opts,
        "correct": correct,
        "explanation": {"en": ex_en, "as": ex_as},
    })


# Options such as "none of them" only make sense in the written order, so a
# question carrying one keeps its original order and key.
POSITIONAL = re.compile(r"\b(all|none|both|neither)\s+(of\s+)?(the\s+)?(above|these|them)\b", re.I)


def has_positional(opts):
    return any(POSITIONAL.search(x["en"]) for x in opts)


def balance_keys(count):
    """Deterministic, evenly spread target keys (max ~1/4 per option)."""
    base = [i % 4 for i in range(count)]
    random.Random(20260101).shuffle(base)
    return base


def rotate(opts, correct, target):
    """Move the correct option to `target`, keeping the others in order."""
    correct_pair = opts[correct]
    others = [x for k, x in enumerate(opts) if k != correct]
    out, oi = [], 0
    for pos in range(4):
        if pos == target:
            out.append(correct_pair)
        else:
            out.append(others[oi])
            oi += 1
    return out


def finalize():
    targets = balance_keys(len(RAW))
    for row, target in zip(RAW, targets):
        opts = row["opts"]
        correct = row["correct"]
        if not has_positional(opts):
            opts = rotate(opts, correct, target)
            correct = target
        Q.append({
            "q": row["q"],
            "a": {"en": opts[correct]["en"], "as": opts[correct]["as"]},
            "options": {"en": [x["en"] for x in opts], "as": [x["as"] for x in opts]},
            "correct": correct,
            "explanation": row["explanation"],
        })


# ------------------------------------------------------------------
# 1. Early resistance and the Revolt of 1857 (Q1-Q20)
# ------------------------------------------------------------------
q("Who was the first Assamese to be hanged by the British for his role in the Revolt of 1857?",
  "1857 চনৰ বিদ্ৰোহত অংশ লোৱাৰ বাবে ব্ৰিটিছে ফাঁচী দিয়া প্ৰথম অসমীয়া কোন আছিল?",
  [o("Maniram Dewan", "মণিৰাম দেৱান"), o("Piyoli Barua", "পিয়লি বৰুৱা"),
   o("Kushal Konwar", "কুশল কোঁৱৰ"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ")], 0,
  "Maniram Dewan was hanged at Jorhat in 1858 for conspiring against British rule during the 1857 revolt.",
  "১৮৫৭ চনৰ বিদ্ৰোহত ব্ৰিটিছ শাসনৰ বিৰুদ্ধে ষড়যন্ত্ৰ কৰাৰ বাবে মণিৰাম দেৱানক ১৮৫৮ চনত যোৰহাটত ফাঁচী দিয়া হৈছিল।")

q("Where was Maniram Dewan hanged?",
  "মণিৰাম দেৱানক ক'ত ফাঁচী দিয়া হৈছিল?",
  [o("Guwahati", "গুৱাহাটী"), o("Dibrugarh", "ডিব্ৰুগড়"),
   o("Jorhat", "যোৰহাট"), o("Tezpur", "তেজপুৰ")], 2,
  "Maniram Dewan was hanged at Jorhat in 1858.",
  "মণিৰাম দেৱানক ১৮৫৮ চনত যোৰহাটত ফাঁচী দিয়া হৈছিল।")

q("In which year was Maniram Dewan hanged?",
  "মণিৰাম দেৱানক কোন বছৰত ফাঁচী দিয়া হৈছিল?",
  [o("1857", "১৮৫৭"), o("1858", "১৮৫৮"),
   o("1859", "১৮৫৯"), o("1860", "১৮৬০")], 1,
  "Maniram Dewan was hanged in 1858.",
  "মণিৰাম দেৱানক ১৮৫৮ চনত ফাঁচী দিয়া হৈছিল।")

q("Who was hanged along with Maniram Dewan in 1858?",
  "১৮৫৮ চনত মণিৰাম দেৱানৰ সৈতে কাক ফাঁচী দিয়া হৈছিল?",
  [o("Piyoli Barua", "পিয়লি বৰুৱা"), o("Kushal Konwar", "কুশল কোঁৱৰ"),
   o("Mukunda Kakati", "মুকুন্দ কাকতি"), o("Maniram's brother", "মণিৰামৰ ভাতৃ")], 0,
  "Piyoli Barua was hanged together with Maniram Dewan at Jorhat in 1858.",
  "পিয়লি বৰুৱাকো ১৮৫৮ চনত মণিৰাম দেৱানৰ সৈতে যোৰহাটত ফাঁচী দিয়া হৈছিল।")

q("Maniram Dewan served as Dewan (Prime Minister) in which kingdom?",
  "মণিৰাম দেৱান কোন ৰাজ্যৰ দেৱান (প্ৰধানমন্ত্ৰী) আছিল?",
  [o("Koch kingdom", "কোচ ৰাজ্য"), o("Ahom kingdom", "আহোম ৰাজ্য"),
   o("Kachari kingdom", "কছাৰী ৰাজ্য"), o("Chutiya kingdom", "চুতীয়া ৰাজ্য")], 1,
  "Maniram Dewan served as Dewan in the Ahom kingdom under King Purandar Singha.",
  "মণিৰাম দেৱানে ৰজা পুৰন্দৰ সিংহৰ অধীনত আহোম ৰাজ্যৰ দেৱান হিচাপে কাৰ্য কৰিছিল।")

q("Maniram Dewan was the first Assamese to establish what?",
  "মণিৰাম দেৱান প্ৰথম অসমীয়া হিচাপে কি স্থাপন কৰিছিল?",
  [o("A tea garden", "চাহ বাগিচা"), o("A school", "বিদ্যালয়"),
   o("A newspaper", "বাতৰি কাকত"), o("A bank", "বেংক")], 0,
  "Maniram Dewan was the first Indian to plant tea on a commercial scale, establishing the Cinnamara and Selung tea gardens.",
  "মণিৰাম দেৱান ভাৰতীয়ৰ ভিতৰত প্ৰথমে বাণিজ্যিকভাৱে চাহ খেতি কৰিছিল আৰু চিন্নামৰা আৰু চেলুং চাহ বাগিচা স্থাপন কৰিছিল।")

q("Which two tea gardens were established by Maniram Dewan?",
  "মণিৰাম দেৱানে কোন দুখন চাহ বাগিচা স্থাপন কৰিছিল?",
  [o("Cinnamara and Selung", "চিন্নামৰা আৰু চেলুং"), o("Digboi and Naharkatia", "ডিগবৈ আৰু নাহৰকটীয়া"),
   o("Doomdooma and Margherita", "দুমদুমা আৰু মাৰ্ঘেৰিটা"), o("Hattigor and Borengajuli", "হাট্টিগৰ আৰু বৰেংগাজুলি")], 0,
  "Maniram Dewan established the Cinnamara and Selung tea gardens near Jorhat.",
  "মণিৰাম দেৱানে যোৰহাটৰ ওচৰত চিন্নামৰা আৰু চেলুং চাহ বাগিচা স্থাপন কৰিছিল।")

q("In which year was Maniram Dewan born?",
  "মণিৰাম দেৱানৰ জন্ম কোন বছৰত হৈছিল?",
  [o("1806", "১৮০৬"), o("1810", "১৮১০"),
   o("1815", "১৮১৫"), o("1820", "১৮২০")], 0,
  "Maniram Dewan was born in 1806.",
  "মণিৰাম দেৱানৰ জন্ম ১৮০৬ চনত হৈছিল।")

q("Maniram Dewan served as Dewan in the court of which Ahom king?",
  "মণিৰাম দেৱান কোন আহোম ৰজাৰ দৰবাৰত দেৱান আছিল?",
  [o("Purandar Singha", "পুৰন্দৰ সিংহ"), o("Gaurinath Singha", "গৌৰীনাথ সিংহ"),
   o("Rudra Singha", "ৰুদ্ৰ সিংহ"), o("Chandrakanta Singha", "চন্দ্ৰকান্ত সিংহ")], 0,
  "Maniram Dewan served as Dewan under the Ahom king Purandar Singha.",
  "মণিৰাম দেৱানে আহোম ৰজা পুৰন্দৰ সিংহৰ অধীনত দেৱান হিচাপে কাৰ্য কৰিছিল।")

q("Which Ahom prince did Maniram Dewan try to place on the throne during 1857?",
  "১৮৫৭ চনত মণিৰাম দেৱানে কোন আহোম ৰাজকুমাৰক সিংহাসনত বহুওৱাৰ প্ৰয়াস কৰিছিল?",
  [o("Kandarpeswar Singha", "কন্দৰ্পেশ্বৰ সিংহ"), o("Purandar Singha", "পুৰন্দৰ সিংহ"),
   o("Jogeswar Singha", "যোগেশ্বৰ সিংহ"), o("Kamaleswar Singha", "কমলেশ্বৰ সিংহ")], 0,
  "Maniram Dewan tried to install Kandarpeswar Singha, a descendant of the Ahom royal family, on the throne.",
  "মণিৰাম দেৱানে আহোম ৰাজপৰিয়ালৰ বংশধৰ কন্দৰ্পেশ্বৰ সিংহক সিংহাসনত বহুওৱাৰ প্ৰয়াস কৰিছিল।")

q("Kandarpeswar Singha was exiled by the British to which place?",
  "ব্ৰিটিছে কন্দৰ্পেশ্বৰ সিংহক ক'লৈ নিৰ্বাসিত কৰিছিল?",
  [o("Calcutta", "কলিকতা"), o("Rangoon", "ৰেঙ্গুন"),
   o("London", "লণ্ডন"), o("Delhi", "দিল্লী")], 0,
  "Kandarpeswar Singha was exiled to Calcutta by the British.",
  "ব্ৰিটিছে কন্দৰ্পেশ্বৰ সিংহক কলিকতালৈ নিৰ্বাসিত কৰিছিল।")

q("The Revolt of 1857 in Assam was centred around which town?",
  "অসমত ১৮৫৭ চনৰ বিদ্ৰোহ কোন নগৰক কেন্দ্ৰ কৰি সংঘটিত হৈছিল?",
  [o("Jorhat", "যোৰহাট"), o("Guwahati", "গুৱাহাটী"),
   o("Dibrugarh", "ডিব্ৰুগড়"), o("Silchar", "শিলচৰ")], 0,
  "The 1857 revolt in Assam was centred around Jorhat, where Maniram Dewan and his associates planned the uprising.",
  "অসমত ১৮৫৭ চনৰ বিদ্ৰোহ যোৰহাটক কেন্দ্ৰ কৰি সংঘটিত হৈছিল, য'ত মণিৰাম দেৱান আৰু তেওঁৰ সহযোগীসকলে বিদ্ৰোহৰ পৰিকল্পনা কৰিছিল।")

q("Piyoli Barua held which position in the Ahom administration?",
  "পিয়লি বৰুৱাই আহোম প্ৰশাসনত কোন পদত আছিল?",
  [o("Borphukan (military commander)", "বৰফুকন (সেনাপতি)"), o("Dewan", "দেৱান"),
   o("Barbarua", "বৰবৰুৱা"), o("Borphukan's clerk", "বৰফুকনৰ কেৰাণী")], 0,
  "Piyoli Barua was a Borphukan, a senior military commander in the Ahom administration.",
  "পিয়লি বৰুৱা এজন বৰফুকন আছিল, আহোম প্ৰশাসনৰ এজন উচ্চ পদস্থ সেনাপতি।")

q("Who was the Mughal emperor during the Revolt of 1857?",
  "১৮৫৭ চনৰ বিদ্ৰোহৰ সময়ত মোগল সম্ৰাট কোন আছিল?",
  [o("Bahadur Shah Zafar", "বাহাদুৰ শ্বাহ জাফৰ"), o("Akbar II", "আকবৰ দ্বিতীয়"),
   o("Shah Alam II", "শ্বাহ আলম দ্বিতীয়"), o("Aurangzeb", "ঔৰংজেব")], 0,
  "Bahadur Shah Zafar was the Mughal emperor during the Revolt of 1857; the rebels proclaimed him their leader.",
  "১৮৫৭ চনৰ বিদ্ৰোহৰ সময়ত বাহাদুৰ শ্বাহ জাফৰ মোগল সম্ৰাট আছিল; বিদ্ৰোহীসকলে তেওঁক নেতা বুলি ঘোষণা কৰিছিল।")

q("Who was the Governor-General of India during the Revolt of 1857?",
  "১৮৫৭ চনৰ বিদ্ৰোহৰ সময়ত ভাৰতৰ গৱৰ্ণৰ-জেনেৰেল কোন আছিল?",
  [o("Lord Canning", "লৰ্ড কেনিং"), o("Lord Dalhousie", "লৰ্ড ডালহৌছী"),
   o("Lord Curzon", "লৰ্ড কাৰ্জন"), o("Lord Ripon", "লৰ্ড ৰিপন")], 0,
  "Lord Canning was the Governor-General of India during the Revolt of 1857.",
  "১৮৫৭ চনৰ বিদ্ৰোহৰ সময়ত লৰ্ড কেনিং ভাৰতৰ গৱৰ্ণৰ-জেনেৰেল আছিল।")

q("The Revolt of 1857 is also known by which name?",
  "১৮৫৭ চনৰ বিদ্ৰোহক আন কি নামেৰে জনা যায়?",
  [o("The First War of Indian Independence", "ভাৰতীয় স্বাধীনতাৰ প্ৰথম যুদ্ধ"), o("The Sepoy Mutiny of Bengal", "বাংলাৰ সিপাহী বিদ্ৰোহ"),
   o("The Great Bengal Revolt", "মহান বঙ্গ বিদ্ৰোহ"), o("The Assam Uprising", "অসম বিদ্ৰোহ")], 0,
  "The Revolt of 1857 is also called the First War of Indian Independence.",
  "১৮৫৭ চনৰ বিদ্ৰোহক ভাৰতীয় স্বাধীনতাৰ প্ৰথম যুদ্ধ বুলিও কোৱা হয়।")

q("Who was the last Ahom king?",
  "শেষ আহোম ৰজা কোন আছিল?",
  [o("Purandar Singha", "পুৰন্দৰ সিংহ"), o("Kandarpeswar Singha", "কন্দৰ্পেশ্বৰ সিংহ"),
   o("Chandrakanta Singha", "চন্দ্ৰকান্ত সিংহ"), o("Jogeswar Singha", "যোগেশ্বৰ সিংহ")], 0,
  "Purandar Singha was the last Ahom king; the British removed him from power in 1838.",
  "পুৰন্দৰ সিংহ শেষ আহোম ৰজা আছিল; ১৮৩৮ চনত ব্ৰিটিছে তেওঁক শাসনৰ পৰা আঁতৰাইছিল।")

q("The Revolt of 1857 in Assam failed mainly because of?",
  "অসমত ১৮৫৭ চনৰ বিদ্ৰোহ মূলতঃ কি কাৰণে বিফল হৈছিল?",
  [o("Lack of coordination and timely support", "সমন্বয় আৰু সময়োচিত সমৰ্থনৰ অভাৱ"), o("Shortage of weapons only", "কেৱল অস্ত্ৰৰ অভাৱ"),
   o("The death of Maniram Dewan", "মণিৰাম দেৱানৰ মৃত্যু"), o("Withdrawal by the Assamese nobles", "অসমীয়া সম্ভ্ৰান্তসকলৰ প্ৰত্যাহাৰ")], 0,
  "The 1857 revolt in Assam failed mainly due to a lack of coordination and timely support before the plans matured.",
  "অসমত ১৮৫৭ চনৰ বিদ্ৰোহ মূলতঃ পৰিকল্পনা পূৰ্ণ হোৱাৰ আগতে সমন্বয় আৰু সময়োচিত সমৰ্থনৰ অভাৱত বিফল হৈছিল।")

q("In which year was the Treaty of Yandabo signed, bringing Assam under British control?",
  "অসমক ব্ৰিটিছ শাসনৰ অধীনলৈ অনা ইয়াণ্ডাবু সন্ধি কোন বছৰত স্বাক্ষৰিত হৈছিল?",
  [o("1824", "১৮২৪"), o("1826", "১৮২৬"),
   o("1828", "১৮২৮"), o("1838", "১৮৩৮")], 1,
  "The Treaty of Yandabo was signed in 1826, ending the First Anglo-Burmese War and bringing Assam under British control.",
  "১৮২৬ চনত স্বাক্ষৰিত ইয়াণ্ডাবু সন্ধিয়ে প্ৰথম ইংৰাজ-বৰ্মা যুদ্ধ শেষ কৰি অসমক ব্ৰিটিছ শাসনৰ অধীনলৈ আনিছিল।")

q("The Treaty of Yandabo ended which war?",
  "ইয়াণ্ডাবু সন্ধিয়ে কোন যুদ্ধ শেষ কৰিছিল?",
  [o("The First Anglo-Burmese War", "প্ৰথম ইংৰাজ-বৰ্মা যুদ্ধ"), o("The Second Anglo-Burmese War", "দ্বিতীয় ইংৰাজ-বৰ্মা যুদ্ধ"),
   o("The First Anglo-Sikh War", "প্ৰথম ইংৰাজ-শিখ যুদ্ধ"), o("The Anglo-Maratha War", "ইংৰাজ-মাৰাঠা যুদ্ধ")], 0,
  "The Treaty of Yandabo ended the First Anglo-Burmese War (1824-26).",
  "ইয়াণ্ডাবু সন্ধিয়ে প্ৰথম ইংৰাজ-বৰ্মা যুদ্ধ (১৮২৪-২৬) শেষ কৰিছিল।")

q("Who founded the Assam Association in 1903?",
  "১৯০৩ চনত অসম এছ'চিয়েশ্যন কোনে প্ৰতিষ্ঠা কৰিছিল?",
  [o("Manik Chandra Barua", "মাণিক চন্দ্ৰ বৰুৱা"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী")], 0,
  "The Assam Association, the first political organisation of Assam, was founded in 1903 with Manik Chandra Barua as its first secretary.",
  "অসমৰ প্ৰথম ৰাজনৈতিক সংগঠন অসম এছ'চিয়েশ্যন ১৯০৩ চনত প্ৰতিষ্ঠা হৈছিল আৰু মাণিক চন্দ্ৰ বৰুৱা ইয়াৰ প্ৰথম সম্পাদক আছিল।")

q("In which year was the Assam Association founded?",
  "অসম এছ'চিয়েশ্যন কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [o("1885", "১৮৮৫"), o("1903", "১৯০৩"),
   o("1916", "১৯১৬"), o("1921", "১৯২১")], 1,
  "The Assam Association was founded in 1903.",
  "অসম এছ'চিয়েশ্যন ১৯০৩ চনত প্ৰতিষ্ঠা হৈছিল।")

q("The Assam Association was a predecessor of which organisation in Assam?",
  "অসম এছ'চিয়েশ্যন অসমত কোন সংগঠনৰ পূৰ্বসূৰী আছিল?",
  [o("The Indian National Congress", "ভাৰতীয় জাতীয় কংগ্ৰেছ"), o("The Muslim League", "মুছলিম লীগ"),
   o("The Forward Bloc", "ফৰৱাৰ্ড ব্লক"), o("The Hindu Mahasabha", "হিন্দু মহাসভা")], 0,
  "The Assam Association was the predecessor of the Indian National Congress in Assam.",
  "অসম এছ'চিয়েশ্যন অসমত ভাৰতীয় জাতীয় কংগ্ৰেছৰ পূৰ্বসূৰী আছিল।")

q("In which year was the Indian National Congress founded?",
  "ভাৰতীয় জাতীয় কংগ্ৰেছ কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [o("1885", "১৮৮৫"), o("1892", "১৮৯২"),
   o("1905", "১৯০৫"), o("1919", "১৯১৯")], 0,
  "The Indian National Congress was founded in 1885.",
  "ভাৰতীয় জাতীয় কংগ্ৰেছ ১৮৮৫ চনত প্ৰতিষ্ঠা হৈছিল।")

q("Who founded the Indian National Congress?",
  "ভাৰতীয় জাতীয় কংগ্ৰেছ কোনে প্ৰতিষ্ঠা কৰিছিল?",
  [o("A. O. Hume", "এ. অ'. হিউম"), o("Dadabhai Naoroji", "দাদাভাই নৌৰজী"),
   o("W. C. Bonnerjee", "ডব্লিউ. চি. বেনাৰ্জী"), o("Surendranath Banerjee", "সুৰেন্দ্ৰনাথ বেনাৰ্জী")], 0,
  "The Indian National Congress was founded in 1885 by A. O. Hume, a retired British civil servant.",
  "১৮৮৫ চনত অৱসৰপ্ৰাপ্ত ব্ৰিটিছ অসামৰিক বিষয়া এ. অ'. হিউমে ভাৰতীয় জাতীয় কংগ্ৰেছ প্ৰতিষ্ঠা কৰিছিল।")

q("In which year was Bengal partitioned, sparking the Swadeshi Movement?",
  "বঙ্গ ভাগ হোৱা আৰু স্বদেশী আন্দোলন আৰম্ভ হোৱা বছৰ কোনটো?",
  [o("1905", "১৯০৫"), o("1909", "১৯০৯"),
   o("1911", "১৯১১"), o("1919", "১৯১৯")], 0,
  "The partition of Bengal took place in 1905, which led to the Swadeshi Movement.",
  "১৯০৫ চনত বঙ্গ ভাগ হৈছিল, যাৰ ফলত স্বদেশী আন্দোলন আৰম্ভ হৈছিল।")

q("The Swadeshi Movement began in response to which event?",
  "স্বদেশী আন্দোলন কোন ঘটনাৰ প্ৰতিক্ৰিয়াস্বৰূপে আৰম্ভ হৈছিল?",
  [o("The partition of Bengal", "বঙ্গ ভাগ"), o("The Rowlatt Act", "ৰাউলাট আইন"),
   o("The Jallianwala Bagh massacre", "জালিয়ানৱালাবাগ হত্যাকাণ্ড"), o("The Simon Commission", "চাইমন আয়োগ")], 0,
  "The Swadeshi Movement began in 1905 in response to the partition of Bengal by Lord Curzon.",
  "১৯০৫ চনত লৰ্ড কাৰ্জনৰ বঙ্গ ভাগৰ প্ৰতিক্ৰিয়াস্বৰূপে স্বদেশী আন্দোলন আৰম্ভ হৈছিল।")

q("In which year did the Indian National Congress hold its session at Guwahati for the first time?",
  "ভাৰতীয় জাতীয় কংগ্ৰেছে প্ৰথমবাৰ গুৱাহাটীত অধিৱেশন অনুষ্ঠিত কৰিছিল কোন বছৰত?",
  [o("1926", "১৯২৬"), o("1916", "১৯১৬"),
   o("1937", "১৯৩৭"), o("1946", "১৯৪৬")], 0,
  "The 1926 annual session of the Indian National Congress was held at Pandu, Guwahati.",
  "১৯২৬ চনত ভাৰতীয় জাতীয় কংগ্ৰেছৰ বাৰ্ষিক অধিৱেশন গুৱাহাটীৰ পান্ডুত অনুষ্ঠিত হৈছিল।")

q("In which year was the Assam Provincial Congress formed?",
  "অসম প্ৰাদেশিক কংগ্ৰেছ কোন বছৰত গঠন হৈছিল?",
  [o("1921", "১৯২১"), o("1903", "১৯০৩"),
   o("1916", "১৯১৬"), o("1930", "১৯৩০")], 0,
  "The Assam Provincial Congress was formed in 1921, aligning Assam with the Indian National Congress.",
  "১৯২১ চনত অসম প্ৰাদেশিক কংগ্ৰেছ গঠন হৈছিল আৰু অসম ভাৰতীয় জাতীয় কংগ্ৰেছৰ সৈতে সংযুক্ত হৈছিল।")

print("part1:", len(RAW))

# ------------------------------------------------------------------
# 2. Peasant uprisings (Q30-Q42)
# ------------------------------------------------------------------
q("In which year did the Phulaguri uprising take place?",
  "ফুলগুৰি বিদ্ৰোহ কোন বছৰত সংঘটিত হৈছিল?",
  [o("1857", "১৮৫৭"), o("1861", "১৮৬১"),
   o("1894", "১৮৯৪"), o("1893", "১৮৯৩")], 1,
  "The Phulaguri uprising, an early peasant revolt in Assam, took place in 1861.",
  "অসমৰ প্ৰাৰম্ভিক কৃষক বিদ্ৰোহ ফুলগুৰি বিদ্ৰোহ ১৮৬১ চনত সংঘটিত হৈছিল।")

q("The Phulaguri uprising was a protest against what?",
  "ফুলগুৰি বিদ্ৰোহ কিৰ বিৰুদ্ধে প্ৰতিবাদ আছিল?",
  [o("British taxation", "ব্ৰিটিছ কৰ"), o("The partition of Bengal", "বঙ্গ ভাগ"),
   o("The grouping plan", "গ্ৰুপিং প্লেন"), o("Land ceiling laws", "ভূমি চিলিং আইন")], 0,
  "The Phulaguri uprising was a peasant protest against British taxation and forest laws.",
  "ফুলগুৰি বিদ্ৰোহ ব্ৰিটিছ কৰ আৰু বন আইনৰ বিৰুদ্ধে কৃষকৰ প্ৰতিবাদ আছিল।")

q("Phulaguri, the site of an 1861 peasant uprising, is located in which present-day district?",
  "১৮৬১ চনৰ কৃষক বিদ্ৰোহৰ স্থান ফুলগুৰি বৰ্তমান কোন জিলাত অৱস্থিত?",
  [o("Nagaon", "নগাঁও"), o("Darrang", "দৰং"),
   o("Golaghat", "গোলাঘাট"), o("Sonitpur", "শোণিতপুৰ")], 0,
  "Phulaguri is located in Nagaon district, on the bank of the Kolong river.",
  "ফুলগুৰি নগাঁও জিলাত কলং নদীৰ পাৰত অৱস্থিত।")

q("The Phulaguri uprising was led by which peasant leader?",
  "ফুলগুৰি বিদ্ৰোহ কোন কৃষক নেতাই নেতৃত্ব দিছিল?",
  [o("Laluk", "লালুক"), o("Maniram Dewan", "মণিৰাম দেৱান"),
   o("Piyoli Barua", "পিয়লি বৰুৱা"), o("Gomdhar Konwar", "গমধৰ কোঁৱৰ")], 0,
  "The Phulaguri uprising was led by the peasant leader Laluk.",
  "ফুলগুৰি বিদ্ৰোহ কৃষক নেতা লালুকে নেতৃত্ব দিছিল।")

q("In which year did the Patharughat massacre take place?",
  "পথৰুঘাট হত্যাকাণ্ড কোন বছৰত সংঘটিত হৈছিল?",
  [o("1861", "১৮৬১"), o("1894", "১৮৯৪"),
   o("1893", "১৮৯৩"), o("1905", "১৯০৫")], 1,
  "The Patharughat massacre took place on 28 January 1894.",
  "পথৰুঘাট হত্যাকাণ্ড ১৮৯৪ চনৰ ২৮ জানুৱাৰীত সংঘটিত হৈছিল।")

q("The peasants of Patharughat protested against what?",
  "পথৰুঘাটৰ কৃষকসকলে কিৰ বিৰুদ্ধে প্ৰতিবাদ কৰিছিল?",
  [o("An increase in land revenue", "ভূমি ৰাজহ বৃদ্ধি"), o("A ban on opium", "আফিং নিষিদ্ধকৰণ"),
   o("The partition of Bengal", "বঙ্গ ভাগ"), o("Forced tea cultivation", "বাধ্যতামূলক চাহ খেতি")], 0,
  "The Patharughat peasants protested against an increase in land revenue.",
  "পথৰুঘাটৰ কৃষকসকলে ভূমি ৰাজহ বৃদ্ধিৰ বিৰুদ্ধে প্ৰতিবাদ কৰিছিল।")

q("Patharughat is located in which present-day district of Assam?",
  "পথৰুঘাট অসমৰ বৰ্তমান কোন জিলাত অৱস্থিত?",
  [o("Darrang", "দৰং"), o("Nagaon", "নগাঁও"),
   o("Jorhat", "যোৰহাট"), o("Kamrup", "কামৰূপ")], 0,
  "Patharughat is located in Darrang district.",
  "পথৰুঘাট দৰং জিলাত অৱস্থিত।")

q("The Patharughat massacre is often described as?",
  "পথৰুঘাট হত্যাকাণ্ডক প্ৰায়ে কি বুলি বৰ্ণনা কৰা হয়?",
  [o("Assam's Jallianwala Bagh", "অসমৰ জালিয়ানৱালাবাগ"), o("Assam's first satyagraha", "অসমৰ প্ৰথম সত্যাগ্ৰহ"),
   o("The first tea strike", "প্ৰথম চাহ ধৰ্মঘট"), o("The first Assamese rebellion", "প্ৰথম অসমীয়া বিদ্ৰোহ")], 0,
  "The Patharughat massacre of 1894 is often described as Assam's Jallianwala Bagh.",
  "১৮৯৪ চনৰ পথৰুঘাট হত্যাকাণ্ডক প্ৰায়ে অসমৰ জালিয়ানৱালাবাগ বুলি বৰ্ণনা কৰা হয়।")

q("Approximately how many peasants were killed in the Patharughat firing of 1894?",
  "১৮৯৪ চনৰ পথৰুঘাট গুলীবৰ্ষণত প্ৰায় কিমান কৃষক নিহত হৈছিল?",
  [o("About 15", "প্ৰায় ১৫"), o("About 50", "প্ৰায় ৫০"),
   o("About 140", "প্ৰায় ১৪০"), o("About 300", "প্ৰায় ৩০০")], 2,
  "About 140 peasants were killed in the Patharughat firing of 1894.",
  "১৮৯৪ চনৰ পথৰুঘাট গুলীবৰ্ষণত প্ৰায় ১৪০ জন কৃষক নিহত হৈছিল।")

q("The Patharughat peasants' uprising is also known as the?",
  "পথৰুঘাট কৃষক বিদ্ৰোহক আন কি নামেৰে জনা যায়?",
  [o("Patharughat Raijmel", "পথৰুঘাট ৰাইজমেল"), o("Patharughat Satyagraha", "পথৰুঘাট সত্যাগ্ৰহ"),
   o("Patharughat Andolan", "পথৰুঘাট আন্দোলন"), o("Patharughat Bidroha", "পথৰুঘাট বিদ্ৰোহ")], 0,
  "The Patharughat uprising grew out of the traditional Assamese raijmel (people's assembly).",
  "পথৰুঘাট বিদ্ৰোহ পৰম্পৰাগত অসমীয়া ৰাইজমেলৰ পৰা গঢ় লৈ উঠিছিল।")

q("The Rangiya uprising of 1893-94 was a peasant protest in which district?",
  "১৮৯৩-৯৪ চনৰ ৰঙিয়া বিদ্ৰোহ কোন জিলাৰ কৃষক প্ৰতিবাদ আছিল?",
  [o("Kamrup", "কামৰূপ"), o("Darrang", "দৰং"),
   o("Nagaon", "নগাঁও"), o("Sibsagar", "শিৱসাগৰ")], 0,
  "The Rangiya uprising was a peasant protest in Kamrup district against enhanced land revenue.",
  "ৰঙিয়া বিদ্ৰোহ কামৰূপ জিলাত ভূমি ৰাজহ বৃদ্ধিৰ বিৰুদ্ধে কৃষকৰ প্ৰতিবাদ আছিল।")

q("The revolt of Gomdhar Konwar in 1828 was directed against?",
  "১৮২৮ চনত গমধৰ কোঁৱৰৰ বিদ্ৰোহ কিৰ বিৰুদ্ধে আছিল?",
  [o("British rule in Assam", "অসমত ব্ৰিটিছ শাসন"), o("The Burmese invasion", "বৰ্মা আক্ৰমণ"),
   o("The Mughal empire", "মোগল সাম্ৰাজ্য"), o("The Koch kingdom", "কোচ ৰাজ্য")], 0,
  "Gomdhar Konwar led an early revolt in 1828 against the newly established British rule in Assam.",
  "গমধৰ কোঁৱৰে ১৮২৮ চনত অসমত নতুনকৈ প্ৰতিষ্ঠিত ব্ৰিটিছ শাসনৰ বিৰুদ্ধে প্ৰাৰম্ভিক বিদ্ৰোহৰ নেতৃত্ব দিছিল।")

q("Who was the leader of the peasant revolt at Rangiya?",
  "ৰঙিয়াৰ কৃষক বিদ্ৰোহৰ নেতা কোন আছিল?",
  [o("Gomdhar Konwar", "গমধৰ কোঁৱৰ"), o("Laluk", "লালুক"),
   o("Maniram Dewan", "মণিৰাম দেৱান"), o("Kushal Konwar", "কুশল কোঁৱৰ")], 0,
  "Gomdhar Konwar is associated with the early peasant resistance in the Kamrup region.",
  "গমধৰ কোঁৱৰ কামৰূপ অঞ্চলৰ প্ৰাৰম্ভিক কৃষক প্ৰতিৰোধৰ সৈতে জড়িত।")

print("part2:", len(RAW))

# ------------------------------------------------------------------
# 3. Gandhian movements in Assam (Q43-Q62)
# ------------------------------------------------------------------
q("In which year was the Non-Cooperation Movement launched?",
  "অসহযোগ আন্দোলন কোন বছৰত আৰম্ভ হৈছিল?",
  [o("1919", "১৯১৯"), o("1920", "১৯২০"),
   o("1922", "১৯২২"), o("1930", "১৯৩০")], 1,
  "The Non-Cooperation Movement was launched by Mahatma Gandhi in 1920.",
  "মহাত্মা গান্ধীয়ে ১৯২০ চনত অসহযোগ আন্দোলন আৰম্ভ কৰিছিল।")

q("Who led the Non-Cooperation Movement?",
  "অসহযোগ আন্দোলনৰ নেতৃত্ব কোনে দিছিল?",
  [o("Mahatma Gandhi", "মহাত্মা গান্ধী"), o("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"),
   o("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু"), o("Bal Gangadhar Tilak", "বাল গংগাধৰ তিলক")], 0,
  "The Non-Cooperation Movement was led by Mahatma Gandhi.",
  "অসহযোগ আন্দোলনৰ নেতৃত্ব মহাত্মা গান্ধীয়ে দিছিল।")

q("The Non-Cooperation Movement was withdrawn after which incident?",
  "কোন ঘটনাৰ পিছত অসহযোগ আন্দোলন প্ৰত্যাহাৰ কৰা হৈছিল?",
  [o("The Chauri Chaura incident", "চৌৰী চোৰা ঘটনা"), o("The Jallianwala Bagh massacre", "জালিয়ানৱালাবাগ হত্যাকাণ্ড"),
   o("The Simon Commission", "চাইমন আয়োগ"), o("The Rowlatt Act", "ৰাউলাট আইন")], 0,
  "The Non-Cooperation Movement was withdrawn in 1922 after the Chauri Chaura incident.",
  "১৯২২ চনত চৌৰী চোৰা ঘটনাৰ পিছত অসহযোগ আন্দোলন প্ৰত্যাহাৰ কৰা হৈছিল।")

q("In which year did Mahatma Gandhi first visit Assam?",
  "মহাত্মা গান্ধীয়ে প্ৰথমবাৰ অসম ভ্ৰমণ কৰিছিল কোন বছৰত?",
  [o("1917", "১৯১৭"), o("1921", "১৯২১"),
   o("1934", "১৯৩৪"), o("1946", "১৯৪৬")], 1,
  "Mahatma Gandhi first visited Assam in 1921 during the Non-Cooperation Movement.",
  "মহাত্মা গান্ধীয়ে ১৯২১ চনত অসহযোগ আন্দোলনৰ সময়ত প্ৰথমবাৰ অসম ভ্ৰমণ কৰিছিল।")

q("In which year was the Civil Disobedience Movement launched?",
  "আইন অৱজ্ঞা আন্দোলন কোন বছৰত আৰম্ভ হৈছিল?",
  [o("1920", "১৯২০"), o("1930", "১৯৩০"),
   o("1932", "১৯৩২"), o("1942", "১৯৪২")], 1,
  "The Civil Disobedience Movement was launched in 1930.",
  "আইন অৱজ্ঞা আন্দোলন ১৯৩০ চনত আৰম্ভ হৈছিল।")

q("The Dandi March, which began the Civil Disobedience Movement, was led by?",
  "আইন অৱজ্ঞা আন্দোলন আৰম্ভ কৰা ডাণ্ডী যাত্ৰাৰ নেতৃত্ব কোনে দিছিল?",
  [o("Mahatma Gandhi", "মহাত্মা গান্ধী"), o("Sardar Patel", "সৰ্দাৰ পেটেল"),
   o("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ"), o("C. Rajagopalachari", "চি. ৰাজাগোপালাচাৰী")], 0,
  "The Dandi March of 1930 was led by Mahatma Gandhi, beginning the Civil Disobedience Movement.",
  "১৯৩০ চনৰ ডাণ্ডী যাত্ৰাৰ নেতৃত্ব মহাত্মা গান্ধীয়ে দিছিল, যাৰ জৰিয়তে আইন অৱজ্ঞা আন্দোলন আৰম্ভ হৈছিল।")

q("In which year was the Quit India Movement launched?",
  "ভাৰত ত্যাগ আন্দোলন কোন বছৰত আৰম্ভ হৈছিল?",
  [o("1930", "১৯৩০"), o("1934", "১৯৩৪"),
   o("1942", "১৯৪২"), o("1945", "১৯৪৫")], 2,
  "The Quit India Movement was launched on 8 August 1942.",
  "ভাৰত ত্যাগ আন্দোলন ১৯৪২ চনৰ ৮ আগষ্টত আৰম্ভ হৈছিল।")

q("Who gave the slogan 'Do or Die' during the Quit India Movement?",
  "ভাৰত ত্যাগ আন্দোলনৰ সময়ত 'কৰ অথবা মৰ' শ্লোগান কোনে দিছিল?",
  [o("Mahatma Gandhi", "মহাত্মা গান্ধী"), o("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু"),
   o("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), o("Sardar Patel", "সৰ্দাৰ পেটেল")], 0,
  "Mahatma Gandhi gave the slogan 'Do or Die' during the Quit India Movement of 1942.",
  "১৯৪২ চনৰ ভাৰত ত্যাগ আন্দোলনৰ সময়ত মহাত্মা গান্ধীয়ে 'কৰ অথবা মৰ' শ্লোগান দিছিল।")

q("The Quit India resolution was passed at which city?",
  "ভাৰত ত্যাগ প্ৰস্তাৱ কোন চহৰত গৃহীত হৈছিল?",
  [o("Bombay", "বম্বে"), o("Calcutta", "কলিকতা"),
   o("Lahore", "লাহোৰ"), o("Nagpur", "নাগপুৰ")], 0,
  "The Quit India resolution was passed at the AICC session in Bombay on 8 August 1942.",
  "১৯৪২ চনৰ ৮ আগষ্টত বম্বেত কংগ্ৰেছ কৰ্ম সমিতিৰ অধিৱেশনত ভাৰত ত্যাগ প্ৰস্তাৱ গৃহীত হৈছিল।")

q("The Mrityu Bahini (Death Squad) was formed during which movement?",
  "মৃত্যু বাহিনী কোন আন্দোলনৰ সময়ত গঠন হৈছিল?",
  [o("The Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("The Non-Cooperation Movement", "অসহযোগ আন্দোলন"),
   o("The Civil Disobedience Movement", "আইন অৱজ্ঞা আন্দোলন"), o("The Swadeshi Movement", "স্বদেশী আন্দোলন")], 0,
  "The Mrityu Bahini was formed during the Quit India Movement of 1942.",
  "মৃত্যু বাহিনী ১৯৪২ চনৰ ভাৰত ত্যাগ আন্দোলনৰ সময়ত গঠন হৈছিল।")

q("The Gohpur police station firing took place during which movement?",
  "গহপুৰ আৰক্ষী চকী গুলীবৰ্ষণ কোন আন্দোলনৰ সময়ত সংঘটিত হৈছিল?",
  [o("The Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("The Civil Disobedience Movement", "আইন অৱজ্ঞা আন্দোলন"),
   o("The Non-Cooperation Movement", "অসহযোগ আন্দোলন"), o("The Swadeshi Movement", "স্বদেশী আন্দোলন")], 0,
  "The Gohpur police firing took place on 20 September 1942 during the Quit India Movement.",
  "গহপুৰ আৰক্ষী গুলীবৰ্ষণ ১৯৪২ চনৰ ২০ ছেপ্তেম্বৰত ভাৰত ত্যাগ আন্দোলনৰ সময়ত সংঘটিত হৈছিল।")

q("In which year did the Gohpur incident take place?",
  "গহপুৰ ঘটনা কোন বছৰত সংঘটিত হৈছিল?",
  [o("1930", "১৯৩০"), o("1942", "১৯৪২"),
   o("1943", "১৯৪৩"), o("1946", "১৯৪৬")], 1,
  "The Gohpur incident took place in 1942 during the Quit India Movement.",
  "গহপুৰ ঘটনা ১৯৪২ চনত ভাৰত ত্যাগ আন্দোলনৰ সময়ত সংঘটিত হৈছিল।")

q("In which year did the Salt Satyagraha take place in Assam?",
  "অসমত লৱণ সত্যাগ্ৰহ কোন বছৰত সংঘটিত হৈছিল?",
  [o("1921", "১৯২১"), o("1930", "১৯৩০"),
   o("1932", "১৯৩২"), o("1942", "১৯৪২")], 1,
  "The Salt Satyagraha was carried out in Assam in 1930, as part of the nationwide Civil Disobedience Movement.",
  "আইন অৱজ্ঞা আন্দোলনৰ অংশ হিচাপে ১৯৩০ চনত অসমত লৱণ সত্যাগ্ৰহ অনুষ্ঠিত হৈছিল।")

q("Which Assamese leader was known as 'Desha Bhakta'?",
  "কোন অসমীয়া নেতাক 'দেশ ভক্ত' বুলি জনা যায়?",
  [o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Tarun Ram Phukan was popularly known as 'Desha Bhakta' (devotee of the motherland).",
  "তৰুণ ৰাম ফুকনক 'দেশ ভক্ত' বুলি জনা যায়।")

q("Tarun Ram Phukan was associated with which political party?",
  "তৰুণ ৰাম ফুকন কোন ৰাজনৈতিক দলৰ সৈতে জড়িত আছিল?",
  [o("The Indian National Congress", "ভাৰতীয় জাতীয় কংগ্ৰেছ"), o("The Muslim League", "মুছলিম লীগ"),
   o("The Forward Bloc", "ফৰৱাৰ্ড ব্লক"), o("The Communist Party", "কমিউনিষ্ট পাৰ্টি")], 0,
  "Tarun Ram Phukan was a leading member of the Indian National Congress in Assam.",
  "তৰুণ ৰাম ফুকন অসমত ভাৰতীয় জাতীয় কংগ্ৰেছৰ এজন প্ৰধান সদস্য আছিল।")

q("Which Assamese leader represented Assam in the Constituent Assembly of India?",
  "কোন অসমীয়া নেতাই ভাৰতৰ সংবিধান সভাত অসমক প্ৰতিনিধিত্ব কৰিছিল?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"),
   o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি")], 0,
  "Gopinath Bordoloi represented Assam in the Constituent Assembly of India.",
  "গোপীনাথ বৰদলৈয়ে ভাৰতৰ সংবিধান সভাত অসমক প্ৰতিনিধিত্ব কৰিছিল।")

q("Which Assamese freedom fighter is known as 'Loksevak'?",
  "কোন অসমীয়া স্বাধীনতা সংগ্ৰামীক 'লোকসেৱক' বুলি জনা যায়?",
  [o("Omeo Kumar Das", "ওমিও কুমাৰ দাস"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Kushal Konwar", "কুশল কোঁৱৰ")], 0,
  "Omeo Kumar Das, a Gandhian freedom fighter and social worker, was known as 'Loksevak'.",
  "গান্ধীবাদী স্বাধীনতা সংগ্ৰামী আৰু সমাজকৰ্মী ওমিও কুমাৰ দাসক 'লোকসেৱক' বুলি জনা যায়।")

q("Pushpalata Das, a prominent Assamese freedom fighter, was the wife of which leader?",
  "অসমৰ বিশিষ্ট স্বাধীনতা সংগ্ৰামী পুষ্পলতা দাস কোন নেতাৰ পত্নী আছিল?",
  [o("Omeo Kumar Das", "ওমিও কুমাৰ দাস"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি")], 0,
  "Pushpalata Das was the wife of Omeo Kumar Das and herself an active freedom fighter.",
  "পুষ্পলতা দাস ওমিও কুমাৰ দাসৰ পত্নী আছিল আৰু নিজেও এগৰাকী সক্ৰিয় স্বাধীনতা সংগ্ৰামী আছিল।")

q("Which Assamese leader was known as 'Assam Kesari'?",
  "কোন অসমীয়া নেতাক 'অসম কেশৰী' বুলি জনা যায়?",
  [o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Nabin Chandra Bordoloi", "নৱিন চন্দ্ৰ বৰদলৈ")], 0,
  "Ambikagiri Raichoudhury, a fiery nationalist poet and leader, was known as 'Assam Kesari'.",
  "উগ্ৰ জাতীয়তাবাদী কবি আৰু নেতা অম্বিকাগিৰি ৰায়চৌধুৰীক 'অসম কেশৰী' বুলি জনা যায়।")

q("Which Assamese leader was known as the 'Architect of Modern Assam'?",
  "কোন অসমীয়া নেতাক 'আধুনিক অসমৰ স্থপতি' বুলি জনা যায়?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"),
   o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Gopinath Bordoloi is regarded as the architect of modern Assam.",
  "গোপীনাথ বৰদলৈক আধুনিক অসমৰ স্থপতি বুলি গণ্য কৰা হয়।")

q("Who was Nabin Chandra Bordoloi?",
  "নৱিন চন্দ্ৰ বৰদলৈ কোন আছিল?",
  [o("A nationalist leader and father of Gopinath Bordoloi", "এজন জাতীয়তাবাদী নেতা আৰু গোপীনাথ বৰদলৈৰ পিতৃ"),
   o("The first Chief Minister of Assam", "অসমৰ প্ৰথম মুখ্যমন্ত্ৰী"),
   o("A martyr of the Quit India Movement", "ভাৰত ত্যাগ আন্দোলনৰ এজন শ্বহীদ"),
   o("The first Governor of Assam", "অসমৰ প্ৰথম ৰাজ্যপাল")], 0,
  "Nabin Chandra Bordoloi was a nationalist leader of Assam and the father of Gopinath Bordoloi.",
  "নৱিন চন্দ্ৰ বৰদলৈ অসমৰ এজন জাতীয়তাবাদী নেতা আৰু গোপীনাথ বৰদলৈৰ পিতৃ আছিল।")

print("part3:", len(RAW))

# ------------------------------------------------------------------
# 4. Quit India martyrs and heroes of Assam (Q64-Q80)
# ------------------------------------------------------------------
q("Kanaklata Barua was shot dead at which place?",
  "কনকলতা বৰুৱাক ক'ত গুলীয়াই হত্যা কৰা হৈছিল?",
  [o("Gohpur", "গহপুৰ"), o("Barhampur", "বৰহমপুৰ"),
   o("Sarupathar", "শৰুপথাৰ"), o("Patharughat", "পথৰুঘাট")], 0,
  "Kanaklata Barua was shot dead at Gohpur on 20 September 1942 while leading a procession to hoist the tricolour.",
  "১৯৪২ চনৰ ২০ ছেপ্তেম্বৰত ত্ৰিৰঙা পতাকা উত্তোলনৰ শোভাযাত্ৰাৰ নেতৃত্ব দিওঁতে কনকলতা বৰুৱাক গহপুৰত গুলীয়াই হত্যা কৰা হৈছিল।")

q("Kanaklata Barua belonged to which district?",
  "কনকলতা বৰুৱা কোন জিলাৰ আছিল?",
  [o("Sonitpur (Gohpur)", "শোণিতপুৰ (গহপুৰ)"), o("Golaghat", "গোলাঘাট"),
   o("Nagaon", "নগাঁও"), o("Jorhat", "যোৰহাট")], 0,
  "Kanaklata Barua belonged to Borangabari in the Gohpur subdivision of Sonitpur district.",
  "কনকলতা বৰুৱা শোণিতপুৰ জিলাৰ গহপুৰ মহকুমাৰ বৰংগাবাৰী গাঁৱৰ আছিল।")

q("Kanaklata Barua was a member of which organisation?",
  "কনকলতা বৰুৱা কোন সংগঠনৰ সদস্য আছিল?",
  [o("The Mrityu Bahini", "মৃত্যু বাহিনী"), o("The Assam Sahitya Sabha", "অসম সাহিত্য সভা"),
   o("The Assam Chatra Sanmilan", "অসম ছাত্ৰ সন্মিলন"), o("The Seva Dal", "সেৱা দল")], 0,
  "Kanaklata Barua was a member of the Mrityu Bahini, the volunteer wing of the Quit India Movement.",
  "কনকলতা বৰুৱা ভাৰত ত্যাগ আন্দোলনৰ স্বেচ্ছাসেৱক শাখা মৃত্যু বাহিনীৰ সদস্য আছিল।")

q("How old was Kanaklata Barua when she was shot dead?",
  "কনকলতা বৰুৱাক গুলীয়াই হত্যা কৰাৰ সময়ত তাইৰ বয়স কিমান আছিল?",
  [o("15", "১৫"), o("17", "১৭"),
   o("21", "২১"), o("25", "২৫")], 1,
  "Kanaklata Barua was only 17 years old when she was shot dead in 1942.",
  "১৯৪২ চনত কনকলতা বৰুৱাক গুলীয়াই হত্যা কৰাৰ সময়ত তাইৰ বয়স মাত্ৰ ১৭ বছৰ আছিল।")

q("Who sacrificed his life along with Kanaklata Barua at Gohpur?",
  "গহপুৰত কনকলতা বৰুৱাৰ সৈতে কাক গুলীয়াই হত্যা কৰা হৈছিল?",
  [o("Mukunda Kakati", "মুকুন্দ কাকতি"), o("Kushal Konwar", "কুশল কোঁৱৰ"),
   o("Piyoli Barua", "পিয়লি বৰুৱা"), o("Gomdhar Konwar", "গমধৰ কোঁৱৰ")], 0,
  "Mukunda Kakati was shot dead along with Kanaklata Barua at Gohpur.",
  "গহপুৰত কনকলতা বৰুৱাৰ সৈতে মুকুন্দ কাকতিকো গুলীয়াই হত্যা কৰা হৈছিল।")

q("Kushal Konwar was hanged in which year?",
  "কুশল কোঁৱৰক কোন বছৰত ফাঁচী দিয়া হৈছিল?",
  [o("1942", "১৯৪২"), o("1943", "১৯৪৩"),
   o("1944", "১৯৪৪"), o("1945", "১৯৪৫")], 1,
  "Kushal Konwar was hanged on 15 June 1943.",
  "কুশল কোঁৱৰক ১৯৪৩ চনৰ ১৫ জুনত ফাঁচী দিয়া হৈছিল।")

q("Kushal Konwar was accused in connection with which incident?",
  "কুশল কোঁৱৰক কোন ঘটনাৰ সৈতে জড়িত বুলি অভিযুক্ত কৰা হৈছিল?",
  [o("The Sarupathar train derailment", "শৰুপথাৰ ৰে'ল লাইনচ্যুত ঘটনা"), o("The Gohpur firing", "গহপুৰ গুলীবৰ্ষণ"),
   o("The Barhampur firing", "বৰহমপুৰ গুলীবৰ্ষণ"), o("The Patharughat firing", "পথৰুঘাট গুলীবৰ্ষণ")], 0,
  "Kushal Konwar was accused of involvement in the Sarupathar train derailment during the Quit India Movement.",
  "ভাৰত ত্যাগ আন্দোলনৰ সময়ত শৰুপথাৰ ৰে'ল লাইনচ্যুত ঘটনাত জড়িত থকাৰ অভিযোগত কুশল কোঁৱৰক গ্ৰেপ্তাৰ কৰা হৈছিল।")

q("Kushal Konwar was hanged at which jail?",
  "কুশল কোঁৱৰক কোন কাৰাগাৰত ফাঁচী দিয়া হৈছিল?",
  [o("Jorhat Central Jail", "যোৰহাট কেন্দ্ৰীয় কাৰাগাৰ"), o("Guwahati Jail", "গুৱাহাটী কাৰাগাৰ"),
   o("Dibrugarh Jail", "ডিব্ৰুগড় কাৰাগাৰ"), o("Tezpur Jail", "তেজপুৰ কাৰাগাৰ")], 0,
  "Kushal Konwar was hanged at Jorhat Central Jail.",
  "কুশল কোঁৱৰক যোৰহাট কেন্দ্ৰীয় কাৰাগাৰত ফাঁচী দিয়া হৈছিল।")

q("Kushal Konwar belonged to which district?",
  "কুশল কোঁৱৰ কোন জিলাৰ আছিল?",
  [o("Golaghat", "গোলাঘাট"), o("Jorhat", "যোৰহাট"),
   o("Sibsagar", "শিৱসাগৰ"), o("Dibrugarh", "ডিব্ৰুগড়")], 0,
  "Kushal Konwar belonged to Golaghat district.",
  "কুশল কোঁৱৰ গোলাঘাট জিলাৰ আছিল।")

q("Kushal Konwar was associated with which movement?",
  "কুশল কোঁৱৰ কোন আন্দোলনৰ সৈতে জড়িত আছিল?",
  [o("The Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("The Civil Disobedience Movement", "আইন অৱজ্ঞা আন্দোলন"),
   o("The Non-Cooperation Movement", "অসহযোগ আন্দোলন"), o("The Swadeshi Movement", "স্বদেশী আন্দোলন")], 0,
  "Kushal Konwar was a prominent leader of the Quit India Movement in Assam and was hanged in 1943.",
  "কুশল কোঁৱৰ অসমত ভাৰত ত্যাগ আন্দোলনৰ এজন বিশিষ্ট নেতা আছিল আৰু ১৯৪৩ চনত তেওঁক ফাঁচী দিয়া হৈছিল।")

q("Who was Bhogeswari Phukanani?",
  "ভোগেশ্বৰী ফুকননী কোন আছিল?",
  [o("A martyr of the Quit India Movement in Assam", "অসমত ভাৰত ত্যাগ আন্দোলনৰ এগৰাকী শ্বহীদ"),
   o("The first woman Chief Minister of Assam", "অসমৰ প্ৰথম মহিলা মুখ্যমন্ত্ৰী"),
   o("A leader of the Assam Sahitya Sabha", "অসম সাহিত্য সভাৰ এগৰাকী নেত্ৰী"),
   o("A tea garden worker leader", "চাহ বাগিচাৰ শ্ৰমিক নেত্ৰী")], 0,
  "Bhogeswari Phukanani was a martyr of the Quit India Movement, shot dead at Barhampur police station in Nagaon in 1942.",
  "ভোগেশ্বৰী ফুকননী ভাৰত ত্যাগ আন্দোলনৰ এগৰাকী শ্বহীদ আছিল; ১৯৪২ চনত নগাঁৱৰ বৰহমপুৰ আৰক্ষী চকীত তেওঁক গুলীয়াই হত্যা কৰা হৈছিল।")

q("Bhogeswari Phukanani was shot dead at which place?",
  "ভোগেশ্বৰী ফুকননীক ক'ত গুলীয়াই হত্যা কৰা হৈছিল?",
  [o("Barhampur police station, Nagaon", "বৰহমপুৰ আৰক্ষী চকী, নগাঁও"), o("Gohpur police station", "গহপুৰ আৰক্ষী চকী"),
   o("Jorhat Central Jail", "যোৰহাট কেন্দ্ৰীয় কাৰাগাৰ"), o("Sarupathar", "শৰুপথাৰ")], 0,
  "Bhogeswari Phukanani was shot dead at the Barhampur police station in Nagaon district during the Quit India Movement.",
  "ভাৰত ত্যাগ আন্দোলনৰ সময়ত নগাঁও জিলাৰ বৰহমপুৰ আৰক্ষী চকীত ভোগেশ্বৰী ফুকননীক গুলীয়াই হত্যা কৰা হৈছিল।")

q("The Sarupathar train derailment of 1942 is associated with which movement?",
  "১৯৪২ চনৰ শৰুপথাৰ ৰে'ল লাইনচ্যুত ঘটনা কোন আন্দোলনৰ সৈতে জড়িত?",
  [o("The Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("The Civil Disobedience Movement", "আইন অৱজ্ঞা আন্দোলন"),
   o("The Non-Cooperation Movement", "অসহযোগ আন্দোলন"), o("The Khilafat Movement", "খিলাফত আন্দোলন")], 0,
  "The Sarupathar train derailment occurred in 1942 during the Quit India Movement; Kushal Konwar was tried and hanged for it.",
  "১৯৪২ চনত ভাৰত ত্যাগ আন্দোলনৰ সময়ত শৰুপথাৰ ৰে'ল লাইনচ্যুত ঘটনা সংঘটিত হৈছিল; ইয়াৰ বাবে কুশল কোঁৱৰক বিচাৰ কৰি ফাঁচী দিয়া হৈছিল।")

q("Who is regarded as the first martyr of the 1942 movement in Assam to hoist the tricolour at a police station?",
  "আৰক্ষী চকীত ত্ৰিৰঙা উত্তোলন কৰিবলৈ গৈ শ্বহীদ হোৱা অসমৰ ১৯৪২ চনৰ আন্দোলনৰ প্ৰথম শ্বহীদ বুলি কাক গণ্য কৰা হয়?",
  [o("Kanaklata Barua", "কনকলতা বৰুৱা"), o("Bhogeswari Phukanani", "ভোগেশ্বৰী ফুকননী"),
   o("Pushpalata Das", "পুষ্পলতা দাস"), o("Chandraprabha Saikiani", "চন্দ্ৰপ্ৰভা শইকীয়ানী")], 0,
  "Kanaklata Barua is regarded as one of the youngest martyrs of the Quit India Movement in Assam, killed while leading a flag procession to the Gohpur police station.",
  "গহপুৰ আৰক্ষী চকীলৈ পতাকা শোভাযাত্ৰাৰ নেতৃত্ব দিওঁতে নিহত কনকলতা বৰুৱাক অসমত ভাৰত ত্যাগ আন্দোলনৰ আটাইতকৈ কম বয়সীয়া শ্বহীদসকলৰ এগৰাকী বুলি গণ্য কৰা হয়।")

q("Jyoti Prasad Agarwala, known as 'Rupkonwar', contributed to the freedom movement by?",
  "'ৰূপকোঁৱৰ' বুলি জনাজাত জ্যোতিপ্ৰসাদ আগৰৱালাই স্বাধীনতা আন্দোলনলৈ কি অৱদান আগবঢ়াইছিল?",
  [o("Writing nationalist songs and joining the Quit India Movement", "জাতীয়তাবাদী গীত ৰচনা আৰু ভাৰত ত্যাগ আন্দোলনত যোগদান"),
   o("Leading a peasant revolt", "কৃষক বিদ্ৰোহৰ নেতৃত্ব দান"),
   o("Founding the Indian National Congress", "ভাৰতীয় জাতীয় কংগ্ৰেছ প্ৰতিষ্ঠা"),
   o("Serving as the first Chief Minister", "প্ৰথম মুখ্যমন্ত্ৰী হিচাপে কাৰ্য কৰা")], 0,
  "Jyoti Prasad Agarwala wrote patriotic songs and took part in the Quit India Movement; he was imprisoned for his activities.",
  "জ্যোতিপ্ৰসাদ আগৰৱালাই দেশপ্ৰেমমূলক গীত ৰচনা কৰিছিল আৰু ভাৰত ত্যাগ আন্দোলনত অংশ লৈছিল; তেওঁৰ কাৰ্যকলাপৰ বাবে কাৰাবাস খাটিছিল।")

q("Bishnu Prasad Rabha, known as 'Kalaguru', was associated with which cause?",
  "'কালাগুৰু' বুলি জনাজাত বিষ্ণু প্ৰসাদ ৰাভা কোন কাৰ্যৰ সৈতে জড়িত আছিল?",
  [o("The freedom movement and the rights of the downtrodden", "স্বাধীনতা আন্দোলন আৰু শোষিতসকলৰ অধিকাৰ"),
   o("The Assam Sahitya Sabha only", "কেৱল অসম সাহিত্য সভা"),
   o("The tea planters' association", "চাহ খেতিয়ক সংস্থা"),
   o("The British administration", "ব্ৰিটিছ প্ৰশাসন")], 0,
  "Bishnu Prasad Rabha was a freedom fighter, artist and champion of the poor who joined the freedom struggle and later the Communist movement.",
  "বিষ্ণু প্ৰসাদ ৰাভা এজন স্বাধীনতা সংগ্ৰামী, শিল্পী আৰু দৰিদ্ৰৰ হিতকাৰী আছিল; তেওঁ স্বাধীনতা সংগ্ৰামত আৰু পিছত কমিউনিষ্ট আন্দোলনত যোগদান কৰিছিল।")

q("In which year was the Assam Sahitya Sabha founded?",
  "অসম সাহিত্য সভা কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [o("1916", "১৯১৬"), o("1917", "১৯১৭"),
   o("1921", "১৯২১"), o("1903", "১৯০৩")], 1,
  "The Assam Sahitya Sabha was founded in 1917 at Sivasagar.",
  "অসম সাহিত্য সভা ১৯১৭ চনত শিৱসাগৰত প্ৰতিষ্ঠা হৈছিল।")

q("In which year was the Assam Chatra Sanmilan founded?",
  "অসম ছাত্ৰ সন্মিলন কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [o("1916", "১৯১৬"), o("1917", "১৯১৭"),
   o("1921", "১৯২১"), o("1930", "১৯৩০")], 0,
  "The Assam Chatra Sanmilan (Assam Students' Conference) was founded in 1916 and became a nursery of nationalist sentiment.",
  "অসম ছাত্ৰ সন্মিলন ১৯১৬ চনত প্ৰতিষ্ঠা হৈছিল আৰু জাতীয়তাবাদী ভাবধাৰাৰ প্ৰশিক্ষণক্ষেত্ৰ হৈ পৰিছিল।")

print("part4:", len(RAW))

# ------------------------------------------------------------------
# 5. Women and tribal freedom fighters (Q82-Q100)
# ------------------------------------------------------------------
q("Chandraprabha Saikiani is known for which contribution to Assam?",
  "চন্দ্ৰপ্ৰভা শইকীয়ানীয়ে অসমলৈ কি অৱদানৰ বাবে জনাজাত?",
  [o("Pioneering women's education and the freedom movement", "নাৰী শিক্ষা আৰু স্বাধীনতা আন্দোলনৰ পথপ্ৰদৰ্শন"),
   o("Founding the Assam Association", "অসম এছ'চিয়েশ্যন প্ৰতিষ্ঠা"),
   o("Leading the Ahom army", "আহোম সেনাৰ নেতৃত্ব দান"),
   o("Founding the Assam Sahitya Sabha", "অসম সাহিত্য সভা প্ৰতিষ্ঠা")], 0,
  "Chandraprabha Saikiani was a pioneer of women's education in Assam and an active participant in the freedom movement.",
  "চন্দ্ৰপ্ৰভা শইকীয়ানী অসমত নাৰী শিক্ষাৰ পথপ্ৰদৰ্শক আছিল আৰু স্বাধীনতা আন্দোলনত সক্ৰিয়ভাৱে অংশগ্ৰহণ কৰিছিল।")

q("In which year was the Assam Mahila Samiti founded with Chandraprabha Saikiani's initiative?",
  "চন্দ্ৰপ্ৰভা শইকীয়ানীৰ উদ্যোগত অসম মহিলা সমিতি কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [o("1916", "১৯১৬"), o("1926", "১৯২৬"),
   o("1930", "১৯৩০"), o("1942", "১৯৪২")], 1,
  "The Assam Mahila Samiti was founded in 1926, with Chandraprabha Saikiani playing a leading role.",
  "১৯২৬ চনত অসম মহিলা সমিতি প্ৰতিষ্ঠা হৈছিল আৰু চন্দ্ৰপ্ৰভা শইকীয়ানীয়ে নেতৃত্ব দিছিল।")

q("Rani Gaidinliu belonged to which community?",
  "ৰাণী গাইডিনলিউ কোন জনগোষ্ঠীৰ আছিল?",
  [o("Naga (Zeliangrong)", "নাগা (জেলিয়াংৰং)"), o("Khasi", "খাচী"),
   o("Mishing", "মিচিং"), o("Bodo", "বড়ো")], 0,
  "Rani Gaidinliu was a Naga (Zeliangrong) freedom fighter from the North Cachar Hills region.",
  "ৰাণী গাইডিনলিউ উত্তৰ কাছাৰ পাহাৰ অঞ্চলৰ এগৰাকী নাগা (জেলিয়াংৰং) স্বাধীনতা সংগ্ৰামী আছিল।")

q("Rani Gaidinliu was arrested by the British in which year?",
  "ব্ৰিটিছে ৰাণী গাইডিনলিউক কোন বছৰত গ্ৰেপ্তাৰ কৰিছিল?",
  [o("1929", "১৯২৯"), o("1931", "১৯৩১"),
   o("1932", "১৯৩২"), o("1937", "১৯৩৭")], 2,
  "Rani Gaidinliu was arrested by the British in 1932 and sentenced to life imprisonment.",
  "ব্ৰিটিছে ১৯৩২ চনত ৰাণী গাইডিনলিউক গ্ৰেপ্তাৰ কৰি যাৱজ্জীৱন কাৰাদণ্ড বিহিছিল।")

q("Haipou Jadonang, a tribal freedom fighter, was hanged by the British in which year?",
  "জনজাতীয় স্বাধীনতা সংগ্ৰামী হাইপৌ জাডোনাংক ব্ৰিটিছে কোন বছৰত ফাঁচী দিছিল?",
  [o("1929", "১৯২৯"), o("1931", "১৯৩১"),
   o("1932", "১৯৩২"), o("1943", "১৯৪৩")], 1,
  "Haipou Jadonang was hanged by the British in 1931.",
  "ব্ৰিটিছে ১৯৩১ চনত হাইপৌ জাডোনাংক ফাঁচী দিছিল।")

q("Haipou Jadonang was a freedom fighter of which community?",
  "হাইপৌ জাডোনাং কোন জনগোষ্ঠীৰ স্বাধীনতা সংগ্ৰামী আছিল?",
  [o("Zeliangrong (Naga)", "জেলিয়াংৰং (নাগা)"), o("Khasi", "খাচী"),
   o("Mikir (Karbi)", "মিকিৰ (কাৰ্বি)"), o("Rabha", "ৰাভা")], 0,
  "Haipou Jadonang was a Zeliangrong (Naga) leader who resisted British rule in the North Cachar Hills.",
  "হাইপৌ জাডোনাং এজন জেলিয়াংৰং (নাগা) নেতা আছিল যিয়ে উত্তৰ কাছাৰ পাহাৰত ব্ৰিটিছ শাসনৰ প্ৰতিৰোধ কৰিছিল।")

q("Tirot Sing was a freedom fighter of which community?",
  "টিৰট সিং কোন জনগোষ্ঠীৰ স্বাধীনতা সংগ্ৰামী আছিল?",
  [o("Khasi", "খাচী"), o("Naga", "নাগা"),
   o("Bodo", "বড়ো"), o("Mishing", "মিচিং")], 0,
  "Tirot Sing was a Khasi chief who led an uprising against the British in the Khasi Hills.",
  "টিৰট সিং এজন খাচী সৰ্দাৰ আছিল যিয়ে খাচী পাহাৰত ব্ৰিটিছৰ বিৰুদ্ধে বিদ্ৰোহৰ নেতৃত্ব দিছিল।")

q("In which year did Tirot Sing begin his revolt against the British?",
  "টিৰট সিঙে ব্ৰিটিছৰ বিৰুদ্ধে বিদ্ৰোহ কোন বছৰত আৰম্ভ কৰিছিল?",
  [o("1826", "১৮২৬"), o("1829", "১৮২৯"),
   o("1857", "১৮৫৭"), o("1894", "১৮৯৪")], 1,
  "Tirot Sing began his revolt against the British in 1829.",
  "টিৰট সিঙে ১৮২৯ চনত ব্ৰিটিছৰ বিৰুদ্ধে বিদ্ৰোহ আৰম্ভ কৰিছিল।")

q("Gomdhar Konwar, an early Assamese rebel, was associated with which royal family?",
  "প্ৰাৰম্ভিক অসমীয়া বিদ্ৰোহী গমধৰ কোঁৱৰ কোন ৰাজপৰিয়ালৰ সৈতে জড়িত আছিল?",
  [o("The Ahom royal family", "আহোম ৰাজপৰিয়াল"), o("The Koch royal family", "কোচ ৰাজপৰিয়াল"),
   o("The Kachari royal family", "কছাৰী ৰাজপৰিয়াল"), o("The Chutiya royal family", "চুতীয়া ৰাজপৰিয়াল")], 0,
  "Gomdhar Konwar belonged to the Ahom royal family and led an early revolt against the British in 1828.",
  "গমধৰ কোঁৱৰ আহোম ৰাজপৰিয়ালৰ আছিল আৰু ১৮২৮ চনত ব্ৰিটিছৰ বিৰুদ্ধে প্ৰাৰম্ভিক বিদ্ৰোহৰ নেতৃত্ব দিছিল।")

q("Pushpalata Das, the Assamese freedom fighter, later served as a member of which national body?",
  "অসমৰ স্বাধীনতা সংগ্ৰামী পুষ্পলতা দাসে পিছত কোন ৰাষ্ট্ৰীয় পৰিষদৰ সদস্যা হিচাপে কাৰ্য কৰিছিল?",
  [o("The Rajya Sabha", "ৰাজ্যসভা"), o("The Lok Sabha", "লোকসভা"),
   o("The Planning Commission", "পৰিকল্পনা আয়োগ"), o("The Election Commission", "নিৰ্বাচন আয়োগ")], 0,
  "Pushpalata Das, a Congress worker and Quit India activist, later served as a member of the Rajya Sabha.",
  "কংগ্ৰেছ কৰ্মী আৰু ভাৰত ত্যাগ আন্দোলনৰ কৰ্মী পুষ্পলতা দাসে পিছত ৰাজ্যসভাৰ সদস্যা হিচাপে কাৰ্য কৰিছিল।")

q("The Assamese women's organisation 'Assam Mahila Samiti' worked mainly for?",
  "অসমীয়া মহিলা সংগঠন 'অসম মহিলা সমিতি'য়ে মূলতঃ কিৰ বাবে কাম কৰিছিল?",
  [o("Women's education and social reform", "নাৰী শিক্ষা আৰু সমাজ সংস্কাৰ"),
   o("Tea trade promotion", "চাহ ব্যৱসায় প্ৰসাৰ"),
   o("Land revenue collection", "ভূমি ৰাজহ সংগ্ৰহ"),
   o("Military recruitment", "সামৰিক নিযুক্তি")], 0,
  "The Assam Mahila Samiti worked for women's education, social reform and their participation in the freedom movement.",
  "অসম মহিলা সমিতিয়ে নাৰী শিক্ষা, সমাজ সংস্কাৰ আৰু স্বাধীনতা আন্দোলনত মহিলাৰ অংশগ্ৰহণৰ বাবে কাম কৰিছিল।")

q("Rani Gaidinliu was given the title 'Rani' by which leader?",
  "ৰাণী গাইডিনলিউক 'ৰাণী' উপাধি কোন নেতাই দিছিল?",
  [o("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), o("Mahatma Gandhi", "মহাত্মা গান্ধী"),
   o("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ")], 0,
  "Jawaharlal Nehru met Rani Gaidinliu in Shillong jail in 1937 and gave her the title 'Rani' (Queen of the Nagas).",
  "১৯৩৭ চনত জৱাহৰলাল নেহৰুৱে শ্বিলঙৰ কাৰাগাৰত ৰাণী গাইডিনলিউক লগ কৰি 'ৰাণী' উপাধি দিছিল।")

q("Which Assamese woman leader was known for her role in the Quit India Movement and later became an MP?",
  "কোন অসমীয়া মহিলা নেত্ৰীয়ে ভাৰত ত্যাগ আন্দোলনত ভূমিকা ৰাখি পিছত সংসদ সদস্য হৈছিল?",
  [o("Pushpalata Das", "পুষ্পলতা দাস"), o("Bhogeswari Phukanani", "ভোগেশ্বৰী ফুকননী"),
   o("Kanaklata Barua", "কনকলতা বৰুৱা"), o("Chandraprabha Saikiani", "চন্দ্ৰপ্ৰভা শইকীয়ানী")], 0,
  "Pushpalata Das took part in the Quit India Movement and later served as a member of Parliament.",
  "পুষ্পলতা দাসে ভাৰত ত্যাগ আন্দোলনত অংশ লৈছিল আৰু পিছত সংসদ সদস্য হিচাপে কাৰ্য কৰিছিল।")

q("The 'Mrityu Bahini' volunteers in Assam were mainly?",
  "অসমত 'মৃত্যু বাহিনী'ৰ স্বেচ্ছাসেৱকসকল মূলতঃ কোন আছিল?",
  [o("Young men and women ready to die for freedom", "স্বাধীনতাৰ বাবে মৰিবলৈ প্ৰস্তুত যুৱক-যুৱতী"),
   o("British-paid informers", "ব্ৰিটিছৰ বেতনভুক তথ্যদাতা"),
   o("Tea garden managers", "চাহ বাগিচাৰ পৰিচালক"),
   o("Soldiers of the Ahom army", "আহোম সেনাৰ সৈনিক")], 0,
  "The Mrityu Bahini was a volunteer corps of young men and women who pledged to sacrifice their lives for freedom.",
  "মৃত্যু বাহিনী আছিল যুৱক-যুৱতীসকলৰ এটা স্বেচ্ছাসেৱক বাহিনী যিসকলে স্বাধীনতাৰ বাবে প্ৰাণ উছৰ্গা কৰাৰ প্ৰতিজ্ঞা লৈছিল।")

q("In which year was the All India Women's Conference held in Assam under nationalist influence?",
  "জাতীয়তাবাদী প্ৰভাৱত অসমত সৰ্বভাৰতীয় মহিলা সন্মিলন কোন বছৰত অনুষ্ঠিত হৈছিল?",
  [o("1921", "১৯২১"), o("1926", "১৯২৬"),
   o("1937", "১৯৩৭"), o("1942", "১৯৪২")], 2,
  "Assam hosted nationalist women's gatherings in the late 1930s, strengthening women's participation in the freedom movement.",
  "১৯৩০ দশকৰ শেষৰ ফালে অসমে জাতীয়তাবাদী মহিলা সন্মিলন আয়োজন কৰিছিল, যাৰ ফলত স্বাধীনতা আন্দোলনত মহিলাৰ অংশগ্ৰহণ শক্তিশালী হৈছিল।")

q("Who among these was a Khasi freedom fighter hanged by the British?",
  "ইহঁতৰ ভিতৰত কোন এজন খাচী স্বাধীনতা সংগ্ৰামী আছিল যাক ব্ৰিটিছে ফাঁচী দিছিল?",
  [o("Tirot Sing", "টিৰট সিং"), o("Haipou Jadonang", "হাইপৌ জাডোনাং"),
   o("Maniram Dewan", "মণিৰাম দেৱান"), o("Kushal Konwar", "কুশল কোঁৱৰ")], 0,
  "Tirot Sing, the Khasi chief, died in British captivity in 1835 after leading the Khasi revolt.",
  "খাচী সৰ্দাৰ টিৰট সিং খাচী বিদ্ৰোহৰ নেতৃত্ব দিয়াৰ পিছত ১৮৩৫ চনত ব্ৰিটিছৰ কাৰাবাসত মৃত্যুবৰণ কৰিছিল।")

q("The Zeliangrong movement in Assam was led by?",
  "অসমত জেলিয়াংৰং আন্দোলনৰ নেতৃত্ব কোনে দিছিল?",
  [o("Haipou Jadonang and Rani Gaidinliu", "হাইপৌ জাডোনাং আৰু ৰাণী গাইডিনলিউ"),
   o("Maniram Dewan and Piyoli Barua", "মণিৰাম দেৱান আৰু পিয়লি বৰুৱা"),
   o("Gopinath Bordoloi and Tarun Ram Phukan", "গোপীনাথ বৰদলৈ আৰু তৰুণ ৰাম ফুকন"),
   o("Kushal Konwar and Mukunda Kakati", "কুশল কোঁৱৰ আৰু মুকুন্দ কাকতি")], 0,
  "The Zeliangrong movement was led by Haipou Jadonang and, after his death, by Rani Gaidinliu.",
  "জেলিয়াংৰং আন্দোলনৰ নেতৃত্ব হাইপৌ জাডোনাঙে দিছিল আৰু তেওঁৰ মৃত্যুৰ পিছত ৰাণী গাইডিনলিউৱে দিছিল।")

q("Which Assamese woman is remembered as a symbol of the Quit India Movement's youth?",
  "কোন অসমীয়া মহিলাক ভাৰত ত্যাগ আন্দোলনৰ যুৱ শক্তিক প্ৰতিনিধিত্ব কৰা বুলি স্মৰণ কৰা হয়?",
  [o("Kanaklata Barua", "কনকলতা বৰুৱা"), o("Milon Kumar", "মিলন কুমাৰ"),
   o("Pushpalata Das", "পুষ্পলতা দাস"), o("Chandraprabha Saikiani", "চন্দ্ৰপ্ৰভা শইকীয়ানী")], 0,
  "Kanaklata Barua, a teenager who died at Gohpur in 1942, is remembered as a symbol of the youth of the Quit India Movement.",
  "১৯৪২ চনত গহপুৰত নিহত কিশোৰী কনকলতা বৰুৱাক ভাৰত ত্যাগ আন্দোলনৰ যুৱ শক্তিক প্ৰতিনিধিত্ব কৰা বুলি স্মৰণ কৰা হয়।")

q("Bhogeswari Phukanani's family was associated with which movement?",
  "ভোগেশ্বৰী ফুকননীৰ পৰিয়াল কোন আন্দোলনৰ সৈতে জড়িত আছিল?",
  [o("The Congress and Gandhian movement", "কংগ্ৰেছ আৰু গান্ধীবাদী আন্দোলন"),
   o("The British administration", "ব্ৰিটিছ প্ৰশাসন"),
   o("The tea planters' lobby", "চাহ খেতিয়ক গোষ্ঠী"),
   o("The Ahom court", "আহোম দৰবাৰ")], 0,
  "Bhogeswari Phukanani's family was active in the Congress and Gandhian movement in Nagaon.",
  "ভোগেশ্বৰী ফুকননীৰ পৰিয়াল নগাঁৱত কংগ্ৰেছ আৰু গান্ধীবাদী আন্দোলনত সক্ৰিয় আছিল।")

print("part5:", len(RAW))

# ------------------------------------------------------------------
# 6. Congress leaders and institutions in Assam (Q101-Q115)
# ------------------------------------------------------------------
q("Who was the first Chief Minister of Assam?",
  "অসমৰ প্ৰথম মুখ্যমন্ত্ৰী কোন আছিল?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Saratchandra Sinha", "সৰৎচন্দ্ৰ সিনহা")], 0,
  "Gopinath Bordoloi was the first Chief Minister of Assam after independence.",
  "স্বাধীনতাৰ পিছত গোপীনাথ বৰদলৈ অসমৰ প্ৰথম মুখ্যমন্ত্ৰী আছিল।")

q("Gopinath Bordoloi served as the Chief Minister of Assam from which year?",
  "গোপীনাথ বৰদলৈয়ে কোন বছৰৰ পৰা অসমৰ মুখ্যমন্ত্ৰী হিচাপে কাৰ্য কৰিছিল?",
  [o("1946", "১৯৪৬"), o("1950", "১৯৫০"),
   o("1947", "১৯৪৭"), o("1937", "১৯৩৭")], 0,
  "Gopinath Bordoloi became Premier/Chief Minister of Assam in 1946 and continued after independence.",
  "গোপীনাথ বৰদলৈ ১৯৪৬ চনত অসমৰ প্ৰধানমন্ত্ৰী/মুখ্যমন্ত্ৰী হৈছিল আৰু স্বাধীনতাৰ পিছতো কাৰ্য কৰিছিল।")

q("Gopinath Bordoloi was awarded which honour posthumously?",
  "গোপীনাথ বৰদলৈক মৰণোত্তৰভাৱে কোন সন্মান প্ৰদান কৰা হৈছিল?",
  [o("Bharat Ratna", "ভাৰত ৰত্ন"), o("Padma Vibhushan", "পদ্ম বিভূষণ"),
   o("Param Vir Chakra", "পৰম বীৰ চক্ৰ"), o("Dadasaheb Phalke Award", "দাদাচাহেব ফাল্কে বঁটা")], 0,
  "Gopinath Bordoloi was posthumously awarded the Bharat Ratna in 1999.",
  "১৯৯৯ চনত গোপীনাথ বৰদলৈক মৰণোত্তৰভাৱে ভাৰত ৰত্ন প্ৰদান কৰা হৈছিল।")

q("Who among the following was the Premier of Assam before independence?",
  "তলৰ কোনজন স্বাধীনতাৰ পূৰ্বে অসমৰ প্ৰধানমন্ত্ৰী আছিল?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Gopinath Bordoloi was the Premier of Assam before independence and became Chief Minister afterwards.",
  "গোপীনাথ বৰদলৈ স্বাধীনতাৰ পূৰ্বে অসমৰ প্ৰধানমন্ত্ৰী আছিল আৰু পিছত মুখ্যমন্ত্ৰী হৈছিল।")

q("Who succeeded Gopinath Bordoloi as Chief Minister of Assam?",
  "গোপীনাথ বৰদলৈৰ পিছত অসমৰ মুখ্যমন্ত্ৰী কোন হৈছিল?",
  [o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি"), o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"),
   o("Omeo Kumar Das", "ওমিও কুমাৰ দাস"), o("Saratchandra Sinha", "সৰৎচন্দ্ৰ সিনহা")], 0,
  "Bishnu Ram Medhi succeeded Gopinath Bordoloi as Chief Minister of Assam.",
  "গোপীনাথ বৰদলৈৰ পিছত বিষ্ণু ৰাম মেধি অসমৰ মুখ্যমন্ত্ৰী হৈছিল।")

q("Which Assamese leader worked to keep Assam out of Pakistan during partition?",
  "বিভাজনৰ সময়ত অসমক পাকিস্তানৰ বাহিৰত ৰাখিবলৈ কোন অসমীয়া নেতাই কাম কৰিছিল?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি")], 0,
  "Gopinath Bordoloi played a key role in keeping Assam within India during partition, working with the Cabinet Mission plan.",
  "বিভাজনৰ সময়ত কেবিনেট মিছন পৰিকল্পনাৰ সৈতে কাম কৰি গোপীনাথ বৰদলৈয়ে অসমক ভাৰতৰ ভিতৰত ৰখাত গুৰুত্বপূৰ্ণ ভূমিকা লৈছিল।")

q("Which British plan proposed to group Assam with Bengal, against which Bordoloi fought?",
  "কোন ব্ৰিটিছ পৰিকল্পনাই অসমক বঙ্গৰ সৈতে গ্ৰুপ কৰাৰ প্ৰস্তাৱ দিছিল, যাৰ বিৰুদ্ধে বৰদলৈয়ে যুঁজিছিল?",
  [o("The Grouping Plan of 1946", "১৯৪৬ চনৰ গ্ৰুপিং প্লেন"), o("The Rowlatt Act", "ৰাউলাট আইন"),
   o("The Simon Commission report", "চাইমন আয়োগৰ প্ৰতিবেদন"), o("The Cripps Mission", "ক্ৰিপছ মিছন")], 0,
  "The Grouping Plan under the Cabinet Mission of 1946 proposed grouping Assam with Bengal; Gopinath Bordoloi resisted it.",
  "১৯৪৬ চনৰ কেবিনেট মিছনৰ অধীনত গ্ৰুপিং প্লেনে অসমক বঙ্গৰ সৈতে গ্ৰুপ কৰাৰ প্ৰস্তাৱ দিছিল; গোপীনাথ বৰদলৈয়ে ইয়াৰ বিৰোধিতা কৰিছিল।")

q("The 'Bordoloi Ministry' in Assam was formed in which year?",
  "অসমত 'বৰদলৈ মন্ত্ৰীসভা' কোন বছৰত গঠন হৈছিল?",
  [o("1937", "১৯৩৭"), o("1946", "১৯৪৬"),
   o("1950", "১৯৫০"), o("1952", "১৯৫২")], 1,
  "The Bordoloi Ministry was formed in Assam in 1946.",
  "১৯৪৬ চনত অসমত বৰদলৈ মন্ত্ৰীসভা গঠন হৈছিল।")

q("Who was the first Governor of Assam after independence?",
  "স্বাধীনতাৰ পিছত অসমৰ প্ৰথম ৰাজ্যপাল কোন আছিল?",
  [o("Muhammad Saleh Akbar Hydari", "মহম্মদ চালেহ আকবৰ হাইদৰী"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি"), o("Saiyid Fazal Ali", "চৈয়দ ফজল আলী")], 0,
  "Sir Muhammad Saleh Akbar Hydari was the first Governor of Assam after independence.",
  "ছাৰ মহম্মদ চালেহ আকবৰ হাইদৰী স্বাধীনতাৰ পিছত অসমৰ প্ৰথম ৰাজ্যপাল আছিল।")

q("Which leader from Assam was a member of the Drafting Committee of the Indian Constitution?",
  "অসমৰ কোন নেতা ভাৰতীয় সংবিধানৰ খচৰা সমিতিৰ সদস্য আছিল?",
  [o("Mohammad Saadulla", "মহম্মদ চাদুল্লা"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Sir Mohammad Saadulla of Assam was one of the members of the Drafting Committee of the Indian Constitution, chaired by B. R. Ambedkar.",
  "অসমৰ ছাৰ মহম্মদ চাদুল্লা বি. আৰ. আম্বেদকাৰৰ অধ্যক্ষতাত গঠিত ভাৰতীয় সংবিধানৰ খচৰা সমিতিৰ সদস্যসকলৰ এজন আছিল।")

q("Who was known as the 'Gandhi of Assam'?",
  "কাক 'অসমৰ গান্ধী' বুলি জনা যায়?",
  [o("Omeo Kumar Das", "ওমিও কুমাৰ দাস"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি")], 0,
  "Omeo Kumar Das, a devoted Gandhian who spread khadi and village industries in Assam, was called the 'Gandhi of Assam'.",
  "অসমত খাদী আৰু গ্ৰাম্য উদ্যোগ প্ৰসাৰ কৰা নিষ্ঠাবান গান্ধীবাদী ওমিও কুমাৰ দাসক 'অসমৰ গান্ধী' বুলি জনা যায়।")

q("The Assam Pradesh Congress Committee was reorganised in which decade?",
  "অসম প্ৰদেশ কংগ্ৰেছ কমিটি কোন দশকত পুনৰ্গঠিত হৈছিল?",
  [o("1920s", "১৯২০ৰ দশক"), o("1930s", "১৯৩০ৰ দশক"),
   o("1940s", "১৯৪০ৰ দশক"), o("1950s", "১৯৫০ৰ দশক")], 0,
  "The Assam Pradesh Congress Committee was reorganised in the 1920s after the Non-Cooperation Movement.",
  "অসহযোগ আন্দোলনৰ পিছত ১৯২০ৰ দশকত অসম প্ৰদেশ কংগ্ৰেছ কমিটি পুনৰ্গঠিত হৈছিল।")

q("Who was the Chief Minister of Assam at the time of India's independence in 1947?",
  "১৯৪৭ চনত ভাৰতৰ স্বাধীনতাৰ সময়ত অসমৰ মুখ্যমন্ত্ৰী কোন আছিল?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Gopinath Bordoloi was the Chief Minister of Assam in 1947.",
  "১৯৪৭ চনত গোপীনাথ বৰদলৈ অসমৰ মুখ্যমন্ত্ৰী আছিল।")

q("Under the Government of India Act 1919, in which year did Assam become a Governor's province?",
  "ভাৰত শাসন আইন ১৯১৯ ৰ অধীনত অসম কোন বছৰত ৰাজ্যপালৰ প্ৰদেশ হৈছিল?",
  [o("1919", "১৯১৯"), o("1921", "১৯২১"),
   o("1935", "১৯৩৫"), o("1947", "১৯৪৭")], 1,
  "Under the Montagu-Chelmsford reforms of the Government of India Act 1919, Assam became a Governor's province in 1921.",
  "ভাৰত শাসন আইন ১৯১৯ ৰ মন্টেগু-চেমছফৰ্ড সংস্কাৰৰ অধীনত ১৯২১ চনত অসম ৰাজ্যপালৰ প্ৰদেশ হৈছিল।")

q("Which Assamese freedom fighter wrote patriotic songs and founded the Assam Sangrakshini Sabha?",
  "কোন অসমীয়া স্বাধীনতা সংগ্ৰামীয়ে দেশপ্ৰেমমূলক গীত ৰচনা কৰি অসম সংগ্ৰক্ষিণী সভা প্ৰতিষ্ঠা কৰিছিল?",
  [o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Ambikagiri Raichoudhury wrote patriotic songs and founded the Assam Sangrakshini Sabha to protect Assamese interests.",
  "অম্বিকাগিৰি ৰায়চৌধুৰীয়ে দেশপ্ৰেমমূলক গীত ৰচনা কৰিছিল আৰু অসমীয়াৰ স্বাৰ্থ ৰক্ষাৰ বাবে অসম সংগ্ৰক্ষিণী সভা প্ৰতিষ্ঠা কৰিছিল।")

q("Who founded the 'Assam Sangrakshini Sabha' to protect Assamese interests?",
  "অসমীয়াৰ স্বাৰ্থ ৰক্ষাৰ বাবে 'অসম সংগ্ৰক্ষিণী সভা' কোনে প্ৰতিষ্ঠা কৰিছিল?",
  [o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Maniram Dewan", "মণিৰাম দেৱান")], 0,
  "Ambikagiri Raichoudhury founded the Assam Sangrakshini Sabha to safeguard Assamese culture and identity.",
  "অম্বিকাগিৰি ৰায়চৌধুৰীয়ে অসমীয়া সংস্কৃতি আৰু পৰিচয় ৰক্ষাৰ বাবে অসম সংগ্ৰক্ষিণী সভা প্ৰতিষ্ঠা কৰিছিল।")

print("part6:", len(RAW))

# ------------------------------------------------------------------
# 7. Peasant, labour and tribal resistance (Q117-Q130)
# ------------------------------------------------------------------
q("The 'Phulaguri Dhawa' of 1861 was a protest by which group?",
  "১৮৬১ চনৰ 'ফুলগুৰি ধাৱা' কোন গোটৰ প্ৰতিবাদ আছিল?",
  [o("Peasants", "কৃষক"), o("Tea garden workers", "চাহ বাগিচাৰ শ্ৰমিক"),
   o("Students", "ছাত্ৰ"), o("Soldiers", "সৈনিক")], 0,
  "The Phulaguri Dhawa was a peasant protest against taxation and forest laws.",
  "ফুলগুৰি ধাৱা কৰ আৰু বন আইনৰ বিৰুদ্ধে কৃষকৰ প্ৰতিবাদ আছিল।")

q("Who was the leader of the Phulaguri uprising killed in the firing?",
  "গুলীবৰ্ষণত নিহত ফুলগুৰি বিদ্ৰোহৰ নেতা কোন আছিল?",
  [o("Laluk", "লালুক"), o("Gomdhar Konwar", "গমধৰ কোঁৱৰ"),
   o("Maniram Dewan", "মণিৰাম দেৱান"), o("Piyoli Barua", "পিয়লি বৰুৱা")], 0,
  "The peasant leader Laluk was killed in the firing at Phulaguri in 1861.",
  "১৮৬১ চনত ফুলগুৰিত গুলীবৰ্ষণত কৃষক নেতা লালুক নিহত হৈছিল।")

q("The Patharughat uprising of 1894 was primarily against which British measure?",
  "১৮৯৪ চনৰ পথৰুঘাট বিদ্ৰোহ মূলতঃ কোন ব্ৰিটিছ পদক্ষেপৰ বিৰুদ্ধে আছিল?",
  [o("Increase in land revenue", "ভূমি ৰাজহ বৃদ্ধি"), o("The partition of Bengal", "বঙ্গ ভাগ"),
   o("A new education policy", "নতুন শিক্ষা নীতি"), o("The census", "জনগণনা")], 0,
  "The Patharughat uprising was against the increase in land revenue.",
  "পথৰুঘাট বিদ্ৰোহ ভূমি ৰাজহ বৃদ্ধিৰ বিৰুদ্ধে আছিল।")

q("In which year did the Patharughat peasants gather for their protest?",
  "পথৰুঘাটৰ কৃষকসকলে কোন বছৰত প্ৰতিবাদৰ বাবে সমবেত হৈছিল?",
  [o("1893", "১৮৯৩"), o("1894", "১৮৯৪"),
   o("1897", "১৮৯৭"), o("1905", "১৯০৫")], 1,
  "The Patharughat peasants gathered on 28 January 1894 and were fired upon by police.",
  "১৮৯৪ চনৰ ২৮ জানুৱাৰীত পথৰুঘাটৰ কৃষকসকল সমবেত হৈছিল আৰু আৰক্ষীয়ে গুলীবৰ্ষণ কৰিছিল।")

q("Which British officer ordered the firing at Patharughat?",
  "পথৰুঘাটত গুলীবৰ্ষণৰ আদেশ কোন ব্ৰিটিছ বিষয়াই দিছিল?",
  [o("The Deputy Commissioner of Darrang", "দৰং জিলাৰ উপায়ুক্ত"), o("The Governor of Assam", "অসমৰ ৰাজ্যপাল"),
   o("The Viceroy", "ভাইচৰয়"), o("The Superintendent of Police", "আৰক্ষী অধীক্ষক")], 0,
  "The firing at Patharughat was ordered by the local British administration, then under the Deputy Commissioner of Darrang.",
  "পথৰুঘাটত গুলীবৰ্ষণৰ আদেশ স্থানীয় ব্ৰিটিছ প্ৰশাসনে দিছিল, তেতিয়া দৰং জিলাৰ উপায়ুক্তৰ অধীনত।")

q("The tea garden workers of Assam were mobilised in the freedom movement by which organisation?",
  "অসমৰ চাহ বাগিচাৰ শ্ৰমিকসকলক স্বাধীনতা আন্দোলনত কোন সংগঠনে সংগঠিত কৰিছিল?",
  [o("The Assam Branch of the Indian National Congress and trade unions", "ভাৰতীয় জাতীয় কংগ্ৰেছৰ অসম শাখা আৰু শ্ৰমিক সংঘ"),
   o("The British administration", "ব্ৰিটিছ প্ৰশাসন"),
   o("The Assam Sahitya Sabha", "অসম সাহিত্য সভা"),
   o("The tea planters' association", "চাহ খেতিয়ক সংস্থা")], 0,
  "Congress workers and trade unions mobilised tea garden labourers in Assam during the freedom movement.",
  "স্বাধীনতা আন্দোলনৰ সময়ত কংগ্ৰেছ কৰ্মী আৰু শ্ৰমিক সংঘই অসমৰ চাহ বাগিচাৰ শ্ৰমিকসকলক সংগঠিত কৰিছিল।")

q("Who led the Assam tea garden workers' movement in the 1940s?",
  "১৯৪০ৰ দশকত অসমৰ চাহ বাগিচা শ্ৰমিক আন্দোলনৰ নেতৃত্ব কোনে দিছিল?",
  [o("Trade union leaders aligned with the Congress and Communists", "কংগ্ৰেছ আৰু কমিউনিষ্টৰ সৈতে জড়িত শ্ৰমিক নেতাসকল"),
   o("British planters", "ব্ৰিটিছ খেতিয়ক"),
   o("The Ahom nobility", "আহোম সম্ভ্ৰান্তসকল"),
   o("The Assam Sahitya Sabha", "অসম সাহিত্য সভা")], 0,
  "Trade union leaders worked with the Congress and the Communist Party to organise tea garden workers in the 1940s.",
  "১৯৪০ৰ দশকত শ্ৰমিক নেতাসকলে কংগ্ৰেছ আৰু কমিউনিষ্ট পাৰ্টিৰ সৈতে মিলি চাহ বাগিচাৰ শ্ৰমিকসকলক সংগঠিত কৰিছিল।")

q("The 'Sarbajanik Sabha' type village assemblies used in peasant protests were called?",
  "কৃষক প্ৰতিবাদত ব্যৱহৃত গাঁৱৰ সাধাৰণ সভাক কি বুলি কোৱা হৈছিল?",
  [o("Raijmel", "ৰাইজমেল"), o("Panchayat", "পঞ্চায়ত"),
   o("Darbar", "দৰবাৰ"), o("Khel", "খেল")], 0,
  "Traditional Assamese village assemblies, called raijmel, were used to organise peasant protests.",
  "ৰাইজমেল বুলি কোৱা পৰম্পৰাগত অসমীয়া গাঁৱৰ সভাৰ জৰিয়তে কৃষক প্ৰতিবাদ সংগঠিত কৰা হৈছিল।")

q("Which community's chiefs resisted British tea expansion in Upper Assam?",
  "কোন জনগোষ্ঠীৰ সৰ্দাৰসকলে ঊজনী অসমত ব্ৰিটিছৰ চাহ বিস্তাৰৰ প্ৰতিৰোধ কৰিছিল?",
  [o("The Singhpho and other frontier communities", "সিংফৌ আৰু অন্য সীমান্তৱৰ্তী জনগোষ্ঠী"),
   o("The Khasi", "খাচী"),
   o("The Bodo", "বড়ো"),
   o("The Mishing", "মিচিং")], 0,
  "Frontier communities such as the Singhpho resisted British expansion and the intrusion into their lands.",
  "সিংফৌৰ দৰে সীমান্তৱৰ্তী জনগোষ্ঠীয়ে ব্ৰিটিছৰ বিস্তাৰ আৰু তেওঁলোকৰ ভূমিত অনুপ্ৰৱেশৰ প্ৰতিৰোধ কৰিছিল।")

q("Which Ahom noble family produced several freedom fighters in the nineteenth century?",
  "কোন আহোম সম্ভ্ৰান্ত পৰিয়ালে ঊনবিংশ শতিকাত কেইবাজনো স্বাধীনতা সংগ্ৰামী সৃষ্টি কৰিছিল?",
  [o("The Dewan family of Jorhat", "যোৰহাটৰ দেৱান পৰিয়াল"),
   o("The Bordoloi family of Guwahati", "গুৱাহাটীৰ বৰদলৈ পৰিয়াল"),
   o("The Phukan family of Tezpur", "তেজপুৰৰ ফুকন পৰিয়াল"),
   o("The Barua family of Golaghat", "গোলাঘাটৰ বৰুৱা পৰিয়াল")], 0,
  "Maniram Dewan's family in Jorhat was central to the early resistance in Assam.",
  "যোৰহাটৰ মণিৰাম দেৱানৰ পৰিয়াল অসমত প্ৰাৰম্ভিক প্ৰতিৰোধৰ কেন্দ্ৰবিন্দু আছিল।")

q("The 'Assam Company' was established in 1839 mainly for which purpose?",
  "'অসম কোম্পানী' ১৮৩৯ চনত মূলতঃ কি উদ্দেশ্যে প্ৰতিষ্ঠা হৈছিল?",
  [o("Tea cultivation and trade", "চাহ খেতি আৰু ব্যৱসায়"), o("Coal mining", "কয়লা খনন"),
   o("Railway construction", "ৰে'লপথ নিৰ্মাণ"), o("Oil exploration", "তেল অন্বেষণ")], 0,
  "The Assam Company was established in 1839 to cultivate and trade tea in Assam.",
  "১৮৩৯ চনত অসমত চাহ খেতি আৰু ব্যৱসায়ৰ বাবে অসম কোম্পানী প্ৰতিষ্ঠা হৈছিল।")

q("Which peasant leader of Kamrup resisted the increase in land revenue in 1893-94?",
  "১৮৯৩-৯৪ চনত কামৰূপৰ কোন কৃষক নেতাই ভূমি ৰাজহ বৃদ্ধিৰ প্ৰতিৰোধ কৰিছিল?",
  [o("Gomdhar Konwar", "গমধৰ কোঁৱৰ"), o("Laluk", "লালুক"),
   o("Maniram Dewan", "মণিৰাম দেৱান"), o("Kushal Konwar", "কুশল কোঁৱৰ")], 0,
  "Gomdhar Konwar is associated with the peasant resistance in the Kamrup region against revenue enhancement.",
  "ৰাজহ বৃদ্ধিৰ বিৰুদ্ধে কামৰূপ অঞ্চলৰ কৃষক প্ৰতিৰোধৰ সৈতে গমধৰ কোঁৱৰ জড়িত।")

q("The 'Darrang Raijmel' was associated with which peasant protest?",
  "'দৰং ৰাইজমেল' কোন কৃষক প্ৰতিবাদৰ সৈতে জড়িত আছিল?",
  [o("The Patharughat uprising", "পথৰুঘাট বিদ্ৰোহ"), o("The Phulaguri uprising", "ফুলগুৰি বিদ্ৰোহ"),
   o("The Rangiya uprising", "ৰঙিয়া বিদ্ৰোহ"), o("The Sarupathar incident", "শৰুপথাৰ ঘটনা")], 0,
  "The Darrang Raijmel mobilised peasants for the Patharughat uprising of 1894.",
  "দৰং ৰাইজমেলে ১৮৯৪ চনৰ পথৰুঘাট বিদ্ৰোহৰ বাবে কৃষকসকলক সংগঠিত কৰিছিল।")

q("The 'Patharughat Smriti' is remembered every year on which date?",
  "'পথৰুঘাট স্মৃতি' প্ৰতি বছৰে কোন তাৰিখে স্মৰণ কৰা হয়?",
  [o("28 January", "২৮ জানুৱাৰী"), o("20 September", "২০ ছেপ্তেম্বৰ"),
   o("15 June", "১৫ জুন"), o("8 August", "৮ আগষ্ট")], 0,
  "The Patharughat peasants' uprising of 28 January 1894 is commemorated every year on 28 January.",
  "১৮৯৪ চনৰ ২৮ জানুৱাৰীত সংঘটিত পথৰুঘাট কৃষক বিদ্ৰোহ প্ৰতি বছৰে ২৮ জানুৱাৰীত স্মৰণ কৰা হয়।")

print("part7:", len(RAW))

# ------------------------------------------------------------------
# 8. Press, culture and the final phase (Q131-Q150)
# ------------------------------------------------------------------
q("Which of the following was an early Assamese newspaper that carried nationalist writing?",
  "তলৰ কোনটো জাতীয়তাবাদী লেখনি প্ৰকাশ কৰা এটা প্ৰাৰম্ভিক অসমীয়া বাতৰি কাকত আছিল?",
  [o("Assam Bandhu", "অসম বন্ধু"), o("The Times of India", "দ্য টাইমছ অৱ ইণ্ডিয়া"),
   o("The Hindu", "দ্য হিন্দু"), o("Amrita Bazar Patrika", "অমৃত বাজাৰ পত্ৰিকা")], 0,
  "Assam Bandhu was an early Assamese newspaper through which nationalist ideas reached readers in Assam.",
  "অসম বন্ধু আছিল এটা প্ৰাৰম্ভিক অসমীয়া বাতৰি কাকত যাৰ জৰিয়তে জাতীয়তাবাদী ভাব অসমৰ পাঠকৰ ওচৰ চাপিছিল।")

q("Who edited the Assamese periodical 'Bahire Rongsong'?",
  "অসমীয়া পত্ৰিকা 'বাহিৰে ৰংসং' কোনে সম্পাদনা কৰিছিল?",
  [o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস")], 0,
  "Ambikagiri Raichoudhury edited Assamese periodicals that carried nationalist writing.",
  "অম্বিকাগিৰি ৰায়চৌধুৰীয়ে জাতীয়তাবাদী লেখনি প্ৰকাশ কৰা অসমীয়া পত্ৰিকা সম্পাদনা কৰিছিল।")

q("Jyoti Prasad Agarwala is called 'Rupkonwar' for his contribution to which field?",
  "জ্যোতিপ্ৰসাদ আগৰৱালাক কোন ক্ষেত্ৰত অৱদানৰ বাবে 'ৰূপকোঁৱৰ' বুলি কোৱা হয়?",
  [o("Assamese music and cinema", "অসমীয়া সংগীত আৰু চলচ্চিত্ৰ"), o("Assamese politics", "অসমীয়া ৰাজনীতি"),
   o("Assamese sports", "অসমীয়া ক্ৰীড়া"), o("Assamese agriculture", "অসমীয়া কৃষি")], 0,
  "Jyoti Prasad Agarwala is called 'Rupkonwar' for his pioneering contribution to Assamese music and cinema.",
  "অসমীয়া সংগীত আৰু চলচ্চিত্ৰলৈ পথপ্ৰদৰ্শক অৱদানৰ বাবে জ্যোতিপ্ৰসাদ আগৰৱালাক 'ৰূপকোঁৱৰ' বুলি কোৱা হয়।")

q("The first Assamese film 'Joymoti' was made by whom, and in which year?",
  "প্ৰথম অসমীয়া চলচ্চিত্ৰ 'জয়মতী' কোনে আৰু কোন বছৰত নিৰ্মাণ কৰিছিল?",
  [o("Jyoti Prasad Agarwala, 1935", "জ্যোতিপ্ৰসাদ আগৰৱালা, ১৯৩৫"), o("Bishnu Prasad Rabha, 1935", "বিষ্ণু প্ৰসাদ ৰাভা, ১৯৩৫"),
   o("Jyoti Prasad Agarwala, 1941", "জ্যোতিপ্ৰসাদ আগৰৱালা, ১৯৪১"), o("Bishnu Prasad Rabha, 1941", "বিষ্ণু প্ৰসাদ ৰাভা, ১৯৪১")], 0,
  "The first Assamese film 'Joymoti' was made by Jyoti Prasad Agarwala in 1935.",
  "প্ৰথম অসমীয়া চলচ্চিত্ৰ 'জয়মতী' জ্যোতিপ্ৰসাদ আগৰৱালাই ১৯৩৫ চনত নিৰ্মাণ কৰিছিল।")

q("Which Assamese cultural figure also joined the freedom movement and was jailed?",
  "কোন অসমীয়া সাংস্কৃতিক ব্যক্তিত্বই স্বাধীনতা আন্দোলনত যোগদান কৰি কাৰাবাস খাটিছিল?",
  [o("Jyoti Prasad Agarwala", "জ্যোতিপ্ৰসাদ আগৰৱালা"), o("Bishnu Prasad Rabha", "বিষ্ণু প্ৰসাদ ৰাভা"),
   o("Both Jyoti Prasad Agarwala and Bishnu Prasad Rabha", "জ্যোতিপ্ৰসাদ আগৰৱালা আৰু বিষ্ণু প্ৰসাদ ৰাভা দুয়োজন"),
   o("None of them", "তেওঁলোকৰ কোনেও নহয়")], 2,
  "Both Jyoti Prasad Agarwala and Bishnu Prasad Rabha took part in the freedom movement and faced imprisonment.",
  "জ্যোতিপ্ৰসাদ আগৰৱালা আৰু বিষ্ণু প্ৰসাদ ৰাভা দুয়োজনেই স্বাধীনতা আন্দোলনত অংশ লৈছিল আৰু কাৰাবাস খাটিছিল।")

q("In which year did India attain independence?",
  "ভাৰতে কোন বছৰত স্বাধীনতা লাভ কৰিছিল?",
  [o("1945", "১৯৪৫"), o("1946", "১৯৪৬"),
   o("1947", "১৯৪৭"), o("1950", "১৯৫০")], 2,
  "India attained independence on 15 August 1947.",
  "ভাৰতে ১৯৪৭ চনৰ ১৫ আগষ্টত স্বাধীনতা লাভ কৰিছিল।")

q("Which date is celebrated as Independence Day in India?",
  "ভাৰতত কোন তাৰিখে স্বাধীনতা দিৱস পালন কৰা হয়?",
  [o("26 January", "২৬ জানুৱাৰী"), o("15 August", "১৫ আগষ্ট"),
   o("2 October", "২ অক্টোবৰ"), o("14 November", "১৪ নৱেম্বৰ")], 1,
  "Independence Day is celebrated on 15 August every year.",
  "প্ৰতি বছৰে ১৫ আগষ্টত স্বাধীনতা দিৱস পালন কৰা হয়।")

q("Who was the last Viceroy of India?",
  "ভাৰতৰ শেষ ভাইচৰয় কোন আছিল?",
  [o("Lord Mountbatten", "লৰ্ড মাউণ্টবেটেন"), o("Lord Wavell", "লৰ্ড ৱেভেল"),
   o("Lord Linlithgow", "লৰ্ড লিনলিথগৌ"), o("Lord Irwin", "লৰ্ড আৰউইন")], 0,
  "Lord Mountbatten was the last Viceroy of India.",
  "লৰ্ড মাউণ্টবেটেন ভাৰতৰ শেষ ভাইচৰয় আছিল।")

q("The Indian Independence Act was passed by the British Parliament in which year?",
  "ব্ৰিটিছ সংসদে ভাৰতীয় স্বাধীনতা আইন কোন বছৰত গৃহীত কৰিছিল?",
  [o("1946", "১৯৪৬"), o("1947", "১৯৪৭"),
   o("1948", "১৯৪৮"), o("1950", "১৯৫০")], 1,
  "The Indian Independence Act was passed by the British Parliament in 1947.",
  "ব্ৰিটিছ সংসদে ১৯৪৭ চনত ভাৰতীয় স্বাধীনতা আইন গৃহীত কৰিছিল।")

q("Which Assamese leader is credited with securing Assam's place in India during partition?",
  "বিভাজনৰ সময়ত ভাৰতত অসমৰ স্থান নিশ্চিত কৰাৰ কৃতিত্ব কোন অসমীয়া নেতাক দিয়া হয়?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"),
   o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি")], 0,
  "Gopinath Bordoloi is credited with securing Assam's place in India during partition.",
  "বিভাজনৰ সময়ত ভাৰতত অসমৰ স্থান নিশ্চিত কৰাৰ কৃতিত্ব গোপীনাথ বৰদলৈক দিয়া হয়।")

q("The 'Cabinet Mission' that visited India in 1946 had how many members?",
  "১৯৪৬ চনত ভাৰত ভ্ৰমণ কৰা 'কেবিনেট মিছন'ত কিমানজন সদস্য আছিল?",
  [o("Two", "দুজন"), o("Three", "তিনিজন"),
   o("Four", "চাৰিজন"), o("Five", "পাঁচজন")], 1,
  "The Cabinet Mission of 1946 had three members: Pethick-Lawrence, Stafford Cripps and A. V. Alexander.",
  "১৯৪৬ চনৰ কেবিনেট মিছনত তিনিজন সদস্য আছিল: পেথিক-লৰেন্স, ষ্টাফৰ্ড ক্ৰিপছ আৰু এ. ভি. আলেকজেণ্ডাৰ।")

q("Which Assamese leader opposed the grouping of Assam with Bengal under the Cabinet Mission plan?",
  "কেবিনেট মিছন পৰিকল্পনাৰ অধীনত অসমক বঙ্গৰ সৈতে গ্ৰুপ কৰাৰ বিৰোধিতা কোন অসমীয়া নেতাই কৰিছিল?",
  [o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Omeo Kumar Das", "ওমিও কুমাৰ দাস"),
   o("Bishnu Prasad Rabha", "বিষ্ণু প্ৰসাদ ৰাভা"), o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী")], 0,
  "Gopinath Bordoloi strongly opposed the grouping of Assam with Bengal and secured Assam's separate status.",
  "গোপীনাথ বৰদলৈয়ে অসমক বঙ্গৰ সৈতে গ্ৰুপ কৰাৰ তীব্ৰ বিৰোধিতা কৰিছিল আৰু অসমৰ পৃথক মৰ্যাদা নিশ্চিত কৰিছিল।")

q("The Assam freedom fighter Omeo Kumar Das was imprisoned for his role in which movement?",
  "অসমৰ স্বাধীনতা সংগ্ৰামী ওমিও কুমাৰ দাসক কোন আন্দোলনত ভূমিকা লোৱাৰ বাবে কাৰাবাস দিয়া হৈছিল?",
  [o("The Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("The Swadeshi Movement", "স্বদেশী আন্দোলন"),
   o("The Khilafat Movement", "খিলাফত আন্দোলন"), o("The Home Rule Movement", "হোম ৰুল আন্দোলন")], 0,
  "Omeo Kumar Das was imprisoned for his participation in the Quit India Movement and earlier Gandhian movements.",
  "ওমিও কুমাৰ দাসক ভাৰত ত্যাগ আন্দোলন আৰু তাৰ পূৰ্বৰ গান্ধীবাদী আন্দোলনত অংশ লোৱাৰ বাবে কাৰাবাস দিয়া হৈছিল।")

q("The Assamese periodical 'Bahire Rongsong' was brought out by which leader?",
  "অসমীয়া পত্ৰিকা 'বাহিৰে ৰংসং' কোন নেতাই প্ৰকাশ কৰিছিল?",
  [o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Bishnu Ram Medhi", "বিষ্ণু ৰাম মেধি")], 0,
  "Ambikagiri Raichoudhury brought out Assamese periodicals such as 'Bahire Rongsong' to spread nationalist ideas.",
  "জাতীয়তাবাদী ভাব বিস্তাৰৰ বাবে অম্বিকাগিৰি ৰায়চৌধুৰীয়ে 'বাহিৰে ৰংসং'ৰ দৰে অসমীয়া পত্ৰিকা প্ৰকাশ কৰিছিল।")

q("Who was the first Assamese woman to receive the 'Rani' title from Nehru?",
  "নেহৰুৰ পৰা 'ৰাণী' উপাধি লাভ কৰা প্ৰথম অসমীয়া মহিলা কোন আছিল?",
  [o("Rani Gaidinliu", "ৰাণী গাইডিনলিউ"), o("Pushpalata Das", "পুষ্পলতা দাস"),
   o("Chandraprabha Saikiani", "চন্দ্ৰপ্ৰভা শইকীয়ানী"), o("Milon Kumar", "মিলন কুমাৰ")], 0,
  "Rani Gaidinliu was given the title 'Rani' by Jawaharlal Nehru for her leadership of the Naga freedom movement.",
  "নাগা স্বাধীনতা আন্দোলনৰ নেতৃত্বৰ বাবে জৱাহৰলাল নেহৰুৱে ৰাণী গাইডিনলিউক 'ৰাণী' উপাধি দিছিল।")

q("The Quit India Movement in Assam saw the formation of which volunteer corps?",
  "অসমত ভাৰত ত্যাগ আন্দোলনে কোন স্বেচ্ছাসেৱক বাহিনী গঠন কৰিছিল?",
  [o("The Mrityu Bahini", "মৃত্যু বাহিনী"), o("The Seva Dal", "সেৱা দল"),
   o("The Rashtriya Swayamsevak Sangh", "ৰাষ্ট্ৰীয় স্বয়ংসেৱক সংঘ"), o("The Forward Bloc volunteers", "ফৰৱাৰ্ড ব্লক স্বেচ্ছাসেৱক")], 0,
  "The Mrityu Bahini (Death Squad) was formed in Assam during the Quit India Movement of 1942.",
  "১৯৪২ চনৰ ভাৰত ত্যাগ আন্দোলনৰ সময়ত অসমত মৃত্যু বাহিনী গঠন হৈছিল।")

q("The Indian National Congress session at Guwahati in 1926 was presided over by which leader?",
  "১৯২৬ চনত গুৱাহাটীত অনুষ্ঠিত ভাৰতীয় জাতীয় কংগ্ৰেছ অধিৱেশনৰ সভাপতি কোন নেতা আছিল?",
  [o("Srinivas Iyengar", "শ্ৰীনিবাস আয়েঙ্গাৰ"), o("Mahatma Gandhi", "মহাত্মা গান্ধী"),
   o("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), o("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু")], 0,
  "The 1926 Guwahati session of the Indian National Congress was presided over by Srinivas Iyengar.",
  "১৯২৬ চনত গুৱাহাটীত অনুষ্ঠিত ভাৰতীয় জাতীয় কংগ্ৰেছ অধিৱেশনৰ সভাপতি আছিল শ্ৰীনিবাস আয়েঙ্গাৰ।")

q("Which Assamese leader worked to spread khadi and village industries as part of the freedom movement?",
  "স্বাধীনতা আন্দোলনৰ অংশ হিচাপে খাদী আৰু গ্ৰাম্য উদ্যোগ বিস্তাৰত কোন অসমীয়া নেতাই কাম কৰিছিল?",
  [o("Omeo Kumar Das", "ওমিও কুমাৰ দাস"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"),
   o("Tarun Ram Phukan", "তৰুণ ৰাম ফুকন"), o("Ambikagiri Raichoudhury", "অম্বিকাগিৰি ৰায়চৌধুৰী")], 0,
  "Omeo Kumar Das, a Gandhian, worked to spread khadi and village industries in Assam.",
  "গান্ধীবাদী ওমিও কুমাৰ দাসে অসমত খাদী আৰু গ্ৰাম্য উদ্যোগ বিস্তাৰত কাম কৰিছিল।")

q("Which year marked the end of British rule in India?",
  "কোন বছৰে ভাৰতত ব্ৰিটিছ শাসনৰ অন্ত পেলাইছিল?",
  [o("1942", "১৯৪২"), o("1945", "১৯৪৫"),
   o("1947", "১৯৪৭"), o("1950", "১৯৫০")], 2,
  "British rule in India ended in 1947.",
  "১৯৪৭ চনত ভাৰতত ব্ৰিটিছ শাসনৰ অন্ত পৰিছিল।")

q("The contribution of Assam's freedom fighters is best remembered through which annual observance?",
  "অসমৰ স্বাধীনতা সংগ্ৰামীসকলৰ অৱদান কোন বাৰ্ষিক অনুষ্ঠানৰ জৰিয়তে সৰ্বাধিক স্মৰণ কৰা হয়?",
  [o("Independence Day and martyrdom anniversaries at Gohpur, Patharughat and Jorhat", "স্বাধীনতা দিৱস আৰু গহপুৰ, পথৰুঘাট আৰু যোৰহাটত শ্বহীদ দিৱস"),
   o("Only Republic Day", "কেৱল গণতন্ত্ৰ দিৱস"),
   o("Only Gandhi Jayanti", "কেৱল গান্ধী জয়ন্তী"),
   o("Only Assam Day", "কেৱল অসম দিৱস")], 0,
  "Assam's freedom fighters are remembered through Independence Day and the martyrdom anniversaries observed at Gohpur, Patharughat and Jorhat.",
  "অসমৰ স্বাধীনতা সংগ্ৰামীসকলক স্বাধীনতা দিৱস আৰু গহপুৰ, পথৰুঘাট আৰু যোৰহাটত পালন কৰা শ্বহীদ দিৱসৰ জৰিয়তে স্মৰণ কৰা হয়।")

print("part8:", len(RAW))


# ------------------------------------------------------------------
# Emit the trending-topic JSON
# ------------------------------------------------------------------
finalize()
DATA = {
    "id": "assam-freedom-fighters",
    "title": {
        "en": "Assam Freedom Fighters: 150 Most Important Questions",
        "as": "অসমৰ স্বাধীনতা সংগ্ৰামী: ১৫০ টা অতি গুৰুত্বপূৰ্ণ প্ৰশ্ন",
    },
    "description": {
        "en": "150 most important questions and answers on the Assam freedom movement and its freedom fighters, for ADRE, APSC, Assam Police and other competitive exams.",
        "as": "অসমৰ স্বাধীনতা আন্দোলন আৰু স্বাধীনতা সংগ্ৰামীসকলৰ ওপৰত ১৫০ টা অতি গুৰুত্বপূৰ্ণ প্ৰশ্ন আৰু উত্তৰ — ADRE, APSC, অসম আৰক্ষী আৰু অন্য প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে।",
    },
    "tags": [
        "assam", "freedom-fighters", "freedom-struggle", "1857", "quit-india",
        "trending", "অসম", "স্বাধীনতা সংগ্ৰামী", "স্বাধীনতা সংগ্ৰাম",
    ],
    "popularity": 10,
    "pdf": None,
    "questions": Q,
}

out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "data", "trending-topics", "assam-freedom-fighters.json")
os.makedirs(os.path.dirname(out), exist_ok=True)
with open(out, "w", encoding="utf-8") as f:
    json.dump(DATA, f, ensure_ascii=False, indent=2)
    f.write("\n")

assert len(Q) == 150, f"expected 150 questions, got {len(Q)}"
for i, item in enumerate(Q):
    assert len(item["options"]["en"]) == 4, f"Q{i+1} does not have 4 options"
    assert item["a"]["en"] == item["options"]["en"][item["correct"]], f"Q{i+1} answer mismatch"
    assert item["a"]["as"] == item["options"]["as"][item["correct"]], f"Q{i+1} answer mismatch (as)"
print("wrote", out, "with", len(Q), "questions")
