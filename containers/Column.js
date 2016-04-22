import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showColumnsIfNeeded } from '../actions';
import ListItem from '../components/ListItem';
import List from '../components/List';

class Column extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTable !== this.props.selectedTable) {
      const { dispatch, selectedTable } = nextProps;
      dispatch(showColumnsIfNeeded(selectedTable));
    }
  }

  render() {
    const { isPending, columns } = this.props;
    const isEmpty = columns.length === 0;

    return (
      <div>
        <List title="Columns">
          {isEmpty
            ? (isPending ? <div className="ui active inline loader"></div> : <div>No content</div>)
            :
            <div className="ui middle aligned divided list">
              {columns.map((column, i) =>
                <ListItem
                  key={i}
                  name={column.name}
                  type={column.type}
                />
              )}
            </div>
          }
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { columnsByTable, selectedTable } = state;
  const {
    isPending,
    items: columns
  } = columnsByTable[selectedTable] || {
    isPending: false,
    items: []
  };

  return {
    selectedTable,
    isPending,
    columns
  };
};

export default connect(mapStateToProps)(Column);
