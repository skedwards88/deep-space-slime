import React from "react";
import {useShareContext} from "./ShareContextProvider";
import {useGameContext} from "./GameContextProvider";

export default function Share({
  appName,
  text,
  url,
  seed,
  id,
  className,
  buttonText,
  origin = "unknown share",
}) {
  const {shareAndCapHints} = useShareContext();
  const {
    gameState: {playerID},
  } = useGameContext();

  if (navigator.canShare) {
    return (
      <button
        id={id}
        className={className}
        onClick={() => {
          shareAndCapHints({
            appName,
            text,
            url,
            seed,
            origin,
            playerID,
          });
        }}
      >
        {buttonText}
      </button>
    );
  } else {
    return <></>;
  }
}
