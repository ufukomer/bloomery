import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import {
  executeQuery, querySave,
  saveCurrentText, queryDelete
} from '../actions';
import Menu from '../components/Menu';
import Item from '../components/Item';
import List from '../components/List';
import Icon from '../components/Icon';
import Form from '../components/Form';
import Field from '../components/Field';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Message from '../components/Message';
import AceEditor from '../components/AceEditor';
import ScrollPane from '../components/ScrollPane';
import TabSegment from '../components/TabSegment';
import SavedQueryItem from '../components/SavedQueryItem';
import RecentQueryTable from '../components/RecentQueryTable';
import QueryResultTable from '../components/QueryResultTable';

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
    savedQueries: PropTypes.array,
    querySave: PropTypes.func.isRequired,
    queryDelete: PropTypes.func.isRequired,
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

  render() {
    const {
      result,
      isPending,
      lastQuery,
      currentText,
      recentQueries,
      savedQueries
    } = this.props;

    const isRecentQueriesEmpty = !recentQueries.length > 0;
    const isSavedQueriesEmpty = !savedQueries.length > 0;
    const isResultEmpty = !result.length > 0;
    const isCurrentTextEmpty = currentText.trim() === '';

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
                  const editorText = this.refs._editor.getQuery()
                      .replace(/(?:\r\n|\r|\n)/g, ' \n');
                  if (editorText !== currentText) {
                    this.props.saveCurrentText(editorText);
                  }
                }}
              >
                <Icon icon="save" />
              </Button>
            </Item>
            <Item type="link">
              <Button
                isPending={isPending}
                onClick={() => {
                  const editorText = this.refs._editor.getQuery()
                      .replace(/(?:\r\n|\r|\n)/g, ' \n');
                  if (editorText !== currentText) {
                    this.props.saveCurrentText(editorText);
                  }
                  return this.props.executeQuery(editorText);
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
                {isCurrentTextEmpty ?
                  <Message negative visible>
                    <span>Please write a query on editor!</span>
                  </Message> :
                  <Message visible>
                    <code>{currentText}</code>
                  </Message>
                }
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
              <div className="ui two bottom attached buttons">
                <Button
                  buttonType="submit"
                  onClick={() => {
                    const title = this.refs._title.value;
                    if (currentText.trim() !== '' && title.trim() !== '') {
                      try {
                        return this.props.querySave(
                          currentText,
                          title,
                          this.refs._description.value
                        );
                      } catch (error) {
                        console.error(error);
                      } finally {
                        $('.ui .modal').modal('hide');
                        $('#save-query-form.ui.form').form('clear');
                      }
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
              </div>
            </Form>
          </Modal.Content>
        </Modal>

        <TabSegment active dataTab="first">
          <ScrollPane>
            {isRecentQueriesEmpty ?
              <Message visible>
                <p>There is no recent query yet.</p>
              </Message> :
              <RecentQueryTable
                result={recentQueries}
                onQueryClick={(sql) => this.refs._editor.setQuery(sql)}
              />
            }
          </ScrollPane>
        </TabSegment>
        <TabSegment dataTab="second">
          <ScrollPane>
            {isSavedQueriesEmpty ?
              <Message visible>
                <p>There is no saved query yet.</p>
              </Message> :
              <List listType="middle aligned">
                {savedQueries.map((query, i) =>
                  <List.Item key={i} listItemType="saved-query-item">
                    <List.Content>
                      <SavedQueryItem
                        title={query.title}
                        description={query.description}
                        query={query.sql}
                        isPending={isPending}
                        onRunClick={() => {
                          const editorText = this.refs._editor.getQuery()
                              .replace(/(?:\r\n|\r|\n)/g, ' \n');
                          if (editorText !== currentText) {
                            this.props.saveCurrentText(editorText);
                          }
                          return this.props.executeQuery(query.sql);
                        }}
                        onDeleteClick={() => {
                          const editorText = this.refs._editor.getQuery()
                              .replace(/(?:\r\n|\r|\n)/g, ' \n');
                          if (editorText !== currentText) {
                            this.props.saveCurrentText(editorText);
                          }
                          return this.props.queryDelete(query.id);
                        }}
                      />
                    </List.Content>
                  </List.Item>
                )}
              </List>
            }
          </ScrollPane>
        </TabSegment>
        <TabSegment dataTab="third">
          <ScrollPane>
            {isResultEmpty ?
              <Message visible>
                <p>There are no results yet.</p>
              </Message> :
              <QueryResultTable
                tableType="single line"
                result={result}
              />
            }
          </ScrollPane>
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
    recentQueries: query.recentQueries,
    savedQueries: query.savedQueries
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
  queryDelete: (id) => {
    dispatch(queryDelete(id));
  },
  saveCurrentText: (text) => {
    dispatch(saveCurrentText(text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
