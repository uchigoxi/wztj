/**
 * Created by zy on 14-1-21.
 */

var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "goods");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
/*Proxy.prototype.addGoods = function (goods, cb) {
 goods = goods || testGoods;
 if (!checkParam([goods.name, '>0string', goods.description, '>0string', goods.bid, '>=0number', goods.pic, '>0string',
 goods.category, '>=0number', goods.use_for, '>=0number', goods.status, '>=0number', goods.owner, '>0string'])) {
 return cb(new Error("Param check wrong"));
 }
 goods.sn = goods.category.toString() + '_' + new Date().getTime() + '_' + zy.randomString(13);
 return store.insertGoods(goods, function (err, result) {
 if (!!err) {
 return cb(err);
 } else {
 if (result.rowCount == 1) {
 return cb(null, result);
 } else {
 return cb(new Error('result.rowCount <> 1 !'));
 }
 }
 });
 };*/


/**
 * 批量导入
 */
var testGoods = {
  name: 'name66',
  num: 10,
  description: 'description',
  sn: 'sn',
  bid: 4,
  pic: 'pic',
  category: 3,
  createdate: 'now()',
  use_date: null,
  use_for: 0,
  status: 0,
  owner: '2',
  remark: 'remark'
};
Proxy.prototype.addGoods = function (goods, cb) {
  goods = goods || testGoods;
  if (!checkParam([goods.name, '>0string', goods.num, '>0number', goods.description, '>=0string', goods.bid, '>=0number',
    goods.pic, '>0string', goods.category, '>=0number', goods.use_for, '>=0number', goods.status, '>=0number',
    goods.owner, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
/*  var sn = '';
  var snarray = zy.randomUniqueArray(13, goods.num);
  for (var i = 0; i < snarray.length; i++) {
    sn += '"' + goods.category.toString() + '_' + new Date().getTime() + '_' + snarray[i] + '",';
  }
  sn = '{' + sn.substr(0, sn.length - 1) + '}';
  goods.sn = sn;*/
  return store.insertGoods(goods, function (err, result) {
    return cb(err, result);
  });
};


/**
 * select
 */
Proxy.prototype.getGoodsById = function (goodsId, cb) {
  if (!checkParam([goodsId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsById(goodsId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsByCategory = function (category, cb) {
  if (!checkParam([category, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsByCategory(category, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsByUsefor = function (usefor, cb) {
  if (!checkParam([usefor, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsByUsefor(usefor, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsByStatus = function (status, cb) {
  if (!checkParam([status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsByStatus(status, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsByOwner = function (owner, cb) {
  if (!checkParam([owner, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsByOwner(owner, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsByName = function (name, cb) {
  if (!checkParam([name, '>string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsByName(name, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsByBid = function (bid, cb) {
  if (!checkParam([bid, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getGoodsByBid(bid, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getGoodsList = function (cb) {
  return store.getGoodsList(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};