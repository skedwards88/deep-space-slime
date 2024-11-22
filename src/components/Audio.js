import React from "react";
import musicFile from "../images/music.mp3";

export default function Audio() {
  const savedIsPlaying = JSON.parse(
    localStorage.getItem("deepSpaceSlimeSavedAudio"),
  );

  const [isPlaying, setIsPlaying] = React.useState(savedIsPlaying || false);

  React.useEffect(() => {
    window.localStorage.setItem(
      "deepSpaceSlimeSavedAudio",
      JSON.stringify(isPlaying),
    );
  }, [isPlaying]);

  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  });

  return (
    <div>
      <audio ref={audioRef} src={musicFile} />
      <button
        className="controlButton"
        id={isPlaying ? "playIcon" : "muteIcon"}
        onClick={() => {
          isPlaying ? audioRef.current.pause() : audioRef.current.play();
          setIsPlaying(!isPlaying);
        }}
      ></button>
    </div>
  );
}

// todo: add uppbeat credit to heart screen
