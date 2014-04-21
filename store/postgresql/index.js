/**
 * Created by zy on 14-1-16.
 */
var config = require('../config/index.js');
config = config[config.env];
var pg = require('pg');
pg.defaults.user = config.postgresql.user;
pg.defaults.database = config.postgresql.database;
pg.defaults.password = config.postgresql.password;
pg.defaults.host = config.postgresql.host;
pg.defaults.port = config.postgresql.port;
pg.defaults.poolSize = config.postgresql.poolSize;


var Account = require('./account');
var ActivityBusiness = require('./activity_business');
var ActivityPerson = require('./activity_person');
var ActivityStandard = require('./activity_standard');
var Bank = require('./bank');
var CommentActivityBusiness = require('./comment_activity_business');
var CommentActivityPerson = require('./comment_activity_person');
var CommentActivityStandard = require('./comment_activity_standard');
var CommentNews = require('./comment_news');
var Goods = require('./goods');
var Mall = require('./mall');
var Document = require('./document');
var PrizeBusiness = require('./prize_business');
var PrizePerson = require('./prize_person');
var PrizeStandard = require('./prize_standard');
var SomeList = require('./list');
var Warehouse = require('./warehouse');
var Zxxx = require('./zxxx');


var stores = {};
stores.account = new Account(pg)
stores.activity_business = new ActivityBusiness(pg);
stores.activity_person = new ActivityPerson(pg);
stores.activity_standard = new ActivityStandard(pg);
stores.bank = new Bank(pg);
stores.comment_activity_business = new CommentActivityBusiness(pg);
stores.comment_activity_person = new CommentActivityPerson(pg);
stores.comment_activity_standard = new CommentActivityStandard(pg);
stores.comment_news = new CommentNews(pg);
stores.goods = new Goods(pg);
stores.mall = new Mall(pg);
stores.document = new Document(pg);
stores.prize_business = new PrizeBusiness(pg);
stores.prize_person = new PrizePerson(pg);
stores.prize_standard = new PrizeStandard(pg);
stores.some_list = new SomeList(pg);
stores.warehouse = new Warehouse(pg);
stores.zxxx = new Zxxx(pg);


module.exports = function (storeName) {
  if (!!stores[storeName.toLowerCase()]) {
    return stores[storeName.toLowerCase()];
  } else {
    return null;
  }
};