import {
  QUERY_REQUEST,
  QUERY_SUCCESS,
  QUERY_FAILURE
} from '../constants';

function recentQuery(state = [], action) {
  switch (action.type) {
    case QUERY_SUCCESS:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) =>
            Math.max(todo.id, maxId), -1) + 1,
          sql: action.sql,
          date: action.receivedAt
        }
      ];
    default:
      return state;
  }
}

export default function query(state = {
  isPending: false,
  result: [],
  lastQuery: '',
  recentQueries: []
}, action) {
  switch (action.type) {
    case QUERY_REQUEST:
      return {
        ...state,
        isPending: true
      };
    case QUERY_SUCCESS:
      return {
        ...state,
        isPending: false,
        lastQuery: action.sql,
        result: action.result,
        recentQueries: recentQuery(state.recentQueries, action)
      };
    case QUERY_FAILURE:
      return {
        ...state,
        isPending: false,
        error: action.error
      };
    default:
      return state;
  }
}
