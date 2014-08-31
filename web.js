require('nodetime').profile({
    accountKey: process.env.NODETIME_API_KEY, 
    appName: 'SSU TT Web'
  });
require('newrelic');
var gzippo = require('gzippo');
var express = require('express');
var app = express();
 
app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.listen(process.env.PORT || 5000);