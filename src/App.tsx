import React, { useEffect } from 'react';
import Hand from './cards/Hand';
import Deck from './cards/Deck';
import Sequence from './cards/Sequence';
import Card from './cards/Card';
import { useAppSelector, useAppDispatch } from './Hooks';
import './App.css';

import { discardCard, startGame, selectDeck, selectPlayerId, selectPlayers, pickCard, selectCardInHand, selectSequences, selectDiscardPile, moveSelectedHandToSequence, HandMovementType, selectCurrentPlayer, selectLoading, setLoading } from './canastra/slices/GameSlice';

const SECONDS = 1000;
function App() {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectDeck);
  const players = useAppSelector(selectPlayers);
  const playerId = useAppSelector(selectPlayerId);
  const sequences = useAppSelector(selectSequences);
  const discardPile = useAppSelector(selectDiscardPile);
  const currentPlayer = useAppSelector(selectCurrentPlayer);
  const loading = useAppSelector(selectLoading);
  const gameStarted = 0 < cards.length;

  useEffect(() => {
    if (gameStarted && currentPlayer !== playerId && !loading) {
      dispatch(setLoading(true));
      setTimeout(() => {
        const player = players.find(player => player.id === currentPlayer);
        if (!player) {
          throw new Error(`could not find current player ${currentPlayer}`);
        }
        dispatch(selectCardInHand({
          cardId: player.hand[0].id,
          playerId: currentPlayer,
        }));
        dispatch(discardCard(currentPlayer));
        dispatch(setLoading(false));
      }, 5 * SECONDS);
    }
  }, [gameStarted, currentPlayer, loading]);

  if (!gameStarted) {
    dispatch(startGame(2));
    return <div/>;
  }


  function doIfPlayerTurn(f: Function): void {
    if (currentPlayer === playerId) {
      f();
    }
  }
  let discardPileJsx: JSX.Element;
  if (0 === discardPile.cards.length) {
    discardPileJsx = <Sequence key={discardPile.id} id={discardPile.id} cards={discardPile.cards} selectionColor={discardPile.selectionColor} 
      onClick={() => doIfPlayerTurn(() => dispatch(discardCard(playerId)))}/>;
  } else {
    const lastDiscardedCard = discardPile.cards[discardPile.cards.length - 1];
    discardPileJsx = <Card id={lastDiscardedCard.id} name={lastDiscardedCard.name} suit={lastDiscardedCard.suit}
      selectionColor={discardPile.selectionColor}
      showBack={false}
      onClick={() => doIfPlayerTurn(() => dispatch(discardCard(playerId)))}/>;
  }
  const playerSequences = sequences.filter(sequence => sequence.playerTeam);
  const playerSequenceElements: JSX.Element[] = playerSequences
    .map(sequence => <Sequence
        key={sequence.id} id={sequence.id} cards={sequence.cards} selectionColor={sequence.selectionColor}
        onClick={(selectionObject: HandMovementType) => doIfPlayerTurn(() => dispatch(moveSelectedHandToSequence({ ...selectionObject, playerId })))}/>);
  const opponentSequences = sequences.filter(sequence => !sequence.playerTeam);
  const opponentSequenceElements: JSX.Element[] = opponentSequences
    .map(sequence => <Sequence
        key={sequence.id} id={sequence.id} cards={sequence.cards} selectionColor={sequence.selectionColor}/>);
  return (
    <div className="App" style={{ display: 'flex', flex: 1 }}>
      <div className="col" style={{ display: 'flex', flex: 1 }}>
        <div className="row" style={{ display: 'flex' }}>
          <div onClick={() => doIfPlayerTurn(() => dispatch(pickCard(playerId)))} className="row" style={{ display: 'flex' }}>
            <Deck type='REGULAR' remainingCards={cards}/>
          </div>
          {discardPileJsx}
        </div>
        <div className="row" style={{ display: 'flex' }}>
          <div className="col" style={{ display: 'flex', width: '50%' }}>
            <div className="row" style={{ display: 'flex' }}>
              {playerSequenceElements}
            </div>
          </div>
          <div className="col" style={{ display: 'flex' }}>
            <div className="row" style={{ display: 'flex' }}>
              {opponentSequenceElements}
            </div>
          </div>
        </div>
      </div>
      
      <div className="col" style={{ display: 'flex', width: 360 }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ borderLeft: 10, borderLeftStyle: 'ridge' }}/>
          <div className="col" style={{ display: 'flex', width: 350 }}>
            {
              players.map(player => {
                const showBack = playerId !== player.id;
                const showTurn = currentPlayer === player.id;
                return <div key={`${player.id}-hand-wrapper`} className="row" style={{ display: 'flex' }}>
                  {showTurn && <div key={`${player.id}-hand-marker`} style={{ width: 10, marginTop: 20, height: '100%', backgroundColor: 'green' }}/>}
                  <Hand key={`${player.id}-hand`} cards={player.hand} showBack={showBack} onClickCard={(cardId: string) => doIfPlayerTurn(() => dispatch(selectCardInHand({ playerId: player.id, cardId })))}/>
                </div>;
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
