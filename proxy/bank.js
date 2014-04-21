/**
 * Created by zy on 14-1-22.
 */


var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "bank");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * select
 */
Proxy.prototype.find = function(userId, cb){
  if (!checkParam([userId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getBankById(userId, function(err, result){
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.addIntegral = function(userId, num, cb){
  if (!checkParam([userId, '>0number', num, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.addIntegralByUid(userId, num, function(err, result){
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


Proxy.prototype.addTicket = function(userId, num, cb){
  if (!checkParam([userId, '>0number', num, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.addTicketByUid(userId, num, function(err, result){
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


Proxy.prototype.addMoney = function(userId, num, cb){
  if (!checkParam([userId, '>0number', num, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.addMoneyByUid(userId, num, function(err, result){
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


Proxy.prototype.subIntegral = function(userId, num, cb){
  if (!checkParam([userId, '>0number', num, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.subIntegralByUid(userId, num, function(err, result){
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


Proxy.prototype.subTicket = function(userId, num, cb){
  if (!checkParam([userId, '>0number', num, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.subTicketByUid(userId, num, function(err, result){
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


Proxy.prototype.subMoney = function(userId, num, cb){
  if (!checkParam([userId, '>0number', num, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.subMoneyByUid(userId, num, function(err, result){
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


Proxy.prototype.cleanTable = function(cb) {
  return store.cleanTable(function(err){
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