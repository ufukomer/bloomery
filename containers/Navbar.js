import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import { connectImpala } from '../actions';
import Menu from '../components/Menu';
import Item from '../components/Item';
import Icon from '../components/Icon';
import Form from '../components/Form';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Divider from '../components/Divider';

class Navbar extends Component {

  static propTypes = {
    config: PropTypes.object,
    isConnected: PropTypes.bool,
    isConnecting: PropTypes.bool,
    message: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    connectImpala: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { config } = this.props;
    this.props.connectImpala(config);
    // Change settings modal
    $('#settings-modal.ui.modal').modal({ detachable: false });
  }

  render() {
    const {
      config,
      message,
      isConnected,
      isConnecting
    } = this.props;

    return (
      <div>
        <Menu menuType="fixed">
          <Item><h4>Bloomery</h4></Item>
          <Menu menuType="right">
            <Item
              itemType="link"
              onClick={() =>
                $('#settings-modal.ui.modal').modal('show')
              }
            >
              <Icon icon="setting icon"/>
              Settings
            </Item>
          </Menu>
        </Menu>

        <Modal
          id="settings-modal"
          closeIcon modalSize="tiny"
        >
          <Modal.Header>
            Connection Settings
          </Modal.Header>
          <Modal.Content>
            <Form id="settings-form">
              {!isConnected ?
                <Field label="Connection State">
                  <Label>
                    Impala
                    <Label.Detail>
                      <Label labelType="red empty circular" />
                    </Label.Detail>
                  </Label>
                  <span className="disconnected-message">
                    Connection could not be established.
                  </span>
                </Field> :
                <Field label="Connection State">
                  <Label>
                    Impala
                    <Label.Detail>
                      <Label labelType="green empty circular" />
                    </Label.Detail>
                  </Label>
                  <span className="connected-message">
                    {message}
                  </span>
                </Field>
              }
              <Field label="Host IP">
                <Input inputType="labeled right icon">
                  <Label>Host</Label>
                  <input
                    id="host"
                    type="text"
                    placeholder="Host"
                    defaultValue={config.host}
                  />
                </Input>
              </Field>
              <Field label="Port Number">
                <Input inputType="labeled right icon">
                  <Label>Port</Label>
                  <input
                    id="port"
                    type="text"
                    placeholder="Port"
                    defaultValue={config.port}
                  />
                </Input>
              </Field>
              <Divider />
              <div className="ui two bottom attached buttons">
                <Button
                  isPending={isConnecting}
                  onClick={() =>
                    this.props.connectImpala({
                      host: String(document.getElementById('host').value),
                      port: parseInt(document.getElementById('port').value)
                    })

                  }
                >
                  Connect
                </Button>
                <Button
                  buttonType="deny"
                  onClick={() =>
                    $('#settings-modal.ui.modal').modal('hide')
                  }
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { connection } = state;

  return {
    isConnecting: connection.isConnecting,
    isConnected: connection.isConnected,
    message: connection.message,
    config: connection.config
  };
};

const mapDispatchToProps = (dispatch) => ({
  connectImpala: (config) => {
    dispatch(connectImpala(config));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
