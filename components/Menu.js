import React, { Component, PropTypes } from 'react';

export default class Menu extends Component {
  render() {
    return (
      <div className="ui vertical text menu">
        <div className="header item">{this.props.title}</div>
          {this.props.children}
      </div>
    );
  }
}
