var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Activity = module.exports = function (pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};


Activity.prototype.__proto__ = EventEmitter.prototype;


Activity.prototype.test_insertActivity = function (callback) {
  var sql = "insert into biz_activity set ?";
  var options = {baid: 1, wuid: 2, aid: 3, keyword: '测试', activity_name: '名字', start_date: new Date(), end_date: new Date(), update_time: new Date(), status: 0, is_stop: 0, config: 'config', salt: 'salt'};
  _query(undefined, sql, options, function (err, results) {
    return callback(err, results);
  });

};

Activity.prototype.getActivityByKeyword = function (keyword, callback) {
  var sql = "SELECT activity_name, wuid, baid, aid, start_date, end_date, update_time, status, is_stop,  salt, config as data FROM biz_activity where  keyword = ? AND status = 0";
  var options = [keyword];
  _query(undefined, sql, options, function (err, results) {
    return callback(err, results);
  });
};


Activity.prototype.getActivityByBaid = function (baid, callback) {
  var sql = "SELECT  activity_name, wuid, baid, aid, start_date, end_date, update_time, status, is_stop, baid as id, salt, config as data FROM biz_activity WHERE baid = ?";
  var options = [baid];
  _query(undefined, sql, options, function (err, results) {
    return callback(err, results);
  });
};

Activity.prototype.cleanTable = function (callback) {
  var sql = "truncate table biz_activity";
  var options = [];
  _query(undefined, sql, options, function (err, results) {
    return callback(err, results);
  });
};