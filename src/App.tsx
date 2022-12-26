import React from 'react';
import logo from './logo.svg';
import Hand from './Hand';
import CardBack from './CardBack';
import Deck from './Deck';
import Sequence from './Sequence';
import Decks from './constants/Decks';
import './App.css';

const c = { name: 'J', suit: 'hearts' };
function App() {
  return (
    <div className="App">
      <Sequence cards={Decks.REGULAR_DECK}/>
      <Deck type='REGULAR' remainingCards={[c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]}/>
      <CardBack/>
      <Hand cards={[
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
        { name: 'J', suit: 'hearts' },
      ]}/>
    </div>
  );
}

export default App;
