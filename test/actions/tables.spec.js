import http from 'http';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';
import app from '../../server/server';

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
    const server = http.createServer(app);

    before((done) => {
      server.listen(port, (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });

    after((done) => {
      server.close();
      done();
    });

    it('should create TABLE_REQUEST and TABLE_SUCCESS or TABLE_FAILURE', (done) => {
      const expectedAction = { type: types.TABLE_REQUEST };
      const store = mockStore({
        tables: {
          isPending: false,
          didInvalidate: false,
          items: []
        }
      });

      store.dispatch(actions.showTablesIfNeeded(url))
        .then(() => {
          const action = store.getActions();

          if (action[1].error) {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('TABLE_FAILURE');
            expect(action[1].error).toBeAn('string');
          } else {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('TABLE_SUCCESS');
            expect(action[1].items).toBeAn('object');
          }
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
      const expectedAction = { type: types.TABLE_REQUEST };
      const store = mockStore({
        tables: {
          isPending: false,
          didInvalidate: true,
          items: ['customers', 'sample_07', 'sample_08']
        }
      });

      store.dispatch(actions.showTablesIfNeeded(url))
        .then(() => {
          const action = store.getActions();

          if (action[1].error) {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('TABLE_FAILURE');
            expect(action[1].error).toBeAn('string');
          } else {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('TABLE_SUCCESS');
            expect(action[1].items).toBeAn('object');
          }
        })
        .then(done)
        .catch(done);
    });
  });
});
