import knex from 'knex';
const configuration = require('../../knexfile');
require('dotenv').config();

const config = process.env.DB_ENV || 'development';

const connection = knex(configuration[config]);

export default connection;