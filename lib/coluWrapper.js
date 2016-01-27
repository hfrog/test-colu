// vim: sw=4

var config = require('app-config');
var Settings = require('./libsettings');
var Colu = require('colu');

var settings = new Settings;
//var settings = {
//    network:     config.colu.network || 'testnet',
//    apiKey:      config.colu.apiKey,
//    privateSeed: config.colu.privateSeed,
//};
//console.log(JSON.stringify(settings));

function ColuWrapper() {
    Colu.call(this, settings);
}

ColuWrapper.prototype = Object.create(Colu.prototype);
ColuWrapper.prototype.constructor = ColuWrapper;

module.exports = ColuWrapper;
