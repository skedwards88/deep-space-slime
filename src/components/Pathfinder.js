import React from "react";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {getAllValidPaths} from "../logic/getAllValidPaths";

function PuzzleSquare({feature, index, visited, current, direction}) {
  let featureClass;

  if (Number.isInteger(Number.parseInt(feature))) {
    featureClass = `numbered number${feature}`;
  } else {
    featureClass = feature;
  }

  return (
    <div
      key={index}
      className={`puzzleSquare ${featureClass} ${current ? "person" : ""} ${
        visited ? "visited" : ""
      } ${direction ? direction : ""}`}
    ></div>
  );
}

function Pathfinder({puzzle, numColumns, numRows, station, room, setDisplay}) {
  const allPaths = getAllValidPaths({
    puzzle,
    numColumns,
    numRows,
  });

  const numSolutions = allPaths.length;

  const [currentSolution, setCurrentSolution] = React.useState(0);

  const mainPath = allPaths[currentSolution];
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const directions = getSlimeDirections({
    mainPath,
    puzzle,
    numColumns,
    numRows,
  });
  const squares = puzzle.map((feature, index) => (
    <PuzzleSquare
      key={index}
      feature={feature}
      index={index}
      visited={mainPath.includes(index) && lastIndexInPath !== index}
      current={lastIndexInPath === index}
      direction={directions[index]}
    ></PuzzleSquare>
  ));

  const hasPortals = puzzle.includes("portal");

  return (
    <div className="App" id="deep-space-slime">
      <div id="game">
        <button id="pathfinderControls" onClick={() => setDisplay("game")}>
          Exit pathfinder
        </button>

        <div id="location">{`${station}: ${room}`}</div>

        <div id="botFace" className="happy"></div>

        <div id="message">{`${
          numSolutions === 1
            ? `There is ${numSolutions} solution that collects`
            : `There are ${numSolutions} solutions that collect`
        } all flasks.${
          hasPortals && numSolutions > 1
            ? " Solutions with portal direction reversed will look identical."
            : ""
        }`}</div>

        <div id="pathfinderButtons">
          <button
            disabled={currentSolution === 0}
            onClick={() => setCurrentSolution(currentSolution - 1)}
          >
            Previous
          </button>
          <button
            disabled={currentSolution === numSolutions - 1}
            onClick={() => setCurrentSolution(currentSolution + 1)}
          >
            Next
          </button>
        </div>

        <div id="puzzle">{squares}</div>
      </div>
    </div>
  );
}

export default Pathfinder;
