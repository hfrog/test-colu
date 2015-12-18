// vim: sw=4

var config = require('app-config');
var Colu = require('colu');

var settings = {
    network:     config.colu.network,
    apiKey:      config.colu.apiKey,
    privateSeed: config.colu.privateSeed
};

function coluWrapper() {
    Colu.call(this, settings);
}

coluWrapper.prototype = Object.create(Colu.prototype);
coluWrapper.prototype.constructor = coluWrapper;

module.exports = coluWrapper;
