// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var multer = require('multer');


// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));// Static folder
app.use(express.static(path.join(__dirname, 'uploads')));//UploadsFolder
app.use(express.static(path.join(__dirname, 'uploads/mids')));//UploadsFolder
app.use(express.static(path.join(__dirname, 'uploads/finals')));
app.use(express.static(path.join(__dirname, 'uploads/bks')));
app.use(express.static(path.join(__dirname, 'uploads/qzs')));
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/multer_routes_bks.js')(app, multer);
require('./app/multer_routes_mids.js')(app, multer);
require('./app/multer_routes_finals.js')(app, multer);
require('./app/multer_routes_qzs.js')(app, multer);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
