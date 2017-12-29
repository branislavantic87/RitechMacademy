var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var app = express();
// let busboy = require('connect-busboy')
var fs = require('fs')


// requiring routes
var index = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');
var auth = require('./routes/auth');
var enroll = require('./routes/enroll');
var carousel = require('./routes/carousels');
var admin = require('./routes/admin')

// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost/akademija');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/content', express.static(path.join(__dirname, 'content')));
app.use(methodOverride('_method'));
app.use(flash());

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'fdghdfhjrnetgnoi3453',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});


// ROUTES
app.use('/', index);
app.use('/users', users);
app.use('/courses', courses);
app.use(auth);
app.use(enroll);
app.use('/admin/carousel', carousel);
app.use('/admin', admin)
// app.use(busboy())

// app.post('/carousel/new', function(req, res) {
//   req.pipe(req.busboy);
//   req.busboy.on('file', function(fieldname, file, filename) {
//       console.log('Ovo je fildname: ' + fieldname);
//       console.log('Ovo je file: ' + file);
//       console.log('Ovo je filename: ' + filename);

//       var fstream = fs.createWriteStream('./content/' + filename); 
//       file.pipe(fstream);
//       fstream.on('close', function () {
//           res.send('upload succeeded!');
//       });
//   });
// });

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
