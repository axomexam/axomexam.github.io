#!/usr/bin/env python3
"""Conjunctions: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "conjunctions"

COORD = ["and", "but", "or", "nor", "for", "yet", "so"]
SUBORD = ["because", "although", "though", "if", "unless", "while", "whereas",
          "since", "as", "until", "after", "before", "whether", "when",
          "so that", "even though", "as if", "as though", "provided that",
          "in case", "once", "than", "that"]
CORR = ["Either...or", "Neither...nor", "Both...and", "Not only...but also",
        "No sooner...than"]
CONJADV = ["therefore", "hence", "thus", "consequently", "however",
           "nevertheless", "still", "otherwise", "moreover"]

COORD_ITEMS = [
    ("I was tired, ___ I kept working.", "but"),
    ("She sings ___ dances well.", "and"),
    ("Would you like tea ___ coffee?", "or"),
    ("He is poor ___ honest.", "but"),
    ("She was late, ___ she missed the bus.", "so"),
    ("He is old, ___ he is strong.", "yet"),
    ("He neither ate ___ slept.", "nor"),
    ("He must be tired, ___ he worked all day.", "for"),
    ("She opened the door ___ went out.", "and"),
    ("He tried hard, ___ he failed.", "but"),
    ("You can stay ___ leave.", "or"),
    ("She did not call, ___ did she write.", "nor"),
    ("It was raining, ___ we stayed indoors.", "so"),
    ("He is rich, ___ he is not happy.", "yet"),
    ("She was ill, ___ she attended the class.", "but"),
    ("He studied hard, ___ he passed.", "so"),
    ("The room was small ___ comfortable.", "but"),
    ("She likes tea, ___ he likes coffee.", "and"),
    ("Hurry up, ___ you will miss the train.", "or"),
    ("He is honest, ___ everyone trusts him.", "so"),
    ("She is clever ___ lazy.", "but"),
    ("He did not eat, ___ did he drink.", "nor"),
    ("We waited, ___ the bus did not come.", "but"),
    ("She sang well, ___ the audience clapped.", "so"),
    ("He is young, ___ he is wise.", "yet"),
    ("She must be ill, ___ she looks pale.", "for"),
    ("You must apologise, ___ you will be punished.", "or"),
    ("He came late, ___ he missed the first part.", "so"),
    ("She is kind ___ generous.", "and"),
    ("He tried to speak, ___ his voice failed.", "but"),
    ("Neither he ___ his brother came.", "nor"),
    ("She was tired, ___ she continued working.", "yet"),
    ("He works hard, ___ he earns well.", "so"),
    ("She is intelligent ___ hardworking.", "and"),
    ("You can take this ___ that.", "or"),
    ("He was angry, ___ he said nothing.", "but"),
    ("She has a car, ___ she cannot drive.", "but"),
    ("He studied hard, ___ he failed.", "yet"),
    ("She was late, ___ she apologised.", "so"),
    ("He is old, ___ he is active.", "but"),
]

SUBORD_ITEMS = [
    ("___ it rains, we will stay home.", "If"),
    ("___ you work hard, you will fail.", "Unless"),
    ("He passed ___ he studied well.", "because"),
    ("___ he was ill, he attended the meeting.", "Although"),
    ("She waited ___ the bus arrived.", "until"),
    ("He left ___ the meeting ended.", "after"),
    ("___ he was young, he lived in Delhi.", "When"),
    ("She sang ___ she cooked.", "while"),
    ("He is taller ___ his brother.", "than"),
    ("I do not know ___ he will come.", "whether"),
    ("He was punished ___ he was late.", "because"),
    ("___ he tried, he could not win.", "Though"),
    ("She will come ___ you invite her.", "if"),
    ("He will not come ___ you invite him.", "unless"),
    ("We stayed indoors ___ it was raining.", "since"),
    ("___ she was tired, she finished the work.", "Although"),
    ("He ran fast ___ he could catch the bus.", "so that"),
    ("She spoke slowly ___ everyone could understand.", "so that"),
    ("He behaved ___ he were a king.", "as if"),
    ("She looked ___ she had seen a ghost.", "as though"),
    ("You may go ___ you finish your work.", "provided that"),
    ("Take an umbrella ___ it rains.", "in case"),
    ("___ you start, you must finish.", "Once"),
    ("He is older ___ I thought.", "than"),
    ("I will wait ___ you return.", "until"),
    ("She left ___ the film started.", "before"),
    ("___ he arrived, we had dinner.", "After"),
    ("He works ___ he can support his family.", "so that"),
    ("She studies hard ___ she may succeed.", "so that"),
    ("___ you agree, we will proceed.", "If"),
    ("He was absent ___ he was ill.", "because"),
    ("___ it was cold, we went out.", "Though"),
    ("She smiled ___ she knew the answer.", "as"),
    ("He treats me ___ I were his son.", "as if"),
    ("I do not know ___ she is coming.", "whether"),
    ("Wait here ___ I come back.", "until"),
    ("He had left ___ I reached.", "before"),
    ("___ I reached, he had left.", "When"),
    ("She was reading ___ I was writing.", "while"),
    ("He is not ___ clever as his brother.", "so"),
    ("She ran ___ fast that she won.", "so"),
    ("It was ___ a hot day that we stayed inside.", "such"),
    ("He is ___ honest that everyone trusts him.", "so"),
    ("She is ___ a good singer that everyone praises her.", "such"),
    ("___ he is poor, he is honest.", "Although"),
    ("He will succeed ___ he works hard.", "if"),
    ("___ you do not hurry, you will be late.", "If"),
    ("She did not come ___ she was ill.", "because"),
    ("He kept quiet ___ he was angry.", "though"),
    ("She will join ___ she is invited.", "if"),
    ("We will start ___ he arrives.", "when"),
    ("He has lived here ___ he was a child.", "since"),
    ("She has not called ___ she left.", "since"),
    ("He works hard ___ he may succeed.", "so that"),
    ("She saved money ___ she could buy a car.", "so that"),
    ("He ran ___ he could catch the train.", "so that"),
    ("She spoke ___ she was angry.", "as if"),
    ("He looked ___ he was tired.", "as though"),
    ("___ you finish, call me.", "When"),
    ("He will wait ___ you return.", "until"),
    ("She left ___ the meeting was over.", "after"),
    ("___ the meeting was over, she left.", "After"),
    ("He is stronger ___ I am.", "than"),
    ("She is smarter ___ her sister.", "than"),
    ("I will go ___ you go.", "if"),
    ("___ you go, I will go.", "If"),
    ("He was so tired ___ he fell asleep.", "that"),
    ("She was so happy ___ she cried.", "that"),
    ("It was such a good film ___ we watched it twice.", "that"),
]

CORR_ITEMS = [
    ("___ you ___ your brother can do it.", "Either...or"),
    ("She is ___ talented ___ hardworking.", "Both...and"),
    ("___ had he left ___ it started raining.", "No sooner...than"),
    ("He is ___ a teacher ___ a guide.", "Not only...but also"),
    ("___ he ___ his friends were present.", "Neither...nor"),
    ("___ you apologise ___ leave.", "Either...or"),
    ("She is ___ intelligent ___ diligent.", "Both...and"),
    ("___ had I reached the station ___ the train left.", "No sooner...than"),
    ("He ___ sings ___ dances.", "Not only...but also"),
    ("___ the teacher ___ the students were absent.", "Neither...nor"),
    ("You can ___ sit here ___ go outside.", "Either...or"),
    ("She is ___ kind ___ generous.", "Both...and"),
    ("___ had the bell rung ___ the students rushed out.", "No sooner...than"),
    ("He is ___ rich ___ famous.", "Not only...but also"),
    ("___ he ___ his wife attended the party.", "Neither...nor"),
    ("___ you pay now ___ pay later.", "Either...or"),
    ("The film is ___ long ___ boring.", "Both...and"),
    ("___ had we started ___ it began to rain.", "No sooner...than"),
    ("She ___ writes ___ paints.", "Not only...but also"),
    ("___ the manager ___ the clerk was available.", "Neither...nor"),
    ("You must ___ obey ___ leave.", "Either...or"),
    ("He is ___ honest ___ hardworking.", "Both...and"),
    ("___ had he spoken ___ everyone became silent.", "No sooner...than"),
    ("She is ___ a singer ___ a dancer.", "Not only...but also"),
    ("___ Rina ___ Rupa came to the party.", "Neither...nor"),
    ("___ you come today ___ tomorrow.", "Either...or"),
    ("He is ___ tall ___ strong.", "Both...and"),
    ("___ had the meeting begun ___ the power failed.", "No sooner...than"),
    ("He ___ reads ___ writes well.", "Not only...but also"),
    ("___ the principal ___ the teachers were informed.", "Neither...nor"),
]

ADV_ITEMS = [
    ("He was ill; ___, he stayed home.", "therefore"),
    ("It rained; ___, the match was cancelled.", "hence"),
    ("She worked hard; ___, she passed.", "thus"),
    ("The road was blocked; ___, we were late.", "consequently"),
    ("He is rich; ___, he is not happy.", "however"),
    ("She was tired; ___, she kept working.", "nevertheless"),
    ("He studied hard; ___, he failed.", "still"),
    ("You must hurry; ___, you will miss the train.", "otherwise"),
    ("She is intelligent; ___, she is hardworking.", "moreover"),
    ("He is young; ___, he is wise.", "however"),
    ("The plan failed; ___, we tried again.", "nevertheless"),
    ("He was late; ___, he apologised.", "therefore"),
    ("She spoke softly; ___, everyone heard her.", "still"),
    ("Take rest; ___, you will fall ill.", "otherwise"),
    ("He is honest; ___, everyone trusts him.", "therefore"),
    ("The weather was bad; ___, we stayed indoors.", "consequently"),
    ("She is talented; ___, she is humble.", "moreover"),
    ("He did not study; ___, he failed.", "hence"),
    ("The shop was closed; ___, we went home.", "therefore"),
    ("He was tired; ___, he finished the work.", "still"),
]

rows = []


def q(stem, correct, pool, exp_en, exp_as):
    others = [x for x in pool if x.lower() != correct.lower()]
    rows.append({
        "stem": "Choose the correct conjunction: " + stem,
        "stem_as": "শুদ্ধ সংযোজক বাছনি কৰা: " + stem,
        "correct": (correct, correct),
        "dists": [(d, d) for d in others[:3]],
        "exp_en": exp_en,
        "exp_as": exp_as,
    })


for s, c in COORD_ITEMS:
    q(s, c, COORD, f"'{c}' is the coordinating conjunction that fits the relation between the two clauses.",
      f"দুটা খণ্ডবাক্যৰ সম্পৰ্ক অনুসৰি '{c}' সমপ্ৰকাৰ সংযোজক শুদ্ধ।")
for s, c in SUBORD_ITEMS:
    q(s, c, SUBORD, f"'{c}' is the subordinating conjunction required here.",
      f"ইয়াত '{c}' অধীনতাবাচক সংযোজক প্ৰয়োজন।")
for s, c in CORR_ITEMS:
    q(s, c, CORR, f"'{c}' is the correct correlative pair for this sentence.",
      f"এই বাক্যৰ বাবে '{c}' শুদ্ধ যুগ্ম সংযোজক।")
for s, c in ADV_ITEMS:
    q(s, c, CONJADV, f"'{c}' is the conjunctive adverb that shows the correct relation.",
      f"'{c}' শুদ্ধ সম্পৰ্ক দেখুওৱা সংযোজক ক্ৰিয়া বিশেষণ।")

append(LEAF, rows)
