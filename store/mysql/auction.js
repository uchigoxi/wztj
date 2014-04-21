var EventEmitter = require('events').EventEmitter;
var _pool = null;
var _query = null;

var Auction = module.exports = function Auction(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};
Auction.prototype.__proto__ = EventEmitter.prototype;

Auction.prototype.load = function (userId) {
  var sql = "select * from auction where ownerid != ? order by id desc";
  var options = [userId];
  _query(undefined, sql, options, function (err, results) {
    return cb(err, results);
  });
};

Auction.prototype.getGoodsByGid = function (goodsId, cb) {
  var sql = "select * from auction where goodsid = ?";
  var options = [goodsId];
  _query(undefined, sql, options, function (err, results) {
    return cb(err, results);
  });
};

Auction.prototype.cancelSell = function (userId, goodsId, cb) {
  var sql = "call cancelSell(?, ?)";
  var options = [userId, goodsId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });

};

Auction.prototype.buy = function (userId, userName, goodsId, cb) {
  var sql = "call buy_bank(?, ?, ?)";
  var options = [userId, userName, goodsId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Auction.prototype.sell = function (userId, goodsId, price, eptime, sell_type, cb) {
  var sql = "call sell(?, ?, ?, ?, ?)";
  var options = [userId, goodsId, price, eptime, sell_type];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


Auction.prototype.cleanTable = function (cb) {
  var sql = "truncate table auction";
  _query(undefined, sql, [], function (err, result) {
    return cb(err, result);
  });
};