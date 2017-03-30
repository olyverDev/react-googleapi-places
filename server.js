const webpack = require('webpack');
const express = require('express');
const http = require('http');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const request = require('request')
const bp = require('body-parser')
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

app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
}));

app.get('*', function (req, res) {
  res.status(404).send('error 404, page not found');
});

app.post('/locations', function (req, res) {
  var foreignUrl = req.body.mainUrl + 'location=' + req.body.location +
    '&radius=' + req.body.radius + '&types=' + req.body.types + '&key=' + req.body.key;
  console.log('/locations url: ' + foreignUrl)

  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) 
      res.send(body);
    else 
      console.log('Some error! Check internet connection');
  });
});

app.post('/extraLocations', function (req, res) {
  var foreignUrl = req.body.mainUrl + 'pagetoken=' + req.body.pagetoken + '&key=' + req.body.key;
  console.log('/extraLocations url: ' + foreignUrl)
  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) 
      res.send(body);
  })
});

app.post('/locationAutocomplete', function (req, res) {
  var foreignUrl = req.body.mainUrl +'input='+ req.body.input + '&language=' 
  + req.body.language + '&key=' + req.body.key;
  console.log('hintsUrl: ' + foreignUrl)
  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200)
      res.send(body);
      else 
      console.log('Some error! Check internet connection');
  })
});