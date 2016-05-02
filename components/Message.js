import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Message = ({
  visible,
  children
}) => {
  let messageClass = classnames({
    ui: true,
    visible,
    message: true
  });

  return (
    <div className={messageClass}>
      {children}
    </div>
  );
};

Message.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any
};

export default Message;
