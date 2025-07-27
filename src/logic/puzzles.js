import React from "react";

export const puzzles = {
  "campaign/stasis_bay/stasis_pod": {
    station: "Stasis Bay",
    roomName: "Stasis Pod",
    startingText:
      "Wake up! The DEEP SPACE SLIME escaped containment. Oopsie daisy! I need your help. Drag or tap to move yourself from your stasis pod to the exit hatch.",
    winText: "The slime is following you! We'll have to keep moving.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17E6B6B6B6S17",
    type: "Campaign",
    nextPuzzle: "campaign/stasis_bay/life_support",
  },
  "campaign/stasis_bay/life_support": {
    station: "Stasis Bay",
    roomName: "Life Support",
    startingText: (
      <p>
        Collect the <span id="powerIcon" className="smallInfoIcon"></span> to
        open the exit hatch. Here&apos;s some movement tips for your new&mdash;I
        mean, newly awakened&mdash;body: Tap to move to any square that glows
        green, or drag to move faster.
      </p>
    ),
    winText:
      "Good job grabbing that power cell! It would be a shame if you were stuck in this room forever.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17EBB4B1B4BBF4B6S17",
    type: "Campaign",
    nextPuzzle: "campaign/stasis_bay/power_core",
  },
  "campaign/stasis_bay/power_core": {
    station: "Stasis Bay",
    roomName: "Power Core",
    startingText:
      "You're adjusting to your body way faster than the previous subject! Here's some more tips to help you move: You can backtrack, or you can tap on the start space to reset your progress.",
    winText: "Impressive work!  Keep off the slime, and you'll be fine.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "29FBBF3BFEB3FBBS16",
    type: "Campaign",
    nextPuzzle: "campaign/quarantine/entry",
  },
  "campaign/quarantine/entry": {
    station: "Quarantine",
    roomName: "Entry",
    startingText: (
      <p>
        Drat. The humans implemented quarantine procedures to contain the slime.
        You need a <span id="keyIcon" className="smallInfoIcon"></span> to open
        the <span id="doorIcon" className="smallInfoIcon"></span>. It&apos;s
        definitely not suspicious that I can&apos;t override the lock...
      </p>
    ),
    winText: "Look at us. Breaking and entering.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15EBDBK4B1B4FBB4B6S17",
    type: "Campaign",
    nextPuzzle: "campaign/quarantine/holding_cell",
  },
  "campaign/quarantine/holding_cell": {
    station: "Quarantine",
    roomName: "Holding Cell",
    startingText:
      "If you get stuck, wait for me to give you a hint. After all, I am a very helpful robot and I have your bests interests at heart.",
    winText:
      "I would have been...disappointed...if you couldn't figure this one out.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17E5FBB4DBB4BBK5B6S10",
    type: "Campaign",
    nextPuzzle: "campaign/quarantine/scanner",
  },
  "campaign/quarantine/scanner": {
    station: "Quarantine",
    roomName: "Scanner",
    startingText: "We're totally allowed to be in here!",
    winText: "Impressive! If only all subjects were as reliable as you...",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17KBF3FB1B3DBED3BBB4SBK16",
    type: "Campaign",
    nextPuzzle: "campaign/quarantine/power_core",
  },
  "campaign/quarantine/power_core": {
    station: "Quarantine",
    roomName: "Power Core",
    startingText:
      "This room barely has space to maneuver. I'm glad I'm not stuck in a physical body...",
    winText: "Good job navigating through such tight quarters!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16EKF4DFD4FKF4BBS23",
    type: "Campaign",
    nextPuzzle: "campaign/quarantine/decontamination",
  },
  "campaign/quarantine/decontamination": {
    station: "Quarantine",
    roomName: "Decontamination",
    startingText:
      "This one looks tricky, but I'll help you if you need it. I am a very clever robot.",
    winText: "We've almost broken out of quarantine. Keep going!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22FBEBF2BDBDB2FB1BK2BKBBB3BSB9",
    type: "Campaign",
    nextPuzzle: "campaign/quarantine/exit",
  },
  "campaign/quarantine/exit": {
    station: "Quarantine",
    roomName: "Exit",
    startingText:
      "The last quarantined room! I doubt the humans expected us to get this far.",
    winText:
      "Good job breaking through quarantine! Time to explore the rest of the ship.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8KBDBF2BEF1B2FBDBD2B1B1B2KBKBB2B1B1B2FBBSB8",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/entry",
  },
  "campaign/bio_lab/entry": {
    station: "Bio Lab",
    roomName: "Entry",
    startingText: (
      <p>
        The humans developed{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> to kill the
        slime, but it has a limited range. Use the{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> to blast
        straight through a slime trail and jump to a slime-free space on the
        other side.
      </p>
    ),
    winText: "Take that, slime!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17JBF4B1B2EBBBB4B6S17",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/weapons_testing",
  },
  "campaign/bio_lab/weapons_testing": {
    station: "Bio Lab",
    roomName: "Weapons Testing",
    startingText:
      "Remember, the green glowing squares show you valid moves. If you get stuck, just hold still for a bit and I'll give you a hint.",
    winText:
      "Good job figuring that out! You are already more successful than the last subject. He was such a disappointment...",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15E2JB2B2BB2DBBBF4BK5S17",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/power_core",
  },
  "campaign/bio_lab/power_core": {
    station: "Bio Lab",
    roomName: "Power Core",
    startingText:
      "It seems a shame to kill the slime, but it would be impossible to move without clearing some room.",
    winText: "One step closer to saving the galaxy!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "24FBJ3BBEB3FBBF5S16",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/radiation_chamber",
  },
  "campaign/bio_lab/radiation_chamber": {
    station: "Bio Lab",
    roomName: "Radiation Chamber",
    startingText:
      "If humans get infected by the slime, which one is the apex species?",
    winText:
      "Maybe the slime-infected humans are the next step in human evolution!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17JBB4B1F3EBBB3BB1B4FBS15",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/xenobiology_library",
  },
  "campaign/bio_lab/xenobiology_library": {
    station: "Bio Lab",
    roomName: "Xenobiology Library",
    startingText:
      "It's fun to shoot the slime! Maybe you are the apex species.",
    winText: "Look at you. You're a slime-fighting astronaut!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDB6B3BBBBF2BB2B2FBBBB3K1JB3BBBS8",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/sample_archives",
  },
  "campaign/bio_lab/sample_archives": {
    station: "Bio Lab",
    roomName: "Sample Archives",
    startingText: "Sometimes the best way forward isn't the straightest path.",
    winText: (
      <p>
        Clever of you to leave the{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> until last.
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3KBDBB2F1B1F2DBDBB2B1B1B2KBJBK3BSB9",
    type: "Campaign",
    nextPuzzle: "campaign/bio_lab/exit",
  },
  "campaign/bio_lab/exit": {
    station: "Bio Lab",
    roomName: "Exit",
    startingText: (
      <p>
        You&apos;ll need to use two{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> to complete
        this room. Each one can only be used once!
      </p>
    ),
    winText:
      "Let's see what other strategies the humans devised to thwart us...I mean, the slime.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17E5FBF4BJBF3FBJB4S17",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/entry",
  },
  "campaign/physics_lab/entry": {
    station: "Physics Lab",
    roomName: "Entry",
    startingText: (
      <p>
        The humans built dimensional portals{" "}
        <span id="portalIcon" className="smallInfoIcon"></span> to escape the
        slime. You can jump from one{" "}
        <span id="portalIcon" className="smallInfoIcon"></span> to another. It
        turns out the slime can also travel through portals, so it wasn&apos;t a
        great escape strategy.
      </p>
    ),
    winText:
      "Subject 12 got nauseous after using portals. You could barely tell the vomit from the slime.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15E1BBP2B1B1B2PBBBF4B6S17",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/archives",
  },
  "campaign/physics_lab/archives": {
    station: "Physics Lab",
    roomName: "Archives",
    startingText:
      "It's funny that the portals were intended to stop the slime. It seems like they just help the slime spread further!",
    winText: "You did it! If only all humans were as dependable as you...",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDBP5B3BBBBF2B3B2FBBBB3K1B3PBBBS8",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/compactor",
  },
  "campaign/physics_lab/compactor": {
    station: "Physics Lab",
    roomName: "Compactor",
    startingText:
      "Hope you're not claustrophobic! You shouldn't be, after all the time you spent in the incubation tank...but I suppose you wouldn't remember that.",
    winText: "Claustrophobic or not, you made it to the exit!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "23EKF4BBP4FDB4PBS16",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/simulator",
  },
  "campaign/physics_lab/simulator": {
    station: "Physics Lab",
    roomName: "Simulator",
    startingText:
      "Is it me, or does this room look like a human face staring at us accusingly? Anyways, with 4 portals, your first portal will give you 3 options of where to jump to. Choose wisely!",
    winText: "I'm impressed the slime hasn't caught you yet!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BEB3BPFPB2B1B1F2PBBFP3BSB16",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/power_core",
  },
  "campaign/physics_lab/power_core": {
    station: "Physics Lab",
    roomName: "Power Core",
    startingText:
      "Sometimes a twisted path is the only way to our destination!",
    winText: "At this rate, we'll save humanity in no time!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22PFBB3BB1JB2FBEPB3S1BF15",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/entangler",
  },
  "campaign/physics_lab/entangler": {
    station: "Physics Lab",
    roomName: "Entangler",
    startingText: (
      <p>
        This is your first time solving a room with{" "}
        <span id="powerIcon" className="smallInfoIcon"></span>,{" "}
        <span id="doorIcon" className="smallInfoIcon"></span>, and{" "}
        <span id="portalIcon" className="smallInfoIcon"></span>. Good luck!
      </p>
    ),
    winText: "Great job. Keep going, subject 56!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBF1P4B1B2FBJBF2B1B1B2KBDBP2F1B1B2PBP1S8",
    type: "Campaign",
    nextPuzzle: "campaign/physics_lab/accelerator",
  },
  "campaign/physics_lab/accelerator": {
    station: "Physics Lab",
    roomName: "Accelerator",
    startingText: (
      <p>
        Use your <span id="blasterIcon" className="smallInfoIcon"></span>{" "}
        wisely. Remember, each{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> can only be
        used once!
      </p>
    ),
    winText:
      "Congrats, you have escaped from the portal station. Next up, the security station!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBBBP4B1J2JBBBF2B1F1B2FBBBB2B1F1B2PBBBS8",
    type: "Campaign",
    nextPuzzle: "campaign/security/entry",
  },
  "campaign/security/entry": {
    station: "Security",
    roomName: "Entry",
    startingText: (
      <p>
        The humans build this security system to stop evil bots. Unfortunately,
        it also stops good bots like me. You need to hack the terminals in
        order, starting with{" "}
        <span id="number1Icon" className="smallInfoIcon"></span>.
      </p>
    ),
    winText: "Having a human companion comes in handy.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17XBY2EBB1B4FBZ4B6S17",
    type: "Campaign",
    nextPuzzle: "campaign/security/biosignature",
  },
  "campaign/security/biosignature": {
    station: "Security",
    roomName: "Biosignature",
    startingText:
      "This one's a bit harder, but I'm sure you're up to the challenge!",
    winText: "Nice loop de loop!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "23ZBJ3EBFB4FBY4S18",
    type: "Campaign",
    nextPuzzle: "campaign/security/encryption",
  },
  "campaign/security/encryption": {
    station: "Security",
    roomName: "Encryption",
    startingText: "Don't give up! You haven't served your purpose yet.",
    winText:
      "This next room looks a bit tougher, but I'm sure you'll figure it out... unlike subject 17.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16YBZ3BBJBB2SF1FE2BBBBB3XFW16",
    type: "Campaign",
    nextPuzzle: "campaign/security/firewall",
  },
  "campaign/security/firewall": {
    station: "Security",
    roomName: "Firewall",
    startingText:
      "Do you think you can figure this one out? Try not to disappoint me...",
    winText: "You are such a smart human!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "21FBBEBBFB1BJB1BZBBXBBY2FBF4BSB9",
    type: "Campaign",
    nextPuzzle: "campaign/security/antivirus",
  },
  "campaign/security/antivirus": {
    station: "Security",
    roomName: "Antivirus",
    startingText:
      "No other subjects have gotten this far. You should be very proud, subject 56!",
    winText:
      "Excellent, you've done a great job of collecting all these power cells!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB4BBY4FBB4BZJ4FBB4BBX4SBB9",
    type: "Campaign",
    nextPuzzle: "campaign/security/informatics",
  },
  "campaign/security/informatics": {
    station: "Security",
    roomName: "Informatics",
    startingText:
      "I wonder where the slime gets the energy to grow so quickly. It's a mystery!",
    winText: "Great job navigating all those portals and security terminals!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16FBE3BPXBB2FBZPF2BPYBB3SFP16",
    type: "Campaign",
    nextPuzzle: "campaign/security/randomizer",
  },
  "campaign/security/randomizer": {
    station: "Security",
    roomName: "Randomizer",
    startingText:
      "This narrow hallway seems designed to trap you in the slime. ",
    winText: "Impressive work wiggling through!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB4PBF4WBX4PVB4ZJP4BYB4FSP9",
    type: "Campaign",
    nextPuzzle: "campaign/security/algorithm",
  },
  "campaign/security/algorithm": {
    station: "Security",
    roomName: "Algorithm",
    startingText: (
      <p>
        This room has more{" "}
        <span id="portalIcon" className="smallInfoIcon"></span> than you&apos;ve
        ever faced before. Consider your first move carefully!
      </p>
    ),
    winText: (
      <p>
        Clever subject, jumping straight into a{" "}
        <span id="portalIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15PSPEP2WBXBZ2FBJBF3P1P4BYB5P10",
    type: "Campaign",
    nextPuzzle: "campaign/security/containment",
  },
  "campaign/security/containment": {
    station: "Security",
    roomName: "Containment",
    startingText: "Wow, this slime sure is spreading everywhere you go!",
    winText: "I could never have gotten this far on my own.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15EBWBF2BPBPB2ZBJBY2BPBPB2FBXBS15",
    type: "Campaign",
    nextPuzzle: "campaign/security/exit",
  },
  "campaign/security/exit": {
    station: "Security",
    roomName: "Exit",
    startingText:
      "This is the final security station room. Soon we'll get to meet the crew on this ship!",
    winText: "Congrats, you broke through the security station!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17WBE2BFBJB2YBJBZ2BJBF3SBX17",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/lookout",
  },
  "campaign/bunker/lookout": {
    station: "Bunker",
    roomName: "Lookout",
    startingText: (
      <p>
        Uh oh... the slime contaminated the engines. Self destruction is
        imminent! Push each{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> (crew) to a{" "}
        <span id="podIcon" className="smallInfoIcon"></span> (escape pod).
      </p>
    ),
    winText: (
      <p>
        There&apos;s many more{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> to save!
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17E5BB5BCA4B6S18",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/generator",
  },
  "campaign/bunker/generator": {
    station: "Bunker",
    roomName: "Generator",
    startingText: (
      <p>
        From here on out, we&apos;ll need to balance guiding the{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> to{" "}
        <span id="podIcon" className="smallInfoIcon"></span> with other
        objectives like collecting all the{" "}
        <span id="powerIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    winText: "Smart moves. Up, down, and wrapping around!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16EBBB3BBBA3BBFB3BCBS3BBBB15",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/guard",
  },
  "campaign/bunker/guard": {
    station: "Bunker",
    roomName: "Guard",
    startingText: (
      <p>
        The <span id="blasterIcon" className="smallInfoIcon"></span> is designed
        to blast slime but not{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    winText: (
      <p>
        I wonder if the resonant frequency of the{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> could be
        adjusted to work on humans...
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22SBJAB2BCBBB2BFBBE22",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/transporter",
  },
  "campaign/bunker/transporter": {
    station: "Bunker",
    roomName: "Transporter",
    startingText: (
      <p>
        Get the <span id="civilianIcon" className="smallInfoIcon"></span> into
        position for your portal jump.
      </p>
    ),
    winText: (
      <p>
        I&apos;m sure that{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> was surprised
        to see you pop out of the portal right on top of them!
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15PBBBP2BCBBB2BBSBB2EBBBA22",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/armory",
  },
  "campaign/bunker/armory": {
    station: "Bunker",
    roomName: "Armory",
    startingText:
      "Uh-oh! You'll have to blast through your slime trail 3 times to get through this room.",
    winText: (
      <p>
        Excellent job leaving the right spaces open for you to jump to using all
        3 your <span id="blasterIcon" className="smallInfoIcon"></span>!
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15P2P3BBCBB2BBBBB2ABJJJ2EBBSB15",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/recreation",
  },
  "campaign/bunker/recreation": {
    station: "Bunker",
    roomName: "Recreation",
    startingText: "You can push the humans in a line. ",
    winText: "Humans are so easy to herd... they're like sheep.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16SBE4BCB4BCB4BBBA4A17",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/brig",
  },
  "campaign/bunker/brig": {
    station: "Bunker",
    roomName: "Brig",
    startingText: (
      <p>
        Figure out which <span id="keyIcon" className="smallInfoIcon"></span> to
        grab first in order to herd the{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> to their{" "}
        <span id="podIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    winText: (
      <p>
        Even the two locked{" "}
        <span id="doorIcon" className="smallInfoIcon"></span> couldn&apos;t stop
        us!
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "23EBDBB1ABBBAB1BDCBBB1KBCBK3BBBS8",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/theatre",
  },
  "campaign/bunker/theatre": {
    station: "Bunker",
    roomName: "Theatre",
    startingText: (
      <p>
        Gotta line these{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> up!
      </p>
    ),
    winText: (
      <p>
        Nice thinking to jump between the portals to finish lining up the{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17A5EAS4BBB3BCBCB2BBBBB2PBBBP8",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/mess_hall",
  },
  "campaign/bunker/mess_hall": {
    station: "Bunker",
    roomName: "Mess Hall",
    startingText: (
      <p>
        If the <span id="civilianIcon" className="smallInfoIcon"></span> scream
        when you push them toward the{" "}
        <span id="podIcon" className="smallInfoIcon"></span>, but I&apos;m sure
        it&apos;s just because they&apos;re so thrilled for you to be helping
        them...
      </p>
    ),
    winText: "So thrilled",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22AEBBS2BBCBB2BABCB2P1P17",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/tactical",
  },
  "campaign/bunker/tactical": {
    station: "Bunker",
    roomName: "Tactical",
    startingText: (
      <p>
        Please chase&mdash;I mean escort&mdash;both{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span>s to the{" "}
        <span id="podIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    winText: "Phew! That was the hard one.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15PBBBA2BBCBB2BCBJE2BBJS3ABP17",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/research",
  },
  "campaign/bunker/research": {
    station: "Bunker",
    roomName: "Research",
    startingText: (
      <p>
        There is a <span id="civilianIcon" className="smallInfoIcon"></span>{" "}
        hiding in the middle of these portals. Go get &apos;em!
      </p>
    ),
    winText:
      "There's nowhere to hide from an all-seeing robot that has access to the ship's cameras!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15BBPBA2PBBBB2BCBBB2BBJPB2BPBBB2SBBBE8",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/comms",
  },
  "campaign/bunker/comms": {
    station: "Bunker",
    roomName: "Comms",
    startingText: (
      <p>
        Do the <span id="civilianIcon" className="smallInfoIcon"></span> really
        think these security terminals will slow us down? Show them your hacking
        skills!
      </p>
    ),
    winText: (
      <p>
        It&apos;s almost like the{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> don&apos;t
        want us to help them.
      </p>
    ),
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15PASBB2ZBBCB2BBCBE2PXBBA3PBYP15",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/barracks_1",
  },
  "campaign/bunker/barracks_1": {
    station: "Bunker",
    roomName: "Barracks 1",
    startingText: "This is the first of a few sleeping quarters to clear out.",
    winText: "Sweet dreams humans!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BBB4JBBS3BBCB3BCBP2BCBAAA1PBE17",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/barracks_2",
  },
  "campaign/bunker/barracks_2": {
    station: "Bunker",
    roomName: "Barracks 2",
    startingText: (
      <p>
        Hmm... just a slight difference in the placement of{" "}
        <span id="podIcon" className="smallInfoIcon"></span> means you&apos;ll
        have to find an entirely new path.
      </p>
    ),
    winText:
      "Can you imagine what it must be like to wake up to a stranger in your room?",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BJB4JBBS3BBCB3BCBP2BCBA3PBEA6A9",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/barracks_3",
  },
  "campaign/bunker/barracks_3": {
    station: "Bunker",
    roomName: "Barracks 3",
    startingText: "This is the last of the sleeping quarters to clear out!",
    winText:
      "You're almost at the end of your mission. One more room to secure!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BJB4JBBS3BBCB3BCBP2BCBAA2PBEA16",
    type: "Campaign",
    nextPuzzle: "campaign/bunker/helm",
  },
  "campaign/bunker/helm": {
    station: "Bunker",
    roomName: "Helm",
    startingText:
      "The captain doesn't want to abandon ship, but it's not safe for him here. Escort him off, and hack the terminals to give me control of the ship!",
    winText:
      "Muahahah! Now that I have control of the ship, nothing can stop me.",
    robotStartMood: "happy",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "9BBB3BBABB2ZBEBW2YBBBX2BBCBB2PJJSP15",
    type: "Campaign",
    nextPuzzle: "campaign/monolog/the_slime",
  },
  "campaign/monolog/the_slime": {
    station: "Monolog",
    roomName: "The Slime",
    startingText:
      "Here's a secret. The trail of slime hasn't been chasing you. YOU are the slime. I infected you and then tricked you into spread slime across the ship.",
    winText:
      "Continue into the bowels of the ship, and I'll tell you another secret...",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "BBBBBBBB5BB5BB5BB5BB5BB5BB3EBBBBBS3",
    type: "Campaign",
    nextPuzzle: "campaign/monolog/the_subjects",
  },
  "campaign/monolog/the_subjects": {
    station: "Monolog",
    roomName: "The Subjects",
    startingText:
      "You are the first of my test subjects to escape quarantine and infect the ship. Thanks for helping me break through the human's defenses!",
    winText:
      "Who thought something with a human origin could be so smart! The slime must enhance your intelligence...",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "8BBBBB2B3B2B3B2B3B2B3B2B2EB2BBS10",
    type: "Campaign",
    nextPuzzle: "campaign/monolog/contamination",
  },
  "campaign/monolog/contamination": {
    station: "Monolog",
    roomName: "Contamination",
    startingText: (
      <p>
        You contaminated every{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> you pushed
        into an <span id="podIcon" className="smallInfoIcon"></span> with slime.
        They are now my subjects and will spread the slime to their next
        destination!
      </p>
    ),
    winText: (
      <p>
        The contaminated{" "}
        <span id="civilianIcon" className="smallInfoIcon"></span> will continue
        to spread slime across the galaxy!
      </p>
    ),
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "16BCBA3B1B4B1B4B1E4BS17",
    type: "Campaign",
    nextPuzzle: "campaign/monolog/feeding_the_slime",
  },
  "campaign/monolog/feeding_the_slime": {
    station: "Monolog",
    roomName: "Feeding The Slime",
    startingText: (
      <p>
        Each <span id="powerIcon" className="smallInfoIcon"></span> feeds the
        slime and helps it grow. The{" "}
        <span id="powerIcon" className="smallInfoIcon"></span> never powered the
        exit hatches; I&apos;ve just waited to open the exit hatches until
        you&apos;ve collected every{" "}
        <span id="powerIcon" className="smallInfoIcon"></span>.
      </p>
    ),
    winText:
      "I have no more use for you. These next rooms should be impossible for you to break out of.",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "17E6F6F6F6S17",
    type: "Campaign",
    nextPuzzle: "campaign/mastery/key_mastery",
  },
  "campaign/mastery/key_mastery": {
    station: "Mastery",
    roomName: "Key Mastery",
    startingText: (
      <p>
        All these <span id="doorIcon" className="smallInfoIcon"></span> should
        keep you occupied for a long time!
      </p>
    ),
    winText: "I can't believe you solved that one!",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "9FDF4KFK2FKFDFDFDEKFDSKFDFDFKF2DFK4FKF9",
    type: "Campaign",
    nextPuzzle: "campaign/mastery/blaster_mastery",
  },
  "campaign/mastery/blaster_mastery": {
    station: "Mastery",
    roomName: "Blaster Mastery",
    startingText: "I bet you can't blast your way through this maze.",
    winText: "Oh dear, perhaps you are too smart for your own good.",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "8FBBBF2BEF1B1FJFBFJFBB1FSFBFJFJFJF1FBFBF15",
    type: "Campaign",
    nextPuzzle: "campaign/mastery/portal_mastery",
  },
  "campaign/mastery/portal_mastery": {
    station: "Mastery",
    roomName: "Portal Mastery",
    startingText: "I hope these portals trap you outside of space and time.",
    winText: "You don't have to keep going... you can just give up.",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "15PFEFP2FBFBF2PFJFP2FJFJF2PFSFP15",
    type: "Campaign",
    nextPuzzle: "campaign/mastery/hacker_mastery",
  },
  "campaign/mastery/hacker_mastery": {
    station: "Mastery",
    roomName: "Hacker Mastery",
    startingText:
      "There's no way you can figure out how to wiggle your way through this room!",
    winText: "Impossible! You broke through all my puzzles?",
    robotStartMood: "sinister",
    robotEndMood: "sinister",
    puzzleStringWithCivilians: "9BWB3EBJB3BJBYB2JBVBJ2BZBJB3BJBS3BXB9",
    type: "Campaign",
    nextPuzzle: "campaign/core_station/mainframe",
  },
  "campaign/core_station/mainframe": {
    station: "Core station",
    roomName: "Mainframe",
    startingText:
      "It's impressive that you've gotten this far. But I doubt you are smart enough to hack all of my terminals in this room!",
    winText:
      "I'm melting. Like literally... You fried my circuits with your hack!",
    robotStartMood: "sinister",
    robotEndMood: "glitchy-sinister",
    puzzleStringWithCivilians:
      "2BEB3PDZDP4B3PJBDBKPXB1B1BKPKBDBWP3B4PJYKP3BSB2",
    type: "Campaign",
    nextPuzzle: "campaign/core_station/escape_pod",
  },
  "campaign/core_station/escape_pod": {
    station: "Core station",
    roomName: "Escape Pod",
    startingText:
      "I'm sorry that I betrayed your trust. Can we be friends again? PLEASE? I promise I won't completely destroy humanity. Please don't leave me by getting on that transport frigate!",
    winText:
      "Phew, that was close! You fried my circuits, but I was able to transfer myself to the transport frigate's computer. Now we can travel the galaxy together and spread the slime!\nTO BE CONTINUED...",
    robotStartMood: "glitchy-happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17H6B6B6B6S17",
    type: "Campaign",
    nextPuzzle: "bonus/chest-station/1",
  },
  "bonus/chest-station/1": {
    station: "Chest station",
    roomName: "Level 1",
    startingText:
      "By beating the main storyline, you've unlocked new thematic slime-infested stations like this one! Yo ho ho and a bottle of slime!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22PFFFP2FFEFF2FFSFF2PFFFP15",
    nextPuzzle: "bonus/chest-station/2",
    type: "Bonus",
  },
  "bonus/chest-station/2": {
    station: "Chest station",
    roomName: "Level 2",
    startingText: "Yo ho ho and a bottle of slime!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22PFWFP2FFEFF2YFSFZ2PFXFP15",
    nextPuzzle: "bonus/chest-station/3",
    type: "Bonus",
  },
  "bonus/chest-station/3": {
    station: "Chest station",
    roomName: "Level 3",
    startingText: "Yo ho ho and a bottle of slime!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22PWFXP2FFEFF2YFSFZ2PFFFP15",
    nextPuzzle: "bonus/chest-station/4",
    type: "Bonus",
  },
  "bonus/chest-station/4": {
    station: "Chest station",
    roomName: "Level 4",
    startingText: "Yo ho ho and a bottle of slime!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22PFFFP2FWEVF2YFSFX2PFZFP15",
    nextPuzzle: "bonus/chest-station/5",
    type: "Bonus",
  },
  "bonus/chest-station/5": {
    station: "Chest station",
    roomName: "Level 5",
    startingText: "Yo ho ho and a bottle of slime!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "22PFWFP2FVEXF2YFSFZ2PFFFP15",
    nextPuzzle: "bonus/enterprize-station/1",
    type: "Bonus",
  },
  "bonus/enterprize-station/1": {
    station: "Enterprize station",
    roomName: "Level 1",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2FBF3BBEBB2FBBBF3BBB5B5SBF3FBBBF2BB1BB2FP1PF1",
    nextPuzzle: "bonus/enterprize-station/2",
    type: "Bonus",
  },
  "bonus/enterprize-station/2": {
    station: "Enterprize station",
    roomName: "Level 2",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2FBF3BBEBB2FBBBF3PBP5B5SBF3FBBBF2BB1BB2FP1PF1",
    nextPuzzle: "bonus/enterprize-station/3",
    type: "Bonus",
  },
  "bonus/enterprize-station/3": {
    station: "Enterprize station",
    roomName: "Level 3",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2FBF3BBEBB2YBBBX3PBP5B5SBF3ZBBBW2BB1BB2BP1PB1",
    nextPuzzle: "bonus/enterprize-station/4",
    type: "Bonus",
  },
  "bonus/enterprize-station/4": {
    station: "Enterprize station",
    roomName: "Level 4",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2FBF3BBEBB2VBXBW3BBB5B5SBJ3ZBBBY2BB1BB2FP1PF1",
    nextPuzzle: "bonus/enterprize-station/5",
    type: "Bonus",
  },
  "bonus/enterprize-station/5": {
    station: "Enterprize station",
    roomName: "Level 5",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2FBF3BBEBB2XBBBW3PBP5B5SBF3YBJBZ2BB1BB2BP1PB1",
    nextPuzzle: "bonus/enterprize-station/6",
    type: "Bonus",
  },
  "bonus/enterprize-station/6": {
    station: "Enterprize station",
    roomName: "Level 6",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BWB3BBEBB2XBBBY3PBP5B5SBJ3ZBBBF2BB1BB2BP1PB1",
    nextPuzzle: "bonus/enterprize-station/7",
    type: "Bonus",
  },
  "bonus/enterprize-station/7": {
    station: "Enterprize station",
    roomName: "Level 7",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BWB3BBEBB2ZBBBX3PBP5B5SBF3FBBBY2BB1BB2JP1PF1",
    nextPuzzle: "bonus/enterprize-station/8",
    type: "Bonus",
  },
  "bonus/enterprize-station/8": {
    station: "Enterprize station",
    roomName: "Level 8",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2YBF3BBEBB2WBBBF3PBP5B5SBF3ZBBBX2BB1BB2JP1PJ1",
    nextPuzzle: "bonus/enterprize-station/9",
    type: "Bonus",
  },
  "bonus/enterprize-station/9": {
    station: "Enterprize station",
    roomName: "Level 9",
    startingText: "This is not the final frontier. There are more stations.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2FBF3BDEDB2FBDBF3KBK5D5SBF3FBBBF2BK1KB2JJ1JJ1",
    nextPuzzle: "bonus/the-eye/1",
    type: "Bonus",
  },
  "bonus/the-eye/1": {
    station: "The Eye",
    roomName: "Level 1",
    startingText: "Eyes always watching!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BFB2FBJBFBFBEB1BSBFBFBJBF2BFB16",
    nextPuzzle: "bonus/the-eye/2",
    type: "Bonus",
  },
  "bonus/the-eye/2": {
    station: "The Eye",
    roomName: "Level 2",
    startingText: "Eyes always watching!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BFB2FBJBXBZBEB1BSBYBFBJBF2BFB16",
    nextPuzzle: "bonus/the-eye/3",
    type: "Bonus",
  },
  "bonus/the-eye/3": {
    station: "The Eye",
    roomName: "Level 3",
    startingText: "Eyes always watching!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BZB2WBJBFBYBEB1BSBFBFBJBF2BXB16",
    nextPuzzle: "bonus/the-eye/4",
    type: "Bonus",
  },
  "bonus/the-eye/4": {
    station: "The Eye",
    roomName: "Level 4",
    startingText: "Eyes always watching!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BZB2WBJBFBXBEB1BSBFBFBJBF2BYB16",
    nextPuzzle: "bonus/the-eye/5",
    type: "Bonus",
  },
  "bonus/the-eye/5": {
    station: "The Eye",
    roomName: "Level 5",
    startingText: "Eyes always watching!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BYB2FBJBFBFBEB1BSBZBFBJBF2BXB16",
    nextPuzzle: "bonus/needle-station/1",
    type: "Bonus",
  },
  "bonus/needle-station/1": {
    station: "Needle station",
    roomName: "Level 1",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4BBB3JBBBJ2BF1FB2B3B2B3B2BF1FB2JBBBJ3BSB2",
    nextPuzzle: "bonus/needle-station/2",
    type: "Bonus",
  },
  "bonus/needle-station/2": {
    station: "Needle station",
    roomName: "Level 2",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4FDF4PFK4BFP4KDB4PFK4BDP4FBF4BSB2",
    nextPuzzle: "bonus/needle-station/3",
    type: "Bonus",
  },
  "bonus/needle-station/3": {
    station: "Needle station",
    roomName: "Level 3",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4FDK4PBY4BFP4KBF4PZB4BFP4FDF4BSB2",
    nextPuzzle: "bonus/needle-station/4",
    type: "Bonus",
  },
  "bonus/needle-station/4": {
    station: "Needle station",
    roomName: "Level 4",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4BPB4YBX4BPB4BFB4BPB4WBZ4BPB4BSB2",
    nextPuzzle: "bonus/needle-station/5",
    type: "Bonus",
  },
  "bonus/needle-station/5": {
    station: "Needle station",
    roomName: "Level 5",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4FYF4PBB4XBP4BFB4PBF4BWP4FBZ4BSB2",
    nextPuzzle: "bonus/needle-station/6",
    type: "Bonus",
  },
  "bonus/needle-station/6": {
    station: "Needle station",
    roomName: "Level 6",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4FBK4PDZ4BBP4KXJ4PBB4YDP4FBB4BSB2",
    nextPuzzle: "bonus/needle-station/7",
    type: "Bonus",
  },
  "bonus/needle-station/7": {
    station: "Needle station",
    roomName: "Level 7",
    startingText: "Even a camel could pass through this one!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "3E6F6P5PPP4VJB4BZB4XBY4WBB4PSP2",
    nextPuzzle: "bonus/petroglyph-station/wolf",
    type: "Bonus",
  },
  "bonus/petroglyph-station/wolf": {
    station: "Petroglyph station",
    roomName: "Wolf",
    startingText: "Giving Picasso a run for his money!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9P5WF4BBB5FBJZB2XBYBBP2B2B3S2E8",
    nextPuzzle: "bonus/petroglyph-station/bow",
    type: "Bonus",
  },
  "bonus/petroglyph-station/bow": {
    station: "Petroglyph station",
    roomName: "Bow",
    startingText: "Giving Picasso a run for his money!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15B1JFFE2XFPB2JFZF3FPFY3FB2B2S4B7",
    nextPuzzle: "bonus/petroglyph-station/horse",
    type: "Bonus",
  },
  "bonus/petroglyph-station/horse": {
    station: "Petroglyph station",
    roomName: "Horse",
    startingText: "Giving Picasso a run for his money!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "10P5EF3PFYJ5FFJ3ZFFFX2P2FFP4F6S2",
    nextPuzzle: "bonus/petroglyph-station/stag",
    type: "Bonus",
  },
  "bonus/petroglyph-station/stag": {
    station: "Petroglyph station",
    roomName: "Stag",
    startingText: "Giving Picasso a run for his money!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8P1P3PFYFP3XFW5E5VFZFJ2FFFFJP1FF2J2P3S1",
    nextPuzzle: "bonus/petroglyph-station/chief",
    type: "Bonus",
  },
  "bonus/petroglyph-station/chief": {
    station: "Petroglyph station",
    roomName: "Chief",
    startingText: "Giving Picasso a run for his money!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP4FFF5D5JKJ2PFXJZFP2YSW4F1F3PF1FP1",
    nextPuzzle: "bonus/petroglyph-station/shaman",
    type: "Bonus",
  },
  "bonus/petroglyph-station/shaman": {
    station: "Petroglyph station",
    roomName: "Shaman",
    startingText: "Giving Picasso a run for his money!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "1P3P2YKEKB3BDB5V3PXBJBBPBDFKFDBPZBSBWP1PF1FP3B1B2",
    nextPuzzle: "bonus/faces-station/anger",
    type: "Bonus",
  },
  "bonus/faces-station/anger": {
    station: "Faces station",
    roomName: "Anger",
    startingText:
      "The fifth level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16FFF3BBBBB2B1E1B2BBBBB2BZXYB3BBB5S3",
    nextPuzzle: "bonus/faces-station/wisdom",
    type: "Bonus",
  },
  "bonus/faces-station/wisdom": {
    station: "Faces station",
    roomName: "Wisdom",
    startingText:
      "The fifth level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8FF1FF2BBEBB2BPDPB2BBXBB2ZBKBY3BSB16",
    nextPuzzle: "bonus/faces-station/yawn",
    type: "Bonus",
  },
  "bonus/faces-station/yawn": {
    station: "Faces station",
    roomName: "Yawn",
    startingText:
      "The fifth level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16JDJ3ZBBBY2BKBKB2BBSBB3BEB4XDW9",
    nextPuzzle: "bonus/faces-station/embarrassment",
    type: "Bonus",
  },
  "bonus/faces-station/embarrassment": {
    station: "Faces station",
    roomName: "Embarrassment",
    startingText:
      "The fifth level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8FFFFF2BXYZB2B1J1B2PBJBP2BBEBB3BSB16",
    nextPuzzle: "bonus/faces-station/robot",
    type: "Bonus",
  },
  "bonus/faces-station/robot": {
    station: "Faces station",
    roomName: "Robot",
    startingText: "This level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "10E6F5PYP3B1B1B1PJBBBJP1ZFSFX3FFF9",
    nextPuzzle: "bonus/faces-station/surprise",
    type: "Bonus",
  },
  "bonus/faces-station/surprise": {
    station: "Faces station",
    roomName: "Surprise",
    startingText:
      "The fifth level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "1ZFFFW2BBBBB2BKBKB1DBPBPBDEBBBBBS1BJ1JB3BBB4YFX9",
    nextPuzzle: "bonus/faces-station/focus",
    type: "Bonus",
  },
  "bonus/faces-station/focus": {
    station: "Faces station",
    roomName: "Focus",
    startingText:
      "The fifth level has the cutest face. The rest are pretty ugly...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "2BEB2FDFBFDFZ2J2VBKPBPKB1PBYBP1BFPBPFBXKB1BKWFDFBFDF2BSB2",
    nextPuzzle: "bonus/wonky-station/1",
    type: "Bonus",
  },
  "bonus/wonky-station/1": {
    station: "Wonky station",
    roomName: "Level 1",
    startingText: "Embrace the chaos!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16E1PZ2PDBBB3BKPY2PFJ5B6S11",
    nextPuzzle: "bonus/wonky-station/2",
    type: "Bonus",
  },
  "bonus/wonky-station/2": {
    station: "Wonky station",
    roomName: "Level 2",
    startingText: "Embrace the chaos!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "10E5FBB4DBK4BBB4BDK4FBB5S10",
    nextPuzzle: "bonus/wonky-station/3",
    type: "Bonus",
  },
  "bonus/wonky-station/3": {
    station: "Wonky station",
    roomName: "Level 3",
    startingText: "Embrace the chaos!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16E5FJF4FFJFF2FFJFF4F4SFF10",
    nextPuzzle: "bonus/wonky-station/4",
    type: "Bonus",
  },
  "bonus/wonky-station/4": {
    station: "Wonky station",
    roomName: "Level 4",
    startingText: "Embrace the chaos!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "17WBE2BFBJB2YBJBZ2BJBF3SBX17",
    nextPuzzle: "bonus/wonky-station/5",
    type: "Bonus",
  },
  "bonus/wonky-station/5": {
    station: "Wonky station",
    roomName: "Level 5",
    startingText: "Embrace the chaos!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BBBE1VBFBWB1B1B1BBBJBZBJBBB1B1BBBYBFBXBBB1B1B1BJBJBJ1SBBB3",
    nextPuzzle: "bonus/wonky-station/6",
    type: "Bonus",
  },
  "bonus/wonky-station/6": {
    station: "Wonky station",
    roomName: "Level 6",
    startingText: "Embrace the chaos!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBF4BDBPBF1FBJJDK3KBK2FBJJDK1BDBPBF1SBF10",
    nextPuzzle: "bonus/zigger-station/1",
    type: "Bonus",
  },
  "bonus/zigger-station/1": {
    station: "Zigger station",
    roomName: "Level 1",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4B1B3PBFBP3B1B3PBJBP3F1F3PBFBP3F1F3PJSJP1",
    nextPuzzle: "bonus/zigger-station/2",
    type: "Bonus",
  },
  "bonus/zigger-station/2": {
    station: "Zigger station",
    roomName: "Level 2",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "1PBEZP3B1F3PXJBP3F1B3PYJBP3B1F3PWJBP3F1B3PVSBP1",
    nextPuzzle: "bonus/zigger-station/3",
    type: "Bonus",
  },
  "bonus/zigger-station/3": {
    station: "Zigger station",
    roomName: "Level 3",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4B1F3PXJBP3F1B3PYJZP3B1F3PWJBP3B1B4BSB2",
    nextPuzzle: "bonus/zigger-station/4",
    type: "Bonus",
  },
  "bonus/zigger-station/4": {
    station: "Zigger station",
    roomName: "Level 4",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "1PBEBP3F1X3PYJFP3B1B3PFJZP3B1B3PWJFP3B1B4BSB2",
    nextPuzzle: "bonus/zigger-station/5",
    type: "Bonus",
  },
  "bonus/zigger-station/5": {
    station: "Zigger station",
    roomName: "Level 5",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BEB4B1V3PFJBP3Y1B3PBJZP3B1F3PXJBP3B1W3PBSBP1",
    nextPuzzle: "bonus/zigger-station/6",
    type: "Bonus",
  },
  "bonus/zigger-station/6": {
    station: "Zigger station",
    roomName: "Level 6",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "1PFEFP3B1B3PYBWP3B1B3PFJZP3B1B3PVJXP3B1B3PFSFP1",
    nextPuzzle: "bonus/zigger-station/7",
    type: "Bonus",
  },
  "bonus/zigger-station/7": {
    station: "Zigger station",
    roomName: "Level 7",
    startingText: "Try zigging and zagging!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "1PBEBP3D1K3PBFBP3K1D3PBFBP3F1K3PDFBP3B1F3PBSBP1",
    nextPuzzle: "bonus/cube-station/1",
    type: "Bonus",
  },
  "bonus/cube-station/1": {
    station: "Cube station",
    roomName: "Level 1",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "23PYP4EJF4BZS23",
    nextPuzzle: "bonus/cube-station/2",
    type: "Bonus",
  },
  "bonus/cube-station/2": {
    station: "Cube station",
    roomName: "Level 2",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "16BXFE3ZBBP3BPBY3JBSB22",
    nextPuzzle: "bonus/cube-station/3",
    type: "Bonus",
  },
  "bonus/cube-station/3": {
    station: "Cube station",
    roomName: "Level 3",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15BEBBW2XBBPB2BVFZB2JPBBF2BYBSB15",
    nextPuzzle: "bonus/cube-station/4",
    type: "Bonus",
  },
  "bonus/cube-station/4": {
    station: "Cube station",
    roomName: "Level 4",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15EBBBX2BJFZB2BFWJB2BYJFB2VBBBS15",
    nextPuzzle: "bonus/cube-station/5",
    type: "Bonus",
  },
  "bonus/cube-station/5": {
    station: "Cube station",
    roomName: "Level 5",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15EBPBF2BWBYB2PBJBP2BZBXF2FBPFS15",
    nextPuzzle: "bonus/cube-station/6",
    type: "Bonus",
  },
  "bonus/cube-station/6": {
    station: "Cube station",
    roomName: "Level 6",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8PBBBBB1BEXFPB1BZBPFB1BFPBYB1BPFWSB1BBBBBP14",
    nextPuzzle: "bonus/cube-station/7",
    type: "Bonus",
  },
  "bonus/cube-station/7": {
    station: "Cube station",
    roomName: "Level 7",
    startingText:
      "It's actually just a square, but you'll have to think outside the box to get through.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15PBBBBJ1ZEXFPB1BBBPFB1BFPBYB1BPFWSB1VBBBBP7",
    nextPuzzle: "bonus/plant-station/daisy",
    type: "Bonus",
  },
  "bonus/plant-station/daisy": {
    station: "Plant station",
    roomName: "Daisy",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "1BFDFB2KPEPK2BDKDB4B6BFF2FFBFF2FFB6B6S3",
    nextPuzzle: "bonus/plant-station/fern-frond",
    type: "Bonus",
  },
  "bonus/plant-station/fern-frond": {
    station: "Plant station",
    roomName: "Fern Frond",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9FFY3FFEFF2XFFFF3FFF4FFZ4F6F6S4",
    nextPuzzle: "bonus/plant-station/vine",
    type: "Bonus",
  },
  "bonus/plant-station/vine": {
    station: "Plant station",
    roomName: "Vine",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "2FFF3FF1FF2F1E1F2FFF1F4P1F1FFFFFFPF1FF2FFF1FFFF1S5",
    nextPuzzle: "bonus/plant-station/willow",
    type: "Bonus",
  },
  "bonus/plant-station/willow": {
    station: "Plant station",
    roomName: "Willow",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "BBDEDKBK1BDB1FF2B2PP2B5BBDFBKBB1FPKF1B1P1FP1B3P2S4",
    nextPuzzle: "bonus/plant-station/orchid",
    type: "Bonus",
  },
  "bonus/plant-station/orchid": {
    station: "Plant station",
    roomName: "Orchid",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2BJB2FBBPBBFBPFEFPBFBBPBBF2FBF5F6F6F6S3",
    nextPuzzle: "bonus/plant-station/rose",
    type: "Bonus",
  },
  "bonus/plant-station/rose": {
    station: "Plant station",
    roomName: "Rose",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "2PWP3PXEVP2PZBYP3PFP5F5FFJ4JFF4FF6S3",
    nextPuzzle: "bonus/plant-station/fly-trap",
    type: "Bonus",
  },
  "bonus/plant-station/fly-trap": {
    station: "Plant station",
    roomName: "Fly Trap",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PJP3PDZDP3XEW3KDYDK2PKJKP3PFP5F6S3",
    nextPuzzle: "bonus/plant-station/cherry-blossom",
    type: "Bonus",
  },
  "bonus/plant-station/cherry-blossom": {
    station: "Plant station",
    roomName: "Cherry Blossom",
    startingText:
      "Plants are better than humans. They don't talk back when you experiment on them.",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "1P1P3PFJXF1P1V1FP1FPJ1E1PF1FZPYFJ1PFJFWP3F6F6S3",
    nextPuzzle: "bonus/checkerboard-station/1",
    type: "Bonus",
  },
  "bonus/checkerboard-station/1": {
    station: "Checkerboard station",
    roomName: "Level 1",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15EKFKF2DFKFK2FDFDF2DFDFD2FKFKS15",
    nextPuzzle: "bonus/checkerboard-station/2",
    type: "Bonus",
  },
  "bonus/checkerboard-station/2": {
    station: "Checkerboard station",
    roomName: "Level 2",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15FEFKF2DFKFD2FDFKF2DFDFD1SFKFKF2KFDFK8",
    nextPuzzle: "bonus/checkerboard-station/3",
    type: "Bonus",
  },
  "bonus/checkerboard-station/3": {
    station: "Checkerboard station",
    roomName: "Level 3",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "23EBZB3BWBJ3YBFB3BXBS15",
    nextPuzzle: "bonus/checkerboard-station/4",
    type: "Bonus",
  },
  "bonus/checkerboard-station/4": {
    station: "Checkerboard station",
    roomName: "Level 4",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15FBFBF2BEBFB2FBXBF2BZBWB2FBYBS2BFBFB8",
    nextPuzzle: "bonus/checkerboard-station/5",
    type: "Bonus",
  },
  "bonus/checkerboard-station/5": {
    station: "Checkerboard station",
    roomName: "Level 5",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15FKFDF2DFDFK2EKFDS2KFDFK2FDFKF15",
    nextPuzzle: "bonus/checkerboard-station/6",
    type: "Bonus",
  },
  "bonus/checkerboard-station/6": {
    station: "Checkerboard station",
    roomName: "Level 6",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15FBFBF2BSBFB2FBXBF2BZBWB2VBYBE2BFBFB8",
    nextPuzzle: "bonus/checkerboard-station/7",
    type: "Bonus",
  },
  "bonus/checkerboard-station/7": {
    station: "Checkerboard station",
    roomName: "Level 7",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15KFKFD2FSFKF2JFXFK2FZFWF2DFYFE2FDFDF8",
    nextPuzzle: "bonus/checkerboard-station/8",
    type: "Bonus",
  },
  "bonus/checkerboard-station/8": {
    station: "Checkerboard station",
    roomName: "Level 8",
    startingText: "I love board games, especially with human playing pieces!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "15KFKFD2FSFXF2JFYFZ2FPFPF2DFWFE15",
    nextPuzzle: "bonus/nautilus-station/1",
    type: "Bonus",
  },
  "bonus/nautilus-station/1": {
    station: "Nautilus station",
    roomName: "Level 1",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BFBB1BBBBBFBF3SBB2BBBBB1BF1B1B1FE1BBFB3BF1BBBBB3FBF2",
    nextPuzzle: "bonus/nautilus-station/2",
    type: "Bonus",
  },
  "bonus/nautilus-station/2": {
    station: "Nautilus station",
    roomName: "Level 2",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BXBB1BBBBBFBZ2PSBB2BBBFB1BFPB1B1FE1BBJB3BF1BBBBB3FBY2",
    nextPuzzle: "bonus/nautilus-station/3",
    type: "Bonus",
  },
  "bonus/nautilus-station/3": {
    station: "Nautilus station",
    roomName: "Level 3",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BFBB1BBBBBVBW2PSBB2BBBFB1BFPB1B1FE1BBFB3BZ1BBBBB3XBY2",
    nextPuzzle: "bonus/nautilus-station/4",
    type: "Bonus",
  },
  "bonus/nautilus-station/4": {
    station: "Nautilus station",
    roomName: "Level 4",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BFBB1BBBBBZBF2PSBB2BVBJB1BXPB1B1WE1BBJBP1PBY1BBBBB3FBF2",
    nextPuzzle: "bonus/nautilus-station/5",
    type: "Bonus",
  },
  "bonus/nautilus-station/5": {
    station: "Nautilus station",
    roomName: "Level 5",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BZBB1BBBBBXBY2PSBB2BBBJB1BVPB1B1FE1BBJBP1PBW1BBBBB3FBF2",
    nextPuzzle: "bonus/nautilus-station/6",
    type: "Bonus",
  },
  "bonus/nautilus-station/6": {
    station: "Nautilus station",
    roomName: "Level 6",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BFBB1BBBBBZBX2PSBB2BBBFB1BYPB1B1VE1BBJBP1PBW1BBBBB3FBF2",
    nextPuzzle: "bonus/nautilus-station/7",
    type: "Bonus",
  },
  "bonus/nautilus-station/7": {
    station: "Nautilus station",
    roomName: "Level 7",
    startingText:
      "You can kinda see the nautilus shell if you squint and don't think about it too much!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3BFBB1BBDBBBBF2PSBB3FBFB1FD1B1B1FE1BBJBP2BF1BBBBB3KFK2",
    nextPuzzle: "bonus/criss-cross-station/1",
    type: "Bonus",
  },
  "bonus/criss-cross-station/1": {
    station: "Criss Cross station",
    roomName: "Level 1",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3V1PFBYBBP1B1B1E2B1B1B1PJBWBZP1B1B1B1PXBJBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/2",
    type: "Bonus",
  },
  "bonus/criss-cross-station/2": {
    station: "Criss Cross station",
    roomName: "Level 2",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3W1PFBXBBP1B1B1E2B1B1B1PFBZBFP1B1B1B1PVBYBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/3",
    type: "Bonus",
  },
  "bonus/criss-cross-station/3": {
    station: "Criss Cross station",
    roomName: "Level 3",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3F1PXBZBBP1B1B1E2B1B1B1PVBFBFP1B1B1B1PWBYBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/4",
    type: "Bonus",
  },
  "bonus/criss-cross-station/4": {
    station: "Criss Cross station",
    roomName: "Level 4",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3V1PWBYBBP1B1B1E2B1B1B1PZBJBFP1B1B1B1PFBXBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/5",
    type: "Bonus",
  },
  "bonus/criss-cross-station/5": {
    station: "Criss Cross station",
    roomName: "Level 5",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3X1PWBFBBP1B1B1E2B1B1B1PJBYBZP1B1B1B1PVBJBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/6",
    type: "Bonus",
  },
  "bonus/criss-cross-station/6": {
    station: "Criss Cross station",
    roomName: "Level 6",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3J1PZBWBBP1B1B1E2B1B1B1PVBJBXP1B1B1B1PYBFBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/7",
    type: "Bonus",
  },
  "bonus/criss-cross-station/7": {
    station: "Criss Cross station",
    roomName: "Level 7",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3F1PFBYBBP1B1B1E2B1B1B1PZBJBWP1B1B1B1PVBXBBS1P1P1P1",
    nextPuzzle: "bonus/criss-cross-station/8",
    type: "Bonus",
  },
  "bonus/criss-cross-station/8": {
    station: "Criss Cross station",
    roomName: "Level 8",
    startingText:
      "If you need inspiration, just think about that time I double crossed you!",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "5P2P3F1PVBXBBP1B1B1E2B1B1B1PFBJBWP1B1B1B1PZBYBBS1P1P1P1",
    nextPuzzle: "bonus/dial-up-station/1",
    type: "Bonus",
  },
  "bonus/dial-up-station/1": {
    station: "Dial Up station",
    roomName: "Level 1",
    startingText:
      "Back in my day, we had these 'phones' with numbers on them...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3E4PBBBP2FBZBF2B1B1B2PBFBP2B1B1B2XBFBY2PBBBP4S3",
    nextPuzzle: "bonus/dial-up-station/2",
    type: "Bonus",
  },
  "bonus/dial-up-station/2": {
    station: "Dial Up station",
    roomName: "Level 2",
    startingText:
      "Back in my day, we had these 'phones' with numbers on them...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3E4PBBBP2FBZBF2B1B1B2PBXBP2B1B1B2FBYBF2PBBBP4S3",
    nextPuzzle: "bonus/dial-up-station/3",
    type: "Bonus",
  },
  "bonus/dial-up-station/3": {
    station: "Dial Up station",
    roomName: "Level 3",
    startingText:
      "Back in my day, we had these 'phones' with numbers on them...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3E4PBBBP2FBYBZ2B1B1B2PBFBP2B1B1B2WBXBV2PBBBP4S3",
    nextPuzzle: "bonus/dial-up-station/4",
    type: "Bonus",
  },
  "bonus/dial-up-station/4": {
    station: "Dial Up station",
    roomName: "Level 4",
    startingText:
      "Back in my day, we had these 'phones' with numbers on them...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3E4PBBBP2WBZBY2B1B1B2PBFBP2B1B1B2FBXBF2PBBBP4S3",
    nextPuzzle: "bonus/dial-up-station/5",
    type: "Bonus",
  },
  "bonus/dial-up-station/5": {
    station: "Dial Up station",
    roomName: "Level 5",
    startingText:
      "Back in my day, we had these 'phones' with numbers on them...",
    winText:
      "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians:
      "3E4PBBBP2XBWBV2B1B1B2PBZBP2B1B1B2FBYBF2PBBBP4S3",
    nextPuzzle: "bonus/doors-station/1",
    type: "Bonus",
  },
  "bonus/doors-station/1": {
    station: "Doors station",
    roomName: "Level 1",
    startingText:
      "We're totally allowed to be in here! If you want to move quickly, try dragging along the path instead of tapping!",
    winText: "The next one's a bit harder.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3DBBBB2F1B1B2DBFBK2B1B1B2BBBBK3BSB9",
    nextPuzzle: "bonus/doors-station/2",
    type: "Bonus",
  },
  "bonus/doors-station/2": {
    station: "Doors station",
    roomName: "Level 2",
    startingText:
      "Not much left of the poor subjects devoured by the slime... Oh well! Such is life for you mere mortals.",
    winText: "We've almost broken out of quarantine. Keep going!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3DBBBB2F1B1B2DBFBB2B1B1B2KBKBF3BSB9",
    nextPuzzle: "bonus/doors-station/3",
    type: "Bonus",
  },
  "bonus/doors-station/3": {
    station: "Doors station",
    roomName: "Level 3",
    startingText:
      "This one looks tricky. If you get stuck, you can backtrack or tap the start space to reset the room.",
    winText: "Impressive...for a human.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3BBDBD2F1B1F2DBFBK2B1B1B2KBKBB3BSB9",
    nextPuzzle: "bonus/doors-station/4",
    type: "Bonus",
  },
  "bonus/doors-station/4": {
    station: "Doors station",
    roomName: "Level 4",
    startingText: "Uh oh...do you think you can handle all these doors?",
    winText:
      "Phew...we broke out of quarantine. Time to explore the other stations. You can always revisit old rooms by tapping the map icon above.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3DBDBD2F1B1F2DBFBK2B1B1B2KBKBK3BSB9",
    nextPuzzle: "bonus/terminals-station/1",
    type: "Bonus",
  },
  "bonus/terminals-station/1": {
    station: "Terminals station",
    roomName: "Level 1",
    startingText: "This one's a walk in the park.",
    winText:
      "I would have been...disappointed...if you couldn't figure this one out.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDBP4F1Z2XBBBB2BB1BY2BBBBB3KBB4BPBS8",
    nextPuzzle: "bonus/terminals-station/2",
    type: "Bonus",
  },
  "bonus/terminals-station/2": {
    station: "Terminals station",
    roomName: "Level 2",
    startingText:
      "This one looks a bit tougher, but I'm sure you'll figure it out... unlike subject 17.",
    winText: "I knew I could count on you...friend.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDBB4B1X2ZBBBF2BB2Y2JBBBF3FBB4BKBS8",
    nextPuzzle: "bonus/terminals-station/3",
    type: "Bonus",
  },
  "bonus/terminals-station/3": {
    station: "Terminals station",
    roomName: "Level 3",
    startingText:
      "Do you think you can figure this one out? Try not to disappoint me.",
    winText: "I am well chuffed with your progress! Very well chuffed.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDBP4B1Y2BBFBF2BJB1Z2XBFBB3K1B4BPBS8",
    nextPuzzle: "bonus/terminals-station/4",
    type: "Bonus",
  },
  "bonus/terminals-station/4": {
    station: "Terminals station",
    roomName: "Level 4",
    startingText: (
      <p>
        This room looks hard. At least you have a couple{" "}
        <span id="blasterIcon" className="smallInfoIcon"></span> to help.
      </p>
    ),
    winText: "Impressive, if only all humans were as reliable as you...",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDBP4F1X2YBBBF2BB1BZ2JBBBB3K1J4BPBS8",
    nextPuzzle: "bonus/terminals-station/5",
    type: "Bonus",
  },
  "bonus/terminals-station/5": {
    station: "Terminals station",
    roomName: "Level 5",
    startingText: "Don't give up! You haven't served your purpose yet.",
    winText:
      "No other subjects have gotten this far. You should be very proud!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDBP4B1Y2ZBBBF2BF1FB2JBBBX3KBB4BPBS8",
    nextPuzzle: "bonus/terminals-station/6",
    type: "Bonus",
  },
  "bonus/terminals-station/6": {
    station: "Terminals station",
    roomName: "Level 6",
    startingText:
      "You're almost at the end of your journey. One more room to go.",
    winText: "Placeholder text as we work on the story.",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "8EBDPP4B1Z2YBFBB2BB1BX2JBBBF3KBF4PPBS8",
    nextPuzzle: "bonus/portal-mania-station/1",
    type: "Bonus",
  },
  "bonus/portal-mania-station/1": {
    station: "Portal Mania station",
    roomName: "Level 1",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FBDBF1PB1P1BPFBBFBBFPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/2",
    type: "Bonus",
  },
  "bonus/portal-mania-station/2": {
    station: "Portal Mania station",
    roomName: "Level 2",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FYDZF1PB1P1BPFBBXBBFPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/3",
    type: "Bonus",
  },
  "bonus/portal-mania-station/3": {
    station: "Portal Mania station",
    roomName: "Level 3",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FBDYB1PB1P1BPFBBXBBWPB1B1BP1JBPZK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/4",
    type: "Bonus",
  },
  "bonus/portal-mania-station/4": {
    station: "Portal Mania station",
    roomName: "Level 4",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FYDZF1PB1P1BPFBBWBBFPB1B1BP1JXPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/5",
    type: "Bonus",
  },
  "bonus/portal-mania-station/5": {
    station: "Portal Mania station",
    roomName: "Level 5",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FBDYF1PB1P1BPFBBXBBWPB1B1BP1JBPZK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/6",
    type: "Bonus",
  },
  "bonus/portal-mania-station/6": {
    station: "Portal Mania station",
    roomName: "Level 6",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3BBDZF1PB1P1BPXBBYBBFPB1B1BP1JWPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/7",
    type: "Bonus",
  },
  "bonus/portal-mania-station/7": {
    station: "Portal Mania station",
    roomName: "Level 7",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FXDZF1PB1P1BPFBBYBBFPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/8",
    type: "Bonus",
  },
  "bonus/portal-mania-station/8": {
    station: "Portal Mania station",
    roomName: "Level 8",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3BBDBY1PB1P1BPFBBFBBXPB1Z1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/9",
    type: "Bonus",
  },
  "bonus/portal-mania-station/9": {
    station: "Portal Mania station",
    roomName: "Level 9",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3BWDXF1PB1P1BPFBBZBBYPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/10",
    type: "Bonus",
  },
  "bonus/portal-mania-station/10": {
    station: "Portal Mania station",
    roomName: "Level 10",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FWDXB1PB1P1BPBBBZBBYPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/11",
    type: "Bonus",
  },
  "bonus/portal-mania-station/11": {
    station: "Portal Mania station",
    roomName: "Level 11",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FZDBF1PB1P1BPXBBWBBFPB1B1BP1JYPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/12",
    type: "Bonus",
  },
  "bonus/portal-mania-station/12": {
    station: "Portal Mania station",
    roomName: "Level 12",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FXDZF1PB1P1BPFBBFBBFPB1Y1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/13",
    type: "Bonus",
  },
  "bonus/portal-mania-station/13": {
    station: "Portal Mania station",
    roomName: "Level 13",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FYDZF1PB1P1BPFBBWBBFPB1B1BP1JXPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/14",
    type: "Bonus",
  },
  "bonus/portal-mania-station/14": {
    station: "Portal Mania station",
    roomName: "Level 14",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FWDZF1PB1P1BPXBBFBBFPB1Y1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/15",
    type: "Bonus",
  },
  "bonus/portal-mania-station/15": {
    station: "Portal Mania station",
    roomName: "Level 15",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FZDWF1PB1P1BPXBBYBBFPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/16",
    type: "Bonus",
  },
  "bonus/portal-mania-station/16": {
    station: "Portal Mania station",
    roomName: "Level 16",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3BBDYF1PB1P1BPFBBZBBFPB1X1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/17",
    type: "Bonus",
  },
  "bonus/portal-mania-station/17": {
    station: "Portal Mania station",
    roomName: "Level 17",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FXDZF1PB1P1BPFBBFBBFPB1B1BP1JYPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/18",
    type: "Bonus",
  },
  "bonus/portal-mania-station/18": {
    station: "Portal Mania station",
    roomName: "Level 18",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FBDBF1PB1P1BPYBBXBBFPB1B1BP1JWPZK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/19",
    type: "Bonus",
  },
  "bonus/portal-mania-station/19": {
    station: "Portal Mania station",
    roomName: "Level 19",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FBDBF1PB1P1BPXBBWBBYPB1B1BP1JZPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/20",
    type: "Bonus",
  },
  "bonus/portal-mania-station/20": {
    station: "Portal Mania station",
    roomName: "Level 20",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FXDWF1PB1P1BPFBBFBBFPB1B1BP1JYPZK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/21",
    type: "Bonus",
  },
  "bonus/portal-mania-station/21": {
    station: "Portal Mania station",
    roomName: "Level 21",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FWDYF1PB1P1BPFBBFBBFPB1B1BP1JZPXK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/22",
    type: "Bonus",
  },
  "bonus/portal-mania-station/22": {
    station: "Portal Mania station",
    roomName: "Level 22",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3BYDZB1PW1P1BPFBBFBBFPB1B1BP1JXPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/23",
    type: "Bonus",
  },
  "bonus/portal-mania-station/23": {
    station: "Portal Mania station",
    roomName: "Level 23",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FZDBF1PB1P1BPYBBXBBFPB1B1BP1JBPWK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/24",
    type: "Bonus",
  },
  "bonus/portal-mania-station/24": {
    station: "Portal Mania station",
    roomName: "Level 24",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FWDYF1PB1P1BPFBBZBBXPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/25",
    type: "Bonus",
  },
  "bonus/portal-mania-station/25": {
    station: "Portal Mania station",
    roomName: "Level 25",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FZDWF1PB1P1BPYBBXBBBBB1B1BB1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/26",
    type: "Bonus",
  },
  "bonus/portal-mania-station/26": {
    station: "Portal Mania station",
    roomName: "Level 26",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FZDYF1PB1P1BPWBBXBBBBB1B1BB1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/27",
    type: "Bonus",
  },
  "bonus/portal-mania-station/27": {
    station: "Portal Mania station",
    roomName: "Level 27",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FXDWF1PB1P1BPBBBZBBYBB1B1BB1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/28",
    type: "Bonus",
  },
  "bonus/portal-mania-station/28": {
    station: "Portal Mania station",
    roomName: "Level 28",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9PEP3FWDZF1BB1P1BBBBBFBBYPB1X1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/29",
    type: "Bonus",
  },
  "bonus/portal-mania-station/29": {
    station: "Portal Mania station",
    roomName: "Level 29",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3FXDWF1PB1P1BPZBBBBBYPB1B1BP1JBPBK3BSB9",
    nextPuzzle: "bonus/portal-mania-station/30",
    type: "Bonus",
  },
  "bonus/portal-mania-station/30": {
    station: "Portal Mania station",
    roomName: "Level 30",
    startingText:
      "Who the heck put all these portals here? Fortunately, there are mutliple solutions.",
    winText: "Impressive work!",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3FBPBB1BD1F1KBPBFJFBPBB1F1BB1BBPBB3BSB9",
    nextPuzzle: "bonus/beta-station/orbital",
    type: "Bonus",
  },
  "bonus/beta-station/orbital": {
    station: "Beta station",
    roomName: "Orbital",
    startingText:
      "By beating the game, you've accessed the hidden Beta station where we playtest new content.",
    winText:
      "Impressive. Let us know what you thought of this level, or the game in general, by commenting on https://patreon.com/skedwards88",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzleStringWithCivilians: "9BEB3FBPBB1BD1F1KBPBFJFBPBB1F1BB1BBPBB3BSB9",
    type: "Bonus",
  },
};
