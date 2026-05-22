const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://watch-party-navnit.netlify.app"
    ],
    methods: ["GET", "POST"]
  }
});

// STORE ROOMS + USERS
const rooms = {};

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  // JOIN ROOM
  socket.on("join_room", ({ roomId, username }) => {

    socket.join(roomId);

    // CREATE ROOM
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    // ROLE
    const role =
      rooms[roomId].length === 0
        ? "HOST"
        : "PARTICIPANT";

    // ADD USER
    rooms[roomId].push({
      socketId: socket.id,
      username,
      role
    });

    console.log(`${username} joined ${roomId}`);

    // SEND USERS LIST
    io.to(roomId).emit(
      "user_joined",
      rooms[roomId]
    );

  });

  // PLAY
  socket.on("play", (roomId) => {

    const roomUsers = rooms[roomId];

    if (!roomUsers) return;

    const currentUser = roomUsers.find(
      user => user.socketId === socket.id
    );

    if (!currentUser) return;

    // ROLE CHECK
    if (
      currentUser.role !== "HOST" &&
      currentUser.role !== "MODERATOR"
    ) {
      return;
    }

    socket.to(roomId).emit("play_video");

  });

  // PAUSE
  socket.on("pause", (roomId) => {

    const roomUsers = rooms[roomId];

    if (!roomUsers) return;

    const currentUser = roomUsers.find(
      user => user.socketId === socket.id
    );

    if (!currentUser) return;

    if (
      currentUser.role !== "HOST" &&
      currentUser.role !== "MODERATOR"
    ) {
      return;
    }

    socket.to(roomId).emit("pause_video");

  });

  // SEEK
  socket.on("seek", ({ roomId, time }) => {

    const roomUsers = rooms[roomId];

    if (!roomUsers) return;

    const currentUser = roomUsers.find(
      user => user.socketId === socket.id
    );

    if (!currentUser) return;

    if (
      currentUser.role !== "HOST" &&
      currentUser.role !== "MODERATOR"
    ) {
      return;
    }

    socket.to(roomId).emit(
      "seek_video",
      time
    );

  });

  // CHANGE VIDEO
  socket.on("change_video", ({ roomId, videoId }) => {

    const roomUsers = rooms[roomId];

    if (!roomUsers) return;

    const currentUser = roomUsers.find(
      user => user.socketId === socket.id
    );

    if (!currentUser) return;

    if (
      currentUser.role !== "HOST" &&
      currentUser.role !== "MODERATOR"
    ) {
      return;
    }

    io.to(roomId).emit(
      "video_changed",
      videoId
    );

  });

  // ASSIGN ROLE
  socket.on("assign_role", ({
    roomId,
    userId,
    role
  }) => {

    const roomUsers = rooms[roomId];

    if (!roomUsers) return;

    const currentUser = roomUsers.find(
      user => user.socketId === socket.id
    );

    if (!currentUser) return;

    // ONLY HOST
    if (currentUser.role !== "HOST") {
      return;
    }

    const targetUser = roomUsers.find(
      user => user.socketId === userId
    );

    if (targetUser) {

      targetUser.role = role;

      io.to(roomId).emit(
        "role_updated",
        roomUsers
      );

    }

  });

  // REMOVE PARTICIPANT
  socket.on("remove_participant", ({
    roomId,
    userId
  }) => {

    const roomUsers = rooms[roomId];

    if (!roomUsers) return;

    const currentUser = roomUsers.find(
      user => user.socketId === socket.id
    );

    if (!currentUser) return;

    // ONLY HOST
    if (currentUser.role !== "HOST") {
      return;
    }

    // REMOVE USER
    rooms[roomId] = roomUsers.filter(
      user => user.socketId !== userId
    );

    io.to(roomId).emit(
      "participant_removed",
      rooms[roomId]
    );

  });

  // DISCONNECT
  socket.on("disconnect", () => {

    console.log("User disconnected");

    // REMOVE USER FROM ALL ROOMS
    for (const roomId in rooms) {

      rooms[roomId] = rooms[roomId].filter(
        user => user.socketId !== socket.id
      );

      io.to(roomId).emit(
        "user_joined",
        rooms[roomId]
      );

    }

  });

});

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});