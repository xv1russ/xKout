'use strict'
/*
  ~~~ DECLARATIONS ~~~
*/
// Requires
const app = require('../xkout')
const http = require('http').Server(app)
const io = require('socket.io')
// -- CONSTANTS --
// Instances
const socketIO = io(http)
const chat = socketIO.of('/chat')
// -- VARIABLES --
// Objects
let people = {}
let rooms = {}/*
  ~~~ SOCKET.IO ~~~
*/
// -- ON CONNECTION --
module.exports = {
  startServer: () => {
    chat.on('connection', socket => {
      // Initialise object of current client
      people[socket.id] = {}
      // On request to join a room
      socket.on('joinRoom', roomName => {
        // If room has less then 6 people
        if (rooms[roomName] != null) {
          console.log('Room created')

          console.log(`Room: ${roomName}`)
          // Join socket to said room
          socket.join(roomName)
          // Update objects
          people[socket.id].room = roomName
          rooms[roomName].users[socket.id] = people[socket.id]
          socket.emit('joined', roomName)
        } else {
          console.log('Room null')
          socket.join(roomName)

          people[socket.id].room = roomName
          rooms[roomName] = {}
          rooms[roomName].users = {}
          rooms[roomName].users[socket.id] = people[socket.id]
          socket.emit('joined', roomName)
        }
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
        socket.emit('initted')
      })
      // On message sent
      socket.on('chatMessage', message => {
        // Send the message to people in the same room
        chat.to(people[socket.id].room).emit('chatMessage', message, people[socket.id].name)
      })
    })
    http.listen(8080, )
  }
}
