import React from 'react';
import './style/Sequence.css';

import Card from './Card';
import { CardType } from './constants/Decks';

type SequencePropsType = {
    cards: CardType[],
};
function makeCards(cards: CardType[]): JSX.Element[] {
    return cards.map(card => <Card name={card.name} suit={card.suit} className=""/>);
}
function Sequence({ cards }: SequencePropsType) {
    if (cards.length === 0) {
        return (<div className={'sequence empty'}><Card/></div>);
    }
    return (<div className={'sequence'}>{makeCards(cards)}</div>);
}

export default Sequence;
