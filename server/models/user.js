const { knex } = require("../database");

exports.createUser = async (inputs) => {
  const query = knex("users");

  return await query;
};
