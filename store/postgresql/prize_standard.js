/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Prize = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Prize.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Prize.prototype.insertPrize = function (prize, callback) {
  var insertObj = prize;
  var sql = "select proc_goods_to_prize_standard_batch($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
  var options = [insertObj.aid, insertObj.gname, insertObj.num, insertObj.use_for, insertObj.goods_status,
    insertObj.prize_name, insertObj.prize_level, insertObj.prize_status, insertObj.create_date, insertObj.remark1,
    insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Prize.prototype.getPrizeById = function (id, callback) {
  var sql = "select id,aid,status,create_date,gid,gname,description,sn,bid,pic,category,prize_name,prize_level,uid,prize_date,exchange_date,remark" +
    "FROM prize_standard where id = $1";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Prize.prototype.getPrizeByAid = function (aid, callback) {
  var sql = "select id,aid,status,create_date,gid,gname,description,sn,bid,pic,category,prize_name,prize_level,uid,prize_date,exchange_date,remark" +
    "FROM prize_standard where aid = $1 order by prize_level";
  var options = [aid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

Prize.prototype.getList = function (callback) {
  var sql = "select id,status,create_date,prize_name,prize_level,prize_date,aid,gid,gname,uid,remark1,remark2 " +
    "FROM prize_standard order by id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};
/**
 * update
 */
Prize.prototype.zhongJiang = function (id, uid, status, callback) {
  var sql = "update prize_standard set uid = $1, prize_date = now(), status = $2 where id = $3 and status = 0";
  var options = [uid, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Prize.prototype.lingJiang = function (id, status, callback) {
  var sql = "update prize_standard set exchange_date = now(), status = $1 where id = $2 and status = 5";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Prize.prototype.del = function (aid, callback) {
  var sql = "select proc_prize_standard_to_goods_batch($1)";
  var options = [aid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Prize.prototype.cleanTable = function (callback) {
  var sql = "truncate table prize_standard";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};