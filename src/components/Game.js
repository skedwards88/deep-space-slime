import React from "react";
import ControlBar from "./ControlBar";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {handleShare} from "../common/handleShare";
import {generateSeed} from "../logic/generateSeed";

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

function ExitButtons({
  puzzle,
  flaskCount,
  puzzleID,
  dispatchGameState,
  isCustom,
  setDisplay,
  room,
  encodedPuzzle,
  dispatchBuilderState,
  customIndex,
}) {
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

  const retryButton = isCustom ? (
    <></>
  ) : flaskCount < maxFlasks ? (
    <button
      onClick={() => dispatchGameState({action: "newGame", puzzleID: puzzleID})}
    >
      Retry Level
    </button>
  ) : (
    <></>
  );

  const returnToGameButton = isCustom ? (
    <button onClick={() => setDisplay("map")}>Return to map</button>
  ) : (
    <></>
  );

  const editButton = isCustom ? (
    <button
      onClick={() => {
        dispatchBuilderState({
          action: "editCustom",
          puzzle,
          name: room,
          customIndex: customIndex,
        });
        setDisplay("builder");
      }}
    >
      Edit
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
            text: isCustom
              ? "Check out this custom Deep Space Slime puzzle!"
              : "I just beat Deep Space Slime! Try it out:",
            url: "https://skedwards88.github.io/deep-space-slime",
            seed: isCustom
              ? `custom-${generateSeed(room, encodedPuzzle)}`
              : undefined,
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
      {editButton}
      {retryButton}
      {returnToGameButton}
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
  dispatchBuilderState,
  customIndex,
}) {
  const mainPath = gameState.mainPath;
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
      flaskCount={gameState.flaskCount}
      puzzleID={gameState.puzzleID}
      score={score}
      setScore={setScore}
    ></PuzzleSquare>
  ));

  const flasks = Array.from({length: gameState.flaskCount}, (_, index) => (
    <button
      key={index}
      className="feature flask"
      onClick={() => setDisplay("flaskExplanation")}
    ></button>
  ));

  const keys = Array.from({length: gameState.keyCount}, (_, index) => (
    <button
      key={index}
      className="feature key"
      onClick={() => setDisplay("keyExplanation")}
    ></button>
  ));

  const jets = Array.from({length: gameState.jetCount}, (_, index) => (
    <button
      key={index}
      className="feature jet"
      onClick={() => setDisplay("jetExplanation")}
    ></button>
  ));

  const isAtExit =
    gameState.puzzle[lastIndexInPath] === "exit" ||
    gameState.puzzle[lastIndexInPath] === "ship";

  return (
    <div id="game" onMouseUp={() => handleMouseUp(dispatchGameState)}>
      <ControlBar
        setDisplay={setDisplay}
        setInstallPromptEvent={setInstallPromptEvent}
        showInstallButton={showInstallButton}
        installPromptEvent={installPromptEvent}
      ></ControlBar>

      <div id="location">{`${gameState.station}: ${gameState.room}`}</div>

      <div
        id="botFace"
        className={isAtExit ? gameState.robotEndMood : gameState.robotStartMood}
      ></div>

      <div id="message">{gameState.message}</div>

      {isAtExit ? (
        <ExitButtons
          puzzle={gameState.puzzle}
          flaskCount={gameState.flaskCount}
          puzzleID={gameState.puzzleID}
          dispatchGameState={dispatchGameState}
          isCustom={gameState.isCustom}
          setDisplay={setDisplay}
          room={gameState.room}
          encodedPuzzle={gameState.encodedPuzzle}
          dispatchBuilderState={dispatchBuilderState}
          customIndex={customIndex}
        ></ExitButtons>
      ) : (
        <div id="acquiredFeatures">
          <div>{flasks}</div>
          <div>{keys}</div>
          <div>{jets}</div>
        </div>
      )}

      <div id="puzzle">{squares}</div>
    </div>
  );
}

export default Game;
