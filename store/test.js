/**
 * Created by zy on 14-1-15.
 */

var store = require('./index.js')('postgresql', 'account');

store.test('id', 5, function (err, results) {
  console.log(err);
  console.log(results);
});
