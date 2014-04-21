/**
 * Created by zy on 14-1-16.
 */


var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Activity = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Activity.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Activity.prototype.insertActivity = function (activity, callback) {
  var insertObj = activity;
  var sql = "insert into activity_business (bid,keyword,name,description,edate,sdate,status,salt,config,type) " +
    "values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) " +
    "returning id";
  var options = [insertObj.bid, insertObj.keyword, insertObj.name, insertObj.description, insertObj.edate, insertObj.sdate,
    insertObj.status, insertObj.salt, insertObj.config, insertObj.type];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Activity.prototype.getActivityById = function (activityId, callback) {
  var sql = "SELECT id,bid,keyword,name,description,edate,sdate,status,salt,config,type " +
    "FROM activity_business where id = $1";
  var options = [activityId];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.getActivityList = function (callback) {
  var sql = "SELECT id,bid,keyword,name,description,edate,sdate,status,salt,config,type " +
    "FROM activity_business where status = 0 and edate > now() and sdate < now() order by id desc limit 20";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Activity.prototype.setStatusById = function (id, status, callback) {
  var sql = "update activity_business set status = $1 where id = $2 and status = 0";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.setConfigById = function (id, config, callback) {
  var sql = "update activity_business set config = $1 where id = $2";
  var options = [config, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.cleanTable = function (callback) {
  var sql = "truncate table activity_business";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};