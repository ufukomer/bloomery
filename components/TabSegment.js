import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabSegment = ({
  active,
  dataTab,
  children
}) => {
  let tabSegmentClass = classnames({
    active,
    ui: true,
    tab: true,
    bottom: true,
    segment: true,
    attached: true
  });

  return (
    <div
      className={tabSegmentClass}
      data-tab={dataTab}
    >
      {children}
    </div>
  );
};

TabSegment.propTypes = {
  active: PropTypes.bool,
  dataTab: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default TabSegment;
