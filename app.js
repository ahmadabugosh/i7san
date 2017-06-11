/**
 * Module dependencies.
 */
const express = require('express');
const async = require('async');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');


const ConnectRoles = require('connect-roles');

var user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {action: action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});


const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
//dotenv.load({ path: '.env' });
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');
const impactController = require('./controllers/impact');
const projectController = require('./controllers/project');
const organizationController = require('./controllers/organization');

const activityController = require('./controllers/activity');

const volunteerController = require('./controllers/volunteering');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload' ||req.path === '/add' ||req.path === '/project'||req.path === '/add/project'||req.path === '/activity/add' ||req.path === '/volunteering/add'||req.path === '/organization/add') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'uploads'), { maxAge: 31557600000 }));

app.use(user.middleware());

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);






user.use(function (req, action) {
  if (!req.isAuthenticated()) return action === 'access home page';
})

//moderator users can access private page, but
//they might not be the only ones so we don't return
//false if the user isn't a moderator
user.use('access private page', function (req) {
  if (req.user.role === 'moderator') {
    return true;
  }
})

//admin users can access all pages
user.use(function (req) {
  if (req.user.role === 'admin') {
    return true;
  }
});





//Activity Routes
app.get('/volunteer', activityController.getActivities);
app.get('/volunteer/:activityid', activityController.getActivity);

app.get('/activity/add', passportConfig.isAuthenticated,user.can('access private page'),activityController.addActivity);
app.post('/activity/add',upload.single('myFile'),activityController.createActivity );

//Volunteering Routes

app.get('/volunteering',volunteerController.getVolunteering);
app.get('/volunteering/add', volunteerController.addVolunteering);
app.get('/volunteering/add/:activityid', volunteerController.addVolunteeringID);
app.post('/volunteering/add/', volunteerController.createVolunteering);
app.get('/volunteering/me',volunteerController.getMyVolunteering);
app.get('/volunteering/:username',volunteerController.getMyVolunteeringID);

//Need to change routes below this line
//authenticated actions
app.get('/my-projects', passportConfig.isAuthenticated,projectController.getMyProjects);
app.get('/add', passportConfig.isAuthenticated,user.can('access private page'),projectController.addProjects);
app.get('/my-impact',passportConfig.isAuthenticated, impactController.getImpacts);

app.get('/projects', projectController.getProjects);
app.get('/project/:projectid', projectController.getProject);



app.post('/add',upload.single('myFile'),projectController.createProjects);

app.get('/organizations',organizationController.getOrganizations);
app.get('/organization/add',organizationController.addOrganization);
app.get('/organization/:organizationid', organizationController.getOrganization);

app.post('/organization/add',upload.single('myFile'),organizationController.createOrganization);

app.get('/add/project',organizationController.addProjects);
app.post('/add/project',upload.single('myFile'),organizationController.createProjects);


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
