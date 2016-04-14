import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/index';
import * as types from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('column actions', () => {
  describe('showColumnsIfNeeded', () => {
    it('should create COLUMN_REQUEST and COLUMN_SUCCESS or COLUMN_FAILURE', (done) => {
      const table = 'customers';
      const expectedAction = {
        type: types.COLUMN_REQUEST,
        table
      };
      const store = mockStore({
        columnsByTable: {}
      });

      store.dispatch(actions.showColumnsIfNeeded(table))
        .then(() => {
          const action = store.getActions();

          expect(action[0]).toEqual(expectedAction);
          expect(action[1].type).toContain('COLUMN_');
          expect(action[1].columns || action[1].error).toBeAn('object');
          expect(action[1].table).toEqual(table);
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
        store.dispatch(actions.showColumnsIfNeeded(table)) || 'undefined'
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

      store.dispatch(actions.showColumnsIfNeeded(table))
        .then(() => {
          const action = store.getActions();

          expect(action[0]).toEqual(expectedAction);
          expect(action[1].type).toContain('COLUMN_');
          expect(action[1].columns || action[1].error).toBeAn('object');
          expect(action[1].table).toEqual(table);
        })
        .then(done)
        .catch(done);
    });
  });
});
