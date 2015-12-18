
var Colu = require('colu');
var express = require('express');
var router = express.Router();

/* Issue asset */
router.post('/', function(req, res, next) {

  var settings = {
    network:     req.config.colu.network,
    apiKey:      req.config.colu.apiKey,
    privateSeed: req.config.colu.privateSeed
  };
  var colu = new Colu(settings);

  var name =   hreq.body.name;
  var amount = req.body.amount;

  var send = {
    from: [fromAddress],
    to: [{
        phoneNumber: toAddr,
        assetId: assetId,
        amount: qty
    }],
    metadata: {
        'description': 'Balloons for free'
    }
  };

  colu.on('connect', function () {
      colu.sendAsset(send, function (err, body) {
          if (err) return console.error(err);
//          console.log("Body: ", body);
          res.render('send', { assetId: assetId, qty: qty, toAddr: toAddr, result: body });
      })
  });

  colu.init();

});

module.exports = router;
