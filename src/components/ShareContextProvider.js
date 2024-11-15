import {createContext, useContext, useState, useEffect} from "react";
import React from "react";
import {handleShare} from "../common/handleShare";

const ShareContext = createContext();

export function ShareContextProvider({children}) {
  const maxHints = 5;

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
