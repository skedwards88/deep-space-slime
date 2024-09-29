import {getNextAdjacentIndex} from "./getNextAdjacentIndex";

describe("getNextAdjacentIndex", () => {
  test("returns next adjacent index for a left-right horizontal line", () => {
    const result = getNextAdjacentIndex({
      index: 0,
      adjacentIndex: 1,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(2);
  });

  test("returns next adjacent index for a right-left horizontal line", () => {
    const result = getNextAdjacentIndex({
      index: 2,
      adjacentIndex: 1,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(0);
  });

  test("returns next adjacent index for a up-down vertical line", () => {
    const result = getNextAdjacentIndex({
      index: 0,
      adjacentIndex: 3,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(6);
  });

  test("returns next adjacent index for a down-up vertical line", () => {
    const result = getNextAdjacentIndex({
      index: 6,
      adjacentIndex: 3,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(0);
  });

  test("returns next adjacent index for a diagonal line (top-left to bottom-right)", () => {
    const result = getNextAdjacentIndex({
      index: 0,
      adjacentIndex: 4,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(8);
  });

  test("returns next adjacent index for a diagonal line (bottom-right to top-left)", () => {
    const result = getNextAdjacentIndex({
      index: 8,
      adjacentIndex: 4,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(0);
  });

  test("returns next adjacent index for a diagonal line (bottom-left to top-right)", () => {
    const result = getNextAdjacentIndex({
      index: 6,
      adjacentIndex: 4,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(2);
  });

  test("returns next adjacent index for a diagonal line (top-right to bottom-left)", () => {
    const result = getNextAdjacentIndex({
      index: 2,
      adjacentIndex: 4,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBe(6);
  });

  test("returns undefined if no adjacent cell (left-right)", () => {
    const result = getNextAdjacentIndex({
      index: 1,
      adjacentIndex: 2,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBeUndefined();
  });

  test("returns undefined if no adjacent cell (right-left)", () => {
    const result = getNextAdjacentIndex({
      index: 4,
      adjacentIndex: 3,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBeUndefined();
  });

  test("returns undefined if no adjacent cell (left-right, off grid)", () => {
    const result = getNextAdjacentIndex({
      index: 7,
      adjacentIndex: 8,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBeUndefined();
  });

  test("returns undefined if no adjacent cell (right-left, off grid)", () => {
    const result = getNextAdjacentIndex({
      index: 1,
      adjacentIndex: 0,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBeUndefined();
  });

  test("returns undefined if no adjacent cell (top-bottom)", () => {
    const result = getNextAdjacentIndex({
      index: 4,
      adjacentIndex: 7,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBeUndefined();
  });

  test("returns undefined if no adjacent cell (bottom-top)", () => {
    const result = getNextAdjacentIndex({
      index: 4,
      adjacentIndex: 1,
      numColumns: 3,
      numRows: 3,
    });
    expect(result).toBeUndefined();
  });

  test("errors if either input index is outside of grid", () => {
    expect(() =>
      getNextAdjacentIndex({
        index: 9,
        adjacentIndex: 8,
        numColumns: 3,
        numRows: 3,
      }),
    ).toThrow("Input index 9 exceeds the array size 9");

    expect(() =>
      getNextAdjacentIndex({
        index: 8,
        adjacentIndex: 9,
        numColumns: 3,
        numRows: 3,
      }),
    ).toThrow("Input index 9 exceeds the array size 9");
  });

  test("errors if the input indexes are not adjacent", () => {
    expect(() =>
      getNextAdjacentIndex({
        index: 0,
        adjacentIndex: 2,
        numColumns: 3,
        numRows: 3,
      }),
    ).toThrow("Input cells are not adjacent.");
  });
});
