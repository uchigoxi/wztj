/**
 * Created by zy on 14-1-23.
 */
var EventEmitter = require('events').EventEmitter;
var store = null;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "some_list");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


Proxy.prototype.categoryList = function (cb) {
  return store.categoryList(function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.businessList = function (cb) {
  return store.businessList(function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.businessAreaList = function (cb) {
  return store.businessAreaList(function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.asTypeList = function (cb) {
  return store.asTypeList(function (err, result) {
    return cb(err, result);
  });
};

Proxy.prototype.useForList = function (cb) {
  return store.useForList(function (err, result) {
    return cb(err, result);
  });
};