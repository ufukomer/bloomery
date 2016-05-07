import React, { PropTypes } from 'react';
import classnames from 'classnames';

const RecentQueryTable = ({
  result = [],
  tableType,
  onQueryClick
}) => {
  let queryTableClass = classnames({
    ui: true,
    celled: true,
    striped: true,
    table: true,
    [tableType]: tableType
  });

  return (
    <table className={queryTableClass}>
      <thead>
      <tr>
        <th>Query</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      {result.map((item, i) =>
        <tr key={i}>
          <td onClick={() => onQueryClick(item.sql)}>
            <code className={item.status ? 'success' : 'failed'}>
              {item.sql}
            </code>
          </td>
          <td>
            {item.status ? 'Success' : 'Failed'}
          </td>
          <td>
            {new Date(item.date).toLocaleString()}
          </td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

RecentQueryTable.propTypes = {
  tableType: PropTypes.string,
  onQueryClick: PropTypes.func,
  result: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default RecentQueryTable;
