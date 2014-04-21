/**
 * Created by zy on 14-1-22.
 */


var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "document");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


var testDocument = {
  type: 0,
  title: 'title',
  author: 'author',
  create_date: 'now()',
  content: new Object(),
  status: 0,
  remark: 'remark'
};


/**
 * insert
 */
Proxy.prototype.addDocument = function (document, cb) {
  if (!checkParam([document.hot, '>=0number', document.bid, '>=0number', document.qid, '>=0number', document.title, '>0string',
    document.author, '>0string', document.pic, '>0string', document.support, '>=0number', document.nosupport, '>=0number',
    document.status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertDocument(document, function (err, result) {
    return cb(err, result);
  });
};


/**
 * select
 */
Proxy.prototype.getDocumentById = function (documentId, cb) {
  if (!checkParam([documentId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getDocumentById(documentId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getDocumentByType = function (type, cb) {
  if (!checkParam([type, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getDocumentByType(type, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getDocumentByAuthor = function (author, cb) {
  if (!checkParam([author, '>0string'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getDocumentByAuthor(author, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getDocumentListAdmin = function (cb) {
  return store.getDocumentListAdmin(function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getDocumentListAdminHot = function (cb) {
  return store.getDocumentListAdminHot(function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getDocumentList = function (qid, cb) {
  if (!checkParam([qid, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getDocumentList(qid, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getDocumentListHot = function (cb) {
  return store.getDocumentListHot(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.deleteDocument = function (documentId, cb) {
  if (!checkParam([documentId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusById(documentId, 1, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.support = function (id, support, cb) {
  if (!checkParam([id, '>0number', support, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.support(id, support, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.lx = function (id, cb) {
  store.lx2(function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      store.lx(id, function (err, result) {
        return cb(err, result);
      });
    }
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};