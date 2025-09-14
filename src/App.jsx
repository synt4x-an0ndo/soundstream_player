import React from 'react';
import { AudioProvider } from './components/ui/AudioPlayer';
import Routes from './Routes';
import './styles/tailwind.css';

function App() {
  return (
    <AudioProvider>
      <Routes />
    </AudioProvider>
  );
}

export default App;