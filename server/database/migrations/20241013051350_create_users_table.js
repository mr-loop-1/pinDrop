const { onUpdateTrigger, timestamps } = require("../timestamps");

exports.up = async function (knex) {
  const migration = await knex.schema.createTable("users", function (table) {
    table.bigIncrements("id");
    table.string("ulid").notNullable().unique().index();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("jwt", 2000);
    table.string("gateway");
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("users"));
  return migration;
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
