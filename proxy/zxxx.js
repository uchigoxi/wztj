/**
 * Created by zy on 14-1-23.
 */
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "zxxx");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


Proxy.prototype.add = function (zxxx, cb) {
  if (!checkParam([zxxx.type, '>=0number',zxxx.title, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertZxxx(zxxx, function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.getList = function (cb) {
  return store.getList(function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.getListAdmin = function (cb) {
  return store.getListAdmin(function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.setStatusByUid = function (id, status, cb) {
  if (!checkParam([id, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusByUid(id, status, function (err, result) {
    return cb(err, result);
  });
};