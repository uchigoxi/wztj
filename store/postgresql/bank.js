/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Bank = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Bank.prototype.__proto__ = EventEmitter.prototype;


var defaultBank = {
  uid: 0,
  integral: 0,
  ticket: 0,
  money: 0
};


/**
 * insert
 */
Bank.prototype.insertBank = function (bank, callback) {
  var insertObj = bank ? bank : defaultBank;
  var sql = "insert into Bank (uid,integral,ticket,money) " +
    "values ($1,$2,$3,$4) " +
    "returning uid";
  var options = [insertObj.uid, insertObj.integral, insertObj.ticket, insertObj.money];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Bank.prototype.getBankById = function (uid, callback) {
  var sql = "SELECT uid,integral,ticket,money " +
    "FROM bank where uid = $1";
  var options = [uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Bank.prototype.addIntegralByUid = function (uid, num, callback) {
  var sql = "update bank set integral = integral + $1 where uid = $2";
  var options = [num, uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.addTicketByUid = function (uid, num, callback) {
  var sql = "update bank set ticket = ticket +$1 where uid = $2";
  var options = [num, uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.addMoneyByUid = function (uid, num, callback) {
  var sql = "update bank set money = money+$1 where uid = $2";
  var options = [num, uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.subIntegralByUid = function (uid, num, callback) {
  var sql = "update bank set integral = integral - $1 where uid = $2 and integral >= $1";
  var options = [num, uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.subTicketByUid = function (uid, num, callback) {
  var sql = "update bank set ticket = ticket - $1 where uid = $2 and ticket >= $1";
  var options = [num, uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.subMoneyByUid = function (uid, num, callback) {
  var sql = "update bank set money = money - $1 where uid = $2 and money >= $1";
  var options = [num, uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.cleanTable = function (callback) {
  var sql = "truncate table bank";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};