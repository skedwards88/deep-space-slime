import React from "react";
import {convertStringToPuzzle} from "../logic/convertPuzzleString";

function BuilderEntry({
  encodedPuzzle,
  name,
  index,
  dispatchBuilderState,
  dispatchGameState,
  setDisplay,
  setSavedCustomBuilds,
  savedCustomBuilds,
}) {
  return (
    <div className="builderEntry">
      <div>{name}</div>
      <button
        id="copyIcon"
        className="controlButton"
        disabled={savedCustomBuilds.length >= 100}
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
          const puzzle = convertStringToPuzzle(encodedPuzzle);
          dispatchBuilderState({
            action: "editCustom",
            puzzle,
            name,
            savedIndex: index,
          });
          setDisplay("builder");
        }}
      ></button>

      <button
        id="playIcon"
        className="controlButton"
        onClick={() => {
          dispatchGameState({
            action: "playtestCustom",
            customSeed: `${name}-${encodedPuzzle}`,
          });
          setDisplay("game");
        }}
      ></button>

      {/* todo can only share if valid? */}
      {/* todo action */}
      <button id="shareIcon" className="controlButton"></button>

      <button
        id="trashIcon"
        className="controlButton"
        onClick={() => {
          let newSavedBuilds = savedCustomBuilds.slice();
          newSavedBuilds.splice(index, 1);
          setSavedCustomBuilds(newSavedBuilds);
        }}
      ></button>
    </div>
  );
}

export default function BuilderOverview({
  setDisplay,
  dispatchBuilderState,
  dispatchGameState,
  savedCustomBuilds,
  setSavedCustomBuilds,
}) {
  const entryElements = savedCustomBuilds.map(
    ([name, encodedPuzzle], index) => (
      <BuilderEntry
        encodedPuzzle={encodedPuzzle}
        name={name}
        index={index}
        key={index}
        dispatchBuilderState={dispatchBuilderState}
        dispatchGameState={dispatchGameState}
        setDisplay={setDisplay}
        setSavedCustomBuilds={setSavedCustomBuilds}
        savedCustomBuilds={savedCustomBuilds}
      ></BuilderEntry>
    ),
  );

  return (
    <div className="App info" id="builderOverview">
      <div id="botCommunication">
        <div id="botFace" className="happy"></div>

        <div id="message">
          TODO Here are all of your custom puzzles. You can create up to TODO
          custom puzzles.
        </div>
      </div>
      <button
        disabled={savedCustomBuilds.length >= 100}
        onClick={() => {
          dispatchBuilderState({
            action: "newCustom",
            savedIndex: savedCustomBuilds.length,
          });
          setDisplay("builder");
        }}
      >
        New custom puzzle
      </button>

      <button onClick={() => setDisplay("game")}>Return to game</button>

      {entryElements}
    </div>
  );
}
