import React, { Component, PropTypes } from 'react';

export default class List extends Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
