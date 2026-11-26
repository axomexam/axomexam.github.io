#!/usr/bin/env python3
"""Homonyms and Confusables: 200 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

DATA = """
accept|except|take willingly|exclude
advice|advise|recommendation|give advice
affect|effect|influence|result
allowed|aloud|permitted|audibly
altar|alter|place of worship|change
bare|bear|uncovered|endure
beside|besides|next to|in addition
born|borne|brought into life|carried
brake|break|device to stop|shatter
breath|breathe|air taken in|inhale
bridal|bridle|of a bride|headgear for a horse
canvas|canvass|strong cloth|seek votes
cereal|serial|grain food|in a series
chord|cord|group of musical notes|thin rope
cite|site|quote|location
cloth|clothe|fabric|dress
coarse|course|rough|path of study
complement|compliment|complete something|praise
conscience|conscious|moral sense|aware
council|counsel|administrative body|advice
dairy|diary|milk products|daily record
decent|descent|respectable|downward movement
desert|dessert|dry land|sweet dish
device|devise|instrument|plan
die|dye|cease living|colour
dual|duel|double|fight
elicit|illicit|draw out|illegal
eligible|illegible|qualified|unreadable
emigrate|immigrate|leave a country|enter a country
eminent|imminent|famous|about to happen
envelop|envelope|surround|paper cover
fair|fare|just|travel cost
farther|further|more distant|additional
forth|fourth|forward|number four
gorilla|guerrilla|large ape|irregular soldier
hanged|hung|executed|suspended
hear|here|perceive sound|in this place
heard|herd|past of hear|group of animals
heroin|heroine|narcotic drug|female hero
hole|whole|opening|entire
human|humane|person|compassionate
its|it's|possessive form|it is
kernel|colonel|seed core|army rank
knot|not|tie|negation
know|no|have knowledge|negation
later|latter|afterwards|second of two
lead|led|guide|past of lead
lessen|lesson|reduce|class
liar|lawyer|person who lies|legal professional
loose|lose|not tight|misplace
"""
DATA += """
made|maid|past of make|servant
mail|male|post|masculine
marry|merry|wed|joyful
meat|meet|food|encounter
medal|meddle|award|interfere
miner|minor|mine worker|lesser
morning|mourning|early day|grief
naval|navel|of the navy|belly button
pair|pear|two|fruit
passed|past|went by|former
patience|patients|tolerance|sick people
peace|piece|calm|portion
plain|plane|simple|aircraft
pour|pore|make liquid flow|tiny opening
practice|practise|habit|do repeatedly
pray|prey|worship|victim
principal|principle|head of school|rule
profit|prophet|gain|seer
quiet|quite|silent|fairly
rain|reign|water from clouds|rule
read|reed|past of read|tall grass
right|write|correct|put on paper
road|rode|way|past of ride
role|roll|part played|bread roll
root|route|part of plant|path
sail|sale|travel by water|selling
scene|seen|view|past of see
sea|see|ocean|perceive
sew|sow|stitch|plant seeds
sight|site|vision|location
sole|soul|only|spirit
some|sum|a few|total
son|sun|male child|star
stair|stare|step|look fixedly
stationary|stationery|not moving|writing materials
steal|steel|take unlawfully|metal
storey|story|floor of a building|narrative
straight|strait|direct|narrow sea passage
suit|suite|clothing set|set of rooms
tail|tale|animal appendage|story
their|there|possessive form|in that place
threw|through|past of throw|from one side to the other
throne|thrown|royal seat|past of throw
tide|tied|sea level|fastened
vain|vein|proud|blood vessel
waist|waste|middle of body|misuse
wait|weight|stay|heaviness
weak|week|not strong|seven days
weather|whether|atmospheric condition|if
which|witch|what one|sorceress
"""

DATA += """
access|excess|entry|too much
adapt|adopt|adjust|take as one's own
addition|edition|adding|version of a book
adverse|averse|unfavourable|opposed
alley|ally|narrow street|supporter
allude|elude|refer indirectly|escape
annual|annul|yearly|cancel
appraise|apprise|evaluate|inform
aural|oral|of the ear|of the mouth
bazaar|bizarre|market|strange
"""

ROWS = [line.split("|") for line in DATA.splitlines() if line.strip()]
WORDS = []
for a, b, _, _ in ROWS:
    WORDS.extend([a, b])

rows = []
for i, (w1, w2, m1, m2) in enumerate(ROWS):
    for j, (word, meaning) in enumerate(((w1, m1), (w2, m2))):
        others = [w for w in WORDS if w != word]
        dists = [others[(i * 5 + j * 7 + k * 11) % len(others)] for k in range(3)]
        rows.append({
            "stem": f"Which word means '{meaning}'?",
            "stem_as": f"কোন শব্দটোৰ অৰ্থ '{meaning}'?",
            "correct": (word, word),
            "dists": [(d, d) for d in dists],
            "exp_en": f"'{word}' means '{meaning}'.",
            "exp_as": f"'{word}' ৰ অৰ্থ '{meaning}'।",
        })

append("homonyms-confusables", rows)
