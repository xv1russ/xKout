var app, express, http, io, port, router, socket_io;

express = require('express');

router = require('./scripts/router');

io = require('socket.io');

app = express();

http = require('http').Server(app);

socket_io = io(http);

port = 8080;

app.set('view engine', 'jade');

app.set('views', './views');

app.use('/', router);

app.use('/public', express["static"]('./public'));

socket_io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on('disconnect', function() {
    return console.log('A user disconnected');
  });
  return socket.on('chatMessage', function(message) {
    return socket_io.emit('chatMessage', message);
  });
});

http.listen(port, function() {
  console.log("Listening on " + port);
});
