// vim: sw=4

var express = require('express');
var Settings = require('../lib/libsettings');
var router = express.Router();

/* get settings */
router.get('/', function(req, res, next) {
    var settings = new Settings;
    res.json({ network: settings.network });
});

module.exports = router;
