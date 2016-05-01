import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ModalHeader = ({ children }) => {
  let headerClass = classnames({
    header: true
  });

  return (
    <div className={headerClass}>
      {children}
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.any
};

export default ModalHeader;
