import React, { Component } from 'react';

import Table from './table';

import Card from '../view/card';
import Hand from '../view/hand';

import CardSuits from '../constants/card-suits';
import CardNames from '../constants/card-names';

class AllHands extends Component {
  render() {
    function makeAllHands(handCount) {
      const hands = [];
      for (let i = 1; i <= handCount; i++) {
        hands.push((
          <Hand>
            {makeHand(i)}
          </Hand>
        ));
      }
      return hands;
    }
    function makeHand(cardCount) {
      const allCards = CardNames.ALL_IN_A_SUIT.concat(CardNames.ALL_IN_A_SUIT)
        .concat(CardNames.ALL_IN_A_SUIT).concat(CardNames.ALL_IN_A_SUIT)
        .concat(CardNames.ALL_IN_A_SUIT);
      const suits = CardSuits.ALL_SUITS;
      const cards = allCards.slice(0, cardCount);
      return cards.map((name, i) => (<Card name={name} suit={suits[Math.floor((i/13)%4)]}/>));
    }
    return (
      <Table>
        {makeAllHands(13 * 4)}
      </Table>
    );
  }
}

export default AllHands;
