/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-3
 * Time: 上午11:16
 * To change this template use File | Settings | File Templates.
 */


var parseString = require('xml2js').parseString;

module.exports.parseXml = function(xml, callback){
    var xml  = '<xml>'+xml+'</xml>';
    parseString(xml, {trim: true}, function (err, result) {
        callback(err, result);
    });
};
