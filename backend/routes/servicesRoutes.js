const express = require("express");


const db = require("../database");

const service = express.Router();

service.get("/", (req, res) => {


  const query = `SELECT 
    sp.service_id,
    sp.name AS service_provider_name,
    sp.contact,
    sp.service_type,
    sp.ratings AS average_rating,
    sp.review_count,
    (
        SELECT r.comments 
        FROM review r 
        WHERE r.service_provider_id = sp.service_id 
        ORDER BY r.date_reviewed DESC 
        LIMIT 1
    ) AS latest_review_comment,
    (
        SELECT r.rating 
        FROM review r 
        WHERE r.service_provider_id = sp.service_id 
        ORDER BY r.date_reviewed DESC 
        LIMIT 1
    ) AS latest_review_rating
FROM 
    service_provider sp;
`;
  db.query(query, (err, results) => {
    if (err || results.length === 0) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  
    res.status(200).json(results);
  });
});

service.get("/categories", (req, res) => {
  const query = `SELECT service_type as category, COUNT(*) AS item_count
FROM service_provider
GROUP BY service_type
ORDER BY item_count DESC;`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
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
