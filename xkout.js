var app, chat, express, http, io, people, port, router, socketIO;

express = require('express');

router = require('./scripts/router');

io = require('socket.io');

app = express();

http = require('http').Server(app);

socketIO = io(http);

chat = socketIO.of('/chat');

port = 8080;

people = {};

app.set('view engine', 'jade');

app.set('views', './views');

app.use('/', router);

app.use('/public', express["static"]('./public'));

chat.on('connection', function(socket) {
  people[socket.id] = {};
  console.log('A user connected');
  socket.on('joinRoom', function(roomName) {
    console.log(people[socket.id].name + " joined " + roomName);
    socket.join(roomName);
    people[socket.id].room = roomName;
  });
  socket.on('leaveRoom', function(roomName) {
    console.log(people[socket.id].name + " left " + roomName);
    socket.leave(roomName);
    people[socket.id].room = '';
  });
  socket.on('user', function(userName) {
    people[socket.id].name = userName;
  });
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
  socket.on('chatMessage', function(message) {
    console.log("Recieved message: " + message);
    chat.to(people[socket.id].room).emit('chatMessage', message, people[socket.id].name);
  });
});

http.listen(port, function() {
  console.log("Listening on " + port);
});
