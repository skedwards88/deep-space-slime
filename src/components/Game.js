import React from "react";
import ControlBar from "./ControlBar";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {generateSeed} from "../logic/generateSeed";
import {convertPuzzleToString} from "../logic/convertPuzzleString";
import {features, numColumns, numRows} from "../logic/constants";
import Share from "./Share";
import {useGameContext} from "./GameContextProvider";
import {useBuilderContext} from "./BuilderContextProvider";
import {useShareContext} from "./ShareContextProvider";
import {getReasonForMoveInvalidity} from "../logic/getReasonForMoveInvalidity";
import {getHint} from "../logic/getHint";
import {arraysMatchQ} from "../common/arraysMatchQ";

function handlePointerDown({
  event,
  index,
  dispatchGameState,
  confirmReset,
  setDisplay,
}) {
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);

  if (event.pointerType === "mouse") {
    if (confirmReset) {
      dispatchGameState({action: "setMouseIsActive", mouseIsActive: false});
      setDisplay("confirmReset");
    } else {
      dispatchGameState({action: "setMouseIsActive", mouseIsActive: true});
      dispatchGameState({
        action: "modifyPath",
        index,
      });
    }
  }
}

function handleMouseUp(dispatchGameState) {
  dispatchGameState({action: "setMouseIsActive", mouseIsActive: false});
}

function handlePointerEnter({
  event,
  index,
  dispatchGameState,
  confirmReset,
  setDisplay,
  mouseIsActive,
}) {
  event.preventDefault();
  // Return early if this was triggered by the mouse entering but the mouse is not depressed
  if (event.pointerType === "mouse" && !mouseIsActive) {
    return;
  }

  if (confirmReset) {
    if (event.pointerType === "mouse") {
      dispatchGameState({action: "setMouseIsActive", mouseIsActive: false});
    }
    setDisplay("confirmReset");
  } else {
    dispatchGameState({
      action: "modifyPath",
      index,
    });
  }
}

function PuzzleSquare({
  feature,
  index,
  exitUnlocked,
  current,
  visited,
  direction,
  setDisplay,
  setHintWaitIsOver,
  setCurrentMessage,
  setHintIndex,
  hintIndex,
}) {
  const {gameState, dispatchGameState, score, setScore} = useGameContext();

  const {
    flaskCount,
    puzzleID,
    mouseIsActive,
    mainPath,
    validNextIndexes,
    puzzle,
    startingText,
    hintText,
    winText,
  } = gameState;

  const validNext = validNextIndexes.includes(index);

  const isHint = index === hintIndex;

  let featureClass;

  if (feature === features.exit) {
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
      } ${direction ? direction : ""} ${validNext ? "validNext" : ""} ${
        isHint ? "hint" : ""
      }`}
      onPointerDown={(event) =>
        handlePointerDown({
          event,
          index,
          dispatchGameState,
          confirmReset: feature === features.start && mainPath.length > 2,
          setDisplay,
        })
      }
      onMouseUp={() => handleMouseUp(dispatchGameState)}
      {...(!current &&
        feature !== features.outer && {
          onPointerEnter: (event) => {
            if (feature === "exit-opened") {
              let newScore = [...score];
              newScore[puzzleID] = flaskCount;
              setScore(newScore);
            }

            if (validNext) {
              handlePointerEnter({
                event,
                index,
                dispatchGameState,
                confirmReset: feature === features.start && mainPath.length > 2,
                setDisplay,
                mouseIsActive,
              });
              let newMessage;
              if (
                puzzle[index] === features.exit ||
                puzzle[index] === features.ship
              ) {
                const maxFlasks = puzzle.filter(
                  (feature) => feature === features.flask,
                ).length;
                if (flaskCount < maxFlasks && hintText) {
                  newMessage = hintText;
                } else {
                  newMessage = winText;
                }
              } else {
                newMessage = startingText;
              }
              setCurrentMessage(newMessage);
            } else {
              const errorMessage = getReasonForMoveInvalidity({
                index,
                currentGameState: gameState,
              });
              setCurrentMessage(errorMessage);
            }
            setHintWaitIsOver(false);
            setHintIndex(undefined);
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
  roomName,
  dispatchBuilderState,
  customIndex,
  setHintWaitIsOver,
  setCurrentMessage,
}) {
  const maxFlasks = puzzle.filter(
    (feature) => feature === features.flask,
  ).length;

  const nextPuzzleExists = Boolean(puzzles[puzzleID + 1]);

  const continueButton = nextPuzzleExists ? (
    <button
      onClick={() => {
        setHintWaitIsOver(false);
        setCurrentMessage(puzzles[puzzleID + 1].startingText);
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
      onClick={() => {
        setCurrentMessage(puzzles[puzzleID].startingText);
        dispatchGameState({action: "newGame", puzzleID: puzzleID});
      }}
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
          roomName,
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

  const shareButton = !nextPuzzleExists ? (
    <Share
      appName="Deep Space Slime"
      text={
        isCustom
          ? "Check out this custom Deep Space Slime puzzle!"
          : "I just beat Deep Space Slime! Try it out:"
      }
      url="https://skedwards88.github.io/deep-space-slime"
      seed={
        isCustom
          ? generateSeed(roomName, convertPuzzleToString(puzzle))
          : undefined
      }
      buttonText="Share"
    ></Share>
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
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
}) {
  const {gameState, dispatchGameState, allGamePaths, calculatingGamePaths} =
    useGameContext();

  const {hintsRemaining, setHintsRemaining} = useShareContext();

  const {savedCustomBuilds, dispatchBuilderState} = useBuilderContext();

  const customIndex = gameState.isCustom
    ? gameState.customIndex ?? savedCustomBuilds.length
    : undefined;

  const mainPath = gameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const exitUnlocked = gameState.maxNumber === gameState.numberCount;

  const [currentMessage, setCurrentMessage] = React.useState(
    gameState.startingText,
  );

  const [hintWaitIsOver, setHintWaitIsOver] = React.useState(false);
  const hintWaitTime = 7; // seconds

  const [hintIndex, setHintIndex] = React.useState(undefined);

  const directions = getSlimeDirections({
    mainPath,
    puzzle: gameState.puzzle,
    numColumns: numColumns,
    numRows: numRows,
  });
  const squares = gameState.puzzle.map((feature, index) => (
    <PuzzleSquare
      key={index}
      feature={feature}
      index={index}
      visited={mainPath.includes(index) && lastIndexInPath !== index}
      current={lastIndexInPath === index}
      exitUnlocked={exitUnlocked}
      direction={directions[index]}
      setDisplay={setDisplay}
      setHintWaitIsOver={setHintWaitIsOver}
      setCurrentMessage={setCurrentMessage}
      setHintIndex={setHintIndex}
      hintIndex={hintIndex}
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
    gameState.puzzle[lastIndexInPath] === features.exit ||
    gameState.puzzle[lastIndexInPath] === features.ship;

  // Change setHintWaitIsOver to true if the main path is unchanged for some time
  React.useEffect(() => {
    let timeout;
    if (
      !hintWaitIsOver &&
      !isAtExit &&
      (navigator.canShare || hintsRemaining)
    ) {
      timeout = setTimeout(() => {
        setHintWaitIsOver(true);
        setCurrentMessage("Tap me to get a hint!");
      }, hintWaitTime * 1000);
    }
    return () => clearTimeout(timeout);
  }, [gameState.mainPath, hintWaitIsOver, isAtExit, hintsRemaining]);

  const isTimeToShowAHint =
    hintWaitIsOver &&
    !calculatingGamePaths &&
    !isAtExit &&
    hintIndex === undefined;

  return (
    <div id="game" onMouseUp={() => handleMouseUp(dispatchGameState)}>
      <ControlBar
        setDisplay={setDisplay}
        setInstallPromptEvent={setInstallPromptEvent}
        showInstallButton={showInstallButton}
        installPromptEvent={installPromptEvent}
      ></ControlBar>

      <div id="location">{`${gameState.station}: ${gameState.roomName}`}</div>

      <div
        id="botFace"
        className={`${
          isAtExit ? gameState.robotEndMood : gameState.robotStartMood
        }${isTimeToShowAHint ? " idea" : ""}`}
        onClick={
          isTimeToShowAHint && hintsRemaining
            ? () => {
                const [newPath, hint] = getHint(mainPath, allGamePaths);
                setHintIndex(hint);
                if (!arraysMatchQ(newPath, mainPath)) {
                  dispatchGameState({action: "overwritePath", newPath});
                }
                setCurrentMessage("I think you should go here.");
                setHintsRemaining(hintsRemaining - 1);
              }
            : null
        }
      ></div>

      {isTimeToShowAHint && !hintsRemaining && navigator.canShare ? (
        <div id="message">
          {"Share to get more hints!"}
          <Share
            appName="Deep Space Slime"
            text="Check out this maze puzzle!"
            url="https://skedwards88.github.io/deep-space-slime"
            buttonText="Share"
          ></Share>
        </div>
      ) : (
        <div id="message">{currentMessage}</div>
      )}

      {isAtExit ? (
        <ExitButtons
          puzzle={gameState.puzzle}
          flaskCount={gameState.flaskCount}
          puzzleID={gameState.puzzleID}
          dispatchGameState={dispatchGameState}
          isCustom={gameState.isCustom}
          setDisplay={setDisplay}
          roomName={gameState.roomName}
          dispatchBuilderState={dispatchBuilderState}
          customIndex={customIndex}
          setHintWaitIsOver={setHintWaitIsOver}
          setCurrentMessage={setCurrentMessage}
        ></ExitButtons>
      ) : (
        <div id="acquiredFeatures">
          {flasks}
          {keys}
          {jets}
        </div>
      )}

      <div id="puzzle">{squares}</div>
    </div>
  );
}

export default Game;
