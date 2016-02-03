'use strict'
/* globals io, $, alert */
const socket = io('/chat')
let currentRoom = ''

$('#chatForm').on('submit', () => {
  if (currentRoom !== '') {
    let suite = $('#suite')
      .val()
    let card = $('#card')
      .val()
    let msg = suite + card
    console.log(msg)
    socket.emit('chatMessage', msg)
    $('#textfield')
      .val('')
  } else {
    alert('Join a channel first')
  }
  return false
})

$('#chatConnection').on('submit', () => {
  let userName = $('#user').val().trim().toLowerCase()
  let roomName = $('#room').val().trim().toLowerCase()
  if (currentRoom === '') {
    if (userName !== '' && roomName !== '') {
      console.log('joining room')
      socket.emit('user', userName)
      socket.emit('joinRoom', roomName)
      currentRoom = roomName
      $('#user').parent()
        .hide()
    } else {
      alert('input values')
    }
  } else {
    if (roomName !== '') {
      console.log('joining room')
      socket.emit('leaveRoom', currentRoom)
      socket.emit('joinRoom', roomName)
      currentRoom = roomName
    } else {
      alert('input value')
    }
  }
  return false
})

socket.on('chatMessage', (message, username) => {
  console.log('Recieved message')
  $('#messages')
    .append($(`<li><p> ${username}:</p><img src='/public/_img/${message}.png'/></li>`))
})
