import React, { Component, PropTypes } from 'react';

export default class MenuItem extends Component {
  render() {
    const { name, onClick } = this.props;
    return (
      <a className="item" onClick={onClick}>
        {name}
      </a>
    );
  }
}
