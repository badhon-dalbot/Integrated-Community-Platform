const express = require("express");
const checkLogin = require("../middleware/middleware");

const db = require("../database");

const lostAndFoundRoute = express.Router();

lostAndFoundRoute.get("/lost-item", (req, res) => {
  // const { username } = req.user;
  // console.log(userId);
  // console.log(username);
  // if (!username) return res.status(400).json({ error: "user id required" });

  const query = `SELECT * FROM lost_item`;
  db.query(query, (err, results) => {
    if (err || results.length === 0) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }
    console.log(results);
    res.status(200).json(results);
  });
});

lostAndFoundRoute.get(
  "/found-item", (req, res) => {
//     //   const { username } = req.user;

    const query = `SELECT * FROM found_item`;
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Error fetching data from database");
        return;
      }
      console.log(results);
      res.status(200).json(results);
    });
  }
);

lostAndFoundRoute.post("lost-item", (req, res) => {
  const {
    user_id,
    item_name,
    description,
    photo_url,
    contact,
    date_lost,
    location_lost,
  } = req.body;

  if (
    !item_name ||
    !description ||
    !date_lost ||
    !contact ||
    !location_lost ||
    !photo_url
  ) {
    return res.status(400).send("Please povide all required fields");
  }

  const query = `INSERT INTO lost_item (user_id, item_name, description, photo_url, contact, date_lost, location_lost) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    user_id,
    item_name,
    description,
    photo_url,
    contact,
    date_lost,
    location_lost,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding the item");
    }
    res.status(201).send({ message: "item added successfully!" });
  });
});

module.exports = lostAndFoundRoute;
