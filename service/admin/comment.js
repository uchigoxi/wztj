/**
 * Created by zy on 14-3-3.
 */


var zy = require('../../my/tools.js');
var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js')


/**
 * 标准评论列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.comment_news.getCommentList(function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows;
    }
    res.json(rejson);
    return;
  });
}


/**
 * 标准审核
 */
var _pass = module.exports.pass = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.comment_news.auditComment(parseInt(req.query.id), req.query.aname, config.CONST.STATUS.NORMAL, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0];
    }
    res.json(rejson);
    return;
  });
}


/**
 * 删除评论
 */
var _del = module.exports.del = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.comment_news.deleteComment(parseInt(req.query.id), req.query.aname, config.CONST.STATUS.INVALID, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0];
    }
    res.json(rejson);
    return;
  });
}