'use strict'
/*
  ~~~ DECLARATIONS ~~~
*/
// -- CONSTANTS --
// Requires
const express = require('express')
const router = require('./scripts/router')
const io = require('socket.io')
// Instants
const app = express()
const http = require('http').Server(app)
const socketIO = io(http)
const chat = socketIO.of('/chat')
// Options
const port = 8080
// -- VARIABLES --
// Objects
let people = {}
let rooms = {}
/*
  ~~~ EXPRESS ~~~
*/
// -- SETTINGS --
// Options
app.set('view engine', 'jade')
app.set('views', './views')
// Middleware
app.use('/', router)
app.use('/public', express['static']('./public'))
/*
  ~~~ SOCKET.IO ~~~
*/
// -- ON CONNECTION --
chat.on('connection', socket => {
  // Initialise object of current client
  people[socket.id] = {}
  // On request to join a room
  socket.on('joinRoom', roomName => {
    // Join socket to said room
    socket.join(roomName)
    // Update objects
    people[socket.id].room = roomName
    rooms[roomName].users[socket.id] = people[socket.id]
  })
  // On request to leave a room
  socket.on('leaveRoom', roomName => {
    // Remove socket from said room
    socket.leave(roomName)
    // Update objects
    people[socket.id].room = ''
    delete rooms[roomName].users[socket.id]
  })
  // On username declaration
  socket.on('user', userName => {
    // Update the sockets' object with said username
    people[socket.id].name = userName
  })
  // On message sent
  socket.on('chatMessage', message => {
    // Send the message to people in the same room
    chat.to(people[socket.id].room).emit('chatMessage', message, people[socket.id].name)
  })
})

/*
  ~~~ START LISTENING ~~~
*/
http.listen(port, () => {
  console.log('Listening on ' + port)
})
