/**
 * Created by zy on 14-1-18.
 */

var util = require('util');
var proxy = require('./index.js')('postgresql');

proxy.goods.addGoods(null, function (err, result) {
  console.log(err);
  console.log(util.inspect(result,false,null));
  console.log(result.rowCount);
});
