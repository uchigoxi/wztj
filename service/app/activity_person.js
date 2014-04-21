/**
 * Created by zy on 14-2-20.
 */


var zy = require('../../my/tools.js');
var redis = require('../redis.js');
var util = require('util');
var proxy = require('../../proxy/index.js')('postgresql');
var config = require('../config.js')


/**
 * 个人活动列表
 */
var _list = module.exports.list = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  proxy.activity_person.getActivityList(function (err, result) {
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
 * 个人活动详情
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
  proxy.activity_person.getActivityById(aid, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    }
    if (result.rowCount == 0) {
      rejson.code = 2;
      rejson.err = '活动不存在或已停止';
    }
    rejson.result = result.rows[0];
    res.json(rejson);
    return;
  });
}


/**
 * 个人活动add
 */
var _add = module.exports.add = function (req, res) {

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

  var activity = {
    status: config.CONST.STATUS.NORMAL,
    name: req.body.name,
    type: parseInt(req.body.type),
    description: 'description',
    uid: req.body.uid,
    percent: parseInt(req.body.percent),
    cost: parseInt(req.body.cost),
    max_person: parseInt(req.body.max_person),
    //total_integral: parseInt(req.body.total_integral),
    create_date: 'now()',
    win: 0,
    lost: 0,
    remark1: 'r1',
    remark2: 'r2'
  };
  activity.total_integral = activity.percent * activity.cost * activity.max_person;

  proxy.activity_person.addActivity(activity, function (err, result) {
    if (!!err) {
      rejson.code = 1;
      rejson.err = err.toString();
    } else {
      rejson.result = result.rows[0].proc_add_activity_person;
    }
    res.json(rejson);
    return;
  });
}


/**
 * 个人活动开始
 */
var _play = module.exports.play = function (req, res) {

  console.log(req.query);
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
  var uname = req.query.uname;

  //检查是否可以游戏
  _checkPlay(aid, uid, function (code, err, result) {
    if (!!err) {
      rejson.code = code;
      rejson.err = err;
      res.json(rejson);
      return;
    }

    //娱乐
    var rnd = zy.randomNum(1, 100);
    var winner = 0;
    var fen = '';
    console.log(rnd);
    if (rnd > 50) {
      winner = config.CONST.ACTIVITY_PERSON_WINNER.CREATER;
      fen = '-';
    } else {
      winner = config.CONST.ACTIVITY_PERSON_WINNER.PLAYER;
      fen = '+';
    }
    proxy.activity_person.play(aid, uid, winner, function (err, result) {
      if (!!err) {
        rejson.code = 1;
        rejson.err = err.toString();
      } else {
        rejson.result = fen + result.rows[0].proc_activity_person_play;
        _set_person_standard_redis(aid, uname + '|' + rejson.result);
      }
      res.json(rejson);
      return;
    });
  });
}


/**
 * 判断抽奖有效性和用户参与次数是否超
 * @private
 */
var _checkPlay = function (aid, uid, cb) {

  proxy.activity_person.getActivityById(aid, function (err, result) {
    if (!!err) {
      cb(1, err.toString());
      return;
    }
    if (result.rowCount == 0) {
      cb(2, '活动不存在');
      return;
    }
    var ao = result.rows[0];
    if (zy.formatDate().split(' ')[0] != zy.formatDate(ao.create_date).split(' ')[0]) {
      cb(2, '游戏时间已超时');
      return;
    }
    if (parseInt(ao.max_person) <= (parseInt(ao.win) + parseInt(ao.lost))) {
      cb(2, '游戏人数已满');
      return;
    }
    proxy.bank.find(uid, function (err, result) {
      if (!!err) {
        cb(1, err);
        return;
      }
      if (result.rowCount == 0) {
        cb(2, '用户不存在');
        return;
      }
      if (result.rows[0].integral < ao.cost) {
        cb(2, '用户积分不足');
        return;
      }
      cb(0, null, ao);
      return;
    });
  });
}


/**
 * 个人活动参与人列表
 */
var _playerList = module.exports.playerList = function (req, res) {

  var rejson = {
    code: 0,
    err: null,
    result: null
  };

  redis.getActivityPerson(function (reply) {
    if (reply) {
      if (reply[parseInt(req.query.aid)]) {
        var tmp = reply[parseInt(req.query.aid)];
        rejson.result = tmp.split(',');
        res.json(rejson);
        console.log(rejson);
      } else {
        res.json(rejson);
      }
    } else {
      res.json(rejson);
    }
  });
}


var _set_person_standard_redis = function (aid, uid) {
  redis.getActivityPerson(function (reply) {
    if (reply) {
      if (reply[aid]) {
        redis.setActivityPerson(aid, reply[aid] + uid + ',');
      } else {
        redis.setActivityPerson(aid, uid + ',');
      }
    } else {
      redis.setActivityPerson(aid, uid + ',');
    }
  });
}