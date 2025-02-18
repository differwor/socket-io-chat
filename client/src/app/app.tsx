// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import useChatSocket from '../hooks/useChatSocket';
import NxWelcome from './nx-welcome';

export function App() {
  const { isConnected } = useChatSocket('http://localhost:4000');
  return (
    <div>
      <NxWelcome title={`${isConnected}`} />
    </div>
  );
}

export default App;
