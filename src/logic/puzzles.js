//todo improve location names
export const puzzles = [
    {location: "Biolab station, room 1",
    startingText: "Wake up! The DEEP SPACE SLIME has escaped its containment and everyone else is dead… Oopsie daisy! Tap or drag your figure on the map interface to exit your stasis pod and escape into the next room.",
    winText: "It looks like the slime is following you! We’ll have to keep moving.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","exit","outer","outer","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Biolab station, room 2",startingText:"The only way forward is through spaces that haven't been contaminated with slime. That's going to be tricky since the slime is following you. Ooh look, a SAMPLE! Can you grab it on your way to the next room?",
    winText: "Good job grabbing that SAMPLE!. It would be a shame if it fell into the wrong hands.",
    hintText: "That’s ok, you can always revisit a room to try and collect samples again.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","exit","basic","basic","outer",
"outer","outer","outer","basic","outer","basic","outer",
"outer","outer","outer","basic","basic","flask","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Biolab station, room 3",startingText:"A SPRAY BOTTLE can be used once to cross through a slime trail to a non-slime space directly on the opposite side. Give it a try!",
    winText: "Take that, SLIME!",
    hintText: "When you try again, try grabbing the SPRAY BOTTLE before the SAMPLE.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","basic","basic","jet","outer",
"outer","outer","outer","basic","outer","basic","outer",
"outer","exit","basic","basic","basic","flask","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Biolab station, room 4",startingText:"Uh oh… a SECURITY DOOR. Can you find a CARD KEY to open it?",
    winText: "Looking at us. Breaking and entering.",//todo add It's not suspicious at all that I couldn't override the lock myself.?
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","key","outer",
"outer","outer","outer","basic","outer","basic","outer",
"outer","outer","outer","flask","basic","basic","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Biolab station, room 5",startingText:"Hmm…can you grab all the items? If you get stuck, you can tap to retrace your steps or hit the refresh button to try again.",
    winText: "Good job figuring that out! You are already more successful than the last subject. He was such a disappointment…",
    hintText: "Try to grab the CARD KEY, then the SPRAY BOTTLE, and then the SAMPLE before using the SPRAY BOTTLE. Remember that the SPRAY BOTTLE can only be used to travel straight across the slime trail to a slime-free space.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","exit","outer","jet","basic","basic","outer",
"outer","basic","outer","basic","basic","basic","outer",
"outer","door","basic","basic","basic","flask","outer",
"outer","outer","outer","basic","key","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Biolab station, room 7",startingText:"PORTALS allow you to jump around the room. Subject 12 got nauseous after using them.",//todo add something about them getting rid of 12?
    winText: "Great job grabbing the SAMPLE on your way!",
    hintText: "Try a different route to the PORTAL next time to grab the SAMPLE.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","exit","outer","basic","basic","portal","outer",
"outer","basic","outer","basic","outer","basic","outer",
"outer","portal","basic","basic","basic","flask","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Biolab station, room 7",startingText:"Time to put what we learned to the test. Can you find a way to grab both SAMPLES before escaping the room?",
    winText: "You did it! If only the rest of humanity were as dependable as you.",
    hintText: "Here’s a hint for next time: Try grabbing the top right SAMPLE first.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","portal","outer",
"outer","outer","basic","outer","basic","outer","outer",
"outer","basic","basic","basic","basic","flask","outer",
"outer","basic","outer","outer","outer","basic","outer",
"outer","flask","basic","basic","basic","basic","outer",
"outer","outer","key","outer","basic","outer","outer",
"outer","portal","basic","basic","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Biolab station, room 8",startingText:"This looks like a tricky one, good luck!",
    winText: "Look at you. You’re a slime-fighting ninja-astronaut! ",
    hintText: "Next time, try grabbing the SPRAY BOTTLE and then the CARD KEY. Leave a space open to use the spray bottle after grabbing the left SAMPLE.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","outer","outer",
"outer","outer","outer","outer","basic","outer","outer",
"outer","basic","basic","basic","basic","flask","outer",
"outer","basic","basic","outer","outer","basic","outer",
"outer","flask","basic","basic","basic","basic","outer",
"outer","outer","key","outer","jet","basic","outer",
"outer","outer","basic","basic","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Biolab station, room 9",startingText:"Just look at all those SAMPLES! Can you catch them all?",
    winText: "At this rate, we’ll save humanity from the SLIME in no time!",
    hintText: "Try zig-zagging to the top right PORTAL and using your SPRAY BOTTLES after the PORTAL hop.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","basic","basic","portal","outer",
"outer","outer","outer","basic","outer","jet","outer",
"outer","jet","basic","basic","basic","flask","outer",
"outer","basic","outer","flask","outer","basic","outer",
"outer","flask","basic","basic","basic","basic","outer",
"outer","basic","outer","flask","outer","basic","outer",
"outer","portal","basic","basic","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Biolab station, room 10",startingText:"Can you handle all these PORTALS?",
    winText: "Congrats, you have escaped from the BIOLAB STATION. Next up, the INFORMATICS STATION!",
    hintText: "Congrats, you have escaped from the BIOLAB STATION. Next up, the INFORMATICS STATION! Maybe you can come back later to get all the SAMPLES.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","flask","basic","portal","outer",
"outer","outer","outer","basic","outer","basic","outer",
"outer","flask","basic","jet","basic","flask","outer",
"outer","basic","outer","flask","outer","basic","outer",
"outer","key","basic","door","basic","portal","outer",
"outer","basic","outer","basic","outer","basic","outer",
"outer","portal","basic","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Station 2, level 1",startingText:"The INFORMATICS STATION has all the data we have gathered on the DEEP SPACE SLIME. To get that data, you’ll need to hack into the TERMINALS in order, starting with TERMINAL 1.",
    winText: "You’re a hacker, Harry! I mean, a hairy hacker. Humans and their gross body hair…",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","3","basic","2","outer",
"outer","exit","basic","basic","outer","basic","outer",
"outer","outer","outer","flask","basic","1","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Station 2, level 2",startingText:"This one’s a walk in the park.",
    winText: "I would have been… disappointed… if you couldn’t figure this one out.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","portal","outer",
"outer","outer","outer","flask","outer","1","outer",
"outer","3","basic","basic","basic","basic","outer",
"outer","basic","basic","outer","basic","2","outer",
"outer","basic","basic","basic","basic","basic","outer",
"outer","outer","key","basic","basic","outer","outer",
"outer","outer","basic","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Station 2, level 3",startingText:"This one looks a bit tougher, but I’m sure you’ll figure it out… unlike subject 17.",
    winText: "I knew I could count on you… friend.",
    hintText: "Try positioning yourself to use the SPRAY BOTTLE right after you get it.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","basic","outer",
"outer","outer","outer","basic","outer","3","outer",
"outer","1","basic","basic","basic","flask","outer",
"outer","basic","basic","outer","outer","2","outer",
"outer","jet","basic","basic","basic","flask","outer",
"outer","outer","flask","basic","basic","outer","outer",
"outer","outer","basic","key","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Station 2, level 4",startingText:"Do you think you can figure this one out? Try not to disappoint me.",
    winText: "I am well chuffed with your progress! Very well chuffed.",
    hintText: "Try collecting the SAMPLES in the middle column last.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","portal","outer",
"outer","outer","outer","basic","outer","2","outer",
"outer","3","basic","flask","basic","flask","outer",
"outer","basic","jet","basic","basic","1","outer",
"outer","basic","basic","flask","basic","basic","outer",
"outer","outer","key","outer","basic","outer","outer",
"outer","outer","basic","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Station 2, level 5",startingText:"This room looks hard. At least you have a couple SPRAY BOTTLES to help.",
    winText: "Impressive, if only all humans were as reliable as you…",
    hintText: "See if you can use the first SPRAY BOTTLE soon after TERMINAL 1, and the second SPRAY BOTTLE soon after TERMINAL 2.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","portal","outer",
"outer","outer","outer","flask","outer","3","outer",
"outer","2","basic","basic","basic","flask","outer",
"outer","basic","basic","outer","basic","1","outer",
"outer","jet","basic","basic","basic","basic","outer",
"outer","outer","key","outer","jet","outer","outer",
"outer","outer","basic","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
{ location: "Station 2, level 6",startingText:"Don’t give up! You haven’t served your purpose yet.",
    winText: "No other subjects have gotten this far. You should be very proud!",
    hintText: "To get all the SAMPLES, focus on the left side before the right.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","basic","portal","outer",
"outer","outer","outer","basic","outer","2","outer",
"outer","1","basic","basic","basic","flask","outer",
"outer","basic","flask","outer","flask","basic","outer",
"outer","jet","basic","basic","basic","3","outer",
"outer","outer","key","basic","basic","outer","outer",
"outer","outer","basic","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Station 2, level 7",startingText:"You’re almost at the end of your journey. One more room to go.",
    winText: "Congrats, you have escaped from the INFORMATICS STATION. Once you have gathered all SAMPLES from all rooms, your mission is complete.",
    hintText: "Head directly to the closest portal, and save the SPRAY BOTTLE for after TERMINAL 3.",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","portal","portal","outer",
"outer","outer","outer","basic","outer","1","outer",
"outer","2","basic","flask","basic","basic","outer",
"outer","basic","basic","outer","basic","3","outer",
"outer","jet","basic","basic","basic","flask","outer",
"outer","outer","key","basic","flask","outer","outer",
"outer","outer","portal","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",
],
},
 { location: "Final level 1 todo", startingText:"Great job! Please deposit the samples and data you have collected.",
    winText: "Please proceed to the FINAL STATION for decontamination and a fun surprise!",
    puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","exit","outer","outer","outer",
"outer","outer","outer","3","outer","outer","outer",
"outer","outer","outer","2","outer","outer","outer",
"outer","outer","outer","1","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
]
},
 { location: "Final level 2 todo", startingText:"Surprise! I was the one who released the SLIME. Now that you have collected all the research and samples for me, I can use the SLIME to purge humanity from the galaxy. I doubt you are smart enough to hack all of my TERMINALS to stop me!",
  winText: "I’m melting. Like literally… You fried my circuits with your hack!",
  puzzle: ["outer","outer","basic","exit","basic","outer","outer",
"outer","portal","door","1","door","portal","outer",
"outer","outer","outer","basic","outer","outer","outer",
"portal","jet","basic","door","basic","key","portal",
"3","basic","outer","basic","outer","basic","key",
"portal","key","basic","door","basic","4","portal",
"outer","outer","outer","basic","outer","outer","outer",
"outer","portal","jet","2","key","portal","outer",
"outer","outer","basic","start","basic","outer","outer",
]
},
{ location: "Final level 3 todo", startingText:"I’m sorry I tried to decontaminate you. Can we be friends again? PLEASE? I promise I won’t destroy humanity. Please save me!",
  winText: "You may have escaped, but I will take humanity down with me. I have set this station on a collision course with the nearest populated planet. The SLIME will spread. Muahahaha!\n\nTO BE CONTINUED…",
  puzzle: ["outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","ship","outer","outer","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","basic","outer","outer","outer",
"outer","outer","outer","start","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
"outer","outer","outer","outer","outer","outer","outer",
]
}];
