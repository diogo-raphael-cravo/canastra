import React from 'react';
import './style/Deck.css';

import CardBack from './CardBack';
import Card from './Card';
import { CardType } from './constants/Decks';

class DeckClass {
  static get REGULAR() { return "REGULAR" }
  static get NO_CARD_BACK() { return "NO_CARD_BACK" }
  static isRegular(type: string) {
    return type.toUpperCase() === DeckClass.REGULAR;
  }
  static isNoCardBack(type: string) {
    return type.toUpperCase() === DeckClass.NO_CARD_BACK;
  }
}

type DeckPropsType = {
    type: string,
    remainingCards: CardType[],
};
function Deck ({ type, remainingCards }: DeckPropsType) {
    function makeChildren(): JSX.Element[] {
      const children: JSX.Element[] = [];
      for (let i = 0; i < Math.floor(remainingCards.length / 10); i++) {
        children.push((<Card className=""/>));
      }
      return children;
    }

    function makeRegular() {
      const isEmpty = remainingCards.length === 0;
      const lastCard = remainingCards.length === 1;
      return (
        <div className={`deck ${isEmpty ? 'empty' : ''}`}>
          {!isEmpty && makeChildren()}
          {!isEmpty && !lastCard && <CardBack/>}
          {isEmpty && <Card/>}
        </div>
      );
    }
    
    function makeNoCardBack() {
      const isEmpty = remainingCards.length === 0;
      return (
        <div className={`deck ${isEmpty ? 'empty' : ''}`}>
          {!isEmpty && makeChildren()}
          {isEmpty && <Card/>}
        </div>
      );
    }
    
    if (DeckClass.isRegular(type)) {
      return makeRegular();
    } else if (DeckClass.isNoCardBack(type)) {
      return makeNoCardBack();
    }
    return makeRegular();
}

export default Deck;
