
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var stylus = require('stylus');
var nib = require('nib');
var colu = require('./lib/coluWrapper');
var db = require('./lib/dbWrapper');

var routes = require('./routes/index');
var settings = require('./routes/settings');
var asset = require('./routes/asset');

var app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

// view engine setup
app.set('view engine', 'jade');
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

// Make globals accessible to our router
app.use(function(req,res,next) {
    req.db = db;
    req.colu = colu;
    next();
});

app.use('/', routes);
app.use('/settings', settings);
app.use('/asset', asset);

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
