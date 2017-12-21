var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOver = require('method-override');
var flash = require('connect-flash');
var passport = require('passport');
var passLocal = require('passport-local');
var passLocalMoon = require('passport-local-mongoose');
var User = require('./models/user');


var index = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');
var auth = require('./routes/auth');

mongoose.Promise= global.Promise;
mongoose.connection.openUri('mongodb://localhost/RitechMakademi', {
  useMongoClient: true
});

var app = express();

app.use(require('express-session')({
  secret:'otisoSiSarmuProboNisi',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOver('_method'));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success')
  next();
})


app.use('/', index);
app.use('/users', users);
app.use('/courses', courses);
app.use(auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
