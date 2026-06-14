import {createContext, useContext, useState, useEffect} from "react";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import {getFromStorage} from "../logic/safeStorage";

type ShareContextType = {
  hintsRemaining: number;
  setHintsRemaining: React.Dispatch<React.SetStateAction<number>>;
  shareAndCapHints: (params: ShareAndCapHintsParams) => void;
  maxHints: number;
};

type ShareAndCapHintsParams = {
  appName: string;
  text: string;
  url: string;
  seed?: string | undefined;
  origin: string;
};

const ShareContext = createContext<ShareContextType | undefined>(undefined);

export function ShareContextProvider({
  children,
}: {
  children: React.JSX.Element;
}): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  const maxHints = 5;

  const savedHintsLastReset = getFromStorage<string>(
    "deepSpaceSlimeSavedHintsLastReset",
  );
  const today = getSeedFromDate();

  const [hintsLastReset, setHintsLastReset] = useState<string>(
    savedHintsLastReset ?? today,
  );

  useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedHintsLastReset",
      JSON.stringify(hintsLastReset),
    );
  }, [hintsLastReset]);

  const savedHintsRemaining = getFromStorage<number>(
    "deepSpaceSlimeSavedHintsRemaining",
  );

  const [hintsRemaining, setHintsRemaining] = useState<number>(
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

  function shareAndCapHints({
    appName,
    text,
    url,
    seed,
    origin,
  }: ShareAndCapHintsParams): void {
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

export function useShareContext(): ShareContextType {
  const context = useContext(ShareContext);
  if (context === undefined) {
    throw new Error(
      "useShareContext must be used within a ShareContextProvider",
    );
  }
  return context;
}
