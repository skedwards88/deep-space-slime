import {features} from "./constants";

export function allCiviliansOnPodsQ(currentCivilians, puzzle) {
  return currentCivilians.every(
    (civilian) => puzzle[civilian] === features.pod,
  );
}
