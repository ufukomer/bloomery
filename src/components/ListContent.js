import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ListContent = ({ children, contentType }) => {
  let contentClass = classnames({
    content: true,
    [contentType]: contentType
  });

  return (
    <div className={contentClass}>
      {children}
    </div>
  );
};

ListContent.propTypes = {
  children: PropTypes.any,
  contentType: PropTypes.string
};

export default ListContent;
