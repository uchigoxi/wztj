/**
 * Created by zy on 14-3-3.
 */

var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js')


/**
 * 新增评论
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  if (!zy.sign(req.body)) {
    rejson.code = 8;
    rejson.err = 'sign err!';
    res.json(rejson);
    return;
  }

  var comment = {
    fid: parseInt(req.body.fid),
    comment: req.body.comment,
    create_date: 'now()',
    uid: parseInt(req.body.uid),
    uname: req.body.uname,
    audit_user: null,
    audit_date: null,
    status: config.CONST.STATUS.COMMENT_NOT_AUDIT
  };

  proxy.comment_news.addComment(comment, function (err, result) {
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
 * 用户评论列表
 */
var _listByUser = module.exports.listByUser = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.comment_news.getCommentByUid(parseInt(req.query.uid), function (err, result) {
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
 * 评论列表
 */
var _listByFid = module.exports.listByFid = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.comment_news.getCommentByFid(parseInt(req.query.fid), function (err, result) {
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
 * 删除评论
 */
var _del = module.exports.del = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  if (!zy.sign(req.query)) {
    rejson.code = 8;
    rejson.err = 'sign err!';
    res.json(rejson);
    return;
  }
  proxy.comment_news.deleteCommentSelf(parseInt(req.query.id), req.query.uid, config.CONST.STATUS.INVALID, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].id;
    }
    res.json(rejson);
    return;
  });
}

