// vim: sw=4

var config = require('app-config');
var mongo = require('mongodb');
var monk = require('monk');

var connectString = config.colu.db;
var db = monk(connectString);

module.exports = db;
