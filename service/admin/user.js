/**
 * Created by zy on 14-3-3.
 */


var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');


/**
 * 用户列表
 */
var _userList = module.exports.userList = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };


  proxy.user.getUserList( function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows;
    }
    res.json(rejson);
    return;
  });
};


/**
 * 用户详情
 */
var _userDetail = module.exports.userDetail = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };


  proxy.user.getUserById(parseInt(req.query.uid), function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0];
    }
    res.json(rejson);
    return;
  });
};


/**
 * 停用用户
 */
var _userDel = module.exports.userDel = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.user.deleteUserByUserid(parseInt(req.query.uid), function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result;
    }
    res.json(rejson);
    return;
  });
};
