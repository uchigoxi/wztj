/**
 * Created by zy on 14-3-12.
 */

var redis = require('../my/redis.js');
var config = require('./config.js');

module.exports = new redis(config);
