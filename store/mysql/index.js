var mysql = require('mysql');
var config = require('../config/index.js');
config = config[config.env];
var pool = mysql.createPool({
  connectionLimit: 300,
  queueLimit: 300,
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.db
});

var searchPool = mysql.createPool({
  connectionLimit: 300,
  queueLimit: 300,
  host: config.searchServer.host,
  port: config.searchServer.port
});
var Auction = require('./auction');
var Goods = require('./goods');
var Bank = require('./bank');
var Mail = require('./mail')
var Warehouse = require('./warehouse');
var Activity = require('./activity');
var Article = require('./article');
var User = require('./user');
var Bizuser = require('./bizuser');
var Sn = require('./sn');
var Coreseek = require('./coreseek');


var stores = {};

stores.activity = new Activity(pool);
stores.article = new Article(pool);
stores.user = new User(pool);
stores.bizuser = new Bizuser(pool);
stores.sn = new Sn(pool);
stores.coreseek = new Coreseek(searchPool);
stores.auction = new Auction(pool);
stores.goods = new Goods(pool);
stores.warehouse = new Warehouse(pool);
stores.bank = new Bank(pool);
stores.mail = new Mail(pool);


module.exports = function (storeName) {
  if (!!stores[storeName.toLowerCase()]) {
    return stores[storeName.toLowerCase()];
  } else {
    return null;
  }
};