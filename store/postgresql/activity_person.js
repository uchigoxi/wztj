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
  var sql = "select proc_add_activity_person($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ";
  var options = [insertObj.status, insertObj.name, insertObj.type, insertObj.description, insertObj.uid, insertObj.percent, insertObj.cost,
    insertObj.max_person, insertObj.total_integral, insertObj.create_date, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.play = function (aid, uid, winner, callback) {
  var sql = "select proc_activity_person_play($1,$2,$3) ";
  var options = [aid, uid, winner];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Activity.prototype.getActivityById = function (activityId, callback) {
  var sql = "SELECT id,status,name,type,description,uid,percent,cost,max_person,total_integral,create_date,win,lost,remark1,remark2 " +
    "FROM activity_person where id = $1";
  var options = [activityId];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.getActivityList = function (callback) {
  var sql = "SELECT activity_person.id,activity_person.status,activity_person.name,activity_person.type,activity_person.description," +
    "activity_person.uid,activity_person.percent,activity_person.cost,activity_person.max_person,activity_person.total_integral," +
    "activity_person.create_date,activity_person.win,activity_person.lost,activity_person.remark1,activity_person.remark2," +
    " account.name as uname " +
    "FROM activity_person left join account on activity_person.uid = account.id " +
    "where activity_person.status = 0 and date_trunc('day',activity_person.create_date) = date_trunc('day',now()) and activity_person.max_person > (activity_person.win + activity_person.lost) order by activity_person.id desc";
  //var sql = "select * from activity_person left join account on activity_person.uid = account.id where activity_person.status = 0";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.getActivityListAdmin = function (callback) {
  var sql = "SELECT activity_person.id,activity_person.status,activity_person.name,activity_person.type,activity_person.description," +
    "activity_person.uid,activity_person.percent,activity_person.cost,activity_person.max_person,activity_person.total_integral," +
    "activity_person.create_date,activity_person.win,activity_person.lost,activity_person.remark1,activity_person.remark2," +
    " account.name as uname " +
    "FROM activity_person left join account on activity_person.uid = account.id " +
    "order by activity_person.id desc";
  //var sql = "select * from activity_person left join account on activity_person.uid = account.id where activity_person.status = 0";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Activity.prototype.setStatusById = function (id, status, callback) {
  var sql = "update activity_person set status = $1 where id = $2 and status = 0";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.setConfigById = function (id, config, callback) {
  var sql = "update activity_person set config = $1 where id = $2";
  var options = [config, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.cancel = function (callback) {
  var sql = "select proc_activity_person_cancel()";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Activity.prototype.cleanTable = function (callback) {
  var sql = "truncate table activity_person";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};