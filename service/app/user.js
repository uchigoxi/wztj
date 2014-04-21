/**
 * Created by zy on 14-2-13.
 */


var zy = require('../../my/tools.js');
var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js')


/**
 * 用户注册
 */
var _reg = module.exports.reg = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  if (!zy.sign(req.body)) {
    rejson.code = 8;
    rejson.err = 'sign err!';
    res.json(rejson);
    return;
  }

  var user = {
    name: null,
    sex: config.CONST.SEX.WHAT,
    password: null,
    salt: null,
    key: null,
    address: null,
    nickname: null,
    status: config.CONST.STATUS.NORMAL,
    regdate: 'now()',
    age: null,
    qq: null,
    tel: null,
    temp: null,
    regplatform: null,
    pic: null,
    icode: zy.randomString(8),
    remark1: 'r1',
    remark2: 'r2'
  };
  user.name = req.body.name;
  user.sex = parseInt(req.body.sex);
  user.password = req.body.password;
  user.regplatform = req.body.regplatform;
  if (req.body.icode) {
    //-----差给邀请用户积分奖励
    proxy.user.ivite(req.body.icode, config.CHECKIN.inite, function (err, result) {
    })
  }

  proxy.user.addUser(user, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      var uid = result.rows[0].proc_add_user;
      rejson.result = uid;
    }
    res.json(rejson);
    return;
  });
};


/**
 * 用户登录
 */
var _login = module.exports.login = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  if (!zy.sign(req.body)) {
    rejson.code = 8;
    rejson.err = 'sign err!';
    res.json(rejson);
    return;
  }

  proxy.user.login(req.body.name, req.body.password, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      result.token = zy.randomString(16) + result.id.toString();
      redis.setUserToken(result.token, result.id, result.name);
      rejson.result = result;
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
 * 用户金币详情
 */
var _userBank = module.exports.userBank = function (req, res) {

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

  proxy.bank.find(parseInt(req.query.uid), function (err, result) {
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
 * 用户签到
 */
var _checkin = module.exports.checkin = function (req, res) {

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

  var uid = parseInt(req.query.uid);
  var uname = req.query.uname;
  var integral = 0;
  redis.getUserInfo(uid, function (reply) {
    if (reply) {
      if (reply.last_login_time && reply.continue_login_times) {
        var rd1 = new Date();
        var rd2 = new Date();
        rd1.setTime(parseInt(reply.last_login_time));
        rd2.setTime(parseInt(reply.last_login_time) + 1000 * 60 * 60 * 24);
        var nd = new Date();
        if (zy.formatDate(rd1).split(' ')[0] == zy.formatDate(nd).split(' ')[0]) {
          //已经签到
          rejson.result = '今日已签到过，';
          res.json(rejson);
          return;
        } else if (zy.formatDate(rd2).split(' ')[0] == zy.formatDate(nd).split(' ')[0]) {
          //连续签到
          if ((parseInt(reply.continue_login_times) + 1) >= parseInt(config.CHECKIN.max)) {
            integral = parseInt(config.CHECKIN.max) * parseInt(config.CHECKIN.one);
          } else {
            integral = (parseInt(reply.continue_login_times) + 1) * parseInt(config.CHECKIN.one);
          }
          proxy.bank.addIntegral(uid, integral, function (err, result) {
            if (!!err) {
              rejson.code = 1;
              rejson.err = err.toString();
            } else {
              redis.setLoginInfo(uid, new Date().getTime(), parseInt(reply.continue_login_times) + 1);
              rejson.result = '连续登录已第' + (parseInt(reply.continue_login_times) + 1) + '次登录，奖励' + integral + '分，以后连续登录在给奖';
            }
            res.json(rejson);
            return;
          });
        } else {
          //签到已断
          integral = config.CHECKIN.one;
          proxy.bank.addIntegral(uid, integral, function (err, result) {
            if (!!err) {
              rejson.code = 1;
              rejson.err = err.toString();
            } else {
              redis.setLoginInfo(uid, new Date().getTime(), 1);
              rejson.result = '连续登录已断，第一次登录，奖励' + integral + '分，以后连续登录在给奖';
            }
            res.json(rejson);
            return;
          });
        }
      } else {
        //新用户注册
        integral = config.CHECKIN.reg;
        proxy.bank.addIntegral(uid, integral, function (err, result) {
          if (!!err) {
            rejson.code = 1;
            rejson.err = err.toString();
          } else {
            redis.setLoginInfo(uid, new Date().getTime(), 1);
            rejson.result = '首次登录，奖励' + integral + '分，以后连续登录在给奖';
          }
          res.json(rejson);
          return;
        });
      }
    } else {
      //新用户注册
      integral = config.CHECKIN.reg;
      proxy.bank.addIntegral(uid, integral, function (err, result) {
        if (!!err) {
          rejson.code = 1;
          rejson.err = err.toString();
        } else {
          redis.setLoginInfo(uid, new Date().getTime(), 1);
          rejson.result = '首次登录，奖励' + integral + '分，以后连续登录在给奖';
        }
        res.json(rejson);
        return;
      });
    }
  });
}


//upload 头像
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
  option.saveName = 'U' + new Date().getTime();
  option.type = "image";
  option.savePath = config.PIC.upload_save_path + "user/" + zy.formatDateYM() + "/";
  option.saveUrl = config.PIC.upload_save_url + "user/" + zy.formatDateYM() + "/";

  myFile.fileUpload(option, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
      res.json(rejson);
      return;
    } else {
      rejson.result = option.saveUrl + result.name;
      proxy.user.setPicById(parseInt(req.body.uid), rejson.result, function (err, result) {
        if (!!err) {
          rejson.code = 1;
          rejson.err = err.toString();
        } else {
          proxy.bank.addIntegral(parseInt(req.body.uid), config.CHECKIN.upload, function (err, result) {
            if(!!err){
              console.log(err);
            }
          });
        }
        res.json(rejson);
        return;
      });
    }
  });
}


var _saveUserInfo = module.exports.saveUserInfo = function (req, res) {


  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  var userInfo = {
    uid: parseInt(req.body.uid),
    sex: req.body.sex,
    tel: req.body.tel,
    qq: req.body.qq,
    age: parseInt(req.body.age)
  }

  if (req.files){
    var myFile = require("../../my/file.js");
    var option = {};
    option.size = req.files.Filedata.size;
    option.path = req.files.Filedata.path;
    option.name = req.files.Filedata.name;
    option.allowFiles = config.PIC.upload_allow_files;
    option.maxSize = config.PIC.upload_max_size;
    option.saveName = 'U' + new Date().getTime();
    option.type = "image";
    option.savePath = config.PIC.upload_save_path + "user/" + zy.formatDateYM() + "/";
    option.saveUrl = config.PIC.upload_save_url + "user/" + zy.formatDateYM() + "/";
    myFile.fileUpload(option, function (err, result) {
      if (!!err) {
        rejson.code = 1;
        rejson.err = err.toString();
        res.json(rejson);
        return;
      } else {
        userInfo.pic = option.saveUrl + result.name;
        proxy.user.setInfoById(userInfo, function (err, result) {
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
    });
  }else{
    proxy.user.setInfoById(userInfo, function (err, result) {
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
}


/**
 * 用户修改密码
 */
var _changePassword = module.exports.changePassword = function (req, res) {

  console.log(req.body);

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  if (!zy.sign(req.body)) {
    rejson.code = 8;
    rejson.err = 'sign err!';
    res.json(rejson);
    return;
  }

  proxy.user.changePasswordById(parseInt(req.body.uid), req.body.oldPassword, req.body.newPassword, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0];
    }
    res.json(rejson);
    console.log(rejson);
    return;
  });
};