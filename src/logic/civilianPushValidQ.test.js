import {civilianPushValidQ} from "./civilianPushValidQ";
import {features, numColumns, numRows} from "./constants";

const allBasicPuzzle = Array.from(
  {length: numColumns * numRows},
  () => features.basic,
);

describe("civilianPushValidQ", () => {
  test("false if civilian would be pushed onto a forbidden location", () => {
    let puzzle = [...allBasicPuzzle];

    puzzle[4] = features.door;

    expect(
      civilianPushValidQ({
        pushedCivilian: 3,
        pushedFrom: 2,
        civilians: [3],
        puzzle,
      }),
    ).toBe(false);
  });

  test("true if civilian would not be pushed onto a forbidden location", () => {
    let puzzle = [...allBasicPuzzle];

    puzzle[4] = features.flask;

    expect(
      civilianPushValidQ({
        pushedCivilian: 3,
        pushedFrom: 2,
        civilians: [3],
        puzzle,
      }),
    ).toBe(true);
  });

  test("true for chain of civilians if last civilian would not be pushed onto a forbidden location", () => {
    let puzzle = [...allBasicPuzzle];

    puzzle[5] = features.jet;

    expect(
      civilianPushValidQ({
        pushedCivilian: 2,
        pushedFrom: 1,
        civilians: [2, 3, 4],
        puzzle,
      }),
    ).toBe(true);
  });

  test("false for chain of civilians if last civilian would be pushed onto a forbidden location", () => {
    let puzzle = [...allBasicPuzzle];

    puzzle[5] = features.outer;

    expect(
      civilianPushValidQ({
        pushedCivilian: 2,
        pushedFrom: 1,
        civilians: [2, 3, 4],
        puzzle,
      }),
    ).toBe(false);
  });
});
