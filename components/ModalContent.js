import React, { PropTypes } from 'react';
import classNames from 'classnames';

const ModalContent = ({ children }) => {
  let contentClass = classNames({
    content: true
  });

  return (
    <div className={contentClass}>
      {children}
    </div>
  );
};

ModalContent.propTypes = {
  children: PropTypes.any
};

export default ModalContent;
