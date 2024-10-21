import {convertStringToPuzzle} from "./convertPuzzleString";

function getPuzzleForColin(url) {
  const [_, query] = url.split("?id=");

  let [customName, customEncodedPuzzle] = query
    .substring("custom-".length)
    .split("_");

  customName = customName.replaceAll("+", " ");

  const puzzle = convertStringToPuzzle(customEncodedPuzzle);

  return {
    station: "TODO",
    room: customName,
    startingText: "TODO",
    hintText: "TODO or delete",
    winText: "TODO",
    robotStartMood: "happy",
    robotEndMood: "happy",
    puzzle,
  };
}

export function getPuzzlesForColin(urls) {
  return urls.map((url) => getPuzzleForColin(url));
}
