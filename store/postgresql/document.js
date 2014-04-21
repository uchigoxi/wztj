/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Documents = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Documents.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Documents.prototype.insertDocument = function (document, callback) {
  var insertObj = document;
  var sql = "insert into document (hot,bid,qid,title,author,pic,content,sdate,edate,support,nosupport,status,create_date,remark1,remark2) " +
    "values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) " +
    "returning id";
  var options = [insertObj.hot, insertObj.bid, insertObj.qid, insertObj.title, insertObj.author, insertObj.pic, insertObj.content, insertObj.sdate,
    insertObj.edate, insertObj.support, insertObj.nosupport, insertObj.status, insertObj.create_date, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Documents.prototype.getDocumentById = function (id, callback) {
  var sql = "SELECT document.*, business.name as bname, business_area.name as qname" +
    " FROM document " +
    " left join business on document.bid = business.id " +
    " left join business_area on document.qid = business_area.id " +
    " where document.id = $1 ";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.getDocumentByType = function (type, callback) {
  var sql = "SELECT id,type,title,author,create_date,content,status,remark " +
    "FROM document where type = $1 order by id desc";
  var options = [type];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.getDocumentByAuthor = function (author, callback) {
  var sql = "SELECT id,type,title,author,create_date,content,status,remark " +
    "FROM document where author = $1 order by id desc";
  var options = [author];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.getDocumentListAdmin = function (callback) {
  var sql = "SELECT document.*, business.name as bname, business_area.name as qname" +
    " FROM document " +
    " left join business on document.bid = business.id " +
    " left join business_area on document.qid = business_area.id " +
    " where document.hot = 0 and document.status =0 order by document.id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.getDocumentListAdminHot = function (callback) {
  var sql = "SELECT document.*, business.name as bname, business_area.name as qname" +
    " FROM document " +
    " left join business on document.bid = business.id " +
    " left join business_area on document.qid = business_area.id " +
    " where document.hot > 0 and document.status =0 order by document.hot desc, document.id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.getDocumentList = function (qid, callback) {
  var cd = '';
  if (qid > 0) {
    cd = ' and qid = ' + qid;
  }
  var sql = "SELECT document.*, business.name as bname, business_area.name as qname" +
    " FROM document " +
    " left join business on document.bid = business.id " +
    " left join business_area on document.qid = business_area.id " +
    " where document.hot = 0 and document.status = 0 " + cd +
    " order by document.id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.getDocumentListHot = function (callback) {
  var sql = "SELECT document.*, business.name as bname, business_area.name as qname" +
    " FROM document " +
    " left join business on document.bid = business.id " +
    " left join business_area on document.qid = business_area.id " +
    " where document.hot > 0 and document.status =0 order by document.hot desc, document.id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

/**
 * update
 */
Documents.prototype.setStatusById = function (id, status, callback) {
  var sql = "update document set status = $1 where id = $2 and status = 0 returning id";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.support = function (id, support, callback) {
  if (support == 0) {
    var sql = "update document set support = support + 1 where id = $1 returning id";
  } else {
    var sql = "update document set nosupport = nosupport + 1 where id = $1 returning id";
  }
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.lx = function (id, callback) {
  var sql = "update document set hot = case " +
    " when id = $1 then 6 " +
    " when id = $2 then 5 " +
    " when id = $3 then 4 " +
    " when id = $4 then 3 " +
    " when id = $5 then 2 " +
    " end " +
    " where id in ($1,$2,$3,$4,$5)";
  var options = [id[0], id[1], id[2], id[3], id[4]];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.lx2 = function (callback) {
  var sql = "update document set hot = 1 where hot > 0 ";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Documents.prototype.cleanTable = function (callback) {
  var sql = "truncate table document";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};