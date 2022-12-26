import React from 'react';
import './style/CardBack.css';
import logo from './logo.svg';

function CardBack() {
    return (
        <div className="card-back">
            <img src={logo} className="card-back-image center" alt="logo" />
        </div>
    );
}

export default CardBack;
