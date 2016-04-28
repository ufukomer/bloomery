import React, { PropTypes } from 'react';
import Menu from '../components/Menu';
import Item from '../components/Item';

const Navbar = ({ title }) => (
  <Menu menuType="fixed">
    <Item>
      {title}
    </Item>
  </Menu>
);

Navbar.propTypes = {
  title: PropTypes.string
};

export default Navbar;
