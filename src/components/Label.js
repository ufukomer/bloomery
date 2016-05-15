import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import LabelDetail from './LabelDetail';

class Label extends Component {

  static propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
    labelType: PropTypes.string
  }

  static Detail = LabelDetail

  render() {
    const {
      onClick,
      children,
      labelType
    } = this.props;
    let labelClass = classnames({
      ui: true,
      label: true,
      [labelType]: labelType
    });

    return (
      <div
        {...this.props}
        onClick={onClick}
        className={labelClass}
      >
        {children}
      </div>
    );
  }
}

export default Label;
