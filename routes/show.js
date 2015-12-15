
var express = require('express');
var router = express.Router();

/* Show file */
router.get('/', function(req, res, next) {
  res.sendFile('/tmp/test.jpg');
});

module.exports = router;
