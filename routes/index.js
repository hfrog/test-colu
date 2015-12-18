// vim: sw=4

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var asset = req.db.get('asset');
    asset.find({},{},function(err,docs) {
        if (err) {
            console.error(err);
            res.render('error', {
                message: err.message,
                error: {}
            });
        } else {
            res.render('index', {
                title: 'Express',
                assets: docs
            });
        }
    });
});

module.exports = router;
