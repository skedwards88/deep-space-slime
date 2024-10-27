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

const stationName = "Chest Station";

const startingText = "Yo ho ho and a bottle of slime!";

const winText =
  "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We’re still in beta, so all feedback is appreciated!";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
  "https://skedwards88.github.io/deep-space-slime?id=Chest+1_OOOOOOOOOOOOOOOOOOOOOOPFFFPOOFFEFFOOFFSFFOOPFFFPOOOOOOOOOOOOOOO",

  "https://skedwards88.github.io/deep-space-slime?id=Chest+2_OOOOOOOOOOOOOOOOOOOOOOPF4FPOOFFEFFOO2FSF1OOPF3FPOOOOOOOOOOOOOOO",

  "https://skedwards88.github.io/deep-space-slime?id=Chest+3_OOOOOOOOOOOOOOOOOOOOOOP4F3POOFFEFFOO2FSF1OOPFFFPOOOOOOOOOOOOOOO",

  "https://skedwards88.github.io/deep-space-slime?id=Chest+4_OOOOOOOOOOOOOOOOOOOOOOPFFFPOOF4E5FOO2FSF3OOPF1FPOOOOOOOOOOOOOOO",

  "https://skedwards88.github.io/deep-space-slime?id=Chest+5_OOOOOOOOOOOOOOOOOOOOOOPF4FPOOF5E3FOO2FSF1OOPFFFPOOOOOOOOOOOOOOO",
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
