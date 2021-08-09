var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var postcssMiddleware = require('postcss-middleware');
var autoprefixer = require('autoprefixer');

// Routers
var indexRouter = require('./routes/index');

//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// Plugins
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/'));

app.use(sassMiddleware({
  src: path.join(__dirname, 'public/scss'),
  dest: path.join(__dirname, 'public/css'),
  prefix: '/css',
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}));

app.use(
  '/css', postcssMiddleware({
      plugins: [
          autoprefixer({
              remove: false,
              grid: true
          })
      ],
      options: {
          map: {
              inline: true
          }
      },
      src: function(req) {
          return path.join(__dirname, 'public', 'css', req.path);
      }
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use('/:page', function(req, res, next) {
  var page = req.params.page;

  var error = new Error();
  error.message = 'Page ' + page + ' does not exist';
  error.status = 404;
  //next(error);
  res.render('error', {
      error,
      title: '404 - Page ' + page + ' does not exist'
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.title = err.title;
  res.locals.message = err.message;

  // Check when Error on one of Projects page.
  res.locals.products = err.guides;

  // To check in production set production
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('../notice/error');
});

module.exports = app;
