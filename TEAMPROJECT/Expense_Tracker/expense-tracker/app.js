const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const createError = require('http-errors'); // Add this line to require createError

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const updateRouter = require('./routes/update');
const addExpenseRouter = require('./routes/addExpense');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const expenseRouter = require('./routes/expenses');
const homeRouter = require('./routes/home');
const addIncomeRouter = require('./routes/addIncome');
const IncomeRouter = require('./routes/income');
const UpdateIncomeRouter = require('./routes/updateincome');
const helpers = require('./helpers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs', 
  defaultLayout: false, // Set default layout to false
  helpers: helpers 
}));
app.set('view engine', '.hbs');
app.set('partials', path.join(__dirname, 'views', 'partials'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mount your routes
app.use('/', signupRouter); // Mount signupRouter at the root path
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/update', updateRouter);
app.use('/addExpense', addExpenseRouter);
app.use('/login', loginRouter);
app.use('/expenses', expenseRouter);
app.use('/home', homeRouter);
app.use('/addIncome', addIncomeRouter);
app.use('/income', IncomeRouter);
app.use('/updateincome', UpdateIncomeRouter);

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
