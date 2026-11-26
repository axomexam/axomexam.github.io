#!/usr/bin/env python3
"""Reading Comprehension: 175 bilingual questions over 25 passages."""

import sys
sys.path.insert(0, "tools")
from comp_bank import append

P = []
P.append(("Assam is famous for its tea gardens. The state produces more than half of India's tea. Heavy rainfall and high humidity suit the tea plant, and thousands of workers depend on the industry.", [
    ("What is the passage mainly about?", "Assam's tea industry", ["Assam's rivers", "Assam's festivals", "Assam's forests"], "The passage describes Assam's tea production and its workers."),
    ("How much of India's tea does Assam produce?", "More than half", ["Less than half", "Exactly one third", "None"], "The passage says Assam produces more than half of India's tea."),
    ("What suits the tea plant?", "Heavy rainfall and high humidity", ["Dry weather", "Cold winds", "Sandy soil"], "The passage names heavy rainfall and high humidity."),
    ("What can be inferred about employment?", "The tea industry employs many people", ["Nobody works in tea gardens", "Tea is grown only in winter", "Tea is imported"], "Thousands of workers depend on the industry."),
    ("The tone of the passage is", "Informative", ["Angry", "Humorous", "Sad"], "The passage gives facts in a neutral way."),
    ("The author's purpose is to", "Describe Assam's tea industry", ["Criticise tea drinkers", "Sell tea", "Describe Assamese music"], "The passage informs readers about tea production."),
    ("Which statement is true?", "Assam produces more than half of India's tea", ["Assam produces no tea", "Tea grows without rain", "Only one worker depends on tea"], "This fact is stated directly in the passage."),
]))
P.append(("The Brahmaputra is one of the largest rivers in Asia. It enters Assam from Tibet and flows through the state before joining the Bay of Bengal. The river supports fishing, transport and farming in the region.", [
    ("What is the passage mainly about?", "The Brahmaputra river", ["The Ganga", "The Bay of Bengal", "Tibetan mountains"], "The passage describes the Brahmaputra and its uses."),
    ("Where does the Brahmaputra enter Assam from?", "Tibet", ["Nepal", "Bhutan", "Bangladesh"], "The passage says it enters Assam from Tibet."),
    ("The river finally joins", "The Bay of Bengal", ["The Arabian Sea", "The Indian Ocean", "The Red Sea"], "The passage says it joins the Bay of Bengal."),
    ("Which activity is NOT mentioned as supported by the river?", "Mining", ["Fishing", "Transport", "Farming"], "Mining is not mentioned."),
    ("The word 'supports' here means", "Helps", ["Blocks", "Ignores", "Pollutes"], "Here 'supports' means helps or sustains."),
    ("The tone of the passage is", "Factual", ["Sarcastic", "Fearful", "Joyful"], "The passage presents facts."),
    ("What can be inferred about the river's importance?", "It is important for the region's economy", ["It is unimportant", "It is dry in summer", "It flows only in cities"], "Fishing, transport and farming show its economic role."),
]))
P.append(("Kaziranga National Park lies in Assam and is famous for the one-horned rhinoceros. The park is a UNESCO World Heritage Site. It also shelters elephants, tigers and many species of birds.", [
    ("What is Kaziranga famous for?", "The one-horned rhinoceros", ["The Bengal tiger", "The Asiatic lion", "The snow leopard"], "The passage names the one-horned rhinoceros."),
    ("Kaziranga is located in", "Assam", ["Bihar", "Kerala", "Punjab"], "The passage says it lies in Assam."),
    ("Kaziranga is recognised as", "A UNESCO World Heritage Site", ["A military base", "A tea estate", "A port"], "The passage calls it a UNESCO World Heritage Site."),
    ("Which animal is NOT mentioned?", "Polar bear", ["Elephant", "Tiger", "Bird"], "The polar bear is not mentioned."),
    ("The word 'shelters' means", "Gives protection to", ["Hunts", "Sells", "Ignores"], "'Shelters' means provides shelter or protection."),
    ("What is the main idea?", "Kaziranga protects rare wildlife", ["Kaziranga is a city", "Kaziranga has no animals", "Kaziranga is a desert"], "The passage highlights the park's wildlife."),
    ("The tone is", "Informative", ["Angry", "Funny", "Sad"], "The passage gives information."),
]))
P.append(("Bihu is the most important festival of Assam. It is celebrated three times a year, with Bohag Bihu marking the Assamese New Year. People wear traditional clothes, dance and sing together.", [
    ("How many times a year is Bihu celebrated?", "Three", ["One", "Two", "Five"], "The passage says it is celebrated three times a year."),
    ("Which Bihu marks the Assamese New Year?", "Bohag Bihu", ["Kati Bihu", "Magh Bihu", "None"], "The passage names Bohag Bihu."),
    ("What do people do during Bihu?", "Dance and sing", ["Go to war", "Stay silent", "Work in offices"], "The passage mentions dancing and singing."),
    ("Bihu is the festival of", "Assam", ["Punjab", "Kerala", "Gujarat"], "The passage calls it Assam's most important festival."),
    ("The word 'traditional' means", "Following old customs", ["Modern", "Foreign", "Temporary"], "'Traditional' refers to long-established customs."),
    ("What is the main idea?", "Bihu is central to Assamese culture", ["Bihu is a foreign festival", "Bihu is celebrated once", "Bihu has no music"], "The passage shows Bihu's cultural importance."),
    ("The tone is", "Celebratory", ["Critical", "Sad", "Angry"], "The passage describes the festival positively."),
]))
P.append(("Solar energy is clean and renewable. Panels convert sunlight into electricity without burning fuel. However, solar power works best in places that receive strong sunlight throughout the year.", [
    ("Solar energy is described as", "Clean and renewable", ["Dirty and limited", "Costly and useless", "Rare and dangerous"], "The passage calls it clean and renewable."),
    ("What do solar panels convert sunlight into?", "Electricity", ["Water", "Coal", "Petrol"], "The passage says panels convert sunlight into electricity."),
    ("Solar power works best where there is", "Strong sunlight", ["Heavy snow", "Constant rain", "Dense fog"], "The passage mentions strong sunlight."),
    ("Which is NOT mentioned as a benefit?", "It creates smoke", ["It is clean", "It is renewable", "It needs no fuel"], "The passage does not say it creates smoke."),
    ("The word 'renewable' means", "Can be replaced naturally", ["Runs out quickly", "Cannot be used", "Is man-made"], "Renewable sources are naturally replenished."),
    ("What is the main idea?", "Solar energy is a clean power source", ["Solar energy is harmful", "Solar panels need coal", "Sunlight is useless"], "The passage explains solar energy's benefits and limits."),
    ("The tone is", "Informative", ["Sarcastic", "Fearful", "Angry"], "The passage presents facts."),
]))
P.append(("Water is essential for life, yet it is often wasted. Simple habits such as closing taps and repairing leaks can save large amounts of water. Rainwater harvesting is another effective way to conserve it.", [
    ("What is the passage mainly about?", "Water conservation", ["Water pollution", "Air pollution", "Soil erosion"], "The passage discusses ways to save water."),
    ("Which habit is suggested?", "Closing taps", ["Leaving taps open", "Wasting water", "Ignoring leaks"], "The passage suggests closing taps."),
    ("Rainwater harvesting is described as", "An effective way to conserve water", ["A waste of time", "A cause of floods", "A type of pollution"], "The passage calls it effective."),
    ("The word 'essential' means", "Very necessary", ["Optional", "Harmful", "Rare"], "'Essential' means absolutely necessary."),
    ("What can be inferred?", "Small actions can save a lot of water", ["Only governments can save water", "Water is unlimited", "Leaks are harmless"], "The passage says simple habits save large amounts."),
    ("The tone is", "Advisory", ["Humorous", "Angry", "Sad"], "The passage advises readers."),
    ("The author's purpose is to", "Encourage water conservation", ["Sell water", "Describe floods", "Criticise farmers"], "The passage urges saving water."),
]))
P.append(("Reading is a habit that improves both knowledge and language. People who read regularly develop a wider vocabulary and better concentration. Even a few minutes of reading each day can make a difference.", [
    ("What does regular reading improve?", "Knowledge and language", ["Height and weight", "Wealth only", "Nothing"], "The passage names knowledge and language."),
    ("According to the passage, readers develop", "A wider vocabulary", ["Poor memory", "Weak language", "Less concentration"], "The passage says readers develop a wider vocabulary."),
    ("How much reading is recommended?", "Even a few minutes daily", ["Only once a year", "Ten hours daily", "No reading"], "The passage says a few minutes each day can help."),
    ("The word 'concentration' means", "Ability to focus", ["Ability to sleep", "Ability to run", "Ability to sing"], "Concentration is the ability to focus."),
    ("What is the main idea?", "Reading daily is beneficial", ["Reading is harmful", "Only novels are useful", "Reading wastes time"], "The passage promotes daily reading."),
    ("The tone is", "Encouraging", ["Critical", "Sad", "Angry"], "The passage encourages reading."),
    ("Which statement is true?", "Reading improves concentration", ["Reading weakens memory", "Reading is useless", "Reading harms language"], "This is stated in the passage."),
]))
P.append(("Regular exercise keeps the body and mind healthy. It strengthens the heart, controls weight and reduces stress. Doctors advise at least thirty minutes of moderate activity on most days.", [
    ("What does regular exercise strengthen?", "The heart", ["The hair", "The nails", "The teeth"], "The passage says it strengthens the heart."),
    ("How much activity do doctors advise?", "At least thirty minutes", ["Five minutes a month", "Ten hours daily", "No activity"], "The passage mentions thirty minutes on most days."),
    ("Exercise helps to reduce", "Stress", ["Sleep", "Health", "Strength"], "The passage says it reduces stress."),
    ("The word 'moderate' means", "Not too much or too little", ["Extremely heavy", "Very light", "Dangerous"], "Moderate means a balanced amount."),
    ("What is the main idea?", "Exercise is good for health", ["Exercise is harmful", "Rest is useless", "Doctors avoid exercise"], "The passage promotes regular exercise."),
    ("The tone is", "Advisory", ["Humorous", "Angry", "Fearful"], "The passage gives health advice."),
    ("Which benefit is NOT mentioned?", "Increased height", ["Stronger heart", "Weight control", "Less stress"], "Height is not mentioned."),
]))
P.append(("The internet has changed the way students learn. They can watch lessons, read articles and ask questions online. However, students must use reliable sources and avoid distractions.", [
    ("How has the internet changed learning?", "Students can learn online", ["Students cannot read", "Schools have closed", "Books are banned"], "The passage says students can watch lessons and read online."),
    ("What must students use?", "Reliable sources", ["Any rumour", "Only games", "Unverified posts"], "The passage advises using reliable sources."),
    ("What should students avoid?", "Distractions", ["Lessons", "Articles", "Questions"], "The passage says avoid distractions."),
    ("The word 'reliable' means", "Trustworthy", ["False", "Unknown", "Broken"], "Reliable means trustworthy."),
    ("What is the main idea?", "The internet helps learning but needs care", ["The internet is useless", "Students should not learn", "All online sources are false"], "The passage presents both benefits and caution."),
    ("The tone is", "Balanced", ["Angry", "Sarcastic", "Fearful"], "The passage gives benefits and warnings."),
    ("Which is mentioned as an online activity?", "Watching lessons", ["Sleeping", "Cooking", "Driving"], "Watching lessons is mentioned."),
]))
P.append(("Trees are vital for the environment. They absorb carbon dioxide and release oxygen. Their roots hold the soil together and prevent erosion. Cutting trees without replanting damages the ecosystem.", [
    ("What do trees release?", "Oxygen", ["Carbon dioxide", "Nitrogen", "Smoke"], "The passage says trees release oxygen."),
    ("What do tree roots prevent?", "Soil erosion", ["Rain", "Sunlight", "Wind"], "The passage says roots prevent erosion."),
    ("What happens when trees are cut without replanting?", "The ecosystem is damaged", ["The air becomes cleaner", "Soil becomes stronger", "Rain increases"], "The passage warns of damage to the ecosystem."),
    ("The word 'vital' means", "Very important", ["Useless", "Harmful", "Rare"], "Vital means essential."),
    ("What is the main idea?", "Trees are essential for the environment", ["Trees cause pollution", "Trees should be cut", "Trees need no water"], "The passage explains the value of trees."),
    ("The tone is", "Cautionary", ["Humorous", "Angry", "Joyful"], "The passage warns about deforestation."),
    ("Which gas do trees absorb?", "Carbon dioxide", ["Oxygen", "Helium", "Argon"], "The passage says they absorb carbon dioxide."),
]))
P.append(("Good hygiene protects us from disease. Washing hands with soap before meals is a simple habit. Clean water and proper sanitation are equally important for public health.", [
    ("What protects us from disease?", "Good hygiene", ["Dirty water", "Crowded rooms", "Poor sanitation"], "The passage says good hygiene protects us."),
    ("When should hands be washed?", "Before meals", ["After sleeping", "While running", "During meals"], "The passage says before meals."),
    ("What is equally important for public health?", "Clean water and sanitation", ["More vehicles", "Taller buildings", "Louder music"], "The passage names clean water and sanitation."),
    ("The word 'sanitation' means", "Cleanliness and waste disposal", ["Cooking", "Travelling", "Sleeping"], "Sanitation refers to cleanliness and waste disposal."),
    ("What is the main idea?", "Hygiene is important for health", ["Hygiene is unnecessary", "Soap is harmful", "Water is dirty"], "The passage promotes hygiene."),
    ("The tone is", "Advisory", ["Sarcastic", "Fearful", "Angry"], "The passage gives health advice."),
    ("Which habit is mentioned?", "Washing hands with soap", ["Skipping meals", "Drinking dirty water", "Avoiding soap"], "This habit is mentioned."),
]))
P.append(("Assam is known for Muga silk, which is golden in colour. The silk is produced by silkworms reared in the state. Muga silk is valued for its durability and natural shine.", [
    ("What is special about Muga silk?", "It is golden in colour", ["It is blue", "It is transparent", "It is black"], "The passage says it is golden."),
    ("Muga silk is produced by", "Silkworms", ["Bees", "Spiders", "Ants"], "The passage names silkworms."),
    ("Muga silk is valued for its", "Durability and shine", ["Cheap price", "Roughness", "Colourlessness"], "The passage mentions durability and natural shine."),
    ("Muga silk is associated with", "Assam", ["Kerala", "Punjab", "Gujarat"], "The passage says Assam is known for it."),
    ("The word 'durability' means", "Ability to last long", ["Ability to tear easily", "Low quality", "Bright colour"], "Durability means it lasts long."),
    ("What is the main idea?", "Muga silk is a prized Assamese product", ["Muga silk is imported", "Muga silk is artificial", "Muga silk is cheap"], "The passage highlights Muga silk's value."),
    ("The tone is", "Informative", ["Angry", "Sad", "Sarcastic"], "The passage gives facts."),
]))
P.append(("The Constitution of India came into force on 26 January 1950. It lays down the fundamental rights and duties of citizens. It also explains how the government should work.", [
    ("When did the Constitution come into force?", "26 January 1950", ["15 August 1947", "26 November 1949", "2 October 1950"], "The passage gives 26 January 1950."),
    ("What does the Constitution lay down?", "Fundamental rights and duties", ["Only taxes", "Only festivals", "Only trade rules"], "The passage names rights and duties."),
    ("The Constitution explains how the ___ should work.", "Government", ["Army", "School", "Market"], "The passage says it explains how the government should work."),
    ("The word 'fundamental' means", "Basic and essential", ["Optional", "Temporary", "Minor"], "Fundamental means basic."),
    ("What is the main idea?", "The Constitution guides the nation", ["The Constitution is a story", "The Constitution is outdated", "The Constitution has no rights"], "The passage describes the Constitution's role."),
    ("The tone is", "Factual", ["Humorous", "Angry", "Fearful"], "The passage presents facts."),
    ("Which is NOT mentioned?", "The national anthem", ["Fundamental rights", "Fundamental duties", "Government working"], "The national anthem is not mentioned."),
]))
P.append(("Space exploration has given us many benefits. Satellites help in weather forecasting and communication. Space research has also led to new technologies that are used in daily life.", [
    ("What do satellites help with?", "Weather forecasting and communication", ["Cooking", "Farming only", "Sleeping"], "The passage names weather forecasting and communication."),
    ("Space research has led to", "New technologies", ["Fewer jobs", "Less communication", "No benefits"], "The passage says it led to new technologies."),
    ("The passage is about", "Benefits of space exploration", ["Dangers of satellites", "History of rockets only", "Space tourism"], "The passage discusses benefits."),
    ("The word 'forecasting' means", "Predicting", ["Forgetting", "Ignoring", "Recording"], "Forecasting means predicting."),
    ("What is the main idea?", "Space exploration benefits daily life", ["Space research is useless", "Satellites cause storms", "Space has no technology"], "The passage lists practical benefits."),
    ("The tone is", "Positive", ["Angry", "Sad", "Sarcastic"], "The passage highlights benefits."),
    ("Which is mentioned as a benefit?", "Better communication", ["Worse weather", "Fewer satellites", "Less technology"], "Better communication is mentioned."),
]))
P.append(("Mobile phones have made communication easy. People can talk, send messages and use the internet from anywhere. However, excessive use can affect health and studies.", [
    ("What have mobile phones made easy?", "Communication", ["Cooking", "Farming", "Driving"], "The passage says they made communication easy."),
    ("What can people do with mobile phones?", "Talk and send messages", ["Fly", "Cook", "Build houses"], "The passage names talking and messaging."),
    ("Excessive use can affect", "Health and studies", ["Weather", "Rivers", "Mountains"], "The passage warns about health and studies."),
    ("The word 'excessive' means", "Too much", ["Very little", "Balanced", "Rare"], "Excessive means too much."),
    ("What is the main idea?", "Mobile phones are useful but need limits", ["Mobile phones are useless", "Mobile phones are always harmful", "Mobile phones cannot send messages"], "The passage gives benefits and a warning."),
    ("The tone is", "Balanced", ["Angry", "Fearful", "Joyful"], "The passage presents both sides."),
    ("Which is NOT mentioned?", "Mobile phones can fly", ["Talking", "Messages", "Internet"], "Phones cannot fly."),
]))
P.append(("Farmers depend on timely rain and good soil. They prepare the land, sow seeds and protect crops from pests. Modern methods such as improved seeds can increase production.", [
    ("What do farmers depend on?", "Timely rain and good soil", ["Snow and ice", "Strong wind", "Tall buildings"], "The passage names rain and soil."),
    ("What do farmers do after sowing seeds?", "Protect crops from pests", ["Sell the land", "Stop farming", "Burn the crops"], "The passage says they protect crops from pests."),
    ("Improved seeds can increase", "Production", ["Rainfall", "Soil colour", "Wind speed"], "The passage says improved seeds increase production."),
    ("The word 'timely' means", "At the right time", ["Late", "Early", "Never"], "Timely means at the right time."),
    ("What is the main idea?", "Farming needs care and good methods", ["Farming is easy", "Farmers do nothing", "Rain is harmful"], "The passage describes farmers' work."),
    ("The tone is", "Informative", ["Angry", "Humorous", "Sad"], "The passage presents facts."),
    ("Which is mentioned as a modern method?", "Improved seeds", ["Burning fields", "Ignoring pests", "Dry soil"], "Improved seeds are mentioned."),
]))
P.append(("Tourism in Assam is growing because of its wildlife and tea gardens. Visitors come to see Kaziranga and the Brahmaputra. Cultural festivals such as Bihu also attract tourists.", [
    ("Why is tourism in Assam growing?", "Wildlife and tea gardens", ["Deserts", "Snow peaks only", "Mines"], "The passage names wildlife and tea gardens."),
    ("Which park attracts visitors?", "Kaziranga", ["Gir", "Bandipur", "Ranthambore"], "The passage names Kaziranga."),
    ("Which festival attracts tourists?", "Bihu", ["Onam", "Pongal", "Lohri"], "The passage names Bihu."),
    ("The word 'attract' means", "Draw towards", ["Repel", "Ignore", "Confuse"], "Attract means draw towards."),
    ("What is the main idea?", "Assam has strong tourism potential", ["Assam has no tourists", "Tourism harms Assam", "Assam has no festivals"], "The passage highlights tourism growth."),
    ("The tone is", "Positive", ["Angry", "Sad", "Sarcastic"], "The passage describes growth positively."),
    ("Which is NOT mentioned as an attraction?", "Desert safaris", ["Kaziranga", "Brahmaputra", "Bihu"], "Desert safaris are not mentioned."),
]))
P.append(("Pollution is a serious problem in modern cities. Smoke from vehicles and factories pollutes the air. Plastic waste chokes drains and harms animals. Planting trees and reducing waste can help.", [
    ("What pollutes the air in cities?", "Smoke from vehicles and factories", ["Trees", "Rain", "Rivers"], "The passage names vehicle and factory smoke."),
    ("What does plastic waste do?", "Chokes drains and harms animals", ["Cleans roads", "Feeds animals", "Purifies water"], "The passage says plastic chokes drains and harms animals."),
    ("What can help reduce pollution?", "Planting trees and reducing waste", ["Burning plastic", "More factories", "Cutting trees"], "The passage suggests planting trees and reducing waste."),
    ("The word 'chokes' means", "Blocks", ["Cleans", "Waters", "Opens"], "Chokes means blocks."),
    ("What is the main idea?", "Pollution is harmful and can be reduced", ["Pollution is harmless", "Cities have no pollution", "Plastic helps animals"], "The passage describes pollution and solutions."),
    ("The tone is", "Concerned", ["Humorous", "Joyful", "Sarcastic"], "The passage expresses concern about pollution."),
    ("Which is NOT a source of air pollution mentioned?", "Trees", ["Vehicles", "Factories", "Smoke"], "Trees are not a source of pollution here."),
]))
P.append(("Newspapers keep us informed about the world. They report local, national and international news. Reading a newspaper daily also improves language and general knowledge.", [
    ("What do newspapers do?", "Keep us informed", ["Entertain only", "Confuse readers", "Spread rumours"], "The passage says they keep us informed."),
    ("What kind of news do they report?", "Local, national and international", ["Only sports", "Only weather", "Only films"], "The passage names all three levels."),
    ("Reading newspapers improves", "Language and general knowledge", ["Height", "Strength", "Speed"], "The passage says it improves language and general knowledge."),
    ("The word 'informed' means", "Given knowledge", ["Kept ignorant", "Confused", "Silent"], "Informed means having knowledge."),
    ("What is the main idea?", "Newspapers are useful for knowledge", ["Newspapers are useless", "Newspapers are only for children", "Newspapers spread lies"], "The passage highlights newspapers' value."),
    ("The tone is", "Positive", ["Angry", "Sad", "Fearful"], "The passage speaks positively about newspapers."),
    ("Which is mentioned as a benefit?", "Improved general knowledge", ["Better eyesight", "More height", "Faster running"], "Improved general knowledge is mentioned."),
]))
P.append(("Sports teach teamwork and discipline. Players learn to cooperate with others and accept defeat gracefully. Regular practice improves both skill and confidence.", [
    ("What do sports teach?", "Teamwork and discipline", ["Laziness", "Dishonesty", "Fear"], "The passage names teamwork and discipline."),
    ("What do players learn to accept?", "Defeat gracefully", ["Only victory", "No rules", "Cheating"], "The passage says they accept defeat gracefully."),
    ("Regular practice improves", "Skill and confidence", ["Height only", "Wealth only", "Sleep only"], "The passage says practice improves skill and confidence."),
    ("The word 'gracefully' means", "Politely and calmly", ["Angrily", "Rudely", "Sadly"], "Gracefully means politely and calmly."),
    ("What is the main idea?", "Sports build character", ["Sports are harmful", "Sports are only for fun", "Sports teach cheating"], "The passage shows sports build character."),
    ("The tone is", "Positive", ["Angry", "Sad", "Sarcastic"], "The passage praises sports."),
    ("Which quality is NOT mentioned?", "Dishonesty", ["Teamwork", "Discipline", "Confidence"], "Dishonesty is not mentioned."),
]))
P.append(("Wildlife conservation is important for balance in nature. Every animal and plant plays a role in the ecosystem. National parks and laws help protect endangered species.", [
    ("Why is wildlife conservation important?", "For balance in nature", ["For hunting", "For trade", "For entertainment"], "The passage says it maintains balance in nature."),
    ("What helps protect endangered species?", "National parks and laws", ["Hunting", "Deforestation", "Pollution"], "The passage names parks and laws."),
    ("Every animal and plant plays a role in the", "Ecosystem", ["Market", "City", "School"], "The passage names the ecosystem."),
    ("The word 'endangered' means", "At risk of extinction", ["Very common", "Dangerous", "Healthy"], "Endangered means at risk of extinction."),
    ("What is the main idea?", "Protecting wildlife maintains nature's balance", ["Wildlife should be hunted", "Parks are useless", "Laws harm animals"], "The passage promotes conservation."),
    ("The tone is", "Persuasive", ["Humorous", "Angry", "Sad"], "The passage urges conservation."),
    ("Which is mentioned as a protective measure?", "National parks", ["Hunting", "Mining", "Fishing"], "National parks are mentioned."),
]))
P.append(("A balanced diet keeps us healthy. It includes fruits, vegetables, grains and proteins. Too much sugar and oil can cause health problems such as obesity.", [
    ("What does a balanced diet include?", "Fruits, vegetables, grains and proteins", ["Only sugar", "Only oil", "Only water"], "The passage lists these food groups."),
    ("Too much sugar and oil can cause", "Health problems", ["Better health", "Longer life", "More energy"], "The passage warns about health problems."),
    ("Obesity is mentioned as a", "Health problem", ["Benefit", "Food group", "Vitamin"], "The passage calls it a health problem."),
    ("The word 'balanced' means", "Having the right amounts", ["One-sided", "Empty", "Excessive"], "Balanced means having the right amounts."),
    ("What is the main idea?", "A balanced diet is necessary for health", ["Only sugar is needed", "Diet does not matter", "Oil is healthy"], "The passage promotes a balanced diet."),
    ("The tone is", "Advisory", ["Angry", "Sarcastic", "Fearful"], "The passage gives dietary advice."),
    ("Which is NOT mentioned as part of a balanced diet?", "Sweets only", ["Fruits", "Vegetables", "Proteins"], "Sweets only are not part of a balanced diet."),
]))
P.append(("Saving electricity helps both the environment and the family budget. Switching off unused lights and fans reduces waste. Energy-efficient appliances use less power and last longer.", [
    ("What does saving electricity help?", "The environment and the budget", ["Only the government", "Only factories", "Nobody"], "The passage names both."),
    ("What should be switched off when not in use?", "Lights and fans", ["Walls", "Doors", "Windows"], "The passage names lights and fans."),
    ("Energy-efficient appliances", "Use less power", ["Use more power", "Never work", "Cost nothing"], "The passage says they use less power."),
    ("The word 'efficient' means", "Working well without waste", ["Wasteful", "Broken", "Expensive"], "Efficient means working well without waste."),
    ("What is the main idea?", "Saving electricity is beneficial", ["Electricity is free", "Saving power harms us", "Fans should always run"], "The passage promotes saving electricity."),
    ("The tone is", "Advisory", ["Angry", "Humorous", "Sad"], "The passage gives practical advice."),
    ("Which is mentioned as a benefit?", "Lower electricity waste", ["Brighter nights", "More pollution", "Higher bills"], "Lower waste is mentioned."),
]))
P.append(("Libraries are treasure houses of knowledge. They offer books on many subjects at no cost. Reading in a library develops concentration and a lifelong habit of learning.", [
    ("What are libraries called?", "Treasure houses of knowledge", ["Shopping centres", "Sports grounds", "Factories"], "The passage calls them treasure houses of knowledge."),
    ("What do libraries offer?", "Books on many subjects", ["Only novels", "Only magazines", "No books"], "The passage says books on many subjects."),
    ("Reading in a library develops", "Concentration and learning habits", ["Noise", "Laziness", "Illness"], "The passage names concentration and learning."),
    ("The word 'lifelong' means", "Lasting for life", ["Short", "Temporary", "Daily"], "Lifelong means lasting for life."),
    ("What is the main idea?", "Libraries are valuable for learning", ["Libraries are outdated", "Libraries sell books", "Libraries are noisy"], "The passage values libraries."),
    ("The tone is", "Appreciative", ["Angry", "Sad", "Sarcastic"], "The passage appreciates libraries."),
    ("Which is mentioned as a benefit?", "Free access to books", ["Expensive fees", "No books", "Loud music"], "Free access is mentioned."),
]))
P.append(("Discipline and time management lead to success. People who plan their day finish tasks on time. They avoid wasting hours on distractions and stay focused on their goals.", [
    ("What leads to success?", "Discipline and time management", ["Laziness", "Delay", "Distraction"], "The passage names discipline and time management."),
    ("What do people who plan their day do?", "Finish tasks on time", ["Miss deadlines", "Waste time", "Forget goals"], "The passage says they finish tasks on time."),
    ("What should be avoided?", "Distractions", ["Planning", "Focus", "Goals"], "The passage says avoid distractions."),
    ("The word 'focused' means", "Concentrated", ["Confused", "Distracted", "Sleepy"], "Focused means concentrated."),
    ("What is the main idea?", "Discipline and planning bring success", ["Planning wastes time", "Distractions help", "Goals are useless"], "The passage promotes discipline and planning."),
    ("The tone is", "Motivational", ["Angry", "Sad", "Sarcastic"], "The passage motivates readers."),
    ("Which is NOT mentioned as helpful?", "Wasting hours", ["Planning", "Focus", "Time management"], "Wasting hours is not helpful."),
]))

rows = []
for text, qs in P:
    for q, correct, dists, exp in qs:
        rows.append({
            "stem": f"Read the passage: {text} Question: {q}",
            "stem_as": f"অনুচ্ছেদ পঢ়া: {text} প্ৰশ্ন: {q}",
            "correct": (correct, correct),
            "dists": [(d, d) for d in dists],
            "exp_en": exp,
            "exp_as": exp,
        })

append("reading-comprehension", rows)
