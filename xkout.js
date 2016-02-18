'use strict'
/*
  ~~~ DECLARATIONS ~~~
*/
// -- CONSTANTS --
// Requires
const express = require('express')
const router = require('./scripts/router')
// Instances
const app = express()
const chat = require('./scripts/socket')
// Options
/*
  ~~~ EXPRESS ~~~
*/
// -- SETTINGS --
// Options
app.set('view engine', 'jade')
app.set('views', './views')
// Middleware
app.use('/', router)
app.use('/public', express['static']('./public'))

chat.startServer()

module.exports = app
