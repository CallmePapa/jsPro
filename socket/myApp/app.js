var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

var ejs=require('ejs');
app.engine('html',ejs.__express);
app.set('view engine', 'html');

/*var server = http.createServer(app);
var  io = require('socket.io').listen(server);
server.listen(app.get('prot'), function () {
    console.log("express server listening on prot" + app.get('prot'));
});

var activeClients=0;
io.sockets.on('connection',function (socket) {
    activeClients++;
    io.sockets.emit('message',{clients:activeClients});

    socket.on("disconnect",function (data) {
        activeClients--;
        io.sockets.emit('message',{clients:activeClients});
    }};
})*/

module.exports = app;
