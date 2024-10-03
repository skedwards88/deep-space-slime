import React from "react";
import ControlBar from "./ControlBar";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {handleShare} from "../common/handleShare";

function handlePointerDown({event, index, dispatchGameState}) {
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);

  if (event.pointerType === "mouse") {
    dispatchGameState({action: "setMouseIsActive", mouseIsActive: true});
    dispatchGameState({
      action: "modifyPath",
      isMouse: true,
      index,
    });
  }
}

function handleMouseUp(dispatchGameState) {
  dispatchGameState({action: "setMouseIsActive", mouseIsActive: false});
}

function handlePointerEnter({event, index, dispatchGameState}) {
  event.preventDefault();
  dispatchGameState({
    action: "modifyPath",
    isMouse: event.pointerType === "mouse",
    index,
  });
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
  flaskCount,
  puzzleID,
  score,
  setScore,
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
      className={`puzzleSquare ${featureClass} ${current ? "person" : ""} ${
        visited ? "visited" : ""
      } ${direction ? direction : ""} ${validNext ? "validNext" : ""}`}
      onPointerDown={(event) =>
        handlePointerDown({event, index, dispatchGameState})
      }
      onMouseUp={() => handleMouseUp(dispatchGameState)}
      {...(!current &&
        feature !== "outer" && {
          onPointerEnter: (event) => {
            if (feature === "exit-opened") {
              let newScore = [...score];
              newScore[puzzleID] = flaskCount;
              setScore(newScore);
            }
            handlePointerEnter({event, index, dispatchGameState});
          },
        })}
    ></div>
  );
}

function ExitButtons({puzzle, flaskCount, puzzleID, dispatchGameState}) {
  const maxFlasks = puzzle.filter((feature) => feature === "flask").length;

  const nextPuzzleExists = Boolean(puzzles[puzzleID + 1]);

  const continueButton = nextPuzzleExists ? (
    <button
      onClick={() => {
        dispatchGameState({action: "newGame", puzzleID: puzzleID + 1});
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
      flaskCount={gameState.flaskCount}
      puzzleID={gameState.puzzleID}
      score={score}
      setScore={setScore}
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
    <div id="game" onMouseUp={() => handleMouseUp(dispatchGameState)}>
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
        ></ExitButtons>
      ) : (
        <div id="exitButtons"></div>
      )}

      <div id="puzzle">{squares}</div>
    </div>
  );
}

export default Game;
