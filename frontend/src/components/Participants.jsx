import socket from "../socket";

function Participants({
  participants,
  roomId
}) {

  return (

    <div className="participants">

      <h2>
        👥 Participants
      </h2>

      {
        participants.map((user) => (

          <div
            className="participant-card"
            key={user.socketId}
          >

            <p>
              {user.username}
              {" "}
              -
              {" "}
              {user.role}
            </p>

            <button
              onClick={() =>
                socket.emit("assign_role", {
                  roomId,
                  userId: user.socketId,
                  role: "MODERATOR"
                })
              }
            >
              Make Moderator
            </button>

            {
              user.role !== "HOST" && (

                <button
                  onClick={() =>
                    socket.emit("remove_participant", {
                      roomId,
                      userId: user.socketId
                    })
                  }
                >
                  Remove
                </button>

              )
            }

          </div>

        ))
      }

    </div>

  );
}

export default Participants;