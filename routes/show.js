//
// $Id: show.js,v 1.1 2015/11/25 14:36:34 ec2-user Exp ec2-user $
//

var express = require('express');
var router = express.Router();

/* Show file */
router.get('/', function(req, res, next) {
  res.sendFile('/tmp/test.jpg');
});

module.exports = router;
