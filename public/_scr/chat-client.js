var setSocketEvents, socket;

socket = '';

$('#chatForm').on('submit', function() {
  var card, msg, suite;
  if (socket !== '') {
    suite = $('#suite').val();
    card = $('#card').val();
    msg = suite + card;
    console.log(msg);
    socket.emit('chatMessage', msg);
    $('#textfield').val('');
    setSocketEvents();
  } else {
    alert('Join a channel first');
  }
  return false;
});

$('#chatConnection').on('submit', function() {
  if ($('#user').val() !== '' && $('#room').val() !== '') {
    console.log('Creating socket');
    socket = io($('#room').val());
    socket.emit('user', $('#user').val());
  } else {
    alert('input values');
  }
  return false;
});

setSocketEvents = function() {
  socket.on('chatMessage', function(message) {
    $('#messages').append($("<li>")).append($("<img>")).attr({
      src: "/public/_img/" + message + ".png"
    });
  });
};
