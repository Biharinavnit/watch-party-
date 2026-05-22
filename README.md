# 🎬 YouTube Watch Party

Real-time synchronized YouTube watch party application built using React, Socket.IO, Node.js, and Express.

Users can create or join rooms and watch YouTube videos together with synchronized playback controls.

---

# 🚀 Live Demo

Frontend deployed publicly using Vercel.https://watch-party-eight-beige.vercel.app/

Backend deployed publicly using Render.

---

# 🛠️ Tech Stack

Frontend:
- React
- Vite
- Socket.IO Client
- React YouTube

Backend:
- Node.js
- Express.js
- Socket.IO

Deployment:
- Netlify
- Render

---

# ✨ Features

- Real-time synchronized playback
- Play/Pause synchronization
- Seek synchronization
- Room-based watch party
- Role-based access control
- Host / Moderator / Participant roles
- Change video for all participants
- Remove participants
- Responsive dark UI

---

# 🔌 Socket Events

## Client → Server

- join_room
- play
- pause
- seek
- change_video
- assign_role
- remove_participant

## Server → Client

- user_joined
- play_video
- pause_video
- seek_video
- video_changed
- role_updated
- participant_removed

---

# ⚙️ Setup Instructions

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
node index.js
```

---

# 🧠 Architecture Overview

The frontend communicates with the backend using Socket.IO WebSockets.

Users join rooms using room IDs. Playback actions such as play, pause, seek, and video change are synchronized across all participants in real time.

Role-based validation is handled on the backend to control permissions for playback actions.

---

# 📱 Responsive Design

Supports:
- Desktop
- Tablet
- Mobile devices

---

# ⚠️ Challenges Faced

- Infinite sync loop issue
- YouTube iframe reload issue
- Production CORS handling
- Real-time synchronization delays

Solutions:
- Loop prevention using useRef
- Forced iframe refresh using key prop
- Updated Socket.IO CORS configuration
- WebSocket fallback transports

---

# 📌 Future Improvements

- Chat system
- Emoji reactions
- Authentication
- Database persistence
- Host transfer
- Redis scaling

---

# 👨‍💻 Developer

Navnit Bihari  
B.Tech CSE
