/**
 * Created by zy on 14-2-27.
 */


var zy = require('../../my/tools.js');
var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js');


var _upload = module.exports.upload = function (req, res) {

  var myFile = require("../../my/file.js");

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var option = {};
  option.size = req.files.Filedata.size;
  option.path = req.files.Filedata.path;
  option.name = req.files.Filedata.name;
  option.allowFiles = config.PIC.upload_allow_files;
  option.maxSize = config.PIC.upload_max_size;
  option.saveName = 'A' + new Date().getTime();
  option.type = "image";
  option.savePath = config.PIC.upload_save_path + "activity/" + zy.formatDateYM() + "/";
  option.saveUrl = config.PIC.upload_save_url + "activity/" + zy.formatDateYM() + "/";

  myFile.fileUpload(option, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = option.saveUrl + result.name;
    }
    res.json(rejson);
    return;
  });
}


/**
 * 抽奖活动名称检验
 */
var _check = module.exports.check = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_standard.getActivityByName(req.query.gname, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rowCount;
    }
    res.json(rejson);
    return;
  });
}


/**
 * 新增抽奖活动
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var activity_config = {
    pic1: req.body.pic1,
    pic2: req.body.pic2,
    perday: parseInt(req.body.perday),
    expend: parseInt(req.body.expend),
    max_sb_times: parseInt(req.body.mst),
    max_sb_level: parseInt(req.body.msl)
  };
  var activity = {
    bid: parseInt(req.body.bid),
    keyword: null,
    name: req.body.name,
    description: req.body.description,
    sdate: req.body.sdate,
    edate: req.body.edate,
    status: config.CONST.STATUS.NORMAL,
    salt: null,
    config: activity_config,
    type: parseInt(req.body.type),
    create_date: 'now()',
    remark1: 'r1',
    remark2: 'r2'
  };

  proxy.activity_standard.addActivity(activity, function (err, result) {
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
 * 抽奖活动列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_standard.getActivityListAdmin(function (err, result) {
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
 * 抽奖活动详情
 */
var _detail = module.exports.detail = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_standard.getActivityById(parseInt(req.query.aid), function (err, result) {
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
 * 停止抽奖活动
 */
var _stop = module.exports.stop = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_standard.deleteActivity(parseInt(req.query.aid), config.CONST.STATUS.INVALID, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
      res.json(rejson);
      return;
    } else {
      //rejson.result = result.rowCount;
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
  });
}


/**
 * 设置推荐抽奖活动
 */
var _setRecommend = module.exports.setRecommend = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  redis.setASRecommend(parseInt(req.query.id));
  res.json(rejson);
}

/**
 * 获取推荐抽奖活动
 */
var _getRecommend = module.exports.getRecommend = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  redis.getASRecommend(function(reply){
    rejson.result = reply;
    res.json(rejson);
  });
}