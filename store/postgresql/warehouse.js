/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Warehouse = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Warehouse.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Warehouse.prototype.insertWarehouse = function (warehouse, callback) {
  var insertObj = warehouse;
  var sql = "select proc_mall_to_warehouse($1,$2,$3,$4,$5)";
  var options = [insertObj.mall_id, insertObj.uid, insertObj.mall_status, insertObj.warehouse_status, insertObj.remark];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Warehouse.prototype.insertWarehouseBatch = function (warehouse, callback) {
  var insertObj = warehouse;
  var sql = "select proc_mall_to_warehouse_batch($1,$2,$3,$4,$5,$6)";
  var options = [insertObj.gname, insertObj.num, insertObj.uid, insertObj.mall_status, insertObj.warehouse_status, insertObj.remark];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Warehouse.prototype.psToWarehouse = function (warehouse, callback) {
  var insertObj = warehouse;
  var sql = "select proc_prize_standard_to_warehouse($1,$2,$3,$4,$5,$6,$7,$8,$9)";
  var options = [insertObj.uid, insertObj.aid, insertObj.prize_level, insertObj.prize_status, insertObj.warehouse_status,
    insertObj.wfrom, insertObj.create_date, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Warehouse.prototype.getWarehouseById = function (id, callback) {
  var sql = "SELECT id,uid,gid,mid,gname,description,sn,bid,pic,category,create_date,price,price_unit,status,remark " +
    "FROM warehouse where id = $1";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Warehouse.prototype.getWarehouseList = function (callback) {
  var sql = "SELECT id,uid,gid,mid,gname,description,sn,bid,pic,category,create_date,price,price_unit,status,remark " +
    "FROM warehouse order by id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};
/**
 * update
 */
Warehouse.prototype.setStatusById = function (id, status, callback) {
  var sql = "update warehouse set status = $1 where id = $2";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Warehouse.prototype.cleanTable = function (callback) {
  var sql = "truncate table warehouse";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};