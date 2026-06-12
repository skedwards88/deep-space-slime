import {indexesAdjacentQ} from "./indexesAdjacentQ";

describe("indexesAdjacentQ", () => {
  test("returns true for adjacent indexes (left-right)", () => {
    expect(
      indexesAdjacentQ({indexA: 0, indexB: 1, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 5, indexB: 6, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 56, indexB: 57, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 61, indexB: 62, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 31, indexB: 32, numColumns: 7, numRows: 9}),
    ).toBe(true);
  });

  test("returns true for adjacent indexes (top-bottom)", () => {
    expect(
      indexesAdjacentQ({indexA: 0, indexB: 7, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 6, indexB: 13, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 49, indexB: 56, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 55, indexB: 62, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexA: 31, indexB: 38, numColumns: 7, numRows: 9}),
    ).toBe(true);
  });

  test("returns true for adjacent indexes (right-left)", () => {
    expect(
      indexesAdjacentQ({indexB: 0, indexA: 1, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 5, indexA: 6, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 56, indexA: 57, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 61, indexA: 62, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 31, indexA: 32, numColumns: 7, numRows: 9}),
    ).toBe(true);
  });

  test("returns true for adjacent indexes (bottom-top)", () => {
    expect(
      indexesAdjacentQ({indexB: 0, indexA: 7, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 6, indexA: 13, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 49, indexA: 56, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 55, indexA: 62, numColumns: 7, numRows: 9}),
    ).toBe(true);
    expect(
      indexesAdjacentQ({indexB: 31, indexA: 38, numColumns: 7, numRows: 9}),
    ).toBe(true);
  });

  test("returns false for non-adjacent indexes", () => {
    expect(
      indexesAdjacentQ({indexA: 0, indexB: 2, numColumns: 7, numRows: 9}),
    ).toBe(false);
  });

  test("returns false for indexes that are adjacent flat but not adjacent in the grid", () => {
    expect(
      indexesAdjacentQ({indexA: 6, indexB: 7, numColumns: 7, numRows: 9}),
    ).toBe(false);
  });

  test("returns false for indexes at the same position", () => {
    expect(
      indexesAdjacentQ({indexA: 1, indexB: 1, numColumns: 7, numRows: 9}),
    ).toBe(false);
  });

  test("throws error for indexA out of bounds", () => {
    expect(() =>
      indexesAdjacentQ({indexA: 63, indexB: 1, numColumns: 7, numRows: 9}),
    ).toThrow();
  });

  test("throws error for indexB out of bounds", () => {
    expect(() =>
      indexesAdjacentQ({indexA: 1, indexB: 63, numColumns: 7, numRows: 9}),
    ).toThrow();
  });

  test("returns false for undefined indexA", () => {
    expect(
      indexesAdjacentQ({
        indexA: undefined,
        indexB: 1,
        numColumns: 7,
        numRows: 9,
      }),
    ).toBe(false);
  });

  test("returns false for undefined indexB", () => {
    expect(
      indexesAdjacentQ({
        indexA: 1,
        indexB: undefined,
        numColumns: 7,
        numRows: 9,
      }),
    ).toBe(false);
  });
});
