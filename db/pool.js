const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres', 
  host: '192.168.1.19',     
  database: 'default_db', 
  password: '123456', 
  port: 5432, 
});

module.exports = pool;
