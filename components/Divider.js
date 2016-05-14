import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Divider = ({
  children,
  dividerType
}) => {
  let dividerClass = classnames({
    ui: true,
    divider: true,
    [dividerType]: dividerType
  });

  return (
    <div className={dividerClass}>
      {children}
    </div>
  );
};

Divider.propTypes = {
  children: PropTypes.any,
  dividerType: PropTypes.string
};

export default Divider;
