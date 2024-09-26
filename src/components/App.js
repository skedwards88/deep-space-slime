import React from "react";
import Game from "./Game";
import Map from "./Map";
import Heart from "./Heart";
import FallbackInstall from "./FallbackInstall";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import {puzzles} from "../logic/puzzles";

export default function App() {
  const [display, setDisplay] = React.useState("game");

  // Set up states that will be used by the handleAppInstalled and handleBeforeInstallPrompt listeners
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  const [score, setScore] = React.useState([]); // todo save and use saved

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

  switch (display) {
    case "map":
      return (
        <Map
          currentStation={puzzles[gameState.puzzleID].station}
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
