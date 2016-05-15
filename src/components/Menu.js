import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Menu = ({
  menuType,
  children
}) => {
  let menuClass = classnames({
    ui: !menuType.includes('right'),
    menu: true,
    [menuType]: menuType
  });

  return (
    <div className={menuClass}>
      {children}
    </div>
  );
};

Menu.propTypes = {
  menuType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default Menu;
