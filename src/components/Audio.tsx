import React from "react";
import {getFromStorage} from "../logic/safeStorage";

function handlePlayPause(
  isPlaying: boolean,
  audioRef: React.RefObject<HTMLAudioElement | null>,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  if (!audioRef.current) {
    return;
  }
  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
}

export default function Audio({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}): React.JSX.Element {
  const savedIsPlaying = getFromStorage<boolean>("deepSpaceSlimeSavedAudio");

  const [isPlaying, setIsPlaying] = React.useState<boolean>(
    savedIsPlaying || false,
  );

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
        onClick={() => handlePlayPause(isPlaying, audioRef, setIsPlaying)}
      ></button>
    </div>
  );
}
