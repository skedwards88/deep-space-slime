import {puzzles} from "./puzzles";
import {getAllValidPaths} from "./getAllValidPaths";

const id = 12;
const total = getAllValidPaths({
  puzzle: puzzles[id].puzzle,
  numColumns: 7,
  numRows: 9,
});
console.log(`${total.length} solutions for ${puzzles[id].station} ${puzzles[id].room}`);
console.log(total);
