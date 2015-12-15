
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
