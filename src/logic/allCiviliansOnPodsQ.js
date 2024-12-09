import { features } from "./constants"

export function allCiviliansOnPodsQ(civilians, puzzle) {
  return civilians.every(civilian => puzzle[civilian] === features.pod)
}
