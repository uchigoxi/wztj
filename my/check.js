var xss = require('xss');
var url = require('url');

var toType = function (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
};

module.exports.checkParam = function (paramList) {
  var _paramList = paramList;
  var arrayLength = _paramList.length;
  var index = 0;
  for (index = 0; index < arrayLength; index++) {
    var verificationArray = _paramList[index + 1].match(/([^a-zA-Z0-9]*)([0-9]*)([a-zA-Z]*)/);
    var len = verificationArray.length;
    if (len < 0) {
      return false;
    }
    var type = verificationArray[3];
    if ((type.length >> 0) <= 0) {
      return false;
    }
    if (toType(_paramList[index]) != type) {
      return false;
    }
    var len = verificationArray[2] >> 0;
    var symbol = verificationArray[1];
    if (!symbol) {
      index++;
      continue;
    }
    if (!!_paramList[index].hasOwnProperty('length')) {
      if (eval('_paramList[index].length ' + symbol + ' ' + len)) {
        index++;
        continue;
      } else {
        return false;
      }
    } else {
      if (eval('_paramList[index] ' + symbol + ' ' + len)) {
        index++;
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
};

module.exports.checkProceduresResult = function (results, callback) {
  if (toType(results) == 'array') {
    var _temp = results.length;
    if (_temp >= 2) {
      var __temp = results[_temp - 2];
      if (toType(__temp) == 'array') {
        var ___temp = __temp[0];
        if (toType(___temp) == 'object') {
          if (___temp.hasOwnProperty('Level')) {
            return callback(new Error(___temp["Message"]));
          } else if (___temp.hasOwnProperty('status')) {
            if (___temp.status.toString() != '0') {
              return callback(new Error(___temp.msg));
            } else {
              return callback(undefined, ___temp);
            }
          } else {
            return callback(new Error("Error results format: location: (length - 2)[0] has not Message or status"));
          }
        } else {
          return callback(new Error("Error results format: location: (length - 2)[0] is not object"));
        }
      } else {
        return callback(new Error("Error results format: location: length - 2 is not array"));
      }
    } else {
      return callback(new Error("Error results format: length lt 2"));
    }
  }
};


/**
 * 设置session
 * @param req
 * @param userid
 * @param username
 * @param nickname
 * @param truename
 * @param logincode
 * @private
 */
var _setLogin = function (req, userid, username, nickname, truename, logincode) {

  var loginInfo = {
    userid: userid,
    username: username,
    nickname: nickname,
    truename: truename,
    logincode: logincode
  };
  req.session.loginInfo = loginInfo;
}
module.exports.setLogin = _setLogin;


/**
 * 登陆session检查
 * @param req
 * @param res
 * @param next
 * @private
 */
var _filterLogin = function (req, res, next) {

  //console.log('**********_filterLogin:**********' + req.originalUrl);
  var noSessionPage = zyo.no_session_page;
  if (noSessionPage.indexOf(req.originalUrl + '|') > -1) {
    next();
    return;
  }

  if (!!req.session.loginInfo) {
    if (req.session.loginInfo.logincode == zyo.session_code) {
      next();
      //console.log(req.session.loginInfo);
      return;
    }
  }
  //res.redirect('/wcm/login.html');
  //return;
  //自动登陆
  _setLogin(req, 1, 'linshi', '临时', '真临时', 'sbzy');
  next();
};
module.exports.filterLogin = _filterLogin;


/**
 * xss post数据
 * @param obj
 * @private
 */
var _filter = module.exports.filter = function (req, res, next) {
  var no_filter_page = '/xxxxx|';
  var pathname = url.parse(req.originalUrl).pathname;
  if (no_filter_page.indexOf(pathname + '|') > -1) {
    next();
    return;
  }

  for (var _tmp in req.query) {
    req.query[_tmp] = xss(req.query[_tmp]);
  }
  for (var _tmp in req.body) {
    req.body[_tmp] = xss(req.body[_tmp]);
  }
  next();
}


var _filter2 = module.exports.filter2 = function (req, res, next) {
  //判断token

  var redis = require('../service/redis.js')
  var pathname = url.parse(req.originalUrl).pathname;
  var rejson = {
    code : 0,
    err: null,
    result: null
  };
  var no_filter_page = '/app/user/login|/app/user/reg|/app/activity/standard/list|/app/activity/standard/detail|' +
    '/app/activity/standard/prize/list|' +
    '/app/activity/person/list|/app/activity/person/detail|/app/mall/list|/app/mall/detail|/app/document/list|' +
    '/app/document/listhot|/app/document/detail|/app/comment/list/fid|/app/list/category|/app/list/business|' +
    '/app/list/area|/app/list/astype|/app/list/usefor|/app/zxxx/list|/app/activity/standard/recommend/get|' +
    '/app/activity/person/player|';

  //console.log(pathname);
  //console.log(no_filter_page);

  if (no_filter_page.indexOf(pathname + '|') > -1) {
    next();
    return;
  }

  if (req.query.token) {
    redis.getUserToken(req.query.token, function (reply) {
      if (reply) {
        req.query.uid = parseInt(reply.uid);
        req.query.uname = reply.uname;
        next();
        return;
      } else {
        rejson.code = 9;
        rejson.err = 'token invalid';
        res.json(rejson);
        return;
      }
    });
  } else if (req.body.token) {
    redis.getUserToken(req.body.token, function (reply) {
      if (reply) {
        req.body.uid = parseInt(reply.uid);
        req.body.uname = reply.uname;
        next();
        return;
      } else {
        rejson.code = 9;
        rejson.err = 'token invalid';
        res.json(rejson);
        return;
      }
    });
  } else {
    rejson.code = 10;
    rejson.err = 'need token';
    res.json(rejson);
    return;
  }
}

var _filter3 = module.exports.filter3 = function (req, res, next) {
  //允许跨域
  var no_filter_page = '/xxxxx|';
  var pathname = url.parse(req.originalUrl).pathname;
  if (no_filter_page.indexOf(pathname + '|') > -1) {
    next();
    return;
  }

  res.set("Access-Control-Allow-Origin", "*");
  next();
}