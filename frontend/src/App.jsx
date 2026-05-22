import { useEffect, useRef, useState } from "react";
import socket from "./socket";

import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";
import Controls from "./components/Controls";
import Participants from "./components/Participants";

function App() {

  const [roomId, setRoomId] = useState("");
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");
  const [participants, setParticipants] = useState([]);
  const [username, setUsername] = useState("");

  const playerRef = useRef(null);

  // JOIN ROOM
  const joinRoom = () => {

    socket.emit("join_room", {
      roomId,
      username
    });

  };

  // PLAY
  const playVideo = () => {

    socket.emit("play", roomId);

    playerRef.current?.playVideo();

  };

  // PAUSE
  const pauseVideo = () => {

    socket.emit("pause", roomId);

    playerRef.current?.pauseVideo();

  };

  // SEEK
  const seekVideo = () => {

    const currentTime =
      playerRef.current?.getCurrentTime();

    socket.emit("seek", {
      roomId,
      time: currentTime
    });

  };

  // CHANGE VIDEO
  const changeVideo = () => {

    socket.emit("change_video", {
      roomId,
      videoId
    });

  };

  useEffect(() => {

    socket.on("play_video", () => {
      playerRef.current?.playVideo();
    });

    socket.on("pause_video", () => {
      playerRef.current?.pauseVideo();
    });

    socket.on("seek_video", (time) => {
      playerRef.current?.seekTo(time, true);
    });

    socket.on("video_changed", (newVideoId) => {
      setVideoId(newVideoId);
    });

    socket.on("user_joined", (users) => {
      setParticipants(users);
    });

    socket.on("role_updated", (users) => {
      setParticipants(users);
    });

    socket.on("participant_removed", (users) => {
      setParticipants(users);
    });

    return () => {

      socket.off("play_video");
      socket.off("pause_video");
      socket.off("seek_video");
      socket.off("video_changed");
      socket.off("user_joined");
      socket.off("role_updated");
      socket.off("participant_removed");

    };

  }, []);

  return (

    <div className="app">

      <div className="left-section">

        <div className="hero-text">

          <h1>
            Watch YouTube
            <span> together </span>
            in perfect sync.
          </h1>

          <p>
            Real-time synchronized watch party
            with Socket.IO and YouTube API.
          </p>

        </div>

        <div className="video-container">

          <VideoPlayer
            videoId={videoId}
            playerRef={playerRef}
            roomId={roomId}
          />

        </div>

        <Controls
          videoId={videoId}
          setVideoId={setVideoId}
          playVideo={playVideo}
          pauseVideo={pauseVideo}
          seekVideo={seekVideo}
          changeVideo={changeVideo}
        />

      </div>

      <div className="right-section">

        <Navbar
          username={username}
          setUsername={setUsername}
          roomId={roomId}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />

        <Participants
          participants={participants}
          roomId={roomId}
        />

      </div>

    </div>

  );
}

export default App;