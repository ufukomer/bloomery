import expect from 'expect';
import request from 'supertest';
import app from '../../src/server';

describe('impala rest api', () => {
  const sql = 'select * from sample_07 limit 5';
  const config = {
    host: '127.0.0.1',
    port: 21000
  };

  it('should send response', (done) => {
    request(app)
      .get(`/api/impala/config?host=${config.host}&port=${config.port}`)
      .end((err, res) => {
        if (err) {
          expect(err).toExist();
          expect(err).toBeA('string');
        } else {
          expect(res.body).toBeAn('object');
        }
        done();
      });

    request(app)
      .get(`/api/impala/${sql}`)
      .end((err, res) => {
        if (err) {
          expect(err).toExist();
          expect(err).toBeA('string');
        } else {
          expect(res.body).toBeAn('object');
        }
        done();
      });
  });
});
