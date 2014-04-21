/**
 * Created by zy on 14-1-23.
 */


var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "comment_activity_person");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
var testComment = {
  fid: 1,
  comment: 'comment',
  create_date: 'now()',
  uid: 2,
  uname: 'uname',
  audit_user: null,
  audit_date: null,
  status: 2
};
Proxy.prototype.addComment = function (comment, cb) {
  comment = comment || testComment;
  if (!checkParam([comment.fid, '>0number', comment.comment, '>0string', comment.uid, '>0number',
    comment.uname, '>0string', comment.status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertComment(comment, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, result);
      } else {
        return cb(new Error('result.rowCount <> 1 !'));
      }
    }
  });
};


/**
 * select
 */
Proxy.prototype.getCommentById = function (commentId, cb) {
  if (!checkParam([commentId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getCommentById(commentId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getCommentByFid = function (fid, cb) {
  if (!checkParam([fid, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getCommentByFid(fid, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getCommentByUid = function (uid, cb) {
  if (!checkParam([uid, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getCommentByUid(uid, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getCommentByStatus = function (status, cb) {
  if (!checkParam([status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getCommentByStatus(status, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getCommentList = function (cb) {
  return store.getCommentList(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.auditComment = function (id, auditName, cb) {
  if (!checkParam([id, '>0number', auditName, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setAuditInfoById(id, auditName, 0, function (err, result) {
/*    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('rowCount not 1'));
      }
    }*/
    cb(err, result);
  });
};


Proxy.prototype.deleteComment = function (id, auditName, cb) {
  if (!checkParam([id, '>0number', auditName, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusById(id, auditName, 1, function (err, result) {
/*    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('rowCount not 1 !'));
      }
    }*/
    cb(err, result);
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};