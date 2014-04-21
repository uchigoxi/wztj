/**
 * Created by zy on 14-3-12.
 */

var zy = require('./tools.js');
var redis = require('redis');
var _client = null;
var _config = null;


var Redis = module.exports = function (config) {
  _config = config;
  _client = redis.createClient(_config.REDIS.port, _config.REDIS.ip);
  _client.on('error', function (err) {
    console.log('error:' + err);
  });
  _client.on('end', function (err) {
    console.log('end:' + err);
  });
};


Redis.prototype.set = function (key, value) {
  _client.set(key, value, redis.print);
}

Redis.prototype.setex = function (key, time, value) {
  _client.setex(key, time, value, redis.print);
}

Redis.prototype.get = function (key, cb) {
  _client.get(key, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.hset = function (key, domain, value) {
  _client.hset(key, domain, value, redis.print);
}

Redis.prototype.expire = function (key, time) {
  _client.expire(key, time);
}

Redis.prototype.hsetex = function (key, time, domain, value) {
  _client.hset(key, domain, value, redis.print);
  _client.expire(key, time);
}

Redis.prototype.hsetexat = function (key, time, domain, value) {
  _client.hset(key, domain, value, redis.print);
  _client.expireat(key, time);
}

Redis.prototype.hget = function (key, domain, cb) {
  _client.hget(key, domain, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.hgetall = function (key, cb) {
  _client.hgetall(key, function (err, reply) {
    cb(reply);
  });
}

//userinfo
Redis.prototype.getUserInfo = function (uid, cb) {
  _client.hgetall(_config.REDIS.user_info_str + uid, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.setNoWinTimes = function (uid, times) {
  _client.hset(_config.REDIS.user_info_str + uid, 'no_win_times', times);
}

Redis.prototype.setLoginInfo = function (uid, lastLoginTime, continueLoginTimes) {
  _client.hset(_config.REDIS.user_info_str + uid, 'last_login_time', lastLoginTime);
  _client.hset(_config.REDIS.user_info_str + uid, 'continue_login_times', continueLoginTimes);
}

//token
Redis.prototype.getUserToken = function (token, cb) {
  _client.hgetall(_config.REDIS.token_str + token, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.setUserToken = function (token, uid, uname) {
  _client.hset(_config.REDIS.token_str + token, 'uid', uid);
  _client.hset(_config.REDIS.token_str + token, 'uname', uname);
  _client.expire(_config.REDIS.token_str + token, _config.REDIS.token_time_out);
}

//记录当天活动有哪些用户参加
Redis.prototype.getActivityStandardSession = function (cb) {
  _client.hgetall(_config.REDIS.as_session_str, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.setActivityStandardSession = function (aid, uid) {
  _client.hset(_config.REDIS.as_session_str, aid, uid);
  _client.expire(_config.REDIS.as_session_str, zy.dt().tomorrow.getTime() / 1000);
}

//记录document_support
Redis.prototype.getDocumentSupport = function (cb) {
  _client.hgetall(_config.REDIS.document_support_srt, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.setDocumentSupport = function (aid, uid) {
  _client.hset(_config.REDIS.document_support_srt, aid, uid);
}

//记录ActivityPerson
Redis.prototype.getActivityPerson = function (cb) {
  _client.hgetall(_config.REDIS.activity_person_srt, function (err, reply) {
    cb(reply);
  });
}

Redis.prototype.setActivityPerson = function (aid, uid) {
  _client.hset(_config.REDIS.activity_person_srt, aid, uid);
}

//抽奖活动推荐
Redis.prototype.setASRecommend = function (value) {
  _client.set(_config.REDIS.as_recommend_str, value);
}

Redis.prototype.getASRecommend = function (cb) {
  _client.get(_config.REDIS.as_recommend_str, function (err, reply) {
    cb(reply);
  });
}