import React, { PropTypes } from 'react';
import classNames from 'classnames';

const LabelDetail = ({ children }) => {
  let detailClass = classNames({
    detail: true
  });

  return (
    <div className={detailClass}>
      {children}
    </div>
  );
};

LabelDetail.propTypes = {
  children: PropTypes.any
};

export default LabelDetail;
