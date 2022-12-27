import React from 'react';
import './style/Sequence.css';

import Card from './Card';
import { CardType } from './helpers/Decks';

type SequencePropsType = {
    cards: CardType[],
    selectionColor: string,
};
function makeCards(cards: CardType[]): JSX.Element[] {
    return cards.map(card => <Card name={card.name} suit={card.suit} selectionColor={card.selectionColor}/>);
}
function Sequence({ cards, selectionColor}: SequencePropsType) {
    if (cards.length === 0) {
        return (<div className={'sequence empty'}><Card selectionColor={selectionColor}/></div>);
    }
    return (<div className={'sequence'}>{makeCards(cards)}</div>);
}

export default Sequence;
