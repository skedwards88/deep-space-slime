import React from "react";
import {convertStringToPuzzle} from "../logic/convertPuzzleString";

function BuilderEntry({
  encodedPuzzle,
  index,
  dispatchBuilderState,
  dispatchGameState,
  setDisplay,
}) {
  return (
    <div className="builderEntry">
      <div>{index}</div>
      {/* todo action */}
      <button id="copyIcon" className="controlButton"></button>

      <button
        id="editIcon"
        className="controlButton"
        onClick={() => {
          const puzzle = convertStringToPuzzle(encodedPuzzle);
          dispatchBuilderState({action: "newCustom", puzzle});
          setDisplay("builder");
        }}
      ></button>

      <button
        id="playIcon"
        className="controlButton"
        onClick={() => {
          dispatchGameState({
            action: "playtestCustom",
            customSeed: encodedPuzzle,
          });
          setDisplay("game");
        }}
      ></button>

      {/* todo can only share if valid? */}
      {/* todo action */}
      <button id="shareIcon" className="controlButton"></button>

      {/* todo action */}
      <button id="trashIcon" className="controlButton"></button>
    </div>
  );
}

export default function BuilderOverview({
  setDisplay,
  builderState,
  dispatchBuilderState,
  dispatchGameState,
}) {
  // todo need to store this. just a list of encodedpuzzle+name. in custom builder, display name and make editable.
  const entries = [
    "EBBSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
    "EFBSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
  ].map((encodedPuzzle, index) => (
    <BuilderEntry
      encodedPuzzle={encodedPuzzle}
      index={index}
      key={index}
      dispatchBuilderState={dispatchBuilderState}
      dispatchGameState={dispatchGameState}
      setDisplay={setDisplay}
    ></BuilderEntry>
  ));

  return (
    <div className="App info" id="builderOverview">
      <div id="botCommunication">
        <div id="botFace" className="happy"></div>

        <div id="message">
          TODO Here are all of your custom puzzles. You can create up to TODO
          custom puzzles.
        </div>
      </div>
      <button onClick={() => setDisplay("builder")}>New custom puzzle</button>

      <button onClick={() => setDisplay("game")}>Return to game</button>

      {entries}
    </div>
  );
}
