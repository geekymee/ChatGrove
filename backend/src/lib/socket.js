import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  const onlineUsers = Object.keys(userSocketMap);
  io.emit("getOnlineUsers", onlineUsers);

    

  socket.on("callToUser", (data) => {
    const callReceiverSocketId = getReceiverSocketId(data.callToUserId);
    console.log("callReceiverSocketId" , callReceiverSocketId);
    if (!callReceiverSocketId) {
      socket.emit("userUnavailable", { message: "User is offline." });
      return;
    }
    
    io.to(callReceiverSocketId).emit("callToUser",{
      signal: data.signalData, // WebRTC signal data
      from: data.from, // Caller ID
      name: data.name, // Caller name
      email: data.email, // Caller email
      profilepic: data.profilepic, // Caller profile picture
    })
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    const onlineUsers = Object.keys(userSocketMap);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

export { io, app, server };