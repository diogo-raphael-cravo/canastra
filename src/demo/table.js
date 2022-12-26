import React, { Component } from 'react';
import '../style/table.css';

class Table extends Component {
  render() {
    return (
      <div className={`table ${this.props.className}`}>{this.props.children}</div>
    );
  }
}

export default Table;
