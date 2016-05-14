import {
  CONNECTION_REQUEST,
  CONNECTION_SUCCESS,
  CONNECTION_FAILURE
} from '../constants';

export default function connection(state = {
  isConnecting: false,
  isConnected: false,
  config: {
    host: '127.0.0.1',
    port: 21000
  }
}, action) {
  switch (action.type) {
    case CONNECTION_REQUEST:
      return {
        ...state,
        isConnecting: true
      };
    case CONNECTION_SUCCESS:
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        config: action.config,
        message: action.message
      };
    case CONNECTION_FAILURE:
      return {
        ...state,
        isConnecting: false,
        isConnected: false
      };
    default:
      return state;
  }
}
