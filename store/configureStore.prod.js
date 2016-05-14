import { reducer, createLoader, createMiddleware } from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import { createStore, applyMiddleware } from 'redux';
import filter from 'redux-storage-decorator-filter';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import * as types from '../constants';

const includedActions = [
  types.CONNECTION_SUCCESS,
  types.QUERY_SUCCESS,
  types.QUERY_SAVE,
  types.QUERY_DELETE,
  types.SAVE_TEXT
];

export default function configureStore(initialState) {
  const engine = filter(
    createEngine('bloomery'),
    ['query', 'connection']
  );
  const store = createStore(
    reducer(rootReducer),
    applyMiddleware(
      thunkMiddleware,
      createMiddleware(engine, [], includedActions)
    ),
    initialState
  );

  createLoader(engine)(store);

  return store;
}
