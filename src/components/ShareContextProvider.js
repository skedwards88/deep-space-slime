import {createContext, useContext, useState, useEffect} from "react";
import React from "react";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";

const ShareContext = createContext();

export function ShareContextProvider({children}) {
  const {userId, sessionId} = useMetadataContext();

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

  // Store the previous state so that we can infer which analytics events to send
  const previousHintsRemainingRef = React.useRef(hintsRemaining);

  useEffect(() => {
    const previousHintsRemaining = previousHintsRemainingRef.current;

    if (hintsRemaining < previousHintsRemaining) {
      sendAnalyticsCF({
        userId,
        sessionId,
        analyticsToLog: [{eventName: "hint"}],
      });
    }

    previousHintsRemainingRef.current = hintsRemaining;

    window.localStorage.setItem(
      "deepSpaceSlimeSavedHintsRemaining",
      JSON.stringify(hintsRemaining),
    );
    // Intentionally excluding sessionId, userId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hintsRemaining]);

  if (hintsLastReset !== today) {
    setHintsLastReset(today);
    setHintsRemaining(maxHints);
  }

  function shareAndCapHints({appName, text, url, seed, origin}) {
    const fullUrl = seed ? `${url}?id=${seed}` : url;
    console.log(fullUrl);

    navigator
      .share({
        title: appName,
        text: `${text}\n\n`,
        url: fullUrl,
      })
      .then(() => {
        setHintsRemaining(maxHints);
        sendAnalyticsCF({
          userId,
          sessionId,
          analyticsToLog: [{eventName: "share", eventInfo: {origin}}],
        });
        console.log("Successful share");
      })
      .catch((error) => {
        console.log("Error sharing or share was canceled", error);
      });
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
