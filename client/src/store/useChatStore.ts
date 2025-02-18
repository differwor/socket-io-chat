import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { User } from '../types/user';

type ChatState = {
  socket: Socket | null;
  isConnected: boolean;
  currentUser: User | null;
  users: User[];
  error: string | null;
};

type ChatAction = {
  connectSocket: (url: string) => void;
  login: (username: string) => void;
  disconnectSocket: () => void;
};
const useChatStore = create<ChatState & ChatAction>((set, get) => ({
  socket: null,
  isConnected: false,
  currentUser: null,
  users: [],
  error: null,

  // Connect to socket.io server
  connectSocket: (url: string) => {
    try {
      const socket = io(url, {
        // auth: { token },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      set({ socket });

      // Setup socket event listeners in the store
      socket.on('connect', () => {
        set({ isConnected: true, error: null });
      });

      socket.on('disconnect', () => {
        set({ isConnected: false });
      });

      socket.on('error', (err) => {
        set({ error: `Connection error: ${err.message}` });
      });

      socket.on('usersOnline', (value: { event?: string; data?: User[] }) => {
        if (!value.data) return;
        const { data } = value;

        const newUser = data.pop();
        set({ users: data });

        if (newUser?.username === sessionStorage.getItem('currentUser')) {
          set({ currentUser: newUser });
        }
      });
    } catch (error) {
      set({
        error: `Failed to connect: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  },

  login: (username) => {
    const { socket } = get();
    if (socket) {
      socket.emit('user:login', username);
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({
        socket: null,
        isConnected: false,
        currentUser: null,
      });
    }
  },
}));

export default useChatStore;
