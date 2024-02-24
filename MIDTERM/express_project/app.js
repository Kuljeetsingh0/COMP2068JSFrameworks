var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // Import mongoose

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const studentRouter = require('./routes/students');
const contactRouter = require('./routes/students');
const homeRouter = require('./routes/home'); // Import home router

var app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://Kuljeets:Kuljeet123@cluster0.pnqkgaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add home router for home page
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentRouter);
app.use('/contact', contactRouter);
app.use('/home', homeRouter); // Use home router for home page

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
