import React from "react";
import {convertStringToPuzzle} from "../logic/convertPuzzleString";
import {validateCustomPuzzle} from "../logic/validateCustomPuzzle";
import {generateSeed} from "../logic/generateSeed";
import {numColumns, numRows} from "../logic/constants";
import {useBuilderContext} from "./BuilderContextProvider";
import {useGameContext} from "./GameContextProvider";
import {useShareContext} from "./ShareContextProvider";

function BuilderEntry({
  encodedPuzzle,
  roomName,
  index,
  dispatchBuilderState,
  dispatchGameState,
  setDisplay,
  setSavedCustomBuilds,
  savedCustomBuilds,
  setCustomBuildIndexToDelete,
}) {
  const {shareAndCapHints} = useShareContext();

  return (
    <div className="builderEntry">
      <div id="customName">{roomName}</div>
      <button
        id="copyIcon"
        className="controlButton"
        disabled={savedCustomBuilds.length >= 400}
        onClick={() => {
          let newSavedBuilds = savedCustomBuilds.slice();
          newSavedBuilds.splice(index, 0, savedCustomBuilds[index]);
          setSavedCustomBuilds(newSavedBuilds);
        }}
      ></button>

      <button
        id="editIcon"
        className="controlButton"
        onClick={() => {
          const puzzleWithCivilians = convertStringToPuzzle(encodedPuzzle);
          dispatchBuilderState({
            action: "editCustom",
            puzzleWithCivilians,
            roomName,
            customIndex: index,
          });
          setDisplay("builder");
        }}
      ></button>

      <button
        id="playIcon"
        className="controlButton"
        onClick={() => {
          // Check if valid
          const puzzleWithCivilians = convertStringToPuzzle(encodedPuzzle);
          const {isValid} = validateCustomPuzzle({
            puzzleWithCivilians,
            numColumns,
            numRows,
          });

          // If not valid, the player can't play
          if (!isValid) {
            setDisplay("invalidShareMessage");
          } else {
            dispatchGameState({
              action: "playtestCustom",
              customSeed: generateSeed(roomName, encodedPuzzle),
              customIndex: index,
            });
            setDisplay("game");
          }
        }}
      ></button>

      <button
        id="shareIcon"
        className="controlButton"
        onClick={() => {
          // Check if valid
          const puzzleWithCivilians = convertStringToPuzzle(encodedPuzzle);
          const {isValid} = validateCustomPuzzle({
            puzzleWithCivilians,
            numColumns,
            numRows,
          });
          // If not valid, the player can't share
          if (!isValid) {
            setDisplay("invalidShareMessage");
          } else {
            // If valid, allow share (or if can't share, show link to copy)
            if (navigator.canShare) {
              shareAndCapHints({
                appName: "Deep Space Slime",
                text: "I created this custom Deep Space Slime puzzle. Give it a try!",
                url: "https://deepspaceslime.com",
                seed: generateSeed(roomName, encodedPuzzle),
                origin: "builder overview",
              });
            } else {
              dispatchBuilderState({
                action: "editCustom",
                puzzleWithCivilians,
                roomName,
                customIndex: index,
              });
              setDisplay("customShare");
            }
          }
        }}
      ></button>

      <button
        id="trashIcon"
        className="controlButton"
        onClick={() => {
          setCustomBuildIndexToDelete(index);
          setDisplay("confirmDelete");
        }}
      ></button>
    </div>
  );
}

export default function BuilderOverview({setDisplay}) {
  const {
    dispatchBuilderState,
    savedCustomBuilds,
    setSavedCustomBuilds,
    setCustomBuildIndexToDelete,
  } = useBuilderContext();

  const {dispatchGameState} = useGameContext();

  const entryElements = savedCustomBuilds.map(
    ([roomName, encodedPuzzle], index) => (
      <BuilderEntry
        encodedPuzzle={encodedPuzzle}
        roomName={roomName}
        index={index}
        key={index}
        dispatchBuilderState={dispatchBuilderState}
        dispatchGameState={dispatchGameState}
        setDisplay={setDisplay}
        setSavedCustomBuilds={setSavedCustomBuilds}
        savedCustomBuilds={savedCustomBuilds}
        setCustomBuildIndexToDelete={setCustomBuildIndexToDelete}
      ></BuilderEntry>
    ),
  );

  return (
    <div className="App info" id="builderOverview">
      <div id="botCommunication">
        <div id="botFace" className="happy"></div>

        <div id="message">
          Here are all of your custom puzzles. You can create up to 400 custom
          puzzles.
        </div>
      </div>
      <button
        className="textButton"
        disabled={savedCustomBuilds.length >= 400}
        onClick={() => {
          dispatchBuilderState({
            action: "newCustom",
            customIndex: savedCustomBuilds.length,
          });
          setDisplay("builder");
        }}
      >
        New custom puzzle
      </button>

      <button className="textButton" onClick={() => setDisplay("game")}>
        Return to game
      </button>

      {entryElements}
    </div>
  );
}
