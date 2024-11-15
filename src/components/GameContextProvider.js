import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import React from "react";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import {parseUrlQuery} from "../logic/parseUrlQuery";
import {numColumns, numRows} from "../logic/constants";

const GameContext = createContext();

export function GameContextProvider({children}) {
  const customSeed = parseUrlQuery();

  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    {
      customSeed,
      isCustom: Boolean(customSeed),
      useSaved: customSeed ? false : undefined,
    },
    gameInit,
  );
  React.useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(gameState),
    );
  }, [gameState]);

  const maxPathsToFind = 100;
  const [allGamePaths, setAllGamePaths] = React.useState([]);
  const [calculatingGamePaths, setCalculatingGamePaths] = React.useState(true);
  React.useEffect(() => {
    console.log("CALCULATING game paths");

    setCalculatingGamePaths(true);

    // Use a worker instead of async to make sure that this isn't blocking
    const worker = new Worker(
      new URL("./getAllValidPathsWorker.js", import.meta.url),
    );

    worker.postMessage({
      puzzle: gameState.puzzle,
      numColumns,
      numRows,
      maxPathsToFind,
    });

    worker.onmessage = (event) => {
      setAllGamePaths(event.data);
      setCalculatingGamePaths(false);
      console.log(
        `DONE CALCULATING game paths. Found ${event.data.length} paths.`,
      );
    };

    return () => {
      console.log("terminating game path calculation");
      worker.terminate();
    };
  }, [gameState.puzzle]);

  const savedScore = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedScore"),
  );
  const [score, setScore] = useState(savedScore || []);
  useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedScore",
      JSON.stringify(score),
    );
  }, [score]);

  const savedHintsRemaining = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedHintsRemaining"),
  );
  const [hintsRemaining, setHintsRemaining] = useState(
    savedHintsRemaining ?? 5,
  );
  useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedHintsRemaining",
      JSON.stringify(hintsRemaining),
    );
  }, [hintsRemaining]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        dispatchGameState,
        score,
        setScore,
        hintsRemaining,
        setHintsRemaining,
        allGamePaths,
        calculatingGamePaths,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}
