import {allCiviliansOnPodsQ} from "./allCiviliansOnPodsQ";
import {getMaxPowerCount} from "./getMaxPowerCount";

export function exitUnlockedQ({
  numberCount,
  maxNumber,
  currentCivilians,
  puzzle,
  powerCount,
}) {
  return (
    numberCount === maxNumber &&
    allCiviliansOnPodsQ(currentCivilians, puzzle) &&
    getMaxPowerCount(puzzle) === powerCount
  );
}
