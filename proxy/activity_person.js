/**
 * Created by zy on 14-1-23.
 */


var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "activity_person");
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
  if (!checkParam([activity.status, '>=0number', activity.name, '>string', activity.type, '>=0number', activity.status, '>=0number',
    activity.uid, '>=0number', activity.percent, '>=0number', activity.cost, '>=0number', activity.max_person, '>=0number',
    activity.total_integral, '>=0number', activity.win, '>=0number', activity.lost, '>=0number'])) {
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


Proxy.prototype.getActivityList = function (cb) {
  return store.getActivityList(function (err, result) {
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
Proxy.prototype.play = function (aid, uid, winner, cb) {
  if (!checkParam([aid, '>0number', uid, '>0number', winner, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.play(aid, uid, winner, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.deleteActivity = function (id, cb) {
  if (!checkParam([id, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusById(id, 1, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('rowCount not 1 !'));
      }
    }
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


Proxy.prototype.cancel = function (cb) {
  return store.cancel(function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};
