/**
 * Created by zy on 14-1-16.
 */
var EventEmitter = require('events').EventEmitter;
var _pg = null;
var _query = null;
var Mall = module.exports = function (pg) {
  _pg = pg;
  _query = require("../../my/postgresql.js").query(_pg);
};
Mall.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
Mall.prototype.insertMall = function (mall, callback) {
  var insertObj = mall;
  var sql = "select proc_goods_to_mall_batch($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";
  var options = [insertObj.gname, insertObj.description, insertObj.num, insertObj.use_for, insertObj.goods_status, insertObj.mall_name, insertObj.mall_price,
    insertObj.mall_price_unit, insertObj.mall_status, insertObj.create_date, insertObj.pic, insertObj.remark1, insertObj.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.insertMallBatch = function (mall, callback) {
  var insertObj = mall;
  var sql = "select proc_goods_to_mall_batch($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
  var options = [insertObj.gname, insertObj.num, insertObj.use_for, insertObj.goods_status, insertObj.price,
    insertObj.price_unit, insertObj.sell_user, insertObj.sell_date, insertObj.mall_status, insertObj.remark];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


/**
 * select
 */
Mall.prototype.getMallById = function (id, callback) {
  var sql = "SELECT id,gid,gname,description,sn,bid,pic,category,createdate,price,price_unit,sell_user,sell_date,status,remark " +
    "FROM mall where id = $1 order by id desc";
  var options = [id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.getMallByName = function (name, callback) {
  var sql = " select mall.name, mall.description, mall.status, mall.create_date , mall.pic , mall.price, " +
    " goods_pool.sdate,goods_pool.edate, " +
    " business.name as bname,business.telephone as btel,business.description as bdescription,count(mall.id) as num " +
    " from mall " +
    " left join goods_pool on mall.gid = goods_pool.id " +
    " left join business on goods_pool.bid = business.id " +
    " where mall.name = $1 " +
    " group by mall.name, mall.description, mall.status, mall.create_date , mall.pic , mall.price, " +
    " goods_pool.sdate,goods_pool.edate,business.name ,business.telephone,business.description " +
    " order by mall.status";
  var options = [name];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.getMallByCategory = function (category, callback) {
  var sql = "SELECT id,gid,gname,description,sn,bid,pic,category,createdate,price,price_unit,sell_user,sell_date,status,remark " +
    "FROM mall where category = $1 order by id desc";
  var options = [category];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.getMallByBid = function (bid, callback) {
  var sql = "SELECT id,gid,gname,description,sn,bid,pic,category,createdate,price,price_unit,sell_user,sell_date,status,remark " +
    "FROM mall where bid = $1 order by id desc";
  var options = [bid];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.getMallListAdmin = function (callback) {
  var sql = "select mall.id as mid, mall.name as mname, mall.status as mstatus, mall.create_date as mcreate_date, " +
    "mall.pic as mpic, mall.price,mall.price_unit,mall.uid,mall.sell_date,mall.description as mdescription, " +
    "goods_pool.* from mall left join goods_pool on mall.gid = goods_pool.id order by mall.id desc";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.getMallList = function (args, callback) {
  var order = '';
  var condition = '';
  if (args.order) {
    order = 'DESC';
  }
  if (args.category) {
    condition = ' and category = ' + args.category;
  }

  var sql = " select mall.name, mall.pic, mall.price, goods_pool.category ,count(mall.id) as num " +
    " from mall left join goods_pool on mall.gid = goods_pool.id " +
    " where mall.status = 0 " + condition +
    " group by mall.name, mall.pic, mall.price, goods_pool.category " +
    " order by mall.price " + order;
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};

/**
 * update
 */
Mall.prototype.sell = function (args, callback) {
  var sql = "select proc_mall_to_warehouse_batch($1,$2,$3,$4,$5,$6,$7,$8,$9) ";
  var options = [args.uid,args.mall_name,args.num,args.mall_status,args.warehouse_status,args.wfrom,args.create_date,args.remark1,args.remark2];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.cancel = function (name, callback) {
  var sql = "select proc_mall_to_goods_batch($1)";
  var options = [name];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.setMallStatusById = function (id, status, callback) {
  var sql = "update mall set status = $1 where id = $2";
  var options = [status, id];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};


Mall.prototype.cleanTable = function (callback) {
  var sql = "truncate table mall";
  var options = [];
  _query(sql, options, function (err, result) {
    return callback(err, result);
  });
};