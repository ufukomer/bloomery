import {
  TABLE_REQUEST, TABLE_SUCCESS,
  TABLE_FAILURE, TABLE_INVALIDATE,
  TABLE_SELECT
} from '../constants';

export function selectedTable(state = '', action) {
  switch (action.type) {
    case TABLE_SELECT:
      return action.table;
    default:
      return state;
  }
}

export function tables(state = {
  isPending: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case TABLE_INVALIDATE:
      return {
        ...state,
        didInvalidate: true
      };
    case TABLE_REQUEST:
      return {
        ...state,
        isPending: true,
        didInvalidate: false
      };
    case TABLE_SUCCESS:
      return {
        ...state,
        isPending: false,
        items: action.items,
        didInvalidate: false
      };
    case TABLE_FAILURE:
      return {
        ...state,
        isPending: false,
        error: action.error,
        didInvalidate: true
      };
    default:
      return state;
  }
}
