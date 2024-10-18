import React from "react";
import Game from "./Game";
import Map from "./Map";
import Heart from "./Heart";
import Builder from "./Builder";
import BuilderOverview from "./BuilderOverview";
import FallbackInstall from "./FallbackInstall";
import JetExplanation from "./JetExplanation";
import FlaskExplanation from "./FlaskExplanation";
import KeyExplanation from "./KeyExplanation";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import {builderReducer} from "../logic/builderReducer";
import Pathfinder from "./Pathfinder";
import CustomShare from "./CustomShare";
import {parseUrlQuery} from "../logic/parseUrlQuery";
import {convertPuzzleToString} from "../logic/convertPuzzleString";

export default function App() {
  const [display, setDisplay] = React.useState("game");

  const customSeed = parseUrlQuery();

  // Set up states that will be used by the handleAppInstalled and handleBeforeInstallPrompt listeners
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {
      customSeed,
      isCustom: Boolean(customSeed),
    },
    gameInit,
  );

  const presavedCustomBuilds = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedCustomBuilds"),
  );

  const [savedCustomBuilds, setSavedCustomBuilds] = React.useState(
    presavedCustomBuilds || [],
  );

  // Don't bother initializing the builderState to anything useful yet.
  // We need the dispatcher to pass to other components, but we won't ever use this initial state.
  // This feels sloppy to me, but I haven't thought of a better solution yet.
  const [builderState, dispatchBuilderState] = React.useReducer(
    builderReducer,
    {},
  );

  const savedScore = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedScore"),
  );
  const [score, setScore] = React.useState(savedScore || []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = (event) =>
      handleBeforeInstallPrompt(
        event,
        setInstallPromptEvent,
        setShowInstallButton,
      );

    window.addEventListener("beforeinstallprompt", listener);

    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = () =>
      handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);
    return () => window.removeEventListener("appinstalled", listener);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(gameState),
    );
  }, [gameState]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedScore",
      JSON.stringify(score),
    );
  }, [score]);

  React.useEffect(() => {
    const indexToUpdate = builderState.savedIndex;
    // The builderState gets initialized in this parent so that I can pass the dispatcher to various children, but the initialized state isn't actually used.
    // To prevent the blank initialized state from appearing in the list of saved puzzles, ignore updates where indexToUpdate is not defined.
    // This feels sloppy to me, but I haven't thought of a better solution yet.
    if (indexToUpdate === undefined) {
      return;
    }
    const encodedPuzzle = convertPuzzleToString(builderState.puzzle);
    let newSavedBuilds = savedCustomBuilds.slice();
    newSavedBuilds.splice(indexToUpdate, 1, [builderState.name, encodedPuzzle]);
    setSavedCustomBuilds(newSavedBuilds);
  }, [builderState.puzzle, builderState.name]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedCustomBuilds",
      JSON.stringify(savedCustomBuilds),
    );
  }, [savedCustomBuilds]);

  switch (display) {
    case "map":
      return (
        <Map
          currentStation={gameState.station}
          score={score}
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
        ></Map>
      );

    case "heart":
      return (
        <Heart
          setDisplay={setDisplay}
          appName="Deep Space Slime"
          shareText="Check out this maze puzzle!"
          repoName="deep-space-slime"
          url="https://skedwards88.github.io/deep-space-slime"
        />
      );

    case "fallbackInstall":
      return (
        <FallbackInstall
          setDisplay={setDisplay}
          appName="Deep Space Slime"
        ></FallbackInstall>
      );

    case "jetExplanation":
      return <JetExplanation setDisplay={setDisplay}></JetExplanation>;

    case "flaskExplanation":
      return <FlaskExplanation setDisplay={setDisplay}></FlaskExplanation>;

    case "keyExplanation":
      return <KeyExplanation setDisplay={setDisplay}></KeyExplanation>;

    case "pathfinder":
      return (
        <Pathfinder
          puzzle={gameState.puzzle}
          numRows={gameState.numRows}
          numColumns={gameState.numColumns}
          station={gameState.station}
          room={gameState.room}
          setDisplay={setDisplay}
        ></Pathfinder>
      );

    case "builderPathfinder":
      return (
        <Pathfinder
          puzzle={builderState.puzzle}
          numRows={builderState.numRows}
          numColumns={builderState.numColumns}
          station="Custom todo"
          room="todo"
          setDisplay={setDisplay}
        ></Pathfinder>
      );

    case "builder":
      return (
        <Builder
          builderState={builderState}
          dispatchBuilderState={dispatchBuilderState}
          dispatchGameState={dispatchGameState}
          setDisplay={setDisplay}
          savedCustomBuilds={savedCustomBuilds}
          setSavedCustomBuilds={setSavedCustomBuilds}
        ></Builder>
      );

    case "builderOverview":
      return (
        <BuilderOverview
          dispatchBuilderState={dispatchBuilderState}
          dispatchGameState={dispatchGameState}
          setDisplay={setDisplay}
          savedCustomBuilds={savedCustomBuilds}
          setSavedCustomBuilds={setSavedCustomBuilds}
        ></BuilderOverview>
      );

    case "customShare":
      return (
        <CustomShare
          puzzle={builderState.puzzle}
          setDisplay={setDisplay}
        ></CustomShare>
      );

    default:
      return (
        <div className="App" id="deep-space-slime">
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            score={score}
            setScore={setScore}
            setDisplay={setDisplay}
            setInstallPromptEvent={setInstallPromptEvent}
            showInstallButton={showInstallButton}
            installPromptEvent={installPromptEvent}
          ></Game>
        </div>
      );
  }
}
