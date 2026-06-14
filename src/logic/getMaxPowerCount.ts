import {features} from "./constants";
import type {PuzzleArray} from "../Types";

export function getMaxPowerCount(puzzle: PuzzleArray): number {
  return puzzle.filter((feature) => feature === features.power).length;
}
