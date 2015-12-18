// vim: sw=4

var express = require('express');
var router = express.Router();

/* Send asset */
router.post('/', function(req, res, next) {

    var assetId = req.body.assetId;
    var toAddr =  req.body.toAddr;
    var qty =     req.body.qty;

    var asset = req.db.get('asset');
    asset.findOne({assetId: assetId},{issueAddress:true},function(err, docs) {
        if (err) {
            console.error(err);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {

            issueAddress = docs.issueAddress;
//            console.log("send assetId:", assetId, "issueAddress:", issueAddress);

            var send = {
                from: [issueAddress],
                to: [{
                    phoneNumber: toAddr,
                    assetId: assetId,
                    amount: qty
                }],
//                metadata: {
//                    'description': 'Balloons for free'
//                }
            };

            var colu = new req.colu();
            colu.on('connect', function () {
                colu.sendAsset(send, function (err, body) {
                    if (err) {
                        console.error(err);
                        res.render('error', {
                            message: err.message,
                            error: err
                        });
                    } else {
                        res.render('send', {
                            assetId: assetId,
                            qty: qty,
                            toAddr: toAddr,
                            result: JSON.stringify(body)
                        });
                    }
                });
            });
            colu.init();

        }
    });
});

module.exports = router;
