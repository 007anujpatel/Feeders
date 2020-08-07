var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var middleware = require('./controllers/middleware');
var config = require('./config/env/development');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(session({secret: config["secret-key"], saveUninitialized: true, resave: true}))
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
// app.use('/user', userRouter);
// app.use('/payment', middleware.verifyToken, paymentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  if(err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.send(err);
  }
});

module.exports = app;
