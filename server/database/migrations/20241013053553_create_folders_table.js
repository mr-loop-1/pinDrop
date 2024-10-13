const { onUpdateTrigger, timestamps } = require("../timestamps");

exports.up = async function (knex) {
  const migration = await knex.schema.createTable("folders", function (table) {
    table.bigIncrements("id");
    table.string("userId").notNullable();
    table.string("ulid").notNullable().unique().index();
    table.string("groupId").notNullable();
    table.string("title").notNullable();
    table.integer("parentId").notNullable().index();
    timestamps(knex, table);
    table.unique(["userId", "groupId", "name"]);
  });
  await knex.raw(onUpdateTrigger("folders"));
  return migration;
};

exports.down = function (knex) {
  return knex.schema.dropTable("folders");
};
