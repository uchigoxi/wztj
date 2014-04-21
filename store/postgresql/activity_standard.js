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
  var sql = "insert into activity_standard (bid,keyword,name,description,edate,sdate,status,salt,config,type,create_date,remark1,remark2) " +
    "values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) " +
    "returning id";
  var options = [insertObj.bid, insertObj.keyword, insertObj.name, insertObj.description, insertObj.edate, insertObj.sdate,
    insertObj.status, insertObj.salt, insertObj.config, insertObj.type, insertObj.create_date, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Activity.prototype.getActivityById = function (activityId, callback) {
  var sql = "SELECT id,bid,keyword,name,description,edate,sdate,status,salt,config,type,create_date,remark1,remark2 " +
    "FROM activity_standard where id = $1";
  var options = [activityId];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

Activity.prototype.getActivityByName = function (gname, callback) {
  var sql = "SELECT id,bid,keyword,name,description,edate,sdate,status,salt,config,type,create_date,remark1,remark2 " +
    "FROM activity_standard where name = $1";
  var options = [gname];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

Activity.prototype.getActivityList = function (callback) {
  var sql = "SELECT id,bid,keyword,name,description,edate,sdate,status,salt,config,type,create_date,remark1,remark2 " +
    "FROM activity_standard where status = 0 and edate > now() and sdate < now() order by id desc limit 9";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

Activity.prototype.getActivityPrizeList = function (aid, callback) {
  var sql = "select prize_standard.*, account.name as uname, account.pic as upic " +
    " from prize_standard left join account on prize_standard.uid = account.id " +
    " where prize_standard.aid = $1 and (prize_standard.uid is not null)";
  var options = [aid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

Activity.prototype.getActivityListAdmin = function (callback) {
  var sql = "SELECT id,bid,keyword,name,description,edate,sdate,status,salt,config,type,create_date,remark1,remark2 " +
    "FROM activity_standard order by id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Activity.prototype.setStatusById = function (id, status, callback) {
  var sql = "update activity_standard set status = $1 where id = $2 and status = 0";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.setConfigById = function (id, config, callback) {
  var sql = "update activity_standard set config = $1 where id = $2";
  var options = [config, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.cleanTable = function (callback) {
  var sql = "truncate table activity_standard";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};