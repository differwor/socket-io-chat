import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { Socket } from "socket.io-client";

const useChatSocket = (socketUrl: string): {
  isConnected: boolean;
  socket: Socket | null;
  error: string | null;
} => {
  const {
    connectSocket,
    disconnectSocket,
    login,
    isConnected,
    socket,
    error
  } = useChatStore();
  
  useEffect(() => {
    // Connect to socket when component mounts if URL and token are provided
    if (socketUrl) {
      connectSocket(socketUrl);
      login('david');
    }
    
    // Clean up socket connection when component unmounts
    return () => {
      disconnectSocket();
    };
  }, [socketUrl, connectSocket, disconnectSocket]);
  
  return {
    isConnected,
    socket,
    error
  };
};

export default useChatSocket;