import React from "react";
import Game from "./Game";
import Map from "./Map";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import {puzzles} from "../logic/puzzles";

export default function App() {
  const [display, setDisplay] = React.useState("game");

  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  // TODO update values passed to inits
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
    default:
      return (
        <div className="App" id="deep-space-slime">
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            score={score}
            setScore={setScore}
            setDisplay={setDisplay}
          ></Game>
        </div>
      );
  }
}
