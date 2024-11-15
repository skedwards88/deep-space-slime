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
}) {
  const {shareAndCapHints} = useShareContext();
  if (navigator.canShare) {
    return (
      <button
        id={id}
        className={className}
        onClick={() => {
          shareAndCapHints({appName, text, url, seed});
        }}
      >
        {buttonText}
      </button>
    );
  } else {
    return <></>;
  }
}
