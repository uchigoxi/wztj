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
  var sql = "insert into comment_news (fid, comment,create_date,uid,uname,audit_user,audit_date,status) " +
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
    "FROM comment_news where id = $1 and status = 0 order by id desc";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentByFid = function (fid, callback) {
  var sql = "SELECT comment_news.*, account.name, account.sex, account.pic " +
    " FROM comment_news left join account on comment_news.uid = account.id " +
    " where comment_news.fid = $1 and comment_news.status = 0 order by id desc";
  var options = [fid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentByUid = function (uid, callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_news where uid = $1 and status = 0 order by id desc";
  var options = [uid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentByStatus = function (status, callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_news where status = $1 order by id desc";
  var options = [status];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.getCommentList = function (callback) {
  var sql = "SELECT id,fid,comment,create_date,uid,uname,audit_user,audit_date,status " +
    "FROM comment_news  order by id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * update
 */
Comment.prototype.setAuditInfoById = function (id, auditName, status, callback) {
  var sql = "update comment_news set audit_user = $1, audit_date = now(), status = $2 where id = $3 and status = 2 returning id";
  var options = [auditName, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.setDelInfoById = function (id, auditName, status, callback) {
  var sql = "update comment_news set audit_user = $1, audit_date = now(), status = $2 where id = $3 returning id";
  var options = [auditName, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.setStatusById = function (id, auditName, status, callback) {
  var sql = "update comment_news set audit_user = $1, audit_date = now(), status = $2 where id = $3 returning id";
  var options = [auditName, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.setStatusByIdSelf = function (id, uid, status, callback) {
  var sql = "update comment_news set status = $2 where id = $3 and uid = $1 returning id";
  var options = [uid, status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Comment.prototype.cleanTable = function (callback) {
  var sql = "truncate table comment_news";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};