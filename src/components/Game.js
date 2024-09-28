import React from "react";
import ControlBar from "./ControlBar";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {handleShare} from "../common/handleShare";

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

  if (Number.isInteger(Number.parseInt(feature))) {
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
      className={`puzzleSquare ${featureClass} ${current ? "person" : ""} ${
        visited ? "visited" : ""
      } ${direction ? direction : ""} ${validNext ? "validNext" : ""}`}
      onPointerDown={(event) => handlePointerDown(event)}
      {...(!current && {
        onPointerEnter: (event) =>
          handlePointerEnter(event, index, dispatchGameState),
      })}
    ></div>
  );
}

function ExitButtons({
  puzzle,
  flaskCount,
  puzzleID,
  dispatchGameState,
  score,
  setScore,
}) {
  const maxFlasks = puzzle.filter((feature) => feature === "flask").length;

  let newScore = [...score];
  newScore[puzzleID] = flaskCount;

  const nextPuzzleExists = Boolean(puzzles[puzzleID + 1]);

  const continueButton = nextPuzzleExists ? (
    <button
      onClick={() => {
        dispatchGameState({action: "newGame", puzzleID: puzzleID + 1});
        setScore(newScore);
      }}
    >
      Next Level
    </button>
  ) : (
    <></>
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

  const shareButton =
    !nextPuzzleExists && navigator.canShare ? (
      <button
        onClick={() =>
          handleShare({
            appName: "Deep Space Slime",
            text: "I just beat Deep Space Slime! Try it out:",
            url: "https://skedwards88.github.io/deep-space-slime",
          })
        }
      >
        Share
      </button>
    ) : (
      <></>
    );

  return (
    <div id="exitButtons">
      {continueButton}
      {shareButton}
      {hintButton}
    </div>
  );
}

function Game({
  dispatchGameState,
  gameState,
  setScore,
  score,
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
}) {
  const mainPath = gameState.mainPath;
  console.log(mainPath);
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const exitUnlocked = gameState.maxNumber === gameState.numberCount;
  const directions = getSlimeDirections({
    mainPath,
    puzzle: puzzles[gameState.puzzleID].puzzle,
    numColumns: gameState.numColumns,
    numRows: gameState.numRows,
  });
  const squares = puzzles[gameState.puzzleID].puzzle.map((feature, index) => (
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

  const isAtExit =
    puzzles[gameState.puzzleID].puzzle[lastIndexInPath] === "exit" ||
    puzzles[gameState.puzzleID].puzzle[lastIndexInPath] === "ship";

  return (
    <div id="game">
      <ControlBar
        setDisplay={setDisplay}
        setInstallPromptEvent={setInstallPromptEvent}
        showInstallButton={showInstallButton}
        installPromptEvent={installPromptEvent}
        dispatchGameState={dispatchGameState}
        puzzleID={gameState.puzzleID}
      ></ControlBar>

      <div id="location">{`${puzzles[gameState.puzzleID].station}: ${
        puzzles[gameState.puzzleID].room
      }`}</div>

      <div
        id="botFace"
        className={
          isAtExit
            ? puzzles[gameState.puzzleID].robotEndMood
            : puzzles[gameState.puzzleID].robotStartMood
        }
      ></div>

      <div id="message">{gameState.message}</div>

      <div id="acquiredFeatures">
        <div>{flasks}</div>
        <div>{keys}</div>
        <div>{jets}</div>
      </div>

      {isAtExit ? (
        <ExitButtons
          puzzle={puzzles[gameState.puzzleID].puzzle}
          flaskCount={gameState.flaskCount}
          puzzleID={gameState.puzzleID}
          dispatchGameState={dispatchGameState}
          score={score}
          setScore={setScore}
        ></ExitButtons>
      ) : (
        <div id="exitButtons"></div>
      )}

      <div id="puzzle">{squares}</div>
    </div>
  );
}

export default Game;
