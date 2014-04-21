/**
 * Created by zy on 14-3-21.
 */

var zy = require('../../my/tools.js');
//var redis = require('../redis.js');
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
  option.saveName = 'M' + new Date().getTime();
  option.type = "image";
  option.savePath = config.PIC.upload_save_path + "mall/" + zy.formatDateYM() + "/";
  option.saveUrl = config.PIC.upload_save_url + "mall/" + zy.formatDateYM() + "/";

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
 * 添加商城商品
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  console.log(req.body);

  var mall = {
    gname: req.body.gname,
    description : req.body.description,
    num: parseInt(req.body.num),
    use_for: config.CONST.USEFOR.MALL,
    goods_status: config.CONST.STATUS.GOODS_ALREADY_USE,
    mall_name: req.body.name,
    mall_price: parseInt(req.body.price),
    mall_price_unit: 0,
    mall_status: config.CONST.STATUS.NORMAL,
    create_date: 'now()',
    pic: req.body.pic,
    remark1: 'r1',
    remark2: 'r2'
  }
  proxy.mall.addMall(mall, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else if (result.rows[0].proc_goods_to_mall_batch.length != mall.num) {
      rejson.code = 1;
      rejson.err = 'proc_goods_to_mall_batch 插入物品数量与输入不相同';
      res.json(rejson);
      return;
    } else {
      rejson.result = result.rows[0].proc_goods_to_mall_batch;
    }
    res.json(rejson);
    console.log(rejson);
    return;
  });
}


/**
 * 商品名称检验
 */
var _check = module.exports.check = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.mall.getMallByName(req.query.mname, function (err, result) {
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
 * mall列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.mall.getMallListAdmin(function (err, result) {
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
 * mall列表
 */
var _cancel = module.exports.cancel = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.mall.cancel(req.query.name, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].proc_mall_to_goods_batch;
    }
    res.json(rejson);
    return;
  });
}