import {
  QUERY_REQUEST, QUERY_SUCCESS,
  QUERY_FAILURE, QUERY_SAVE,
  QUERY_DELETE
} from '../constants';

function recentQuery(state = [], action) {
  switch (action.type) {
    case QUERY_SUCCESS:
    case QUERY_FAILURE:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) =>
            Math.max(todo.id, maxId), -1) + 1,
          sql: action.sql,
          date: action.receivedAt,
          status: !action.error
        }
      ];
    default:
      return state;
  }
}

function savedQuery(state = [], action) {
  switch (action.type) {
    case QUERY_SAVE:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) =>
            Math.max(todo.id, maxId), -1) + 1,
          title: action.title,
          description: action.description,
          sql: action.sql
        }
      ];
    case QUERY_DELETE:
      return state.filter(queryItem =>
        queryItem.id !== action.id
      );
    default:
      return state;
  }
}

export default function query(state = {
  isPending: false,
  result: [],
  lastQuery: '',
  recentQueries: [],
  savedQueries: []
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
        lastQuery: action.sql,
        error: action.error,
        recentQueries: recentQuery(state.recentQueries, action)
      };
    case QUERY_SAVE:
    case QUERY_DELETE:
      return {
        ...state,
        savedQueries: savedQuery(state.savedQueries, action)
      };
    default:
      return state;
  }
}
