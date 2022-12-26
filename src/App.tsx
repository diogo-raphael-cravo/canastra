import React from 'react';
import logo from './logo.svg';
import Hand from './cards/Hand';
import CardBack from './cards/CardBack';
import Deck from './cards/Deck';
import Sequence from './cards/Sequence';
import Joker from './cards/Joker';
import Card from './cards/Card';
import Decks from './cards/constants/Decks';
import './App.css';

const c = { name: 'J', suit: 'hearts' };
function App() {
  return (
    <div className="App">
      <Card name='JOKER' suit=''/>
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
