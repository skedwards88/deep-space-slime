import {features, mapTypes} from "./constants";
import {puzzles} from "./puzzles";

export function getMaxFlaskCount(puzzle) {
  return puzzle.filter((feature) => feature === features.flask).length;
}

export function getMaxFlaskCountForCampaign(firstPuzzle) {
  let accumulatedFlasks = 0;
  let currentPuzzleID = firstPuzzle;
  let currentType = puzzles[currentPuzzleID].type;

  while (currentPuzzleID && currentType === mapTypes.campaign) {
    const maxFlaskCount = getMaxFlaskCount(
      puzzles[currentPuzzleID].puzzleWithCivilians,
    );

    accumulatedFlasks += maxFlaskCount;

    currentPuzzleID = puzzles[currentPuzzleID].nextPuzzle;
    currentType = puzzles[currentPuzzleID]?.type;
  }

  return accumulatedFlasks;
}

export function getCollectedFlaskCount(score) {
  return Object.values(score).reduce(
    (sum, currentScore) => sum + currentScore,
    0,
  );
}
