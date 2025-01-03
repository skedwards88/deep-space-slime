import {getMaxFlaskCount} from "./getMaxFlaskCount";
import {features} from "./constants";

const puzzleWithZeroFlasks = [
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.exit,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.basic,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.basic,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.basic,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.start,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
];

const puzzleWithFiveFlasks = [
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.flask,
  features.outer,
  features.outer,
  features.outer,
  features.flask,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.flask,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.basic,
  features.outer,
  features.outer,
  features.flask,
  features.outer,
  features.outer,
  features.outer,
  features.basic,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.flask,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.start,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
  features.outer,
];

describe("getMaxFlaskCount", () => {
  test("returns 0 if no flasks", () => {
    expect(getMaxFlaskCount(puzzleWithZeroFlasks)).toBe(0);
  });
  test("returns flask count", () => {
    expect(getMaxFlaskCount(puzzleWithFiveFlasks)).toBe(5);
  });
  test("returns 0 if empty puzzle", () => {
    expect(getMaxFlaskCount([])).toBe(0);
  });
});
