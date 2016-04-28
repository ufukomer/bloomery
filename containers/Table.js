import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import {
  showTablesIfNeeded,
  tableInvalidate,
  tableSelect
} from '../actions';
import Item from '../components/Item';
import Menu from '../components/Menu';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Loader from '../components/Loader';

class Table extends Component {

  static propTypes = {
    tables: PropTypes.array.isRequired,
    isPending: PropTypes.bool.isRequired,
    showTables: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.showTables();
  }

  render() {
    const {
      tables,
      isPending,
      showTables,
      onItemClick,
      handleRefresh
    } = this.props;
    const isEmpty = tables.length === 0;

    let emptyContent;
    if (isPending) {
      emptyContent = <Loader />;
    } else {
      emptyContent = <div>No content</div>;
    }

    return (
        <Menu
          title="Tables"
          menuType="demo vertical text"
        >
          <Item itemType="header">
            <span>Tables</span>
            <Button
              onClick={() => {
                handleRefresh();
                showTables();
              }}
              buttonType="circular basic icon"
              buttonSize="mini"
            >
              <Icon icon="refresh" />
            </Button>
          </Item>

          {isEmpty ? emptyContent :
            <div>
              {tables.map((table, i) =>
                <Item
                  type="link"
                  key={i}
                  onClick={() => onItemClick(table)}
                >{table}</Item>
              )}
            </div>
          }
        </Menu>
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

const mapDispatchToProps = (dispatch) => ({
  onItemClick: (table) => {
    dispatch(tableSelect(table));
  },
  showTables: () => {
    dispatch(showTablesIfNeeded());
  },
  handleRefresh: () => {
    dispatch(tableInvalidate());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
