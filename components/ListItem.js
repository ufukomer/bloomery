import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ListItem = ({ children, key, listItemType }) => {
  let itemClass = classnames({
    item: true,
    [listItemType]: listItemType
  });

  return (
    <div className={itemClass} key={key}>
      {children}
    </div>
  );
};

ListItem.propTypes = {
  key: PropTypes.number,
  children: PropTypes.any,
  listItemType: PropTypes.string
};

export default ListItem;
