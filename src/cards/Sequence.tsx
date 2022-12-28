import React from 'react';
import './style/Sequence.css';

import Card from './Card';
import { CardType } from './helpers/Decks';

type SequencePropsType = {
    id: string,
    cards: CardType[],
    selectionColor: string,
    onClick?: Function,
};
function makeCards(cards: CardType[]): JSX.Element[] {
    return cards.map(card => <Card name={card.name} suit={card.suit} selectionColor={card.selectionColor}/>);
}
function Sequence({ id, cards, selectionColor, onClick }: SequencePropsType) {
    let onClickAttr: { onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void } = {};
    if (onClick) {
        onClickAttr.onClick = () => {
            onClick(id);
        }
    }
    if (cards.length === 0) {
        return (<div className={'sequence empty'} {...onClickAttr}><Card selectionColor={selectionColor}/></div>);
    }
    return (<div className={'sequence'} {...onClickAttr}>{makeCards(cards)}</div>);
}

export default Sequence;
