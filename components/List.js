import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import ListItem from './ListItem';
import ListContent from './ListContent';

class List extends Component {

  static propTypes = {
    listType: PropTypes.string,
    children: PropTypes.any
  }

  static Item = ListItem
  static Content = ListContent

  render() {
    const { listType } = this.props;
    let listClass = classnames({
      ui: true,
      list: true,
      [listType]: listType
    });

    return (
      <div className={listClass}>
        {this.props.children}
      </div>
    );
  }
}

export default List;
