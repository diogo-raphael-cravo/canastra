import React from 'react';
import logo from './logo.svg';
import Hand from './cards/Hand';
import CardBack from './cards/CardBack';
import Deck from './cards/Deck';
import Sequence from './cards/Sequence';
import Joker from './cards/Joker';
import Card from './cards/Card';
import Decks from './cards/helpers/Decks';
import { useAppSelector, useAppDispatch } from './Hooks';
import './App.css';

import { setDeck, selectDeck, selectHand, pickCard, selectCardInHand, selectSequences, moveSelectedHandToSequence } from './canastra/slices/GameSlice';

function App() {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectDeck);
  const hand = useAppSelector(selectHand);
  const sequences = useAppSelector(selectSequences);
  if (0 === cards.length) {
    dispatch(setDeck(Decks.REGULAR_DECK));
  }

  return (
    <div className="App">
      <div onClick={() => dispatch(pickCard())}>
        <Deck type='REGULAR' remainingCards={cards}/>
      </div>
      {sequences.map(sequence => <Sequence key={sequence.id} id={sequence.id} cards={sequence.cards} selectionColor={sequence.selectionColor}
        onClick={(sequenceId: string) => dispatch(moveSelectedHandToSequence(sequenceId))}/>)}
      <Hand cards={hand} onClickCard={(cardId: string) => dispatch(selectCardInHand(cardId))}/>
    </div>
  );
}

export default App;
