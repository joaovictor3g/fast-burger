import path from 'path';
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    version: process.env.DATABASE_VERSION,
    connection: {
      host : process.env.DATABASE_HOST,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_NAME
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  }
};