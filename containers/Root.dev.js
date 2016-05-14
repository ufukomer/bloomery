import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Table from './Table';
import Column from './Column';
import Editor from './Editor';
import Navbar from './Navbar';
import Error from './Error';
import DevTools from './DevTools';

const Root = ({ store }) => (
  <Provider store={store}>
    <div id="app">
      <div id="navbar" className="ui top attached">
        <Navbar />
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
            <Error />
            <div className="ui segment">
              <Editor />
            </div>
          </div>
        </div>
      </div>
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
