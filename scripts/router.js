const express = require('express')
const router = express.Router()
const utils = require('./utils')

utils.resetCards()

router.get('/randomcard', (req, res) => {
  var cardNames
  cardNames = utils.genCardNames()
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
