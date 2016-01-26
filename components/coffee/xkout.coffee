# ~~~ DECLARATIONS ~~~
# Requires
express = require 'express'
router = require './scripts/router'
io = require 'socket.io'
# Instants
app = express()
http = require 'http'
	.Server app
socketIO = io http
chat = socketIO.of '/chat'
# Options
port = 8080
people = {}
rooms = {}

# ~~~ EXPRESS ~~~
# Express settings
app.set 'view engine', 'jade'
app.set 'views', './views'
# Routes
app.use '/', router
app.use '/public', express.static './public'

# ~~~ SOCKET.IO ~~~
# Events
chat.on 'connection', (socket) ->
	people[socket.id] = {}
	# On connect
	console.log 'A user connected'
	# On channel join
	socket.on 'joinRoom', (roomName) ->
		console.log "#{people[socket.id].name} joined #{roomName}"
		socket.join roomName
		people[socket.id].room = roomName
		rooms[roomName].users[socket.id] = people[socket.id]
		return

	socket.on 'leaveRoom', (roomName) ->
		console.log "#{people[socket.id].name} left #{roomName}"
		socket.leave roomName
		people[socket.id].room = ''
		delete rooms[roomName].users[socket.id]
		return

	socket.on 'user', (userName) ->
		people[socket.id].name = userName
		return
	# On disconnect
	socket.on 'disconnect', ->
		console.log 'A user disconnected'
		return
	# On message sent
	socket.on 'chatMessage', (message) ->
		console.log "Recieved message: #{message}"
		chat.to people[socket.id].room
			.emit 'chatMessage', message, people[socket.id].name
		return
	return

# ~~~ SERVER INIT ~~~
http.listen port, () ->
	console.log "Listening on #{port}"
	return
