import {puzzles} from "./puzzles";
import {firstPuzzleId, mapTypes} from "./constants";

export function campaignIsCompleteQ(completedLevels) {
  let campaignIsComplete = false;
  let currentPuzzle = firstPuzzleId;

  while (!campaignIsComplete) {
    const currentPuzzleIsComplete = completedLevels.includes(currentPuzzle);

    if (!currentPuzzleIsComplete) {
      break;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
    campaignIsComplete = puzzles[currentPuzzle].type !== mapTypes.campaign;
  }

  return campaignIsComplete;
}
