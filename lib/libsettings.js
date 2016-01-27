// vim: sw=4

var config = require('app-config');

function settings() {
    this.network     = config.colu.network || 'testnet';
    this.apiKey      = config.colu.apiKey;
    this.privateSeed = config.colu.privateSeed;
}

module.exports = settings;
