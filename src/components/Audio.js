import React from "react";

export default function Audio({audioRef}) {
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

  React.useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log(
          "Error with auto play, probably because user didn't interact first.",
        );
        console.log(error);
        setIsPlaying(false);
      });
    }
  }, [isPlaying, audioRef]);

  return (
    <div>
      <button
        className="controlButton"
        id={isPlaying ? "muteIcon" : "unmuteIcon"}
        onClick={() => {
          isPlaying && audioRef.current
            ? audioRef.current.pause()
            : audioRef.current.play();
          setIsPlaying(!isPlaying);
        }}
      ></button>
    </div>
  );
}
