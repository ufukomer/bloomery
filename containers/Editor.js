import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import { executeQuery, querySave, saveCurrentText } from '../actions';
import Button from '../components/Button';
import Menu from '../components/Menu';
import Item from '../components/Item';
import TabSegment from '../components/TabSegment';
import RecentQueryTable from '../components/RecentQueryTable';
import AceEditor from '../components/AceEditor';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import Form from '../components/Form';
import Field from '../components/Field';

import 'brace/mode/sql';
import 'brace/theme/dawn';
import 'brace/ext/language_tools';

export default class Editor extends Component {

  static propTypes = {
    result: PropTypes.array,
    isPending: PropTypes.bool,
    lastQuery: PropTypes.string,
    currentText: PropTypes.string,
    recentQueries: PropTypes.array,
    querySave: PropTypes.func.isRequired,
    executeQuery: PropTypes.func.isRequired,
    saveCurrentText: PropTypes.func.isRequired
  }

  componentDidMount() {
    // Save query
    $('.ui.modal').modal({ detachable: false });
    $('.ui.modal').modal('attach events', '#save-button', 'show');

    // Dimmer color
    $('.dimmer').css('background-color', 'rgba(49,59,67,0.5)');

    // From validation
    $('#save-query-form.ui.form').form({
      inline: true,
      on: 'blur',
      fields: {
        title: {
          identifier: 'title',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a title'
            }
          ]
        }
      }
    });

    // Save button
    $('#save-button').popup({
      on: 'hover',
      lastResort: true
    });

    // Editor menu
    $('.menu .item').tab();
  }

  componentWillUpdate(nextProps) {
    const currentQuery = this.refs._editor.getQuery()
      .replace(/(?:\r\n|\r|\n)/g, ' \n');
    if (currentQuery.trim() !== '') {
      if (nextProps.currentText !== currentQuery) {
        nextProps.saveCurrentText(currentQuery);
      }
    }
  }

  render() {
    const {
      result,
      isPending,
      lastQuery,
      currentText,
      recentQueries
    } = this.props;

    return (
      <div>
        <AceEditor
          mode="sql"
          theme="dawn"
          width="auto"
          height="300px"
          value={currentText}
          editorProps={{ $blockScrolling: Infinity }}
          showPrintMargin={false}
          enableBasicAutocompletion
          ref="_editor"
        />

        <Menu menuType="secondary pointing">
          <Item type="link" active dataTab="first">Recent Queries</Item>
          <Item type="link" dataTab="second">Saved Queries</Item>
          <Item type="link" dataTab="third">Results</Item>
          <Menu menuType="right">
            <Item type="link">
              <Button
                id="save-button"
                buttonType="icon"
                dataContent="Save the query"
                onClick={() => {
                  const currentQuery = this.refs._editor.getQuery()
                      .replace(/(?:\r\n|\r|\n)/g, ' \n');
                  this.props.saveCurrentText(currentQuery);
                }}
              >
                <Icon icon="save" />
              </Button>
            </Item>
            <Item type="link">
              <Button
                isPending={isPending}
                onClick={() => {
                  const currentQuery = this.refs._editor.getQuery()
                      .replace(/(?:\r\n|\r|\n)/g, ' \n');
                  return this.props.executeQuery(currentQuery);
                }}
              >
                Execute
              </Button>
            </Item>
          </Menu>
        </Menu>

        <Modal
          closeIcon modalSize="tiny"
        >
          <Modal.Header>
            Save Query
          </Modal.Header>
          <Modal.Content>
            <Form id="save-query-form">
              <Field label="Query">
                <AceEditor
                  mode="sql"
                  theme="dawn"
                  width="auto"
                  height="100px"
                  width="100%"
                  showGutter={false}
                  highlightActiveLine={false}
                  value={currentText}
                  editorProps={{ $blockScrolling: Infinity }}
                  showPrintMargin={false}
                  enableBasicAutocompletion
                  ref="_form_editor"
                />
              </Field>
              <Field label="Title">
                <input
                  ref="_title"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
              </Field>
              <Field label="Description">
                <textarea
                  ref="_description"
                  rows="2"
                  type="text"
                  name="description"
                  placeholder="Description"
                />
              </Field>
              <Button buttonType="submit"
                onClick={() => {
                  const currentQuery = this.refs._form_editor.getQuery()
                      .replace(/(?:\r\n|\r|\n)/g, ' \n');
                  if (currentQuery.trim() !== '') {
                    $('.ui .modal').modal('hide');

                    return this.props.querySave(
                      currentQuery,
                      this.refs._title.value,
                      this.refs._description.value
                    );
                  }
                }}
              >
                Save
              </Button>
              <Button
                buttonType="deny"
                onClick={() => $('.ui .modal').modal('hide')}
              >
                Cancel
              </Button>
            </Form>
          </Modal.Content>
        </Modal>

        <TabSegment active dataTab="first">
          <RecentQueryTable
            result={recentQueries}
            onQueryClick={(sql) => this.refs._editor.setQuery(sql)}
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
  const { query, text } = state;

  return {
    currentText: text,
    result: query.result,
    isPending: query.isPending,
    lastQuery: query.lastQuery,
    recentQueries: query.recentQueries
  };
};

const mapDispatchToProps = (dispatch) => ({
  executeQuery: (sql) => {
    if (sql.trim() !== '') {
      dispatch(executeQuery(sql));
    }
  },
  querySave: (sql, title, description) => {
    if (sql.trim() !== '') {
      dispatch(querySave(sql, title, description));
    }
  },
  saveCurrentText: (text) => {
    if (text.trim() !== '') {
      dispatch(saveCurrentText(text));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
