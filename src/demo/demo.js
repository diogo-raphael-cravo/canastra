import React, { Component } from 'react';

import AllCards from './all-cards';
import AllHands from './all-hands';
import AllSequences from './all-sequences';

import CardBack from '../view/card-back';
import Deck from '../view/deck';

class Demo extends Component {
  render() {
    return (
      <div>
        <Deck/>
        <CardBack/>
        <AllCards/>
        <AllHands/>
        <AllSequences/>
      </div>
    );
  }
}

export default Demo;
