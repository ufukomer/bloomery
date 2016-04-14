import * as types from '../constants';
import { combineReducers } from 'redux';

function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === types.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

const rootReducer = combineReducers({
  errorMessage
});

export default rootReducer;
