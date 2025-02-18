import Login from './Login';
import Board from './Board';
import useChatSocket from '../hooks/useChatSocket';

const SOCKET_URL = 'http://localhost:4000';

export function App() {
  const { currentUser, isConnected } = useChatSocket(SOCKET_URL);

  return (
    <div>
      <div className="fixed top-2 right-2">
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
