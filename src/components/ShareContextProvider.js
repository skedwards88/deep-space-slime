import {createContext, useContext, useState, useEffect} from "react";
import React from "react";
import {handleShare} from "../common/handleShare";
import {getSeedFromDate} from "../logic/getSeedFromDate";

const ShareContext = createContext();

export function ShareContextProvider({children}) {
  const maxHints = 5;

  const savedHintsLastReset = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedHintsLastReset"),
  );

  const today = getSeedFromDate();

  const [hintsLastReset, setHintsLastReset] = useState(
    savedHintsLastReset ?? today,
  );

  useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedHintsLastReset",
      JSON.stringify(hintsLastReset),
    );
  }, [hintsLastReset]);

  const savedHintsRemaining = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedHintsRemaining"),
  );

  const [hintsRemaining, setHintsRemaining] = useState(
    savedHintsRemaining ?? maxHints,
  );

  useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedHintsRemaining",
      JSON.stringify(hintsRemaining),
    );
  }, [hintsRemaining]);

  if (hintsLastReset !== today) {
    setHintsLastReset(today);
    setHintsRemaining(maxHints);
  }

  function shareAndCapHints({appName, text, url, seed}) {
    setHintsRemaining(maxHints);
    handleShare({appName, text, url, seed});
  }

  return (
    <ShareContext.Provider
      value={{
        hintsRemaining,
        setHintsRemaining,
        shareAndCapHints,
        maxHints,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}

export function useShareContext() {
  const context = useContext(ShareContext);
  if (context === undefined) {
    throw new Error(
      "useShareContext must be used within a ShareContextProvider",
    );
  }
  return context;
}
