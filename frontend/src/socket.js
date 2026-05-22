import { io } from "socket.io-client";

const socket = io(
  "https://watch-party-backend-rgcf.onrender.com",
  {
    transports: ["websocket", "polling"]
  }
);

export default socket;