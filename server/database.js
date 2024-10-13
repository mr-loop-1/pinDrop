const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: proces.env.DB_HOST,
    port: proces.env.DB_PORT,
    user: proces.env.DB_USER,
    password: proces.env.DB_PASSWORD,
    database: proces.env.DB_NAME,
  },
});
exports.knex = knex;
