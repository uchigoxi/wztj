/**
 * Created by zy on 14-3-26.
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
  option.saveName = 'D' + new Date().getTime();
  option.type = "image";
  option.savePath = config.PIC.upload_save_path + "document/" + zy.formatDateYM() + "/";
  option.saveUrl = config.PIC.upload_save_url + "document/" + zy.formatDateYM() + "/";

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
 * 新增图文
 */
var _add = module.exports.add = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var content = [];
  for (var i = 1; i < 11; i++) {
    if (!(req.body['pic' + i])) {
      break;
    }
    var tmp = {};
    tmp.pic = req.body['pic' + i];
    tmp.text = req.body['text' + i];
    content.push(tmp);
  }

  tmp = {'content': content};
  var article = {
    hot: parseInt(req.body.hot),
    bid: parseInt(req.body.bid),
    qid: parseInt(req.body.qid),
    title: req.body.title,
    author: req.body.author,
    pic: req.body.pic,
    content: tmp,
    sdate: req.body.sdate,
    edate: req.body.edate,
    support: 0,
    nosupport: 0,
    status: config.CONST.STATUS.NORMAL,
    create_date: 'now()',
    remark1: 'r1',
    remark2: 'r2'
  };

  proxy.document.addDocument(article, function (err, result) {
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
 * 图文列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.document.getDocumentListAdmin(function (err, result) {
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
var _listHot = module.exports.listHot = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.document.getDocumentListAdminHot(function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows;
    }
    res.json(rejson);
    console.log(rejson);
    return;
  });
}


/**
 * 图文详情
 */
var _detail = module.exports.detail = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.document.getDocumentById(parseInt(req.query.id), function (err, result) {
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
 * 图文del
 */
var _del = module.exports.del = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.document.deleteDocument(parseInt(req.query.id), function (err, result) {
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
 * 图文轮显
 */
var _lx = module.exports.lx = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.document.lx(req.query.id.split(','), function (err, result) {
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