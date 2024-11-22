import React from "react";
import musicFile from "../images/music.mp3"

export default function Audio() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  return (
    <div>
      <audio ref={audioRef} src={musicFile}/>
      <button
      className="controlButton"
      id={isPlaying ? "playIcon" : "muteIcon"}
      onClick={() => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying)
      }}></button>
    </div>
  )
}

// todo: add uppbeat credit to heart screen
// todo: hoist up the play/mute state.
// todo decide whether to play music everywhere or just where control bar is visible
