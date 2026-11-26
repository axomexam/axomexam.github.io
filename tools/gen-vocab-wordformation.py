#!/usr/bin/env python3
"""Word Formation and Roots: 200 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

ROOTS = """
bio|life|biology
geo|earth|geography
graph|write|autograph
phone|sound|telephone
photo|light|photograph
tele|far|telescope
micro|small|microscope
macro|large|macrocosm
auto|self|autobiography
biblio|book|bibliography
chrono|time|chronology
demo|people|democracy
derm|skin|dermatology
dino|terrible|dinosaur
dyn|power|dynamite
form|shape|formation
gen|birth|genesis
hydro|water|hydrogen
logy|study|biology
meter|measure|thermometer
morph|form|metamorphosis
path|feeling|sympathy
ped|foot|pedestrian
pod|foot|tripod
port|carry|transport
psych|mind|psychology
scope|see|telescope
scrib|write|describe
spect|look|inspect
struct|build|construct
therm|heat|thermometer
tract|pull|tractor
vac|empty|vacuum
vid|see|video
viv|live|revive
zoo|animal|zoology
aqua|water|aquarium
audi|hear|audible
bene|good|benefit
mal|bad|malnutrition
mort|death|mortal
nat|birth|native
omni|all|omnipotent
pan|all|panorama
poly|many|polyglot
prim|first|primary
semi|half|semicircle
syn|together|synonym
trans|across|transport
uni|one|uniform
""".strip().splitlines()

AFFIX = """
un-|prefix|not|unhappy
re-|prefix|again|rewrite
pre-|prefix|before|preview
post-|prefix|after|postpone
mis-|prefix|wrongly|misunderstand
dis-|prefix|not|disagree
anti-|prefix|against|antisocial
co-|prefix|together|cooperate
ex-|prefix|out|export
in-|prefix|not|inactive
im-|prefix|not|impossible
il-|prefix|not|illegal
ir-|prefix|not|irregular
sub-|prefix|under|submarine
super-|prefix|above|supernatural
inter-|prefix|between|international
intra-|prefix|within|intravenous
extra-|prefix|beyond|extraordinary
hyper-|prefix|too much|hyperactive
hypo-|prefix|too little|hypotension
mono-|prefix|one|monopoly
bi-|prefix|two|bicycle
tri-|prefix|three|triangle
multi-|prefix|many|multilingual
de-|prefix|down|decrease
fore-|prefix|before|forecast
under-|prefix|below|underground
over-|prefix|too much|overeat
out-|prefix|beyond|outnumber
non-|prefix|not|nonstop
-able|suffix|capable of|readable
-ible|suffix|capable of|visible
-tion|suffix|act of|creation
-sion|suffix|act of|decision
-ment|suffix|state of|movement
-ness|suffix|quality of|kindness
-ity|suffix|state of|purity
-ous|suffix|full of|famous
-ful|suffix|full of|helpful
-less|suffix|without|careless
-ly|suffix|in a manner|quickly
-er|suffix|one who|teacher
-or|suffix|one who|actor
-ist|suffix|one who|artist
-ism|suffix|belief|socialism
-ish|suffix|somewhat|childish
-en|suffix|make|strengthen
-ify|suffix|make|beautify
-ize|suffix|make|modernize
-age|suffix|act or state|marriage
""".strip().splitlines()

R = [l.split("|") for l in ROOTS]
A = [l.split("|") for l in AFFIX]
R_MEAN = [m for _, m, _ in R]
R_EX = [e for _, _, e in R]
A_MEAN = [m for _, _, m, _ in A]
A_EX = [e for _, _, _, e in A]

rows = []
for i, (root, meaning, example) in enumerate(R):
    dm = [R_MEAN[(i + k * 7) % len(R_MEAN)] for k in range(3)]
    dm = [d for d in dm if d != meaning]
    while len(dm) < 3:
        dm.append(R_MEAN[(i + len(dm) + 11) % len(R_MEAN)])
    de = [R_EX[(i + k * 5) % len(R_EX)] for k in range(3)]
    de = [d for d in de if d != example]
    while len(de) < 3:
        de.append(R_EX[(i + len(de) + 13) % len(R_EX)])
    rows.append({
        "stem": f"What does the root '{root}' mean?",
        "stem_as": f"'{root}' মূলৰ অৰ্থ কি?",
        "correct": (meaning, meaning),
        "dists": [(d, d) for d in dm[:3]],
        "exp_en": f"The root '{root}' means '{meaning}', as in '{example}'.",
        "exp_as": f"'{root}' মূলৰ অৰ্থ '{meaning}', যেনে '{example}'।",
    })
    rows.append({
        "stem": f"Which word contains the root '{root}'?",
        "stem_as": f"কোন শব্দত '{root}' মূল আছে?",
        "correct": (example, example),
        "dists": [(d, d) for d in de[:3]],
        "exp_en": f"'{example}' contains the root '{root}', meaning '{meaning}'.",
        "exp_as": f"'{example}' শব্দত '{root}' মূল আছে, যাৰ অৰ্থ '{meaning}'।",
    })

for i, (affix, kind, meaning, example) in enumerate(A):
    dm = [A_MEAN[(i + k * 7) % len(A_MEAN)] for k in range(3)]
    dm = [d for d in dm if d != meaning]
    while len(dm) < 3:
        dm.append(A_MEAN[(i + len(dm) + 17) % len(A_MEAN)])
    de = [A_EX[(i + k * 5) % len(A_EX)] for k in range(3)]
    de = [d for d in de if d != example]
    while len(de) < 3:
        de.append(A_EX[(i + len(de) + 19) % len(A_EX)])
    rows.append({
        "stem": f"What does the {kind} '{affix}' mean?",
        "stem_as": f"'{affix}' {kind} ৰ অৰ্থ কি?",
        "correct": (meaning, meaning),
        "dists": [(d, d) for d in dm[:3]],
        "exp_en": f"The {kind} '{affix}' means '{meaning}', as in '{example}'.",
        "exp_as": f"'{affix}' {kind} ৰ অৰ্থ '{meaning}', যেনে '{example}'।",
    })
    rows.append({
        "stem": f"Which word uses the {kind} '{affix}'?",
        "stem_as": f"কোন শব্দত '{affix}' {kind} ব্যৱহাৰ হৈছে?",
        "correct": (example, example),
        "dists": [(d, d) for d in de[:3]],
        "exp_en": f"'{example}' uses the {kind} '{affix}', meaning '{meaning}'.",
        "exp_as": f"'{example}' ত '{affix}' {kind} ব্যৱহাৰ হৈছে, যাৰ অৰ্থ '{meaning}'।",
    })

append("word-formation-roots", rows)
