'use strict'
/*
  ~~~ DECLARATIONS ~~~
*/
// -- REQUIRES --
const express = require('express')
const utils = require('./utils')
// Instants
const router = express.Router()
/*
  ~~~ ROUTES ~~~
*/
// -- INITIALISE CARDS --
utils.resetCards()
// -- ROUTES --
// /randomcard
router.get('/randomcard', (req, res) => {
  // Generate cards and pass it into the view
  let cardNames = utils.genCardNames()
  utils.resetCards()
  res.render('randomcard', {
    cardNames: cardNames
  })
})
// /chat
router.route('/chat', (req, res) => {
  res.render('chat')
})
/*
  ~~~ EXPORTS ~~~
*/
module.exports = router
