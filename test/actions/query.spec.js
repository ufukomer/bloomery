import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('query actions', () => {
  describe('queryDelete', () => {
    const id = 0;
    const expectedAction = {
      type: types.QUERY_DELETE,
      id
    };

    it('should create QUERY_DELETE', () => {
      expect(
        actions.queryDelete(id)
      ).toEqual(expectedAction);
    });
  });

  describe('querySave', () => {
    const sql = 'select salary from sample_07 where salary > 80000';
    const title = 'High salaries';
    const description = 'Query get the salaries higher than 80000';
    const expectedAction = {
      type: types.QUERY_SAVE,
      description,
      title,
      sql
    };

    it('should create QUERY_SAVE', () => {
      expect(
        actions.querySave(sql, title, description)
      ).toEqual(expectedAction);
    });
  });

  describe('executeQuery', () => {
    const sql = 'select * from sample_07 limit 1';
    const port = 3333;
    const url = `http://localhost:${port}`;

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create QUERY_REQUEST and QUERY_SUCCESS', (done) => {
      const expectedAction = { type: types.QUERY_REQUEST, sql };
      const store = mockStore({});

      nock(url)
        .get(`/api/impala/${encodeURIComponent(sql)}`)
        .reply(200, [
          {
            code: '00-0000',
            description: 'All Occupations',
            total_emp: '134354250',
            salary: '40690'
          }
        ]);

      return store.dispatch(actions.executeQuery(sql, url))
        .then(() => {
          const action = store.getActions();

          expect(action[0]).toEqual(expectedAction);
          expect(action[1].receivedAt).toExist();
          expect(action[1].type).toEqual('QUERY_SUCCESS');
          expect(action[1].result).toEqual([{
            code: '00-0000',
            description: 'All Occupations',
            total_emp: '134354250',
            salary: '40690'
          }]);
          expect(action[1].sql).toEqual(sql);
        })
        .then(done)
        .catch(done);
    });
  });
});
