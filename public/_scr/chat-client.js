'use strict'
/* globals io, $, alert */
/*
  ~~~ DECLARATIONS ~~~
*/
// -- CONSTANTS --
// Instants
const socket = io('/chat')
// -- VARIABLES --
// Primitives
let currentRoom = ''
/*
  ~~~ JQUERY ~~~
*/
// -- ON CHAT MESSAGE SENT --
$('#chatForm').on('submit', () => {
  // Check if we are in a chatroom
  if (currentRoom !== '') {
    // Get the DOM inputs
    let suite = $('#suite')
      .val()
    let card = $('#card')
      .val()
    // Create the message
    let msg = suite + card
    // Emit it to the server
    socket.emit('chatMessage', msg)
  } else {
    // Tell the user he/she must join a room before chatting
    alert('Join a channel first')
  }
  return false
})
// -- ON CHATROOM CONNECT --
$('#chatConnection').on('submit', () => {
  // Get the DOM inputs
  let userName = $('#user').val().trim().toLowerCase()
  let roomName = $('#room').val().trim().toLowerCase()
  // Check if we are in a room
  if (currentRoom === '') {
    // If not, join one
    if (userName !== '' && roomName !== '') {
      socket.emit('user', userName)
      socket.emit('joinRoom', roomName)
    } else {
      alert('input values')
    }
  } else {
    // If we are in one, leave, then join the new one
    if (roomName !== '') {
      socket.emit('leaveRoom', currentRoom)
      socket.emit('joinRoom', roomName)
    } else {
      alert('input value')
    }
  }
  return false
})
/*
  ~~~ SOCKET.IO ~~~
*/
// -- ON MESSAGE RECIEVE --
socket.on('chatMessage', (message, username) => {
  // Add it to the DOM
  $('#messages')
    .append($(`<li><p> ${username}:</p><img src='/public/_img/${message}.png'/></li>`))
})
// -- ON INITIALIZATION --
socket.on('initted', () => {
  $('#user').parent()
    .hide()
})
// -- ON ROOM JOIN --
socket.on('joined', (roomName) => {
  currentRoom = roomName
})
