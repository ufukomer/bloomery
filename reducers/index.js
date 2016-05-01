import * as types from '../constants';
import columnsByTable from './columns';
import query from './query';
import { tables, selectedTable } from './tables';
import text from './text';
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
  errorMessage,
  columnsByTable,
  tables,
  selectedTable,
  query,
  text
});

export default rootReducer;
