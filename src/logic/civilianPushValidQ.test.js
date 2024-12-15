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
        currentCivilians: [3],
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
        currentCivilians: [3],
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
        currentCivilians: [2, 3, 4],
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
        currentCivilians: [2, 3, 4],
        puzzle,
      }),
    ).toBe(false);
  });

  test("false if civilian would be pushed onto next row", () => {
    let puzzle = [...allBasicPuzzle];

    expect(
      civilianPushValidQ({
        pushedCivilian: 6,
        pushedFrom: 5,
        currentCivilians: [6],
        puzzle,
      }),
    ).toBe(false);
  });

  test("false if civilian would be pushed onto previous row", () => {
    let puzzle = [...allBasicPuzzle];

    expect(
      civilianPushValidQ({
        pushedCivilian: 7,
        pushedFrom: 8,
        currentCivilians: [7],
        puzzle,
      }),
    ).toBe(false);
  });

  test("false if civilian would be pushed onto next column", () => {
    let puzzle = [...allBasicPuzzle];

    expect(
      civilianPushValidQ({
        pushedCivilian: 59,
        pushedFrom: 52,
        currentCivilians: [59],
        puzzle,
      }),
    ).toBe(false);
  });

  test("false if civilian would be pushed onto previous column", () => {
    let puzzle = [...allBasicPuzzle];

    expect(
      civilianPushValidQ({
        pushedCivilian: 3,
        pushedFrom: 10,
        currentCivilians: [3],
        puzzle,
      }),
    ).toBe(false);
  });

  test("false if civilian would be pushed off start of grid", () => {
    let puzzle = [...allBasicPuzzle];

    expect(
      civilianPushValidQ({
        pushedCivilian: 0,
        pushedFrom: 1,
        currentCivilians: [0],
        puzzle,
      }),
    ).toBe(false);
  });

  test("false if civilian would be pushed off end of grid", () => {
    let puzzle = [...allBasicPuzzle];

    expect(
      civilianPushValidQ({
        pushedCivilian: 62,
        pushedFrom: 61,
        currentCivilians: [62],
        puzzle,
      }),
    ).toBe(false);
  });
});
