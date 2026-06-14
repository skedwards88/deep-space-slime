import {allCiviliansOnPodsQ} from "./allCiviliansOnPodsQ";
import {getMaxPowerCount} from "./getMaxPowerCount";
import type {PuzzleArray} from "../Types";

export function exitUnlockedQ({
  numberCount,
  maxNumber,
  currentCivilians,
  puzzle,
  powerCount,
}: {
  numberCount: number;
  maxNumber: number;
  currentCivilians: number[];
  puzzle: PuzzleArray;
  powerCount: number;
}): boolean {
  return (
    numberCount === maxNumber &&
    allCiviliansOnPodsQ(puzzle, currentCivilians) &&
    getMaxPowerCount(puzzle) === powerCount
  );
}
