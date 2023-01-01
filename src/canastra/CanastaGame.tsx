import React, { useEffect } from 'react';
import Hand from '../cards/Hand';
import Deck from '../cards/Deck';
import Sequence from '../cards/Sequence';
import Card from '../cards/Card';
import Player from '../canastra/Player';
import { useAppSelector, useAppDispatch } from '../Hooks';

import { discardCard, startGame, selectDeck, selectPlayerId, selectPlayers, pickCard, selectCardInHand, selectSequences, selectDiscardPile, moveSelectedHandToSequence, selectCurrentPlayer, selectLoading, setLoading, pickDiscarded, selectGoOutPlayer } from '../canastra/slices/GameSlice';

const SECONDS = 1000;
function CanastaGame() {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectDeck);
  const players = useAppSelector(selectPlayers);
  const playerId = useAppSelector(selectPlayerId);
  const sequences = useAppSelector(selectSequences);
  const discardPile = useAppSelector(selectDiscardPile);
  const currentPlayer = useAppSelector(selectCurrentPlayer);
  const loading = useAppSelector(selectLoading);
  const goOutPlayer = useAppSelector(selectGoOutPlayer);
  const gameStarted = 0 < cards.length;

  useEffect(() => {
    if (gameStarted && currentPlayer !== playerId) {
      const thisPlayer = players.find(player => player.id === currentPlayer);
      if (!thisPlayer) {
        throw new Error(`could not find current player ${currentPlayer}`);
      }
      const thisPlayerSequences = sequences.filter(sequence => sequence.playerTeam === thisPlayer.playerTeam);
      if (!loading) {
        dispatch(setLoading(true));
        const lastDiscarded = 0 < discardPile.cards.length ? discardPile.cards[discardPile.cards.length - 1] : null;
        const nextMove = Player.getNextPlay(thisPlayer.hand, thisPlayerSequences, lastDiscarded);
        if (null === nextMove || !nextMove.pickDiscardedPile) {
          dispatch(pickCard());
        } else {
          dispatch(pickDiscarded());
        }
      } else {
        setTimeout(() => {
          if (goOutPlayer) {
            return;
          }
          const nextMove = Player.getNextPlay(thisPlayer.hand, thisPlayerSequences, null);
          if (null === nextMove) {
            dispatch(selectCardInHand(thisPlayer.hand[0].id));
            dispatch(discardCard());
            dispatch(setLoading(false));
          } else {
            nextMove.cardIds.forEach(cardId => {
              dispatch(selectCardInHand(cardId));
            });
            dispatch(moveSelectedHandToSequence(nextMove.sequenceId));
          }
        }, 1 * SECONDS);
      }
    }
  }, [gameStarted, currentPlayer, loading, dispatch, playerId, players, sequences, discardPile.cards]);

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
  function discardPileAction() {
    doIfPlayerTurn(() => {
      const thisPlayer = players.find(player => player.id === currentPlayer);
      if (!thisPlayer) {
        throw new Error(`could not find current player ${currentPlayer}`);
      }
      const hasSelectedCards = 0 < thisPlayer.hand.filter(card => card.selectionColor).length;
      if (hasSelectedCards) {
        dispatch(discardCard());
      } else {
        dispatch(pickDiscarded());
      }
    });
  }
  if (0 === discardPile.cards.length) {
    discardPileJsx = <Sequence key={discardPile.id} id={discardPile.id} cards={discardPile.cards} selectionColor={discardPile.selectionColor} 
      onClick={() => discardPileAction()}/>;
  } else {
    const lastDiscardedCard = discardPile.cards[discardPile.cards.length - 1];
    discardPileJsx = <Card id={lastDiscardedCard.id} name={lastDiscardedCard.name} suit={lastDiscardedCard.suit}
      selectionColor={discardPile.selectionColor}
      showBack={false}
      onClick={() => discardPileAction()}/>;
  }
  const playerSequences = sequences.filter(sequence => sequence.playerTeam);
  const playerSequenceElements: JSX.Element[] = playerSequences
    .map(sequence => <Sequence
        key={sequence.id} id={sequence.id} cards={sequence.cards} selectionColor={sequence.selectionColor}
        onClick={(selectionObject: { sequenceId: string, cardId: string }) => doIfPlayerTurn(() => dispatch(moveSelectedHandToSequence(selectionObject.sequenceId)))}/>);
  const opponentSequences = sequences.filter(sequence => !sequence.playerTeam);
  const opponentSequenceElements: JSX.Element[] = opponentSequences
    .map(sequence => <Sequence
        key={sequence.id} id={sequence.id} cards={sequence.cards} selectionColor={sequence.selectionColor}/>);
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div className="col" style={{ display: 'flex', flex: 1 }}>
        <div className="row" style={{ display: 'flex' }}>
          <div onClick={() => doIfPlayerTurn(() => dispatch(pickCard()))} className="row" style={{ display: 'flex' }}>
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
                const backgroundColor = showTurn ? { backgroundColor: 'green' } : {};
                return <div key={`${player.id}-hand-wrapper`} className="row" style={{ display: 'flex' }}>
                  <div key={`${player.id}-hand-marker`} style={{ width: 10, marginTop: 20, height: '100%', ...backgroundColor }}/>
                  <Hand key={`${player.id}-hand`} cards={player.hand} showBack={showBack} onClickCard={(cardId: string) => doIfPlayerTurn(() => dispatch(selectCardInHand(cardId)))}/>
                </div>;
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanastaGame;
