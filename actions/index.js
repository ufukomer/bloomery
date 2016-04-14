import * as types from '../constants';
import { createClient } from 'node-impala';

/* Query Actions */

function queryRequest(sql) {
  return {
    type: types.QUERY_REQUEST,
    sql
  };
}

function querySuccess(sql, result) {
  return {
    type: types.QUERY_SUCCESS,
    receivedAt: Date.now(),
    result,
    sql
  };
}

function queryFailure(error) {
  return {
    type: types.QUERY_FAILURE,
    error
  };
}

export function executeQuery(sql) {
  return dispatch => {
    dispatch(queryRequest(sql));
    return createClient({
      resultType: 'json-array'
    }).query(sql)
      .then(result => dispatch(querySuccess(sql, result)))
      .catch(error => dispatch(queryFailure(error)));
  };
}

/* Table Actions */

function tableRequest() {
  return { type: types.TABLE_REQUEST };
}

function tableSuccess(items) {
  return {
    type: types.TABLE_SUCCESS,
    items: items.map(table => table.name)
  };
}

function tableFailure(error) {
  return {
    type: types.TABLE_FAILURE,
    error
  };
}

export function tableSelect(table) {
  return {
    type: types.TABLE_SELECT,
    table
  };
}

export function tableInvalidate(table) {
  return {
    type: types.TABLE_INVALIDATE,
    table
  };
}

function showTables() {
  return dispatch => {
    dispatch(tableRequest());
    return createClient({
      resultType: 'json-array'
    }).query('show tables')
      .then(tables => dispatch(tableSuccess(tables)))
      .catch(error => dispatch(tableFailure(error)));
  };
}

function shouldShowTables(state) {
  const tables = state.tables;
  if (!tables.items.length > 0) {
    return true;
  }
  if (tables.isPending) {
    return false;
  }
  return tables.didInvalidate;
}

export function showTablesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldShowTables(getState())) {
      return dispatch(showTables());
    }
  };
}

/* Column Actions */

function columnRequest(table) {
  return {
    type: types.COLUMN_REQUEST,
    table
  };
}

function columnSuccess(table, columns) {
  return {
    type: types.COLUMN_SUCCESS,
    columns: columns.map((column) => ({
      name: column.Column.toLowerCase(),
      type: column.Type.toLowerCase()
    })),
    table
  };
}

function columnFailure(table, error) {
  return {
    type: types.COLUMN_FAILURE,
    table,
    error
  };
}

function showColumns(table) {
  return dispatch => {
    dispatch(columnRequest(table));
    return createClient({
      resultType: 'json-array'
    }).query(`show column stats ${table}`)
      .then(columns => dispatch(columnSuccess(table, columns)))
      .catch(error => dispatch(columnFailure(table, error)));
  };
}

function shouldShowColumns(state, table) {
  const columns = state.columnsByTable[table];
  if (!columns) {
    return true;
  }
  if (columns.isPending) {
    return false;
  }
  return !columns.items.length > 0;
}

export function showColumnsIfNeeded(table) {
  return (dispatch, getState) => {
    if (shouldShowColumns(getState(), table)) {
      return dispatch(showColumns(table));
    }
  };
}

/* Error Action */

export function resetErrorMessage() {
  return {
    type: types.RESET_ERROR_MESSAGE
  };
}
