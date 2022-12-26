import React, { Component } from 'react';

import CardSuits from '../constants/card-suits';

class CardSuit extends Component {
  render() {
    const suit = this.props.suit;
    const className = this.props.className || '';

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
  }
}

export default CardSuit;
