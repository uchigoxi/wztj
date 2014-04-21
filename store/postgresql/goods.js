/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Goods = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Goods.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
/*Goods.prototype.insertGoods = function (goods, callback) {
 var insertObj = goods;
 var sql = "insert into goods_pool (name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2) " +
 "values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) " +
 "returning id";
 var options = [insertObj.name, insertObj.description, insertObj.sn, insertObj.bid, insertObj.pic, insertObj.category,
 insertObj.create_date, insertObj.use_date, insertObj.use_for, insertObj.status, insertObj.owner, insertObj.remark];
 _query(sql, options, function (err, result) {
 return callback(err, result);
 });
 };*/


Goods.prototype.insertGoods = function (goods, callback) {
  var insertObj = goods;
  console.log(insertObj);
  var sql = "select proc_add_goods_batch ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)";
  var options = [insertObj.name, insertObj.description, insertObj.bid, insertObj.pic, insertObj.category, insertObj.create_date,
    insertObj.use_date, insertObj.use_for, insertObj.status, insertObj.owner, insertObj.sdate, insertObj.edate,insertObj.remark1,
    insertObj.remark2, insertObj.sn];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Goods.prototype.getGoodsById = function (id, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where id = $1 order by id desc";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsByCategory = function (category, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where category = $1 order by id desc";
  var options = [category];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsByUsefor = function (usefor, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where use_for = $1 order by id desc";
  var options = [usefor];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsByStatus = function (status, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where status = $1 order by id desc";
  var options = [status];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsByOwner = function (owner, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where owner = $1 order by id desc";
  var options = [owner];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsByName = function (name, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where name = $1 order by id desc";
  var options = [name];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsByBid = function (bid, callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner,sdate,edate,remark1,remark2 " +
    "FROM goods_pool where bid = $1 order by id desc";
  var options = [bid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.getGoodsList = function (callback) {
  var sql = "SELECT id,name,description,sn,bid,pic,category,create_date,use_date,use_for,status,owner," +
    "to_char(sdate,'yyyy-mm-dd hh24:mi:ss') as sdate,to_char(edate,'yyyy-mm-dd hh24:mi:ss') as edate,remark1,remark2 " +
    "FROM goods_pool order by id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Goods.prototype.setGoodsStatusById = function (id, status, callback) {
  var sql = "update goods_pool set status = $1 where id = $2";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Goods.prototype.cleanTable = function (callback) {
  var sql = "truncate table goods_pool";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};