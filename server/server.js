import path from 'path';
import bodyParser from 'body-parser';
import Express from 'express';
import { createClient } from 'node-impala';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

const app = new Express();
const port = 3003;

const impala = createClient({ resultType: 'json-array' });
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/impala/:sql', (req, res) => {
  impala.query(req.params.sql)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

export default app;
