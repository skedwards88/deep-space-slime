import {puzzles} from "./puzzles";
import {firstPuzzleId} from "./constants";
import type {PuzzleId} from "../Types";

export function getLowestIncompletePuzzle(
  completedLevels: PuzzleId[],
): PuzzleId | undefined {
  let currentPuzzle: PuzzleId | undefined = firstPuzzleId;

  while (currentPuzzle) {
    const currentPuzzleIsComplete = completedLevels.includes(currentPuzzle);

    if (!currentPuzzleIsComplete) {
      return currentPuzzle;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
  }

  // If made it all the way through without finding and incomplete room, return undefined
  return;
}
