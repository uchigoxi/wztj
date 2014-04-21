module.exports.query = function (pg, connectStr) {
  return function (sql, obj, callback) {
    try {
      pg.connect(connectStr, function (err, client, done) {
        if (!!err) {
          return callback(err);
        } else {
          try {
            var sqltext = client.query(sql, obj, function (err, results) {
              done();
              callback(err, results);
            });
            //console.log(sqltext);
          } catch (e) {
            done();
            return callback(new Error(e.message));
          }
        }
      });
    } catch (e) {
      return callback(new Error(e.message));
    }
  }
};
