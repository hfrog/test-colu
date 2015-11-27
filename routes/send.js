//
// $Id: upload.js,v 1.1 2015/11/25 14:36:36 ec2-user Exp ec2-user $
//

var express = require('express');
var router = express.Router();

/* Send asset */
router.post('/', function(req, res, next) {
  console.log('router.post');
  console.log('router.post form');
  var result = 'A great result';
  res.render('send', { assetId: req.body.assetId, qty: req.body.qty, toAddr: req.body.toAddr, result: result });
});

module.exports = router;
