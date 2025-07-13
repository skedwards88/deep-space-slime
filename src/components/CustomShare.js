import React from "react";
import {convertPuzzleToString} from "../logic/convertPuzzleString";
import {generateSeed} from "../logic/generateSeed";
import {useBuilderContext} from "./BuilderContextProvider";
import {useShareContext} from "./ShareContextProvider";

export default function CustomShare({setDisplay}) {
  const {
    builderState: {roomName, puzzleWithCivilians},
  } = useBuilderContext();

  const {setHintsRemaining, maxHints} = useShareContext();

  const encodedPuzzle = convertPuzzleToString(puzzleWithCivilians);
  const customSeed = generateSeed(roomName, encodedPuzzle);

  const link = `https://deepspaceslime.com?id=${customSeed}`;

  return (
    <div className="App customMessage">
      <div>{`Share your custom puzzle with this link!`}</div>
      <a href={link}>{link}</a>
      <div id="custom-message-buttons">
        <button
          className="textButton"
          onClick={() => {
            try {
              setHintsRemaining(maxHints);
              navigator.clipboard.writeText(link);
            } catch (error) {
              console.log("Error copying", error);
            }
          }}
        >
          Copy
        </button>
        <button
          className="textButton"
          onClick={() => {
            setDisplay("builder");
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
