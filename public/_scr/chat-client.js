var socket;

socket = io();

$('#chatForm').on('submit', function() {
  socket.emit('chatMessage', $('#textfield').val());
  $('#textfield').val('');
  return false;
});

socket.on('chatMessage', function(message) {
  return $('#messages').append($('<li>').text(message));
});
