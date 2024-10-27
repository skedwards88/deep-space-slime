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

  console.log(`...`)
  console.log(customName)
  console.log(customEncodedPuzzle)
  // return
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

const stationName = "Plant Station";

const startingText = "Plants are better than humans. They don’t talk back when you experiment on them.";

const winText =
  "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We’re still in beta, so all feedback is appreciated!";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
"https://skedwards88.github.io/deep-space-slime?id=custom-Daisy+1_OBFDFBOOKPEPKOOBDKDBOOOOBOOOOOOBFFOOFFBFFOOFFBOOOOOOBOOOOOOSOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Fern+Frond+2_OOOOOOOOOFF2OOOFFEFFOO3FFFFOOOFFFOOOOFF1OOOOFOOOOOOFOOOOOOSOOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Vine+3_OOFFFOOOFFOFFOOFOEOFOOFFFOFOOOOPOFOFFFFFFPFOFFOOFFFOFFFFOSOOOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Willow+4_BBDEDKBKOBDBOFFOOBOOPPOOBOOOOOBBDFBKBBOFPKFOBOPOFPOBOOOPOOSOOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Orchid+5_OOBJBOOFBBPBBFBPFEFPBFBBPBBFOOFBFOOOOOFOOOOOOFOOOOOOFOOOOOOSOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Rose+6_OOP4POOOP3E5POOP1B2POOOPFPOOOOOFOOOOOFFJOOOOJFFOOOOFFOOOOOOSOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Fly+Trap+7_OOOOOOOOOPJPOOOPD1DPOOO3E4OOOKD2DKOOPKJKPOOOPFPOOOOOFOOOOOOSOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Cherry+Blossom_OPOPOOOPFJ3FOPO5OFPOFPJOEOPFOF1P2FJOPFJF4POOOFOOOOOOFOOOOOOSOOO",
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
