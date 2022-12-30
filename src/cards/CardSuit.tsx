import React from 'react';

import CardSuits from './helpers/CardSuits';

type CardSuitPropsType = {
    suit: string,
    className?: string,
};
function CardSuit({ suit, className }: CardSuitPropsType) {
    const isHearts = CardSuits.isHearts(suit);
    const isClubs = CardSuits.isClubs(suit);
    const isSpades = CardSuits.isSpades(suit);
    const isDiamonds = CardSuits.isDiamonds(suit);

    if (isHearts) {
        return (<div className={`red suit ${className}`}>&hearts;</div>);
    } else if (isClubs) {
        return (<div className={`black suit ${className}`}>&clubs;</div>);
    } else if (isSpades) {
        return (<div className={`black suit ${className}`}>&spades;</div>);
    } else if (isDiamonds) {
        return (<div className={`red suit ${className}`}>&diams;</div>);
    }
    return <div/>;
}

export default CardSuit;
