#!/usr/bin/env python3
"""Sentence Completion: 175 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from comp_bank import append

DATA = """
The doctor advised him to ___ smoking.|quit|quite|quiet|quilt
She could not ___ the noise any longer.|bear|bare|beer|bore
The lawyer presented a strong ___ in court.|argument|arrangement|agreement|amusement
The medicine had no ___ on the patient.|effect|affect|effort|offer
He was ___ for the accident.|responsible|responsive|respectful|resourceful
The thief was caught and sent to ___.|prison|prism|prisoner|prize
The fire spread quickly because of the strong ___.|wind|rain|snow|fog
She opened the ___ and took out a book.|cupboard|window|door|box
He was so tired that he fell ___ immediately.|asleep|awake|alive|alone
The train was delayed because of heavy ___.|rain|sun|wind|cloud
The child was afraid of the ___ in the dark.|shadow|light|colour|sound
She added some ___ to the tea.|sugar|salt|pepper|oil
The farmer used a ___ to plough the field.|tractor|truck|bus|car
He used a ___ to cut the paper.|scissors|hammer|spoon|brush
The nurse checked the patient's ___.|temperature|temptation|temper|template
The company decided to ___ a new product.|launch|lunch|launching|launched
She has a great ___ for music.|passion|fashion|mission|session
The teacher praised him for his ___ work.|hard|hardly|hardness|harden
He could not ___ the answer to the question.|find|found|finding|founded
The road was blocked by a fallen ___.|tree|three|free|tray
She wore a ___ around her neck.|necklace|neck|necktie|knapsack
The meeting was ___ because of the storm.|cancelled|council|counselled|cancel
He speaks English ___ than his brother.|better|good|best|well
The book was so interesting that I read it in one ___.|sitting|setting|sitting-room|site
The old man walked slowly with a ___.|stick|stack|stock|stuck
She put the flowers in a ___.|vase|base|case|chase
The child drew a picture with a ___.|crayon|crayfish|crane|crown
The company offers a good ___ to its employees.|salary|celery|salad|sole
He was ___ of his rude behaviour.|ashamed|shamed|shameful|shameless
The police found the ___ in the garage.|evidence|evident|evidently|evidential
She has a good ___ of history.|knowledge|know|known|knowing
The train arrived at the ___ on time.|platform|perform|format|form
He bought a new pair of ___ for the party.|shoes|shows|shoes-string|shoos
The baby slept peacefully in the ___.|cradle|crater|cradle-song|cradlecase
She wrote her name on the ___ of the book.|cover|coffer|covert|coverlet
The farmer grew ___ in his field.|wheat|wheet|wheate|weat
He was ___ by the loud noise.|startled|started|start|starting
The teacher explained the lesson in a simple ___.|manner|mannerism|manor|man
She bought a ___ of bread from the bakery.|loaf|loafing|loafed|loafs
The child was ___ because he lost his toy.|sad|saddle|sadly|sadness
He opened the ___ to let in fresh air.|window|widow|winnow|wind
The doctor gave him a ___ for the medicine.|prescription|description|subscription|prescription-pad
She has a very ___ voice.|sweet|sweat|sweater|sweep
The soldiers marched in a straight ___.|line|lion|lineage|linen
He was ___ to hear the good news.|delighted|delightful|delight|delighting
The cat jumped over the ___.|fence|fens|fence-post|fend
She made a ___ of the cake for her son.|piece|peace|peas|peach
The old house was in a state of ___.|disrepair|repair|repairing|repaired
He was ___ for his honesty.|respected|respective|respectful|respectable
The river flows ___ the city.|through|threw|thorough|though
She has a ___ of stamps from many countries.|collection|collective|collect|collected
The plane landed safely at the ___.|airport|airporting|airport-lounge|air
He was ___ of his success.|proud|pride|proudly|pried
The workers demanded a higher ___.|wage|wages|wage-earner|waged
She gave a ___ answer to the question.|brief|belief|believe|briefly
The child was ___ after the long journey.|exhausted|exhaust|exhausting|exhaustion
He put the key in the ___.|lock|clock|block|flock
The garden was full of ___ flowers.|fragrant|fragment|fragrance|fragrantly
"""
DATA += """
The manager asked for a ___ of the report.|copy|coppy|copied|copies
She was ___ by the beauty of the sunset.|amazed|amazement|amazing|amaze
The boy ___ the ball over the wall.|threw|through|throne|thrown
He has a ___ memory of his childhood.|vivid|vividly|vividness|vividity
The company suffered a heavy ___ last year.|loss|lose|loose|lost
She spoke in a ___ voice.|gentle|gently|gentleness|gentile
The teacher asked the students to ___ quiet.|keep|kept|keeping|keeper
The train was ___ with passengers.|crowded|crowd|crowding|crowds
He was ___ of stealing the money.|accused|excused|accuse|accusing
The medicine tastes ___.|bitter|better|batter|butter
She has a ___ for languages.|talent|talented|talentedness|talentless
The old man lives in a ___ house.|lonely|alone|loneliness|loner
He was ___ to accept the offer.|reluctant|reluctance|reluctantly|reluct
The child was ___ by the clown.|amused|amusement|amusing|amuse
The teacher gave us a ___ explanation.|clear|clean|cleanse|clarity
She was ___ for the job.|eligible|illegible|elegant|eligible-looking
The soldiers were ___ for their bravery.|honoured|honour|honourable|honorary
He was ___ by the doctor's advice.|reassured|reassure|reassuring|reassurance
The company has a ___ reputation.|solid|sold|solder|solids
She has a ___ of humour.|sense|since|senses|sensed
The child was ___ to see the elephant.|excited|exciting|excite|excitement
He was ___ of his mistake.|aware|awake|awoke|awaken
The teacher asked him to ___ the poem.|recite|recital|recitation|recited
She was ___ after the long walk.|tired|tiring|tire|tiredness
The police ___ the thief at the station.|caught|catch|catched|caught-up
He has a ___ knowledge of computers.|sound|soundly|soundness|sounded
The garden was ___ with weeds.|overgrown|overgrow|overgrowing|overgrowth
She was ___ by the film.|moved|move|moving|movement
The company decided to ___ the old building.|demolish|demolition|demolished|demolishing
He was ___ to his parents.|obedient|obedience|obediently|obey
The child was ___ of the dark.|frightened|frightening|fright|frightful
She has a ___ smile.|warm|warmth|warmly|warmer
The teacher ___ the lesson with examples.|illustrated|illustration|illustrative|illustrate
He was ___ for the delay.|apologetic|apology|apologise|apologetically
The train was ___ at the station.|standing|stood|stand|stands
She was ___ by his kindness.|touched|touch|touching|touches
The company has ___ its profits.|doubled|double|doubling|doubles
He was ___ to hear the news.|shocked|shock|shocking|shocker
The child was ___ in the corner.|hiding|hide|hid|hidden
She has a ___ voice.|melodious|melody|melodiously|melodiousness
The teacher was ___ with the results.|pleased|please|pleasing|pleasure
He was ___ by the traffic.|delayed|delay|delaying|delays
The old man was ___ after the accident.|crippled|cripple|crippling|cripples
She was ___ to the hospital.|admitted|admit|admitting|admission
The child was ___ for his good behaviour.|praised|praise|praising|praiseworthy
He was ___ of the danger.|unaware|aware|awareness|awares
The company has a ___ of skilled workers.|shortage|short|shorten|shortly
She was ___ by the music.|charmed|charm|charming|charms
The teacher asked him to ___ the sum.|solve|solution|solved|solving
He was ___ after the operation.|recovering|recover|recovery|recovered
The garden was ___ in the morning sun.|glowing|glow|glowed|glows
She has a ___ of books.|stack|stake|stuck|stock
The child was ___ by the thunder.|terrified|terror|terrible|terribly
He was ___ to the offer.|attracted|attract|attraction|attractive
The company was ___ in 1990.|founded|found|finding|founder
She was ___ for her hard work.|rewarded|reward|rewarding|rewards
The teacher ___ the difficult words.|explained|explain|explaining|explanation
He was ___ of the truth.|convinced|convince|convincing|conviction
The old bridge was ___.|dangerous|danger|dangerously|endangered
She has a ___ of responsibility.|sense|senses|sensed|sensing
"""
DATA += """
The child was ___ by the story.|fascinated|fascinate|fascinating|fascination
He was ___ to the hospital after the accident.|rushed|rush|rushing|rushes
The company has ___ a new branch.|opened|open|opening|opens
She was ___ with the result.|satisfied|satisfy|satisfying|satisfaction
The teacher asked us to ___ the passage.|read|reed|red|read-up
He was ___ of his father.|proud|pride|proudly|pried
The garden was ___ with flowers.|filled|fill|filling|fills
She has a ___ of friends.|circle|circus|circular|circulate
The child was ___ after the fall.|crying|cry|cried|cries
He was ___ by the police.|arrested|arrest|arresting|arrests
The company was ___ for its quality.|known|know|knew|knowing
She was ___ to the party.|invited|invite|inviting|invitation
The teacher ___ the students for their effort.|commended|command|commendation|commending
He was ___ of the charges.|acquitted|acquit|acquitting|acquittal
The old man was ___ by the heat.|overcome|overcame|overcoming|overcomes
She has a ___ of humour.|sense|since|senses|sensed
The child was ___ by the loud noise.|frightened|frighten|frightening|fright
He was ___ for his bravery.|awarded|award|awarding|awards
The company has ___ its workforce.|reduced|reduce|reducing|reduction
She was ___ by the news.|surprised|surprise|surprising|surprisingly
The teacher asked him to ___ the answer.|explain|explanation|explained|explaining
He was ___ to the challenge.|equal|equals|equally|equality
The garden was ___ by the storm.|damaged|damage|damaging|damages
She has a ___ of flowers.|bouquet|banquet|banquette|bouquet-like
The child was ___ by the magic show.|amazed|amaze|amazing|amazement
He was ___ of the risk.|aware|awake|awoke|awaken
The company was ___ in a scandal.|involved|involve|involving|involvement
She was ___ for the interview.|selected|select|selecting|selection
The teacher ___ the poem beautifully.|recited|recite|recitation|reciting
He was ___ by the doctor.|examined|examine|examining|examination
The old house was ___ down.|pulled|pull|pulling|pulls
She has a ___ of humour and wit.|sense|senses|sensed|sensing
The child was ___ to bed early.|sent|send|sending|sends
He was ___ of the meeting.|informed|inform|informing|information
The company has ___ a profit this year.|earned|earn|earning|earnings
She was ___ by the scenery.|enchanted|enchant|enchanting|enchantment
The teacher asked us to ___ the text.|summarise|summary|summarised|summarising
He was ___ to the core.|shaken|shake|shaking|shakes
The garden was ___ with roses.|planted|plant|planting|plants
She has a ___ of humour that everyone likes.|sense|senses|sensed|sensing
The child was ___ after the vaccine.|immunised|immune|immunity|immunising
He was ___ by the committee.|selected|select|selection|selecting
The company was ___ by the government.|recognised|recognise|recognition|recognising
She was ___ of her achievements.|proud|pride|proudly|pried
The teacher ___ the lesson with a story.|began|begin|beginning|begun
He was ___ by the beauty of the valley.|struck|strike|striking|strikes
The old man was ___ by the cold.|affected|affect|affecting|affection
She has a ___ of duty.|sense|senses|sensed|sensing
The child was ___ by the teacher.|praised|praise|praising|praiseworthy
He was ___ to the top of the hill.|climbed|climb|climbing|climbs
"""

DATA += """
He wore a ___ to protect his eyes from the sun.|sunglasses|sunglass|glasses-case|sunshade
The baby was ___ in a warm blanket.|wrapped|wrap|wrapping|wraps
She used a ___ to stir the soup.|spoon|spool|spoonful|spoon-feed
The farmer kept his ___ in a shed.|tools|tool|tooling|tooled
The doctor advised him to ___ weight.|lose|loose|loss|lost
She was ___ of the danger ahead.|unaware|aware|awareness|awares
The child was ___ by the loud thunder.|frightened|frighten|frightening|fright
He has a ___ of old coins.|collection|collective|collect|collected
The company was ___ for its poor service.|criticised|criticise|criticism|criticising
She gave a ___ of the report.|summary|summarise|summarised|summarising
"""

ROWS = [line.split("|") for line in DATA.splitlines() if line.strip()]

rows = []
for r in ROWS:
    if len(r) != 5:
        continue
    sentence, correct, d1, d2, d3 = r
    rows.append({
        "stem": f"Choose the word that best completes the sentence: {sentence}",
        "stem_as": f"বাক্যটো সম্পূৰ্ণ কৰা শুদ্ধ শব্দ বাছনি কৰা: {sentence}",
        "correct": (correct, correct),
        "dists": [(d, d) for d in (d1, d2, d3)],
        "exp_en": f"'{correct}' is the only word that fits the meaning of the sentence.",
        "exp_as": f"বাক্যৰ অৰ্থ অনুসৰি '{correct}' শব্দটোৱেই শুদ্ধ।",
    })

append("sentence-completion", rows)
