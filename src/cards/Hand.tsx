import React from 'react';
import './style/Hand.css';

import Card from './Card';
import { CardType } from './helpers/Decks';

type HandPropsType = {
    cards: CardType[],
    onClickCard?: Function,
};
function makeCards(cards: CardType[], onClickCard?: Function): JSX.Element[] {
    return cards.map(card => <Card id={card.id} name={card.name} suit={card.suit} selectionColor={card.selectionColor} onClick={onClickCard}/>);
}
function Hand({ cards, onClickCard }: HandPropsType) {
    const isEmpty = !cards || 0 === cards.length;
    if (isEmpty) {
      return (
        <div className="hand" />
      );
    }

    const howManyChildren = cards.length;
    if (howManyChildren > 13) {
      const hands: JSX.Element[] = [];
      let i;
      for (i = 1; i < (howManyChildren/13) + 1; i++) {
        hands.push((
          <div className={`hand hand-of-13`}>
            {makeCards(cards.slice((i - 1) * 13, i * 13), onClickCard)}
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
      <div className={`hand hand-of-${howManyChildren}`}>{makeCards(cards, onClickCard)}</div>
    );
}

export default Hand;
