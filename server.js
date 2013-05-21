var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var EventEmitter = require('events').EventEmitter,
    event = new EventEmitter();

app.configure(function() {
    app.set('port', 8085);
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
});

server.listen(app.get('port'), function() {
    console.log('Listening to port '+app.get('port'));
});

//app.get('/api/day1', function(req, res) {
//    var proxy_req = http.request(
//        {
//            host: 'www.connect.garmin.com',
//            method: 'GET',
//            port: '80',
//            path: '/course/embed/2754014'
//        }, function(proxy_res) {
//            proxy_res.on('data', function(chunk) {
//                console.log("receiving")
//                res.write(chunk, 'binary')
//            })
//        }
//    )
//    proxy_req.on('error', function(e) {
//        console.log(e)
//    });
//    proxy_req.end();
//});

app.post('/api/gps', function(req, res) {
    console.log("dwqd");
    var data = req.body;
    res.send('Ok', 200);
    event.emit('event:gps', data);
});

io.sockets.on('connection', function(socket) {
    event.on('event:gps', function(data) {
        socket.emit('socket:gps', data);
    })
});

