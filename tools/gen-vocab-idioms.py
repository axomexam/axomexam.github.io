#!/usr/bin/env python3
"""Idioms and Phrases: 200 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

DATA = """
A bird's eye view|A general view from above
A blessing in disguise|Something good that seemed bad
A bolt from the blue|A sudden shock
A burning question|An important issue under discussion
A cat's paw|A person used by another
A close shave|A narrow escape
A dark horse|An unexpected winner
A dead letter|A law no longer enforced
A dead ringer|An exact double
A drop in the ocean|A very small amount
A fish out of water|A person in an uncomfortable situation
A fool's paradise|False happiness
A hard nut to crack|A difficult problem
A lame excuse|A weak excuse
A leopard cannot change its spots|People do not change their nature
A man of letters|A learned person
A man of parts|A person with many talents
A man of straw|A person without substance
A mare's nest|A false discovery
A nine days' wonder|A short-lived sensation
A red letter day|An important day
A rainy day|A time of need
A snake in the grass|A hidden enemy
A sore point|A sensitive matter
A stitch in time|Timely action that prevents trouble
A storm in a teacup|Great excitement over a small matter
A thorn in the flesh|A constant source of annoyance
A wet blanket|A person who spoils others' fun
A white elephant|A costly but useless possession
A wild goose chase|A useless search
Above board|Honest and open
Against the clock|In a great hurry
All ears|Listening attentively
All in all|Considering everything
All thumbs|Clumsy
An apple of discord|A cause of quarrel
An eye wash|A false show
An old flame|A former lover
Apple of one's eye|A person dearly loved
As cool as a cucumber|Very calm
At daggers drawn|Very hostile
At large|Free and not captured
At loggerheads|In disagreement
At one's wit's end|Completely puzzled
At the eleventh hour|At the last moment
At the drop of a hat|Immediately
Bad blood|Ill feeling
Bag and baggage|With all one's belongings
Balloon goes up|The trouble begins
Bear fruit|Produce results
"""
DATA += """
Beat about the bush|Talk without coming to the point
Beat the air|Make useless efforts
Bed of roses|A life of ease
Beggar description|Be too strange to describe
Behind the scenes|Secretly
Beside oneself|Overcome with emotion
Between the devil and the deep sea|Between two equal dangers
Big gun|An important person
Bite the dust|Fail or die
Black sheep|A disreputable member
Blow one's own trumpet|Praise oneself
Blue blood|Noble birth
Bone of contention|A subject of dispute
Break the ice|Start a conversation
Bring to book|Punish
Bring to light|Reveal
Bury the hatchet|Make peace
By and by|Before long
By fits and starts|Irregularly
By hook or by crook|By any means
Call a spade a spade|Speak plainly
Call in question|Doubt
Carry the day|Win
Cast a slur|Defame
Cast pearls before swine|Offer good things to those who cannot value them
Catch red-handed|Catch in the act
Cheek by jowl|Very close together
Chip off the old block|A child like the parent
Cold comfort|Poor consolation
Come to a head|Reach a crisis
Cool one's heels|Wait for a long time
Cry over spilt milk|Regret what cannot be undone
Cut a sorry figure|Make a poor impression
Cut the Gordian knot|Solve a difficult problem boldly
Day in and day out|Continuously
Dead heat|A tie
Die in harness|Die while working
Double-edged sword|Something with both good and bad effects
Draw the line|Set a limit
Drive to the wall|Put in a hopeless position
Dutch courage|Courage from alcohol
Eat humble pie|Apologise humbly
Egg on|Encourage
End in smoke|Come to nothing
Every inch|Completely
Face the music|Bear the consequences
Fair and square|Honest and just
Fall flat|Fail to impress
Feather in one's cap|An achievement to be proud of
Feel the pulse|Find out public opinion
"""
DATA += """
Fight shy of|Avoid
Find fault with|Criticise
First and foremost|Most importantly
Fish in troubled waters|Take advantage of trouble
Flesh and blood|Human nature
Fly in the face of|Openly oppose
Follow suit|Do the same
For good|Permanently
From hand to mouth|With barely enough money
Get cold feet|Become nervous
Get wind of|Hear a rumour of
Give a wide berth|Avoid
Give and take|Mutual adjustment
Give the devil his due|Be fair to an opponent
Go against the grain|Be contrary to one's liking
Go to the dogs|Deteriorate
Green-eyed monster|Jealousy
Hand in glove|In close partnership
Hand in hand|Together
Hang in the balance|Be uncertain
Hard and fast|Strict and fixed
Have a finger in every pie|Be involved in everything
Head over heels|Completely
Hear through the grapevine|Learn by gossip
Heart and soul|Wholeheartedly
Hit the nail on the head|Do or say the right thing
Hold water|Be valid
Hornet's nest|A troublesome situation
In a fix|In a difficult situation
In a nutshell|In a few words
In cold blood|Deliberately and cruelly
In fine fettle|In good health
In high spirits|Very happy
In hot water|In trouble
In the long run|Eventually
In the nick of time|Just in time
In the teeth of|In spite of opposition
Ins and outs|Full details
Jack of all trades|A person who can do many things
Keep a stiff upper lip|Show courage in trouble
Keep body and soul together|Survive
Keep one's fingers crossed|Hope for good luck
Kick the bucket|Die
Kill two birds with one stone|Achieve two aims at once
Know the ropes|Understand how a job is done
Laugh in one's sleeve|Laugh secretly
Lay down the law|Give orders firmly
Lead someone up the garden path|Deceive someone
Leave no stone unturned|Try every means
Let the cat out of the bag|Reveal a secret
"""
DATA += """
Lion's share|The largest part
Live from hand to mouth|Live with little money
Look a gift horse in the mouth|Find fault with a gift
Lose one's head|Panic
Make a clean breast of|Confess fully
Make both ends meet|Live within one's means
Make no bones about|Say plainly
Make waves|Cause trouble
Man in the street|An ordinary person
Move heaven and earth|Do everything possible
Nip in the bud|Stop at an early stage
Null and void|Invalid
Odds and ends|Small leftover items
Off the cuff|Without preparation
On the fence|Undecided
On the spur of the moment|Suddenly
Once in a blue moon|Very rarely
Out of the frying pan into the fire|From a bad situation to a worse one
Out of the woods|Free from danger
Part and parcel|An essential part
Pay through the nose|Pay too much
Play second fiddle|Take a subordinate role
Pull strings|Use influence
Put a spoke in the wheel|Hinder a plan
Put one's foot down|Act firmly
Put the cart before the horse|Do things in the wrong order
Rack one's brains|Think hard
Rain cats and dogs|Rain heavily
Red tape|Excessive official rules
Rest on one's laurels|Be satisfied with past success
Roll out the red carpet|Give a grand welcome
Rub the wrong way|Annoy
Run out of steam|Lose energy
Sail under false colours|Pretend to be what one is not
See eye to eye|Agree
Set the ball rolling|Start an activity
Show one's true colours|Reveal one's real character
Smell a rat|Suspect something wrong
Spill the beans|Reveal a secret
Steal a march|Gain an advantage secretly
Take a leaf out of someone's book|Imitate someone
Take the bull by the horns|Face a problem boldly
Talk through one's hat|Talk nonsense
The last straw|The final burden that causes failure
Throw cold water on|Discourage
Turn a deaf ear|Ignore
Under a cloud|In disgrace
Up in arms|Very angry
Wash one's hands of|Refuse responsibility
With flying colours|With great success
"""

ROWS = [line.split("|", 1) for line in DATA.splitlines() if line.strip()]
MEANINGS = [m for _, m in ROWS]

rows = []
for i, (idiom, meaning) in enumerate(ROWS):
    others = [m for m in MEANINGS if m != meaning]
    dists = [others[(i + k * 7) % len(others)] for k in range(3)]
    rows.append({
        "stem": f"What is the meaning of the idiom '{idiom}'?",
        "stem_as": f"'{idiom}' idiom ৰ অৰ্থ কি?",
        "correct": (meaning, meaning),
        "dists": [(d, d) for d in dists],
        "exp_en": f"The idiom '{idiom}' means: {meaning}.",
        "exp_as": f"'{idiom}' idiom ৰ অৰ্থ: {meaning}।",
    })

append("idioms-phrases", rows)
