import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import { executeQuery } from '../actions';
import AceEditor from 'react-ace';

import 'brace/mode/sql';
import 'brace/theme/dawn';
import 'brace/ext/language_tools';

const options = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true
};

export default class Editor extends Component {
  componentDidMount() {
    $('.menu .item').tab();
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="sql"
          theme="dawn"
          width="auto"
          height="300px"
          editorProps={{ $blockScrolling: true }}
          showPrintMargin={false}
          enableBasicAutocompletion
        />
        <div className="ui secondary pointing menu">
          <a className="item active" data-tab="first">Recent Queries</a>
          <a className="item" data-tab="second">Second</a>
          <a className="item" data-tab="third">Third</a>
          <div className="right menu">
            <div className="item">
              <div className="ui transparent icon input">
                <button className="ui button">Execute</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui bottom attached tab segment active" data-tab="first">
          First
        </div>
        <div className="ui bottom attached tab segment" data-tab="second">
          Second
        </div>
        <div className="ui bottom attached tab segment" data-tab="third">
          Third
        </div>
      </div>
    );
  }
}
