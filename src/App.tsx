import React from 'react';
import { useAppDispatch } from './Hooks';
import { Button } from 'antd';
import './App.css';

import CanastaGame from './canastra/CanastaGame';
import CanastaScore from './canastra/CanastaScore';
import { setShowScore } from './canastra/slices/CanastaScoreSlice';

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="App" style={{ display: 'flex', flex: 1 }}>
      <div className="col" style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
        <div className="row" style={{ height: 50, backgroundColor: 'grey' }}>
          <Button key="ok" onClick={() => dispatch(setShowScore(true))}>
            Mostrar pontuação / Show score
          </Button>
        </div>
        <div className="row" style={{ display: 'flex', flex: 1 }}>
          <CanastaGame/>
        </div>
      </div>
      <CanastaScore/>
    </div>
  );
}

export default App;
