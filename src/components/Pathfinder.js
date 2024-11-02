import React from "react";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {features} from "../logic/constants";

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

function Pathfinder({
  puzzle,
  numColumns,
  numRows,
  station,
  room,
  setDisplay,
  origin,
}) {
  const maxPathsToFind = 100;

  // This will be updated in the useEffect hook
  // since paths can sometimes take a while to calculate
  const [allPaths, setAllPaths] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Use a worker instead of async to make sure that this isn't blocking
    const worker = new Worker(
      new URL("./getAllValidPathsWorker.js", import.meta.url),
    );

    worker.postMessage({
      puzzle,
      numColumns,
      numRows,
      maxPathsToFind,
    });

    worker.onmessage = (event) => {
      setAllPaths(event.data);
      setLoading(false);
    };

    return () => {
      worker.terminate();
    };
  }, [puzzle, numColumns, numRows]);

  const numSolutions = allPaths.length;

  const [currentSolution, setCurrentSolution] = React.useState(0);

  const mainPath = allPaths[currentSolution] || [];
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

  const hasPortals = puzzle.includes(features.portal);

  return (
    <div className="App" id="deep-space-slime">
      <div id="game">
        <button id="pathfinderControls" onClick={() => setDisplay(origin)}>
          Exit pathfinder
        </button>

        <div id="location">{`${station}: ${room}`}</div>

        <div id="botFace" className="happy"></div>

        {loading ? (
          <div id="message">{"I'm calculating the solutions..."}</div>
        ) : (
          <div id="message">{`${
            numSolutions === 1
              ? `There is ${numSolutions} solution that collects`
              : `There are ${
                  numSolutions >= maxPathsToFind ? "at least " : ""
                }${numSolutions} solutions that collect`
          } all flasks.${
            hasPortals && numSolutions > 1
              ? " Solutions with portal direction reversed will look identical."
              : ""
          }`}</div>
        )}

        <div id="pathfinderButtons">
          <button
            disabled={currentSolution === 0 || numSolutions === 0}
            onClick={() => setCurrentSolution(currentSolution - 1)}
          >
            Previous
          </button>
          <button
            disabled={
              currentSolution === numSolutions - 1 || numSolutions === 0
            }
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
