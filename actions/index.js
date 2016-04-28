import * as types from '../constants';
import fetch from 'isomorphic-fetch';

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

function queryFailure(sql, error) {
  return {
    type: types.QUERY_FAILURE,
    receivedAt: Date.now(),
    error,
    sql
  };
}

export function executeQuery(sql, url = '') {
  return dispatch => {
    dispatch(queryRequest(sql));
    return fetch(`${url}/api/impala/${sql}`)
      .then((response) => Promise.all([response.status, response.json()]))
      .then((arr) => {
        const status = arr[0];
        const result = arr[1];
        if (status >= 200 && status < 300) {
          return dispatch(querySuccess(sql, result));
        }
        return dispatch(queryFailure(sql, result));
      })
      .catch((error) => {
        queryFailure(`Execution failed: ${error}`);
      });
  };
}

export function queryDelete(id) {
  return {
    type: types.QUERY_DELETE,
    id
  };
}

export function querySave(sql, title, description) {
  return {
    type: types.QUERY_SAVE,
    description,
    title,
    sql
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

export function tableInvalidate() {
  return { type: types.TABLE_INVALIDATE };
}

function showTables(url = '') {
  return dispatch => {
    dispatch(tableRequest());
    return fetch(`${url}/api/impala/show tables`)
      .then((response) => Promise.all([response.status, response.json()]))
      .then((arr) => {
        const status = arr[0];
        const result = arr[1];
        if (status >= 200 && status < 300) {
          return dispatch(tableSuccess(result));
        }
        return dispatch(tableFailure(result));
      })
      .catch((error) => {
        tableFailure(`Execution failed: ${error}`);
      });
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

export function showTablesIfNeeded(url = '') {
  return (dispatch, getState) => {
    if (shouldShowTables(getState())) {
      return dispatch(showTables(url));
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

function showColumns(table, url = '') {
  return dispatch => {
    dispatch(columnRequest(table));
    return fetch(`${url}/api/impala/show column stats ${table}`)
      .then((response) => Promise.all([response.status, response.json()]))
      .then((arr) => {
        const status = arr[0];
        const result = arr[1];
        if (status >= 200 && status < 300) {
          return dispatch(columnSuccess(table, result));
        }
        return dispatch(columnFailure(table, result));
      })
      .catch((error) => {
        columnFailure(`Execution failed: ${error}`);
      });
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

export function showColumnsIfNeeded(table, url = '') {
  return (dispatch, getState) => {
    if (shouldShowColumns(getState(), table)) {
      return dispatch(showColumns(table, url));
    }
  };
}

/* Error Action */

export function resetErrorMessage() {
  return {
    type: types.RESET_ERROR_MESSAGE
  };
}
