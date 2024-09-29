import {getAdjacentIndexes} from "./getAdjacentIndexes";

describe("getAdjacentIndexes (3x3 grid)", () => {
  test("returns adjacent indexes for a middle cell", () => {
    const result = getAdjacentIndexes({index: 4, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([1, 3, 5, 7]));
  });

  test("returns adjacent indexes for a top-left corner cell", () => {
    const result = getAdjacentIndexes({index: 0, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([3, 1]));
  });

  test("returns adjacent indexes for a top-right corner cell", () => {
    const result = getAdjacentIndexes({index: 2, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([5, 1]));
  });

  test("returns adjacent indexes for a bottom-left corner cell", () => {
    const result = getAdjacentIndexes({index: 6, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([3, 7]));
  });

  test("returns adjacent indexes for a bottom-right corner cell", () => {
    const result = getAdjacentIndexes({index: 8, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([5, 7]));
  });

  test("returns adjacent indexes for a cell on the top edge", () => {
    const result = getAdjacentIndexes({index: 1, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([4, 0, 2]));
  });

  test("returns adjacent indexes for a cell on the bottom edge", () => {
    const result = getAdjacentIndexes({index: 7, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([4, 6, 8]));
  });

  test("returns adjacent indexes for a cell on the left edge", () => {
    const result = getAdjacentIndexes({index: 3, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([0, 6, 4]));
  });

  test("returns adjacent indexes for a cell on the right edge", () => {
    const result = getAdjacentIndexes({index: 5, numColumns: 3, numRows: 3});
    expect(result).toEqual(expect.arrayContaining([2, 8, 4]));
  });

  test("errors if index is outside of grid", () => {
    expect(() =>
      getAdjacentIndexes({index: 9, numColumns: 3, numRows: 3}),
    ).toThrow("Input index 9 exceeds the array size 9");
  });
});

describe("getAdjacentIndexes (7x9 grid)", () => {
  test("returns adjacent indexes for a middle cell", () => {
    const result = getAdjacentIndexes({index: 31, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([24, 30, 32, 38]));
  });

  test("returns adjacent indexes for a top-left corner cell", () => {
    const result = getAdjacentIndexes({index: 0, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([7, 1]));
  });

  test("returns adjacent indexes for a top-right corner cell", () => {
    const result = getAdjacentIndexes({index: 6, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([13, 5]));
  });

  test("returns adjacent indexes for a bottom-left corner cell", () => {
    const result = getAdjacentIndexes({index: 56, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([49, 57]));
  });

  test("returns adjacent indexes for a bottom-right corner cell", () => {
    const result = getAdjacentIndexes({index: 62, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([55, 61]));
  });

  test("returns adjacent indexes for a cell on the top edge", () => {
    const result = getAdjacentIndexes({index: 3, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([10, 2, 4]));
  });

  test("returns adjacent indexes for a cell on the bottom edge", () => {
    const result = getAdjacentIndexes({index: 59, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([52, 58, 60]));
  });

  test("returns adjacent indexes for a cell on the left edge", () => {
    const result = getAdjacentIndexes({index: 14, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([7, 21, 15]));
  });

  test("returns adjacent indexes for a cell on the right edge", () => {
    const result = getAdjacentIndexes({index: 20, numColumns: 7, numRows: 9});
    expect(result).toEqual(expect.arrayContaining([13, 27, 19]));
  });

  test("errors if index is outside of grid", () => {
    expect(() =>
      getAdjacentIndexes({index: 63, numColumns: 7, numRows: 9}),
    ).toThrow("Input index 63 exceeds the array size 63");
  });
});
