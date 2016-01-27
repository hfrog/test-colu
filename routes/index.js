// vim: sw=4

var express = require('express');
var Settings = require('../lib/libsettings');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var settings = new Settings;
    var asset = req.db.get('asset');
    asset.find({'privateSeed':settings.privateSeed},{},function(err,docs) {
        if (err) {
            console.error(err);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            res.render('index', {
                title: 'QIWI',
                network: settings.network,
                assets: docs
            });
        }
    });
});

module.exports = router;
