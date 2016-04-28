import React, { PropTypes } from 'react';
import classnames from 'classnames';

const List = ({
  items,
  listType
}) => {
  let listClass = classnames({
    ui: true,
    list: true,
    [listType]: listType
  });

  return (
    <div className={listClass}>
      {items.map((item, i) =>
        <div className="item" key={i}>
          <div className="right floated content">
            {item.type}
          </div>
          <div className="content">
            {item.name}
          </div>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array,
  listType: PropTypes.string
};

export default List;
