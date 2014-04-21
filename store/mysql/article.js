var EventEmitter = require('events').EventEmitter;

var _pool = null;
var _query = null;

var Article = module.exports = function User(pool) {
  _pool = pool;
  _query = require("../../my/mysql.js").query(_pool);
};
Article.prototype.__proto__ = EventEmitter.prototype;

Article.prototype.getArticleById = function (articleId, callback) {
  var sql = "select  biz_article.aid, wuid, flag, biz_article.type, biz_article.jsondata  from biz_article where aid = ?"
  var obj = [articleId];
  _query(undefined, sql, obj, function (err, results) {
    return callback(err, results);
  });
};


Article.prototype.test_createArticle = function (callback) {
  var sql = "INSERT INTO `biz_article` VALUES ('1', '3', 's', '{\"title\":\"彩电产品安装收费标准\",\"summary\":\"服务人员上门服务涉及收费需主动向您出示收费标准，请您监督\",\"coverurl\":\"/resource/upload/activityPic/9tOL3TDUm/1377850619251.jpg\",\"source_url\":\"\",\"maincontent\":\"<ul><li><p>安装</p></li></ul><p><img src=\\\"/resource/upload/articlePic/9tOL3TDUm/1377944015291.JPG\\\" title=\\\"CDA彩电产品安装收费标准.JPG\\\"></p><ul><li><p>移机</p></li></ul><p><img src=\\\"/resource/upload/articlePic/9tOL3TDUm/1377944030603.JPG\\\" title=\\\"CDA彩电产品安装收费标准2.JPG\\\"></p><p><br></p>\"}', '2013-09-03 09:41:03', '0')";
  var options = [];
  _query(undefined, sql, options, function (err, result) {
    return callback(err, result);
  });
}

Article.prototype.cleanTable = function (callback) {
  var sql = "truncate table biz_article";
  var options = [];
  _query(undefined, sql, options, function (err, results) {
    return callback(err, results);
  });
};