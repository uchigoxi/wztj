/**
 * Created by zy on 14-2-20.
 */


var zy = require('../../my/tools.js');
var redis = require('../redis.js');
//var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js')


/**
 * 标准活动列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_standard.getActivityList(function (err, result) {
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
 * 标准活动详情
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

  var aid = parseInt(req.query.aid);
  proxy.activity_standard.getActivityById(aid, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
      res.json(rejson);
      return;
    }
    if (result.rowCount != 1) {
      rejson.code = 2;
      rejson.err = '活动不存在';
      res.json(rejson);
      return;
    }
    if (result.rows[0].status != 0 || result.rows[0].sdate > new Date() || result.rows[0].edate < new Date()) {
      rejson.code = 2;
      rejson.err = '活动已经停止或未开始';
      res.json(rejson);
      return;
    }
    rejson.result = result.rows[0];
    res.json(rejson);
    return;
  });
}


/**
 * 开始抽奖
 */
var _play = module.exports.play = function (req, res) {

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
  var aid = parseInt(req.query.aid);

  _checkPlay(aid, uid, function (code, err, result) {
    if (!!err) {
      rejson.code = code;
      rejson.err = err;
      res.json(rejson);
      return;
    }
    if (!result.config.prize) {
      proxy.bank.addIntegral(uid, config.ACTIVITY.STANDARD.base_prize, function (err, result) {
        rejson.code = 1;
        rejson.err = '活动没有设置奖品 找彬哥';
        res.json(rejson);
        return;
      });
    }

    _set_activity_standard_session(aid, uid);
    _play(uid, result, function (err, result) {
      if (!!err) {
        rejson.code = 1;
        rejson.err = err;
      } else {
        rejson.result = result;
      }
      if (rejson.result) {
        res.json(rejson);
        return;
      } else {
        //参与奖
        rejson.code = 0;
        var base_prize = config.ACTIVITY.STANDARD.base_prize;
        base_prize.aid = aid;
        proxy.bank.addIntegral(uid, base_prize.num, function (err, result) {
          if (!!err) {
            rejson.code = 1;
            rejson.err = err;
          } else {
            rejson.result = base_prize;
          }
          res.json(rejson);
          console.log(rejson);
          return;
        });
      }
    });
  });
}

var _play = function (uid, ao, cb) {
  _get_no_win_times(uid, function (num) {
    redis.setNoWinTimes(uid, parseInt(num) + 1);
    var prize = null;
    //计算是否必中奖
    if ((parseInt(num) + 1) < ao.config.max_sb_times) {
      //计算奖品
      var rnd = zy.randomNum(1, 100);
      console.log('rnd===' + rnd);
      for (var i = 0; i < ao.config.prize.length; i++) {
        if (rnd < ao.config.prize[i].rate) {
          prize = ao.config.prize[i];
          break;
        }
      }
      if (prize) {
        //中奖
        _set_prize(uid, prize, ao, function (err, result) {
          cb(err, result);
        });
      } else {
        //没中奖
        cb(null, prize);
      }
    } else {
      //必中奖
      console.log('太久没中奖' + num);
      for (var i = 0; i < ao.config.prize.length; i++) {
        if (ao.config.max_sb_level == ao.config.prize[i].level) {
          prize = ao.config.prize[i];
          break;
        }
      }
      //-----这里给用户中奖,未完成
      _set_prize(uid, prize, ao, function (err, result) {
        cb(err, result);
      });
    }
  });
}

var _get_no_win_times = function (uid, cb) {
  redis.getUserInfo(uid, function (reply) {
    if (reply) {
      if (reply.no_win_times) {
        cb(reply.no_win_times);
      } else {
        cb(0);
      }
    } else {
      cb(0);
    }
  });
}


var _set_prize = function (uid, prize, ao, cb) {
  if (prize.type == config.CONST.PRIZETYPE.INTERGRAL) {
    proxy.bank.addIntegral(uid, prize.num, function (err, result) {
      if (!!err) {
        cb(err.toString());
        return;
      }
      if (result.rowCount != 1) {
        cb('uid err, at update bank');
        return;
      }
      redis.setNoWinTimes(uid, 0);
      cb(null, prize);
      return;
    });
  } else if (prize.type == config.CONST.PRIZETYPE.ENTITY) {
    var wh = {
      uid: uid,
      aid: ao.id,
      prize_level: prize.level,
      prize_status: config.CONST.STATUS.PRIZE_ALREADY_GOT,
      warehouse_status: config.CONST.STATUS.NORMAL,
      wfrom: config.CONST.USEFOR.ACTIVITY_STANDARD,
      create_date: 'now()',
      remark1: 'r1',
      remark2: 'r2'
    }
    proxy.warehouse.psToWarehouse(wh, function (err, result) {
      if (!!err) {
        cb(err.toString());
        return;
      }
      redis.setNoWinTimes(uid, 0);
      cb(null, prize);
      return;
    });
  } else {
    cb('prizy.type err, at set prize', null);
    return;
  }
};


/**
 * 判断抽奖有效性和用户参与次数是否超
 */
var _checkPlay = function (aid, uid, cb) {
  proxy.activity_standard.getActivityById(aid, function (err, result) {
    if (!!err) {
      cb(1, err);
      return;
    }
    if (result.rowCount == 0) {
      cb(2, '活动不存在');
      return;
    }
    if (result.rows[0].status != 0 || result.rows[0].sdate > new Date() || result.rows[0].edate < new Date()) {
      cb(2, '活动已经停止或未开始');
      return;
    }
    _get_activity_standard_session(aid, uid, function (num) {
      console.log(result.rows[0].config.perday + 'num:' + num);
      if (result.rows[0].config.perday <= num) {
        cb(2, '这个游戏每天允许玩' + result.rows[0].config.perday + '次，您今天已经玩了' + num + '次');
        return;
      }
      cb(0, null, result.rows[0]);
      return;
    });
  });
}


/**
 * 记录当天参与抽奖的用户id
 */
var _set_activity_standard_session = function (aid, uid) {
  redis.getActivityStandardSession(function (reply) {
    if (reply) {
      if (reply[aid]) {
        redis.setActivityStandardSession(aid, reply[aid] + ',' +uid + ',');
      } else {
        redis.setActivityStandardSession(aid, ',' + uid + ',');
      }
    } else {
      redis.setActivityStandardSession(aid, ',' + uid + ',');
    }
  });
}


/**
 * 读取当天参与抽奖的用户id
 */
var _get_activity_standard_session = function (aid, uid, cb) {
  redis.getActivityStandardSession(function (reply) {
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


/**
 * 标准活动中奖列表
 */
var _prizeList = module.exports.prizeList = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_standard.getActivityPrizeList(parseInt(req.query.aid), function (err, result) {
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