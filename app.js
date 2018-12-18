var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var filtersRouter = require('./routes/filters');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var newsRouter = require('./routes/news');
var userFiltersRouter = require('./routes/userFilters');
// var users_filtersRouter = require('./routes/users_filters')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/filters', filtersRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/news', newsRouter);
app.use('/userFilters', userFiltersRouter);

module.exports = app;
