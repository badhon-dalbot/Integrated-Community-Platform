const express = require("express");
const checkLogin = require("../middleware/middleware");

const db = require("../database");

const events = express.Router();

events.get("/", (req, res) => {
  //     //   const { username } = req.user;

  const query = `SELECT * FROM event`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching data from database");
      return;
    }
    console.log(results);
    res.status(200).json(results);
  });
});

events.post("/", (req, res) => {
  const {
    organizer_id,
    event_name,
    description,
    date,
    time,
    street_or_house,
    town,
    district,
    division,
    contact_details,
  } = req.body;

  if (
    !organizer_id ||
    !event_name ||
    !description ||
    !date ||
    !time ||
    !street_or_house ||
    !town ||
    !district ||
    !division ||
    !contact_details
  ) {
    return res.status(400).send("Please povide all required fields");
  }

  const query = `INSERT INTO lost_item (organizer_id,
    event_name,
    description,
    date,
    time,
    street_or_house,
    town,
    district,
    division,
    contact_details,) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    organizer_id,
    event_name,
    description,
    date,
    time,
    street_or_house,
    town,
    district,
    division,
    contact_details,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding the item");
    }
    res.status(201).send({ message: "item added successfully!" });
  });
});

module.exports = events;
