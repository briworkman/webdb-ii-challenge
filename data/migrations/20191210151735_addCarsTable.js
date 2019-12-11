exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("VIN", 250)
      .notNullable()
      .unique()
      .index();
    tbl.string("Make", 250).notNullable();
    tbl.string("Model", 250).notNullable();
    tbl.float("Milage", 250).notNullable();
    tbl.string("Transmission Type", 250);
    tbl.string("Title Status", 250);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
