var utils;

utils = {};

utils.cards = [];

utils.genCardNames = function() {
  var cardNames, i, j, k, l;
  cardNames = {};
  for (i = k = 1; k <= 6; i = k += 1) {
    cardNames[i] = [];
    for (j = l = 1; l <= 9; j = l += 1) {
      cardNames[i][j] = utils.createCardName();
    }
  }
  return cardNames;
};

utils.createCardName = function() {
  var position;
  position = Math.floor(Math.random() * utils.cards.length);
  return utils.cards.splice(position, 1);
};

utils.resetCards = function() {
  var i, k, results;
  results = [];
  for (i = k = 1; k <= 13; i = k += 1) {
    utils.cards[i - 1] = "club" + i;
    utils.cards[i + 12] = "dmnd" + i;
    utils.cards[i + 25] = "hart" + i;
    utils.cards[i + 38] = "spad" + i;
    if (i < 3) {
      results.push(utils.cards[i + 51] = "joke" + i);
    } else {
      results.push(void 0);
    }
  }
  return results;
};

module.exports = utils;
