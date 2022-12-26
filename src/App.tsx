import React from 'react';
import logo from './logo.svg';
import Hand from './cards/Hand';
import CardBack from './cards/CardBack';
import Deck from './cards/Deck';
import Sequence from './cards/Sequence';
import Joker from './cards/Joker';
import Card from './cards/Card';
import Decks from './cards/constants/Decks';
import { useAppSelector, useAppDispatch } from './Hooks';
import './App.css';

import { setDeck, selectDeck, selectHand, pickCard } from './canastra/slices/GameSlice';

function App() {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectDeck);
  const hand = useAppSelector(selectHand);
  if (0 === cards.length) {
    dispatch(setDeck(Decks.SHUFFLED_DECK));
  }

  return (
    <div className="App">
      <div onClick={() => dispatch(pickCard())}>
        <Deck type='REGULAR' remainingCards={cards}/>
      </div>
      <Hand cards={hand}/>
    </div>
  );
}

export default App;
