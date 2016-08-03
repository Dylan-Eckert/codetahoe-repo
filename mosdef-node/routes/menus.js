const express = require('express'),
      Menu = require('../models/menu');

const router = express.Router();

router.post('/', function(req, res) {
  var menu = new Menu(req.body);
  menu.save();

  res.json(menu);
});

router.get('/', function(req, res){
  var menus = Menu.all();

  res.json(menus);
});

router.get('/:id', function(req, res){
  var menu = Menu.find(req.params.id);

  res.json(menu);
});

module.exports = router;
