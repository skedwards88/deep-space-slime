import React from "react";
import {convertPuzzleToString} from "../logic/convertPuzzleString";
import {generateSeed} from "../logic/generateSeed";
import {useBuilderContext} from "./BuilderContextProvider";

export default function CustomShare({setDisplay}) {
  const {
    builderState: {roomName, puzzle},
  } = useBuilderContext();

  const encodedPuzzle = convertPuzzleToString(puzzle);
  const customSeed = generateSeed(roomName, encodedPuzzle);

  const link = `https://skedwards88.github.io/deep-space-slime?id=${customSeed}`;

  return (
    <div className="App customMessage">
      <div>{`Share your custom puzzle with this link!`}</div>
      <a href={link}>{link}</a>
      <div id="custom-message-buttons">
        <button
          onClick={() => {
            try {
              navigator.clipboard.writeText(link);
            } catch (error) {
              console.log("Error copying", error);
            }
          }}
        >
          Copy
        </button>
        <button
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
