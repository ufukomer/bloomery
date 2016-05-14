import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Field = ({
  label,
  required,
  children
}) => {
  let fieldClass = classnames({
    required,
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
  required: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

export default Field;
