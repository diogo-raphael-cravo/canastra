import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import '../style/card.css';

import CardMark from './card-mark';
import CardSuit from './card-suit';
import Joker from './joker';

import CardNames from '../constants/card-names';

const cardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      suit: props.suit,
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Card extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    const name = this.props.name || '';
    const suit = this.props.suit;
    const className = this.props.className || '';
    
    const isAce = CardNames.isAce(name);
    const isN_2 = CardNames.isN_2(name);
    const isN_3 = CardNames.isN_3(name);
    const isN_4 = CardNames.isN_4(name);
    const isN_5 = CardNames.isN_5(name);
    const isN_6 = CardNames.isN_6(name);
    const isN_7 = CardNames.isN_7(name);
    const isN_8 = CardNames.isN_8(name);
    const isN_9 = CardNames.isN_9(name);
    const isN_10 = CardNames.isN_10(name);
    const isJack = CardNames.isJack(name);
    const isQueen = CardNames.isQueen(name);
    const isKing = CardNames.isKing(name);
    const isJoker = CardNames.isJoker(name);
    const isSomething = isAce || isN_2 || isN_3 || isN_4 || isN_5 || isN_6 || isN_7 || isN_8
      || isN_9 || isN_10 || isJack || isQueen || isKing || isJoker;
    
    function makeAce() {
      return (
        <div className="ace-content">
          <CardSuit suit={suit}/>
        </div>
      );
    }
    
    function makeN_2() {
      return (
        <div className="number-content col">
          <div className="number-group">
            <CardSuit suit={suit}/>
          </div>
          <div className="number-group">
            <CardSuit suit={suit} className="upside-down"/>
          </div>
        </div>
      );
    }
    
    function makeN_3() {
      return (
        <div className="number-content col">
          <div className="number-group">
            <CardSuit suit={suit}/>
          </div>
          <div className="number-group">
            <CardSuit suit={suit} className="center"/>
          </div>
          <div className="number-group">
            <CardSuit suit={suit} className="upside-down"/>
          </div>
        </div>
      );
    }
    
    function makeN_4() {
      return (
        <div className="number-content col">
          <div className="flex-full">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
          </div>
          <div className="flex-full">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeN_5() {
      return (
        <div className="number-content col">
          <div className="flex-full">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
          </div>
          <div className="number-group">
            <CardSuit suit={suit} className="center"/>
          </div>
          <div className="flex-full">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeN_6() {
      return (
        <div className="number-content col">
          <div className="flex-full">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
          </div>
          <div className="flex-full vertical-center">
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
          </div>
          <div className="flex-full">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeN_7() {
      return (
        <div className="number-content">
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="vertical-center"/>
            </div>
            <div className="number-group">
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeN_8() {
      return (
        <div className="number-content">
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="vertical-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="vertical-center upside-down"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeN_9() {
      return (
        <div className="number-content">
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="vertical-center"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeN_10() {
      return (
        <div className="number-content">
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="vertical-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="vertical-center upside-down"/>
            </div>
          </div>
          <div className="flex col horizontal-center">
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
            <div className="number-group">
              <CardSuit suit={suit} className="horizontal-center upside-down"/>
            </div>
          </div>
        </div>
      );
    }
    
    function makeRoyal() {
      return (
        <div className="ace-content">
          <div>{name}</div>
        </div>
      );
    }
    
    function makeJoker() {
      return (
        <div className="ace-content">
          <Joker />
        </div>
      );
    }
    
    return connectDragSource(
      <div className={`card ${className}`}
           onClick={this.props.onClick}
      >
        {isSomething && <CardMark name={name} suit={suit}/>}
        {(isKing || isQueen || isJack) && makeRoyal.apply(this)}
        {isAce && makeAce.apply(this)}
        {isJoker && makeJoker.apply(this)}
        {isN_2 && makeN_2.apply(this)}
        {isN_3 && makeN_3.apply(this)}
        {isN_4 && makeN_4.apply(this)}
        {isN_5 && makeN_5.apply(this)}
        {isN_6 && makeN_6.apply(this)}
        {isN_7 && makeN_7.apply(this)}
        {isN_8 && makeN_8.apply(this)}
        {isN_9 && makeN_9.apply(this)}
        {isN_10 && makeN_10.apply(this)}
        {isSomething && <CardMark name={name} suit={suit} className="upside-down"/>}
      </div>
    );
  }
}

export default DragSource('card', cardSource, collect)(Card);
