var express, router, utils;

express = require('express');

router = express.Router();

utils = require('./utils');

utils.resetCards();

router.get('/randomcard', function(req, res) {
  var cardNames;
  cardNames = utils.genCardNames();
  utils.resetCards();
  res.render('randomcard', {
    cardNames: cardNames
  });
});

router.route('/chat').get(function(req, res) {
  return res.render('chat');
});

module.exports = router;
