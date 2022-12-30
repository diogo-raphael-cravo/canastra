import React from 'react';
import './style/CardBack.css';
import CardLogo from './CardLogo';

function CardBack() {
    return (
        <div className="card-back">
            <div className="card-back-image center" >
                <CardLogo />
            </div>
        </div>
    );
}

export default CardBack;
