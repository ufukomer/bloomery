import http from 'http';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/index';
import * as types from '../../constants';
import app from '../../server/server';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('column actions', () => {
  describe('showColumnsIfNeeded', () => {
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

    it('should create COLUMN_REQUEST and COLUMN_SUCCESS or COLUMN_FAILURE', (done) => {
      const table = 'customers';
      const expectedAction = {
        type: types.COLUMN_REQUEST,
        table
      };
      const store = mockStore({
        columnsByTable: {}
      });

      store.dispatch(actions.showColumnsIfNeeded(table, url))
        .then(() => {
          const action = store.getActions();

          if (action[1].error) {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toContain('COLUMN_FAILURE');
            expect(action[1].error).toBeAn('string');
            expect(action[1].table).toEqual(table);
          } else {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toContain('COLUMN_SUCCESS');
            expect(action[1].columns).toBeAn('object');
            expect(action[1].table).toEqual(table);
          }
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
      const expectedAction = {
        type: types.COLUMN_REQUEST,
        table
      };
      const store = mockStore({
        columnsByTable: {
          [table]: {
            isPending: false,
            items: []
          }
        }
      });

      store.dispatch(actions.showColumnsIfNeeded(table, url))
        .then(() => {
          const action = store.getActions();

          if (action[1].error) {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toContain('COLUMN_FAILURE');
            expect(action[1].error).toBeAn('string');
            expect(action[1].table).toEqual(table);
          } else {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toContain('COLUMN_SUCCESS');
            expect(action[1].columns).toBeAn('object');
            expect(action[1].table).toEqual(table);
          }
        })
        .then(done)
        .catch(done);
    });
  });
});
