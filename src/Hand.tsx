import React from 'react';
import './style/Hand.css';

import Card from './Card';
import { CardType } from './constants/Decks';

type HandPropsType = {
    cards: CardType[],
};
function makeCards(cards: CardType[]): JSX.Element[] {
    return cards.map(card => <Card name={card.name} suit={card.suit} className=""/>);
}
function Hand({ cards }: HandPropsType) {
    const isEmpty = !cards || 0 === cards.length;
    if (isEmpty) {
      return (
        <div className="hand" />
      );
    }

    const howManyChildren = cards.length;
    if (howManyChildren > 13) {
      const hands = [];
      let i;
      for (i = 1; i < (howManyChildren/13) + 1; i++) {
        hands.push((
          <div className={`hand hand-of-13`}>
            {makeCards(cards.slice((i - 1) * 13, i * 13))}
          </div>
        ));
      }
      return (
        <div className="big-hand">
          {hands}
        </div>
      );
    }

    return (
      <div className={`hand hand-of-${howManyChildren}`}>{makeCards(cards)}</div>
    );
}

export default Hand;
