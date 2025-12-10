import React from "react";
import {convertPuzzleToString} from "../logic/convertPuzzleString";
import {generateSeed} from "../logic/generateSeed";
import {unlimitedFeatures} from "../logic/constants";
import {useBuilderContext} from "./BuilderContextProvider";
import {useGameContext} from "./GameContextProvider";
import Share from "./Share";

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
  const {
    builderState,
    dispatchBuilderState,
    calculatingBuilderPaths,
    allBuilderPaths,
  } = useBuilderContext();

  const {dispatchGameState} = useGameContext();

  const featureButtons = [
    ...unlimitedFeatures,
    ...builderState.remainingLimitedFeatures,
  ].map((feature, index) => {
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
  });

  const squares = builderState.puzzleWithCivilians.map((feature, index) => (
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

      <div id="message">
        {calculatingBuilderPaths ? (
          <p>
            {`I'm calculating the solutions...`} Click the{" "}
            <span id="cancelIcon" className="smallInfoIcon"></span> to cancel.
          </p>
        ) : builderState.isValid && allBuilderPaths.length === 0 ? (
          "I don't think your puzzle has a solution!"
        ) : (
          builderState.message
        )}
      </div>
      <div id="builderButtons">
        {calculatingBuilderPaths ? (
          <button
            id="cancelIcon"
            className="controlButton"
            onClick={() => dispatchBuilderState({action: "cancelValidation"})}
          ></button>
        ) : (
          <button
            id="validateIcon"
            className="controlButton"
            onClick={() => dispatchBuilderState({action: "validate"})}
          ></button>
        )}
        <button
          id="playIcon"
          className="controlButton"
          disabled={!builderState.isValid || allBuilderPaths.length === 0}
          onClick={() => {
            const encodedPuzzle = convertPuzzleToString(
              builderState.puzzleWithCivilians,
            );
            dispatchGameState({
              action: "playtestCustom",
              customSeed: generateSeed(builderState.roomName, encodedPuzzle),
              customIndex: builderState.customIndex,
            });
            setDisplay("game");
          }}
        ></button>

        {builderState.isValid && allBuilderPaths.length > 0 ? (
          navigator.canShare ? (
            <Share
              appName="Deep Space Slime"
              text="I created this custom Deep Space Slime puzzle. Give it a try!"
              url="https://deepspaceslime.com"
              seed={generateSeed(
                builderState.roomName,
                convertPuzzleToString(builderState.puzzleWithCivilians),
              )}
              id="shareIcon"
              className="controlButton"
              buttonText=""
              origin="builder"
            ></Share>
          ) : (
            <button
              id="shareIcon"
              className="controlButton"
              onClick={() => {
                setDisplay("customShare");
              }}
            ></button>
          )
        ) : (
          <button
            id="shareIcon"
            className="controlButton"
            disabled={true}
          ></button>
        )}

        <button
          id="eyeIcon"
          disabled={!builderState.isValid}
          className="controlButton"
          onClick={() => setDisplay("builderPathfinder")}
        ></button>

        <button
          id="returnIcon"
          className="controlButton"
          onClick={() => setDisplay("builderOverview")}
        ></button>
      </div>

      <div id="puzzle">{squares}</div>

      <div id="builderFeatureButtons">{featureButtons}</div>
    </div>
  );
}
