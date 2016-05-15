import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ModalFooter = ({ children }) => {
  let footerClass = classnames({
    actions: true
  });

  return (
    <div className={footerClass}>
      {children}
    </div>
  );
};

ModalFooter.propTypes = {
  children: PropTypes.any
};

export default ModalFooter;
