// vim: sw=4

var express = require('express');
var Settings = require('../lib/libsettings');
var router = express.Router();

/* Get asset list */
router.get('/list', function(req, res, next) {
    var db = req.db;
    var collection = db.get('asset');
    collection.find({}, {}, function(e, docs) {
        res.json(docs);
    });
});

/* Issue asset */
router.post('/issue', function(req, res, next) {

    var settings = new Settings;

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

    var colu = new req.colu();
    colu.on('connect', function () {
        colu.issueAsset(asset, function (err, body) {
            if (err) {
                console.error(err);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            } else {

                req.db.get('asset').insert({
                    privateSeed: settings.privateSeed,
                    assetId: body.assetId,
                    issueAddress: body.issueAddress,
                    name: name,
                    amount: amount
                }, function (err, doc) {
                    if (err) {
                        console.error(err);
                        res.render('error', {
                            message: err.message,
                            error: err
                        });
                    } else {
                        res.render('issueasset-result', {
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

    colu.init();

});

/* Display form to send asset */
router.get('/send/:assetId', function(req, res, next) {

    var assetId = req.params.assetId;

    var asset = req.db.get('asset');
    asset.findOne({assetId: assetId},{name:true},function(err, docs) {
        if (err) {
            console.error(err);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            var name = docs.name;

            res.render('sendasset', {
                title: 'Send asset',
                name: name,
                assetId: assetId
            });
        }
    });
});

/* Send asset */
router.post('/send', function(req, res, next) {

    var assetId = req.body.assetId;
    var toAddr =  req.body.toAddr;
    var qty =     req.body.qty;

    console.log(assetId, toAddr, qty);
    var asset = req.db.get('asset');
    asset.findOne({assetId: assetId},{issueAddress:true},function(err, docs) {
        if (err) {
            console.error(err);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {

            var issueAddress = docs.issueAddress;
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
                            message: err.message ? err.message : '' + err.error,
                            error: err
                        });
                    } else {
                        res.render('sendasset-result', {
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

/* Get asset data */
router.get('/data/:assetId', function(req, res, next) {
//    console.log(req.params.assetId);
    var asset = {
        assetId: req.params.assetId
    };
    var colu = new req.colu();
    colu.on('connect', function () {
        colu.coloredCoins.getAssetData(asset, function(err, body) {
            if (err) {
                console.error(err);
                res.render('error', {
                    message: err.message ? err.message : '' + err.error,
                    error: err
                });
            } else {
                var assetData = [];
                for (var i in body.assetData) {
//                    console.log('address: ', body.assetData[i].address, 'amount: ', body.assetData[i].amount);
                    assetData[i] = {
                        address: body.assetData[i].address,
                        amount: body.assetData[i].amount
                    };
                }
                res.json(assetData);
            }
        });
    });
    colu.init();
});

module.exports = router;
