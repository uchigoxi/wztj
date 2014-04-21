/**
 * Created by zy on 14-1-18.
 */
var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "account");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


var testUser = {
  name: 'z221',
  password: 'ppp',
  salt: 'salt',
  key: 'k4',
  address: 'address',
  nickname: 'n221',
  status: 0,
  regdate: 'now()',
  age: 3,
  qq: 'qq',
  tel: 'tel',
  temp: 'temp',
  regplatform: 'regplatform',
  pic: 'pic',
  icode: 'icode'
};


/**
 * insert
 */
Proxy.prototype.addUser = function (user, cb) {
  user = user || testUser;
  if (!checkParam([user.name, '>0string', user.password, '>0string', user.status, '>=0number', user.sex, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  _checkName(user.name, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      user.salt = zy.randomString();
      user.password = zy.md5(user.password + user.salt);
      store.insertUser(user, function (err, result) {
        return cb(err, result);
      });
    }
  });
};


/**
 * select
 */
/**
 * 用户名唯一性验证
 * @param name
 * @param cb
 * @returns {*}
 * @private
 */
var _checkName = function (name, cb) {
  if (!checkParam([name, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserByName(name, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 0) {
        return cb(null, true);
      } else {
        return cb(new Error('name has exist'));
      }
    }
  });
};
Proxy.prototype.checkName = _checkName;


/**
 * 昵称唯一性验证
 * @param nickname
 * @param cb
 * @returns {*}
 * @private
 */
var _checkNickname = function (nickname, cb) {
  if (!checkParam([nickname, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserByNickname(nickname, function (err, result) {
    if (!!err) {
      return cb(err.message);
    } else {
      if (result.rowCount == 0) {
        return cb(null, true);
      } else {
        return cb(new Error('nickname has exist'));
      }
    }
  });
};
Proxy.prototype.checkNickname = _checkNickname;


/**
 * 用户登录
 * @param name
 * @param password
 * @param cb
 * @returns {*}
 */
Proxy.prototype.login = function (name, password, cb) {

  if (!checkParam([name, '>0string', password, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserByName(name, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount != 1) {
        return cb(new Error('error username !'));
      } else {
        if (result.rows[0].password == zy.md5(password + result.rows[0].salt)) {
          return cb(null, result.rows[0]);
        } else {
          return cb(new Error('error password !'));
        }
      }
    }
  });
};


Proxy.prototype.getUserById = function (userId, cb) {
  if (!checkParam([userId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserById(userId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getUserByName = function (name, cb) {
  if (!checkParam([name, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserByName(name, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getUserByKey = function (userKey, cb) {
  if (!checkParam([userKey, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserByKey(userKey, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getUserList = function (cb) {
  return store.getUserList(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.deleteUserByUserid = function (userId, cb) {
  if (!checkParam([userId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusById(userId, 1, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('user not found !'));
      }
    }
  });
};


Proxy.prototype.changePasswordById = function (userId, oldPassword, newPassword, cb) {
  if (!checkParam([userId, '>0number', oldPassword, '>0string', newPassword, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getUserById(userId, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount != 1) {
        return cb(new Error('user not found !'));
      } else {
        if (result.rows[0].password == zy.md5(oldPassword + result.rows[0].salt)) {
          store.setPasswordById(userId, zy.md5(newPassword + result.rows[0].salt), function (err, resul) {
            return cb(err, resul);
          });
        } else {
          return cb(new Error('password err !'));
        }
      }
    }
  });
};


Proxy.prototype.changeNicknameById = function (userId, newNickname, cb) {
  if (!checkParam([userId, '>0number', newNickname, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setNicknameById(userId, newNickname, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('user not found !'));
      }
    }
  });
};


Proxy.prototype.changePicById = function (userId, newPic, cb) {
  if (!checkParam([userId, '>0number', newPic, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setPicById(userId, newPic, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('user not found !'));
      }
    }
  });
};


Proxy.prototype.ivite = function (icode, integral, cb) {
  if (!checkParam([icode, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.ivite(icode, integral, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.setPicById = function (uid, pic, cb) {
  if (!checkParam([uid, '>0number',pic, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setPicById(uid, pic, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.setInfoById = function (userInfo, cb) {
  return store.setInfoById(userInfo, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};