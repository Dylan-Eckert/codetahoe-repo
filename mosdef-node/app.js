const express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/menus', require('./routes/menus'))

app.listen(3000, function() {
  console.log('Mosdef is running')
});
