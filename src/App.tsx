import React from 'react';
import { useAppSelector } from './Hooks';
import './App.css';

import { selectGoOutPlayer } from './canastra/slices/GameSlice';
import CanastaGame from './canastra/CanastaGame';
import CanastaScore from './canastra/CanastaScore';

function App() {
  const goOutPlayer = useAppSelector(selectGoOutPlayer);

  return (
    <div className="App" style={{ display: 'flex', flex: 1 }}>
      {goOutPlayer && <CanastaScore/>}
      <CanastaGame/>
    </div>
  );
}

export default App;
