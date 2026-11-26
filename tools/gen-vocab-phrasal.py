#!/usr/bin/env python3
"""Phrasal Verbs: 200 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

DATA = """
abide by|obey a rule
account for|explain
act on|take action according to
add up|make sense
agree with|be of the same opinion
aim at|try to achieve
allow for|take into consideration
answer back|reply rudely
answer for|be responsible for
apply for|request formally
apply to|be relevant to
arrive at|reach a decision or place
ask after|inquire about someone's health
ask for|request
attend to|deal with
back down|withdraw from a position
back out|withdraw from an agreement
back up|support
bear out|confirm
bear with|tolerate patiently
beat up|hit repeatedly
become of|happen to
believe in|have faith in
belong to|be owned by
blow out|extinguish by blowing
blow up|explode
break down|stop working
break in|enter by force
break into|enter illegally
break off|end suddenly
break out|start suddenly
break up|end a relationship
bring about|cause
bring down|reduce or defeat
bring forth|produce
bring in|introduce
bring off|succeed in doing
bring out|publish or reveal
bring round|persuade
bring up|raise a child
brush up|revise
build up|increase gradually
burn down|destroy by fire
burn out|become exhausted
burst into|suddenly start
burst out|laugh or cry suddenly
call at|visit a place
call for|demand or need
call in|summon
call off|cancel
"""
DATA += """
call on|visit a person
call out|shout
call up|telephone
calm down|become quiet
care for|look after
carry on|continue
carry out|perform
carry over|postpone
cast away|abandon
catch on|understand
catch up|reach the same level
cheer up|become happy
clear away|remove
clear up|solve or become bright
close down|stop operating
come about|happen
come across|find by chance
come along|arrive or progress
come apart|break into pieces
come around|recover consciousness
come back|return
come by|obtain
come down|decrease
come forward|volunteer
come in|enter
come off|succeed
come out|appear
come over|visit
come round|regain consciousness
come up|arise
come up with|produce an idea
count on|depend on
cross out|draw a line through
cut back|reduce
cut down|reduce or fell
cut in|interrupt
cut off|disconnect
cut out|remove
cut up|divide into pieces
deal in|trade in
deal with|handle
depend on|rely on
die away|fade
die down|become less strong
die out|become extinct
do away with|abolish
do up|fasten or renovate
do without|manage without
draw in|arrive at a station
draw up|prepare a document
dress up|wear formal clothes
"""
DATA += """
drop by|visit briefly
drop in|visit informally
drop off|fall asleep or deliver
drop out|leave a course
eat out|dine in a restaurant
egg on|urge
end up|finish in a particular state
fall apart|break into pieces
fall back|retreat
fall behind|lag behind
fall for|be deceived
fall in|collapse
fall off|decrease or drop from
fall out|quarrel
fall through|fail
feel up to|be capable of
figure out|understand
fill in|complete a form
fill up|make full
find out|discover
fit in|be accepted
fix up|arrange
focus on|concentrate on
get across|communicate
get along|be friendly
get at|reach or imply
get away|escape
get back|return
get by|survive
get down|descend
get in|enter
get off|leave a vehicle
get on|board a vehicle
get out|leave
get over|recover from
get through|pass a test or finish
get together|meet
get up|rise from bed
give away|distribute or reveal
give back|return
give in|surrender
give off|emit
give out|distribute or stop working
give up|quit
give way|collapse or yield
go about|begin to deal with
go after|pursue
go ahead|proceed
go back on|break a promise
go by|pass or follow
go down|decrease or sink
"""
DATA += """
go for|choose or attack
go in for|take part in
go off|explode or ring
go on|continue
go out|leave or stop burning
go over|review
go through|experience or examine
go up|increase
grow up|become an adult
hand in|submit
hand out|distribute
hand over|give control to
hang about|wait idly
hang on|wait or hold tight
hang up|end a phone call
hold back|restrain
hold on|wait
hold out|resist
hold up|delay or rob
keep away|stay away
keep back|hide or restrain
keep down|suppress
keep on|continue
keep up|maintain
knock down|hit to the ground
knock off|stop work
knock out|make unconscious
lay off|dismiss workers
lay out|arrange
leave out|omit
let down|disappoint
let off|excuse or release
let out|release or reveal
live on|survive on
look after|take care of
look down on|despise
look for|search
look forward to|anticipate
look into|investigate
look out|be careful
look over|examine
look up|search for information
look up to|respect
make out|understand
make up|invent or reconcile
make up for|compensate
pass away|die
pass out|faint
pick up|lift or collect
point out|draw attention to
put off|postpone
put on|wear
put out|extinguish
put up with|tolerate
run into|meet by chance
run out of|have no more
see off|say goodbye at a station
set off|begin a journey
set up|establish
show off|boast
take after|resemble
take off|remove or leave the ground
take on|accept responsibility
take over|gain control
take up|begin a hobby
turn down|reject or reduce
turn into|become
turn off|switch off
turn on|switch on
turn out|prove to be
turn up|arrive or increase
work out|solve or exercise
write off|cancel a debt
"""

ROWS = [line.split("|", 1) for line in DATA.splitlines() if line.strip()]
MEANINGS = [m for _, m in ROWS]

rows = []
for i, (pv, meaning) in enumerate(ROWS):
    others = [m for m in MEANINGS if m != meaning]
    dists = [others[(i + k * 7) % len(others)] for k in range(3)]
    rows.append({
        "stem": f"What is the meaning of the phrasal verb '{pv}'?",
        "stem_as": f"'{pv}' phrasal verb ৰ অৰ্থ কি?",
        "correct": (meaning, meaning),
        "dists": [(d, d) for d in dists],
        "exp_en": f"'{pv}' means: {meaning}.",
        "exp_as": f"'{pv}' ৰ অৰ্থ: {meaning}।",
    })

append("phrasal-verbs", rows)
