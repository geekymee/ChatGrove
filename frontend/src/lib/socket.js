import { io } from "socket.io-client";

let socket = null;
const BASE_URL = "http://localhost:5001"; 
export const connectSocket = () => {
  if (socket) return socket; // already connected
  socket = io(BASE_URL);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
