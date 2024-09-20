import React from "react";
import {puzzles} from "../logic/puzzles";

function handlePointerDown(event) {
  event.preventDefault();
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);
}

function handlePointerEnter(event, index, dispatchGameState) {
  event.preventDefault();
  dispatchGameState({action: "continueDrag", index});
}

function PuzzleSquare({
  feature,
  index,
  visited,
  validNext,
  dispatchGameState,
  exitUnlocked,
  current,
}) {
  let featureClass;

  if (feature === "exit") {
    feature = exitUnlocked ? "exit-opened" : "exit-closed";
  }
  if (Number.isInteger(Number.parseInt(feature))) {
    featureClass = `numbered number${feature}`;
  } else {
    featureClass = feature;
  }

  return (
    <div
      key={index}
      className={`puzzleSquare ${featureClass} ${visited ? "visited" : ""} ${
        current ? "person" : ""
      } ${validNext ? "validNext" : ""}`}
      onPointerDown={(
        event, //todo delete this?
      ) => handlePointerDown(event)}
      {...(feature !== "blank" && {
        onPointerEnter: (event) =>
          handlePointerEnter(event, index, dispatchGameState),
      })}
    ></div>
  );
}

function Game({dispatchGameState, gameState}) {
  const mainPath = gameState.mainPath;
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
    ></PuzzleSquare>
  ));

  const flasks = Array.from({length: gameState.flaskCount}, (_, index) => (
    <div key={index} className="feature flask"></div>
  ));

  const keys = Array.from({length: gameState.keyCount}, (_, index) => (
    <div key={index} className="feature key"></div>
  ));

  console.log(gameState.jetCount);
  const jets = Array.from({length: gameState.jetCount}, (_, index) => (
    <div key={index} className="feature jet"></div>
  ));

  const puzzleKeys = Object.keys(puzzles);

  return (
    <div id="game">
      {/* todo omit this dropdown after testing */}
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
