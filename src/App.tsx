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

import { discardCard, startGame, selectDeck, selectHand, pickCard, selectCardInHand, selectSequences, selectDiscardPile, moveSelectedHandToSequence, HandMovementType } from './canastra/slices/GameSlice';

function App() {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectDeck);
  const hand = useAppSelector(selectHand);
  const sequences = useAppSelector(selectSequences);
  const discardPile = useAppSelector(selectDiscardPile);
  if (0 === cards.length) {
    dispatch(startGame());
  }

  let discardPileJsx;
  if (0 === discardPile.cards.length) {
    discardPileJsx = <Sequence key={discardPile.id} id={discardPile.id} cards={discardPile.cards} selectionColor={discardPile.selectionColor} 
      onClick={() => dispatch(discardCard())}/>;
  } else {
    const lastDiscardedCard = discardPile.cards[discardPile.cards.length - 1];
    discardPileJsx = <Card id={lastDiscardedCard.id} name={lastDiscardedCard.name} suit={lastDiscardedCard.suit}
      selectionColor={discardPile.selectionColor}
      showBack={false}
      onClick={() => dispatch(discardCard())}/>;
  }
  return (
    <div className="App" style={{ display: 'flex', flex: 1 }}>
      <div className="col">
        <div onClick={() => dispatch(pickCard())} className="row" style={{ display: 'flex' }}>
          <Deck type='REGULAR' remainingCards={cards}/>
          {discardPileJsx}
        </div>
        <div className="row" style={{ display: 'flex' }}>
          {sequences.map(sequence => <Sequence key={sequence.id} id={sequence.id} cards={sequence.cards} selectionColor={sequence.selectionColor}
            onClick={(selectionObject: HandMovementType) => dispatch(moveSelectedHandToSequence(selectionObject))}/>)}
        </div>
        <Hand cards={hand} showBack={false} onClickCard={(cardId: string) => dispatch(selectCardInHand(cardId))}/>
      </div>
      <div className="col" style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', height: '100%' }}>
          <div className="col" style={{ display: 'flex', borderLeft: 10, borderLeftStyle: 'solid', width: 350 }}>
            <Hand cards={hand} showBack={true} onClickCard={(cardId: string) => dispatch(selectCardInHand(cardId))}/>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default App;
