import React from "react";
import {puzzles} from "../logic/puzzles";

function handlePointerDown(event) {
  event.preventDefault();
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);
}

function handlePointerEnter(event, index, dispatchGameState) {
  // todo this doesn't work for desktop
  console.log(`ENTER ${index}`);
  event.preventDefault();
  dispatchGameState({action: "continueDrag", index});
}

function getDirection(square1, square2) {
  let direction;

  if (square1 - square2 === 1) {
    direction = "left";
  } else if (square1 - square2 === -1) {
    direction = "right";
  } else if (square1 < square2) {
    direction = "bottom";
  } else if (square1 > square2) {
    direction = "top";
  }
  return direction;
}

function getSlimeDirection(currentSquare, mainPath, currentFeature) {
  if (currentFeature === "start" && mainPath.length > 1) {
    const exitDirection = getDirection(mainPath[0], mainPath[1]);
    return `center-${exitDirection}`;
  }

  const positionInPath = mainPath.findIndex((i) => i === currentSquare);
  if (positionInPath === -1) {
    return;
  }
  const previousSquare = mainPath[positionInPath - 1];
  if (previousSquare === undefined) {
    return;
  }

  // todo need to handle jets

  if (currentFeature === "portal") {
    // todo need to handle portal enter vs portal exit
    const enterDirection = getDirection(currentSquare, previousSquare);

    return `${enterDirection}-center`;
  }

  const nextSquare = mainPath[positionInPath + 1];
  if (nextSquare === undefined) {
    return;
  }
  let direction = "";

  // Enters from...
  direction += getDirection(currentSquare, previousSquare);

  direction += "-";

  // Exits to...
  direction += getDirection(currentSquare, nextSquare);

  return direction;
}

function PuzzleSquare({
  feature,
  index,
  visited,
  validNext,
  dispatchGameState,
  exitUnlocked,
  current,
  mainPath,
}) {
  let featureClass;

  if (feature === "exit") {
    feature = exitUnlocked ? "exit-opened" : "exit-closed";
  }

  if (current) {
    featureClass = "person";
  } else if (Number.isInteger(Number.parseInt(feature))) {
    featureClass = `numbered number${feature}`;
  } else {
    featureClass = feature;
  }

  const direction = visited
    ? getSlimeDirection(index, mainPath, feature)
    : undefined;

  if (direction) {
    console.log(`${index}: ${direction}`);
  }

  return (
    <div
      key={index}
      className={`puzzleSquare ${featureClass} ${visited ? "visited" : ""} ${
        direction ? direction : ""
      } ${validNext ? "validNext" : ""}`}
      onPointerDown={(event) => handlePointerDown(event)}
      {...(feature !== "blank" && {
        onPointerEnter: (event) =>
          handlePointerEnter(event, index, dispatchGameState),
      })}
    ></div>
  );
}

function Game({dispatchGameState, gameState}) {
  const mainPath = gameState.mainPath;
  console.log(mainPath);
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const exitUnlocked = gameState.maxNumber === gameState.numberCount;
  const squares = gameState.puzzle.map((feature, index) => (
    <PuzzleSquare
      key={index}
      feature={feature}
      index={index}
      visited={mainPath.includes(index) && lastIndexInPath !== index}
      validNext={gameState.validNextIndexes.includes(index)}
      current={lastIndexInPath === index}
      exitUnlocked={exitUnlocked}
      dispatchGameState={dispatchGameState}
      mainPath={gameState.mainPath}
    ></PuzzleSquare>
  ));

  const flasks = Array.from({length: gameState.flaskCount}, (_, index) => (
    <div key={index} className="feature flask"></div>
  ));

  const keys = Array.from({length: gameState.keyCount}, (_, index) => (
    <div key={index} className="feature key"></div>
  ));

  const jets = Array.from({length: gameState.jetCount}, (_, index) => (
    <div key={index} className="feature jet"></div>
  ));

  const puzzleKeys = Object.keys(puzzles);

  return (
    <div id="game">
      {/* todo omit this dropdown after testing */}
      <div id="controls">
        <select
          onChange={(event) => {
            const selectedValue = event.target.value;
            dispatchGameState({action: "newGame", puzzleID: selectedValue});
          }}
        >
          {puzzleKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div id="location">TODO location</div>
      <div id="botFace"></div>
      <div id="message">{gameState.message}</div>
      <div id="acquiredFeatures">
        <div>{flasks}</div>
        <div>{keys}</div>
        <div>{jets}</div>
      </div>
      <div id="puzzle">{squares}</div>
    </div>
  );
}

export default Game;
