import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;

require('./assets/css/index.css');

require('./semantic/dist/components/tab');
require('./semantic/dist/components/popup');
require('./semantic/dist/components/state');
require('./semantic/dist/components/transition');

const store = configureStore();

$(document).ready(() => {
  render(
    <Root store={store} />,
    document.getElementById('root')
  );
});
