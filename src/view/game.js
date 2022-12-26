import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import '../style/game.css';

import Decks from '../constants/decks';

import Deck from './deck';
import Card from './card';
import Hand from './hand';
import GameSequence from './game-sequence';

function sort(cards) {
  return cards.sort(Decks.sort)
}
function renderCard(card) {
  return (<Card name={card.name} suit={card.suit}/>);
}
function renderCards(cards) {
  return cards.map(card => renderCard(card));
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      looseCard: undefined,
      cardsInDeck: Decks.SHUFFLED_DECK,
      playerCards: [],
      playerSequences: [Decks.SHUFFLED_DECK.slice(0,5), Decks.SHUFFLED_DECK.slice(0,5), []],
      discardedCards: [],
    };
    this.drawCard = this.drawCard.bind(this);
    this.renderLooseCard = this.renderLooseCard.bind(this);
    this.renderPlayerSequences = this.renderPlayerSequences.bind(this);
    this.renderPlayerHand = this.renderPlayerHand.bind(this);
    this.renderLastDiscardedCard = this.renderLastDiscardedCard.bind(this);
    this.putLooseCardInHand = this.putLooseCardInHand.bind(this);
    this.putDiscardedCardsInHand = this.putDiscardedCardsInHand.bind(this);
  }
  drawCard() {
    this.setState(prevState => {
      return {
        cardsInDeck: prevState.cardsInDeck.slice(0, -1),
        looseCard: prevState.cardsInDeck[prevState.cardsInDeck.length - 1],
        discardedCards: prevState.looseCard ?
          [...prevState.discardedCards].concat([prevState.looseCard]) :
          prevState.discardedCards,
      };
    });
  }
  renderLooseCard() {
    return (
      <Card name={this.state.looseCard.name}
            suit={this.state.looseCard.suit}
            onClick={this.putLooseCardInHand}
      />
    );
  }
  renderPlayerSequences() {
    return this.state.playerSequences
      .map((sequence, i) => (<GameSequence sequenceIndex={i}>{renderCards(sequence)}</GameSequence>));
  }
  renderPlayerHand() {
    return renderCards(this.state.playerCards);
  }
  renderLastDiscardedCard() {
    return renderCard(this.state.discardedCards[this.state.discardedCards.length - 1]);
  }
  putLooseCardInHand() {
    this.setState(prevState => {
      return {
        looseCard: undefined,
        playerCards: sort(prevState.playerCards.concat([prevState.looseCard])),
      };
    });
  }
  putDiscardedCardsInHand() {
    this.setState(prevState => {
      return {
        discardedCards: [],
        playerCards: sort(prevState.playerCards.concat(prevState.discardedCards)),
      };
    });
  }
  render() {
    return (
      <div>
        <div className="flex row">
          <Deck onClick={this.putDiscardedCardsInHand}
                remainingCards={this.state.discardedCards.length}
                type={Deck.NO_CARD_BACK}>
            {this.state.discardedCards.length > 0 && this.renderLastDiscardedCard()}
          </Deck>
          <Deck onClick={this.drawCard}
                remainingCards={this.state.cardsInDeck.length}
                type={Deck.REGULAR} />
          {this.state.looseCard && this.renderLooseCard()}
        </div>
        <div className="flex row">
          {this.renderPlayerSequences()}
        </div>
        <div className="flex row">
          <Hand>
            {this.renderPlayerHand()}
          </Hand>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Game);
export function moveToSequence(whichSequence) {
  
}
