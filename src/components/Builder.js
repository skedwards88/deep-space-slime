import React from "react";
import {convertPuzzleToString} from "../logic/convertPuzzleString";
import {handleShare} from "../common/handleShare";
import {generateSeed} from "../logic/generateSeed";
import {unlimitedFeatures} from "../logic/constants";
import {useBuilderContext} from "./BuilderContextProvider";
import {useGameContext} from "./GameContextProvider";

function handlePointerDown({event, index, feature, dispatchBuilderState}) {
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);

  if (event.pointerType === "mouse") {
    dispatchBuilderState({action: "setMouseIsActive", mouseIsActive: true});
    dispatchBuilderState({
      action: "modifyPuzzle",
      isMouse: true,
      index,
      replacedFeature: feature,
    });
  }
}

function handleMouseUp(dispatchBuilderState) {
  dispatchBuilderState({action: "setMouseIsActive", mouseIsActive: false});
}

function handlePointerEnter({event, index, feature, dispatchBuilderState}) {
  event.preventDefault();
  dispatchBuilderState({
    action: "modifyPuzzle",
    isMouse: event.pointerType === "mouse",
    index,
    replacedFeature: feature,
  });
}

function BuilderSquare({feature, index, dispatchBuilderState}) {
  let featureClass;
  if (Number.isInteger(Number.parseInt(feature))) {
    featureClass = `numbered number${feature}`;
  } else {
    featureClass = feature;
  }

  return (
    <div
      key={index}
      className={`puzzleSquare ${featureClass}`}
      onPointerDown={(event) =>
        handlePointerDown({event, index, feature, dispatchBuilderState})
      }
      onMouseUp={() => handleMouseUp(dispatchBuilderState)}
      onPointerEnter={(event) => {
        handlePointerEnter({event, index, feature, dispatchBuilderState});
      }}
    ></div>
  );
}

export default function Builder({setDisplay}) {
  const {builderState, dispatchBuilderState} = useBuilderContext();

  const {dispatchGameState} = useGameContext();

  const unlimitedFeatureButtons = unlimitedFeatures.map((feature, index) => (
    <button
      key={index}
      className={`builderFeatureButton ${feature}${
        feature === builderState.activeFeature ? " active" : ""
      }`}
      onClick={() =>
        dispatchBuilderState({action: "selectFeature", newFeature: feature})
      }
    ></button>
  ));

  const limitedFeatureButtons = builderState.remainingLimitedFeatures.map(
    (feature, index) => {
      let featureClass;
      if (Number.isInteger(Number.parseInt(feature))) {
        featureClass = `numbered number${feature}`;
      } else {
        featureClass = feature;
      }

      return (
        <button
          key={index}
          className={`builderFeatureButton ${featureClass}${
            feature === builderState.activeFeature ? " active" : ""
          }`}
          onClick={() =>
            dispatchBuilderState({action: "selectFeature", newFeature: feature})
          }
        ></button>
      );
    },
  );

  const squares = builderState.puzzle.map((feature, index) => (
    <BuilderSquare
      key={index}
      feature={feature}
      index={index}
      dispatchBuilderState={dispatchBuilderState}
    ></BuilderSquare>
  ));

  const [nameError, setNameError] = React.useState("");

  return (
    <div
      className="App info"
      id="builder"
      onMouseUp={() => handleMouseUp(dispatchBuilderState)}
    >
      <input
        id="location"
        name="customLocationInput"
        maxLength={15}
        value={builderState.roomName}
        onChange={(event) => {
          const validationRegex = new RegExp("^[a-zA-Z0-9- ]*$");
          if (validationRegex.test(event.target.value)) {
            dispatchBuilderState({
              action: "editName",
              roomName: event.target.value,
            });
            setNameError("");
          } else {
            setNameError("Only letters, numbers, and hyphens are allowed");
          }
        }}
      />

      <small id="locationError">{nameError}</small>
      <div id="botFace" className="happy"></div>

      <div id="message">{builderState.message}</div>

      <div id="builderButtons">
        <button
          id="validateIcon"
          className="controlButton"
          onClick={() => dispatchBuilderState({action: "validate"})}
        ></button>

        {builderState.isValid ? (
          <button
            id="playIcon"
            className="controlButton"
            onClick={() => {
              const encodedPuzzle = convertPuzzleToString(builderState.puzzle);
              dispatchGameState({
                action: "playtestCustom",
                customSeed: generateSeed(builderState.roomName, encodedPuzzle),
                customIndex: builderState.customIndex,
              });
              setDisplay("game");
            }}
          ></button>
        ) : (
          <></>
        )}

        {builderState.isValid ? (
          <button
            id="shareIcon"
            className="controlButton"
            onClick={() => {
              if (navigator.canShare) {
                const encodedPuzzle = convertPuzzleToString(
                  builderState.puzzle,
                );
                handleShare({
                  appName: "Deep Space Slime",
                  text: "I created this custom Deep Space Slime puzzle. Give it a try!",
                  url: "https://skedwards88.github.io/deep-space-slime",
                  seed: generateSeed(builderState.roomName, encodedPuzzle),
                });
              } else {
                setDisplay("customShare");
              }
            }}
          ></button>
        ) : (
          <></>
        )}

        {builderState.isValid ? (
          <button
            id="eyeIcon"
            className="controlButton"
            onClick={() => setDisplay("builderPathfinder")}
          ></button>
        ) : (
          <></>
        )}

        <button
          id="returnIcon"
          className="controlButton"
          onClick={() => setDisplay("builderOverview")}
        ></button>
      </div>

      <div id="puzzle">{squares}</div>

      <div id="builderFeatureButtons">
        {unlimitedFeatureButtons}
        {limitedFeatureButtons}
      </div>
    </div>
  );
}
