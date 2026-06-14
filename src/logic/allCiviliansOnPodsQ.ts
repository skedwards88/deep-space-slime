import {features} from "./constants";
import type {PuzzleArray} from "../Types";

export function allCiviliansOnPodsQ(
  puzzle: PuzzleArray,
  currentCivilians?: number[],
): boolean {
  if (!currentCivilians) {
    return true;
  }

  return currentCivilians.every(
    (civilian) => puzzle[civilian] === features.pod,
  );
}
