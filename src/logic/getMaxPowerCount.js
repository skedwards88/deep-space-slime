import {features} from "./constants";

export function getMaxPowerCount(puzzle) {
  return puzzle.filter((feature) => feature === features.power).length;
}
