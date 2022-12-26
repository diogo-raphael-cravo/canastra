import React, { Component } from 'react';
import '../style/card-back.css';
import logo from './logo.svg';

class CardBack extends Component {
  render () {
    return (
      <div className="card-back">
        <img src={logo} className="card-back-image center" alt="logo" />
      </div>
    );
  }
}

export default CardBack;
