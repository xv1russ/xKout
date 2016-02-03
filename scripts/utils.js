'use strict'
/*
  ~~~ DECLARATIONS ~~~
*/
// -- VARIABLES --
// Objects
let utils = {}
// Object properties
utils.cards = []
utils.genCardNames = () => {
  // Create a card names object and put random card names into it
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
  /* Get the cards object and take out a random card from within it
  and return it */
  let position = Math.floor(Math.random() * utils.cards.length)
  return utils.cards.splice(position, 1)
}
utils.resetCards = () => {
  // Create a cards object and put the standard 54 cards in it
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
/*
  ~~~ EXPORTS ~~~
*/
module.exports = utils
