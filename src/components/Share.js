import React from "react";
import {useShareContext} from "./ShareContextProvider";

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
