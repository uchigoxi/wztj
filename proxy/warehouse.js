/**
 * Created by zy on 14-1-23.
 */


var zy = require('../my/tools');
var EventEmitter = require('events').EventEmitter;
var store = null;
var checkParam = require("../my/check.js").checkParam;
var _checkProceduresResult = require("../my/check.js").checkProceduresResult;
var Proxy = module.exports = function Proxy(dbType) {
  store = require("../store/index.js")(dbType, "warehouse");
};
Proxy.prototype.__proto__ = EventEmitter.prototype;


/**
 * insert
 */
var testWarehouse = {
  mall_id: 23,
  uid: 11,
  mall_status: 4,
  warehouse_status: 9,
  remark: '测试数据ware'
};
Proxy.prototype.addWarehouse = function (warehouse, cb) {
  warehouse = warehouse || testWarehouse;
  if (!checkParam([warehouse.mall_id, '>0number', warehouse.uid, '>0number', warehouse.mall_status, '>=0number',
    warehouse.warehouse_status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertWarehouse(warehouse, function (err, result) {
    return cb(err, result);
  });
};


/**
 * 批量导入
 * @param warehouse
 * @param cb
 * @returns {*}
 */
var testWarehouses = {
  gname: 'name',
  num: 20,
  uid: 12,
  mall_status: 4,
  warehouse_status: 8,
  remark: 'ww测试数据ware'
};
Proxy.prototype.addWarehouseBatch = function (warehouses, cb) {
  warehouses = warehouses || testWarehouses;
  if (!checkParam([warehouses.gname, '>0string', warehouses.num, '>0number', warehouses.uid, '>0number',
    warehouses.mall_status, '>=0number', warehouses.warehouse_status, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.insertWarehouseBatch(warehouses, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.psToWarehouse = function (wh, cb) {
  if (!checkParam([ wh.uid, '>=0number', wh.aid, '>=0number', wh.prize_level, '>=0number', wh.prize_status, '>=0number',
    wh.warehouse_status, '>=0number', wh.wfrom, '>=0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.psToWarehouse(wh, function (err, result) {
    return cb(err, result);
  });
}

/**
 * select
 */
Proxy.prototype.getWarehouseById = function (warehouseId, cb) {
  if (!checkParam([warehouseId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.getWarehouseById(warehouseId, function (err, result) {
    return cb(err, result);
  });
};


Proxy.prototype.getWarehouseList = function (cb) {
  return store.getWarehouseList(function (err, result) {
    return cb(err, result);
  });
};


/**
 * update
 */
Proxy.prototype.deleteWarehouseById = function (warehouseId, cb) {
  if (!checkParam([warehouseId, '>0number'])) {
    return cb(new Error("Param check wrong"));
  }
  return store.setStatusById(warehouseId, 1, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      if (result.rowCount == 1) {
        return cb(null, true);
      } else {
        return cb(new Error('rowCount not 1 !'));
      }
    }
  });
};


Proxy.prototype.cleanTable = function (cb) {
  return store.cleanTable(function (err, result) {
    return cb(err, result);
  });
};
