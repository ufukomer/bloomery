import React, { PropTypes } from 'react';
import classnames from 'classnames';

const QueryResultTable = ({
  result = [],
  tableType
}) => {
  let queryTableClass = classnames({
    ui: true,
    celled: true,
    striped: true,
    table: true,
    [tableType]: tableType
  });

  const values = result.map((row) => {
    const item = [];
    for (const prop in row) {
      if ({}.hasOwnProperty.call(row, prop)) {
        item.push(row[prop]);
      }
    }
    return item;
  });

  return (
    <table className={queryTableClass}>
      <thead>
      <tr>
        <th></th>
        {Object.keys(result[0]).map((column, i) =>
          <th key={i}>{column}</th>
        )}
      </tr>
      </thead>
      <tbody>
      {values.map((row, i) =>
        <tr key={i}>
          <td>
            {i}
          </td>
          {row.map((item, j) =>
            <td key={j}>
              {item}
            </td>
          )}
        </tr>
      )}
      </tbody>
    </table>
  );
};

QueryResultTable.propTypes = {
  result: PropTypes.array,
  tableType: PropTypes.string
};

export default QueryResultTable;
