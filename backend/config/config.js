var config = {};

config.dbhost = process.env.DBHOST || 'mongodb://localhost/appointment';
config.host = process.env.HOST || 'http://localhost/5000';

module.exports = config;
