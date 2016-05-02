import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../components/Button';

const SavedQueryItem = ({
  id,
  query,
  title,
  description,
  onRunClick,
  onDeleteClick
}) => {
  let itemClass = classnames({});

  return (
    <div id={id} className={itemClass}>
      <div className="header">{title}</div>
      <div className="meta">
        <span className="cinema">{description}</span>
      </div>
      <div className="description">
        <div className="ui small message">
          <code>{query}</code>
        </div>
      </div>
      <div className="extra">
        <Button
          buttonSize="tiny" buttonType="right floated"
          onClick={onRunClick}
        >
          Run
        </Button>
        <Button
          buttonSize="tiny" buttonType="right floated basic"
          onClick={onDeleteClick}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

SavedQueryItem.propTypes = {
  id: PropTypes.string,
  query: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onRunClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default SavedQueryItem;
