const express = require("express");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middleware/middleware");
const db = require("../database");
const secretKey = "2c3f35b8a3988bed11689e3fc1aabe08064abd0d43";

const userRoute = express.Router();

userRoute.get("/profile", checkLogin, (req, res) => {
  // const { username } = req.params;
  const auth = req.auth;

  res.json({secret: secretKey, auth});
  // console.log(userId);
  console.log(username);
  if (!username) return res.status(400).json({ error: "user id required" });

  const query = `SELECT * FROM users WHERE username = ?`;
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }

    // res.send(user);
    res.json(user);
  });
});

module.exports = userRoute;
