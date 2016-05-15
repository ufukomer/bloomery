import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Form = ({
  id,
  children
}) => {
  let formClass = classnames({
    ui: true,
    form: true
  });

  return (
    <div id={id} className={formClass}>
      {children}
    </div>
  );
};

Form.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any
};

export default Form;
