/**
 * Created by zy on 14-3-31.
 */

var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js');

/**
 * category列表
 */
var _categoryList = module.exports.categoryList = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.some_list.categoryList(function (err, result) {
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
 * businessList列表
 */
var _businessList = module.exports.businessList = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.some_list.businessList(function (err, result) {
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
 * businessAreaList列表
 */
var _businessAreaList = module.exports.businessAreaList = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.some_list.businessAreaList(function (err, result) {
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
 * asTypeList列表
 */
var _asTypeList = module.exports.asTypeList = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.some_list.asTypeList(function (err, result) {
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
 * useForList列表
 */
var _useForList = module.exports.useForList = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.some_list.useForList(function (err, result) {
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