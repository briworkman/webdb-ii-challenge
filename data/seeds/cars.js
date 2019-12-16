exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        { VIN: "1234567", Make: "Kia", Model: "Forte", Milage: "75,000" },
        { VIN: "1234567890", Make: "Chevy", Model: "Malibu", Milage: "99,000" }
      ]);
    });
};
