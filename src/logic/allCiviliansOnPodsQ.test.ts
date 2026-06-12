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

  test("returns true if civilians undefined", () => {
    const puzzle = [features.pod, features.basic, features.outer, features.pod];
    const currentCivilians = undefined;
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(true);
  });

  test("not all pods have to be occupied", () => {
    const puzzle = [features.pod, features.basic, features.outer, features.pod];
    const currentCivilians = [3];
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(true);
  });

  test("if the puzzle does not have civilians replaced, they are ignored", () => {
    const puzzle = [
      features.pod,
      features.civilian,
      features.outer,
      features.pod,
    ];
    const currentCivilians = [3];
    expect(allCiviliansOnPodsQ(currentCivilians, puzzle)).toBe(true);
  });
});
