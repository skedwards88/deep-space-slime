// Use the .js extension so can run outside of bundle
import {convertStringToPuzzle} from "./convertPuzzleString.js";

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
  // return
  const puzzleWithCivilians = convertStringToPuzzle(customEncodedPuzzle);

  return {
    type,
    nextPuzzle,
    station: stationName,
    roomName: customName,
    startingText,
    winText,
    robotStartMood,
    robotEndMood,
    puzzleWithCivilians,
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
  return urls.map((url) =>
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

const stationName = "Terminals Station";

const startingText = "Basic terminal training.";

const winText =
  "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We're still in beta, so all feedback is appreciated!";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
  "https://deepspaceslime.com?id=custom-Terminals+12_OOOOOOOOOOOOOOOOOOOOOOO1BJOOOEBFBOOOOFB2OOOOSOOOOOOOOOOOOOOOOOO",
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
