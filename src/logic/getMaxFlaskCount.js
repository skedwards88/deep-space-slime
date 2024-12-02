import {features} from "./constants";

export function getMaxFlaskCount(puzzle) {
  return puzzle.filter((feature) => feature === features.flask).length;
}
