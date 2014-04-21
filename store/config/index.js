var hostd = '127.0.0.1';
var hostp = '127.0.0.1';
module.exports = {
  env: 'development',
  development: {
    log: {
      name: 'proxy_mongo',
      path: './logs/log',
      period: '1d',
      count: 365,
      type: 'rotating-file',
      level: 'error'
    },
    searchServer: {
      host: hostd,
      port: 9306
    },
    mysql: {
      host: hostd,
      username: 'root',
      password: 'tjrb1234',
      db: 'wx'
    },
    postgresql: {
      user: 'postgres',
      database: 'wztj',
      password: 'tjrb1234',
      host: hostd,
      port: 5432,
      poolSize: 100
    },
    neo4j: {
      path: 'http://' + hostd + ':7474'
    },
    mongo: {
      path: 'mongodb://' + hostd + '/service'
    }
  }, production: {
    log: {
      name: 'proxy_mongo',
      path: './logs/log',
      period: '1d',
      count: 365,
      type: 'rotating-file',
      level: 'error'
    },
    searchServer: {
      host: hostp,
      port: 9306
    },
    mysql: {
      host: hostp,
      username: 'root',
      password: 'tjrb1234',
      db: 'wx'
    },
    postgresql: {
      user: 'postgres',
      database: 'postgres',
      password: '111111',
      host: hostp,
      port: 5432,
      poolSize: 100
    },
    neo4j: {
      path: 'http://' + hostp + ':7474'
    },
    mongo: {
      path: 'mongodb://' + hostp + '/service'
    }
  }
};
