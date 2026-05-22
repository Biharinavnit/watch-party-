import YouTube from "react-youtube";
import socket from "../socket";
import { useRef } from "react";

function VideoPlayer({
  videoId,
  playerRef,
  roomId
}) {

  const isSyncing = useRef(false);

  // PLAYER READY
  const onReady = (event) => {

    playerRef.current = event.target;

  };

  // PLAYER STATE CHANGE
  const onStateChange = (event) => {

    if (isSyncing.current) {
      isSyncing.current = false;
      return;
    }

    // 1 = PLAYING
    if (event.data === 1) {

      socket.emit("play", roomId);

    }

    // 2 = PAUSED
    if (event.data === 2) {

      socket.emit("pause", roomId);

      // GET CURRENT TIME
      const currentTime =
        playerRef.current?.getCurrentTime();

      // SYNC SEEK
      socket.emit("seek", {
        roomId,
        time: currentTime
      });

    }

  };

  // YOUTUBE PLAYER OPTIONS
  const opts = {
    height: "500",
    width: "900",
    playerVars: {
      autoplay: 0
    }
  };

  return (

    <div>

      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

    </div>

  );

}

export default VideoPlayer;