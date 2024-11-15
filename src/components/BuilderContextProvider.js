import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import React from "react";
import {builderReducer} from "../logic/builderReducer";
import {numColumns, numRows} from "../logic/constants";
import {convertPuzzleToString} from "../logic/convertPuzzleString";

const BuilderContext = createContext();

export function BuilderContextProvider({children}) {
  const presavedCustomBuilds = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedCustomBuilds"),
  );

  const [savedCustomBuilds, setSavedCustomBuilds] = useState(
    presavedCustomBuilds || [],
  );

  // Don't bother initializing the builderState to anything useful yet.
  // We need the dispatcher to pass to other components, but we won't ever use this initial state.
  // This feels sloppy to me, but I haven't thought of a better solution yet.
  const [builderState, dispatchBuilderState] = useReducer(builderReducer, {});

  const maxPathsToFind = 100;
  const [allBuilderPaths, setAllBuilderPaths] = useState([]);
  const [calculatingBuilderPaths, setCalculatingBuilderPaths] = useState(true);
  useEffect(() => {
    console.log("CALCULATING builder paths");

    if (!builderState.isValid) {
      console.log("Builder is invalid. Won't calculate.");
      return;
    }

    setCalculatingBuilderPaths(true);

    // Use a worker instead of async to make sure that this isn't blocking
    const worker = new Worker(
      new URL("./getAllValidPathsWorker.js", import.meta.url),
    );

    worker.postMessage({
      puzzle: builderState.puzzle,
      numColumns,
      numRows,
      maxPathsToFind,
    });

    worker.onmessage = (event) => {
      setAllBuilderPaths(event.data);
      setCalculatingBuilderPaths(false);
      console.log(
        `DONE CALCULATING builder paths. Found ${event.data.length} paths.`,
      );
    };

    return () => {
      console.log("terminating builder path calculation");
      worker.terminate();
    };
  }, [builderState.puzzle, builderState.isValid]);

  useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedCustomBuilds",
      JSON.stringify(savedCustomBuilds),
    );
  }, [savedCustomBuilds]);

  React.useEffect(() => {
    const indexToUpdate = builderState.customIndex;
    // The builderState gets initialized in this parent so that I can pass the dispatcher to various children, but the initialized state isn't actually used.
    // To prevent the blank initialized state from appearing in the list of saved puzzles, ignore updates where indexToUpdate is not defined.
    // This feels sloppy to me, but I haven't thought of a better solution yet.
    if (indexToUpdate === undefined) {
      return;
    }
    const encodedPuzzle = convertPuzzleToString(builderState.puzzle);
    let newSavedBuilds = savedCustomBuilds.slice();
    newSavedBuilds.splice(indexToUpdate, 1, [
      builderState.roomName,
      encodedPuzzle,
    ]);
    setSavedCustomBuilds(newSavedBuilds);
  }, [builderState.puzzle, builderState.roomName]);

  return (
    <BuilderContext.Provider
      value={{
        builderState,
        dispatchBuilderState,
        savedCustomBuilds,
        setSavedCustomBuilds,
        allBuilderPaths,
        calculatingBuilderPaths,
        maxPathsToFind,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilderContext() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error(
      "useBuilderContext must be used within a BuilderContextProvider",
    );
  }
  return context;
}
