import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showTablesIfNeeded, tableInvalidate, tableSelect } from '../actions';
import MenuItem from '../components/MenuItem';
import Menu from '../components/Menu';

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(showTablesIfNeeded());
  }

  handleChange(table) {
    this.props.dispatch(tableSelect(table));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    this.props.dispatch(tableInvalidate());
  }

  render() {
    const { tables, isPending } = this.props;
    const isEmpty = tables.length === 0;

    return (
      <div>
        <Menu title="Tables">
          {isEmpty
            ? (isPending ? <h4>Loading...</h4> : <h4>No content</h4>)
            :
            <div>
              {tables.map((table, i) =>
                <MenuItem
                  key={i}
                  name={table}
                  onClick={() => this.handleChange(table)}
                />
              )}
            </div>
          }
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tables } = state;

  return {
    tables: tables.items,
    isPending: tables.isPending
  };
};

export default connect(mapStateToProps)(Table);
