import React from 'react';
import './style/Hand.css';

import Card from './Card';
import { CardType } from './helpers/Decks';

type HandPropsType = {
    cards: CardType[],
    showBack: boolean,
    onClickCard?: Function,
};
function makeCards(cards: CardType[], showBack: boolean, onClickCard?: Function): JSX.Element[] {
  if (!showBack) {
    return cards.map(card => <Card key={card.id} id={card.id} name={card.name} suit={card.suit} selectionColor={card.selectionColor} onClick={onClickCard} showBack={false}/>);
  } else {
    return cards.map((card, index) => {
      if (index === cards.length - 1) {
        return <Card key={card.id} showBack={true}/>;
      }
      return <Card key={card.id} showBack={false}/>;
    });
  }
}
function Hand({ cards, showBack, onClickCard }: HandPropsType) {
    const isEmpty = !cards || 0 === cards.length;
    if (isEmpty) {
      return (
        <div className="hand" />
      );
    }

    const howManyChildren = cards.length;
    if (howManyChildren > 13) {
      const hands: JSX.Element[] = [];
      let i: number;
      for (i = 1; i < (howManyChildren/13) + 1; i++) {
        hands.push((
          <div className={`hand hand-of-13`}>
            {makeCards(cards.slice((i - 1) * 13, i * 13), showBack, onClickCard)}
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
      <div className={`hand hand-of-${howManyChildren}`}>{makeCards(cards, showBack, onClickCard)}</div>
    );
}

export default Hand;
