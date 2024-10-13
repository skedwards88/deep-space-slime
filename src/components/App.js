import React from "react";
import Game from "./Game";
import Map from "./Map";
import Heart from "./Heart";
import Builder from "./Builder";
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
import {builderInit} from "../logic/builderInit";
import {builderReducer} from "../logic/builderReducer";
import Pathfinder from "./Pathfinder";
import {parseUrlQuery} from "../logic/parseUrlQuery";

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

  const [builderState, dispatchBuilderState] = React.useReducer(
    builderReducer,
    {},
    builderInit,
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
        <Pathfinder gameState={gameState} setDisplay={setDisplay}></Pathfinder>
      );

    case "builder":
      return (
        <Builder
          builderState={builderState}
          dispatchBuilderState={dispatchBuilderState}
          setDisplay={setDisplay}
        ></Builder>
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
