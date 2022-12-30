import React from 'react';

import CardSuits from './helpers/CardSuits';
import CardSuit from './CardSuit';

function CardLogo() {
    return <div className="col" style={{ display: 'flex' }}>
        <div className="row" style={{ display: 'flex' }}>
            <div style={{ marginRight: '5px' }}>
                <CardSuit suit={CardSuits.CLUBS}/>
            </div>
            <CardSuit suit={CardSuits.DIAMONDS} />
        </div>
        <div className="row" style={{ display: 'flex' }}>
            <div style={{ marginRight: '5px' }}>
                <CardSuit suit={CardSuits.HEARTS} />
            </div>
            <CardSuit suit={CardSuits.SPADES} />
        </div>
    </div>;
}

export default CardLogo;
