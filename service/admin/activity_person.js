/**
 * Created by zy on 14-3-18.
 */
var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js')


/**
 * 个人活动列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.activity_person.getActivityListAdmin(function (err, result) {
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
 * 个人活动详情
 */
var _detail = module.exports.detail = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var aid = parseInt(req.query.aid);
  proxy.activity_person.getActivityById(aid, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    }
    if (result.rowCount == 0) {
      rejson.code = 1;
      rejson.err = 'aid err';
    }
    rejson.result = result.rows[0];
    res.json(rejson);
    return;
  });
}


/**
 * 个人活动结算
 */
var _cancel = module.exports.cancel = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.activity_person.cancel(function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].proc_activity_person_cancel;
    }
    res.json(rejson);
    return;
  });
}