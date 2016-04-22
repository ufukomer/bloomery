import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  render() {
    const { name, type } = this.props;
    return (
      <div className="item">
        <div className="right floated content">
          {type}
        </div>
        <div className="content">
          {name}
        </div>
      </div>
    );
  }
}
