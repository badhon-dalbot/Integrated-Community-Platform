const express = require("express");
const checkLogin = require("../middleware/middleware");

const db = require("../database");

const service = express.Router();

service.get("/", (req, res) => {
  // const { username } = req.user;
  // console.log(userId);
  // console.log(username);
  // if (!username) return res.status(400).json({ error: "user id required" });

  const query = `SELECT * FROM service_provider`;
  db.query(query, (err, results) => {
    if (err || results.length === 0) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }
    console.log(results);
    res.status(200).json(results);
  });
});

service.post("/", (req, res) => {
  const { name, service_type, contact, ratings, review_count } = req.body;

  if (!name || !service_type || !contact || !ratings || !review_count) {
    return res.status(400).send("Please povide all required fields");
  }

  const query = `INSERT INTO lost_item ( name,
    service_type,
    contact,
    ratings,
    review_count) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, service_type, contact, ratings, review_count];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding the item");
    }
    res.status(201).send({ message: "item added successfully!" });
  });
});

module.exports = service;
