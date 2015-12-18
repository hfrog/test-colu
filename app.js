
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var stylus = require('stylus');
var nib = require('nib');
var config = require('app-config');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/colu');
var Colu = require('colu');

var routes = require('./routes/index');
var issue = require('./routes/issue');
var send = require('./routes/send');

var app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

// view engine setup
app.engine('html', cons.jade);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(stylus.middleware(
    {
        src: path.join(__dirname, 'public'),
        compile: compile
    }
));

// Colu init
var settings = {
    network:     config.colu.network,
    apiKey:      config.colu.apiKey,
    privateSeed: config.colu.privateSeed
};
var colu = new Colu(settings);

// Make globals accessible to our router
app.use(function(req,res,next) {
    req.db = db;
    req.colu = colu;
    next();
});

app.use('/', routes);
app.use('/issue', issue);
app.use('/send', send);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
