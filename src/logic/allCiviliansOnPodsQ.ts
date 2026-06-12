import {features} from "./constants";

export function allCiviliansOnPodsQ(currentCivilians, puzzle) {
  if (!currentCivilians) {
    return true;
  }

  return currentCivilians.every(
    (civilian) => puzzle[civilian] === features.pod,
  );
}
