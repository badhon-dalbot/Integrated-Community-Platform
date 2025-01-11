const express = require("express");
const checkLogin = require("../middleware/middleware");

const db = require("../database");

const buyAndSell = express.Router();

buyAndSell.get("/", (req, res) => {
  //     //   const { username } = req.user;

  const query = `SELECT * FROM buy_sell_item`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching data from database");
      return;
    }
    console.log(results);
    res.status(200).json(results);
  });
});

buyAndSell.post("/", (req, res) => {
  const {
    user_id,
    item_name,
    description,
    category,
    price,
    photo_url,
    location,
  } = req.body;

  if (
    !user_id ||
    !item_name ||
    !description ||
    !category ||
    !price ||
    !photo_url ||
    !location
  ) {
    return res.status(400).send("Please povide all required fields");
  }

  const query = `INSERT INTO lost_item ( user_id,
    item_name,
    description,
    category,
    price,
    photo_url,
    location,) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    user_id,
    item_name,
    description,
    category,
    price,
    photo_url,
    location,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding the item");
    }
    res.status(201).send({ message: "item added successfully!" });
  });
});

module.exports = buyAndSell;
