/**
 * Created by zy on 14-1-22.
 */
var ActivityBusiness = require('./activity_business');
var ActivityPerson = require('./activity_person');
var ActivityStandard = require('./activity_standard');
var Bank = require('./bank');
var CommentActivityBusiness = require('./comment_activity_business');
var CommentActivityPerson = require('./comment_activity_person');
var CommentActivityStandard = require('./comment_activity_standard');
var CommentNews = require('./comment_news');
var Document = require('./document');
var Goods = require('./goods');
var Mall = require('./mall');
var PrizeStandard = require('./prize_standard');
var SomeList = require('./list');
var User = require('./user');
var Warehouse = require('./warehouse');
var Zxxx = require('./zxxx');


module.exports = function (dbType) {
  var stores = {};
  stores.activity_business = new ActivityBusiness(dbType);
  stores.activity_person = new ActivityPerson(dbType);
  stores.activity_standard = new ActivityStandard(dbType);
  stores.bank = new Bank(dbType);
  stores.comment_activity_business = new CommentActivityBusiness(dbType);
  stores.comment_activity_person = new CommentActivityPerson(dbType);
  stores.comment_activity_standard = new CommentActivityStandard(dbType);
  stores.comment_news = new CommentNews(dbType);
  stores.document = new Document(dbType);
  stores.goods = new Goods(dbType);
  stores.mall = new Mall(dbType);
  stores.prize_standard = new PrizeStandard(dbType);
  stores.some_list = new SomeList(dbType);
  stores.user = new User(dbType);
  stores.warehouse = new Warehouse(dbType);
  stores.zxxx = new Zxxx(dbType);
  return stores;
};