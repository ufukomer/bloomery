import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Table from '../containers/Table';
import Column from '../containers/Column';
import Editor from '../containers/Editor';
import Head from '../components/Head';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <div id="navbar" className="ui top attached">
            <Head title="Bloomery" />
          </div>
          <div id="content" className="ui column grid">
            <div className="stretched row">
              <div className="left floated four wide column">
                <div className="ui attached segment">
                  <Table />
                  <Column />
                </div>
              </div>
              <div className="right floated twelve wide column">
                <div className="ui attached segment">
                  <Editor />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
