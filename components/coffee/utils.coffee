utils = {}

# ~~~ Card Generation Stuff ~~~
utils.cards = []

utils.genCardNames = ->
	cardNames = {}
	for i in [1..6] by 1
		cardNames[i] = []
		for j in [1..9] by 1
			cardNames[i][j] = utils.createCardName()
	cardNames
	
utils.createCardName = ->
	position = Math.floor Math.random() * utils.cards.length
	utils.cards.splice position, 1

utils.resetCards = ->
	for i in [1..13] by 1
		utils.cards[i - 1] = "club#{i}"
		utils.cards[i + 12] = "dmnd#{i}"
		utils.cards[i + 25] = "hart#{i}"
		utils.cards[i + 38] = "spad#{i}"
		if i < 3
			utils.cards[i + 51] = "joke#{i}"

module.exports = utils
