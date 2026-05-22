import { io } from "socket.io-client";

const socket = io(
  "https://watch-party-backend-rgcf.onrender.com"
);

export default socket;