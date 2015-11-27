// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

// mongoose
mongoose.connect('mongodb://localhost/pmm');

// schema/model
var User = require('./models/user.js');
var Message = require('./models/message.js');

// create instance of express
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// require routes
var routes = require('./routes/api.js');

// define middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/', routes);

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

// sockets
io.on('connection', function (socket) {
    var currentUser = 'uc2pac@gmail.com',
        currentDate = new Date().toJSON().slice(0,10);

    Message.getMessages(currentUser, currentDate, function(err, messages) {
        if (err) {
            console.log('error');
        } else {
            socket.emit('message', messages);
        }
    });

    //socket.emit('message', message);
    
    socket.on('message', function (data, callback) {
        data.user = currentUser;

        var message = new Message(data);

        message.save(function (err, messages) {
            if (err) {
                console.log('error');
            } else {
                callback(message);
            }
        });
    });
});

module.exports = server;
