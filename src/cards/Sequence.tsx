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
type OnClickAttrType = {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}
function makeCards(cards: CardType[], onClickAttr: OnClickAttrType): JSX.Element[] {
    return cards.map(card => <Card key={card.id} name={card.name} suit={card.suit} selectionColor={card.selectionColor} showBack={false} {...onClickAttr}/>);
}
function Sequence({ id, cards, selectionColor, onClick }: SequencePropsType) {
    let onClickAttr: OnClickAttrType = {};
    if (cards.length === 0) {
        if (onClick) {
            onClickAttr.onClick = () => {
                onClick({ sequenceId: id, cardId: null });
            }
        }
        return (<div className={'sequence empty'} {...onClickAttr}><Card selectionColor={selectionColor} showBack={false} /></div>);
    }
    if (onClick) {
        onClickAttr.onClick = (cardId) => {
            onClick({ sequenceId: id, cardId });
        }
    }
    return (<div className={'sequence'} >{makeCards(cards, onClickAttr)}</div>);
}

export default Sequence;
