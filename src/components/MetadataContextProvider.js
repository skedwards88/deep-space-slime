import {createContext, useContext} from "react";
import React from "react";
import {getUserId} from "@skedwards88/shared-components/src/logic/getUserId";
import {v4 as uuidv4} from "uuid";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";

const MetadataContext = createContext();

export function MetadataContextProvider({children}) {
  // Store userID so I don't have to read local storage every time
  const userId = getUserId("deep_space_slime_uid");

  // Store sessionID as a ref so I have the same session ID until app refresh
  const sessionIdRef = React.useRef(uuidv4());
  const sessionId = sessionIdRef.current;

  // Send analytics on load
  React.useEffect(() => {
    sendAnalyticsCF({
      userId,
      sessionId,
      analyticsToLog: [
        {
          eventName: "app_load",
          // os, browser, and isMobile are parsed on the server from the user agent headers
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          isStandalone: isRunningStandalone(),
          devicePixelRatio: window.devicePixelRatio,
        },
      ],
    });
    // Just run once on app load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MetadataContext.Provider
      value={{
        userId,
        sessionId,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadataContext() {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error(
      "useMetadataContext must be used within a MetadataContextProvider",
    );
  }
  return context;
}
