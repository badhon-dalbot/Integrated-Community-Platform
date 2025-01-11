const express = require("express");
const checkLogin = require("../middleware/middleware");

const db = require("../database");

const review = express.Router();

review.get("/", (req, res) => {
  //     //   const { username } = req.user;

  const query = `SELECT * FROM review`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching data from database");
      return;
    }
    console.log(results);
    res.status(200).json(results);
  });
});

review.post("/", (req, res) => {
  const { service_provider_id, user_id, rating, comments } = req.body;

  if (!service_provider_id || !user_id || !rating || !comments) {
    return res.status(400).send("Please povide all required fields");
  }

  const query = `INSERT INTO lost_item (  service_provider_id,
    user_id,
    rating,
    comments) VALUES (?, ?, ?, ?)`;
  const values = [service_provider_id, user_id, rating, comments];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding the item");
    }
    res.status(201).send({ message: "item added successfully!" });
  });
});

module.exports = review;
