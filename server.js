const webpack = require('webpack');
const express = require('express');
const http = require('http');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,	
{	
    noInfo:	true,	
    publicPath:	config.output.publicPath	
}));
app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static(__dirname + '/src'));
app.set('port', 3000);
http.createServer(app)
  .listen(app.get('port'), function () {
    console.log('Local server listening to port ' + app.get('port'));
  });

app.get('*', function (req, res) {
  res.status(404).send('error 404, page not found');
});