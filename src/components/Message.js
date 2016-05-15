import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const Message = ({
  id,
  visible,
  negative,
  closeIcon,
  children,
  header,
  disabled,
  messageType
}) => {
  let messageClass = classnames({
    ui: true,
    visible,
    negative,
    disabled,
    message: true,
    [messageType]: messageType
  });

  let icon;
  if (closeIcon) {
    icon = (
      <Icon icon="close" />
    );
  }

  let headerContent;
  if (header) {
    headerContent = (
      <div className="header">{header}</div>
    );
  }

  return (
    <div id={id} className={messageClass}>
      {icon}
      {headerContent}
      {children}
    </div>
  );
};

Message.propTypes = {
  id: PropTypes.string,
  header: PropTypes.string,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  negative: PropTypes.bool,
  closeIcon: PropTypes.bool,
  messageType: PropTypes.string
};

export default Message;
