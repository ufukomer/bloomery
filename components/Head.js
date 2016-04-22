import React, { Component, PropTypes } from 'react';

export default class Head extends Component {
  render() {
    return (
      <div className="ui fixed menu">
        <div className="item">
          <h3>{this.props.title}</h3>
        </div>
      </div>
    );
  }
}
