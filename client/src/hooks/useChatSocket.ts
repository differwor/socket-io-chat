import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { User } from "../types/user";

const SOCKET_URL = 'http://localhost:4000';

const useChatSocket = (socketUrl: string): {
  isConnected: boolean;
  error: string | null;
  currentUser: User | null;
} => {
  const {
    connectSocket,
    disconnectSocket,
    currentUser,
    isConnected,
    error
  } = useChatStore();
  
  useEffect(() => {
    if (socketUrl) {
      connectSocket(SOCKET_URL);
    }
    // Clean up socket connection when component unmounts
    return () => {
      disconnectSocket();
    };
  }, [socketUrl, connectSocket, disconnectSocket]);
  
  return {
    isConnected,
    currentUser,
    error
  };
};

export default useChatSocket;