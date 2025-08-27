const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ecommerce",
    password: process.env.PSW_DB,
    port: 5432
});

module.exports = pool;
