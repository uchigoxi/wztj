var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Coreseek = module.exports = function Coreseek(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};
Coreseek.prototype.__proto__ = EventEmitter.prototype;


Coreseek.prototype.getMsgByKeyword = function (keyword, callback) {
  var sql = "select * from keyword where MATCH(?)";
  var option = [keyword];
  _query(undefined, sql, option, function (err, results) {
    return callback(err, results);
  });
};

Coreseek.prototype.getActivityByKeyword = function (keyword, callback) {
  var sql = "select * from activity where MATCH(?)";
  var option = [keyword];
  _query(undefined, sql, option, function (err, results) {
    return callback(err, results);
  });
};