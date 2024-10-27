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

const stationName = "Pteroglyph Station";

const startingText = "Giving picasso a run for his money!";

const winText =
  "Nice job! Let us know what you thought of the game at www.patreon.com/c/skedwards88. We’re still in beta, so all feedback is appreciated!";

const robotStartMood = "happy";

const robotEndMood = "happy";

const inputURLs = [
  "https://skedwards88.github.io/deep-space-slime?id=custom-Wolf+1_OOOOOOOOOPOOOOO4FOOOOBBBOOOOOFBJ1BOO3B2BBPOOBOOBOOOSOOEOOOOOOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Bow+2_OOOOOOOOOOOOOOOBOJFFEOO3FPBOOJF1FOOOFPF2OOOFBOOBOOSOOOOBOOOOOOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Horse+3_OOOOOOOOOOPOOOOOEFOOOPF2JOOOOOFFJOOO1FFF3OOPOOFFPOOOOFOOOOOOSOO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Stag+4_OOOOOOOOPOPOOOPF2FPOOO3F4OOOOOEOOOOO5F1FJOOFFFFJPOFFOOJOOPOOOSO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Chief+5_OOOOOOOOOPEPOOOOFFFOOOOODOOOOOJKJOOPF3J1FPOO2S4OOOOFOFOOOPFOFPO",

"https://skedwards88.github.io/deep-space-slime?id=custom-Shaman+6_OPOOOPOO2KEKBOOOBDBOOOOO5OOOP3BJBBPBDFKFDBP1BSB4POPFOFPOOOBOBOO",
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
