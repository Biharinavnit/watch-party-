function Navbar({
  username,
  setUsername,
  roomId,
  setRoomId,
  joinRoom
}) {

  return (

    <div className="navbar">

      <h1>
        🎬 Watch Party
      </h1>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) =>
          setRoomId(e.target.value)
        }
      />

      <button onClick={joinRoom}>
        Join Room
      </button>

    </div>

  );
}

export default Navbar;