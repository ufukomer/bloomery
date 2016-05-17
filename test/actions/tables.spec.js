import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('table actions', () => {
  describe('tableSelect', () => {
    it('should create TABLE_SELECT', () => {
      const table = 'customers';
      const expectedAction = {
        type: types.TABLE_SELECT,
        table
      };

      expect(actions.tableSelect(table)).toEqual(expectedAction);
    });
  });

  describe('tableInvalidate', () => {
    it('should create TABLE_INVALIDATE', () => {
      const expectedAction = { type: types.TABLE_INVALIDATE };

      expect(actions.tableInvalidate()).toEqual(expectedAction);
    });
  });

  describe('showTablesIfNeeded', () => {
    const port = 3333;
    const url = `http://localhost:${port}`;

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create TABLE_REQUEST and TABLE_SUCCESS', (done) => {
      const expectedAction = [
        { type: 'TABLE_REQUEST' },
        { type: 'TABLE_SUCCESS', items: ['customers', 'sample_07', 'sample_08'] }
      ];
      const store = mockStore({
        tables: {
          isPending: false,
          didInvalidate: false,
          items: []
        }
      });

      nock(url)
        .get('/api/impala/show%20tables')
        .reply(200, [
          { name: 'customers' },
          { name: 'sample_07' },
          { name: 'sample_08' }
        ]);

      return store.dispatch(actions.showTablesIfNeeded(url))
        .then(() => {
          const action = store.getActions();

          expect(action).toEqual(expectedAction);
        })
        .then(done)
        .catch(done);
    });

    it('should not create actions if didInvalidate is false', () => {
      const store = mockStore({
        tables: {
          isPending: false,
          didInvalidate: false,
          items: ['customers', 'sample_07', 'sample_08']
        }
      });

      expect(
        store.dispatch(actions.showTablesIfNeeded(url)) || 'undefined'
      ).toEqual('undefined');
    });

    it('should create actions if didInvalidate is true', (done) => {
      const expectedAction = [
        { type: 'TABLE_REQUEST' },
        { type: 'TABLE_SUCCESS', items: ['customers', 'sample_07', 'sample_08'] }
      ];
      const store = mockStore({
        tables: {
          isPending: false,
          didInvalidate: true,
          items: ['customers', 'sample_07', 'sample_08']
        }
      });

      nock(url)
        .get('/api/impala/show%20tables')
        .reply(200, [
          { name: 'customers' },
          { name: 'sample_07' },
          { name: 'sample_08' }
        ]);

      return store.dispatch(actions.showTablesIfNeeded(url))
        .then(() => {
          const action = store.getActions();

          expect(action).toEqual(expectedAction);
        })
        .then(done)
        .catch(done);
    });
  });
});
