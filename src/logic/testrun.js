import {puzzles} from "./puzzles";
import {getAllValidPaths} from "./getAllValidPaths";

const id = 9;
console.log(puzzles[id].station);
console.log(puzzles[id].room);
const total = getAllValidPaths({
  puzzle: puzzles[id].puzzle,
  numColumns: 7,
  numRows: 9,
});
console.log(total.length);
console.log(total);
