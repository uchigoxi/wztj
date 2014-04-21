var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Warehouse = module.exports = function Warehouse(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};
Warehouse.prototype.__proto__ = EventEmitter.prototype;

/*Warehouse.prototype.addGoods = function(options, cb){
 if (!_checkParamer(options, warehousePropertyList, true)) {
 return cb(new Error("params wrong"));
 }
 var sql = "insert into warehouse set ?";
 _query(undefined, sql, options, function(err, result){
 return cb(err, result);
 });
 };*/

Warehouse.prototype.addGoodsByType = function (type, bid, userId, username, cb) {
  var sql = "call setGoodsForUserByType(?, ?, ?, ?)";
  var options = [type, bid, userId, username];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Warehouse.prototype.addGoodsByGid = function (gid, userId, username, cb) {
  var sql = "call setGoodsForWarehouseByGid(?, ?, ?)";
  var options = [gid, userId, username];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Warehouse.prototype.getGoods = function (goodsId, userId, cb) {
  var sql = "select * from warehouse where goodsid = ? and ownerid = ?";
  var options = [goodsId, userId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Warehouse.prototype.getGoodsById = function (goodsId, userId, cb) {
  var sql = "select * from warehouse where goodsid = ? and ownerid = ?";
  var options = [goodsId, userId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Warehouse.prototype.getAllGoods = function (userId, cb) {
  var sql = "select * from warehouse where ownerid = ?";
  var options = [userId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
}

Warehouse.prototype.useGoods = function (goodsId, userId, cb) {
  var sql = "update warehouse set used = 1 where goodsid = ? and ownerid = ?";
  var options = [goodsId, userId]
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


Warehouse.prototype.deleteGoods = function (goodsId, userId, cb) {
  var sql = "delete from warehouse where goodsid = ? and ownerid = ?";
  var options = [goodsId, userId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Warehouse.prototype.cleanTable = function (cb) {
  var sql = "truncate table warehouse";
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};
