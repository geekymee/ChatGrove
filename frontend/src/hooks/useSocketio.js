import { useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../lib/socket.js";
import useAuthUser from "./useAuthUser";

export const useSocket = () => {
  const { data: authUser, isLoading } = useAuthUser();

  useEffect(() => {
    if (isLoading) return;

    if (authUser) {
      const socket = connectSocket();

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        disconnectSocket();
      };
    } else {
      disconnectSocket();
    }
  }, [authUser, isLoading]);

  return getSocket();
};
