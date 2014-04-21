module.exports.query = function (_pool) {
  return function (connection, sql, obj, callback) {
    if (!!connection) {
      try {
        connection.query(sql, obj, function (err, results) {
          callback(err, results);
        });
      } catch (e) {
        return callback(new Error(e.message));
      }
    } else {
      try {
        _pool.getConnection(function (err, connection) {
          if (!!err) {
            return callback(err);
          } else {
            try {
              connection.query(sql, obj, function (err, results) {
                connection.release();
                callback(err, results);
              });
            } catch (e) {
              return callback(new Error(e.message));
            }
          }
        });
      } catch (e) {
        return callback(new Error(e.message));
      }
    }
  }
};