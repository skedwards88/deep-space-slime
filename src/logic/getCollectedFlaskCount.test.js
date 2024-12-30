import {getCollectedFlaskCount} from "./getMaxFlaskCount";

describe("getCollectedFlaskCount", () => {
  test("zero score", () => {
    const score = {
      puzzle1: 0,
      puzzle2: 0,
      puzzle3: 0,
      puzzle4: 0,
      puzzle5: 0,
    };
    const output = getCollectedFlaskCount(score);
    expect(output).toBe(0);
  });
  test("empty score", () => {
    const score = {
      puzzle1: 0,
      puzzle2: 3,
      puzzle3: 1,
      puzzle4: 2,
      puzzle5: 0,
    };
    const output = getCollectedFlaskCount(score);
    expect(output).toBe(6);
  });
  test("empty score", () => {
    const score = {};
    const output = getCollectedFlaskCount(score);
    expect(output).toBe(0);
  });
});
