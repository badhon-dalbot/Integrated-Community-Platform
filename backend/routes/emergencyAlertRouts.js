const express = require("express");
const checkLogin = require("../middleware/middleware");

const db = require("../database");

const emergencyAlert = express.Router();

emergencyAlert.get("/alerts", (req, res) => {
  // const { username } = req.user;
  // console.log(userId);
  // console.log(username);
  // if (!username) return res.status(400).json({ error: "user id required" });

  const query = `SELECT * FROM emergency_alert`;
  db.query(query, (err, results) => {
    if (err || results.length === 0) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }
    console.log(results);
    res.status(200).json(results);
  });
});

emergencyAlert.post("/", (req, res) => {
  const { admin_id, title, description, date_issued } = req.body;

  if (!admin_id || !title || !description || !date_issued) {
    return res.status(400).send("Please povide all required fields");
  }

  const query = `INSERT INTO lost_item ( name,
    admin_id, title, description, date_issued) VALUES (?, ?, ?, ?)`;
  const values = [admin_id, title, description, date_issued];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding the item");
    }
    res.status(201).send({ message: "item added successfully!" });
  });
});

module.exports = emergencyAlert;
