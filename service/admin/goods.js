/**
 * Created by zy on 14-3-5.
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
  option.saveName = 'G' + new Date().getTime();
  option.type = "image";
  option.savePath = config.PIC.upload_save_path + "goods/" + zy.formatDateYM() + "/";
  option.saveUrl = config.PIC.upload_save_url + "goods/" + zy.formatDateYM() + "/";

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
 * 新增库存
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  var goods = {
    name: req.body.gname,
    num: parseInt(req.body.num),
    description: req.body.description,
    sn: null,
    bid: parseInt(req.body.bid),
    pic: req.body.pic,
    category: parseInt(req.body.category),
    create_date: 'now()',
    use_date: null,
    use_for: config.CONST.USEFOR.NOUSE,
    status: config.CONST.STATUS.NORMAL,
    owner: req.body.owner,
    sdate: req.body.sdate,
    edate: req.body.edate,
    remark1: 'r1',
    remark2: 'r2'
  };
  var sn = '';
  var snarray = zy.randomUniqueArray(6, goods.num);
  for (var i = 0; i < snarray.length; i++) {
    sn += '"' + goods.category.toString() + '_' + new Date().getTime() + '_' + snarray[i] + '",';
  }
  sn = '{' + sn.substr(0, sn.length - 1) + '}';
  goods.sn = sn;

  proxy.goods.addGoods(goods, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].proc_add_goods_batch;
    }
    res.json(rejson);
    return;
  });
}


/**
 * 库存大列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.goods.getGoodsList(function (err, result) {
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
 * 库存详情
 */
var _detail = module.exports.detail = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.goods.getGoodsById(parseInt(req.query.gid), function (err, result) {
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
 * 库存商品名称检验
 */
var _check = module.exports.check = function (req, res) {

  var rejson = {
    code : 0,
    err: null,
    result: null
  };

  proxy.goods.getGoodsByName(req.query.gname, function (err, result) {
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