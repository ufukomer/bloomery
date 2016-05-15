import http from 'http';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';
import app from '../../server/server';

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
    const sql = 'select * from sample_07 limit 5';
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

    it('should create QUERY_REQUEST and QUERY_SUCCESS or QUERY_FAILURE', (done) => {
      const expectedAction = {
        type: types.QUERY_REQUEST,
        sql
      };
      const store = mockStore({});

      store.dispatch(actions.executeQuery(sql, url))
        .then(() => {
          const action = store.getActions();

          if (action[1].error) {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('QUERY_FAILURE');
            expect(action[1].error).toBeA('string');
            expect(action[1].sql).toBeA('string');
          } else {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('QUERY_SUCCESS');
            expect(action[1].receivedAt).toBeA('number');
            expect(action[1].result).toBeAn('object');
            expect(action[1].sql).toBeA('string');
          }
        })
        .then(done)
        .catch(done);
    });
  });
});
