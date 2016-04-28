import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import { executeQuery } from '../actions';
import Button from '../components/Button';
import Menu from '../components/Menu';
import Item from '../components/Item';
import TabSegment from '../components/TabSegment';
import RecentQueryTable from '../components/RecentQueryTable';
import AceEditor from '../components/AceEditor';
import Icon from '../components/Icon';

import 'brace/mode/sql';
import 'brace/theme/dawn';
import 'brace/ext/language_tools';

export default class Editor extends Component {

  static propTypes = {
    result: PropTypes.array.isRequired,
    isPending: PropTypes.bool.isRequired,
    lastQuery: PropTypes.string.isRequired,
    recentQueries: PropTypes.array.isRequired,
    executeQuery: PropTypes.func.isRequired
  }

  componentDidMount() {
    $('#save-icon').popup({
      on: 'hover',
      lastResort: true
    });
    $('.menu .item').tab();
  }

  render() {
    const {
      isPending,
      lastQuery,
      result,
      recentQueries
    } = this.props;

    return (
      <div>
        <AceEditor
          mode="sql"
          theme="dawn"
          width="auto"
          height="300px"
          value={lastQuery}
          editorProps={{ $blockScrolling: Infinity }}
          showPrintMargin={false}
          enableBasicAutocompletion
          ref="editor"
        />
        <Menu menuType="secondary pointing">
          <Item type="link" active dataTab="first">Recent Queries</Item>
          <Item type="link" dataTab="second">Saved Queries</Item>
          <Item type="link" dataTab="third">Results</Item>
          <Menu menuType="right">
            <Item type="link">
              <Button
                id="save-icon"
                buttonType="icon"
                dataContent="Save the query"
              >
                <Icon icon="save"/>
              </Button>
            </Item>
            <Item type="link">
              <Button
                isPending={isPending}
                onClick={() => {
                  const currentQuery = this.refs.editor.getQuery()
                      .replace(/(?:\r\n|\r|\n)/g, ' \n');
                  return this.props.executeQuery(currentQuery);
                }}
              >
                Execute
              </Button>
            </Item>
          </Menu>
        </Menu>

        <TabSegment active dataTab="first">
          <RecentQueryTable
            result={recentQueries}
            onQueryClick={(sql) => this.refs.editor.setQuery(sql)}
          />
        </TabSegment>
        <TabSegment dataTab="second">
          Second
        </TabSegment>
        <TabSegment dataTab="third">
          Third
        </TabSegment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { query } = state;

  return {
    isPending: query.isPending,
    lastQuery: query.lastQuery,
    result: query.result,
    recentQueries: query.recentQueries
  };
};

const mapDispatchToProps = (dispatch) => ({
  executeQuery: (sql) => {
    if (sql.trim() !== '') {
      dispatch(executeQuery(sql));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
