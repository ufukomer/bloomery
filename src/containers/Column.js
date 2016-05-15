import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showColumnsIfNeeded } from '../actions';
import Item from '../components/Item';
import List from '../components/List';
import Loader from '../components/Loader';

class Column extends Component {

  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired,
    columns: PropTypes.array.isRequired,
    selectedTable: PropTypes.string.isRequired,
    showColumns: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTable !== this.props.selectedTable) {
      const { showColumns, selectedTable } = nextProps;
      showColumns(selectedTable);
    }
  }

  render() {
    const { isPending, columns, isConnected } = this.props;
    const isEmpty = columns.length === 0;

    let emptyContent;
    if (isPending && isConnected) {
      emptyContent = <Loader />;
    } else {
      emptyContent = <div className="no-content">No content</div>;
    }

    return (
      <div className="columns">
        <Item itemType="header">Columns</Item>
        {isEmpty
          ? emptyContent :
          <List listType="middle aligned divided">
            {columns.map((column, i) =>
              <List.Item key={i}>
                <div className="data-type">
                  <span className="name">{column.name}</span>
                  <span className="type">({column.type})</span>
                </div>
              </List.Item>
            )}
          </List>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { columnsByTable, selectedTable, connection } = state;
  const {
    isPending,
    items: columns
  } = columnsByTable[selectedTable] || {
    isPending: false,
    items: []
  };

  return {
    isConnected: connection.isConnected,
    selectedTable,
    isPending,
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  showColumns: (selectedTable) => {
    dispatch(showColumnsIfNeeded(selectedTable));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);
