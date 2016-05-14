import { combineReducers } from 'redux';
import * as types from '../constants';
import { tables, selectedTable } from './tables';
import columnsByTable from './columns';
import connection from './connection';
import query from './query';
import text from './text';

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
  columnsByTable,
  selectedTable,
  errorMessage,
  connection,
  tables,
  query,
  text
});

export default rootReducer;
