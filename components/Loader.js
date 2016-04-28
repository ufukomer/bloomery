import React from 'react';
import classnames from 'classnames';

const Loader = () => {
  let loaderClass = classnames({
    ui: true,
    active: true,
    inline: true,
    loader: true
  });

  return (
    <div className={loaderClass}></div>
  );
};

export default Loader;
