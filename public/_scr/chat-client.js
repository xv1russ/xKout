var currentRoom, socket;

socket = io('/chat');

currentRoom = '';

$('#chatForm').on('submit', function() {
  var card, msg, suite;
  if (currentRoom !== '') {
    suite = $('#suite').val();
    card = $('#card').val();
    msg = suite + card;
    console.log(msg);
    socket.emit('chatMessage', msg);
    $('#textfield').val('');
  } else {
    alert('Join a channel first');
  }
  return false;
});

$('#chatConnection').on('submit', function() {
  var roomName, userName;
  userName = $('#user').val();
  roomName = $('#room').val();
  if (currentRoom === '') {
    if (userName !== '' && roomName !== '') {
      console.log('joining room');
      socket.emit('user', userName);
      socket.emit('joinRoom', roomName);
      currentRoom = roomName;
      $('#user').parent().hide();
    } else {
      alert('input values');
    }
  } else {
    if (roomName !== '') {
      console.log('joining room');
      socket.emit('leaveRoom', currentRoom);
      socket.emit('joinRoom', roomName);
      currentRoom = roomName;
    } else {
      alert('input value');
    }
  }
  return false;
});

socket.on('chatMessage', function(message, username) {
  console.log('Recieved message');
  $('#messages').append($("<li><p>" + username + ":</p><img src='/public/_img/" + message + ".png'/></li>"));
});
