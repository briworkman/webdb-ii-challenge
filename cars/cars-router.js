const express = require("express");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/car-dealer.db3"
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.json(cars);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Failed to retrieve the cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(cars => {
      res.json(cars);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Failed to retrieve the car" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(addNewCar => {
          res.status(201).json(addNewCar);
        });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Failed to add the car" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("cars")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ errorMessage: "Car not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Error updating the car" });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Error removing the car" });
    });
});

module.exports = router;
