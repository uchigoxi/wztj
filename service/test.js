/**
 * Created by zy on 14-2-17.
 */

var util = require('util');
var r = require('./redis.js');
var zy = require('../my/tools.js');
var ac = require('./app/activity.js')


var _test = module.exports.test = function (req, res) {

  res.json(zy.encrypt());
}