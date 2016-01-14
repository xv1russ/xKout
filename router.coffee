express = require 'express'
router = express.Router()

router.route '/randomcard'
	.get (req, res) ->
		cardNames = []
		for i in [1..9] by 1
			cardNames[i] = createCardName()
		console.log cardNames
		res.render 'randomcard', {cardNames}
		return

createCardName = () ->
	cards = {}
	cards.club = [1..13]
	cards.dmnd = [1..13]
	cards.hart = [1..13]
	cards.spad = [1..13]
	cards.joke = [1..2]
	suitNames = ["club", "dmnd", "hart", "spad", "joke"]
	suitNumber = Math.floor Math.random() * (suitNames.length)
	cardNumber = if suitNumber < 4 then Math.ceil Math.random() * cards[suitNames[suitNumber]].length else Math.ceil Math.random() * 2
	suitNames[suitNumber] + cardNumber

module.exports = router