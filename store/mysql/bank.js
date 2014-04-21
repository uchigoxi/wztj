/**
 * Created with JetBrains WebStorm.
 * User: dog
 * Date: 13-9-27
 * Time: 下午3:25
 * To change this template use File | Settings | File Templates.
 */
var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Bank = module.exports = function User(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};


Bank.prototype.__proto__ = EventEmitter.prototype;

Bank.prototype.insert = function () {

};

Bank.prototype.delete = function () {

};

Bank.prototype.find = function (userId, callback) {
  var sql = "select * from bank where userid = ?";
  var options = [userId];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Bank.prototype.addIntegral = function (userId, num, callback) {
  var sql = "update bank set integral = integral + ? where userid = ?";
  var options = [num, userId];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Bank.prototype.addMoney = function (userId, num, callback) {
  var sql = "update bank set money = money + ? where userid = ?";
  var options = [num, userId];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Bank.prototype.addTicket = function (userId, num, callback) {
  var sql = "update bank set ticket = ticket + ? where userid = ?";
  var options = [num, userId];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.subIntegral = function (userId, num, callback) {
  var sql = "update bank set integral = integral - ? where userid = ? AND integral >= ?";
  var options = [num, userId, num];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Bank.prototype.subMoney = function (userId, num, callback) {
  var sql = "update bank set money = money - ? where userid = ? AND money >= ?";
  var options = [num, userId, num];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Bank.prototype.subTicket = function (userId, num, callback) {
  var sql = "update bank set ticket = ticket - ? where userid = ? AND ticket >= ?";
  var options = [num, userId, num];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};


Bank.prototype.cleanTable = function (callback) {
  var sql = 'truncate table bank';
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};