// vim: sw=4

var express = require('express');
var router = express.Router();

/* Issue asset */
router.post('/', function(req, res, next) {

    var name =   req.body.name;
    var amount = req.body.amount;

    var asset = {
        amount: amount,
        metadata: {
            assetName: name,
        },
        reissueable: false,
        divisibility: 0
    };

    req.colu.on('connect', function () {
        req.colu.issueAsset(asset, function (err, body) {
            if (err) {
                console.error(err);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
            } else {

                req.db.get('asset').insert({
                    assetId: body.assetId,
                    issueAddress: body.issueAddress
                }, function (err, doc) {
                    if (err) {
                        console.error(err);
                        res.render('error', {
                            message: err.message,
                            error: {}
                        });
                    } else {
                        res.render('issue', {
                            name:         name,
                            amount:       amount,
                            assetId:      body.assetId,
                            issueAddress: body.issueAddress,
                            result:       JSON.stringify(body)
                        });
                    }
                });

            }
        });
    });

    req.colu.init();

});

module.exports = router;
