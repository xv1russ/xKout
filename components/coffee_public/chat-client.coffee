socket = io '/chat'
currentRoom = ''
$ '#chatForm'
	.on 'submit', ->
		if currentRoom != ''
			suite = $ '#suite'
				.val()
			card = $ '#card'
				.val()
			msg = suite+card
			console.log msg
			socket.emit 'chatMessage', msg
			$ '#textfield'
				.val ''
		else
			alert 'Join a channel first'
		false
$ '#chatConnection'
	.on 'submit', ->
		userName = $('#user').val().trim().toLowerCase()
		roomName = $('#room').val().trim().toLowerCase()
		if currentRoom == ''
			if userName != '' and roomName != ''
				console.log 'joining room'
				socket.emit 'user', userName
				socket.emit 'joinRoom', roomName
				currentRoom = roomName
				$('#user').parent().hide()
			else
				alert 'input values'
		else
			if roomName != ''
				console.log 'joining room'
				socket.emit 'leaveRoom', currentRoom
				socket.emit 'joinRoom', roomName
				currentRoom = roomName
			else
				alert 'input value'
		false
socket.on 'chatMessage', (message, username) ->
	console.log 'Recieved message'
	$ '#messages'
		.append $ "<li><p>#{username}:</p><img src='/public/_img/#{message}.png'/></li>"
	return
