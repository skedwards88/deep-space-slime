import React from "react";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";

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

function PuzzleSquare({
  feature,
  index,
  visited,
  validNext,
  dispatchGameState,
  exitUnlocked,
  current,
  direction,
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

function ExitButtons({puzzle, flaskCount, puzzleID, dispatchGameState}) {
  const maxFlasks = puzzle.filter((feature) => feature === "flask").length;

  const continueButton = (
    <button
      onClick={() =>
        dispatchGameState({action: "newGame", puzzleID: puzzleID + 1})
      }
    >
      Next Level
    </button>
  );

  const hintButton =
    flaskCount < maxFlasks ? (
      <button
        onClick={() =>
          dispatchGameState({action: "newGame", puzzleID: puzzleID})
        }
      >
        Retry Level
      </button>
    ) : (
      <></>
    );

  return (
    <div id="exitButtons">
      {continueButton}
      {hintButton}
    </div>
  );
}

function Game({dispatchGameState, gameState}) {
  const mainPath = gameState.mainPath;
  console.log(mainPath);
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const exitUnlocked = gameState.maxNumber === gameState.numberCount;
  const directions = getSlimeDirections({
    mainPath,
    puzzle: gameState.puzzle,
    numColumns: gameState.numColumns,
    numRows: gameState.numRows,
  });
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
      direction={directions[index]}
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

  const puzzleKeys = puzzles.map((puzzle) => puzzle.location);

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
      {gameState.puzzle[lastIndexInPath] === "exit" ||
      gameState.puzzle[lastIndexInPath] === "ship" ? (
        <ExitButtons
          puzzle={gameState.puzzle}
          flaskCount={gameState.flaskCount}
          puzzleID={gameState.puzzleID}
          dispatchGameState={dispatchGameState}
        ></ExitButtons>
      ) : (
        <div id="location">{gameState.location}</div>
      )}

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
