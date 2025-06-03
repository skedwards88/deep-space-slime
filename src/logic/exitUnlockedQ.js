import {allCiviliansOnPodsQ} from "./allCiviliansOnPodsQ";
import {getMaxFlaskCount} from "./getMaxFlaskCount";

export function exitUnlockedQ({
  numberCount,
  maxNumber,
  currentCivilians,
  puzzle,
  flaskCount,
}) {
  return (
    numberCount === maxNumber &&
    allCiviliansOnPodsQ(currentCivilians, puzzle) &&
    getMaxFlaskCount(puzzle) === flaskCount
  );
}
