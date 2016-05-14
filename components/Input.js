import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Input = ({
  id,
  onClick,
  children,
  inputType
}) => {
  let inputClass = classnames({
    ui: true,
    input: true,
    [inputType]: inputType
  });

  return (
    <div
      id={id}
      onClick={onClick}
      className={inputClass}
    >
      {children}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  inputType: PropTypes.string
};

export default Input;
