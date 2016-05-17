import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('column actions', () => {
  describe('showColumnsIfNeeded', () => {
    const port = 3333;
    const url = `http://localhost:${port}`;

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create COLUMN_REQUEST and COLUMN_SUCCESS', (done) => {
      const table = 'customers';
      const expectedAction = [
        {
          type: types.COLUMN_REQUEST,
          table
        },
        {
          type: types.COLUMN_SUCCESS,
          columns: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
          ],
          table
        }
      ];
      const store = mockStore({
        columnsByTable: {}
      });

      nock(url)
        .get(`/api/impala/show%20column%20stats%20${table}`)
        .reply(200, [
          { Column: 'id', Type: 'INT' },
          { Column: 'name', Type: 'STRING' }
        ]);

      return store.dispatch(actions.showColumnsIfNeeded(table, url))
        .then(() => {
          const action = store.getActions();

          expect(action).toEqual(expectedAction);
        })
        .then(done)
        .catch(done);
    });

    it('should not create actions if isPending is true', () => {
      const table = 'customers';
      const store = mockStore({
        columnsByTable: {
          [table]: {
            isPending: true,
            items: []
          }
        }
      });

      expect(
        store.dispatch(actions.showColumnsIfNeeded(table, url)) || 'undefined'
      ).toEqual('undefined');
    });

    it('should create actions if columns.items.length > 0', (done) => {
      const table = 'customers';
      const expectedAction = [
        {
          type: types.COLUMN_REQUEST,
          table
        },
        {
          type: types.COLUMN_SUCCESS,
          columns: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
          ],
          table
        }
      ];
      const store = mockStore({
        columnsByTable: {
          [table]: {
            isPending: false,
            items: []
          }
        }
      });

      nock(url)
        .get(`/api/impala/show%20column%20stats%20${table}`)
        .reply(200, [
          { Column: 'id', Type: 'INT' },
          { Column: 'name', Type: 'STRING' }
        ]);

      return store.dispatch(actions.showColumnsIfNeeded(table, url))
        .then(() => {
          const action = store.getActions();

          expect(action).toEqual(expectedAction);
        })
        .then(done)
        .catch(done);
    });
  });
});
