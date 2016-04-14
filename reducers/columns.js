import {
  COLUMN_REQUEST,
  COLUMN_SUCCESS,
  COLUMN_FAILURE
} from '../constants';

function columns(state = {
  isPending: false,
  items: []
}, action) {
  switch (action.type) {
    case COLUMN_REQUEST:
      return {
        ...state,
        isPending: true
      };
    case COLUMN_SUCCESS:
      return {
        ...state,
        isPending: false,
        items: action.columns
      };
    case COLUMN_FAILURE:
      return {
        ...state,
        isPending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default function columnsByTable(state = {}, action) {
  switch (action.type) {
    case COLUMN_FAILURE:
    case COLUMN_REQUEST:
    case COLUMN_SUCCESS:
      return {
        ...state,
        [action.table]: columns(state[action.table], action)
      };
    default:
      return state;
  }
}
