import React, { Component } from 'react';
import '../style/sequence.css';

import Card from './card';

class Sequence extends Component {
  render() {
    const className = this.props.className;
    if (!this.props.children || this.props.children.length === 0) {
      return (<div className={`sequence empty ${className}`}><Card/></div>);
    }
    return (<div className={`sequence ${className}`}>{this.props.children}</div>);
  }
}

export default Sequence;
