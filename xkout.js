'use strict'
const express = require('express')
const router = require('./scripts/router')
const io = require('socket.io')
const app = express()
const http = require('http').Server(app)
const socketIO = io(http)
const chat = socketIO.of('/chat')
const port = 8080

let people = {}
let rooms = {}

app.set('view engine', 'jade')
app.set('views', './views')
app.use('/', router)
app.use('/public', express['static']('./public'))

chat.on('connection', socket => {
  people[socket.id] = {}
  console.log('A user connected')

  socket.on('joinRoom', roomName => {
    console.log(people[socket.id].name + ' joined ' + roomName)
    socket.join(roomName)
    people[socket.id].room = roomName
    rooms[roomName].users[socket.id] = people[socket.id]
  })

  socket.on('leaveRoom', roomName => {
    console.log(people[socket.id].name + ' left ' + roomName)
    socket.leave(roomName)
    people[socket.id].room = ''
    delete rooms[roomName].users[socket.id]
  })
  socket.on('user', userName => {
    people[socket.id].name = userName
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on('chatMessage', message => {
    console.log('Recieved message: ' + message)
    chat.to(people[socket.id].room).emit('chatMessage', message, people[socket.id].name)
  })
})

http.listen(port, () => {
  console.log('Listening on ' + port)
})
