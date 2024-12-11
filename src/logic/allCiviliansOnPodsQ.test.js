import {allCiviliansOnPodsQ} from "./allCiviliansOnPodsQ";
import {features} from "./constants";

describe("allCiviliansOnPodsQ", () => {
  test("returns true if all civilian indexes are on a pod", () => {
    const puzzle = [features.pod, features.basic, features.outer, features.pod];
    const currentCivilians = [0, 3];
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(true);
  });

  test("returns false if all civilian indexes are not on a pod", () => {
    const puzzle = [features.pod, features.basic, features.outer, features.pod];
    const currentCivilians = [1, 3];
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(false);
  });

  test("returns true if no civilian indexes", () => {
    const puzzle = [features.pod, features.basic, features.outer, features.pod];
    const currentCivilians = [];
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(true);
  });

  test("not all pods have to be occupied", () => {
    const puzzle = [features.pod, features.basic, features.outer, features.pod];
    const currentCivilians = [3];
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(true);
  });
});
