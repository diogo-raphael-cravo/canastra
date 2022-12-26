import React from 'react';
import './style/CardMark.css';
import CardSuit from './CardSuit';

type CardMarkPropsType = {
    name: string,
    suit: string,
    className: string,
};
function CardMark({ name, suit, className }: CardMarkPropsType) {
    return <div className={`mark ${className}`}>
        {name}
        <CardSuit suit={suit} className=""/>
    </div>;
}

export default CardMark;
