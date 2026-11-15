const { test } = require('node:test');
const assert = require('node:assert/strict');
const net = require('node:net');
const { Client } = require('pg');

test('PostgreSQL service container accepts queries and persists data', async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5432),
    user: process.env.POSTGRES_USER || 'ci_user',
    password: process.env.POSTGRES_PASSWORD || 'ci_password',
    database: process.env.POSTGRES_DB || 'cicd_test_db',
  });

  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS deployment_logs (
      id SERIAL PRIMARY KEY,
      service_name VARCHAR(64) NOT NULL,
      status VARCHAR(32) NOT NULL
    );
  `);
  await client.query(
    'INSERT INTO deployment_logs (service_name, status) VALUES ($1, $2)',
    ['cicd-lab3', 'healthy']
  );

  const res = await client.query(
    'SELECT service_name, status FROM deployment_logs WHERE service_name = $1',
    ['cicd-lab3']
  );
  assert.equal(res.rows.length, 1);
  assert.equal(res.rows[0].status, 'healthy');
  await client.end();
});

test('Redis service container responds PONG to PING command', async () => {
  const pong = await new Promise((resolve, reject) => {
    const socket = net.createConnection(
      {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
      },
      () => socket.write('*1\r\n$4\r\nPING\r\n')
    );
    socket.on('data', (chunk) => {
      socket.end();
      resolve(chunk.toString().trim());
    });
    socket.on('error', reject);
  });

  assert.equal(pong, '+PONG');
});
