import {features, mapTypes} from "./constants";
import {convertStringToPuzzle} from "./convertPuzzleString";
import {puzzles} from "./puzzles";

export function getMaxFlaskCount(puzzle) {
  return puzzle.filter((feature) => feature === features.flask).length;
}

export function getMaxFlaskCountForCampaign(firstPuzzleId) {
  let accumulatedFlasks = 0;
  let currentPuzzleID = firstPuzzleId;
  let currentType = puzzles[currentPuzzleID].type;

  while (currentPuzzleID && currentType === mapTypes.campaign) {
    const puzzleWithCivilians = convertStringToPuzzle(
      puzzles[currentPuzzleID].puzzleStringWithCivilians,
    );
    const maxFlaskCount = getMaxFlaskCount(puzzleWithCivilians);

    accumulatedFlasks += maxFlaskCount;

    currentPuzzleID = puzzles[currentPuzzleID].nextPuzzle;
    currentType = puzzles[currentPuzzleID]?.type;
  }

  return accumulatedFlasks;
}
