/**
 * Created by zy on 14-4-2.
 */

var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js');


/**
 * 添加最新消息
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var zxxx = {
    status: config.CONST.STATUS.NORMAL,
    title: req.body.title,
    type: parseInt(req.body.type),
    fid: req.body.fid,
    create_date: 'now()',
    remark1: 'r1',
    remark2: 'r2'
  }
  proxy.zxxx.add(zxxx, function (err, result) {
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


/**
 * 最新消息列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.zxxx.getListAdmin(function (err, result) {
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
 * 最新消息del
 */
var _del = module.exports.del = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.zxxx.setStatusByUid(parseInt(req.query.id), 1, function (err, result) {
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