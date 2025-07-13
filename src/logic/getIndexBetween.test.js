import {getIndexBetween} from "./getIndexBetween";
import {numColumns, numRows} from "./constants";

describe("getIndexBetween", () => {
  test("returns the index between two cells in the same row (left->right)", () => {
    expect(getIndexBetween({indexA: 26, indexB: 24, numColumns, numRows})).toBe(
      25,
    );
  });

  test("returns the index between two cells in the same row (right->left)", () => {
    expect(getIndexBetween({indexA: 9, indexB: 11, numColumns, numRows})).toBe(
      10,
    );
  });

  test("returns the index between two cells in the same column (up->down)", () => {
    expect(getIndexBetween({indexA: 16, indexB: 30, numColumns, numRows})).toBe(
      23,
    );
  });

  test("returns the index between two cells in the same column (down->up)", () => {
    expect(getIndexBetween({indexA: 54, indexB: 40, numColumns, numRows})).toBe(
      47,
    );
  });

  test("throws an error if indexes are not separated by exactly one row or column (same row, left->right)", () => {
    expect(() =>
      getIndexBetween({indexA: 1, indexB: 4, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });
  test("throws an error if indexes are not separated by exactly one row or column (same row, right->left)", () => {
    expect(() =>
      getIndexBetween({indexA: 10, indexB: 7, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });
  test("throws an error if indexes are not separated by exactly one row or column (same column, up->down)", () => {
    expect(() =>
      getIndexBetween({indexA: 1, indexB: 29, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });
  test("throws an error if indexes are not separated by exactly one row or column (same column, down->up)", () => {
    expect(() =>
      getIndexBetween({indexA: 61, indexB: 40, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });
  test("throws an error if indexes are not separated by exactly one row or column (span row)", () => {
    expect(() =>
      getIndexBetween({indexA: 20, indexB: 22, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });
  test("throws an error if indexes are not separated by exactly one row or column (span column)", () => {
    expect(() =>
      getIndexBetween({indexA: 59, indexB: 11, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });
  test("throws an error if indexes are not separated by exactly one row or column (too close)", () => {
    expect(() =>
      getIndexBetween({indexA: 10, indexB: 11, numColumns, numRows}),
    ).toThrow("Input cells are not separated by exactly one row or column.");
  });

  test("throws an error if indexA is out of bounds", () => {
    expect(() =>
      getIndexBetween({indexA: 63, indexB: 2, numColumns, numRows}),
    ).toThrow("Input index 63 exceeds the array size 63");
  });

  test("throws an error if indexB is out of bounds", () => {
    expect(() =>
      getIndexBetween({indexA: 1, indexB: 63, numColumns, numRows}),
    ).toThrow("Input index 63 exceeds the array size 63");
  });

  test("throws an error if indexA is undefined", () => {
    expect(() =>
      getIndexBetween({indexA: undefined, indexB: 2, numColumns, numRows}),
    ).toThrow("Input indexes must be defined.");
  });

  test("throws an error if indexB is undefined", () => {
    expect(() =>
      getIndexBetween({indexA: 1, indexB: undefined, numColumns, numRows}),
    ).toThrow("Input indexes must be defined.");
  });
});
