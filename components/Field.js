import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Field = ({
  label,
  children
}) => {
  let fieldClass = classnames({
    field: true
  });

  return (
    <div className={fieldClass}>
      <label>{label}</label>
      {children}
    </div>
  );
};

Field.propTypes = {
  children: PropTypes.any,
  label: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

export default Field;
