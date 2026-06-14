import {puzzles} from "./puzzles";
import {firstPuzzleId, mapTypes} from "./constants";
import type {PuzzleId} from "../Types";

export function campaignIsCompleteQ(completedLevels: PuzzleId[]): boolean {
  let campaignIsComplete = false;
  let currentPuzzle = firstPuzzleId;

  while (!campaignIsComplete) {
    const currentPuzzleIsComplete = completedLevels.includes(currentPuzzle);

    if (!currentPuzzleIsComplete) {
      break;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle as PuzzleId; // typecasting because I have a test to ensure that all puzzles have a nextPuzzle value; only the last bonus station lacks one
    campaignIsComplete = puzzles[currentPuzzle].type !== mapTypes.campaign;
  }

  return campaignIsComplete;
}
