var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Mail = module.exports = function User(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};
Mail.prototype.__proto__ = EventEmitter.prototype;

Mail.prototype.send = function (sender, receiver, content, operation, quantity, expire, hasread, valid, hasdelete, reply, callback) {
  var sql = "insert into mail(sender, receiver, content, operation, quantity, expire, hasread, valid, hasdelete, reply) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var options = [sender, receiver, content, operation, quantity, expire, hasread, valid, hasdelete, reply];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Mail.prototype.list = function (receiver, page, numOfPrePage, callback) {
  var begin = Math.abs(page - 1) * page;
  var sql = "select * from mail where receiver = ? and hasread = 0  order by id desc limit ?, ? ";
  var options = [receiver, begin, numOfPrePage];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mail.prototype.read = function (receiver, mailId, callback) {
  var sql = "select * from mail where receiver = ? and id = ?";
  //var sql = "update mail set hasread = 1 where id = ? AND receiver = ? and hasread = 0";
  var options = [receiver, mailId];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Mail.prototype.deleteAll = function (receiver, callback) {
  var sql = "delete from mail where receiver = ?";
  var options = [receiver];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Mail.prototype.deleteByIdList = function (receiver, mailIdList, callback) {
  var sql = "delete from mail where receiver = ? and id in (?)";
  var options = [receiver, mailIdList];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Mail.prototype.deleteById = function (receiver, mailId, callback) {
  var sql = "delete from mail where receiver = ? and id = ?";
  var options = [receiver, mailId];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

Mail.prototype.cleanTable = function (callback) {
  var sql = "truncate table mail";
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};