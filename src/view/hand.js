import React, { Component } from 'react';
import '../style/hand.css';

class Hand extends Component {
  render() {
    const isEmpty = !this.props.children;
    if (isEmpty) {
      return (
        <div className="hand" />
      );
    }
    
    const howManyChildren = this.props.children.length || 1;
    if (howManyChildren > 13) {
      const hands = [];
      let i;
      for (i = 1; i < (howManyChildren/13) + 1; i++) {
        hands.push((
          <div className={`hand hand-of-13`}>
            {this.props.children.slice((i - 1) * 13, i * 13)}
          </div>
        ));
      }
      return (
        <div className="big-hand">
          {hands}
        </div>
      );
    }
    return (
      <div className={`hand hand-of-${howManyChildren}`}>{this.props.children}</div>
    );
  }
}

export default Hand;
