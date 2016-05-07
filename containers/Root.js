import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Table from '../containers/Table';
import Column from '../containers/Column';
import Editor from '../containers/Editor';
import Navbar from '../containers/Navbar';

const Root = ({ store }) => (
  <Provider store={store}>
    <div id="app">
      <div id="navbar" className="ui top attached">
        <Navbar title="Bloomery" />
      </div>
      <div id="content" className="ui column internally celled grid">
        <div className="stretched two column row">
          <div className="left floated three wide column">
            <div id="table" className="ui segment">
              <Table />
              <Column />
            </div>
          </div>
          <div className="right floated thirteen wide column">
            <div className="ui segment">
              <Editor />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
