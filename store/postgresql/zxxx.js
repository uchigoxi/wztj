/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Zxxx = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Zxxx.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Zxxx.prototype.insertZxxx = function (zxxx, callback) {
  var insertObj = zxxx;
  var sql = "insert into Zxxx (status,title,type,fid,create_date,remark1,remark2) " +
    "values ($1,$2,$3,$4,$5,$6,$7) " +
    "returning id";
  var options = [insertObj.status, insertObj.title, insertObj.type, insertObj.fid, insertObj.create_date, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Zxxx.prototype.getList = function (callback) {
  var sql = "SELECT * FROM zxxx where status = 0 limit 10";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Zxxx.prototype.getListAdmin = function (callback) {
  var sql = "SELECT * FROM zxxx where status = 0";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

/**
 * update
 */
Zxxx.prototype.setStatusByUid = function (id, status, callback) {
  var sql = "update zxxx set status = $1 where id = $2 returning id";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Zxxx.prototype.cleanTable = function (callback) {
  var sql = "truncate table zxxx";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};