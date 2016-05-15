import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;

require('./assets/css/index.css');

require('semantic-ui-tab/tab.min.js');
require('semantic-ui-form/form.min.js');
require('semantic-ui-modal/modal.min.js');
require('semantic-ui-popup/popup.min.js');
require('semantic-ui-dimmer/dimmer.min.js');
require('semantic-ui-transition/transition.min.js');

const store = configureStore();

$(document).ready(() => {
  render(
    <Root store={store} />,
    document.getElementById('root')
  );
});
