var neo4j = require('neo4j');
var config = require('../config/index.js');
config = config[config.env];
var Neo = require('./neo');

var db = new neo4j.GraphDatabase(config.neo4j.path);
var stores = {};
stores.relationship = new Neo(db);

var EventEmitter = require('events').EventEmitter;

module.exports = function (storeName) {
  if (!!stores[storeName.toLowerCase()]) {
    return stores[storeName.toLowerCase()];
  } else {
    return null;
  }
};