import React from "react";
import {handleShare} from "../common/handleShare";

export default function Share({appName, text, seed, url}) {
  if (navigator.canShare) {
    return (
      <button onClick={() => handleShare({appName, text, url})}>
        Share
      </button>
    );
  } else {
    return (
      <></>
    );
  }
}
