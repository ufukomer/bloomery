import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ScrollPane = ({ children }) => {
  let paneClass = classnames({
    ui: true,
    scroll: true,
    pane: true
  });

  return (
    <div className={paneClass}>
      {children}
    </div>
  );
};

ScrollPane.propTypes = {
  children: PropTypes.any
};

export default ScrollPane;
