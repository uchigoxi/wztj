/**
 * Created by zy on 14-1-23.
 */


var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "comment_news");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */

Proxy.prototype.addComment = function (comment, cb) {
  if (!checkParam([comment.fid, '>0number', comment.comment, '>0string', comment.uid, '>0number',
    comment.uname, '>0string', comment.status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertComment(comment, function (err, result) {
    return cb(err, result);
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
Proxy.prototype.auditComment = function (id, auditName, status, cb) {
  if (!checkParam([id, '>0number', auditName, '>0string', status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setAuditInfoById(id, auditName, status, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.deleteComment = function (id, auditName, status, cb) {
  if (!checkParam([id, '>0number', auditName, '>0string', status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setDelInfoById(id, auditName, status, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.deleteCommentSelf = function (id, uid, status, cb) {
  if (!checkParam([id, '>0number', uid, '>0number', status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusByIdSelf(id, uid, status, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};