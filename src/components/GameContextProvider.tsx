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
import {puzzles} from "../logic/puzzles";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";

const GameContext = createContext();

export function GameContextProvider({children}) {
  const {userId, sessionId} = useMetadataContext();

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
  const [gamePathCalculationStatus, setGamePathCalculationStatus] =
    React.useState("idle"); // idle | calculating | done

  React.useEffect(() => {
    console.log("CALCULATING game paths");

    setGamePathCalculationStatus("calculating");

    // Use a worker instead of async to make sure that this isn't blocking
    const worker = new Worker(
      new URL("./getAllValidPathsWorker.js", import.meta.url),
    );

    worker.postMessage({
      puzzle: gameState.puzzle,
      startingCivilians: gameState.civilianHistory[0],
      numColumns,
      numRows,
      maxPathsToFind,
    });

    worker.onmessage = (event) => {
      setAllGamePaths(event.data);
      setGamePathCalculationStatus("done");
      console.log(
        `DONE CALCULATING game paths. Found ${event.data.length} paths.`,
      );
    };

    return () => {
      console.log("terminating game path calculation");
      setGamePathCalculationStatus("done");
      worker.terminate();
    };
  }, [gameState.puzzle]);

  const savedCompletedLevels = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedCompletedLevels"),
  );

  const [completedLevels, setCompletedLevels] = useState(
    savedCompletedLevels || [],
  );

  // Store the previous state so that we can infer which analytics events to send
  const previousCompletedLevelsRef = React.useRef(completedLevels);

  useEffect(() => {
    // Send analytics about any newly completed levels
    const previousCompletedLevels = previousCompletedLevelsRef.current;

    const diffLevels = completedLevels.filter(
      (level) => !previousCompletedLevels.includes(level),
    );

    if (diffLevels.length) {
      const analyticsToLog = diffLevels.map((level) => ({
        eventName: "level_complete",
        eventInfo: {level},
      }));
      sendAnalyticsCF({userId, sessionId, analyticsToLog});
    }

    previousCompletedLevelsRef.current = completedLevels;

    // Save the progress locally
    // Before saving, purge any obsolete levels
    let purgedCompletedLevels = [];

    const validLevels = Object.keys(puzzles);

    for (const level of completedLevels) {
      if (validLevels.includes(level)) {
        purgedCompletedLevels.push(level);
      }
    }

    window.localStorage.setItem(
      "deepSpaceSlimeSavedCompletedLevels",
      JSON.stringify(purgedCompletedLevels),
    );
    // Intentionally excluding sessionId, userId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedLevels]);

  useEffect(() => {
    sendAnalyticsCF({
      userId,
      sessionId,
      analyticsToLog: [
        {
          eventName: "level_started",
          eventInfo: {level: gameState.puzzleID},
        },
      ],
    });
    // Intentionally excluding sessionId, userId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.puzzleID]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        dispatchGameState,
        completedLevels,
        setCompletedLevels,
        allGamePaths,
        gamePathCalculationStatus,
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
