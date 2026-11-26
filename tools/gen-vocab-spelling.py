#!/usr/bin/env python3
"""Spelling: 200 bilingual questions with rule-generated misspellings."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

DATA = """
accommodate|provide lodging
achieve|reach a goal
acquaint|make familiar
acquire|obtain
address|location
aggressive|hostile
apparent|clear
appearance|look
argument|dispute
assassinate|kill a leader
assessment|evaluation
assistance|help
athlete|sportsperson
attendance|presence
auxiliary|supporting
bachelor|unmarried man
barbarian|uncivilised person
beautiful|lovely
beginning|start
believe|accept as true
beneficial|helpful
bureau|office
business|commerce
calendar|date chart
camouflage|disguise
candidate|applicant
category|class
cemetery|burial ground
changeable|variable
chocolate|sweet food
colleague|coworker
column|pillar
commemorate|honour the memory
committed|dedicated
committee|panel
comparative|relative
competent|capable
competition|contest
conceive|imagine
conscience|moral sense
conscientious|careful and diligent
conscious|aware
consensus|general agreement
convenience|ease
correspondence|letters
courteous|polite
curiosity|inquisitiveness
deceive|cheat
definite|certain
deliberate|intentional
"""
DATA += """
desperate|hopeless
develop|grow
difference|distinction
dilemma|difficult choice
disappear|vanish
disappoint|let down
discipline|training
dissatisfied|unhappy
efficient|effective
eighth|number eight
embarrass|make ashamed
eminent|famous
environment|surroundings
equipment|apparatus
especially|particularly
exaggerate|overstate
excellent|very good
existence|being
experience|knowledge from practice
explanation|clarification
familiar|well known
fascinate|charm
February|second month
foreign|from another country
forty|number forty
fourth|number four
friend|companion
fulfil|complete
gauge|measure
government|ruling body
grammar|rules of language
guarantee|promise
harass|bother
height|tallness
humorous|funny
hygiene|cleanliness
immediately|at once
independent|free
indispensable|essential
influential|powerful
intelligence|mental ability
interrupt|break in
irresistible|impossible to resist
jealous|envious
jewellery|ornaments
judgement|decision
knowledge|understanding
laboratory|research room
leisure|free time
library|book place
literature|written works
"""
DATA += """
maintenance|upkeep
manageable|controllable
marriage|wedlock
medicine|drug
millennium|thousand years
miniature|small copy
mischievous|naughty
misspell|spell wrongly
necessary|needed
neighbour|person nearby
noticeable|visible
occasion|event
occurrence|incident
omission|something left out
opportunity|chance
parallel|side by side
parliament|law-making body
particular|specific
pastime|hobby
perceive|notice
permanent|lasting
perseverance|persistence
personnel|staff
persuade|convince
phenomenon|observable fact
picnic|outdoor meal
piece|portion
possess|own
practise|do repeatedly
precede|go before
preference|choice
prejudice|bias
privilege|special right
procedure|method
profession|occupation
professor|university teacher
pronunciation|way of speaking
publicly|openly
pursue|follow
quantity|amount
quarantine|isolation
questionnaire|survey form
receive|get
recognise|identify
recommend|advise
reference|mention
relevant|related
religious|devout
remember|recall
reminiscence|memory
renounce|give up
"""
DATA += """
repetition|repeating
representative|delegate
resistance|opposition
restaurant|eating place
rhetoric|persuasive speech
rhyme|matching sound
rhythm|beat
ridiculous|absurd
sacrifice|give up
safety|security
scenery|view
schedule|timetable
secretary|office assistant
separate|divide
sergeant|police rank
seize|grab
sensible|reasonable
sentence|group of words
siege|military blockade
signature|signed name
similar|alike
sincerely|genuinely
sovereign|supreme ruler
special|particular
speech|talk
stationary|not moving
stationery|writing materials
straight|direct
strategy|plan
strength|power
subpoena|legal summons
substantial|large
succeed|achieve
sufficient|enough
superintendent|manager
supersede|replace
surprise|astonishment
surveillance|watching
susceptible|vulnerable
technique|method
temperament|nature
tendency|inclination
thorough|complete
threshold|entrance
tomorrow|next day
tongue|organ of speech
traffic|vehicles
transfer|move
tremendous|huge
truly|really
twelfth|number twelve
"""
DATA += """
tyranny|oppression
unanimous|of one mind
unnecessary|not needed
until|up to
useful|helpful
vacuum|empty space
vegetable|plant food
vengeance|revenge
vicious|cruel
villain|wrongdoer
visible|seen
weather|atmospheric condition
Wednesday|day of week
weird|strange
welfare|well-being
whether|if
withhold|hold back
woollen|made of wool
writing|composition
yield|produce
accommodation|lodging
acknowledge|admit
amateur|non-professional
apparatus|equipment
appreciate|be grateful for
approximately|about
arithmetic|number study
arrangement|plan
associate|connect
authority|power
autumn|fall season
battalion|army unit
boundary|border
brilliant|very bright
campaign|organised effort
ceiling|upper surface
certainly|surely
characteristic|typical feature
circumstance|condition
civilisation|advanced society
commercial|business-related
community|society
competitor|rival
complement|complete something
compliment|praise
conference|meeting
confident|assured
congratulate|praise someone
conqueror|victor
convenient|handy
correspondent|reporter
counsellor|adviser
criticism|judgement
curriculum|course of study
"""
DATA += """
deficient|lacking
definitely|certainly
descendant|offspring
description|account
dictionary|word book
dining|eating
disastrous|catastrophic
discussion|talk
disease|illness
drunkenness|intoxication
dwelling|house
eccentric|odd
economical|thrifty
elegant|graceful
emergency|crisis
emphasise|stress
endeavour|try
enthusiasm|eagerness
entrepreneur|business owner
environmental|ecological
equilibrium|balance
essential|necessary
etiquette|manners
exaggeration|overstatement
excellence|greatness
exceptional|unusual
exhausted|very tired
expedition|journey
expense|cost
extraordinary|remarkable
facilities|amenities
fahrenheit|temperature scale
familiarity|knowledge
fascinating|very interesting
fatigue|tiredness
favourite|preferred
ferocious|fierce
fictitious|imaginary
flexible|adaptable
fluorescent|glowing
forfeit|lose as penalty
fortunately|luckily
fragment|piece
frequent|often
fulfilment|completion
grateful|thankful
grievance|complaint
guerrilla|irregular fighter
handkerchief|cloth for nose
harassment|torment
hazardous|dangerous
"""
DATA += """
hereditary|inherited
hindrance|obstacle
honourable|worthy
horrible|dreadful
hundredth|number hundred
hypocrisy|false virtue
idiosyncrasy|peculiar habit
illegible|unreadable
illiterate|unable to read
imaginary|not real
imminent|about to happen
impatient|not patient
impromptu|without preparation
inadequate|insufficient
incidentally|by the way
incredible|unbelievable
indebted|owing
indictment|formal charge
indigenous|native
inevitable|unavoidable
infinite|endless
inflammation|swelling
influenza|flu
ingenious|clever
ingredient|component
inheritance|legacy
initiative|first step
innocence|blamelessness
inoculation|vaccination
insistence|demand
installment|partial payment
intellectual|thinker
intentional|deliberate
intercede|mediate
interference|meddling
interpretation|explanation
investigation|inquiry
irregular|not regular
irreparable|beyond repair
itinerary|travel plan
journalist|reporter
jubilant|joyful
judicial|court-related
justifiable|defensible
kidnapper|abductor
kindergarten|children's school
laborious|laborious
legitimate|lawful
lieutenant|deputy
"""

ROWS = [line.split("|", 1) for line in DATA.splitlines() if line.strip()]


def variants(word):
    out = []
    cands = []
    for a, b in (("cc", "c"), ("mm", "m"), ("ss", "s"), ("rr", "r"), ("nn", "n"),
                 ("pp", "p"), ("tt", "t"), ("ll", "l"), ("ee", "e"), ("oo", "o")):
        if a in word:
            cands.append(word.replace(a, b, 1))
    for a, b in (("ie", "ei"), ("ei", "ie"), ("ence", "ance"), ("ance", "ence"),
                 ("able", "ible"), ("ible", "able"), ("ou", "o"), ("ai", "ia")):
        if a in word:
            cands.append(word.replace(a, b, 1))
    for a, b in (("a", "e"), ("e", "a"), ("i", "e"), ("e", "i"), ("y", "i"),
                 ("c", "s"), ("u", "o"), ("o", "u")):
        if a in word:
            cands.append(word.replace(a, b, 1))
    if len(word) > 4:
        cands.append(word[:-1])
        cands.append(word[:2] + word[1:])
    for c in cands:
        if c != word and c not in out:
            out.append(c)
    return out


rows = []
for word, meaning in ROWS:
    ds = variants(word)[:3]
    if len(ds) < 3:
        continue
    rows.append({
        "stem": f"Choose the correctly spelt word for the meaning '{meaning}'.",
        "stem_as": f"'{meaning}' অৰ্থৰ শুদ্ধ বানান বাছনি কৰা।",
        "correct": (word, word),
        "dists": [(d, d) for d in ds],
        "exp_en": f"The correct spelling is '{word}'.",
        "exp_as": f"শুদ্ধ বানান '{word}'।",
    })

append("spelling", rows)
