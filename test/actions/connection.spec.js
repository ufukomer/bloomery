import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/index';
import * as types from '../../src/constants';

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

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create CONNECTION_REQUEST and CONNECTION_SUCCESS', (done) => {
      const expectedAction = [
        { type: types.CONNECTION_REQUEST },
        {
          type: 'CONNECTION_SUCCESS',
          config: { host: '127.0.0.1', port: 21000 },
          message: 'Connection is established.'
        }
      ];
      const store = mockStore({});

      nock(url)
        .get(`/api/impala/config?host=${config.host}&port=${config.port}`)
        .reply(200, 'Connection is established.');

      store.dispatch(actions.connectImpala(config, url))
        .then(() => {
          const action = store.getActions();

          expect(action).toEqual(expectedAction);
        })
        .then(done)
        .catch(done);
    });
  });
});
