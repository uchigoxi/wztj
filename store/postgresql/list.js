/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var SomeList = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
SomeList.prototype.__proto__ = EventEmitter.prototype;


/**
 * select
 */
SomeList.prototype.categoryList = function (callback) {
  var sql = "SELECT * FROM category where status = 0 order by id";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

SomeList.prototype.businessList = function (callback) {
  var sql = "SELECT * FROM business where status = 0 order by id";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

SomeList.prototype.businessAreaList = function (callback) {
  var sql = "SELECT * FROM business_area where status = 0 order by id";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

SomeList.prototype.asTypeList = function (callback) {
  var sql = "SELECT * FROM activity_type";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

SomeList.prototype.useForList = function (callback) {
  var sql = "SELECT * FROM use_for";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};