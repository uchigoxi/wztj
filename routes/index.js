/**
 * Created by zy on 14-2-13.
 */


var mobile = require("../service/app/index.js");
var admin = require("../service/admin/index.js");

module.exports = function (app) {

  app.get('/', require("../service/test.js").test);
  app.post('/', require("../service/test.js").test);


/**
 * app service
 */
  //用户注册 post字段(name:用户名,password:密码,sign:验证字段) 返回(err:错误信息,result:注册用户id)
  app.get('/app/user/reg', mobile.user.reg);
  app.post('/app/user/reg', mobile.user.reg);
  //用户注册 post字段(name:用户名,password:密码,sign:验证字段) 返回(err:错误信息,result:用户信息)
  app.get('/app/user/login', mobile.user.login);
  app.post('/app/user/login', mobile.user.login);
  //用户签到 post字段(name:用户名,sign:验证字段) 返回(err:错误信息,result:用户签到结果信息和积分奖励信息)
  app.get('/app/user/checkin', mobile.user.checkin);
  app.post('/app/user/checkin', mobile.user.checkin);
  //用户详情 post字段(id:用户id) 返回(err:错误信息,result:用户详细信息)
  app.get('/app/user/detail', mobile.user.userDetail);
  app.post('/app/user/detail', mobile.user.userDetail);
  //用户详情 post字段(id:用户id) 返回(err:错误信息,result:用户详细信息)
  app.get('/app/bank/detail', mobile.user.userBank);
  app.post('/app/bank/detail', mobile.user.userBank);
  //用户修改密码
  app.get('/app/user/pwd', mobile.user.changePassword);
  app.post('/app/user/pwd', mobile.user.changePassword);
  //用户头像
  app.get('/app/user/upload', mobile.user.upload);
  app.post('/app/user/upload', mobile.user.upload);
  //完善用户信息
  app.get('/app/user/save', mobile.user.saveUserInfo);
  app.post('/app/user/save', mobile.user.saveUserInfo);

  //标准活动列表 post字段() 返回(err:错误信息,result:)
  app.get('/app/activity/standard/list', mobile.activity.list);
  app.post('/app/activity/standard/list', mobile.activity.list);
  //标准活动详情 post字段(name:用户名,aid:活动id,sign:验证字段) 返回(err:错误信息,result:用户今天是否可以参与这个活动和活动中奖信息)
  app.get('/app/activity/standard/detail', mobile.activity.detail);
  app.post('/app/activity/standard/detail', mobile.activity.detail);
  //标准活动抽奖开始玩 post字段(name:用户名,aid:活动id,sign:验证字段) 返回(err:错误信息,result:中奖信息null为未中奖)
  app.get('/app/activity/standard/play', mobile.activity.play);
  app.post('/app/activity/standard/play', mobile.activity.play);
  //中奖信息prizeList
  app.get('/app/activity/standard/prize/list', mobile.activity.prizeList);
  app.post('/app/activity/standard/prize/list', mobile.activity.prizeList);
  //推荐抽奖活动
  app.get('/app/activity/standard/recommend/get', mobile.activity.getRecommend);
  app.post('/app/activity/standard/recommend/get', mobile.activity.getRecommend);

  //个人活动列表 post字段() 返回(err:错误信息,result:)
  app.get('/app/activity/person/list', mobile.activity_person.list);
  app.post('/app/activity/person/list', mobile.activity_person.list);
  //个人活动详情 post字段(name:用户名,aid:活动id,sign:验证字段) 返回(err:错误信息,result:用户今天是否可以参与这个活动和活动中奖信息)
  app.get('/app/activity/person/detail', mobile.activity_person.detail);
  app.post('/app/activity/person/detail', mobile.activity_person.detail);
  //个人活动创建 post字段(name:用户名,aid:活动id,sign:验证字段) 返回(err:错误信息,result:中奖信息null为未中奖)
  app.get('/app/activity/person/add', mobile.activity_person.add);
  app.post('/app/activity/person/add', mobile.activity_person.add);
  //个人活动开始玩 post字段(name:用户名,aid:活动id,sign:验证字段) 返回(err:错误信息,result:中奖信息null为未中奖)
  app.get('/app/activity/person/play', mobile.activity_person.play);
  app.post('/app/activity/person/play', mobile.activity_person.play);
  //playerList
  app.get('/app/activity/person/player', mobile.activity_person.playerList);
  app.post('/app/activity/person/player', mobile.activity_person.playerList);

  //商城商品大列表
  app.get('/app/mall/list', mobile.mall.list);
  app.post('/app/mall/list', mobile.mall.list);
  //商城商品详情
  app.get('/app/mall/detail', mobile.mall.detail);
  app.post('/app/mall/detail', mobile.mall.detail);
  //商城商品购买
  app.get('/app/mall/buy', mobile.mall.buy);
  app.post('/app/mall/buy', mobile.mall.buy);

  //图文list
  app.get('/app/document/list', mobile.document.list);
  app.post('/app/document/list', mobile.document.list);
  //图文listhot
  app.get('/app/document/listhot', mobile.document.listHot);
  app.post('/app/document/listhot', mobile.document.listHot);
  //图文detail
  app.get('/app/document/detail', mobile.document.detail);
  app.post('/app/document/detail', mobile.document.detail);
  //图文support(GET token id support 0赞 其他不赞)
  app.get('/app/document/support', mobile.document.support);
  app.post('/app/document/support', mobile.document.support);

  //评论add
  app.get('/app/comment/add', mobile.comment.add);
  app.post('/app/comment/add', mobile.comment.add);
  //评论列表by user
  app.get('/app/comment/list/user', mobile.comment.listByUser);
  app.post('/app/comment/list/user', mobile.comment.listByUser);
  //评论列表by fid
  app.get('/app/comment/list/fid', mobile.comment.listByFid);
  app.post('/app/comment/list/fid', mobile.comment.listByFid);
  //评论del by user
  app.get('/app/comment/del', mobile.comment.del);
  app.post('/app/comment/del', mobile.comment.del);

  //zxxx列表
  app.get('/app/zxxx/list', mobile.zxxx.list);
  app.post('/app/zxxx/list', mobile.zxxx.list);

  //各种列表
  app.get('/app/list/category', admin.list.categoryList);
  app.get('/app/list/business', admin.list.businessList);
  app.get('/app/list/area', admin.list.businessAreaList);
  app.get('/app/list/astype', admin.list.asTypeList);
  app.get('/app/list/usefor', admin.list.useForList);
/**
 * 后台管理 service
 */
  //库存图片上传
  app.get('/admin/goods/upload', admin.goods.upload);
  app.post('/admin/goods/upload', admin.goods.upload);
  //新增库存
  app.get('/admin/goods/add', admin.goods.add);
  app.post('/admin/goods/add', admin.goods.add);
  //库存大列表
  app.get('/admin/goods/list', admin.goods.list);
  app.post('/admin/goods/list', admin.goods.list);
  //库存详情
  app.get('/admin/goods/detail', admin.goods.detail);
  app.post('/admin/goods/detail', admin.goods.detail);
  //库存商品名称检验
  app.get('/admin/goods/check', admin.goods.check);
  app.post('/admin/goods/check', admin.goods.check);

  //抽奖图片上传
  app.get('/admin/activity/upload', admin.activity.upload);
  app.post('/admin/activity/upload', admin.activity.upload);
  //抽奖活动名称验证
  app.get('/admin/activity/standard/check', admin.activity.check);
  app.post('/admin/activity/standard/check', admin.activity.check);
  //新增抽奖活动
  app.get('/admin/activity/standard/add', admin.activity.add);
  app.post('/admin/activity/standard/add', admin.activity.add);
  //新增抽奖活动奖品
  app.get('/admin/activity/standard/prize/add', admin.prize.add);
  app.post('/admin/activity/standard/prize/add', admin.prize.add);
  //del抽奖活动奖品
  app.get('/admin/activity/standard/prize/del', admin.prize.del);
  app.post('/admin/activity/standard/prize/del', admin.prize.del);
  //抽奖活动奖品列表
  app.get('/admin/activity/standard/prize/list', admin.prize.list);
  app.post('/admin/activity/standard/prize/list', admin.prize.list);
  //抽奖活动列表
  app.get('/admin/activity/standard/list', admin.activity.list);
  app.post('/admin/activity/standard/list', admin.activity.list);
  //抽奖活动详情
  app.get('/admin/activity/standard/detail', admin.activity.detail);
  app.post('/admin/activity/standard/detail', admin.activity.detail);
  //停止抽奖活动
  app.get('/admin/activity/standard/stop', admin.activity.stop);
  app.post('/admin/activity/standard/stop', admin.activity.stop);
  //推荐抽奖活动
  app.get('/admin/activity/standard/recommend/set', admin.activity.setRecommend);
  app.post('/admin/activity/standard/recommend/set', admin.activity.setRecommend);
  app.get('/admin/activity/standard/recommend/get', admin.activity.getRecommend);
  app.post('/admin/activity/standard/recommend/get', admin.activity.getRecommend);

  //个人活动列表 post字段() 返回(err:错误信息,result:)
  app.get('/admin/activity/person/list', admin.activity_person.list);
  app.post('/admin/activity/person/list', admin.activity_person.list);
  //个人活动详情 post字段(name:用户名,aid:活动id,sign:验证字段) 返回(err:错误信息,result:用户今天是否可以参与这个活动和活动中奖信息)
  app.get('/admin/activity/person/detail', admin.activity_person.detail);
  app.post('/admin/activity/person/detail', admin.activity_person.detail);
  //个人活动结算
  app.get('/admin/activity/person/cancel', admin.activity_person.cancel);
  app.post('/admin/activity/person/cancel', admin.activity_person.cancel);

  //用户列表 post字段() 返回(err:错误信息,result:所有用户)
  app.get('/admin/user/list', admin.user.userList);
  app.post('/admin/user/list', admin.user.userList);
  //用户详情 post字段(uid:用户id) 返回(err:错误信息,result:用户详细信息)
  app.get('/admin/user/detail', admin.user.userDetail);
  app.post('/admin/user/detail', admin.user.userDetail);
  //删除用户 post字段(uid:用户id) 返回(err:错误信息,result:trun)
  app.get('/admin/user/del', admin.user.userDel);
  app.post('/admin/user/del', admin.user.userDel);

  //amll图片上传
  app.get('/admin/mall/upload', admin.mall.upload);
  app.post('/admin/mall/upload', admin.mall.upload);
  //商城商品添加
  app.get('/admin/mall/add', admin.mall.add);
  app.post('/admin/mall/add', admin.mall.add);
  //商城商品检测
  app.get('/admin/mall/check', admin.mall.check);
  app.post('/admin/mall/check', admin.mall.check);
  //商城商品大列表
  app.get('/admin/mall/list', admin.mall.list);
  app.post('/admin/mall/list', admin.mall.list);
  //商城商品下架
  app.get('/admin/mall/cancel', admin.mall.cancel);
  app.post('/admin/mall/cancel', admin.mall.cancel);

  //图文图片上传
  app.get('/admin/document/upload', admin.document.upload);
  app.post('/admin/document/upload', admin.document.upload);
  //图文add
  app.get('/admin/document/add', admin.document.add);
  app.post('/admin/document/add', admin.document.add);
  //图文list
  app.get('/admin/document/list', admin.document.list);
  app.post('/admin/document/list', admin.document.list);
  //图文listhot
  app.get('/admin/document/listhot', admin.document.listHot);
  app.post('/admin/document/listhot', admin.document.listHot);
  //图文detail
  app.get('/admin/document/detail', admin.document.detail);
  app.post('/admin/document/detail', admin.document.detail);
  //图文del
  app.get('/admin/document/del', admin.document.del);
  app.post('/admin/document/del', admin.document.del);
  //图文lx
  app.get('/admin/document/lx', admin.document.lx);
  app.post('/admin/document/lx', admin.document.lx);

  //评论审核
  app.get('/admin/comment/pass', admin.comment.pass);
  app.post('/admin/comment/pass', admin.comment.pass);
  //评论列表
  app.get('/admin/comment/list', admin.comment.list);
  app.post('/admin/comment/list', admin.comment.list);
  //评论del
  app.get('/admin/comment/del', admin.comment.del);
  app.post('/admin/comment/del', admin.comment.del);

  //zxxx add
  app.get('/admin/zxxx/add', admin.zxxx.add);
  app.post('/admin/zxxx/add', admin.zxxx.add);
  //zxxx list
  app.get('/admin/zxxx/list', admin.zxxx.list);
  app.post('/admin/zxxx/list', admin.zxxx.list);
  //zxxx del
  app.get('/admin/zxxx/del', admin.zxxx.del);
  app.post('/admin/zxxx/del', admin.zxxx.del);

  //各种列表
  app.get('/admin/list/category', admin.list.categoryList);
  app.get('/admin/list/business', admin.list.businessList);
  app.get('/admin/list/area', admin.list.businessAreaList);
  app.get('/admin/list/astype', admin.list.asTypeList);
  app.get('/admin/list/usefor', admin.list.useForList);

}

/*
 //app
 //用户仓库，用户消息盒子，用户发起的活动，用户想要，我的关注，
 app.get('/app/comment/standard/add', mobile.comment.standardAdd);
 app.post('/app/comment/standard/add', mobile.comment.standardAdd);
 //用户发表评论
 app.get('/app/comment/standard/ulist', mobile.comment.standardListByUser);
 app.post('/app/comment/standard/ulist', mobile.comment.standardListByUser);
 //用户评论列表 post字段(uid:用户id,sign:验证字段) 返回(err:错误信息,result:列表)
 app.get('/app/comment/standard/flist', mobile.comment.standardListByFid);
 app.post('/app/comment/standard/flist', mobile.comment.standardListByFid);
 //活动评论列表 post字段(fid:活动id,sign:验证字段) 返回(err:错误信息,result:列表)
 app.get('/app/comment/standard/del', mobile.comment.standardDel);
 app.post('/app/comment/standard/del', mobile.comment.standardDel);
 //删除评论 post字段(id:评论id,aname操作人,sign:验证字段) 返回(err:错误信息,result:)
 //admin
 //
 app.get('/admin/comment/standard/list', admin.comment.standardList);
 app.post('/admin/comment/standard/list', admin.comment.standardList);
 //评论列表
 app.get('/admin/comment/standard/pass', admin.comment.standardPass);
 app.post('/admin/comment/standard/pass', admin.comment.standardPass);
 //审核评论 post字段(id:评论id,aname操作人,sign:验证字段) 返回(err:错误信息,result:)
 app.get('/admin/comment/standard/del', admin.comment.standardDel);
 app.post('/admin/comment/standard/del', admin.comment.standardDel);
 //删除评论 post字段(id:评论id,aname操作人,sign:验证字段) 返回(err:错误信息,result:)
 //新增库存
 }
 */
/**
 * 最新消息 document 能链接到活动 和 白送图文
 * 抽奖9个
 * 中奖 更新顺序 先db 奖品表用户仓库表 返回后 同时写redis 中奖信息和no win times
 *
 */




