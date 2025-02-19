import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { User } from '../types/user';
import { ChatMessage } from '../types/chat';

type ChatState = {
  socket: Socket | null;
  isConnected: boolean;
  currentUser: User | null;
  receiver: User | null;
  messages: ChatMessage[];
  users: User[];
  error: string | null;
};

type ChatAction = {
  connectSocket: (url: string) => void;
  login: (username: string) => void;
  sendMessage: (message: string) => void;
  setMessages: (data: ChatMessage[]) => void;
  setReceiver: (user: User | null) => void;
  disconnectSocket: () => void;
};
const useChatStore = create<ChatState & ChatAction>((set, get) => ({
  socket: null,
  isConnected: false,
  currentUser: null,
  receiver: null,
  messages: [],
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

        const currentUsername = sessionStorage.getItem('currentUser');
        const newUser = data[data.length - 1];
        set({ users: data.filter((u) => u.username !== currentUsername) });

        if (newUser?.username === currentUsername) {
          set({ currentUser: newUser });
        }
      });

      socket.on(
        'message:receive',
        (value: { event?: string; data?: ChatMessage }) => {
          if (!value.data) return;
          const { data } = value;
          const { receiver, currentUser, messages } = get();

          if (
            (currentUser?.id === data.sender.id &&
              receiver?.id === data.receiver.id) ||
            (currentUser?.id === data.receiver.id &&
              receiver?.id === data.sender.id)
          ) {
            set({ messages: [...messages, data] });
          }
        }
      );
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
    if (socket && socket.connected) {
      socket.emit('user:login', username);
    }
  },

  sendMessage: (message) => {
    const { socket, receiver } = get();
    if (socket && socket.connected && receiver) {
      socket.emit('message:send', { receiver, message });
    }
  },

  setMessages: (data: ChatMessage[]) => set({ messages: data }),

  setReceiver: (user: User | null) => {
    const { receiver } = get();
    if (!receiver || receiver.id !== user?.id) {
      set({ receiver: user });
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
