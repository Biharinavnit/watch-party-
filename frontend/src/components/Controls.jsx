function Controls({
  videoId,
  setVideoId,
  playVideo,
  pauseVideo,
  seekVideo,
  changeVideo
}) {

  return (

    <div className="controls">

      <input
        type="text"
        placeholder="Enter YouTube Video ID"
        value={videoId}
        onChange={(e) =>
          setVideoId(e.target.value)
        }
      />

      <button onClick={changeVideo}>
        Change Video
      </button>

      <button onClick={playVideo}>
        ▶ Play
      </button>

      <button onClick={pauseVideo}>
        ⏸ Pause
      </button>

      <button onClick={seekVideo}>
        🔄 Sync Seek
      </button>

    </div>

  );
}

export default Controls;