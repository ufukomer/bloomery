import { reducer, createLoader, createMiddleware } from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';
import filter from 'redux-storage-decorator-filter';
import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
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
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        createLogger(),
        createMiddleware(engine, [], includedActions)
      ),
      DevTools.instrument()
    )
  );

  createLoader(engine)(store);

  return store;
}
