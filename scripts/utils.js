'use strict'
let utils = {}

utils.cards = []

utils.genCardNames = () => {
  let cardNames = {}
  for (let i = 1; i <= 6; i++) {
    cardNames[i] = []
    for (let j = 1; j <= 9; j++) {
      cardNames[i][j] = utils.createCardName()
    }
  }
  return cardNames
}

utils.createCardName = () => {
  let position = Math.floor(Math.random() * utils.cards.length)
  return utils.cards.splice(position, 1)
}

utils.resetCards = () => {
  for (let i = 1; i <= 13; i++) {
    utils.cards[i - 1] = `club${i}`
    utils.cards[i + 12] = `dmnd${i}`
    utils.cards[i + 25] = `hard${i}`
    utils.cards[i + 38] = `spad${i}`
    if (i < 3) {
      utils.cards[i + 51] = `joke${i}`
    }
  }
}

module.exports = utils
