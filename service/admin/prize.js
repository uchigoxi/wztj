/**
 * Created by zy on 14-3-14.
 */

var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js');


/**
 * 添加奖品
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };
  console.log(req.body);

  var newPrize = {
    aid: parseInt(req.body.aid),
    level: parseInt(req.body.level),
    type: parseInt(req.body.type),
    name: req.body.name,
    goods_name: req.body.goods_name,
    num: parseInt(req.body.num),
    rate: parseInt(req.body.rate)
  }

  proxy.activity_standard.getActivityById(newPrize.aid, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
      res.json(rejson);
      return;
    }
    if (result.rowCount == 0) {
      rejson.code = 1;
      rejson.err = 'aid not found';
      res.json(rejson);
      return;
    }

    var prize_config = result.rows[0].config;
    if (!prize_config.prize) {
      prize_config.prize = [];
    } else {
      for (var i = 0; i < prize_config.prize.length; i++) {
        if (prize_config.prize[i].level == newPrize.level) {
          rejson.code = 1;
          rejson.err = 'prize level exist';
          res.json(rejson);
          return;
        }
      }
    }
    prize_config.prize.push(newPrize);

    //-----这里如果是实物奖品，需要proc
    if (newPrize.type == config.CONST.PRIZETYPE.ENTITY) {
      var args = {
        aid: newPrize.aid,
        gname: newPrize.goods_name,
        num: newPrize.num,
        use_for: config.CONST.USEFOR.ACTIVITY_STANDARD,
        goods_status: config.CONST.STATUS.GOODS_ALREADY_USE,
        prize_name: newPrize.name,
        prize_level: newPrize.level,
        prize_status: config.CONST.STATUS.NORMAL,
        create_date: 'now()',
        remark1: 'r1',
        remark2: 'r2'
      }
      proxy.prize_standard.addPrize(args, function (err, result) {
        if (!!err) {
          rejson.code = 1;
          rejson.err = err.toString();
          res.json(rejson);
          return;
        }
        if (result.rows[0].proc_goods_to_prize_standard_batch.length != newPrize.num) {
          rejson.code = 1;
          rejson.err = 'proc_goods_to_prize_standard_batch 插入物品数量与输入不相同';
          res.json(rejson);
          return;
        }
        proxy.activity_standard.setConfigById(newPrize.aid, prize_config, function (err, asresult) {
          if (!!err) {
            rejson.code = 1;
            rejson.err = err.toString();
          } else {
            rejson.result = result.rows[0].proc_goods_to_prize_standard_batch;
          }
          res.json(rejson);
          return;
        });
      });
    } else if (newPrize.type == config.CONST.PRIZETYPE.INTERGRAL) {
      proxy.activity_standard.setConfigById(newPrize.aid, prize_config, function (err, result) {
        if (!!err) {
          rejson.code = 1;
          rejson.err = err.toString();
        } else {
          rejson.result = result.rowCount;
        }
        res.json(rejson);
        return;
      });
    } else {
      rejson.code = 1;
      rejson.err = 'prize.type error, not in intergral or entity';
      res.json(rejson);
      return;
    }
  });
}


/**
 * 抽奖活动奖品列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.prize_standard.getList(function (err, result) {
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


var _del = module.exports.del = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };
  proxy.prize_standard.del(parseInt(req.query.aid), function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].proc_prize_standard_to_goods_batch;
    }
    res.json(rejson);
    return;
  });
}