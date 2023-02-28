const { Client } = require('pg');

const getConnection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'soyjherom',
    password: 'admin123',
    database: 'my_store'
  });

  await client.connect();
  return client;
}

module.exports = { getConnection };