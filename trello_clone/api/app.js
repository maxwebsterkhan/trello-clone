var getCards = require('./routes/cards/get').getCards

var postCards = require('./routes/cards/post').postCards;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var http = require('http');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


var port = parseInt(process.env.PORT || '9000');

app.get('/cards', getCards)
app.post('/cards', postCards);

app.listen(port, () =>
  console.log(`Trello app listening at http://localhost:${port}`),
);
