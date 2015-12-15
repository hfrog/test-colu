
var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

var myfile = '/tmp/test.jpg';

/* Upload file */
router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (files.upload.size !== 0) {
      fs.rename(files.upload.path, myfile, function(err) {
        if (err) {
          fs.unlink(myfile);
          fs.rename(files.upload.path, myfile);
        }
      });
//      res.set('Content-Type', 'text/html; charset=UTF-8');
    }
    res.render('upload', { file: files.upload.name });
  });
});

module.exports = router;
