import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Item = ({
  type,
  active,
  dataTab,
  onClick,
  children,
  itemType
}) => {
  let itemClass = classnames({
    active,
    item: true,
    [itemType]: itemType
  });

  let content;
  switch (type) {
    case 'link':
      content = (
        <a
          className={itemClass}
          data-tab={dataTab}
          onClick={onClick}
        >
          {children}
        </a>
      );
      break;
    default:
      content = (
        <div
          className={itemClass}
          data-tab={dataTab}
          onClick={onClick}
        >
          {children}
        </div>
      );
  }

  return content;
};

Item.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  dataTab: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default Item;
