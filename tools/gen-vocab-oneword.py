#!/usr/bin/env python3
"""One-word Substitution: 200 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

DATA = """
A place where fish are kept|aquarium
A place where birds are kept|aviary
A place where bees are kept|apiary
A place where money is coined|mint
A place where books are kept|library
A place where weapons are stored|arsenal
A place where aircraft are kept|hangar
A place where cars are repaired|garage
A place where ships are repaired|dockyard
A place where clothes are washed|laundry
A person who writes books|author
A person who writes poems|poet
A person who writes plays|playwright
A person who edits a newspaper|editor
A person who reports news|reporter
A person who sells books|bookseller
A person who sells flowers|florist
A person who sells vegetables|greengrocer
A person who sells meat|butcher
A person who sells medicines|chemist
A person who bakes bread|baker
A person who makes shoes|cobbler
A person who makes pots|potter
A person who makes furniture|carpenter
A person who cuts hair|barber
A person who treats teeth|dentist
A person who treats eyes|oculist
A person who treats skin|dermatologist
A person who treats animals|veterinarian
A person who studies stars|astronomer
A person who studies plants|botanist
A person who studies animals|zoologist
A person who studies birds|ornithologist
A person who studies rocks|geologist
A person who studies weather|meteorologist
A person who studies the mind|psychologist
A person who studies ancient remains|archaeologist
A person who draws maps|cartographer
A person who writes dictionaries|lexicographer
A person who studies languages|philologist
A speech made without preparation|extempore
A speech made to oneself|soliloquy
A conversation between two people|dialogue
A long journey for a purpose|expedition
A place where dead bodies are kept|mortuary
A place where soldiers live|barracks
A place where monks live|monastery
A place where nuns live|convent
A place where orphans live|orphanage
A place where ships anchor|harbour
"""
DATA += """
One who loves mankind|philanthropist
One who hates mankind|misanthrope
One who loves books|bibliophile
One who hoards money|miser
One who loves his country|patriot
One who betrays his country|traitor
One who is present everywhere|omnipresent
One who knows everything|omniscient
One who is all-powerful|omnipotent
One who speaks many languages|polyglot
One who eats too much|glutton
One who cannot read or write|illiterate
One who does not believe in God|atheist
One who believes in God|theist
One who is easily deceived|gullible
One who is hard to please|fastidious
One who lives alone|recluse
One who talks too much|garrulous
One who eats human flesh|cannibal
One who walks on foot|pedestrian
One who travels to a holy place|pilgrim
One who moves from place to place|nomad
One who serves in an army|soldier
One who flies an aircraft|pilot
One who sails a ship|sailor
One who studies the earth|geographer
One who studies insects|entomologist
One who studies fish|ichthyologist
One who studies reptiles|herpetologist
One who studies the human body|anatomist
A life story written by oneself|autobiography
A life story written by another|biography
A book of maps|atlas
A book of word meanings|dictionary
A book of synonyms|thesaurus
A record of events by year|chronicle
A word with the same meaning|synonym
A word with the opposite meaning|antonym
A word pronounced like another|homophone
A word spelled like another|homograph
A word formed from initials|acronym
A word reading the same both ways|palindrome
A phrase with a special meaning|idiom
Special words of a profession|jargon
A short story with a moral|fable
A story about gods and heroes|myth
A traditional story|legend
A poem of fourteen lines|sonnet
A poem praising someone|ode
A poem of mourning|elegy
"""
DATA += """
A group of singers|choir
A group of dancers|troupe
A group of ships|fleet
A group of cattle|herd
A group of sheep|flock
A group of lions|pride
A group of wolves|pack
A group of fish|school
A group of bees|swarm
A group of ants|colony
A group of stars|constellation
A group of islands|archipelago
A group of mountains|range
A bunch of flowers|bouquet
A group of musicians|orchestra
A group of players|team
A group of thieves|gang
People watching a show|audience
A line of people walking|procession
A group of experts|panel
Government by the people|democracy
Government by a king|monarchy
Government by the rich|plutocracy
Government by officials|bureaucracy
Government by a few|oligarchy
Government by one person|autocracy
Government by religious leaders|theocracy
Rule by the mother|matriarchy
Rule by the father|patriarchy
A perfect imaginary society|utopia
An imaginary bad society|dystopia
A medicine that kills germs|germicide
A medicine that reduces pain|analgesic
A medicine that induces sleep|sedative
A substance that kills insects|insecticide
A substance that kills weeds|herbicide
A substance that kills rats|rodenticide
A place where beer is made|brewery
A place where wine is made|winery
A place where films are made|studio
A place where plays are staged|theatre
A place where animals are kept|zoo
A place where fruit trees are grown|orchard
A place where grapes are grown|vineyard
A place where plants are grown|nursery
A place where fish are bred|hatchery
The rearing of bees|apiculture
The rearing of silkworms|sericulture
The growing of crops|agriculture
The growing of flowers|floriculture
"""
DATA += """
The study of birds|ornithology
The study of insects|entomology
The study of plants|botany
The study of animals|zoology
The study of the earth|geology
The study of weather|meteorology
The study of the mind|psychology
The study of ancient remains|archaeology
The study of stars|astronomy
The study of languages|philology
A fear of water|hydrophobia
A fear of heights|acrophobia
A fear of fire|pyrophobia
A fear of closed spaces|claustrophobia
A fear of open spaces|agoraphobia
A fear of strangers|xenophobia
A fear of darkness|nyctophobia
A fear of spiders|arachnophobia
A fear of snakes|ophidiophobia
A fear of flying|aerophobia
A person who eats no meat|vegetarian
A person who eats only plants|vegan
A person who eats both plants and meat|omnivore
A person who eats only meat|carnivore
An animal that eats only plants|herbivore
A place where money is kept safe|bank
A place where valuable things are kept|vault
A place where clothes are made|garment factory
A place where bread is made|bakery
A place where tea is processed|tea factory
A person who repairs watches|watchmaker
A person who repairs locks|locksmith
A person who repairs pipes|plumber
A person who repairs electrical wires|electrician
A person who repairs walls|mason
A person who paints buildings|painter
A person who fits glasses|optician
A person who prepares medicines|pharmacist
A person who cares for the sick|nurse
A person who performs surgery|surgeon
A person who treats children|paediatrician
A person who treats heart problems|cardiologist
A person who treats brain problems|neurologist
A person who treats bones|orthopaedist
A person who treats cancer|oncologist
A person who treats pregnant women|obstetrician
A person who studies the universe|cosmologist
A person who studies fossils|palaeontologist
A person who studies earthquakes|seismologist
A person who studies population|demographer
"""

ROWS = [line.split("|") for line in DATA.splitlines() if line.strip()]
WORDS = [w for _, w in ROWS]

rows = []
for i, (phrase, word) in enumerate(ROWS):
    others = [w for w in WORDS if w != word]
    dists = [others[(i + k * 7) % len(others)] for k in range(3)]
    rows.append({
        "stem": f"Choose the one word for: {phrase}.",
        "stem_as": f"এটা শব্দত প্ৰকাশ কৰা: {phrase}।",
        "correct": (word, word),
        "dists": [(d, d) for d in dists],
        "exp_en": f"'{phrase}' is expressed by the word '{word}'.",
        "exp_as": f"'{phrase}' ৰ বাবে '{word}' শব্দ ব্যৱহাৰ হয়।",
    })

append("one-word-substitution", rows)
