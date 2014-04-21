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

var BizUser = module.exports = function User(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};


BizUser.prototype.__proto__ = EventEmitter.prototype;

BizUser.prototype.getDefaultMsg = function (callback) {
  var sql = "select defaultmsg from biz_user";
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};


BizUser.prototype.getWelcomeMsg = function (callback) {
  var sql = "select welcome from biz_user";
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};

BizUser.prototype.test_createUser = function (callback) {
  var sql = "INSERT INTO `biz_user` VALUES ('1', 'haierfuwu', '4ea5a34a196be55dbefffb59cc997612', 'q3Jga1', '13795169636', '', 'p.w@neusoft.com', '2013-08-08 10:12:24', '2013-09-10 09:18:02', 'haierfuwu', '1637779196@qq.com', '海尔客服', '{\"type\":\"0\",\"text\":\"感谢您关注海尔服务！在这儿，小海为你提供更高效的售后服务。小海每周都会开主题趴，有游戏玩，有大奖拿：）\",\"pic\":\"\",\"activity\":\"\"}', 'TDiPzS5T8s4hV', 'p9WF5n431', '0', null, '{\"type\":\"0\",\"text\":\"感谢您对海尔服务的关注，如有问题可通过“了解服务”菜单中的“常见问题”或“人工客服”为您解答。\\n回复“wt”快速开启“常见问题”；\\n回复“kf”快速开启“人工客服”。\\n\",\"pic\":\"\",\"activity\":\"\"}')"
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
}

BizUser.prototype.cleanTable = function (callback) {
  var sql = 'truncate table biz_user';
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
};