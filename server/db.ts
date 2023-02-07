const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "asxz132",
  database: "code_editor",
  port: 5432,
});

export { pool };
