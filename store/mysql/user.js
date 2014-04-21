var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var User = module.exports = function User(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};

User.prototype.__proto__ = EventEmitter.prototype;


User.prototype.createUser = function (username, userkey, salt, password, platform, integral, money, ticket, callback) {
  var sql = "call createUser(?, ?, ?, ?, ?, ?, ?, ?)"
  var options = [username, userkey, salt, password, platform, integral, money, ticket];
  _query(null, sql, options, function (err, result) {
    return callback(err, result);
  });
};


User.prototype.getUserByUserkey = function (userKey, callback) {
  var sql = "SELECT * from user where userkey = ?";
  var obj = [userKey];
  _query(undefined, sql, obj, function (err, result) {
    return callback(err, result);
  });
};

User.prototype.getUserById = function (userId, cb) {
  var sql = "select * from user where id = ?";
  var options = [userId];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


User.prototype.getUserList = function (cb) {
  var sql = "select * from user";
  var options = [];
  _query(undefined, sql, options, function (err, results) {
    return cb(err, results);
  });
};


User.prototype.deleteUserByUserid = function (userIdentifier, cb) {
  var sql = "delete from user where id = ?";
  var options = [userIdentifier]
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

User.prototype.deleteUserByUserkey = function (userIdentifier, cb) {
  var sql = "delete from user where userkey = ?";
  var options = [userIdentifier]
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

User.prototype.changePasswordById = function (userIdentifier, newPassword, cb) {
  var sql = "update user set password = ? where id = ? ";
  var options = [newPassword, userIdentifier];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


User.prototype.changePasswordByUserkey = function (userIdentifier, newPassword, cb) {
  var sql = "update user set password = ? where userkey = ? ";
  var options = [newPassword, userIdentifier];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

User.prototype.changeNicknameById = function (userIdentifier, newNickname, cb) {
  var sql = "update user set nickname = ? where id = ? ";
  var options = [newNickname, userIdentifier];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};


User.prototype.changeNicknameByUserkey = function (userIdentifier, newNickname, cb) {
  var sql = "update user set nickname = ? where userkey = ? ";
  var options = [newNickname, userIdentifier];
  _query(undefined, sql, options, function (err, result) {
    return cb(err, result);
  });
};

User.prototype.cleanTable = function (cb) {
  var sql = "truncate table user";
  _query(undefined, sql, [], function (err, result) {
    return cb(err, result);
  });
};



