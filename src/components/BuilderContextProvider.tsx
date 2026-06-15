import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import React from "react";
import {builderReducer} from "../logic/builderReducer";
import type {BuilderPayload} from "../logic/builderReducer";
import {numColumns, numRows} from "../logic/constants";
import {
  convertPuzzleToString,
  convertPuzzleToPuzzleAndCivilians,
} from "../logic/convertPuzzleString";
import type {BuilderState} from "../Types";
import {getFromStorage, saveToStorage} from "@skedwards88/shared-components/src/logic/safeStorage";

export type SavedCustomBuildType = [string, string, boolean, boolean];

type BuilderContextType = {
  builderState: BuilderState;
  dispatchBuilderState: React.Dispatch<BuilderPayload>;
  savedCustomBuilds: SavedCustomBuildType[];
  setSavedCustomBuilds: React.Dispatch<
    React.SetStateAction<SavedCustomBuildType[]>
  >;
  allBuilderPaths: number[][];
  calculatingBuilderPaths: boolean;
  maxPathsToFind: number;
  customBuildIndexToDelete: number | null;
  setCustomBuildIndexToDelete: React.Dispatch<
    React.SetStateAction<number | null>
  >;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderContextProvider({
  children,
}: {
  children: React.JSX.Element;
}): React.JSX.Element {
  const presavedCustomBuilds = getFromStorage<SavedCustomBuildType[]>(
    "deepSpaceSlimeSavedCustomBuilds",
  );

  const [savedCustomBuilds, setSavedCustomBuilds] = useState<
    SavedCustomBuildType[]
  >(presavedCustomBuilds || []);

  const [customBuildIndexToDelete, setCustomBuildIndexToDelete] = useState<
    number | null
  >(null);

  // Don't bother initializing the builderState to anything useful yet.
  // We need the dispatcher to pass to other components, but we won't ever use this initial state.
  // This feels sloppy to me, but I haven't thought of a better solution yet.
  // @ts-expect-error see preceding comment
  const [builderState, dispatchBuilderState] = useReducer(builderReducer, {});

  const maxPathsToFind = 100;
  const [allBuilderPaths, setAllBuilderPaths] = useState<number[][]>([]);
  const [calculatingBuilderPaths, setCalculatingBuilderPaths] =
    useState<boolean>(false);
  useEffect(() => {
    if (!builderState.isValid) {
      console.log("Builder is invalid. Won't calculate builder paths.");
      return;
    }

    console.log("CALCULATING builder paths");

    setCalculatingBuilderPaths(true);

    // Use a worker instead of async to make sure that this isn't blocking
    const worker = new Worker(
      new URL("./getAllValidPathsWorker", import.meta.url),
    );

    const [puzzleWithoutCivilians, startingCivilians] =
      convertPuzzleToPuzzleAndCivilians(builderState.puzzleWithCivilians);

    worker.postMessage({
      puzzle: puzzleWithoutCivilians,
      startingCivilians,
      numColumns,
      numRows,
      maxPathsToFind,
    });

    worker.onmessage = (event): void => {
      setAllBuilderPaths(event.data);
      setCalculatingBuilderPaths(false);
      console.log(
        `DONE CALCULATING builder paths. Found ${event.data.length} paths.`,
      );
    };

    return (): void => {
      console.log("terminating builder path calculation");
      setCalculatingBuilderPaths(false);
      worker.terminate();
    };
  }, [builderState.puzzleWithCivilians, builderState.isValid]);

  useEffect(() => {
    saveToStorage("deepSpaceSlimeSavedCustomBuilds", savedCustomBuilds);
  }, [savedCustomBuilds]);

  React.useEffect(() => {
    const indexToUpdate = builderState.customIndex;
    // The builderState gets initialized in this parent so that I can pass the dispatcher to various children, but the initialized state isn't actually used.
    // To prevent the blank initialized state from appearing in the list of saved puzzles, ignore updates where indexToUpdate is not defined.
    // This feels sloppy to me, but I haven't thought of a better solution yet.
    if (indexToUpdate === undefined) {
      return;
    }
    const encodedPuzzle = convertPuzzleToString(
      builderState.puzzleWithCivilians,
    );
    const newSavedBuilds = savedCustomBuilds.slice();
    newSavedBuilds.splice(indexToUpdate, 1, [
      builderState.roomName,
      encodedPuzzle,
      builderState.isValid,
      allBuilderPaths.length > 0,
    ]);
    setSavedCustomBuilds(newSavedBuilds);
  }, [
    builderState.puzzleWithCivilians,
    builderState.roomName,
    builderState.isValid,
    allBuilderPaths,
  ]);

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
        customBuildIndexToDelete,
        setCustomBuildIndexToDelete,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilderContext(): BuilderContextType {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error(
      "useBuilderContext must be used within a BuilderContextProvider",
    );
  }
  return context;
}
