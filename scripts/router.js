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
router.get('/randomcard', (req, res) => {
  let cardNames = utils.genCardNames()
  utils.resetCards()
  res.render('randomcard', {
    cardNames: cardNames
  })
})

router.route('/chat')
  .get((req, res) => {
    return res.render('chat')
  })

module.exports = router
