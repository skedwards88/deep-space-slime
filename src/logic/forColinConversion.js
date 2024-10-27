import {convertStringToPuzzle} from "./convertPuzzleString";

function getPuzzleForColin({
  url,
  stationName = "TODO",
  winText = "TODO",
  startingText = "TODO",
  robotEndMood = "happy",
  robotStartMood = "happy",
}) {
  const [_, query] = url.split("?id=");

  let [customName, customEncodedPuzzle] = query
    .substring("custom-".length)
    .split("_");

  customName = customName.replaceAll("+", " ");

  const puzzle = convertStringToPuzzle(customEncodedPuzzle);

  return {
    station: stationName,
    room: customName,
    startingText,
    winText,
    robotStartMood,
    robotEndMood,
    puzzle,
  };
}

export function getPuzzlesForColin({
  urls,
  stationName,
  winText,
  startingText,
  robotEndMood,
  robotStartMood,
}) {
  return urls.map((url) =>
    getPuzzleForColin({
      url,
      stationName,
      winText,
      startingText,
      robotEndMood,
      robotStartMood,
    }),
  );
}

// Notes for Colin:
// 1. Fill in the text below and put the URLs in inputURLs as a comma separated list of strings
// 2. In the terminal, run: npm run testrun src/logic/forColinConversion.js
// 3. Copy the printed output (minus the open and closing square brackets)
// 4. To test, run: npm t -- src/logic/puzzles.test.js

const stationName = "Needle Station";

const startingText = "Even a camel could pass through this one!"
;

const winText =
  "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We’re still in beta, so all feedback is appreciated!";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
"https://skedwards88.github.io/deep-space-slime?id=Needle+1_OOBEBOOOOBBBOOOJBBBJOOBFOFBOOBOOOBOOBOOOBOOBFOFBOOJBBBJOOOBSBOO",

"https://skedwards88.github.io/deep-space-slime?id=Needle+2_OOBEBOOOOFDFOOOOPFKOOOOBFPOOOOKDBOOOOPFKOOOOBDPOOOOFBFOOOOBSBOO",

"https://skedwards88.github.io/deep-space-slime?id=Needle+3_OOBEBOOOOFDKOOOOPB2OOOOBFPOOOOKBFOOOOP1BOOOOBFPOOOOFDFOOOOBSBOO",

"https://skedwards88.github.io/deep-space-slime?id=Needle+4_OOBEBOOOOBPBOOOO2B3OOOOBPBOOOOBFBOOOOBPBOOOO4B1OOOOBPBOOOOBSBOO",

"https://skedwards88.github.io/deep-space-slime?id=Needle+5_OOBEBOOOOF2FOOOOPBBOOOO3BPOOOOBFBOOOOPBFOOOOB4POOOOFB1OOOOBSBOO",

"https://skedwards88.github.io/deep-space-slime?id=Needle+6_OOBEBOOOOFBKOOOOPD1OOOOBBPOOOOK3JOOOOPBBOOOO2DPOOOOFBBOOOOBSBOO",

"https://skedwards88.github.io/deep-space-slime?id=Needle+7_OOOEOOOOOOFOOOOOOPOOOOOPPPOOOO5JBOOOOB1BOOOO3B2OOOO4BBOOOOPSPOO",
];

console.log(
  getPuzzlesForColin({
    urls: inputURLs,
    stationName,
    startingText,
    winText,
    robotEndMood,
    robotStartMood,
  }),
);
