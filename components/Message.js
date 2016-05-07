import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Message = ({
  visible,
  negative,
  children
}) => {
  let messageClass = classnames({
    ui: true,
    visible,
    negative,
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
  children: PropTypes.any,
  negative: PropTypes.bool
};

export default Message;
