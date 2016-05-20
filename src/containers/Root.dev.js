import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';

const Root = ({ store }) => (
  <Provider store={store}>
    <App>
      <DevTools />
    </App>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
