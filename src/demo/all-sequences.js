import React, { Component } from 'react';

import Table from './table';

import Card from '../view/card';
import Sequence from '../view/sequence';

import CardSuits from '../constants/card-suits';
import CardNames from '../constants/card-names';

class AllSequences extends Component {
  render() {
    function makeAllSequences(handCount) {
      const hands = [];
      for (let i = 1; i <= handCount; i++) {
        hands.push((
          <Sequence>
            {makeSequence(i)}
          </Sequence>
        ));
      }
      return hands;
    }
    function makeSequence(cardCount) {
      const allCards = CardNames.ALL_IN_A_SUIT.concat(CardNames.ALL_IN_A_SUIT)
        .concat(CardNames.ALL_IN_A_SUIT).concat(CardNames.ALL_IN_A_SUIT)
        .concat(CardNames.ALL_IN_A_SUIT);
      const suits = CardSuits.ALL_SUITS;
      const cards = allCards.slice(0, cardCount);
      return cards.map((name, i) => (<Card name={name} suit={suits[Math.floor((i/13)%4)]}/>));
    }
    return (
      <Table>
        {makeAllSequences(13 * 4)}
      </Table>
    );
  }
}

export default AllSequences;
