import {getAdjacentIndexes} from "./getAdjacentIndexes";

describe("getAdjacentIndexes", () => {
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
