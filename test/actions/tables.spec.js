import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/index';
import * as types from '../../constants';

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
      const table = 'customers';
      const expectedAction = {
        type: types.TABLE_INVALIDATE,
        table
      };

      expect(actions.tableInvalidate(table)).toEqual(expectedAction);
    });
  });

  describe('showTablesIfNeeded', () => {
    it('should create TABLE_REQUEST and TABLE_SUCCESS or TABLE_FAILURE', (done) => {
      const expectedAction = { type: types.TABLE_REQUEST };
      const store = mockStore({
        tables: {
          isPending: false,
          didInvalidate: false,
          items: []
        }
      });

      store.dispatch(actions.showTablesIfNeeded())
        .then(() => {
          const action = store.getActions();

          expect(action[0]).toEqual(expectedAction);
          expect(action[1].type).toContain('TABLE_');
          expect(action[1].items || action[1].error).toBeAn('object');
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
        store.dispatch(actions.showTablesIfNeeded()) || 'undefined'
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

      store.dispatch(actions.showTablesIfNeeded())
        .then(() => {
          const action = store.getActions();

          expect(action[0]).toEqual(expectedAction);
          expect(action[1].type).toContain('TABLE_');
          expect(action[1].items || action[1].error).toBeAn('object');
        })
        .then(done)
        .catch(done);
    });
  });
});
