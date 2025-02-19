import Login from './Login';
import Board from './Board';
import { useEffect } from 'react';
import useChatStore from '../store/useChatStore';

const SOCKET_URL = 'http://localhost:4000';

export function App() {
  const { connectSocket, disconnectSocket, currentUser, isConnected } =
    useChatStore();

  useEffect(() => {
    connectSocket(SOCKET_URL);
    // Clean up socket connection when component unmounts
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  return (
    <div>
      <div className="fixed bottom-2 right-2">
        <div
          className={`text-xs font-semibold font-mono whitespace-nowrap px-2 py-1 ml-5 rounded text-white rounded-2 ${
            isConnected ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {isConnected ? 'Connected to Web Socket!' : 'No connection!'}
        </div>
      </div>
      {!currentUser?.online ? <Login /> : <Board />}
    </div>
  );
}

export default App;
