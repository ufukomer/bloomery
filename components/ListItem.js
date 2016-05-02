import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ListItem = ({ children, key }) => {
  let itemClass = classnames({
    item: true
  });

  return (
    <div className={itemClass} key={key}>
      {children}
    </div>
  );
};

ListItem.propTypes = {
  key: PropTypes.number,
  children: PropTypes.any
};

export default ListItem;
