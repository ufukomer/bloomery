import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/index';
import * as types from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('query actions', () => {
  describe('executeQuery', () => {
    it('should create QUERY_REQUEST and QUERY_SUCCESS or QUERY_FAILURE', (done) => {
      const sql = 'select * from sample_07 limit 5';
      const expectedAction = {
        type: types.QUERY_REQUEST,
        sql
      };
      const store = mockStore({});

      store.dispatch(actions.executeQuery(sql))
        .then(() => {
          const action = store.getActions();

          expect(action[0]).toEqual(expectedAction);
          expect(action[1].type).toContain('QUERY_');
          expect(action[1].receivedAt).toBeA('number');
          expect(action[1].result || action[1].error).toBeAn('object');
        })
        .then(done)
        .catch(done);
    });
  });
});
