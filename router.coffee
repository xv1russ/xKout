express = require 'express'
router = express.Router()

router.route '/randomcard'
	.get (req, res) ->
		cardName = createCardName()
		res.render 'randomcard', {cardName}
		return

createCardName = () ->
	suitNames = ["club", "dmnd", "hart", "spad", "joke"]
	suitNumber = Math.ceil Math.random() * 4
	cardNumber = if suitNumber < 4 then Math.ceil Math.random() * 12 else Math.ceil Math.random() * 2
	console.log suitNames[suitNumber], cardNumber, suitNumber
	suitNames[suitNumber] + cardNumber

module.exports = router