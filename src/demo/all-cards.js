import React, { Component } from 'react';

import Table from './table';

import Card from '../view/card';

import CardSuits from '../constants/card-suits';
import CardNames from '../constants/card-names';

class AllCards extends Component {
  render() {
    function makeSuit(suit) {
      return CardNames.ALL_IN_A_SUIT.map(name => (<Card name={name} suit={suit}/>));
    }
    return (
      <Table className="col">
        <Table className="row">
          <Card name={CardNames.JOKER}/>
        </Table>
        <Table className="row">
          {makeSuit(CardSuits.HEARTS)}
        </Table>
        <Table className="row">
          {makeSuit(CardSuits.CLUBS)}
        </Table>
        <Table className="row">
          {makeSuit(CardSuits.DIAMONDS)}
        </Table>
        <Table className="row">
          {makeSuit(CardSuits.SPADES)}
        </Table>
      </Table>
    );
  }
}

export default AllCards;
