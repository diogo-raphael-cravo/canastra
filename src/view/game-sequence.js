import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import '../style/game-sequence.css';

import { moveToSequence } from './game';
import Sequence from './sequence';

const sequenceTarget = {
  drop(props) {
    moveToSequence(props.sequenceIndex);
    console.log('dropped')
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class GameSequence extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>
        <Sequence className={isOver ? 'drop-target' : ''}>{this.props.children}</Sequence>
      </div>
    );
  }
}

export default DropTarget('card', sequenceTarget, collect)(GameSequence);
