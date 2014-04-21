/**
 * Created by zy on 14-1-23.
 */


var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "mall");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */

Proxy.prototype.addMall = function (mall, cb) {
  if (!checkParam([mall.gname, '>0string', mall.num, '>0number', mall.mall_name, '>0string', mall.mall_price, '>0number',
    mall.mall_price_unit, '>=0number', mall.use_for, '>0number', mall.goods_status, '>=0number', mall.mall_status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertMall(mall, function (err, result) {
    return cb(err, result);
  });
};


/**
 * 批量导入
 * @param mall
 * @param cb
 * @returns {*}
 */
var testMalls = {
  gname: 'name',
  num: 20,
  use_for: 1,
  goods_status: 3,
  price: 999,
  price_unit: 0,
  sell_user: 0,
  sell_date: null,
  mall_status: 0,
  remark: '测试数据'
};
Proxy.prototype.addMallBatch = function (malls, cb) {
  malls = malls || testMalls;
  if (!checkParam([malls.gname, '>0string', malls.num, '>0number', malls.use_for, '>0number', malls.goods_status, '>=0number',
    malls.price, '>0number', malls.price_unit, '>=0number', malls.sell_user, '>=0number', malls.mall_status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertMallBatch(malls, function (err, result) {
    return cb(err, result);
  });
};


/**
 * select
 */
Proxy.prototype.getMallById = function (mallId, cb) {
  if (!checkParam([mallId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getMallById(mallId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getMallByName = function (name, cb) {
  if (!checkParam([name, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getMallByName(name, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getMallByCategory = function (category, cb) {
  if (!checkParam([category, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getMallByCategory(category, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getMallByBid = function (bid, cb) {
  if (!checkParam([bid, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getMallByBid(bid, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getMallList = function (args, cb) {
  return store.getMallList(args, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getMallListAdmin = function (cb) {
  return store.getMallListAdmin(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.sell = function (args, cb) {

  if (!checkParam([args.uid, '>0number', args.mall_name, '>string', args.num, '>0number', args.mall_status, '>=0number',
    args.warehouse_status, '>=0number', args.wfrom, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.sell(args, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.cancel = function (name, cb) {

  if (!checkParam([name, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.cancel(name, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};
