import React from "react";
import ControlBar from "./ControlBar";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {generateSeed} from "../logic/generateSeed";
import {
  convertPuzzleAndCiviliansToPuzzle,
  convertPuzzleAndCiviliansToString,
} from "../logic/convertPuzzleString";
import {features, numColumns, numRows, mapTypes} from "../logic/constants";
import Share from "./Share";
import {useGameContext} from "./GameContextProvider";
import {useBuilderContext} from "./BuilderContextProvider";
import {useShareContext} from "./ShareContextProvider";
import {getReasonForMoveInvalidity} from "../logic/getReasonForMoveInvalidity";
import {getHint} from "../logic/getHint";
import {arraysMatchQ} from "../common/arraysMatchQ";
import {exitUnlockedQ} from "../logic/exitUnlockedQ";
import sendAnalytics from "@skedwards88/shared-components/src/logic/sendAnalytics";

function isAtEndOfCampaign(puzzleID) {
  const nextPuzzleID = puzzles[puzzleID]?.nextPuzzle;

  const nextPuzzleExists = nextPuzzleID in puzzles;

  const currentPuzzleIsCampaign = puzzles[puzzleID].type === mapTypes.campaign;

  const nextPuzzleIsCampaign =
    nextPuzzleExists &&
    currentPuzzleIsCampaign &&
    puzzles[nextPuzzleID].type === mapTypes.campaign;

  const isAtEndOfCampaign = currentPuzzleIsCampaign && !nextPuzzleIsCampaign;

  return isAtEndOfCampaign;
}

function handleMovement({
  validNext,
  index,
  gameState,
  setCurrentMessage,
  setCurrentBotMood,
  setHintWaitIsOver,
  setHintIndex,
  completedLevels,
  setCompletedLevels,
  dispatchGameState,
  setDisplay,
}) {
  if (validNext) {
    const isMovingToExit =
      gameState.puzzle[index] === features.exit ||
      gameState.puzzle[index] === features.ship;

    if (isMovingToExit) {
      let newCompletedLevels = [...completedLevels];
      newCompletedLevels.push(gameState.puzzleID);
      setCompletedLevels(newCompletedLevels);
      sendAnalytics("levelComplete", {
        playerID: gameState.playerID,
        level: gameState.puzzleID,
      });
    }

    let newMessage;
    if (isMovingToExit) {
      newMessage = gameState.winText;
    } else {
      newMessage = gameState.startingText;
    }
    setCurrentMessage(newMessage);

    if (isMovingToExit) {
      setCurrentBotMood(gameState.robotEndMood);
    } else {
      setCurrentBotMood(gameState.robotStartMood);
    }

    dispatchGameState({
      action: "modifyPath",
      index,
    });

    if (isMovingToExit && isAtEndOfCampaign(gameState.puzzleID)) {
      setDisplay("campaignOver");
    }
  } else {
    const currentIndex = gameState.path[gameState.path.length - 1];
    const isCurrentlyAtExit =
      gameState.puzzle[currentIndex] === features.exit ||
      gameState.puzzle[currentIndex] === features.ship;

    if (!isCurrentlyAtExit) {
      const errorMessage = getReasonForMoveInvalidity({
        index,
        currentGameState: gameState,
      });
      setCurrentMessage(errorMessage);
      setCurrentBotMood("sinister");
    }
  }

  setHintWaitIsOver(false);
  setHintIndex(undefined);
}

function handlePointerDown({
  event,
  index,
  dispatchGameState,
  confirmReset,
  setDisplay,
  validNext,
  gameState,
  setCurrentMessage,
  setCurrentBotMood,
  setHintWaitIsOver,
  setHintIndex,
  completedLevels,
  setCompletedLevels,
}) {
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);

  if (event.pointerType === "mouse") {
    if (confirmReset) {
      dispatchGameState({action: "setMouseIsActive", mouseIsActive: false});
      setDisplay("confirmReset");
    } else {
      dispatchGameState({action: "setMouseIsActive", mouseIsActive: true});
      handleMovement({
        validNext,
        index,
        gameState,
        setCurrentMessage,
        setCurrentBotMood,
        setHintWaitIsOver,
        setHintIndex,
        completedLevels,
        setCompletedLevels,
        dispatchGameState,
        setDisplay,
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
  validNext,
  gameState,
  setCurrentMessage,
  setCurrentBotMood,
  setHintWaitIsOver,
  setHintIndex,
  completedLevels,
  setCompletedLevels,
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
    handleMovement({
      validNext,
      index,
      gameState,
      setCurrentMessage,
      setCurrentBotMood,
      setHintWaitIsOver,
      setHintIndex,
      completedLevels,
      setCompletedLevels,
      dispatchGameState,
      setDisplay,
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
  setCurrentBotMood,
  setHintIndex,
  hintIndex,
  hasCivilian,
  isInPortal,
  nextNumber,
}) {
  const {gameState, dispatchGameState, completedLevels, setCompletedLevels} =
    useGameContext();

  const {mouseIsActive, path, validNextIndexes} = gameState;

  const validNext = validNextIndexes.includes(index);

  const isHint = index === hintIndex;

  let featureClass;

  if (feature === features.exit) {
    feature = exitUnlocked ? "exit-opened" : "exit-closed";
  }

  if (Number.isInteger(Number.parseInt(feature))) {
    featureClass = `numbered number${feature}`;
    if (nextNumber === Number.parseInt(feature)) {
      featureClass += " nextNumber";
    }
  } else if (isInPortal && feature === features.portal) {
    featureClass = `portalSpin ${feature}`;
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
      } ${hasCivilian ? "civilian" : ""}`}
      {...(feature !== features.outer && {
        onPointerDown: (event) => {
          handlePointerDown({
            event,
            index,
            dispatchGameState,
            confirmReset: feature === features.start && path.length > 2,
            setDisplay,
            validNext,
            gameState,
            setCurrentMessage,
            setCurrentBotMood,
            setHintWaitIsOver,
            setHintIndex,
            completedLevels,
            setCompletedLevels,
          });
        },
      })}
      onMouseUp={() => handleMouseUp(dispatchGameState)}
      {...(!current &&
        feature !== features.outer && {
          onPointerEnter: (event) => {
            handlePointerEnter({
              event,
              index,
              dispatchGameState,
              confirmReset: feature === features.start && path.length > 2,
              setDisplay,
              mouseIsActive,
              validNext,
              gameState,
              setCurrentMessage,
              setCurrentBotMood,
              setHintWaitIsOver,
              setHintIndex,
              completedLevels,
              setCompletedLevels,
            });
          },
        })}
    ></div>
  );
}

function PuzzleSolvedButtons({
  puzzleID,
  dispatchGameState,
  setHintWaitIsOver,
  setCurrentMessage,
  setCurrentBotMood,
  setDisplay,
}) {
  const nextPuzzleID = puzzles[puzzleID]?.nextPuzzle;

  let nextLevelButton;
  // If this was the last puzzle in a bonus station,
  // or the last puzzle ever,
  // return to map
  if (
    !nextPuzzleID ||
    (puzzles[puzzleID].type === mapTypes.bonus &&
      puzzles[nextPuzzleID]?.station !== puzzles[puzzleID]?.station)
  ) {
    nextLevelButton = (
      <button
        className="textButton"
        onClick={() => {
          setDisplay("map");
        }}
      >
        Return to map
      </button>
    );
  } else {
    // Otherwise go to the next level
    const buttonText =
      puzzles[puzzleID].type === mapTypes.campaign &&
      puzzles[nextPuzzleID].type === mapTypes.bonus
        ? "First Bonus Level"
        : "Next Level";
    nextLevelButton = (
      <button
        className="textButton"
        onClick={() => {
          setHintWaitIsOver(false);
          setCurrentMessage(puzzles[nextPuzzleID].startingText);
          setCurrentBotMood(puzzles[nextPuzzleID].robotStartMood);
          dispatchGameState({action: "newGame", puzzleID: nextPuzzleID});
        }}
      >
        {buttonText}
      </button>
    );
  }

  return <div id="exitButtons">{nextLevelButton}</div>;
}

function CustomPuzzleSolvedButtons({
  puzzle,
  startingCivilians,
  setDisplay,
  roomName,
  dispatchBuilderState,
  customIndex,
}) {
  const returnToMapButton = (
    <button className="textButton" onClick={() => setDisplay("map")}>
      Return to map
    </button>
  );

  const editButton = (
    <button
      className="textButton"
      onClick={() => {
        dispatchBuilderState({
          action: "editCustom",
          puzzleWithCivilians: convertPuzzleAndCiviliansToPuzzle(
            puzzle,
            startingCivilians,
          ),
          roomName,
          customIndex: customIndex,
        });
        setDisplay("builder");
      }}
    >
      Edit
    </button>
  );

  const shareButton = (
    <Share
      appName="Deep Space Slime"
      text="Check out this custom Deep Space Slime puzzle!"
      url="https://deepspaceslime.com"
      seed={generateSeed(
        roomName,
        convertPuzzleAndCiviliansToString(puzzle, startingCivilians),
      )}
      className="textButton"
      buttonText="Share"
      origin="custom won"
    ></Share>
  );

  return (
    <div id="exitButtons">
      {shareButton}
      {editButton}
      {returnToMapButton}
    </div>
  );
}

function Game({
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
  audioRef,
}) {
  const {gameState, dispatchGameState, allGamePaths, calculatingGamePaths} =
    useGameContext();

  const {hintsRemaining, setHintsRemaining} = useShareContext();

  const {savedCustomBuilds, dispatchBuilderState} = useBuilderContext();

  const customIndex = gameState.isCustom
    ? gameState.customIndex ?? savedCustomBuilds.length
    : undefined;

  const path = gameState.path;
  const lastIndexInPath = path[path.length - 1];
  const currentCivilians =
    gameState.civilianHistory[gameState.civilianHistory.length - 1];
  const exitUnlocked = exitUnlockedQ({
    numberCount: gameState.numberCount,
    maxNumber: gameState.maxNumber,
    currentCivilians,
    puzzle: gameState.puzzle,
    powerCount: gameState.powerCount,
  });

  const [currentMessage, setCurrentMessage] = React.useState(
    gameState.puzzle[lastIndexInPath] === features.exit ||
      gameState.puzzle[lastIndexInPath] === features.ship
      ? gameState.winText
      : gameState.startingText,
  );

  const [currentBotMood, setCurrentBotMood] = React.useState(
    gameState.puzzle[lastIndexInPath] === features.exit ||
      gameState.puzzle[lastIndexInPath] === features.ship
      ? gameState.robotEndMood
      : gameState.robotStartMood,
  );

  const [hintWaitIsOver, setHintWaitIsOver] = React.useState(false);
  const hintWaitTime = 6; // seconds

  const [hintIndex, setHintIndex] = React.useState(undefined);

  const directions = getSlimeDirections({
    path,
    puzzle: gameState.puzzle,
    numColumns: numColumns,
    numRows: numRows,
  });
  const isInPortal = gameState.puzzle[lastIndexInPath] === features.portal;
  const squares = gameState.puzzle.map((feature, index) => (
    <PuzzleSquare
      key={index}
      feature={feature}
      index={index}
      visited={path.includes(index) && lastIndexInPath !== index}
      current={lastIndexInPath === index}
      exitUnlocked={exitUnlocked}
      direction={directions[index]}
      setDisplay={setDisplay}
      setHintWaitIsOver={setHintWaitIsOver}
      setCurrentMessage={setCurrentMessage}
      setCurrentBotMood={setCurrentBotMood}
      setHintIndex={setHintIndex}
      hintIndex={hintIndex}
      hasCivilian={currentCivilians.includes(index)}
      isInPortal={isInPortal}
      nextNumber={gameState.numberCount + 1}
    ></PuzzleSquare>
  ));

  const powers = Array.from({length: gameState.powerCount}, (_, index) => (
    <button
      key={index}
      className="feature power"
      onClick={() => setDisplay("powerExplanation")}
    ></button>
  ));

  const keys = Array.from({length: gameState.keyCount}, (_, index) => (
    <button
      key={index}
      className="feature key"
      onClick={() => setDisplay("keyExplanation")}
    ></button>
  ));

  const blasters = Array.from({length: gameState.blasterCount}, (_, index) => (
    <button
      key={index}
      className="feature blaster"
      onClick={() => setDisplay("blasterExplanation")}
    ></button>
  ));

  const isAtExit =
    gameState.puzzle[lastIndexInPath] === features.exit ||
    gameState.puzzle[lastIndexInPath] === features.ship;

  const isAtStart = gameState.puzzle[lastIndexInPath] === features.start;

  // Change setHintWaitIsOver to true if the path is unchanged for some time
  React.useEffect(() => {
    let timeout;
    if (
      !calculatingGamePaths &&
      gameState.robotStartMood !== "gloating" &&
      !hintWaitIsOver &&
      !isAtExit &&
      !isAtStart &&
      (navigator.canShare || hintsRemaining)
    ) {
      timeout = setTimeout(() => {
        setHintWaitIsOver(true);
        const hintMessage =
          gameState.robotStartMood === "sinister"
            ? "Argh. My programming compels me to help you. Tap me to get a hint."
            : "Tap me to get a hint!";
        // <br> elements to get the spacing to work when starting text is <p>
        setCurrentMessage(
          <>
            {hintMessage}
            <br></br>
            <br></br>
            {gameState.startingText}
          </>,
        );
      }, hintWaitTime * 1000);
    }
    return () => clearTimeout(timeout);
  }, [
    gameState.path,
    hintWaitIsOver,
    isAtExit,
    isAtStart,
    hintsRemaining,
    gameState.robotStartMood,
    calculatingGamePaths,
    gameState.startingText,
  ]);

  const isTimeToShowAHint =
    gameState.robotStartMood !== "gloating" &&
    hintWaitIsOver &&
    !calculatingGamePaths &&
    !isAtExit &&
    !isAtStart &&
    hintIndex === undefined;

  return (
    <div id="game" onMouseUp={() => handleMouseUp(dispatchGameState)}>
      <ControlBar
        setDisplay={setDisplay}
        setInstallPromptEvent={setInstallPromptEvent}
        showInstallButton={showInstallButton}
        installPromptEvent={installPromptEvent}
        audioRef={audioRef}
      ></ControlBar>

      <div id="location">{`${gameState.station}: ${gameState.roomName}`}</div>

      <div
        id="botFace"
        className={`${currentBotMood}${isTimeToShowAHint ? " idea" : ""}`}
        onClick={
          isTimeToShowAHint && hintsRemaining
            ? () => {
                const [newPath, hint] = getHint(path, allGamePaths);
                setHintIndex(hint);
                if (!arraysMatchQ(newPath, path)) {
                  dispatchGameState({action: "overwritePath", newPath});
                }
                setCurrentMessage("I think you should go here.");
                setCurrentBotMood("happy");
                setHintsRemaining(hintsRemaining - 1);
              }
            : null
        }
      ></div>

      {isTimeToShowAHint && !hintsRemaining && navigator.canShare ? (
        <div id="message">
          {
            "Share with a new person to get 5 more hints!\n\n(We don't track who you share with, but we hope you help us spread the game like slime across the galaxy.)\n\n"
          }
          <Share
            appName="Deep Space Slime"
            text="Check out this maze puzzle!"
            url="https://deepspaceslime.com"
            buttonText="Share"
            id="sharePrompt"
            className="textButton"
            origin="hints"
          ></Share>
        </div>
      ) : (
        // Use the message as the key to force the text to scroll back to the top upon rerender
        <div id="message" key={currentMessage}>
          {currentMessage}
        </div>
      )}

      {isAtExit ? (
        gameState.isCustom ? (
          <CustomPuzzleSolvedButtons
            puzzle={gameState.puzzle}
            startingCivilians={gameState.civilianHistory[0]}
            setDisplay={setDisplay}
            roomName={gameState.roomName}
            dispatchBuilderState={dispatchBuilderState}
            customIndex={customIndex}
          ></CustomPuzzleSolvedButtons>
        ) : (
          <PuzzleSolvedButtons
            puzzleID={gameState.puzzleID}
            dispatchGameState={dispatchGameState}
            setHintWaitIsOver={setHintWaitIsOver}
            setCurrentMessage={setCurrentMessage}
            setCurrentBotMood={setCurrentBotMood}
            setDisplay={setDisplay}
          ></PuzzleSolvedButtons>
        )
      ) : (
        <div id="acquiredFeatures">
          {powers}
          {keys}
          {blasters}
        </div>
      )}

      <div id="puzzle">{squares}</div>
    </div>
  );
}

export default Game;
