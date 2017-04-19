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
const googleKey = 'AIzaSyBXzTLkiIpYXc_I6D-XKPM7npbKQk0uhfE';

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



var error = function (req, res,next) {
  res.status(400).send('Error 404');
  next();
};


app.get ('/', (req,res) => {
  res.sendFile('main.html', {root: __dirname+'/src'});
})


app.get('/locations', function (req, res) {
  var foreignUrl = req.query.mainUrl + 'location=' + req.query.location +
    '&radius=' + req.query.radius + '&types=' + req.query.types + '&key=' + googleKey;
  console.log('/locations url: ' + foreignUrl)

  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) 
      res.send(body);
    else {
      console.log('Some error');
      res.status(500).send('Internal server error');
    }
   
  });
});

app.get('/extraLocations', function (req, res) {
  var foreignUrl = req.query.mainUrl + 'pagetoken=' + req.query.pagetoken + '&key=' + googleKey;
  console.log('/extraLocations url: ' + foreignUrl)
  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) 
      res.send(body);
      else {
        console.log('Some error');
        res.status(500).send('Internal server error');
      }
  })
});

app.get('/locationAutocomplete', function (req, res) {
  var foreignUrl = req.query.mainUrl +'input='+ req.query.input + '&language=' 
  + req.query.language + '&key=' + googleKey;
  console.log('hints Url: ' + foreignUrl)
  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200)
      res.send(body);
      else {
      console.log('Some error');
      res.status(500).send('Internal server error');
      }
  })
});

app.get('/locationData', (req,res) => {
  var foreignUrl = req.query.mainUrl + 'place_id=' + req.query.placeid + '&key='+ googleKey;
  console.log('data url: '+ foreignUrl);
  request(foreignUrl, function (error, response, body) {
    if (!error && response.statusCode == 200)
      res.send(body);
      else {
      console.log('Some error');
      res.status(500).send('Internal server error');
      }
  })
})

