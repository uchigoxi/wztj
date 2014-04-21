/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Comment = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Comment.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Comment.prototype.insertComment = function (comment, callback) {
  var insertObj = comment;
  var sql = "insert into comment_activity_standard (fid, comment,create_date,uid,uname,audit_user,audit_date,status) " +
    "values ($1,$2,$3,$4,$5,$6,$7,$8) " +
    "returning id";
  var options = [insertObj.fid, insertObj.comment, insertObj.create_date, insertObj.uid, insertObj.uname,
    insertObj.audit_user, insertObj.audit_date, insertObj.status];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Comment.prototype.getCommentById = function (id, callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_activity_standard where id = $1 and status = 0 order by id desc";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentByFid = function (fid, callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_activity_standard where fid = $1 and status = 0 order by id desc";
  var options = [fid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentByUid = function (uid, callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_activity_standard where uid = $1 and status = 0 order by id desc";
  var options = [uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentByStatus = function (status, callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_activity_standard where status = $1 order by id desc";
  var options = [status];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentList = function (callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_activity_standard  order by id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Comment.prototype.setAuditInfoById = function (id, auditName, status, callback) {
  var sql = "update comment_activity_standard set audit_user = $1, audit_date = now(), status = $2 where id = $3 and status = 2";
  var options = [auditName, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.setStatusById = function (id, auditName, status, callback) {
  var sql = "update comment_activity_standard set audit_user = $1, audit_date = now(), status = $2 where id = $3 ";
  var options = [auditName, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.cleanTable = function (callback) {
  var sql = "truncate table comment_activity_standard";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};