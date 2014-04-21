/**
 * Created with JetBrains WebStorm.
 * User: zy
 * Date: 13-8-14
 * Time: 上午10:53
 * To change this template use File | Settings | File Templates.
 */


var crypto = require('crypto');
var http = require('http');
var myurl = require('url');
//var async = require("async");


/**
 * 加密
 * @param str
 * @param secret
 * @returns {*}
 * @private
 */
var _encrypt = function (str, secret) {
  var cipher = crypto.createCipher('aes-128-ecb','somepassword');
  var text = "the big brown fox jumped over the fence";
  var crypted = cipher.update(text,'utf-8','hex');
  crypted += cipher.final('hex');
  return crypted;
};
module.exports.encrypt = _encrypt;


/**
 * 解密
 * @param str
 * @param secret
 * @returns {*}
 * @private
 */
var _decrypt = function (str, secret) {
  var decipher = crypto.createDecipher('aes-128-ecb', 'somepassword');
  var text = "67a0fd39e75e37bc0743147d43b9487bde7db1f5ef798da4e570d6595190dd682a9d4491b47ad26c94e11e1e464e8bb1";
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};
module.exports.decrypt = _decrypt;


/**
 * md5加密
 * @param str
 * @returns {*}
 * @private
 */
var _md5 = function (str) {
  var md5sum = crypto.createHash('md5');
  //md5sum.update(str);
  md5sum.update(new Buffer(str, encoding = 'utf8'));
  str = md5sum.digest('hex');
  return str;
};
module.exports.md5 = _md5;


/**
 * 随机数
 * @param size
 * @returns {string}
 * @private
 */
var _randomString = function (size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    //console.log(new_pass);
    size--;
  }
  return new_pass;
};
module.exports.randomString = _randomString;

var _randomNum = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
module.exports.randomNum = _randomNum;

/**
 * 不重复随机数组
 * @param strSize
 * @param arraySize
 * @returns {string}
 * @private
 */
var _randomUniqueArray = function (strSize, arraySize) {
  var tmpStr = ''
    , resStr = '';
  for (var i = 0; i < arraySize; i++) {
    tmpStr = _randomString(strSize);
    if (resStr.indexOf(tmpStr) < 0) {
      resStr += (tmpStr + ',');
    } else {
      i--;
    }
  }
  resStr = resStr.split(",");
  resStr.pop();
  return resStr;
};
module.exports.randomUniqueArray = _randomUniqueArray;


/**
 * 日期格式化
 * @param time
 * @returns {string}
 * @private
 */
var _formatDate = function (time) {
  if (time) {
    var date = new Date(time); //日期对象
  } else {
    var date = new Date(); //日期对象
  }

  var now = "";
  now = date.getFullYear() + "-"; //读英文就行了
  if ((date.getMonth() + 1) < 10) {
    now = now + "0" + (date.getMonth() + 1) + "-";
  } else {
    now = now + (date.getMonth() + 1) + "-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
  }
  if ((date.getDate()) < 10) {
    now = now + "0" + date.getDate() + " ";
  } else {
    now = now + date.getDate() + " ";
  }
  if ((date.getHours()) < 10) {
    now = now + "0" + date.getHours() + ":";
  } else {
    now = now + date.getHours() + ":";
  }
  if ((date.getMinutes()) < 10) {
    now = now + "0" + date.getMinutes() + ":";
  } else {
    now = now + date.getMinutes() + ":";
  }
  if ((date.getSeconds()) < 10) {
    now = now + "0" + date.getSeconds() + "";
  } else {
    now = now + date.getSeconds() + "";
  }
  return now;
};
module.exports.formatDate = _formatDate;


var _formatDateYM = function (time) {
  if (time) {
    var date = new Date(time); //日期对象
  } else {
    var date = new Date(); //日期对象
  }

  var now = "";
  now = date.getFullYear().toString(); //读英文就行了
  if ((date.getMonth() + 1) < 10) {
    now = now + "0" + (date.getMonth() + 1) + "";
  } else {
    now = now + (date.getMonth() + 1) + "";//取月的时候取的是当前月-1如果想取当前月+1就可以了
  }
  return now;
};
module.exports.formatDateYM = _formatDateYM;


var _dt = module.exports.dt = function () {
  // 今天
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  var todayst = today.getTime();
  //alert(today);
  var oneday = 1000 * 60 * 60 * 24;
  // 昨天
  var tomorrow = new Date(todayst + oneday);
  var yesterday = new Date(todayst - oneday);
  //alert(yesterday);
  // 上周一
  var lastMonday = new Date(today - oneday * (today.getDay() + 6));
  //alert(lastMonday);
  // 上个月1号
  var lastMonthFirst = new Date(today - oneday * today.getDate());
  lastMonthFirst = new Date(lastMonthFirst - oneday * (lastMonthFirst.getDate() - 1));
  //alert(lastMonthFirst);
  return {
    today: today,
    tomorrow: tomorrow,
    yesterday: yesterday,
    lastMonday: lastMonday,
    lastMonthFirst: lastMonthFirst
  };
}


/**
 * 复制对象
 * @param fromObj
 * @returns {{}}
 */
var _cloneObj = function cloneAll(fromObj) {
  var toObj = {};
  for (var i in fromObj) {
    if (typeof fromObj[i] == "object") {
      toObj[i] = cloneAll(fromObj[i]);
      continue;
    }
    toObj[i] = fromObj[i];
  }
  return toObj;
}
module.exports.cloneObj = _cloneObj;


/**
 * mysql查询
 * @param connection
 * @param sql
 * @param obj
 * @param callback
 * @private
 */
var _query = function (connection, sql, obj, callback) {

  if (!!connection) {
    connection.query(sql, obj, function (err, rows) {
      callback(err, rows);
    });
  } else {
    pool.getConnection(function (err, connection) {
      if (!!err) {
        callback(err);
        return;
      } else {
        var query = connection.query(sql, obj, function (err, rows) {
          connection.release();
          callback(err, rows);
        });
        console.log("sql:" + query.sql);
      }
    });
  }
};
module.exports.myQuery = _query;


/**
 * mysql事务处理
 * @param connection
 * @param sql mysql语句数组['INSERT into a set ?', 'INSERT into b set ?'];
 * @param obj mysql参数数组[[{a:6}], [{b:"aa"}]];
 * @param callback
 * @private
 */
var _tQuery = function (connection, sql, obj, callback) {

  if (!!connection) {
    connection.query(sql, obj, function (err, rows) {

      //事务处理
      connection.query('BEGIN', function (err, rows) {
        if (err) {
          callback(err);
          return;
        }

        //async处理
        var funcSeries = [];
        for (var i = 0; i < sql.length; i++) {
          (function (e) {
            funcSeries.push(function (callback) {
              // do some stuff ...
              var query = connection.query(sql[e], obj[e], function (err, rows) {
                callback(err, rows);
              });
              console.log("sql:" + query.sql);
            });
          })(i);
        }
        async.series(funcSeries, function (err, results) {
            var q;
            if (err) {
              q = 'ROLLBACK';
              callback(err);
            }
            else {
              q = 'COMMIT';
              callback(null, results);
            }
            connection.query(q, function (err, rows) {
              return;
            });
          }
        );
      });
    });
  } else {
    pool.getConnection(function (err, connection) {
      if (!!err) {
        callback(err);
        return;
      } else {

        //事务处理
        connection.query('BEGIN', function (err, rows) {
          if (err) {
            connection.release();
            callback(err);
            return;
          }

          //async处理
          var funcSeries = [];
          for (var i = 0; i < sql.length; i++) {
            (function (e) {
              funcSeries.push(function (callback) {
                // do some stuff ...
                var query = connection.query(sql[e], obj[e], function (err, rows) {
                  connection.release();
                  callback(err, rows);
                });
                console.log("sql:" + query.sql);
              });
            })(i);
          }
          async.series(funcSeries, function (err, results) {
              var q;
              if (err) {
                q = 'ROLLBACK';
                callback(err);
              }
              else {
                q = 'COMMIT';
                callback(null, results);
              }
              connection.query(q, function (err, rows) {
                connection.release();
                return;
              });
            }
          );
        });
      }
    });
  }
};
module.exports.tQuery = _tQuery;


/**
 * 自动分页
 * @param maxsql     j查询纪录数sql count(*) as count
 * @param pagesql    j查询语句
 * @param obj        jsql参数
 * @param page       j当前页数
 * @param pagesize   j每页条数
 * @param url        j当前url
 * @returns {*}
 */
var _autoPage = function (maxsql, pagesql, obj, page, pagesize, url, callback) {

  if (!page)page = 1;
  if (page < 1)page = 1;
  if (!pagesize)pagesize = 20;
  if (pagesize < 1)pagesize = 20;
  if (isNaN(page) || isNaN(pagesize)) {
    page = 1;
    pagesize = 20;
  }
  var href = '';
  if (url.indexOf('page=') > -1) {
    href = url.split('page=')[0];
  } else {
    if (url.indexOf('?') > -1) {
      href += url + '&';
    } else {
      href += url + '?';
    }
  }

  var reData = {
    page: page,
    pagesize: pagesize,
    maxpage: 0,
    maxrow: 0,
    data: null,
    href: href
  };

  _query(null, maxsql, obj, function (err, rows) {
    if (!!err) {
      callback(err);
      return;
    }
    var count = 0;
    for (var _tmp in rows[0]) {
      count = rows[0][_tmp];
      break;
    }
    reData.maxpage = Math.ceil(count / pagesize);
    reData.maxrow = count;
    pagesql += " limit " + (page - 1) * pagesize + "," + pagesize;
    _query(null, pagesql, obj, function (err, rows) {
      if (!!err) {
        callback(err);
        return;
      }
      reData.data = rows;
      callback(null, reData);
      return;
    });
  });
};
module.exports.autoPage = _autoPage;


/**
 * get html页面
 * @param url
 * @param callback
 * @private
 */
var _httpGet = function (url, callback) {

  if (url.indexOf('http://') < 0)
    url = 'http://' + url;
  var _tmpurl = myurl.parse(url);
  if (!_tmpurl.port)
    _tmpurl.port = 80;
  var options = {
    host: _tmpurl.hostname,
    port: _tmpurl.port,
    path: _tmpurl.path
  };

  var html = '';
  http.get(options, function (res) {

    var a = res.on('data', function (data) {
      // collect the data chunks to the variable named "html"
      html += data;
    })
    res.on('end', function () {
      callback(html);
    });
  });
}
module.exports.httpGet = _httpGet;


/**
 * 截取字符串
 * @param str
 * @param start
 * @param end
 * @returns {string}
 * @private
 */
var _cutStr = function (str, start, end) {
  var _tmp = str.substring(str.indexOf(start) + start.length, str.indexOf(end));
  return _tmp;
};
module.exports.cutStr = _cutStr;


var _sleep = function (milliSecond) {
  var startTime = new Date().getTime();
  while (new Date().getTime() <= milliSecond + startTime) {
  }
};
module.exports.sleep = _sleep;


var _getExtensions = function (filename) {
  filename = filename.toLowerCase();
  return filename.substring(filename.indexOf('.'), filename.length);
};
module.exports.getExtensions = _getExtensions;


//参数验证
var _sign = module.exports.sign = function (args) {
  if (!args.sign) return false;
  var sign = '';
  for (var _tmp in args) {
    if (_tmp == 'sign' || _tmp == 'uid' || _tmp == 'uname') {
      continue;
    }
    sign += args[_tmp];
  }

  if (args.sign.toLowerCase() == _md5(sign + ('miyao')).toLowerCase()) {
    return true;
  } else {
    return false;
  }
}