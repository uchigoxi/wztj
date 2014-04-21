/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Account = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Account.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Account.prototype.insertUser = function (account, callback) {
  var insertObj = account;
  /*  var sql = "insert into account (name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode) " +
   "values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) " +
   "returning id";*/
  var sql = "select proc_add_user($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)";
  var options = [insertObj.name, insertObj.sex, insertObj.password, insertObj.salt, insertObj.key, insertObj.address,
    insertObj.nickname, insertObj.status, insertObj.regdate, insertObj.age, insertObj.qq, insertObj.tel, insertObj.regplatform,
    insertObj.pic, insertObj.icode, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Account.prototype.getUserById = function (accountId, callback) {
  var sql = "SELECT id,name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode " +
    "FROM account where id = $1 order by id desc";
  var sql = "SELECT * FROM account left join bank on account.id =bank.uid where account.id = $1"
  var options = [accountId];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.getUserByKey = function (key, callback) {
  var sql = "SELECT id,name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode " +
    "FROM account where key = $1 order by id desc";
  var options = [key];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.getUserByName = function (name, callback) {
  var sql = "SELECT id,name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode " +
    "FROM account where name = $1 order by id desc";
  var options = [name];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.getUserByNickname = function (nickname, callback) {
  var sql = "SELECT id,name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode " +
    "FROM account where nickname = $1 order by id desc";
  var options = [nickname];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.getUserList = function (callback) {
  var sql = "SELECT id,name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode " +
    "FROM account order by id desc";
  var sql = "SELECT * FROM account left join bank on account.id =bank.uid order by account.id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Account.prototype.setStatusById = function (id, status, callback) {
  var sql = "update account set status = $1 where id = $2";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.setPasswordById = function (id, password, callback) {
  var sql = "update account set password = $1 where id = $2 returning id";
  var options = [password, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.setNicknameById = function (id, nickname, callback) {
  var sql = "update account set nickname = $1 where id = $2";
  var options = [nickname, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.setPicById = function (id, pic, callback) {
  var sql = "update account set pic = $1 where id = $2";
  var options = [pic, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.setInfoById = function (userInfo, callback) {
  console.log(userInfo);
  if(userInfo.pic){
    var sql = "update account set sex = $2, tel = $3, qq = $4, age = $5, pic = $6 where id = $1 returning id ";
    var options = [userInfo.uid, userInfo.sex, userInfo.tel, userInfo.qq, userInfo.age, userInfo.pic];
  }else{
    var sql = "update account set sex = $2, tel = $3, qq = $4, age = $5 where id = $1 returning id ";
    var options = [userInfo.uid, userInfo.sex, userInfo.tel, userInfo.qq, userInfo.age];
  }

  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.ivite = function (ivite, integral, callback) {
  var sql = "update bank set integral = integral + $2 where uid = (select id from account where icode= $1)";
  var options = [ivite, integral];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Account.prototype.cleanTable = function (callback) {
  var sql = "truncate table account";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};
