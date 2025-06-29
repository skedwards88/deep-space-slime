// Use the .js extension so can run outside of bundle
import {
  convertPuzzleToString,
  convertStringToPuzzle,
} from "./convertPuzzleString.js";

function getPuzzleForColin({
  url,
  type = "TODO",
  nextPuzzle = "TODO",
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

  // TODO temp conversion to convert old format to new format
  const puzzleWithCivilians = convertStringToPuzzle(customEncodedPuzzle);
  const puzzleStringWithCivilians = convertPuzzleToString(puzzleWithCivilians);

  return {
    type,
    nextPuzzle,
    station: stationName,
    roomName: customName,
    startingText,
    winText,
    robotStartMood,
    robotEndMood,
    puzzleStringWithCivilians,
  };
}

export function getPuzzlesForColin({
  urls,
  type,
  stationName,
  winText,
  startingText,
  robotEndMood,
  robotStartMood,
}) {
  const puzzles = urls.map((url) =>
    getPuzzleForColin({
      url,
      type,
      stationName,
      winText,
      startingText,
      robotEndMood,
      robotStartMood,
    }),
  );

  const puzzleDict = {};

  for (const puzzle of puzzles) {
    const puzzleKey = `${type.toLowerCase()}/${stationName}/${puzzle.roomName}`;
    puzzleDict[puzzleKey] = puzzle;
  }

  return puzzleDict;
}

// Notes for Colin:
// 1. Fill in the text below and put the URLs in inputURLs as a comma separated list of strings
// 2. In the terminal, run: node src/logic/forColinConversion.js
// 3. Copy the printed output (minus the open and closing square brackets)
//    i. Give the puzzle a unique ID (e.g. "bonus/plant-station/fern-frond")
//    ii. Paste the puzzle in the puzzles file as "unique-id": copied output
//    iii. Update the "nextPuzzle" to point to the ID of the next puzzle
// 4. To test, run: npm t -- src/logic/puzzles.test.js

// Can be "Campaign" or "Bonus Levels"
const type = "Campaign";

const stationName = "Mastery";

const startingText = "XXX.";

const winText = "YYY";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
  "https://deepspaceslime.com/?id=custom-Key+Mastery_9FDF4KFK2FKFDFDFDEKFDSKFDFDFKF2DFK4FKF9",
  "https://deepspaceslime.com/?id=custom-Blaster+Mastery_8FBBBF2BEF1B1FJFBFJFBB1FSFBFJFJFJF1FBFBF15",
  "https://deepspaceslime.com/?id=custom-Portal+Mastery_15PFEFP2FBFBF2PFJFP2FJFJF2PFSFP15",
  "https://deepspaceslime.com/?id=custom-Hacker+Mastery_9BWB3EBJB3BJBYB2JBVBJ2BZBJB3BJBS3BXB9",
];

console.log(
  getPuzzlesForColin({
    urls: inputURLs,
    type,
    stationName,
    startingText,
    winText,
    robotEndMood,
    robotStartMood,
  }),
);
