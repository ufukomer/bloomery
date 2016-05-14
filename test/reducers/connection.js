import expect from 'expect';
import reducer from '../../reducers/connection';
import * as types from '../../constants';

describe('connection reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isConnecting: false,
      isConnected: false,
      config: {
        host: '127.0.0.1',
        port: 21000
      }
    });
  });

  it('should handle CONNECTION_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.CONNECTION_REQUEST
      })).toEqual({
        isConnecting: true
      }
    );
  });

  it('should handle CONNECTION_SUCCESS', () => {
    const message = 'Connection is established.';
    const config = {
      host: '192.168.0.3',
      port: 21000
    };
    expect(
      reducer({}, {
        type: types.CONNECTION_SUCCESS,
        config,
        message
      })).toEqual({
        isConnecting: false,
        isConnected: true,
        config,
        message
      }
    );
  });

  it('should handle CONNECTION_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.CONNECTION_FAILURE
      })).toEqual({
        isConnecting: false,
        isConnected: false
      }
    );
  });
});
