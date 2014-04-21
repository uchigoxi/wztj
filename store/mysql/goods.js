var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Goods = module.exports = function Auction(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};
Goods.prototype.__proto__ = EventEmitter.prototype;

var goodsPropertyList = {
  name: 1, description: 2, code: 3, bid: 4, pic: 5, type: 6, used: 7, eptime: 8
};


var _checkParamer = function (paramerList, filterList, fullFlag) {
  var result = true;
  var _temp;
  if (!!fullFlag) {
    for (_temp in filterList) {
      if (!paramerList.hasOwnProperty(_temp)) {
        return false;
      }
    }
  }
  for (_temp in paramerList) {
    if (!filterList.hasOwnProperty(_temp)) {
      return false;
    }
  }
  return true;
};

Goods.prototype.addGoods = function (options, cb) {
  if (!_checkParamer(options, goodsPropertyList, true)) {
    return cb(new Error("params wrong"));
  }
  var sql = "insert into goodspool set ?";
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Goods.prototype.getGoods = function (goodsId, cb) {
  var sql = "select * from goodspool where id = ?";
  var options = [goodsId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Goods.prototype.setGoodsForUserByType = function (type, bid, userId, username, cb) {
  var sql = "call setGoodsForUserByType(?, ?, ?, ?)";
  var options = [type, bid, userId, username];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


Goods.prototype.deleteGoods = function (goodsId, cb) {
  var sql = "delete from goodspool where id = ?";
  var options = [goodsId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


Goods.prototype.cleanTable = function (cb) {
  var sql = "truncate table goodspool";
  var options = []
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};
