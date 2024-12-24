import {pushCivilians} from "./pushCivilians";

describe("pushCivilians", () => {
  test("push one civilian", () => {
    const result = pushCivilians({
      pushedFrom: 0,
      pushedCivilian: 1,
      civilians: [1],
    });

    expect(result).toEqual(expect.arrayContaining([2]));
  });

  test("push one civilian using a jet", () => {
    const result = pushCivilians({
      pushedFrom: 0,
      pushedCivilian: 2,
      civilians: [2],
    });

    expect(result).toEqual(expect.arrayContaining([3]));
  });

  test("push a chain of civilians", () => {
    const result = pushCivilians({
      pushedFrom: 0,
      pushedCivilian: 1,
      civilians: [1, 2],
    });

    expect(result).toEqual(expect.arrayContaining([2, 3]));
  });

  test("unpushed civilians are not affected", () => {
    const result = pushCivilians({
      pushedFrom: 0,
      pushedCivilian: 1,
      civilians: [1, 2, 4],
    });

    expect(result).toEqual(expect.arrayContaining([2, 3, 4]));
  });

  test("undefined civilians just return undefined", () => {
    const result = pushCivilians({
      pushedFrom: 0,
      pushedCivilian: 1,
    });

    expect(result).toBe(undefined);
  });

  test("returns original civilians if none in push range", () => {
    const result = pushCivilians({
      pushedFrom: 0,
      pushedCivilian: 1,
      civilians: [3, 2, 4],
    });

    expect(result).toEqual(expect.arrayContaining([3, 2, 4]));
  });
});

describe("pushCivilians: pushing will not wrap", () => {
  test("push to next row", () => {
    const result = pushCivilians({
      pushedFrom: 5,
      pushedCivilian: 6,
      civilians: [6],
    });

    expect(result).toEqual(expect.arrayContaining([6]));
  });

  test("CAUTION: Expects civilian push validation to happen before calling; otherwise, can double up civilians", () => {
    const result = pushCivilians({
      pushedFrom: 4,
      pushedCivilian: 5,
      civilians: [5, 6],
    });

    expect(result).toEqual(expect.arrayContaining([6, 6]));
  });

  test("chained push across row", () => {
    const result = pushCivilians({
      pushedFrom: 5,
      pushedCivilian: 6,
      civilians: [6, 7, 8],
    });

    expect(result).toEqual(expect.arrayContaining([6, 7, 8]));
  });
});
