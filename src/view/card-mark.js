import React, { Component } from 'react';
import '../style/card-mark.css';

import CardSuit from './card-suit';
import Joker from './joker';

import CardNames from '../constants/card-names';

class CardMark extends Component {
  render() {
    const name = this.props.name;
    const suit = this.props.suit;
    const className = this.props.className || "";
    
    const isJoker = CardNames.isJoker(name);
    
    if (isJoker) {
      return (
        <div className={`mark ${className}`}>
          <Joker />
        </div>
      );
    }
    
    return (
      <div className={`mark ${className}`}>
        {name}
        <CardSuit suit={suit}/>
      </div>
    );
  }
}

export default CardMark;
