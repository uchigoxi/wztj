var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Sn = module.exports = function User(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};

Sn.prototype.__proto__ = EventEmitter.prototype;


Sn.prototype.generateSn = function (baid, sn, prizyType, prizeName, prizeNum, cb) {
  var sql = "insert into biz_sn set ?";
  var options = {baid: baid, sn: sn, other: JSON.stringify({prizetype: prizyType, prizename: prizeName, prizenum: prizeNum})};
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Sn.prototype.getSn = function (userId, baid, cb) {
  var sql = "select sid as id, sn, other, flag, userid, user_mobile  from biz_sn where baid = ? and userid = ?";
  var obj = [baid, userId];
  _query(undefined, sql, obj, function (err, results) {
    return cb(err, results);
  });
};

Sn.prototype.setMobile = function (mobileNum, userId, sn, baid, cb) {
  var sql = "update biz_sn set user_mobile = ? , sid = last_insert_id(sid) where userid = ? and sn = ? and baid = ? limit 1";
  var options = [mobileNum, userId, sn, baid];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Sn.prototype.handsel = function (userId, flag, baid, cb) {
  var sql = "update biz_sn set  userid = ?, flag = ?, sid = last_insert_id(sid)  where flag = 0 AND baid = ? AND userid is null limit 1";
  var options = [userId, flag, baid];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

Sn.prototype.cleanTable = function (cb) {
  var sql = "truncate table biz_sn";
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

