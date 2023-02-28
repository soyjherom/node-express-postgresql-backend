const { Client } = require('pg');
const Pool = require('pg').Pool

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'soyjherom',
  password: 'admin123',
  database: 'my_store'
});

const pool = new Pool({
  host: '192.168.100.192',
  port: 5433,
  user: 'soyjherom',
  password: 'admin123',
  database: 'my_store'
})

module.exports = { client, pool };
