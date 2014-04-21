/**
 * Created by zy on 14-3-21.
 */

var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js');


/**
 * mall列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var args = {
    order: req.query.order,
    category: req.query.category
  };

  proxy.mall.getMallList(args, function (err, result) {
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
 * mall详情
 */
var _detail = module.exports.detail = function (req, res) {

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

  proxy.mall.getMallByName(req.query.name, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      if (result.rowCount == 0) {

      } else if (result.rowCount == 1) {
        rejson.result = result.rows[0];
        if (result.rows[0].status == 0) {
          rejson.result.exchanged = 0;
          rejson.result.remainder = result.rows[0].num;
        } else {
          rejson.result.exchanged = result.rows[0].num;
          rejson.result.remainder = 0;
        }
      } else if (result.rowCount == 2) {
        rejson.result = result.rows[0];
        if (result.rows[0].status == 0) {
          rejson.result.exchanged = result.rows[1].num;
          rejson.result.remainder = result.rows[0].num;
        } else {
          rejson.result.exchanged = result.rows[0].num;
          rejson.result.remainder = result.rows[1].num;
        }
      } else {

      }
    }
    res.json(rejson);
    return;
  });
}


/**
 * 积分兑换
 */
var _buy = module.exports.buy = function (req, res) {

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

  var args = {
    uid: parseInt(req.query.uid),
    mall_name: req.query.mall_name,
    num: parseInt(req.query.num),
    mall_status: config.CONST.STATUS.MALL_ALREADY_SELL,
    warehouse_status: config.CONST.STATUS.NORMAL,
    wfrom: config.CONST.USEFOR.MALL,
    create_date: 'now()',
    remark1: 'r1',
    remark2: 'r2'
  };

  proxy.mall.sell(args, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].proc_mall_to_warehouse_batch;
    }
    res.json(rejson);
    return;
  });
}

