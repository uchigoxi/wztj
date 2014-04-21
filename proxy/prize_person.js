/**
 * Created by zy on 14-1-27.
 */
var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "prize_person");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
var testPrize = {
  aid: 1,
  gname: 'name44',
  num: 1,
  use_for: 2,
  goods_status: 3,
  prize_name: 'prizename',
  prize_level: 4,
  prize_status: 0,
  remark: 'prize'
}
Proxy.prototype.addPrize = function (prize, cb) {
  prize = prize || testPrize;
  if (!checkParam([prize.aid, '>0number', prize.gname, '>string', prize.num, '>0number', prize.use_for, '>0number',
    prize.goods_status, '>=0number' , prize.prize_status, '>=0number', prize.prize_name, '>string',
    prize.prize_level, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertPrize(prize, function (err, result) {
    return cb(err, result);
  });
};


/**
 * select
 */
Proxy.prototype.getPrizeById = function (id, cb) {
  if (!checkParam([id, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getPrizeById(id, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getPrizeByAid = function (aid, cb) {
  if (!checkParam([aid, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getPrizeByAid(aid, function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.zhongJiang = function (id, uid, cb) {
  if (!checkParam([id, '>0number', uid, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.zhongJiang(id, uid, 5, function (err, result) {
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


Proxy.prototype.lingJiang = function (id, cb) {
  if (!checkParam([id, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.lingJiang(id, 6, function (err, result) {
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


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};
