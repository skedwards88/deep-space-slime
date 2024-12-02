import {puzzles} from "./puzzles";
import {firstPuzzle} from "./constants";

export function campaignIsCompleteQ(score) {
  let campaignIsComplete = false;
  let currentPuzzle = firstPuzzle;

  while (!campaignIsComplete) {
    const currentPuzzleIsComplete = score[currentPuzzle] !== undefined;

    if (!currentPuzzleIsComplete) {
      break;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
    campaignIsComplete = puzzles[currentPuzzle].type !== "Campaign";
  }

  return campaignIsComplete;
}
