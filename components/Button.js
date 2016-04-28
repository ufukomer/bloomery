import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Button = ({
  id,
  onClick,
  children,
  isPending,
  buttonType,
  buttonSize,
  dataContent
}) => {
  let btnClass = classnames({
    ui: true,
    button: true,
    loading: isPending,
    disabled: isPending,
    [buttonSize]: buttonSize,
    [buttonType]: buttonType
  });

  return (
    <button
      id={id}
      onClick={onClick}
      className={btnClass}
      data-content={dataContent}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  isPending: PropTypes.bool,
  buttonType: PropTypes.string,
  buttonSize: PropTypes.string,
  dataContent: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default Button;
