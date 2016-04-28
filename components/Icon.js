import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Icon = ({ icon }) => {
  let iconClass = classnames({
    icon: true,
    [icon]: icon
  });

  return (
    <i className={iconClass} />
  );
};

Icon.propTypes = {
  icon: PropTypes.string
};

export default Icon;
