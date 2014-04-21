/**
 * Created by zy on 14-1-23.
 */


var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "activity_standard");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
var testActivity = {
  bid: 0,
  keyword: 'keyword',
  name: 'name3',
  description: 'description',
  edate: 'now()',
  sdate: 'now()',
  status: 0,
  salt: 'salt',
  config: {},
  type: 0
};
Proxy.prototype.addActivity = function (activity, cb) {
  activity = activity || testActivity;
  if (!checkParam([activity.bid, '>=0number', activity.name, '>string', activity.type, '>=0number',
    activity.status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertActivity(activity, function (err, result) {
    return cb(err, result);
  });
};


/**
 * select
 */
Proxy.prototype.getActivityById = function (activityId, cb) {
  if (!checkParam([activityId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getActivityById(activityId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getActivityByName = function (gname, cb) {
  if (!checkParam([gname, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getActivityByName(gname, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getActivityList = function (cb) {
  return store.getActivityList(function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getActivityPrizeList = function (aid, cb) {
  if (!checkParam([aid, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getActivityPrizeList(aid, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getActivityListAdmin = function (cb) {
  return store.getActivityListAdmin(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.deleteActivity = function (id, status, cb) {
  if (!checkParam([id, '>0number', status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusById(id, status, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.setConfigById = function (id, config, cb) {
  if (!checkParam([id, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setConfigById(id, config, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};
