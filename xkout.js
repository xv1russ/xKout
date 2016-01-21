// Generated by CoffeeScript 1.10.0
var app, express, router;

express = require('express.io');

router = require('./router');

app = express();

app.http().io();

app.set('view engine', 'jade');

app.set('views', './views');

app.use('/', router);

app.use('/public', express["static"]('./public'));

app.listen(3000, function() {
  console.log('Listening on 3000');
});
