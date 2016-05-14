import http from 'http';
import expect from 'expect';
import request from 'superagent';
import app from '../../server/server';

describe('impala rest api', () => {
  const sql = 'select * from sample_07 limit 5';
  const port = 3333;
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

  it('should send response', (done) => {
    request.get(`http://localhost:${port}/api/impala/${sql}`)
      .end((err, res) => {
        if (err) {
          expect(err).toExist();
          expect(err).toBeA('object');
        } else {
          expect(res.body).toBeAn('object');
        }
        done();
      });
  });
});
