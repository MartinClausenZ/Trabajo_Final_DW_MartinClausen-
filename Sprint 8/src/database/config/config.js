module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'verdia_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'verdia_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'verdia_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
};
