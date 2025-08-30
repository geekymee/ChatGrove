import { create } from "zustand";
import { useAuthStore } from "../store/useAuthStore";
export const useVideoCallStore = create((set , get) => ({
  stream: null,
  remoteStream: null,
  callAccepted: false,
  callRejected: false,
  reciveCall: false,
  caller: null,
  callerName: "",
  callerSignal: null,

  
  setStream: (stream) => set({ stream }),
  setRemoteStream: (remoteStream) => set({ remoteStream }),
  setCallAccepted: (value) => set({ callAccepted: value }),
  setCallRejected: (value) => set({ callRejected: value }),
  ReciveCall : (data) => set({ 
    reciveCall : true, 
    caller : data,      
    callerName : data.name,  
    callerSignal :data.signal,
    }),
    yescall: () => {
        const socket = useAuthStore.getState().socket;
        socket.on("callToUser", (data) => {
            console.log("getting call from " , caller);
        });
    },
  resetCall: () =>
    set({
      stream: null,
      remoteStream: null,
      callAccepted: false,
      callRejected: false,
      reciveCall: false,
      caller: null,
      callerName: "",
      callerSignal: null,
    }),
}));
