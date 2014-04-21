/**
 * Created by zy on 14-3-27.
 */


var zy = require('../../my/tools.js');
var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js');


/**
 * 图文列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };
  proxy.document.getDocumentList(parseInt(req.query.qid), function (err, result) {
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
  proxy.document.getDocumentListHot(function (err, result) {
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
    //console.log(rejson);
    return;
  });
}


/**
 * support
 */
var _support = module.exports.support = function (req, res) {

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

  _get_document_support(parseInt(req.query.fid), parseInt(req.query.uid), function (num) {
    if (num == 0) {
      proxy.document.support(parseInt(req.query.fid), parseInt(req.query.support), function (err, result) {
        if (!!err) {
          rejson.code = 1;
          rejson.err = err.toString();
        } else {
          _set_document_support(req.query.fid, parseInt(req.query.uid));
          rejson.result = result.rows[0].id;
        }
        res.json(rejson);
        return;
      });
    } else {
      rejson.code = 2;
      rejson.err = '您已经评论过了';
      res.json(rejson);
      return;
    }
  });
}


/**
 * 记录DocumentSupport
 */
var _set_document_support = function (aid, uid) {
  redis.getDocumentSupport(function (reply) {
    if (reply) {
      if (reply[aid]) {
        redis.setDocumentSupport(aid, reply[aid] + ',' + uid + ',');
      } else {
        redis.setDocumentSupport(aid, ',' + uid + ',');
      }
    } else {
      redis.setDocumentSupport(aid, ',' + uid + ',');
    }
  });
}


/**
 * 读取DocumentSupport
 */
var _get_document_support = function (aid, uid, cb) {
  redis.getDocumentSupport(function (reply) {
    if (reply) {
      if (reply[aid]) {
        var tmp = ',' + uid + ',';
        return cb(reply[aid].split(tmp).length - 1);
      } else {
        return cb(0);
      }
    } else {
      return cb(0);
    }
  });
}