const { config } = require('./../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
//const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = config.dbRailway;
module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  }
};
