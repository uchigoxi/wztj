/**
 * Created by zy on 14-1-16.
 */


var subStore = {};
subStore["mysql"] = require('./mysql/index.js');
//subStore["neo4j"] = require('./neo4j/index.js');
subStore["postgresql"] = require('./postgresql/index.js');
module.exports = function (dbType, storeName) {
  return subStore[dbType](storeName);
};