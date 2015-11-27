//
// $Id: index.js,v 1.2 2015/11/25 14:36:41 ec2-user Exp ec2-user $
//

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
