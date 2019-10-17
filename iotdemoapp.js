// server.js
import express from 'express';
import bodyParser from 'body-parser';
var path = require('path');
var cron = require('node-cron');
var bPromise = require('bluebird');
var moment = require('moment');
var passport = require('./authenticate');
var cookieParser = require('cookie-parser');
import mongoose from 'mongoose';
var awsIot = require('aws-iot-device-sdk');
import * as AppConfig from './config';
var FCM = require('fcm-node');
var fileUpload = require('express-fileupload');
const app = express();
let userapi = require("./src/api-routes/user-routes");
let authApi = require("./src/api-routes/auth-routes");
let examsapi = require("./src/api-routes/exam-routes");
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/Education';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
mongoose.connect(uristring, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Connect to Mongoose and set connection variable

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App

app.use('/authApi', authApi);
app.use('/userapi', userapi);
app.use('/examapi', examsapi);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8888)

