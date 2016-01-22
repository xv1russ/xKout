var socket;

socket = io();

$('#chatForm').on('submit', function() {
  var card, msg, suite;
  suite = $('#suite').val();
  card = $('#card').val();
  msg = suite + card;
  console.log(msg);
  socket.emit('chatMessage', msg);
  $('#textfield').val('');
  return false;
});

socket.on('chatMessage', function(message) {
  return $('#messages').append($("<li><img src=\"/public/_img/" + message + ".png\"/></li>"));
});
