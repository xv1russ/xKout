express = require 'express'
router = express.Router()

createCardName = ->
	position = Math.floor Math.random() * cards.length
	cards.splice position, 1

resetCards = ->
	for i in [1..13] by 1
		cards[i - 1] = "club#{i}"
		cards[i + 12] = "dmnd#{i}"
		cards[i + 25] = "hart#{i}"
		cards[i + 38] = "spad#{i}"
		if i < 3
			cards[i + 51] = "joke#{i}"

cards = []

resetCards()

router.get '/randomcard', (req, res) ->
		cardNames = {}
		for i in [1..6] by 1
			cardNames[i] = []
			for j in [1..9] by 1
				cardNames[i][j] = createCardName()
		resetCards()
		res.render 'randomcard', {cardNames}
		return

module.exports = router
