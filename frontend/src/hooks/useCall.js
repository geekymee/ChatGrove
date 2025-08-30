import { useRef, useEffect } from "react";
import Peer from "simple-peer";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useVideoCallStore } from "../store/useVideoCallStore";

export const useCall = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const { 
    caller,
    setStream, 
    setRemoteStream, 
    setCallAccepted, 
    resetCall,
    ReciveCall,
    yescall } = useVideoCallStore();
  const myVideo = useRef(null);
  const receiverVideo = useRef(null);
  const connectionRef = useRef(null);
  const user = authUser;
  const socket = useAuthStore.getState().socket;
    useEffect(() => {
        yescall();
        return () => {
          socket.off("callToUser");  
        };
    }, [user, socket, yescall ]);

  

 
    










  const startCall = async (modalUser) => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      setStream(currentStream);
      if(myVideo.current){
        myVideo.current.srcObject = currentStream;
        myVideo.current.muted = true;
        myVideo.current.Volume = 0;
       }

       currentStream.getAudioTracks().forEach(track=>(track.enabled=true));

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: currentStream,
      });

    //   Send signaling data to receiver
      peer.on("signal", (data) => {
        socket.emit("callToUser", {
          callToUserId: modalUser._id,
          signalData: data,
          from: user._id,
          name: user.username,
        });
      });

    //   peer.on("stream", (remoteStream) => setRemoteStream(remoteStream));

      // When receiver accepts, navigate to video call page
    //   socket.once("callAccepted", (data) => {
    //     peer.signal(data.signal);
    //     setCallAccepted(true);
    //     navigate("/video-call");
    //   });

      connectionRef.current = peer;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

//   const answerCall = async (callerUser, signalData) => {
//     try {
//       const currentStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setStream(currentStream);

//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: currentStream,
//       });

//       peer.on("signal", (data) => {
//         socket.emit("answerCall", { signal: data, to: callerUser._id });
//       });

//       peer.on("stream", (remoteStream) => setRemoteStream(remoteStream));

//       peer.signal(signalData);
//       connectionRef.current = peer;
//       navigate("/video-call");
//     } catch (error) {
//       console.error("Error answering call", error);
//     }
//   };
    return {startCall};
//   return { myVideo, receiverVideo, connectionRef, startCall, answerCall };
};
