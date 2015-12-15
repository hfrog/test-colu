//
// $Id: index.js,v 1.2 2015/11/25 14:36:41 ec2-user Exp ec2-user $
//

var express = require('express');
var config = require('app-config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var apiKey = config.colu.apiKey;
  var privateSeed = config.colu.privateSeed;
  res.render('index', { title: 'Express', apiKey: apiKey, privateSeed: privateSeed });
});

module.exports = router;
