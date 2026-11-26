#!/usr/bin/env python3
"""Synonyms and Antonyms: 200 questions each from one 200-word table."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

DATA = """
abandon|forsake|retain
able|capable|incapable
abundant|plentiful|scarce
accurate|precise|inaccurate
active|energetic|idle
admire|respect|despise
adopt|embrace|reject
advance|progress|retreat
agree|consent|differ
alert|watchful|careless
ancient|antique|modern
brave|courageous|cowardly
brief|short|lengthy
bright|brilliant|dull
calm|peaceful|agitated
careful|cautious|careless
cheap|inexpensive|costly
clear|obvious|vague
clever|intelligent|foolish
complex|complicated|simple
conceal|hide|reveal
confident|assured|doubtful
cruel|brutal|kind
dangerous|risky|safe
deep|profound|shallow
defend|protect|attack
delay|postpone|hasten
deliberate|intentional|accidental
difficult|hard|easy
distant|far|near
divide|separate|unite
doubt|uncertainty|certainty
eager|keen|indifferent
early|premature|late
empty|vacant|full
encourage|inspire|discourage
enemy|foe|friend
enjoy|relish|dislike
enormous|huge|tiny
essential|necessary|optional
evil|wicked|good
expand|enlarge|contract
expensive|costly|cheap
fail|flop|succeed
fair|just|unfair
famous|renowned|unknown
fast|quick|slow
fertile|productive|barren
fierce|ferocious|gentle
foolish|silly|wise
""".strip().splitlines()

DATA += """
forbid|prohibit|allow
forget|overlook|remember
fortune|luck|misfortune
fresh|new|stale
friendly|amiable|hostile
generous|liberal|stingy
gentle|mild|harsh
genuine|authentic|fake
giant|colossal|dwarf
glad|happy|sad
gloomy|dark|bright
good|virtuous|bad
gradual|slow|sudden
grateful|thankful|ungrateful
great|grand|small
guilty|culpable|innocent
hard|tough|soft
harmful|injurious|beneficial
harsh|severe|mild
healthy|fit|sick
heavy|weighty|light
helpful|useful|useless
honest|truthful|dishonest
hostile|unfriendly|friendly
humble|modest|proud
idle|lazy|active
ignorant|unaware|knowledgeable
illegal|unlawful|legal
imaginary|fictitious|real
immediate|instant|delayed
important|significant|trivial
increase|augment|decrease
inferior|lower|superior
innocent|blameless|guilty
intelligent|clever|stupid
interesting|engaging|boring
join|unite|separate
joyful|cheerful|sorrowful
kind|benevolent|cruel
large|big|small
late|delayed|early
lazy|indolent|industrious
legal|lawful|illegal
liberal|generous|conservative
light|bright|dark
little|small|large
lively|active|dull
long|lengthy|short
loud|noisy|quiet
love|affection|hatred
""".strip().splitlines()

DATA += """
loyal|faithful|disloyal
mad|insane|sane
magnify|enlarge|reduce
maximum|highest|minimum
mean|unkind|generous
modern|contemporary|ancient
modest|humble|arrogant
narrow|tight|wide
neat|tidy|messy
necessary|essential|unnecessary
new|fresh|old
noble|dignified|ignoble
noisy|loud|silent
obedient|dutiful|disobedient
obvious|clear|hidden
odd|strange|normal
old|ancient|young
open|unlocked|closed
optimistic|hopeful|pessimistic
ordinary|common|extraordinary
painful|sore|painless
patient|tolerant|impatient
peace|calm|war
perfect|flawless|imperfect
permanent|lasting|temporary
polite|courteous|rude
poor|needy|rich
popular|famous|unpopular
possible|feasible|impossible
powerful|strong|weak
praise|applaud|criticize
present|current|absent
pretty|beautiful|ugly
private|personal|public
probable|likely|improbable
profit|gain|loss
prompt|quick|late
proper|suitable|improper
proud|arrogant|humble
pure|clean|impure
quick|fast|slow
quiet|silent|noisy
rare|scarce|common
ready|prepared|unprepared
real|genuine|fake
regular|routine|irregular
reject|refuse|accept
reliable|dependable|unreliable
remote|distant|near
rich|wealthy|poor
""".strip().splitlines()

DATA += """
right|correct|wrong
rigid|stiff|flexible
rough|coarse|smooth
rude|impolite|polite
sad|unhappy|happy
safe|secure|dangerous
same|identical|different
scarce|rare|abundant
secure|safe|insecure
selfish|egoistic|selfless
serious|grave|trivial
sharp|keen|blunt
short|brief|long
shy|timid|bold
simple|easy|complex
sincere|genuine|insincere
skillful|expert|clumsy
slow|sluggish|fast
small|little|large
smooth|even|rough
soft|gentle|hard
solid|firm|liquid
sorrow|grief|joy
special|unique|ordinary
start|begin|end
strange|odd|familiar
strict|stern|lenient
strong|powerful|weak
stupid|foolish|intelligent
success|achievement|failure
sudden|abrupt|gradual
superior|higher|inferior
sure|certain|unsure
sweet|sugary|bitter
swift|rapid|slow
tall|high|short
tame|domestic|wild
temporary|transient|permanent
tender|soft|tough
terrible|awful|pleasant
thick|dense|thin
thin|slim|thick
tiny|minute|huge
tired|weary|refreshed
tolerant|patient|intolerant
tough|hard|easy
true|correct|false
ugly|hideous|beautiful
unique|singular|common
wise|prudent|foolish
""".strip().splitlines()

ROWS = [line.split("|") for line in DATA if line.strip()]

SYN = {w: s for w, s, a in ROWS}
ANT = {w: a for w, s, a in ROWS}


def pick(pool, exclude, start, k=3):
    out = []
    n = len(pool)
    i = start
    while len(out) < k and i < start + n * 2:
        v = pool[i % n]
        if v not in exclude and v not in out:
            out.append(v)
        i += 1
    return out


syn_rows = []
ant_rows = []
for i, (w, s, a) in enumerate(ROWS):
    syn_pool = [SYN[x] for x in SYN if x != w]
    ant_pool = [ANT[x] for x in ANT if x != w]
    ds = pick(syn_pool, {s, a, w}, i * 3)
    da = pick(ant_pool, {a, s, w}, i * 5)
    syn_rows.append({
        "stem": f"Choose the word closest in meaning to '{w}'.",
        "stem_as": f"'{w}' শব্দৰ সমাৰ্থক শব্দ বাছনি কৰা।",
        "correct": (s, s),
        "dists": [(d, d) for d in ds],
        "exp_en": f"'{w}' means '{s}'.",
        "exp_as": f"'{w}' ৰ অৰ্থ '{s}'।",
    })
    ant_rows.append({
        "stem": f"Choose the word opposite in meaning to '{w}'.",
        "stem_as": f"'{w}' শব্দৰ বিপৰীত শব্দ বাছনি কৰা।",
        "correct": (a, a),
        "dists": [(d, d) for d in da],
        "exp_en": f"'{w}' is opposite in meaning to '{a}'.",
        "exp_as": f"'{w}' ৰ বিপৰীত অৰ্থ '{a}'।",
    })

append("synonyms", syn_rows)
append("antonyms", ant_rows)
