import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import { resetErrorMessage } from '../actions';
import Message from '../components/Message';

class Error extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
  }

  componentDidMount() {
    const self = this;
    $('#error-message.message .close').on('click', function () {
      $(this).closest('#error-message.message').fadeOut();
      self.props.resetErrorMessage();
    });
  }

  render() {
    const { errorMessage } = this.props;
    const isError = errorMessage !== null;

    return (
      <Message id="error-message" disabled={!isError} closeIcon messageType="error">
        {errorMessage}
      </Message>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state;

  return {
    errorMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetErrorMessage: () => {
    dispatch(resetErrorMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error);
