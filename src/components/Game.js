import React from "react";
import ControlBar from "./ControlBar";
import {puzzles} from "../logic/puzzles";
import {getSlimeDirections} from "../logic/getSlimeDirection";
import {generateSeed} from "../logic/generateSeed";
import {
  convertPuzzleAndCiviliansToPuzzle,
  convertPuzzleAndCiviliansToString,
} from "../logic/convertPuzzleString";
import {
  features,
  numColumns,
  numRows,
  mapTypes,
  firstPuzzle,
} from "../logic/constants";
import Share from "./Share";
import {useGameContext} from "./GameContextProvider";
import {useBuilderContext} from "./BuilderContextProvider";
import {useShareContext} from "./ShareContextProvider";
import {getReasonForMoveInvalidity} from "../logic/getReasonForMoveInvalidity";
import {getHint} from "../logic/getHint";
import {arraysMatchQ} from "../common/arraysMatchQ";
import {
  getMaxFlaskCount,
  getMaxFlaskCountForCampaign,
  getCollectedFlaskCount,
} from "../logic/getMaxFlaskCount";
import {exitUnlockedQ} from "../logic/exitUnlockedQ";

function handleMovement({
  validNext,
  index,
  gameState,
  setCurrentMessage,
  setHintWaitIsOver,
  setHintIndex,
  score,
  setScore,
  dispatchGameState,
}) {
  if (validNext) {
    const isMovingToExit =
      gameState.puzzle[index] === features.exit ||
      gameState.puzzle[index] === features.ship;

    if (isMovingToExit) {
      let newScore = {...score};
      newScore[gameState.puzzleID] = gameState.flaskCount;
      setScore(newScore);
    }

    let newMessage;
    if (isMovingToExit) {
      const nextPuzzleID = puzzles[gameState.puzzleID]?.nextPuzzle;

      const currentPuzzleIsCampaign =
        puzzles[gameState.puzzleID]?.type === mapTypes.campaign;

      const nextPuzzleIsCampaign =
        nextPuzzleID in puzzles &&
        currentPuzzleIsCampaign &&
        puzzles[nextPuzzleID].type === mapTypes.campaign;

      const isAtEndOfCampaign =
        currentPuzzleIsCampaign && !nextPuzzleIsCampaign;

      const maxFlasks = getMaxFlaskCount(gameState.puzzle);
      if (isAtEndOfCampaign) {
        const collectedFlaskCount = getCollectedFlaskCount(score);
        const maxFlaskCountForCampaign =
          getMaxFlaskCountForCampaign(firstPuzzle);

        newMessage = (
          <p>
            <p>
              You collected {collectedFlaskCount} out of{" "}
              {maxFlaskCountForCampaign}{" "}
              <span id="flaskIcon" className="smallInfoIcon"></span> and
              unlocked bonus levels! Tap on the{" "}
              <span id="mapIcon" className="smallInfoIcon"></span> to open the
              bonus levels
              {collectedFlaskCount < maxFlaskCountForCampaign ? (
                <span>
                  {" "}
                  or to revisit levels and collect all{" "}
                  <span id="flaskIcon" className="smallInfoIcon"></span>
                </span>
              ) : (
                ""
              )}
              .
            </p>
            <p>
              Tap <strong>Share</strong> below to help spread the game! Follow
              us to learn about new level releases.
            </p>
            <p>{gameState.winText}</p>
          </p>
        );
      } else if (gameState.flaskCount < maxFlasks && gameState.hintText) {
        newMessage = gameState.hintText;
      } else {
        newMessage = gameState.winText;
      }
    } else {
      newMessage = gameState.startingText;
    }
    setCurrentMessage(newMessage);

    dispatchGameState({
      action: "modifyPath",
      index,
    });
  } else {
    const currentIndex = gameState.mainPath[gameState.mainPath.length - 1];
    const isCurrentlyAtExit =
      gameState.puzzle[currentIndex] === features.exit ||
      gameState.puzzle[currentIndex] === features.ship;

    if (!isCurrentlyAtExit) {
      const errorMessage = getReasonForMoveInvalidity({
        index,
        currentGameState: gameState,
      });
      setCurrentMessage(errorMessage);
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
  setHintWaitIsOver,
  setHintIndex,
  score,
  setScore,
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
        setHintWaitIsOver,
        setHintIndex,
        score,
        setScore,
        dispatchGameState,
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
  setHintWaitIsOver,
  setHintIndex,
  score,
  setScore,
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
      setHintWaitIsOver,
      setHintIndex,
      score,
      setScore,
      dispatchGameState,
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
  hasCivilian,
}) {
  const {gameState, dispatchGameState, score, setScore} = useGameContext();

  const {mouseIsActive, mainPath, validNextIndexes} = gameState;

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
      } ${hasCivilian ? "civilian" : ""}`}
      {...(feature !== features.outer && {
        onPointerDown: (event) => {
          handlePointerDown({
            event,
            index,
            dispatchGameState,
            confirmReset: feature === features.start && mainPath.length > 2,
            setDisplay,
            validNext,
            gameState,
            setCurrentMessage,
            setHintWaitIsOver,
            setHintIndex,
            score,
            setScore,
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
              confirmReset: feature === features.start && mainPath.length > 2,
              setDisplay,
              mouseIsActive,
              validNext,
              gameState,
              setCurrentMessage,
              setHintWaitIsOver,
              setHintIndex,
              score,
              setScore,
            });
          },
        })}
    ></div>
  );
}

function PuzzleSolvedButtons({
  puzzle,
  flaskCount,
  puzzleID,
  dispatchGameState,
  setHintWaitIsOver,
  setCurrentMessage,
  score,
}) {
  const maxFlasks = getMaxFlaskCount(puzzle);

  const nextPuzzleID = puzzles[puzzleID]?.nextPuzzle;

  const nextPuzzleExists = nextPuzzleID in puzzles;

  const currentPuzzleIsCampaign = puzzles[puzzleID].type === mapTypes.campaign;

  const nextPuzzleIsCampaign =
    nextPuzzleExists &&
    currentPuzzleIsCampaign &&
    puzzles[nextPuzzleID].type === mapTypes.campaign;

  const isAtEndOfCampaign = currentPuzzleIsCampaign && !nextPuzzleIsCampaign;

  const shareButton = isAtEndOfCampaign ? (
    <Share
      appName="Deep Space Slime"
      text={`I beat Deep Space Slime and collected ${getCollectedFlaskCount(
        score,
      )} out of ${getMaxFlaskCountForCampaign(
        firstPuzzle,
      )} samples! Try it out:`}
      url="https://deepspaceslime.com"
      buttonText="Share"
      className="textButton"
    ></Share>
  ) : (
    <></>
  );

  const nextLevelButton = nextPuzzleExists ? (
    <button
      className="textButton"
      onClick={() => {
        setHintWaitIsOver(false);
        setCurrentMessage(puzzles[nextPuzzleID].startingText);
        dispatchGameState({action: "newGame", puzzleID: nextPuzzleID});
      }}
    >
      {isAtEndOfCampaign ? "Bonus Level" : "Next Level"}
    </button>
  ) : (
    <></>
  );

  const followButton = isAtEndOfCampaign ? (
    <a
      className="textButton"
      id="buttonLink"
      href="https://www.patreon.com/skedwards88"
    >
      Follow
    </a>
  ) : (
    <></>
  );

  const retryButton =
    flaskCount < maxFlasks ? (
      <button
        className="textButton"
        onClick={() => {
          setCurrentMessage(puzzles[puzzleID].startingText);
          dispatchGameState({action: "newGame", puzzleID});
        }}
      >
        Retry Level
      </button>
    ) : (
      <></>
    );

  return (
    <div id="exitButtons">
      {nextLevelButton}
      {shareButton}
      {followButton}
      {retryButton}
    </div>
  );
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
}) {
  const {
    gameState,
    dispatchGameState,
    allGamePaths,
    calculatingGamePaths,
    score,
  } = useGameContext();

  const {hintsRemaining, setHintsRemaining} = useShareContext();

  const {savedCustomBuilds, dispatchBuilderState} = useBuilderContext();

  const customIndex = gameState.isCustom
    ? gameState.customIndex ?? savedCustomBuilds.length
    : undefined;

  const mainPath = gameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const currentCivilians =
    gameState.civilianHistory[gameState.civilianHistory.length - 1];
  const exitUnlocked = exitUnlockedQ({
    numberCount: gameState.numberCount,
    maxNumber: gameState.maxNumber,
    currentCivilians,
    puzzle: gameState.puzzle,
    flaskCount: gameState.flaskCount,
  });

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
      hasCivilian={currentCivilians.includes(index)}
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
      !calculatingGamePaths &&
      gameState.robotStartMood !== "sinister" &&
      !hintWaitIsOver &&
      !isAtExit &&
      (navigator.canShare || hintsRemaining)
    ) {
      timeout = setTimeout(() => {
        setHintWaitIsOver(true);
        setCurrentMessage(`Tap me to get a hint!\n\n${gameState.startingText}`);
      }, hintWaitTime * 1000);
    }
    return () => clearTimeout(timeout);
  }, [
    gameState.mainPath,
    hintWaitIsOver,
    isAtExit,
    hintsRemaining,
    gameState.robotStartMood,
    calculatingGamePaths,
    gameState.startingText,
  ]);

  const isTimeToShowAHint =
    gameState.robotStartMood !== "sinister" &&
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
          ></Share>
        </div>
      ) : (
        <div id="message">{currentMessage}</div>
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
            puzzle={gameState.puzzle}
            flaskCount={gameState.flaskCount}
            puzzleID={gameState.puzzleID}
            dispatchGameState={dispatchGameState}
            setHintWaitIsOver={setHintWaitIsOver}
            setCurrentMessage={setCurrentMessage}
            score={score}
          ></PuzzleSolvedButtons>
        )
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
