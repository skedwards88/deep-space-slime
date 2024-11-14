import React from "react";
import {handleShare} from "../common/handleShare";

export default function Share({appName, text, url, seed, secondaryEffect}) {
  if (navigator.canShare) {
    return (
      <button
        onClick={() => {
          if (secondaryEffect) {
            secondaryEffect();
          }
          handleShare({appName, text, url, seed});
        }}
      >
        Share
      </button>
    );
  } else {
    return <></>;
  }
}
