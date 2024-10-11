import React from "react";

function handlePointerDown({event, index, dispatchBuilderState}) {
  // Release pointer capture so that pointer events can fire on other elements
  event.target.releasePointerCapture(event.pointerId);

  if (event.pointerType === "mouse") {
    dispatchBuilderState({action: "setMouseIsActive", mouseIsActive: true});
    dispatchBuilderState({
      action: "modifyPuzzle",
      isMouse: true,
      index,
    });
  }
}

function handleMouseUp(dispatchBuilderState) {
  dispatchBuilderState({action: "setMouseIsActive", mouseIsActive: false});
}

function handlePointerEnter({event, index, dispatchBuilderState}) {
  event.preventDefault();
  dispatchBuilderState({
    action: "modifyPuzzle",
    isMouse: event.pointerType === "mouse",
    index,
  });
}

function CustomSquare({feature, index, dispatchBuilderState}) {
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
        handlePointerDown({event, index, dispatchBuilderState})
      }
      onMouseUp={() => handleMouseUp(dispatchBuilderState)}
      onPointerEnter={(event) => {
        handlePointerEnter({event, index, dispatchBuilderState});
      }}
    ></div>
  );
}

export default function Builder({
  setDisplay,
  builderState,
  dispatchBuilderState,
}) {
  const unlimitedFeatures = [
    "outer",
    "basic",
    "flask",
    "jet",
    "portal",
    "key",
    "door",
  ];

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
    (feature, index) => (
      <button
        key={index}
        className={`builderFeatureButton ${feature}`}
        onClick={() =>
          dispatchBuilderState({action: "selectFeature", newFeature: feature})
        }
      ></button>
    ),
  );

  const squares = builderState.puzzle.map((feature, index) => (
    <CustomSquare
      key={index}
      feature={feature}
      index={index}
      dispatchBuilderState={dispatchBuilderState}
    ></CustomSquare>
  ));

  return (
    <div
      className="App info"
      id="builder"
      onMouseUp={() => handleMouseUp(dispatchBuilderState)}
    >
      <div id="botFace" className="happy"></div>

      <div id="message">{builderState.message}</div>

      <div id="builderButtons">
        <button>V</button>
        <button>P</button>
        <button>S</button>
        <button>V</button>
        <button>X</button>
      </div>

      <div id="puzzle">{squares}</div>

      <div id="builderFeatureButtons">
        {unlimitedFeatureButtons}
        {limitedFeatureButtons}
      </div>
    </div>
  );
}
