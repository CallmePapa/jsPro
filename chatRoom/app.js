var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var index = require('./routes/index');
var users = require('./routes/users');
/*var about = require("./routes/about");*/

var app = express();


//all environments
app.engine('html', require('uinexpress').__express);
app.set('view engine', 'html');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*app.set('view engine', 'jade');*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
/*app.use('/about', about);*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var activeClients = 0;

//在链接建立时
io.socket.on('connection', function (socket) {
    activeClients++;
    io.socket.emit('message', {clients: activeClients});
    //在链接断开时
    socket.on('discount', function (data) {
        activeClients--;
        io.socket.emit("message", {client: activeClients});
    });

    //收到新的聊天信息
    socket.on('newchat', function (data) {
        io.socket.emit('chat', data);
    });
});


module.exports = app;
