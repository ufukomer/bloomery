import http from 'http';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';
import app from '../../src/server';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('impala connection actions', () => {
  describe('connectImpala', () => {
    const config = {
      host: '127.0.0.1',
      port: 21000
    };
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

    it('should create CONNECTION_REQUEST and CONNECTION_SUCCESS or CONNECTION_FAILURE', (done) => {
      const expectedAction = { type: types.CONNECTION_REQUEST };
      const store = mockStore({});

      store.dispatch(actions.connectImpala(config, url))
        .then(() => {
          const action = store.getActions();

          if (action[1].error) {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('CONNECTION_FAILURE');
            expect(action[1].error).toBeA('string');
          } else {
            expect(action[0]).toEqual(expectedAction);
            expect(action[1].type).toEqual('CONNECTION_SUCCESS');
            expect(action[1].config).toBeAn('object');
            expect(action[1].message).toBeA('string');
          }
        })
        .then(done)
        .catch(done);
    });
  });
});
