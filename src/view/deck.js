import React, { Component } from 'react';
import '../style/deck.css';

import CardBack from './card-back';
import Card from './card';

class Deck extends Component {
  static get REGULAR() { return "REGULAR" }
  static get NO_CARD_BACK() { return "NO_CARD_BACK" }
  static isRegular(type) {
    return type.toUpperCase() === Deck.REGULAR;
  }
  static isNoCardBack(type) {
    return type.toUpperCase() === Deck.NO_CARD_BACK;
  }
  render () {
    const type = this.props.type || Deck.REGULAR;
    const remainingCards = this.props.remainingCards;

    function makeChildren() {
      const children = [];
      for (let i = 0; i < Math.floor(remainingCards / 10); i++) {
        children.push((<Card />));
      }
      return children;
    }

    function makeRegular() {
      const hasChildren = this.props.children;
      const isEmpty = remainingCards === 0 && !hasChildren;
      const lastCard = remainingCards === 0 && hasChildren;
      return (
        <div className={`deck ${isEmpty ? 'empty' : ''}`} onClick={this.props.onClick}>
          {!isEmpty && makeChildren()}
          {!isEmpty && !lastCard && <CardBack/>}
          {isEmpty && !hasChildren && <Card/>}
        </div>
      );
    }
    
    function makeNoCardBack() {
      const hasChildren = this.props.children;
      const isEmpty = remainingCards === 0 && !hasChildren;
      return (
        <div className={`deck ${isEmpty ? 'empty' : ''}`} onClick={this.props.onClick}>
          {!isEmpty && makeChildren()}
          {isEmpty && !hasChildren && <Card/>}
          {this.props.children}
        </div>
      );
    }
    
    if (Deck.isRegular(type)) {
      return makeRegular.apply(this);
    } else if (Deck.isNoCardBack(type)) {
      return makeNoCardBack.apply(this);
    }
    return makeRegular.apply(this);
  }
}

export default Deck;
