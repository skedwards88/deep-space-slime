import React from "react";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {
  features,
  numColumns,
  numRows,
  customStationName,
} from "../logic/constants";
import {useBuilderContext} from "./BuilderContextProvider";

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

function Pathfinder({setDisplay}) {
  const {
    builderState: {puzzleWithCivilians, roomName},
    maxPathsToFind,
    calculatingBuilderPaths,
    allBuilderPaths,
  } = useBuilderContext();

  // todo reverify that this still works with context
  // The Pathfinder component will update when the calculatingBuilderPaths and allBuilderPaths states are updated,
  // so even if the paths are still being calculated when Pathfinder is opened
  //Pathfinder will be updated once the calculation is complete.
  const numSolutions = allBuilderPaths.length;

  const [currentSolution, setCurrentSolution] = React.useState(0);

  const path = allBuilderPaths[currentSolution] || [];
  const lastIndexInPath = path[path.length - 1];
  const directions = getSlimeDirections({
    path,
    puzzle: puzzleWithCivilians,
    numColumns,
    numRows,
  });
  const squares = puzzleWithCivilians.map((feature, index) => (
    <PuzzleSquare
      key={index}
      feature={feature}
      index={index}
      visited={path.includes(index) && lastIndexInPath !== index}
      current={lastIndexInPath === index}
      direction={directions[index]}
    ></PuzzleSquare>
  ));

  const hasPortals = puzzleWithCivilians.includes(features.portal);

  return (
    <div className="App" id="deep-space-slime">
      <div id="game">
        <button
          className="textButton"
          id="pathfinderControls"
          onClick={() => setDisplay("builder")}
        >
          Exit pathfinder
        </button>

        <div id="location">{`${customStationName}: ${roomName}`}</div>

        <div id="botFace" className="happy"></div>

        {calculatingBuilderPaths ? (
          <div id="message">{"I'm calculating the solutions..."}</div>
        ) : (
          <div id="message">{`${
            numSolutions === 1
              ? `There is ${numSolutions} solution.`
              : `There are ${
                  numSolutions >= maxPathsToFind ? "at least " : ""
                }${numSolutions} solutions.`
          }${
            hasPortals && numSolutions > 1
              ? " Solutions with portal direction reversed will look identical."
              : ""
          }`}</div>
        )}

        <div id="pathfinderButtons">
          <button
            className="textButton"
            disabled={currentSolution === 0 || numSolutions === 0}
            onClick={() => setCurrentSolution(currentSolution - 1)}
          >
            Previous
          </button>
          <button
            className="textButton"
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
