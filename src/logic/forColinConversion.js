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

  console.log(`...`);
  console.log(customName);
  console.log(customEncodedPuzzle);
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

const stationName = "Dial Up Station";

const startingText =
  "Back in my day, we had these ‘phones’ with numbers on them…";

const winText =
  "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We’re still in beta, so all feedback is appreciated!";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
  "https://skedwards88.github.io/deep-space-slime?id=custom-Dial+Up+1_OOOEOOOOPBBBPOOFB1BFOOBOBOBOOPBFBPOOBOBOBOO3BFB2OOPBBBPOOOOSOOO",

  "https://skedwards88.github.io/deep-space-slime?id=custom-Dial+Up+2_OOOEOOOOPBBBPOOFB1BFOOBOBOBOOPB3BPOOBOBOBOOFB2BFOOPBBBPOOOOSOOO",

  "https://skedwards88.github.io/deep-space-slime?id=custom-Dial+Up+3_OOOEOOOOPBBBPOOFB2B1OOBOBOBOOPBFBPOOBOBOBOO4B3B5OOPBBBPOOOOSOOO",

  "https://skedwards88.github.io/deep-space-slime?id=custom-Dial+Up+4_OOOEOOOOPBBBPOO4B1B2OOBOBOBOOPBFBPOOBOBOBOOFB3BFOOPBBBPOOOOSOOO",

  "https://skedwards88.github.io/deep-space-slime?id=custom-Dial+Up+5_OOOEOOOOPBBBPOO3B4B5OOBOBOBOOPB1BPOOBOBOBOOFB2BFOOPBBBPOOOOSOOO",
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
