express = require 'express'
router = express.Router()
utils = require './utils'

utils.resetCards()

router.get '/randomcard', (req, res) ->
	cardNames = utils.genCardNames()
	utils.resetCards()
	res.render 'randomcard', {cardNames}
	return

router.route '/chat'
	.get (req, res) ->
		res.render 'chat'

module.exports = router
